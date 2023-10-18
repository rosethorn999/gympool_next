'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '../components/Button';
import TextBox from '../components/TextBox';

function RequestResetPassword() {
	// TODO: Add captcha
	const router = useRouter();
	const validate = (values: any) => {
		const errors: any = {};

		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validate,
		onSubmit: (values) => {
			resetPassword(values);
		},
	});
	function resetPassword(values: any) {
		const url = '/password-reset/';
		basicRequest
			.post(url, values)
			.then(async () => {
				await Swal.fire('完成', '連結已經寄到你的信箱', 'success');
				router.push('/');
			})
			.catch(function (error: any) {
				const title = error.response.status.toString();
				let msg = JSON.stringify(error.response.data);
				if (error.response.status === 403) {
					msg = error.response.data.replace(
						'Unable to get user with provided credentials.',
						'無法找到該名使用者'
					);
				}
				Swal.fire(title, msg, 'error');
				console.error(error);
			});
	}
	return (
		// <div className="RequestResetPassword">
		<div className="login text-center">
			<form onSubmit={formik.handleSubmit}>
				<p>重設連結將會寄到你的信箱</p>
				<div className="form-group mb-14 block">
					<TextBox
						name="email"
						extraClass={`text-box mx-auto my-0 h-10 w-1/3 min-w-[250px] rounded-3xl border border-whisper p-5 leading-10`}
						isInvalid={'email' in formik.errors}
						placeholder="電子信箱"
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
				</div>
				<div className="button-box">
					<Button>
						<Link href="/">回上一頁</Link>
					</Button>
					&nbsp;
					<Button type="submit" disabled={!formik.isValid}>
						送出
					</Button>
				</div>
			</form>
		</div>
	);
}

export default RequestResetPassword;

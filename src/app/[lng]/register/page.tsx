'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { SetSpinnerOpen, SetSpinnerClose } from '../components/Spinner';
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

export default function Page({ params: { lng } }: any) {
	const { t } = useTranslation(lng, 'register');
	const router = useRouter();

	const validate = (values: any) => {
		const errors: any = {};

		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}
		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 8) {
			errors.password = 'Too short';
		}
		if (!values.last_name) {
			errors.last_name = 'Required';
		} else if (values.last_name.length > 20) {
			errors.last_name = 'Must be 20 characters or less';
		}
		if (!values.first_name) {
			errors.first_name = 'Required';
		} else if (values.first_name.length > 15) {
			errors.first_name = 'Must be 15 characters or less';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			first_name: '',
			last_name: '',
		},
		validate,
		onSubmit: (values) => {
			createUser(values);
		},
	});

	async function createUser(values: any) {
		let url = '/auth/register';
		SetSpinnerOpen();
		try {
			const req = await basicRequest.post(url, values);
			const msg = `${values.email} 已經可以使用`;
			SetSpinnerClose();
			await Swal.fire('完成', msg, 'success');
			router.push('/login');
		} catch (error: any) {
			let msgs: string[] = [];
			if (error.response.status === 400) {
				let msg = error.response.data;
				const keys = Object.keys(msg);
				const commonMsg: any = {
					'This password is too common.': '密碼太過於常見',
					'This password is entirely numeric.': '密碼需由數字與英文組成',
					'user with this username already exists.': '此使用者名稱已被註冊',
					'invitation not exist.': '連結錯誤, 請重開邀請信中連結',
					'user with this email already exists.': '此電子信箱已被註冊',
				};
				keys.forEach((key) => {
					msg[key].forEach((msg: any) => {
						msgs.push(commonMsg[msg] || msg);
					});
				});
			}
			const title = error.response.status.toString();
			if (msgs.length > 0) {
				Swal.fire(title, msgs.join('<br>'), 'error');
			} else {
				Swal.fire(title, JSON.stringify(error.response.data), 'error');
			}
			console.error(error);
		}
		SetSpinnerClose();
	}
	return (
		<div className="Register h-full w-full py-12 text-center md:px-5">
			<div>
				<h1 className="mb-3">{t('CompleteYourRegistrationByFillingOutTheFollowingInformation')}</h1>
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group mb-3 block w-full">
						<TextBox
							name="email"
							extraclass={`${formik.errors.email ? 'is-invalid' : ''}`}
							placeholder={t('email')}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
					</div>
					<div className="form-group mb-3 block w-full">
						<TextBox
							name="password"
							type="password"
							extraclass={`${formik.errors.password ? 'is-invalid' : ''}`}
							placeholder={t('password')}
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
					</div>
					<div className="form-group mb-3 block w-full">
						<TextBox
							name="last_name"
							type="text"
							extraclass={`${formik.errors.last_name ? 'is-invalid' : ''}`}
							placeholder={t('lastName')}
							onChange={formik.handleChange}
							value={formik.values.last_name}
						/>
					</div>
					<div className="form-group mb-3 block w-full">
						<TextBox
							name="first_name"
							type="text"
							extraclass={`${formik.errors.first_name ? 'is-invalid' : ''}`}
							placeholder={t('firstName')}
							onChange={formik.handleChange}
							value={formik.values.first_name}
						/>
					</div>

					<div className="form-group mb-3 block w-full">
						{t('GymPoolUsesCookiesForFurtherDetailsPleaseReadOur')}&nbsp;
						<Link href={`/${lng}/privacy-policy`} target="_blank" className="text-gympoolBlue">
							{t('privacyPolicy')}
						</Link>
					</div>

					<div className="button-box">
						<Button type="submit" disabled={!formik.isValid}>
							{t('submit')}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

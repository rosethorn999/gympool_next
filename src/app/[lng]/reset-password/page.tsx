'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import { useTranslation } from '@/app/i18n/client';

export default function Page({ params: { lng }, searchParams }: any) {
	const { t } = useTranslation(lng, 'forget-password');
	const router = useRouter();
	const tokenInSearchParams = searchParams.token || '';
	const validate = (values: any) => {
		const errors: any = {};

		if (!values.password) {
			errors.password = 'Required';
		} else if (values.password.length < 8) {
			errors.password = 'Too short';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validate,
		onSubmit: (values) => {
			resetPassword(values);
		},
	});
	async function resetPassword(values: any) {
		try {
			const url = '/auth/reset-password';
			const payload = {
				token: tokenInSearchParams,
				...values,
			};
			const req = await basicRequest.post(url, payload);
			const title = t(req.status.toString());
			const msg = t('Success');
			await Swal.fire(title, msg, 'success');

			router.push(`/${lng}/login`);
		} catch (error: any) {
			const title = error.response?.status.toString();
			let msg = error.response?.data?.detail;
			Swal.fire(title, msg, 'error');
			console.error(error);
		}
	}
	return (
		<div className="RequestResetPassword h-full w-full py-12 text-center md:px-5">
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
				<p>{t('enterANewPassword')}</p>
				<div className="form-group mx-auto mb-14">
					<TextBox
						name="password"
						extraClass={`text-box mx-auto my-0 h-10 w-1/3 min-w-[250px] rounded-3xl border border-whisper p-5 leading-10`}
						isInvalid={'password' in formik.errors}
						placeholder={t('Password')}
						onChange={formik.handleChange}
						value={formik.values.password}
						type="password"
					/>
				</div>
				<div className="button-box">
					<Button onClick={() => router.back()} color="pink">
						{t('Back')}
					</Button>
					&nbsp;
					<Button type="submit" disabled={!formik.isValid}>
						{t('Submit')}
					</Button>
				</div>
			</form>
		</div>
	);
}

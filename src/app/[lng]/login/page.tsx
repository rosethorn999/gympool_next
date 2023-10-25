'use client';
import Swal from 'sweetalert2';
import basicRequest, { getUserMe } from '../../apis/api';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';
import { User } from '@/app/types/type';

export default function Page({ params: { lng } }: any) {
	const { t } = useTranslation(lng, 'login');
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
	const router = useRouter();
	const validate = (values: any) => {
		const errors: any = {};

		if (!values.username) {
			errors.username = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
			errors.username = 'Invalid username address';
		}
		if (!values.password) {
			errors.password = 'Required';
		} else if (!/^.{8,}$/.test(values.password)) {
			errors.password = 'Invalid password';
		}

		return errors;
	};
	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			clickLogin(values);
		},
	});
	async function clickLogin(values: any) {
		setSubmitButtonDisabled(true);

		try {
			const url = '/auth/jwt/login';
			var bodyFormData = new FormData();
			bodyFormData.set('username', values.username);
			bodyFormData.set('password', values.password);
			const req = await basicRequest.post(url, bodyFormData);

			const { access_token, token_type } = req.data;
			const token = `${token_type} ${access_token}`;
			Cookies.set('token', token);

			const user: User = await getUserMe();
			Cookies.set('user_id', user.id);

			router.refresh(); // To make header bar status change
			router.push(`/${lng}/`);
		} catch (error: any) {
			const title = error.response?.status.toString();
			let msg = error.response?.data?.detail;
			const isNotVerified =
				error.response?.status === 400 &&
				error.response?.data?.detail === 'LOGIN_USER_NOT_VERIFIED';
			if (isNotVerified) {
				msg = t('LOGIN_USER_NOT_VERIFIED');
				await Swal.fire(title, msg, 'error');
				router.push(`/${lng}/verify`);
			} else {
				Swal.fire(title, msg, 'error');
			}
		} finally {
			setSubmitButtonDisabled(false);
		}
	}
	const oAuth2Login = async (provider: string) => {
		setSubmitButtonDisabled(true);

		try {
			const url = `/auth/${provider}/authorize`;
			const req = await basicRequest.get(url);

			const { authorization_url } = req.data;
			location.href = authorization_url;
		} catch (error: any) {
			const title = error.response?.status.toString();
			let msg = error.response?.data?.detail;
			Swal.fire(title, msg, 'error');
		} finally {
			setSubmitButtonDisabled(false);
		}
	};

	return (
		<div className="login h-full w-full py-12 text-center md:px-5">
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
				<h1>{t('loginViaEmail')}</h1>
				<div className="form-group mx-auto">
					<TextBox
						name="username"
						placeholder={t('email')}
						onChange={formik.handleChange}
						value={formik.values.username}
						isInvalid={'username' in formik.errors}
					/>
				</div>
				<div className="form-group mx-auto">
					<TextBox
						name="password"
						placeholder={t('password')}
						type="password"
						onChange={formik.handleChange}
						value={formik.values.password}
						isInvalid={'password' in formik.errors}
					/>
				</div>
				<div className="form-group">
					<Link className="text-gympoolBlue" href={`/${lng}/forget-password`}>
						{t('forgetPassword')}?
					</Link>
				</div>
				<div className="button-box">
					<Button type="submit" disabled={!formik.isValid || submitButtonDisabled}>
						{t('submit')}
					</Button>
				</div>
			</form>
			<h4 className="spreader mb-5 mt-2 w-full border-b pt-12 leading-[0.1em]">
				<span className="bg-whiteSmoke px-2">{t('OR')}</span>
			</h4>

			<div className="button-box mx-auto flex w-1/4 flex-col gap-4">
				<Button onClick={() => oAuth2Login('facebook')} disabled={submitButtonDisabled}>
					{t('SignInWithFacebook')}
				</Button>
				<Button onClick={() => oAuth2Login('google')} disabled={submitButtonDisabled} color="red">
					{t('SignInWithGoogle')}
				</Button>
			</div>
		</div>
	);
}

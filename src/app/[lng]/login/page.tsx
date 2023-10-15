'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { SetSpinnerOpen, SetSpinnerClose } from '../components/Spinner';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/client';

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
		SetSpinnerOpen();
		setSubmitButtonDisabled(true);
		const url = '/auth/jwt/login';
		try {
			var bodyFormData = new FormData();
			bodyFormData.set('username', values.username);
			bodyFormData.set('password', values.password);
			const req = await basicRequest.post(url, bodyFormData);
			SetSpinnerClose();
			const { access_token, token_type } = req.data;
			const token = `${token_type} ${access_token}`;
			Cookies.set('token', token);

			const { data: user } = await basicRequest.get('/users/me');
			await Swal.fire(`Hi ${user.first_name}`, '歡迎回來', 'success');
			Cookies.set('user_id', user.id);

			router.refresh(); // To make header bar status change
			router.push(`/${lng}/`);
		} catch (error: any) {
			SetSpinnerClose();
			setSubmitButtonDisabled(false);

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
		}
	}
	function social_register(values: any) {
		SetSpinnerOpen();

		const url = '/user/';
		basicRequest
			.post(url, values)
			.then(() => {
				clickLogin(values);
			})
			.catch(function (error: any) {
				if (error.response.status === 400) {
					let msg = error.response.data;
					const isAccountExist = msg.email?.some(
						(o: string) => o === 'user with this email already exists.'
					);
					if (isAccountExist) {
						clickLogin(values);
					}
				} else {
					let msgs: any = [];
					const title = error.response.status.toString();
					if (msgs.length > 0) {
						Swal.fire(title, msgs.join('<br>'), 'error');
					} else {
						Swal.fire(title, JSON.stringify(error.response.data), 'error');
					}
					console.error(error);
				}
			})
			.finally(() => {
				SetSpinnerClose();
			});
	}
	function fbLogin() {
		// TODO: TBD
		Swal.fire('TBD', 'TBD', 'error');
		// const payload = { auth_type: 'rerequest', scope: 'email,public_profile', return_scopes: true };
		// window.FB.login(function (loginResponse: any) {
		// 	if (loginResponse.status === 'connected') {
		// 		const { grantedScopes, accessToken } = loginResponse.authResponse;
		// 		if (grantedScopes.includes('email')) {
		// 			window.FB.api('/me', { fields: 'id,name,email' }, (apiResponse: any) => {
		// 				apiResponse['password'] = accessToken.substring(0, 12);
		// 				apiResponse['is_social_login'] = true;
		// 				apiResponse['username'] = apiResponse['id'];
		// 				apiResponse['first_name'] = apiResponse['name'];
		// 				apiResponse[''] = '';

		// 				social_register(apiResponse);
		// 			});
		// 		} else {
		// 			Swal.fire('權限不足', '請允許讀取Email資訊', 'error');
		// 		}
		// 	} else {
		// 		Swal.fire('權限不足', '請允許讀取臉書權限', 'error');
		// 	}
		// }, payload);
	}

	return (
		<div className="login h-full w-full py-12 text-center md:px-5">
			<form onSubmit={formik.handleSubmit}>
				<h1 className="mb-3">{t('loginViaEmail')}</h1>
				<div className="form-group mx-auto mb-3 block w-1/3">
					<TextBox
						name="username"
						placeholder={t('email')}
						onChange={formik.handleChange}
						extraClass={
							formik.errors.username
								? 'is-invalid border-bloodred focus:border-bloodredWith25Opacity'
								: ''
						}
						value={formik.values.username}
					/>
				</div>
				<div className="form-group mx-auto mb-3 block w-1/3">
					<TextBox
						name="password"
						placeholder={t('password')}
						type="password"
						onChange={formik.handleChange}
						extraClass={
							formik.errors.password
								? 'is-invalid border-bloodred focus:border-bloodredWith25Opacity'
								: ''
						}
						value={formik.values.password}
					/>
				</div>
				<div className="form-group mb-3 block w-full">
					<Link href={`/${lng}/forget-password`}>{t('forgetPassword')}?</Link>
				</div>
				<div className="button-box mt-12">
					<Button type="submit" disabled={!formik.isValid || submitButtonDisabled}>
						{t('submit')}
					</Button>
				</div>
			</form>
			<h4 className="spreader mb-5 mt-2 w-full border-b pt-12 leading-[0.1em]">
				<span className="bg-whiteSmoke px-2">{t('or')}</span>
			</h4>
			<div className="button-box">
				<Button onClick={fbLogin}>{t('loginViaFB')}</Button>
			</div>
		</div>
	);
}

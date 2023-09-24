'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { SetSpinnerOpen, SetSpinnerClose } from '../components/Spinner';
// import { HashRouter as Router, Link, useHistory } from 'react-router-dom';
import { redirect, useRouter } from 'next/navigation';

// import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
// import { login } from '../store/user';
import Link from 'next/link';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { useTranslation } from '@/app/i18n/client';

function Page({ params: { lng } }: any) {
	const { t } = useTranslation(lng, 'invitation');
	const router = useRouter();
	// const dispatch = useDispatch();
	// const history = useHistory();

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
			requestInvitation(values);
		},
	});

	async function requestInvitation(values: any) {
		SetSpinnerOpen();

		try {
			let url = '/invitation/';
			const req = await basicRequest.post(url, values);
			await req;
			SetSpinnerClose();
			const confirm = await Swal.fire(
				'認證信已經寄出',
				`請至 ${values.email} 點擊信中連結`,
				'success'
			);

			router.push('/');
		} catch (error: any) {
			const title = error.response.status.toString();
			let msg = JSON.stringify(error.response.data);
			if (error.response.status === 400) {
				msg = error.response.data?.detail.replace(
					'had been registered as a user.',
					'已經註冊過了, 請登入'
				);
			}
			Swal.fire(title, msg, 'error');
			console.error(error);
		}
		SetSpinnerClose();
	}
	function fbLogin() {
		const payload = { auth_type: 'rerequest', scope: 'email,public_profile', return_scopes: true };
		window.FB.login(function (loginResponse: any) {
			if (loginResponse.status === 'connected') {
				const { grantedScopes, accessToken } = loginResponse.authResponse;
				if (grantedScopes.includes('email')) {
					window.FB.api('/me', { fields: 'id,name,email' }, (apiResponse: any) => {
						apiResponse['password'] = accessToken.substring(0, 12);
						apiResponse['is_social_login'] = true;
						apiResponse['username'] = apiResponse['id'];
						apiResponse['first_name'] = apiResponse['name'];
						apiResponse[''] = '';

						social_register(apiResponse);
					});
				} else {
					Swal.fire('權限不足', '請允許讀取Email資訊', 'error');
				}
			} else {
				Swal.fire('權限不足', '請允許讀取臉書權限', 'error');
			}
		}, payload);
	}

	function clickLogin(values: any) {
		SetSpinnerOpen();
		basicRequest
			.post('/login/', values)
			.then(async (response) => {
				const token = 'jwt ' + response.data.token;
				const user = response.data.user;
				await Swal.fire(`Hi ${user.first_name}`, '歡迎回來', 'success');
				redirect('/');
			})
			.catch(function (error) {
				const title = error.response.status.toString();
				let msg = JSON.stringify(error.response.data);
				if (error.response.status === 400) {
					msg = error.response.data.non_field_errors?.[0].replace(
						'Unable to log in with provided credentials.',
						'無法使用此帳號密碼登入'
					);
				}
				Swal.fire(title, msg, 'error');
				console.error(error);
			})
			.finally(() => {
				SetSpinnerClose();
			});
	}
	function social_register(values: any) {
		SetSpinnerOpen();

		const url = '/user/';
		basicRequest
			.post(url, values)
			.then(() => {
				clickLogin(values);
			})
			.catch(function (error) {
				if (error.response.status === 400) {
					let msg = error.response.data;
					const isAccountExist = msg.email?.some(
						(o: string) => o === 'user with this email already exists.'
					);
					if (isAccountExist) {
						clickLogin(values);
					}
				} else {
					let msgs: any[] = [];
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

	return (
		<div className="invitation container h-full w-full text-center md:px-5 md:py-12">
			<form onSubmit={formik.handleSubmit}>
				<h1 className="mb-3">{t('registerViaEmail')}</h1>
				<div className="form-group mb-3 block w-full">
					<TextBox
						name="email"
						placeholder={t('email')}
						onChange={formik.handleChange}
						extraclass={
							formik.errors.email
								? 'is-invalid border-bloodred focus:border-bloodredWith25Opacity'
								: ''
						}
						value={formik.values.email}
					/>
				</div>
				<div className="form-group mb-3 block w-full">
					<span>{t('hadAccount')}?</span>
					<Link href={`/${lng}/login`} className="text-dodgerBlue">
						{t('loginHere')}
					</Link>
				</div>
				<div className="button-box mt-12">
					<Button type="submit" disabled={!formik.isValid}>
						{t('submit')}
					</Button>
				</div>
			</form>
			<h4 className="spreader mb-5 mt-2 w-full border-b pt-12 leading-[0.1em]">
				<span className="bg-whiteSmoke px-2">{t('or')}</span>
			</h4>

			<div className="button-box mt-12">
				<Button onClick={() => fbLogin()}>{t('loginViaFB')}</Button>
			</div>
		</div>
	);
}

export default Page;

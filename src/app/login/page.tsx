'use client';
// import '../scss/UserLogin.scss';
import Swal from 'sweetalert2';
import basicRequest from '../apis/api';
import { open, close } from '../components/Spinner';
// import { HashRouter as Router, Link, useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/user';
import { useFormik } from 'formik';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import TextBox from '../components/TextBox';
import Button from '../components/Button';

function Login() {
	// const dispatch = useDispatch();
	// const history = useHistory();
	const validate = (values: any) => {
		const errors: any = {};

		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
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
			email: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			clickLogin(values);
		},
	});
	function clickLogin(values: any) {
		open();
		basicRequest
			.post('/login/', values)
			.then((response: any) => {
				const token = 'jwt ' + response.data.token;
				const user = response.data.user;
				Swal.fire(`Hi ${user.first_name}`, '歡迎回來', 'success').then(() => {
					// dispatch(login({ token, user }));
					// history.push('/');
					redirect('/');
				});
			})
			.catch(function (error: any) {
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
				close();
			});
	}
	function social_register(values: any) {
		open();

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
				close();
			});
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

	return (
		<div className="login container h-full w-full py-12 text-center md:px-5">
			<form onSubmit={formik.handleSubmit}>
				<h1 className="mb-3">用電子郵件登入</h1>
				<div className="form-group mb-3 block w-full">
					<TextBox
						name="email"
						placeholder="電子信箱"
						onChange={formik.handleChange}
						extraClass={
							formik.errors.email
								? 'is-invalid border-bloodred focus:border-bloodredWith25Opacity'
								: ''
						}
						value={formik.values.email}
					/>
				</div>
				<div className="form-group mb-3 block w-full">
					<TextBox
						name="password"
						placeholder="密碼"
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
					{/* <Router> */}
					<p>
						<Link href="/forget-password">忘記密碼?</Link>
					</p>
					{/* </Router> */}
				</div>
				<div className="button-box mt-12">
					<Button type="submit" disabled={!formik.isValid}>
						送出
					</Button>
				</div>
			</form>
			<h4 className="spreader mb-5 mt-2 w-full border-b pt-12 leading-[0.1em]">
				<span className="bg-whiteSmoke px-2">OR</span>
			</h4>
			<div>
				<div className="button-box">
					<Button onClick={() => fbLogin()}>Facebook 登入</Button>
				</div>
			</div>
		</div>
	);
}

export default Login;

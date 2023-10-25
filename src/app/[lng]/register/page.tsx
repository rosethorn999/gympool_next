'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { useFormik } from 'formik';
import Button from '../components/Button';
import TextBox from '../components/TextBox';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { useState } from 'react';
import { RegisterUser } from '@/app/types/type';

export default function Page({ params: { lng } }: any) {
	const { t } = useTranslation(lng, 'register');
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
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
	const initialValues: RegisterUser = {
		email: '',
		password: '',
		first_name: '',
		last_name: '',
	};
	const formik = useFormik({
		initialValues,
		validate,
		onSubmit: (values) => {
			createUser(values);
		},
	});

	async function createUser(values: RegisterUser) {
		setSubmitButtonDisabled(true);

		try {
			const url = '/auth/register';
			const req = await basicRequest.post(url, values);
			const title = t('Success');
			const msg = `${values.email} ${t('afterLoginPromoteMsg')}.`;

			await Swal.fire(title, msg, 'success');
			router.push(`/${lng}/login`);
		} catch (error: any) {
			let msg = '';
			const statusCode: number = error.response.status;
			const commonMsg: any = {
				// 'This password is too common.': '密碼太過於常見',
				// 'This password is entirely numeric.': '密碼需由數字與英文組成',
				// 'invitation not exist.': '連結錯誤, 請重開邀請信中連結',

				REGISTER_USER_ALREADY_EXISTS: t('REGISTER_USER_ALREADY_EXISTS'),
			};
			if (statusCode === 400) {
				msg = error.response.data?.detail;
				if (typeof msg === 'string') {
					msg = msg in commonMsg ? commonMsg[msg] : msg;
				} else {
					msg = error.response.data?.detail?.reason;
					if (typeof msg === 'string') msg = t(msg);
				}
			} else {
				msg = JSON.stringify(error.response.data?.detail);
			}

			const title = statusCode.toString();
			Swal.fire(title, msg, 'error');
			console.error(error);
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
		<div className="Register h-full w-full py-12 text-center md:px-5">
			<h1 className="mb-3">{t('CompleteYourRegistrationByFillingOutTheFollowingInformation')}</h1>
			<form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
				<div className="form-group mx-auto">
					<TextBox
						name="email"
						isInvalid={'email' in formik.errors}
						placeholder={t('email')}
						onChange={formik.handleChange}
						value={formik.values.email}
					/>
				</div>
				<div className="form-group mx-auto">
					<TextBox
						name="password"
						type="password"
						isInvalid={'password' in formik.errors}
						placeholder={t('password')}
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
				</div>
				<div className="form-group mx-auto">
					<TextBox
						name="last_name"
						type="text"
						isInvalid={'last_name' in formik.errors}
						placeholder={t('lastName')}
						onChange={formik.handleChange}
						value={formik.values.last_name}
					/>
				</div>
				<div className="form-group mx-auto">
					<TextBox
						name="first_name"
						type="text"
						isInvalid={'first_name' in formik.errors}
						placeholder={t('firstName')}
						onChange={formik.handleChange}
						value={formik.values.first_name}
					/>
				</div>

				<div className="form-group w-full">
					{t('GymPoolUsesCookiesForFurtherDetailsPleaseReadOur')}&nbsp;
					<Link href={`/${lng}/privacy`} target="_blank" className="text-gympoolBlue">
						{t('privacyPolicy')}
					</Link>
					.
				</div>

				<div className="button-box">
					<Button type="submit" disabled={!formik.isValid}>
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

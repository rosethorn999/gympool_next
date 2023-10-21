'use client';
import Swal from 'sweetalert2';
import basicRequest from '../../apis/api';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '../components/Button';
import { useTranslation } from '@/app/i18n/client';
import { useEffect, useState } from 'react';
import TextBox from '../components/TextBox';

export default function Page({ params: { lng }, searchParams }: any) {
	const { t } = useTranslation(lng, 'verify');
	const router = useRouter();
	const [verifyResult, setVerifyResult] = useState('');
	const tokenInSearchParams = searchParams.token || '';

	useEffect(() => {
		const abortController = new AbortController();

		if (tokenInSearchParams !== '') {
			const url = '/auth/verify';
			const req = basicRequest
				.post(url, { token: tokenInSearchParams }, { signal: abortController.signal })
				.then(async (response) => {
					const title = response.status.toString();
					const msg = t('VERIFIED');
					setVerifyResult(msg);
					await Swal.fire(title, msg, 'success');
					router.push('/');
				})
				.catch(async (error: any) => {
					const title = error.response?.status.toString();
					const msg = t(error.response.data.detail);
					await Swal.fire(title, msg, 'error');
					setVerifyResult(msg);
				});
		}
		return () => abortController.abort();
	}, [tokenInSearchParams]);

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
			requestVerifyToken(values);
		},
	});
	async function requestVerifyToken(values: any) {
		try {
			const url = '/auth/request-verify-token';
			const req = await basicRequest.post(url, values);
			const title = t(req.status.toString());
			const msg = t('linkWillBeSentToYourMailbox');
			await Swal.fire(title, msg, 'success');

			router.push('/');
		} catch (error: any) {
			const title = error.response?.status.toString();
			let msg = error.response?.data?.detail;
			Swal.fire(title, msg, 'error');
			console.error(error);
		}
	}
	return (
		<div className="verify text-center">
			{tokenInSearchParams === '' ? (
				<form onSubmit={formik.handleSubmit}>
					<p>{t('linkWillBeSentToYourMailbox')}</p>
					<div className="form-group mb-14 block">
						<TextBox
							name="email"
							extraClass={`text-box mx-auto my-0 h-10 w-1/3 min-w-[250px] rounded-3xl border border-whisper p-5 leading-10`}
							isInvalid={'email' in formik.errors}
							placeholder={t('email')}
							onChange={formik.handleChange}
							value={formik.values.email}
						/>
					</div>
					<div className="button-box">
						<Button color="pink">
							<Link href="/">{t('Back')}</Link>
						</Button>
						&nbsp;
						<Button type="submit" disabled={!formik.isValid}>
							{t('Submit')}
						</Button>
					</div>
				</form>
			) : (
				<>
					<h1>{verifyResult}</h1>
					<div className="button-box">
						<Button>
							<Link href="/">{t('backToHome')}</Link>
						</Button>
					</div>
				</>
			)}
		</div>
	);
}

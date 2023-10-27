'use client';

import Swal from 'sweetalert2';
import basicRequest, { getUserMe } from '../../../apis/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { User } from '@/app/types/type';
import { useTranslation } from '@/app/i18n/client';

export default function Page({ params: { lng }, searchParams }: any) {
	const { t } = useTranslation(lng, 'register');
	const { code, code_verifier, state, error } = searchParams;
	const router = useRouter();

	useEffect(() => {
		const oauth2Login = async ([callbackAbortCtrl, getMeAbortCtrl]: AbortController[]) => {
			try {
				let url = '/auth/google/callback';
				const queries = [];
				if (code) queries.push(`code=${code}`);
				if (code_verifier) queries.push(`code_verifier=${code_verifier}`);
				if (state) queries.push(`state=${state}`);
				if (error) queries.push(`error=${error}`);
				if (queries.length > 0) url = `${url}?${queries.join('&')}`;
				const req = await basicRequest.get(url, { signal: callbackAbortCtrl.signal });

				const { access_token, token_type } = req.data;
				const token = `${token_type} ${access_token}`;
				Cookies.set('token', token);

				const user: User = await getUserMe(getMeAbortCtrl);
				// TODO: user.first_name is null, backend should do a user update from google
				// example: curl -X GET "https://www.googleapis.com/oauth2/v1/userinfo?alt=json" -H "Authorization: Bearer ya2....0169"
				Cookies.set('user_id', user.id);

				if (!user.is_verified) {
					const title = t('Success');
					const msg = `${user.email} ${t('afterLoginPromoteMsg')}.`;
					await Swal.fire(title, msg, 'success');
				}
				router.refresh(); // To make header bar status change
				router.push(`/${lng}/`);
			} catch (error: any) {
				if (!(callbackAbortCtrl.signal.aborted || getMeAbortCtrl.signal.aborted)) {
					const title = error.response?.status.toString();
					let msg = error.response?.data?.detail;
					Swal.fire(title, msg, 'error');
				}
			}
		};

		const abortControllers = [new AbortController(), new AbortController()];
		oauth2Login(abortControllers);

		return () => {
			abortControllers.forEach((c) => c.abort());
		};
	}, []);

	return (
		<div className="login h-full w-full py-12 text-center">
			<h1>{t('Redirecting')}</h1>
			<Link className="text-gympoolBlue" href={`/${lng}/login`}>
				{t('somethingWrongBackToLogin')}
			</Link>
		</div>
	);
}

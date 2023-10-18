'use client';

import { useFormik } from 'formik';
import basicRequest, { getUserMe } from '@/app/apis/api';
import Swal from 'sweetalert2';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';
import Button from '../../components/Button';
import TextBox from '../../components/TextBox';
import selections from '../../../../../public/selections.json';
import zipCode from '../../../../../public/twZipCode.json';
import { useEffect, useState } from 'react';
import DatePick from '../../components/DatePick';
import { User } from '@/app/type/type';

export default function Page({ params: { lng }, searchParams }: any) {
	const { t } = useTranslation(lng, 'setting');
	const router = useRouter();
	const selection = {
		gym_types: selections[0].list,
		features: selections[1].list,
		zipCode,
	};
	const [districts, setDistricts] = useState<any[]>([]);

	function loadDistrictList(county: string) {
		let ret: any[] = [];
		let selectedDistricts = selection.zipCode.filter((item) => {
			return item.name === county;
		});

		if (selectedDistricts.length > 0) {
			ret = selectedDistricts[0].districts;
		}
		setDistricts(ret);
	}
	const validate = (values: any) => {
		const errors: any = {};

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
			first_name: '',
			last_name: '',
			county: '',
			district: '',
			birth_date: '',

			mobile: '',
			facebook_id: '',
			line_id: '',

			modify_time: '',
			create_time: '',
		},
		validate,
		onSubmit: (values) => {
			updateUser(values);
		},
	});

	useEffect(() => {
		const loadContract = async (abortController: AbortController) => {
			const results: User = await getUserMe(abortController);
			if (results) {
				formik.setValues(results);
				const county = results.county;
				loadDistrictList(county);
			}
		};
		const abortController = new AbortController();
		loadContract(abortController);
		return () => abortController.abort();
	}, []);

	async function updateUser(values: any) {
		try {
			const url = '/users/me';
			const req = await basicRequest.patch(url, values);
			const msg = `${values.email} 修改完成`;
			await Swal.fire('完成', msg, 'success');
			router.refresh();
		} catch (error: any) {
			let msg = '';
			const statusCode: number = error.response.status;

			if (statusCode === 400) {
				msg = error.response.data?.detail?.reason;
				if (typeof msg === 'string') msg = t(msg);
			} else {
				msg = JSON.stringify(error.response.data?.detail);
			}

			const title = statusCode.toString();
			Swal.fire(title, msg, 'error');
			console.error(error);
		}
	}

	return (
		<form onSubmit={formik.handleSubmit}>
			<div>
				<h1 className="my-4 font-bold leading-8">{t('MemberInfo')}</h1>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('email')}</label>
					<div className="control-box w-full md:w-3/4">
						<span className="leading-10">{formik.values.email}</span>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('first_name')}</label>
					<div className="control-box w-full md:w-3/4">
						<TextBox
							name="first_name"
							placeholder={t('first_name')}
							onChange={formik.handleChange}
							isInvalid={'first_name' in formik.errors}
							value={formik.values.first_name}
						/>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('last_name')}</label>
					<div className="control-box w-full md:w-3/4">
						<TextBox
							name="last_name"
							placeholder={t('last_name')}
							onChange={formik.handleChange}
							isInvalid={'last_name' in formik.errors}
							value={formik.values.last_name}
						/>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('county')}</label>
					<div className="control-box flex w-full md:w-3/4">
						<select
							name="county"
							value={formik.values.county}
							onChange={(e) => {
								const county = e.target.value;
								loadDistrictList(county);

								formik.setFieldValue('county', county);
							}}
							className="mr-2 w-1/2 rounded-3xl border-2 border-whisper bg-white p-2 text-center"
						>
							<option value="null" disabled>
								{t('County')}
							</option>
							{selection.zipCode.map((o) => (
								<option key={o.name}>{o.name}</option>
							))}
						</select>
						<select
							name="district"
							value={formik.values.district}
							onChange={formik.handleChange}
							className="w-1/2 rounded-3xl border-2 border-whisper bg-white p-2 text-center"
						>
							<option value="null" disabled>
								{t('District')}
							</option>
							{districts.map((district) => {
								return (
									<option key={district.zip} value={district.name}>
										{district.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('birth_date')}</label>
					<div className="control-box w-full md:w-3/4">
						<DatePick
							lng={lng}
							// name="birth_date"
							isFullYYYY={true}
							initValue={formik.values.birth_date}
							handleDateChange={(v: string) => {
								formik.setFieldValue('birth_date', v);
							}}
						/>
					</div>
				</div>
			</div>
			<div>
				<h1 className="my-4 font-bold leading-8">{t('Contact')}</h1>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('facebook_id')}</label>
					<div className="control-box w-full md:w-3/4">
						<TextBox
							name="facebook_id"
							placeholder={t('facebook_id')}
							onChange={formik.handleChange}
							isInvalid={'facebook_id' in formik.errors}
							value={formik.values.facebook_id}
						/>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('line_id')}</label>
					<div className="control-box w-full md:w-3/4">
						<TextBox
							name="line_id"
							placeholder={t('line_id')}
							onChange={formik.handleChange}
							isInvalid={'line_id' in formik.errors}
							value={formik.values.line_id}
						/>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('mobile')}</label>
					<div className="control-box w-full md:w-3/4">
						<TextBox
							name="mobile"
							placeholder={t('mobile')}
							onChange={formik.handleChange}
							isInvalid={'mobile' in formik.errors}
							value={formik.values.mobile}
						/>
					</div>
				</div>
			</div>
			<div>
				<h1 className="my-4 font-semibold leading-8">{t('Security')}</h1>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('create_time')}</label>
					<div className="control-box w-full md:w-3/4">
						<span className="leading-10">{formik.values.create_time.slice(0, 19)}</span>
					</div>
				</div>
				<div className="form-group flex flex-wrap py-1">
					<label className="w-full leading-10 md:w-1/4">{t('modify_time')}</label>
					<div className="control-box w-full md:w-3/4">
						<span className="leading-10">{formik.values.modify_time.slice(0, 19)}</span>
					</div>
				</div>
				{/* TODO: last_login_time */}
				{/* <div className="form-group">
					<label>上次登入時間</label>
					<div className="control-box">
						<div className="control-box">
							<input
								type="text"
								name="last_login"
								value={formik.values.last_login_time}
								onChange={formik.handleChange}
								disabled
							/>
						</div>
					</div>
				</div> */}
			</div>
			<div className="button-box mt-4 text-right">
				<Button type="submit" disabled={!formik.isValid}>
					{t('Update')}
				</Button>
			</div>
		</form>
	);
}

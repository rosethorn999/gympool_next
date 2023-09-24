'use client';

import { HeaderBase } from './HeaderBase';
import { useTranslation } from '../../../i18n/client';

export const HeaderBar = ({ lng }) => {
	const { t } = useTranslation(lng, 'header-bar');
	return <HeaderBase t={t} lng={lng} />;
};

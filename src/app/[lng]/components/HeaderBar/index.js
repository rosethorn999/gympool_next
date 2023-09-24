import { useTranslation } from '../../../i18n';
import { HeaderBase } from './HeaderBase';

export const HeaderBar = async ({ lng }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'footer');
	return <HeaderBase t={t} lng={lng} />;
};

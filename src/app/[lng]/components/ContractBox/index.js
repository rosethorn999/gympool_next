import { useTranslation } from '../../../i18n';
import { ContractBase } from './ContractBase';

export const ContractBox = async ({ lng, fitXs = false, r }) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'contracts');
	return <ContractBase t={t} r={r} fitXs={fitXs} />;
};

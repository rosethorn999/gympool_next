'use client';
import { ContractBase } from './ContractBase';
import { useTranslation } from '../../../i18n/client';

const ContractBox = ({ lng, fitXs = false, r }) => {
	const { t } = useTranslation(lng, 'contracts');
	return <ContractBase t={t} r={r} fitXs={fitXs} />;
};
export default ContractBox;

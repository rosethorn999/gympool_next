import { useTranslation } from '../../../i18n';
import { ContractBase } from './ContractBase';
import { Contract } from '@/app/types/type';

async function ContractBox({
	lng,
	fitXs = false,
	r,
}: {
	lng: string;
	fitXs?: boolean;
	r: Contract;
}) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'contracts');

	return <ContractBase t={t} r={r} fitXs={fitXs} />;
}
export default ContractBox;

import { getUsersSimple, getUserSimple } from '@/app/apis/api';
import { useTranslation } from '@/app/i18n';
import { Pagination, User } from '@/app/types/type';

export async function generateStaticParams() {
	const { results: users }: Pagination<User> = await getUsersSimple();
	const ids = users.map((o) => {
		return { id: o.id.toString() };
	});
	return ids;
}
export default async function Page({ params: { lng, id: userId } }: any) {
	// TODO: TBD
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = await useTranslation(lng, 'contracts');
	const user: User = await getUserSimple(userId);
	const {
		email,
		first_name,
		last_name,
		mobile,
		facebook_id,
		line_id,
		county,
		district,
		create_time,
		last_login,
	} = user;
	return (
		<>
			<h1 className="text-2xl font-bold">{first_name}</h1>
			<ul>
				<li>who lived in {county}</li>
				<li>joined since {create_time}</li>
				<li>last login at {last_login}</li>
			</ul>
		</>
	);
}

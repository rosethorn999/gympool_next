import { getUser, getUsers } from '@/app/apis/api';
import { useTranslation } from '@/app/i18n';
import { Pagination, User } from '@/app/type/type';

export async function generateStaticParams() {
	const { results: users }: Pagination<User> = await getUsers();
	const ids = users.map((o) => {
		return { id: o.id.toString() };
	});
	return ids;
}
export default async function Page({ params: { lng, id: userId } }: any) {
	// TODO: TBD
	// // eslint-disable-next-line react-hooks/rules-of-hooks
	// const { t } = await useTranslation(lng, 'contracts');
	// const user = await getUser(userId);
	// const currency = 'NTD';
	// const {
	// 	email,
	// 	is_active,
	// 	is_superuser,
	// 	is_verified,
	// 	first_name,
	// 	last_name,
	// 	facebook_id,
	// 	line_id,
	// 	county,
	// 	district,
	// 	modify_time,
	// 	birth_date,
	// 	mobile,
	// 	create_time,
	// }: User = user;
	return <h1>hello user {userId}</h1>;
	// return (
	// 	<h1>
	// 		A user {first_name} come from {county}, joined {create_time}
	// 	</h1>
	// );
}

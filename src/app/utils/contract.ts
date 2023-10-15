function calcProductLife(expiry_date: string, t: Function) {
	let ret = '';

	let now = new Date();
	let nowYYYY = now.getFullYear();
	let nowMM = now.getMonth() + 1;

	let expiryArr: string[] | number[] = expiry_date.split('-');
	expiryArr = expiryArr.map(function (item) {
		return Number(item);
	});
	let YYYY = expiryArr[0];
	let MM = expiryArr[1];
	if (YYYY === -1 || MM === -1) {
		ret = t('invalid');
	} else if (nowYYYY > YYYY) {
		ret = t('expired');
	} else if (nowYYYY === YYYY && nowMM >= MM) {
		ret = t('expired');
	} else {
		ret = '~';
		let life = MM - nowMM < 0 ? 12 - nowMM + MM : MM - nowMM;
		if (YYYY > nowYYYY) {
			let gap = MM - nowMM < 0 ? -1 : 0;
			if (YYYY - nowYYYY + gap !== 0) {
				ret += YYYY - nowYYYY + gap + 'Y';
			}
		}
		ret = `${ret}${life.toFixed()}M`;
	}

	return ret;
}
const maxCharacters = (v: string, num: number = 30) => {
	if (v && v.length > num - 3) {
		return v.substring(0, num - 3) + '...';
	}
	return v;
};
export { calcProductLife, maxCharacters };

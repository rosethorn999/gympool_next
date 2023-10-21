import Link from 'next/link';

function PrivacyPolicy() {
	return (
		<>
			<h1>PrivacyPolicy</h1>
			This site is protected by reCAPTCHA and the Google
			<Link href="https://policies.google.com/privacy" className="text-mayaBlue underline">
				Privacy Policy
			</Link>{' '}
			and
			<Link href="https://policies.google.com/terms" className="text-mayaBlue underline">
				Terms of Service
			</Link>{' '}
			apply.
		</>
	);
}

export default PrivacyPolicy;

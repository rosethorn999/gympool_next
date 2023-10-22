import Link from 'next/link';

export default function Page() {
	return (
		<div>
			<h1 className="mb-4 text-xl font-bold">Privacy Policy for Gympool-STG</h1>

			<p>
				Gympool-STG is committed to protecting your privacy. This Privacy Policy explains how we
				collect, use, and share your personal information when you use our website and services.
			</p>

			<h2 className="text-lg font-bold">Personal Information We Collect</h2>

			<p>We collect personal information from you when you:</p>

			<ul>
				<li>Create an account on our website</li>
				<li>Sign up for our newsletter</li>
				<li>Contact us for support</li>
				<li>Use our website or services</li>
			</ul>

			<p>
				The personal information we collect may include your name, email address, phone number, and
				IP address.
			</p>

			<h2 className="text-lg font-bold">How We Use Your Personal Information</h2>

			<p>We use your personal information to:</p>

			<ul className="list-inside list-disc">
				<li>Provide you with our services</li>
				<li>Send you marketing communications</li>
				<li>Respond to your inquiries and provide support</li>
				<li>Improve our website and services</li>
			</ul>

			<h2 className="text-lg font-bold">How We Share Your Personal Information</h2>

			<p>
				We do not share your personal information with third parties for their own marketing
				purposes. We may share your personal information with third parties who provide services to
				us, such as web hosting and email marketing providers. These third parties are required to
				keep your personal information confidential and secure.
			</p>

			<h2 className="text-lg font-bold">Your Privacy Choices</h2>

			<p>
				You have the right to access, correct, or delete your personal information. You also have
				the right to opt out of receiving marketing communications from us.
			</p>

			<p>To exercise your privacy choices, please contact us at admin@nodm.app</p>

			<h2 className="text-lg font-bold">Data Retention</h2>

			<p>
				We retain your personal information for as long as it is necessary to provide you with our
				services or to comply with our legal obligations.
			</p>

			<h2 className="text-lg font-bold">Security</h2>

			<p>
				We take all reasonable steps to protect your personal information from unauthorized access,
				use, or disclosure. We use industry-standard security measures, such as encryption and
				firewalls, to protect your personal information.
			</p>

			<h2 className="text-lg font-bold">Changes to This Privacy Policy</h2>

			<p>
				We may update this Privacy Policy from time to time. If we make any material changes to this
				Privacy Policy, we will notify you by email or by posting a notice on our website.
			</p>

			<h2 className="text-lg font-bold">Contact Us</h2>

			<p>
				If you have any questions about this Privacy Policy, please contact us at admin@nodm.app
			</p>
			<hr></hr>
			<h2 className="text-lg font-bold">This site is protected by reCAPTCHA and the Google</h2>
			<p>
				<Link href="https://policies.google.com/privacy" className="text-mayaBlue underline">
					Privacy Policy
				</Link>{' '}
				and
				<Link href="https://policies.google.com/terms" className="text-mayaBlue underline">
					Terms of Service
				</Link>{' '}
				apply.
			</p>
		</div>
	);
}

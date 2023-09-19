import Spinner from './components/Spinner';

export default function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<>
			<Spinner defaultState={true} />
			<h1 className="text-red-700">Loading</h1>
			<h1 className="text-orange-700">Loading</h1>
			<h1 className="text-yellow-700">Loading</h1>
			<h1 className="text-green-700">Loading</h1>
			<h1 className="text-blue-700">Loading</h1>
			<h1 className="text-cyan-700">Loading</h1>
			<h1 className="text-purple-700">Loading</h1>
		</>
	);
}

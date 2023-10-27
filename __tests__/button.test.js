import { render, screen } from '@testing-library/react';
import Button from '../src/app/[lng]/components/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
	it('renders a button contain child text', async () => {
		render(<Button>hello</Button>);
		const btn = await screen.getByTestId('button');
		expect(btn).toHaveTextContent('hello');
		expect(btn).toHaveClass('bg-dodgerBlue');
	});
	it('renders a disabled button', async () => {
		render(<Button disabled={true}>hello</Button>);
		const btn = await screen.getByTestId('button');
		expect(btn).toHaveAttribute('disabled');
		expect(btn).toHaveClass('bg-dodgerBlue disabled:cursor-not-allowed disabled:opacity-60');
	});
	it('renders a color button', async () => {
		render(<Button color="pink">hello</Button>);
		const btn = await screen.getByTestId('button');
		expect(btn).toHaveClass('bg-dodgerBlue bg-pink');
	});
	it('click a button', async () => {
		const foo = jest.fn();
		render(<Button onClick={foo}>hello</Button>);
		const btn = await screen.getByTestId('button');
		btn.click();
		expect(foo).toBeCalled();
		btn.click();
		expect(foo).toBeCalledTimes(2);
	});
});

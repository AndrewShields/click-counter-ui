import React from 'react';

export const ClickCounterUI: React.FunctionComponent = () => {
	const [clickCount, SetClickCount] = React.useState<number>(0);

	const handleClick = () => {
		SetClickCount(clickCount + 1);
	};

	return (
		<div className="click-counter-container">
			<button className="click-counter click-counter-ready" onClick={handleClick}>
				Click count (UI)<br></br>{clickCount}
			</button>
		</div>
	);
}

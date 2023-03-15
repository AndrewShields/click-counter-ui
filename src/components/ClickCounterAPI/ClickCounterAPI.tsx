import React from 'react';
import HttpClient from '../../api/HttpClient';
import { LoadingState } from '../../enums/Enums';

export interface IClickCounterAPIProps {
	name: string,
	endpoint: string
}

export const ClickCounterAPI: React.FunctionComponent<IClickCounterAPIProps> = (props: IClickCounterAPIProps) => {
	const [loadingState, SetLoadingState] = React.useState<LoadingState>(LoadingState.Loading);
	const [clickCount, SetClickCount] = React.useState<number>(getClickCount());

	function getClickCount(): number {
		new HttpClient().get({
			endpoint: props.endpoint,
			token: null,
			params: {}
		}).then((response: any) => {
			SetLoadingState(LoadingState.Ready);
			SetClickCount(response.data);
		}).catch(() => {
			SetLoadingState(LoadingState.Error);
		});

		return 0;
	}

	function handleClick(): void {
		new HttpClient().post({
			endpoint: props.endpoint,
			token: null,
			body: {
				data: clickCount + 1
			}
		}).then((response: any) => {
			SetLoadingState(LoadingState.Ready);
			SetClickCount(response.data);
		}).catch(() => {
			SetLoadingState(LoadingState.Error);
		});

		getClickCount();
	}

	function handleErrorClick(): void {
		SetLoadingState(LoadingState.Loading);
		getClickCount();
	}

	return (
		<div className="click-counter-container">
			{ loadingState === LoadingState.Loading ?
				<button className="click-counter click-counter-loading" disabled>Loading</button>
				:
				loadingState === LoadingState.Error ?
					<button className="click-counter click-counter-error" onClick={handleErrorClick}>
						Failed to connect to {props.name}
						<br></br><br></br>
						Click to retry
					</button>
					:
					<button className="click-counter click-counter-ready" onClick={handleClick}>
						Click count ({props.name})<br></br>{clickCount}
					</button>
			}
		</div>
	);
}

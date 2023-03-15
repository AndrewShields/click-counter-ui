import React from 'react';
import HttpClient from '../../api/HttpClient';
import { LoadingState } from '../../enums/Enums';

export const ClickCounterAPIAzure: React.FunctionComponent = () => {
	const [loadingState, SetLoadingState] = React.useState<LoadingState>(LoadingState.Loading);
	const [clickCount, SetClickCount] = React.useState<number>(getClickCount());

	function getClickCount(): number {
		new HttpClient().get({
			url: "/FnClickCounter",
			token: null,
			params: {}
		}).then((response: any) => {
			SetLoadingState(LoadingState.Ready);
			SetClickCount(response.data);
		}).catch(() => {
			SetLoadingState(LoadingState.Error);
		});

		return 0;
	};

	function handleClick(): void {
		new HttpClient().post({
			url: "/FnClickCounter",
			token: null,
			data: clickCount + 1
		}).then((response: any) => {
			SetLoadingState(LoadingState.Ready);
			SetClickCount(response.data);
		}).catch(() => {
			SetLoadingState(LoadingState.Error);
		});

		getClickCount();
	};

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
						Failed to connect to Azure database
						<br></br><br></br>
						Click to retry
					</button>
					:
					<button className="click-counter click-counter-ready" onClick={handleClick}>
						Click count (Azure DB)<br></br>{clickCount}
					</button>
			}
		</div>
	);
}

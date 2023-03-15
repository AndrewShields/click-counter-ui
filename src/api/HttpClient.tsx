import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export interface IHttpGETProps {
	url: string;
	token: any;
	params: any | any[];
}

export interface IHttpPOSTProps {
	url: string;
	token: any;
	data: any | any[];
}

export interface IHttpClient {
	get<T>(parameters: IHttpGETProps): Promise<T>;
}

//const BASE_URL = "https://localhost:7000/api/";
const BASE_URL = "https://fnappclickcounter.azurewebsites.net/api/";

export default class HttpClient implements IHttpClient {
	get<T>(parameters: IHttpGETProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {url, token, params } = parameters;

			const options: AxiosRequestConfig = {
				headers: token,
				params,
				withCredentials: false,
			}

			axios.get(BASE_URL + url, options)
				.then((response: any) => {
					resolve(response as T);
				}).catch((reason: any) => {
					console.error(reason);
					reject(reason);
				}
			);
		});
	}

	post<T>(parameters: IHttpPOSTProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {url, token, data } = parameters;

			const headers = { 'Content-Type': 'application/json' };

			const options: AxiosRequestConfig = {
				headers: headers /* token? */,
				withCredentials: false,
			}

			axios.post(BASE_URL + url, data, options)
				.then((response: any) => {
					resolve(response as T);
				}).catch((reason: any) => {
					console.error(reason);
					reject(reason);
				}
			);
		});
	}
}

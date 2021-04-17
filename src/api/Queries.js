import { config } from "../config";

const baseUrl = config.apiBaseUrl;

export async function getHistoricStationsData() {
	const response = await fetch(`${baseUrl}`, {
		method: "GET"
	});
	console.log("responseresponseresponse", response);
	return await response;
}

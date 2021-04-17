import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

import Table from "../../sharedComponents/Table";
import LoadingOrError from "../../sharedComponents/LoadingOrError";

import HistoricStationsData from "./historic-stations.json";
import "./LandingPage.css";

export default function LandingPage(props) {
	const [mostHistoricStations, setMostHistoricStations] = useState(
		HistoricStationsData.slice(0, 10)
	);

	const loadData = () => {
		setMostHistoricStations(
			HistoricStationsData.slice(0, mostHistoricStations.length + 10)
		);
	};

	const tableHead = [
		[
			{
				style: {
					fontSize: "13px",
					padding: "16px 8px"
				},
				value: "System ID"
			},
			{
				style: {
					fontSize: "13px",
					padding: "16px 8px"
				},
				value: "Name"
			},
			{
				style: {
					fontSize: "13px",
					padding: "16px 8px"
				},
				value: "Location"
			},
			{
				style: {
					compress: true,
					fontSize: "13px",
					padding: "16px 8px"
				},
				value: "Country Code"
			},
			{
				style: {
					compress: true,
					fontSize: "13px",
					padding: "16px 8px"
				},
				value: "URL"
			}
		]
	];

	const tableRows = mostHistoricStations.map((v) => {
		return [
			{
				link: `/stations/${v.system_ID}`,
				style: {
					bold: true,
					button: true,
					hover: true,
					fontSize: "13px"
				},
				value: (
					<span>
						{v.system_ID || "--"}
						{v.system_ID && <StyledFaArrowRight />}
					</span>
				)
			},
			{
				style: {
					fontSize: "13px"
				},
				value: <span>{v.name || "-"}</span>
			},
			{
				style: {
					fontSize: "13px"
				},
				value: <span>{v.location || "-"}</span>
			},
			{
				style: {
					bold: true,
					fontSize: "13px"
				},
				value: <span>{v.country_code || "-"}</span>
			},
			{
				style: {
					fontSize: "13px"
				},
				value: <span>{v.URL || "-"}</span>
			}
		];
	});

	const tableStruct = {
		tableHead: tableHead,
		tableRows: tableRows
	};

	return (
		<MainContainer>
			{mostHistoricStations.length > 0 ? (
				<Table
					data={mostHistoricStations}
					loadData={loadData}
					maxSize={
						(HistoricStationsData && parseInt(HistoricStationsData.length)) || 0
					}
					table={tableStruct}
				/>
			) : (
				<LoadingContainer>
					<LoadingOrError
						loading={true}
						loadingMsg={"Fetching Most Historic Stations..."}
						err={false}
						errMsg={""}
					/>
				</LoadingContainer>
			)}
		</MainContainer>
	);
}

const MainContainer = styled.div`
	margin: 30px 0px;
`;

const LoadingContainer = styled.div`
	background-color: #ffffff;
	border: 1px solid #ececec;
	border-radius: 4px;
	display: flex;
	height: 100%;
	min-height: 400px;
	padding: 24px;
	justify-content: center;
	align-items: center;
`;
const StyledFaArrowRight = styled(FaArrowRight)`
	font-size: 10px;
	margin-left: 8px;
	margin-bottom: 2px;
`;

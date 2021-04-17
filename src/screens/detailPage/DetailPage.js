import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import HistoricStationsData from "../landingPage/historic-stations.json";

export default function DetailPage(props) {
	let { id } = useParams();

	const [stationInfo, setStationInfo] = useState({});

	useEffect(() => {
		if (Object.keys(stationInfo).length === 0) {
			const station = HistoricStationsData.filter(
				(station) => station.system_ID === id
			)[0];
			setStationInfo(station);
		}
	}, []);

	console.log("stationstationstation", stationInfo);

	return (
		<MainContainer>
			<Header>
				Station Detail Looking For:&nbsp;
				<SubHeader>{`${id || "###"}`}</SubHeader>
			</Header>
			<Wrapper>
				<DetailRowContainer>
					<DetailRow>
						<Label>Name</Label>
						{stationInfo?.name || "###"}
					</DetailRow>
				</DetailRowContainer>
				<DetailRowContainer>
					<DetailRow>
						<Label>Location</Label>
						{stationInfo?.location || "###"}
					</DetailRow>
				</DetailRowContainer>
				<DetailRowContainer>
					<DetailRow>
						<Label>Country Code</Label>
						{stationInfo?.country_code || "###"}
					</DetailRow>
				</DetailRowContainer>
				<DetailRowContainer>
					<DetailRow>
						<Label>URL</Label>
						<Link
							href={stationInfo?.URL}
							target="_blank"
							rel="noopener noreferrer"
						>
							{stationInfo?.URL || "###"}
						</Link>
					</DetailRow>
				</DetailRowContainer>
				<DetailRowContainer>
					<DetailRow>
						<Label>Auto-Discovery URL</Label>
						<Link
							href={stationInfo?.auto_discovery_URL}
							target="_blank"
							rel="noopener noreferrer"
						>
							{stationInfo?.auto_discovery_URL || "###"}
						</Link>
					</DetailRow>
				</DetailRowContainer>
			</Wrapper>
		</MainContainer>
	);
}

const MainContainer = styled.div`
	margin: 30px 0px;
`;

const Header = styled.h1`
	display: inline-flex;
	align-items: baseline;
`;
const SubHeader = styled.h2`
	color: red;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

const DetailRowContainer = styled.div`
	padding: 15px 10px;
	border-bottom: 1px solid #bdbdbd;
	&:first-child {
		border-top: 1px solid #bdbdbd;
	}
`;

const DetailRow = styled.div`
	margin: 0;
	font-size: 16px;
	color: #000;
`;

const Label = styled.span`
	font-weight: 600;
	max-width: 300px;
	width: 100%;
	display: inline-flex;
`;

const Link = styled.a`
	font-weight: 600;
	max-width: 300px;
	width: 100%;
	display: inline-flex;
`;

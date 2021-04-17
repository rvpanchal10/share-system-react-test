import React from "react";
import styled from "styled-components";
import { Dots } from "react-activity";

function LoadingOrError({ loading, loadingMsg, err, errMsg, style }) {
	if (loading) {
		return (
			<Container>
				<Title style={style}>{loadingMsg}</Title>
				<Dots />
			</Container>
		);
	} else if (err) {
		return (
			<Container>
				<Error>Error: {errMsg}</Error>
			</Container>
		);
	} else {
		return null;
	}
}

export default LoadingOrError;

const Container = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Colfax";
`;
const Title = styled.div`
	margin-right: 20px;
	font-size: 18px;
	@media (max-width: 768px) {
		font-size: 0.9em;
	}
`;
const Error = styled.div`
	font-size: 18px;
	color: red;
	@media (max-width: 768px) {
		font-size: 0.9em;
	}
`;

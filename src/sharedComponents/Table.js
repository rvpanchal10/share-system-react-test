import React from "react";
import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";

import LoadingOrError from "./LoadingOrError";

export default function Table(props) {
	const {
		customStyles,
		data,
		errorMore,
		loadData,
		loadingMore,
		maxSize,
		table,
		tableRef = null
	} = props;

	const [maxHeight, setMaxHeight] = React.useState(0);

	const ref = React.useRef(null);

	React.useEffect(() => {
		if (data && data.length > 0) {
			setMaxHeight(ref.current.clientHeight);
		}
	}, [data]);

	return (
		<MainContainer ref={ref}>
			{table && (
				<OverflowContainer ref={tableRef} maxHeight={maxHeight}>
					<TableContainer style={customStyles}>
						{table.tableHead
							? table.tableHead.map((v, i) => {
									return (
										<thead key={i}>
											<tr>
												{v.map((w, j) => {
													return (
														!w.disable && (
															<TableHeadCell
																colSpan={w.colSpan}
																key={j}
																style={w.style}
															>
																{w.style && w.style.button && (
																	<TableHeadCellButton
																		onClick={w.onClick}
																		style={w.style}
																	>
																		<TableHeadCellButtonText style={w.style}>
																			{w.value} <StyledIoMdArrowDropdown />
																		</TableHeadCellButtonText>
																	</TableHeadCellButton>
																)}

																{(!w.style || !w.style.button) && (
																	<TableHeadCellText style={w.style}>
																		{w.value}
																	</TableHeadCellText>
																)}
															</TableHeadCell>
														)
													);
												})}
											</tr>
										</thead>
									);
							  })
							: null}

						{table.tableRows ? (
							<tbody>
								{table.tableRows.map((v, i) => {
									return (
										<TableRow key={i}>
											{v.map((w, j) => {
												return (
													!w.disable && (
														<TableCell
															colSpan={w.colSpan}
															key={j}
															style={w.style}
														>
															{w.style && w.style.button && (
																<span>
																	{w.link ? (
																		<StyledLink
																			style={w.style}
																			to={w.link ?? "#"}
																		>
																			<TableCellButton
																				onClick={w.onClick}
																				style={w.style}
																			>
																				<Circle circle={w.circle}>
																					<TableCellButtonTextContainer
																						style={w.style}
																					>
																						<TableCellButtonText
																							style={w.style}
																						>
																							{w.value}
																						</TableCellButtonText>
																					</TableCellButtonTextContainer>
																				</Circle>
																			</TableCellButton>
																		</StyledLink>
																	) : (
																		<TableCellButton
																			onClick={w.onClick}
																			style={w.style}
																		>
																			<Circle circle={w.circle}>
																				<TableCellButtonTextContainer
																					style={w.style}
																				>
																					<TableCellButtonText style={w.style}>
																						{w.value}
																					</TableCellButtonText>
																				</TableCellButtonTextContainer>
																			</Circle>
																		</TableCellButton>
																	)}
																</span>
															)}

															{(!w.style || !w.style.button) && (
																<TableCellTextContainer style={w.style}>
																	<Circle circle={w.circle}>
																		<TableCellText style={w.style}>
																			{w.value}
																		</TableCellText>
																	</Circle>
																</TableCellTextContainer>
															)}
														</TableCell>
													)
												);
											})}
										</TableRow>
									);
								})}
							</tbody>
						) : null}

						{data && maxSize && data.length < maxSize ? (
							<tbody>
								<TableRow>
									<TableCell colSpan="100" style={{ button: true }}>
										<LoadButton onClick={!loadingMore ? loadData : undefined}>
											{loadingMore ? (
												<>
													<LoadingOrError
														err={errorMore?.length > 0}
														errMsg={errorMore}
														loading={loadingMore}
														loadingMsg="Loading..."
														style={{ fontSize: "13px", fontWeight: "400" }}
													/>
												</>
											) : (
												<>
													Load More
													<StyledFiPlusCircle />
												</>
											)}
										</LoadButton>
									</TableCell>
								</TableRow>
							</tbody>
						) : null}
					</TableContainer>
				</OverflowContainer>
			)}
		</MainContainer>
	);
}

const Circle = styled.div`
	border: ${(props) => (props.circle ? "1px solid #000000" : "none")};
	border-radius: 16px;
	padding: ${(props) => (props.circle ? "6px" : "0")};
`;

const LoadButton = styled.button`
	background: #ffffff;
	border: none;
	color: #000000;
	font-family: Colfax;
	font-size: 13px;
	font-weight: 500;
	height: 40px;
	letter-spacing: -0.42px;
	line-height: 16px;
	padding: 0 8px;
	text-align: center;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	&:active {
		background-color: #fdfdfd;
		box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.04);
	}

	&:focus {
		outline: none;
	}
`;

const MainContainer = styled.div`
	display: grid;
`;

const OverflowContainer = styled.div`
	border: 1px solid #ececec;
	border-radius: 5px 5px 0 0;
	max-height: ${(props) => (props.maxHeight ? props.maxHeight + "px" : "none")};
	overflow: auto;
	&::-webkit-scrollbar {
		width: 14px;
		height: 14px;
	}
	&::-webkit-scrollbar-thumb {
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		-webkit-border-radius: 7px;
		background-color: #000000;
	}
	&::-webkit-scrollbar-button {
		width: 0;
		height: 0;
		display: none;
	}
`;

const StyledFiPlusCircle = styled(FiPlusCircle)`
	font-size: 14px;
	margin-left: 6px;
	margin-bottom: 2px;
`;

const StyledIoMdArrowDropdown = styled(IoMdArrowDropdown)`
	font-size: 14px;
`;

const StyledLink = styled(Link)`
	padding: 0 !important;

	&:hover {
		text-decoration: none;
	}

	&:focus {
		outline: none;
	}
`;

const TableContainer = styled.table`
	background-color: #ffffff;
	border-collapse: separate;
	border-radius: 5px 5px 0 0;
	border-spacing: 0;
	border: ${(props) =>
		props.style && props.style.border ? props.style.border : "none"};
	border-top: none !important;
`;

const TableRow = styled.tr`
	&:hover {
		background-color: #d7d7d7;
	}
`;

const TableCell = styled.td`
	background-color: ${(props) =>
		props.style && props.style.bgColor
			? props.style.bgColor
			: props.style && props.style.gray
			? "#f5f5f5"
			: props.style && props.style.gray2
			? "#ececec"
			: "#ffffff"};
	border: ${(props) => (props.style && props.borderless ? "none" : "1px solid")}
		${(props) =>
			props.style && props.borderless
				? ""
				: props.style && props.borderColor
				? props.borderColor
				: props.style && props.style.gray2
				? "#d4d4d4"
				: "#ececec"};
	border-bottom: none;
	border-right: none;
	border-top: ${(props) =>
			props.style && (props.borderless || props.gray2) ? "none" : "1px solid"}
		${(props) =>
			props.style && (props.borderless || props.gray2)
				? ""
				: props.style && props.borderColor
				? props.borderColor
				: "#ececec"};
	line-height: 0;
	padding: ${(props) =>
		props.style && props.style.padding
			? props.style.padding
			: props.style && props.style.button
			? "0"
			: "0 16px"};
	text-align: ${(props) =>
		props.style && props.style.center ? "center" : "left"};

	&:first-child {
		border-left: none;
	}
`;

const TableCellButton = styled.button`
	background-color: ${(props) =>
		props.style && props.style.bgColor
			? props.style.bgColor
			: props.style && props.style.gray
			? "#f5f5f5"
			: props.style && props.style.gray2
			? "#ececec"
			: "#ffffff"};
	border: none;
	color: ${(props) =>
		props.style && props.style.blueText ? "#0029ff" : "#000000"};
	min-height: ${(props) =>
		props.style && props.style.vcompress ? "0" : "44px"};
	padding: 0 8px;
	text-align: ${(props) =>
		props.style && props.style.center ? "center" : "left"};
	width: 100%;

	&:active {
		background-color: #fdfdfd;
		box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.04);
	}

	&:focus {
		outline: none;
	}

	&:hover {
		color: ${(props) =>
			props.style && props.style.hover ? "#00d092" : "initial"};
	}
`;

const TableCellButtonText = styled.span`
	font-family: Colfax;
	font-size: ${(props) =>
		props.style && props.style.fontSize ? props.style.fontSize : "12px"};
	font-weight: ${(props) => (props.style && props.style.bold ? "500" : "400")};
	line-height: 14px;
	text-decoration: ${(props) =>
		props.style && props.style.underline ? "underline" : "none"};
	white-space: ${(props) =>
		props.style && props.style.wrap ? "normal" : "nowrap"};
`;

const TableCellButtonTextContainer = styled.div`
	padding: ${(props) => (props.style?.padding ? props.style.padding : "0 8px")};
`;

const TableCellText = styled.span`
	color: ${(props) =>
		props.style && props.style.blueText ? "#0029ff" : "#000000"};
	font-family: Colfax;
	font-size: ${(props) =>
		props.style && props.style.fontSize ? props.style.fontSize : "12px"};
	font-weight: ${(props) => (props.style && props.style.bold ? "500" : "400")};
	line-height: 14px;
	padding: 0 !important;
	text-decoration: ${(props) =>
		props.style && props.style.underline ? "underline" : "none"};
	white-space: ${(props) =>
		props.style && props.style.nowrap ? "nowrap" : "normal"};
`;

const TableCellTextContainer = styled.div`
	align-items: center;
	display: flex;
	min-height: ${(props) =>
		props.style && props.style.vcompress ? "0" : "44px"};
	padding: 0 !important;
	justify-content: ${(props) =>
		props.style && props.style.center ? "center" : "flex-start"};
`;

const TableHeadCell = styled.th`
	background-color: ${(props) =>
		props.style && props.style.bgcolor ? props.style.bgcolor : "#000000"};
	border-bottom: ${(props) =>
		props.style && (props.style.borderless || props.style.thin)
			? "none"
			: "1px solid #404040"};
	border-left: ${(props) =>
		props.style && props.style.borderless
			? "none"
			: props.style && props.style.thin
			? "1px solid #1a1a1a"
			: "1px solid #404040"};
	border-right: none;
	border-top: none;
	box-shadow: 0 1px 0 0 #d8d8d8;
	line-height: 0;
	padding: ${(props) =>
		props.style && props.style.padding
			? props.style.padding
			: props.style && props.style.button
			? "0"
			: props.style && props.style.thin
			? "4px 8px"
			: "8px 16px"};
	position: sticky;
	text-align: ${(props) =>
		props.style && (props.style.center || props.style.compress)
			? "center"
			: "left"};
	top: 0;
	width: ${(props) => (props.style && props.style.compress ? "0.01%" : "auto")};
	z-index: 10;

	&:first-child {
		border-left: none;
	}
`;

const TableHeadCellButton = styled.button`
	align-items: center;
	background: none;
	border: none;
	display: flex;
	flex-wrap: nowrap;
	justify-content: ${(props) =>
		props.style && (props.style.center || props.style.compress)
			? "center"
			: "flex-start"};
	padding: revert !important;
	width: 100%;

	&:focus {
		outline: none;
	}
`;

const TableHeadCellButtonText = styled.span`
	color: #ffffff;
	font-family: Colfax;
	font-size: ${(props) =>
		props.style && props.style.fontSize ? props.style.fontSize : "10px"};
	font-weight: 500;
	line-height: 14px;
	margin: 0 8px;
	padding: 0 !important;
	white-space: ${(props) =>
		props.style && props.style.wrap ? "normal" : "nowrap"};
`;

const TableHeadCellText = styled.span`
	color: #ffffff;
	font-family: Colfax;
	font-size: ${(props) =>
		props.style && props.style.fontSize ? props.style.fontSize : "10px"};
	font-weight: 500;
	line-height: 14px;
	padding: 0 !important;
	text-align: center;
	white-space: ${(props) =>
		props.style && props.style.wrap ? "normal" : "nowrap"};
`;

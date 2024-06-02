"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne, { DataProduct } from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import CardDataStats from "../CardDataStats";
import FormCreateBrands from "../createBrand";
import FormCreateProducts, { carBrand, dataCategory } from "../createProduct";
import { FaCar } from "react-icons/fa";
import { RiArchiveDrawerFill, RiDraftFill } from "react-icons/ri";
import { MdOutlinePublish } from "react-icons/md";
import { TableTestimoni, Testimoni as tsTestimoni } from "../tableTestimoni";

export interface DataTestimoni {
	data: tsTestimoni[];
	archivedCount: string;
	testimoniCount: string;
	draftCount: string;
	publishCount: string;
}
export const Testimoni = ({
	data,
	archivedCount,
	testimoniCount,
	draftCount,
	publishCount,
}: DataTestimoni) => {
	return (
		<>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
				<CardDataStats title='Total Testimoni' total={testimoniCount}>
					<FaCar size={40} />
				</CardDataStats>
				<CardDataStats title='Total Archived' total={archivedCount}>
					<RiArchiveDrawerFill size={40} />
				</CardDataStats>
				<CardDataStats title='Total Draft' total={draftCount}>
					<RiDraftFill size={40} />
				</CardDataStats>
				<CardDataStats title='Total Publish' total={publishCount}>
					<MdOutlinePublish size={40} />
				</CardDataStats>
			</div>
			<div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
				<div className='col-span-12 xl:col-span-12'>
					<TableTestimoni data={data} />
				</div>
			</div>
		</>
	);
};

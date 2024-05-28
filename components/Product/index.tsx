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
import FormCreateProducts, { dataCategory } from "../createProduct";
import { FaCar } from "react-icons/fa";
import { RiArchiveDrawerFill, RiDraftFill } from "react-icons/ri";
import { MdOutlinePublish } from "react-icons/md";
import TableProduct from "../tableProduct";

const Product = ({ data }: DataProduct) => {
	return (
		<>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
				<CardDataStats
					title='Total Product'
					total='$3.456K'
					rate='0.43%'
					levelUp>
					<FaCar size={40} />
				</CardDataStats>
				<CardDataStats
					title='Total Archived'
					total='$45,2K'
					rate='4.35%'
					levelUp>
					<RiArchiveDrawerFill size={40} />
				</CardDataStats>
				<CardDataStats title='Total Draft' total='2.450' rate='2.59%' levelUp>
					<RiDraftFill size={40} />
				</CardDataStats>
				<CardDataStats
					title='Total Publish'
					total='3.456'
					rate='0.95%'
					levelDown>
					<MdOutlinePublish size={40} />
				</CardDataStats>
			</div>
			<div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
				<div className='col-span-12 xl:col-span-12'>
					<TableProduct data={data} />
				</div>
			</div>
		</>
	);
};

export default Product;

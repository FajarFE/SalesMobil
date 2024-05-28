import Image from "next/image";

export const HeroSection = () => {
	return (
		<div className='w-full h-screen  min-h-[800px] max-h-[911px]  relative mx-auto  bg-gradient-to-br from-[#F2F1F0] to-[#C2B292] overflow-hidden'>
			<div className='grid md:grid-rows-2 lg:grid-cols-2 justify-center items-center'>
				<div></div>
				<div className='w-full h-full relative'>
					<span className='absolute w-10 h-[300px] border-l-black border-l-[5px] top-[604px] rotate-[57deg] left-[150px]'></span>
					<span className='absolute w-[500px] rounded-[54px] bg-white left-[90px] h-[320px] top-[150px]'>
						<div className='w-full h-full relative'>
							<Image
								alt='awodkaod'
								width={100}
								height={100}
								src='/assets/imageHero.svg'
								className='w-[800px]  h-[500px] -top-[90px] absolute'
							/>
							<span className='w-10 h-10 rounded-full bg-black top-[490px] left-[180px] z-10 absolute'>
								<div className='relative w-full h-full flex justify-center items-center'>
									<span className='absolute w-[400px] h-2 left-0 border-b-[4px] border-black'>
										<div className='h-full w-full relative justify-end items-end flex'>
											<span className='absolute left-[310px] w-[600px] bottom-[208px] -rotate-[45deg] h-2  border-b-[4px] border-black '></span>
										</div>
									</span>
								</div>
							</span>
							<span className='w-10 h-[180px]  top-[330px] left-[197px] z-10 absolute border-l-[4px] border-black'></span>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

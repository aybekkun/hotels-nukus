import { Container } from "@/components/common"
import { ImageGallery, ReserveCard } from "@/components/user"
import { prisma } from "../../../../../prisma/prisma-client"

const HotelSinglePage = async ({ params: { id } }: { params: { id: string } }) => {
	const data = await prisma.hotel.findUnique({ where: { id: Number(id) } })
	return (
		<Container className="py-8">
			{/* Left */}
			<div className="w-full mb-2">
				<h2 className="text-3xl font-bold">{data?.name}</h2>
				<p className="text-sm font-normal text-muted-foreground">{data?.address}</p>
				{/* Share Button */}
			</div>
			<div className="flex flex-col sm:flex-row gap-4 items-start">
				<div className="flex-1">
					<ImageGallery images={data?.images} className="mb-4" />
					<h4 className="text-2xl font-semibold">Ma&apos;lumot</h4>
					<p>{data?.description}</p>
				</div>
				<ReserveCard minPrice={data?.minPrice} className="w-full sm:w-[300px]" />
			</div>
			{/* Right */}
		</Container>
	)
}

export default HotelSinglePage

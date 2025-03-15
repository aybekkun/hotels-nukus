"use client";
import { FC, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	images?: string[];
}


export const ImageGallery: FC<Props> = ({ className = ``, images = [] }) => {
	const [selectImgage, setSelectImage] = useState(0);
	return (
		<div className={className}>
			<img src={images[selectImgage]} alt="hotel" className="w-full aspect-video object-cover rounded-lg mb-2" />
			<Carousel>
				<CarouselContent className="rounded-lg">
					{images.map((img, index) => (
						<CarouselItem
							onClick={() => setSelectImage(index)}
							key={index}
							className="lg:basis-1/5 md:basis-1/4 basis-1/3 gap-1 md:gap-2"
						>
							<img
								src={img}
								alt=""
								className={cn("w-full aspect-video object-cover rounded-lg cursor-pointer", {
									"opacity-80 shadow-2xl": selectImgage !== index,
								})}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0" variant={"ghost"} />
				<CarouselNext className="right-0" variant={"ghost"} />
			</Carousel>
		</div>
	);
};

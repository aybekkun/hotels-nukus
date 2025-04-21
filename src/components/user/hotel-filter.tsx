"use client";
import { FC, useEffect } from "react";
import { FilterGroup } from "../common";
import { useDebounce, useSet } from "react-use";
import { useRouter } from "next/navigation";
interface Props {
	className?: string;
}

export const HotelFilter: FC<Props> = ({ className = `` }) => {
	const router = useRouter();
	const [selected, { toggle, add }] = useSet(new Set<string>([]));

	useEffect(() => {
		const filter = new URLSearchParams(window.location.search).get("filter");
		if (filter) {
			const items = filter.split(",");
			for (const item of items) {
				add(item);
			}
		}
	}, []);

	useDebounce(
		() => {
			const params = new URLSearchParams(window.location.search);
			params.set("filter", Array.from(selected).join(","));
			router.push(`${window.location.pathname}?${params}`, { scroll: false });
		},
		1000,
		[selected]
	);

	return (
		<div className={" flex flex-col gap-4  flex-wrap" + className}>
			<FilterGroup
				title="Joylashuv turi"
				name="placement"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Mehmonxona", value: "1" },
					{ text: "Xostel", value: "2" },
					{ text: "Apartamentlar", value: "3" },
					{ text: "Villa", value: "4" },
					{ text: "Kurort", value: "5" },
					{ text: "Mehmon uyi", value: "6" },
				]}
			/>
			<FilterGroup
				title="Yulduzlar"
				name="start"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{
						text: "5 ⭐",
						value: "7",
					},
					{
						text: "4 ⭐",
						value: "8",
					},
					{
						text: "3 ⭐",
						value: "9",
					},
				]}
			/>
			<FilterGroup
				title="Xona turi"
				name="room"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Bir kishilik", value: "10" },
					{ text: "Ikki kishilik", value: "11" },
					{ text: "Oila uchun", value: "12" },
					{ text: "Lyuks", value: "13" },
				]}
			/>
			<FilterGroup
				title="Qulayliklar"
				name="comfort"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Bepul Wi-Fi", value: "14" },
					{ text: "Konditsioner", value: "15" },
					{ text: "Televizor", value: "16" },
					{ text: "Mini-bar", value: "17" },
					{ text: "Seyf", value: "18" },
					{ text: "Balkon", value: "19" },
					{ text: "Avtoturargoh", value: "20" },
					{ text: "Hovuz", value: "21" },
					{ text: "Sport zali", value: "22" },
					{ text: "Spa", value: "23" },
				]}
			/>
			<FilterGroup
				title="Ovqatlanish"
				name="food"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Nonushta kiritilgan", value: "24" },
					{ text: "Hududda restoran", value: "25" },
					{ text: "Bar", value: "26" },
				]}
			/>
			<FilterGroup
				title="Xususiyatlar"
				name="special"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Hayvonlar bilan joylashish", value: "27" },
					{ text: "Cheklangan imkoniyatlarga ega odamlar uchun", value: "28" },
				]}
			/>
		</div>
	);
};

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
				title="Тип размещения"
				name="placement"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Отель", value: "1" },
					{ text: "Хостел", value: "2" },
					{ text: "Апартаменты", value: "3" },
					{ text: "Вилла", value: "4" },
					{ text: "Курорт", value: "5" },
					{ text: "Гостевой дом", value: "6" },
				]}
			/>
			<FilterGroup
				title="Звезды"
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
				title="Тип номера"
				name="room"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Одноместный", value: "10" },
					{ text: "Двухместный", value: "11" },
					{ text: "Семейный", value: "12" },
					{ text: "Люкс", value: "13" },
				]}
			/>
			<FilterGroup
				title="Удобства"
				name="comfort"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Бесплатный Wi-Fi", value: "14" },
					{ text: "Кондиционер", value: "15" },
					{ text: "Телевизор", value: "16" },
					{ text: "Мини-бар", value: "17" },
					{ text: "Сейф", value: "18" },
					{ text: "Балкон", value: "19" },
					{ text: "Парковка", value: "20" },
					{ text: "Бассейн", value: "21" },
					{ text: "Спортзал", value: "22" },
					{ text: "Спа", value: "23" },
				]}
			/>
			<FilterGroup
				title="Питание"
				name="food"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Завтрак включен", value: "24" },
					{ text: "Ресторан на территории", value: "25" },
					{ text: "Бар", value: "26" },
				]}
			/>
			<FilterGroup
				title="Особенности"
				name="special"
				onClickCheckbox={toggle}
				selected={selected}
				items={[
					{ text: "Размещение с животными", value: "27" },
					{ text: "Для людей с ограниченными возможностями", value: "28" },
				]}
			/>
		</div>
	);
};

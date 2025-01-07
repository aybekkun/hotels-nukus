import { FC } from "react";
import { FilterGroup } from "../common";

interface Props {
	className?: string;
}

export const HotelFilter: FC<Props> = ({ className = `` }) => {
	return (
		<div className={"flex flex-col gap-4  " + className}>
			<FilterGroup
				title="Тип размещения"
				name="placement"
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
				items={[
					{
						text: "5 ⭐",
						value: "5",
					},
					{
						text: "4 ⭐",
						value: "4",
					},
					{
						text: "3 ⭐",
						value: "3",
					},
				]}
			/>
			<FilterGroup
				title="Тип номера"
				name="room"
				items={[
					{ text: "Одноместный", value: "1" },
					{ text: "Двухместный", value: "2" },
					{ text: "Семейный", value: "3" },
					{ text: "Люкс", value: "4" },
				]}
			/>
			<FilterGroup
				title="Удобства"
				name="comfort"
				items={[
					{ text: "Бесплатный Wi-Fi", value: "6" },
					{ text: "Кондиционер", value: "1" },
					{ text: "Телевизор", value: "2" },
					{ text: "Мини-бар", value: "3" },
					{ text: "Сейф", value: "4" },
					{ text: "Балкон", value: "5" },
					{ text: "Парковка", value: "7" },
					{ text: "Бассейн", value: "8" },
					{ text: "Спортзал", value: "9" },
					{ text: "Спа", value: "10" },
				]}
			/>
			<FilterGroup
				title="Питание"
				name="food"
				items={[
					{ text: "Завтрак включен", value: "1" },
					{ text: "Ресторан на территории", value: "2" },
					{ text: "Бар", value: "3" },
				]}
			/>
			<FilterGroup
				title="Особенности"
				name="special"
				items={[
					{ text: "Размещение с животными", value: "1" },
					{ text: "Для людей с ограниченными возможностями", value: "2" },
	
				]}
			/>
		</div>
	);
};

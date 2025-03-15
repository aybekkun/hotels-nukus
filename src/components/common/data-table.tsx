import { Card, Table, TableBody, TableHead, TableHeader, TableRow } from "../ui";

export const DataTable = ({
	columns,
	renderRow,
	data,
}: {
	columns: { header: string; accessor: string; className?: string }[];
	renderRow: (item: any) => React.ReactNode;
	data: any[];
}) => {
	return (
		<Card className="w-full max-w-full  mb-4">
			<Table className="w-full  ">
				<TableHeader>
					<TableRow className="text-left text-gray-500 text-sm">
						{columns.map((col) => (
							<TableHead key={col.accessor} className={col.className}>
								{col.header}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>{data.map((item) => renderRow(item))}</TableBody>
			</Table>
		</Card>
	);
};

import { Avatar, Badge, Container, ScrollArea, Table } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { type TemTem, temtemData } from 'data/temtem'
import { typeMatchupData } from 'data/typeMatchup'
import { type FC } from 'react'
import { useMatchupStore } from 'state/matchupStore'

const colours: Record<number, string> = {
	0.25: 'yellow',
	0.5: 'red',
	1: 'gray',
	2: 'green'
}

interface MatchupsProps {
	type: TemTem['type'];
}

const Matchups: FC<MatchupsProps> = ({ type }) => {
	return (
		<>
			{
				Object.values(typeMatchupData).map((attackTypes, i) => {

					let effective = 1
					type.forEach(defendType => {
						effective *= attackTypes[defendType] ?? 1
					})

					return <td key={i}>
						<Badge color={colours[effective]}>{effective}</Badge>
					</td>
				})
			}
		</>
	)
}

const MatchupTable: FC = () => {

	const searchValue = useMatchupStore(state => state.searchValue).toLowerCase()

	const isLargeScreen = useMediaQuery('(min-width: 768px)')

	return (
		<Container sx={{
			maxWidth: '1600px',
			width: '100%'
		}}>
			<ScrollArea>
				<Table
					highlightOnHover
					fontSize={isLargeScreen ? 'md' : 'xs'}
					horizontalSpacing={isLargeScreen ? 'md' : 'xs'}
				>
					<thead>
						<tr>
							<th />
							<th />
							<th>Neutral</th>
							<th>Fire</th>
							<th>Water</th>
							<th>Nature</th>
							<th>Electric</th>
							<th>Earth</th>
							<th>Mental</th>
							<th>Wind</th>
							<th>Digital</th>
							<th>Melee</th>
							<th>Crystal</th>
							<th>Toxic</th>
						</tr>
					</thead>
					<tbody>
						{
							temtemData.filter(temtemData => temtemData.name.toLowerCase().includes(searchValue)).map(temtemData => {
								return <tr key={temtemData.name}>
									<td><Avatar src={`/images/TemTem/${temtemData.name}.png`} /></td>
									<td>{temtemData.name}</td>
									<Matchups type={temtemData.type} />
								</tr>
							})
						}
					</tbody>
				</Table>
			</ScrollArea>
		</Container>
	)
}

export default MatchupTable
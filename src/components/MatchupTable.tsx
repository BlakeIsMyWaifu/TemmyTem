import { ActionIcon, Avatar, Badge, Container, createStyles, ScrollArea, Table, Text, Tooltip } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconPin } from '@tabler/icons'
import { type TemTem, temtemData } from 'data/temtem'
import { typeMatchupData } from 'data/typeMatchup'
import useWindowSize from 'hooks/useWindowSize'
import { useState, type FC } from 'react'
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

const useStyles = createStyles(theme => ({
	header: {
		position: 'sticky',
		zIndex: 2,
		top: 0,
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`
		}
	},

	scrolled: {
		boxShadow: theme.shadows.sm
	}
}))

const MatchupTable: FC = () => {

	const { classes, cx } = useStyles()

	const searchValue = useMatchupStore(state => state.searchValue).toLowerCase()
	const { pinnedTemTems, togglePinnedTemTem } = useMatchupStore()

	const isLargeScreen = useMediaQuery('(min-width: 768px)')

	const [scrolled, setScrolled] = useState(false)

	const { height } = useWindowSize()

	return (
		<Container sx={{
			maxWidth: '1600px',
			width: '100%'
		}}>
			<ScrollArea
				sx={{ height: height / 1.5 }}
				onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
			>
				<Table
					highlightOnHover
					fontSize={isLargeScreen ? 'md' : 'xs'}
					horizontalSpacing={isLargeScreen ? 'md' : 'xs'}
				>
					<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
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
							<th />
						</tr>
					</thead>
					<tbody>
						{
							temtemData.filter(temtemData => temtemData.name.toLowerCase().includes(searchValue) || pinnedTemTems.includes(temtemData.name)).map(temtemData => {
								const tooltipText = [
									`${temtemData.name} #${temtemData.number}`,
									`${temtemData.type[0]} ${temtemData.type[1] ?? ''}`
								]
								return <tr key={temtemData.name}>
									<td><Avatar src={`/images/TemTem/${temtemData.name}.png`} /></td>
									<td>
										<Tooltip
											withArrow
											label={tooltipText.join('\n')}
											transition='fade'
											transitionDuration={200}
											styles={{
												tooltip: {
													whiteSpace: 'pre-wrap',
													minHeight: 'min-content',
													textTransform: 'capitalize'
												}
											}}
										>
											<Text>
												{temtemData.name}
											</Text>
										</Tooltip>
									</td>
									<Matchups type={temtemData.type} />
									<td>
										<ActionIcon
											variant='light'
											color={pinnedTemTems.includes(temtemData.name) ? 'blue' : 'gray'}
											onClick={() => togglePinnedTemTem(temtemData.name)}
										>
											<IconPin />
										</ActionIcon>
									</td>
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
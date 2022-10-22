import { Autocomplete, type AutocompleteItem, Avatar, Group, Text, Container } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons'
import { temtemData } from 'data/temtem'
import { type FC, forwardRef, useMemo } from 'react'
import { useMatchupStore } from 'state/matchupStore'

const TemTemInput: FC = () => {

	const { searchValue, changeSearchValue } = useMatchupStore()

	const data: AutocompleteItem[] = useMemo(() => temtemData.map(temtem => ({ value: temtem.name })), [])

	const AutoCompleteItem = forwardRef<HTMLDivElement, AutocompleteItem>(function Item({ value, ...other }: AutocompleteItem, ref) {
		return (
			<div ref={ref} {...other}>
				<Group noWrap>
					<Avatar src={`/images/TemTem/${value}.png`} />
					<Text>{value}</Text>
				</Group>
			</div>
		)
	})

	return (
		<Container>
			<Autocomplete
				label='Filter TemTem'
				placeholder='Search . . .'
				data={data}
				itemComponent={AutoCompleteItem}
				value={searchValue}
				onChange={changeSearchValue}
				size='xl'
				p='xl'
				transition='pop-top-left'
				transitionDuration={80}
				transitionTimingFunction='ease'
				rightSection={<IconChevronDown size={32} stroke={1.5} />}
				rightSectionWidth={48}
				limit={data.length}
				styles={{
					rightSection: { pointerEvents: 'none' }
				}}
				maxDropdownHeight={400}
			/>
		</Container>
	)
}

export default TemTemInput
import { Autocomplete, type AutocompleteItem, Avatar, Group, Text } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons'
import { temtemData } from 'data/temtem'
import { type FC, forwardRef, useMemo } from 'react'

const TemTemInput: FC = () => {

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

	return <Autocomplete
		label='Filter TemTem'
		placeholder='Search . . .'
		data={data}
		itemComponent={AutoCompleteItem}
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
}

export default TemTemInput
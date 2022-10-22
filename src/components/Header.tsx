import { ActionIcon, Group, Tabs, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconSun, IconMoonStars } from '@tabler/icons'
import { useRouter } from 'next/router'
import { useEffect, useState, type FC } from 'react'
import { useSettingsStore } from 'state/settingsStore'

const ICON_SIZE = 24

const RouteTabs: FC = () => {

	const router = useRouter()
	const [activeTab, setActiveTab] = useState<string | null>('home')
	useEffect(() => {
		setActiveTab(router.route as string)
	}, [router.route])

	return (
		<Tabs
			variant='pills'
			value={activeTab}
			defaultValue='home'
			onTabChange={value => {
				setActiveTab(value)
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				router.push(value!)
			}}
			styles={theme => ({
				tab: {
					'&:hover': {
						backgroundColor: theme.colors.blue[9]
					}
				}
			})}
		>
			<Tabs.List>
				<Tabs.Tab value='/'>Type Matchup</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	)
}

const ThemeButton: FC = () => {

	const theme = useMantineTheme()

	const toggleTheme = useSettingsStore(state => state.toggleTheme)

	return (
		<ActionIcon
			variant='light'
			title='Toggle Colour Scheme'
			size={32}
			onClick={() => toggleTheme()}
		>
			{theme.colorScheme === 'dark' ? <IconSun size={ICON_SIZE} /> : <IconMoonStars size={ICON_SIZE} />}
		</ActionIcon>
	)
}

const Header: FC = () => {

	const isLargeScreen = useMediaQuery('(min-width: 768px)')

	return (
		<Group position='apart' sx={theme => ({
			paddingTop: theme.spacing.sm,
			backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
			borderBottom: `1px solid ${theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background}`,
			paddingBottom: theme.spacing.sm
		})}>

			{
				isLargeScreen
					? <>
						<Group spacing='xl'>
							<Title ml='xl'>TemmyTem</Title>
							<RouteTabs />
						</Group>

						<Group pr='md'>
							<ThemeButton />
						</Group>
					</>
					: <>
						<Group
							spacing='xl'
							position='apart'
							sx={{ width: '100%' }}
						>
							<Title ml='xl'>TemmyTem</Title>
							<Group pr='md'>
								<ThemeButton />
							</Group>
						</Group>

						<RouteTabs />
					</>
			}

		</Group>
	)
}

export default Header
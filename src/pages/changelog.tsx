import { Breadcrumbs, Text } from '@geist-ui/core';
import type { NextPage } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import Page from '../components/Page';
import Release from '../components/Release';

const Changelog: NextPage = () => (
	<Page
		title='Changelog'
		headerContent={
			<Breadcrumbs>
				<Breadcrumb href='/'>Home</Breadcrumb>
				<Breadcrumb>Changelog</Breadcrumb>
			</Breadcrumbs>
		}
	>
		{/* // TODO: Migrate to GitHub releases, or create a better system for a changelog */}
		<Release.Container>
			<Release v='0.3.0' date='2022-04-13T04:02:17.268Z' hidden>
				<Text h3>Changelog</Text>

				<Release.Image src='0.3.0.png' />

				<p>Now featuring a list of the more notable changes made to Garden!</p>

				<Text h3>Fixes & Improvements</Text>
				<ul>
					<li>🥅 Added custom 404 page</li>
					<li>💬 Added text on home page when no snapshots exist</li>
					<li>📄 Added a license</li>
					<li>🐛 Fixed snapshot ordering on the home page</li>
				</ul>
			</Release>
			<Release v='0.2.0' date='2022-04-12T04:02:17.268Z'>
				<Text h3>Fixes & Improvements</Text>
				<ul>
					<li>🚸 Automatically load snapshot page when ready</li>
					<li>💬 Changed various text to improve consistency</li>
					<li>🏗️ Restructured and componentized internal structure</li>
				</ul>
			</Release>
			<Release v='0.1.0' date='2022-04-11T04:02:17.268Z'>
				<Text h3>🎉 Initial Release!</Text>
				<Release.Image src='0.1.0.png' />
			</Release>
		</Release.Container>
	</Page>
);

export default Changelog;

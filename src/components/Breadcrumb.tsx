import { Breadcrumbs } from '@geist-ui/core';
import NextLink from 'next/link';

type BreadcrumbProps = {
	href?: string;
	children: string;
};

const Breadcrumb = ({ href, children }: BreadcrumbProps) => {
	return href ? (
		<NextLink href={href} passHref>
			<Breadcrumbs.Item nextLink href={href}>
				{children}
			</Breadcrumbs.Item>
		</NextLink>
	) : (
		<Breadcrumbs.Item>{children}</Breadcrumbs.Item>
	);
};

export default Breadcrumb;

import { Link as GeistLink, LinkProps } from '@geist-ui/core';
import NextLink from 'next/link';

interface MyLinkProps extends LinkProps {
	href: string;
}

const Link = (props: MyLinkProps) => {
	return (
		<NextLink href={props.href} passHref>
			<GeistLink {...props}>{props.children}</GeistLink>
		</NextLink>
	);
};

export default Link;

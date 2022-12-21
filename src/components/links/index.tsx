import { Link, LinkProps } from "@chakra-ui/react";
import NextLinkOri from "next/link";
import { Url } from "url";

export default function NextLink(props: LinkProps) {
    return (
        <NextLinkOri href={props.href as unknown as Url}>
            <Link
                {...props}
                color="blackAlpha.700"
                _hover={{
                    color: "black",
                    dropShadow: "lg",
                }}
            >
                {props.children}
            </Link>
        </NextLinkOri>
    );
}

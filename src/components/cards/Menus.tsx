import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { ReactI18NextChild } from "react-i18next";
import { RiMenuLine } from "react-icons/ri";

function Menus({ children }: { children: ReactI18NextChild }): JSX.Element {
    return (
        <Menu isLazy>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<RiMenuLine />}
                variant="ghost"
            />
            <MenuList>{children}</MenuList>
        </Menu>
    );
}

export default function ChartMenus({
    setModalEmbedShow,
}: {
    setModalEmbedShow?: () => void;
}): JSX.Element {
    return (
        <Menus>
            <MenuItem command="⌘D">Download CSV</MenuItem>
            {setModalEmbedShow && (
                <MenuItem command="⌘⇧E" onClick={setModalEmbedShow}>
                    Get Embed Code
                </MenuItem>
            )}
        </Menus>
    );
}

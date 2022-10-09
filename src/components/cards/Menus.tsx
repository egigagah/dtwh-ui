import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

export default function Menus(): JSX.Element {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<RiMenuLine />}
                variant="ghost"
            />
            <MenuList>
                <MenuItem command="⌘D">Download CSV</MenuItem>
                <MenuItem command="⌘⇧E">Get Embed Code</MenuItem>
            </MenuList>
        </Menu>
    );
}

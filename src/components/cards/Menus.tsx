import {
    Flex,
    forwardRef,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuItemProps,
    MenuList,
    MenuListProps,
    StackProps,
    Text,
} from "@chakra-ui/react";
import { ReactI18NextChild } from "react-i18next";
import { RiMenuLine } from "react-icons/ri";
import { CSVLink } from "react-csv";
import { Data } from "react-csv/components/CommonPropTypes";
import { PropsWithChildren } from "react";

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
    dataCollections,
}: {
    setModalEmbedShow?: () => void;
    dataCollections?: any[];
}): JSX.Element {
    return (
        <Menus>
            {dataCollections && (
                <MenuCsv dataCollections={dataCollections} command="⌘⇧D">
                    Download CSV
                </MenuCsv>
            )}
            {setModalEmbedShow && (
                <MenuItem onClick={setModalEmbedShow}>Get Embed Code</MenuItem>
            )}
        </Menus>
    );
}

type MenuCsvProps = StackProps & { dataCollections: Data; command?: string };

const MenuCsv = forwardRef<MenuCsvProps, any>((props, ref) => {
    return (
        <HStack
            justifyContent="space-between"
            px="3"
            py="1.5"
            _hover={{ backgroundColor: "gray.100", cursor: "pointer" }}
            _before={{ wordWrap: "break-word" }}
        >
            <CSVLink
                {...ref}
                filename={"export-data.csv"}
                data={props.dataCollections}
            >
                Download CSV
            </CSVLink>
            {/* {props.command && <span color="gray.500">{props.command}</span>} */}
        </HStack>
    );
});

export function MenusWrapper({ children }: PropsWithChildren): JSX.Element {
    return <Menus>{children}</Menus>;
}

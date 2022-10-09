import { Flex } from "@chakra-ui/react";

const App = (): JSX.Element => {
    return (
        <Flex flex={1} flexDirection="column">
            <div>Hallo</div>
            <iframe src="/embed/pie" width="50%" height="500px" />
        </Flex>
    );
};

export default App;

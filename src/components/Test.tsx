import { memo, useEffect } from "react";

function App({ data, isLoading }: { data: any; isLoading: boolean }) {
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <div>
            Halloo
            {!isLoading && <div>{JSON.stringify(data)}</div>}
        </div>
    );
}

const Test = memo(App, (p, n) => p.data !== n.data);

export default Test;

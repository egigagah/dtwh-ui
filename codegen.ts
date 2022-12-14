import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost/graphql",
    documents: "src/query/*.ts",
    generates: {
        "src/gql/": {
            preset: "client",
            plugins: [],
        },
    },
};

export default config;

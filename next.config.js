const withPlugins = require("next-compose-plugins");
const { i18n } = require("./i18n");

module.exports = withPlugins(
    [
        {
            async rewrites() {
                return [
                    {
                        source: "/graphql",
                        destination:
                            (process.env.NEXT_PUBLIC_API_URL || "localhost") +
                            "/graphql",
                    },
                ];
            },
        },
    ],
    {
        i18n,
        experimental: {
            esmExternals: false,
        },
    },
);

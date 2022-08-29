module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          allowlist: [
            "REACT_APP_REGION",
            "REACT_APP_USER_POOL_ID",
            "REACT_APP_CLIENT_ID",
            "REACT_APP_BASE_URL",
          ],
        },
      ],
    ],
  };
};

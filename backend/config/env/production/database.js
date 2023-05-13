async (configPath) => {
  require("dotenv").config({ path: "../.env" });

  const loaded = await cosmiconfig("database", {
    searchPlaces: [
      "database.config.js",
      "database.config.cjs",
      "database.config.mjs",
      "database.config.json",
      "database.config.yaml",
      "database.config.yml",
      "database.config.ts",
    ],
  }).load(configPath);

  if (!loaded) {
    throw new Error(`No database config found at ${configPath}`);
  }

  return loaded.config;
};

module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", ""),
      password: env("DATABASE_PASSWORD", ""),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});

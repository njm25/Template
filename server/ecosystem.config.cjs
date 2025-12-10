module.exports = {
    apps: [
      {
        name: "template",
        script: "index.ts",
        interpreter: "tsx",
        cwd: "./",
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  };
  
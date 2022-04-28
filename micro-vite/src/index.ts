import cac from "cac";

const cli = cac();

cli.command("dev").action(() => {
  console.log("server start");
});

cli.command("build").action(() => {
  console.log("build start");
});

cli.help();
cli.parse();

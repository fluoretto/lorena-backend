import { exec, execSync } from "child_process";
import { exit } from "process";

const docker = exec("yarn docker:test");

console.log("Starting Docker...");

docker.stdout.on("data", (chunk) => {
  process.stdout.write(chunk);

  const str = chunk.toString() as string;

  if (str.includes("klura_backend_test exited with code")) {
    const match = str.match(/klura_backend_test exited with code .+\n/g)[0];
    const code = match
      .replace("klura_backend_test exited with code ", "")
      .trim();
    execSync("docker-compose -f ./docker/docker-compose.test.yml down -v");
    console.log("Tests ran. Exit code:", code);
    exit(parseInt(code));
  }
});

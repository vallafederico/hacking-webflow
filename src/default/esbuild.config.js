import { serve, build } from "esbuild";

/* - Setup */
const env = process.env.NODE_ENV;
const production = env === "production";

const FILES = {
  entryPoints: {
    "default----": "index.js",
  },
  outdir: "../../dist",
};

const SETTINGS = {
  bundle: true,
  minify: production,
  sourcemap: !production,
};

/* --- DEVELOPMENT */
function serveFile() {
  serve(
    {
      port: 8000,
    },
    {
      entryPoints: ["index.js"],
      outfile: "dev.js",
      ...SETTINGS,
    }
  ).then((server) => {
    console.log("http://localhost:8000/dev.js");
  });
}

/* --- BUILD */
function buildJs() {
  build({
    ...FILES,
    ...SETTINGS,
  }).then((stats) => {
    console.log(stats);
  });
}

/* ------ Run! */
if (production) {
  buildJs();
} else if (env === "flow") {
  serveFile();
} else {
  serveFile();
}

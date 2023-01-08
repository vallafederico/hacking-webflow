import { serve, build } from "esbuild";
// import { glsl } from "esbuild-plugin-glsl";

/* - Setup */
const env = process.env.NODE_ENV;
const production = env === "production";

const FILES = {
  entry: ["index.js"],
  out: "../dist",
};

const SETTINGS = {
  bundle: true,
  sourcemap: !production,
  // loader: { ".png": "dataurl" },
  // loader: { ".webp": "dataurl" },
};

/* -- Plugins */
// const plugins = [
//   glsl({
//     minify: production,
//   }),
// ];

/* --- DEVELOPMENT */
function serveFile() {
  serve(
    {
      port: 8000,
    },
    {
      entryPoints: FILES.entry,
      outfile: "dev.js",
      ...SETTINGS,
      // plugins,
    }
  ).then((server) => {
    console.log("http://localhost:8000/dev.js");
  });
}

/* --- BUILD */
function buildJs() {
  build({
    entryPoints: FILES.entry,
    outdir: FILES.out,
    ...SETTINGS,
    // plugins
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

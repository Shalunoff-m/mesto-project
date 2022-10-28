plugins: [
  new BrowserSyncPlugin(
    {
      host: "localhost",
      port: 3000,
      proxy: "localhost:8080", // devserver
      files: ["./resources/views/**/*.blade.php"],
    },
    {
      // prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this
      reload: false,
    }
  ),
];

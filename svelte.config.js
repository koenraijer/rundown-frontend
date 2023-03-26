import preprocess from "svelte-preprocess";

const config = {
  kit: {
    adapter: adapter({
      out: 'public',
    })
  },
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;

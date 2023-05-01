## Main Considerations

- I considered the 16-pokemon limit to be a design-requirement rather than a technical/memory one
- Search: This from a UX perspective, I think the typical autocomplete box makes a lot more sense because you can just use the down arrows to select an option. It's of course not as aesthetically appealing.
- I haven't worked with nextJS for a long time
- I found it kind of baffling that there is no good way of giving modals their own path. I was hoping to open the individual pokemon in a modal on top of the grid, without compromising URL navigation (I imagined a react-router like situation where the grid can always render, but another component can render if the /[pokemon-name] route matches.) The only official recommendation the nextjs repository gives you still navigates to an entirely different layout, it seems.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

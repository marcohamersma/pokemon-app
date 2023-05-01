## Main Considerations & Commentary

- I considered the 16-pokemon limit to be a design-requirement rather than a technical/memory one, although I did use PokeAPI's new GraphQL API and Next's `getServerSideProps` to request only the data required for the initial page.
- As the main UX, I wanted the Grid to be the main UI, and detail views would open up in a Dialog. It was important to me to make sure each pokemon had its own URL, so the detailed views trigger a URL change even though they are a modal. In order to keep the visual state, the grid of Pokemon behind the modal would still show you the "neighbouring" Pokemon, so to say.
- To achieve this — after some frustration — I decided to use a catch-all route. That way, the "index" component including its data fetching logic is shared for multiple urls (the root, paginated pages, and detail views — which is a modal).
- The larger plan was to load an optimised list of all the pokemon in the background after the page had loaded, so I could implement a search feature on the client side, but this would require more advanced data management than Next seems to give me out of the box, and too much time for now.
- Search: I didn't get to this, but the idea was to use HeadlessUI's Combobox for this, while filtering the full list of Pokemon (case-insensitive, of course).
- I haven't worked with NextJS for a long time, so I had to freshen up my knowledge a bit.
- I would have liked to do some form of image optimisation, but I wasn't sure how to do that. More about that in [PokemonGridItem](./src/components/PokemonGridItem.tsx)

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

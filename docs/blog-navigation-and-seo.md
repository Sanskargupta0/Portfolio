# Article navigation and SEO

Updated 6 November 2026 on update/added-blogs.

## Interface

Design read: editorial navigation for technical readers, preserving the portfolio typography and teal focus accent. The bottom control and popup follow the supplied black reference treatment. Design variance 6, motion intensity 3, visual density 3. Existing Radix primitives and Motion are reused.

The inline accordion and standalone progress circle are replaced by a bottom-centred section control. Opening it shows the nested article headings over a blurred backdrop. The current section follows reading position, clicking an entry updates the fragment and focuses its heading, and progress completes at the end of the article. Articles without headings retain a noninteractive progress control.

The dialog supports Escape, focus trapping and focus restoration. Section jumps respect reduced motion. Progress uses Motion values rather than continuous React state updates. Image and font layout changes trigger heading-position measurements. Floating controls use layer 40 and modal surfaces layer 50, keeping the resume button behind the open menu.

The website supports English only. Language controls, alternate translations and locale detection have been removed.

## Content and search metadata

- All 30 articles have four to six content-specific tags. The resulting taxonomy contains 98 topics. Generic tags that were unrelated to an article were replaced.
- The 18 added article descriptions now describe their actual subjects. Existing article titles and URLs are preserved.
- Each article has one primary heading. Body title headings render as secondary headings without changing their fragment identifiers.
- Article keywords, Open Graph article tags, Twitter previews and server-rendered Article JSON-LD use the article's own content and topics. JSON-LD includes language and actual modification dates.
- Topic pages have server-rendered content, titles, descriptions and canonical URLs. Old English tag URLs redirect permanently to the new taxonomy. Unknown topics return 404.
- The sitemap includes published articles and topic pages, uses actual modification dates, and excludes the nonexistent about route. RSS entries include topic categories.

Google does not use the meta keywords tag for ranking. Tags here also support navigation and internal linking; descriptive titles, summaries and structured data provide the other search signals. These changes do not guarantee ranking positions. Guidance: https://developers.google.com/search/docs/crawling-indexing/special-tags and https://developers.google.com/search/docs/appearance/structured-data/article.

## Validation

Production build and TypeScript checks pass. Browser checks cover all 30 article metadata records, primary headings and table-of-contents targets; section navigation; reading progress; focus handling; 320, 300 and 768 pixel viewports; long contents lists; topic pages; sitemap; RSS; and legacy redirects. Articles and topic links also render with JavaScript disabled.

The representative local Lighthouse article audit scores SEO 100 and accessibility 100. The earlier mobile performance audit scored 83, with simulated LCP 4.7 seconds, total blocking time 20 ms and layout shift 0; performance remains an area for further work. These are local lab results rather than field measurements or ranking predictions. The view-counter endpoint was blocked for Lighthouse and mocked in browser checks because it needs a live database.

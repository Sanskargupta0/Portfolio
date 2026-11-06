# Article collection maintenance

Updated 6 November 2026.

The collection contains 18 added English articles, alongside the original 12 English posts. The autobiography and personal diary remain excluded. Licensing and permission records are maintained in the source manifest and third_party directory.

## Content metadata

- date is the assigned 2026 editorial date.
- originalPublishedAt preserves the original publication date for structured data.
- importedAt records the actual collection update date.
- author is null on these added articles, so no personal byline is emitted in JSON-LD or RSS. Existing posts retain their normal author.
- Covers live in src/content/posts/en/images/cover/articles. Inline images and diagrams live in public/blog/imported.

## Cleanup

Removed comment/reaction requests, reply promises, personal social promotion and account-specific names. Code examples use neutral sample values, and article cross-links point to local routes. Programming comments and unrelated technical references are preserved.

Eleven covers and two inline images were edited using the built-in image tool to remove watermarks, source URLs or personal labels while preserving their artwork and technical content. SVG diagram labels were generalized directly. The manifest lists final files, edit prompts, tool, source records and SHA-256 hashes for 54 local assets.

## Verification

The Velite content build and production build pass. Browser checks cover all added article routes, image decoding, local article links, mobile overflow, RSS output, reading progress and absence of the removed names and promotional phrases. The existing view counter is mocked because it requires a live database. No deployment or live database changes are included.

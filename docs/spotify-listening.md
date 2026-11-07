# Badge-backed Spotify listening

No Spotify developer app, client secret, refresh token, or Premium subscription is required by this integration. It relies on the existing public spotify-github-profile connection.

The server checks the badge redirect with show_offline=true. Only recognized offline SVG responses mean offline; network errors, revoked connections, unexpected data and timeouts mean unavailable. Valid track/episode redirects are converted to HTTPS Spotify URLs. Recent-song redirects without show_offline are deliberately not used because the provider selects a random recent track.

## No database setup

Listening status uses only the public badge service. The last detected song is held in server memory, which can reset on restart, redeployment, or a different serverless instance. When there is no remembered song, offline visitors see Not playing on Spotify and can switch to the original player. Existing Prisma usage elsewhere in the portfolio is unchanged.

## Behavior

- Visible tabs poll every 30 seconds, including while offline or viewing the original player. Background polling stops; focus checks again. Errors back off to 60 seconds.
- Server requests are deduplicated and cached briefly. Provider Retry-After is respected. Caches are per server instance, not a global rate limiter.
- The most recently observed playing track is remembered temporarily with its observation time. Offline shows Last detected playing, not a guaranteed complete Spotify listening history. Nothing is invented before the first observation.
- Polling occurs only while people visit the site. Songs played with no visitors, or between polls, can be missed.
- A single 80px compact Spotify embed replaces the duplicate badge and expanded player. The badge service still supplies status and track IDs behind the scenes. Narrow containers scale the player to fit without horizontal overflow.
- The first detected or remembered song loads into the compact embed automatically, with no autoplay. Visitors click its own play button. Spotify controls full playback/preview availability.
- Polls and theme changes never replace an open player. Its theme is fixed when opened to avoid interrupting audio. Update song switches to a newly detected track only when requested.
- Switching to the original player removes the embed and stops playback. Switching back preserves the original player's selected track and position.
- The status reflects the latest poll. An already loaded player retains its selected song; Update song lets the visitor update it without interrupting playback automatically.
- /api/spotify/open uses the same detected or remembered track and opens Spotify's web URL; profile fallback if none.

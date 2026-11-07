import "server-only";
import type { ListeningStatus, ListeningTrack } from "~/types/listening";

const ENDPOINT =
  "https://spotify-github-profile.kittinanx.com/api/view?uid=31ne3c5fannnnfr4vr24ba4tqime&redirect=true&show_offline=true";
let cached: { value: ListeningStatus; expires: number } | undefined;
let pending: Promise<ListeningStatus> | undefined;
let lastTrack: ListeningTrack | null = null;
let retryAt = 0;
export async function getListeningStatus(): Promise<ListeningStatus> {
  if (cached && cached.expires > Date.now()) return cached.value;
  if (pending) return pending;
  pending = (async () => {
    const checkedAt = new Date().toISOString();
    let value: ListeningStatus = { state: "unavailable", track: lastTrack, checkedAt };
    let ttl = 20_000;
    try {
      if (retryAt > Date.now()) throw new Error("Backoff");
      const response = await fetch(ENDPOINT, {
        redirect: "manual",
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (response.status === 429) {
        const seconds = Number(response.headers.get("retry-after"));
        retryAt = Date.now() + Math.max(60, Number.isFinite(seconds) ? seconds : 60) * 1000;
      }
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location") ?? "";
        const match =
          /^spotify:(track|episode):([a-zA-Z0-9]{22})$/.exec(location) ??
          /^https:\/\/open\.spotify\.com\/(track|episode)\/([a-zA-Z0-9]{22})(?:\?[^#]*)?$/.exec(
            location
          );
        if (!match) throw new Error("Invalid destination");
        lastTrack = {
          kind: match[1] as ListeningTrack["kind"],
          id: match[2],
          observedAt: checkedAt,
        };
        value = { state: "playing", track: lastTrack, checkedAt };
      } else if (
        response.ok &&
        (response.headers.get("content-type") ?? "").includes("image/svg+xml")
      ) {
        const body = await response.text();
        if (!body.includes("Currently not playing on Spotify"))
          throw new Error("Unrecognized badge");
        value = { state: "offline", track: lastTrack, checkedAt };
      } else throw new Error("Provider unavailable");
    } catch {
      ttl = 60_000;
      value = { state: "unavailable", track: lastTrack, checkedAt };
    }
    cached = { value, expires: Date.now() + ttl };
    return value;
  })();
  try {
    return await pending;
  } finally {
    pending = undefined;
  }
}

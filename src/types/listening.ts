export type ListeningTrack = { id: string; kind: "track" | "episode"; observedAt: string };
export type ListeningStatus = {
  state: "playing" | "offline" | "unavailable";
  track: ListeningTrack | null;
  checkedAt: string;
};

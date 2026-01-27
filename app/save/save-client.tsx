"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";

export default function SaveClient({ id, label }: { id: string; label: string }) {
  const router = useRouter();
  const [src, setSrc] = useState<string>("");
  const [err, setErr] = useState<string | null>(null);
  const cleanLabel = useMemo(
    () => (label || "QR").replace(/\s+/g, " ").trim() || "QR",
    [label]
  );

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    if (!id) {
      setErr("Missing image id.");
      return;
    }
    try {
      const v = sessionStorage.getItem(id);
      if (!v) {
        setErr("Image not found. Go back and generate again.");
        return;
      }
      setSrc(v);
    } catch {
      setErr("Storage blocked in this environment.");
    }
  }, [id]);

  async function shareImage() {
    setErr(null);
    if (!src) return;
    try {
      const blob = await (await fetch(src)).blob();
      const file = new File([blob], `${cleanLabel}.png`, { type: "image/png" });

      // @ts-ignore
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        // @ts-ignore
        await navigator.share({ files: [file], title: cleanLabel });
        return;
      }

      // Fallback: open the image (some clients let you save from there)
      await sdk.actions.openUrl(src);
    } catch (e: any) {
      setErr(e?.message ?? "Share failed.");
    }
  }

  return (
    <div className="wrap">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="card soft" style={{ padding: 16 }}>
          <div className="top">
            <div>
              <h1 className="title" style={{ fontSize: 18 }}>Save QR</h1>
              <p className="sub">
                In the Base app, downloads/clipboard can be limited. Use <b>Share</b> or long‑press the image.
              </p>
            </div>
            <button className="btn ghost" onClick={() => router.back()}>
              Back
            </button>
          </div>

          <div className="hr" />

          <div className="panel" style={{ padding: 16 }}>
            {err ? (
              <div className="err">{err}</div>
            ) : src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt="QR"
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: 340,
                  margin: "0 auto",
                  borderRadius: 16,
                  border: "1px solid rgba(11,16,32,.10)",
                  background: "#fff",
                  padding: 10,
                }}
              />
            ) : (
              <div className="hint">Loading…</div>
            )}
          </div>

          <div className="row">
            <button
              onClick={shareImage}
              className="btn primary full"
              disabled={!src || !!err}
            >
              Share image
            </button>
            <button
              onClick={() => router.push("/")}
              className="btn full"
            >
              New QR
            </button>
          </div>

          <div className="tiny">
            Tip: long‑press the QR image to save it to Photos or copy it (client‑dependent).
          </div>
        </div>
      </div>
    </div>
  );
}

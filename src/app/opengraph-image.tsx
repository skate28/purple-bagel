import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name}, Springfield, Jacksonville`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: site.palette.cream,
          color: site.palette.ink,
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: site.palette.brand,
          }}
        >
          {`${site.address.neighborhood} · ${site.address.city}`}
        </div>
        <div style={{ display: "flex", fontSize: 120, lineHeight: 0.9, fontWeight: 700 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 34 }}>
          {`${site.hours.summary} · ${site.phone.display}`}
        </div>
      </div>
    ),
    { ...size },
  );
}

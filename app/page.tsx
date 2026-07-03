import Script from "next/script";
import { bodyHtml } from "./bodyContent";

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      {/* Original interaction script: nav scroll state, reveal-on-scroll,
          animated counters, tech-stack tabs, portfolio tabs + lightbox,
          client logo strip, mobile nav. Runs after the markup above mounts. */}
      <Script src="/site.js" strategy="afterInteractive" />
    </>
  );
}

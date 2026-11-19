"use client";

import { useState } from "react";
import { useSite } from "../../store/siteStore";
import { buildGmailComposeUrl } from "../../utils/contact";
import { SectionHeading } from "../ui/Heading";

export default function Contact() {
  const { site } = useSite();
  const labels = site.labels;
  const socials = site.socials;
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    if (!socials.email) return;

    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = socials.email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <section
      id="contact"
      className="border-t border-slate-800/40 relative overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
        <div className="file-label mb-4 text-brand">
          <span aria-hidden="true">✦</span>
          {labels.contactLabel || "Initiate Contact"}
        </div>

        <div className="grid lg:grid-cols-[1fr_0.82fr] gap-8 lg:gap-12 items-stretch">
          <div className="flex flex-col justify-center space-y-6 max-w-xl">
            <SectionHeading
              text={
                labels.contactLines?.join(" ") ||
                "Let's build something extraordinary"
              }
            />

            <p className="text-base md:text-lg text-mid max-w-lg leading-relaxed">
              {labels.contactSub ||
                "Whether you are looking to hire a full-stack engineer, build a new product, or discuss technical architecture — my inbox is always open."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="panel px-4 py-3">
                <span className="file-label text-[9px] text-faint">
                  Availability
                </span>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
                  <span className="status-dot" aria-hidden="true" />
                  Open to opportunities
                </div>
              </div>
              <div className="panel px-4 py-3">
                <span className="file-label text-[9px] text-faint">
                  Response time
                </span>
                <div className="mt-2 text-sm font-medium text-ink">
                  Within 24 hours
                </div>
              </div>
            </div>
          </div>

          {socials.email && (
            <div className="panel p-6 sm:p-8 border-brand/20 flex flex-col justify-between gap-8">
              <div>
                <span className="file-label text-[10px] text-faint">
                  Direct Email
                </span>
                <div className="mt-4 break-all font-mono text-lg sm:text-xl font-semibold text-ink">
                  {socials.email}
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={buildGmailComposeUrl(socials.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-brand w-full justify-center text-sm"
                >
                  Open Gmail <span className="arrow" aria-hidden="true">↗</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-ghost w-full justify-center text-sm"
                  aria-live="polite"
                >
                  {copied ? "Email copied ✓" : "Copy email address"}
                </button>
              </div>

              {(socials.github || socials.linkedin) && (
                <div className="pt-5 border-t border-hairline flex flex-wrap gap-2">
                  {socials.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-chip hover:text-brand"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-chip hover:text-brand"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

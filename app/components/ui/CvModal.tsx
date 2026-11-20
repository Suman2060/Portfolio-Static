"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CvModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  fileName?: string;
};

export default function CvModal({
  open,
  onClose,
  src,
  fileName = "Suman_Dangol_CV.pdf",
}: CvModalProps) {
  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <CvDialog onClose={onClose} src={src} fileName={fileName} />,
    document.body,
  );
}

function CvDialog({
  onClose,
  src,
  fileName,
}: Required<Omit<CvModalProps, "open">>) {
  const [loading, setLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousHtmlOverflow = documentElement.style.overflow;
    const previousHtmlOverscroll = documentElement.style.overscrollBehavior;

    documentElement.style.overflow = "hidden";
    documentElement.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      documentElement.style.overflow = previousHtmlOverflow;
      documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="cv-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="cv-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <div className="cv-modal__bar">
          <div className="cv-modal__identity">
            <span className="terminal-dots" aria-hidden="true">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
            </span>
            <span id="cv-modal-title" className="cv-modal__filename">
              <svg
                className="cv-modal__icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M14 3v5h5M6 3h8l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M8 13h8M8 17h5"
                />
              </svg>
              <span className="cv-modal__filename-text">{fileName}</span>
            </span>
            <span className="cv-modal__tag">PDF</span>
          </div>

          <div className="cv-modal__actions">
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="cv-modal__action"
              title="Open in new tab"
              aria-label="Open CV in a new tab"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M14 4h6m0 0v6m0-6L10 14M19 14v5a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h5"
                />
              </svg>
            </a>
            <a
              href={src}
              download={fileName}
              className="cv-modal__action"
              title="Download CV"
              aria-label="Download CV"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                />
              </svg>
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="cv-modal__action cv-modal__close"
              title="Close preview"
              aria-label="Close CV preview"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="cv-modal__viewport">
          {loading && (
            <div className="cv-modal__loader" aria-hidden="true">
              <span className="cv-modal__spinner" />
              <span>Loading resume…</span>
            </div>
          )}
          <iframe
            className="cv-modal__frame"
            src={`${src}#view=FitH`}
            title={`${fileName} preview`}
            onLoad={() => setLoading(false)}
          />
        </div>

        <div className="cv-modal__footer">
          <span className="cv-modal__hint">
            Press <kbd>Esc</kbd> to close · Scroll inside the preview to read
          </span>
          <span className="cv-modal__mobile-note">
            Preview not showing? Open it in a new tab.
          </span>
          <a href={src} target="_blank" rel="noreferrer">
            Open in new tab ↗
          </a>
        </div>
      </div>
    </div>
  );
}

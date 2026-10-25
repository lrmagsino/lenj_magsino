"use client";

import { useState, type FormEvent } from "react";

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "sending"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export default function ContactForm() {
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submission.status === "sending") return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmission({
        status: "error",
        message:
          "The contact form is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to portfolio/.env.local, then restart the development server.",
      });
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("access_key", accessKey);
    formData.set("subject", "New Portfolio Contact Message");
    formData.set("from_name", "Portfolio Contact Form");

    setSubmission({ status: "sending", message: "Sending your message…" });

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result: { success?: boolean; message?: string } = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message || "Your message could not be sent. Please try again.",
        );
      }

      form.reset();
      setSubmission({
        status: "success",
        message: "Thanks for reaching out. Your message has been sent.",
      });
    } catch (error) {
      console.error("Web3Forms contact submission failed.", error);
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your message could not be sent. Please try again.",
      });
    }
  }

  return (
    <form
      className="mx-auto mt-12 grid max-w-xl gap-4 text-left"
      onSubmit={handleSubmit}
      aria-busy={submission.status === "sending"}
    >
      <label className="grid gap-1 text-sm text-white/70">
        Name
        <input
          required
          name="name"
          type="text"
          autoComplete="name"
          maxLength={120}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-cyan"
        />
      </label>
      <label className="grid gap-1 text-sm text-white/70">
        Your email
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-cyan"
        />
      </label>
      <label className="grid gap-1 text-sm text-white/70">
        Message
        <textarea
          required
          name="message"
          rows={4}
          maxLength={5000}
          className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white focus:border-cyan"
        />
      </label>
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={submission.status === "sending"}
        className="rounded-full bg-electric px-6 py-3 font-medium hover:bg-electric/80 disabled:cursor-wait disabled:opacity-60"
      >
        {submission.status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${
          submission.status === "error" ? "text-rose-300" : "text-cyan"
        }`}
      >
        {submission.message}
      </p>
    </form>
  );
}

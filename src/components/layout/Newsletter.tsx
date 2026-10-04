"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = { kind: "idle" } | { kind: "error"; message: string } | { kind: "success"; message: string };

/**
 * Footer newsletter signup with inline validation.
 * Front-end only: wire `handleSubmit` to your email provider before launch.
 */
export function Newsletter() {
  const id = useId();
  const inputId = `${id}-email`;
  const messageId = `${id}-message`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setStatus({ kind: "error", message: "Enter your email address to subscribe." });
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setStatus({ kind: "error", message: "That email doesn't look right — please check it and try again." });
      return;
    }
    setEmail("");
    setStatus({ kind: "success", message: "Thanks — you're on the list. Watch your inbox for the next drop." });
  }

  const invalid = status.kind === "error";

  return (
    <form noValidate onSubmit={handleSubmit} className="mt-9 max-w-md">
      <label htmlFor={inputId} className="text-sm font-semibold text-ivory">
        Be part of our newsletter
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status.kind !== "idle") setStatus({ kind: "idle" });
          }}
          aria-invalid={invalid}
          aria-describedby={messageId}
          className={cn(
            "h-11 min-w-0 flex-1 rounded-md border bg-white/5 px-4 text-sm text-ivory transition-colors duration-200",
            "placeholder:text-beige/55 focus-visible:border-ivory/70 focus-visible:bg-white/10 focus-visible:outline-none",
            invalid ? "border-[#E8927C]" : "border-white/15",
          )}
        />
        <Button type="submit" className="shrink-0 px-5">
          Subscribe
        </Button>
      </div>
      <p
        id={messageId}
        role={invalid ? "alert" : "status"}
        className={cn("mt-2 min-h-5 text-xs leading-5", invalid ? "text-[#F0A894]" : "text-beige/80")}
      >
        {status.kind === "idle" ? "" : status.message}
      </p>
    </form>
  );
}

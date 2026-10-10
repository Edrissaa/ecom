import { Children, cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FieldProps {
  label: string;
  /** Helper text shown under the control. Replaced by `error` when present. */
  hint?: string;
  error?: string;
  /** Marks the label as optional; required fields stay unadorned. */
  optional?: boolean;
  className?: string;
  /** Exactly one control. It receives `id`, `aria-describedby` and `aria-invalid`. */
  children: ReactNode;
}

/** Label + control + hint/error, with the accessibility wiring done once. */
export function Field({ label, hint, error, optional, className, children }: FieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;
  const control = Children.only(children);

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-[13px] font-semibold">
        {label}
        {optional && <span className="text-xs font-medium text-muted">Optional</span>}
      </label>
      {isValidElement(control)
        ? cloneElement(control as ReactElement<Record<string, unknown>>, {
            id,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": message ? messageId : undefined,
          })
        : control}
      {message && (
        <p id={messageId} role={error ? "alert" : undefined} className={cn("text-xs leading-relaxed", error ? "text-danger" : "text-muted")}>
          {message}
        </p>
      )}
    </div>
  );
}

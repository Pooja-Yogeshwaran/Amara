// Generated from examples/minimalist-swiss/theme.json by the React/Tailwind adapter.
// Implements agent-states.md's pre-action gate: top of the elevation scale, reserved
// approval color, single non-looping entry motion, edit-before-approve when the
// pending item is a draft rather than a fixed action.
import { useState } from "react";

export type ApprovalBannerProps = {
  body: string;
  scope?: string; // set for a bounded/scoped grant -- see agent-states.md
  isDraft?: boolean; // true => show "Edit first" alongside Approve
  onApprove: () => void;
  onDismiss: () => void;
  onEdit?: () => void;
};

export function ApprovalBanner({ body, scope, isDraft, onApprove, onDismiss, onEdit }: ApprovalBannerProps) {
  const [entered, setEntered] = useState(false);
  if (!entered) requestAnimationFrame(() => setEntered(true));

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        "self-stretch rounded-md border border-approval bg-approval-weak p-3 shadow-approval",
        "transition-all duration-fast ease-standard",
        entered ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
      ].join(" ")}
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#7A4E0E]">
        Approval needed
      </div>
      <p className="mb-2 font-body text-base leading-6 text-text-primary">{body}</p>
      {scope && (
        <p className="mb-2 font-mono text-xs text-text-secondary">{scope}</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={onApprove}
          className="rounded-sm bg-text-primary px-3 py-2 font-ui text-xs font-semibold text-text-inverse"
        >
          Approve
        </button>
        {isDraft && onEdit && (
          <button
            onClick={onEdit}
            className="rounded-sm border border-border-default px-3 py-2 font-ui text-xs font-semibold text-text-secondary"
          >
            Edit first
          </button>
        )}
        <button
          onClick={onDismiss}
          className="rounded-sm border border-border-default bg-transparent px-3 py-2 font-ui text-xs font-semibold text-text-secondary"
        >
          Not now
        </button>
      </div>
    </div>
  );
}

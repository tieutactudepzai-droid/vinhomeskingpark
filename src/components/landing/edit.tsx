import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Pencil, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "kp-content-overrides";
const MODE_KEY = "kp-edit-mode";

type Overrides = Record<string, string>;

function loadOverrides(): Overrides {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Overrides;
  } catch {
    return {};
  }
}

type EditCtx = {
  editMode: boolean;
  overrides: Overrides;
  setText: (id: string, value: string) => void;
  resetAll: () => void;
  exitEdit: () => void;
};

const EditContext = createContext<EditCtx>({
  editMode: false,
  overrides: {},
  setText: () => {},
  resetAll: () => {},
  exitEdit: () => {},
});

export const useEdit = () => useContext(EditContext);

export function EditProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const { search, hash, hostname } = window.location;
    // Accept ?edit=1 in the query string or anywhere after the # (e.g. /#tong-quan/?edit=1).
    const asked = /[?&]edit=1\b/.test(search) || /edit=1\b/.test(hash);
    if (asked) window.localStorage.setItem(MODE_KEY, "1");
    // The Lovable preview (and local dev) is owner-only, so edit mode is on there unless switched off.
    const isPreview =
      hostname.startsWith("id-preview--") || hostname === "localhost" || hostname === "127.0.0.1";
    const stored = window.localStorage.getItem(MODE_KEY);
    setEditMode(stored === "1" || (isPreview && stored !== "0"));
    setCanEdit(isPreview || asked || stored !== null);
    setOverrides(loadOverrides());
  }, []);

  const setText = useCallback((id: string, value: string) => {
    setOverrides((prev) => {
      const next = { ...prev, [id]: value };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    if (!window.confirm("Khôi phục toàn bộ nội dung về mặc định?")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setOverrides({});
  }, []);

  const exitEdit = useCallback(() => {
    window.localStorage.setItem(MODE_KEY, "0");
    setEditMode(false);
  }, []);

  const enterEdit = useCallback(() => {
    window.localStorage.setItem(MODE_KEY, "1");
    setEditMode(true);
  }, []);

  return (
    <EditContext.Provider value={{ editMode, overrides, setText, resetAll, exitEdit }}>
      {children}
      {editMode ? <EditToolbar /> : canEdit ? <EnterEditButton onClick={enterEdit} /> : null}
    </EditContext.Provider>
  );
}

function EnterEditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-full border border-gold/50 bg-ink px-4 py-2.5 text-xs font-medium text-ivory shadow-elegant transition-colors hover:text-gold md:bottom-6 md:left-6"
    >
      <Pencil className="h-3.5 w-3.5 text-gold" /> Sửa trang
    </button>
  );
}

function EditToolbar() {
  const { resetAll, exitEdit } = useEdit();
  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-sm border border-gold/50 bg-ink px-4 py-3 text-ivory shadow-elegant md:bottom-6 md:left-6 md:right-auto md:max-w-xl">
      <p className="text-xs md:text-sm">
        <span className="font-semibold text-gold">Chế độ chỉnh sửa</span>
        <span className="hidden text-ivory/70 md:inline">
          {" "}
          — bấm vào chữ bất kỳ để sửa, tự lưu khi bấm ra ngoài.
        </span>
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={resetAll}
          className="flex items-center gap-1.5 rounded-sm border border-ivory/25 px-3 py-1 text-xs transition-colors hover:border-gold hover:text-gold"
        >
          <RotateCcw className="h-3 w-3" /> Khôi phục mặc định
        </button>
        <button
          type="button"
          onClick={exitEdit}
          className="bg-gold-gradient flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold text-primary-foreground"
        >
          <Check className="h-3 w-3" /> Xong
        </button>
      </div>
    </div>
  );
}

type EditableTag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div" | "dt" | "dd" | "li";

export function EditableText({
  id,
  defaultValue,
  className,
  as: Tag = "span",
  multiline = false,
}: {
  id: string;
  defaultValue: string;
  className?: string;
  as?: EditableTag;
  multiline?: boolean;
}) {
  const { editMode, overrides, setText } = useEdit();
  const ref = useRef<HTMLElement | null>(null);
  const value = overrides[id] ?? defaultValue;

  // Sync DOM when an override appears/disappears outside of typing (load, reset).
  useEffect(() => {
    if (ref.current && ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [value]);

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      ref={ref as never}
      className={cn(
        className,
        "cursor-text rounded-[2px] outline-none transition-shadow hover:ring-1 hover:ring-gold/70 focus:ring-2 focus:ring-gold",
      )}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const text = (e.currentTarget.textContent ?? "").trim();
        if (!text) {
          e.currentTarget.textContent = value;
          return;
        }
        if (text !== value) setText(id, text);
      }}
      onPaste={(e: React.ClipboardEvent<HTMLElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, text);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
        if (e.key === "Escape") {
          e.currentTarget.textContent = value;
          e.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}

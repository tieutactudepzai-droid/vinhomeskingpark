import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, ImageUp, Pencil, RotateCcw, Undo2 } from "lucide-react";

import { cn } from "@/lib/utils";

const STORAGE_KEY = "kp-content-overrides";
const MODE_KEY = "kp-edit-mode";

type Overrides = Record<string, string>;
type ImageOverrides = Record<string, string>;

// Replacement photos are too large for localStorage, so they live in IndexedDB (same browser only).
const DB_NAME = "kp-edit";
const IMG_STORE = "images";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IMG_STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const req = run(db.transaction(IMG_STORE, mode).objectStore(IMG_STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }).finally(() => db.close());
}

async function loadImages(): Promise<ImageOverrides> {
  const keys = await withStore("readonly", (s) => s.getAllKeys());
  const values = await withStore("readonly", (s) => s.getAll());
  const out: ImageOverrides = {};
  keys.forEach((k, i) => {
    if (typeof values[i] === "string") out[String(k)] = values[i] as string;
  });
  return out;
}

/** Downscale an uploaded photo to a JPEG data URL so it stays light to store and load. */
async function fileToDataUrl(file: File, maxSide = 1920): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

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
  images: ImageOverrides;
  setText: (id: string, value: string) => void;
  setImage: (id: string, dataUrl: string | null) => Promise<void>;
  resetAll: () => void;
  exitEdit: () => void;
};

const EditContext = createContext<EditCtx>({
  editMode: false,
  overrides: {},
  images: {},
  setText: () => {},
  setImage: async () => {},
  resetAll: () => {},
  exitEdit: () => {},
});

export const useEdit = () => useContext(EditContext);

export function EditProvider({ children }: { children: ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [images, setImages] = useState<ImageOverrides>({});
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
    loadImages()
      .then(setImages)
      .catch(() => {});
  }, []);

  const setImage = useCallback(async (id: string, dataUrl: string | null) => {
    if (dataUrl) await withStore("readwrite", (s) => s.put(dataUrl, id));
    else await withStore("readwrite", (s) => s.delete(id));
    setImages((prev) => {
      const next = { ...prev };
      if (dataUrl) next[id] = dataUrl;
      else delete next[id];
      return next;
    });
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
    withStore("readwrite", (s) => s.clear()).catch(() => {});
    setImages({});
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
    <EditContext.Provider value={{ editMode, overrides, images, setText, setImage, resetAll, exitEdit }}>
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
          — bấm vào chữ để sửa, bấm “Đổi ảnh” để thay ảnh. Tự lưu.
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

/**
 * Photo that the owner can swap in edit mode. Its nearest positioned ancestor hosts the
 * "Đổi ảnh" button, so keep the parent `relative`/`absolute`.
 */
export function EditableImage({
  id,
  src,
  buttonClassName = "right-3 top-3",
  ...imgProps
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  id: string;
  src: string;
  buttonClassName?: string;
}) {
  const { editMode, images, setImage } = useEdit();
  const [busy, setBusy] = useState(false);
  const custom = images[id];

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      window.alert("Vui lòng chọn một file ảnh (JPG, PNG, WEBP…).");
      return;
    }
    setBusy(true);
    try {
      await setImage(id, await fileToDataUrl(file));
    } catch {
      window.alert("Không đổi được ảnh này, bạn thử ảnh khác nhé.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <img {...imgProps} src={custom ?? src} />
      {editMode ? (
        <div className={cn("absolute z-20 flex gap-1.5", buttonClassName)}>
          <label className="flex cursor-pointer items-center gap-1.5 rounded-full border border-gold/60 bg-ink/85 px-3 py-1.5 text-xs font-medium text-ivory shadow-elegant backdrop-blur transition-colors hover:text-gold">
            <ImageUp className="h-3.5 w-3.5 text-gold" />
            {busy ? "Đang tải…" : "Đổi ảnh"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onPick}
              disabled={busy}
            />
          </label>
          {custom ? (
            <button
              type="button"
              onClick={() => void setImage(id, null)}
              className="flex items-center gap-1 rounded-full border border-ivory/30 bg-ink/85 px-3 py-1.5 text-xs text-ivory backdrop-blur transition-colors hover:text-gold"
            >
              <Undo2 className="h-3 w-3" /> Ảnh gốc
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

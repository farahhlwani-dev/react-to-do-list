import React, { useState, useRef, useEffect } from "react";

const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    headFont: "'Traditional Arabic', 'Amiri', 'Segoe UI', serif",
    bodyFont: "'Segoe UI', Tahoma, Arial, sans-serif",
    eyebrow: "دفتر يومياتك",
    title: "مهامك",
    subtitle: "نظّم يومك بهدوء ووضوح",
    langSwitch: "EN",
    themeLabel: "السمة",
    moreThemes: "المزيد",
    setDefault: "تعيين كافتراضية",
    isDefault: "السمة الافتراضية",
    lessThemes: "أقل",
    progressLabel: "الإنجاز",
    total: "الكل",
    completed: "مكتملة",
    remaining: "متبقية",
    placeholder: "اكتب مهمة جديدة...",
    add: "إضافة",
    save: "حفظ",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    edited: "معدّلة",
    emptyTitle: "لا توجد مهام هنا",
    emptySub: "أضف مهمة من الحقل أعلاه لتبدأ",
    footer: "تُحفظ المهام أثناء هذه الجلسة فقط",
    markDone: "وضع علامة كمكتملة",
    markUndone: "إلغاء الإكمال",
    createdAt: "أُضيفت",
    locale: "ar-EG",
    filterAll: "الكل",
    filterActive: "نشطة",
    filterDone: "مكتملة",
  },
  en: {
    dir: "ltr",
    headFont: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
    bodyFont: "'Segoe UI', system-ui, sans-serif",
    eyebrow: "Your Journal",
    title: "Tasks",
    subtitle: "A calm, clear way through your day",
    langSwitch: "AR",
    themeLabel: "Theme",
    moreThemes: "More",
    setDefault: "Set as default",
    isDefault: "Default theme",
    lessThemes: "Less",
    progressLabel: "Progress",
    total: "Total",
    completed: "Done",
    remaining: "Left",
    placeholder: "Write a new task...",
    add: "Add",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    edited: "Edited",
    emptyTitle: "Nothing here yet",
    emptySub: "Add a task from the field above to begin",
    footer: "Tasks are saved for this session only",
    markDone: "Mark as complete",
    markUndone: "Mark as incomplete",
    createdAt: "Added",
    locale: "en-US",
    filterAll: "All",
    filterActive: "Active",
    filterDone: "Done",
  },
};


const THEMES = {
  blossom: {
    name: { ar: "وردي", en: "Blossom" },
    primary: "#F4ACB7",
    primaryRGB: "244,172,183",
    primaryHover: "#9D8189",
    success: "#8FA897",
    danger: "#C97B86",
    dangerHover: "#B5636F",
    light: { page: "#FFE5D9", sidebar: "#9D8189", card: "#FFFBF8", border: "#D8E2DC", headline: "#9D8189", sub: "#AC8D92", muted: "#AC8D92", inputText: "#9D8189", sbEyebrow: "#F6DADC", sbHeadline: "#FBEEE9", sbSub: "#D8B9BF", sbMuted: "#8A6F74", moon: "#FBEEE9" },
    dark: { page: "#201A1C", sidebar: "#160F11", card: "#2B2328", border: "#4A3B40", headline: "#FBEEE9", sub: "#D8B9BF", muted: "#C9A9AE", inputText: "#FBEEE9", sbEyebrow: "#F6DADC", sbHeadline: "#FBEEE9", sbSub: "#D8B9BF", sbMuted: "#8A6F74", moon: "#FBEEE9" },
  },
  indigo: {
    name: { ar: "نيلي", en: "Indigo" },
    primary: "#4F46E5",
    primaryRGB: "79,70,229",
    primaryHover: "#4338CA",
    success: "#22C55E",
    danger: "#EF4444",
    dangerHover: "#DC2626",
    light: { page: "#F7F8FC", sidebar: "#1F2937", card: "#FFFFFF", border: "#E5E7EB", headline: "#1F2937", sub: "#6B7280", muted: "#6B7280", inputText: "#1F2937", sbEyebrow: "#A5B4FC", sbHeadline: "#F9FAFB", sbSub: "#9CA3AF", sbMuted: "#6B7280", moon: "#F3F4F6" },
    dark: { page: "#10131A", sidebar: "#0A0D12", card: "#1A1E27", border: "#2E3440", headline: "#F3F4F6", sub: "#9CA3AF", muted: "#9CA3AF", inputText: "#F3F4F6", sbEyebrow: "#A5B4FC", sbHeadline: "#F9FAFB", sbSub: "#9CA3AF", sbMuted: "#6B7280", moon: "#F3F4F6" },
  },
  sage: {
    name: { ar: "عشبي", en: "Sage" },
    primary: "#ACC18A",
    primaryRGB: "172,193,138",
    primaryHover: "#605B56",
    success: "#DAFEB7",
    danger: "#B5695A",
    dangerHover: "#9C574B",
    light: { page: "#F2FBE0", sidebar: "#605B56", card: "#FFFFFF", border: "#E3EAD1", headline: "#33312D", sub: "#605B56", muted: "#837A75", inputText: "#33312D", sbEyebrow: "#DAFEB7", sbHeadline: "#F2FBE0", sbSub: "#C9C2B8", sbMuted: "#938B7F", moon: "#F2FBE0" },
    dark: { page: "#1D1C19", sidebar: "#141311", card: "#272522", border: "#4A443D", headline: "#F2FBE0", sub: "#DAFEB7", muted: "#A79F93", inputText: "#F2FBE0", sbEyebrow: "#DAFEB7", sbHeadline: "#F2FBE0", sbSub: "#C9C2B8", sbMuted: "#938B7F", moon: "#F2FBE0" },
  },
  slate: {
    name: { ar: "رمادي", en: "Slate" },
    primary: "#8D8C9E",
    primaryRGB: "141,140,158",
    primaryHover: "#7E7B8C",
    success: "#7FB28A",
    danger: "#C97B86",
    dangerHover: "#B5636F",
    light: { page: "#F1F4F6", sidebar: "#7E7B8C", card: "#FFFFFF", border: "#D6E0EA", headline: "#2C2B33", sub: "#7E7B8C", muted: "#8D8C9E", inputText: "#2C2B33", sbEyebrow: "#D6E0EA", sbHeadline: "#F1F4F6", sbSub: "#C1CBD8", sbMuted: "#AAADB8", moon: "#F1F4F6" },
    dark: { page: "#1C1B22", sidebar: "#131218", card: "#26242D", border: "#4A4756", headline: "#F1F4F6", sub: "#C1CBD8", muted: "#AAADB8", inputText: "#F1F4F6", sbEyebrow: "#D6E0EA", sbHeadline: "#F1F4F6", sbSub: "#C1CBD8", sbMuted: "#8D8C9E", moon: "#F1F4F6" },
  },
  clay: {
    name: { ar: "طيني", en: "Clay" },
    primary: "#A39171",
    primaryRGB: "163,145,113",
    primaryHover: "#6D4C3D",
    success: "#ABC4AB",
    danger: "#8B4A3A",
    dangerHover: "#763C2F",
    light: { page: "#DCC9B6", sidebar: "#6D4C3D", card: "#FBF7F2", border: "#E2D3C2", headline: "#3A2C22", sub: "#727D71", muted: "#8A7C6C", inputText: "#3A2C22", sbEyebrow: "#ABC4AB", sbHeadline: "#DCC9B6", sbSub: "#C8BCAE", sbMuted: "#9C8F80", moon: "#DCC9B6" },
    dark: { page: "#241A14", sidebar: "#1A130E", card: "#2C2119", border: "#4A392E", headline: "#F3ECE2", sub: "#ABC4AB", muted: "#A99787", inputText: "#F3ECE2", sbEyebrow: "#ABC4AB", sbHeadline: "#F3ECE2", sbSub: "#C8BCAE", sbMuted: "#9C8F80", moon: "#F3ECE2" },
  },
  violet: {
    name: { ar: "بنفسجي", en: "Violet" },
    primary: "#C670FF", primaryRGB: "198,112,255", primaryHover: "#3D0066",
    success: "#FFE047", danger: "#D9486E", dangerHover: "#C23A5E",
    light: { page: "#EEC7FC", sidebar: "#3D0066", card: "#FFF8FF", border: "#DDB0F2", headline: "#3D0066", sub: "#6B2E96", muted: "#8A5BAE", inputText: "#3D0066", sbEyebrow: "#FFE047", sbHeadline: "#EEC7FC", sbSub: "#D3A4EE", sbMuted: "#A67BC4", moon: "#FFE047" },
    dark: { page: "#1A0A26", sidebar: "#12051C", card: "#26103A", border: "#4B2570", headline: "#EEC7FC", sub: "#D3A4EE", muted: "#B48ED0", inputText: "#EEC7FC", sbEyebrow: "#FFE047", sbHeadline: "#EEC7FC", sbSub: "#D3A4EE", sbMuted: "#A67BC4", moon: "#FFE047" },
  },
  mint: {
    name: { ar: "نعناعي", en: "Mint" },
    primary: "#70ABAF", primaryRGB: "112,171,175", primaryHover: "#4E8A8F",
    success: "#99E1D9", danger: "#C4666B", dangerHover: "#AE5359",
    light: { page: "#F0F7F4", sidebar: "#32292F", card: "#FFFFFF", border: "#D3E6E1", headline: "#32292F", sub: "#705D56", muted: "#8A7A73", inputText: "#32292F", sbEyebrow: "#99E1D9", sbHeadline: "#F0F7F4", sbSub: "#B7CFCB", sbMuted: "#8F8A8C", moon: "#F0F7F4" },
    dark: { page: "#1B1719", sidebar: "#120F11", card: "#251F23", border: "#443A41", headline: "#F0F7F4", sub: "#99E1D9", muted: "#A89C97", inputText: "#F0F7F4", sbEyebrow: "#99E1D9", sbHeadline: "#F0F7F4", sbSub: "#B7CFCB", sbMuted: "#8F8A8C", moon: "#F0F7F4" },
  },
  taupe: {
    name: { ar: "رمادي دافئ", en: "Taupe" },
    primary: "#948B89", primaryRGB: "148,139,137", primaryHover: "#726E75",
    success: "#8FA77A", danger: "#B5695A", dangerHover: "#9C574B",
    light: { page: "#DDE0BD", sidebar: "#726E75", card: "#FAFAF0", border: "#D0D1AC", headline: "#3B383D", sub: "#726E75", muted: "#8A8288", inputText: "#3B383D", sbEyebrow: "#DDE0BD", sbHeadline: "#F3F4E2", sbSub: "#D0D1AC", sbMuted: "#B6A39E", moon: "#F3F4E2" },
    dark: { page: "#1E1D1F", sidebar: "#151416", card: "#29272A", border: "#4A464B", headline: "#EEF0D8", sub: "#D0D1AC", muted: "#B6A39E", inputText: "#EEF0D8", sbEyebrow: "#DDE0BD", sbHeadline: "#F3F4E2", sbSub: "#D0D1AC", sbMuted: "#948B89", moon: "#F3F4E2" },
  },
  dune: {
    name: { ar: "كثيب", en: "Dune" },
    primary: "#96C0B7", primaryRGB: "150,192,183", primaryHover: "#725752",
    success: "#D4DFC7", danger: "#B5695A", dangerHover: "#9C574B",
    light: { page: "#FEF6C9", sidebar: "#725752", card: "#FFFDF0", border: "#D4DFC7", headline: "#4A3733", sub: "#725752", muted: "#878E88", inputText: "#4A3733", sbEyebrow: "#D4DFC7", sbHeadline: "#FEF6C9", sbSub: "#D4DFC7", sbMuted: "#B3A29E", moon: "#FEF6C9" },
    dark: { page: "#1F1A19", sidebar: "#161211", card: "#2A2322", border: "#4D4240", headline: "#FEF6C9", sub: "#D4DFC7", muted: "#A9A39B", inputText: "#FEF6C9", sbEyebrow: "#D4DFC7", sbHeadline: "#FEF6C9", sbSub: "#D4DFC7", sbMuted: "#B3A29E", moon: "#FEF6C9" },
  },
  ocean: {
    name: { ar: "أزرق", en: "Blue" },
    primary: "#5F75A8", primaryRGB: "95,117,168", primaryHover: "#4B5F90",
    success: "#E8D588", danger: "#C0576A", dangerHover: "#A9475A",
    light: { page: "#FAF6F7", sidebar: "#343E5E", card: "#FFFFFF", border: "#C8B8DB", headline: "#2B3350", sub: "#6C6F94", muted: "#8890BB", inputText: "#2B3350", sbEyebrow: "#C8B8DB", sbHeadline: "#F7F1DB", sbSub: "#B4B9D6", sbMuted: "#8890BB", moon: "#F7F1DB" },
    dark: { page: "#12141C", sidebar: "#0B0C12", card: "#1B1E2B", border: "#363B55", headline: "#FAF6F7", sub: "#C8B8DB", muted: "#8890BB", inputText: "#FAF6F7", sbEyebrow: "#C8B8DB", sbHeadline: "#F7F1DB", sbSub: "#B4B9D6", sbMuted: "#8890BB", moon: "#F7F1DB" },
  },
  olive: {
    name: { ar: "زيتوني", en: "Olive" },
    primary: "#717744", primaryRGB: "113,119,68", primaryHover: "#373D20",
    success: "#BCBD8B", danger: "#A5543F", dangerHover: "#8E4533",
    light: { page: "#EFF1ED", sidebar: "#373D20", card: "#FFFFFF", border: "#D9DCCB", headline: "#373D20", sub: "#766153", muted: "#8E8577", inputText: "#373D20", sbEyebrow: "#BCBD8B", sbHeadline: "#EFF1ED", sbSub: "#C9CBAA", sbMuted: "#8F9370", moon: "#EFF1ED" },
    dark: { page: "#191B12", sidebar: "#101209", card: "#23261A", border: "#454A30", headline: "#EFF1ED", sub: "#BCBD8B", muted: "#A39A8A", inputText: "#EFF1ED", sbEyebrow: "#BCBD8B", sbHeadline: "#EFF1ED", sbSub: "#C9CBAA", sbMuted: "#8F9370", moon: "#EFF1ED" },
  },
  meadow: {
    name: { ar: "مرج", en: "Meadow" },
    primary: "#A89F68", primaryRGB: "168,159,104", primaryHover: "#41521F",
    success: "#D5E88A", danger: "#B5603F", dangerHover: "#9C5034",
    light: { page: "#F5FDC6", sidebar: "#41521F", card: "#FFFEF2", border: "#E3DDB0", headline: "#2B3715", sub: "#6B6A3E", muted: "#8F8A5A", inputText: "#2B3715", sbEyebrow: "#F5C396", sbHeadline: "#F5FDC6", sbSub: "#D8D9A8", sbMuted: "#A8A66F", moon: "#F5FDC6" },
    dark: { page: "#1A1D10", sidebar: "#10130A", card: "#242815", border: "#474C2A", headline: "#F5FDC6", sub: "#D0B17A", muted: "#A89F68", inputText: "#F5FDC6", sbEyebrow: "#F5C396", sbHeadline: "#F5FDC6", sbSub: "#D8D9A8", sbMuted: "#A8A66F", moon: "#F5FDC6" },
  },
};


const PRIMARY_THEME_KEYS = ["ocean", "blossom", "sage", "violet"];
const ALL_THEME_KEYS = [
  ...PRIMARY_THEME_KEYS,
  ...Object.keys(THEMES).filter((k) => !PRIMARY_THEME_KEYS.includes(k)),
];


const DEFAULT_THEME_STORAGE_KEY = "todo-default-theme";
const FALLBACK_THEME_KEY = "ocean";

function loadDefaultThemeKey() {
  try {
    const saved = window.localStorage.getItem(DEFAULT_THEME_STORAGE_KEY);
    if (saved && THEMES[saved]) return saved;
  } catch {
   
  }
  return FALLBACK_THEME_KEY;
}

function saveDefaultThemeKey(key) {
  try {
    window.localStorage.setItem(DEFAULT_THEME_STORAGE_KEY, key);
  } catch {
    
  }
}

function formatTimestamp(date, locale) {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

const seedTimestamp = (offsetMinutes) => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - offsetMinutes);
  return d;
};

const initialTasks = [
  { id: 1, textAr: "مراجعة عرض المشروع قبل الاجتماع", textEn: "Review the project deck before the meeting", complete: false, createdAt: seedTimestamp(120) },
  { id: 2, textAr: "الرد على بريد الفريق", textEn: "Reply to the team email", complete: true, createdAt: seedTimestamp(60) },
  { id: 3, textAr: "تحديث قائمة المهام الأسبوعية", textEn: "Update the weekly task list", complete: false, createdAt: seedTimestamp(10) },
];

function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf;
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
   
  }, [target]);
  return value;
}

function ToDoList() {
  const [lang, setLang] = useState("ar");
  const [defaultThemeKey, setDefaultThemeKey] = useState(loadDefaultThemeKey);
  const [themeKey, setThemeKey] = useState(defaultThemeKey);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [mounted, setMounted] = useState(false);
  const [removingIds, setRemovingIds] = useState([]);
  const [filter, setFilter] = useState("all");
  const [justAdded, setJustAdded] = useState(false);
  const inputRef = useRef(null);

  const t = TRANSLATIONS[lang];
  const nextId = useRef(initialTasks.length ? Math.max(...initialTasks.map((tk) => tk.id)) + 1 : 1);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  function getTaskText(tk) {
    if (tk.text !== undefined) return tk.text;
    return lang === "ar" ? tk.textAr : tk.textEn;
  }

  const total = tasks.length;
  const doneCount = tasks.filter((tk) => tk.complete).length;
  const progress = total ? Math.round((doneCount / total) * 100) : 0;
  const animatedProgress = useCountUp(progress);

  const visibleTasks = tasks.filter((tk) => {
    if (filter === "active") return !tk.complete;
    if (filter === "done") return tk.complete;
    return true;
  });

  function handleAddTask() {
    const text = taskInput.trim();
    if (!text) return;
    const newTask = { id: nextId.current++, text, complete: false, createdAt: new Date() };
    setTasks((prev) => [...prev, newTask]);
    setTaskInput("");
    inputRef.current?.focus();
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 500);
  }

  function deleteTask(id) {
    setRemovingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setTasks((prev) => prev.filter((tk) => tk.id !== id));
      setRemovingIds((prev) => prev.filter((rid) => rid !== id));
    }, 320);
  }

  function editTask(id) {
    setTasks((prev) => prev.map((tk) => (tk.id === id ? { ...tk, isEditing: true, tempText: getTaskText(tk) } : tk)));
  }
  function handleEditChange(id, newText) {
    setTasks((prev) => prev.map((tk) => (tk.id === id ? { ...tk, tempText: newText } : tk)));
  }
  function saveEdit(id) {
    setTasks((prev) =>
      prev.map((tk) =>
        tk.id === id
          ? { ...tk, text: tk.tempText ?? getTaskText(tk), textAr: undefined, textEn: undefined, isEditing: false, isEdited: true, tempText: undefined }
          : tk
      )
    );
  }
  function cancelEdit(id) {
    setTasks((prev) => prev.map((tk) => (tk.id === id ? { ...tk, isEditing: false, tempText: undefined } : tk)));
  }
  function toggleComplete(id) {
    setTasks((prev) => prev.map((tk) => (tk.id === id ? { ...tk, complete: !tk.complete } : tk)));
  }

  const TP = THEMES[themeKey];
  const modeTokens = darkMode ? TP.dark : TP.light;
  const theme = {
    ...modeTokens,
    primary: TP.primary,
    primaryRGB: TP.primaryRGB,
    primaryHover: TP.primaryHover,
    success: TP.success,
    danger: TP.danger,
    dangerHover: TP.dangerHover,
  };

  
  const visibleThemeKeys = showAllThemes
    ? ALL_THEME_KEYS
    : [
        ...PRIMARY_THEME_KEYS,
        ...[themeKey, defaultThemeKey].filter(
          (k, i, arr) => !PRIMARY_THEME_KEYS.includes(k) && arr.indexOf(k) === i
        ),
      ];

  const isCurrentDefault = themeKey === defaultThemeKey;
  function handleSetDefault() {
    setDefaultThemeKey(themeKey);
    saveDefaultThemeKey(themeKey);
  }

  const r = 46;
  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference * (1 - progress / 100);

  const filters = [
    { key: "all", label: t.filterAll },
    { key: "active", label: t.filterActive },
    { key: "done", label: t.filterDone },
  ];
  const filterIndex = filters.findIndex((f) => f.key === filter);

  return (
    <div
      dir={t.dir}
      className="min-h-screen w-full flex flex-col lg:flex-row transition-colors duration-500"
      style={{ background: theme.page, fontFamily: t.bodyFont }}
    >
      <style>{`
        @keyframes riseIn { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        @keyframes sidebarIn { from { opacity:0; transform:translateY(-10px);} to { opacity:1; transform:translateY(0);} }
        @keyframes slideOut { from { opacity:1; transform:scale(1); max-height:140px;} to { opacity:0; transform:scale(0.94); max-height:0; margin:0; padding-top:0; padding-bottom:0; border-width:0;} }
        @keyframes rotate-center { 0% { transform: translateX(var(--tx,26px)) rotate(0); } 100% { transform: translateX(var(--tx,26px)) rotate(360deg); } }
        @keyframes star-twinkle { 0%{transform:scale(1);} 40%{transform:scale(1.2);} 80%{transform:scale(0.8);} 100%{transform:scale(1);} }
        @keyframes swatchPop { 0% { transform: scale(1); } 50% { transform: scale(1.18); } 100% { transform: scale(1); } }
        .task-row { animation: riseIn 0.5s cubic-bezier(0.16,1,0.3,1) backwards; transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .task-row:hover { transform: translateY(-3px); box-shadow: 0 10px 24px -14px rgba(0,0,0,0.3); }
        .task-row.removing { animation: slideOut 0.32s cubic-bezier(0.4,0,0.2,1) forwards; overflow: hidden; }
        .sidebar-item { animation: sidebarIn 0.6s cubic-bezier(0.16,1,0.3,1) backwards; }
        .ring-progress { transition: stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1); }
        .btn-press:active { transform: scale(0.96); }
        .filter-highlight { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.4s ease; }
        input:focus-visible, button:focus-visible { outline: 2px solid ${theme.primary}; outline-offset: 2px; }

        
        .theme-swatch {
          width: 26px; height: 26px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.35);
          cursor: pointer; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0; position: relative;
        }
        .theme-swatch.is-default::after {
          content: ""; position: absolute; top: 50%; left: 50%; width: 6px; height: 6px;
          margin: -3px 0 0 -3px; border-radius: 50%; background: #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
        }
        .theme-default-btn {
          margin-top: 12px; height: 28px; padding: 0 14px; border-radius: 9999px; cursor: pointer;
          font-size: 11px; font-weight: 700; background: transparent;
          border: 1.5px solid rgba(255,255,255,0.35);
          transition: background 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;
        }
        .theme-default-btn:hover:not(:disabled) { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.6); }
        .theme-default-btn:disabled { cursor: default; opacity: 0.65; }
        .theme-swatch:hover { transform: translateY(-2px) scale(1.08); }
        .theme-swatch.active { border-color: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.25); animation: swatchPop 0.4s ease; }

        .theme-more {
          height: 26px; padding: 0 12px; border-radius: 9999px; flex-shrink: 0; cursor: pointer;
          font-size: 11px; font-weight: 700; background: transparent;
          border: 1.5px solid rgba(255,255,255,0.35);
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .theme-more:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.6); }

        
        .dn-switch { position: relative; display: inline-block; width: 60px; height: 34px; flex-shrink: 0; }
        .dn-switch input { opacity: 0; width: 0; height: 0; }
        .dn-slider { position: absolute; inset: 0; cursor: pointer; background-color: rgba(255,255,255,0.18); transition: 0.4s; border-radius: 34px; overflow: hidden; }
        .dn-sun-moon { position: absolute; height: 26px; width: 26px; left: 4px; bottom: 4px; background-color: #ffd75e; border-radius: 50%; transition: 0.4s; display:flex; align-items:center; justify-content:center; }
        .dn-switch input:checked + .dn-slider { background-color: ${theme.primary}; }
        .dn-switch input:checked + .dn-slider .dn-sun-moon { transform: translateX(26px); background-color: ${theme.moon}; animation: rotate-center 0.6s ease-in-out both; }
        .dn-crater { opacity: 0; transition: 0.4s; fill: rgba(0,0,0,0.25); }
        .dn-switch input:checked + .dn-slider .dn-crater { opacity: 1; }
        .dn-stars { position: absolute; inset: 0; opacity: 0; transform: translateY(-6px); transition: 0.4s; }
        .dn-switch input:checked + .dn-slider .dn-stars { opacity: 1; transform: translateY(0); }
        .dn-star { fill: ${theme.moon}; position: absolute; animation: star-twinkle 2s infinite; }

        .todo-check-wrap { position: relative; width: 30px; height: 30px; flex-shrink: 0; }
        .todo-check-bg { position: absolute; inset: 0; border-radius: 9px; background-color: ${theme.card}; border: 1px solid ${theme.border}; transition: all 0.3s; }
        .todo-checkbox { position: absolute; inset: 0; width: 30px; height: 30px; cursor: pointer; appearance: none; border-radius: 9px; background-color: ${theme.border}; z-index: 2; transition: all 0.25s ease-out; }
        .todo-checkbox:hover { background-color: ${theme.primaryHover}; transform: translate(2px, 2px); }
        .todo-checkbox:checked { background-color: ${theme.primary}; transform: translate(2px, 2px); }
        .todo-check-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 3; color: #fff; transform: rotate(0deg) scale(0); transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); pointer-events: none; }
        .todo-checkbox:checked ~ .todo-check-icon { transform: rotate(360deg) scale(1); }

       
        .task-input-pill {
          position: relative; display: flex; align-items: center; gap: 12px; flex: 1;
          border-radius: 9999px; padding-inline-start: 22px; padding-inline-end: 22px;
          background: ${theme.card}; border: 1.5px solid ${theme.border};
          transition: border-color 0.3s ease, box-shadow 0.35s ease, transform 0.3s ease, background 0.4s ease;
        }
        .task-input-pill:focus-within {
          border-color: ${theme.primary};
          box-shadow: 0 0 0 5px rgba(${theme.primaryRGB},${darkMode ? 0.28 : 0.2}), 0 10px 24px -12px rgba(0,0,0,0.25);
          transform: translateY(-2px);
        }
        .task-input-field {
          flex: 1; min-width: 0; background: transparent; border: none; outline: none;
          padding: 15px 2px; font-size: 15px; font-weight: 500; color: ${theme.inputText};
        }

        
        .add-circle-btn {
          position: relative; flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; color: #fff; border: none; cursor: pointer;
          background: ${theme.primary};
          box-shadow: 0 8px 18px -8px rgba(${theme.primaryRGB},0.6);
          transition: background 0.3s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          overflow: hidden;
        }
        .add-circle-btn:hover { background: ${theme.primaryHover}; transform: translateY(-2px) scale(1.05); }
        .add-circle-btn:active { transform: scale(0.92); }
        .add-circle-btn .ripple {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(255,255,255,0.5); transform: scale(0); opacity: 0;
        }
        .add-circle-btn.pop { animation: addPop 0.45s cubic-bezier(0.34,1.56,0.64,1); }
        .add-circle-btn.pop .ripple { animation: rippleGrow 0.5s ease-out; }
        @keyframes addPop { 0% { transform: scale(1); } 35% { transform: scale(1.18) rotate(90deg); } 100% { transform: scale(1) rotate(180deg); } }
        @keyframes rippleGrow { from { transform: scale(0); opacity: 0.6; } to { transform: scale(1.9); opacity: 0; } }

        @media (prefers-reduced-motion: reduce) {
          .task-row, .sidebar-item, .task-row.removing, .ring-progress, .filter-highlight,
          .add-circle-btn, .add-circle-btn.pop, .dn-switch *, .task-input-pill *, .theme-swatch { animation: none !important; transition: none !important; }
        }
      `}</style>

      
      <aside className="w-full lg:w-80 shrink-0 flex flex-col justify-between p-8 lg:min-h-screen transition-colors duration-500" style={{ background: theme.sidebar }}>
        <div className="flex flex-col gap-7">
          <div className="sidebar-item flex items-center justify-between" style={{ animationDelay: "0ms" }}>
            <button
              onClick={() => setLang((l) => (l === "ar" ? "en" : "ar"))}
              className="btn-press px-3 py-1.5 rounded-full text-xs font-bold border transition"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: theme.sbHeadline }}
            >
              {t.langSwitch}
            </button>

            <label className="dn-switch" aria-label="dark mode toggle">
              <input type="checkbox" checked={darkMode} onChange={() => setDarkMode((d) => !d)} />
              <span className="dn-slider">
                <span className="dn-sun-moon">
                  <svg width="26" height="26" viewBox="0 0 26 26" style={{ position: "absolute", inset: 0 }}>
                    <circle className="dn-crater" cx="8" cy="7" r="1.6" />
                    <circle className="dn-crater" cx="6" cy="13" r="2.3" />
                    <circle className="dn-crater" cx="14" cy="16" r="1.1" />
                  </svg>
                </span>
                <span className="dn-stars">
                  <svg className="dn-star" style={{ top: "3px", left: "4px" }} width="7" height="7" viewBox="0 0 10 10"><polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" /></svg>
                  <svg className="dn-star" style={{ top: "16px", left: "5px", animationDelay: "0.4s" }} width="4" height="4" viewBox="0 0 10 10"><polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" /></svg>
                  <svg className="dn-star" style={{ top: "20px", left: "12px", animationDelay: "0.8s" }} width="5" height="5" viewBox="0 0 10 10"><polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" /></svg>
                </span>
              </span>
            </label>
          </div>

          <div className="sidebar-item" style={{ animationDelay: "40ms" }}>
            <p className="text-[11px] font-bold uppercase mb-2" style={{ color: theme.sbMuted, letterSpacing: "0.08em" }}>{t.themeLabel}</p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {visibleThemeKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setThemeKey(key)}
                  aria-label={THEMES[key].name[lang]}
                  title={THEMES[key].name[lang]}
                  className={`theme-swatch${themeKey === key ? " active" : ""}${defaultThemeKey === key ? " is-default" : ""}`}
                  style={{ background: THEMES[key].primary }}
                />
              ))}
              <button
                type="button"
                onClick={() => setShowAllThemes((v) => !v)}
                aria-expanded={showAllThemes}
                className="theme-more btn-press"
                style={{ color: theme.sbHeadline }}
              >
                {showAllThemes ? t.lessThemes : t.moreThemes}
              </button>
            </div>
            <button
              type="button"
              onClick={handleSetDefault}
              disabled={isCurrentDefault}
              className="theme-default-btn btn-press"
              style={{ color: theme.sbHeadline }}
            >
              {isCurrentDefault ? `✓ ${t.isDefault}` : t.setDefault}
            </button>
          </div>

          <div className="sidebar-item" style={{ animationDelay: "90ms" }}>
            <p className="text-xs font-bold tracking-wide uppercase" style={{ color: theme.sbEyebrow, letterSpacing: "0.08em" }}>{t.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl mt-2 leading-tight" style={{ color: theme.sbHeadline, fontFamily: t.headFont, fontWeight: 700 }}>{t.title}</h1>
            <p className="text-sm mt-2" style={{ color: theme.sbSub }}>{t.subtitle}</p>
          </div>

          <div className="sidebar-item flex items-center gap-5" style={{ animationDelay: "170ms" }}>
            <svg width="112" height="112" viewBox="0 0 112 112" className="shrink-0">
              <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="9" />
              <circle cx="56" cy="56" r={r} fill="none" stroke={theme.primary} strokeWidth="9" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashoffset} transform="rotate(-90 56 56)" className="ring-progress" />
              <text x="56" y="62" textAnchor="middle" fontSize="22" fontWeight="700" fill={theme.sbHeadline}>{animatedProgress}%</text>
            </svg>
            <div className="flex flex-col gap-2">
              <div><span className="text-lg font-extrabold" style={{ color: theme.sbHeadline }}>{total}</span><span className="text-xs font-semibold ms-2" style={{ color: theme.sbSub }}>{t.total}</span></div>
              <div><span className="text-lg font-extrabold" style={{ color: theme.success }}>{doneCount}</span><span className="text-xs font-semibold ms-2" style={{ color: theme.sbSub }}>{t.completed}</span></div>
              <div><span className="text-lg font-extrabold" style={{ color: theme.sbEyebrow }}>{total - doneCount}</span><span className="text-xs font-semibold ms-2" style={{ color: theme.sbSub }}>{t.remaining}</span></div>
            </div>
          </div>
        </div>
        <p className="sidebar-item text-xs font-medium" style={{ color: theme.sbMuted, animationDelay: "220ms" }}>{t.footer}</p>
      </aside>

      
      <main className="flex-1 flex flex-col p-6 md:p-12 gap-8">
        <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }} className="flex items-center gap-3">
          <div className="task-input-pill">
            <input
              ref={inputRef}
              aria-label={t.placeholder}
              type="text"
              placeholder={t.placeholder}
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="task-input-field"
            />
          </div>

          <button type="submit" className={`add-circle-btn${justAdded ? " pop" : ""}`} aria-label={t.add}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
            <span className="ripple" />
          </button>
        </form>

        <div className="relative flex rounded-2xl p-1 self-start" style={{ background: theme.card, border: `1px solid ${theme.border}` }}>
          <div
            className="filter-highlight absolute top-1 bottom-1 rounded-xl"
            style={{
              width: `calc(${100 / filters.length}% - 4px)`,
              background: theme.primary,
              transform: `translateX(${t.dir === "rtl" ? filterIndex * -100 : filterIndex * 100}%)`,
              [t.dir === "rtl" ? "right" : "left"]: "4px",
            }}
          />
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className="relative z-10 px-5 py-2 text-sm font-bold rounded-xl transition-colors duration-300" style={{ color: filter === f.key ? "#fff" : theme.sub, minWidth: "84px" }}>
              {f.label}
            </button>
          ))}
        </div>

        {visibleTasks.length === 0 ? (
          <div className="rounded-2xl border py-16 text-center" style={{ background: theme.card, borderColor: theme.border }}>
            <p className="font-bold text-lg" style={{ color: theme.headline, fontFamily: t.headFont }}>{t.emptyTitle}</p>
            <p className="text-sm mt-1" style={{ color: theme.muted }}>{t.emptySub}</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {visibleTasks.map((tk, index) => {
              const isRemoving = removingIds.includes(tk.id);
              const label = getTaskText(tk);
              return (
                <li key={tk.id} className={`task-row ${isRemoving ? "removing" : ""} flex flex-col gap-2 p-4 md:p-5 rounded-2xl border`} style={{ background: theme.card, borderColor: theme.border, animationDelay: mounted ? "0ms" : `${index * 70}ms` }}>
                  {tk.isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        autoFocus
                        value={tk.tempText ?? label}
                        onChange={(e) => handleEditChange(tk.id, e.target.value)}
                        className="flex-1 px-4 py-2.5 text-sm rounded-xl border-2 focus:outline-none"
                        style={{ background: theme.card, color: theme.headline, borderColor: theme.primary }}
                      />
                      <button onClick={() => saveEdit(tk.id)} className="btn-press px-4 py-2.5 text-xs font-bold text-white rounded-xl transition" style={{ background: theme.primary }}>{t.save}</button>
                      <button onClick={() => cancelEdit(tk.id)} className="btn-press px-4 py-2.5 text-xs font-bold rounded-xl border transition" style={{ color: theme.headline, borderColor: theme.border }}>{t.cancel}</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="todo-check-wrap">
                          <div className="todo-check-bg" />
                          <input
                            type="checkbox"
                            className="todo-checkbox"
                            checked={tk.complete}
                            onChange={() => toggleComplete(tk.id)}
                            aria-label={tk.complete ? t.markUndone : t.markDone}
                          />
                          <span className="todo-check-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 min-w-0 flex-wrap">
                            <span className="truncate text-base transition-all" style={{ color: tk.complete ? theme.muted : theme.headline, textDecoration: tk.complete ? "line-through" : "none", fontWeight: tk.complete ? 400 : 600 }}>
                              {label}
                            </span>
                            {tk.isEdited && (
                              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ borderColor: theme.border, color: theme.muted }}>{t.edited}</span>
                            )}
                          </div>
                          {tk.createdAt && (
                            <p className="text-[11px] font-medium mt-0.5" style={{ color: theme.muted }}>{t.createdAt} · {formatTimestamp(tk.createdAt, t.locale)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => editTask(tk.id)} className="btn-press px-3.5 py-2 text-xs font-bold rounded-xl border transition" style={{ color: theme.headline, borderColor: theme.border }}>{t.edit}</button>
                        <button onClick={() => deleteTask(tk.id)} className="btn-press px-3.5 py-2 text-xs font-bold text-white rounded-xl transition" style={{ background: theme.danger }} onMouseEnter={(e) => (e.currentTarget.style.background = theme.dangerHover)} onMouseLeave={(e) => (e.currentTarget.style.background = theme.danger)}>{t.delete}</button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}

export default ToDoList;
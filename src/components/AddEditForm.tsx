import { STYLES_GENERAL_BTN, APP_LANGUAGES, STYLES_BLOCK_HEADER } from "../constants.ts";
import { useState, useEffect } from "react";
import { useMyContext } from "../context/AppContext.tsx";

export default function AddEditForm() {
  const { entries, setEntries, setNotificationContent, setIsNotificationShown, editingEntryId, setEditingEntryId, setActiveView } = useMyContext();

  useEffect(() => {
    if (!editingEntryId) return;
    const entry = entries.find((e) => e.id === editingEntryId);
    if (!entry) return;
    setFormData({
      word: entry.word,
      language: entry.language,
      translation: entry.translation,
      definition: entry.definition || "",
      tag: entry.tag || "",
      hint: entry.hint || "",
      imageUrl: entry.imageUrl || "",
    });
  }, [editingEntryId, entries]);

  const [formData, setFormData] = useState({
    word: "",
    language: "",
    translation: "",
    definition: "",
    tag: "",
    hint: "",
    imageUrl: "",
  });

  interface Field {
    name: string;
    label: string;
    isRequired: boolean;
    type: string;
    placeholder: string;
  }

  function valueGetter(fieldName: keyof typeof formData) {
    return formData[fieldName];
  }

  function valueSetter(fieldName: keyof typeof formData, newValue: string) {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  }

  {
    /* Word, language, translation, definition, hint, web image URL */
  }
  const fields: Field[] = [
    {
      name: "word",
      label: "word",
      isRequired: true,
      type: "text",
      placeholder: "Word",
    },
    {
      name: "language",
      label: "language",
      isRequired: true,
      type: "select",
      placeholder: "Language",
    },
    {
      name: "translation",
      label: "translation",
      isRequired: true,
      type: "text",
      placeholder: "Translation",
    },
    {
      name: "definition",
      label: "definition",
      isRequired: false,
      type: "text",
      placeholder: "Definition",
    },
    {
      name: "tag",
      label: "tag",
      isRequired: false,
      type: "text",
      placeholder: "Tag", // tag, category, part of speech, topic
    },
    {
      name: "hint",
      label: "hint",
      isRequired: false,
      type: "text",
      placeholder: "Hint",
    },
    {
      name: "imageUrl",
      label: "image url",
      isRequired: false,
      type: "url",
      placeholder: "Web image URL",
    },
  ];

  const fieldStyles: string = `bg-transparent border-b border-solid border-emerald-800 focus:outline-none p-1`;

  // ============================================================================

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingEntryId !== null) {
      // edit entry
      const wordEntry = {
        word: formData.word.trim(),
        language: formData.language.trim(),
        translation: formData.translation.trim(),
        definition: formData.definition.trim(),
        tag: formData.tag.trim(),
        hint: formData.hint.trim(),
        imageUrl: formData.imageUrl.trim(),
        modifiedAt: new Date().toISOString(),
      };
      console.warn("VALIDATION NEEDED!");
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingEntryId
            ? {
                ...entry,
                ...wordEntry,
              }
            : entry,
        ),
      );
      setIsNotificationShown(true);
      setNotificationContent(["success", "Edited successfully!"]);
      setEditingEntryId(null);
      setActiveView("view");
    } else {
      // add entry
      const wordEntry = {
        id: crypto.randomUUID(),
        word: formData.word.trim(),
        language: formData.language.trim(),
        translation: formData.translation.trim(),
        definition: formData.definition.trim(),
        hint: formData.hint.trim(),
        imageUrl: formData.imageUrl.trim(),
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };
      console.warn("VALIDATION NEEDED!");
      setEntries((prev) => [...prev, wordEntry]);
      setIsNotificationShown(true);
      setNotificationContent(["success", "Submitted successfully!"]);
    }

    // reset form fields
    setFormData({
      word: "",
      language: "",
      translation: "",
      definition: "",
      tag: "",
      hint: "",
      imageUrl: "",
    });
  }

  // ============================================================================

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl font-mono text-emerald-400">
        <h2 className={STYLES_BLOCK_HEADER}>{editingEntryId ? "EDIT" : "ADD"} ENTRY</h2>

        <form onSubmit={submitForm} className="grid grid-cols-2 gap-x-8 gap-y-8">
          {fields.map((f, i) => {
            if (f.type !== "select") {
              // return input text or url
              return (
                <div className="flex gap-2" key={f.name}>
                  {f.isRequired && <span style={{ color: "red" }}>*</span>}
                  <input value={valueGetter(f.name as keyof typeof formData)} onChange={(e) => valueSetter(f.name as keyof typeof formData, e.target.value)} name={f.name} type={f.type} placeholder={f.placeholder} required={f.isRequired} className={`${fieldStyles} w-full`} autoFocus={i === 0} autoComplete="off" />
                </div>
              );
            } else {
              // return select
              return (
                <div className="flex gap-2" key={f.name}>
                  {f.isRequired && <span style={{ color: "red" }}>*</span>}
                  <select value={valueGetter(f.name as keyof typeof formData)} onChange={(e) => valueSetter(f.name as keyof typeof formData, e.target.value)} name={f.name} required={f.isRequired} className="bg-transparent border-b border-solid border-emerald-800 focus:outline-none w-full p-1 cursor-pointer" defaultValue="">
                    <option value="" disabled>
                      {f.placeholder}
                    </option>
                    {Object.entries(APP_LANGUAGES).map(([label, [code, color, flag]]) => (
                      <option key={code} value={code}>
                        {flag} {label.charAt(0).toUpperCase() + label.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
          })}

          <div className="col-span-2 flex justify-end pt-4">
            <button type="submit" className={`${STYLES_GENERAL_BTN} border-dashed border-emerald-600`}>
              {editingEntryId ? "Change" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

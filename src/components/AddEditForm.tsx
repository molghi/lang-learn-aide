import { STYLES_GENERAL_BTN, APP_LANGUAGES } from "../constants.ts";

interface Field {
  name: string;
  label: string;
  isRequired: boolean;
  type: string;
  placeholder: string;
}

export default function AddEditForm() {
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

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-xl font-mono text-emerald-400">
        <h2 className="text-center text-3xl mb-14 tracking-wide">ADD ENTRY</h2>

        <form className="grid grid-cols-2 gap-x-8 gap-y-8">
          {fields.map((f, i) => {
            if (f.type !== "select") {
              // return input text or url
              return (
                <div className="flex gap-2" key={f.name}>
                  {f.isRequired && <span style={{ color: "red" }}>*</span>}
                  <input name={f.name} type={f.type} placeholder={f.placeholder} required={f.isRequired} className={`${fieldStyles} w-full`} autoFocus={i === 0} />
                </div>
              );
            } else {
              // return select
              return (
                <div className="flex gap-2" key={f.name}>
                  {f.isRequired && <span style={{ color: "red" }}>*</span>}
                  <select name={f.name} required={f.isRequired} className="bg-transparent border-b border-solid border-emerald-800 focus:outline-none w-full p-1 cursor-pointer" defaultValue="">
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
            <button className={STYLES_GENERAL_BTN}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

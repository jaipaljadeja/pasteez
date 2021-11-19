import React from "react";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import CodeEditor from "./CodeEditor";

export default function PasteezCodeEditor({
  languages,
  data,
  setData,
  syntaxStyles,
  setShowPasswordModal,
  setPassword,
  password,
}) {
  return (
    <ThemeSwitcherProvider
      defaultTheme={data.syntaxStyle}
      themeMap={syntaxStyles}
      insertionPoint={document.getElementById("inject-styles-here")}
    >
      <CodeEditor
        languages={languages}
        syntaxStyles={syntaxStyles}
        data={data}
        setData={setData}
        setShowPasswordModal={setShowPasswordModal}
        setPassword={setPassword}
        password={password}
      />
    </ThemeSwitcherProvider>
  );
}

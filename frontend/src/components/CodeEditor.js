import React from "react";
import Dropdown from "react-dropdown";
import Editor from "react-simple-code-editor";
import { useThemeSwitcher } from "react-css-theme-switcher";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import toast, { Toaster } from "react-hot-toast";
import { generateURL } from "../utils/UrlUtils";
import ColorPicker from "./ColorPicker";
const hljs = require("highlight.js");

export default function CodeEditor({ languages, data, setData, syntaxStyles }) {
  // This is required to use multiple CSS Files
  const { switcher, themes } = useThemeSwitcher();

  // When a user changes language from the editor
  const handleLangChange = (lang) => {
    setData({ ...data, lang: lang });
  };

  // When a user changes the syntax theme from the editor
  const handleSyntaxThemeChange = (syntaxStyle) => {
    console.log(syntaxStyle);
    switcher({ theme: themes[syntaxStyle] });
    setData({ ...data, syntaxStyle: syntaxStyle });
  };

  // When a user clicks export button to export code in image format
  const handleImageExport = () => {
    toast.promise(
      htmlToImage
        .toPng(document.getElementsByClassName("exportableFrame")[0], {
          pixelRatio: 2,
        })
        .then(function (dataUrl) {
          download(dataUrl, `${data.title}.png`);
        }),
      {
        loading: "Exporting",
        success: "Exported",
        error: "Error while exporting",
      },
      {
        style: {
          fontFamily: "Monospace",
          marginTop: "10px",
        },
      }
    );
  };

  // When a user clicks copy url button
  const handleCopyUrl = () => {
    const currentURL = window.location.origin.toLowerCase() + "/editor";
    const urlContent = generateURL(data);
    const url = currentURL.concat(urlContent);
    console.log(url);
    navigator.clipboard.writeText(url);
    toast.success("URL Copied", {
      style: {
        fontFamily: "Monospace",
        marginTop: "10px",
      },
      iconTheme: {
        primary: "#33b4ff",
        secondary: "#FFFFFF",
      },
    });
  };

  return (
    <div className="pasteez-editor">
      <div>
        <Toaster />
      </div>
      <div
        className="exportableFrame"
        style={{
          background: data.frameBG,
        }}
      >
        <div className="editor-frame">
          <div className="frame-header">
            <div className="frame-header-buttons">
              <div className="frame-header-circle red-circle"></div>
              <div className="frame-header-circle yellow-circle"></div>
              <div className="frame-header-circle green-circle"></div>
            </div>
            <div className="frame-header-title">
              <input
                type="text"
                spellCheck="false"
                defaultValue={data.title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
            </div>
            <div className="frame-header-buttons" style={{ opacity: 0 }}>
              <div className="frame-header-circle"></div>
              <div className="frame-header-circle"></div>
              <div className="frame-header-circle"></div>
            </div>
          </div>
          <div className="frame-body">
            <Editor
              value={data.code}
              onValueChange={(code) => setData({ ...data, code: code })}
              highlight={(code) =>
                hljs.highlight(code, {
                  language: data.lang,
                }).value
              }
              autoFocus={false}
              padding={20}
              textareaId="code-editor"
              className="code-editor-wrapper"
              style={{ lineHeight: 1.5 }}
            />
          </div>
        </div>
      </div>
      <div className="frame-footer">
        <div className="frame-footer-buttons">
          <div className="settings-btn">
            <Dropdown
              controlClassName="btn"
              options={languages}
              onChange={(e) => {
                const lang = e.value;
                handleLangChange(lang);
              }}
              value={data.lang}
              placeholder="Select a language"
            />
            <Dropdown
              controlClassName="btn"
              options={Object.getOwnPropertyNames(syntaxStyles)}
              onChange={(e) => {
                const syntaxTheme = e.value.toLowerCase();
                handleSyntaxThemeChange(syntaxTheme);
              }}
              value={data.syntaxStyle}
              placeholder="Select a style"
            />
            <button className="btn share-btn" onClick={handleCopyUrl}>
              Copy Url
              <i
                style={{ marginLeft: "10px", fontSize: "10px" }}
                className="far fa-link"
              ></i>
            </button>
            <ColorPicker data={data} setData={setData} />
          </div>
          <div className="features-btn">
            <button className="btn export-btn" onClick={handleImageExport}>
              Export
              <i
                style={{ marginLeft: "10px", fontSize: "10px" }}
                className="fal fa-file-export"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

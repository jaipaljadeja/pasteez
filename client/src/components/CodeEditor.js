import React from "react";
// import { useSelector } from "react-redux";
import Dropdown from "react-dropdown";
import Editor from "react-simple-code-editor";
import { useThemeSwitcher } from "react-css-theme-switcher";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import toast from "react-hot-toast";
import { generateURL, generateURLwithPass } from "../utils/UrlUtils";
import ColorPicker from "./ColorPicker";
const hljs = require("highlight.js");

export default function CodeEditor({
  languages,
  data,
  setData,
  syntaxStyles,
  setShowPasswordModal,
  password,
}) {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

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
          marginTop: "15px",
        },
      }
    );
  };

  // When a user clicks copy url button
  const handleCopyUrl = () => {
    const currentURL = window.location.origin.toLowerCase() + "/editor";
    if (data.code !== "") {
      if (data.isProtected !== "false" || password !== null) {
        const urlContent = generateURLwithPass(data, password);
        const url = currentURL.concat(urlContent);
        console.log(url);
        navigator.clipboard.writeText(url);
        toast.success("URL Copied", {
          style: {
            fontFamily: "Monospace",
            marginTop: "15px",
          },
          iconTheme: {
            primary: "#33b4ff",
            secondary: "#FFFFFF",
          },
        });
      } else {
        const urlContent = generateURL(data);
        const url = currentURL.concat(urlContent);
        console.log(url);
        navigator.clipboard.writeText(url);
        toast.success("URL Copied", {
          style: {
            fontFamily: "Monospace",
            marginTop: "15px",
          },
          iconTheme: {
            primary: "#33b4ff",
            secondary: "#FFFFFF",
          },
        });
      }
    } else if (data.code === "") {
      toast.error("Code cannot be empty", {
        style: {
          fontFamily: "Monospace",
          marginTop: "15px",
        },
      });
    }
  };

  const setPasswordHandler = () => {
    var bodyElement = document.getElementsByTagName("BODY")[0];
    bodyElement.style.overflow = "hidden";
    setShowPasswordModal(true);
  };

  const codeCopyHandler = (code) => {
    navigator.clipboard.writeText(code);
    toast.success("Code Copied", {
      style: {
        fontFamily: "Monospace",
        marginTop: "15px",
      },
      iconTheme: {
        primary: "#33b4ff",
        secondary: "#FFFFFF",
      },
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="pasteez-editor" style={{ marginLeft: "74.9px" }}>
          <div
            className="exportableFrame"
            style={{
              background: data.framebg,
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
                <ColorPicker
                  onChange={(color) => setData({ ...data, framebg: color })}
                />
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
        <div className="button-container editor">
          <div
            className="btn post-edit-btn clipboard"
            title={"copy code"}
            onClick={() => codeCopyHandler(data.code)}
          >
            <i className="fas fa-clipboard" />
          </div>
          <div
            className="btn post-edit-btn password"
            title={"set password"}
            onClick={() => setPasswordHandler()}
          >
            <i
              className="far fa-lock-open-alt"
              id="unlockIcon"
              style={{ display: "block" }}
            />
            <i
              className="far fa-lock"
              id="lockIcon"
              style={{ display: "none" }}
            />
          </div>
          {/* {userInfo && (
            <div
              className="btn post-edit-btn save"
              title={"save paste"}
              // onClick={() => codeCopyHandler(data.code)}
            >
              <i className="fas fa-save" />
            </div>
          )} */}
        </div>
        {/* <div className="button-container editor password">
        <div
          className="btn post-edit-btn password"
          title={"set password"}
          onClick={() => setPassword()}
        >
          <i className="fas fa-lock" />
        </div>
      </div> */}
      </div>
    </>
  );
}

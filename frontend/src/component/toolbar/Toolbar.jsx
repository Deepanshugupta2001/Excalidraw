import React from "react";
import "./Toolbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import LoginRequiredModal from "../common/LoginRequiredModal";
import { saveDrawing } from "../../api/saveDrawing";
import { useState } from "react";

const TOOLS = [
  { id: "pen", icon: "✏️", label: "Pen" },
  { id: "line", icon: "📏", label: "Line" },
  { id: "rect", icon: "▭", label: "Rectangle" },
  { id: "ellipse", icon: "◯", label: "Ellipse" },
  { id: "diamond", icon: "◆", label: "Diamond" },
  { id: "arrow", icon: "➜", label: "Arrow" },
  { id: "text", icon: "A", label: "Text" },
];

export default function Toolbar({ tool, setTool, shapes }) {

  const { user } = useContext(AuthContext);
  const [loginModal, setLoginModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [drawingTitle, setDrawingTitle] = useState("");
  const handleClick = (id) => setTool(tool === id ? null : id);

  const handleSave = async () => {

    if (!user) {
      setLoginModal(true);
      return;
    }

    const title = drawingTitle.trim();
    if (!title) {
      alert("Please enter a drawing name before saving.");
      return;
    }

    try {
      setIsSaving(true)
      const res = await saveDrawing(user.id, shapes, title)
      console.log("✅ Drawing saved:", res);
      alert("Drawing saved successfully!");
    } catch (error) {
      console.error("❌ Error saving drawing:", error);
      alert("Failed to save drawing!");
    } finally {
      setIsSaving(false);
    }

  }

  return (
    <>
      <nav className="canvas-toolbar-blur">
        <div className="toolbar-left">
          {TOOLS.map(({ id, icon, label }) => (
            <button
              key={id}
              title={label}
              aria-label={label}
              className={`toolbar-btn${tool === id ? " active" : ""}`}
              onClick={() => handleClick(id)}
            >
              <span className="toolbar-btn-icon">{icon}</span>
            </button>
          ))}
        </div>

        <div className="toolbar-right">
          <input
            className="drawing-title-input"
            type="text"
            value={drawingTitle}
            onChange={(e) => setDrawingTitle(e.target.value)}
            placeholder="Drawing name"
            aria-label="Drawing name"
            disabled={isSaving}
          />
          <button className="save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "💾 Save"}
          </button>
        </div>
      </nav>

      <LoginRequiredModal open={loginModal} onClose={() => setLoginModal(false)} />
    </>
  );
}

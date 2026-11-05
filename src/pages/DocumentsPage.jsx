
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Info,
  CircleCheck,
  AlertCircle,
} from "lucide-react";

import PartnerHeader from "../components/PartnerHeader";
import OnboardingSidebar from "../components/OnboardingSidebar";
import DocumentCard from "../components/DocumentCard";

import "../styles/DocumentsPage.css";

const MAX_SIZE = 10 * 1024 * 1024;

const initialDocuments = [
  {
    id: "cnic",
    title: "Owner CNIC (front & back)",
    description: "PDF, JPG or PNG · max 10 MB each",
    status: "pending",
    files: [],
    required: true,
    multiple: true,
  },
  {
    id: "licence",
    title: "Business licence / registration",
    description: "PDF, JPG or PNG · max 10 MB",
    status: "pending",
    files: [],
    required: true,
    multiple: false,
  },
  {
    id: "ownership",
    title: "Ownership deed or lease agreement",
    description: "PDF, JPG or PNG · max 10 MB",
    status: "pending",
    files: [],
    required: true,
    multiple: false,
  },
  {
    id: "ntn",
    title: "NTN certificate",
    description: "PDF, JPG or PNG · max 10 MB",
    status: "pending",
    files: [],
    required: true,
    multiple: false,
  },
  {
    id: "bank",
    title: "Bank account proof (cheque or letter)",
    description: "Needed before first payout",
    status: "pending",
    files: [],
    required: false,
    optional: true,
    multiple: false,
  },
];

function DocumentsPage() {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState(initialDocuments);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("info");
  const [saving, setSaving] = useState(false);

  const timers = useRef({});

  // Check whether signup information exists.
  useEffect(() => {
    const partnerData = sessionStorage.getItem("crownElitePartner");

    if (!partnerData) {
      navigate("/signup", { replace: true });
    }
  }, [navigate]);

  // Clear active upload timers when page unmounts.
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((timer) => {
        clearInterval(timer);
      });

      timers.current = {};
    };
  }, []);

  const requiredComplete = documents
    .filter((document) => document.required)
    .every((document) => document.status === "uploaded");

  const uploadedCount = documents.filter(
    (document) => document.status === "uploaded"
  ).length;

  function showNotice(message, type = "info") {
    setNotice(message);
    setNoticeType(type);
  }

  function handleUpload(id, selectedFiles) {
    const document = documents.find((item) => item.id === id);

    if (!document || !selectedFiles?.length) return;

    const files = document.multiple
      ? Array.from(selectedFiles)
      : Array.from(selectedFiles).slice(0, 1);

    if (document.id === "cnic" && files.length !== 2) {
      showNotice(
        "Please select both front and back CNIC images.",
        "error"
      );
      return;
    }

    const allowed = ["pdf", "jpg", "jpeg", "png"];

    for (const file of files) {
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowed.includes(extension)) {
        showNotice(
          "Only PDF, JPG and PNG files are allowed.",
          "error"
        );
        return;
      }

      if (file.size > MAX_SIZE) {
        showNotice(`${file.name} exceeds the 10 MB limit.`, "error");
        return;
      }
    }

    // Stop any previous upload for this document.
    if (timers.current[id]) {
      clearInterval(timers.current[id]);
      delete timers.current[id];
    }

    setNotice("");

    const fileDetails = files.map((file) => ({
      name: file.name,
      size: file.size,
    }));

    setDocuments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "uploading",
              progress: 0,
              pendingFiles: fileDetails,
            }
          : item
      )
    );

    let progress = 0;

    timers.current[id] = setInterval(() => {
      progress += 10;

      if (progress >= 100) {
        clearInterval(timers.current[id]);
        delete timers.current[id];

        setDocuments((previous) =>
          previous.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status: "uploaded",
                  progress: 100,
                  files: item.pendingFiles || [],
                  pendingFiles: [],
                }
              : item
          )
        );

        showNotice(
          `${document.title} selected successfully.`,
          "success"
        );
      } else {
        setDocuments((previous) =>
          previous.map((item) =>
            item.id === id
              ? { ...item, progress }
              : item
          )
        );
      }
    }, 150);
  }

  function handleRemove(id) {
    if (timers.current[id]) {
      clearInterval(timers.current[id]);
      delete timers.current[id];
    }

    setDocuments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "pending",
              progress: 0,
              files: [],
              pendingFiles: [],
            }
          : item
      )
    );

    showNotice("Document removed.", "info");
  }

  function handleCancel(id) {
    if (timers.current[id]) {
      clearInterval(timers.current[id]);
      delete timers.current[id];
    }

    setDocuments((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "pending",
              progress: 0,
              pendingFiles: [],
            }
          : item
      )
    );

    showNotice("Upload cancelled.", "info");
  }

  function handleSaveExit() {
    try {
      setSaving(true);

      const draft = documents.map((document) => ({
        id: document.id,
        title: document.title,
        status: document.status,
        files: document.files,
        required: document.required,
      }));

      localStorage.setItem(
        "crownEliteDocumentsDraft",
        JSON.stringify(draft)
      );

      showNotice(
        "Document progress saved in this browser.",
        "success"
      );
    } catch {
      showNotice("Unable to save the draft.", "error");
    } finally {
      setSaving(false);
    }
  }

  function handleContinue() {
    if (!requiredComplete) {
      showNotice(
        "Please complete all required documents before continuing.",
        "error"
      );
      return;
    }

    try {
      const draft = documents.map((document) => ({
        id: document.id,
        title: document.title,
        status: document.status,
        files: document.files,
        required: document.required,
      }));

      localStorage.setItem(
        "crownEliteDocumentsDraft",
        JSON.stringify(draft)
      );

      navigate("/onboarding/venue-details");
    } catch {
      showNotice("Unable to save documents. Please try again.", "error");
    }
  }

  return (
    <div className="documents-page">
      <PartnerHeader onSaveExit={handleSaveExit} />

      <div className="documents-layout">
        <OnboardingSidebar currentStep={3} />

        <main className="documents-main">
          <div className="step-label">STEP 3 OF 6</div>

          <h1>Upload your documents</h1>

          <p className="page-description">
            Our team checks these to verify your hall. Clear photos
            from your phone are fine. Files stay private.
          </p>

          <div className="document-list">
            {documents.map((document) => (
              <DocumentCard
                key={document.id}
                document={document}
                onUpload={handleUpload}
                onRemove={handleRemove}
                onCancel={handleCancel}
              />
            ))}
          </div>

          <div className="document-notice">
            {requiredComplete ? (
              <CircleCheck
                size={18}
                className="notice-success-icon"
              />
            ) : (
              <Info size={18} />
            )}

            <span>
              {requiredComplete
                ? "All required documents have been selected."
                : `${uploadedCount} of 4 required documents completed. Upload the remaining documents to continue.`}
            </span>
          </div>

          {notice && (
            <div
              className={`notice-message notice-${noticeType}`}
              role="status"
            >
              {noticeType === "error" && (
                <AlertCircle size={17} />
              )}

              {noticeType === "success" && (
                <CircleCheck size={17} />
              )}

              <span>{notice}</span>
            </div>
          )}

          <div className="documents-footer">
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/signup")}
            >
              <ArrowLeft size={20} />
              Back
            </button>

            <button
              type="button"
              className="continue-button"
              disabled={!requiredComplete}
              onClick={handleContinue}
            >
              Continue to venue details
              <ArrowRight size={20} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSaveExit}
            disabled={saving}
            className="save-exit-button"
          >
            {saving ? "Saving..." : "Save progress & exit"}
          </button>
        </main>
      </div>
    </div>
  );
}

export default DocumentsPage;

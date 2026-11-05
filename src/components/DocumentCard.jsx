import {
  CheckCircle2,
  FileText,
  Upload,
  Trash2,
  ArrowUpFromLine,
} from "lucide-react";

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DocumentCard({
  document,
  onUpload,
  onRemove,
  onCancel,
}) {
  const uploaded = document.status === "uploaded";
  const uploading = document.status === "uploading";

  function handleChange(event) {
    const files = Array.from(event.target.files || []);

    if (files.length) {
      onUpload(document.id, files);
    }

    event.target.value = "";
  }

  return (
    <article
      className={`document-card document-${document.status}`}
    >
      <div
        className={`document-icon ${
          uploaded
            ? "icon-success"
            : uploading
              ? "icon-progress"
              : "icon-neutral"
        }`}
      >
        {uploaded ? (
          <CheckCircle2 size={22} />
        ) : uploading ? (
          <ArrowUpFromLine size={22} />
        ) : (
          <FileText size={22} />
        )}
      </div>

      <div className="document-information">
        <h3>{document.title}</h3>

        {uploaded ? (
          <p className="uploaded-file-name">
            {document.files.map((file) => file.name).join(", ")}
            {" · "}
            {formatFileSize(
              document.files.reduce((total, file) => total + file.size, 0)
            )}
          </p>
        ) : uploading ? (
          <>
            <p className="uploading-label">
              Uploading... {document.progress}%
            </p>

            <div
              className="progress-track"
              role="progressbar"
              aria-label={`Uploading ${document.title}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={document.progress}
            >
              <div
                className="progress-fill"
                style={{ width: `${document.progress}%` }}
              />
            </div>
          </>
        ) : (
          <p>
            {document.description}
            {document.optional ? " · Optional now" : ""}
          </p>
        )}
      </div>

      <div className="document-actions">
        {uploading ? (
          <button
            type="button"
            className="cancel-button"
            onClick={() => onCancel(document.id)}
          >
            Cancel
          </button>
        ) : uploaded ? (
          <>
            <label className="replace-button">
              Replace

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple={document.multiple}
                onChange={handleChange}
                hidden
              />
            </label>

            <button
              type="button"
              className="delete-button"
              onClick={() => onRemove(document.id)}
              aria-label={`Remove ${document.title}`}
            >
              <Trash2 size={18} />
            </button>
          </>
        ) : (
          <label className="upload-button">
            <Upload size={19} />
            <span>Upload</span>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple={document.multiple}
              onChange={handleChange}
              hidden
            />
          </label>
        )}
      </div>
    </article>
  );
}

export default DocumentCard;
import { CircleCheck } from "lucide-react";
import BrandLogo from "./BrandLogo";

function PartnerHeader({ onSaveExit }) {
  return (
    <header className="partner-header">
      <BrandLogo />

      <div className="header-actions">
        <div className="save-status">
          <CircleCheck size={17} />
          <span>Saved just now</span>
        </div>

        <button
          type="button"
          className="save-exit-button"
          onClick={onSaveExit}
        >
          Save &amp; exit
        </button>
      </div>
    </header>
  );
}

export default PartnerHeader;
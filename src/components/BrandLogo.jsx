import { Crown } from "lucide-react";

function BrandLogo() {
  return (
    <div className="brand-logo">
      <div className="brand-logo-icon">
        <Crown size={23} strokeWidth={2.2} />
      </div>

      <div className="brand-logo-text">
        <h2>Crown Elite</h2>
        <span>HALL PARTNER</span>
      </div>
    </div>
  );
}

export default BrandLogo;
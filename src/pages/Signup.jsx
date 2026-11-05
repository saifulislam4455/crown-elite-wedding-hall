
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Crown,
  UserRound,
  Phone,
  Mail,
  LockKeyhole,
  ArrowRight,
  CircleCheck,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";

import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (!agreed) {
      setError("Please accept the partner terms and commission policy.");
      return;
    }

    try {
      const partnerData = {
        name,
        phone,
        email,
      };

      sessionStorage.setItem(
        "crownElitePartner",
        JSON.stringify(partnerData)
      );

      setLoading(true);
      navigate("/documents");
    } catch {
      setError("Unable to continue. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-visual">
        <div className="signup-visual-overlay" />

        <div className="signup-visual-content">
          <div className="signup-testimonial">
            <blockquote>
              “Since joining, we stopped double bookings completely
              and 60% of our advances now come online.”
            </blockquote>

            <div className="testimonial-author">
              <div className="author-avatar">MS</div>

              <div>
                <strong>Malik Saeed</strong>
                <span>Owner, Shalimar Banquets, Lahore</span>
              </div>
            </div>
          </div>

          <div className="signup-stats">
            <div>
              <strong>2,400+</strong>
              <span>halls listed</span>
            </div>

            <div>
              <strong>0</strong>
              <span>double bookings</span>
            </div>

            <div>
              <strong>24 h</strong>
              <span>payout after event</span>
            </div>
          </div>
        </div>
      </section>

      <section className="signup-form-section">
        <div className="signup-form-container">
          <div className="signup-brand">
            <div className="signup-brand-icon">
              <Crown size={23} />
            </div>

            <div>
              <h2>Crown Elite</h2>
              <span>HALL PARTNER</span>
            </div>
          </div>

          <h1>List your hall for free</h1>

          <p className="signup-description">
            Takes about 10 minutes. Keep your documents ready:
            CNIC, business licence, ownership or lease papers, NTN.
          </p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-two-columns">
              <div className="form-field">
                <label htmlFor="signup-name">Your full name</label>

                <div className="input-wrapper">
                  <UserRound size={20} />

                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="signup-phone">Mobile number</label>

                <div className="input-wrapper">
                  <Phone size={20} />

                  <input
                    id="signup-phone"
                    name="phone"
                    type="tel"
                    placeholder="0300 123 4567"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="signup-email">Email</label>

              <div className="input-wrapper">
                <Mail size={20} />

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="signup-password">Create a password</label>

              <div className="input-wrapper password-input-wrapper">
                <LockKeyhole size={20} />

                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              <div className="password-hint">
                <Info size={15} />
                <span>At least 8 characters</span>

                {form.password.length >= 8 && (
                  <CircleCheck
                    size={15}
                    className="password-valid"
                  />
                )}
              </div>
            </div>

            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
              />

              <span>
                I agree to the Partner terms and commission policy
              </span>
            </label>

            {error && (
              <p className="signup-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="signup-submit-button"
              disabled={loading}
            >
              <span>
                {loading ? "Creating account..." : "Create account"}
              </span>

              <ArrowRight size={21} />
            </button>
          </form>

          <p className="login-prompt">
            Already a partner? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Signup;

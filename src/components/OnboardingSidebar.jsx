import { Check, Phone } from "lucide-react";

const steps = [
  { number: 1, title: "Business details" },
  { number: 2, title: "Bank account for payouts" },
  { number: 3, title: "Documents" },
  { number: 4, title: "Your venue & halls" },
  { number: 5, title: "Photos" },
  { number: 6, title: "Review & submit" },
];

function OnboardingSidebar({ currentStep = 3 }) {
  return (
    <aside className="onboarding-sidebar">
      <nav aria-label="Registration progress" className="steps-navigation">
        {steps.map((step) => {
          const completed = step.number < currentStep;
          const active = step.number === currentStep;

          return (
            <div
              key={step.number}
              className={[
                "step-item",
                completed ? "step-completed" : "",
                active ? "step-active" : "",
              ].filter(Boolean).join(" ")}
              aria-current={active ? "step" : undefined}
            >
              <div className="step-indicator">
                {completed ? <Check size={19} /> : step.number}
              </div>

              <div className="step-copy">
                <h3>{step.title}</h3>

                <p>
                  {completed
                    ? "Completed"
                    : active
                      ? "In progress"
                      : "Not started"}
                </p>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="help-card">
        <Phone size={21} />

        <h3>Need help? Call us</h3>

        <a href="tel:080042557">
          0800-HALLS (42557)
        </a>

        <p>9 AM – 9 PM</p>
      </div>
    </aside>
  );
}

export default OnboardingSidebar;
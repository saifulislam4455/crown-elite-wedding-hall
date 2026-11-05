
import { useState } from "react";
import {
  Users,
  MoreVertical,
  Plus,
} from "lucide-react";

import "../../styles/Staff.css";

const initialStaff = [
  {
    id: 1,
    name: "Rana Imran",
    initials: "RI",
    role: "Owner",
    phone: "0300 456 7788",
    halls: "All halls",
    lastActive: "Now",
    status: "Active",
  },
  {
    id: 2,
    name: "Sadia Kamal",
    initials: "SK",
    role: "Manager",
    phone: "0321 765 4321",
    halls: "All halls",
    lastActive: "12 min ago",
    status: "Active",
  },
  {
    id: 3,
    name: "Asif Butt",
    initials: "AB",
    role: "Booking agent",
    phone: "0333 112 2334",
    halls: "Grand Hall, Crystal",
    lastActive: "2 h ago",
    status: "Active",
  },
  {
    id: 4,
    name: "Nadia R.",
    initials: "NR",
    role: "Accountant",
    phone: "0345 998 0011",
    halls: "All halls",
    lastActive: "Invite sent",
    status: "Pending",
  },
];

const initialPermissions = [
  { id: 1, label: "See calendar & bookings", enabled: true },
  { id: 2, label: "Add walk-in bookings", enabled: true },
  { id: 3, label: "Accept or reject online bookings", enabled: true },
  { id: 4, label: "Record cash payments", enabled: true },
  { id: 5, label: "Give discounts (up to 5%)", enabled: true },
  { id: 6, label: "See money reports & payouts", enabled: false },
  { id: 7, label: "Change prices & packages", enabled: false },
  { id: 8, label: "Manage staff", enabled: false },
];

function Staff() {
  const [staff, setStaff] = useState(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState(3);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [openMenu, setOpenMenu] = useState(null);

  function togglePermission(id) {
    setPermissions((previous) =>
      previous.map((permission) =>
        permission.id === id
          ? { ...permission, enabled: !permission.enabled }
          : permission
      )
    );
  }

  function inviteStaff() {
    const name = prompt("Enter staff member name:");
    if (!name) return;

    const role = prompt(
      "Enter role (Manager, Booking agent, Accountant):",
      "Booking agent"
    );

    if (!role) return;

    const newStaff = {
      id: Date.now(),
      name,
      initials: name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      role,
      phone: "Invitation pending",
      halls: "All halls",
      lastActive: "Invite sent",
      status: "Pending",
    };

    setStaff((previous) => [...previous, newStaff]);
    setSelectedStaff(newStaff.id);
  }

  function removeStaff(id) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this staff member?"
    );

    if (!confirmed) return;

    setStaff((previous) => previous.filter((member) => member.id !== id));
    setOpenMenu(null);

    if (selectedStaff === id) {
      setSelectedStaff(3);
    }
  }

  const activeMember =
    staff.find((member) => member.id === selectedStaff) || staff[0];

  return (
    <div className="staff-page">
      {/* Heading */}

      <div className="staff-heading">
        <div>
          <h1>Staff</h1>
          <p>
            Give your team their own login. They only see what you allow.
          </p>
        </div>

        <button className="invite-staff-button" onClick={inviteStaff}>
          <Plus size={18} />
          Invite staff
        </button>
      </div>

      {/* Staff table */}

      <div className="staff-table-wrapper">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Halls</th>
              <th>Last active</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {staff.map((member) => (
              <tr
                key={member.id}
                className={
                  selectedStaff === member.id ? "selected-staff-row" : ""
                }
                onClick={() => setSelectedStaff(member.id)}
              >
                <td>
                  <div className="staff-name-cell">
                    <div className="staff-avatar">
                      {member.initials}
                    </div>

                    <div className="staff-name-details">
                      <strong>{member.name}</strong>
                      <span>
                        {member.role === "Owner" ? "Owner · " : ""}
                        {member.phone}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <strong className="staff-role">
                    {member.role}
                  </strong>
                </td>

                <td>{member.halls}</td>

                <td className="staff-last-active">
                  {member.lastActive}
                </td>

                <td>
                  <span
                    className={`staff-status ${
                      member.status === "Pending" ? "pending" : "active"
                    }`}
                  >
                    <span className="staff-status-dot" />
                    {member.status}
                  </span>
                </td>

                <td>
                  <div className="staff-menu-container">
                    <button
                      className="staff-menu-button"
                      aria-label={`Actions for ${member.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenMenu(
                          openMenu === member.id ? null : member.id
                        );
                      }}
                    >
                      <MoreVertical size={19} />
                    </button>

                    {openMenu === member.id && (
                      <div className="staff-action-menu">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedStaff(member.id);
                            setOpenMenu(null);
                          }}
                        >
                          Manage permissions
                        </button>

                        <button
                          className="staff-remove-action"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeStaff(member.id);
                          }}
                        >
                          Remove staff
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permissions */}

      {activeMember && (
        <section className="staff-permissions-card">
          <div className="staff-permissions-heading">
            <h2>{activeMember.role} · what they can do</h2>

            <p>
              Changes apply to {activeMember.name} and anyone else with this role.
            </p>
          </div>

          <div className="staff-permissions-grid">
            {permissions.map((permission) => (
              <div className="staff-permission-item" key={permission.id}>
                <span>{permission.label}</span>

                <button
                  type="button"
                  role="switch"
                  aria-checked={permission.enabled}
                  aria-label={permission.label}
                  className={`staff-toggle ${
                    permission.enabled ? "enabled" : ""
                  }`}
                  onClick={() => togglePermission(permission.id)}
                >
                  <span />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Staff;

const RoleSwitcher = ({ role, onRoleChange }) => {
  return (
    <label className="role-switcher">
      Role
      <select value={role} onChange={(event) => onRoleChange(event.target.value)}>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </label>
  )
}

export default RoleSwitcher

import CustomSelect from './CustomSelect'

const RoleSwitcher = ({ role, onRoleChange }) => {
  const roleOptions = [
    { value: 'viewer', label: 'Viewer' },
    { value: 'admin', label: 'Admin' },
  ]

  return (
    <label className="role-switcher">
      Role
      <CustomSelect
        value={role}
        options={roleOptions}
        onChange={onRoleChange}
        ariaLabel="Select role"
      />
    </label>
  )
}

export default RoleSwitcher

import RoleSwitcher from './RoleSwitcher'
import ThemeToggle from './ThemeToggle'

function DashboardHeader({ role, onRoleChange, theme, onThemeToggle }) {
  return (
    <header className="header panel backdrop-blur-sm">
      <div>
        <p className="eyebrow">Finance Dashboard UI</p>
        <h1 className="text-balance">Personal Finance Command Center</h1>
        <p className="subtitle max-w-2xl">Track your money flow, spending behavior, and key insights.</p>
      </div>
      <div className="header-actions">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <RoleSwitcher role={role} onRoleChange={onRoleChange} />
      </div>
    </header>
  )
}

export default DashboardHeader

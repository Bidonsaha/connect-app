import { NavLink, withRouter } from 'react-router-dom'
import React from 'react'
import { some } from 'lodash'
import PT from 'prop-types'
import cn from 'classnames'
import NotificationBadge from '../NotificationBadge/NotificationBadge'
import ArrowUpIcon from '../../assets/icons/arrows-16px-1_minimal-up.svg'


import styles from './MenuItem.scss'

const MenuItem = ({
  label,
  to,
  Icon,
  iconClassName,
  exact,
  isActive,
  count,
  children,
  isAccordionOpen,
  onAccordionToggle,
  match,
  wrapperClass,
  toolTipText,
  enforceA,
  openNewTab,
}) => {
  const matchedPath = match && match.path
  const isChildActive = children && some(children, c => c.to === matchedPath)

  const linkContent = (
    <span styleName="content">
      <span styleName="left">
        {!!Icon && (
          <Icon className={cn(styles.icon, styles[iconClassName])} />
        )}
        {label}
      </span>
      <span styleName="right">
        {!!count && <NotificationBadge count={count} text={toolTipText} />}
      </span>
    </span>
  )

  return (
    <li className={
      cn(wrapperClass,
        styles.menuItem,
        { [styles.open]: isAccordionOpen, [styles.withChildren]: children })}
    >
      {!children && !enforceA && (
        <NavLink
          to={to}
          className={styles.navItem}
          activeClassName={styles.active}
          exact={exact}
          isActive={isActive}
        >
          {linkContent}
        </NavLink>
      )}

      {!children && enforceA && (
        <a
          href={to}
          className={styles.navItem}
          target={openNewTab ? '_blank' : ''}
        >
          {linkContent}
        </a>
      )}

      {children && (
        <div>
          <div
            className={cn(styles.navItem, {
              [styles.activeParent]: isChildActive,
              [styles.active]: isChildActive
            })}
            onClick={() => onAccordionToggle(!isAccordionOpen)}
          >
            <span styleName="content">
              <span styleName="left">
                {!!Icon && (
                  <Icon className={cn(styles.icon, styles[iconClassName])} />
                )}
                {label}
              </span>
              <span styleName="right">
                {!!count && <NotificationBadge count={count} text={toolTipText} />}
              </span>

              <ArrowUpIcon className={styles.arrowUpIcon} />
            </span>
          </div>

          {isAccordionOpen &&
            <ul>
              { children.map(c => <MenuItem {...c} key={c.to} wrapperClass={styles.childNavItem} />) }
            </ul>
          }
        </div>
      )}
    </li>
  )
}

MenuItem.defaultProps = {
  exact: true,
  enforceA: false,
  openNewTab: false,
}

MenuItem.propTypes = {
  label: PT.string.isRequired,
  to: PT.string.isRequired,
  Icon: PT.func,
  iconClassName: PT.string,
  exact: PT.bool,
  isActive: PT.func,
  count: PT.number,
  children: PT.array,
  isAccordionOpen: PT.bool,
  onAccordionToggle: PT.func,
  wrapperClass: PT.string,
  toolTipText: PT.string,
  /**
   * Render as regular link `<a>` instead of React Router `<NavLink>`
   */
  enforceA: PT.bool,
  /**
   * Open link in the new tab.
   * Only works if `enforceA` is `true`.
   */
  openNewTab: PT.bool,
}

export default withRouter(MenuItem)

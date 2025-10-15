import React from 'react'
import styles from './RenderCount.module.css'

export function RenderCount() {
  const renders = React.useRef(0)

  return <i className={styles.circle}>{++renders.current}</i>
}

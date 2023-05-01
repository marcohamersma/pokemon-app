import React from 'react'
import Link from 'next/link'

export const Button: React.FC<React.ComponentPropsWithoutRef<typeof Link>> = (
  props
) => (
  <Link
    {...props}
    className={`block p-2 text-amber-600 rounded-sm ring-2 ${props.className}`}
  />
)

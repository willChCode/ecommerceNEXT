import Link from 'next/link';
import React from 'react';

export default function DropdownLink(props) {
  let { href, children, ...rest } = props;
  console.log(rest);
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

// NO SE ESTA USANDO ERROR CON REF, FORWARDREF

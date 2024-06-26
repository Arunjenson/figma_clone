import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";


const IMAGE_SIZE = 48;

export function Avatar({ name ,otherStyes }: {name: string,otherStyes: string }) {
  return (
    <div className={`${styles.avatar} ${otherStyes} size-9`} data-tooltip={name}>
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
       fill
              alt={name}
        className={styles.avatar_picture}
      />
    </div>
  );
}
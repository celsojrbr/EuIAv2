import Image from "next/image"

import vidy from './vidy.svg'

import styles from './header.module.css'

export const ChatHeader = () => {
    return (<div>
        <header className={styles.header}>
            <Image alt="" src={vidy} />
            <h1 className={styles.heading}>
                Boas-vindas!
                <br />
                Eu sou o Assistente do Aparecido, <br/>caso tenha alguma duvida sobre ele, basta pergutar!
            </h1>
        </header>
    </div>)
}
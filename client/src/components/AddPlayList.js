import React, { useState } from 'react'
import Modal from 'react-modal'
import axiosInstance from '../axiosInstance';
import styles from './AddPlayList.module.css'

export default function AddPlayList({ isOpen, toggleModal }) {
    const [name, setName] = useState('');
    const submit = async () => {
        await axiosInstance.post('/playlist/', {
            name: name
        }).then((data) => console.log(data));
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className={styles.mymodal}
            overlayClassName={styles.myoverlay}
            closeTimeoutMS={500}
            ariaHideApp={false}
        >
            <button onClick={toggleModal}>Close modal</button>
            <form onSubmit={submit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    required
                />
                <button type="submit">
                    Create
                </button>
            </form>

        </Modal>
    )
}

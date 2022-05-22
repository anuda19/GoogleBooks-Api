import React from 'react';
import { Card, CardBody, CardImg, CardTitle, Modal } from 'reactstrap';
import { useState } from 'react';

const BookCard = ({ thumbnail, title, authors, pageCount, language, description, publishers, previewLink, infoLink }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }
    return (
        <Card style={{ width: "200px" }} className='m-auto'>
            <CardImg
                top
                style={{ width: "100%", height: "200px" }}
                src={thumbnail}
                alt='Card Image' />
            <CardBody>
                <CardTitle className='card-title'>{title}</CardTitle>
                <button className='btn-secondary' onClick={toggle}>More Info</button>
            </CardBody>
            <Modal isOpen={modal} toggle={toggle}>
                <div className="modal-header d-flex justify-content-center">
                    <h5 className='modal-title text-center'>{title}</h5>
                    <button aria-label='Close'
                        className='close'
                        type='button'
                        onClick={toggle}> <span aria-hidden={true}>X</span> </button>
                </div>
                <div className="modal-body">
                    <div className="d-flex justify-content-between ml-3">
                        <img src={thumbnail} alt={title} style={{ height: '233px' }} />
                        <div>
                            <p>Page Count: {pageCount}</p>
                            <p>Language: {language}</p>
                            <p>Authors: {authors}</p>
                            <p>Publisher: {publishers}</p>
                        </div>
                    </div>
                    <div className="mt-3">{description}</div>
                </div>
                <div className="modal-foooter m-2">
                    <div className="left-slide">
                        <a href={previewLink} className='btn-link'
                            color='default'
                            type='button'
                            target='_blank'
                            rel='noopener noreferrer'>
                            <span>Preview Link</span>
                        </a>
                    </div>
                    <div className='divider m-2'></div>
                    <div className='right-silde'>
                        <a
                            href={infoLink}
                            className='btn-link'
                            color='default'
                            type='button'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <span>Info Link</span>
                        </a>
                    </div>
                </div>
            </Modal>
        </Card>
    );
}


export default BookCard;
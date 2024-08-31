import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BrandsModal({ cat }) {
  const [first, setfirst] = useState();
  console.log(cat);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {}, []);

  return (
    <>
      <Button className="bg-main" onClick={handleShow}>
        Show modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="t-main fw-bold fs-3">{cat.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="d-flex align-items-center">
              <Col xs={6} className="fs-5">
                {cat.slug}
              </Col>
              <Col xs={6}>
                <img src={cat.image} alt={cat.name} className="w-100" />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

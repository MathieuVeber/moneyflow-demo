import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";

import { createPage, updatePage } from "../actions";
import { Page } from "../types";

interface Props {
  page: Page;
}

function PageContent(props: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.page.title);
  const [content, setContent] = useState<string>('Loading...');
  const [displayContent, setDisplayContent] =
    useState([<Spinner key={0} animation="border"/>]);

  useEffect(() => {
    setTitle(props.page.title);
    setContent(props.page.content);
    setEditMode(props.page.id ? false : true);
  }, [props]);

  useEffect(() => {
    setDisplayContent(handleContent(content));
  }, [content]);

  const handleCancel = () => {
    setTitle(props.page.title);
    setContent(props.page.content);
    setEditMode(false);
  }

  const handleSave = () => {
    if (props.page.id) {
      dispatch(updatePage({title, content}));
    }
    else {
      dispatch(createPage({title, content}));
    }
    if (title !== props.page.title) {
      navigate(`/${title}`);
    }
  }

  const handleContent = (content: string) => content.split(/\[([^[\]]*)\]/)
    .map((value, index) => index % 2 === 1
      ? <Link key={index} to={`/${value}`}>{value}</Link>
      : <Card.Text key={index} as="span">{value}</Card.Text> );

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={10} lg={8}>
          <Card>
            <Form>
              <Card.Body>
                { editMode ?
                  <>
                    <Form.Control
                      type="text"
                      defaultValue={title}
                      onChange={event => setTitle(event.target.value)}
                      required
                    />
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write some content here..."
                      defaultValue={content}
                      onChange={event => setContent(event.target.value)}
                      className="mt-3"
                      required
                    />
                  </>
                :
                  <>
                    <Card.Title> {title} </Card.Title>
                    {displayContent}
                  </>
                }
              </Card.Body>
              <Card.Footer className="text-muted">
                { editMode ?
                  <Row className="d-flex justify-content-between">
                    <Col xs={6}>
                      <Button variant="outline-danger" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </Col>

                    <Col xs={6} className="d-flex flex-row-reverse">
                      <Button variant="outline-success" onClick={handleSave}>
                        Save
                      </Button>
                    </Col>
                  </Row>
                :
                  <Row className="d-flex justify-content-between">
                    <Col xs={6} className="d-flex align-items-center">
                      <Card.Text>
                        {props.page.id ? `Views: ${props.page.views}` : "Draft"}
                      </Card.Text>
                    </Col>

                    <Col xs={6} className="d-flex flex-row-reverse">
                      <Button variant="outline-warning" onClick={() => setEditMode(true)}>
                        Edit
                      </Button>
                    </Col>
                  </Row>
                }
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PageContent;
import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Form, Alert, Col, Button} from 'react-bootstrap';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  // const [movieName, setMovieName] = useState('');
  // const [Review, setReview] = useState('');
  // const [movieReviewList, setMovieReviewList] = useState([]);
  // const [newReview, setNewReview] = useState("");

  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/get').then((response) => {
  //     setMovieReviewList([response.data])
  //     console.log(response.data)
  //     // setMovieReviewList([{movieName: "test", movieReview: "test"}])
  //   })
  // },[])

  // const submitReview = () => { 
  //   Axios.post('http://localhost:3002/api/insert', {
  //     movieName: movieName,
  //     movieReview: Review
  //   });
    
  //   setMovieReviewList([
  //     ...movieReviewList,
  //     {
  //       movieName: movieName,
  //       movieReview: Review
  //     },
  //   ]);
  // };

  // const deleteReview = (movieName) => {
  //   Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
  // };

  // const updateReview = (movieName) => {
  //   Axios.put(`http://localhost:3002/api/update`, {
  //     movieName: movieName,
  //     movieReview: newReview
  //   });
  //   setNewReview("")
  // };

  const addUser = (e) => {
    Axios.post('http://localhost:3002/api/createUser', {
      ID: email,
      pass: pass
    });
  }

  return (
    <div>
      <h1 className="App">DiscovEat</h1>

        <Col xs={6}>
          <Alert variant='primary'>
            Create Account
          </Alert>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addUser}>
              Submit
            </Button>
          </Form>
        </Col>
    </div>
  );
}

export default App;

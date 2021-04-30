import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Form, Alert, Col, Row, Button, ListGroup} from 'react-bootstrap';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [findID, setFindID] = useState('');
  const [findEmail, setFindEmail] = useState('');
  const [findPass, setFindPass] = useState('');

  const [ingList, setIngList] = useState([]);

  const [pTime, setPTime] = useState('');
  const [underTime, setUnderTime] = useState([]);

  useEffect(() => {
    let uT, user, ing;
    if(window.localStorage.getItem('underPTime') != null){
      uT = JSON.parse(window.localStorage.getItem('underPTime'));
    }
    if(window.localStorage.getItem('user') != null){
      user = JSON.parse(window.localStorage.getItem('user'));
    }
    if(window.localStorage.getItem('userIng') != null){
      ing = JSON.parse(window.localStorage.getItem('userIng'));
    }
    
    if(uT && uT.data){
      setUnderTime(uT.data);
    }
    
    if(user && user.UserID){
      setFindID(user.UserID);
      setFindEmail(user.Email);
      setFindPass(user.Password);
    }

    if(ing && ing[0]){
      setIngList(ing);
    }
  },[]);

  const addUser = (e) => {
    Axios.post('http://localhost:3002/api/createUser', {
      ID: email,
      pass: pass
    });
  }

  const findUser = (e) => {
    Axios.get('http://localhost:3002/api/getUser', {
      params: {
        Email: email,
        Pass: pass
      }
    }).then((res) => {
      if(res.data && res.data.ID){
        let u = {
          UserID: res.data.ID,
          Email: res.data.Email,
          Password: res.data.Pass
        };
        window.localStorage.setItem('user', JSON.stringify(u));
      };
      
      if(res.data && res.data.ing[0]){
        window.localStorage.setItem('userIng', JSON.stringify(res.data.ing));
      }else{
        window.localStorage.setItem('userIng', JSON.stringify([]));
      };
    })
  };

  const logout = (e) => {
    window.localStorage.setItem('user', JSON.stringify({}));
    window.localStorage.setItem('userIng', JSON.stringify([]));

    setFindID('');
    setFindEmail('');
    setFindPass('');
    setIngList([]);
  }

  const getUnderPrep = (e) => {
    Axios.get('http://localhost:3002/api/underPTime', {
      params: {
        time: pTime
      }
    }).then((res) => {
      console.log(res);
      window.localStorage.setItem('underPTime', JSON.stringify(res));
    })
  };

  let table = <div></div>
  if(underTime.length > 0){
    table = <ListGroup>
      <ListGroup.Item>{"ID: " + underTime[0].rid + ", Time: " + underTime[0].pTime}</ListGroup.Item>
      <ListGroup.Item>{"ID: " + underTime[1].rid + ", Time: " + underTime[1].pTime}</ListGroup.Item>
      <ListGroup.Item>{"ID: " + underTime[2].rid + ", Time: " + underTime[2].pTime}</ListGroup.Item>
      <ListGroup.Item>{"ID: " + underTime[3].rid + ", Time: " + underTime[3].pTime}</ListGroup.Item>
      <ListGroup.Item>{"ID: " + underTime[4].rid + ", Time: " + underTime[4].pTime}</ListGroup.Item>
    </ListGroup>       
  }

  let ingTable = <div></div>
  if(ingList.length > 0){
    const listItems = ingList.map((v) =>
      <ListGroup.Item>{"ID: " + v.ID + ", Name: " + v.Name}</ListGroup.Item>
    );
    
    ingTable = <ListGroup>
      {listItems}
    </ListGroup> 
  }
  return (
    <div>
      <h1 className="App">DiscovEat</h1>
        <Row>
          <Col xs={1}/>
          <Col xs={5}>
            <Alert variant='primary'>Create Account</Alert>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addUser}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Add Review for a Recipe</Alert>
            <Form>
              <Form.Group>
                <Form.Label>Enter Recipe ID</Form.Label>
                <Form.Control placeholder="Recipe ID" type="text"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter Your Review</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Review" type="text"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={getUnderPrep}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Add Ingredient to Your Fridge</Alert>
            <Form>
              <Form.Group>
                <Form.Label>Enter Ingredient Name</Form.Label>
                <Form.Control placeholder="Ingredient" type="text"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={getUnderPrep}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Remove Ingredient From Fridge</Alert>
            <Form>
              <Form.Group>
                <Form.Label>Enter Ingredient ID</Form.Label>
                <Form.Control placeholder="Ingredient ID" type="text"/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={getUnderPrep}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Find Recipes under a Prep Time</Alert>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter Prep Time</Form.Label>
                <Form.Control placeholder="Enter Time in mins" onChange={(e)=>{setPTime(e.target.value)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={getUnderPrep}>
                Submit
              </Button>
            </Form>
            <Alert variant='light' />
            {table}
          </Col>

          <Col xs={5}>
            <Alert variant='primary'>Login</Alert>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPass(e.target.value)}} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={findUser}>
                  Submit
                </Button>
                <Button variant="primary" type="submit" style={{marginLeft: "1rem"}} onClick={logout}>
                  Logout
                </Button>
              </Form>
              <Alert variant='light' />
              {ingTable}
          </Col>
          <Col xs={1}/>
        </Row>
    </div>
  );
}

export default App;

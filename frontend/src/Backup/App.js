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

  const [upDelUser, setUpDelUser] = useState('');
  const [newE, setNewE] = useState('');
  const [newPass, setNewPass] = useState('');

  const [prepTime, setPrepTime] = useState('');
  const [instructions, setInstructions] = useState('');

  const [findRecipeID, setFindRecipeID] = useState('');
  const [findRecipePrepTime, setFindRecipePrepTime] = useState('');
  const [findRecipeInstructions, setFindRecipeInstructions] = useState('');

  const [upRecipeID, setUpRecipeID] = useState('');
  const [upPrepTime, setUpPrepTime] = useState('');
  const [upInstructions, setUpInstructions] = useState('');

  //Ingredient tbh func
  const [ingredientName, setIngredientName] = useState('');
  
  const [findIngredientID, setFindIngredientID] = useState('');
  const [findIngredientName, setFindIngredientName] = useState('');
  
  const [upIngredientID, setUpIngredientID] = useState('');
  const [upIngredientName, setUpIngredientName] = useState('');

  const GET = {
    credentials: "include",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const getUserData = (user) => {
    return new Promise(async (resolve, reject) => {
      const path = "/api/getUser/" + user;
  
      await fetch(path, GET)
        .then(async response => {
          const res = await response.json();
          resolve(res);
        })
        .catch(error => {
          console.error("Error: ", error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    // Axios.get('http://localhost:3002/api/get').then((response) => {
    //   setMovieReviewList([response.data])
    //   console.log(response.data)
    //   // setMovieReviewList([{movieName: "test", movieReview: "test"}])
    // })
    // setFindID(localStorage.getItem("ID"));
    // setFindEmail(localStorage.getItem("email"));
    // setFindPass(localStorage.getItem("pass"));

    // window.localStorage.setItem('res', JSON.stringify({}));
    // if(window.localStorage.getItem('res') != ""){
    // console.log(JSON.parse(window.localStorage.getItem('res')));
    // }

    // console.log(window.localStorage.getItem('res'))
    // console.log(findEmail);
  },[])

  const addUser = (e) => {
    Axios.post('http://localhost:3002/api/createUser', {
      ID: email,
      pass: pass
    });
  }

  const findUser = (e) => {
    // Axios.post('http://localhost:3002/api/getUser', {
    //   params: {
    //     ID: findID
    //   }
    // }).then((response) => {
    //   console.log(response);
    //   window.localStorage.setItem('res', JSON.stringify(response));

    //   // setFindID(response.data.UserID);
    //   // setFindEmail(response.data);
    //   // setFindPass(response.data.Password);
    //   // // response.data
    // })

    let uData = getUserData(findID);
    console.log(uData);
  }

  const updateUser = (e) => {
    Axios.put(`http://localhost:3002/api/updateUser`, {
      ID: upDelUser,
      email: newE,
      pass: newPass
    });
  };

  const deleteUser = (e) => {
    Axios.delete(`http://localhost:3002/api/deleteUser/${upDelUser}`);
  };

  // RECIPE

  const addRecipe = (e) => {
    Axios.post('http://localhost:3002/api/addRecipe', {
      prepTime: prepTime,
      instructions: instructions
    });
  }

  const findRecipe = (e) => {
    let uData = getUserData(findRecipeID);
    console.log(uData);
  }

  const updateRecipe = (e) => {
    Axios.put(`http://localhost:3002/api/updateRecipe`, {
      ID: upRecipeID,
      prepTime: upPrepTime,
      instructions: upInstructions
    });
  };

  const deleteRecipe = (e) => {
    Axios.delete(`http://localhost:3002/api/deleteRecipe/${upRecipeID}`);
  };

  //Ingredients
  const addIngredient = (e) => {
    Axios.post('http://localhost:3002/api/addIngredient', {
      ingredientName: ingredientName,
    });
  }
  //to be edited
  const findIngredient = (e) => {
    let uData = getUserData(findRecipeID);
    console.log(uData);
  }

  const updateIngredient = (e) => {
    Axios.put(`http://localhost:3002/api/updateIngredient`, {
      ID: upIngredientName,
      ingredientName: upIngredientName,
    });
  };

  const deleteIngredient = (e) => {
    Axios.delete(`http://localhost:3002/api/deleteIngredient/${upIngredientID}`);
  };

  const queryOne = (e) => {

  };

  
  const queryTwo = (e) => {
      
  };

  
  const queryThree = (e) => {
      
  };


  return (
    <div>
      <h1 className="App">DiscovEat</h1>
      <h2 className="App">Users</h2>
        <Col xs={6}>
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

          <Alert variant='primary'>Find Account</Alert>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter ID to Find</Form.Label>
              <Form.Control placeholder="Enter ID" onChange={(e)=>{setFindID(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={findUser}>
              Submit
            </Button>
          </Form>
          <ListGroup>
            <ListGroup.Item>{findID}</ListGroup.Item>
            <ListGroup.Item>{findEmail}</ListGroup.Item>
            <ListGroup.Item>{findPass}</ListGroup.Item>
          </ListGroup>

          <Alert variant='light' />
          
          <Alert variant='primary'>Update Account</Alert>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter ID to Update</Form.Label>
              <Form.Control placeholder="Enter ID" onChange={(e)=>{setUpDelUser(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter New Email</Form.Label>
              <Form.Control placeholder="Enter Email" onChange={(e)=>{setNewE(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control placeholder="Enter Password" onChange={(e)=>{setNewPass(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={updateUser}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Delete Account</Alert>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter ID to Delete</Form.Label>
              <Form.Control placeholder="Enter ID" onChange={(e)=>{setUpDelUser(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={deleteUser}>
              Submit
            </Button>
          </Form>
        </Col>
      <h2 className="App">Recipes</h2>
        <Col xs={6}>
          <Alert variant='primary'>Add Recipe</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Prep Time</Form.Label>
              <Form.Control placeholder="Enter prep time" type="text" onChange={(e)=>{setPrepTime(e.target.value)}}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Instructions</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Instructions" onChange={(e)=>{setInstructions(e.target.value)}} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addRecipe}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Find Recipe</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Enter ID to Find</Form.Label>
              <Form.Control placeholder="Enter ID" type="text" onChange={(e)=>{setFindRecipeID(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={findRecipe}>
              Submit
            </Button>
          </Form>
          <ListGroup>
            <ListGroup.Item>{findRecipeID}</ListGroup.Item>
            <ListGroup.Item>{findRecipePrepTime}</ListGroup.Item>
            <ListGroup.Item>{findRecipeInstructions}</ListGroup.Item>
          </ListGroup>

          <Alert variant='light' />

          <Alert variant='primary'>Update Recipe</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Enter ID to Update</Form.Label>
              <Form.Control placeholder="Enter ID" type="text" onChange={(e)=>{setUpRecipeID(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter New PrepTime</Form.Label>
              <Form.Control placeholder="Enter PrepTime" type="text" onChange={(e)=>{setUpPrepTime(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter New Instructions</Form.Label>
              <Form.Control placeholder="Enter Instructions" type="text" onChange={(e)=>{setUpInstructions(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={updateRecipe}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Delete Recipe</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Enter ID to Delete</Form.Label>
              <Form.Control placeholder="Enter ID" type="text" onChange={(e)=>{setUpRecipeID(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={deleteRecipe}>
              Submit
            </Button>
          </Form>`
        </Col>
        <h2 className="App">Ingredients</h2>
        <Col xs={6}>
          <Alert variant='primary'>Add Ingredient</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Ingredient Name</Form.Label>
              <Form.Control placeholder="Enter Ingredient Name" type="text" onChange={(e)=>{setIngredientName(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={addIngredient}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Find Ingredient</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Enter ID to Find</Form.Label>
              <Form.Control placeholder="Enter ID" type="text" onChange={(e)=>{setFindIngredientID(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={findIngredient}>
              Submit
            </Button>
          </Form>
          <ListGroup>
            <ListGroup.Item>{findIngredientID}</ListGroup.Item>
            <ListGroup.Item>{findIngredientName}</ListGroup.Item>
          </ListGroup>

          <Alert variant='light' />

          <Alert variant='primary'>Update Ingredient</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Enter ID to Update</Form.Label>
              <Form.Control placeholder="Enter ID" type="text" onChange={(e)=>{setUpIngredientID(e.target.value)}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter New Ingredient Name</Form.Label>
              <Form.Control placeholder="Enter Ingredient Name" type="text" onChange={(e)=>{setUpIngredientName(e.target.value)}}/>
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={updateIngredient}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Delete Ingredient</Alert>
          <Form>
            <Form.Group>
              <Form.Label>Enter ID to Delete</Form.Label>
              <Form.Control placeholder="Enter ID" type="text" onChange={(e)=>{setUpIngredientID(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={deleteIngredient}>
              Submit
            </Button>
          </Form>`
        </Col>
      <h2 className="App">Advanced Queries</h2>
        <Col xs={6}>
          <Alert variant='primary'>Query 1: Find most active reviewers</Alert>
          <Form>
            <Button variant="primary" type="submit" onClick={queryOne}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Query 2: Find users who leave a high ratings on average</Alert>
          <Form>
            <Button variant="primary" type="submit" onClick={queryTwo}>
              Submit
            </Button>
          </Form>

          <Alert variant='light' />

          <Alert variant='primary'>Query 3: Find recipes that take less than 40 minutes to make with high ratings</Alert>
          <Form>       
            <Button variant="primary" type="submit" onClick={queryThree}>
              Submit
            </Button>
          </Form>
        </Col>
    </div>
  );
}

export default App;

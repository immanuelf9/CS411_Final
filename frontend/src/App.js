import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import {Form, Alert, Col, Row, Button, ListGroup} from 'react-bootstrap';

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const [recipeID, setRecipeID] = useState('');
  const [score, setScore] = useState(1);
  const [review, setReview] = useState(''); 

  const [minScore, setMinScore] = useState(1);

  const [ingredientID, setIngredientID] = useState('');
  const [ingredientName, setIngredientName] = useState('');

  const [findID, setFindID] = useState('');
  const [findEmail, setFindEmail] = useState('');
  const [findPass, setFindPass] = useState('');

  const [ingList, setIngList] = useState([]);

  const [pTime, setPTime] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let uT, user, ing;

    if(window.localStorage.getItem('underPTime') != null){
      uT = JSON.parse(window.localStorage.getItem('underPTime'));
    }
    console.log(uT);

    if(window.localStorage.getItem('user') != null){
      user = JSON.parse(window.localStorage.getItem('user'));
    }

    if(window.localStorage.getItem('userIng') != null){
      ing = JSON.parse(window.localStorage.getItem('userIng'));
    }
    
    if(uT && uT[0]){
      setRecipes(uT[0]);
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

  // Create an account, add a user to the database
  const addUser = (e) => {
    Axios.post('http://localhost:3002/api/createUser', {
      ID: email,
      pass: pass
    });
  }

  // Find user, log in
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
      }
    })
  };

  // Log out
  const logout = (e) => {
    window.localStorage.setItem('user', JSON.stringify({}));
    window.localStorage.setItem('userIng', JSON.stringify([]));

    setFindID('');
    setFindEmail('');
    setFindPass('');
    setIngList([]);
  }

  // Find recipes under a prep time
  const findRecipes = (e) => {
    Axios.get('http://localhost:3002/api/findRecipes', {
      params: {
        time: pTime,
        minScore: minScore,
        userID: findID
      }
    }).then((res) => {
      window.localStorage.setItem('underPTime', JSON.stringify(res));
    })
  };

  // Add review
  const addReview = (e) => {
    console.log(score);
    Axios.post('http://localhost:3002/api/addReview', {
      userID: findID,
      recipeID: recipeID,
      score: score,
      review: review
    });
  };

  // Add ingredient
  const addIngredient = (e) => {
    Axios.get('http://localhost:3002/api/addIngredient', {
      params: {
        userID: findID,
        ingredientName:ingredientName
      }
    }).then((res) => {
      // window.localStorage.setItem('res', JSON.stringify(res));
      if(res.data && res.data[0]){
        window.localStorage.setItem('userIng', JSON.stringify(res.data));
      }
    });
  };

  // Remove ingredient
  const removeIngredient = (e) => {
    Axios.get('http://localhost:3002/api/removeIngredient', {
      params: {
        userID: findID,
        ingredientID: ingredientID
      }
    }).then((res) => {
      if(res.data && res.data[0]){
        window.localStorage.setItem('userIng', JSON.stringify(res.data));
      }else{
        window.localStorage.setItem('userIng', JSON.stringify([]));
      }
    });
  };

  let table = <div></div>
  if(recipes.length > 0){
    const listRecipes = recipes.map((v) =>
      <ListGroup.Item>{"ID: " + v.RecipeID + ", Time: " + v.PrepTime + ", Ratings: " +  v.Ratings + ", Instructions: " + v.Instructions}</ListGroup.Item>
    );
  
    table = <ListGroup>
      {listRecipes}
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
                <Form.Control placeholder="Recipe ID" type="text" onChange={(e)=>{setRecipeID(e.target.value)}}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Score</Form.Label>
                <Form.Control as="select" onChange={(e)=>{setScore(e.target.value)}}>
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
                <Form.Control as="textarea" rows={3} placeholder="Review" type="text" onChange={(e)=>{setReview(e.target.value)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addReview}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Add Ingredient to Your Fridge</Alert>
            <Form>
              <Form.Group>
                <Form.Label>Enter Ingredient Name</Form.Label>
                <Form.Control placeholder="Ingredient" type="text" onChange={(e)=>{setIngredientName(e.target.value)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addIngredient}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Remove Ingredient From Fridge</Alert>
            <Form>
              <Form.Group>
                <Form.Label>Enter Ingredient ID</Form.Label>
                <Form.Control placeholder="Ingredient ID" type="text" onChange={(e)=>{setIngredientID(e.target.value)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={removeIngredient}>
                Submit
              </Button>
            </Form>

            <Alert variant='light' />

            <Alert variant='primary'>Find Recipes</Alert>
            <Form>
              <Form.Group>
                <Form.Label>Enter Maximum Prep Time</Form.Label>
                <Form.Control placeholder="Enter Time in Mins" type="text" onChange={(e)=>{setPTime(e.target.value)}}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Minimum Rating</Form.Label>
                <Form.Control as="select" onChange={(e)=>{setMinScore(e.target.value)}}>
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
              <Button variant="primary" type="submit" onClick={findRecipes}>
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

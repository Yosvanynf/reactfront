import React from 'react';
import './App.css';
import './index.css';

//Component
import Header from './Components/Header';

export default class App extends React.Component{   

  constructor(){
    super();
    this.state = {
      status: null,
      _id : '',
      title: '',
      description : '',
      tasks : []     
          
    };
    
    this.addtask = this.addtask.bind(this);
    this.OnChange = this.OnChange.bind(this);
    this.updatetask = this.updatetask.bind(this);
  }  

  componentDidMount(){
    this.loadtasks();
  }  

  addtask (e) {                             ////ok
      fetch('http://localhost:3001/tasks/', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }         
      }) 
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({title: '', description: ''})
        this.loadtasks();
       })            
      .catch(error => console.error(error));

    e.preventDefault();
  }

  loadtasks(){                              ////ok...
    fetch('http://localhost:3001/tasks/')
      .then(res => res.json())
      .then(data => {       
        this.setState({tasks: data});
        console.log(this.state.tasks);
       })
      
  }

  OnChange (e) {                            ////ok
     const { name, value } = e.target;
     this.setState({[name]: value});     
  }

  deletetask(id){                           ///// ok    
    fetch('http://localhost:3001/tasks/' + id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
           }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)    
        this.loadtasks();
      })            
      .catch(error => console.error(error));
    
  }
  
  updatetask(id){            
    const newtask = this.state.tasks.map(tasks => {
    if(tasks._id === id){
    tasks.status = !tasks.status;
    fetch('http://localhost:3001/tasks/' + tasks._id, {
           method: 'PUT',
           body: JSON.stringify(tasks),           
           headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }         
          }) 
          .then(res => res.json())
          .then(data => console.log(data))  
    }
    return tasks;}) 
    console.log(newtask);
    this.setState({tasks : newtask});                     
  }

  render() {      
       return(         
        <div>
          <Header/>
              <form onSubmit={this.addtask}>                     
                <div className="form-wrapper" >
                   <input name="title"
                       type="text" 
                       placeholder="Write a Task"
                       onChange= {this.OnChange} 
                       value = {this.state.title}/> 
                    <button type="submit" className="button" id="addbttn">
                           ADD
                    </button> 
               <br /> 
               <br />
                  <textarea className="textarea"
                       placeholder="Write a Description"
                       name= "description"
                       onChange = {this.OnChange}
                       value = {this.state.description}/>                                 
              </div>                    
         </form>
         <br /> 
         <table className="listtasks">
            <thead>
              <tr> 
                <th>Title--</th>
                <th>Description--</th>
                <th style={{width:"5px"}}></th>
                <th style={{width:"5px"}}></th>
              </tr>
            </thead>
            <tbody>
              { this.state.tasks.map(e => {
                return(
                  <tr style={{textDecoration: e.status ? 'line-through' : 'none'}} key = {e._id}>
                    <td>{e.title}</td>
                    <td>{e.description}</td>
                    <td style={{width:"3px"}}>
                      <button className={!e.status ? "btnlist" : "btnlist2" } onClick = {() => {this.updatetask(e._id)}}>                        
                         done
                         </button></td>
                    <td style={{width:"3px"}}>
                      <button className="btnlist" onClick = {() => {this.deletetask(e._id)}}>
                        Delete
                        </button></td>
                  </tr>
                )
              })}
            </tbody>
         </table>
      </div>
      )
    } 
}    
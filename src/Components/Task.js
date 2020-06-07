import React, {Component} from 'react';

export default class Task extends Component {

    Isdone(){
        return{
             textDecoration: this.props.task.done ? 'line-through' : 'none'
        }
    } 
    render() {     
        const {task} = this.props;                       
        return <div style={this.Isdone()} className="form-wrapper2"> 
                   {task.title} --
                   {task.description} --
                   <button className="btnlist" onClick = {this.props.deletetask.bind(this, task.title)}>
                        Delete</button>                
                    <button className="btnlist" onClick = {this.props.checkdone.bind(this, task.title)}>                        
                         done</button>                       
        </div>      
    }
};
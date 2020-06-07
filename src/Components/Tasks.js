import React, { Component } from 'react';
import Task from    './Task';

export default class Tasks extends Component {

    render() {         
        return this.props.tasks.map(task => 
            <Task task={task}                
                deletetask = {this.props.deletetask}
                checkdone = {this.props.checkdone} 
                updatetask = {this.props.updatetask} />);              
    }
};
 
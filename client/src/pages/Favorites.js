import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import {GoTrashcan} from 'react-icons/go'
export default class Favorites extends Component {
state={
  local_data:[]
}

  componentDidMount(){
    this.update_local_storage();
  }


update_local_storage(){
  const lst=[]

for (let n =0; n<localStorage.length; n++){
  const key = localStorage.key(n);
  const data = localStorage.getItem(key);
  try {
    const parsedData = JSON.parse(data);
    // Add only valid data objects with a 'name' field
    if (parsedData && parsedData.name) {
      lst.push(parsedData);
    } else {
      console.warn("Invalid data found for key:", key);
    }
  } catch (e) {
    console.error("Failed to parse data for key:", key, e);
  }
}

console.log("Updated local_data:", lst);


  this.setState({local_data:lst})
}


remove_data(name){
  localStorage.removeItem(name);
  this.update_local_storage();
  alert("Removed from favorites!")
}



  render() {
    return(

      <div>


      {(this.state.local_data.length < 0) ? <div className='no_data justify-align-center text-center text-danger '>No favorite events to show</div> : <div className='mx-auto p-5 m-5 rounded-6 fav_table' style={{marginleft:"15%",marginright:"15%", width:"70%", borderRadius:"10px !important"}}>

<div className=' text-center mb-4 fav_list' style={{color:"aqua"}}>List of your favorite events</div>
        <Table responsive striped variant='light'>
          <thead>
            <tr>

              <th>#</th>
              <th>Date</th>
              <th>Event</th>
              <th>Category</th>
              <th>Venue</th>
              <th>Favorite</th>

            </tr>
          </thead>
          <tbody>
            {
              this.state.local_data.map(
                
                (data,i) => <tr key={data} >


                  <td>{i}</td>
                  <td> {data.date} </td>
                  <td> {data.name} </td>
                  <td> {data.category}</td>
                  <td> {data.venue} </td>
                  <td><GoTrashcan onClick={() => this.remove_data(data.name)}/></td>


                </tr>
              )
            }
          </tbody>
        </Table>


      </div>}


 
            </div>

)


  }
}



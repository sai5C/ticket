import React from 'react';
import Ticket from './Ticket';
import TicketsTable from './TicketsTable';
import MeetingTable from './MeetingTable';


const App = () =>
  <div>
    <Ticket />
    <h1 className='ml-10 text-2xl mt-5'> Tickets</h1>
    <TicketsTable />
    <hr/>
    <div style={{marginTop:"200px"}}>

    </div>
    <h1 className='ml-10 text-2xl mt-5'> Meetings</h1>
    <MeetingTable />
  </div>


export default App;


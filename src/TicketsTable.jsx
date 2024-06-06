import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { SendOutlined, DeleteOutlined } from "@ant-design/icons";
import "./App.css";

const TicketsTable = () => {
  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://yaake-backend.cubebase.ai/api/get_ticket_details/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const formattedData = data.data.map(ticket => ({
          ...ticket,
          created_at: formatTimestamp(ticket.created_at),
          updated_at: formatTimestamp(ticket.updated_at)
        }));
        console.log(formattedData)
        setTicketDetails(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Client ID',
      dataIndex: 'client_id',
      key: 'client_id',
    },
    {
      title: 'User By',
      dataIndex: 'user_by',
      key: 'user_by',
      render: (userBy) => (
        <span>{userBy.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</span>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assigned_to',
      key: 'assigned_to',
      render: (assignedTo) => (
        <span>{assignedTo.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</span>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{fontSize:"10px", border: '1px solid', padding: '3px 6px', borderRadius: '4px', background: status === 'closed' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)', color: status === 'closed' ? 'red' : 'green' }}>
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => (
        <span style={{ fontSize: '12px' }}>{createdAt}</span>
      ),
    }
  ];

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${day}-${month}-${year} ${hours}:${minutes} ${period}`;
  }




  if (!Array.isArray(ticketDetails) || ticketDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Table
      style={{ margin: "10px 40px 10px 40px" }}
      scroll={{ y: 550 }}
      columns={columns}
      dataSource={ticketDetails}
    />
  );
};

export default TicketsTable;


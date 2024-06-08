import React, { useState } from 'react';
import { Button, Modal, Input, Select } from 'antd';
import { toast } from "react-toastify";


const { TextArea } = Input;

const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [updatedValue, setUpdatedValue] = useState(null);

  const handleChange = (value) => {
    setUpdatedValue(value)
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getRandomClientId = () => {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  };

  const randomValue = getRandomClientId()


  const postData = async () => {
    const payload = 
      {
        "client_id":randomValue,
         "user_by":"sai",
         "assigned_to":selectedValue,
         "comment":inputValue,
         "status":updatedValue
    }
    try {
      const response = await fetch('https://yaake-backend.cubebase.ai/api/ticket_details_storage/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      toast.success(`Updated Successfully!`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleOk = () => {
    if (!selectedValue || !inputValue || !updatedValue) {
      alert("Please enter all values to procced!")
    } else {
      // postData()
      setUpdatedValue(null);
      setInputValue('');
      setSelectedValue(null)
      setIsModalOpen(false); 
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreatedAt = (e) => {
    setSelectedValue(e);
  };

  return (
    <>
      <Button style={{ margin: '20px 30px' }} type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Ticket details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText="Submit"
      >
        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'space-around', height: "220px" }}>
          <Select
            defaultValue="Created At"
            style={{
              width: 290,
            }}
            onChange={handleCreatedAt}
            options={[
              {
                value: 'vijay',
                label: 'Vijay',
              },
              {
                value: 'hemanth',
                label: 'Hemanth',
              },
              {
                value: 'badhri',
                label: 'Badhri',
              },
            ]}
          />
          <TextArea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Comments..."
            style={{ width: 290, height: 80 }}
          />
          <Select
            defaultValue="Updated At"
            style={{
              width: 290,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'created',
                label: 'Created',
              },
              {
                value: 'closed',
                label: 'Closed',
              }
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default Ticket;


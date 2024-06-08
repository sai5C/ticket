import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import { SendOutlined, DeleteOutlined } from "@ant-design/icons";
import "./App.css"

const MeetingTable = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    {
      title: 'Meeting',
      dataIndex: 'meet',
      key: 'meet',
      filterMode: 'tree',
      filters: [
        { text: 'Product', value: 'Product' },
        { text: 'AI', value: 'AI' },
        { text: 'Technology', value: 'Technology' },
        { text: 'HR', value: 'Human Resource' },
        { text: 'Analytics', value: 'Data Analytics' },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.meet.startsWith(value),
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Schedule',
      dataIndex: 'schedule',
      key: 'schedule',
      filterMode: 'tree',
      filters: [
        { text: 'Morning', value: 'Morning' },
        { text: 'Afternoon', value: 'Afternoon' },
      ],
      filterSearch: true,
      onFilter: (value, record) => {
        const [startTime, endTime] = record.schedule.split(' - ');
        const [startHour] = startTime.split(':');
        const startPeriod = startTime.split(' ')[1];

        if (value === 'Morning') {
          return (startPeriod === 'AM' && parseInt(startHour) < 12);
        } else if (value === 'Afternoon') {
          return (startPeriod === 'PM' || (startPeriod === 'AM' && parseInt(startHour) === 12));
        }
        return false;
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'cool') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={index}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite <SendOutlined style={{ transform: "rotate(270deg)" }} /></a>
          <a>Delete <DeleteOutlined /></a>
        </Space>
      ),
    },
  ];

  const data = [];

  const names = ['Product', 'AI', 'Technology', 'Human Resource', 'Data Analytics'];
  const addresses = [
    'New York No. 1 Lake Park',
    'London No. 1 Lake Park',
    'Sydney No. 1 Lake Park',
    'Toronto No. 1 Lake Park',
    'Paris No. 1 Lake Park'
  ];
  const tagsList = [
    ['nice', 'developer'],
    ['informative'],
    ['cool', 'better'],
    ['smart', 'cool'],
    ['friendly', 'informative'],
    ['informative', 'superb', 'good', 'better', 'excellent', 'helpful', 'awesome', 'impressive', 'satisfactory', 'outstanding']
  ];
  const startTimes = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const addMinutes = (time, minsToAdd) => {
    const [hours, minutesPart] = time.split(':');
    const [minutes, period] = minutesPart.split(' ');
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + parseInt(minsToAdd);

    if (period === 'PM' && hours !== '12') totalMinutes += 12 * 60;
    if (period === 'AM' && hours === '12') totalMinutes -= 12 * 60;

    let endHours = Math.floor(totalMinutes / 60) % 24;
    let endMinutes = totalMinutes % 60;
    let endPeriod = endHours >= 12 ? 'PM' : 'AM';

    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12;

    return `${endHours}:${endMinutes.toString().padStart(2, '0')} ${endPeriod}`;
  };

  const getRandomTags = (array, n) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  for (let i = 1; i <= 50; i++) {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomTagsIndex = Math.floor(Math.random() * tagsList.length);
    const randomStartTimeIndex = Math.floor(Math.random() * startTimes.length);

    const durations = ["30", "40", "60"];
    const randomDuration = durations[Math.floor(Math.random() * durations.length)];
    const startTime = startTimes[randomStartTimeIndex];
    const endTime = addMinutes(startTime, randomDuration);

    const tags = getRandomTags(tagsList[randomTagsIndex], 3);

    data.push({
      key: i.toString(),
      meet: names[randomNameIndex],
      duration: `${randomDuration} Mins`,
      schedule: `${startTime} - ${endTime}`,
      tags: tags
    });
  }

  const expandedRowRender = (record) => {
    return (
      <div>
        <p><strong>Meeting:</strong> {record.meet}</p>
        <p><strong>Duration:</strong> {record.duration}</p>
        <p><strong>Schedule:</strong> {record.schedule}</p>
        <p><strong>Tags:</strong> {record.tags.join(', ')}</p>
      </div>
    );
  };

  const onExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  return (
    <Table
      style={{ margin: "10px 40px 10px 40px" }}
      scroll={{ y: 550 }}
      columns={columns}
      dataSource={data}
      expandedRowRender={expandedRowRender}
      expandedRowKeys={expandedRowKeys}
      onExpand={onExpand}
    />
  );
};

export default MeetingTable;

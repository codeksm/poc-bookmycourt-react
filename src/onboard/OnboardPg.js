import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, TimePicker, Select } from 'antd';
import moment from 'moment';
import './OnboardPg.css'

const { Option } = Select;

const OnboardPg = () => {
  const [form] = Form.useForm();
  const [sports, setSports] = useState([]);

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  const handleSportChange = (value) => {
    setSports(value);
  };

  return (
    <Form className="form-container" form={form} onFinish={onFinish} layout="vertical">
      <Form.Item className="form-item" label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item className="form-item" label="Phone" name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
        <Input />
      </Form.Item>
      <Form.Item className="form-item" label="Address" name="address" rules={[{ required: true, message: 'Please input your address!' }]}>
        <Input />
      </Form.Item>
      <Form.Item className="form-item" label="City" name="city" rules={[{ required: true, message: 'Please input your city!' }]}>
        <Input />
      </Form.Item>
      <Form.Item className="form-item" label="Timings" name="timings">
        <Form.Item className="form-item" name="startTime" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item className="form-item" name="endTime" style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}>
          <TimePicker format="HH:mm" />
        </Form.Item>
      </Form.Item>
      <Form.Item className="form-item" label="Location" name="location">
        <Input.Group compact>
          <Form.Item name={['location', 'lat']} noStyle>
            <InputNumber placeholder="Latitude" style={{ width: '50%' }} />
          </Form.Item>
          <Form.Item name={['location', 'lon']} noStyle>
            <InputNumber placeholder="Longitude" style={{ width: '50%' }} />
          </Form.Item>
        </Input.Group>
      </Form.Item>
      <Form.Item className="form-item" label="Select Sports" name="sports" rules={[{ required: true, message: 'Please select at least one sport!' }]}>
        <Select mode="multiple" onChange={handleSportChange}>
          <Option value="Badminton">Badminton</Option>
          <Option value="Football">Football</Option>
        </Select>
      </Form.Item>
      {sports.includes('Badminton') && (
        <div>
          <h3>Badminton Details</h3>
          <Form.Item label="Number of Courts" name="badmintonCourts">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Cost per Hour" name="badmintonCostPerHour">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Cost for Coaching per Hour" name="badmintonCoachingCost">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Cost per Hour for Tournament" name="badmintonTournamentCost">
            <InputNumber />
          </Form.Item>
        </div>
      )}
      {sports.includes('Football') && (
        <div>
          <h3>Football Details</h3>
          <Form.Item className="form-item" label="Number of Courts" name="footballCourts">
            <InputNumber />
          </Form.Item>
          <Form.Item className="form-item" label="Cost per Hour" name="footballCostPerHour">
            <InputNumber />
          </Form.Item>
          <Form.Item className="form-item" label="Cost for Coaching per Hour" name="footballCoachingCost">
            <InputNumber />
          </Form.Item>
          <Form.Item className="form-item" label="Cost per Hour for Tournament" name="footballTournamentCost">
            <InputNumber />
          </Form.Item>
        </div>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OnboardPg;

import React, { useState } from 'react';
import LogoIST from '../../assets/images/LogoIST.png';
import { FaMicrophone } from 'react-icons/fa';
import { Spin } from 'antd';
const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const axios = require('axios');
    const data = JSON.stringify({
      user_id: '1',
      q: `${searchTerm}`,
      bot_id: 51,
      timestamp: '1681550625000',
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/http://128.199.155.176:8002/search',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);

      setResponse(response.data.responseData[0].data.results);
      setShowDropdown(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  console.log('ini response api ', response);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSpeechRecognitionSupported = SpeechRecognition !== undefined;

  if (!isSpeechRecognitionSupported) {
    console.log('Speech recognition is not supported by your browser');
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'id-ID';

  const handleVoiceSearch = () => {
    setShowModal(true);
    setIsRecording(true);
    recognition.start();
  };

  recognition.onresult = (event) => {
    setIsRecording(false);
    setShowModal(false);
    const transcript = event.results[0][0].transcript;
    setSearchTerm(transcript);
  };

  recognition.onend = () => {
    setIsRecording(false);
    setShowModal(false);
  };
  console.log('ini search>>>>', searchTerm);
  console.log('dropdown', showDropdown);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'cornyellow',
        boxShadow: '0px 16px 20px rgba(188, 400, 231, 0.5)',
        padding: '10px',
        position: 'relative',
      }}
    >
      <img
        src={LogoIST}
        alt="IST logo"
        style={{ height: '70px', marginRight: '20rem' }}
      />
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {isLoading && <Spin />}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          style={{ marginRight: '10px', width: '50rem' }}
        />
        {showDropdown && response && (
          <select
            style={{
              position: 'absolute',
              top: 'calc(100% + 0px)',
              backgroundColor: '#fff',
              zIndex: '1',
              boxShadow: '0px 16px 20px rgba(188, 400, 231, 0.5)',
              borderRadius: '5px',
              width: '52%',
            }}
          >
            {response.map((item) => (
              <option key={item.intentsid} value={item.deeplink}>
                {item.intents}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: '#EA5121',
            color: '#ffffff',
            border: 'none',
            borderRadius: '5%',
            padding: '5px 20px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
        {isSpeechRecognitionSupported && (
          <FaMicrophone
            onClick={handleVoiceSearch}
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              marginRight: '10px',
              height: '70px',
            }}
          />
        )}
      </form>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '-2',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '999',
          }}
        >
          <div style={{ backgroundColor: '#fff', padding: '50px' }}>
            {isRecording ? (
              <div style={{ textAlign: 'center' }}>
                <Spin>Recording...</Spin>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p>Processing...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import LogoIST from '../../assets/images/LogoIST.png';
import { FaMicrophone } from 'react-icons/fa';
import { Spin } from 'antd';
import pathname from '../../pathnameCONFIG';
import './header.css';
const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [searchVoice, setSearchVoice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [result, setResult] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownVoice, setShowDropdownVoice] = useState(false);
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
      alert(error.message);
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

  let recognition;
  let mediaRecorder;

  const handleVoiceSearch = async () => {
    setShowModal(true);
    setIsRecording(true);
    // Start recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    // Stop recording after 5 seconds
    setTimeout(() => {
      mediaRecorder.stop();
      setIsRecording(false);
      setShowModal(false);
    }, 5000);

    // Save the recorded audio file to searchTerm state
    mediaRecorder.onstop = async (event) => {
      const blob = new Blob(chunks, { type: 'audio/mp4' });
      const formData = new FormData();
      formData.append('file', blob, 'recordedFile.mp4');

      try {
        const response = await fetch('https://demoasr.cakra.ai/stt', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        setSearchVoice(data.transcript);
        setSearchTerm(data.transcript);
      } catch (error) {
        console.error(error);
      }
    };

    const chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    // Check that the recognition stream has audio tracks before creating the mediaStream
    if (recognition.stream && recognition.stream.getAudioTracks().length > 0) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(recognition.stream.getAudioTracks()[0]);

      mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'video/mp4' });
      mediaRecorder.start();
    } else {
      console.log('No audio tracks found in the recognition stream');
    }

    // Stop recording after 5 seconds of silence
    setTimeout(() => {
      stopRecording();
    }, 5000);
  };
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (recognition) {
      recognition.stop();
    }
    setIsRecording(false);
    setShowModal(false);
  };

  useEffect(() => {
    if (searchVoice) {
      const fetchData = async () => {
        setIsLoading(true);
        const axios = require('axios');
        const data = JSON.stringify({
          user_id: '1',
          q: `${searchVoice}`,
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

          setResult(response.data.responseData[0].data.results);
          setShowDropdownVoice(true);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [searchVoice]);

  console.log('ini search>>>>', searchTerm);
  console.log('ini search>>>>', searchVoice);
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
              zIndex: '2',
              boxShadow: '0px 16px 20px rgba(188, 400, 231, 0.5)',
              borderRadius: '5px',
              width: '52%',
            }}
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            onClick={() => {
              window.location.replace(
                window.location.origin + pathname.transfer
              );
            }}
          >
            {response.map((item) => (
              <option key={item.intentsid} value={item.deeplink}>
                {item.intents}
              </option>
            ))}
          </select>
        )}
        {showDropdownVoice && result && (
          <select
            style={{
              position: 'absolute',
              top: 'calc(100% + 0px)',
              backgroundColor: '#fff',
              zIndex: '2',
              boxShadow: '0px 16px 20px rgba(188, 400, 231, 0.5)',
              borderRadius: '5px',
              width: '52%',
            }}
          >
            {result.map((item) => (
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

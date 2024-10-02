import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInterviewDetails } from '../../../../sevices/utils/api';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function Interview() {
    const { interviewId } = useParams();
    const [interview, setInterview] = useState(null);
    const [webCamEnable, setWebCamEnable] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigate()


    useEffect(() => {
        const fetchInterviewDetails = async () => {
            try {
                const data = await getInterviewDetails(interviewId);
                console.log(data);
                setInterview(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInterviewDetails();
    }, [interviewId]);

    return (
        <div className='my-10 flex flex-col items-center container'>
            <h2 className='font-bold text-2xl mb-6'>Let's Get Started</h2>

            {error && (
                <Alert variant='error'>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col my-5 gap-4'>
                    <div className='p-5 rounded-lg border'>
                        <h2 className='text-lg mb-2'>
                            <strong>Job Role/Position:</strong> {interview?.jobPosition}
                        </h2>
                        <h2 className='text-lg mb-2'>
                            <strong>Job Description/Tech Stack:</strong> {interview?.jobDesc}
                        </h2>
                        <h2 className='text-lg mb-2'>
                            <strong>Years of Experience:</strong> {interview?.jobExperience}
                        </h2>
                    </div>
                    <div className='border-yellow-300 p-5 rounded-lg bg-yellow-200'>
                        <h2 className='flex items-center gap-2 text-lg font-semibold mb-2 text-yellow-600'>
                            <Lightbulb />
                            <span>Information</span>
                        </h2>
                        <p className='text-base '>
                            Enable the video webcam and microphone to start your AI-generated mock interview. 
                            It includes 5 questions which you can answer. Note: We never record your video. 
                            Webcam access can be disabled at any time by clicking on the camera.
                        </p>
                    </div>
                    <div className='flex justify-end items-center'>
                <Button onClick={()=> navigation('/dashboard/interview/'+interviewId+'/startInterview')} >Start Interview</Button>


                </div>
                </div>
                <div className='flex flex-col items-center'>
                    {webCamEnable ? (
                        <Webcam
                            style={{ height: 300, width: 300 }}
                            videoConstraints={{ facingMode: 'user' }}
                            mirrored={true}
                            onClick={() => setWebCamEnable(false)}
                        />
                    ) : (
                        <>
                            <WebcamIcon
                                className='h-72 w-full p-20 bg-secondary rounded-lg border my-7 cursor-pointer'
                                aria-label='Enable webcam'
                            />
                            <Button onClick={() => setWebCamEnable(true)}
                                variant='ghost'>Enable Camera and Microphone</Button>
                        </>
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Interview;

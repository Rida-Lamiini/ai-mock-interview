import { Lightbulb, Volume, Volume1, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    const questions = mockInterviewQuestion?.questions || [];

    
    
    const textToSpeach = (question) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(question)
            window.speechSynthesis.speak(speech)
        }
        else {
            alert('Sorry Your browser doest not supported')
        }

    }

    return (
        <div className=''>
            <div className='p-5 border rounded-lg'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {questions.length > 0 ? (
                        questions.map((item, index) => (
                            <div key={index} className='mb-4'>
                                <h2
                                    className={`text-xs md:text-sm text-center font-semibold cursor-pointer rounded-full p-2 ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-secondary text-black'}`}
                                >
                                    Question #{index + 1}
                                </h2>

                            </div>
                        ))
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
                {questions[activeQuestionIndex] && (

                <>
                  <h2 className='my-5 text-md md:text-lg'>
                    {questions[activeQuestionIndex].question}
                </h2>
                <Volume2 className='cursor-pointer' onClick={() => textToSpeach(questions[activeQuestionIndex].question)}/>
                </>
              
                
            )}
     

            </div>
           
            <div className='border rounded-lg p-5 mt-10 bg-blue-100'>
                <h2 className='flex gap-5 items-center text-blue-700'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <p className='text-sm text-primary'>
                    Click on Record Answer if you want to answer the question. At the end of the interview, we will provide you with feedback, including the correct answers for each question and your answers for comparison.
                </p>
            </div>
        </div>
    );
}

export default QuestionsSection;

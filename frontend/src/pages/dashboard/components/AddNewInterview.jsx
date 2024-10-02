import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendPostRequest } from '../../../sevices/utils/api';
import { AIchatSession } from '../../../sevices/modules/GeminiAI';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState('');

  const navigation = useNavigate()

  const {user} = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const interviewData = {
      jobPosition: jobPosition,
      jobDesc: jobDescription,
      jobExperience: jobExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress, // replace with actual user data
      createdAt: new Date().toISOString(),
      mockId: uuidv4(), // replace with actual logic to generate mock ID
       
    };

    const InputPrompt = `Create a JSON object with interview questions and answers for the following job position:
    {
      "jobPosition": "${jobPosition}",
      "jobDescription": "${jobDescription}",
      "jobExperience": "${jobExperience}"
    }

    The JSON should contain an array of questions, each with a question and answer field. Example:
    {
      "questions": [
        {
          "question": "What is your experience with React?",
          "answer": "I have worked with React for 3 years..."
        }
      ]
    }
    Provide the JSON response only.`;

    try {
      const aiResult = await AIchatSession.sendMessage(InputPrompt);
      const aiResponse = aiResult.response.text();

      setJsonResp(aiResponse);

      interviewData.jsonMockResp = aiResult.response.text();
      // interviewData.jsonMockResp = "test generating"
      
      
      if(aiResult) {
        await sendPostRequest('http://localhost:8080/api/mock-interviews', interviewData);
        setOpenDialog(false);
        navigation('/dashboard/interview/'+interviewData.mockId);

      }

     
    } catch (error) {
      console.error('There was a problem with the operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tell us more about your job interview</DialogTitle>
            <DialogDescription>
              <p>
                Add details about your job position/role, job description, and years of experience.
              </p>
              <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Role/Job Position
                  </label>
                  <Input
                    placeholder="Ex. Full stack developer"
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description/Tech Stack
                  </label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJS, Spring, etc."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Years of Experience
                  </label>
                  <Input
                    placeholder="Ex. 5"
                    type="number"
                    min="0"
                    max="20"
                    value={jobExperience}
                    onChange={(e) => setJobExperience(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-5 justify-end mt-4">
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Start Interview'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

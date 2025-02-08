import React, { useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import { initialStepsArr } from "./constants";
import "./styles.css";
import logo from './assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFileImage, faFileWord, faAngleRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(
    JSON.parse(sessionStorage.getItem("steps")) || initialStepsArr
  );
  const [uploadedFiles, setUploadedFiles] = useState(
    JSON.parse(sessionStorage.getItem("uploadedFiles")) || {}
  );
  const [stepTextInput, setStepTextInput] = useState(
    JSON.parse(sessionStorage.getItem("stepTextInput")) || {}
  );
  const [expanded, setExpanded] = useState(null);

  const uatName = sessionStorage.getItem("uatName") || "UAT";

  const handleStepClick = (step, index) => setCurrentStep(index);

  const handleFormSubmit = (e, index) => {
    e.preventDefault();

    // Mark the current step as completed
    const updatedSteps = steps.map((step, i) =>
      i === index ? { ...step, completed: true } : step
    );
    setSteps(updatedSteps);

    // Store updated steps in session storage
    sessionStorage.setItem("steps", JSON.stringify(updatedSteps));

    // Move to the next step if it exists
    if (index < steps.length - 1) {
      setCurrentStep(index + 1);
    }
  };

  const handleFileChange = (e, stepIndex, fileKey) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    let fileIcon = null;

    // Determine the file type for displaying the icon
    if (['xls', 'xlsx'].includes(fileExtension)) {
      fileIcon = faFileExcel;
    } else if (fileExtension === 'png' || fileExtension === 'jpg') {
      fileIcon = faFileImage;
    } else if (['doc', 'docx', 'txt', 'ost', 'pst'].includes(fileExtension)) {
      fileIcon = faFileWord;
    } 

    const updatedFiles = {
      ...uploadedFiles,
      [stepIndex]: {
        ...uploadedFiles[stepIndex],
        [fileKey]: { name: file.name, icon: fileIcon },
      },
    };

    setUploadedFiles(updatedFiles);
    sessionStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  const handleTextInputChange = (e, stepIndex, field) => {
    const { value } = e.target;
    const updatedTextInput = {
      ...stepTextInput,
      [stepIndex]: {
        ...stepTextInput[stepIndex],
        [field]: value,
      },
    };
    setStepTextInput(updatedTextInput);
    sessionStorage.setItem("stepTextInput", JSON.stringify(updatedTextInput));
  };

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const styles = {
    ActiveNode: () => ({
      backgroundColor: "#c25715",
    }),
    inActiveNode: () => ({
      backgroundColor: "#bf8104",
    }),
    ActiveLabelTitle: () => ({
      color: "#c25715",
    }),
    CompletedNode: () => ({
      backgroundColor: "#c25715",
    }),
    Node: () => ({
      backgroundColor: "#bf8104",
    }),
    InactiveLineSeparator: () => ({
      minHeight: "50px",
    }),
    LineSeparator: () => ({
      minHeight: "50px",
      backgroundColor: "#c25715",
    }),
  };

  const guidanceContent = [
    "Definition: A business requirements document (BRD) is a formal report that details all the objectives or “requirements” for the UAT. It describes all business needs or expected objectives to be tested during the course of the UAT.\n - Business objectives: They are the specific and measurable results companies hope to maintain as their organization grows. Remain competitive, innovative and create value for stakeholders.\n - Scope: A way to set boundaries on your project and define exactly what goals, deadlines, and project deliverables you'll be working towards.",
    "What is a Test Scenario ?\n - A test scenario is a collective set of test cases that helps the testing team determine the positive and negative features of the project.\n - It provides a high-level description of what has to be tested.\n - It is defined as a linear statement.\n - It is a detailed document that covers end to end functionality of a software application.\n - It is a useful exercise for saving time.\n - It is simple to maintain as adding and modifying test cases is simple.",
    "What is a Test Case ?\n - Test cases are sets of actions that are executed to verify particular features or functionality of software applications. It consists of test data, test steps, preconditions, and postconditions that are developed for specific test scenarios to verify any requirement.\n - Test cases are mostly derived from test scenarios.\n - It helps in the exhaustive testing of software.\n- Test cases include test steps, data, and expected outcomes for testing.\n - These are low-level actions and require more time and resources for execution.",
    "Definition: UAT Testing strategy is a document listing the method of testing for each UAT. It should guide all UAT participants by explaining: \n - What must be completed before UAT can start. \n - What is the testing scope and coverage + expected results. \n - Who is supposed to perform what. \n - Where the testing will happen. \n - And who will sign it off.",
    "Sign off should be provided by UAT end users (Back Office, Middle Office, Finance) plus Technical team lead if required."
  ];

  const isSubmitDisabled = (index) => {
    const files = uploadedFiles[index] || {};
    const textInputs = stepTextInput[index] || {};
  
    // Define the required fields for each step based on stepLabels or other conditions
    let requiredFields = [];
  
    // Step 1: Business Requirements Document
    if (index === 0) {
      requiredFields = ["file1", "file2"];
    }
    // Step 2: Test Scenario identification
    else if (index === 1) {
      requiredFields = ["file1", "file2"];
    }
    // Step 3: Test Cases identification
    else if (index === 2) {
      requiredFields = ["file1", "file2", "jiraLink"];
    }
    // Step 4: UAT Testing Strategy
    else if (index === 3) {
      requiredFields = ["file2", "prerequisites", "scope", "expectedResults", "environment", "signOff"];
    }
    // Step 5: UAT Business Sign Off
    else if (index === 4) {
      requiredFields = ["file1", "file2"];
    }
  
    // Check if any of the required fields are missing
    return requiredFields.some((field) => {
      return !files[field] && !textInputs[field];
    });
  };

  // Define custom labels for each step
  const stepLabels = [
    ["Business Requirements Document", "Business Requirements Document Approvals"],
    ["Test Scenario identification", "Test Scenario approval"],
    ["Test Cases identification", "Test Cases approval", "JIRA link"], // Add third entry for text input
    ["UAT Testing details", "UAT Testing strategy approval email"],
    ["UAT Business sign off", "UAT Technical sign off"],
  ];

  const isCompleted = (index) => {
    const textInputs = stepTextInput[index] || {};
    const requiredFields = ["prerequisites", "scope", "expectedResults", "environment", "signOff"];
    return requiredFields.every(field => textInputs[field]);
  };

  return (
    <div className="App">
      <div className="header"><div> <img src={logo} alt="Logo" className="logo" /></div><div>Ulysse</div></div>
      <div className="siteBody">
        <div className="sideBar">
          <div className="stepSummary">
            <Stepper
              steps={steps}
              currentStepIndex={currentStep}
              orientation="vertical"
              onStepClick={handleStepClick}
              labelPosition="right"
              styles={styles}
            />
          </div>
        </div>
        <div className="mainSection">
          {steps.map((step, index) => (
            currentStep === index && (
              <form
                className="contentSection"
                onSubmit={(e) => handleFormSubmit(e, index)}
                key={index}
              >
                <h1 className="contentTitle">UAT: {uatName}</h1>
                <h2 className="contentTitle">
                  {step.stepLabel} {step.completed && "(Completed)"}
                </h2>
                <div
                  onClick={() => toggleExpand(index)}
                  className="expandDiv"
                  role="button"
                  tabIndex="0"
                  aria-label="Toggle guidance"
                >
                  Guidance
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={`caretIcon ${expanded === index ? 'rotated' : ''}`}
                  />
                </div>
                {expanded === index && (
                  <div className="guidanceContent">
                   <p dangerouslySetInnerHTML={{ __html: guidanceContent[index].replace(/\n/g, '<br>') }}></p>
                  </div>
                )}

                {/* Dynamically render file upload sections based on the step */}
                {stepLabels[index]?.map((label, fileIndex) => (
                  <div key={fileIndex}>
                    {index === 3 && fileIndex === 0 ? (
                      // For the UAT Testing Strategy step, render the textareas
                      <>
                      <div className="formTextArea">
                        <label htmlFor={`prerequisites-${index}`}>Prerequisites:</label>
                        <textarea
                          id={`prerequisites-${index}`}
                          className="inputText"
                          value={stepTextInput[index]?.prerequisites || ""}
                          onChange={(e) => handleTextInputChange(e, index, 'prerequisites')}
                        />
                        
                        <label htmlFor={`scope-${index}`}>Testing scope and test cases:</label>
                        <textarea
                          id={`scope-${index}`}
                          className="inputText"
                          value={stepTextInput[index]?.scope || ""}
                          onChange={(e) => handleTextInputChange(e, index, 'scope')}
                        />
                        
                        <label htmlFor={`expectedResults-${index}`}>Expected results:</label>
                        <textarea
                          id={`expectedResults-${index}`}
                          className="inputText"
                          value={stepTextInput[index]?.expectedResults || ""}
                          onChange={(e) => handleTextInputChange(e, index, 'expectedResults')}
                        />
                        
                        <label htmlFor={`environment-${index}`}>Environment:</label>
                        <textarea
                          id={`environment-${index}`}
                          className="inputText"
                          value={stepTextInput[index]?.environment || ""}
                          onChange={(e) => handleTextInputChange(e, index, 'environment')}
                        />
                        
                        <label htmlFor={`signOff-${index}`}>Sign off:</label>
                        <textarea
                          id={`signOff-${index}`}
                          className="inputText"
                          value={stepTextInput[index]?.signOff || ""}
                          onChange={(e) => handleTextInputChange(e, index, 'signOff')}
                        />
                        
                        {isCompleted(index) && (
                          <div className="completedStatus">
                            <FontAwesomeIcon icon={faCheckCircle} className="checkmarkIcon" />
                            <span>Completed</span>
                          </div>
                        )}
                        </div>
                      </>
                    ) : fileIndex === 2 ? (
                      // For the JIRA link, render an input text field
                      <>
                        <label htmlFor={`jiraLink-${index}`}>JIRA Link:</label>
                        <input
                          id={`jiraLink-${index}`}
                          type="text"
                          className="inputText"
                          value={stepTextInput[index]?.jiraLink || ""}
                          onChange={(e) => handleTextInputChange(e, index, 'jiraLink')}
                        />
                      </>
                    ) : (
                      // For other steps, render file upload inputs
                      <>
                        <label htmlFor={`file${fileIndex + 1}-${index}`}>{label}:</label>
                        <input
                          id={`file${fileIndex + 1}-${index}`}
                          type="file"
                          className="inputFile"
                          onChange={(e) => handleFileChange(e, index, `file${fileIndex + 1}`)}
                        />
                        {uploadedFiles[index]?.[`file${fileIndex + 1}`] && (
                          <div className="uploadedFiles">
                            <FontAwesomeIcon icon={uploadedFiles[index][`file${fileIndex + 1}`].icon} />
                            <p>{uploadedFiles[index][`file${fileIndex + 1}`].name}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isSubmitDisabled(index)}
                  className="submitButton"
                >
                  Submit
                </button>
              </form>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

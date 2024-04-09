// Default V2 theme
import 'survey-core/defaultV2.min.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

export default function () {
    const questions = [{
            type: "radiogroup",
            name: "question1",
            title: "Which of the following is the most common cause of workplace injuries among nurses?",
            choices: [
                "Lifting and transferring patients",
                "Exposure to infectious diseases",
                "Slips, trips, and falls",
                "Needlestick injuries"
            ],
            correctAnswer: "Lifting and transferring patients",
            explanation: "Lifting and transferring patients can lead to musculoskeletal injuries if proper body mechanics are not used."
        },
        {
            type: "radiogroup",
            name: "question2",
            title: "What should be the immediate action if a nurse encounters a spill of hazardous chemicals?",
            choices: [
                "Leave it for the cleaning staff to handle",
                "Inform the supervisor and ignore it",
                "Clean it up following proper protocols",
                "Ignore it and continue working"
            ],
            correctAnswer: "Clean it up following proper protocols",
            explanation: "It's important to clean up spills of hazardous chemicals promptly and following proper protocols to prevent exposure and further contamination."
        },
        {
            type: "radiogroup",
            name: "question3",
            title: "Which of the following is a key factor in preventing patient falls in healthcare settings?",
            choices: [
                "Using restraints on patients",
                "Maintaining dim lighting in patient rooms",
                "Encouraging patients to walk without assistance",
                "Performing regular patient assessments"
            ],
            correctAnswer: "Performing regular patient assessments",
            explanation: "Regular patient assessments help identify factors that may increase the risk of falls and allow for appropriate interventions to be implemented."
        },
        {
            type: "radiogroup",
            name: "question4",
            title: "What is the recommended action for a nurse who suspects a patient is experiencing anaphylaxis?",
            choices: [
                "Wait and see if symptoms improve",
                "Administer an antihistamine",
                "Administer epinephrine immediately",
                "Ignore the symptoms"
            ],
            correctAnswer: "Administer epinephrine immediately",
            explanation: "Administering epinephrine is crucial in managing anaphylaxis as it helps reverse the life-threatening symptoms until further medical assistance can be provided."
        },
        {
            type: "radiogroup",
            name: "question5",
            title: "What is the proper way to lift a heavy object to prevent back injuries?",
            choices: [
                "Bend at the waist and lift with your back",
                "Keep your back straight and lift with your legs",
                "Twist your body while lifting",
                "Use one hand to lift the object"
            ],
            correctAnswer: "Keep your back straight and lift with your legs",
            explanation: "Lifting with your legs while keeping your back straight helps distribute the weight evenly and reduces the strain on your back muscles, thus preventing back injuries."
        },
        {
            type: "radiogroup",
            name: "question6",
            title: "What is the first step in fire safety in a healthcare facility?",
            choices: [
                "Evacuate all patients immediately",
                "Activate the fire alarm",
                "Attempt to extinguish the fire",
                "Check for trapped patients"
            ],
            correctAnswer: "Activate the fire alarm",
            explanation: "Activating the fire alarm immediately alerts everyone in the facility to the potential danger and initiates the evacuation process, ensuring the safety of patients and staff."
        },
        {
            type: "radiogroup",
            name: "question7",
            title: "What should a nurse do if they suspect a coworker is impaired while on duty?",
            choices: [
                "Ignore it and continue working",
                "Report the suspicion to the supervisor or appropriate authority",
                "Confront the coworker directly",
                "Cover for the coworker"
            ],
            correctAnswer: "Report the suspicion to the supervisor or appropriate authority",
            explanation: "Reporting suspicions of coworker impairment is essential for patient safety and ensures that appropriate actions can be taken to address the situation."
        },
        {
            type: "radiogroup",
            name: "question8",
            title: "Which of the following is a common symptom of latex allergy?",
            choices: [
                "Headache",
                "Runny nose",
                "Rash",
                "Nausea"
            ],
            correctAnswer: "Rash",
            explanation: "A rash is a common symptom of latex allergy, which can develop after repeated exposure to latex-containing products in healthcare settings."
        },
        {
            type: "radiogroup",
            name: "question9",
            title: "What is the appropriate response if a patient refuses treatment?",
            choices: [
                "Force the treatment on the patient",
                "Respect the patient's decision and document it",
                "Ignore the refusal and proceed with treatment",
                "Convince the patient to accept treatment"
            ],
            correctAnswer: "Respect the patient's decision and document it",
            explanation: "Respecting the patient's right to refuse treatment is crucial, and it should be documented in the patient's medical record along with any discussions held regarding the refusal."
        },
        {
            type: "radiogroup",
            name: "question10",
            title: "What should be done before administering medication to a patient?",
            choices: [
                "Guess the dosage if unsure",
                "Ask a coworker for their opinion",
                "Verify the 'five rights' of medication administration",
                "Wait until the next shift to administer the medication"
            ],
            correctAnswer: "Verify the 'five rights' of medication administration",
            explanation: "Before administering medication, it's essential to verify the 'five rights' - right patient, right medication, right dose, right route, and right time - to ensure patient safety and medication effectiveness."
        }
    ];
    const nQuestion = Math.floor((Math.random() * questions.length));
    const surveyJson = {
        title: "Safety Nurse Quiz",
        showCorrectAnswer: "always",
        showProgressBar: "bottom",
        firstPageIsStarted: true,
        startSurveyText: "Start Quiz",
        pages: [{
            elements: [{
                type: "html",
                html: "Welcome to the Safety Nurse Quiz. <br/>You will have 30 seconds for every question and 60 seconds to complete the quiz.<br/>Please enter your name below and click <b>Start Quiz</b> to begin."
            }, {
                type: "text",
                name: "username",
                titleLocation: "hidden",
                isRequired: true
            }]
        }, {
            elements: [questions[nQuestion]]
        }]
    };
    const survey = new Model(surveyJson);

    survey.onComplete.add(function (sender) {
        var questions = sender.getAllQuestions();
        for (var i = 0; i < questions.length; i++) {
            var question = questions[i];
            var correctAnswer = question.correctAnswer;
            var userAnswer = question.value;
            var questionTitle = question.title;
            console.log("Question: " + questionTitle);
            console.log("Correct Answer: " + correctAnswer);
            console.log("User Answer: " + userAnswer);
            if (userAnswer !== correctAnswer) {
                // Replace "Thank you for completing this survey" with the question's explanation
                surveyJson.pages[1].elements[0].html = "<b>Explanation:</b> " + question.explanation;
            }
        }
    });

    return <Survey model={survey} />;
}

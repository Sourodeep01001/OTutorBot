package com.developersuraj.OTutorBot.controller;

import com.developersuraj.OTutorBot.entity.MessageResponseFromScript;
import com.developersuraj.OTutorBot.entity.QuestionAnswerPOJo;
import com.developersuraj.OTutorBot.entity.QuestionPOJO;
import com.developersuraj.OTutorBot.service.GeminiResponseService;
import com.developersuraj.OTutorBot.service.ScriptFormCreationService;
import com.developersuraj.OTutorBot.service.StringToQuestionPOJOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/form")
@CrossOrigin(origins = "http://localhost:5173")
public class FormCreationController {

    @Autowired
    public ScriptFormCreationService formCreationService;
    @Autowired
    public GeminiResponseService geminiResponseService;
    @Autowired
    public StringToQuestionPOJOService pojoConverterService;

    @PostMapping
    public ResponseEntity<MessageResponseFromScript> createFormL(@RequestBody Map<String, String> payload) {
        //Ask Ai for the questions
        String getTheQuestions = "";
        QuestionPOJO questionPOJO;

        try {
            //get Question
            String question = payload.get("question");
            //Getting Answer
            QuestionAnswerPOJo answer = geminiResponseService.getAnswer(question, 25);

            getTheQuestions = answer.candidates.get(0).content.parts.get(0).text; //get as a string

            String data = getTheQuestions.replace("```json", "").replace("```", "")
                    .replace("\n", "")  // Remove newline characters if needed
                    .trim();  // Remove leading or trailing spaces

            questionPOJO = pojoConverterService.convertJsonToPojo(data);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        //Now Create Form using the questions you receive
        try {

            MessageResponseFromScript response = formCreationService.getFormURL(questionPOJO);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
        }

    }
}

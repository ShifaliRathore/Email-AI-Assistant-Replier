package com.email.writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*
@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;
    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
    /*
   @PostMapping("/generate")
   public ResponseEntity<String> generateEmail(@RequestBody EmailRequest request) {
       if (request.getEmailContent() == null || request.getTone() == null) {
           return ResponseEntity.badRequest().body("Missing required fields.");
       }

       String response = emailGeneratorService.generateEmailReply(request);
       return ResponseEntity.ok(response);
   }
   */
    @RestController
    @RequestMapping("/api/email")
    @CrossOrigin(origins = "*")
    public class EmailGeneratorController {

        private final EmailGeneratorService emailGeneratorService;

        public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
            this.emailGeneratorService = emailGeneratorService;
        }

        @PostMapping("/generate")
        public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
            String response = emailGeneratorService.generateEmailReply(emailRequest);
            return ResponseEntity.ok(response);
        }
    }



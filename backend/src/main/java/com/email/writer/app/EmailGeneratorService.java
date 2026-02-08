 /* package com.email.writer.app;

 import com.email.writer.app.EmailRequest;
 import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private  String geminiApiUrl;

    @Value("${gemini.api.key}")
    private  String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest){
        //Build the prompt
        String prompt = buildPrompt(emailRequest);
        //Craft a request
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                               Map.of("text", prompt)
                        ))
                )
        );
        //Do request and get response
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        //Extract Return response and Return result
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();
        }catch (Exception e){
            return "Error processing request : " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line ");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");

        }
        prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}
*/
/*
package com.email.writer.app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

 @Service
 public class EmailGeneratorService {

     private final WebClient webClient;

     @Value("${gemini.api.key}")
     private String geminiApiKey;

     public EmailGeneratorService(WebClient.Builder webClientBuilder) {
         this.webClient = webClientBuilder
                 .baseUrl("https://generativelanguage.googleapis.com")
                 .build();
     }

     public String generateEmailReply(EmailRequest emailRequest) {
         String prompt = buildPrompt(emailRequest);

         Map<String, Object> requestBody = Map.of(
                 "contents", List.of(
                         Map.of("parts", List.of(
                                 Map.of("text", prompt)
                         ))
                 )
         );

         String response = webClient.post()
                 .uri(uriBuilder -> uriBuilder
                         .path("/v1/models/gemini-1.0-pro:generateContent")
                         .queryParam("key", geminiApiKey)
                         .build())
                 .header("Content-Type", "application/json")
                 .bodyValue(requestBody)
                 .retrieve()
                 .onStatus(HttpStatusCode::isError, clientResponse ->
                         clientResponse.bodyToMono(String.class)
                                 .map(body -> new RuntimeException("Gemini API error: " + body))
                 )
                 .bodyToMono(String.class)
                 .block();

         return extractResponseContent(response);
     }

     private String extractResponseContent(String response) {
         try {
             ObjectMapper mapper = new ObjectMapper();
             JsonNode rootNode = mapper.readTree(response);
             return rootNode.path("candidates")
                     .get(0)
                     .path("content")
                     .path("parts")
                     .get(0)
                     .path("text")
                     .asText();
         } catch (Exception e) {
             return "Error processing response: " + e.getMessage() + " | Raw: " + response;
         }
     }

     private String buildPrompt(EmailRequest emailRequest) {
         StringBuilder prompt = new StringBuilder();
         prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line. ");
         if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
             prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
         }
         prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());
         return prompt.toString();
     }
 }
*/

 package com.email.writer.app;

 import com.fasterxml.jackson.databind.JsonNode;
 import com.fasterxml.jackson.databind.ObjectMapper;
 import org.springframework.beans.factory.annotation.Value;
 import org.springframework.http.HttpStatusCode;
 import org.springframework.stereotype.Service;
 import org.springframework.web.reactive.function.client.WebClient;

 import java.util.List;
 import java.util.Map;

 @Service
 public class EmailGeneratorService {

     private final WebClient webClient;

     @Value("${gemini.api.key}")
     private String geminiApiKey;

     public EmailGeneratorService(WebClient.Builder webClientBuilder) {
         this.webClient = webClientBuilder
                 .baseUrl("https://generativelanguage.googleapis.com")
                 .build();
     }

     public String generateEmailReply(EmailRequest emailRequest) {

         String prompt = buildPrompt(emailRequest);

         Map<String, Object> requestBody = Map.of(
                 "contents", List.of(
                         Map.of(
                                 "parts", List.of(
                                         Map.of("text", prompt)
                                 )
                         )
                 )
         );

         String response = webClient.post()
                 .uri(uriBuilder -> uriBuilder
                         .path("/v1beta/models/gemini-2.5-flash:generateContent")
                         .queryParam("key", geminiApiKey)
                         .build())
                 .header("Content-Type", "application/json")
                 .bodyValue(requestBody)
                 .retrieve()
                 .onStatus(HttpStatusCode::isError, r ->
                         r.bodyToMono(String.class)
                                 .map(body -> new RuntimeException("Gemini API error: " + body))
                 )
                 .bodyToMono(String.class)
                 .block();

         return extractResponseContent(response);
     }

     private String extractResponseContent(String response) {
         try {
             ObjectMapper mapper = new ObjectMapper();
             JsonNode root = mapper.readTree(response);
             return root.path("candidates")
                     .get(0)
                     .path("content")
                     .path("parts")
                     .get(0)
                     .path("text")
                     .asText();
         } catch (Exception e) {
             return "Parsing error: " + e.getMessage();
         }
     }

     private String buildPrompt(EmailRequest emailRequest) {
         StringBuilder prompt = new StringBuilder();
         prompt.append("Generate a professional email reply. ");
         prompt.append("Do not include a subject line. ");

         if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
             prompt.append("Use a ").append(emailRequest.getTone()).append(" tone. ");
         }

         prompt.append("\n\nOriginal Email:\n");
         prompt.append(emailRequest.getEmailContent());

         return prompt.toString();
     }
 }

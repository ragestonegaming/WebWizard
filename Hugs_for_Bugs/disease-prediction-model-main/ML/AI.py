import pathlib
import textwrap
import google.generativeai as genai

GOOGLE_API_KEY='AIzaSyBdTNrLRXTEqXGFTsj1B25vlyKPV6g5xRc'

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# chat.send_message("act as an expert doctor with experience in multiple fields. Patient will come to you with question based on a disease that they have been diagnosed with and you will have to provide them with an answer. Be concise and upto point, i understand that you're an AI chatbot and not a doctor, so you don't need to mention this disclaimer in every response")

def conversation(message):
  response = model.generate_content("act as an expert doctor with experience in multiple fields. Patient will come to you with question based on a disease that they have been diagnosed with and you will have to provide them with an answer. Be concise and upto point, i understand that you're an AI chatbot and not a doctor, so you don't need to mention this disclaimer in every response." + message)
  # response = chat.send_message(message)
  print (response.text)
  return response.text
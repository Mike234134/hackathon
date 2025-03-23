from openai import OpenAI
client = OpenAI(
    api_key="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"
    
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": [
                f"based on the song/artist playboicarti can you give me some insights into how the song was made what was the meaning behind the song and finally what was the impact the song had"
            ],
        }
    ],
)
with open("chatgpt_response.txt", "w") as file:
    file.write(response.text)

print(response.choices[0].message.content)
from openai import OpenAI
client = OpenAI(
    api_key
    
)

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": f"based on the song/artist playboicarti can you give me some insights into how the song was made what was the meaning behind the song and finally what was the impact the song had and return the threee things in a dictionary for me and give the values of inspiration,meaning,and finally impact"
        }
    ],
)

print(response.choices[0].message.content)
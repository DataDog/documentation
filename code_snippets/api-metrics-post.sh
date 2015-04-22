
currenttime=$(date +%s)
curl  -X POST -H "Content-type: application/json" \
-d "{ \"series\" :
         [{\"metric\":\"test.metric\",
          \"points\":[[$currenttime, 20]],
          \"type\":\"gauge\",
          \"host\":\"test.example.com\",
          \"tags\":[\"environment:test\"]}
        ]
    }" \

'https://app.datadoghq.com/api/v1/series?api_key=9775a026f1ca7d1c6c5af9d94d9595a4'

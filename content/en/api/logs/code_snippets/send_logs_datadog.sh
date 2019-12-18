## Simple Raw Message
## API key passed in headers

curl -X POST https://http-intake.logs.datadoghq.com/v1/input \
     -H "Content-Type: text/plain" \
     -H "DD-API-KEY: <API_KEY>" \
     -d 'hello world'

## API key passed in path

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: text/plain" \
     -d 'hello world'

## Log attributes can be passed as query parameters

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY>?ddtags=env:prod,user:my-user \
     -H "Content-Type: text/plain" \
     -d 'hello world'

## Multi Raw Messages

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: text/plain" \
     --data-binary @- <<BODY
hello
world
BODY

## Simple JSON Message
## Log attributes can also be passed as key:value pairs in valid JSON messages
curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: application/json" \
     -d '{"message":"hello world", "ddsource":"<SOURCE>", "ddtags":"env:<ENV>,user:<USER_NAME>", "hostname":"<HOSTNAME>"}'

## Multi JSON Messages

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: application/json" \
     --data-binary @- <<BODY
[
  {
    "message": "hello"
  },
  {
    "message": "world"
  }
]
BODY

## Simple Logplex Message

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: application/logplex-1" \
     -d 'hello world'

## Multi Logplex Messages

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: application/logplex-1" \
     --data-binary @- <<BODY
hello
world
BODY

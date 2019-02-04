## Simple Raw Message
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
     -d '{"message":"hello world", "ddsource":"my-source", "ddtags":"env:my-env,user:my-user", "hostname":"my-hostname"}'

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

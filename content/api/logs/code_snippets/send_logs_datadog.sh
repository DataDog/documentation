## Simple Raw Message

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
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

curl -X POST https://http-intake.logs.datadoghq.com/v1/input/<API_KEY> \
     -H "Content-Type: application/json" \
     -d '{"message":"hello wolrd"}'

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

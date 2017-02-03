#!/bin/bash

# Create IDs.
TRACE_ID=($RANDOM % 1000000)
SPAN_ID=($RANDOM % 1000000)

# Start a timer.
START=$(date +%s%N)

# Do things...
sleep 5

# Stop the timer.
DURATION=$(($(date +%s%N) - $START))

# Send the trace.
curl -X PUT -H "Content-type: application/json" \
  -d "[{
    \"trace_id\": $TRACE_ID,
    \"span_id\": $SPAN_ID,
    \"name\": \"span_name\",
    \"resource\": \"/home\",
    \"service\": \"my-flask-app\",
    \"type\": \"web\",
    \"start\": $START,
    \"duration\": $DURATION
  }]" \
  http://localhost:7777/spans

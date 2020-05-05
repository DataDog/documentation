#!/bin/bash

# Create IDs.
TRACE_ID=($RANDOM % 1000000)
SPAN_ID=($RANDOM % 1000000)

# Start a timer.
# For the Alpine image, in order to get the time in nanoseconds,
# you may need to install coreutils ("apk add coreutils").
START=$(date +%s%N)

# Do things...
sleep 2

# Stop the timer.
DURATION=$(($(date +%s%N) - $START))

# Send the traces.
curl -X PUT -H "Content-type: application/json" -H "X-Datadog-Trace-Count: 1" \
  -d "[[{
    \"trace_id\": $TRACE_ID,
    \"span_id\": $SPAN_ID,
    \"name\": \"span_name\",
    \"resource\": \"/home\",
    \"service\": \"service_name\",
    \"type\": \"web\",
    \"start\": $START,
    \"duration\": $DURATION
}]]" \
  http://localhost:8126/v0.4/traces

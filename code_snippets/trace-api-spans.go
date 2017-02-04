package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "io/ioutil"
    "math/rand"
    "net/http"
    "time"
)

type Span struct {
    TraceId int `json:"trace_id"`
    SpanId int `json:"span_id"`
    Name string `json:"name"`
    Resource string `json:"resource"`
    Service string `json:"service"`
    Type string `json:"type"`
    Start int64 `json:"start"`
    Duration int64 `json:"duration"`
}

type Trace []Span

type Traces []Trace

func main() {
    // Create IDs.
    trace_id := rand.Intn(1000000)
    span_id := rand.Intn(1000000)

    // Start a timer.
    start := time.Now().UnixNano()

    // Do things...
    time.Sleep(2 * time.Second)

    // Stop the timer.
    duration := time.Now().UnixNano() - start

    // Send the traces.
    traces := Traces{ Trace{ Span{
        TraceId: trace_id,
        SpanId: span_id,
        Name: "span_name",
        Resource: "/home",
        Service: "pseudo_service",
        Type: "web",
        Start: start,
        Duration: duration}}}
    jsonTraces, _ := json.Marshal(traces)

    client := &http.Client{}
    request, _ := http.NewRequest("PUT", "http://localhost:7777/v0.3/traces", bytes.NewBuffer(jsonTraces))
    request.Header.Add("Content-Type", "application/json")
    response, _ := client.Do(request)
}

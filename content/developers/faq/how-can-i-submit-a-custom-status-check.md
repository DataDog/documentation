---
title: How Can I Submit A Custom Status Check?
kind: faq
---

Custom status checks can be submitted either through the Datadog API, DogStatsD, or through a custom Agent check. All status checks must have one of the following status codes:

* '0': 'OK'

* '1': 'Warning'

* '2': 'Critical'

* '3': 'Unknown

## Submitting a check with the API

When submitting a status check through the Datadog API, specify a check name, the host submitting the check, and the status; with optional parameters including a timestamp, a message describing the status, and any tags you wish to associate with the check. An example call with all of these options through the shell API would look like:

```
currenttime=$(date +%s)
curl  -X POST -H "Content-type: application/json" \
-d "{
      \"check\": \"app.is_ok\",
      \"host_name\": \"app1\",
      \"status\": 0,
      \"timestamp\": $currenttime,
      \"message\": \"App1 is up and running\",
      \"tags\":[\"environment:production\", \"role:webserver\"]
}" \ 
'https://api.datadoghq.com/api/v1/check_run?api_key=<api_key>'
```

## Submitting a check with DogStatsD

When submitting a status check through DogStatsD, specify a check name and a check status with optional parameters including tags you wish to associate with the check, a timestamp for the check status, the host submitting the check, and a message describing the status. An example call using the datadogpy library would look like:

```
statsd.service_check('app.is_ok', 0, tags=['environment:production','role:webserver'], hostname='app1', message='App1 is up and running')
```

## Submitting a check through a custom Agent check

When submitting a status check through a custom Agent check, the predefined service_check function in the AgentCheck class can be used to pass the Agent check along to Datadog. A call to this function must include a check name and a check status with optional parameters including tags you wish to associate with the check, a timestamp for the check status, the host submitting the check, and a message describing the status. An example call to the service_check function within a custom Agent check would look like:

```
self.service_check('app.is_ok', 0, tags=['environment:production','role:webserver'], hostname='app1', message='App1 is up and running')
```


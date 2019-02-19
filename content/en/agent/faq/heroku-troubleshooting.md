---
title: Datadog-Heroku Buildpack troubleshooting
kind: faq
---

Verify the Datadog Agent is listening by sending a custom metric: 

```shell
# From your project directory:
heroku run bash

# Once your Dyno has started and you are at the command line
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

After a few moments, use the metrics explorer to verify that the metric was received.

It can also be helpful to obtain Agent and Trace Agent logs from your running dyno.

Download Datadog Agent logs:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog.log --dyno=<YOUR DYNO NAME>
```

Download Datadog Trace Agent logs:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog-apm.log --dyno=<YOUR DYNO NAME>
```

## Send a flare

Generate a flare by running:

```shell
# From your project directory:
heroku run bash

# Once your Dyno has started and you are at the command line, send a flare:
agent -c /app/.apt/etc/datadog-agent/datadog.yaml flare
```

The flare contains the environment information and Datadog Agent configuration. However, since this is a new, stand-alone dyno, the logs are sparse and may not contain full log information.

Generate a more complete flare by setting your API key as an environment variable by running:

```shell
heroku ps:exec
DD_API_KEY=<API KEY>
agent -c /app/.apt/etc/datadog-agent/datadog.yaml flare
```

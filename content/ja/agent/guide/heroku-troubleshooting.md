---
title: Datadog-Heroku Buildpack troubleshooting
aliases:
  - /agent/faq/heroku-troubleshooting/
---

To start debugging Heroku, use the `agent-wrapper` command with the information/debugging commands listed in the [Agent documentation][1].

For example, to display the status of your Datadog Agent and enabled integrations, run:

```shell
agent-wrapper status
```

Next, verify the Datadog Agent is listening by sending a custom metric. From your project directory, run:

```shell
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

Generate a flare by running the [`agent-wrapper` command][1]:

```shell
agent-wrapper flare
```

[1]: /agent/configuration/agent-commands/#agent-status-and-information

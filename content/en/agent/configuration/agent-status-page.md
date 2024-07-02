---
title: Agent Status Page
aliases:
- /agent/guide/agent-status-page
further_reading:
- link: "/agent/troubleshooting/"
  tag: "Documentation"
  text: "Agent Troubleshooting"
- link: "/agent/configuration/agent-configuration-files/"
  tag: "Guide"
  text: "Agent Configuration Files"
- link: "/agent/configuration/agent-commands/"
  tag: "Guide"
  text: "Agent Commands"
algolia:
  tags: ['status page']
---

The Agent status page displays information about your running Agent. See [Agent Commands][1] to find the status command for your environment. The sections below provide details on the contents of the status page.

**Note**: The status page may have minor differences between Agent versions.

## Agent version

General information for Agent is displayed under the Agent version, for example:
```text
  Status date: 2019-08-29 18:16:41.526203 UTC
  Agent start: 2019-08-29 18:04:18.060507 UTC
  Pid: 12141
  Go Version: go1.11.5
  Python Version: 2.7.16
  Check Runners: 4
  Log Level: info
```

### Paths

This section displays the paths to the Datadog config file, `conf.d` directory, and `checks.d` directory, for example:
```text
    Config File: /etc/datadog-agent/datadog.yaml
    conf.d: /etc/datadog-agent/conf.d
    checks.d: /etc/datadog-agent/checks.d
```

### Clocks

This section displays the [NTP offset][2] and system UTC time, for example:
```text
    NTP offset: 2.095ms
    System UTC time: 2019-08-29 18:16:41.526203 UTC
```

### Host info

This section displays information on the host the Agent is running on, for example:
```text
    bootTime: 2019-08-29 18:01:27.000000 UTC
    kernelVersion: 4.4.0-109-generic
    os: linux
    platform: ubuntu
    platformFamily: debian
    platformVersion: 16.04
    procs: 175
    uptime: 2m53s
    virtualizationRole: guest
    virtualizationSystem: vbox
```

### Hostnames

This section displays the hostnames found by the Agent (see the example below). The `hostname` is the final hostname reported to the backend. For more information, see [How does Datadog determine the Agent hostname][3].

```text
    hostname: ubuntu-xenial
    socket-fqdn: ubuntu-xenial
    socket-hostname: ubuntu-xenial
    hostname provider: os
    unused hostname providers:
      aws: not retrieving hostname from AWS: the host is not an ECS instance, and other providers already retrieve non-default hostnames
      configuration/environment: hostname is empty
      gce: unable to retrieve hostname from GCE: Get http://169.254.169.254/computeMetadata/v1/instance/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## Collector

### Running checks

This section displays a list of running check instances, for example:

```text
    load
    ----
      Instance ID: load [OK]
      Total Runs: 4
      Metric Samples: Last Run: 6, Total: 24
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 0, Total: 0
      Histogram Buckets: Last Run: 12, Total: 36
      Average Execution Time : 6ms
```

Terms and descriptions:

| Term                   | Description                                                      |
|------------------------|------------------------------------------------------------------|
| Instance ID            | The instance ID and the status of the check.                     |
| Total Runs             | The total number of times the instance has run.                  |
| Metric Samples         | The number of fetched metrics.                                   |
| Events                 | The number of triggered events.                                  |
| Service Checks         | The number of service checks reported.                           |
| Histogram Buckets      | The number of histogram buckets sent.                            |
| Average Execution Time | The average time taken to run the instance.                      |
| Last Run               | The number during the last check run.                            |
| Total                  | The total number since the Agent's most recent start or restart. |

### Config errors

This section only displays if there are checks with config errors, for example:

```text
    test
    ----
      Configuration file contains no valid instances
```

### Loading errors

This section only displays if there are checks with loading errors, for example:

```text
    test
    ----
      Core Check Loader:
        Check test not found in Catalog

      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so

      Python Check Loader:
        unable to import module 'test': No module named test
```

## JMXFetch

This section displays a list of initialized and failed JMX checks even if there are no checks, for example:

```text
  Initialized checks
  ==================
    no checks

  Failed checks
  =============
    no checks
```

## Forwarder

The forwarder uses several workers to send payloads to Datadog.

If you see the warning `the forwarder dropped transactions, there is probably an issue with your network`, this means that all the workers were busy. You should review your network performance and tune the `forwarder_num_workers` and `forwarder_timeout` options.

### Transactions

This section displays the transactions made by the forwarder, for example:

```text
    CheckRunsV1: 2
    Dropped: 0
    DroppedOnInput: 0
    Events: 0
    HostMetadata: 0
    IntakeV1: 2
    Metadata: 0
    Requeued: 0
    Retried: 0
    RetryQueueSize: 0
    Series: 0
    ServiceChecks: 0
    SketchSeries: 0
    Success: 6
    TimeseriesV1: 2
    Errors: 1
```

Terms and descriptions:

| Term           | Description                                                                  |
|----------------|------------------------------------------------------------------------------|
| Success        | The number of transactions successfully sent.                                |
| Errors         | The number of times a transaction failed to be sent and was retried.         |
| RetryQueueSize | The current number of transactions waiting to be retried.                    |
| Retried        | The number of times a transaction was retried.                               |
| DroppedOnInput | The number of transactions that were dropped because all workers were busy.  |
| Dropped        | The number of transactions dropped because they were retried too many times. |

### API keys status

This sections shows the status of your configured API key, for example:

```text
    API key ending with ab123: API Key valid
```

## Endpoints

This section displays the list of endpoints in use by the Datadog Agent, for example:

```text
  https://app.datadoghq.com - API Key ending with:
      - ab123
```

## Logs Agent

If the Logs Agent is enabled, this section displays information on the logs processed and sent, for example:

```text
    LogsProcessed: 10
    LogsSent: 10
```

## Aggregator

This section displays information on the Agent's aggregator, for example:

```text
  Checks Metric Sample: 399
  Dogstatsd Metric Sample: 123
  Event: 1
  Events Flushed: 1
  Number Of Flushes: 2
  Series Flushed: 273
  Service Check: 20
  Service Checks Flushed: 20
  Sketches Flushed: 8
  Checks Histogram Bucket Metric Sample: 24
```

Terms and descriptions:

| Term                                         | Description                                                                                           |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Checks Metric Sample                         | The total number of metrics sent from the checks to the aggregator.                                   |
| Dogstatsd Metric Sample                      | The total number of metrics sent from the DogStatsD server to the aggregator.                         |
| Event                                        | The total number of events sent to the aggregator.                                                    |
| Service Check                                | The total number of service checks sent to the aggregator.                                            |
| Flush                                        | The number of times aggregated metrics were flushed to the forwarder to send to Datadog.              |
| Sketches Flushed                             | The number of times aggregated distribution metrics were flushed to the forwarder to send to Datadog. |
| Checks Histogram Bucket Metric Sample        | The number of histogram bucket metrics sent from the checks to the aggregator.                        |

## DogStatsD

This section displays the number of packets received by the DogStatsD server for each type of data and associated errors, for example:

```text
  Event Packets: 0
  Event Parse Errors: 0
  Metric Packets: 122
  Metric Parse Errors: 0
  Service Check Packets: 0
  Service Check Parse Errors: 0
  Udp Bytes: 7,672
  Udp Packet Reading Errors: 0
  Udp Packets: 123
  Uds Bytes: 0
  Uds Origin Detection Errors: 0
  Uds Packet Reading Errors: 0
  Uds Packets: 0
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-commands/#agent-information
[2]: /agent/troubleshooting/ntp/
[3]: /agent/faq/how-datadog-agent-determines-the-hostname/

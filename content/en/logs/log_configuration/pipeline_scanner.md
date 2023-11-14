---
title: Pipeline Scanner
kind: documentation
disable_toc: false
further_reading:
    - link: "/logs/log_configuration/pipelines/"
      tag: "Documentation"
      text: "Learn more about log pipelines"
    - link: "/logs/log_configuration/processors/"
      tag: "Documentation"
      text: "Learn more about log processors"
---

<div class="alert alert-warning">Log Pipelines Scanner is in beta. </div>

## Overview

The Log Pipeline Scanner helps you to inspect your logs so that you can find out which log pipelines and processors are applied to them. Log pipelines are made up of a sequential chain of processors that parse and enrich your logs. A large organization might have hundreds of pipelines that modify logs from multiple services. These pipelines are set up and managed by different teams for their specific use cases, such as security monitoring, compliance audits, and DevOps. If you are trying to parse new logs, it might be difficult to know which processors and pipelines are modifying the logs.

Log Pipeline Scanner traces your queried logs so that you can see in real time which pipelines and processing rules have modified them. This lets you and your team:

- Troubleshoot log processing issues, such as unparsed logs, missing tags, or unexpected changes to the log structure.
- Determine and remove conflicting or redundant processing rules.
- Ensure that logs going through log pipelines are meeting security and compliance requirements.

## Identify pipelines and processors modifying a log

The Pipeline Scanner samples and annotates logs matching the search query with the different processing steps they are going through, making it possible to identify all changes to your logs.

1. Navigate to [Log Explorer][1].
1. Click on a log where you want to find out which pipelines and processors are modifying it.
1. Click on the three dots in the upper right corner of the panel.
1. Select **Live pipeline debugging**.   
    Alternatively, click on an attribute in the log panel and select **Pipeline Scanner**. 
1. You can further refine your query in the Pipeline Scanner page. This query cannot be changed once a session is started.
1. Click **Launch this session**.   
    For the next 15 minutes, logs matching your query are tagged with information about which pipelines and processors are modifying those logs. The Live Tail in the scanner shows which pipelines and how many pipelines match each of the logs.
1. Click a log to see the list of pipelines and processors matched to that log. Live Tail is paused at this point.

You can modify the pipelines and processors in the right side panel. The modifications you make do not affect the logs that have already been processed. Click **Play** to view the new logs that have been modified by the updated pipelines and processors.

You can also access Pipeline Scanner in the Log Pipelines page and then define the query for the logs you want to inspect.

### Limitations

The number of sessions you can launch is limited to:

- A maximum of 3 concurrent sessions.
- A maximum of 12 sessions over a 12-hour sliding window.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
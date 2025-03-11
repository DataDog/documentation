---
title: Pipeline Scanner
disable_toc: false
further_reading:
    - link: "https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/"
      tag: "Blog"
      text: "Investigate your log processing with the Datadog Log Pipeline Scanner"
    - link: "/logs/log_configuration/pipelines/"
      tag: "Documentation"
      text: "Learn more about log pipelines"
    - link: "/logs/log_configuration/processors/"
      tag: "Documentation"
      text: "Learn more about log processors"
---

## Overview

Log Pipeline Scanner allows you to scan log pipelines in real time, trace specific logs, and identify which pipelines and processing rules made changes to its fields. Organizations rely on log pipelines to process extensive log volumes, each team restructuring and enriching logs differently for their specific use cases, such as security monitoring, compliance audits, and DevOps.

Use Pipeline Scanner to:

- Troubleshoot log processing issues, such as unparsed logs, missing tags, or unexpected changes to the log structure.
- Determine and remove conflicting or redundant processing rules.
- Ensure that logs going through log pipelines are meeting security and compliance requirements.

{{< img src="logs/log_configuration/pipeline_scanner/pipeline_scanner.png" alt="The Pipeline Scanner showing two logs that match the query, log details for the selected log, and the two pipelines modifying the queried logs" style="width:80%;" >}}

## Identify pipelines and processors modifying a log

The Pipeline Scanner samples and annotates logs matching the search query with the different processing steps they are going through, making it possible to identify all changes to your logs.

1. Navigate to [Log Explorer][1].
1. Click on a log where you want to find out which pipelines and processors are modifying it.
1. Click the Pipeline Scanner icon in the upper right corner of the panel. If you hover over the icon, it says `View pipelines for similar logs`.
    Alternatively, click on an attribute in the log panel and select **Scan pipelines for**. 
1. You can further refine your query in the [Pipeline Scanner][2] page. This query cannot be changed after a session is started.
1. Click **Launch this session**.   
    For the next 15 minutes, logs matching your query are tagged with information about which pipelines and processors are modifying those logs. The Live Tail in the scanner shows which pipelines and how many pipelines match each of the logs.
1. Click a log to see the list of pipelines and processors matched to that log. Live Tail is paused at this point.

You can modify the pipelines and processors in the right side panel. The modifications you make do not affect the logs that have already been processed. Click **Play** to view the new logs that have been modified by the updated pipelines and processors.

You can also access Pipeline Scanner from the Log Pipelines page:

1. Navigate to [Log Pipelines][3]. 
2. Click **Pipeline Scanner**.
3. Define the query for the logs you want to inspect.

### Limitations

The `logs_write_pipelines` permission is required to use the Pipeline Scanner. See [Log Management RBAC permissions][4] for more information.

The number of sessions you can launch is limited to:

- A maximum of 3 concurrent sessions.
- A maximum of 12 sessions over a 12-hour sliding window.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/pipelines?query=source:*
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /account_management/rbac/permissions/#log-management

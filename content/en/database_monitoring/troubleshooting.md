---
title: Troubleshooting Database Monitoring
kind: documentation
description: Troubleshoot Database Monitoring setup

---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

This page details database agnostic common issues with setting up and using Database Monitoring, and how to resolve them. Datadog recommends staying on the latest stable Agent version and adhering to the latest [setup documentation][1], as it can change with agent version releases.

## Diagnosing common problems
### Query bind parameters cannot be viewed

At this time, the raw query bind parameters are obfuscated for Query Samples and Explain Plans, and are replaced with a `?` character. In a future release, settings to expose the un-obfuscated query bind parameters are planned.


### DBM host limit

Depending on how complex the databases being monitored are, too many DBM hosts on one Agent could overload the Agent and cause data collection to be delayed. If the Agent is overloaded, you may see warnings like `Job loop stopping due to check inactivity in the Agent logs`.

It is recommended to have a single Datadog Agent monitor at most 10 DBM hosts. If you have more than 10 DBM hosts then you should consider spreading them over multiple Datadog Agents.

## Need more help?

If you are still experiencing problems, contact [Datadog Support][2] for help.


[1]: /database_monitoring/#getting-started
[2]: /help/

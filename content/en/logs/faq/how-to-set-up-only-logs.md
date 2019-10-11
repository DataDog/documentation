---
title: How to set up only Logs
kind: faq
disable_toc: true
beta: true
---

<div class="alert alert-danger">
To setup Log collection without metrics, you have to disable some payloads. This results in the potential loss of metadata and tags on the logs you are collecting. Datadog does not recommend this. For more information about the impact of this configuration, contact <a href="/help/">Datadog Support</a>. 
</div>

To disable payloads, you must be running Agent v6.4+. This disables metric data submission, so that hosts stop showing up in Datadog. Follow these steps:

1. Open the [datadog.yaml configuration file][1].
2. Add the enable_payloads attribute with the following settings: 
    
    ```
    enable_payloads:
 		series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Configure the Agent to collect Logs][2].
4. [Restart the Agent][3].

### Containers

If you are using the container Agent, set the following environment variables to false:

```
DD_ENABLE_PAYLOADS_EVENTS
DD_ENABLE_PAYLOADS_SERIES
DD_ENABLE_PAYLOADS_SERVICE_CHECKS
DD_ENABLE_PAYLOADS_SKETCHES
```



[1]: /agent/guide/agent-configuration-files/?tab=agentv6
[2]: /logs/log_collection
[3]: /agent/guide/agent-commands/#restart-the-agent

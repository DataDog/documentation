---
title: Process collection
kind: documentation
further_reading:
- link: "/agent/process_collection/docker_process_collection"
  tag: "Documentation"
  text: Send your Docker processes
- link: "/agent/process_collection/kubernetes_process_collection"
  tag: "Documentation"
  text: Send your kubernetes processes
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Analyse your process in Datadog
---

{{< img src="graphing/infrastructure/livecontainers/LiveContainersWithSummaries.png" alt="Live containers with summaries" responsive="true" popup="true">}} 

### Standard Agent Configuration

**Live Processes has been introduced in Datadog Agent version 5.16.0.**  
Refer to the instructions for standard [Agent installation](https://app.datadoghq.com/account/settings#agent) for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the [configuration file](/agent/#configuration-file) at :

```
/etc/dd-agent/datadog.yaml
```

and adding the following line to the `[Main]` section:
```
    process_agent_enabled: true
```

After configuration is complete, [restart the Agent](/agent/#start-stop-restart-the-agent).  

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
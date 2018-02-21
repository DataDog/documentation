---
title: Process collection
kind: documentation
---

### Standard Agent Configuration

**Live Processes has been introduced in Datadog Agent version 5.16.0.**  
Refer to the instructions for standard [Agent installation][1] for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the [configuration file](/agent/#configuration-file) at :

```
/etc/dd-agent/datadog.yaml
```

and adding the following line to the `[Main]` section:
```
    process_agent_enabled: true
```

After configuration is complete, [restart the Agent](/agent/faq/start-stop-restart-the-datadog-agent).  
**Note**: To collect container information in the standard install, the dd-agent user needs to have permissions to access docker.sock.
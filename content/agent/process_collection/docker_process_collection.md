---
title: Docker Process collection
kind: documentation
further_reading:
- link: "/agent/process_collection/kubernetes_process_collection"
  tag: "Documentation"
  text: Send your kubernetes processes
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Analyse your process in Datadog
---

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent](/agent/basic_agent_usage/docker/#run-the-docker-agent), passing in the following attributes, in addition to any other custom settings as appropriate:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**Note**: To collect container information in the standard install, the dd-agent user needs to have permissions to access docker.sock.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
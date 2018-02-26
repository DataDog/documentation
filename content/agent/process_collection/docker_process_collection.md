---
title: Docker Process collection
kind: documentation
---

Update to the Datadog Agent image version 5.16.0 or above:

    $ docker pull datadog/docker-dd-agent

Follow the instructions for [docker-dd-agent](/agent/basic_agent_usage/docker/#run-the-docker-agent), passing in the following attributes, in addition to any other custom settings as appropriate:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**Note**: To collect container information in the standard install, the dd-agent user needs to have permissions to access docker.sock.
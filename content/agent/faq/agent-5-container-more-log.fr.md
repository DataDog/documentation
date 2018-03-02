---
title: Obtaining debug logs from the container agent v5
kind: faq
---

It isn't possible to restart the container agent with service datadog-agent restart or similar, because those commands cause the container to be killed by Docker. Thus, in order to restart the container agent, one must use supervisor:

```
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

The following commands enables debug logging, restart the agent, wait 60 seconds, then send a flare:

```
sed -i '/\[Main\]/a LOG_LEVEL=DEBUG' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
sleep 60
/etc/init.d/datadog-agent flare <CASE_ID>
```

Debug logs can be disabled with:

```
sed -i '/LOG_LEVEL=DEBUG/d' /etc/dd-agent/datadog.conf
/opt/datadog-agent/bin/supervisorctl -c /etc/dd-agent/supervisor.conf restart all
```

Or the container can be restarted.
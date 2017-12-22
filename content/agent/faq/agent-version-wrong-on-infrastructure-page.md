---
title: Agent Version Wrong on Infrastructure Page?
kind: faq
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/graphing/infrastructure"
  tag: "Documentation"
  text: Learn more about Infrastructure page
---

You may still have an older version of the agent running in the background. You can do the following to resolve this issue.  (Note that these steps are for linux)

1. Stop the agent:
```
sudo /etc/init.d/datadog-agent stop
```
2. Make sure that there is no agent process running anymore:
```
ps aux | grep datadog-agent
```
If there any processes, kill them.

3. Start the agent:
```
sudo /etc/init.d/datadog-agent start
```
4. Check the version of the Agent on the infrastructure page after 5 minutes

5. If it is still wrong, send [us](/help) the output of:
```
sudo /etc/init.d/datadog-agent info
```

{{< partial name="whats-next/whats-next.html" >}}
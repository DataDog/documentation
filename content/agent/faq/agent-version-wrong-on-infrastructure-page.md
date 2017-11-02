---
title: Agent Version Wrong on Infrastructure Page?
kind: faq
customnav: agentnav
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
If there any processes, please kill them.

3. Start the agent:
```
sudo /etc/init.d/datadog-agent start
```
4. Check the version of the Agent on the infrastructure page after 5 minutes

5. If it is still wrong, send support@datadoghq.com the output of:
```
sudo /etc/init.d/datadog-agent info
```
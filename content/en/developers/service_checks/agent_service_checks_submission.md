---
title: Service Check submission with an Agent Check
kind: documentation
disable_toc: true
---

When submitting a status check through a custom Agent check, the predefined service_check function in the AgentCheck class can be used to pass the Agent check along to Datadog. A call to this function must include a check name and a check status with optional parameters including tags you wish to associate with the check, a timestamp for the check status, the host submitting the check, and a message describing the status. An example call to the `service_check` function within a custom Agent check would look like:

```python
self.service_check('app.is_ok', 0, tags=['environment:production','role:webserver'], hostname='app1', message='App1 is up and running')
```

---
title: Service Check submission with a Agent Check
kind: documentation
disable_toc: true
further_reading:
- link: "developers/write_agent_check/?tab=agentv6"
  tag: "Documentation"
  text: "Write an Agent Custom Check"
---

When submitting a status check through a custom Agent check, the predefined `service_check()` function in the `AgentCheck` class can be used to pass the Agent check along to Datadog.

```python
self.service_check(name, status, tags=None, hostname=None, message=None)
```

| Parameter  | Type            | Required | Default Value | Description                                                                                                   |
| ---------  | ----            | -------- | ------------- | -----------                                                                                                   |
| `name`     | String          | yes      | -             | The name of the service check.                                                                                |
| `status`   | float           | yes      | -             | A constant describing the service status: `0` for OK, `1` for Warning, `2` for Critical, and `3` for Unknown. |
| `tags`     | list of strings | no       | `None`        | A list of tags to associate with this Service Check.                                                          |
| `hostname` | string          | no       | current host  | A hostname to associate with this Service check. Defaults to the current host.                                |
| `message`  | String          | no       | `None`        | Additional information or a description of why this status occurred.                                          |

A call to this function must include a check name and a check status with optional parameters including tags you wish to associate with the check, a timestamp for the check status, the host submitting the check, and a message describing the status. An example call to the `service_check` function within a custom Agent check would look like:

```python
self.service_check('app.is_ok', 0, tags=['environment:production','role:webserver'], hostname='app1', message='App1 is up and running')
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

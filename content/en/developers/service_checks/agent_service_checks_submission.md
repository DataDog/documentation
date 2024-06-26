---
title: "Service Check Submission: Agent Check"
kind: documentation
further_reading:
- link: "/developers/custom_checks/write_agent_check/"
  tag: "Documentation"
  text: "Write an Agent Custom Check"
---

To submit a service check to Datadog within a custom Agent check, use the predefined `service_check()` function in the `AgentCheck` class.

```python
self.service_check(name, status, tags=None, hostname=None, message=None)
```

Find below the different parameters and data types available for the `service_check()` function:

| Parameter  | Type            | Required | Default Value | Description                                                                                                   |
|------------|-----------------|----------|---------------|---------------------------------------------------------------------------------------------------------------|
| `name`     | string          | yes      | -             | The name of the service check.                                                                                |
| `status`   | int             | yes      | -             | A constant describing the service status: `0` for OK, `1` for Warning, `2` for Critical, and `3` for Unknown. |
| `tags`     | list of strings | no       | `None`        | A list of tags to associate with this Service Check.                                                          |
| `hostname` | string          | no       | current host  | A hostname to associate with this Service check. Defaults to the current host.                                |
| `message`  | string          | no       | `None`        | Additional information or a description of why this status occurred.                                          |

## Example

Here is an example of a dummy Agent check sending only one service check periodically. See [Writing a Custom Agent Check][1] to learn more.

1. Create a new directory, `service_check_example.d/`, in the [`conf.d/` folder][2] of your Agent.

2. In your `service_check_example.d/` folder, create an empty configuration file named `service_check_example.yaml` with the following content:

    ```yaml
    instances: [{}]
    ```

3. Up one level from the `conf.d/` folder, go to the `checks.d/` folder.
4. Within this folder, create a custom check file named `service_check_example.py` with the content below:

    {{< code-block lang="python" filename="service_check_example.py" >}}
from datadog_checks.base import AgentCheck

__version__ = "1.0.0"

class MyClass(AgentCheck):
    def check(self, instance):
        self.service_check('example_service_check', 0, message='Example application is up and running.')
    {{< /code-block >}}

5. [Restart the Agent][3]

6. Ensure that your custom check is correctly running with the [Agent status command][4]. You should see something like this:

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        service_check_example (1.0.0)
        -----------------------------
          Instance ID: service_check_example:d884b5186b651429 [OK]
          Total Runs: 1
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 1, Total: 1
          Average Execution Time : 2ms

        (...)
    ```

7. Finally, see your [Datadog service check summary][5] to see your service check reporting:

{{< img src="developers/service_checks/agent_service_checks_submission/service_check.png" alt="Service Checks" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/custom_checks/write_agent_check/
[2]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /agent/configuration/agent-commands/#restart-the-agent
[4]: /agent/configuration/agent-commands/#agent-information
[5]: https://app.datadoghq.com/check/summary

---
title: Agent Runtime Configuration Management
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: Documentation
  text: Agent Debug Mode
---

If you are running Agent 6.19+/7.19+, you can dynamically change some settings at runtime without having to restart the Agent to account for the configuration change.

**Note**: Changes made dynamically do not persist. They are lost as soon as the Agent is restarted.

Use the command `config list-runtime` to list configuration parameters that can be changed at runtime. See the table below for the complete command on different platforms.

| Platform   | Command                                                |
|------------|--------------------------------------------------------|
| Docker     | `docker exec datadog-agent agent config list-runtime`  |
| macOS      | `datadog-agent config list-runtime`                    |
| CentOS     | `sudo datadog-agent config list-runtime`               |
| Debian     | `sudo datadog-agent config list-runtime`               |
| Kubernetes | `kubectl exec <POD_NAME> agent config list-runtime`    |
| Fedora     | `sudo datadog-agent config list-runtime`               |
| Redhat     | `sudo datadog-agent config list-runtime`               |
| Suse       | `sudo datadog-agent config list-runtime`               |
| Source     | `sudo datadog-agent config list-runtime`               |
| Windows    | Consult the dedicated [Windows documentation][1]       |

One parameter that can be changed at runtime is the log level. It is convenient for debug purposes in a containerized environment, where the Agent configuration cannot be changed without having to destroy then recreate the container running the Agent. To dynamically set the log level to debug on a Kubernetes deployment, invoke the following command:

```text
kubectl exec <POD_NAME> agent config set log_level debug
```

It is possible to get the current value of runtime-editable settings by using `config get <SETTING>`. For example, to get the current log level on a Linux system, use:

```text
sudo datadog-agent config get log_level
```

The complete runtime configuration can also be show by using the `config` command.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/windows/#agent-v6

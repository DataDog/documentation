---
title: Adding a custom Python package to the Agent
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

{{< tabs >}}
{{% tab "Linux" %}}

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

Python packages can be installed via the embedded `pip`:

```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <package_name>
```

{{% /tab %}}
{{% tab "macOS" %}}

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

Python packages can be installed via the embedded `pip`:

```shell
sudo dd-agent /opt/datadog-agent/embedded/bin/pip install <package_name>
```

{{% /tab %}}

{{% tab "Windows" %}}

Custom Python packages can be installed using the Agent's embedded Python using the following command in Powershell:

```
C:\"Program Files"\Datadog\"Datadog Agent"\embedded\python -m install <package_name>
```

Or the package can be added in the library zipped folder that can be found at 
```
C:\Program Files (x86)\Datadog\Datadog Agent\files
```

then [restart your Agent][1].

{{< img src="agent/windows_python_package.png" alt="windows python package" responsive="true" >}}


[1]: /agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



---
aliases:
- /ja/agent/custom_python_package
- /ja/agent/faq/custom_python_package
further_reading:
- link: /logs/
  tag: Documentation
  text: Collect your logs
- link: /infrastructure/process/
  tag: Documentation
  text: Collect your processes
- link: /tracing/
  tag: Documentation
  text: Collect your traces
kind: documentation
title: Adding a Custom Python Package to the Agent
---

{{< tabs >}}
{{% tab "Linux" %}}

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

Python packages can be installed with the embedded `pip`:

```shell
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

{{% /tab %}}
{{% tab "macOS" %}}

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

Python packages can be installed with the embedded `pip`:

```shell
sudo /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

{{% /tab %}}

{{% tab "Windows" %}}

Custom Python packages can be installed using the Agent's embedded Python using the following command in an **elevated** (run as admin) PowerShell command line:

For Agent versions >= 6.12:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python" -m pip install <PACKAGE_NAME>
```

For Agent versions <= 6.11:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python" -m pip install <PACKAGE_NAME>
```

Or the package can be added in the library zipped folder that can be found at

```
%ProgramFiles%\Datadog\Datadog Agent\files
```

then [restart your Agent][1].

{{< img src="agent/windows_python_package.png" alt="windows python package" >}}

[1]: /ja/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
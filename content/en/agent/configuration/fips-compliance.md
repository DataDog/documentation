---
title: Datadog FIPS Compliance
disable_toc: false
aliases:
- /agent/guide/agent-fips-proxy
- /agent/guide/fips-agent
- /configuration/agent-fips-proxy
further_reading:
- link: "agent/configuration/proxy"
  tag: "Documentation"
  text: "Agent Proxy Configuration"
- link: "https://www.datadoghq.com/blog/datadog-fips-enabled-agent/"
  tag: "Blog"
  text: "Monitor highly regulated workloads with Datadog's FIPS-enabled Agent"
algolia:
  rank: 80
  tags: ["fips", "fips proxy", "compliance", "fedramp", "govcloud", "fips agent"]
---

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">The Datadog FIPS Agent is available only in the US1-FED region.</a></div>
{{< /site-region >}}

The FIPS Agent is a flavor of the Datadog Agent that natively supports Federal Information Processing Standards (FIPS) compliance. The FIPS Agent includes limited support for integrations that need to collect observability data that is external to the host.

## Supported platforms and limitations

Supported platforms:

|||
| ---  | ----------- |
| Bare metal and VMs | RHEL >= 7<br>Debian >= 8<br>Ubuntu >= 14.04<br>SUSE >= 12<br>Windows Server >= 2016<br>Windows >= 10|
| Cloud and container| Amazon ECS<br>AWS EKS (Helm)|

Supported products (Agent 7.65.0 and above):
- Metrics
- Logs
- APM traces
- APM profiles
- Processes
- Orchestrator Explorer
- Runtime Security

The Datadog FIPS Agent does **not** support the following:

- Serverless Monitoring
- Communication between Cluster Agent and Node Agents
- Agent integrations
- Outbound communication to anything other than GovCloud

## Prerequisites

{{< tabs >}}
{{% tab "Linux" %}}
- A non-containerized Linux host.
- Your Linux OS must be in FIPS-compliant mode. See your OS vendor's documentation on what steps are required to meet this requirement.
- FIPS-compliant storage backing the host file system.
{{% /tab %}}

{{% tab "Windows" %}}
- A non-containerized Windows host.
- Windows must be in [FIPS-compliant mode][1].
- FIPS-compliant storage backing the host file system.

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
{{% /tab %}}
{{< /tabs >}}

In addition to the Operating System (OS) requirements above:
- You must have access to a FIPS-compliant Datadog environment (US1-FED).
- The FIPS Agent is only available on Agent versions 7.65.0 and above.

## Installation

{{< tabs >}}
{{% tab "Linux" %}}

1. Remove any `fips-proxy` installations on the host by uninstalling the `datadog-fips-proxy` package with your OS package manager. For example:

   **Red Hat**
   ```sh
   sudo yum remove datadog-fips-proxy
   ```
   **Ubuntu/Debian**
   ```sh
   sudo apt-get remove datadog-fips-proxy
   ```
1. Ensure that the Agent's configuration file does not contain any [FIPS proxy][2] settings. FIPS proxy settings use the `fips.*` prefix.
1. Use the [instructions for your OS][3] to uninstall the Datadog Agent.
1. Install the Agent with FIPS support.

   **Note:** FIPS support is only available on Agent versions 7.65.0 and above:
   1. If you're using the Agent install script, specify the `DD_AGENT_FLAVOR="datadog-fips-agent"` environment variable in your installation command. For example:

      ```sh
      DD_SITE="ddog-gov.com" DD_API_KEY="MY_API_KEY" DD_AGENT_FLAVOR="datadog-fips-agent" … bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
      ```
   1. If you're installing with a package, [follow the instructions][4] to install the latest `datadog-fips-agent` package available for your platform.
   1. Add `GOFIPS=1` to your Datadog environment variables, reload all service units, and restart the Datadog Agent service (`datadog-agent.service`). For example, if your host is using systemd:

      ```sh
      echo "GOFIPS=1" | sudo tee -a /etc/datadog-agent/environment
      systemctl daemon-reload
      systemctl restart 'datadog-agent*'
      ```
   1. Run the `datadog-agent status` command and make sure you see `FIPS Mode: enabled` in the status output.

      {{< img src="/agent/fips-linux.png" alt="Your image description" style="width:100%;" >}}

[2]: /agent/configuration/fips-compliance/
[3]: /agent/guide/how-do-i-uninstall-the-agent/
[4]: /agent/guide/installing-the-agent-on-a-server-with-limited-internet-connectivity/
{{% /tab %}}

{{% tab "Windows" %}}

1. Follow the [Windows instructions][1] to uninstall the Datadog Agent.
1. Run the command below to install the FIPS Agent, replacing `DATADOG_API_KEY` with your API key:

   **Note:** FIPS support is only available on Agent versions 7.65.0 and above:

   {{< code-block lang="powershell" >}}
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i https://windows-agent.datadoghq.com/datadog-fips-agent-7.65.0.msi /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<DATADOG_API_KEY>" SITE="ddog-gov.com"'
if ($p.ExitCode -ne 0) {
   Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
{{< /code-block >}}

1. Run the Agent `status` command and make sure you see `FIPS Mode: enabled` in the status output.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-powershell.png" alt="Your image description" style="width:100%;" >}}


**Note**: The program name for the FIPS Agent in **Add or Remove Programs** is "Datadog FIPS Agent."

[1]: /agent/basic_agent_usage/windows/#uninstall-the-agent
[2]: https://windows-agent.datadoghq.com/installers_v2.json

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /agent/configuration/fips-compliance/
[3]: /integrations/guide/fips-integrations
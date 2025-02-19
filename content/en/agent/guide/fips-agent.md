---
title: Datadog FIPS Agent
further_reading:
- link: "/agent/configuration/fips-compliance"
  tag: "Documentation"
  text: "Datadog FIPS Compliance"
algolia:
  rank: 80
  tags: ["fips", "fips proxy", "compliance", "fedramp", "govcloud"]
---

{{< callout btn_hidden="true" header="Try the Preview!">}}
The FIPS Agent is in Preview.
{{< /callout >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-warning">The FIPS Agent is available only in the US1-FED region.</a></div>
{{< /site-region >}}

The FIPS Agent is a flavor of the Datadog Agent that natively supports Federal Information Processing Standards (FIPS) compliance. The FIPS Agent replaces the [FIPS proxy][2] and includes limited support for integrations that need to collect observability data that is external to the host.

**The Datadog FIPS Agent is in preview and has not been fully audited. Install and test the Agent only on hosts that are not critical to production workloads. For production workloads, see [Datadog FIPS Compliance][2].**

## Requirements

**Linux:**
   - A non-containerized Linux host.
   - Your Linux OS must be in FIPS-compliant mode. See your OS vendor's documentation on what steps are required to meet this requirement.
   - FIPS-compliant storage backing the host file system.

**Windows:**
   - A non-containerized Windows host.
   - Windows must be in [FIPS-compliant mode][1].
   - FIPS-compliant storage backing the host file system.

In addition to the Operating System (OS) requirements above:
- You must have access to a FIPS-compliant Datadog environment (US1-FED or GovCloud).
- The FIPS Agent is only available on Agent versions 7.63 and above.

## Installation

{{< tabs >}}
{{% tab "Linux" %}}

The Datadog FIPS Agent is in preview and has not been fully audited. Install and test the Agent only on hosts that are not critical to production workloads.

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

   **Note:** FIPS support is only available on Agent versions 7.63.0 and above:
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

The Datadog FIPS Agent is in preview and has not been fully audited. Install and test the Agent only on hosts that are not critical to production workloads.

1. Follow the [Windows instructions][1] to uninstall the Datadog Agent.
1. Run the command below to install the FIPS Agent:

   **Note:** FIPS support is only available on Agent versions 7.63.0 and above:

   ```powershell
   Start-Process -Wait msiexec -ArgumentList '/qn /i "https://s3.amazonaws.com/ddagent-windows-stable/beta/datadog-fips-agent-7.63.0-rc.7-fips-preview.msi" APIKEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" SITE="ddog-gov.com"'
   ```

   To install a different preview version of the FIPS Agent, search the [list of stable Agent versions][2] for `datadog-fips-agent` and replace the MSI in the command above with your desired version.

1. Run the Agent `status` command and make sure you see `FIPS Mode: enabled` in the status output.

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   {{< img src="/agent/fips-powershell.png" alt="Your image description" style="width:100%;" >}}


**Note**: The program name for the FIPS Agent in **Add or Remove Programs** is "Datadog FIPS Agent."

[1]: /agent/basic_agent_usage/windows/#uninstall-the-agent
[2]: https://s3.amazonaws.com/ddagent-windows-stable/beta/installers_v2.json

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/windows/security/security-foundations/certification/fips-140-validation
[2]: /agent/configuration/fips-compliance/

---
title: Agent v5 - Certificate Authority Update (2026)
further_reading:
- link: "/agent/guide/upgrade_agent_fleet_automation"
  tag: "Documentation"
  text: "Upgrade Agent Fleet Automation"
---

## Overview

On **April 20, 2026**, as a downstream effect of Sectigo's public root certificate migration, Datadog will deploy new SSL certificates signed by the new root certificate. **If you are running Datadog Agent v5 versions below 5.32.7**, your Agents may not recognize this new certificate root as trusted and will lose the ability to submit collected data to Datadog after this change.

## What will happen

Starting on **April 20, 2026**, any host running an affected Agent v5 will be unable to:
- Send metrics, logs, traces, and other monitoring data to Datadog
- Maintain connectivity with Datadog intake endpoints

This is a result of SSL/TLS certificate verification failures when the Agent attempts to connect to Datadog.

**Note**: If your Agent uses the Datadog-provided certificate bundle (typically Agent v5.32.7+) or is configured to use your operating system's certificate store, you are not affected.

## Why this happens

When Agent v5's embedded certificate bundle is missing or incomplete, it falls back to the Tornado (Python web framework) certificate store. This outdated Tornado certificate store does not include the new Sectigo Root CA that will sign Datadog's certificates after April 20th, 2026, causing certificate verification to fail.

## Who is affected

You are affected if you are running **Datadog Agent v5 versions earlier than 5.32.7**.

You are **not** affected if:
- Your Agent uses the Datadog-provided certificate bundle (typically Agent v5.32.7+)
- Your Agent is configured to use the operating system's certificate store (using `use_curl_http_client: true`)

## Timeline

- **December 1st, 2025 - April 19th, 2026**: Grace period for you to take action
- **April 20th, 2026**: New certificates deployed - affected unpatched Agents will lose connectivity

## Recommended solution: Upgrade your Agent

**Datadog strongly recommends upgrading to Agent v7** as the best long-term solution. Agent v7 provides:
- Automatic certificate management
- Ongoing security updates and new features
- Long-term support

Alternatively, you can consider upgrading to **Agent v6**, which is unaffected by this certificate update.

See the [Agent upgrade documentation][1] for migration guidance.

**Note**: Agent v5 architecture depends on some upstream components that are past their end-of-life (for example, Python 2). Upgrading your hosts to Agent v7 is the recommended path forward wherever possible.

## Alternative solution: Update certificates

If you are unable to upgrade to an unaffected Agent version before April 20th, 2026, you can update the Agent v5 certificates without upgrading your Agent version using the automated scripts below.

### Automated solution

Both scripts perform the following steps automatically:
1. Download the updated Datadog certificate bundle.
2. Install the certificate in the correct location for your Agent installation.
3. Update your `datadog.conf` to enable `use_curl_http_client: true` (allows the Agent to use OS-provided certificates).
4. Restart the Datadog Agent to apply changes.
5. Verify connectivity and check logs for any certificate errors.

{{< tabs >}}
{{% tab "Linux" %}}
#### Requirement
- Have `curl` installed.

```bash
# Download the script
curl -O https://raw.githubusercontent.com/DataDog/dd-agent/master/runbooks/sectigo-root-ca-rotation-2025/linux.sh

# Make it executable
chmod +x linux.sh

# Run with sudo
sudo ./linux.sh

# Optional: If your Datadog Agent is installed in a custom directory, 
# you can specify it using the -p flag.
# sudo ./linux.sh -p <agent_directory>
# Default path: /opt/datadog-agent/agent
```

{{% /tab %}}

{{% tab "Windows" %}}
#### Requirement
- PowerShell v3 or later

**Note**: If you do not meet the PowerShell requirement, proceed with the [manual instructions](#manual-solution) below. Windows Agent versions below v5.32.3 cannot use the OS certificate store fallback. If you are running a version below v5.32.3, Datadog recommends upgrading to Agent v7.

```powershell
# Download the script (run as Administrator)
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/master/runbooks/sectigo-root-ca-rotation-2025/windows.ps1" -OutFile "windows.ps1"

# Run the script
.\windows.ps1

# Optional: You can specify a custom Agent directory using 
# either the -AgentDirectory or -p parameter.
# .\windows.ps1 -AgentDirectory "D:\Custom\Datadog Agent"
# .\windows.ps1 -p "D:\Custom\Datadog Agent"
#
# Default paths:
# On 64-bit systems running Agent v5.12+: C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem
# On 64-bit systems running Agent v5.11-: C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem
# On 32-bit systems running Agent v5.11-: C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem
```
{{% /tab %}}
{{< /tabs >}}

### Manual solution

1. Download the [updated Datadog certificate bundle][3].
2. Install the certificate in the correct location for your Agent installation.
    - **Linux**: `/opt/datadog-agent/agent/datadog-cert.pem`
    - **Windows**:
        - v5.12+: `C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem`
        - v5.11 and below (64-bit OS): `C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem`
        - v5.11 and below (32-bit OS): `C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem`
3. Update your `datadog.conf` to enable `use_curl_http_client: true` (allows the Agent to use OS-provided certificates).
    - **Linux**: `/etc/dd-agent/datadog.conf`
    - **Windows**: `C:\ProgramData\Datadog\datadog.conf`
4. Restart the Datadog Agent to apply changes.
5. Verify connectivity and check logs for any certificate errors.

## Important considerations

### End-of-life operating systems

The `use_curl_http_client` fallback mechanism uses your operating system's certificate store. **If your operating system no longer receives security updates**, the certificate update may not resolve connectivity issues. In this case, Datadog recommends upgrading your operating system and/or migrating to Agent v7.

## Troubleshooting

### Script fails to download certificate
Ensure you have network connectivity and your firewall allows outbound HTTPS connections to `raw.githubusercontent.com`.

### Agent fails to restart
Verify the Datadog Agent service is installed and running:
```bash
# Linux
sudo service datadog-agent status

# Windows
Get-Service DatadogAgent
```

### Connectivity test fails
If certificate errors persist after running the script:
1. Verify your operating system is receiving security updates
2. Check the Agent logs for detailed error messages:
3. Contact [Datadog Support][2] with the script output and log excerpts

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/upgrade_agent_fleet_automation
[2]: /help
[3]: https://github.com/DataDog/dd-agent/blob/master/datadog-cert.pem


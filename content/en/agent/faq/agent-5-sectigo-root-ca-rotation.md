---
title: Agent v5 - Certificate Authority Update (2025)
further_reading:
- link: "/agent/guide/upgrade_agent_fleet_automation"
  tag: "Documentation"
  text: "Upgrade Agent Fleet Automation"
---

## Overview

In May 2026, Datadog will deploy SSL certificates signed by a new certificate authority (Sectigo Root CA). **If you are running Datadog Agent v5 (especially versions below 5.32.7)**, your Agents may lose connectivity with Datadog due to SSL certificate verification failures.

## What will stop working

Agent v5 hosts without the Datadog embedded certificate bundle will be unable to send metrics, logs, traces, and other monitoring data to Datadog. These hosts fall back to the Tornado certificate store, which will fail SSL/TLS certificate verification when attempting to connect to Datadog intake endpoints.

**Note**: If your Agent uses the Datadog-provided certificate bundle (typically Agent v5.32.7+) or is configured to use your operating system's certificate store, you are not affected.

## Why this happens

When Agent v5's embedded certificate bundle is missing or incomplete, it falls back to the Tornado (Python web framework) certificate store. This outdated Tornado certificate store does not include the new Sectigo Root CA that will sign Datadog's certificates after May 2026, causing certificate verification to fail.

## Who is affected

You are affected if:
- You are running **Datadog Agent v5**, particularly **versions below 5.32.7**
- Your Agent installation does not include the Datadog embedded certificate bundle
- Your Agent is not configured to use the operating system's certificate store (using `use_curl_http_client: true`)

## Timeline

- **June 2025 - April 2026**: Grace period to upgrade to Agent v7 or run the provided runbooks
- **May 2026**: Datadog will deploy new certificates signed with the new Sectigo Root CA
  - Agents that have not been updated will lose connectivity

## Recommended solution: Upgrade to Agent v7

**Datadog strongly recommends upgrading to Agent v7** as the best long-term solution. Agent v7 provides:
- Automatic certificate management (no manual intervention needed)
- Ongoing security updates and bug fixes
- Improved performance and new features
- Long-term support

Agent v5 has reached end-of-life and no longer receives updates. See the [Agent upgrade documentation][1] for migration guidance.

## Alternative solution: Update certificates

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
- Have `curl` installed

```bash
# Download the script
curl -O https://raw.githubusercontent.com/DataDog/dd-agent/master/runbooks/sectigo-root-ca-rotation-2025/linux.sh

# Make it executable
chmod +x linux.sh

# Run with sudo
sudo ./linux.sh
```

{{% /tab %}}

{{% tab "Windows" %}}
#### Requirement
- Have `wget` installed

**Note**: Windows Agent versions below v5.37.3 cannot use the OS certificate store fallback. If you are running a version below v5.37.3, Datadog recommends upgrading to Agent v7.

```powershell
# Download the script (run as Administrator)
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/master/runbooks/sectigo-root-ca-rotation-2025/windows.ps1" -OutFile "windows.ps1"

# Run the script
.\windows.ps1
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

### Operating system support

The `use_curl_http_client` fallback mechanism uses your operating system's certificate store. **If your operating system is end-of-life and no longer receives security updates**, the OS certificate store may not contain the necessary certificates, and connectivity issues may persist. In this case, upgrade your OS or migrate to Agent v7.

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


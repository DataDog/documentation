---
title: Agent v5 - Certificate Authority Update (2025)
further_reading:
- link: "/agent/guide/upgrade_agent_fleet_automation"
  tag: "Documentation"
  text: "Upgrade Agent Fleet Automation"
---

## Overview

In May 2026, Datadog will update SSL certificates to use a new certificate authority (Sectigo Root CA). **If you are running Datadog Agent v5 (especially versions below 5.32.7)**, your agents may lose connectivity with Datadog after this change due to SSL certificate verification failures.

## What will stop working

Agent v5 hosts that do not have the Datadog embedded certificate bundle and fall back to the Tornado certificate store will be unable to send metrics, logs, traces, and other monitoring data to Datadog. The agent will fail with SSL/TLS certificate verification errors when attempting to connect to Datadog intake endpoints.

**Note**: If your agent uses the Datadog-provided certificate bundle (typically Agent v5.32.7+) or is configured to use your operating system's certificate store, you are not affected.

## Why this happens

When Agent v5's embedded certificate bundle is missing or incomplete, it falls back to using the Tornado (Python web framework) certificate store. This Tornado certificate store is outdated and does not include the new Sectigo Root CA that will be used to sign Datadog's certificates after May 2026. When the agent attempts to verify the new certificates using the Tornado fallback, it will fail because the certificate authority is not in its trust store.

## Who is affected

You are affected if you are running:
- **Datadog Agent v5**, particularly **versions below 5.32.7**
- You are not using Datadog embedded certificate by default

## Solution

### Automated Solution

Both scripts perform the following steps automatically:
1. Download the updated Datadog certificate bundle
2. Install the certificate in the correct location for your Agent installation
3. Update your `datadog.conf` to enable `use_curl_http_client: true` (allows the agent to use OS-provided certificates)
4. Restart the Datadog Agent to apply changes
5. Verify connectivity and check logs for any certificate errors

#### Linux

**Requirement**:
- Have `curl` installed

```bash
# Download the script
curl -O https://raw.githubusercontent.com/DataDog/dd-agent/master/runbooks/sectigo-root-ca-rotation-2025/linux.sh

# Make it executable
chmod +x linux.sh

# Run with sudo
sudo ./linux.sh
```

#### Windows

**Requirement**:
- Have `wget` installed

**Note**: On Windows the Agent is able to resolve the OS certificate only from v5.37.3, this fallback won't be available in the versions bellow.

```powershell
# Download the script (run as Administrator)
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/DataDog/dd-agent/master/runbooks/sectigo-root-ca-rotation-2025/windows.ps1" -OutFile "windows.ps1"

# Run the script
.\windows.ps1
```

### Manual Solution

1. Download the updated Datadog certificate bundle at `https://github.com/DataDog/dd-agent/blob/master/datadog-cert.pem`
2. Install the certificate in the correct location for your Agent installation
    - **Linux**: `/opt/datadog-agent/agent/datadog-cert.pem`
    - **Windows**:
        - v5.12+: `C:\Program Files\Datadog\Datadog Agent\agent\datadog-cert.pem`
        - v5.11 and below (64-bit OS): `C:\Program Files (x86)\Datadog\Datadog Agent\files\datadog-cert.pem`
        - v5.11 and below (32-bit OS): `C:\Program Files\Datadog\Datadog Agent\files\datadog-cert.pem`
3. Update your `datadog.conf` to enable `use_curl_http_client: true` (allows the agent to use OS-provided certificates)
    - **Linux**: `/etc/dd-agent/datadog.conf`
    - **Windows**: `C:\ProgramData\Datadog\datadog.conf`
4. Restart the Datadog Agent to apply changes
5. Verify connectivity and check logs for any certificate errors

## Important considerations

### Operating system support

The fallback mechanism relies on your operating system's certificate store. **If your operating system is end-of-life and no longer receives security updates**, the OS certificate store may not contain the necessary certificates, and connectivity issues may persist. In this case, upgrading your OS or migrating to Agent v7 is recommended.

### Timeline

- **June 2025 - April 2026**: Grace period to run runbooks or upgrade agents
- **May 2026**: New certificates will be rolled out with the new Sectigo Root CA
  - Customers who have not taken action may lose agent connectivity

## Long-term recommendation

**Datadog strongly recommends upgrading to Agent v7** for:
- Automatic certificate management (no manual intervention needed)
- Ongoing security updates and bug fixes
- Improved performance and new features
- Long-term support

Agent v5 has reached end-of-life and no longer receives updates. See the [Agent upgrade documentation][1] for migration guidance.

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


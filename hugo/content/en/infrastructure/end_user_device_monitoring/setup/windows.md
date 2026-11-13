---
title: Set up End User Device Monitoring on Windows
description: Deploy the Datadog Agent on Windows devices for End User Device Monitoring.
further_reading:
   - link: "/infrastructure/end_user_device_monitoring/"
     tag: "Documentation"
     text: "End User Device Monitoring"
   - link: "/infrastructure/end_user_device_monitoring/setup/"
     tag: "Documentation"
     text: "Set up End User Device Monitoring"
   - link: "/network_monitoring/network_path/"
     tag: "Documentation"
     text: "Network Path"
---

There are two ways to deploy the Datadog Agent on Windows devices for End User Device Monitoring. Choose the method that fits your environment:

- **Manual install**: Run a PowerShell command directly on the device. Use this method to test a single machine or for devices that are not managed by a mobile device management (MDM) solution.
- **MDM deploy**: Push the Agent to a fleet of enrolled Windows devices. This example uses Microsoft Intune to deploy the Agent as a Win32 app in the background with no interaction on each device.

<div class="alert alert-danger">The <code>infrastructure_mode: end_user_device</code> setting is required. Without it, the device does not appear in the End User Devices view and is billed as a host.</div>

{{< tabs >}}
{{% tab "Manual install" %}}

Use this method to test a single machine or for devices that are not managed by an MDM solution.

### Prerequisites

- Administrator access on the Windows device.
- A valid Datadog API key. For instructions, see [API and Application Keys][101].
- Windows 10 (64-bit) or Windows 11.
- PowerShell 5.1 or later.
- An active internet connection on the device.

### Install the Agent

1. In Datadog, navigate to [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Install Agents{{< /ui >}} > {{< ui >}}Windows{{< /ui >}}][102].
1. Toggle on {{< ui >}}Enable End User Device Monitoring{{< /ui >}}.
1. Click {{< ui >}}Select API Key{{< /ui >}} and choose an API key.
1. Copy the provided installation command beginning with `[System.Net.ServicePointManager]::SecurityProtocol =`.
1. Right-click the **Start** menu and select **Windows PowerShell (Admin)** or **Terminal (Admin)**. Click **Yes** on the User Account Control prompt.
1. Paste and run the command in PowerShell. The script downloads the installer, installs the Agent silently, and starts the Datadog Agent service. Installation takes two to three minutes.

### Verify the installation

To confirm that the Agent is running, in Datadog, go to [**Infrastructure** > **End User Devices**][103]. Your device appears within 5-10 minutes. If it does not appear after 10 minutes, verify your API key and confirm that the configuration was saved and the Agent was restarted.

Alternatively, run the following command in PowerShell to verify the installation:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status
```

In the output, confirm the following:
- The Agent version is 7.80 or later.
- **Status** is `Running`.
- `infrastructure_mode: end_user_device` is set.

[101]: /account_management/api-app-keys/
[102]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[103]: https://app.datadoghq.com/end-user-devices

{{% /tab %}}

{{% tab "MDM deploy (example with Microsoft Intune)" %}}

This example method packages the Datadog Agent MSI and a PowerShell configuration script into an Intune Win32 app, which Intune pushes to enrolled Windows devices in the background. No manual steps are needed on each device.

### Prepare the install script and package files

Create a working folder on your computer, such as `C:\DDPackage\`, and add the following three files:

- **The Datadog Agent MSI.** [Download the latest Agent MSI from Datadog][201] and place it in the folder. The file is named similar to `datadog-agent-7-latest.amd64.msi`.
- **`Install.ps1`.** Create this file with the following content, replacing the placeholder with your API key:

    ```powershell
    # Install.ps1 - Datadog Agent End User Device Monitoring (Intune Win32)

    $apiKey = "<YOUR_API_KEY>"
    $site   = "datadoghq.com"
    $msi    = Join-Path $PSScriptRoot 'datadog-agent-7-latest.amd64.msi'

    # Silent install - passes API key and site directly to the MSI
    $p = Start-Process msiexec.exe -PassThru -Wait -ArgumentList (
    '/qn', '/norestart',
    '/log', 'C:\Windows\SystemTemp\install-datadog.log',
    '/i', "`"$msi`"",
    "APIKEY=`"$apiKey`"",
    "SITE=`"$site`"",
    'DD_INFRASTRUCTURE_MODE="end_user_device"'
    )
    if ($p.ExitCode -ne 0) {
    Write-Host "msiexec failed with exit code $($p.ExitCode). Check the log at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
    exit 1
    }

    Write-Host 'Datadog Agent installation complete.'
    ```

    - If your Datadog site is not US1, update `$site` to match. For the list of sites, see [Datadog sites][202].

    - For production deployments, avoid hardcoding the API key in the script. Consider storing the key in an Intune Proactive Remediations environment variable, or deploy it separately using the Intune Win32 app SYSTEM context.

- **`Uninstall.ps1`.** Create this file for clean removal:

    ```powershell
    # Uninstall.ps1 - Datadog Agent
    $productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
    Write-Host "Uninstalling Datadog Agent $productCode"
    Start-Process msiexec -Wait -ArgumentList ('/log', 'C:\Windows\SystemTemp\uninstall-datadog.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
    Write-Host 'Datadog Agent uninstalled.'
    ```

### Package with the Intune Content Prep Tool

1. Download the [Microsoft Win32 Content Prep Tool][203] (`IntuneWinAppUtil.exe`) if you do not already have it.
1. Run the tool from PowerShell or Command Prompt to package your files:

   {{< code-block lang="powershell" >}}
IntuneWinAppUtil.exe `
  -c C:\DDPackage `
  -s Install.ps1 `
  -o C:\DDPackage\output
{{< /code-block >}}

   This creates `Install.intunewin` in `C:\DDPackage\output`. Upload this package to Intune.

### Create the Win32 app in Intune

1. In the [Microsoft Intune admin center][204], go to **Apps** > **All apps** and click **Add**.
1. Select **Windows app (Win32)** as the app type and click **Select**.
1. Upload the `Install.intunewin` package and click **OK**.
1. Fill in the **App information** tab:
   - **Name**: `Datadog Agent EUDM`
   - **Description**: Datadog Agent for End User Device Monitoring
   - **Publisher**: `Datadog`
1. In the **Program** tab, set:
   - **Install command**: `powershell.exe -ExecutionPolicy Bypass -File Install.ps1`
   - **Uninstall command**: `powershell.exe -ExecutionPolicy Bypass -File Uninstall.ps1`
   - **Install behavior**: **System**
   - **Device restart behavior**: **No specific action**
1. In the **Detection rules** tab, select **Manually configure detection rules** and add a **File** detection rule:
   - **Path**: `C:\Program Files\Datadog\Datadog Agent\bin`
   - **File or folder**: `agent.exe`
   - **Detection method**: **File or folder exists**
1. In the **Assignments** tab, assign the app to the device groups or users you want to target. Use **Required** to push the app in the background without user action.
1. Click **Review + create**, and then click **Create** to publish the app.

   Intune deploys Win32 apps using the Intune Management Extension. The script runs in the SYSTEM context, so it has the privileges needed to install the MSI and modify `C:\ProgramData\Datadog\datadog.yaml`.

### Verify the deployment

To confirm that the Agent installed on a device, use one of the following methods:

- In Intune, go to **Apps** > **All apps** > **Datadog Agent EUDM** and check the **Device install status**. Successful installs appear as **Installed**. If a device shows **Failed**, check `C:\ProgramData\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log` for details.
- On a target device, open PowerShell and run `& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status`. In the output, confirm that **Status** is `Running` and `infrastructure_mode: end_user_device` is set.
- In Datadog, go to [**Infrastructure** > **End User Devices**][205]. Enrolled devices appear within 5-10 minutes of the Agent starting.

[201]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[202]: /getting_started/site/
[203]: https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool
[204]: https://intune.microsoft.com
[205]: https://app.datadoghq.com/end-user-devices

{{% /tab %}}
{{< /tabs >}}

## Set up Network Path

[Network Path][2] traces the route from a device to a destination and shows the hop where latency or packet loss is introduced.

On Agent 7.85 or later, each end-user device runs **basic dynamic tests** by default. The Agent selects up to 20 destinations per hour from the device's observed traffic. The first selection runs about five minutes after the Agent starts, and later selections run once per hour. You cannot change this interval.

Basic dynamic tests are included with End User Device Monitoring:

- They follow the [include and exclude filters][3] you configure.
- They do not appear on the [Plan & Usage][4] page.
- They do not contribute to billable usage.

For Agent versions earlier than 7.85, see [Earlier Agent versions](#earlier-agent-versions).

### Basic dynamic tests

Agent 7.85 or later is required, with `infrastructure_mode: end_user_device` set. Basic dynamic tests turn on with that configuration.

The Agent enables traceroute for these tests. If `traceroute.enabled` is set to `false` in `%ProgramData%\Datadog\system-probe.yaml`, basic dynamic tests do not run. Remove that setting, or set it to `true`, and restart the Agent.

By default, basic dynamic tests skip destinations that have no domain name. To include those destinations, add the following to `%ProgramData%\Datadog\datadog.yaml`:

```yaml
network_path:
  collector:
    monitor_ip_without_domain: true
```

#### Filter destinations

Filters control which observed destinations are eligible. Basic dynamic tests select up to 20 destinations per hour from the destinations that pass these filters. Filters are applied in order, and a later filter overrides an earlier one.

Add filters to `%ProgramData%\Datadog\datadog.yaml`:

```yaml
network_path:
  collector:
    filters:
      # Exclude a domain, then include one host within it.
      - match_domain: '*.example.com'
        type: exclude
      - match_domain: 'api.example.com'
        type: include
```

For the full filter syntax, including IP ranges and wildcards, see [Filter syntax][3].

Restart the Agent after you save the file.

#### Confirm that tests are running

About five minutes after the Agent starts, open [Network Path][5]. Paths from the device appear with that device as the source. If no paths appear, confirm that the Agent is 7.85 or later, that the device has traffic to a destination with a domain name, and that your filters do not exclude that destination.

#### Turn off basic dynamic tests

To stop basic dynamic tests on a device, add the following to `%ProgramData%\Datadog\datadog.yaml` and restart the Agent:

```yaml
network_path:
  connections_monitoring:
    eudm_basic_tests_enabled: false
```

### Full dynamic tests

Full dynamic tests monitor the connections that [Cloud Network Monitoring][6] observes. They replace basic dynamic tests on that device.

Full dynamic tests are billed as [Network Path tests][7] and appear on the [Plan & Usage][4] page.

Agent 7.85 or later is required.

1. Enable Cloud Network Monitoring in `%ProgramData%\Datadog\system-probe.yaml`:

   ```yaml
   network_config:
     enabled: true
   ```

2. Enable dynamic tests in `%ProgramData%\Datadog\datadog.yaml`:

   ```yaml
   network_path:
     connections_monitoring:
       enabled: true
   ```

   The same [include and exclude filters][3] apply. For workers, test interval, and time-to-live settings, see [Dynamic tests][8]. Those interval settings apply to full dynamic tests only.

3. Restart the Agent.

### Scheduled tests

Scheduled tests monitor endpoints that you list, such as a critical API or a SaaS application.

Scheduled tests replace basic dynamic tests on that device. Scheduled tests are billed as [Network Path tests][7] and appear on the [Plan & Usage][4] page.

1. Turn off basic dynamic tests in `%ProgramData%\Datadog\datadog.yaml`:

   ```yaml
   network_path:
     connections_monitoring:
       eudm_basic_tests_enabled: false
   ```

2. Enable traceroute in `%ProgramData%\Datadog\system-probe.yaml`:

   ```yaml
   traceroute:
     enabled: true
   ```

3. Create `%ProgramData%\Datadog\conf.d\network_path.d\conf.yaml` and list each destination:

   ```yaml
   init_config:
     min_collection_interval: 60 # in seconds
   instances:
     # Leave port unset when protocol is UDP. A UDP port can make traceroute report the destination as unreachable.
     - hostname: zoom.us
       protocol: TCP
       port: 443
   ```

   For optional settings such as timeout and tags, see [Scheduled tests][9].

4. Restart the Agent.

### Earlier Agent versions

| Agent version | Network Path on the device |
| --- | --- |
| 7.85 or later | Basic dynamic tests select up to 20 destinations per hour. These tests are not billed and do not appear on the Plan & Usage page. |
| 7.74 to 7.84 | Dynamic tests from the device are billed as [Network Path tests][7]. Basic dynamic tests are not available. Upgrade to Agent 7.85 or later to use basic dynamic tests. |
| 7.73 or earlier | Network Path traffic from the device is not billed. |

## Troubleshooting

For detailed steps, see [Agent Troubleshooting][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/troubleshooting/
[2]: /network_monitoring/network_path/
[3]: /network_monitoring/network_path/setup/#filter-syntax
[4]: /account_management/plan_and_usage/
[5]: https://app.datadoghq.com/network/path
[6]: /network_monitoring/cloud_network_monitoring/
[7]: https://www.datadoghq.com/pricing/?product=network-monitoring
[8]: /network_monitoring/network_path/setup/#dynamic-tests
[9]: /network_monitoring/network_path/setup/#scheduled-tests

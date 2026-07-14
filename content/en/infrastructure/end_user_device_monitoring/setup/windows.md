---
title: Set up End User Device Monitoring on Windows
description: Deploy the Datadog Agent on Windows devices for End User Device Monitoring.
private: true
further_reading:
   - link: "/infrastructure/end_user_device_monitoring/"
     tag: "Documentation"
     text: "End User Device Monitoring"
   - link: "/infrastructure/end_user_device_monitoring/setup/"
     tag: "Documentation"
     text: "Set up End User Device Monitoring"
---

{{< callout url="https://www.datadoghq.com/product-preview/end-user-device-monitoring/" btn_hidden="false" >}}
End User Device Monitoring is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

There are two ways to deploy the Datadog Agent on Windows devices for End User Device Monitoring. Choose the method that fits your environment:

- **Manual install**: Run a PowerShell command directly on the device. Use this method to test a single machine or for devices that are not managed by a mobile device management (MDM) solution.
- **MDM deploy**: Push the Agent to a fleet of enrolled Windows devices. This example uses Microsoft Intune to deploy the Agent as a Win32 app in the background with no interaction on each device.

<div class="alert alert-danger">The <code>infrastructure_mode: end_user_device</code> setting is required. Without it, the device does not appear in the End User Devices view and is billed as a host.</div>

## Manual install (single device)

Use this method to test a single machine or for devices that are not managed by an MDM solution.

### Prerequisites

- Administrator access on the Windows device.
- A valid Datadog API key. For instructions, see [API and Application Keys][1].
- Windows 10 (64-bit) or Windows 11.
- PowerShell 5.1 or later.
- An active internet connection on the device.

### Install the Agent

1. In Datadog, navigate to [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Install Agents{{< /ui >}} > {{< ui >}}Windows{{< /ui >}}][2].
1. Click {{< ui >}}Select API Key{{< /ui >}} and choose an API key.
1. Copy the provided installation command beginning with `[System.Net.ServicePointManager]::SecurityProtocol =`.
1. Right-click the **Start** menu and select **Windows PowerShell (Admin)** or **Terminal (Admin)**. Click **Yes** on the User Account Control prompt.
1. Paste and run the command in PowerShell. The script downloads the installer, installs the Agent silently, and starts the Datadog Agent service. Installation takes two to three minutes.

### Verify the installation

1. To confirm that the Agent is running, run the following command in PowerShell:

    {{< code-block lang="powershell" >}}
    & "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status
    {{< /code-block >}}

    In the output, confirm the following:
    - The Agent version is 7.77.0 or later.
    - **Status** is `Running`.
    - `infrastructure_mode: end_user_device` is set.

1. In Datadog, go to [**Infrastructure** > **End User Devices**][4]. Your device appears within 5-10 minutes. If it does not appear after 15 minutes, verify your API key and confirm that the configuration was saved and the Agent was restarted.

### Enable Network Path (optional)

Use [Network Path][5] to trace network routes between your devices and destination SaaS applications and see a hop-by-hop view of the traceroute.

For a single device, enable Network Path through [Fleet Automation][6], Datadog's tool for remote management of the Datadog Agent:

1. Go to **Fleet Automation** > **Configuration**.
1. Select **Configure Agents**.
1. Select the applicable devices.
1. Select **Network Path** and enter the domains you want to monitor.
1. Deploy your changes.

## MDM deploy with Microsoft Intune (multiple devices)

This method packages the Datadog Agent MSI and a PowerShell configuration script into an Intune Win32 app, which Intune pushes to enrolled Windows devices in the background. No manual steps are needed on each device.

### Prepare the install script and package files

Create a working folder on your computer, such as `C:\DDPackage\`, and add the following three files:

- **The Datadog Agent MSI.** [Download the latest Agent MSI from Datadog][9] and place it in the folder. The file is named similar to `datadog-agent-7-latest.amd64.msi`.
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

    - If your Datadog site is not US1, update `$site` to match. For the list of sites, see [Datadog sites][3].

    - For production deployments, avoid hardcoding the API key in the script. Consider storing the key in an Intune Proactive Remediations environment variable, or deploy it separately using the Intune Win32 app SYSTEM context.

- **`Uninstall.ps1`.** Create this file for clean removal:

    ```powershell
    # Uninstall.ps1 - Datadog Agent
    $productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
    Write-Host "Uninstalling Datadog Agent $productCode"
    Start-Process msiexec -Wait -ArgumentList ('/log', 'C:\Windows\SystemTemp\uninstall-datadog.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
    Write-Host 'Datadog Agent uninstalled.'
    ```

### Enable Network Path (optional)

To enable scheduled Network Path tests, add the following block to `Install.ps1` before you package the app with the Intune Content Prep Tool. This block enables the `traceroute` system-probe module and writes the `network_path` check configuration.

Replace the example hostnames with the destinations you want to monitor.

{{< code-block lang="powershell" >}}
# Enable Network Path

# 1. Enable the traceroute system-probe module
$systemProbe = "C:\ProgramData\Datadog\system-probe.yaml"
if (!(Select-String -Path $systemProbe -Pattern "^traceroute:" -Quiet -ErrorAction SilentlyContinue)) {
    Add-Content -Path $systemProbe -Value "`ntraceroute:`n  enabled: true"
}

# 2. Create the network_path check configuration
$networkPathDir = "C:\ProgramData\Datadog\conf.d\network_path.d"
$networkPathConf = "$networkPathDir\conf.yaml"
New-Item -ItemType Directory -Force -Path $networkPathDir | Out-Null

@'
init_config:
    min_collection_interval: 60
    timeout: 1000

instances:
  - hostname: google.com # endpoint hostname or IP
    protocol: TCP
    port: 443
  - hostname: api.datadoghq.com
    protocol: TCP
    port: 443
    tcp_method: syn_socket
    min_collection_interval: 120
'@ | Set-Content -Path $networkPathConf -Encoding UTF8
{{< /code-block >}}

On Windows client versions, the `tcp_method` must be set to `syn_socket`. For the full list of configuration options, see the [Network Path setup documentation][5].

### Package with the Intune Content Prep Tool

1. Download the [Microsoft Win32 Content Prep Tool][7] (`IntuneWinAppUtil.exe`) if you do not already have it.
1. Run the tool from PowerShell or Command Prompt to package your files:

   {{< code-block lang="powershell" >}}
IntuneWinAppUtil.exe `
  -c C:\DDPackage `
  -s Install.ps1 `
  -o C:\DDPackage\output
{{< /code-block >}}

   This creates `Install.intunewin` in `C:\DDPackage\output`. This is the package you upload to Intune.

### Create the Win32 app in Intune

1. In the [Microsoft Intune admin center][8], go to **Apps** > **All apps** and click **Add**.
1. Select **Windows app (Win32)** as the app type and click **Select**.
1. Upload the `Install.intunewin` file and click **OK**.
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
- In Datadog, go to [**Infrastructure** > **End User Devices**][4]. Enrolled devices appear within 5-10 minutes of the Agent starting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/
[2]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/end-user-devices
[5]: /network_monitoring/network_path/setup/
[6]: /agent/fleet_automation/
[7]: https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool
[8]: https://intune.microsoft.com
[9]: /agent/supported_platforms/windows/
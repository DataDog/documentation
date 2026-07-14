---
title: Set up End User Device Monitoring on macOS
description: Deploy the Datadog Agent on macOS devices for End User Device Monitoring.
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

There are two ways to deploy the Datadog Agent on MacOS devices for End User Device Monitoring. Choose the method that fits your environment:

* **Manual install**: Run a one-line script directly on the device. Best for testing a single machine or devices not managed by a mobile device manager (MDM).
* **Mobile device manager (MDM) deploy**: Push the Agent to a fleet of managed Macs. This example uses a Jamf Pro policy and shell script to install the Agent in the background with no interaction on each device.

Regardless of the method, the installer creates a dedicated system user named `ddagent`. This is expected: it allows the Agent to run as a background service with the appropriate system permissions. You do not need to manage this user.

<div class="alert alert-danger">The <code>infrastructure_mode: end_user_device</code> setting is required. Without it, the device does not appear in the End User Devices view and is billed as a host.</div>

## Manual install (single device)

Use this method to test a single machine or for devices that are not managed by an MDM solution.

### Prerequisites

- Administrator (`sudo`) access on the Mac.
- A valid Datadog API key. For instructions, see [API and Application Keys][1].
- (Recommended) macOS 12 or later.
- An active internet connection on the device.

### Install the Agent

1. In Datadog, navigate to [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Install Agents{{< /ui >}} > {{< ui >}}macOS{{< /ui >}}][6].
1. Click {{< ui >}}Select API Key{{< /ui >}} and choose an API key.
1. Copy the provided installation command beginning with `sudo DD_API_KEY=`.
1. Open {{< ui >}}Terminal{{< /ui >}}. Find it in {{< ui >}}Applications{{< /ui >}} > {{< ui >}}Utilities{{< /ui >}} > {{< ui >}}Terminal{{< /ui >}}, or search for it with Spotlight (<kbd>⌘</kbd> + <kbd>Space</kbd>).
1. Paste the installation command into the terminal and run it. Enter your Mac password when prompted.

    The script installs the Agent, creates the `ddagent` system user, and registers the Agent as a background launch daemon. Installation takes one to two minutes.

1. Launch the Datadog Agent Manager UI by running:

    ```shell
    sudo datadog-agent launch-gui
    ```

1. Navigate to {{< ui >}}Settings{{< /ui >}}.
1. Add a new parameter to the end of the YAML file:

    ```yaml
    infrastructure_mode: end_user_device
    ```

1. Save your changes, then [restart the Agent][2].

### Verify the installation

1. To confirm that the Agent is running, run the following command in Terminal:

    ```shell
    sudo datadog-agent status
    ```

    In the output, confirm the following:
    - The Agent version is 7.79.0 or later.
    - **Status** is `Running`.
    - `infrastructure_mode: end_user_device` is set.

1. In Datadog, go to [**Infrastructure** > **End User Devices**][4]. Your device appears within 5-10 minutes. If it does not appear after 15 minutes, verify your API key and confirm that the configuration was saved and the Agent was restarted.

### Enable Network Path (optional)

<!-- todo, waiting on open questions -->

## MDM deploy with Jamf Pro (multiple devices)

This method uses a Jamf Pro policy and shell script to install and configure the Datadog Agent across your fleet of managed Macs, with no manual steps on each device. The script performs the same actions as the manual install, but runs in the background when the policy triggers.

You can use other MDMs; however, this page walks through Jamf Pro as an example.

### Prerequisites

- Access to the Jamf Pro admin console.
- A valid Datadog API key. For instructions, see [API and Application Keys][1].
- Devices running macOS 11 or later.
- Target devices enrolled in Jamf Pro with an active internet connection.

### Create the install script in Jamf

1. In the Jamf Pro console, go to **Settings** > **Computer Management** > **Scripts** and click **New**.
1. Give the script a name, such as `Datadog Agent EUDM`.
1. Paste the following into the **Script** field:

    ```shell
    #!/bin/zsh
    # Datadog Agent - End User Device Monitoring install script
    DD_API_KEY="$4"
    DD_SITE="datadoghq.com"

    DD_API_KEY="$DD_API_KEY" \
      DD_SITE="$DD_SITE" \
      DD_INFRASTRUCTURE_MODE="end_user_device" \
      bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"

    echo "Datadog Agent installation complete."
    ```

    If your Datadog site is not US1, update `DD_SITE` to match. For the list of sites, see [Datadog sites][3].

1. To avoid storing your API key in the script body, pass it as a Jamf script parameter. In the **Options** tab, label parameter 4 as `DD_API_KEY`. The script reads this value from `$4`, and you enter the actual key when you [create the policy](#create-the-jamf-policy) in the next step.

    The install script runs as root through Jamf, which provides the permissions needed to install the Agent and create the `ddagent` system user without user interaction.

### Create the Jamf policy

1. Go to **Computers** > **Policies** and click **New**.
1. In the **General** tab:
   - Give the policy a name, such as `Deploy Datadog Agent EUDM`.
   - Set **Execution Frequency** to **Once per computer**.
   - Select the trigger you want. **Enrollment Complete** and **Recurring Check-In** are common choices for background deployment.
1. Click the **Scripts** payload and add the script you created. Set the **Priority** to **After**, and enter your API key in the **Parameter 4** field.
1. In the **Scope** tab, add the computers, groups, or smart groups that should receive the Agent.
1. Click **Save**. Devices in scope receive the policy on their next check-in, and the Agent installs in the background.

### Verify the deployment

To confirm that the Agent installed on a device, use one of the following methods:

- In the policy detail view, click **Logs** to see which devices ran the policy and whether the script exited with a `0` (success) code.
- SSH into a target device and run `datadog-agent status`. In the output, confirm that **Status** is `Running` and `infrastructure_mode: end_user_device` is set.
- In Datadog, go to [**Infrastructure** > **End User Devices**][4]. Enrolled devices appear within 5-10 minutes of the Agent starting.

## Enable Network Path (optional)

<!-- todo, waiting on open questions -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/
[2]: /agent/configuration/agent-commands/#restart-the-agent
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/end-user-devices
[5]: /network_monitoring/network_path/setup/
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
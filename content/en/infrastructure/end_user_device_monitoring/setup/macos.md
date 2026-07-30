---
title: Set up End User Device Monitoring on macOS
description: Deploy the Datadog Agent on macOS devices for End User Device Monitoring.
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

There are two ways to deploy the Datadog Agent on macOS devices for End User Device Monitoring. Choose the method that fits your environment:

- **Manual install**: Run a one-line script directly on the device. Best for testing a single machine or devices not managed by a mobile device management (MDM) solution.
- **MDM deploy**: Push the Agent to a fleet of managed Macs. This example uses a Jamf Pro policy and shell script to install the Agent in the background with no interaction on each device.

Regardless of the method, the installer creates a dedicated system user named `_dd-agent`. This is expected: it allows the Agent to run as a background service with the appropriate system permissions. You do not need to manage this user.

<div class="alert alert-danger">The <code>infrastructure_mode: end_user_device</code> setting is required. Without it, the device does not appear in the End User Devices view and is billed as a host.</div>

{{< tabs >}}
{{% tab "Manual install" %}}

Use this method to test a single machine or for devices that are not managed by an MDM solution.

### Prerequisites

- Administrator (`sudo`) access on the Mac.
- A valid Datadog API key. For instructions, see [API and Application Keys][101].
- macOS 11 or later.
- An active internet connection on the device.

### Install the Agent

1. In Datadog, navigate to [{{< ui >}}Fleet Automation{{< /ui >}} > {{< ui >}}Install Agents{{< /ui >}} > {{< ui >}}macOS{{< /ui >}}][102].
1. Toggle on {{< ui >}}Enable End User Device Monitoring{{< /ui >}}.
1. Click {{< ui >}}Select API Key{{< /ui >}} and choose an API key.
1. Copy the provided installation command beginning with `sudo DD_API_KEY=`.
1. Open {{< ui >}}Terminal{{< /ui >}}. Find it in {{< ui >}}Applications{{< /ui >}} > {{< ui >}}Utilities{{< /ui >}} > {{< ui >}}Terminal{{< /ui >}}, or search for it with Spotlight (<kbd>⌘</kbd> + <kbd>Space</kbd>).
1. Paste the installation command into the terminal and run it. Enter your Mac password when prompted.

    The script installs the Agent, creates the `_dd-agent` system user, and registers the Agent as a background launch daemon. Installation takes one to two minutes.

1. Launch the Datadog Agent Manager UI by running:

    ```shell
    sudo datadog-agent launch-gui
    ```

1. Navigate to {{< ui >}}Settings{{< /ui >}}.
1. Add a new parameter to the end of the YAML file:

    ```yaml
    infrastructure_mode: end_user_device
    ```

1. Save your changes, then [restart the Agent][103]:

    ```shell
    sudo launchctl kickstart -k system/com.datadoghq.agent
    ```

### Verify the installation

To confirm that the Agent is running, in Datadog, go to [**Infrastructure** > **End User Devices**][104]. Your device appears within 5-10 minutes. If it does not appear after 10 minutes, verify your API key and confirm that the configuration was saved and the Agent was restarted.

Alternatively, you can run the following command in Terminal to verify the installation:

```shell
sudo datadog-agent status
```

In the output, confirm the following:
- The Agent version is 7.80 or later.
- **Status** is `Running`.
- `infrastructure_mode: end_user_device` is set.

### Enable Network Path (optional)

<div class="alert alert-info">Enabling Network Path may incur additional charges. See the <a href="https://www.datadoghq.com/pricing/">pricing page</a> for details.</div>

Use [Network Path][105] to trace network routes between your devices and destination SaaS applications and see a hop-by-hop view of the traceroute.

1. Add the following to `/opt/datadog-agent/etc/system-probe.yaml`:

    ```yaml
    traceroute:
      enabled: true
    ```

1. Make a copy of `/opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml.example`, removing `.example` from the filename:

    ```shell
    cp /opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml.example /opt/datadog-agent/etc/conf.d/network_path.d/conf.yaml
    ```

1. Edit the `conf.yaml` file. Replace the example hostnames with the destinations you want to monitor:

    ```yaml
    init_config:
        ## @param min_collection_interval - number - optional - default: 60
        ## Specifies how frequently we should probe the endpoint.
        ## Min collection interval is defined in seconds.
        #
        min_collection_interval: 60

        ## @param timeout - integer - optional - default: 1000
        ## Specifies how much time in milliseconds the traceroute should
        ## wait for a response from each hop before timing out.
        #
        timeout: 1000

    # Network Path integration is used to monitor individual endpoints.
    instances:
      - hostname: google.com # endpoint hostname or IP
        protocol: TCP
        port: 443
      - ## @param hostname - string - required
        ## Hostname or IP of the target endpoint to monitor via Network Path.
        #
        hostname: api.datadoghq.com

        ## @param port - integer - optional
        ## Port of the target endpoint to monitor via Network Path.
        ## For UDP, we do not recommend setting the port since it can make probes less reliable.
        ## If port is not set, a random port will be used.
        #
        port: 443

        ## @param protocol - string - optional - default: UDP
        ## Protocol used to monitor an endpoint via Network Path.
        ## Available protocols: UDP, TCP, ICMP
        #
        protocol: TCP

        ## @param max_ttl - integer - optional - default: 30
        ## Specifies the maximum number of hops (max time-to-live value) traceroute will probe.
        #
        # max_ttl: <MAX_TTL>

        ## @param timeout - integer - optional - default: 1000
        ## Specifies how much time in milliseconds the traceroute should
        ## wait for a response from each hop before timing out.
        #
        # timeout: 1000

        ## @param min_collection_interval - number - optional - default: 60
        ## Specifies how frequently we should probe the endpoint.
        ## Min collection interval is defined in seconds.
        #
        min_collection_interval: 120

        ## @param source_service - string - optional
        ## Source service name.
        #
        # source_service: <SOURCE_SERVICE>

        ## @param destination_service - string - optional
        ## Destination service name.
        #
        # destination_service: <DESTINATION_SERVICE>

        ## @param tcp_method - string - optional - default: syn
        ## Traceroute method used to monitor an endpoint via Network Path
        ## Available methods: syn, sack, prefer_sack, syn_socket (syn_socket only works on Windows OSes)
        ## Note: Windows client versions only support syn_socket
        #
        # tcp_method: <METHOD>

        ## @param traceroute_queries - integer - optional - default: 3
        ## Number of traceroutes to send for each check run.
        #
        # traceroute_queries: 3

        ## @param e2e_queries - integer - optional - default: 50
        ## Number of end-to-end probes to send for each check run.
        #
        # e2e_queries: 50

        ## @param tags - list of strings - optional
        ## A list of tags to attach to every metric and service check emitted by this instance.
        ##
        ## Learn more about tagging at https://docs.datadoghq.com/tagging
        #
        # tags:
        #   - <KEY_1>:<VALUE_1>
        #   - <KEY_2>:<VALUE_2>
    ```

1. Restart the Agent and system probe to start seeing network paths:

    ```shell
    sudo launchctl kickstart -k system/com.datadoghq.agent
    sudo launchctl kickstart -k system/com.datadoghq.sysprobe
    ```

[101]: /account_management/api-app-keys/
[102]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[103]: /agent/supported_platforms/osx/#commands
[104]: https://app.datadoghq.com/end-user-devices
[105]: /network_monitoring/network_path/setup/

{{% /tab %}}

{{% tab "MDM deploy (example with Jamf Pro)" %}}

This example method uses a Jamf Pro policy and shell script to install and configure the Datadog Agent across your fleet of managed Macs, with no manual steps on each device. The script performs the same actions as the manual install, but runs in the background when the policy triggers.

You can use other MDMs; however, this page walks through Jamf Pro as an example.

### Prerequisites

- Access to the Jamf Pro admin console.
- A valid Datadog API key. For instructions, see [API and Application Keys][201].
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

    If your Datadog site is not US1, update `DD_SITE` to match. For the list of sites, see [Datadog sites][202].

1. To avoid storing your API key in the script body, pass it as a Jamf script parameter. In the **Options** tab, label parameter 4 as `DD_API_KEY`. The script reads this value from `$4`, and you enter the actual key when you [create the policy](#create-the-jamf-policy) in the next step.

    The install script runs as root through Jamf, which provides the permissions needed to install the Agent and create the `_dd-agent` system user without user interaction.

### Enable Network Path (optional)

<div class="alert alert-info">Enabling Network Path may incur additional charges. See the <a href="https://www.datadoghq.com/pricing/">pricing page</a> for details.</div>

To enable scheduled Network Path tests, add the following block to your install script before you create the Jamf policy. This block enables the `traceroute` system-probe module, writes the `network_path` check configuration, and restarts the Agent and system-probe.

Replace the example hostnames with the destinations you want to monitor.

{{< code-block lang="shell" >}}
# Datadog Agent - Network Path configuration

# 1. Enable the traceroute system-probe module
SYSTEM_PROBE="/opt/datadog-agent/etc/system-probe.yaml"
if ! grep -q '^traceroute:' "$SYSTEM_PROBE" 2>/dev/null; then
  cat >> "$SYSTEM_PROBE" <<'YAML'

traceroute:
  enabled: true
YAML
fi

# 2. Create the network_path check configuration
NETWORK_PATH_DIR="/opt/datadog-agent/etc/conf.d/network_path.d"
NETWORK_PATH_CONF="$NETWORK_PATH_DIR/conf.yaml"
mkdir -p "$NETWORK_PATH_DIR"
chown _dd-agent:admin "$NETWORK_PATH_DIR"
cat > "$NETWORK_PATH_CONF" <<'YAML'
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
    min_collection_interval: 120
YAML

# Remove the .example file if present so it doesn't shadow the active config
[ -f "$NETWORK_PATH_DIR/conf.yaml.example" ] && rm -f "$NETWORK_PATH_DIR/conf.yaml.example"

# Set ownership and permissions to match Datadog defaults
chown _dd-agent:admin "$SYSTEM_PROBE" "$NETWORK_PATH_CONF" 2>/dev/null || true
chmod 640 "$NETWORK_PATH_CONF"

# 3. Restart system-probe and agent to pick up the config changes
sudo launchctl kickstart -k system/com.datadoghq.sysprobe
sudo launchctl kickstart -k system/com.datadoghq.agent

echo "Datadog Network Path configuration complete."
{{< /code-block >}}

For the full list of configuration options, see the [Network Path setup documentation][203].

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
- Use SSH to connect to a target device and run `datadog-agent status`. In the output, confirm that **Status** is `Running` and `infrastructure_mode: end_user_device` is set.
- In Datadog, go to [**Infrastructure** > **End User Devices**][204]. Enrolled devices appear within 5-10 minutes of the Agent starting.

[201]: /account_management/api-app-keys/
[202]: /getting_started/site/
[203]: /network_monitoring/network_path/setup/
[204]: https://app.datadoghq.com/end-user-devices

{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

For detailed steps, see [Agent Troubleshooting][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/troubleshooting/

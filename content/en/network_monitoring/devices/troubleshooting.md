---
title: NDM Troubleshooting
aliases:
    - /network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
- link: "/network_monitoring/devices/glossary"
  tag: "Doc"
  text: "NDM terms and concepts"
---

## Overview

Use the information below for troubleshooting Datadog Network Device Monitoring. If you need additional help, contact [Datadog support][1].

## Device not visible in Datadog

The following assumes you are running Datadog Agent v7.61.0+.

If your device is not visible on the [Devices][2] page:

1. Run the [datadog-agent status][3] command and look for the snmp section, which contains your device's monitoring IP. After you start the Agent, it may take up to one minute for NDM to discover individually configured devices. If your Agent is set to scan a large number of devices, it may take longer.
The output should look similar to the following:

   ```
   snmp
   ----
     Instance ID: snmp:default:1.2.3.4.1:9a2df638d3ba38d6 [ERROR]
     Configuration Source: file:/etc/datadog-agent/conf.d/snmp.d/conf.yaml
     Total Runs: 1
     Metric Samples: Last Run: 6, Total: 6
     Events: Last Run: 0, Total: 0
     Network Devices Metadata: Last Run: 1, Total: 1
     Service Checks: Last Run: 1, Total: 1
     Average Execution Time : 0s
     Last Execution Date : 2024-11-13 13:12:09 PST / 2024-11-13 21:12:09 UTC (1731532329000)
     Last Successful Execution Date : Never
     Error: <ERROR MESSAGE>
     No traceback
   ```

2. If your device is not listed, and you are using Autodiscovery, it likely means the Agent could not connect to your device.

   - Run the `datadog-agent status` command, and wait for the `autodiscovery` section to report that all possible device IPs have been scanned. On large networks this can take a several minutes. The output should look similar to the following:

    ```
    Autodiscovery
    =============
    Subnet 127.0.0.1/24 is queued for scanning.
    No IPs found in the subnet.
    Scanning subnet 127.0.10.1/30... Currently scanning IP 127.0.10.2, 4 IPs out of 4 scanned.
    Found the following IP(s) in the subnet:
       - 127.0.10.1
       - 127.0.10.2
    Subnet 127.0.10.1/30 scanned.
    No IPs found in the subnet.
    ```

    If Autodiscovery completed and your device is still not appearing on the [Devices][2] page, it means the Agent could not connect to your device.

   - Run an `snmp walk` on the device's admin IP to determine why the Agent cannot connect to your device.

      **Note**: Provide your credentials directly in the CLI. If credentials aren't provided, the Agent attempts to locate them in your running Agent configuration files. 
      
      Refer to your vendor specific documentation for additional information on running these commands.

      {{< tabs >}}
      {{% tab "Linux" %}}

   SNMP v2:

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -C <COMMUNITY_STRING>
   ```

   SNMP v3:

   ```shell
   sudo -u dd-agent datadog-agent snmp walk <IP Address> -A <AUTH_KEY> -a <AUTH_PROTOCOL> -X <PRIV_KEY> -x <PRIV_PROTOCOL>
   ```

      {{% /tab %}}
      {{% tab "Windows" %}}

   Navigate to the Agent installation directory:

   ```shell
   cd "c:\Program Files\Datadog\Datadog Agent\bin"
   ```

   Run the SNMP walk command:

   ```shell
   agent snmp walk <IP Address>[:Port]
   ```

   Example:

   ```shell
   agent.exe snmp walk 10.143.50.30 1.3.6
   ```

   **Note**: Run this command as administrator from the Agent installation directory to avoid the following error:

   ```shell
   Error: unable to read artifact: open C:\ProgramData\Datadog\auth_token: Access is denied.
   ```

      {{% /tab %}}
      {{< /tabs >}}

## Troubleshooting SNMP errors

If either the SNMP status or Agent walk shows an error, it could indicate one of the following issues:

### Permission denied

If you see a permission denied error while port binding in agent logs, the port number you've indicated may require elevated permissions. To bind to a port number under 1024, see [Using the default SNMP Trap port 162][8].

### Unreachable or misconfigured device:

   **Error**:
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

   **Solution**:

   1. Log into your device and ensure that SNMP is enabled and exposed on port 161.
   2. Verify that your collector firewall allows egress.

   3. Optionally, For Linux only:

      Run `iptables -L OUTPUT` and ensure there is no deny rule:

      ```shell
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. Ensure your community string matches.

### Incorrect SNMPv2 credentials

   **Error**:
   ```
   Error: an authentication method needs to be provided
   ```

   **Solution**:

   If using SNMPv2, ensure that a community string is set.

### Incorrect SNMPv3 privacy protocol

   **Error**:
   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error
   ```

   OR

   ```
   Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **Solution**:

   Verify that the following SNMPv3 configuration parameters are correct:
   - user
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### Traps or Flows not being received at all

If SNMP traps or NetFlow traffic are missing, a common cause is firewall rules blocking UDP packets before they reach the Agent. Both SNMP traps and NetFlow rely on UDP and use the ports defined in your [datadog.yaml][9] configuration.

<div class="alert alert-info">Local firewalls like Uncomplicated Firewall (UFW) may block traffic even when configured with permissive settings. Check system logs for blocked packet entries, which typically indicate that traffic reached the network interface but was blocked before reaching the operating system.</div>

Use the following platform-specific commands to check for firewall rules that may be blocking the traffic from reaching the Agent.

{{< tabs >}}
{{% tab "Linux" %}}

Linux has multiple types of firewalls, such as `iptables`, `nftables`, or `ufw`. Depending on which is in use, the following commands can be used:

- `sudo iptables -S`

- `sudo nft list ruleset`

- `sudo ufw status`

Check for rules blocking UDP traffic on the configured ports.

{{% /tab %}}
{{% tab "Windows" %}}

Starting with version `7.67`, the Agent's `agent.exe diagnose` command automatically checks for blocking firewall rules and displays warnings if any are found.

To manually inspect firewall rules:

```powershell
Get-NetFirewallRule -Action Block | ForEach-Object {
    $rule = $_
    Get-NetFirewallPortFilter -AssociatedNetFirewallRule $rule | Select-Object
        @{Name="Name"; Expression={$rule.Name}},
        @{Name="DisplayName"; Expression={'"' + $rule.DisplayName + '"'}},
        @{Name="Direction"; Expression={$rule.Direction}},
        @{Name="Protocol"; Expression={$_.Protocol}},
        @{Name="LocalPort"; Expression={$_.LocalPort}},
        @{Name="RemotePort"; Expression={$_.RemotePort}}
} | Format-Table -AutoSize
```

Look for rules where:
- **Direction** is inbound
- **Protocol** is UDP
- **LocalPort** matches one of your configured ports

{{% /tab %}}
{{% tab "MacOS" %}}

Run the following command to review Packet Filter (pf) rules:

```shell
sudo pfctl -sr
```

Check for any rules blocking UDP traffic on your configured ports. For example:`block drop in proto udp from any to any port = <CONFIG_PORT>`.
{{% /tab %}}
{{< /tabs >}}

### Traps not being received for devices

1. Check the Datadog `agent.log` file to ensure that you can bind to the traps port. The following error indicates that you are unable to bind to the traps port:

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **Solution**:
   Add a net bind capability to the Agent binary, which allows the Agent to bind to reserved ports:

   ```shell
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

### Traps incorrectly formatted

1. Navigate to the troubleshooting dashboard in NDM:

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="The Network Device Monitoring page showing the Dashboard dropdown with the NDM Troubleshooting dashboard highlighed." style="width:80%;" >}}

2. Scroll down to the Traps widget and observe the **Traps incorrectly formatted** graph. If this is non-zero it likely means that the authentication on the NDM collector and the device do not match.

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="The NDM troubleshooting dashboard showing the Traps widget section." style="width:100%;" >}}

   **Solution**:

     Verify that the following configurations in the `datadog.yaml` file align with the trap settings on the devices from which traps are missing:

   ```
    ## @param community_strings - list of strings - required
    ## A list of known SNMP community strings that devices can use to send traps to the Agent.
    ## Traps with an unknown community string are ignored.
    ## Enclose the community string with single quote like below (to avoid special characters being interpreted).
    ## Must be non-empty.
    #
    # community_strings:
    #   - '<COMMUNITY_1>'
    #   - '<COMMUNITY_2>'

    ## @param users - list of custom objects - optional
    ## List of SNMPv3 users that can be used to listen for traps.
    ## Each user can contain:
    ##  * user         - string - The username used by devices when sending Traps to the Agent.
    ##  * authKey      - string - (Optional) The passphrase to use with the given user and authProtocol
    ##  * authProtocol - string - (Optional) The authentication protocol to use when listening for traps from this user.
    ##                            Available options are: MD5, SHA, SHA224, SHA256, SHA384, SHA512.
    ##                            Defaults to MD5 when authKey is set.
    ##  * privKey      - string - (Optional) The passphrase to use with the given user privacy protocol.
    ##  * privProtocol - string - (Optional) The privacy protocol to use when listening for traps from this user.
    ##                            Available options are: DES, AES (128 bits), AES192, AES192C, AES256, AES256C.
    ##                            Defaults to DES when privKey is set.
    #
    # users:
    # - user: <USERNAME>
    #   authKey: <AUTHENTICATION_KEY>
    #   authProtocol: <AUTHENTICATION_PROTOCOL>
    #   privKey: <PRIVACY_KEY>
    #   privProtocol: <PRIVACY_PROTOCOL>
    ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help
[2]: https://app.datadoghq.com/devices
[3]: /agent/configuration/agent-commands/#agent-information
[4]: /api/latest/network-device-monitoring/
[5]: /api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162
[9]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file

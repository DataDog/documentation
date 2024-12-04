---
title: NDM Troubleshooting
aliases:
    - /network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-snmp-with-datadog/"
  tag: "Blog"
  text: "Monitor SNMP with Datadog"
---

## Overview

Use the information below for troubleshooting Datadog Network Device Monitoring. If you need additional help, contact [Datadog support][1].

### Device not visible in Datadog

The following assumes you are running Datadog Agent version `7.59.0+`.

Perform the following steps if your device is not visible on the [devices][6] page:

1. Run the [datadog-agent status][7] command and look for the snmp section which contains your devices monitoring IP. After starting the Agent, it may take up to one minute for NDM to discover individually configured devices. If your Agent is set to scan a large number of devices, it may take longer. 
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
     Error: <b>&lt;ERROR MESSAGE&gt;</b> 
     No traceback
   ```

2. If your device is not listed and you are using Autodiscovery, it likely means the Agent could not connect to your device. Try running an `snmp walk` on the device's admin IP.

   Example:

   ```
   datadog-agent snmp walk
   ## Run this with no snmp credentials specified on the CLI
   ## When no credentials are specified, the DD agent will read relevant credentials from the appropriate yaml file
   ```

   **Linux**: 
   ```
   sudo dd-agent /opt/datadog-agent/bin/agent/agent snmp walk <IP Address>[:Port] [OID] [OPTIONS] [flags]

   Example:
   sudo -u dd-agent /opt/datadog-agent/bin/agent/agent snmp walk 10.100.70.142 1.3.6 
   ```

   **Windows**:   
   ```
   agent snmp walk <IP Address>[:Port] [OID] [OPTIONS] [flags]

   Example:           
   agent.exe snmp walk  10.143.50.30 1.3.6 
   ```

3. If either the SNMP status or Agent walk show an error, it could indicate one of the following issues:

   **Unreachable or misconfigured device**:

   ```
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```
   
   **Solution**:
   - Log into your device and ensure that SNMP is enabled and exposed on port 161.
   - Ensure you collector firewall allows egress:

   **Linux only**:

   Run `iptables -L OUTPUT` and ensure that there is not a deny rule:

   ```
   vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
   Chain OUTPUT (policy ACCEPT)
   target     prot opt source               destination
   DROP       all  --  anywhere             10.4.5.6
   ```

   - Ensure your community string matches.

   **Incorrect SNMPv2 credentials**:

   ``` 
   Error: an authentication method needs to be provided
   ```

   **Solution**: 
   If you are using SNMPv2 you need to set a community string.

   **Incorrect SNMPv3 privacy protocol**

   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error  OR Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **Solution**: 
   Ensure the following configuration parameters are correct: `user`, `authKey`, `authProtocol`, `privKey`, `privProtocol`.

### Traps not being received for devices

1. Check the Datadog `agent.log` file to ensure  that you aren't unable to bind to the traps port. If this is the case, the following error is present:

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **Solution**:
   Add a net bind capability to the Agent binary, which allows the Agent to bind to reserved ports: 

   ```
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

2. Navigate to the troubleshooting dashboard in NDM:

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="The Network Device Monitoring page showing the Dashboard dropdown with the NDM Troubleshooting dashboard highlighed." style="width:80%;" >}}

   Scroll down to the Traps widget and observe the **Traps incorrectly formatted** graph. If this is non-zero it likely means that the authentication on the NDM collector and the device do not match. 

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="The NDM troubleshooting dashboard showing the Traps widget section." style="width:100%;" >}}
   
   **Solution**: 
   Ensure that the following configurations in the `datadog.yaml` file match the traps settings on the devices from which you are missing traps:

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

### Extract information about devices and interfaces of network devices

- Use the [Network API][2] to extract the following information about your network devices:
  * [Get the list of interfaces for your devices.][3]
  - [Get the list of tags for your devices.][4]
  - [Update the list of tags for your devices.][5]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /help
[2]: /api/latest/network-device-monitoring/
[3]: /api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[4]: /api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[5]: /api/latest/network-device-monitoring/#update-the-tags-for-a-device
[6]: https://app.datadoghq.com/infrastructure/devices 
[7]: /agent/configuration/agent-commands/#agent-information

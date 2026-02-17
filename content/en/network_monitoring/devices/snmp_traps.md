---
title: SNMP Traps
description: "Enable listening for SNMP traps."
further_reading:
  - link: "https://www.datadoghq.com/blog/diagnose-network-performance-with-snmp-trap-monitoring/"
    tag: "Blog"
    text: "Monitor and diagnose network performance issues with SNMP traps"
  - link: "/network_monitoring/devices/troubleshooting"
    tag: "Documentation"
    text: "NDM Troubleshooting"
---

## Overview

SNMP traps are notifications sent from an SNMP-enabled device to an SNMP manager when unusual activity occurs, such as a sudden state change on a piece of equipment.

Monitoring SNMP traps helps you capture issues that might otherwise go unnoticed due to device instability. For example, if an interface flaps between available and broken states every 15 seconds, polling every 60 seconds could miss the degree of network instability. Traps also provide visibility into the health of hardware components, such as device battery or chassis.

Datadog Agent v7.37+ supports listening for SNMP traps, enabling you to configure [monitors][1] for specific trap events.

## Configuration

To enable listening for SNMP traps, use the following instructions:

1. Ensure that your [firewall rules][7] allow incoming UDP traffic on the configured port.
2. Add the following to your `datadog.yaml` file:

   ```yaml
   network_devices:
     namespace: <NAMESPACE> # optional, defaults to "default".
     snmp_traps:
       enabled: true
       port: 9162 # on which ports to listen for traps
       community_strings: # which community strings to allow for v2 traps
         - <STRING_1>
         - <STRING_2>
       bind_host: 0.0.0.0
       users: # SNMP v3
       - user: "user"
         authKey: myAuthKey
         authProtocol: "SHA"
         privKey: myPrivKey
         privProtocol: "AES"
       - user: "user"
         authKey: myAuthKey
         authProtocol: "MD5"
         privKey: myPrivKey
         privProtocol: "DES"
       - user: "user2"
         authKey: myAuthKey2
         authProtocol: "SHA" # choices: MD5, SHA, SHA224, SHA256, SHA384, SHA512
         privKey: myPrivKey2
         privProtocol: "AES" # choices: DES, AES (128 bits), AES192, AES192C, AES256, AES256C
   ```

   **Note**: Multiple v3 users and passwords are supported as of Datadog Agent `7.51` or higher.

After configuration, SNMP traps are forwarded as logs to Datadog. You can find them in the [Log Explorer][2] with the following search query: `source:snmp-traps`.

   {{< img src="network_device_monitoring/snmp/snmp_traps_3.png" alt="Log Explorer showing `source:snmp-traps` with an SNMP trap log line selected, highlighting the Network Device tag" style="width:90%" >}}

   <div class="alert alert-info">Even though SNMP traps are <em>forwarded as logs</em>, <code>logs_enabled</code> does <strong>not</strong> need to be set to <code>true</code>.</div>

### Using the default SNMP trap port 162

Binding to a port number under `1024` requires elevated permissions. To bind to a port number such as the default SNMP Trap port `162`, use the following instructions:

1. Grant access to the port using the `setcap` command:

   ```
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-packages/datadog-agent/stable/bin/agent/agent
   ```

   **Note**: Re-run this setcap command every time you upgrade the Agent.

2. Verify the setup is correct by running the `getcap` command:

   ```
   sudo getcap /opt/datadog-packages/datadog-agent/stable/bin/agent/agent
   ```

   You should see the following output:

   ```
   /opt/datadog-packages/datadog-agent/stable/bin/agent/agent = cap_net_bind_service+ep
   ```

3. [Restart the Agent][6].

## Device namespaces

As with [Network Device Monitoring][3], use namespace tags to differentiate between multiple network devices that share the same private IP. For example, you could have two routers that share the same private IP: one in New York, and another in Paris. In this case, you can deploy an Agent in the New York data center that sends telemetry tagged with `namespace: nyc`; and a second Agent in the Paris data center that sends telemetry tagged with `namespace: paris`.

The namespace can then be used to uniquely pivot from an SNMP trap to the emitter device, or from the emitter device to an SNMP trap.

**Note**: If you are using namespace tags on any of your Agents, ensure that all of your Agents are using namespace tags. Do not configure namespace tags for only a subset of your Agents.

## Resolution

Each SNMP trap has a specific {{< tooltip text="object identifier (OID)" tooltip="A unique ID or address on a device that when polled returns the response code of that value." >}} based format. The Datadog Agent performs a _resolution_ step to convert OIDs into more readable strings.

An SNMP trap consists of:

- Emitter information (for example, the IP of the device).
- An OID that defines the type of trap.
- Metadata: A list of pairs (`OID:value`) that provides additional context for the trap.

Decoding is performed on the Agent side, using a mapping stored on disk at `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/dd_traps_db.json.gz`. Datadog supports more than 11,000 different management information bases (MIBs).

### Mapping format

Mappings are stored as TrapsDB files, and can be YAML or JSON.

#### Examples

{{< tabs >}}
{{% tab "YAML" %}}
```yaml
mibs:
- NET-SNMP-EXAMPLES-MIB
traps:
  1.3.6.1.4.1.8072.2.3.0.1:
    mib: NET-SNMP-EXAMPLES-MIB
    name: netSnmpExampleHeartbeatNotification
vars:
  1.3.6.1.4.1.8072.2.3.2.1:
    name: netSnmpExampleHeartbeatRate
```
{{% /tab %}}
{{% tab "JSON" %}}
```json
{
  "mibs": [
    "NET-SNMP-EXAMPLES-MIB"
  ],
  "traps": {
    "1.3.6.1.4.1.8072.2.3.0.1": {
      "mib": "NET-SNMP-EXAMPLES-MIB",
      "name": "netSnmpExampleHeartbeatNotification"
    }
  },
  "vars": {
    "1.3.6.1.4.1.8072.2.3.2.1": {
      "name": "netSnmpExampleHeartbeatRate"
    }
  }
}
```
{{% /tab %}}
{{< /tabs >}}

### Extend the Agent

To extend the capabilities of the Agent, create your own mappings and place them in the `$<PATH_TO_AGENT_CONF.D>/snmp.d/traps_db/` directory.

You can write these mappings by hand, or generate mappings from a list of MIBs using Datadog's developer toolkit, [`ddev`][4].

#### Generate a TrapsDB file from a list of MIBs

**Prerequisites**:
- Python 3
- [`ddev`][4] (`pip3 install ddev`)
- [`pysmi`][5] (`pip3 install pysmi`)

Place all your MIBs in a dedicated folder and run:

```shell
ddev meta snmp generate-traps-db -o ./output_dir/ /path/to/my/mib1 /path/to/my/mib2 /path/to/my/mib3 ...
```

The `ddev` tool automatically fetches available MIB dependencies. If you encounter missing dependency errors and have the MIB files locally, use the `--mib-sources <DIR>` parameter to specify the location of your local MIB files. Ensure filenames match the MIB name (for example, `SNMPv2-SMI`, not `snmp_v2_smi.txt`).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/
[2]: https://app.datadoghq.com/logs
[3]: /network_monitoring/devices
[4]: /developers/integrations/python
[5]: https://pypi.org/project/pysmi/
[6]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /network_monitoring/devices/troubleshooting#traps-or-flows-not-being-received-at-all

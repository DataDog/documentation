---
title: How to monitor SNMP devices?
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
- link: "integrations/snmp"
  tag: "Integration"
  text: "Learn more about the Datadog-SNMP integration"
---

Simple Network Management Protocol (SNMP) is the de facto standard for monitoring network-connected devices, such as routers, switches, servers, and firewalls.

In this article, we go through monitoring a Juniper SRX firewall, using the Datadog Agent installed on an Ubuntu 14-04 workstation.

SNMP uses OIDs, or Object Identifiers, to uniquely identify managed objects. OIDs follow a hierarchical tree pattern: under the root is ISO which is numbered 1, then next level is ORG and numbered 3 and so on, with each level being separated by a ..

A MIB, or Management Information Base acts as a translator between OIDs and human readable names, and organizes a subset of the hierarchy. Because of the way the tree is structured, most SNMP values we're interested in always start with the same set of objects: 1.3.6.1.1 for MIB-2 which is a standard that holds system information like uptime, interfaces, network stack, and 1.3.6.1.4.1 which holds vendor specific information.

Let's start by installing some useful snmp tools on our ubuntu machine:

First let's enable the multiverse repo.

Then we install 2 packages:

```
sudo apt-get install snmp snmp-mibs-downloader
```

This installs the snmp tool suite and download MIBs.

Now use the snmpwalk utility to make sure we can communicate over SNMP with the device. We have to supply the version of the SNMP protocol supported by our device, the community string (which acts as a passphrase), the IP address of the device and ask to use all MIB files available:

```
$ snmpwalk -v 2c -c public -mALL 192.168.33.10 1.3

SNMPv2-MIB::sysDescr.0 = STRING: Juniper Networks, Inc. firefly-perimeter internet router, kernel JUNOS 12.1X47-D15.4 #0: 2014-11-12 02:13:59 UTC     builder@chamuth.juniper.net:/volume/build/junos/12.1/service/12.1X47-D15.4/obj-i386/junos/bsd/kernels/VSRX/kernel Build date: 2014-11-12
SNMPv2-MIB::sysObjectID.0 = OID: SNMPv2-SMI::enterprises.2636.1.1.1.2.96
DISMAN-EVENT-MIB::sysUpTimeInstance = Timeticks: (143098) 0:23:50.98
SNMPv2-MIB::sysContact.0 = STRING:
SNMPv2-MIB::sysName.0 = STRING: vsrx
SNMPv2-MIB::sysLocation.0 = STRING: lab
SNMPv2-MIB::sysServices.0 = INTEGER: 4
IF-MIB::ifNumber.0 = INTEGER: 30
IF-MIB::ifIndex.4 = INTEGER: 4
IF-MIB::ifIndex.5 = INTEGER: 5
[...]
```

There are two types of MIBs: scalar and tabular. Scalar objects define a single object instance whereas tabular objects define multiple related object instances grouped in MIB tables.

First we want to monitor sysServices, which is a scalar, so we can specify its OID directly in our YAML file:

```yaml
init_config:

instances:

  - ip_address: 192.168.33.10
    port: 161
    community_string: public
    tags:
      - rack_1

    metrics:
  # If it's just a scalar, specify by OID and name it
      - OID: 1.3.6.1.2.1.1.7
         name: sysServices
```

Now we want to poll metrics coming from a table, the ifTable. It comes from the IF-MIB MIB and gives network interface information: http://www.oidview.com/mibs/0/IF-MIB.html.

First we check we can find this table:

```
$ snmptable -v 2c -c public -Cw 70 -Ci -mALL 192.168.33.10 ifTable

SNMP table: IF-MIB::ifTable

 index ifIndex        ifDescr             ifType      ifMtu    ifSpeed
     4       4            lsi         mplsTunnel       1496          0
     5       5            dsc              other 2147483647          0
     6       6            lo0   softwareLoopback 2147483647          0
     7       7            tap              other 2147483647          0
     8       8            gre             tunnel 2147483647          0
     9       9           ipip             tunnel 2147483647          0
    10      10           pime             tunnel 2147483647          0
    11      11           pimd             tunnel 2147483647          0
    12      12           mtun             tunnel 2147483647          0
    21      21      lo0.16384   softwareLoopback 2147483647          0
    22      22      lo0.16385   softwareLoopback 2147483647          0
   248     248      lo0.32768   softwareLoopback          0          0
   501     501            pp0              other       1532          0
   502     502            irb              other       1514          0
   503     503            st0              other       9192          0
   504     504           ppd0             tunnel 2147483647  800000000
   505     505           ppe0             tunnel 2147483647  800000000
   506     506           vlan     ethernetCsmacd       1518 1000000000
   507     507       ge-0/0/0     ethernetCsmacd       1514 1000000000
   508     508       ge-0/0/1     ethernetCsmacd       1514 1000000000
   509     509     ge-0/0/0.0        propVirtual       1500 1000000000
   516     516       sp-0/0/0              other       9192  800000000
   517     517       gr-0/0/0             tunnel 2147483647  800000000
   518     518       ip-0/0/0             tunnel 2147483647  800000000
   519     519      lsq-0/0/0 pppMultilinkBundle       1504  622080000
   520     520     sp-0/0/0.0        propVirtual       9192  800000000
   521     521       mt-0/0/0             tunnel 2147483647  800000000
   522     522       lt-0/0/0             tunnel 2147483647  800000000
   523     523 sp-0/0/0.16383        propVirtual       9192  800000000
   524     524     ge-0/0/1.0        propVirtual       1500 1000000000

[...]
```

Now we tell the Agent to poll it and to use the value of the ifDescr column as tag, so we can differentiate the ports:

```yaml
init_config:
#    #Specify an additional folder for your custom mib files (python format)
#    mibs_folder: /path/to/your/mibs/folder
#    ignore_nonincreasing_oid: False

instances:

  - ip_address: 192.168.33.10
    port: 161
    community_string: public
    tags:
      - rack_1

    metrics:
  #     # If it's just a scalar, specify by OID and name it
      - OID: 1.3.6.1.2.1.1.7
        name: sysServices
  #     #  query a table and specify
  #     #   - which columns to report as value (symbols)
  #     #   - which columns / indexes to use as tags (metric_tags)
      - MIB: IF-MIB
        table: ifTable
        symbols:
          - ifInOctets
          - ifOutOctets
        metric_tags:
          - tag: interface
            column: ifDescr
```

Note that the column name must be present in the output of snmptable.

Now we [restart the Agent][1] and we make sure that the check is collecting metrics, it can take up to 1 minute to update:

```
$ sudo service datadog-agent info

===================
Collector (v 5.4.2)
===================

[...]

    snmp
    ----
      - instance #0 [OK]
      - Collected 61 metrics, 0 events & 2 service checks
[...]
```

In the Metrics Explorer or a dashboard, we can plot snmp.ifInOctets, filter by device and break it down by port, cf screenshot.

{{< img src="agent/faq/metric_explorer_plot.png" alt="Metric Explorer Plot" responsive="true" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/faq/agent-commands

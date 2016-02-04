---
title: Datadog-SNMP Integration
integration_title: SNMP

kind: integration
newhlevel: true
---

# Overview

Use the SNMP Agent Check to:

* Monitor all your network devices
* Correlate their performance with the rest of your applications

From the open-source Agent:

* [SNMP YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/snmp.yaml.example)
* [SNMP checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/snmp.py)

# Configuration

To use the SNMP checks, edit the **snmp.yaml** file in your **conf.d** directory as follows:

    init_config:
      #You can specify an additional folder for your custom mib files (python format)
      mibs_folder: /path/to/your/mibs/folder

    instances:

      # SNMP v1-v2 configuration
      - ip_address: localhost
        port: 161
        community_string: public
        snmp_version: 2 # Only required for snmp v1, will default to 2
        timeout: 1 # second, by default
        retries: 5
        tags:
          - location:front
        metrics:
          - MIB: UDP-MIB
            symbol: udpInDatagrams
          - MIB: TCP-MIB
            symbol: tcpActiveOpens
          - OID: 1.3.6.1.2.1.6.5
            name: tcpPassiveOpens


For each device that you want to monitor, you need to specify at least an ip_address and an authentication method. If not specified, a default port of 161 will be assumed.

# Usage

Our agent allows you to monitor the SNMP Counters and Gauge of your choice. Specify for each device the metrics that you want to monitor in the ```metrics``` subsection using one of the following methods:

## Specify a MIB and the symbol that you want to export

    metrics:
      - MIB: UDP-MIB
        symbol: udpInDatagrams

## Specify an OID and the name you want the metric to appear under in Datadog

    metrics:
      - OID: 1.3.6.1.2.1.6.5
        name: tcpActiveOpens

*The name here is the one specified in the MIB but you could use any name.*

## Specify a MIB and a table you want to extract information from

    metrics:
      - MIB: IF-MIB
        table: ifTable
        symbols:
          - ifInOctets
        metric_tags:
          - tag: interface
        column: ifDescr

This allows you to gather information on all the table's row, as well as to specify tags to gather.

Use the ```symbols``` list to specify the metric to gather and the ```metric_tags``` list to specify the name of the tags and the source to use.

In this example the agent would gather the rate of octets received on each interface and tag it with the interface name (found in the ifDescr column), resulting in a tag such as ```interface:eth0```

    metrics:
      - MIB: IP-MIB
        table: ipSystemStatsTable
        symbols:
          - ipSystemStatsInReceives
        metric_tags:
          - tag: ipversion
        index: 1

You can also gather tags based on the indices of your row, in case they are meaningful. In this example, the first row index contains the ip version that the row describes (ipv4 vs. ipv6)

## Use your own Mib

To use your own MIB with the datadog-agent, you need to convert them to the pysnmp format. This can be done using the ```build-pysnmp-mibs``` script that ships with pysnmp.

It has a dependency on ```smidump```, from the libsmi2ldbl package so make sure it is installed. Make also sure that you have all the dependencies of your MIB in your mib folder or it won't be able to convert your MIB correctly.

### Run

    $ build-pysnmp-mibs -o YOUR-MIB.py YOUR-MIB.mib

where YOUR-MIB.mib is the MIB you want to convert.

Put all your pysnmp mibs into a folder and specify this folder's path in ```snmp.yaml``` file, in the ```init_config``` section.

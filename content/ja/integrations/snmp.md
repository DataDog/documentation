---
last_modified: 2015/07/07
translation_status: complete
language: ja
title: Datadog-SNMP Integration
integration_title: SNMP Check
kind: integration
doclevel:
sidebar:
  nav:
    - header: SNMP Integration
    - text: SNMP インテグレーションの設定
      href: "#agent"
    - text: 独自Mibの変換
      href: "#convert-mib"
---

<!-- ### Configure the SNMP Agent Check -->

### SNMP インテグレーションの設定


<!-- To use the SNMP checks, add a `snmp.yaml` file to your `conf.d` directory, following [this example](https://github.com/DataDog/dd-agent/blob/master/conf.d/snmp.yaml.example). -->

To use the SNMP checks, add a `snmp.yaml` file to your `conf.d` directory, following [this example](https://github.com/DataDog/dd-agent/blob/master/conf.d/snmp.yaml.example


<!-- For each device that you want to monitor, you need to specify at least an ip_address and an authentication method. If not specified, a default port of 161 will be assumed. -->

For each device that you want to monitor, you need to specify at least an ip_address and an authentication method. If not specified, a default port of 161 will be assumed.


<!-- <p> Our agent allows you to monitor the SNMP Counters and Gauge of your choice. Specify for each device the metrics that you want to monitor in the <code>metrics</code> subsection using one of the following method:</p>
<dl class='snmp'> -->

Our agent allows you to monitor the SNMP Counters and Gauge of your choice. Specify for each device the metrics that you want to monitor in the `metrics` subsection using one of the following method:

<!-- #### Specify a MIB and the symbol that you want to export

    metrics:
        - MIB: UDP-MIB
          symbol: udpInDatagrams

#### Specify an OID and the name you want the metric to appear under in Datadog.

    metrics:
        - OID: 1.3.6.1.2.1.6.5
          name: tcpActiveOpens

*The name here is the one specified in the MIB but you could use any name.*

#### Specify a MIB and a table you want to extract information from.

    metrics:
        - MIB: IF-MIB
          table: ifTable
          symbols:
            - ifInOctets
          metric_tags:
            - tag: interface
              column: ifDescr

This allows you to gather information on all the table's row, as well as to specify tags to gather.
Use the `symbols` list to specify the metric to gather and the `metric_tags` list to specify the name of the tags and the source to use.

In this example the agent would gather the rate of octets received on each interface and tag it with the interface name (found in the ifDescr column), resulting in a tag such as `interface:eth0`

    metrics:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
              index: 1

You can also gather tags based on the indices of your row, in case they are meaningful. In this example, the first row index contains the ip version that the row describes (ipv4 vs. ipv6) -->

#### Specify a MIB and the symbol that you want to export

    metrics:
        - MIB: UDP-MIB
          symbol: udpInDatagrams

#### Specify an OID and the name you want the metric to appear under in Datadog.

    metrics:
        - OID: 1.3.6.1.2.1.6.5
          name: tcpActiveOpens

*The name here is the one specified in the MIB but you could use any name.*

#### Specify a MIB and a table you want to extract information from.

    metrics:
        - MIB: IF-MIB
          table: ifTable
          symbols:
            - ifInOctets
          metric_tags:
            - tag: interface
              column: ifDescr

This allows you to gather information on all the table's row, as well as to specify tags to gather.
Use the `symbols` list to specify the metric to gather and the `metric_tags` list to specify the name of the tags and the source to use.

In this example the agent would gather the rate of octets received on each interface and tag it with the interface name (found in the ifDescr column), resulting in a tag such as `interface:eth0`

    metrics:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
              index: 1

You can also gather tags based on the indices of your row, in case they are meaningful. In this example, the first row index contains the ip version that the row describes (ipv4 vs. ipv6)


<!-- ### Use your own Mib
{: #convert-mib}

To use your own MIB with the datadog-agent, you need to convert them to the pysnmp format. This can be done using the `build-pysnmp-mibs` script that ships with pysnmp.

It has a dependency on `smidump`, from the libsmi2ldbl package so make sure it is installed. Make also sure that you have all the dependencies of your MIB in your mib folder or it won't be able to convert your MIB correctly.

Run

    $ build-pysnmp-mibs -o YOUR-MIB.py YOUR-MIB.mib

where YOUR-MIB.mib is the MIB you want to convert.

Put all your pysnmp mibs into a folder and specify this folder's path in your `snmp.yaml` file, in the `init_config` section.` -->

### 独自Mibの変換
{: #convert-mib}

To use your own MIB with the datadog-agent, you need to convert them to the pysnmp format. This can be done using the `build-pysnmp-mibs` script that ships with pysnmp.

It has a dependency on `smidump`, from the libsmi2ldbl package so make sure it is installed. Make also sure that you have all the dependencies of your MIB in your mib folder or it won't be able to convert your MIB correctly.

Run

    $ build-pysnmp-mibs -o YOUR-MIB.py YOUR-MIB.mib

where YOUR-MIB.mib is the MIB you want to convert.

Put all your pysnmp mibs into a folder and specify this folder's path in your `snmp.yaml` file, in the `init_config` section.`

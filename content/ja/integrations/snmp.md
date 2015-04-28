---
last_modified: 2015/04/17
translation_status: progress
language: ja
title: Datadog-SNMP インテグレーション
integration_title: SNMP チェック
kind: integration
sidebar:
  nav:
    - header: SNMP インテグレーション
    - text: SNMP インテグレーションの設定
      href: "#agent"
    - text: 独自Mibの変換
      href: "#convert-mib"
---

<!-- <h3><a name="agent"></a>Configure the SNMP Agent Check</h3> -->

### SNMP インテグレーションの設定


<!-- <p>To use the SNMP checks, add a <code>snmp.yaml</code> file to your <code>conf.d</code> directory, following <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/snmp.yaml.example">this example</a>.</p> -->

<p>To use the SNMP checks, add a <code>snmp.yaml</code> file to your <code>conf.d</code> directory, following <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/snmp.yaml.example">this example</a>.</p>


<!-- <p>For each device that you want to monitor, you need to specify at least an ip_address and an authentication method. If not specified, a default port of 161 will be assumed.</p> -->

<p>For each device that you want to monitor, you need to specify at least an ip_address and an authentication method. If not specified, a default port of 161 will be assumed.</p>


<!-- <p> Our agent allows you to monitor the SNMP Counters and Gauge of your choice. Specify for each device the metrics that you want to monitor in the <code>metrics</code> subsection using one of the following method:</p>
<dl class='snmp'> -->

<p> Our agent allows you to monitor the SNMP Counters and Gauge of your choice. Specify for each device the metrics that you want to monitor in the <code>metrics</code> subsection using one of the following method:</p>


<dl class='snmp'>
    <dt> Specify a MIB and the symbol that you want to export</dt>
    <dd>
        <span class="hint-icon"><a title="See this MIB's content" href="http://www.net-snmp.org/docs/mibs/udp.html#udpInDatagrams" >&#9758;</a></span>
        <pre><code>metrics:
    - MIB: UDP-MIB
      symbol: udpInDatagrams</code></pre>
    </dd>


    <dt>Specify an OID and the name you want the metric to appear under in Datadog.</dt>
    <dd>
        <span class="hint-icon"><a title="See this MIB's content" href="http://www.net-snmp.org/docs/mibs/tcp.html#tcpPassiveOpens">&#9758;</a></span>
        <pre><code>metrics:
    - OID: 1.3.6.1.2.1.6.5
      name: tcpActiveOpens</code></pre>
    </dd>
    <dd><em>The name here is the one specified in the MIB but you could use any name.</em></dd>


    <dt>Specify a MIB and a table you want to extract information from.</dt>
    <dd>
        <span class="hint-icon"><a title="See this MIB's content" href="http://www.net-snmp.org/docs/mibs/interfaces.html#ifTable">&#9758;</a></span>
        <pre><code>metrics:
    - MIB: IF-MIB
      table: ifTable
      symbols:
        - ifInOctets
      metric_tags:
        - tag: interface
          column: ifDescr</code></pre>
    </dd>
    <dd>This allows you to gather information on all the table's row, as well as to specify tags to gather.
    Use the <code>symbols</code> list to specify the metric to gather and the <code>metric_tags</code> list to specify the name of the tags and the source to use.</dd>
    <dd> In this example the agent would gather the rate of octets received on each interface and tag it with the interface name (found in the ifDescr column), resulting in a tag such as <code>interface:eth0</code></dd>

    <dd style='margin-top:15px;'>
        <span class="hint-icon"><a title="See this MIB's content" href="http://www.net-snmp.org/docs/mibs/ip.html#ipSystemStatsTable">&#9758;</a></span>
        <pre><code>metrics:
    - MIB: IP-MIB
      table: ipSystemStatsTable
      symbols:
        - ipSystemStatsInReceives
      metric_tags:
        - tag: ipversion
          index: 1</code></pre>
    </dd>
    <dd> You can also gather tags based on the indices of your row, in case they are meaningful. In this example, the first row index contains the ip version that the row describes (ipv4 vs. ipv6)</dd>

</dl>

<!-- <h3><a name="convert-mib"></a>Use your own Mib</h3> -->

### 独自Mibの変換
{: #convert-mib}

<p>To use your own MIB with the datadog-agent, you need to convert them to the pysnmp format. This can be done using the <code>build-pysnmp-mibs</code> script that ships with pysnmp.</p>

<p>It has a dependency on <code>smidump</code>, from the libsmi2ldbl package so make sure it is installed. Make also sure that you have all the dependencies of your MIB in your mib folder or it won't be able to convert your MIB correctly.</p>

<p>Run

<pre><code>$ build-pysnmp-mibs -o YOUR-MIB.py YOUR-MIB.mib</code></pre><br/>
where YOUR-MIB.mib is the MIB you want to convert.</p>

<p>Put all your pysnmp mibs into a folder and specify this folder's path in your <code>snmp.yaml</code> file, in the <code>init_config</code> section.</p>

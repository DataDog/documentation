---
last_modified: 2015/07/17
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
    - text: 独自MIBの変換
      href: "#convert-mib"
---

<!-- ### Configure the SNMP Agent Check -->

### SNMP インテグレーションの設定


<!-- To use the SNMP checks, add a `snmp.yaml` file to your `conf.d` directory, following [this example](https://github.com/DataDog/dd-agent/blob/master/conf.d/snmp.yaml.example). -->

SNMP Checkを使用するには、`conf.d`ディレクトリにある`snmp.yaml.example`をコピーし、`snmp.yaml`を追加します。

<!-- For each device that you want to monitor, you need to specify at least an ip_address and an authentication method. If not specified, a default port of 161 will be assumed. -->

デバイスを監視するには、少なくともIP_ADDRESSと認証方法を指定する必要があります。又、アクセスするポート番号の指定がない場合は、デフォルトとして161番ポートを使用します。


<!-- <p> Our agent allows you to monitor the SNMP Counters and Gauge of your choice. Specify for each device the metrics that you want to monitor in the <code>metrics</code> subsection using one of the following method:</p>
<dl class='snmp'> -->

Datadog Agentは、瞬間値や積算値をSNMPから取得出来ます。次に示す方法で監視対象となる`metrics`を、それぞれのデバイスに対して指定してください:





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

##### MIBとエクスポートしたいシンボルを指定します。

    metrics:
        - MIB: UDP-MIB
          symbol: udpInDatagrams

##### OIDとDatadogで使用するメトリクス名を指定します。

    metrics:
        - OID: 1.3.6.1.2.1.6.5
          name: tcpActiveOpens

##### MIBと情報を取得するテーブルを指定します。

    metrics:
        - MIB: IF-MIB
          table: ifTable
          symbols:
            - ifInOctets
          metric_tags:
            - tag: interface
              column: ifDescr

この方法により、テーブルの全行の情報が取得でき、タグ付けすることが出来ます。`symbols`のリストを使って取得するメトリクスを指定し、`metric_tags`のリストを使ってそれらのメトリクスに付与しておくタグを指定します。

この例では、各インターフェイスで受信した通信量のレートを取得し、ifDescr列のインターフェース毎に`interface:eth0`のタグを付与します。

    metrics:
        - MIB: IP-MIB
          table: ipSystemStatsTable
          symbols:
            - ipSystemStatsInReceives
          metric_tags:
            - tag: ipversion
              index: 1

必要に応じて行のインデックスに基づいてタグを付与することも出来ます。この例では、最初の行のインデックスがIPのバージョン（IPv6, IPv4）を見分け、タグ付けするように指定しています。


<!-- ### Use your own Mib
{: #convert-mib}

To use your own MIB with the datadog-agent, you need to convert them to the pysnmp format. This can be done using the `build-pysnmp-mibs` script that ships with pysnmp.

It has a dependency on `smidump`, from the libsmi2ldbl package so make sure it is installed. Make also sure that you have all the dependencies of your MIB in your mib folder or it won't be able to convert your MIB correctly.

Run

    $ build-pysnmp-mibs -o YOUR-MIB.py YOUR-MIB.mib

where YOUR-MIB.mib is the MIB you want to convert.

Put all your pysnmp mibs into a folder and specify this folder's path in your `snmp.yaml` file, in the `init_config` section.` -->

### 独自MIBの変換
{: #convert-mib}

独自のMIBを使用するには、ysnmp形式に変換する必要があります。この変換には、pysnmpのパッケージに含まれている`build-pysnmp-mibs`を使うことが出来ます。

この`build-pysnmp-mibs`を使うには、`smidump`がインストールされている必要があります。従って、`smidump`を包含している`libsmi2ldbl`パッケージが正しくインストールできていることを確認して下さい。更に、MIBが依存している全てのファイルがmibディレクトリに設置されていることも確認して下さい。(依存ファイルがない場合は、正しく変換ができません。)

変換の実行

    $ build-pysnmp-mibs -o YOUR-MIB.py YOUR-MIB.mib

`OUR-MIB.mib`は、変換したいMIBファイルの名前です。

pysmpで変換した全てのmibファイルを任意のフォルダーに移動し、そのフォルダーへのパスを`snmp.yaml`ファイルの`init_config`セクションに指定します。

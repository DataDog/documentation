---
aliases:
- /ja/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
- link: /network_monitoring/devices/glossary
  tag: ドキュメント
  text: NDM の用語と概念
title: NDM トラブルシューティング
---
## 概要 {#overview}

Datadog Network Device Monitoring のトラブルシューティングには、以下の情報を使用してください。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## Datadog にデバイスが表示されない場合 {#device-not-visible-in-datadog}

以下の手順は、Datadog Agent v7.61.0+ を実行していることを前提としています。

[[Devices] (デバイス)][2] ページにデバイスが表示されない場合:

1. [datadog-agent status][3] コマンドを実行し、snmp セクションを探します。このセクションにデバイスの監視用 IP が含まれています。Agent を起動してから、個別に構成されているデバイスを NDM が検出するまでに最大で 1 分ほどかかる場合があります。Agent が多数のデバイスをスキャンするように設定されている場合は、さらに時間がかかることがあります。
出力例は次のようになります。

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

2. デバイスが一覧に表示されておらず、Autodiscovery を使用している場合は、Agent がデバイスに接続できなかった可能性があります。

   - `datadog-agent status` コマンドを実行し、利用可能なすべてのデバイス IP がスキャンされたことが `autodiscovery` セクションで報告されるまで待ちます。大規模なネットワークでは数分かかる場合があります。出力例は次のようになります。

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

   - デバイスの管理 IP に対して `snmp walk` を実行し、Agent がデバイスに接続できない理由を特定してください。

      **注**: CLI 上で直接資格情報を指定してください。資格情報を指定しない場合、Agent は実行中の Agent 構成ファイルで資格情報を検索します。
      
      これらのコマンドの詳細については、使用しているベンダー独自のドキュメントを参照してください。

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

   Agent のインストールディレクトリに移動します。

   ```shell
   cd "c:\Program Files\Datadog\Datadog Agent\bin"
   ```

   SNMP v2 の場合は、以下を実行します。

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 2 -C <community-string> <IP-Address>:<port>
   ```

   SNMP v3 の場合は、以下を実行します。

   ```shell
   "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" snmp walk -v 3 -u <USER> -a <AUTH-PROTOCOL> -A <AUTH-KEY> -x <PRIV-PROTOCOL> -X <PRIV-KEY> <IP-Address>:<port>
   ```

   **注**: 以下のエラーを回避するために、Agent のインストールディレクトリから管理者としてコマンドを実行してください。

   ```shell
   Error: unable to read artifact: open C:\ProgramData\Datadog\auth_token: Access is denied.
   ```

      {{% /tab %}}
      {{< /tabs >}}

## SNMP エラーのトラブルシューティング {#troubleshooting-snmp-errors}

SNMP ステータスまたは Agent の walk コマンドでエラーが表示される場合、次のいずれかの問題が考えられます。

### Permission denied {#permission-denied}

ポートバインド時に Agent のログで permission denied エラーが表示される場合、指定したポート番号には管理者権限が必要な可能性があります。ポート番号が 1024 未満の場合は、[デフォルトの SNMP Trap ポート 162 を使用する][8]を参照してください。

### デバイスに到達できない、または構成が正しくない場合{#unreachable-or-misconfigured-device}

   **エラー例**:
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

   **対処方法**:

   1. デバイスにログインし、SNMP が有効になっていてポート 161 が開放されていることを確認します。
   2. コレクターのファイアウォールが外向き通信を許可しているか確認します。

   3. Linux のみ (オプション):

      `iptables -L OUTPUT` を実行し、deny ルールが存在しないことを確認します。

      ```shell
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. コミュニティ文字列が正しいかどうか確認します。

### SNMPv2 資格情報の誤り{#incorrect-snmpv2-credentials}

   **エラー例**:
   ```
   Error: an authentication method needs to be provided
   ```

   **対処方法**:

   SNMPv2 を使用している場合は、コミュニティ文字列が設定されていることを確認します。

### SNMPv3 プライバシープロトコルの誤り{#incorrect-snmpv3-privacy-protocol}

   **エラー例**:
   ```
   Error: check device reachable: failed: decryption error; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: decryption error; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: decryption error
   ```

   または

   ```
   Error: check device reachable: failed: wrong digest; failed to autodetect profile: failed to fetch sysobjectid: cannot get sysobjectid: wrong digest; failed to fetch values: failed to fetch scalar oids with batching: failed to fetch scalar oids: fetch scalar: error getting oids `[1.3.6.1.2.1.1.1.0 1.3.6.1.2.1.1.2.0 1.3.6.1.2.1.1.3.0 1.3.6.1.2.1.1.5.0]`: wrong digest
   ```

   **対処方法**:

   以下の SNMPv3 構成パラメーターが正しいことを確認してください。
   - user
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### トラップやフローがまったく受信されない場合{#traps-or-flows-not-being-received-at-all}

SNMP トラップや NetFlow トラフィックが欠落している場合、一般的な原因として、UDP パケットが Agent に到達する前にファイアウォールルールによってブロックされていることが挙げられます。SNMP トラップと NetFlow はどちらも UDP に依存しており、[datadog.yaml][9] 構成で定義されたポートを使用します。

<div class="alert alert-info">Uncomplicated Firewall (UFW) のようなローカルファイアウォールは、許可設定で構成されている場合でもトラフィックをブロックすることがあります。システムログで、ブロックされたパケットのエントリをチェックしてください。これは通常、トラフィックがネットワークインターフェイスには到達したものの、オペレーティングシステムに到達する前にブロックされたことを示しています。</div>

以下のプラットフォーム固有のコマンドを使用して、トラフィックが Agent に到達するのをブロックしている可能性があるファイアウォールルールをチェックします。

{{< tabs >}}
{{% tab "Linux" %}}

Linux には、`iptables`、`nftables`、`ufw` など、複数の種類のファイアウォールが存在します。どれを使用しているかに応じて、以下のコマンドを使用できます。

- `sudo iptables -S`

- `sudo nft list ruleset`

- `sudo ufw status`

構成したポートで UDP トラフィックをブロックしているルールがないかチェックしてください。

{{% /tab %}}
{{% tab "Windows" %}}

バージョン `7.67` 以降、Agent の `agent.exe diagnose` コマンドにより、ブロックしているファイアウォールルールが自動的にチェックされ、見つかった場合は警告が表示されます。

ファイアウォールルールを手動で検査するには、次のコマンドを実行します。

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

以下の条件に該当するルールを探します。
- **Direction** が inbound である
- **Protocol** が UDP である
- **LocalPort** が構成したポートのいずれかと一致する

{{% /tab %}}
{{% tab "MacOS" %}}

以下のコマンドを実行して、Packet Filter (pf) ルールを確認します。

```shell
sudo pfctl -sr
```

構成したポートで UDP トラフィックをブロックしているルールがないかチェックしてください (例: `block drop in proto udp from any to any port = <CONFIG_PORT>`)。
{{% /tab %}}
{{< /tabs >}}

### デバイスからトラップが受信されない場合{#traps-not-being-received-for-devices}

1. Datadog の `agent.log` ファイルを確認し、トラップ用ポートにバインドできているかを確認してください。以下のエラーは、トラップ用ポートにバインドできていないことを示しています。

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **対処方法**:
   Agent バイナリに net bind の機能を追加し、予約済みポートにバインドできるようにします。

   ```shell
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

### トラップの形式が不正{#traps-incorrectly-formatted}

1. NDM のトラブルシューティングダッシュボードに移動します。

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="NDM トラブルシューティングダッシュボードが強調表示された [Dashboard] (ダッシュボード) ドロップダウンを示す Network Device Monitoring のページ。" style="width:80%;" >}}

2. [Traps] (トラップ) ウィジェットまでスクロールし、[{{< ui >}}Traps incorrectly formatted{{< /ui >}}] (トラップの形式が不正) グラフを確認します。これが 0 以外の場合は、NDM コレクター側とデバイス側の認証設定またはトラップ設定が一致していない可能性があります。

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="[Traps] ウィジェットセクションを表示している NDM トラブルシューティングダッシュボード。" style="width:100%;" >}}

   **対処方法**:

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


[1]: /ja/help
[2]: https://app.datadoghq.com/devices
[3]: /ja/agent/configuration/agent-commands/#agent-information
[4]: /ja/api/latest/network-device-monitoring/
[5]: /ja/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /ja/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /ja/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /ja/network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162
[9]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
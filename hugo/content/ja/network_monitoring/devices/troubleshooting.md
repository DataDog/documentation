---
aliases:
- /ja/network_performance_monitoring/devices/troubleshooting/
further_reading:
- link: https://www.datadoghq.com/blog/monitor-snmp-with-datadog/
  tag: ブログ
  text: Datadog での SNMP モニタリング
title: NDM トラブルシューティング
---

## 概要

Datadog Network Device Monitoring のトラブルシューティングには、以下の情報を使用してください。さらにヘルプが必要な場合は、[Datadog サポート][1]にお問い合わせください。

### Datadog にデバイスが表示されない場合

以下の手順は、Datadog Agent v7.61.0+ を実行していることを前提としています。

[Devices][2] ページにデバイスが表示されない場合:

1. [datadog-agent status][3] コマンドを実行し、snmp セクションを探します。このセクションにはデバイスの監視用 IP が含まれます。Agent を起動してから、個別に設定されているデバイスを NDM が検出するまで最大で 1 分ほどかかる場合があります。Agent が大量のデバイスをスキャンする設定になっている場合は、さらに時間がかかる可能性があります。
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

2. デバイスが一覧に表示されておらず、オートディスカバリーを使用している場合は、Agent がデバイスに接続できなかった可能性があります。

   - `datadog-agent status` コマンドを実行し、`autodiscovery` セクションで利用可能なすべてのデバイス IP がスキャンされたことが報告されるまで待ちます。大規模なネットワークでは数分かかる場合があります。出力例は次のようになります。

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

    オートディスカバリーが完了してもデバイスが [Devices][2] ページに表示されない場合は、Agent がデバイスに接続できなかったことを意味します。

   - デバイスの管理 IP に対して `snmp walk` を実行し、Agent がデバイスに接続できない理由を特定してください。

   **注**: CLI 上で直接資格情報を指定してください。資格情報を指定しない場合、Agent は実行中の Agent コンフィギュレーションファイルから認証情報を検索します。

   **Linux**: <br />
     SNMP v2:
     ```
     sudo -u dd-agent datadog-agent snmp walk <IP Address> -C <COMMUNITY_STRING>
     ```
     SNMP v3:
      ```
      sudo -u dd-agent datadog-agent snmp walk <IP Address> -A <AUTH_KEY> -a <AUTH_PROTOCOL> -X <PRIV_KEY> -x <PRIV_PROTOCOL>
      ```
      **Windows**:
      ```
      agent snmp walk <IP Address>[:Port]

      Example:
      agent.exe snmp walk  10.143.50.30 1.3.6
      ```

   これらのコマンドの詳細については、使用しているベンダー独自のドキュメントを参照してください。

### SNMP エラーのトラブルシューティング

SNMP ステータスまたは Agent の walk コマンドでエラーが表示される場合、次のいずれかの問題が考えられます。

#### Permission denied

ポートバインド時に Agent のログで permission denied エラーが表示される場合、指定したポート番号には管理者権限が必要な可能性があります。ポート番号が 1024 未満の場合は、[デフォルトの SNMP Trap ポート 162 を使用する][8]を参照してください。

#### デバイスに到達できない、または設定が正しくない場合

**エラー例**:
   ```plaintext
   Error: check device reachable: failed: error reading from socket: read udp 127.0.0.1:46068->1.2.3.4:161
   ```

**対処方法**:

   1. デバイスにログインし、SNMP が有効になっていてポート 161 が開放されていることを確認します。
   2. コレクターのファイアウォールが外向き通信を許可しているか確認します。

   3. Linux のみ (オプション)

      `iptables -L OUTPUT` を実行し、deny ルールが存在しないことを確認します。

      ```
      vagrant@agent-dev-ubuntu-22:~$ sudo iptables -L OUTPUT
      Chain OUTPUT (policy ACCEPT)
      target     prot opt source               destination
      DROP       all  --  anywhere             10.4.5.6
      ```
   3. コミュニティ文字列が正しいかどうか確認します。

#### SNMPv2 資格情報の誤り

**エラー例**:
   ```
   Error: an authentication method needs to be provided
   ```

**対処方法**:

SNMPv2 を使用している場合は、コミュニティ文字列が設定されていることを確認します。

#### SNMPv3 プライバシープロトコルの誤り

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
   - ユーザー
   - authKey
   - authProtocol
   - privKey
   - privProtocol

### デバイスからトラップが受信されない場合

1. Datadog の `agent.log` ファイルを確認し、トラップ用ポートにバインドできているかを確認してください。以下のエラーは、トラップ用ポートにバインドできないことを示します。

   ```
   Failed to start snmp-traps server: error happened when listening for SNMP Traps: listen udp 0.0.0.0:162: bind: permission denied
   ```

   **対処方法**:
   Agent バイナリに net bind の機能を追加し、予約済みポートにバインドできるようにします。

   ```
   sudo setcap 'cap_net_bind_service=+ep' /opt/datadog-agent/bin/agent/agent
   ```

#### トラップの形式が不正

1. NDM のトラブルシューティングダッシュボードに移動します。

   {{< img src="/network_device_monitoring/troubleshooting/ndm_troubleshooting_dashboard.png" alt="Network Device Monitoring のページでダッシュボードのドロップダウンが表示され、その中の NDM トラブルシューティング ダッシュボードがハイライトされている。" style="width:80%;" >}}

2. Traps ウィジェットまでスクロールし、**Traps incorrectly formatted** グラフを確認します。これが 0 以外の場合は、NDM コレクター側とデバイス側の認証設定またはトラップ設定が一致していない可能性があります。

   {{< img src="/network_device_monitoring/troubleshooting/ndm_traps_dashboard.png" alt="NDM トラブルシューティング ダッシュボードの画面で、Traps ウィジェットセクションが表示されている。" style="width:100%;" >}}

   **対処方法**:

   `datadog.yaml` ファイルで設定されている内容が、トラップを送信しているデバイス側の設定と一致しているか確認してください。

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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/help
[2]: https://app.datadoghq.com/devices
[3]: /ja/agent/configuration/agent-commands/#agent-information
[4]: /ja/api/latest/network-device-monitoring/
[5]: /ja/api/latest/network-device-monitoring/#get-the-list-of-interfaces-of-the-device
[6]: /ja/api/latest/network-device-monitoring/#get-the-list-of-tags-for-a-device
[7]: /ja/api/latest/network-device-monitoring/#update-the-tags-for-a-device
[8]: /ja/network_monitoring/devices/snmp_traps/#using-the-default-snmp-trap-port-162
---
description: NDM でデバイスの構成変更を表示および比較します。
further_reading:
- link: /network_monitoring/devices/config_management_rollback
  tag: ドキュメント
  text: Network Configuration Management のロールバック
- link: /network_monitoring/devices/troubleshooting
  tag: ドキュメント
  text: NDM トラブルシューティング
- link: https://www.datadoghq.com/blog/end-to-end-network-operations-with-bits/
  tag: ブログ
  text: Datadog を使用して L7 から L1 までのネットワーク問題を解決する
site_support_id: network_config_management
title: Network Configuration Management
---
## 概要 {#overview}

Network Configuration Management (NCM) は、[Network Device Monitoring (NDM)][1] を拡張し、構成の認識と変更の追跡を追加します。これにより、次のことが可能になります。

- デバイスの構成が時間の経過とともにどのように変化するかを監視する
- 2 つの構成バージョンを並べて比較する
- AI が生成した要約を使用して、インシデント発生時の変更内容とその潜在的な影響を把握する
- [デバイスを以前の構成にロールバックする][8]

{{< img src="/network_device_monitoring/config_mgmt/network_device_config_ndm_view.png" alt="最新の構成と変更内容の AI サマリーが表示されている、Network Device Management の構成タブ。" style="width:100%;" >}}

## 前提条件 {#prerequisites}

- [Network Device Monitoring][3] (NDM) がデバイス上で構成されている必要があります。

## セットアップ {#setup}

1. `conf.d/network_config_management.d/` における Agent のルート構成ディレクトリで `conf.yaml` ファイルを作成し、次のように構成します。

   ```yaml
   init_config:
     ## @param namespace - string - optional - default: default
     ## The namespace should match namespaces of devices being monitored
     namespace: default
     ## @param min_collection_interval - integer - optional - default: 900 (15 minutes)
     min_collection_interval: 900
     ## @param ssh - object - optional
     ## Global SSH configuration that applies to all device instances unless 
     ## overridden at the device level. 
     ssh:
       ## @param timeout - duration - optional - default: 30 (seconds)
       ## Maximum time for the SSH client to establish a TCP connection.
       timeout: 30
       ## @param known_hosts_path - string - required (unless insecure_skip_verify is true)
       ## Path to the known_hosts file containing public keys of servers to 
       ## verify the identity of remote hosts. Required for secure connections.
       known_hosts_path: /path/to/known_hosts
       ## @param insecure_skip_verify - boolean - optional - default: false
       ## Skip host key verification. This is INSECURE and should only be used
       ## for development/testing purposes.
       insecure_skip_verify: false 
   instances:
     ## ip_address - string - required
     ## The IP address of the network device to collect configurations from.
   - ip_address: <IP_ADDRESS>
     ## @param auth - object - required
     ## Authentication credentials to connect to the network device.
     auth:
       ## @param username - string - required
       ## Username to authenticate to the network device.
       username: <USERNAME>
       ## @param password - string - required (if private_key_file is not provided)
       ## Password to authenticate to the network device.
       ## Used as a fallback after private key authentication if both are provided.
       password: <PASSWORD>
       ## @param private_key_file - string - optional
       ## Path to the SSH private key file for authentication.
       ## At least one of password or private_key_file must be provided.
       private_key_file: /path/to/private_key
   ```

2. オプションとして、デバイスで特定の SSH アルゴリズムが必要な場合は、次の構成を使用します。

   ```yaml
   init_config:
     ## To confirm a possible value of algorithms, see the constants described in the golang document.
     ## https://pkg.go.dev/golang.org/x/crypto/ssh#pkg-constants
     ##
     ## @param ciphers - list of strings - optional
     ## List of SSH encryption ciphers to use for the connection.
     ## If not specified, the SSH library will use its default ciphers.
     ssh:
       ciphers: [aes128-gcm@openssh.com, aes128-ctr, aes192-ctr]
       key_exchanges: [diffie-hellman-group14-sha256, ecdh-sha2-nistp256]
       host_key_algorithms: [ssh-ed25519]
   ```
   
3. Agent を再起動して、構成への変更を適用します。

## 構成の表示 {#viewing-configurations}

Network Configuration Management は、Network Device Monitoring の NDM デバイスビューからアクセスできます。

1. [Network Device Monitoring][3] に移動します。
2. デバイスリスト、または [Device Geomap][4] や [Device トポロジー][5]マップなどの NDM の可視化からデバイスを選択します。
3. NDM デバイスビューの {{< ui >}}Configuration{{< /ui >}} タブを開きます。

   {{< img src="/network_device_monitoring/config_mgmt/config_tab.png" alt="構成タブが強調表示された NDM デバイスビュー。" style="width:100%;" >}}

   構成タブでは、構成リストに表示する内容をフィルタリングできます。
   - {{< ui >}}All{{< /ui >}}: 実行およびスタートアップ構成の両方を表示する
   - {{< ui >}}Running{{< /ui >}}: デバイス上で実行されているアクティブなライブ構成
   - {{< ui >}}Startup{{< /ui >}}: デバイス起動時に読み込まれる保存済み構成

### 時間ピッカーと保持期間 {#time-picker-and-retention}

ページ上部の時間コントロールを使用して、表示する構成履歴を選択できます。この範囲を拡張して、保持制限 (1 年) までの古いバージョンを表示できます。

タイムラインと構成バージョンリストは、選択したタイムレンジに基づいて自動的に更新されます。

**注**: 構成履歴は、アカウントで NCM が有効になった時点から開始されます。有効化以前の履歴データは利用できません。

### 特定の時点における構成を表示する {#view-a-configuration-at-a-point-in-time}

タイムラインまたはリストから構成イベントを選択すると、その時点のデバイスの状態を示す単一の構成ビューが開きます。

単一の構成ビューには以下が表示されます。

- 選択されたタイムスタンプの完全な構成
- 時刻やデバイス ID を含むデバイスメタデータ

構成をスクロールしてインシデント発生時のデバイス状態を調査したり、タイムレンジを調整して異なる期間の構成を表示したりできます。

### 構成バージョンを比較する {#compare-configuration-versions}

構成バージョン間の変更点を確認するには、以下の手順を実行します。

1. 履歴リストまたはチェックボックスを使用したタイムラインから 2 つの構成を選択します。
2. {{< ui >}}Compare Two Configs{{< /ui >}} をクリックして比較ビューを開きます。

   {{< img src="/network_device_monitoring/config_mgmt/compare_two_configs_3.png" alt="2 つの構成を比較するオプションが強調表示された Network Device Management の構成タブ。" style="width:100%;" >}}

比較ビューでは、両方の構成が並べて表示され、変更された行がインライン差分で強調表示されます。比較画面を閉じずに異なる構成ペアを切り替えることができます。

   {{< img src="/network_device_monitoring/config_mgmt/config_screen_split_3.png" alt="分割ビューで 2 つのバージョンを比較する Network Device Management タブ" style="width:90%;" >}}

### 以前の構成にロールバックする {#roll-back-to-a-previous-configuration}

構成の変更によって問題が発生した場合、Datadog から直接デバイスを以前の構成に復元できます。ロールバックでは、プライベートアクションランナーを使用して、選択した構成をデバイスに復元します。

セットアップと使用手順については、[Network Configuration Management Rollbacks][8] を参照してください。

## AI サマリー {#ai-summaries}

Network Configuration Management には、構成の変更を自然言語の説明に変換する AI 搭載の概要パネルが含まれています。

2 つの構成バージョンを比較すると、AI サマリーは自動的に次のことを行います。

- 変更内容を人間が理解できる用語で説明する
- インシデント調査やリスク分析に関連する可能性のある変更を強調表示する

## サポートされているデバイスプロファイル {#supported-device-profiles}

NCM は、デバイスプロファイルを使用して SSH 経由でネットワークデバイスから構成を収集します。プロファイルは Datadog Agent にバンドルされており、デバイスのオペレーティングシステムに基づいて自動的に照合され、Agent のリリースを通じて更新されます。

| ベンダー | OS | プロファイル | 最小Agent バージョン | 実行中 | スタートアップ |
|---|---|---|---|---|---|
| Arista | EOS | `eos` | 7.77.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-CX | `aoscx` | 7.76.0 | {{< X >}} | {{< X >}} |
| Aruba | AOS-W | `aosw` | 7.75.0 | {{< X >}} | |
| Cisco | IOS | `cisco-ios` | 7.73.0 | {{< X >}} | {{< X >}} |
| Cisco | NX-OS | `nxos` | 7.76.0 | {{< X >}} | {{< X >}} |
| Dell | DellOS10 | `dellos10` | 7.77.0 | {{< X >}} | {{< X >}} |
| F5 | TMOS | `tmos` | 7.76.0 | {{< X >}} | |
| FortiGate | FortiOS | `fortios` | 7.77.0 | {{< X >}} | |
| Juniper | JunOS | `junos` | 7.74.0 | {{< X >}} | |
| Palo Alto | PAN-OS | `pan-os` | 7.75.0 | {{< X >}} | |

### 構成取得コマンド {#configuration-retrieval-commands}

各プロファイルは、SSH 経由でデバイス構成を収集するために以下のコマンドを使用します。コマンドの完全な定義については、[default_profiles.go][9] を参照してください。

| ベンダー | OS | 実行構成コマンド | スタートアップ構成コマンド |
|---|---|---|---|
| Arista | EOS | `show running-config \| no-more \| exclude ! Time:` | `show startup-config \| no-more \| exclude ! Time:` |
| Aruba | AOS-CX | `show running-config` | `show startup-config` |
| Aruba | AOS-W | `show running-config` | |
| Cisco | IOS | `show running-config` | `show startup-config` |
| Cisco | NX-OS | `show running-config` | `show startup-config` |
| Dell | DellOS10 | `show running-configuration` | `show startup-configuration` |
| F5 | TMOS | `cat /config/partitions/*/bigip*.conf` | |
| FortiGate | FortiOS | `show full-configuration` | |
| Juniper | JunOS | `show configuration \| display omit` | |
| Palo Alto | PAN-OS | `show config running` | |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/devices/
[2]: /ja/network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /ja/network_monitoring/devices/geomap
[5]: /ja/network_monitoring/devices/topology
[6]: /ja/network_monitoring/devices/supported_devices#vendor-profiles
[7]: https://github.com/DataDog/datadog-agent/tree/main/cmd/agent/dist/conf.d/network_config_management.d/
[8]: /ja/network_monitoring/devices/config_management_rollback
[9]: https://github.com/DataDog/datadog-agent/blob/main/pkg/networkconfigmanagement/profile/default_profiles.go
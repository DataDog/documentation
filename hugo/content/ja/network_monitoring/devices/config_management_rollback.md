---
description: NDM からネットワークデバイスを以前の構成にロールバックします。
further_reading:
- link: /network_monitoring/devices/config_management
  tag: ドキュメント
  text: Network Configuration Management
- link: /actions/private_actions/
  tag: ドキュメント
  text: プライベートアクションランナー
title: Network Configuration Management のロールバック
---
## 概要 {#overview}

Network Configuration Management (NCM) のロールバックを使用すると、Datadog から直接ネットワークデバイスを以前の構成に復元できます。ロールバックでは、[PAR (プライベートアクションランナー)][1] を使用して、選択した構成を再度デバイスに適用します。

ロールバックは、以下のベンダーおよびプラットフォームでサポートされています。

- Cisco IOS
- Arista (EOS)

## 前提条件 {#prerequisites}

- [Network Configuration Management][2] がデバイスに対して設定されている必要があります。
- Datadog Agent がバージョン `7.83.0` 以降である必要があります。
- Agent の IPC ポート (デフォルトは `5001`) が到達可能な[プライベートアクションランナー][1] (同一ホスト上またはネットワーク経由)。

## セットアップ {#setup}

### Agent {#agent}

1. ロールバックを有効にするには、`datadog.yaml` に以下を追加します。

   ```yaml
   network_devices:
     config_management:
       rollback:
         enabled: true
   ```

   または、`network_devices.config_management.rollback.enabled` 構成オプションを `true` に設定します。

2. `conf.d/network_config_management.d/conf.yaml` で、必要に応じて、Agent が構成インベントリを報告する頻度を設定します。

   ```yaml
   init_config:
     ## @param inventory_report_max_interval - integer - optional - default: 3600 (1 hour)
     ## Maximum interval, in seconds, between inventory reports.
     inventory_report_max_interval: 3600
   ```

3. 必要に応じて、ロールバック対象の構成を保持するローカルストアを構成します。

   ```yaml
   init_config:
     store:
       ## @param min_configs_per_device - integer - optional - default: 2
       ## Minimum number of configurations to retain per device, regardless of age.
       min_configs_per_device: 2
       ## @param max_configs_per_device - integer - optional - default: 24
       ## Maximum number of configurations to retain per device before older ones are evicted.
       max_configs_per_device: 24
       ## @param max_raw_config_store_bytes - integer - optional - default: 2000000000 (2 GB)
       ## Maximum size, in bytes, of the local configuration store before older configurations are evicted.
       max_raw_config_store_bytes: 2000000000
   ```

4. Agent プロセスには、ロールバックデータがローカルに保存される、`run_path` ディレクトリへの書き込みアクセス権が必要です。

5. Agent を再起動して、構成への変更を適用します。

### プライベートアクションランナー {#private-action-runner}

1. Agent の IPC ポートが到達可能なホスト上で[プライベートアクションランナーをセットアップ][1]します。
2. `/etc/datadog-agent/datadog.yaml` の `private_action_runner.actions_allowlist` セクションに `com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` を追加します。詳細については、「[ランナーの許可リストを変更する][3]」を参照してください。
3. Datadog にランナーを登録し、実行グループに割り当てます。そのグループ内で、`com.datadoghq.remoteaction.networkconfigmanagement.rollbackConfig` アクションを許可するポリシーを作成します。
   - このポリシーは、[`NCM Device Config Write`] (NCM デバイス構成書き込み) ロールを持つユーザーに [`Editor`] (編集者) アクセス権を付与する必要があります。

   {{< img src="/network_device_monitoring/config_mgmt/execution_group_policy.png" alt="実行グループポリシーに NCM 書き込みロールを追加する方法を示すスクリーンショット" style="width:100%;" >}}

### 権限 {#permissions}

ロールバックでは、以下の NCM 権限を使用します。

| 権限 | 許可される操作 |
|---|---|
| NCM 読み取り | デバイス構成の表示 |
| NCM 書き込み | ロールバックのトリガー |


## ロールバックをトリガーする {#trigger-a-rollback}

1. NDM デバイスビューで、デバイスの [[Configuration] (構成) タブ][2]に移動します。
2. ロールバックする対象の構成バージョンを選択します。サイドパネルに、そのバージョンの [{{< ui >}}Rollback{{< /ui >}}] (ロールバック) ボタンが表示されます。
3. [{{< ui >}}Rollback{{< /ui >}}] をクリックして、確認モーダルで差分を確認します。
4. もう一度 [{{< ui >}}Rollback{{< /ui >}}] をクリックして確定します。

   {{< img src="/network_device_monitoring/config_mgmt/config_rollback.png" alt="ロールバックが開始された日時と、ロールバックの結果何が起こるかを示すスクリーンショット" style="width:100%;" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/
[2]: /ja/network_monitoring/devices/config_management/#viewing-configurations
[3]: /ja/actions/private_actions/set_up_agent_based/?tab=linux#change-the-allowlist
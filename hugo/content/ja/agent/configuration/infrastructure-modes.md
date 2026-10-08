---
algolia:
  tags:
  - infrastructure modes
description: ホスト上で Datadog Agent が実行するインフラストラクチャーモニタリングの量を制御するために、Agent の動作を変更します。
further_reading:
- link: /agent/configuration/agent-configuration-files/
  tag: ガイド
  text: Agent 構成ファイル
- link: /agent/guide/upgrade/
  tag: ガイド
  text: Datadog Agent のアップグレード
private: true
title: インフラストラクチャーモード
---
## 概要 {#overview}

インフラストラクチャーモードによって、Datadog Agent がホスト上で有効にするインフラストラクチャー監視機能が決まります。これらのモードを使用して、Agent の動作をホストの役割に合わせます。完全な Infrastructure Monitoring、基本的なシステムリソースメトリクス、Infrastructure Monitoring なし、または End User Device Monitoring から選択できます。

## 利用可能なモード {#available-modes}

Agent は 4 つのインフラストラクチャーモードをサポートしています。チェックマーク ({{< X >}}) は、そのモードで機能を利用できることを示します。

| 機能 | [Full](#full) (デフォルト) | [Basic](#basic) | [End User Device](#end-user-device) | [なし](#none) |
|------------|-------------------------|-----------------|-------------------------------------|---------------|
| システムリソースメトリクス | {{< X >}} | {{< X >}} | {{< X >}} | |
| インフラストラクチャーインテグレーション | {{< X >}} (すべて) | {{< X >}} ([限定セット](#basic)) | {{< X >}} | |
| Container Monitoring | {{< X >}} | | | |
| Live Processes | {{< X >}} | | {{< X >}} | |
| カスタムチェックおよびログ専用のインテグレーション | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| カスタムメトリクス | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| インフラストラクチャーダッシュボードに表示 | {{< X >}} | {{< X >}} | | |

### フル {#full}

`full`
: **デフォルト**: はい<br>
**最小 Agent バージョン**: 7.73.0<br>
**推奨用途**: ほとんどのユースケース<br>
: Agent はシステムリソースメトリクスとプロセスデータを収集し、すべてのインフラストラクチャーインテグレーションを実行して、Container Monitoring と Live Processes をサポートします。`infrastructure_mode` の値を設定していない場合、Agent は `full` モードで実行されます。

### Basic {#basic}

`basic`
: **最小 Agent バージョン**: 7.73.0 (Linux、macOS)、7.76.2 (Windows)<br>
**推奨用途**: システムリソースメトリクスのみが必要な VM および物理サーバー<br>
: Agent はシステムリソースメトリクス (CPU、メモリ、ディスク、ネットワーク) と、限定的なプロセスおよびサービスデータを収集します。次のインテグレーションのみが実行されます。
  - [Cisco ACI][25] (7.78+)
  - [Cisco SD-WAN][26] (7.78+)
  - [ディレクトリ][3] (7.80+)
  - [Disk][2]
  - [Network][4]
  - [NTP][5]
  - [プロセス][6]
  - [SNMP][28] (7.78+)
  - [System チェック][1]
  - [Systemd][7]
  - [Versa][27] (7.78+)
  - [Windows Certificate Store][8] (7.80+)
  - [Windows Crash Detection][9]
  - [Windows Event Log][17]
  - [Windows Kernel Memory][10]
  - [Windows Performance Counters][11] (7.80+)
  - [Windows Registry][12] (7.80+)
  - [Windows Services][13]
  - [WMI Check][14] (7.80+)
  - `custom_` というプレフィックスが付いた [カスタムチェック][15]

### End User Device {#end-user-device}

<div class="alert alert-info">End User Device モードはプレビュー版です。構成手順とアクセスのリクエストについては、<a href="/infrastructure/end_user_device_monitoring/">End User Device Monitoring</a> を参照してください。</div>

`end_user_device`
: **最小 Agent バージョン**: 7.76.2<br>
**推奨対象**: 従業員のデスクトップ、ノートパソコン、ワークステーション<br>
: Agent には、Container Monitoring を除く [Full モード](#full)のすべての機能に加えて、次の機能が含まれます。
  - Device Performance Monitoring
  - ログの収集
  - Wi-Fi モニタリング
  - Windows Crash Detection
  - Network Path Monitoring

: 詳細な説明については、[主な機能][18] を参照してください。

### なし {#none}

`none`
: **最小 Agent バージョン**: 7.77.0<br>
**推奨対象**: [Log Management][19]、[APM][20]、または [Error Tracking][21] のみを使用するように構成されたホスト<br>
: Agent はインフラストラクチャーメトリクスを収集せず、インフラストラクチャーインテグレーションも実行しません。カスタムメトリクス、`custom_` というプレフィックスが付いた [カスタムチェック][15]、および [journald][16] や [Windows Event Log][17] などのログ専用インテグレーションは引き続き使用できます。
: `none` モードのホストは、Agent が引き続き Datadog にメタデータを送信するため、[Fleet Automation][22] の {{< ui >}}View Agents{{< /ui >}} タブに表示されます。ただし、これらのホストは、インフラストラクチャーメトリクスに依存するインフラストラクチャーダッシュボードやクエリには表示されません。

## Agent インフラストラクチャーモードの構成 {#configure-agent-infrastructure-mode}

### 新規ホスト{#new-hosts}

Agent を初めてインストールするときにインフラストラクチャーモードを構成するには、インストールスクリプトを呼び出す前に `DD_INFRASTRUCTURE_MODE=<MODE>` 環境変数を設定します。

{{< tabs >}}
{{% tab "Linux" %}}
次のコマンドで、`<API_KEY>` を組織の [Datadog API キー](https://app.datadoghq.com/organization-settings/api-keys)に、`<DD_SITE>` を **{{< region-param key="dd_site" >}}** に、`<MODE>` を `full`、`basic`、`end_user_device`、または `none` に置き換えます。

```shell
DD_API_KEY="<API_KEY>" \
DD_SITE="<DD_SITE>" \
DD_INFRASTRUCTURE_MODE="<MODE>" \
bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```
{{% /tab %}}
{{% tab "Windows" %}}
次のコマンドで、`<API_KEY>` を組織の [Datadog API キー](https://app.datadoghq.com/organization-settings/api-keys)に、`<DD_SITE>` を **{{< region-param key="dd_site" >}}** に、`<MODE>` を `full`、`basic`、`end_user_device`、または `none` に置き換えます。

```powershell
$p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<API_KEY>" SITE="<DD_SITE>" DD_INFRASTRUCTRURE_MODE="<MODE>"'
if ($p.ExitCode -ne 0) {
  Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red
}
```
{{% /tab %}}
{{< /tabs >}}

### 既存のホスト {#existing-hosts}

既存のホストのインフラストラクチャーモードを設定するには、次の手順を実行します。

1. [Agent 構成ファイル][23] を開き、ルートレベルに `infrastructure_mode` を追加します。`<MODE>` を `full`、`basic`、`end_user_device`、または `none` に置き換えます。

    {{< code-block lang="yaml" filename="datadog.yaml" disable_copy="true"
      collapsible="true" >}}
infrastructure_mode: <MODE>
    {{< /code-block >}}

2. [Datadog Agent を再起動][24] します。

## インフラストラクチャーモードの確認 {#verify-infrastructure-mode}

ホストに設定されているインフラストラクチャーモードを確認するには、次の手順を実行します。

1. [Fleet Automation][22] に移動し、{{< ui >}}View Agents{{< /ui >}} (エージェントの表示) タブをクリックします。
1. {{< ui >}}Group by{{< /ui >}} (グループ化) ドロップダウンから {{< ui >}}Infrastructure Mode{{< /ui >}} (インフラストラクチャーモード) を選択します。
1. モードグループをクリックして展開し、含まれているホストを確認します。
1. 必要に応じて、検索バーを使用して特定のホスト名 (例: `hostname:worker1`) に絞り込みます。

{{< img src="agent/configuration/fa_group_by_infra_mode-1.png" alt="[Group by] ドロップダウンで [Infrastructure Mode] を選択し、311 台のホストを含む [Full] グループを展開した Fleet Automation の [View Agents] ページ。[Hostname] (ホスト名)、[Agent]、[OTEL]、[Integrations] (インテグレーション)、[Services] (サービス)、[Remote Configuration Status] (リモート構成ステータス) の各列が表示されています。" style="width:90%" >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/system/
[2]: /ja/integrations/disk/
[3]: /ja/integrations/directory/
[4]: /ja/integrations/network/
[5]: /ja/integrations/ntp/
[6]: /ja/integrations/process/
[7]: /ja/integrations/systemd/
[8]: /ja/integrations/windows-certificate/
[9]: /ja/integrations/wincrashdetect/
[10]: /ja/integrations/winkmem/
[11]: /ja/integrations/windows-performance-counters/
[12]: /ja/integrations/windows-registry/
[13]: /ja/integrations/windows-service/
[14]: /ja/integrations/wmi/
[15]: /ja/extend/custom_checks/
[16]: /ja/integrations/journald/
[17]: /ja/integrations/event-viewer/
[18]: /ja/infrastructure/end_user_device_monitoring/#key-capabilities
[19]: /ja/logs/
[20]: /ja/tracing/
[21]: /ja/error_tracking/
[22]: https://app.datadoghq.com/fleet
[23]: /ja/agent/configuration/agent-configuration-files/
[24]: /ja/agent/configuration/agent-commands/#restart-the-agent
[25]: /ja/integrations/cisco-aci/
[26]: /ja/integrations/cisco-sdwan/
[27]: /ja/integrations/versa/
[28]: /ja/integrations/snmp/
---
description: フリート全体の Datadog Agent および OpenTelemetry Collector を表示して調査します。
further_reading:
- link: /agent/fleet_automation/
  tag: ドキュメント
  text: Fleet Automation
- link: /agent/troubleshooting/send_a_flare/
  tag: ドキュメント
  text: フレアの送信
- link: /containers/kubernetes/installation/
  tag: ドキュメント
  text: Kubernetes に Datadog Agent をインストールする
title: フリートビュー
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View は、Datadog Government サイト (US1-FED および US2-FED) でプレビュー版として提供されています。<br><br>
追加の Fleet Automation 機能 (例: Agent の設定、Agent のアップグレード、SDK のアップグレードなど) は、選択した Datadog サイトではサポートされていません ({{< region-param key=dd_site_name >}})。
</div>
{{< /site-region >}}

[Fleet View][1] を使用して、ホスト上のオブザーバビリティのギャップ、古い Agent や OTel Collector、インテグレーションの問題がある Agent を把握できます。

各 Datadog Agent について、以下を確認できます。
- Agent のバージョン
- 未構成または誤構成のインテグレーションがあるかどうか
- Agent が監視しているサービス
- Agent の Remote Configuration ステータス
- Agent で有効になっている製品
- 設定変更、アップグレード、フレアを含む Agent Audit Trail イベント

各 OTel Collector について、以下を確認できます。
- Collector のバージョン
- Collector のディストリビューション
- Collector の設定 YAML
- Collector のパイプラインおよびトポロジービュー

## 前提条件 {#prerequisites}

- 設定ビューは、バージョン 7.47.0 以降の Agent および OTel Collector でデフォルトで有効になっています。古いバージョンで手動で有効にするには、[Agent 設定ファイル][3]で `inventories_configuration_enabled` を `true` に設定するか、`DD_INVENTORIES_CONFIGURATION_ENABLED` 環境変数を使用してください。
- Agent インテグレーション設定は、Agent バージョン 7.49.0 以降でデフォルトで有効になっています。古いバージョンで手動で有効にするには、[Agent 設定ファイル][3]で `inventories_checks_configuration_enabled` を `true` に設定するか、`DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` 環境変数を使用してください。

<div class="alert alert-info">Fleet Automation で OpenTelemetry Collector の構成、パイプライン、およびトポロジーを表示するには、<a href="/opentelemetry/integrations/datadog_extension/#setup">Datadog Extension</a> が必要です。このページで説明されている OTel Collector 機能を使用する前に、Datadog Extension を構成してください。</div>

## Datadog Agent または OpenTelemetry Collector を確認する {#examine-a-datadog-agent-or-opentelemetry-collector}

Datadog Agent または OTel Collector を選択すると、その構成、接続されているインテグレーション、監査イベント、およびリモートフレアを送信するためのサポートタブを表示できます。

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="構成、接続されているインテグレーション、および監査イベントを表示する Agent 詳細パネル。" style="width:100%;" >}}

## 検索とフィルター {#search-and-filter}

Fleet View の上部にある検索バーを使用して、フリート全体から特定の Agent、OTel Collector、またはクラスターを検索します。以下が可能です。

- ホスト名またはクラスター名によるフリーテキスト検索を実行します
- オペレーティングシステム、環境 (`env`)、チーム、有効な製品 (`products_enabled`) などのホストタグおよび Agent タグでフィルタリングします

## OTel パイプラインを表示する {#visualize-otel-pipelines}

OTel Collector の {{< ui >}}Configuration{{< /ui >}} タブには、{{< ui >}}Pipeline{{< /ui >}} ビューと {{< ui >}}Topology{{< /ui >}} ビューが含まれています。これらの表示により、テレメトリが OTel パイプラインをどのように流れるかをエンドツーエンドで可視化できます。

これらの表示にアクセスするには、次の手順を実行します。

1. [**Fleet Automation**][1] に移動します。
1. OTel Collector でフィルタリングします。
1. Collector を選択して詳細パネルを開きます。
1. {{< ui >}}Configuration{{< /ui >}} タブをクリックします。
1. {{< ui >}}View as{{< /ui >}} オプションから {{< ui >}}Pipeline{{< /ui >}} または {{< ui >}}Topology{{< /ui >}} を選択します。

### パイプラインビュー {#pipeline-view}

{{< ui >}}Pipeline{{< /ui >}} ビューには、単一の OTel Collector のテレメトリーパイプラインが表示されます。パイプラインビューを使用して、次の操作を行います。

- 構成されたレシーバー、プロセッサー、エクスポーター間のテレメトリールーティングを検証します。
- {{< ui >}}Show traffic{{< /ui >}} トグルを有効にして、データドロップやボトルネックなどのデータフローの問題を特定します。
- コンポーネントノードに表示されるアクティブなモニターアラートを調べて、パイプラインアラートを調査します。

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="OTel Collector コンポーネント間のテレメトリールーティングを示すパイプラインビュー。" style="width:100%;" >}}

### トポロジービュー {#topology-view}

{{< ui >}}Topology{{< /ui >}} ビューには、DaemonSet およびゲートウェイとしてデプロイされた OTel Collector 全体の転送チェーンが表示されます。トポロジービューを使用して、以下の操作を行います。

- DaemonSet からゲートウェイへのアーキテクチャにおけるコレクター間のテレメトリールーティングを検証します。
- {{< ui >}}Show traffic{{< /ui >}} トグルを有効にして各エッジにデータフローレートをオーバーレイ表示し、データドロップやボトルネックを発見します。
- コレクターノードに表示されるアクティブなモニターアラートを調べて、パイプラインの問題を調査します。

{{< img src="/agent/fleet_automation/fleet-automation-gateway-topology.png" alt="DaemonSet コレクターがゲートウェイコレクターを経由して Datadog に転送している様子を示すトポロジービュー。" style="width:100%;" >}}

## Agent Audit Trail イベントを表示する {#view-agent-audit-trail-events}

{{< ui >}}Audit Events{{< /ui >}}タブには、選択した Agent に関連付けられた Audit Trail イベントが表示されます。
このタブを使用して、以下の操作を行います。
- 構成の変更、API キーの更新、インストール、アップグレード、サポートフレアを特定します
- 変更がいつ、どこで行われたかを特定します

Audit Trail イベントの可視性は、ご契約プランによって異なります。組織で Audit Trail が有効になっている場合、Audit Trail の保持設定に基づいて、最大 90 日間の Agent イベントを表示できます。組織で Audit Trail が有効になっていない場合、過去 24 時間分のイベントを表示できます。

## リモートフレアを送信 {#send-a-remote-flare}

Agent で Remote Configuration を有効にした後、Datadog Agent または DDOT Collector からフレアを送信できます。手順については、[Datadog サイトからフレアを送信][2]を参照してください。

Remote Configuration を有効にした状態で Datadog サポートに問い合わせると、サポートチームがお客様の環境からフレアを開始し、問題の迅速な解決を支援する場合があります。

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="[Send Flare] ボタンがある Agent のサポートタブ。" style="width:100%;" >}}

## Kubernetes ビュー {#kubernetes-view}

Kubernetes ビューでは、Kubernetes 環境で実行されている Datadog Agent および OTel Collector を確認できます。ホストベースおよびコンテナ化されたインフラストラクチャー全体にわたるフリートの統合ビューを提供します。

デフォルトでは、Fleet View はインフラストラクチャーを個別のホストとして一覧表示します。{{< ui >}}View by infra type{{< /ui >}} トグルを使用して [Kubernetes view][4] に切り替えると、Agent が Kubernetes クラスターごとに表示されます。

各行は、[Datadog Operator][5] または Helm チャートによって管理されているクラスターです。クラスターの Node Agent、Cluster Agent、および Cluster Check Runner は、個別のホストとしてではなく、グループ化されて表示されます。

### Kubernetes view の前提条件 {#prerequisites-for-kubernetes-view}

Kubernetes view のほとんどの機能は、バージョン要件なしで利用できます。特定の機能には以下が必要です。

| 機能 | 要件 |
|---|---|
| 表示 `DatadogAgent` 構成 | Datadog Operator v1.24 以降 |
| Helm Chart の値を表示 | Datadog Helm Chart v3.157.0 以降 |
| 構成を編集 | [Remote Configuration][6] が有効で、Datadog Operator v1.27 以降 |
| クラスター名を設定せずに構成を編集 | Datadog Operator v1.30.0 以降 |
| Cluster Agent 上でインテグレーションを表示 | Agent v7.72.0 以降 |
| Cluster Agent 上でインテグレーションのステータスを表示 | Agent v7.79.0 以降 |

Fleet View から構成を編集するには、[Operator configuration][7] で以下のフラグを設定します: `remoteConfigEnabled`、`remoteUpdatesEnabled`、`createControllerRevisions`。編集には、Datadog API キーとアプリケーションキーの構成も必要です。Fleet View からの Helm Chart の値の編集はサポートされていません。

v1.30.0 より前の Datadog Operator バージョンでは、クラスター名 (`clusterName`) も設定する必要があります。設定しない場合、{{< ui >}}Edit{{< /ui >}} ボタンは無効のままになります。Datadog Operator v1.30.0 以降では、クラスター名はオプションです。

Datadog Operator を Helm チャートでインストールする場合、`previewFleetRollouts` の値を使用して必要なフラグをまとめて有効にできます。

{{< code-block lang="shell" >}}
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm upgrade --install datadog-operator datadog/datadog-operator \
  --set previewFleetRollouts=true \
  --set apiKeyExistingSecret=datadog-secret \
  --set appKeyExistingSecret=datadog-secret \
  --devel
{{< /code-block >}}

`datadog-secret` を、Datadog API キーとアプリケーションキーを保持する Kubernetes Secret の名前に置き換えます。`--devel` フラグは、チャートの最新の開発リリースをインストールします。

### Kubernetes クラスターを表示 {#view-kubernetes-clusters}

クラスターはクラスター名のアルファベット順に一覧表示されます。このテーブルには、各クラスターの名前、デプロイ方法 (Datadog Operator または Helm)、名前空間、Agent バージョン、Agent Pod のステータス、レディネス、経過時間、再起動回数が記載されています。

特定のクラスターを見つけるには、クラスター名で[検索](#search-and-filter)できます。

クラスターをクリックして、以下を表示します。

- 環境やタグなどのクラスター詳細
- クラスターレベルの Agent (Cluster Agent および Cluster Check Runners)
- Node Agents

{{< ui >}}Configuration{{< /ui >}}タブでは、構成を表示します。

- **Datadog Operator v1.24以降**: `DatadogAgent`カスタムリソース構成を表示します。Datadog Operator v1.27以降では、このタブから構成を編集することもできます。
- **Datadog Helm Chart v3.157.0 以降**: Helm Chart の値を表示します (`values.yaml`)。

### 制限事項 {#limitations}

デフォルトのビューと比較して、Kubernetes ビューには以下の制限があります。

- リモートサポートフレアを送信できません。
- 実行中の OTel Collector を確認できますが、Kubernetes ビューでその構成を表示することはできません。
- Fleet Automation API へのアクセスは利用できません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ja/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[3]: /ja/agent/configuration/agent-configuration-files/
[4]: https://app.datadoghq.com/fleet?view_by=clusters
[5]: /ja/containers/datadog_operator
[6]: /ja/agent/guide/setup_remote_config
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
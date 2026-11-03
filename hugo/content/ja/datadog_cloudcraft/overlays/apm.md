---
description: Cloudcraft の APM オーバーレイを使用して、アーキテクチャ図のクラウドリソース間の分散型トレースを可視化します。
further_reading:
- link: /datadog_cloudcraft/overlays/infrastructure/
  tag: ドキュメント
  text: インフラストラクチャーオーバーレイ
- link: /datadog_cloudcraft/overlays/observability/
  tag: ドキュメント
  text: 監視可能性オーバーレイ
- link: /datadog_cloudcraft/overlays/security/
  tag: ドキュメント
  text: セキュリティオーバーレイ
- link: /datadog_cloudcraft/overlays/ccm/
  tag: ドキュメント
  text: Cloud Cost Management オーバーレイ
- link: /tracing/
  tag: ドキュメント
  text: APM
site_support_id: cloudcraft_apm_overlay
title: APM
---
<div class="alert alert-info">APM オーバーレイはプレビュー版であり、AWS アカウントでのみ利用可能です。</div>

## 概要 {#overview}

APM オーバーレイは、Cloudcraft 図のクラウドリソース間の分散型 APM トレースを円弧で表示します。これにより、アーキテクチャビューを離れることなく、インフラストラクチャー全体のサービス間リクエストフローを把握できます。

オーバーレイを開くには、図の上部にあるオーバーレイセレクターの [{{< ui >}}APM{{< /ui >}}] タブをクリックします。

### サポートされているリソースタイプ {#supported-resource-types}

APM オーバーレイには、トレースデータに CCRID (クラウドリソース ID) が含まれるリソースの接続が表示されます。以下のリソースタイプがサポートされています。

- EC2
- S3
- Lambda
- RDS

{{< img src="datadog_cloudcraft/overlays/cloudcraft_apm_overlay_diagram.png" alt="AWS アーキテクチャ図のサービスを接続する、緑色のトレース円弧が示されている Cloudcraft の APM オーバーレイ。左下にトレース数と凡例が示されています。" style="width:100%;" >}}

## 前提条件 {#prerequisites}

APM が Datadog 組織でアクティブである必要があります。具体的には、過去 30 日間に少なくとも 1 つのスパンが取り込まれている必要があります。APM が設定されていない場合、Cloudcraft は [APM を設定][1]するためのリンクを含むオンボーディング画面を表示します。

## トレース接続の可視化 {#visualize-trace-connections}

APM オーバーレイがアクティブな場合、トレースは図上でリソースノード間の曲線の円弧として表示されます。各円弧は、2 つのリソース間の分散型トレーストラフィックを表します。

### 凡例 {#legend}

| 円弧の色 | ステータス |
|-----------|--------|
| 緑     | 正常     |
| 赤       | エラー  |

画面下部の凡例パネルを使用して、ステータス別にトレースをフィルタリングします。凡例には、表示されているトレースの数も表示されます。すべてのステータスの選択を解除すると、ビューがリセットされて、すべてのトレースが表示されます。

## トレースの調査 {#investigate-traces}

トレースの円弧をクリックすると、それらの 2 つのリソース間の APM トレースの一覧が表示されたサイドパネルが開きます。サイドパネルには以下が含まれます。

- クエリでトレースをフィルタリングするための検索バー。
- 時間選択ツール (デフォルトで過去 30 分に設定されています)。
- トレースデータのストリーミング用 [{{< ui >}}live mode{{< /ui >}}] (ライブモデル) トグル。
- 表示するフィールドをカスタマイズするための列選択ツール。デフォルトの列には、[Duration] (期間)、[Service] (サービス)、[Resource Name] (リソース名)、[Error Type] (エラータイプ) があります。
- [Traces Explorer][2] で同じクエリを表示するための [{{< ui >}}open in APM{{< /ui >}}] (APM で開く) リンク。

サイドパネルのトレース行をクリックすると、トレース詳細ビューが開き、標準の APM フレームグラフが表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: /ja/tracing/trace_explorer/
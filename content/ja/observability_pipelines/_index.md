---
aliases:
- /ja/integrations/observability_pipelines/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /observability_pipelines/setup/
  tag: ドキュメント
  text: 観測可能性パイプラインを設定する
- link: https://www.datadoghq.com/blog/datadog-observability-pipelines/
  tag: ブログ
  text: 観測可能性パイプラインでテレメトリーデータを管理する
- link: /observability_pipelines/configurations/
  tag: Documentation
  text: 観測可能性パイプラインの構成の詳細
kind: ドキュメント
title: Observability Pipelines（観測データの制御）
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では観測可能性パイプラインはサポートされていません。</div>
{{< /site-region >}}


{{< img src="observability_pipelines/obs_pipelines.png" alt="左側の異なるデータソースが、transform、reduce、route という 3 つの六角形に流れ、矢印が修正されたデータの異なる宛先を指しているグラフィック" style="width:100%;" >}}

## 概要

観測可能性パイプラインを使用すると、所有または管理するインフラストラクチャー内の観測可能性データ (ログ、メトリクス、トレース) を任意のソースから任意の宛先に収集、処理、およびルーティングすることができます。観測可能性パイプラインを使用すると、次のことが可能になります。

- ルーティングの前にデータ量をコントロールし、コスト管理を行うことができます。
- データをどこにでも転送できるため、ベンダーロックインを減らし、マイグレーションを簡素化できます。
- フィールドやタグを追加、パース、リッチ化、削除することで、ログやメトリクスを変換する。
- テレメトリーデータから機密データを編集する。

観測可能性パイプラインワーカーは、インフラストラクチャーで実行されるソフトウェアです。データを集計し、一元的に処理し、ルーティングします。より具体的には、ワーカーは以下のことが可能です。

- Agent、コレクター、フォワーダーによって収集されたすべての観測可能性データを受信またはプルします。
- 取り込んだデータを変換します (例: パース、フィルター、サンプル、リッチ化など )。
- 処理したデータを任意の宛先にルーティングします。

Datadog UI は、観測可能性パイプラインワーカーを管理するためのコントロールプレーンを提供します。パイプラインを監視して、パイプラインの健全性を理解し、ボトルネックやレイテンシーを特定し、パフォーマンスを微調整し、データ配信を検証し、最大のボリューム貢献者を調査することができます。データのサブセットを新しい宛先にルーティングしたり、新しい機密データの再編集ルールを導入するなど、パイプラインを構築または編集し、Datadog UI からアクティブなパイプラインにこれらの変更をロールアウトすることができます。

## 詳細はこちら

1. [観測可能性パイプラインワーカーを設定します][1]。
2. [データを収集、変換、ルーティングするパイプラインを作成します][2]。

## 観測可能性パイプラインの確認

観測可能性パイプラインのインサイトの取得を開始します。

### あらゆるソースからデータを収集し、あらゆる宛先にデータをルーティングする

あらゆるソースからログ、メトリクス、トレースを収集し、あらゆる宛先にルーティングすることで、ベンダーのロックインを減らし、移行を簡素化することができます。


{{< img src="observability_pipelines/component_panel.png" alt="Datadog Logs コンポーネントのサイドパネルに、1 秒あたりのイベントのイン/アウトの折れ線グラフと 1 秒あたりのバイトのイン/アウトのリンクグラフが表示されます" style="width:100%;" >}}

### ルーティングされる前にデータ量を制御する

ログとメトリクスのサンプリング、フィルター、重複排除、集計により、観測可能性データの量を最適化し、サイズを小さくします。データ標準を実施し、メトリクスのタグを制御することで、テレメトリーを管理します。

{{< img src="observability_pipelines/transforms.png" alt="集計、Amazon EC2 Metadata、重複除去 (dedupe) など、利用可能な変換を表示する変換の一覧サイドパネル。" style="width:100%;" >}}

### テレメトリーデータから機密データを編集する

すぐに使えるパターンで PII、PCI、秘密キーなどをスキャンし、インフラストラクチャーの外側にルーティングされる前に機密データを編集します。

{{< img src="observability_pipelines/scanning_rules.png" alt="機密データスキャナー ルールライブラリ パネルでは、個人を特定できる情報、ネットワークおよびデバイス情報に対して利用可能なルールが表示されます" style="width:85%;" >}}

### パイプラインの健全性の監視

パイプラインのトポロジーを全体的に把握し、各フローの平均負荷、エラー率、スループットなどの主要なパフォーマンス指標を監視することができます。

{{< img src="observability_pipelines/pipeline_health.png" alt="コンポーネントにエラーが発生し、イベント取り込みの遅延が検出されたため、警告が表示されたパイプライン構成ページ" style="width:90%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/setup/
[2]: /ja/observability_pipelines/configurations/
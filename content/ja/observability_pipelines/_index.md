---
aliases:
- /ja/integrations/observability_pipelines/
further_reading:
- link: /getting_started/observability_pipelines/
  tag: ドキュメント
  text: 観測可能性パイプラインワーカーのインストール
- link: /getting_started/observability_pipelines/
  tag: Documentation
  text: 観測可能性パイプラインと Datadog の概要
- link: https://www.datadoghq.com/blog/datadog-observability-pipelines/
  tag: ブログ
  text: 観測可能性パイプラインでテレメトリーデータを管理する
- link: /observability_pipelines/configurations/
  tag: Documentation
  text: 観測可能性パイプラインの構成の詳細
kind: ドキュメント
title: Observability Pipelines（観測データの制御）
---

{{< img src="observability_pipelines/obs_pipelines.png" alt="左側の異なるデータソースが、transform、reduce、route という 3 つの六角形に流れ、矢印が修正されたデータの異なる宛先を指しているグラフィック" style="width:100%;" >}}

## 観測可能性パイプラインと観測可能性パイプラインワーカーとは？

### 観測可能性パイプラインワーカー

観測可能性パイプラインワーカーは、あらゆるソースからのログやメトリクスを収集、処理し、あらゆる宛先にルーティングするために設計されたオンプレミスのエンドツーエンド・データ・パイプライン・ソリューションです。観測可能性パイプラインは、中央処理、複数のアップストリームソースからのデータ収集、クロスホストの集計と分析を行うためのインフラストラクチャー内のアグリゲーターとしてデプロイすることができます。観測可能性パイプラインワーカーを使用すると、次のようなことも可能です。

- ルーティングの前にデータ量をコントロールし、コスト管理を行うことができます。
- データをどこにでも転送できるため、ベンダーロックインを減らし、マイグレーションを簡素化できます。
- フィールドやタグを追加、パース、リッチ化、削除することで、ログやメトリクスを変換する。
- テレメトリーデータから機密データを編集する。

### Observability Pipelines（観測データの制御）

Datadog を使用することで、観測可能性パイプラインワーカーデプロイのすべてをスケールアップして監視、構築、管理することができます。

観測可能性パイプラインの構成に Datadog API キーを追加して、ボトルネックやレイテンシーの特定、パフォーマンスの微調整、データ配信の監視など、Datadog でパイプラインを監視することができます。

## 詳細はこちら

1. [観測可能性パイプラインワーカー][1]をインストールします。
2. [構成を設定][2]し、データの収集、変換、ルーティングを行います。

## 観測可能性パイプラインの確認

観測可能性パイプラインの探索とインサイトの取得を開始します。

### パイプラインの健全性の監視

パイプラインのトポロジーを全体的に把握し、各フローの平均負荷、エラー率、スループットなどの主要なパフォーマンス指標を監視することができます。

{{< img src="observability_pipelines/config-map.png" alt="http、splunk_hec、datadog から来たデータが、異なる変換に流れ、異なる宛先に送られる様子を示した構成図" style="width:80%;" >}}

### ボトルネックの早期特定とパフォーマンスの最適化

特定の構成コンポーネントに潜り込み、観測可能性データがどのようにパイプラインに流れ込んでいるかを理解し、トラブルシューティングやパフォーマンスのボトルネックの特定、パイプラインの最適化に役立てることができます。

{{< img src="observability_pipelines/config-map-side-panel.png" alt="S3 ソース構成のサイドパネルに、1 秒あたりのイベントの出入り、エラーの割合、ロードアベレージの割合のグラフが表示される" style="width:85%;" >}}

### データ配信を確実に行い、レイテンシーを低減します。

データが宛先に届いているかどうかを確認し、レイテンシーの問題を完全に視覚化して、SLI と SLO を満たすことができます。

{{< img src="observability_pipelines/configuration-list.png" alt="観測可能性パイプラインのページには、アクティブなパイプラインと非アクティブなパイプラインのリストが表示され、作成日、ホスト数、バージョン、イベント数、バイト数、エラー率などの列が表示される" style="width:85%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/observability_pipelines/installation/
[2]: /ja/observability_pipelines/configurations/
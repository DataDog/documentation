---
further_reading:
- link: /integrations/observability_pipelines/setup/
  tag: ドキュメント
  text: 観測可能性パイプラインを設定する
- link: https://www.datadoghq.com/blog/datadog-observability-pipelines/
  tag: ブログ
  text: 観測可能性パイプラインでテレメトリーデータを管理する
- link: /integrations/observability_pipelines/vector_configurations/
  tag: ドキュメント
  text: Vector の構成の詳細
- link: https://vector.dev/docs/setup/going-to-prod/
  tag: ドキュメント
  text: 観測可能性パイプラインのキャパシティプランニングを行い、本番に移行する
- link: https://vector.dev/releases/
  tag: ドキュメント
  text: Vector の新リリースをチェックする
- link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
  tag: ドキュメント
  text: Vector のソースとなる Datadog Agent
- link: https://docs.datadoghq.com/agent/vector_aggregation/
  tag: ドキュメント
  text: Vector アグリゲーターにデータを送信するための Datadog Agent の構成
kind: ドキュメント
title: オブザーバビリティ パイプライン
---

{{< img src="integrations/observability_pipelines/obs_pipelines_overview.png" alt="左側の異なるデータソースが、transform、reduce、route という 3 つの六角形に流れ、矢印が修正されたデータの異なる宛先を指しているグラフィック" style="width:100%;" >}}

## 可観測性パイプラインとは？

観測可能性パイプラインは、テレメトリーパイプラインを大規模に監視・管理できるオープンソースツールである [Vector][1] をベースに構築された監視ソリューションです。Vector は、インフラストラクチャー内にアグリゲーターとしてデプロイされ、すべてのログ、メトリクス、トレースを収集し、変換し、任意の宛先にルーティングします。

Vector の構成に Datadog API キーを追加して、観測可能性パイプラインに接続します。観測可能性パイプラインを使用して、Vector のパイプラインを監視し、ボトルネックやレイテンシーの特定、パフォーマンスの微調整、データ配信の監視などを行います。

観測可能性パイプラインを使えば、以下のようなことも可能です。

- ルーティングの前にデータ量をコントロールし、コスト管理を行うことができます。
- データをどこにでも転送できるため、ベンダーロックインを減らし、マイグレーションを簡素化できます。
- 居住地に関する必須条件を満たし、機密データを編集することで、よりコンプライアンスを維持することができます。
- イベントを充実させ、構造化し、より有用なものに変換することができます。

観測可能性パイプラインを使用して、完全な可視化と簡素化された管理で、パフォーマンスと信頼性の高いデータパイプラインを構築します。

## はじめましょう

1. [Vector のインストール][2]は、クイックスタートの方法、お好みのパッケージマネージャー、または特定のプラットフォームやオペレーティングシステムに基づいて行ってください。
2. [Vector の構成を設定][3]し、データの収集、変換、ルーティングを行います。
3. Vector を Datadog API で観測可能性パイプラインに接続します。

## 観測可能性パイプラインの確認

観測可能性パイプラインに構成データを送信できるようになったので、Vector パイプラインのインサイトを取得することを開始します。

### Vector パイプラインの健全性の監視

パイプラインのトポロジーを全体的に把握し、各フローの平均負荷、エラー率、スループットなどの主要なパフォーマンス指標を監視することができます。

{{< img src="integrations/observability_pipelines/config-map.png" alt="http、splunk_hec、datadog から来たデータが、異なる変換に流れ、異なる宛先に送られる様子を示した構成図" style="width:80%;" >}}

### ボトルネックの早期特定とパフォーマンスの最適化

Vector の特定のコンポーネントに潜り込み、観測可能性データがどのようにパイプラインに流れ込んでいるかを理解し、トラブルシューティングやパフォーマンスのボトルネックの特定、パイプラインの最適化に役立てることができます。

{{< img src="integrations/observability_pipelines/config-map-side-panel.png" alt="S3 ソース構成のサイドパネルに、1 秒あたりのイベントの出入り、エラーの割合、ロードアベレージの割合のグラフが表示される" style="width:85%;" >}}

### データ配信を確実に行い、レイテンシーを低減します。

データが宛先に届いているかどうかを確認し、レイテンシーの問題を完全に視覚化して、SLI と SLO を満たすことができます。

{{< img src="integrations/observability_pipelines/configuration-list.png" alt="観測可能性パイプラインのページには、アクティブなパイプラインと非アクティブなパイプラインのリストが表示され、作成日、ホスト数、バージョン、イベント数、バイト数、エラー率などの列が表示される" style="width:85%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /ja/integrations/observability_pipelines/setup/#install-vector
[3]: /ja/integrations/observability_pipelines/setup/#set-up-vector-configurations
[4]: /ja/integrations/observability_pipelines/setup/#connect-vector-to-observability-pipelines
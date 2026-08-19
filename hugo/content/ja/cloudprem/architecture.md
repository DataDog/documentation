---
further_reading:
- link: /cloudprem/install/
  tag: ドキュメント
  text: CloudPrem のインストール前提条件
title: アーキテクチャ
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

{{< img src="/cloudprem/overview_architecture.png" alt="Indexer、Searcher、Metastore、Control Plane の各コンポーネントとオブジェクト ストレージの連携を示した CloudPrem アーキテクチャ図" style="width:100%;" >}}

CloudPrem は、コンピュート (インデックス化と検索) とデータをオブジェクト ストレージ上で切り分ける疎結合のアーキテクチャを採用しています。これにより、ワークロードに応じてクラスター内の各コンポーネントを個別にスケールさせたり、最適化したりできます。

## コンポーネント

CloudPrem クラスターは、通常 Kubernetes (EKS) 上にデプロイされ、主に次のコンポーネントで構成されます:

**Indexers**
: Datadog Agent からログを受け取ります。受信したログを処理・インデックス化し、_splits_ と呼ばれるインデックス ファイルとしてオブジェクト ストレージ (例: Amazon S3) に保存します。

**Searchers**
: Datadog UI からの検索クエリを処理します。Metastore からメタ データを読み取り、必要なデータをオブジェクト ストレージから取得します。

**Metastore**
: インデックスに関するメタ データを保存します。オブジェクト ストレージ上の split の保存場所もここで管理します。CloudPrem は、この用途に PostgreSQL を使用します。

**Control Plane**
: _indexing pipelines_ と呼ばれるインデックス化ジョブを Indexer 上でスケジュールします。

**Janitor**
: 保持ポリシーの適用、期限切れ split のガーベッジ コレクション、削除クエリ ジョブの実行など、保守タスクを担います。


## Datadog UI との接続

Datadog UI を CloudPrem に接続する方法は 2 つあります:
- [**リバース接続**][1]: CloudPrem 側から Datadog に対して双方向の gRPC リクエストを開始します。 
- [**Datadog からの外部リクエストを受け付ける**][2]: gRPC リクエスト用の DNS エンドポイントを Datadog に提供し、それを受け付けるパブリック Ingress を構成します。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloudprem/configure/reverse_connection/
[2]: /ja/cloudprem/configure/ingress/
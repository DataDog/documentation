---
aliases:
- /ja/observability_pipelines/architecture/preventing_data_loss/
title: (レガシー) データ損失の防止
---

<div class="alert alert-info">
このガイドは、大規模な本番環境レベルのデプロイメント向けです。
</div>

## 高耐久性

高耐久性とは、システム障害が発生したときにデータを保持できることです。アグリゲーターアーキテクチャは、高耐久性の責任を負うように設計されています。このため、Agent からアグリゲーターに負担を移し、ローカライズすることで、耐久性戦略を簡素化することができます。さらに、この集中的なアプローチにより、すべての Agent ノードに渡って実装することが困難な耐久性戦略が可能になります。

{{< img src="observability_pipelines/production_deployment_overview/high_durability.png" alt="Observability Pipelines Worker がデータをレプリケートされたブロックストレージに送信している図" style="width:100%;" >}}

高耐久性を実現するために

1. エージェントをシンプルなデータフォワーダーとして構成し、データを直接 Observability Pipelines Worker アグリゲーターにストリームします。これにより、データがエッジで損失にさらされる時間が短縮されます。なぜなら、まだ冗長化されていないからです。

2. システム・オブ・レコードとして機能する高耐久性の宛先を選択します (例: Amazon S3)。このシステムは保存データの耐久性を担当し、一般的にアーカイブやデータレイクと呼ばれます。

最後に、システム・オブ・レコードに書き込む Observability Pipelines Worker のシンクを構成し、[エンドツーエンドの確認応答](#using-end-to-end-acknowledgment)とディスクバッファーを有効にします。例:

```
sinks:
    aws_s3:
        acknowledgments: true
        buffer:
            type: "disk"
```

## データ損失防止ガイドライン

### エンドツーエンド確認応答の使用

Observability Pipelines Worker のオペレーティングシステムプロセスに問題が発生すると、その間にメモリに保持されているデータを失うリスクがあります。データ損失のリスクを軽減するために、Observability Pipelines Worker のエンドツーエンドの確認応答機能を有効にします。

```
sinks:
    aws_s3:
        acknowledgments: true
```

この機能を有効にすると、データが耐久的に永続化されるまで Observability Pipelines Worker はエージェントに応答しません。これにより、確認応答が受信されていない場合にエージェントがデータを早期に解放し、再度送信することを防ぎます。

{{< img src="observability_pipelines/production_deployment_overview/end_to_end_acknowledgments.png" alt="Observability Pipelines Worker のソースからクライアントに確認応答が送信される図" style="width:100%;" >}}

### ノード障害への対応

ノード障害は、個々のノードの完全な障害を扱います。これらもエンドツーエンドの確認応答を使用して対処できます。詳細については、[エンドツーエンドの確認応答の使用](#using-end-to-end-acknowledgment)を参照してください。

### ディスク障害への対応

ディスク障害は、個々のディスクの障害を扱います。ディスク障害に関連するデータ損失は、ブロックストレージ (例: Amazon EBS) のようなデータが複数のディスクにレプリケートされる高耐久性のファイルシステムを使用することで軽減できます。

### データ処理障害への対応

Observability Pipelines Worker は、不正なデータを処理しようとすると、ログのパースに失敗するなどの問題が発生する可能性があります。この問題を軽減する方法は 2 つあります。

1. **ダイレクトアーカイブ**: ソースからアーカイブに直接データをルーティングします。これにより、データが落とされるリスクなしにアーカイブに到達することを保証します。また、このデータは、処理エラーを修正した後に再生することができます。

2. **失敗したイベントのルーティング**: Observability Pipelines Worker は、構造化および拡充されたデータなどの処理済みデータをアーカイブしたいユーザーのために、失敗したイベントのルーティングを提供します。特定の Observability Pipelines Worker の変換には、耐久性と再生のためにシンクに接続できるドロップされた出力が付属しています。

#### どの戦略がベストなのか？

耐久性が最も重要な基準である場合、データ損失のシナリオに対処する直接アーカイブ方式を使用します。アーカイブ内のデータを分析したい場合は、データレイクとも呼ばれる失敗したイベントのルーティング方式を使用します。これは、長期的な分析のためにアーカイブ/データレイクを使用できるという利点があります。Datadog の [Log Archives][1] や Amazon Athena は、アーカイブストレージソリューションの例です。

### 宛先障害への対応

宛先障害は、下流の宛先 (例: Elasticsearch) の完全な障害を指します。停止時間を維持するのに十分な大きさのディスクバッファーを使用することで、下流の宛先の問題に対してデータ損失を軽減できます。これにより、サービスがダウンしている間にデータを耐久的にバッファーし、サービスが復旧したときに排出できます。このため、少なくとも 1 時間分のデータを保持できる十分な大きさのディスクバッファーが推奨されます。詳細については、[インスタンスの最適化][2]を参照してください。

[1]: /ja/logs/log_configuration/archives
[2]: /ja/observability_pipelines/legacy/architecture/optimize
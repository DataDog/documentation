---
kind: Documentation
title: データ損失の防止
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines は US1-FED Datadog サイトでは利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">このガイドは、大規模な本番環境レベルのデプロイメントを対象としています。</div>

## 高耐久性

高耐久性とは、システム障害が発生したときにデータを保持できることです。アグリゲーターアーキテクチャは、高耐久性の責任を負うように設計されています。このため、Agent からアグリゲーターに負担を移し、ローカライズすることで、耐久性戦略を簡素化することができます。さらに、この集中的なアプローチにより、すべての Agent ノードに渡って実装することが困難な耐久性戦略が可能になります。

{{< img src="observability_pipelines/production_deployment_overview/high_durability.png" alt="Observability Pipelines Worker が、複製されたブロックストレージにデータを送信している様子を示す図" style="width:100%;" >}}

高耐久性を実現するために

1. Agent をシンプルなデータ転送装置として構成し、Observability Pipelines Worker アグリゲーターに直接データをストリーミングします。これにより、データがまだ冗長化されていないため、エッジでのデータロスにさらされる時間が短縮されます。

2. 記録システムとして機能する耐久性の高い宛先を選択します (例えば、Amazon S3)。このシステムは、静止しているデータの耐久性に責任があり、一般的にアーカイブやデータレイクと呼ばれます。

最後に、記録システムに書き込む Observability Pipelines Worker のシンクを構成し、[エンドツーエンド確認応答](#using-end-to-end-acknowledgment)とディスクバッファを有効にしてください。例:

```
sinks:
    aws_s3:
        acknowledgments: true
        buffer:
            type: "disk"
```

## データ損失防止ガイドライン

### エンドツーエンド確認応答の使用

Observability Pipelines Worker のオペレーティングシステムプロセスの問題により、問題の発生時にメモリに保持されているデータが失われる危険性があります。Observability Pipelines Worker のエンドツーエンド確認応答機能を有効にして、データ消失のリスクを軽減してください。

```
sinks:
    aws_s3:
        acknowledgments: true
```

この機能を有効にすると、Observability Pipelines Worker は、データが永続的に保持されるまで Agent に応答しません。これにより、Agent が早期にデータを解放し、確認応答を受信していない場合に再度送信することを防ぐことができます。

{{< img src="observability_pipelines/production_deployment_overview/end_to_end_acknowledgments.png" alt="Observability Pipelines Worker のソースからクライアントに戻って送信される確認応答を示す図" style="width:100%;" >}}

### ノード障害への対応

ノード障害は個々のノードの完全な障害を扱います。これらはエンドツーエンドの確認応答を使って対処することもできます。詳しくは[エンドツーエンド確認応答の使用](#using-end-to-end-acknowledgment)を参照してください。

### ディスク障害への対応

ディスク障害は個々のディスクの障害を扱います。ディスク障害に関連するデータ損失は、ブロックストレージ (例えば、Amazon EBS) のように、複数のディスクにデータを複製する高耐久性のファイルシステムを使用することで軽減できます。

### データ処理障害への対応

Observability Pipelines Worker は、不正なデータを処理しようとすると、ログのパースに失敗するなどの問題が発生することがあります。この問題を軽減する方法は 2 つあります。

1. **ダイレクトアーカイブ**: ソースからアーカイブに直接データをルーティングします。これにより、データが落とされるリスクなしにアーカイブに到達することを保証します。また、このデータは、処理エラーを修正した後に再生することができます。

2. **イベントルーティングの失敗**: Observability Pipelines Worker は、構造化データやリッチ化データなど、処理したデータをアーカイブしたいユーザー向けに、失敗したイベントのルーティングを提供します。Observability Pipelines Worker の変換には、耐久性と再生のためにシンクに接続することができるドロップ出力が付属しているものがあります。

#### どの戦略がベストなのか？

耐久性が最も重要な基準である場合は、データ損失のシナリオに対応するため、ダイレクトアーカイブ方式を使用します。アーカイブでのデータ分析を希望する場合は、一般にデータレイクとも呼ばれる失敗イベントルーティング方式を使用します。アーカイブ/データレイクを長期的な分析に使用できる利点があります。Datadog [Log Archives][1] や Amazon Athena は、アーカイブストレージソリューションの一例です。

### 宛先障害への対応

宛先の障害とは、ダウンストリームの宛先 (例えば Elasticsearch) の全障害を指します。ダウンストリーム宛先の問題に対して、停止時間を持続させるのに十分な大きさのディスクバッファを使用することで、データ損失を軽減できます。これにより、サービスが停止している間、データを持続的にバッファリングし、サービスが回復したときにデータを排出することができます。このため、少なくとも 1 時間分のデータを保持するのに十分な大きさのディスクバッファを使用することをお勧めします。詳しくは、[インスタンスの最適化][2]を参照してください。

[1]: /ja/logs/log_configuration/archives
[2]: /ja/observability_pipelines/architecture/optimize
---
title: 統合タグ付けの高度な使用ガイド
---

## 概要

このガイドでは、特定のユースケースに基づいて、[統合サービスタグ付け][1]を構成して移行する方法を提示します。

## カスタムタグ

`env`、`service`、`version` タグは、統合サービスタグ付け用に構成されているため、引き続き使用できます。ただし、独自のカスタムタグで統合されたタグ付けエクスペリエンスを実現したい場合は、以下に示すいくつかのオプションを使用できます。

**注**: 任意のタグをサポートしている製品もあれば、より具体的な期待を持つ製品もあります。そのため、あるデータソースに、別の製品が持っていない、またはサポートしていないタグがある場合、製品間のナビゲーションが困難になる可能性があります。

### コンテナ化環境

#### メトリクス

タグはデータポイントに付加できるため、目的のタグを自由に設定できます。自動検出されたタグは、収集されたすべてのメトリクスに自動的に追加されます。

#### APM

`env` と `service` は APM のコアタグであるため、異なる名前のタグに置き換えることはできません。ただし、APM では、`env` だけでなく、データを[より多くのプライマリタグに沿って集計][2]できます。トレースとトレースメトリクスに追加される `availability-zone` などのホストタグも、使用が可能です。

コンテナに関連付けられた自動検出されたタグは、スパンメタデータの `container_info` に追加されます。ただし、これらのコンテナタグは、トレースメトリクスの[指定済みタグリスト][3]の一部ではありません。

#### ログ管理

APM と同様に、`service` はログデータの整理に役立つコアタグです。また、これなしでログから関連する APM サービスにリンクすることはできません。

メトリクスと同様に、コンテナの自動検出されたタグと Agent のホストタグがすべてのログに追加されます。

また、[Datadog ログ処理パイプライン][4]のダウンストリームのタグまたは属性にマッピングできる、コード内のログにカスタムフィールドを追加することもできます。

## 標準ラベル

Datadog では、標準ラベルと環境変数の両方を使用することをお勧めしています。ただし、特にランタイムでこうした変数を使用してもメリットが得られないアプリケーションでは、標準のラベルは、環境変数を使用する代わりと見なすことができます。Redis、MySQL、Nginx などのサードパーティソフトウェアがその例です。これらのサービスは依然としてインテグレーションチェックからインフラストラクチャーメトリクスとデータを生成するため、そのすべてのデータに `env`、`service`、`version` のタグを付けることは価値があります。

Kubernetes のステートメトリクスに `env`、`service`、`version` のタグを付ける場合は、標準ラベルが最も簡単な方法です。コンテナの `DD` 環境変数は、Agent がこれらのメトリクスにタグを付けるために使用できないため、ラベルがより自然なオプションとなります。

### ラベルとしての環境の宣言

データのソース (APM トレースやログなど) の近くに `env` を構成すると、Agent の `env` が異なる可能性のある不整合を回避するのに役立ちます。サービスのコンフィギュレーションの `env` 部分を作成すると、サービス中心の「信頼できる唯一の情報源」が保証されます。

### 既存の Kubernetes タグアノテーションで標準ラベルを使用する

Kubernetes ユーザーは、これらの一般的なタグを引き続き使用できます。ただし、特定のラベルを使用すると、いくつかの利点があります。

- Kubernetes Downward API で、環境変数を挿入するためにこれを直接参照できます。
- サービス標準ラベルは、ログのサービスの定義を簡略化できます。

### 特定のコンテナに標準ラベルを使用する

`DD` 環境変数はコンテナレベルで挿入されるため、コンテナごとに異なる可能性があります。ただし、特定のコンテナにも標準ラベルを使用する場合は、コンテナ固有のバリアントを使用する必要があります。

```yaml
tags.datadoghq.com/<container>.env
tags.datadoghq.com/<container>.service
tags.datadoghq.com/<container>.version
```

### 標準タグ挿入

[Datadog Admission Controller][5] は、標準タブラベルを環境変数に変換し、ユーザーのアプリケーションポッドテンプレートに挿入します。この環境変数は、APM トレーサー、DogStatsD クライアント、Datadog Agent により使用されます。そして、Datadog Agent により値がタグにマッピングされます。

```
tags.datadoghq.com/version -> DD_VERSION
tags.datadoghq.com/env -> DD_ENV
tags.datadoghq.com/service -> DD_SERVICE
```

Admission Controller は、ポッドラベルでこの情報を探します。ポッドレベルで見つからない場合はポッドオーナーオブジェクトのラベル (deployment、job、cron job、statefulset) から情報を取得します。

#### 注

- 新しいアプリケーションポッドを作成する前に、Admission Controller のデプロイと構成が必要です。既に存在するポッドは更新できません。
- Admission Controller は環境変数 `DD_VERSION, DD_ENV` および `DD_SERVICE` が既に存在する場合は挿入を行いません。
- Admission Controller の挿入機能を無効化するには、Cluster Agent のコンフィギュレーション: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false` を使用します。


[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/guide/setting_primary_tags_to_scope/
[3]: /ja/metrics/distributions/#customize-tagging
[4]: /ja/logs/log_configuration/pipelines
[5]: /ja/agent/cluster_agent/admission_controller/
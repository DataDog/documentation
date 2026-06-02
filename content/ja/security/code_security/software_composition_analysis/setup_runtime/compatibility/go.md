---
code_lang: go
code_lang_weight: 20
title: Go 互換性要件
type: multi-code-lang
---

## Code Security capabilities

指定した tracer バージョンの Go ライブラリでは、次の Code Security 機能を利用できます:

| Code Security capability                    | Go トレーサーの最小バージョン   |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.49.0                      |
| Runtime Code Analysis (IAST)                | 非対応               |

### サポートされるデプロイメントタイプ
| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   | {{< X >}}                           |
| Kubernetes        | {{< X >}}                                   | {{< X >}}                           |
| Amazon ECS        | {{< X >}}                                   | {{< X >}}                           |
| AWS Fargate       | {{< X >}}                                   |                                     |
| AWS Lambda        |                                             |                                     |

## 言語とフレームワークの互換性

### サポートされている Go バージョン

Datadog Go トレーシングライブラリはオープンソースです。詳細については、[GitHub リポジトリ][2]をご覧ください。

Datadog Go トレーシングライブラリは、Go のバージョンに対して[バージョンサポートポリシー][3]が定義されています。Go の直近 2 つのリリースは完全にサポートされ、3 番目に新しいリリースは[メンテナンス][4]中と見なされます。これより古いバージョンも機能する可能性はありますが、デフォルトではサポートは提供されません。特別なリクエストは、[サポートに連絡][5]してください。

Datadog Agent v5.21.1+ を実行している必要があります

tracer バージョン 1.53.0 以降では、Code Security 機能に [CGO][15] は不要です。

## インテグレーション

Go トレーサーには、次のフレームワーク、データストア、ライブラリのサポートが含まれています。

このページに記載している Go パッケージは、Code Security 機能に関連するものです。その他のトレース インテグレーションについては、[APM のトレース互換性ページ][16] も参照してください。

**注**: [Go インテグレーションドキュメント][19]では、サポートされているパッケージとその API の詳細な概要が使用例とともに提供されています。

### Web フレームワークの互換性

- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

### ネットワーキングフレームワークの互換性

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

### データストアの互換性

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks


[1]: /ja/remote_configuration#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[15]: https://github.com/golang/go/wiki/cgo
[16]: /ja/tracing/compatibility_requirements/go
[17]: /ja/tracing/trace_collection/custom_instrumentation/go/migration
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/
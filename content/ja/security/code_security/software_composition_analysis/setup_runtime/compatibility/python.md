---
code_lang: python
code_lang_weight: 50
title: Python 互換性要件
type: multi-code-lang
---
## Code Security capabilities support

The following code security capabilities are supported in the Python library, for the specified tracer version:

| Code Security capability                    | Python トレーサーの最小バージョン |
| ------------------------------------------- |-------------------------------|
| Runtime Software Composition Analysis (SCA) | 1.5.0                         |
| Runtime Code Analysis (IAST)                | Preview (`>=2.21.0`)          |

### サポートされるデプロイメントタイプ
| タイプ        | Threat Detection のサポート | ソフトウェア構成分析 |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

| タイプ              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | {{< X >}}                                   | プレビュー                             |
| Kubernetes        | {{< X >}}                                   | プレビュー                             |
| Amazon ECS        | {{< X >}}                                   | プレビュー                             |
| AWS Fargate       | {{< X >}}                                   | プレビュー                             |
| AWS Lambda        |                                             |                                     |

## 言語とフレームワークの互換性

### サポート対象の Python バージョン

The Python Application Security Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

2 つのリリースブランチに対応しています。

{{< partial name="trace_collection/python/supported_versions.html" >}}

また、このライブラリは以下のランタイムをサポートしています。

{{< partial name="trace_collection/python/supported_runtimes.html" >}}


### Web フレームワークの互換性

- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### アプリケーションセキュリティ機能に関する注意事項
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

### サポートされているフレームワーク

| フレームワーク                | バージョン | Runtime Code Analysis (IAST) |
| ------------------------ |----------| ---------------------------- |
| Django                   | `1.8`    | {{< X >}}                    |
| Flask                    | `0.10`   | {{< X >}}                    |

Flask では、クエリ文字列のサポートはありません。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性

**データストアのトレーシングでは以下の確認が可能です**

- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### コードセキュリティ機能に関する注意事項
- **Runtime Software Composition Analysis (SCA)** はすべてのフレームワークでサポートされます。

Python ライブラリは[データベース API 仕様][4]をサポートしており、すべての汎用 SQL データベースをサポートしています。これには SQLite、Mysql、Postgres、MariaDB などのデータベースが含まれます。

[1]: /ja/tracing/trace_collection/compatibility/python/
[2]: /ja/remote_configuration#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/
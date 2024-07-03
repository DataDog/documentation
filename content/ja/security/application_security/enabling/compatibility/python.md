---
code_lang: python
code_lang_weight: 50
kind: documentation
title: Python Compatibility Requirements
type: multi-code-lang
---
## Application Security capabilities support

The following application security capabilities are supported in the Python library, for the specified tracer version:

| Application Security capability  | Minimum Python tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection | 1.9.0   |
| Threat Protection | 1.10.0  |
| Customize response to blocked requests | 1.19.0 |
| Software Composition Analysis (SCA) | 1.5.0  |
| コードセキュリティ         |  private beta  |
| Automatic user activity event tracking | 1.17.0 |
| API Security | 2.6.0 |

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.

### サポートされるデプロイメントタイプ
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| Kubernetes  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |


## 言語とフレームワークの互換性

### サポート対象の Python バージョン

The Python Application Security Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

2 つのリリースブランチに対応しています。

| リリース    | サポートレベル        |
|------------|----------------------|
| `<1`       | メンテナンス           |
| `>=1.0,<2` | 一般提供 |

また、このライブラリは以下のランタイムをサポートしています。

| OS      | CPU                   | ランタイム | ランタイムバージョン | ddtrace のバージョンに対応 |
|---------|-----------------------|---------|-----------------|--------------------------|
| Linux   | x86-64、i686、AArch64 | CPython | 2.7、3.5-3.11   | `<2`                     |
| MacOS   | Intel、Apple Silicon  | CPython | 2.7、3.5-3.11   | `<2`                     |
| Windows | 64bit、32bit          | CPython | 2.7、3.5-3.11   | `<2`                     |


### Web フレームワークの互換性

- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks

### サポートされているフレームワーク


| フレームワーク                | バージョン    | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
| ------------------------ | ----------- | --------------- | ---------------------------------------------- |
| Django    | 1.8   |  {{< X >}} | {{< X >}}  |
| Flask     | 0.10  |  {{< X >}} | {{< X >}}  |

Flask では、クエリ文字列のサポートはありません。

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### データストアの互換性


**データストアのトレーシングでは以下の確認が可能です**

- リクエストの応答タイミング
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースの取得

##### Application Security Capability Notes
- **Software Composition Analysis** is supported on all frameworks.
- **Threat Protection** は HTTP リクエスト (input) レイヤーでも機能するため、下表に掲載されていなくても、デフォルトですべてのデータベースで機能します。
-
Python ライブラリは[データベース API 仕様][4]をサポートしており、すべての汎用 SQL データベースをサポートしています。これには SQLite、Mysql、Postgres、MariaDB などのデータベースが含まれます。

### User Authentication Frameworks の互換性

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーログインイベントのアカウント乗っ取り検出モニタリング

| フレームワーク         | フレームワークバージョン   |
|-------------------| --------------------------- |
| Django            | 1.11、2.2、3.2、>= 4.0

[1]: /ja/tracing/trace_collection/compatibility/python/
[2]: /ja/agent/remote_config/#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/
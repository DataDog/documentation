---
code_lang: ruby
code_lang_weight: 30
kind: documentation
title: Ruby 互換性要件
type: multi-code-lang
---

## Application Security capabilities support

The following application security capabilities are supported in the Ruby library, for the specified tracer version:

| Application Security capability  | Ruby トレーサーの最小バージョン |
| -------------------------------- | ----------------------------|
| Threat Detection  | 1.9.0  |
| Threat Protection | 1.11.0 |
| ブロックされたリクエストへの対応をカスタマイズする | 1.15.0 |
| Software Composition Analysis (SCA) | 1.11.0 |
| Code Security        | 非対応 |
| ユーザーアクティビティイベントの自動追跡 | 1.14.0 |
| API Security | 1.15.0 |

The minimum tracer version to get all supported application security capabilities for Ruby is 1.15.0.

<div class="alert alert-info">サポートされていない機能または Ruby フレームワークのサポート追加を希望される場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>

### サポートされるデプロイメントタイプ
| タイプ        | Threat Detection のサポート | Software Composition Analysis |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                |                               |
| Kubernetes  | {{< X >}}                |                               |
| Amazon ECS  | {{< X >}}                |                               |
| AWS Fargate | {{< X >}}                |                               |
| AWS Lambda  |                          |                               |

## 言語とフレームワークの互換性


**サポートされる Ruby インタプリター**
Datadog Ruby ライブラリは、以下の Ruby インタプリターの最新 gem をサポートしています。

- [MRI][2] バージョン 2.1～3.1

これらは、以下のアーキテクチャでサポートされています。
- Linux (GNU) x86-64、aarch64
- Alpine Linux (musl) x86-64、aarch64
- macOS (Darwin) x86-64、arm64

### サポートされる Web サーバー
- 攻撃元の HTTP リクエストの詳細
- HTTP リクエスト用のタグ (ステータスコード、メソッドなど)
- アプリケーション内の攻撃フローを確認するための分散型トレーシング

##### Application Security Capability Notes
- **Code Security** is not supported

| フレームワーク                | Threat Detection のサポートの有無 | Threat Protection のサポートの有無 |
| ------------------------ | ----------- | --------------- |
| Rack          |  {{< X >}} |  {{< X >}} |
| Rails         |  {{< X >}} |  {{< X >}} |
| Sinatra       |  {{< X >}} |  {{< X >}} |
| Grape         |  {{< X >}} |  {{< X >}} |
| Unicorn       |  {{< X >}} |  {{< X >}} |
| Passenger     |  {{< X >}} |  {{< X >}} |

| Framework Web Server    | フレームワークの最小バージョン   |
| ----------------------- | --------------------------- |
| Rack                    | 1.1                         |
| Rails                   | 3.2 (Ruby のバージョンにも依存します) |
| Sinatra                 | 1.4                         |

### ネットワーキングフレームワークの互換性

**ネットワーキングのトレーシングでは以下の確認が可能です**

- アプリケーションの分散型トレーシング
- リクエストベースのブロッキング

##### Application Security Capability Notes
- **Code Security** is not supported

| フレームワーク         | Threat Detection のサポートの有無    | Threat Protection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| Rack         | {{< X >}} | {{< X >}}  |

<div class="alert alert-info">ご希望のフレームワークが掲載されていない場合は、お知らせください！<a href="https://forms.gle/gHrxGQMEnAobukfn7">この短いフォーム</a>に必要事項を記入して、詳細を送信してください。</div>


### データストアの互換性

**データストアのトレーシングでは以下の確認が可能です**

- SQL 攻撃検出
- クエリ情報 (サニタイジングされたクエリ文字列など)
- エラーとスタックトレースのキャプチャ

##### Application Security Capability Notes
- **Code Security** is not supported
- **Threat Protection** は HTTP リクエスト (入力) レイヤーでも機能し、そのため下表に掲載されていないデータベースでもデフォルトで機能します。

| フレームワーク         | Threat Detection のサポートの有無    | Threat Protection のサポートの有無                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| MongoDB        | {{< X >}} |   {{< X >}}    |
| Active Record        | {{< X >}} |   {{< X >}}    |
| MySQL2        | {{< X >}} |   {{< X >}}    |
| Presto        | {{< X >}} |   {{< X >}}    |
| Resque        | {{< X >}} |   {{< X >}}    |
| Sequel        | {{< X >}} |   {{< X >}}    |
| Elasticsearch     | {{< X >}} |   {{< X >}}    |

### User Authentication Frameworks の互換性

**User Authentication Frameworks へのインテグレーションは以下を提供します。**

- ユーザー ID を含むユーザーログインイベント
- ユーザーログインイベントのアカウント乗っ取り検出モニタリング

| フレームワーク         | フレームワークの最小バージョン   |
|-------------------| --------------------------- |
| Devise            | 3.2.1

[1]: /ja/tracing/trace_collection/compatibility/ruby/
[2]: https://www.ruby-lang.org/
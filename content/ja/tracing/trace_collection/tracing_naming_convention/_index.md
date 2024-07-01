---
further_reading:
- link: logs/log_configuration/attributes_naming_convention
  tag: ドキュメント
  text: ログ管理の標準属性の詳細はこちら
- link: /real_user_monitoring/browser/data_collected
  tag: ドキュメント
  text: RUM ブラウザ用に収集したデータ
- link: /tracing/trace_explorer/query_syntax/
  tag: ドキュメント
  text: トレースの調査方法
kind: documentation
title: スパンタグのセマンティクス
---

## 概要

[Datadog トレーシングライブラリ][1]は、様々なライブラリのインスツルメンテーションをすぐに利用できるようサポートしています。
これらのインスツルメンテーションは、分散システムにおける作業の論理的な単位を表すスパンを生成します。
各スパンは[スパンタグ][2]を含み、システムで発生している作業単位に関する追加情報を提供します。命名規則では、スパンイベントで使用できる名前と内容を記述しています。

<div class="alert alert-info">すべてのスパンタグ、予約属性、命名規則の包括的なリストは、<a href="/standard-attributes/?product=apm">デフォルトの標準属性</a>を参照してください。</div>

## スパンタグの命名規則

システムで行われている作業を記述するために、さまざまなスパンタグがあります。例えば、以下のドメインを記述するスパンタグがあります。

- **Reserved**: すべてのスパンに常に存在する属性。
- **Core**: 使用されるインスツルメンテーションと操作の種類。
- **Network communications**: ネットワーク通信に対応した作業単位。
- **HTTP requests**: HTTPクライアントとサーバーのスパン。
- **Database**: データベースのスパン。
- **Message queue**: メッセージングシステムのスパン。
- **Remote procedure calls**: RMI や gRPC などのリモートプロシージャコールに対応するスパン。
- **Errors**: スパンに関連するエラー。

詳しくは[デフォルト標準属性][6]を参照してください。

## スパンタグとスパン属性

スパンタグとスパン属性は似ていますが異なる概念です。

- [スパンタグ](#span-tags)は、スパン周辺のコンテキストです。
- [スパン属性](#span-attributes)は、スパンの内容です。

### スパンタグ

スパンタグは、スパン周辺のコンテキストです。例えば、以下のようなものがあります。

- **ホストタグ**: `hostname`、`availability-zone`、`cluster-name`
- **コンテナタグ**: `container_name`、`kube_deployment`、`pod_name`

タグは通常、ホスト、コンテナ、サービスカタログから取得したタグなど、他のデータソースから補完されます。これらのタグは、コンテキストを記述するためにスパンに追加されます。例えば、タグは、スパンの出所であるホストやコンテナのプロパティや、スパンが発信されるサービスのプロパティを記述します。

Datadog でスパンタグを見つけるには、Trace サイドパネルの **Infrastructure** タブに移動します。

{{< img src="/tracing/attributes/span-tags.png" alt="Infrastructure タブのスパンタグ。" style="width:100%;" >}}

### スパン属性

スパン属性は、スパンの内容です。例えば、以下のようなものがあります。

- `http.url`
- `http.status_code`
- `error.message`

スパン属性をクエリするには、検索ボックスで `@` 文字の後に属性名を続けます。例えば、`@http.url` です。

Datadog でスパン属性を見つけるには、Trace サイドパネルの **Info** タブに移動します。

{{< img src="/tracing/attributes/span-attributes.png" alt="Info タブのスパン属性。" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/setup_overview/
[2]: /ja/glossary/#span-tag
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /ja/tracing/setup_overview/configure_data_security/
[5]: /ja/tracing/trace_collection/library_config/
[6]: /ja/standard-attributes/?product=apm
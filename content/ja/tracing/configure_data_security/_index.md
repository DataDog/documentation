---
aliases:
- /ja/security/tracing
- /ja/tracing/security
- /ja/tracing/guide/security
- /ja/tracing/guide/agent_obfuscation
- /ja/tracing/guide/agent-obfuscation
- /ja/tracing/custom_instrumentation/agent_customization
- /ja/tracing/faq/if-i-instrument-a-database-with-datadog-apm-will-there-be-sensitive-database-data-sent-to-datadog
- /ja/tracing/setup_overview/configure_data_security/
description: セキュリティおよび微調整のため、Datadog トレーサーまたは Agent を構成してスパンを修正、破棄します。
kind: documentation
title: Datadog Agent またはデータセキュリティ向けトレーサーを構成する
---
## 概要

Datadog で収集しているパフォーマンスデータおよびトレースには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、エラー数が不正確にカウントされたり、サービスの正常性が Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

Datadog Agent および一部のトレーシングライブラリには、このような状況に対応してスパンを修正または破棄するオプションが用意されています。その他さまざまなオプションは、下記をご参照ください。トレーサーおよび Agent を構成しセキュリティ要件を満たすための一般的な方法をご紹介しています。

ご希望の調整ニーズが記載されていない場合は、[Datadog サポートチーム][1]までお問い合わせください。

## リソース名の一般化とベースラインのフィルタリング

Datadog では、スパンに標準としてのフィルターメカニズムを実行し、基本的なセキュリティに対する正当なデフォルトと、分析中のグループ化のためのリソース名の生成を提供します。具体的には:

* **環境変数は Agent によって収集されません。**
* **プリペアドステートメントを使用しない場合でも、SQL 変数は難読化されます**。たとえば、`SELECT data FROM table WHERE key=123 LIMIT 10` という `sql.query` 属性は、変数が難読化されて、`SELECT data FROM table WHERE key = ? LIMIT ?` というリソース名になります。
* **SQL strings are identified using standard ANSI SQL quotes** (SQL 文字列は、標準的な ANSI SQL 引用符**を使用して識別されます): これは、文字列はシングルクォート (`'`) で囲まなければならないことを意味します。SQL の種類によっては、オプションで文字列のダブルクォート（`"`）をサポートしていますが、ほとんどの場合、ダブルクォートされたものは識別子として扱われます。Datadog の難読化ツールは、これらを文字列ではなく識別子として扱い、難読化を行いません。
* **リソース名 (リクエスト URL など) 内の数字は難読化されます**。たとえば、次の `elasticsearch` 属性:

    ```text
    Elasticsearch : {
        method : GET,
        url : /user.0123456789/friends/_count
    }
    ```

    は、URL 内の数字が難読化されて、`GET /user.?/friends/_count` というリソース名になります。

## Agent トレースの難読化

Agent [トレース][2]の難読化は、デフォルトで無効になっています。トレースに付加された情報を難読化するには、`datadog.yaml` コンフィギュレーションファイルで難読化を有効にする必要があります。

このオプションは、以下のサービスでご利用いただけます。

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`

**注:** 複数のタイプのサービスに、同時に自動スクラビングを使用することができます。`datadog.yaml` ファイルの `obfuscation` セクションでそれぞれを構成します。.
{{< tabs >}}
{{% tab "MongoDB" %}}

`mongodb` タイプの[スパン][1]（具体的には `mongodb.query` スパンタグ）に適用するには、次のように構成します。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    # MongoDB 難読化規則。"mongodb" タイプのスパンに適用。
    # 具体的には、"mongodb.query" タグ。
    mongodb:
      enabled: true
      # ここにリストされたキーの値は難読化されません。
      keep_values:
        - document_id
        - template_id
```

* `keep_values` - Agent トレースの難読化から除外するキーのセットを定義します。

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

`elasticsearch` タイプの[スパン][1]（具体的には `elasticsearch.body` スパンタグ）に適用するには、次のように構成します。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    # ElasticSearch 難読化規則。"elasticsearch" タイプのスパンに適用。
    # 具体的には、"elasticsearch.body" タグ。
    elasticsearch:
      enabled: true
      # ここにリストされたキーの値は難読化されません。
      keep_values:
        - client_id
        - product_id
```

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Redis" %}}

`redis` タイプの[スパン][1]（具体的には `redis.raw_command` スパンタグ）に適用するには、次のように構成します。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    redis:
      enabled: true
```

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

`memcached` タイプの[スパン][1]（具体的には `memcached.command` スパンタグ）に適用するには、次のように構成します。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      enabled: true
```

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Http" %}}

`http` タイプの[スパン][1]では、`http.url` メタデータに以下の HTTP 難読化規則が適用されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string`: true に設定すると、URL に含まれるクエリ文字列が難読化されます。
* `remove_paths_with_digits`: true に設定すると、数字を含む URL のパスセグメントが "?" で置換されます。


[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Stack Traces" %}}

`remove_stack_traces` パラメーターを true に設定すると、スタックトレースが削除され、"?" で置換されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    remove_stack_traces: true
```

{{% /tab %}}
{{< /tabs >}}

## 収集した HTTP データ

Datadog は、サポートされているトレーシングライブラリ間で、Web スパン用に収集されるタグを標準化しています。これらのタグの収集が実装されているかどうかは、ライブラリのリリースノートを確認してください。完全に標準化されたライブラリの場合、[スパンタグのセマンティクス][11]を参照してください。

### クライアント IP ヘッダーの構成

Datadog は自動的に、`X-Forwarded-For` のようなよく知られたヘッダーから、`http.client_ip` を解決しようとします。もし、このフィールドにカスタムヘッダーを使用したり、解決アルゴリズムをバイパスしたい場合は、`DD_TRACE_CLIENT_IP_HEADER` 環境変数を設定すると、ライブラリはクライアント IP の指定されたヘッダーのみを検索します。

クライアントの IP 値を収集したくない場合は、`DD_TRACE_CLIENT_IP_HEADER_DISABLED` 環境変数を `true` に設定します。デフォルトでは `false` になっています。

### URL のクエリを編集する

`http.url` タグには、クエリ文字列を含む完全な URL 値が割り当てられます。クエリ文字列は機密データを含む可能性があるため、デフォルトで Datadog はこれをパースし、疑わしい値を削除します。この編集プロセスは構成可能です。編集に使われる正規表現を変更するには、`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` 環境変数に有効な正規表現を設定します。有効な正規表現はプラットフォームに依存します。この正規表現は疑わしいキーと値のペアを見つけると、それを `<redacted>` に置き換えます。

クエリ文字列を収集したくない場合は、環境変数 `DD_HTTP_SERVER_TAG_QUERY_STRING` を `false` に設定します。デフォルトは `true` です。

### ルートスパンにヘッダータグを適用する

トレースヘッダータグを収集するには、 `DD_TRACE_HEADER_TAGS` 環境変数に、大文字小文字を区別しないヘッダーキーとタグ名のマップを設定します。ライブラリは、マッチするヘッダー値をルートスパンのタグとして適用します。この設定は、例えば、指定されたタグ名のないエントリーを受け入れることもできます。

```
DD_TRACE_HEADER_TAGS=CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name
```

## ログの機密スパンのスクラビング

[スパン][3]のタグから機密データをスクラブするには、[datadog.yaml コンフィギュレーションファイル][4]の `replace_tags` 設定、または `DD_APM_REPLACE_TAGS` 環境変数を使用します。設定または環境変数の値は、タグ内で機密データの置換方法を指定するパラメーターグループの一覧です。パラメーターは以下のとおりです。

* `name`: 置換するタグのキー。すべてのタグを照合するには、`*` を使用します。リソースを照合するには、`resource.name` を使用します。
* `pattern`: 照合対象の正規表現パターン。
* `repl`: 置換文字列。

例:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # タグ "http.url" 内で、文字列 `token/` で始まるすべての文字を "?" で置換します:
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # "bar" を持つタグに存在するすべての "foo" を置換します:
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # すべての "error.stack" タグの値を削除します。
    - name: "error.stack"
      pattern: "(?s).*"
```

{{% /tab %}}
{{% tab "環境変数" %}}

```shell
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

**注**: 推奨の [Daemonset コンフィギュレーション][1]を使用している場合は、この環境変数を trace-agent コンテナに挿入します。

```datadog-agent.yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            }
          ]'
```

[1]: /ja/agent/kubernetes/?tab=daemonset
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"}]
```

{{% /tab %}}
{{< /tabs >}}

## リソースを収集から除外

特定のリソースをトレースしないオプションに関する詳しい概要については、[不要なリソースを無視する][5]をご参照ください。

サービスに、ヘルスチェックなどシミュレーショントラフィックが含まれる場合、このようなトレースの収集を除外して、サービスのメトリクスが本番トラフィックと一致するようにすることが望ましい場合があります。

そこで、Agent により Datadog に送信されるトレースから、特定のリソースを除外するように Agent を設定できます。特定のリソースが送信されないようにするには、`datadog.yaml` ファイルの `ignore_resources` 設定を使用します。そして、1 つ以上の正規表現のリストを作成し、リソース名に基づき Agent で除外するリソースを指定します。

コンテナ化された環境で実行している場合は、代わりに Datadog Agent を使用してコンテナに `DD_APM_IGNORE_RESOURCES` を設定します。詳細については、[Docker APM Agent 環境変数][6]をご参照ください。

```text
## @param ignore_resources - 文字列のリスト - オプション
## リソース名に基づいて特定のトレースを除外するために、正規表現のリストを指定できます。
## すべてのエントリは二重引用符で囲み、カンマで区切る必要があります。
# ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
```

## トレースを Agent API に直接送信

特定のアプリケーション用にカスタマイズされたインスツルメンテーションが必要な場合は、Agent 側のトレース API を使用して、トレースに含めるスパンを個別に選択することを検討してください。詳細については、[API に関するドキュメント][7]を参照してください。

## Datadog トレーサーでスパンを修正

このページでは、データが Datadog Agent に到達してから修正する方法について説明していますが、一部のトレーシングライブラリは拡張可能です。カスタムポストプロセッサーを作成してスパンをインターセプトし、適宜 (正規表現マッチなどに基づき) 調整または破棄することが可能です。詳細は、ご希望の言語で「カスタムインスツルメンテーション」ドキュメントをご参照ください。

* Java: [TraceInterceptor インターフェイス][8]
* Ruby: [処理パイプライン][9]
* Python: [トレースフィルター][10]

## テレメトリーの収集

Datadog は、お客様のトレーシングライブラリに関する環境情報や診断情報を収集して処理することがあります。これには、アプリケーションを実行しているホスト、オペレーティングシステム、プログラミング言語とランタイム、使用する APM インテグレーション、およびアプリケーションの依存関係に関する情報が含まれる場合があります。さらに、Datadog は、診断ログ、難読化されたスタックトレースを含むクラッシュダンプ、および様々なシステムパフォーマンスメトリクスなどの情報を収集する場合があります。

このテレメトリー収集を無効にするには、インスツルメンテーションを行うアプリケーションで `DD_INSTRUMENTATION_TELEMETRY_ENABLED` 環境変数を `false` に設定してください。

[1]: /ja/help/
[2]: /ja/tracing/glossary/#trace
[3]: /ja/tracing/glossary/#spans
[4]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[5]: /ja/tracing/guide/ignoring_apm_resources/
[6]: /ja/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[7]: /ja/tracing/guide/send_traces_to_agent_by_api/
[8]: /ja/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
[9]: /ja/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
[11]: /ja/tracing/trace_collection/tracing_naming_convention/#http-requests
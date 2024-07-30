---
aliases:
- /ja/tracing/security
- /ja/tracing/guide/security
- /ja/tracing/guide/agent_obfuscation
- /ja/tracing/guide/agent-obfuscation
- /ja/tracing/custom_instrumentation/agent_customization
- /ja/tracing/faq/if-i-instrument-a-database-with-datadog-apm-will-there-be-sensitive-database-data-sent-to-datadog
- /ja/tracing/setup_overview/configure_data_security/
description: クライアントライブラリまたは Agent を構成して、トレース内の機密データの収集を制御します。
title: データセキュリティ
---
## 概要

Datadog トレーシングライブラリは、インスツルメンテーションされたアプリケーションからデータを収集します。そのデータはトレースとして Datadog に送信され、個人を特定できる情報 (PII) のような機密データが含まれている可能性があります。機密データをトレースとして Datadog に取り込む場合は、[機密データスキャナー][12]を使って取り込み時に修復を追加することができます。また、トレースが Datadog に送信される前に、Datadog Agent またはトレーシングライブラリを構成して、機密データを収集時に修復することもできます。

ここで説明する構成がコンプライアンス要件をカバーしない場合は、[Datadog サポートチーム][1]にお問い合わせください。

### トレースデータに含まれる個人情報

Datadog の APM トレーシングライブラリは、アプリケーションに関する関連する観測可能性データを収集します。これらのライブラリは、トレースデータに含まれる何百もの一意の属性を収集するため、このページでは、従業員やエンドユーザーの個人情報を含む可能性のある属性を中心に、データのカテゴリーについて説明します。

以下の表は、トレーシングライブラリによって提供される自動インスツルメンテーションによって収集される個人データのカテゴリーについて、一般的な例を挙げて説明しています。

| カテゴリー            | 説明                                                                                                            |
|:--------------------|:-----------------------------------------------------------------------------------------------------------------------|
| 名前                | 社内ユーザー (従業員) またはエンドユーザーの氏名。                                                         |
| メール               | 社内ユーザー (従業員) またはエンドユーザーのメールアドレス。                                                     |
| クライアント IP           | 受信リクエストに関連するエンドユーザーの IP アドレス、または送信リクエストの外部 IP アドレス。 |
| データベースステートメント | 実行されたデータベースステートメントで使用されるリテラル、リテラル列、バインド変数。                           |
| 地理的位置 | 個人または世帯を特定するために使用できる経度と緯度の座標。                            |
| URI パラメーター      | URI パスまたは URI クエリの変数部分のパラメーター値。                                            |
| URI ユーザー情報        | ユーザー名を含むことができる URI のユーザー情報サブコンポーネント。                                                   |

以下の表は、データカテゴリーが収集されるかどうか、およびデフォルトで難読化されるかどうかに関する、各言語トレーシングライブラリのデフォルトの動作について説明しています。

{{% tabs %}}

{{% tab ".NET" %}}

| カテゴリー            | 収集                       | 難読化                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| 名前                | <i class="icon-check-bold"></i> |                                 |
| メール               | <i class="icon-check-bold"></i> |                                 |
| クライアント IP           | <i class="icon-check-bold"></i> |                                 |
| データベースステートメント | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| 地理的位置 |                                 |                                 |
| URI パラメーター      | <i class="icon-check-bold"></i> |                                 |
| URI ユーザー情報        |                                 |                                 |

{{% /tab %}}

{{% tab "Java" %}}

**注:** データベースステートメントはデフォルトでは収集されないため、有効にする必要があります。

| カテゴリー            | 収集                       | 難読化                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| 名前                | <i class="icon-check-bold"></i> |                                 |
| メール               | <i class="icon-check-bold"></i> |                                 |
| クライアント IP           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| データベースステートメント | <i class="icon-check-bold"></i> |                                 |
| 地理的位置 |                                 |                                 |
| URI パラメーター      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI ユーザー情報        |                                 |                                 |

{{% /tab %}}

{{% tab "Node.js" %}}

**注:** URI パラメーターはデフォルトでは収集されないため、有効にする必要があります。

| カテゴリー            | 収集                       | 難読化                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| 名前                | <i class="icon-check-bold"></i> |                                 |
| メール               | <i class="icon-check-bold"></i> |                                 |
| クライアント IP           | <i class="icon-check-bold"></i> |                                 |
| データベースステートメント | <i class="icon-check-bold"></i> |                                 |
| 地理的位置 |                                 |                                 |
| URI パラメーター      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI ユーザー情報        |                                 |                                 |

{{% /tab %}}

{{% tab "PHP" %}}

**注:** 名前とメールアドレスはデフォルトでは収集されないため、有効にする必要があります。

| カテゴリー            |            収集            |           難読化            |
|:--------------------|:-------------------------------:|:-------------------------------:|
| 名前                | <i class="icon-check-bold"></i> |                                 |
| メール               | <i class="icon-check-bold"></i> |                                 |
| クライアント IP           | <i class="icon-check-bold"></i> |                                 |
| データベースステートメント | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| 地理的位置 |                                 |                                 |
| URI パラメーター      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI ユーザー情報        | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |

{{% /tab %}}

{{% tab "Python" %}}

**注:** クライアント IP、地理的位置、および URI パラメーターはデフォルトでは収集されないため、有効にする必要があります。

| カテゴリー            | 収集                       | 難読化                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| 名前                | <i class="icon-check-bold"></i> |                                 |
| メール               | <i class="icon-check-bold"></i> |                                 |
| クライアント IP           | <i class="icon-check-bold"></i> |                                 |
| データベースステートメント | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| 地理的位置 | <i class="icon-check-bold"></i> |                                 |
| URI パラメーター      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI ユーザー情報        |                                 |                                 |

[1]: /ja/tracing/trace_collection/compatibility/python/#datastore-compatibility
{{% /tab %}}

{{% tab "Ruby" %}}

**注:** クライアント IP はデフォルトでは収集されないため、有効にする必要があります。

| カテゴリー            | 収集                       | 難読化                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| 名前                | <i class="icon-check-bold"></i> |                                 |
| メール               | <i class="icon-check-bold"></i> |                                 |
| クライアント IP           | <i class="icon-check-bold"></i> |                                 |
| データベースステートメント | <i class="icon-check-bold"></i> |                                 |
| 地理的位置 |                                 |                                 |
| URI パラメーター      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI ユーザー情報        |                                 |                                 |

{{% /tab %}}

{{% tab "Go" %}}

**注:** クライアント IP はデフォルトでは収集されないため、有効にする必要があります。データベース ステートメントとクライアント URI は、Datadog Agent によって難読化されます。

| カテゴリー                | 収集                       | 難読化                      |
|:------------------------|:-------------------------------:|:-------------------------------:|
| 名前                    |                                 |                                 |
| メール                   |                                 |                                 |
| クライアント IP               | <i class="icon-check-bold"></i> |                                 |
| データベースステートメント     | <i class="icon-check-bold"></i> |                                 |
| 地理的位置情報     |                                 |                                 |
| クライアント URI パス         | <i class="icon-check-bold"></i> |                                 |
| クライアント URI クエリ文字列 | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| サーバー URI パス         | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| サーバー URI クエリ文字列 | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| HTTP 本文               | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| HTTP クッキー            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| HTTP ヘッダー            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |

{{% /tab %}}

{{% tab "Nginx" %}}

| カテゴリー                | 収集                       | 難読化 |
|:------------------------|:-------------------------------:|:----------:|
| 名前                    |                                 |            |
| メール                   |                                 |            |
| クライアント IP               | <i class="icon-check-bold"></i> |            |
| データベースステートメント     |                                 |            |
| 地理的位置情報     |                                 |            |
| クライアント URI パス         | <i class="icon-check-bold"></i> |            |
| クライアント URI クエリ文字列 | <i class="icon-check-bold"></i> |            |
| サーバー URI パス         |                                 |            |
| サーバー URI クエリ文字列 |                                 |            |
| HTTP 本文               |                                 |            |
| HTTP クッキー            |                                 |            |
| HTTP ヘッダー            |                                 |            |

{{% /tab %}}

{{% tab "Kong" %}}

| カテゴリー                | 収集                       | 難読化 |
|:------------------------|:-------------------------------:|:----------:|
| 名前                    |                                 |            |
| メール                   |                                 |            |
| クライアント IP               | <i class="icon-check-bold"></i> |            |
| データベースステートメント     |                                 |            |
| 地理的位置情報     |                                 |            |
| クライアント URI パス         | <i class="icon-check-bold"></i> |            |
| クライアント URI クエリ文字列 |                                 |            |
| サーバー URI パス         |                                 |            |
| サーバー URI クエリ文字列 |                                 |            |
| HTTP 本文               |                                 |            |
| HTTP クッキー            |                                 |            |
| HTTP ヘッダー            |                                 |            |

{{% /tab %}}

{{% tab "Envoy" %}}

| カテゴリー                | 収集                       | 難読化 |
|:------------------------|:-------------------------------:|:----------:|
| 名前                    |                                 |            |
| メール                   |                                 |            |
| クライアント IP               | <i class="icon-check-bold"></i> |            |
| データベースステートメント     |                                 |            |
| 地理的位置情報     |                                 |            |
| クライアント URI パス         |                                 |            |
| クライアント URI クエリ文字列 |                                 |            |
| サーバー URI パス         |                                 |            |
| サーバー URI クエリ文字列 |                                 |            |
| HTTP 本文               |                                 |            |
| HTTP クッキー            |                                 |            |
| HTTP ヘッダー            |                                 |            |

{{% /tab %}}

{{% /tabs %}}

Datadog Application Security Management (ASM) を使用している場合、トレーシングライブラリは HTTP リクエストデータを収集し、疑わしいリクエストの性質を理解するのに役立ちます。Datadog ASM は、特定のデータを自動的に編集し、独自の検出ルールを構成することができます。これらのデフォルトと構成オプションの詳細については、 Datadog ASM [データプライバシー][13]のドキュメントを参照してください。

## Agent

### リソース名

Datadog のスパンには、機密データを含む可能性のあるリソース名属性が含まれています。Datadog Agent は、いくつかの既知のケースに対してリソース名の難読化を実装しています。

* **SQL numeric literals and bind variables are obfuscated** (SQL の数値リテラルとバインド変数は難読化されます): 例えば、以下のクエリ `SELECT data FROM table WHERE key=123 LIMIT 10` は、クエリスパンのリソース名を設定する前に、`SELECT data FROM table WHERE key = ? LIMIT ?` に難読化されます。
* **SQL literal strings are identified using standard ANSI SQL quotes** (SQL リテラル文字列は、標準的な ANSI SQL 引用符**を使用して識別されます): これは、文字列はシングルクォート (`'`) で囲まなければならないことを意味します。SQL の種類によっては、オプションで文字列のダブルクォート（`"`）をサポートしていますが、ほとんどの場合、ダブルクォートされたものは識別子として扱われます。Datadog の難読化ツールは、これらを文字列ではなく識別子として扱い、難読化を行いません。
* **Redis queries are quantized by selecting only command tokens** (Redis のクエリはコマンドトークンのみを選択して量子化されます): 例えば、以下のクエリ `MULTI\nSET k1 v1\nSET k2 v2` は `MULTI SET SET` に量子化されます。

### トレースの難読化

Datadog Agent は、リソース名に含まれない機密[トレース][2]データも難読化します。難読化ルールは、環境変数または `datadog.yaml` コンフィギュレーションファイルを使用して構成できます。

以下のメタデータを難読化できます。

* MongoDB クエリ
* ElasticSearch リクエスト本文
* Redis コマンド
* MemCached コマンド
* HTTP URL
* スタックトレース

**注:** 難読化はシステムのパフォーマンスに影響を与えたり、機密情報ではない重要な情報を隠したりする可能性があります。セットアップにどのような難読化が必要かを検討し、適切に構成をカスタマイズしてください。

**注:** 複数のタイプのサービスに、同時に自動スクラビングを使用することができます。`datadog.yaml` ファイルの `obfuscation` セクションでそれぞれを構成します。
{{< tabs >}}

{{% tab "MongoDB" %}}

`mongodb` 型の[スパン][1]内の MongoDB クエリはデフォルトで難読化されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    mongodb:
      ## "mongodb" 型のスパンに対する難読化ルールを構成します。デフォルトでは有効になっています。
      enabled: true
      keep_values:
        - document_id
        - template_id
      obfuscate_sql_values:
        - val1
```

これは環境変数 `DD_APM_OBFUSCATION_MONGODB_ENABLED=false` で無効にすることもできます。

* `keep_values` または環境変数 `DD_APM_OBFUSCATION_MONGODB_KEEP_VALUES` - Datadog Agent のトレース難読化から除外するキーのセットを定義します。設定しない場合は、すべてのキーが難読化されます。
* `obfuscate_sql_values` または環境変数 `DD_APM_OBFUSCATION_MONGODB_OBFUSCATE_SQL_VALUES` - Datadog Agent のトレース難読化に含めるキーのセットを定義します。設定しない場合は、すべてのキーが難読化されます。

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

`elasticsearch` 型の[スパン][1]内の ElasticSearch リクエスト本文はデフォルトで難読化されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    elasticsearch:
      ## "elasticsearch" 型のスパンに対する難読化ルールを構成します。デフォルトでは有効になっています。
      enabled: true
      keep_values:
        - client_id
        - product_id
      obfuscate_sql_values:
        - val1
```

これは環境変数 `DD_APM_OBFUSCATION_ELASTICSEARCH_ENABLED=false` で無効にすることもできます。

* `keep_values` または環境変数 `DD_APM_OBFUSCATION_ELASTICSEARCH_KEEP_VALUES` - Datadog Agent のトレース難読化から除外するキーのセットを定義します。設定しない場合は、すべてのキーが難読化されます。
* `obfuscate_sql_values` または環境変数 `DD_APM_OBFUSCATION_ELASTICSEARCH_OBFUSCATE_SQL_VALUES` - Datadog Agent のトレース難読化に含めるキーのセットを定義します。設定しない場合は、すべてのキーが難読化されます。

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Redis" %}}

`redis` 型の[スパン][1]内の Redis コマンドはデフォルトで難読化されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## "redis" 型のスパンに対する難読化ルールを構成します。デフォルトでは有効になっています。
    redis:
      enabled: true
      remove_all_args: true
```

これは環境変数 `DD_APM_OBFUSCATION_REDIS_ENABLED=false` で無効にすることもできます。

* `remove_all_args` または環境変数 `DD_APM_OBFUSCATION_REDIS_REMOVE_ALL_ARGS` - true の場合、redis コマンドのすべての引数を単一の "?" に置き換えます。デフォルトでは無効です。

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

`memcached` 型の[スパン][1]内の MemCached コマンドはデフォルトで難読化されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      ## "memcached" 型のスパンに対する難読化ルールを構成します。デフォルトでは有効になっています。
      enabled: true
```

これは環境変数 `DD_APM_OBFUSCATION_MEMCACHED_ENABLED=false` で無効にすることもできます。

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Http" %}}

`http` または `web` 型の[スパン][1]内の HTTP URL はデフォルトでは難読化されません。

**注:** URL の Userinfo 内のパスワードは Datadog によって収集されません。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      ## URL 内のクエリ文字列の難読化を有効にします。デフォルトでは無効になっています。
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string` または環境変数 `DD_APM_OBFUSCATION_HTTP_REMOVE_QUERY_STRING`: true の場合、URL (`http.url`) 内のクエリ文字列を難読化します。
* `remove_paths_with_digits` または環境変数 `DD_APM_OBFUSCATION_HTTP_REMOVE_PATHS_WITH_DIGITS`: この値が true の場合、URL (`http.url`) のパスセグメントで数字のみを含むものは "?" に置き換えられます。

[1]: /ja/tracing/glossary/#spans
{{% /tab %}}
{{% tab "Stack Traces" %}}

デフォルトでは無効になっています。

`remove_stack_traces` パラメーターを true に設定すると、スタックトレースが削除され、`?` で置換されます。

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## スタックトレースを削除し、"?" に置き換えることを有効にします。デフォルトでは無効になっています。
    remove_stack_traces: true # default false
```

これは環境変数 `DD_APM_OBFUSCATION_REMOVE_STACK_TRACES=false` で有効にすることもできます。

{{% /tab %}}
{{< /tabs >}}

### タグの置換

[スパン][4]のタグから機密データをスクラブするには、[datadog.yaml コンフィギュレーションファイル][5]の `replace_tags` 設定、または `DD_APM_REPLACE_TAGS` 環境変数を使用します。設定または環境変数の値は、タグ内で機密データの置換方法を指定するパラメーターグループの一覧です。パラメーターは以下のとおりです。

* `name`: 置換するタグのキー。すべてのタグを照合するには、`*` を使用します。リソースを照合するには、`resource.name` を使用します。
* `pattern`: 照合対象の正規表現パターン。
* `repl`: 置換文字列。

例:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # タグ "http.url" 内で、文字列 `token/` で始まるすべての文字を "?" で置換します
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # リソース名の末尾の "/" 文字を削除します
    - name: "resource.name"
      pattern: "(.*)\/$"
      repl: "$1"
    # 任意のタグに存在する "foo" のすべての出現を "bar" に置換します
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # すべての "error.stack" タグの値を削除します
    - name: "error.stack"
      pattern: "(?s).*"
    # エラーメッセージ内の数字の連続を置換します
    - name: "error.msg"
      pattern: "[0-9]{10}"
      repl: "[REDACTED]"
```

{{% /tab %}}
{{% tab "環境変数" %}}

```json
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "resource.name",
        "pattern": "(.*)\/$",
        "repl": "$1"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      },
      {
        "name": "error.msg",
        "pattern": "[0-9]{10}",
        "repl": "[REDACTED]"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

この環境変数は、[daemonset configuration][1] を使用している場合は trace-agent コンテナに、[helm chart][2] を使用している場合は `values.yaml` ファイル内の `agents.containers.traceAgent.env` に記述してください。

```datadog-agent.yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "resource.name",
              "pattern": "(.*)\/$",
              "repl": "$1"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            },
            {
              "name": "error.msg",
              "pattern": "[0-9]{10}",
              "repl": "[REDACTED]"
            }
          ]'
```

[1]: /ja/containers/kubernetes/installation/?tab=daemonset
[2]: /ja/containers/kubernetes/installation/?tab=helm
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"resource.name","pattern":"(.*)\/$","repl": "$1"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"}, {"name": "error.msg", "pattern": "[0-9]{10}", "repl": "[REDACTED]"}]
```

{{% /tab %}}
{{< /tabs >}}

### リソースを無視

特定のリソースをトレースしないオプションに関する詳しい概要については、[不要なリソースを無視する][6]をご参照ください。

サービスに、ヘルスチェックなどシミュレーショントラフィックが含まれる場合、このようなトレースの収集を除外して、サービスのメトリクスが本番トラフィックと一致するようにすることが望ましい場合があります。

そこで、Agent により Datadog に送信されるトレースから、特定のリソースを除外するように Agent を設定できます。特定のリソースが送信されないようにするには、`datadog.yaml` ファイルの `ignore_resources` 設定を使用します。そして、1 つ以上の正規表現のリストを作成し、リソース名に基づき Agent で除外するリソースを指定します。

コンテナ化された環境で実行している場合は、代わりに Datadog Agent を使用してコンテナに `DD_APM_IGNORE_RESOURCES` を設定します。詳細については、[Docker APM Agent 環境変数][7]をご参照ください。

```text
###### @param ignore_resources - 文字列のリスト - オプション
###### リソース名に基づいて特定のトレースを除外するために、正規表現のリストを指定できます。
###### すべてのエントリは二重引用符で囲み、カンマで区切る必要があります。
###### ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]

```

## ライブラリ

### HTTP

Datadog は、トレーシングライブラリ全体で[スパンタグのセマンティクス][3]を標準化しています。HTTP リクエストからの情報は `http.` をプレフィックスとするスパンタグとして追加されます。ライブラリには、HTTP スパンで収集される機密データを制御するための以下の構成オプションがあります。

#### クエリ文字列の編集

`http.url` タグには、クエリ文字列を含む完全な URL 値が割り当てられます。クエリ文字列は機密データを含む可能性があるため、デフォルトで Datadog はこれをパースし、疑わしい値を削除します。この編集プロセスは構成可能です。編集に使われる正規表現を変更するには、`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` 環境変数に有効な正規表現を設定します。有効な正規表現はプラットフォームに依存します。この正規表現は疑わしいキーと値のペアを見つけると、それを `<redacted>` に置き換えます。

クエリ文字列を収集したくない場合は、環境変数 `DD_HTTP_SERVER_TAG_QUERY_STRING` を `false` に設定します。デフォルトは `true` です。

#### ヘッダーの収集

トレースヘッダータグを収集するには、大文字小文字を区別しないヘッダーキーとタグ名のマップを指定して `DD_TRACE_HEADER_TAGS` 環境変数を設定します。ライブラリは、マッチしたヘッダー値を root スパンのタグとして適用します。この設定は指定されたタグ名のないエントリも受け入れることができます。例:

```
DD_TRACE_HEADER_TAGS=CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name
```

### 処理

いくつかのトレーシングライブラリは、トレースで収集された機密データを手動で修正または削除するためのスパンを処理するインターフェイスを提供します。

* Java: [TraceInterceptor インターフェイス][9]
* Ruby: [処理パイプライン][10]
* Python: [トレースフィルター][11]

## テレメトリーの収集

Datadog は、お客様のトレーシングライブラリに関する環境情報や診断情報を収集して処理することがあります。これには、アプリケーションを実行しているホスト、オペレーティングシステム、プログラミング言語とランタイム、使用する APM インテグレーション、およびアプリケーションの依存関係に関する情報が含まれる場合があります。さらに、Datadog は、診断ログ、難読化されたスタックトレースを含むクラッシュダンプ、および様々なシステムパフォーマンスメトリクスなどの情報を収集する場合があります。

これらの設定のいずれかを使用して、このテレメトリー収集を無効にできます。

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  telemetry:
    enabled: false
```

{{% /tab %}}
{{% tab "環境変数" %}}

```bash
export DD_INSTRUMENTATION_TELEMETRY_ENABLED=false
```

{{% /tab %}}
{{< /tabs >}}

## APM における PCI DSS 準拠

{{< site-region region="us" >}}

<div class="alert alert-warning">
APM の PCI 準拠は、<a href="/getting_started/site/">US1 サイト</a>の Datadog 組織でのみ利用可能です。
</div>

PCI 準拠の Datadog 組織をセットアップするには、以下の手順に従います。

1. [Datadog サポート][2]または[カスタマーサクセスマネージャー][3]に連絡し、組織を PCI 準拠の組織として構成するようリクエストします。
2. Datadog サポートまたはカスタマーサクセスが組織が PCI DSS に準拠していることを確認した後、PCI 準拠の専用エンドポイント (`https://trace-pci.agent.datadoghq.com`) にスパンを送信するように Agent コンフィギュレーションファイルを構成します。
    ```
    apm_config:
      apm_dd_url: <https://trace-pci.agent.datadoghq.com>
    ```

ログ で PCI 準拠を実現するためには、[ログ管理の PCI DSS 準拠][5]を参照してください。

[1]: /ja/getting_started/site/
[2]: /ja/help/
[3]: mailto:success@datadoghq.com
[4]: /ja/account_management/audit_trail/
[5]: /ja/data_security/logs/#pci-dss-compliance-for-log-management


{{< /site-region >}}

{{< site-region region="us2,us3,us5,eu,gov" >}}
APM の PCI 準拠は、{{< region-param key="dd_site_name" >}} サイトではご利用いただけません。
{{< /site-region >}}

[1]: /ja/help/
[2]: /ja/tracing/glossary/#trace
[3]: /ja/tracing/trace_collection/tracing_naming_convention/#http-requests
[4]: /ja/tracing/glossary/#spans
[5]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /ja/tracing/guide/ignoring_apm_resources/
[7]: /ja/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[8]: /ja/tracing/guide/send_traces_to_agent_by_api/
[9]: /ja/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
[10]: /ja/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[11]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
[12]: /ja/sensitive_data_scanner/
[13]: /ja/security/application_security/how-appsec-works/#data-privacy
---
title: Datadog Agent またはデータセキュリティ向けトレーサーを構成する
kind: documentation
description: セキュリティおよび微調整のため、Datadog トレーサーまたは Agent を構成してスパンを修正、破棄します。
aliases:
  - /ja/security/tracing
  - /ja/tracing/security
  - /ja/tracing/guide/security
  - /ja/tracing/guide/agent_obfuscation
  - /ja/tracing/guide/agent-obfuscation
  - /ja/tracing/custom_instrumentation/agent_customization
---
## 概要

Datadog で収集しているパフォーマンスデータおよびトレースには、除外、難読化、フィルタリング、修正したり、収集しないことを選択したりするべき機密情報が含まれることがあります。さらに、エラー数が不正確にカウントされたり、サービスの正常性が Datadog で正確にされないという問題の原因となるシンセティックトラフィックを含む場合もあります。

Datadog Agent および一部のトレーシングライブラリには、このような状況に対応してスパンを修正または破棄するオプションが用意されています。その他さまざまなオプションは、下記をご参照ください。トレーサーおよび Agent を構成しセキュリティ要件を満たすための一般的な方法をご紹介しています。

ご希望の調整ニーズが記載されていない場合は、[Datadog サポートチーム][1]までお問い合わせください。

## 基本的フィルター

Datadog では、基本的なセキュリティを提供するデフォルトとして、スパンに対し標準的なフィルターメカニズムが適用されます。

* **環境変数は Agent によって収集されません。**
* **プリペアドステートメントを使用しない場合でも、SQL 変数は難読化されます**。たとえば、`SELECT data FROM table WHERE key=123 LIMIT 10` という `sql.query` 属性は、変数が難読化されて、`SELECT data FROM table WHERE key = ? LIMIT ?` というリソース名になります。
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

**注:** 複数のタイプのサービスに、同時に自動スクラビングを使用することができます。`datadog.yaml` ファイルの `obfuscation` セクションでそれぞれを構成します。

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

[1]: /ja/tracing/visualization/#spans
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

[1]: /ja/tracing/visualization/#spans
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

[1]: /ja/tracing/visualization/#spans
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

[1]: /ja/tracing/visualization/#spans
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


[1]: /ja/tracing/visualization/#spans
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

## タグのフィルタリングの置換規則

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

サービスに、ヘルスチェックなどシミュレーショントラフィックが含まれる場合、このようなトレースの収集を除外して、サービスのメトリクスが本番トラフィックと一致するようにすることが望ましい場合があります。

そこで、Agent により Datadog に送信されるトレースから、特定のリソースを除外するように Agent を設定できます。特定のリソースが送信されないようにするには、`datadog.yaml` ファイルの `ignore_resources` 設定を使用します。そして、1 つ以上の正規表現のリストを作成し、リソース名に基づき Agent で除外するリソースを指定します。

コンテナ化された環境で実行している場合は、代わりに Datadog Agent を使用してコンテナに `DD_APM_IGNORE_RESOURCES` を設定します。詳細については、[Docker APM Agent 環境変数][5]をご参照ください。

```text
## @param ignore_resources - 文字列のリスト - オプション
## リソース名に基づいて特定のトレースを除外するために、正規表現のリストを指定できます。
## すべてのエントリは二重引用符で囲み、カンマで区切る必要があります。
# ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
```

**注:** NodeJS トレーサーには、ノードトレーサー API の一部としてフィルタリングリクエストのオプションがあります。詳しくは、[こちら][6]をご覧ください。

## トレースを Agent API に直接送信

特定のアプリケーション用にカスタマイズされたインスツルメンテーションが必要な場合は、Agent 側のトレース API を使用して、トレースに含めるスパンを個別に選択することを検討してください。詳細については、[API に関するドキュメント][7]を参照してください。

## Datadog トレーサーでスパンを修正

このページでは、データが Datadog Agent に到達してから修正する方法について説明していますが、一部のトレーシングライブラリは拡張可能です。カスタムポストプロセッサーを作成してスパンをインターセプトし、適宜 (正規表現マッチなどに基づき) 調整または破棄することが可能です。詳細は、ご希望の言語で「カスタムインスツルメンテーション」ドキュメントをご参照ください。

* Java: [TraceInterceptor インターフェイス][8]
* Ruby: [処理パイプライン][9]
* Python: [トレースフィルター][10]


[1]: /ja/tracing/help
[2]: /ja/tracing/visualization/#trace
[3]: /ja/tracing/visualization/#spans
[4]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[5]: /ja/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[6]: /ja/tracing/custom_instrumentation/nodejs/#request-filtering
[7]: /ja/api/v1/tracing/
[8]: /ja/tracing/setup_overview/custom_instrumentation/java/#extending-tracers
[9]: /ja/tracing/setup_overview/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
---
title: Advanced Log Collection Configurations
description: Use the Datadog Agent to collect your logs and send them to Datadog
further_reading:
- link: /logs/guide/how-to-set-up-only-logs/
  tag: Documentation
  text: Use the Datadog Agent for log collection only
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Discover how to process your logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: Learn more about parsing
- link: /logs/live_tail/
  tag: Documentation
  text: Datadog live tail functionality
- link: /logs/explorer/
  tag: Documentation
  text: See how to explore your logs
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: "/glossary/#tail"
  tag: Glossary
  text: Glossary entry for "tail"
algolia:
  tags: [advanced log filter]
---

After you set up [log collection][1], you can customize your collection configuration:
* [ログをフィルター](#filter-logs)
* [ログの機密データのスクラビング](#scrub-sensitive-data-from-your-logs)
* [複数行のログを集計する](#multi-line-aggregation)
* [よく使われる例をコピーする](#commonly-used-log-processing-rules)
* [ディレクトリを監視するためにワイルドカードを使用する](#tail-directories-using-wildcards)
* [ログファイルのエンコーディングを指定する](#log-file-encodings)
* [グローバルな処理ルールを定義する](#global-processing-rules)

Datadog Agent によって収集されたすべてのログに同一の処理ルールを適用する場合は、[グローバルな処理ルール](#global-processing-rules)のセクションを参照してください。

**注**:
- 複数の処理ルールを設定した場合、ルールは順次適用され、各ルールは直前のルールの結果に適用されます。
- 処理ルールのパターンは [Golang の正規構文][2]に従う必要があります。
- `log_processing_rules` パラメーターは、インテグレーションの構成で、ログ収集の構成をカスタマイズするために使用されます。Agent の[メインの構成][5]では、グローバルな処理ルールを定義するために `processing_rules` パラメーターが使用されます。

## ログの絞り込み

ログの一部分のみを Datadog に送信するには、構成ファイル内の `log_processing_rules` パラメーターを使用して、type に `exclude_at_match` または `include_at_match` を指定します。

### 一致時に除外

| パラメーター          | 説明                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | 指定されたパターンがメッセージに含まれる場合、そのログは除外され、Datadog に送信されません。 |

たとえば、Datadog メールアドレスを含むログを**除外する**には、次の `log_processing_rules` を使用します。

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## 任意の正規表現
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、`log_processing_rules` を指定するために、**フィルターしたいログを送るコンテナ**のラベル `com.datadoghq.ad.logs` を使用します。例:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_at_match",
          "name": "exclude_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

特定のコンフィギュレーションを特定のコンテナに適用するために、オートディスカバリーはコンテナをイメージではなく、名前で識別します。つまり、`<CONTAINER_IDENTIFIER>` は、`.spec.containers[0].image.` とではなく `.spec.containers[0].name` との一致が試みられます。オートディスカバリーを使用して構成してポッド内の特定の `<CONTAINER_IDENTIFIER>` でコンテナログを収集するには、以下のアノテーションをポッドの `log_processing_rules` に追加します。

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_at_match",
              "name": "exclude_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

### 一致時に含める

| パラメーター          | 説明                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | 指定されたパターンを含むメッセージを持つログだけが Datadog に送信されます。複数の `include_at_match` ルールが定義されている場合、ログを含めるにはすべてのルールパターンが一致している必要があります。 |


たとえば、Datadog のメールアドレスを含むログに**絞り込む**には、次のような `log_processing_rules` の構成を使用します。

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## 任意の正規表現
      pattern: \w+@datadoghq.com
```

1 つ以上のパターンを一致させるには、単一の表現内で定義します。

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: abc|123
```

パターンが一行に収まらないほど長い場合は、それを複数行に分割することができます。

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      pattern: "abc\
|123\
|\\w+@datadoghq.com"
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、フィルターを適用するログの送信元のコンテナでラベル `com.datadoghq.ad.logs` を使用して、`log_processing_rules` を指定します。例:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "include_at_match",
          "name": "include_datadoghq_users",
          "pattern" : "\\w+@datadoghq.com"
        }]
      }]
```

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。例: 

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "include_at_match",
              "name": "include_datadoghq_users",
              "pattern" : "\\w+@datadoghq.com"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

## ログの機密データのスクラビング

{{< callout url="https://www.datadoghq.com/private-beta/sensitive-data-scanner-using-agent-in-your-premises/" >}}
  Sensitive Data Scanner using the Agent is in private beta. See the <a href="https://www.datadoghq.com/blog/sensitive-data-scanner-using-the-datadog-agent/">blog post</a> and <a href="https://docs.datadoghq.com/sensitive_data_scanner/">documentation</a> for more information. To request access, fill out this form.
{{< /callout >}}

編集が必要な機密データがログに含まれている場合は、機密要素をスクラビングするように Datadog Agent を構成します。それには、構成ファイルで `log_processing_rules` パラメーターを使用して、type に `mask_sequences` を指定します。

これにより、一致したすべてのグループが `replace_placeholder` パラメーターの値に置換されます。

以下は、クレジットカード番号を編集する例です。

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
 - type: file
   path: /my/test/file.log
   service: cardpayment
   source: java
   log_processing_rules:
      - type: mask_sequences
        name: mask_credit_cards
        replace_placeholder: "[masked_credit_card]"
        ## キャプチャするグループを含む 1 つのパターン
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。例: 

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "mask_sequences",
          "name": "mask_credit_cards",
          "replace_placeholder": "[masked_credit_card]",
          "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
        }]
      }]
```

**Note**: Escape regex characters in your patterns when using labels. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。例: 

```yaml
apiVersion: apps/v1
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "mask_sequences",
              "name": "mask_credit_cards",
              "replace_placeholder": "[masked_credit_card]",
              "pattern" : "(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: cardpayment:latest
```

**Note**: Escape regex characters in your patterns when using pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

Agent バージョン 7.17 以降をご利用の場合、文字列 `replace_placeholder` はリファレンスを展開して `$1`、`$2` などのグループをキャプチャすることが可能です。キャプチャするグループとの間にスペースを入れずに文字列を続けるには、`${<グループ番号>}` のフォーマットを使用します。

たとえば、ログ `User email: foo.bar@example.com` からユーザー情報をスクラビングするには、以下を使用します。

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

これにより、次のログが Datadog に送信されます: `User email: masked_user@example.com`

## 複数行の集約

送信されるログが JSON 形式でない場合に、複数の行を 1 つのエントリに集約するには、1 行に 1 つのログを入れる代わりに、正規表現パターンを使用して新しいログを検出するように Datadog Agent を構成します。`log_processing_rules` パラメーターを使用して、type に `multi_line`  を指定すれば、指定されたパターンが再度検出されるまで、すべての行が 1 つのエントリに集約されます。

For example, every Java log line starts with a timestamp in `yyyy-dd-mm` format. These lines include a stack trace that can be sent as two logs:

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Configuration file" %}}

To send the example logs above with a configuration file, use the following `log_processing_rules`:

```yaml
logs:
 - type: file
   path: /var/log/pg_log.log
   service: database
   source: postgresql
   log_processing_rules:
      - type: multi_line
        name: new_log_start_with_date
        pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。例: 

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "postgresql",
        "service": "database",
        "log_processing_rules": [{
          "type": "multi_line",
          "name": "log_start_with_date",
          "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
        }]
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。例: 

```yaml
apiVersion: apps/v1
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "postgresql",
            "service": "database",
            "log_processing_rules": [{
              "type": "multi_line",
              "name": "log_start_with_date",
              "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"
            }]
          }]
      labels:
        app: database
      name: postgres
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: postgres:latest
```

**Note**: Escape regex characters in your patterns when performing multi-line aggregation with pod annotations. For example, `\d` becomes `\\d`, `\w` becomes `\\w`.

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>重要！</strong> 複数行ログの正規表現パターンは、ログの<em>先頭</em>に開始する必要があります。行途中では一致できません。<em>一致しないパターンは、ログ行の損失につながる場合があります。</em></div>

その他の例:

| **文字列の例**           | **パターン**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |

### 自動複数行集計
With Agent 7.37+, `auto_multi_line_detection` can be enabled, which allows the Agent to detect [common multi-line patterns][3] automatically. 

`datadog.yaml` ファイルで `auto_multi_line_detection` をグローバルに有効化します。

```yaml
logs_config:
  auto_multi_line_detection: true
```

コンテナ化されたデプロイメントでは、環境変数 `DD_LOGS_CONFIG_AUTO_MULTI_LINE_DETECTION=true` で `auto_multi_line_detection` を有効にすることが可能です。

また、ログ構成ごとに有効・無効 (グローバル構成をオーバーライド) を設定することができます。

{{< tabs >}}
{{% tab "Configuration file" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: testApp
    source: java
    auto_multi_line_detection: true
```

複数行の自動検出は、一般的な正規表現のリストを使用して、ログとのマッチングを試みます。組み込みのリストでは不十分な場合、`datadog.yaml` ファイルにカスタムパターンを追加することもできます。

```yaml
logs_config:
  auto_multi_line_detection: true
  auto_multi_line_extra_patterns:
   - \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   - '[A-Za-z_]+ \d+, \d+ \d+:\d+:\d+ (AM|PM)'
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。例: 

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "testApp",
        "auto_multi_line_detection": true
      }]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: apps/v1
metadata:
  name: testApp
spec:
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: >-
          [{
            "source": "java",
            "service": "testApp",
            "auto_multi_line_detection": true
          }]
      labels:
        app: testApp
      name: testApp
    spec:
      containers:
        - name: '<CONTAINER_IDENTIFIER>'
          image: testApp:latest
```

{{% /tab %}}
{{< /tabs >}}

この機能を有効にすると、新しいログファイルが開かれたとき、Agent はパターンの検出を試みます。このプロセスの間、ログは 1 行で送信されます。検出しきい値に達すると、そのソースの将来のすべてのログは、検出されたパターンで集計され、パターンが見つからない場合は 1 行で集計されます。検出には、最大 30 秒または最初の 500 ログ (いずれか早い方) が必要です。

**注**: ローテーションされたログの命名パターンを制御できる場合、ローテーションされたファイルが、同じ名前で以前アクティブだったファイルを置き換えることを確認してください。Agent は、新しくローテーションされたファイル上で以前に検出されたパターンを再利用し、検出の再実行を回避します。

複数行の自動検出は、以下の日付/時刻形式から始まり、それに準拠するログを検出します: RFC3339、ANSIC、Unix Date Format、Ruby Date Format、RFC822、RFC822Z、RFC850、RFC1123、RFC1123Z、RFC3339Nano、Java ロギング SimpleFormatter デフォルト日付書式。

## 良く使用されるログの処理ルール

See the dedicated [Commonly Used Log Processing Rules FAQ][4] to see a list of examples.

## ワイルドカードを使用したディレクトリのテール

ログファイルに日付のラベルが付いているか、すべてのログファイルが同じディレクトリに保存されている場合は、すべてのファイルを監視して、新しいファイルを自動的に検出するように Datadog Agent を構成できます。それには、`path` 属性にワイルドカードを使用します。選択した `path` と一致するファイルを除外する場合は、`exclude_paths` 属性にリストします。

* `path: /var/log/myapp/*.log` を使用する場合
  * `/var/log/myapp/` ディレクトリ内のすべての `.log` ファイルに一致します。
  * `/var/log/myapp/myapp.conf` には一致しません。

* `path: /var/log/myapp/*/*.log` を使用する場合
  * `/var/log/myapp/log/myfile.log` に一致します。
  * `/var/log/myapp/errorLog/myerrorfile.log` に一致します。
  * `/var/log/myapp/mylogfile.log` には一致しません。

Configuration example for Linux:

```yaml
logs:
  - type: file
    path: /var/log/myapp/*.log
    exclude_paths:
      - /var/log/myapp/debug.log
      - /var/log/myapp/trace.log
    service: mywebapp
    source: go
```

上記の例では、`/var/log/myapp/log/myfile.log` にマッチし、`/var/log/myapp/log/debug.log` と `/var/log/myapp/log/trace.log` は除外しています。

Configuration example for Windows:

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

The example above matches `C:\\MyApp\\MyLog.log` and excludes `C:\\MyApp\\MyLog.20230101.log` and `C:\\MyApp\\MyLog.20230102.log`.

**Note**: The Agent requires read and execute permissions on a directory to list all the available files in it.
**Note2**: The path and exclude_paths values are case sensitive.

## 最近更新されたファイルを最初に追跡する

Datadog Agent は、ファイルを優先的に追跡する際、ディレクトリパスのファイル名を逆辞典順でソートします。ファイルの修正時間に基づいてファイルをソートするには、構成オプション `logs_config.file_wildcard_selection_mode` に値 `by_modification_time` を設定します。

このオプションは、ログファイルの合計マッチ数が `logs_config.open_files_limit` を超える場合に有用です。`by_modification_time` を使用すると、定義されたディレクトリパスで最も新しく更新されたファイルが最初に追跡されるようになります。

デフォルトの動作に戻すには、構成オプション `logs_config.file_wildcard_selection_mode` を値 `by_name` に設定します。

この機能を使用するには、Agent バージョン 7.40.0 以降が必要です。

## ログファイルのエンコーディング

デフォルトでは、Datadog Agent は、ログが UTF-8 エンコーディングを使用すると仮定しています。アプリケーションログが異なるエンコーディングを使用する場合、ログ構成設定で `encoding` パラメーターを指定します。

以下のリストは、サポートされているエンコーディングの値を示しています。サポートされていない値を指定した場合、Agent はその値を無視し、ファイルを UTF-8 として読み取ります。
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

構成例:

```yaml
logs:
  - type: file
    path: /test/log/hello-world.log
    tags: key:value
    service: utf-16-logs
    source: mysql
    encoding: utf-16-be
```

**注**: `encoding` パラメーターは `type` パラメーターが `file` に設定されている場合のみ適用可能です。

## グローバルな処理ルール

For Datadog Agent v6.10+, the `exclude_at_match`, `include_at_match`, and `mask_sequences` processing rules can be defined globally in the Agent's [main configuration file][5] or through an environment variable:

{{< tabs >}}
{{% tab "Configuration files" %}}

`datadog.yaml` ファイルで、以下のようにします。

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_healthcheck
      pattern: healthcheck
    - type: mask_sequences
      name: mask_user_email
      pattern: \w+@datadoghq.com
      replace_placeholder: "MASKED_EMAIL"
```

{{% /tab %}}
{{% tab "環境変数" %}}

グローバルな処理ルールを構成するには、環境変数 `DD_LOGS_CONFIG_PROCESSING_RULES` を使用します。以下に例を示します。

```shell
DD_LOGS_CONFIG_PROCESSING_RULES='[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Use the `spec.override.[key].env` parameter in your Datadog Operator manifest to set the `DD_LOGS_CONFIG_PROCESSING_RULES` environment variable to configure global processing rules, where `[key]` is `nodeAgent`, `clusterAgent`, or `clusterChecksRunner`. For example:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_PROCESSING_RULES
          value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{% tab "Helm" %}}

Use the `datadog.env` parameter in the Helm chart to set the `DD_LOGS_CONFIG_PROCESSING_RULES` environment variable to configure global processing rules. For example:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog Agent によって収集されるすべてのログが、グローバルな処理ルールの影響を受けます。

**Note**: The Datadog Agent does not start the log collector if there is a format issue in the global processing rules. Run the Agent's [status subcommand][6] to troubleshoot any issues.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /agent/faq/commonly-used-log-processing-rules
[5]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /agent/configuration/agent-commands/#agent-information

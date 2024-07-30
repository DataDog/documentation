---
algolia:
  tags:
  - 高度なログフィルター
description: Datadog Agent を使用してログを収集し、Datadog に送信
further_reading:
- link: /logs/guide/how-to-set-up-only-logs/
  tag: ドキュメント
  text: ログ収集専用として Datadog Agent を使用する
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法について
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: /logs/live_tail/
  tag: ドキュメント
  text: Datadog Live Tail 機能
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
- link: /logs/logging_without_limits/
  tag: ドキュメント
  text: Logging without Limits*
- link: /glossary/#tail
  tag: 送信 - API
  text: 用語集の "tail" の項目
title: ログ収集の高度な構成
---

[ログ収集][1]をセットアップした後、収集構成をカスタマイズできます。
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

**注**: ラベルを使用する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

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

**注**: ポッドアノテーションを使用する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

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

**注**: ラベルを使用する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

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

**注**: ポッドアノテーションを使用する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

## ログの機密データのスクラビング

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

**注**: ラベルを使用する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

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

**注**: ポッドアノテーションを使用する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

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

例えば、Java のログ行は、どれも `yyyy-dd-mm` 形式のタイムスタンプで始まります。以下の行にはスタックトレースが含まれますが、これらは 2 つのログとして送信可能です。

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Configuration file" %}}

コンフィギュレーションファイルで上記のログ例を送信するには、次の `log_processing_rules` を使用します。

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

**注**: ポッドアノテーションを使用して複数行の集約を実行する場合、パターン内の正規表現文字はエスケープする必要があります。例えば、`\d` は `\\d` に、`\w` は `\\w` にします。

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>重要！</strong> 複数行ログの正規表現パターンは、ログの<em>先頭</em>に開始する必要があります。行途中では一致できません。<em>一致しないパターンは、ログ行の損失につながる場合があります。</em></div>

その他の例:

| **生の文字列**           | **パターン**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |

### 自動複数行集計
Agent 7.37+ では、`auto_multi_line_detection` を有効にすることで、Agent が[共通複数行パターン][3]を自動的に検出することができます。

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

例の一覧を確認するには、専用の[よく使用されるログ処理ルールに関する FAQ][4] をご覧ください。

## ワイルドカードを使用したディレクトリのテール

ログファイルに日付のラベルが付いているか、すべてのログファイルが同じディレクトリに保存されている場合は、すべてのファイルを監視して、新しいファイルを自動的に検出するように Datadog Agent を構成できます。それには、`path` 属性にワイルドカードを使用します。選択した `path` と一致するファイルを除外する場合は、`exclude_paths` 属性にリストします。

* `path: /var/log/myapp/*.log` を使用する場合
  * `/var/log/myapp/` ディレクトリ内のすべての `.log` ファイルに一致します。
  * `/var/log/myapp/myapp.conf` には一致しません。

* `path: /var/log/myapp/*/*.log` を使用する場合
  * `/var/log/myapp/log/myfile.log` に一致します。
  * `/var/log/myapp/errorLog/myerrorfile.log` に一致します。
  * `/var/log/myapp/mylogfile.log` には一致しません。

Linux の構成例:

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

Windows の構成例:

```yaml
logs:
  - type: file
    path: C:\\MyApp\\*.log
    exclude_paths:
      - C:\\MyApp\\MyLog.*.log
    service: mywebapp
    source: csharp
```

上記の例では、`C:\\MyApp\\MyLog.log` にマッチし、`C:\\MyApp\\MyLog.20230101.log` と `C:\\MyApp\\MyLog.20230102.log` は除外しています。

**注**: Agent がディレクトリ内にあるファイルをリストするには、そのディレクトリへの読み取りおよび実行アクセス許可が必要です。
**注 2**: path と exclude_paths の値は、大文字と小文字が区別されます。

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

Datadog Agent v6.10 以上では、`exclude_at_match`、`include_at_match`、`mask_sequences` の各処理ルールを、Agent の[メインコンフィギュレーションファイル][5]で、または環境変数を使用してグローバルに定義できます。

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
{{% tab "Helm" %}}

Helm チャートで `env` パラメーターを使用して `DD_LOGS_CONFIG_PROCESSING_RULES` 環境変数を設定して、グローバルな処理ルールを構成します。例:

```yaml
env:
  - name: DD_LOGS_CONFIG_PROCESSING_RULES
    value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog Agent によって収集されるすべてのログが、グローバルな処理ルールの影響を受けます。

**注**: グローバルな処理ルールに形式上の問題がある場合、Datadog Agent はログコレクターを起動しません。問題をトラブルシューティングするには、Agent の [status サブコマンド][6]を実行します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /ja/agent/faq/commonly-used-log-processing-rules
[5]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /ja/agent/configuration/agent-commands/#agent-information
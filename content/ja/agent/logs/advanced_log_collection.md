---
title: ログの収集
kind: documentation
description: Datadog Agent を使用してログを収集し、Datadog に送信
further_reading:
  - link: /logs/processing/
    tag: ドキュメント
    text: ログの処理方法について
  - link: /logs/processing/parsing/
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
    text: Logging without Limits (無制限のログ)*
---
特定のログ収集構成にログ処理ルールを適用することで、以下が可能です。

* [ログの絞り込み](#filter-logs)
* [ログの機密データのスクラビング](#scrub-sensitive-data-from-your-logs)
* [複数行の集約の実行](#multi-line-aggregation)
* [ワイルドカードを使用したディレクトリの追跡](#tail-directories-by-using-wildcards)
* [UTF-16 形式のログをエンコード](#encode-utf-16-format-logs)

**注**: 複数の処理ルールを設定した場合、ルールは順次適用され、各ルールは直前のルールの結果に適用されます。

Datadog Agent によって収集されたすべてのログに同一の処理ルールを適用する場合は、[グローバルな処理ルール](#global-processing-rules)のセクションを参照してください。

## ログの絞り込み

ログの一部分のみを Datadog に送信するには、構成ファイル内の `log_processing_rules` パラメーターを使用して、`type` に **exclude_at_match** または **include_at_match** を指定します。

### 一致時に除外

| パラメーター          | 説明                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | 指定されたパターンがメッセージに含まれる場合、そのログは除外され、Datadog に送信されません。 |

たとえば、Datadog メールアドレスを含むログを**除外**するには、次の `log_processing_rules` を使用します。

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

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。以下に例を示します。

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

**注**: ラベルを使用する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。以下に例を示します。

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**注**: ポッドアノテーションを使用する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{< /tabs >}}

### 一致時に含める

| パラメーター          | 説明                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | 指定されたパターンを含むメッセージを持つログだけが Datadog に送信されます。 |


たとえば、Datadog メールアドレスを含むログに**絞り込む**には、次の `log_processing_rules` を使用します。

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

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。以下に例を示します。

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

**注**: ラベルを使用する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。以下に例を示します。

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**注**: ポッドアノテーションを使用する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{< /tabs >}}

## ログの機密データのスクラビング

編集が必要な機密データがログに含まれている場合は、機密要素をスクラビングするように Datadog Agent を構成します。それには、構成ファイルで `log_processing_rules` パラメーターを使用して、`type` に **mask_sequences** を指定します。

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

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。以下に例を示します。

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

**注**: ラベルを使用する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。以下に例を示します。

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: cardpayment
spec:
  selector:
    matchLabels:
      app: cardpayment
  template:
    metadata:
      annotations:
        ad.datadoghq.com/cardpayment.logs: >-
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
        - name: cardpayment
          image: cardpayment:latest
```

**注**: ポッドアノテーションを使用する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{< /tabs >}}

Agent バージョン 7.17 以降をご利用の場合、文字列 `replace_placeholder` はリファレンスを展開して `$1`、`$2` などのグループをキャプチャすることが可能です。キャプチャするグループとの間にスペースを入れずに文字列を続けるには、`${<グループ番号>}` のフォーマットを使用します。

たとえば、ログ `User email: foo.bar@example.com` からユーザー情報をスクラビングするには、以下を使用します。

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

これにより、次のログが Datadog に送信されます: `User email: masked_user@example.com`

## 複数行の集約

送信されるログが JSON 形式でない場合に、複数の行を 1 つのエントリに集約するには、1 行に 1 つのログを入れる代わりに、正規表現パターンを使用して新しいログを検出するように Datadog Agent を構成します。それには、構成ファイルで `log_processing_rules` パラメーターを使用して、`type` に **multi_line** を指定します。これで、指定されたパターンが再度検出されるまで、すべての行が 1 つのエントリに集約されます。

たとえば、Java のログ行は、どれも `yyyy-dd-mm` 形式のタイムスタンプで始まります。以下の行にはスタックトレースが含まれますが、これらは 2 つのログとして送信可能です。

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "Configuration file" %}}

構成ファイルで上記のログ例を送信するには、次の `log_processing_rules` を使用します。

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

Docker 環境では、コンテナで `com.datadoghq.ad.logs` ラベルを使用して `log_processing_rules` を指定します。以下に例を示します。

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

Kubernetes 環境では、ポッドで `ad.datadoghq.com` ポッドアノテーションを使用して `log_processing_rules` を指定します。以下に例を示します。

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: postgres
spec:
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      annotations:
        ad.datadoghq.com/postgres.logs: >-
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
        - name: postgres
          image: postgres:latest
```

**注**: ポッドアノテーションを使用して複数行の集約を実行する場合、パターン内の正規表現文字はエスケープする必要があります。たとえば、`\d` は `\\d` に、`\w` は `\\w` にします。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning"><strong>重要！</strong> 複数行ログの正規表現パターンは、ログの<em>先頭</em>に開始する必要があります。行途中では一致できません。<em>一致しないパターンは、ログ行の損失につながる場合があります。</em></div>

その他の例:

| **文字列の例**           | **パターン**                                   |
|--------------------------|-----------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                           |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                         |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}`    |
| 20180228                 | `\d{8}`                                       |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}` |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                |

## 良く使用されるログの処理ルール

例のリストを確認するには、専用の[よく使用されるログ処理ルールに関する FAQ][1] をご覧ください。

## ワイルドカードを使用したディレクトリの追跡

ログファイルに日付のラベルが付いているか、すべてのログファイルが同じディレクトリに保存されている場合は、すべてのファイルを監視して、新しいファイルを自動的に検出するように Datadog Agent を構成できます。それには、`path` 属性にワイルドカードを使用します。選択した `path` と一致するファイルを除外する場合は、`exclude_paths` 属性にリストします。

* `path: /var/log/myapp/*.log` を使用する場合
  * `/var/log/myapp/` ディレクトリ内のすべての `.log` ファイルに一致します。
  * `/var/log/myapp/myapp.conf` には一致しません。

* `path: /var/log/myapp/*/*.log` を使用する場合
  * `/var/log/myapp/log/myfile.log` に一致します。
  * `/var/log/myapp/errorLog/myerrorfile.log` に一致します。
  * `/var/log/myapp/mylogfile.log` には一致しません。

構成例:

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

上の例は `/var/log/myapp/log/myfile.log` と一致しますが `/var/log/myapp/log/debug.log` と `/var/log/myapp/log/trace.log` が追尾されることはありません。

**注**: Agent がディレクトリ内にあるファイルをリストするには、そのディレクトリへの読み取りおよび実行アクセス許可が必要です。

## UTF-16 形式のログをエンコード

Datadog Agent **v6.23/v7.23** 以降でアプリケーションログが UTF-16 形式で記述されている場合は、これらのログをエンコードして[ログエクスプローラー][2]で望ましい形にパースすることができます。ログコンフィギュレーションのセクションで `encoding` パラメーターを使用して、UTF16 リトルエンディアン の場合は `utf-16-le` に、UTF16 ビッグエンディアンの場合は `utf-16-be` に設定します。その他の値は無視され、Agent はファイルを UTF-8 形式で読み込みます。

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

Datadog Agent v6.10 以上では、`exclude_at_match`、`include_at_match`、`mask_sequences` の各処理ルールを、Agent の[メイン構成ファイル][3]で、または環境変数を使用してグローバルに定義できます。

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

Helm チャートで `env` パラメーターを使用して `DD_LOGS_CONFIG_PROCESSING_RULES` 環境変数を設定して、グローバルな処理ルールを構成します。以下に例を示します。

```yaml
env:
  - name: DD_LOGS_CONFIG_PROCESSING_RULES
    value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog Agent によって収集されるすべてのログが、グローバルな処理ルールの影響を受けます。

**注**: グローバルな処理ルールに形式上の問題がある場合、Datadog Agent はログコレクターを起動しません。問題をトラブルシューティングするには、Agent の [status サブコマンド][4]を実行します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。


[1]: /ja/agent/faq/commonly-used-log-processing-rules
[2]: https://docs.datadoghq.com/ja/logs/explorer/#overview
[3]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: /ja/agent/guide/agent-commands/#agent-information
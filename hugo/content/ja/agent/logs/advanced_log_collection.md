---
algolia:
  tags:
  - advanced log filter
description: Datadog Agent を使用してログを Datadog に送信します
further_reading:
- link: /logs/guide/getting-started-lwl/
  tag: よくあるご質問
  text: Logging without Limits™ 入門
- link: /logs/guide/how-to-set-up-only-logs/
  tag: よくあるご質問
  text: ログ収集専用として Datadog Agent を使用する
- link: /logs/log_configuration/processors
  tag: よくあるご質問
  text: ログの処理方法について
- link: /logs/log_configuration/parsing
  tag: よくあるご質問
  text: パースの詳細
- link: /logs/live_tail/
  tag: よくあるご質問
  text: Datadog Live Tail 機能
- link: /logs/explorer/
  tag: よくあるご質問
  text: ログの探索方法
- link: /glossary/#tail
  tag: 用語集
  text: 用語集の "tail" の項目
title: ログ収集の高度な構成
---
[ログ収集][1] をセットアップした後、収集構成をカスタマイズできます。
- [ログの絞り込み](#filter-logs)
  - [一致時に除外](#exclude-at-match)
  - [一致時に含める](#include-at-match)
  - [切り捨てられたログを除外](#exclude-truncated)
- [ログの機密データのスクラビング](#scrub-sensitive-data-from-your-logs)
- [複数行の集約](#manually-aggregate-multi-line-logs)
- [複数行のログを自動的に集約](#automatically-aggregate-multi-line-logs)
- [良く使用されるログの処理ルール](#commonly-used-log-processing-rules)
- [ワイルドカードを使用したディレクトリのテール](#tail-directories-using-wildcards)
  - [修正時間によるテール対象ファイルの優先順位付け](#prioritize-tailed-files-by-modification-time)
- [ログファイルのエンコーディング](#log-file-encodings)
- [グローバルな処理ルール](#global-processing-rules)
- [参考資料](#further-reading)

Datadog Agent によって収集されたすべてのログに同一の処理ルールを適用する場合は、[グローバルな処理ルール](#global-processing-rules)のセクションを参照してください。

**注**:
- 複数の処理ルールを設定した場合、ルールは順次適用され、各ルールは直前のルールの結果に適用されます。
- 処理ルールのパターンは [Golang の正規構文][2] に従う必要があります。
- `log_processing_rules` パラメーターは、インテグレーション構成でログ収集構成をカスタマイズするために使用されます。一方 Agent の [メイン構成][5] では、`processing_rules` パラメーターはグローバルな処理ルールを定義するために使用されます。

## ログの絞り込み {#filter-logs}

ログの一部分のみを Datadog に送信するには、構成ファイル内の `log_processing_rules` パラメーターを使用して、type に `exclude_at_match` または `include_at_match` を指定します。

### 一致時に除外 {#exclude-at-match}

| パラメーター          | 説明                                                                                        |
|--------------------|----------------------------------------------------------------------------------------------------|
| `exclude_at_match` | 指定されたパターンがメッセージに含まれる場合、そのログは除外され、Datadog に送信されません。|

たとえば、Datadog メールアドレスを含むログを**除外する**には、次の `log_processing_rules` を使用します。

{{< tabs >}}
{{% tab "構成ファイル" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_at_match
      name: exclude_datadoghq_users
      ## Regexp can be anything
      pattern: \w+@datadoghq.com
```

{{% /tab %}}
{{% tab "Docker" %}}

<div class="alert alert-info">
Agent 構成の詳細については、「<a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">コンテナディスカバリー管理</a>」を参照してください。
</div>

Docker 環境では、`log_processing_rules` を指定するために、**フィルターするログを送信するコンテナ**でラベル `com.datadoghq.ad.logs` を使用します。例:

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

**注**:
- ラベルを使用する際には、パターンで正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

<div class="alert alert-info">
Agent 構成の詳細については、「<a href="/containers/guide/container-discovery-management/?tab=datadogoperator#agent-configuration">コンテナディスカバリー管理</a>」を参照してください。
</div>

Autodiscovery を使用して、Pod 内の指定したコンテナ (名前は `CONTAINER_NAME`) のコンテナログを収集するように構成するには、Pod の `log_processing_rules` に以下のアノテーションを追加します。

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
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**注**:
- Pod アノテーションを使用する場合は、パターン内の正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

### 一致時に含める {#include-at-match}

| パラメーター          | 説明                                                                       |
|--------------------|-----------------------------------------------------------------------------------|
| `include_at_match` | 指定されたパターンを含むメッセージを持つログだけが Datadog に送信されます。複数の `include_at_match` ルールが定義されている場合、ログが送信されるためには、すべてのルールパターンに一致する必要があります。|


たとえば、Datadog のメールアドレスを含むログに**絞り込む**には、次の `log_processing_rules` の構成を使用します。

{{< tabs >}}
{{% tab "構成ファイル" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: include_at_match
      name: include_datadoghq_users
      ## Regexp can be anything
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

Docker 環境では、`log_processing_rules` を指定するために、フィルターするログを送信するコンテナでラベル `com.datadoghq.ad.logs` を使用します。例:

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

**注**:
- ラベルを使用する際には、パターンで正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、`log_processing_rules` を指定するために、Pod で Pod アノテーション `ad.datadoghq.com` を使用します。例:

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
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**注**:
- Pod アノテーションを使用する場合は、パターン内の正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

### 切り捨てられたログを除外 {#exclude-truncated}

| パラメーター           | 説明                                                        |
|---------------------|--------------------------------------------------------------------|
| `exclude_truncated` | 存在する場合、切り捨てられたログを除外し、Datadog に送信しません。`exclude_truncated` ルールは Agent v7.69 以降で利用可能です。|

たとえば、切り捨てられたログを**除外する**には、次のようにします。

{{< tabs >}}
{{% tab "構成ファイル" %}}

```yaml
logs:
  - type: file
    path: /my/test/file.log
    service: cardpayment
    source: java
    log_processing_rules:
    - type: exclude_truncated
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、`log_processing_rules` を指定するために、フィルターするログを送信するコンテナでラベル `com.datadoghq.ad.logs` を使用します。例:

```yaml
 labels:
    com.datadoghq.ad.logs: >-
      [{
        "source": "java",
        "service": "cardpayment",
        "log_processing_rules": [{
          "type": "exclude_truncated"
        }]
      }]
```

**注**: ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、`log_processing_rules` を指定するために、Pod で Pod アノテーション `ad.datadoghq.com` を使用します。例:

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
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
          [{
            "source": "java",
            "service": "cardpayment",
            "log_processing_rules": [{
              "type": "exclude_truncated"
            }]
          }]
      labels:
        app: cardpayment
      name: cardpayment
    spec:
      containers:
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**注**: アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

## ログの機密データのスクラビング {#scrub-sensitive-data-from-your-logs}

編集が必要な機密データがログに含まれている場合は、機密要素をスクラビングするように Datadog Agent を構成します。それには、構成ファイルで `log_processing_rules` パラメーターを使用して、type に `mask_sequences` を指定します。

これにより、一致したすべてのグループが `replace_placeholder` パラメーターの値に置換されます。

以下は、クレジットカード番号を編集する例です。

{{< tabs >}}
{{% tab "構成ファイル" %}}

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
        ##One pattern that contains capture groups
        pattern: (?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})
```

{{% /tab %}}
{{% tab "Docker" %}}

Docker 環境では、`log_processing_rules` を指定するために、コンテナで `com.datadoghq.ad.logs` ラベルを使用します。例:

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

**注**:
- ラベルを使用する際には、パターンで正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- ラベルの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes 環境では、`log_processing_rules` を指定するために、Pod で Pod アノテーション `ad.datadoghq.com` を使用します。例:

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
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: cardpayment:latest
```

**注**:
- Pod アノテーションを使用する場合は、パターン内の正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

Agent バージョン 7.17 以降では、`replace_placeholder` 文字列が `$1`、`$2` などのキャプチャグループへの参照を拡張できます。キャプチャグループの後にスペースなしで文字列を追加する場合は、`${<GROUP_NUMBER>}` 形式を使用します。

たとえば、ログ `User email: foo.bar@example.com` からユーザー情報をスクラビングするには、以下を使用します。

* `pattern: "(User email: )[^@]*@(.*)"`
* `replace_placeholder: "$1 masked_user@${2}"`

これにより、次のログが Datadog に送信されます: `User email: masked_user@example.com`

## 複数行のログを自動的に集約 {#automatically-aggregate-multi-line-logs}

複数行の自動検出は、複雑な形式のログソースが多数ある場合や、各ソースを個別に構成する時間がない場合に役立ちます。この機能は、カスタム正規表現パターンを記述することなく、自動的に複数行ログを検出して集約します。

[自動複数行検出と集約][7] のドキュメントを参照してください。

この機能のレガシーサポートについては、[自動複数行検出と集約 (レガシー)][8] のドキュメントを参照してください。

## 複数行のログを手動で集約 {#manually-aggregate-multi-line-logs}

手動複数行ルールを使用すると、ログの形式がわかっている場合にログの集約を正確に制御できます。このアプローチは、特定のログ構造に合わせたカスタム正規表現パターンを使用して、一貫性のあるログ処理を行う場合に理想的です。

ログが JSON 形式で送信されておらず、複数行を 1 つのエントリに集約したい場合は、1 行に 1 つのログを含めるのではなく、特定の正規表現パターンを使用して新しいログを検出するように Datadog Agent を構成してください。指定したパターンが再度検出されるまで、すべての行を 1 つのエントリに集約する場合は、`multi_line` タイプを `log_processing_rules` パラメーターで使用します。

たとえば、すべての Java ログ行は `yyyy-dd-mm` 形式のタイムスタンプで始まります。これらの行には、2 つのログとして送信できるスタックトレースが含まれています。

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
2018-01-03T09:26:24.365Z UTC starting upload of /my/file.gz
```

{{< tabs >}}
{{% tab "構成ファイル" %}}

上の例のログをコンフィギュレーションファイルと一緒に送信するには、次の `log_processing_rules` を使用します。

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

Docker 環境では、`log_processing_rules` を指定するために、コンテナで `com.datadoghq.ad.logs` ラベルを使用します。例:

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

Kubernetes 環境では、`log_processing_rules` を指定するために、Pod で Pod アノテーション `ad.datadoghq.com` を使用します。例:

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
        ad.datadoghq.com/<CONTAINER_NAME>.logs: >-
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
        - name: '<CONTAINER_NAME>'
          image: postgres:latest
```

**注**:
- Pod アノテーションを使用して複数行の集約を実行する場合は、パターン内の正規表現文字をエスケープします。たとえば、`\d` は `\\d` になり、`\w` は `\\w` になります。
- アノテーションの値は JSON 構文に従う必要があり、末尾にカンマやコメントを入れることはできません。

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>重要</strong>複数行のログのための正規表現パターンは、常にログの<em>先頭</em>に一致します。行の途中でパターンを一致させることはできません。<em>何にも一致しないパターンは、ログ行の損失を引き起こす可能性があります。</em><br><br>ログ収集は最大でミリ秒の精度で機能します。それよりも高い精度のログは、パターンに一致しても送信されません。</div>

その他の例:

| **生の文字列**           | **パターン**                                       |
|--------------------------|---------------------------------------------------|
| 14:20:15                 | `\d{2}:\d{2}:\d{2}`                               |
| 11/10/2014               | `\d{2}\/\d{2}\/\d{4}`                             |
| Thu Jun 16 08:29:03 2016 | `\w{3}\s+\w{3}\s+\d{2}\s\d{2}:\d{2}:\d{2}\s\d{4}` |
| 20180228                 | `\d{8}`                                           |
| 2020-10-27 05:10:49.657  | `\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}\.\d{3}`     |
| {"date": "2018-01-02"    | `\{"date": "\d{4}-\d{2}-\d{2}`                    |


## 良く使用されるログの処理ルール {#commonly-used-log-processing-rules}

例の一覧を確認するには、専用の[よく使用されるログ処理ルールに関する FAQ][4] をご覧ください。

## ワイルドカードを使用したディレクトリのテール {#tail-directories-using-wildcards}

ログファイルに日付のラベルが付いているか、すべてのログファイルが同じディレクトリに保存されている場合は、すべてのファイルをモニターして、新しいファイルを自動的に検出するように Datadog Agent を構成できます。それには、`path` 属性にワイルドカードを使用します。選択した `path` に一致するファイルを除外する場合は、`exclude_paths` 属性でそれらのリストを指定します。

* `path: /var/log/myapp/*.log` を使用:
  * `/var/log/myapp/` ディレクトリに含まれているすべての `.log` ファイルに一致します。
  * `/var/log/myapp/myapp.conf` に一致しません。

* `path: /var/log/myapp/*/*.log` を使用:
  * `/var/log/myapp/log/myfile.log` に一致します。
  * `/var/log/myapp/errorLog/myerrorfile.log` に一致します。
  * `/var/log/myapp/mylogfile.log` に一致しません。

Linux の構成例:

```yaml
logs:
  - type: file
    path: /var/log/myapp/log/*.log
    exclude_paths:
      - /var/log/myapp/log/debug.log
      - /var/log/myapp/log/trace.log
    service: mywebapp
    source: go
```

上記の例は `/var/log/myapp/log/myfile.log` に一致し、`/var/log/myapp/log/debug.log` と `/var/log/myapp/log/trace.log` を除外します。

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

上記の例は `C:\\MyApp\\MyLog.log` に一致し、`C:\\MyApp\\MyLog.20230101.log` と `C:\\MyApp\\MyLog.20230102.log` を除外します。

**注**:
- Agent がディレクトリ内にあるファイルをリストするには、そのディレクトリへの読み取りおよび実行アクセス許可が必要です。
- path と exclude_paths の値では大文字と小文字が区別されます。

### 修正時間によるテール対象ファイルの優先順位付け {#prioritize-tailed-files-by-modification-time}

この機能を使用するには、Agent バージョン 7.40.0 以降が必要です。

Agent は `logs_config.open_files_limit` パラメーターを使用して、同時にテールできるファイルの数を制限します。構成されたログソース (ワイルドカードなど) に一致するファイルの数がこの制限内の場合、Agent はそれらすべてをテールします。一致するファイルが制限を超えた場合は、Agent はファイル名を辞書式順序の逆順でソートして優先順位を付けるため、タイムスタンプが新しいファイルや番号の大きいファイルが最初にテールされます。

ファイル名が連番やタイムスタンプのパターンに従っていない場合は、デフォルトの順序付けが最適ではない可能性があります。代わりに修正時間によって優先順位を付けるには、`logs_config.file_wildcard_selection_mode` を `by_modification_time` に設定します。この設定では、Agent は最近修正されたファイルを最初にテールします。

**例**:
- `open_files_limit` = 500
- ワイルドカードパターンが 700 ファイルに一致したとします。
- `by_name` を使用: Agent は辞書式順序の逆順で上位の名前を持つ 500 ファイルをテールします (たとえば、app.log.700 から app.log.201 まで)。
- `by_modification_time` を使用: Agent は名前に関係なく、最近書き込まれた 500 個のファイルをテールします。

```yaml
logs_enabled: true
logs_config:
 [...]
  open_files_limit: 500

  ## @param file_wildcard_selection_mode - string - optional - default: by_name
  ## The strategy used to prioritize wildcard matches if they exceed open_files_limit.
  ## Choices:
  ##   - by_name: files are sorted in reverse lexicographic order (default).
  ##   - by_modification_time: files are sorted by modification time, with the most recent first.
  ## WARNING: by_modification_time is less performant and increases disk I/O.
  file_wildcard_selection_mode: by_modification_time
```

デフォルトの動作に戻すには、`logs_config.file_wildcard_selection_mode` エントリを削除するか、明示的に `by_name` に設定します。

## ログファイルのエンコーディング {#log-file-encodings}

デフォルトでは、Datadog Agent はログで UTF-8 エンコーディングが使用されていると想定します。ご使用のアプリケーションのログで異なるエンコーディングが使用されている場合は、ログ構成で `encoding` パラメーターを指定します。

以下のリストは、サポートされているエンコーディングの値を示しています。サポートされていない値を指定した場合、Agent はその値を無視し、ファイルを UTF-8 として読み取ります。
 * `utf-16-le` - UTF-16 little-endian (Datadog Agent **v6.23/v7.23**)
 * `utf-16-be` - UTF-16 big-endian (Datadog Agent **v6.23/v7.23**)
 * `shift-jis` - Shift-JIS (Datadog Agent **v6.34/v7.34**)

<div class="alert alert-warning"> <code>encoding</code> Agent が<em>すでにテールしている</em>ファイルを変更した場合、文字化けが発生する可能性があります。Agent は前のバイトオフセットから再開しますが、エンコーディングの変更後に文字境界と一致しない場合があります。これを修正するには、ログファイルをローテーションするか、置き換えるか、新しいエンコーディングを使用するファイルの先頭からテールを再開してください。これらのアクションによって、Agent が正しいエンコーディングを使用して開始できるようになります。</div>

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

**注**: `encoding` パラメーターは、`type` パラメーターが `file` に設定されている場合にのみ適用されます。

## グローバルな処理ルール {#global-processing-rules}

Datadog Agent v6.10 以上では、`exclude_at_match`、`include_at_match`、`mask_sequences` の各処理ルールを、Agent の [メイン構成ファイル][5] で、または環境変数を使用してグローバルに定義できます。`exclude_truncated` ルールは Agent v7.69 以降で利用可能です。

{{< tabs >}}
{{% tab "構成ファイル" %}}

`datadog.yaml` ファイル内:

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

Datadog Operator マニフェスト内で `spec.override.[key].env` パラメーターを使用して `DD_LOGS_CONFIG_PROCESSING_RULES` 環境変数を設定し、グローバルな処理ルールを構成します。ここで `[key]` は `nodeAgent`、`clusterAgent`、または `clusterChecksRunner` です。例:

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

Helm チャートで `datadog.env` パラメーターを使用して `DD_LOGS_CONFIG_PROCESSING_RULES` 環境変数を設定して、グローバルな処理ルールを構成します。例:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_PROCESSING_RULES
      value: '[{"type": "mask_sequences", "name": "mask_user_email", "replace_placeholder": "MASKED_EMAIL", "pattern" : "\\w+@datadoghq.com"}]'
```

{{% /tab %}}
{{< /tabs >}}
Datadog Agent によって収集されるすべてのログが、グローバルな処理ルールの影響を受けます。

**注**: グローバルな処理ルールに形式上の問題がある場合、Datadog Agent はログコレクターを起動しません。問題をトラブルシューティングするには、Agent の [status サブコマンド][6] を実行します。

## 複数行のログの集約に関するよくある質問 {#multi-line-log-aggregation-faq}

**1. 手動の複数行ルールと自動の複数行検出はいつ使用すべきですか?**

ログの形式がわかっている場合は、正確に制御するために手動の複数行ルールを使用してください。
多数の複数行ログを送信していて、ログの形式が不明であるか、すべてのソースを個別に構成する手段がない場合は、自動の複数行検出を使用してください。

**2. 複数行パターンがいずれのログにも一致しない場合はどうなりますか?**

すべての JSON 以外のログ行は、個別のログエントリとして別々に処理されます。
すべての JSON 形式のログ行は単一のログ行として扱われ、最初の有効な JSON 形式のみが取り込まれ、それ以外は破棄されます。

**3. グローバルルールとインテグレーション固有のルールの両方がある場合はどうなりますか?**
インテグレーション固有のルールは、その特定のインテグレーションについてグローバルルールを完全に上書きします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/agent/logs/
[2]: https://golang.org/pkg/regexp/syntax/
[3]: https://github.com/DataDog/datadog-agent/blob/a27c16c05da0cf7b09d5a5075ca568fdae1b4ee0/pkg/logs/internal/decoder/auto_multiline_handler.go#L187
[4]: /ja/agent/faq/commonly-used-log-processing-rules
[5]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /ja/agent/configuration/agent-commands/#agent-information
[7]: /ja/agent/logs/auto_multiline_detection
[8]: /ja/agent/logs/auto_multiline_detection_legacy
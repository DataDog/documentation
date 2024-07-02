---
aliases:
- /ja/logs/languages/go
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: ブログ
  text: Golang ログの収集、標準化、一元化方法
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/explorer/
  tag: Documentation
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: Documentation
  text: ログ分析の実行
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: ログ収集のトラブルシューティングガイド
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: Go ログ収集
---

Go のログを Datadog に送信するには、ファイルにログを記録し、Datadog Agent でそのファイルを[テール][11]します。オープンソースのロギングライブラリである [logrus][1] を使用すると、以下のようなセットアップが可能です。

Datadog は、[カスタムパース規則][2]の使用を避け、ログを JSON で生成するようにロギングライブラリをセットアップすることを強くお勧めします。

## ロガーの構成

典型的な Go 構成では、`main.go` ファイルを開き、以下のコードに貼り付けます。

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // JSONFormatter を使用します
    log.SetFormatter(&log.JSONFormatter{})

    // logrus を使用して通常どおりイベントをログに記録します
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
}
```

ログイベントに表示するメタデータを JSON オブジェクトで提供すると、ログにメタデータを追加できます。

メタデータには、`hostname`、`username`、`customers`、`metric` などの情報があり、トラブルシューティングや Go アプリケーションの状態の把握に役立ちます。

```go
package main

import (
  log "github.com/sirupsen/logrus"
)

func main() {

    // JSONFormatter を使用します
    log.SetFormatter(&log.JSONFormatter{})

    // logrus を使用してイベントをログに記録します
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")

  // メタデータについては、以下のように、ログステートメント間でフィールドを再利用するのが一般的です
  contextualizedLog := log.WithFields(log.Fields{
    "hostname": "staging-1",
    "appname": "foo-app",
    "session": "1ce3f6v"
  })

  contextualizedLog.Info("Simple event with global metadata")
}
```

## Datadog Agent の構成

[ログ収集が有効][3]になったら、ログファイルを追跡して新しいログを Datadog に送信する[カスタムログ収集][4]を設定します。

1. `go.d/` フォルダーを `conf.d/` [Agent 構成ディレクトリ][5]に作成します。
2. `go.d/` に以下の内容で `conf.yaml` ファイルを作成します。

    ```yaml
    ##Log section
    logs:

      - type: file
        path: "/path/to/your/go/log.log"
        service: go
        source: go
        sourcecategory: sourcecode
    ```

3. [Agent を再起動します][6]。
4. [Agent の status サブコマンド][7]を実行し、`Checks` セクションで `go` を探し、ログが Datadog に正常に送信されることを確認します。

ログが JSON 形式の場合、Datadog は自動的にログメッセージを[パース][8]し、ログ属性を抽出します。[ログエクスプローラー][9]を使用して、ログを表示し、トラブルシューティングを行うことができます。

## ログとトレースの接続

このアプリケーションで APM が有効になっている場合、[APM Go ロギングのドキュメント][10]に従ってログにトレース ID とスパン ID を自動的に追加することで、アプリケーションログとトレース間の相関関係を改善できます。

## ベストプラクティス

* ロガーには、関連する関数やサービスに対応する名前を付けます。
* `DEBUG`、`INFO`、`WARNING`、`FATAL` のログレベルを使用します。Datadog では、Go の `FATAL` は `Emergency` という重大度レベルにマッピングされます。
* まず、最も重要な情報をロギングすることから始めましょう。さらに繰り返しながら、ログの包括性を高めていきます。
* メタを使用して、あらゆるログにコンテキストを追加します。これにより、ユーザー、顧客、ビジネス中心の属性などをすばやくフィルターにかけることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /ja/logs/log_configuration/parsing
[3]: /ja/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /ja/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: /ja/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[8]: /ja/logs/log_configuration/parsing/?tab=matchers
[9]: /ja/logs/explorer/#overview
[10]: /ja/tracing/other_telemetry/connect_logs_and_traces/go/
[11]: /ja/glossary/#tail
---
title: Go ログ収集
kind: documentation
aliases:
  - /ja/logs/languages/go
further_reading:
  - link: 'https://www.datadoghq.com/blog/go-logging/'
    tag: ブログ
    text: Golang ログの収集、標準化、一元化方法
  - link: /logs/processing/
    tag: Documentation
    text: ログの処理方法
  - link: /logs/processing/parsing/
    tag: Documentation
    text: パースの詳細
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: '/logs/explorer/#visualize'
    tag: Documentation
    text: ログ分析の実行
  - link: /logs/faq/log-collection-troubleshooting-guide/
    tag: FAQ
    text: ログ収集のトラブルシューティングガイド
---
Go ログを Datadog に送信する場合は、ファイルにログを記録し、Datadog Agent を使用してそのファイルを追跡することをお勧めします。それには、[logrus][1] というオープンソースのロギングライブラリを使用して、以下のようにセットアップを行います。

[カスタムパース規則][2]の使用を避け、ログを JSON 形式で生成するようにロギングライブラリをセットアップすることを強くお勧めします。

## ロガーの構成

典型的な Go 構成では、`main.go` ファイルを開き、以下のコードを貼り付けます。

```go
package main

import (
  log "github.com/Sirupsen/logrus"
)

func main() {

    // JSONFormatter を使用します
    log.SetFormatter(&log.JSONFormatter{})

    // logrus を使用して通常どおりイベントをログに記録します
    log.WithFields(log.Fields{"string": "foo", "int": 1, "float": 1.1 }).Info("My first event from golang to stdout")
}
```

ログイベントに表示するメタデータを JSON オブジェクトで提供すると、ログに簡単にメタデータを追加できます。

メタデータには、`hostname`、`username`、`customers`、`metric` などの情報があり、トラブルシューティングや Go アプリケーションの状態の把握に役立ちます。

```go
package main

import (
  log "github.com/Sirupsen/logrus"
)

func main() {

    // JSONFormatter を使用します
    log.SetFormatter(&log.JSONFormatter{})

    // logrus を使用して通常どおりイベントをログに記録します
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

**ログとトレースの接続**

このアプリケーションで APM が有効になっている場合、[APM Go ロギングの指示に従って][3]ログにトレース ID とスパン ID を自動的に追加することで、アプリケーションログとトレース間の相関関係を改善できます。

## Datadog Agent の構成

`conf.d/` フォルダーに次の内容の `go.d/conf.yaml` ファイルを作成します。

```yaml
##Log section
logs:

  - type: file
    path: "/path/to/your/go/log.log"
    service: go
    source: go
    sourcecategory: sourcecode
```

## 補足説明

ここでは、構成に関していくつかのヒントを示します。

* ロガーには必ず、提供する機能やサービスに対応する名前を付けてください。
* DEBUG レベルで多くのログを記録し、INFO、WARNING、および FATAL レベルで正確にログを記録します。後者は、運用環境で使用するログレベルです。
* 最初は小さく始めます。ログを網羅的に収集するのではなく、重要なログのみを記録するようにします。その後、チームで話し合いながら、足りないものを追加していきます。
* メタデータを活用します。ログにコンテキストを追加することで、ユーザー、顧客などのビジネス寄りの属性ですばやく絞り込むことができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/sirupsen/logrus
[2]: /ja/logs/processing/parsing/
[3]: /ja/tracing/connect_logs_and_traces/go/
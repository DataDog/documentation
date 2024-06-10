---
aliases:
- /ja/tracing/connect_logs_and_traces/nodejs
code_lang: nodejs
code_lang_weight: 50
description: Node.js ログとトレースを接続して Datadog で関連付けます。
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: ドキュメント
  text: アプリケーションを手動でインストルメントしてトレースを作成します。
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースの詳細
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: 自動的にリクエストログとトレースに相関性を持たせる
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: ガイド
  text: クロスプロダクト相関で容易にトラブルシューティング。
kind: documentation
title: Node.js ログとトレースの相関付け
type: multi-code-lang
---

## 自動挿入

環境変数 `DD_LOGS_INJECTION=true` か、直接トレーサーを構成することで挿入を有効にします:

```javascript
// この行は、ロガーをインポートする前に記述する必要があります。
const tracer = require('dd-trace').init({
    logInjection: true
});
```

これにより、`bunyan`、`paperplane`、`pino`、`winston` の自動トレース ID 挿入が有効になります。

まだの場合は、Node.js トレーサーを `DD_ENV`、`DD_SERVICE`、`DD_VERSION` で構成します。これは、
`env`、`service`、`version` を追加する際のベストプラクティスです (詳細は、[統合サービスタグ付け][1]を参照)。

**注**: 自動挿入が機能するのは JSON 形式のログのみです。

## 手動挿入

自動挿入に対応していないロギングライブラリを使っているが、JSON 形式を使っている場合は、コード内で直接手動挿入を実行することができます。

`console` を基底のロガーとして使う例:

```javascript
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

class Logger {
    log(level, message) {
        const span = tracer.scope().active();
        const time = new Date().toISOString();
        const record = { time, level, message };

        if (span) {
            tracer.inject(span.context(), formats.LOG, record);
        }

        console.log(JSON.stringify(record));
    }
}

module.exports = Logger;
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
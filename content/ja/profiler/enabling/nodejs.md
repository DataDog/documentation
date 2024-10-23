---
aliases:
- /ja/tracing/profiler/enabling/nodejs/
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/profile_visualizations
  tag: ドキュメント
  text: 使用可能なプロファイルの視覚化の詳細
- link: profiler/profiler_troubleshooting
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
title: Node.js プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

すべての言語におけるランタイムとトレーサーの最小バージョンと推奨バージョンの要約については、[サポートされている言語とトレーサーのバージョン][7]をお読みください。

The Datadog Profiler requires at least Node.js 14, but Node.js 16 or higher is recommended. If you use a version of Node.js earlier than 16, some applications see tail latency spikes every minute when starting the next profile.

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

2. `npm install --save dd-trace@latest` を実行して、プロファイラーを含む `dd-trace` モジュールへの依存関係を追加します。

3. プロファイラーを有効にします。

   {{< tabs >}}
{{% tab "環境変数" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

**注**: Datadog APM を既に使用している場合は、既に `init` を呼び出しているので、再度呼び出す必要はありません。そうでない場合は、トレーサーとプロファイラーが一緒にロードされていることを確認してください。

```node
node -r dd-trace/init app.js
```

{{% /tab %}}
{{% tab "In code" %}}

```js
const tracer = require('dd-trace').init({
  profiling: true,
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3'
})
```

**注**: Datadog APM を既に使用している場合は、既に `init` を呼び出しているので、再度呼び出す必要はありません。そうでない場合は、トレーサーとプロファイラーが一緒にロードされていることを確認してください。

```node
const tracer = require('dd-trace/init')
```

{{% /tab %}}
{{< /tabs >}}

4. Optional: Set up [Source Code Integration][4].

5. A minute or two after starting your Node.js application, your profiles will show up on the [APM > Profiler page][5].

## 次のステップ

[プロファイラーの概要][6]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## オーバーヘッドが高いと感じている方

Node.js 16 以上を推奨します。それ以前のバージョンでは、アプリケーションによっては、次のプロファイルを開始する際に、1 分ごとにテールレイテンシーがスパイクすることがあります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /ja/integrations/guide/source-code-integration/?tab=nodejs
[5]: https://app.datadoghq.com/profiling
[6]: /ja/getting_started/profiler/
[7]: /ja/profiler/enabling/supported_versions/
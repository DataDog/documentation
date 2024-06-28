---
aliases:
- /ja/tracing/profiler/enabling/nodejs/
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: profiler/profiler_troubleshooting
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
title: Node.js プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

Datadog Profiler は、少なくとも Node.js 14 が必要ですが、Node.js 16 以上を推奨しています。**Node.js の 16 より前のバージョンを使用する場合、一部のアプリケーションでは、次のプロファイルを開始する際にテールレイテンシーが 1 分ごとにスパイクすることがあります**。

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][2] 以降または [6.20.2][3] 以降にアップグレードしてください。

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

4. Node.js アプリケーションの起動 1〜2 分後、[APM > Profiler ページ][4]にプロファイルが表示されます。

## 次のステップ

[プロファイラーの概要][5]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## オーバーヘッドが高いと感じている方

Node.js 16 以上を推奨します。それ以前のバージョンでは、アプリケーションによっては、次のプロファイルを開始する際に、1 分ごとにテールレイテンシーがスパイクすることがあります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /ja/getting_started/profiler/
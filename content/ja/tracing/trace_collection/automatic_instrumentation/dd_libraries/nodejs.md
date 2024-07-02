---
title: Tracing Node.js Applications
kind: documentation
aliases:
    - /tracing/nodejs/
    - /tracing/languages/nodejs/
    - /tracing/languages/javascript/
    - /tracing/setup/javascript/
    - /agent/apm/nodejs/
    - /tracing/setup/nodejs
    - /tracing/setup_overview/nodejs
    - /tracing/setup_overview/setup/nodejs
    - /tracing/trace_collection/dd_libraries/nodejs/
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: "https://github.com/DataDog/dd-trace-js"
      tag: ソースコード
      text: Source code
    - link: "https://datadog.github.io/dd-trace-js"
      tag: Documentation
      text: API documentation
    - link: tracing/glossary/
      tag: ドキュメント
      text: Explore your services, resources and traces
    - link: tracing/
      tag: ドキュメント
      text: Advanced Usage
---
## Compatibility requirements

The latest Node.js Tracer supports Node.js versions `>=18`. For a full list of Datadog's Node.js version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][13]. Then, complete the following steps to add the Datadog tracing library to your Node.js application to instrument it. 

### Datadog トレーシングライブラリのインストール

To install the Datadog tracing library using npm for Node.js 18+, run:

  ```shell
  npm install dd-trace --save
  ```
To install the Datadog tracing library (version 4.x of `dd-trace`) for end-of-life Node.js version 16, run:
  ```shell
  npm install dd-trace@latest-node16
  ```
For more information on Datadog's distribution tags and Node.js runtime version support, see the [Compatibility Requirements][1] page.
If you are upgrading from a previous major version of the library (0.x, 1.x, 2.x, 3.x or 4.x) to another major version, read the [Migration Guide][5] to assess any breaking changes.

### Import and initialize the tracer

Import and initialize the tracer either in code or with command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

After you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm the tracer has been imported and initialized correctly**. The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

#### Option 1: Add the tracer in code

##### JavaScript

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript and bundlers

For TypeScript and bundlers that support EcmaScript Module syntax, initialize the tracer in a separate file to maintain correct load order.

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

If the default config is sufficient, or all configuration is done
via environment variables, you can also use `dd-trace/init`, which loads and
initializes in one step.

```typescript
import 'dd-trace/init';
```

#### Option 2: Add the tracer with command line arguments

Use the `--require` option to Node.js to load and initialize the tracer in one step.

```sh
node --require dd-trace/init app.js
```

**Note:** This approach requires using environment variables for all configuration of the tracer.

#### ESM applications only: Import the loader

EcmaScript Modules (ESM) applications require an additional command line argument. Run this command regardless of how the tracer is imported and initialized.

**Node.js < v20.6**
```shell
node --loader dd-trace/loader-hook.mjs entrypoint.js
```

**Node.js >= v20.6**
```shell
node --import dd-trace/register.js entrypoint.js
```

### バンドル

`dd-trace` は Node.js アプリケーションがモジュールをロードする際に行う `require()` 呼び出しを傍受することで動作します。これには、ファイルシステムにアクセスするための `fs` モジュールのような Node.js に組み込まれているモジュールや、`pg` データベースモジュールのような NPM レジストリからインストールされたモジュールが含まれます。

バンドラーはアプリケーションがディスク上のファイルに対して行う `require()` 呼び出しをすべてクロールします。`require()` の呼び出しをカスタムコードに置き換え、その結果の JavaScript を 1 つの "バンドルされた" ファイルにまとめます。`require('fs')` のような組み込みモジュールがロードされたとき、その呼び出しは結果として生成されるバンドルにそのまま残ります。

`dd-trace` のような APM ツールはこの時点で機能しなくなります。組み込みモジュールの呼び出しは引き続き傍受できますが、サードパーティライブラリの呼び出しは傍受しません。つまり、`dd-trace` アプリをバンドラーでバンドルすると、ディスクアクセス (`fs` 経由) とアウトバウンド HTTP リクエスト (`http` 経由) の情報はキャプチャしますが、サードパーティライブラリの呼び出しは省略する可能性が高くなります。例:
- `express` フレームワークの受信リクエストルート情報を抽出する。
- データベースクライアント `mysql` に対して実行されるクエリを表示する。

一般的な回避策は、APM がインスツルメンテーションする必要のあるすべてのサードパーティモジュールを、バンドラーの "外部" として扱うことです。この設定では、インスツルメンテーションされたモジュールはディスク上に残り、`require()` でロードされ続け、インスツルメンテーションされていないモジュールはバンドルされます。しかし、これでは余計なファイルがたくさんあるビルドになってしまい、バンドルする意味がなくなってしまいます。

Datadog では、カスタムビルトバンドラープラグインを推奨しています。このプラグインは、バンドラーに動作を指示したり、中間コードを挿入したり、"翻訳された" `require()` 呼び出しを傍受したりすることができます。その結果、より多くのパッケージがバンドルされた JavaScript ファイルに含まれるようになります。

**注**: アプリケーションによっては、100% のモジュールをバンドルすることができますが、ネイティブモジュールはまだバンドルの外部に残しておく必要があります。

#### Esbuild サポート

このライブラリは esbuild プラグインの形で実験的な esbuild サポートを提供し、少なくとも Node.js v16.17 または v18.7 が必要です。プラグインを使用するには、`dd-trace@3+` がインストールされていることを確認し、バンドルをビルドするときに `dd-trace/esbuild` モジュールを要求します。

以下は esbuild で `dd-trace` を使う例です。

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // 組み込みモジュールの使用を可能にします
  target: ['node16'],
  external: [
    // esbuild はネイティブモジュールをバンドルできません
    '@datadog/native-metrics',

    // プロファイリングを使用する場合は必須です
    '@datadog/pprof',

    // Datadog のセキュリティ機能を使用する場合は必須です
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-iast-rewriter',

    // ビルドステップで graphql エラーが発生した場合は必須です
    'graphql/language/visitor',
    'graphql/language/printer',
    'graphql/utilities'
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

**注**: トレーサーでは、コンパイルされた C++ コードであるネイティブモジュール (通常、拡張機能が `.node` で終わる) を使用するため、 `external` リストにエントリを追加する必要があります。現在、Node.js トレーサーで使用されているネイティブモジュールは `@datadog` プレフィックス付きパッケージの中にあります。このため、バンドルしたアプリケーションと共に `node_modules/` ディレクトリも配布する必要があります。 ディレクトリには、バンドル内に含まれるべき多くの不要なパッケージがあるため、`node_modules/` ディレクトリ全体を配布する必要はありません。

必要なネイティブモジュール (とその依存関係) だけを含む、より小さな `node_modules/` ディレクトリを生成するには、まず必要なパッケージのバージョンを決定し、それらをインストールするための一時ディレクトリを作成し、そこから結果の `node_modules/` ディレクトリをコピーします。例:

```sh
cd path/to/project
npm ls @datadog/native-metrics
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/native-metrics@2.0.0
$ npm ls @datadog/pprof
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/pprof@5.0.0
mkdir temp && cd temp
npm init -y
npm install @datadog/native-metrics@2.0.0 @datadog/pprof@5.0.0
cp -R ./node_modules path/to/bundle
```

この段階で、バンドル (アプリケーションコードと依存関係の大部分) と、ネイティブモジュールとその依存関係を含む `node_modules/` ディレクトリをデプロイできるはずです。

## 構成

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][4]を参照してください。

初期化のオプションについては、[トレーサー設定][3]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[11]: /tracing/trace_collection/library_injection_local/
[13]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent

---
aliases:
- /ja/tracing/nodejs/
- /ja/tracing/languages/nodejs/
- /ja/tracing/languages/javascript/
- /ja/tracing/setup/javascript/
- /ja/agent/apm/nodejs/
- /ja/tracing/setup/nodejs
- /ja/tracing/setup_overview/nodejs
- /ja/tracing/setup_overview/setup/nodejs
- /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: ソースコード
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: よくあるご質問
  text: API ドキュメント
- link: tracing/glossary/
  tag: よくあるご質問
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: よくあるご質問
  text: 高度な使用方法
title: Node.js アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件{#compatibility-requirements}

最新の Node.js トレーサーは、Node.js バージョン `>=18` をサポートしています。Datadog の Node.js バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1] ページをご覧ください。

## はじめに{#getting-started}

作業を始める前に、[Agent のインストールと構成][13] が済んでいることを確認してください。確認したら、以下の手順を実行して、Datadog SDK を Node.js アプリケーションに追加し、そのアプリケーションをインスツルメントします。

### Datadog SDK のインストール{#install-the-datadog-sdk}

Node.js 18 以降に対応する npm を使用して Datadog SDK をインストールするには、以下を実行します。

  ```shell
  npm install dd-trace
  ```
サポートを終了した Node.js バージョン 16 に対応する Datadog SDK (`dd-trace` のバージョン 4.x) をインストールするには、以下を実行します。
  ```shell
  npm install dd-trace@latest-node16
  ```
Datadog のディストリビューションタグおよび Node.js のランタイムバージョンサポートについて詳しくは、[互換性要件][1] ページを参照してください。
ライブラリの以前のメジャーバージョン (0.x、1.x、2.x、3.x、4.x) から別のメジャーバージョンにアップグレードする場合は、[移行ガイド][5] を読み、変更点を評価してください。

<div class="alert alert-info">Serverless 環境やシングルステップインスツルメンテーションを使用している場合は、ライブラリはあらかじめインストールされているため、依存関係として追加する必要はありません。代わりに、ローカルでトレースするために、開発依存として追加してください。
  <div class="highlight code-snippet js-appended-copy-btn">
    <pre tabindex="0" class="chroma">
      <code class="language-shell" data-lang="shell"><span class="line"><span class="cl">npm install dd-trace -D <span class="c1"># instead of `npm install dd-trace`</span></span></span></code>
    </pre>
    <div class="code-button-wrapper position-absolute">
      <button class="btn text-primary js-copy-button">コピー</button>
    </div>
  </div>
</div>

### Datadog パブリック API のインストール (オプション){#install-the-datadog-public-api-optional}

このステップは、Serverless またはシングルステップインスツルメンテーションでカスタムインスツルメンテーションを行う場合にのみ必要です。ほかのカスタムインスツルメンテーションのユースケースではオプションです。Datadog パブリック API を使用すべき状況の詳細については、[Datadog API を使用したカスタムインスツルメンテーション][14] を参照してください。

  ```shell
  npm install dd-trace-api
  ```

続けて、カスタムインスツルメンテーションを実施する任意のコード内で `dd-trace-api` の代わりに `dd-trace` をインポートできます。

### トレーサーのインポートと初期化{#import-and-initialize-the-tracer}

トレーサーをコード内で、またはコマンドライン引数を使用して、インポートして初期化します。Node.js SDK は、その他すべてのモジュールより**前に**インポートして初期化する必要があります。

<div class="alert alert-info"><strong>Next.js</strong> や <strong>Nest.js</strong> などのフレームワークでは、環境変数を指定するか、追加の Node.js フラグを追加する必要があります。詳細については、<a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">複雑なフレームワークの使用</a>を参照してください。</div>

セットアップの完了後、Web リクエストの URL ルートがない、切断されている、スパンがないなどの、不完全なトレースを受信する場合は、**SDK が正しくインポートされ、初期化されていることを確認**してください。SDK が自動インスツルメンテーションに必要なすべてのライブラリに適切にパッチを適用するには、最初に SDK を初期化しておく必要があります。

TypeScript、Webpack、Babel などのトランスパイラーを使用する場合は、SDK を外部ファイルにインポートして初期化し、アプリケーションをビルドするときにそのファイル全体をインポートします。

#### コマンドライン引数による SDK の追加{#add-the-sdk-with-command-line-arguments}

Node.js の `--require` オプションを使用して、SDK を 1 回のステップでロードして初期化します。

```sh
node --require dd-trace/init app.js
```

上記のアプローチでは、SDK のすべての構成に環境変数を使用する必要があります。プログラムによる構成を使用する必要がある場合は、専用ファイルで `dd-trace` を初期化し、代わりにそのファイルを要求してください。

```sh
node --require ./dd-trace.js app.js
```

ファイルには次の内容が含まれている必要があります。

```js
// ./dd-trace.js
require('dd-trace').init({
  // programmatic config
})
```

CLI 引数を制御できない場合は、代わりに環境変数を使用できます。

<div class="alert alert-info"><code>DD_TRACE_ENABLED</code> is <code>true</code> デフォルトでは、これは、初期化の前のインポート時にインスツルメンテーションが行われることを意味します。インスツルメンテーションを完全に無効にするには、以下のいずれかの操作を行います。
  <ul>
    <li>モジュールを条件付きでインポートする</li>
    <li>以下を設定する <code>DD_TRACE_ENABLED=false</code> (たとえば、静的または最上位の ESM インポートによって条件付きの読み込みが行えない場合)</li>
  <ul>
</div>

#### ESM アプリケーションの場合のみ: ローダーをインポートする{#esm-applications-only-import-the-loader}

ESM (ECMAScript モジュール) アプリケーションには、_追加の_コマンドライン引数が必要です。この引数は、SDK がどのようにインポートおよび初期化されるかに関係なく追加してください。

- **v20.6 より前の Node.js の場合:** `--loader dd-trace/loader-hook.mjs`
- **v20.6 以降の Node.js の場合:** `--import dd-trace/register.js`

たとえば、Node.js 22 で上記のオプション 1 を使用して SDK を初期化する場合、次のように開始します。

```sh
node --import dd-trace/register.js app.js
```

これは、`--require dd-trace/init` コマンドライン引数と組み合わせることもできます。

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Node.js v20.6 以降では、両方のコマンドライン引数を組み合わせて使用するための簡単な方法があります。

```sh
node --import dd-trace/initialize.mjs app.js
```

### バンドル {#bundling}

`dd-trace` は、モジュールを読み込む際に Node.js アプリケーションが行う `require()` 呼び出しをインターセプトすることによって機能します。これには、ファイルシステムにアクセスするための `fs` モジュールのような、Node.js に組み込まれているモジュールと、`pg` データベース モジュールのような、NPM レジストリからインストールされたモジュールが含まれます。

バンドラーは、アプリケーションがディスク上のファイルに対して行うすべての `require()` 呼び出しをクロールします。これにより `require()` 呼び出しがカスタムコードに置き換えられ、生成されるすべての JavaScript が 1 つの“バンドル”ファイルに結合されます。`require('fs')` などの組み込みモジュールが読み込まれたときに、その呼び出しが生成されるバンドルにそのまま残ることがあります。

`dd-trace` などの APM ツールは、その時点で動作を停止します。それらは、組み込みモジュールの呼び出しを引き続きインターセプトすることはできますが、サードパーティライブラリに対する呼び出しはインターセプトしません。つまり、バンドラーを使用して `dd-trace` アプリをバンドルした場合、(`fs` を介した) ディスク アクセスに関する情報と (`http` を介した) アウトバウンド HTTP リクエストに関する情報は取得されますが、サードパーティライブラリに対する呼び出しの情報は取得されないと考えられます。たとえば、次のようになります。
- `express` フレームワークの受信リクエストルート情報を抽出する。
- `mysql` データベースクライアントに対して実行されるクエリを表示する。

一般的な回避策は、APM がインスツルメントする必要があるすべてのサードパーティモジュールをバンドラーに対して“外部”として扱うことです。この設定では、インスツルメントされたモジュールはディスク上に残り、引き続き `require()` で読み込まれますが、インスツルメントされていないモジュールはバンドルされます。しかし、これによりビルドで余分なファイルが多数生成され、バンドルの目的が損なわれ始めます。

Datadog では、カスタムビルドのバンドラープラグインを使用することを推奨します。これらのプラグインは、バンドラーにどのように動作するかを指示し、中間コードを注入し、“翻訳された” `require()` 呼び出しをインターセプトすることができます。その結果、バンドルされた JavaScript ファイルにはより多くのパッケージが含まれるようになります。

**注**: アプリケーションによっては、100% のモジュールをバンドルすることができますが、ネイティブモジュールはまだバンドルの外部に残しておく必要があります。

#### esbuild でのバンドル {#bundling-with-esbuild}

このライブラリは esbuild プラグインの形で実験的な esbuild サポートを提供し、少なくとも Node.js v16.17 または v18.7 が必要です。プラグインを使用するには、`dd-trace@3+` がインストールされていることを確認し、バンドルをビルドするときに `dd-trace/esbuild` モジュールを要求します。

以下は esbuild で `dd-trace` を使用する例です。

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16'],
  external: [
    // required if you use native metrics
    '@datadog/native-metrics',

    // required if you use profiling
    '@datadog/pprof',

    // required if you use Datadog security features
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-iast-rewriter',
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Next.js でのバンドル {#bundling-with-nextjs}

Next.js、またはアプリケーションのバンドルに Webpack を利用する別のフレームワークを使用している場合は、
ご使用の `next.config.js` 構成ファイル内の Webpack に、次のような宣言を追加します。

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... non-relevant parts omitted, substitute your own config ...

  // this custom webpack config is required for Datadog tracing to work
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const externals = [
      // required if you use native metrics
      '@datadog/native-metrics',

      // required if you use profiling
      '@datadog/pprof',

      // required if you use Datadog security features
      '@datadog/native-appsec',
      '@datadog/native-iast-taint-tracking',
      '@datadog/native-iast-rewriter',
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### サポート対象外の Datadog 機能 {#unsupported-datadog-features}

以下の機能は、Node.js トレーサーでデフォルトで無効になっています。これらはバンドルに対応していないため、アプリケーションがバンドルされている場合は使用できません。

- APM: Dynamic Instrumentation

#### 一般的なバンドルに関する注意事項 {#general-bundling-remarks}

**注**: SDK 内のネイティブモジュール (コンパイル済みの C++ コード (通常は末尾に `.node` ファイル拡張子が付きます)) の使用により、`external` リストにエントリを追加する必要があります。現在、Node.js トレーサーで使用されるネイティブモジュールは、`@datadog` というプレフィックスが付いたパッケージ内に存在します。そのため、バンドルされたアプリケーションと共に `node_modules/` ディレクトリも出荷する必要があります。`node_modules/` ディレクトリには、バンドルに含まれているはずの余分なパッケージが多数含まれているため、このディレクトリ全体を出荷する必要はありません。

必要なネイティブモジュール (とその依存関係) だけを含む、より小さな `node_modules/` ディレクトリを生成するには、まず必要なパッケージのバージョンを決定し、それらをインストールするための一時ディレクトリを作成し、そこから結果の `node_modules/` ディレクトリをコピーします。たとえば、次のようになります。

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

**注**: Next.js の場合、一般に `path/to/bundle` はアプリの `.next/standalone` ディレクトリです。

この段階で、バンドル (アプリケーションコードと依存関係の大部分) と、ネイティブモジュールとその依存関係を含む `node_modules/` ディレクトリをデプロイできるはずです。

## 構成 {#configuration}

必要に応じて、unified service tagging の設定など、アプリケーションパフォーマンスのテレメトリデータを送信するための SDK を構成します。詳細については、[ライブラリの構成][4] を参照してください。

初期化のオプションについては、[トレーサー設定][3] をお読みください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /ja/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /ja/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /ja/tracing/trace_collection/library_injection_local/
[13]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[14]: /ja/tracing/trace_collection/custom_instrumentation/server-side/?api_type=dd_api&prog_lang=node_js
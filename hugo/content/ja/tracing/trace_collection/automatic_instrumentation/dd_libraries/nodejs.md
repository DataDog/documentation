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
- /ja/tracing/trace_collection/dd_libraries/nodejs/
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: ソースコード
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: ドキュメント
  text: API ドキュメント
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: ドキュメント
  text: 高度な使用方法
title: Node.js アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新の Node.js トレーサーは、Node.js バージョン `>=18` をサポートします。Datadog の Node.js バージョンおよびフレームワークのサポート一覧(レガシーおよびメンテナンス バージョンを含む)については、[互換性要件][1] ページを参照してください。

## はじめに

開始する前に、すでに [Agent のインストールと構成][13] を完了していることを確認してください。次に、Datadog トレーシング ライブラリを Node.js アプリケーションに追加して自動計測できるよう、以下の手順を実行します。

### Datadog トレーシングライブラリのインストール

Node.js 18+ 向けに npm を使用して Datadog トレーシング ライブラリをインストールするには、次を実行します:

  ```shell
  npm install dd-trace --save
  ```
サポート終了の Node.js バージョン 16 向けに Datadog トレーシング ライブラリ(`dd-trace` バージョン 4.x)をインストールするには、次を実行します:
  ```shell
  npm install dd-trace@latest-node16
  ```
"Datadog のディストリビューション タグと Node.js ランタイム バージョンのサポートについての詳細は、[互換性要件][1] ページを参照してください。 
ライブラリの以前のメジャー バージョン(0.x、1.x、2.x、3.x、または 4.x)から別のメジャー バージョンへアップグレードする場合は、破壊的変更の有無を確認するために [移行ガイド][5] をお読みください。"

### トレーサーをインポートして初期化する

トレーサーは、コード内で、またはコマンド ライン引数を使用してインポートおよび初期化できます。Node.js トレーシング ライブラリは、他のいかなるモジュールよりも **前に** インポートして初期化する必要があります。

<div class="alert alert-info"><strong>Next.js</strong> や <strong>Nest.js</strong> のようなフレームワークでは、環境変数を指定するか、追加の Node.js フラグを付与する必要があります。詳細は <a href="/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage">複雑なフレームワークの使用</a> を参照してください。</div>

セットアップ完了後、完全なトレースを受信できない場合(たとえば Web リクエストの URL ルートが欠落している、スパンが切断または欠落しているなど)、**トレーサーが正しくインポートおよび初期化されていること** を確認してください。トレーシング ライブラリを最初に初期化しておくことは、トレーサーが自動計測に必要なすべてのライブラリへ適切にパッチを適用するために不可欠です。

TypeScript、Webpack、Babel などのトランスパイラーを使用する場合は、トレーサーライブラリを外部ファイルにインポートして初期化し、アプリケーションをビルドするときにそのファイル全体をインポートします。

#### オプション 1: コードでトレーサーを追加する

##### JavaScript

```javascript
// の行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init();
```

**注**: `DD_TRACE_ENABLED` は既定で `true` です。つまり、初期化前でもインポート時に一部の計測が行われます。計測を完全に無効化するには、次のいずれかを実施します:
- モジュールを条件付きでインポートする 
- `DD_TRACE_ENABLED=false` を設定する(たとえば、静的またはトップ レベルの ESM インポートにより条件付き読み込みができない場合)

##### TypeScript とバンドラー

TypeScript および ECMAScript Modules 構文をサポートするバンドラを使用する場合は、正しい読み込み順序を維持するため、トレーサーは別ファイルで初期化してください。

```typescript
// server.ts
import './tracer'; // インスツルメントされたいずれのモジュールのインポートより前である必要があります。

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // ホイストを避けるため異なるファイルで初期化。
export default tracer;
```

デフォルトのコンフィギュレーションで十分な場合、またはすべてのコンフィギュレーションが環境変数を介して行われる場合は、`dd-trace/init` を使用することもできます。これは 1 つのステップでロードおよび初期化されます。

```typescript
import 'dd-trace/init';
```

#### オプション 2: コマンド ライン引数でトレーサーを追加する

Node.js の `--require` オプションを使用して、1 ステップでトレーサーの読み込みと初期化を行います。 

```sh
node --require dd-trace/init app.js
```

**注**: この方法では、トレーサーのすべての構成に環境変数を使用する必要があります。

#### ESM アプリケーションのみ: ローダーをインポートする

ECMAScript Modules (ESM) アプリケーションでは、_追加の_ コマンド ライン引数が必要です。トレーサーのインポートや初期化方法にかかわらず、この引数を追加してください:

- **Node.js < v20.6:** `--loader dd-trace/loader-hook.mjs` 
- **Node.js >= v20.6:** `--import dd-trace/register.js`

例: Node.js 22 で上記のオプション 1 を使ってトレーサーを初期化する場合、起動コマンドは次のようになります:

```sh
node --import dd-trace/register.js app.js
```

これは、コマンド ライン引数 `--require dd-trace/init`(オプション 2)と組み合わせることもできます:

```sh
node --import dd-trace/register.js --require dd-trace/init app.js
```

Node.js v20.6 以降では、両方のコマンド ライン引数をまとめる短縮形もあります:

```sh
node --import dd-trace/initialize.mjs app.js
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

#### esbuild でのバンドル

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
  platform: 'node', // ビルトイン モジュールを必須にできるようにする
  target: ['node16'],
  external: [
    // ネイティブ メトリクスを使用する場合に必須
    '@datadog/native-metrics',

    // プロファイリングを使用する場合に必須
    '@datadog/pprof',

    // Datadog のセキュリティ機能を使用する場合に必須
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/wasm-js-rewriter',

    // ビルド ステップ中に GraphQL のエラーが発生する場合に必須
    'graphql/language/visitor',
    'graphql/language/printer',
    'graphql/utilities'
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Next.js でのバンドル

アプリケーションのバンドルに webpack を利用する Next.js などのフレームワークを使用している場合は、`next.config.js` 構成ファイル内で webpack 用の宣言に類似した設定を追加してください:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 関係のない部分は省略。ご自身の設定に置き換えてください。

  // Datadog トレーシングを動作させるには、このカスタム webpack 設定が必要です。
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    const externals = [
      // ネイティブ メトリクスを使用する場合に必須
      '@datadog/native-metrics',

      // プロファイリングを使用する場合に必須
      '@datadog/pprof',

      // Datadog のセキュリティ機能を使用する場合に必須
      '@datadog/native-appsec',
      '@datadog/native-iast-taint-tracking',
      '@datadog/native-iast-rewriter',

      // ビルド ステップ中に GraphQL のエラーが発生する場合に必須
      'graphql/language/visitor',
      'graphql/language/printer',
      'graphql/utilities'
    ];
    config.externals.push(...externals);
    return config;
  },
};

export default nextConfig;
```

#### サポートされない Datadog 機能

以下の機能は Node.js トレーサーで既定で無効になっています。バンドルをサポートしておらず、アプリケーションがバンドルされている場合は使用できません。

- APM: Dynamic Instrumentation

#### バンドルに関する一般的な注意事項

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

**注**: Next.js の場合、`path/to/bundle` は通常、アプリの `.next/standalone` ディレクトリです。

この段階で、バンドル (アプリケーションコードと依存関係の大部分) と、ネイティブモジュールとその依存関係を含む `node_modules/` ディレクトリをデプロイできるはずです。

## 設定

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][4]を参照してください。

初期化のオプションについては、[トレーサー設定][3]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /ja/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[6]: /ja/tracing/trace_collection/compatibility/nodejs/#complex-framework-usage
[11]: /ja/tracing/trace_collection/library_injection_local/
[13]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent

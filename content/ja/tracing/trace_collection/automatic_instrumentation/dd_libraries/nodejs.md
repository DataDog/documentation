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
  tag: GitHub
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: ドキュメント
  text: API ドキュメント
- link: tracing/trace_collection/otel_instrumentation/java/
  tag: APM の UI を利用する
  text: サービス、リソース、トレースを調査する
- link: tracing/trace_collection/otel_instrumentation/
  tag: 高度な使用方法
  text: 高度な使用方法
kind: ドキュメント
title: Node.js アプリケーションのトレース
type: multi-code-lang
---
## 互換性要件

最新の Node.js トレーサーは、バージョン `>=14` に対応しています。Datadog の Node.js バージョンとフレームワークのサポート一覧 (レガシーバージョンとメンテナンスバージョンを含む) については、[互換性要件][1]ページをご覧ください。

## はじめに

作業を始める前に、[Agent のインストールと構成][13]が済んでいることを確認してください。

### アプリケーションをインスツルメントする

Datadog Agent をインストールして構成したら、次はアプリケーションに直接トレーシングライブラリを追加してインスツルメントします。[互換性情報][1]の詳細をお読みください。

Agent のインストールが完了したら、以下の手順で Datadog のトレーシングライブラリを Node.js アプリケーションに追加します。

1. Node.js 14 以降に対応する npm を使用して Datadog Tracing ライブラリをインストールします。

    ```sh
    npm install dd-trace --save
    ```
   発売終了済みの Node.js バージョン 12 をトレースしたい場合は、以下を実行して `dd-trace` のバージョン 2.x をインストールしてください。
    ```
    npm install dd-trace@latest-node12
    ```
   ディストリビューションタグおよび Node.js のランタイムばージョンサポートについて詳しくは、[互換性要件][1] ページを参照してください。
   ライブラリの以前のメジャーバージョン (0.x、1.x、2.x) から別のメジャーバージョン (2.x、3.x) にアップグレードする場合は、[移行ガイド][5]を読み、変更点を評価するようにしてください。

2. コードまたはコマンドライン引数を使用して、トレーサーをインポートして初期化します。Node.js トレースライブラリは、他のモジュールの**前**にインポートして初期化する必要があります。

   セットアップが完了した後、Web リクエストの URL ルートの欠落、スパンの切断または欠落など、完全なトレースを受信していない場合は、**ステップ 2 が正しく行われたことを確認してください**。最初に初期化されるトレースライブラリは、トレーサーが自動インスツルメンテーションに必要なすべてのライブラリに適切にパッチを適用するために必要です。

   TypeScript、Webpack、Babel などのトランスパイラーを使用する場合は、トレーサーライブラリを外部ファイルにインポートして初期化し、アプリケーションをビルドするときにそのファイル全体をインポートします。

### コードにトレーサーを追加する

#### JavaScript

```javascript
// の行は、インスツルメントされたいずれのモジュールのインポートより前である必要があります。
const tracer = require('dd-trace').init();
```

#### TypeScript とバンドラー

EcmaScript モジュール構文をサポートする TypeScript およびバンドラーの場合、正しいロード順序を維持するために、別のファイルでトレーサーを初期化します。

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

### コマンドライン引数を介したトレーサーの追加

Node.js の `--require` オプションを使用して、トレーサーを 1 回のステップでロードして初期化します。

```sh
node --require dd-trace/init app.js
```

**注:** このアプローチでは、トレーサーのすべてのコンフィギュレーションに環境変数を使用する必要があります。

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

## ブラウザトラブルシューティング

必要に応じて、統合サービスタグ付けの設定など、アプリケーションパフォーマンスのテレメトリーデータを送信するためのトレースライブラリーを構成します。詳しくは、[ライブラリの構成][4]を参照してください。

初期化のオプションについては、[トレーサー設定][3]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /ja/tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[11]: /ja/tracing/trace_collection/library_injection_local/
[13]: /ja/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
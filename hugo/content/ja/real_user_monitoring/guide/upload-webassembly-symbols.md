---
description: ブラウザアプリケーションから収集された WASM スタックトレースを読み取り可能にするために、WebAssembly デバッグシンボルをアップロードします。
further_reading:
- link: /error_tracking/frontend/browser
  tag: ドキュメント
  text: Browser Error Tracking の設定
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: ドキュメント
  text: JavaScript ソースマップをアップロードする
- link: /real_user_monitoring/guide/debug-symbols
  tag: ドキュメント
  text: RUM デバッグシンボルで難読化されたスタックトレースを調査する
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/wasm-symbols
  tag: ソースコード
  text: WebAssembly シンボルコマンドリファレンス
title: WebAssembly シンボルのアップロード
---
## 概要{#overview}

WebAssembly (WASM) はブラウザアプリケーションの一部として実行されます。これは個別の Datadog アプリケーションタイプではありません。Datadog Browser SDK は、WASM エラーとその周囲のブラウザコンテキストを収集します。Datadog Error Tracking は、アップロードされた DWARF デバッグ情報を使用してそれらの WASM スタックフレームをシンボル化できます。

1 つのエラーに JavaScript フレームと WASM フレームの両方が含まれる場合があります。JavaScript フレーム用の [JavaScript ソースマップ][1]と WASM フレーム用の WASM シンボルをアップロードします。

<div class="alert alert-warning">WebAssembly のシンボル化はベータ版です。ブラウザ SDK プラグインと <code>datadog-ci wasm-symbols upload</code> コマンドは試験機能であり、変更される可能性があります。</div>

## 前提条件 {#prerequisites}

シンボルをアップロードする前に、以下が準備されていることを確認してください。

- [RUM][2]、[Browser Logs][3]、またはその両方を使用して WASM モジュールのメタデータを収集するように構成されたブラウザアプリケーション。
- 埋め込み DWARF デバッグセクションと `build_id` カスタムセクションを持つ `.wasm` シンボルファイル。
- `@datadog/datadog-ci`バージョン 5.23.0 以降。

## デバッグシンボルの生成 {#generate-debug-symbols}

WASM ツールチェーンが以下のものを生成するように構成します。

- `.debug_info` や `.debug_line` などの埋め込み DWARF セクション。
- `build_id` カスタムセクション。アップロードされたシンボルファイルのビルド ID は、ブラウザによって読み込まれたモジュールのビルド ID と一致している必要があります。

たとえば Emscripten を使用する場合は次のようになります。

```shell
emcc -g -Wl,--build-id <SOURCES> -o <OUTPUT>.js
```

このコマンドは `<OUTPUT>.js` (JavaScript ローダー) と、埋め込み DWARF 情報および `build_id` カスタムセクションを含む `<OUTPUT>.wasm` (WebAssembly バイナリ) を生成します。

生成されたモジュールは `wasm-objdump` で検査できます。

```shell
wasm-objdump -h <OUTPUT>.wasm
wasm-objdump -j build_id -x <OUTPUT>.wasm
```

CI パイプラインからシンボルファイルをアップロードできるように、シンボルファイルをビルドアーティファクトとして保持します。

## シンボルのアップロード {#upload-your-symbols}

Datadog CLI をインストールし、Datadog API キーとサイトを構成します。

```shell
npm install --save-dev @datadog/datadog-ci
export DATADOG_API_KEY=<DATADOG_API_KEY>
export DATADOG_SITE={{< region-param key="dd_site" >}}
```

ベータ版コマンドを有効にし、1 つの `.wasm` ファイルまたはディレクトリのいずれかをアップロードします。ディレクトリを指定した場合、CLI ディレクトリは再帰的に検索して `.wasm` ファイルを検出します。

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build
```

このコマンドは、埋め込み DWARF 情報と `build_id` カスタムセクションの両方を含まないファイルをスキップします。シンボルファイルをアップロードせずに検証するには、`--dry-run` を使用します。

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build --dry-run
```

デフォルトでは、Datadog はビルド ID で最初にアップロードされたシンボルファイルを保持します。意図的に置き換える必要がある場合は、`--replace-existing` を使用します。

<div class="alert alert-info">アップローダーは <code>external_debug_info</code> リファレンスを解決しません。このリファレンスのみを含むランタイムモジュールはスキップされます。埋め込み DWARF セクションと、ランタイムモジュールと同じ <code>build_id</code> を含むシンボルファイルをアップロードします。</div>

## シンボルの照合方法 {#how-symbols-are-matched}

Datadog はモジュールの URL メタデータを使用して各 WASM スタックフレームをモジュールに関連付け、その後 `build_id` でモジュールとアップロードされたシンボルとを照合します。JavaScript ソースマップとは異なり、`service` および `version` は WASM シンボルルックアップの一部ではありません。

アップロードされたファイルは [RUM Debug Symbols ページ][4]で表示できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/upload-javascript-source-maps/
[2]: /ja/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[3]: /ja/logs/log_collection/javascript/#webassembly-errors
[4]: https://app.datadoghq.com/source-code/setup/rum
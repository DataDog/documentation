---
app_id: webassembly-observe-sdk
app_uuid: 30eb706f-9143-461e-99af-89015e8493d5
assets: {}
author:
  homepage: https://dylibso.com
  name: Dylibso
  sales_email: sales@dylibso.com
  support_email: support@dylibso.com
categories:
- 開発ツール
- 言語
- profiler_troubleshooting
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/dylibso-webassembly/README.md
display_on_public_website: true
draft: false
git_integration_title: dylibso-webassembly
integration_id: webassembly-observe-sdk
integration_title: WebAssembly Observe SDK
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: dylibso-webassembly
public_title: WebAssembly Observe SDK
short_description: 任意のランタイムの WebAssembly (wasm) コードからトレースを抽出
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Languages
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Traces
  configuration: README.md#Setup
  description: 任意のランタイムの WebAssembly (wasm) コードからトレースを抽出
  media:
  - caption: アプリケーションで実行されている WebAssembly コードからキャプチャしたトレースを視覚化する
    image_url: images/wasm-observability.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: WebAssembly Observe SDK
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このインテグレーションは、アプリケーションで実行されている WebAssembly (WASM) コードからの関数トレースを提供します。WebAssembly コードのパフォーマンスだけでなく、以下の動作についての洞察も得られます。
- 関数呼び出し時間
- 実行トレーシング
- メモリ割り当て

WebAssembly コードは安全で制約の多い環境で実行されるため、従来のコード監視技術は機能しません。私たちの特化した可観測性スタックを使えば、他のアプリケーションに期待するのと同じレベルで WASM モジュールを継続的に監視することができます。

Datadog をご利用のお客様は、オープンソースの SDK と Adapter を使って、WASM プログラムから完全なトレースを出力することができます。お使いのアプリケーション用の Datadog Adapter をインストールするには、[`dylibso/observe-sdk`][1] リポジトリを参照してください。

さらに、Dylibso は、既存の WASM モジュールを再コンパイルして、関数とメモリ割り当てのトレースを含めることができる自動インスツルメンテーションツールを提供しています。詳細については、[support@dylibso.com][2] にお問い合わせいただくか、[自動 WebAssembly インスツルメンテーション][3]の詳細をご覧ください。


## 計画と使用

### インフラストラクチャーリスト

アプリケーションのプログラミング言語に応じて、GitHub の [`dylibso/observe-sdk`][1] から適切な Datadog Adapter を 1 つ選択します。


### ブラウザトラブルシューティング

SDK と Adapter を Datadog Agent に接続するには、以下の情報を準備する必要があります。

1. Datadog Agent のホスト URL。
2. SDK および Adapter をインポートするアプリケーションのサービス名。

### 検証

Observe SDK 内の利用可能なオプションから Datadog Adapter をインポートし、構成した後、

1. WebAssembly コードを呼び出す場所に Datadog Adapter が含まれるように、アプリケーションを再デプロイします。
2. WebAssembly モジュール (`.wasm`) がロードされ、そのエクスポート関数を呼び出していることを確認してください。
3. Datadog ダッシュボードで、サービスから送信されたトレースを確認します。

## リアルユーザーモニタリング

### ヘルプ

WebAssembly Observe SDK は、アプリケーションから関数実行やメモリ割り当てイベントのトレースを収集します。

## ヘルプ

ご不明な点は、[Dylibso サポート][2]までお問い合わせください。

[1]: https://github.com/dylibso/observe-sdk
[2]: mailto:support@dylibso.com
[3]: https://dylibso.com/products/observe
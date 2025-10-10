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
- tracing
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/dylibso-webassembly/README.md
display_on_public_website: true
draft: false
git_integration_title: dylibso-webassembly
integration_id: webassembly-observe-sdk
integration_title: WebAssembly Observe SDK
integration_version: ''
is_public: true
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
  - Offering::Integration
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

このインテグレーションは、アプリケーションで実行される WebAssembly (WASM) コードから関数トレースを提供します。WebAssembly コードのパフォーマンスに加えて、以下の動作についてのインサイトを得ることができます:
- 関数呼び出しの実行時間
- 実行トレース
- メモリ割り当て

WebAssembly コードは安全かつ制限された環境で実行されるため、従来のコード監視手法は機能しません。専用の可観測性スタックにより、他のアプリケーションと同じレベルで WASM モジュールを継続的にモニタリングできます。

Datadog の利用者は、オープンソースの SDK と Adapter を使って WASM プログラムから完全なトレースを出力できます。アプリケーションに Datadog Adapter をインストールするには、[`dylibso/observe-sdk`][1] リポジトリを参照してください。

さらに、Dylibso は既存の WASM モジュールを再コンパイルして関数およびメモリ割り当てのトレースを追加する自動インスツルメンテーションツールを提供しています。詳しくは [support@dylibso.com][2] にお問い合わせいただくか、[自動 WebAssembly インスツルメンテーション][3]についてご覧ください。


## セットアップ

### インストール

アプリケーションのプログラミング言語に応じて、GitHub 上の [`dylibso/observe-sdk`][1] から適切な Datadog Adapter を選択してください。


### 構成

SDK と Adapter を Datadog Agent に接続するためには、以下の情報が必要です:

1. Datadog Agent ホスト URL
2. SDK と Adapter をインポートしているアプリケーションのサービス名

### 検証

Observe SDK に含まれるオプションの中から Datadog Adapter をインポートし、設定したら:

1. アプリケーションを再デプロイして、WebAssembly コードを呼び出す箇所に Datadog Adapter が組み込まれるようにします。
2. WebAssembly モジュール (`.wasm`) が読み込まれていることと、そのエクスポートされた関数のいずれかを呼び出していることを確認します。
3. Datadog ダッシュボードで、サービスから送信されたトレースをチェックします。

## 収集データ

### イベント

WebAssembly Observe SDK は、アプリケーションから関数実行やメモリ割り当てイベントのトレースを収集します。

## トラブルシューティング

ご不明な点がございましたら、[Dylibso サポート][2]までお問い合わせください。

[1]: https://github.com/dylibso/observe-sdk
[2]: mailto:support@dylibso.com
[3]: https://dylibso.com/products/observe
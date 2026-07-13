---
aliases:
- /ja/integrations/guide/source-code-integration/
description: APM と統合するソースコードインテグレーションを設定して、テレメトリをリポジトリとリンクし、CI パイプラインのアーティファクトに Git
  情報を埋め込み、ソースコード管理の統合を使用して Datadog 内でインラインコードスニペットを生成します。
title: ソースコードインテグレーション
---
## 概要 {#overview}

Datadog のソースコードインテグレーションを使用すると、Git リポジトリを Datadog に接続して、Datadog プラットフォーム全体でさまざまなソースコード関連機能を有効にできます。関連するソースコード行にアクセスして、スタックトレースやスロープロファイルなどの問題をデバッグできます。

{{< img src="source_code_integration/inline-code-snippet.png" alt="Java RuntimeException のインラインコードスニペットと、GitHub でコードを表示するためのボタン" style="width:100%;">}}

## セットアップと機能 {#setup-and-features}

{{< whatsnext desc="ソースコードインテグレーションのセットアップと機能については、以下のページを参照してください。" >}}
    {{< nextlink href="source_code/source-code-management" >}}ソースコード管理プロバイダーの統合{{< /nextlink >}}
    {{< nextlink href="source_code/service-mapping" >}}サービスマッピング
  およびテレメトリタグ付け{{< /nextlink >}}
    {{< nextlink href="source_code/resource-mapping" >}}Kubernetes リソースマッピング{{< /nextlink >}}
    {{< nextlink href="source_code/features" >}}ソースコードインテグレーションの機能{{< /nextlink >}}
{{< /whatsnext >}}
---
title: Datadog Forwarder から Datadog Lambda 拡張機能への移行
kind: ガイド
---
## 概要


このガイドでは、[Datadog Forwarder][1] から Datadog Lambda 拡張機能への移行方法を説明します。

[Datadog Lambda 拡張機能][2]は、パフォーマンスのオーバーヘッドを最小限に抑えながらコードと合わせて実行するために構築された、Datadog Agent の軽量バージョンです。

Datadog では、Forwarder を削除する**前に**拡張機能を設定することを推奨しています。これは、拡張機能と Forwarder の両方がアクティブである期間中にすべてのテレメトリが 2 回送信されることを意味します。別の方法 (拡張機能をセットアップする前に Forwarder を削除) では、可視性がゼロになる期間が発生します。オーガニゼーションの特定のニーズに応じて、いずれかを選択することができます。

## Datadog Lambda 拡張機能の設定 {#extension-setup}

[Datadog Lambda 拡張機能のドキュメント][2]を参照してください。

## Datadog Forwarder の削除

### Forwarder が新しい関数にアタッチされるのを回避する {#prevent-forwarder}

新しい関数をデプロイすると、Datadog Forwarder はサブスクライブされていない関数を検出し、自動的に新しいサブスクリプションを作成します。関数に拡張機能がインストールされており、Forwarder に自動コンフィギュレーションを使用した場合は関数のロググループに自動で再度サブスクライブされることはありません。

{{< tabs >}}
{{% tab "Serverless Framework" %}}

Forwarder のリソース名を `serverless.yml` ファイルから削除します。

{{% /tab %}}
{{% tab "AWS SAM" %}}

Forwarder のリソース名を `template.yml` ファイルから削除します。

{{% /tab %}}
{{% tab "AWS CDK" %}}

Forwarder のリソース名を CDK スタックから削除します。

{{% /tab %}}
{{% tab "Zappa" %}}

AWS コンソールからサブスクリプションを手動で削除します。

{{% /tab %}}
{{% tab "Chalice" %}}

AWS コンソールからサブスクリプションを手動で削除します。

{{% /tab %}}
{{% tab "Datadog CLI" %}}

AWS コンソールからサブスクリプションを手動で削除します。

{{% /tab %}}
{{% tab "Container Image" %}}

AWS コンソールからサブスクリプションを手動で削除します。

{{% /tab %}}
{{% tab "Custom" %}}

AWS コンソールからサブスクリプションを手動で削除します。

{{% /tab %}}
{{< /tabs >}}

詳細については、[Datadog Forwarder のドキュメント][1]を参照してください。

## ハイブリッドアプローチ

また、既存の関数で引き続き Datadog Forwarder を使用し、新しい関数には Datadog Lambda 拡張機能を使うという方法もあります。

1. Forwarder が新しい関数に[自動的にアタッチされない](#prevent-forwarder)ことを確認します。
2. 新しい関数をデプロイするごとに、[拡張機能を設定](#extension-setup)します。

[1]: /ja/serverless/libraries_integrations/forwarder/
[2]: /ja/serverless/libraries_integrations/extension/
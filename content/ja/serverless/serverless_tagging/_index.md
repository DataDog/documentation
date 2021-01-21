---
title: サーバーレスタグ付け
kind: ドキュメント
further_reading:
  - link: '/getting_started/tagging/unified_service_tagging/#aws-lambda-functions'
    tag: Documentation
    text: 統合サービスタグ付け
---
{{< img src="serverless/serverless_tagging.mp4" video="true" alt="統合サーバーレスタグ付け" >}}

## 概要

AWS Lambda 関数に適用されたタグは、自動的に新しいディメンションになり、ここでメトリクス、トレース、ログを分類できます。

タグは Datadog プラットフォーム間の一貫性を確保するのに特に役立ちます。`env`、`service`、`version` タグではファーストクラスサポートが提供されます。

これらのタグを使用すると、次のことができます。

- 一貫性のあるタグを使用して、メトリクス、トレース、ログ間をシームレスに移動する
- サーバーレスホームページの関数にフィルターを適用する
- Datadog アプリ内で統一された方法で環境またはバージョンに基づいてサービスデータを表示する
- サービスマップをサービスおよび環境別に整理する

サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けするには、[統合サービスタグ付けのドキュメント][1]を参照してください。

### env タグ

`env` を使用すると、ステージング、開発、および本番環境を分離できます。これは、サーバーレス関数だけでなく、あらゆる種類のインフラストラクチャーで機能します。たとえば、本番環境の EU Lambda 関数に `env:prod-eu` タグを付けることができます。

デフォルトでは、AWS Lambda 関数は Datadog で `env:none` でタグ付けされます。独自のタグを追加してこれをオーバーライドします。

### service タグ

関連するLambda 関数をサービスにグループ分けするため、`service` タグを追加します。

Datadog を初めてご利用になるお客様には、デフォルトですべての Lambda 関数は `aws.lambda` サービス下にグループ化され、サービスマップでは単一ノードとして表示されます。これをオーバーライドするには、service で関数をタグ付けします。

**注:** Datadog をお使いでそれぞれの Lambda 関数を独自のサービスとして取り扱っているお客様は、独自のタグを追加してこれをオーバーライドするか、アカウントを新環境に適応させることをご希望の場合は Datadog のサポートチームまでお問い合わせください。

### Version タグ

`version` タグを追加して、[デプロイ追跡][2]を有効にします。

## サービスマップを整理する

[サービスマップ][3]では、`env` タグによりサービスがマップにグループ化されます。そして `service` タグを使用して、サービスとモニターの正常性との関係を表示します。サービスは、サービスマップ上の個々のノードとして表されます。ノードの色は、関連付けられたモニターの正常性を示しています。関連付けるには、モニターに同じ `service` タグを付けます。

{{< img src="serverless/serverless_service_map.png" alt="サービスマップ" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[2]: /ja/tracing/deployment_tracking/
[3]: /ja/tracing/visualization/services_map/
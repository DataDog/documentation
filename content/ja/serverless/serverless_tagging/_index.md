---
title: サーバーレスタグ付け
kind: ドキュメント
---

{{< img src="serverless/serverless_tagging.mp4" video="true" alt="統合サーバーレスタグ付け" >}}

## 概要

AWS Lambda 関数に適用されたタグは、自動的に新しいディメンションになり、このディメンションでトレースを分類できます。

タグは Datadog プラットフォーム間の一貫性を確保するのに特に役立ちます。`env` および `service` タグではファーストクラスサポートが提供されます。

これら 2 つのタグを使用すると、次のことができます。

- 一貫性のあるタグを使用して、メトリクス、トレース、ログ間をシームレスに移動する
- Datadog アプリ内で統一された方法で環境またはバージョンに基づいてサービスデータを表示する
- サーバーレスホームページの関数にフィルターを適用する

Datadog はサーバーレス環境でのタグ付けでトレース、メトリクス、ログ間のタグの一貫性を保つために、いくつかのベストプラクティスを推奨しています。

## サーバーレス関数を直接タグ付けする

メトリクス、トレース、ログをまたぐ Lambda 関数からタグを表示する場合、Datadog は Lambda 関数を適切な `env` および `service` に直接タグ付けすることを推奨しています。以下は、一般的なサーバーレス開発ツールで利用できるタグ付けのサンプルコンフィギュレーションです。

{{< tabs >}}
{{% tab "Serverless Framework" %}}

サーバーレスフレームワークをお使いの場合は、Datadog でタグを適用する際に以下のいずれかのオプションを選ぶことができます。

1. プロバイダーのスコープに直接追加したタグを Datadog に適用する:

  ```yaml
  provider:
    name: aws
    runtime: nodejs12.x
    tags:
    service: shopist-cart-confirmation
        env: prod
        version: 1.01
  ```

2. 個々の Lambda リソースに直接追加したタグを Datadog に適用する:

  ```yaml
  functions:
    confirmCart:
      handler: cart.confirm
      tags:
        service: shopist-cart-confirmation
        env: prod
        version: 1.01
      events:
        - http:
            path: ping
            method: get

  ```

3. Datadog のサーバーレスフレームワークプラグインをお使いの場合は、ネイティブのサーバーレスフレームワーク `service` および `stage` タグが Datadog で `service` および `env` として表示されます。

  ```yaml
  service: shopist-cart-confirmation

  provider:
    name: aws
    runtime: nodejs12.x
    stage: prod
  ```

{{% /tab %}}
{{% tab "AWS SAM" %}}

AWS SAM をお使いの場合は、Datadog でタグを適用する際に以下のいずれかのオプションを選ぶことができます。


1. 個々の Lambda リソースに直接追加したタグを Datadog に適用する:

  ```yaml
  Resources:
    confirmCart:
      Type: AWS::Serverless::Function
      Properties:
        Handler: src/handlers/cart.confirm
        Tags:
          env: prod
          service: shopist-cart-confirmation
  ```

2. (Datadog CloudFormation マクロをお使いの場合) `Transform` スコープに直接追加したタグを Datadog に適用する:

  ```yaml
  Transform:
    - AWS::Serverless-2016-10-31
    - Name: DatadogServerless
      Parameters: 
          nodeLayerVersion: 25
          forwarderArn: "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
          stackName: !Ref "AWS::StackName"
          service: "shopist-cart-confirmation"
          env: "prod"
  ```

{{% /tab %}}
{{< /tabs >}}


### サーバーレス関数からリソースタグをインポートする

Datadog では Datadog Forwarder の `DdFetchLambdaTags` オプションを有効にしておくことを推奨しています。Forwarder の CloudFormation スタックでパラメーター `DdFetchLambdaTags` を `true` に設定することで、トレースをその起点となる Lambda 関数上のリソースタグにタグ付けできます。

Lambda 関数リソースタグは、追加のコンフィギュレーションなしで自動的に Datadog の X-Ray トレースに表示されます。

## サービスマップを整理する

{{< img src="serverless/serverless_service_map.png" alt="サービスマップ" >}}

### env タグ

`env` を使用すると、ステージング、開発、および本番環境を分離できます。これは、サーバーレス関数だけでなく、あらゆる種類のインフラストラクチャーで機能します。たとえば、本番環境の EU Lambda 関数に `env:prod-eu` タグを付けることができます。

デフォルトでは、AWS Lambda 関数は Datadog で `env:none` でタグ付けされます。独自のタグを追加してこれをオーバーライドします。

### service タグ

関連する Lambda 関数をサービスにグループ化するために、 `service` タグを追加します。サービスマップとサービス一覧画面は、このタグを使用して、サービスとモニターのヘルスとの関係を示します。サービスは、サービスマップ上の個々のノードとして表されます。

Datadog を初めてご利用になるお客様には、デフォルトですべての Lambda 関数は `aws.lambda` サービス下にグループ化され、サービスマップでは単一ノードとして表示されます。これをオーバーライドするには、service で関数をタグ付けします。

**注:** Datadog をお使いでそれぞれの Lambda 関数を独自のサービスとして取り扱っているお客様は、独自のタグを追加してこれをオーバーライドするか、アカウントを新環境に適応させることをご希望の場合は Datadog のサポートチームまでお問い合わせください。

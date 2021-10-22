---
title: Datadog Lambda 拡張機能 AWS PrivateLink のセットアップ
kind: ガイド
further_reading:
  - link: /agent/guide/private-link/
    tag: ドキュメント
    text: AWS PrivateLink を介して Datadog に接続する
---
<div class="alert alert-info">
Datadog は <b>us-east-1</b>で AWS PrivateLink エンドポイントを公開しています。
</div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog PrivateLink は、政府関係のサイトに対する Datadog の使用をサポートしていません。</div>
{{< /site-region >}}

本ガイドでは、[AWS PrivateLink][2] を使用して VPC 内で [Datadog Lambda 拡張機能][1]をセットアップする方法についてご説明します。

## 概要

Datadog Lambda 拡張機能は、Lambda 関数を拡張してログ、トレース、メトリクスなどのデータを収集し、Datadog へ転送できるコンパニオンプロセスです。Virtual Private Cloud (VPC) ネットワークアクセスの内部で実行している関数は、サブネットルーティングルールまたはネットワーク ACL で制限され、Datadog の API へアクセスできない場合があります。この記事では、Datadog Lambda 拡張機能のセットアップに加えて、Datadog の AWS PrivateLink エンドポイントを VPC に追加する方法についてご紹介します。

## VPC を Datadog PrivateLink エンドポイントに接続

[PrivateLink ガイド][3]で説明されたとおりに、Datadog の Private Link エンドポイントを VPC に追加します。拡張機能には、メトリクス、ログ、API、トレースのエンドポイントが必要となります。`us-east-1` 以外の地域では、[リージョン間ピアリング][4]をセットアップします。

## 拡張機能のコンフィギュレーション

デフォルトで、拡張機能では Datadog Agent とは異なる API エンドポイントが使用されます。Lambda 関数に以下の環境変数を設定してエンドポイントを上書きします。

```
DD_LOGS_CONFIG_LOGS_DD_URL="agent-http-intake.logs.datadoghq.com:443"
```

または、Lambda ハンドラーコードと同じフォルダで [`datadog.yaml`][5] ファイルを追加して、拡張機能を構成することも可能です。

```
logs_config:
    logs_dd_url: agent-http-intake.logs.datadoghq.com:443
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/enhanced_lambda_metrics
[2]: https://aws.amazon.com/privatelink/
[3]: /ja/agent/guide/private-link/?tab=metrics#aws-vpc-endpoint
[4]: /ja/agent/guide/private-link/?tab=logs#inter-region-peering
[5]: /ja/agent/guide/agent-configuration-files
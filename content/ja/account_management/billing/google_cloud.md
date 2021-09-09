---
title: Google Cloud インテグレーションの請求
kind: documentation
---
## 概要

Datadog では、Agent を実行しているホスト、および Google Cloud インテグレーションによって使用されるすべての GCE インスタンスに対して課金が発生します。Google Cloud インテグレーションによって使用される GCE インスタンスで Agent を実行している場合、二重に課金されることはありません。

他の Google Cloud リソース (CloudSQL、Google App Engine、Pub/Sub など) は毎月の請求に含まれません。

## Google Cloud メトリクスの除外

メトリクスの収集を制御するには、[Google Cloud インテグレーションタイル][1]を使用します。**Configuration** タブに移動し、プロジェクトを選択するか、新しいプロジェクトを追加します。各プロジェクトは、**Optionally Limit Metrics Collection to hosts with tag** の設定に基づいて制御されます。次は、[ホストタグ][2]でメトリクスを制限する例です。

{{< img src="account_management/billing/google-cloud01.png" alt="Google Cloud" >}}

インテグレーションタイルで既存の Google Cloud プロジェクトに制限を追加した場合は、それまでに検出されたインスタンスが[インフラストラクチャーリスト][3]に最長 2 時間残る可能性があります。移行時間中、GCE インスタンスのステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されているホストは引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない GCE インスタンスにのみ適用されます。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][4]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][5]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[2]: /ja/getting_started/tagging/using_tags/#integrations
[3]: /ja/infrastructure/
[4]: /ja/help/
[5]: mailto:success@datadoghq.com
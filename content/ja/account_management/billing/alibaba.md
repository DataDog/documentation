---
title: Alibaba Integration Billing
---

## 概要

Datadog で監視されているすべての Alibaba 仮想マシンに対して課金が発生します。これらのマシンは、Datadog Agent がインストールされているかどうかにかかわらず、課金対象になります。Alibaba インテグレーションによって使用される Alibaba VM で Agent を実行している場合、**二重に課金されることはありません**。

他の Alibabaリソース (CDN、Express Connect Instances、Aspara DB など) は毎月の請求に含まれません。

## Alibaba VM の除外

[Datadog-Alibaba インテグレーションタイル][1]を使用して、[ホストタグ][2]で Datadog が監視する VM を絞り込むことができます。**Configuration** タブに移動し、既存のアカウントを編集するか、新しいものを追加します。各アカウントをフィルタリングする場合は、対象のアカウントをクリックして **Optionally limit metrics collection to hosts with tag** のフィールドに値を入力してください。

{{< img src="account_management/billing/alibaba_filter.png" alt="Alibaba VM フィルター" >}}

インテグレーションタイルで既存の Alibaba テナントに制限を追加した場合は、それまでに検出された VM が[インフラストラクチャーリスト][3]に最長 2 時間残る可能性があります。移行時間中、VM のステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されている VM は引き続き表示され、課金対象に含まれます。そのため、制限オプションは Agent が実行されていない VM でのみ有効となります。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][4]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][5]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba-cloud
[2]: /ja/getting_started/tagging/using_tags/#integrations
[3]: /ja/infrastructure/
[4]: /ja/help/
[5]: mailto:success@datadoghq.com
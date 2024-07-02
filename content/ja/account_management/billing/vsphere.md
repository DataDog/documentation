---
title: vSphere Integration Billing
---

## 概要

Datadog では、vCenter サーバーにインストールされている Agent および監視される VM のそれぞれに対して課金が発生します。

## vSphere VM の除外

`vsphere.yaml` ファイルを使用すると、Datadog によって監視される VM を、正規表現を使用して絞り込むことができます。[vsphere.d/conf.yaml サンプル][1]で例を参照してください。

既存の VM に制限を追加した場合は、それまでに検出された VM が[インフラストラクチャーリスト][2]に最長 24 時間残る可能性があります。移行時間中、VM のステータスは `???` と表示されます。これは、課金対象に含まれません。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][3]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][4]マネージャーにお問い合わせください。

[1]: https://github.com/DataDog/integrations-core/blob/master/vsphere/datadog_checks/vsphere/data/conf.yaml.example
[2]: /infrastructure/
[3]: /help/
[4]: mailto:success@datadoghq.com

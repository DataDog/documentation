---
integration_title: CloudCheckr
name: cloudcheckr
kind: インテグレーション
newhlevel: true
is_public: true
public_title: Datadog-CloudCheckr インテグレーション
short_description: 'Cloudcheckr が Datadog からインスタンスごとのメモリメトリクスを取得できるように支援'
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/cloudcheckr.md']
categories:
    - cloud
    - configuration & deployment
ddtype: crawler
integration_id: "cloudcheckr"
---

{{< img src="integrations/cloudcheckr/EC2_Right_Sizing_Report.png" alt="ec2 right sizing report">}}

## 概要

Datadog-CloudCheckr インテグレーションを使用し、現在と過去のリソース消費に基づいてデータ主導の決定を迅速に行い、アジャイルでコスト効率の高いインフラストラクチャーを維持します。

## セットアップ

Datadog アプリケーションを CloudCheckr アカウントにバインド手順は、以下のとおりです。

- CloudCheckr 拡張機能をクリックします。
- [Datadog API キーとアプリケーションキー][1]を追加します。

## その他の参考資料

[Datadog CloudCheckr を使用したクラウドリソースのサイズ適正化][2]の詳細については、Datadog のブログ記事を参照してください。

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://www.datadoghq.com/blog/rightsizing-cloudcheckr

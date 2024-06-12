---
categories:
- cloud
- configuration & deployment
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/cloudcheckr.md
description: CloudCheckr で Datadog のメトリクスを表示するために、インテグレーションを有効にします。
doc_link: https://docs.datadoghq.com/integrations/cloudcheckr/
further_reading:
- link: https://www.datadoghq.com/blog/rightsizing-cloudcheckr/
  tag: ブログ
  text: 'CloudCheckr + Datadog: クラウドリソースの最適化'
has_logo: true
integration_id: cloudcheckr
integration_title: CloudCheckr
is_public: true
name: cloudcheckr
public_title: Datadog-CloudCheckr インテグレーション
short_description: CloudCheckr に Datadog メトリクスを追加して、AWS の利用状況を監視し、最適化します。
---

## 概要

[CloudCheckr][1] は、コストとパフォーマンスに関するカスタマイズされた提案を提供することで、AWS インフラストラクチャーを監視し、最適化することを可能にする Web ベースのプラットフォームです。

{{< img src="integrations/cloudcheckr/EC2_Right_Sizing_Report.png" alt="ec2 right sizing report">}}

Datadog と CloudCheckr のインテグレーションにより、現在および過去のリソース消費に基づいてデータ駆動型の意思決定を行い、俊敏でコスト効率の高いインフラストラクチャーを維持することができます。

## 計画と使用

Datadog アカウントを CloudCheckr アカウントに接続するには

- CloudCheckr 拡張機能をクリックします。
- [Datadog API キーとアプリケーションキー][2]を追加します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://spot.io/product/cloudcheckr/
[2]: https://app.datadoghq.com/organization-settings/api-keys
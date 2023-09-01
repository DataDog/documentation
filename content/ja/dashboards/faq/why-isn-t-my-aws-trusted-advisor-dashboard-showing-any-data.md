---
aliases:
- /ja/graphing/faq/why-isn-t-my-aws-trusted-advisor-dashboard-showing-any-data
kind: faq
title: AWS Trusted Advisor ダッシュボードにデータが表示されないのはなぜですか？
---

{{< img src="dashboards/faq/aws_service_dashboard.png" alt="AWS サービスダッシュボード" >}}

AWS Trusted Advisor インテグレーションダッシュボードにデータを表示させるには、以下が必要になります。

* サポートへのアクセス権の構成
* 上位の AWS サポートプラン

## サポートへのアクセス権

IAM コンソールで、ポリシードキュメントのテキストボックスに `support:describe*` と `support: refresh*` をアクションとして追加してください。

## AWS サポートプラン

Datadog Trusted Advisor ダッシュボードは、すべての [AWS Trusted Advisor チェック][1]にアクセスする必要があります。AWS では、上位の AWS サポートプランでのみこれらのチェックが利用できるようになっています。ご利用の AWS プランに完全なアクセス権が含まれていることを確認してください。

{{< img src="dashboards/faq/aws_support_plan.png" alt="AWS サポートプラン" >}}

[1]: https://aws.amazon.com/premiumsupport/trustedadvisor
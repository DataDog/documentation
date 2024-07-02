---
title: Flex Logs
kind: documentation
description: Cost effective live query capabilities over long term retention of Logs
aliases:
  - /logs/log_configuration/flex_log/
further_reading:
- link: "https://www.datadoghq.com/blog/flex-logging"
  tag: Blog
  text: Store and analyze high-volume logs efficiently with Flex Logs
- link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
  tag: ブログ
  text: ネットワークとセキュリティ分析のための DNS ログの監視
- link: /logs/log_configuration/indexes
  tag: Documentation
  text: ログインデックス
- link: /logs/log_configuration/archives
  tag: ドキュメント
  text: ログアーカイブ
---

{{< callout url="https://docs.google.com/forms/d/15FJG6RTFMmp7c7aRE8bcTy6B1Tt8ia4OmiesQa_zkZ4/viewform?edit_requested=true" btn_hidden="false" header="Request Access!">}}
Flex Logs は限定公開中ですが、アクセスリクエストは可能です！このフォームからリクエストを送信してください。
{{< /callout >}}

## 概要

Flex Logs は、ログの保管とログのクエリコンピュートを切り離します。これにより、すべてのログを保管し、どのユースケースに対応するかをより柔軟に選択することができます。大量のログを長期間保存し、Datadog ですべてのログを保管し、あらゆるユースケースと予算に対応することができます。

セキュリティ、コンプライアンス、エンジニアリングの各チームは、多くの場合、大規模な時間軸でログをクエリする必要があります。セキュリティ侵害は、数か月ではないにしても数週間後に発見されることが多く、法令遵守の確認や監査プロセスでは、1 年以上前のログを必要とする場合もあります。長期的な分析要件は、セキュリティチームに限定されるものではありません。ユーザー、ホスト、IP アドレスなど、何百万ものエンティティについて、高いカーディナリティ、前年比、長期的な分析を行うエンジニアリングチームには、ストレートメトリクスよりもログが適しています。

この概要では、Flex Tier ストレージの主な機能、ログデータの Standard ストレージと Flex ストレージのオプションの違い、Flex Tier ストレージのユースケースを紹介します。

## ストレージティアの構成

Flex Logs は、ログインデックス構成内で設定されます。そのインデックスに適用される[インデックスフィルター][1]は Flex ログにも適用されます。

[Logs Index Configuration][2] ページで Flex Tier を構成します。

1. Go to [**Logs > Pipelines > Indexes**][2].
2. Flex Logs で有効にしたいインデックスを編集するか、新しいインデックスを作成します。
3. **Flex Tier** を選択し、*Configure Storage Tier and Retention* で保持を設定します。

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="インデックス構成内の Flex Tier ストレージのオプション" style="width:100%;" >}}

**注**:
- 両方が選択されている場合、ログは Flex Tier に保管される前に、構成された保持期間が終了するまで Standard Tier に保管されます。例えば、保持期間が 3 日の Standard Tier と、保持期間が 90 日の Flex Tier を選択したとします。このインデックスのログは、まず Standard Tier に 3 日間保管され、次に Flex Tier に残りの 87 日間、合計 90 日間保管されます。
- Flex インデックスへの Standard Tier の追加は、Flex インデックス内の既存のログではなく、新しいログに適用されます。

## Flex インデックスの検索

{{< img src="logs/log_configuration/flex_logging/flex_toggle_search.png" alt="ログエクスプローラーページでオプションを切り替えて Flex ログを有効にする" style="width:100%;" >}}

ログエクスプローラーで **Include Flex Indexes** オプションを切り替えて、検索クエリ結果に Flex インデックスログを含めます。このオプションはタイムピッカーの隣にあります。

[検索][3]は、検索バーにクエリを入力するか、ファセットパネルで該当するファセットを選択することで行います。

## Flex ストレージのユースケース

Flex Tier ストレージは、秒以下の応答時間よりも、長期にわたるセキュリティ/監査調査、データの完全性、コンプライアンス要件が重視されるログの保管に便利です。Flex ストレージのユースケースの例としては、以下が挙げられます。
- 長期監査のためのログの保持。
- コンプライアンスと法的な理由のためのログの保持。
- セキュリティ調査のためにすべてのログが必要な場合。
- 長期間にわたるカーディナリティの高いデータのレポートや分析のためにログをクエリする必要がある場合。

## Potential sources for sending directly to the Flex Logs indexing tier

The following list is an example of log sources that are potentially good candidates for sending logs directly to the Flex Tier, therefore not going to Standard Indexing first. This is not an exhaustive list and is meant to give you an idea about the types of logs that are suitable for this configuration. Other log sources (for example, application logs) can still be sent to the Flex Tier after going to Standard indexing first for live troubleshooting, alerting, and debugging use cases. Your use cases for these sources could vary, and that is important to consider when making the decision to skip Standard Indexing.

**Note**: These examples are just a sample for each category. There are many more services, tools, and technologies available for each category that you might want to send to the Flex Tier.

- **CDN services examples**
  - Akamai, Cloudflare, Fastly, and CloudFront.
- **DNS services examples**
  - Route53, Cloudflare, Akamai (Edge),and NS1.
- **Firewall logs and Firewall appliances examples**
  - AWS Web Application Firewall (WAF), Barracuda WAF, pfSense, Checkpoint, Sophos, and FortiNet.
- **Cloud network services (VPC, Gateways, NAT, and WAN) examples**
  - AWS VPC, Direct Connect, PrivateLink, AWS NAT Gateway, Azure Basition, and Virtual WAN.
- **Loadbalancers examples**
  - AWS ELB, ALB, NLB (GCP and Azure flavors), F5, and NGINX.
- **Artifact repository management examples**
  - [JFrog Artifactory][4], Archiva, Sonatype Nexus
- **Identity services and tools examples**
  - Cisco ISE, Okta, OneLogin, and Workday User Activity Logs.
- **Audit logs examples**
  - Cloud Provider Audit Logs (for example, CloudTrail), Kubernetes audit, and Microsoft 365 audit.
- **Physical network appliances examples**
  - Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, and Barracuda.
- **Network Flow logs examples**
  - Cisco NetFlow, IPFIX, sFlow, and AWS VPC FlowLogs.
- **VPN services examples**
  - AWS, GCP, and Azure VPN, Tailscale, Twingate, OpenVPN, ZeroTier, and WireGuard.
- **CI/CD services and tools examples**
  - GitLab, GitHub Actions, ArgoCD, Jenkins, CircleCI, TeamCity, and AWS CodePipeline.
- **Service mesh examples**
  - Anthos, Istio, proxyv2, consul, Linkerd, and Kong.
- **Caching examples**
  - Varnish, Memcached, and Redis.

You can use the spectrum of log types shown in the image below to determine when to use the Flex Logs tier. Any high volume, infrequent access, long term retention log sources are good candidates, and this includes extending Standard Tier logs (for example, application logs) into the Flex Tier as well.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Logs indexing and access frequency spectrum graph" style="width:100%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging

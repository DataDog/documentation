---
cascade:
  private: true
description: Observability Pipelines Packs について詳しく学ぶ
disable_toc: false
private: true
title: パック
---

## 概要

特定のソースから Observability Pipelines にログを送信するためのパイプラインをセットアップする際、次のような疑問が生じることがあります:

- このソースのログのうち、重要なものはどれか？
- このソースのログのうち、破棄すべきものはどれか？
- どのログを保持すべきか？
- ログはサンプリングすべきか？
- クォータを追加すべきか？

多くの場合、これらの問いに答えるには、異なるチームと相談する必要があります。

Observability Pipelines Packs を使用すると、大規模な手動設定なしで Observability Pipelines のセットアップと最適化を行えます。パックにはソース固有の事前定義済みの構成が含まれており、次の事項を特定します:

- 安全に削除できるログ フィールド
- 重複ログなど、破棄してよいログ
- 解析が必要なログ
- 送信先に合わせて整形すべきログ

## パック

利用可能なパックは次のとおりです:

- [Akamai CDN][4]
- [Amazon VPC Flow Logs][5]
- [AWS CloudFront][6]
- [AWS CloudTrail][7]
- [Cisco ASA][8]
- [Cloudflare][9]
- [F5][10]
- [Fastly][11]
- [Fortinet Firewall][12]
- [HAProxy Ingress][13]
- [Istio Proxy][14]
- [Netskope][15]
- [NGINX][16]
- [Okta][17]
- [Palo Alto Firewall][18]
- [Windows XML][19]
- [ZScaler ZIA DNS][20]
- [Zscaler ZIA Firewall][21]
- [Zscaler ZIA Tunnel][22]
- [Zscaler ZIA Web Logs][23]

## セットアップ

Packs をセットアップするには:

1. [Pipelines][1] ページに移動します。
1. **Packs** をクリックします。
1. セットアップするパックをクリックします。
1. パックから新しいパイプラインを作成するか、既存のパイプラインにパックを追加できます。
    - **Add to New Pipeline** をクリックした場合、新しく作成されたパイプラインで:
        - 追加されたプロセッサ グループをクリックし、パックが追加した個々のプロセッサを確認して必要に応じて編集します。詳細は [プロセッサ][2] を参照してください。
        - パイプラインの残りのセットアップについては、[パイプラインのセットアップ][3] を参照してください。
    - **Add to Existing Pipeline** をクリックした場合:
        1. パックを追加するパイプラインを選択します。
        1. **Add to Existing Pipeline** をクリックします。
            1. パックは、パイプライン内の最後のプロセッサ グループに追加されます。
            1. そのグループをクリックして個々のプロセッサを確認し、必要に応じて編集します。詳細は [プロセッサ][2] を参照してください。

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/processors/
[3]: /ja/observability_pipelines/set_up_pipelines/
[4]: /ja/observability_pipelines/packs/akamai_cdn/
[5]: /ja/observability_pipelines/packs/amazon_vpc_flow_logs/
[6]: /ja/observability_pipelines/packs/amazon_cloudfront/
[7]: /ja/observability_pipelines/packs/aws_cloudtrail/
[8]: /ja/observability_pipelines/packs/cisco_asa/
[9]: /ja/observability_pipelines/packs/cloudflare/
[10]: /ja/observability_pipelines/packs/f5/
[11]: /ja/observability_pipelines/packs/fastly/
[12]: /ja/observability_pipelines/packs/fortinet_firewall/
[13]: /ja/observability_pipelines/packs/haproxy_ingress/
[14]: /ja/observability_pipelines/packs/istio_proxy/
[15]: /ja/observability_pipelines/packs/netskope/
[16]: /ja/observability_pipelines/packs/nginx/
[17]: /ja/observability_pipelines/packs/okta/
[18]: /ja/observability_pipelines/packs/palo_alto_firewall/
[19]: /ja/observability_pipelines/packs/windows_xml/
[20]: /ja/observability_pipelines/packs/zscaler_zia_dns/
[21]: /ja/observability_pipelines/packs/zscaler_zia_firewall/
[22]: /ja/observability_pipelines/packs/zscaler_zia_tunnel/
[23]: /ja/observability_pipelines/packs/zscaler_zia_web_logs/
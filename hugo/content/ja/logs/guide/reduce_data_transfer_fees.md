---
algolia:
  tags:
  - data transfer
  - data egress
  - private link
  - PrivateLink
  - Private Service Connect
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Architecture Center
  text: クロスリージョン AWS PrivateLink を使用して Datadog にテレメトリを送信する
- link: https://aws.amazon.com/solutions/case-studies/textnow-privatelink-case-study/
  tag: AWS ケーススタディ
  text: TextNow は AWS PrivateLink の利用によりデータ転送料金を 93% 削減
- link: /logs/log_configuration/flex_logs/#potential-sources-for-sending-directly-to-flex-logs
  tag: ドキュメント
  text: Flex Logs に直接送信できるソース
title: データ転送料金を削減しながら Datadog にログを送信する方法
---
## 概要 {#overview}

組織の成長に伴い、クラウドプロバイダー間から Datadog に転送するデータ量も増加する可能性があります。クラウドプロバイダーは、パブリック IP アドレス経由でクラウドストレージからデータを移動する際に、*データ転送*料金または*データエグレス*料金を請求します。これは、組織のクラウドコストの請求額の中で最も大きな項目の 1 つになり得ます。

パブリックインターネットをを経由せずにプライベートネットワーク経由でデータを送信することで、データ転送料金を削減できます。プライベートリンクによってコストを削減できる例として、米国東部の AWS リージョンでは 1GB の転送に $0.09 かかりますが、AWS PrivateLink を使用すると、データ転送コストは 1GB あたり $0.01 に下がります。

## サポートされているクラウドプロバイダー {#supported-cloud-providers}

<div class="alert alert-danger">選択した Datadog サイト {{< region-param key="dd_site_name" code="true" >}} が正しいことを確認してください。クラウド固有のプライベートリンクは、すべての Datadog サイトで利用できるわけではありません。</div>

{{< whatsnext desc="Datadog への接続方法:" >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us" >}}US1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap1" >}}AP1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap2" >}}AP2 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=uk1" >}}UK1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}US3 - Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}US5 - Google Cloud Private Service Connect{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/?site=eu" >}}EU1 - Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## その他のツール {#additional-tools}

プライベートリンクに切り替えた後は、下記を使用して利用状況を監視し、データコストをより詳細に管理できます。
- Datadog の [Cloud Network Monitoring][1] は、組織内で最もスループットの高いアプリケーションを特定します。
- [Cloud Cost Management][2] ツールを使用すると、クラウドコストの削減を確認し、監視できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/cloud_network_monitoring/
[2]: /ja/cloud_cost_management/
[3]: /ja/agent/guide/private-link/
[4]: /ja/agent/guide/azure-private-link/
[5]: /ja/agent/guide/gcp-private-service-connect/
---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-pci-compliance-log-management-apm/
  tag: ブログ
  text: Datadog から PCI に準拠したログ管理と APM を発表
kind: ドキュメント
title: PCI DSS 準拠
---

{{% site-region region="us3,us5,eu,ap1,gov" %}}
<div class="alert alert-warning">
APM およびログ管理における PCI DSS 準拠は、<a href="/getting_started/site/">US1 サイト</a>の Datadog 組織でのみ利用可能です。
</div>
{{% /site-region %}}

{{% site-region region="us" %}}
<div class="alert alert-warning">
APM およびログ管理における PCI DSS 準拠は、<a href="/getting_started/site/">US1 サイト</a>の Datadog 組織でのみ利用可能です。
</div>

## 概要

Payment Card Industry (PCI) データセキュリティ基準 (DSS) には、すべての加盟店、サービスプロバイダー、および金融機関を対象とした厳格な監視およびデータセキュリティの要件が定められています。これらの要件を満たすために、組織は PCI で規制されるデータと規制されないデータを別のアプリケーションに分離して監視する必要がありました。

Datadog は、PCI に準拠したログ管理およびアプリケーションパフォーマンス監視 (APM) の機能を [US1 サイト][1]内で提供しており、PCI の規制対象かどうかにかかわらず、すべてのログを 1 か所に集めることができます。開始方法については、[PCI 準拠の Datadog 組織をセットアップする](#set-up-a-pci-compliant-Datadog-organization)を参照してください。

## PCI 準拠の Datadog 組織をセットアップする

{{< tabs >}}

{{% tab "ログ管理" %}}

<div class="alert alert-danger">
PCI DSS 準拠のためには、<a href="https://docs.datadoghq.com/account_management/audit_trail/#setup">監査証跡</a>を有効にし、その状態を維持する必要があります。
</div>

PCI 準拠の Datadog 組織をセットアップするには、以下の手順に従います。

{{% pci-logs %}}

{{% /tab %}}

{{% tab "APM" %}}

<div class="alert alert-danger">
PCI DSS 準拠のためには、<a href="https://docs.datadoghq.com/account_management/audit_trail/#setup">監査証跡</a>を有効にし、その状態を維持する必要があります。
</div>

PCI 準拠の Datadog 組織をセットアップするには、以下の手順に従います。

{{% pci-apm %}}

{{% /tab %}}

{{< /tabs >}}

[1]: /ja/getting_started/site/

{{% /site-region %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
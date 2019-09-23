---
title: カスタムメトリクスの課金
kind: faq
aliases:
  - /ja/integrations/faq/what-standard-integrations-emit-custom-metrics/
---
## 概要

一般に、[カスタムメトリクス][1]とは、標準のインテグレーションセットに含まれないメトリクスのことです。たとえば、アプリケーションスタックで使用するカスタムチェックや API レベルのメトリクスです。

* 課金対象数は、各月の`カスタムメトリクス数/時間`の平均値です。
* プロプランには、1 ホストあたり 100 個のカスタムメトリクスが含まれます。
* エンタープライズプランには、1 ホストあたり 200 個のカスタムメトリクスが含まれます。
* メトリクス数は、すべての有料ホストで平均化されます。
* カスタムメトリクスパッケージを追加購入することもできます。

お客様のアカウントのカスタムメトリクス数については、[営業担当者][2]または[カスタマーサクセス][3]マネージャーまでお問い合わせください。

### 標準インテグレーション
以下の標準インテグレーションでは、カスタムメトリクスを生成することができます。

デフォルトでカスタムメトリクスが 350 個に制限されているインテグレーション

* [ActiveMQ XML][4]
* [Go-Expvar][5]

デフォルトで制限がないインテグレーション 

* [Agent Metrics][6]
* [Directory][7]
* [Linux Proc Extras][8]
* [Nagios][9]
* [Prometheus][10]
* [SNMP][11]
* [Windows Services][12]
* [WMI][13]

## トラブルシューティング
技術的な質問については、[Datadog のサポートチーム][14]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][3]マネージャーにお問い合わせください。

[1]: /ja/developers/metrics/custom_metrics
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /ja/integrations/activemq/#activemq-xml-integration
[5]: /ja/integrations/go_expvar
[6]: /ja/integrations/agent_metrics
[7]: /ja/integrations/directory
[8]: /ja/integrations/linux_proc_extras
[9]: /ja/integrations/nagios
[10]: /ja/integrations/prometheus
[11]: /ja/integrations/snmp
[12]: /ja/integrations/windows_service
[13]: /ja/integrations/wmi_check
[14]: /ja/help
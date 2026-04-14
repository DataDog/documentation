---
disable_toc: false
title: Syslog ソース
---

Observability Pipelines の rsyslog または syslog-ng を使用すると、rsyslog または syslog-ng に送信されたログを受信できます。 [パイプラインを設定][1] する際に、このソースを選択して設定してください。

また、 [サード パーティのログを syslog に転送](#forward-third-party-logs-to-syslog) し、その後 Observability Pipelines Worker に送信することもできます。

## 前提条件

{{% observability_pipelines/prerequisites/syslog %}}

## パイプライン UI でソースを設定

[パイプラインを設定][1] するときに、このソースを選択して設定します。以下の情報は、パイプライン UI のソース設定に関するものです。

{{% observability_pipelines/source_settings/syslog %}}

## syslog 経由で Observability Pipelines Worker にログを送信

{{% observability_pipelines/log_source_configuration/syslog %}}

## サード パーティのログを Observability Pipelines Worker に転送

Syslog は、ネットワーク ログを中央サーバーに送信するために広く使用されているロギング プロトコルです。多くのネットワーク デバイスが syslog 出力に対応しているため、サード パーティのログを処理とルーティングのために Observability Pipelines の syslog ソースへ転送できます。これらのサード パーティ サービスの例は次のとおりです:

### Fortinet
- [ログ転送を構成する][2]
- [syslog 設定を構成する][3]

### Palo Alto Networks
- [ログ転送を構成する][4]
- [トラフィック ログを syslog サーバーに転送する][5]

[1]: /ja/observability_pipelines/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
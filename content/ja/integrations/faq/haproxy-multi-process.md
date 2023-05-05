---
kind: faq
title: マルチプロセスモードでの HAProxy
---

HAProxy をマルチプロセスモードで使用する場合、各プロセスは独自のメモリ領域を持つため、独自の統計情報を持つことになります。

{{< img src="integrations/faq/haproxy_config_multi_process.png" alt="HAProxy 構成マルチプロセス" style="width:30%;">}}

これは、各プロセスがその統計情報にアクセスするための専用のソケットまたはエンドポイントを持つ必要があることを意味します。
そのため、HAProxy の Datadog コンフィギュレーションファイルでは、**各ソケットまたはエンドポイントをインスタンスとして宣言する必要があります**。

{{< img src="integrations/faq/haproxy_multi_process_agent_conf.png" alt="HAProxy マルチプロセス構成" style="width:50%;">}}

それ以外の場合は、同じ `/haproxy_stats` エンドポイントを共有し、そこから HAProxy の統計情報を取得すると、現在のリクエストに割り当てられたプロセスの統計情報のみが表示されます。

{{< img src="integrations/faq/haproxy_stats_1.png" alt="HAProxy 統計 1" style="width:85%;" >}}

ブラウザでページを更新すると、以前とは異なるプロセスからの統計情報が表示されます。

{{< img src="integrations/faq/haproxy_stats_2.png" alt=" HAProxy 統計 2" style="width:85%;" >}}

HAproxy のインテグレーションがうまく構成されていない場合、以下のことに気づくかもしれません。

* レートとして報告される HAProxy メトリクスの欠落点は、ここで確認でき、20 秒ごとに値を取得する必要があります。
* 5xx コードのエラー応答など、通常の状態では低い値を示すメトリクスで、高い値や高い変動を示す。

[1]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/haproxy.py
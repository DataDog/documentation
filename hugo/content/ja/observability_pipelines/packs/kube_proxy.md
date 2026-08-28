---
description: Kube Proxy パックの詳細をご確認ください。
title: Kube Proxy
---
## 概要 {#overview}

{{< img src="observability_pipelines/packs/kube_proxy.png" alt="Kube Proxy パック" style="width:25%;" >}}

このパックは kube-proxy のエラーと警告のみを保持し、各サイクルで発生する日常的な iptable 同期ノイズをドロップします。

このパックの機能:

- 同期エラーを保持
- 日常的な同期ノイズをドロップ
- ログレベルを抽出
---
description: Exabeam - Palo Alto パックの詳細をご確認ください。
title: Exabeam - Palo Alto
---
## 概要 {#overview}

{{< img src="observability_pipelines/packs/exabeam_palo_alto.png" alt="Exabeam - Palo Alto パック" style="width:25%;" >}}

このパックは、Exabeam に送信された PAN-OS syslog を処理し、空のトラフィックログや重複する開始トラフィックログを除外します。その際、未処理の CSV は変更されません。

このパックの機能:

- PAN-OS ソースにタグを設定
- 空のトラフィックログをドロップ
- 未処理の CSV をそのまま保持
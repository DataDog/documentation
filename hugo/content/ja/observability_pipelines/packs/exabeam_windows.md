---
description: Exabeam - Windows パックについて詳しく説明します。
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/
  tag: ブログ
  text: Observability Pipelines を使用して重要な Security ログを処理し Exabeam にルーティングする
title: Exabeam - Windows
---
## 概要{#overview}

{{< img src="observability_pipelines/packs/exabeam_windows.png" alt="Exabeam - Windows パック" style="width:25%;" >}}

このパックは、Exabeam に送信される Windows イベントログを処理し、フィルタリングして Exabeam パーサーが使用するコードにしつつ、生の XML はパースできるようにそのまま保持します。

このパックの機能:

- 生の XML をそのまま保持する
- Sysmon および PowerShell ログを保持する
- 未使用の Security コードを破棄する

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
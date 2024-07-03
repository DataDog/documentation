---
description: Guide about Shadow DOM compatibility with Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: Learn about Session Replay
title: Enrich Your Session Replays With Shadow DOM Components
---

<div class="alert alert-warning">
Datadog では open モードの Shadow DOM のみがサポートされています。
</div>

## 概要

Shadow DOM は、隔離された再利用可能なコンポーネントをコードに組み込むことで、開発者がよりモダンな Web サイトを構築できるようにする仕組みです。コードの構造をすっきりさせ、スタイルの競合を避けるために使用されることが多く、モダンな Web 開発手法ではよく見られるようになってきました。

## セットアップ

Datadog では、[RUM ブラウザ SDK][1] の`v4.31.0` から、追加の構成なしで open モードの Shadow DOM をサポートするようになりました。シャドウルート内にあるコンポーネントは、自動的にセッションリプレイによりキャプチャされます。この機能は、以下に関してはサポートされていません。
* Closed モードの Shadow DOM
* 動的な Shadow DOM
* 動的な CSS スタイルの変更

**注**: open モードの Shadow DOM の互換性については、一般的なフレームワーク上で検証済みです。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/browser/
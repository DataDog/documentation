---
description: Shadow DOM とセッションリプレイの互換性に関するガイド。
further_reading:
- link: /session_replay/
  tag: ドキュメント
  text: セッションリプレイについて
title: Shadow DOM コンポーネントでセッションリプレイ機能を強化する
---
<div class="alert alert-danger">
Datadog は open Shadow DOM のみをサポートしています。
</div>

## 概要 {#overview}

Shadow DOM は、分離された再利用可能なコンポーネントをコードに組み込めるようにすることで、開発者がよりモダンな Web サイトを構築するのに役立ちます。クリーンなコード構造を維持し、スタイルの競合を回避するために頻繁に使用される Shadow DOM は、現代の Web 開発手法においてますます重要になっています。

## セットアップ {#setup}

[RUM Browser SDK][1] の `v4.31.0` 以降、Datadog は追加の構成なしで open Shadow DOM をサポートしています。シャドウルート内にあるコンポーネントは、Session Replay によって自動的にキャプチャされます。この機能は、以下ではサポートされていません。
* クローズドな Shadow DOM
* 動的な Shadow DOM
* 動的な CSS スタイルの変更

**注**: open Shadow DOM の互換性については、一般的なフレームワーク上で検証済みです。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/application_monitoring/browser/
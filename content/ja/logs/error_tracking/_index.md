---
description: ログ管理のエラー追跡について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: /logs/error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
is_beta: true
kind: documentation
title: ログのエラー追跡
---

{{< beta-callout btn_hidden="true" >}}
  ログのエラー追跡はベータ版です。
{{< /beta-callout >}} 

## 概要

Datadog によって収集されたエラーを一貫して監視することは、システムの健全性のために非常に重要です。個々のエラーイベントが多数存在する場合、トラブルシューティングのためにエラーの優先順位をつけることが困難になります。

**Browser and Mobile** または **Backend** のエラー追跡のためにログをセットアップすると、問題リストにカードが入力されます。また、ログにあるすべてのカスタムおよびデフォルトのファセットでフィルターをかけることができます。

{{< img src="logs/error_tracking/homepage.png" alt="Java の問題を表示するログのエラー追跡エクスプローラー" style="width:100%;" >}}

エラー追跡は、以下のことを可能にします。

- エラーの大量発生や新たな問題の発生など、エラー追跡イベントのモニターを設定します。
- 類似のエラーを課題にまとめることで、重要なエラーをより簡単に特定し、ノイズを減らすことができます。
- 経時的に問題を監視するため、開始のタイミングや継続した場合の頻度を把握できます。
- 必要なすべてのコンテキストを 1 か所で収集することで、トラブルシューティングが容易になります。

## セットアップ

ログのエラー追跡は、適切に構成されたエラーログをスタックトレースとともに処理します。ログのエラー追跡を有効にするには、[**Logs** > **Error Tracking**][1] に移動します。

{{< whatsnext desc="ログの Datadog エラー追跡を使い始めるには、お使いのフレームワークの対応ドキュメントをご覧ください。" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}ブラウザとモバイル{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}バックエンド{{< /nextlink >}}
{{< /whatsnext >}}

## 問題を調査し、トリアージを開始する

*問題*は、スタックトレースのような必要な属性を持つ特定のエラーログをグループ化するフィンガープリントアルゴリズムに基づく、任意の数のエラーのグループ化です。

{{< img src="logs/error_tracking/sidepanel.png" alt="ログエラーの詳細からなるサイドパネル" style="width:100%;" >}}

問題をクリックすると、季節性パターン、スタックトレース、`env` タグと `version` タグにまたがるエラーの分散型トレーシングを見ることができます。問題パネルには、影響を受けた最初と最後のバージョンがタイムスタンプ付きで表示されます。

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
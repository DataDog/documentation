---
aliases:
- /ja/monitors/monitor_types/watchdog
- /ja/monitors/create/types/watchdog/
description: アプリケーションとインフラストラクチャーの問題をアルゴリズムで検出する
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /watchdog/
  tag: ドキュメント
  text: Watchdog - アルゴリズムによるアプリケーションとインフラストラクチャーの問題の検出
title: Watchdog モニター
---

## 概要

[Watchdog][1] は、APM、インフラストラクチャー、ログのためのアルゴリズム機能です。メトリクスやログの傾向やパターンを継続的に観測し、非定型的な挙動を探すことで、潜在的な問題を自動的に検出するものです。

## モニターの作成

Datadog で [Watchdog モニター][2]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Watchdog*。

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-1.png" alt="Watchdog モニターの構成" style="width:80%;">}}

## クエリを定義する
次のオプション構成を使用して、アラート設定する範囲を選択します (ワイルドカードがサポートされています)。

**1. 定義済みセレクタ**
* Environment。これらの値は `env` タグから取得されます。
* Alert Category。モニターを Watchdog アラートのサブセットに範囲設定します。
* Team。これらの値は Software Catalog から取得されます。

**2. 追加の範囲選択**
* Watchdog イベントで利用可能な任意の追加タグでフィルタリングします。
* [通知をグループ化][3]したいディメンションで Group By (グループ化) します。
{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-2.png" alt="高度な設定を使用した Watchdog モニターの構成" style="width:90%;">}}

選択が完了すると、モニター作成ページ上部のグラフに、選択した期間内で条件に一致する Watchdog イベントが表示されます。

ログの異常は、`service`、`source`、`env` タグに基づいて検出されます。クエリにこれらのタグが含まれている場合は、それらに一致するログの異常のみが表示されます。`host` など他のタグがクエリに含まれている場合、Watchdog はそれらのタグも利用して、`service`、`source`、`env` の関連する組み合わせだけを表示します。

### 通知

**Configure notifications and automations** セクションの詳細な手順については、[通知][4]ページを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/watchdog/
[2]: https://app.datadoghq.com/monitors/create/watchdog
[3]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
[4]: /ja/monitors/notify/
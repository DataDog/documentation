---
aliases:
- /ja/monitors/incident_management/datadog_clipboard
description: インシデントの作成と管理
further_reading:
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: Datadog クリップボードでデータを楽に検索
title: Datadog クリップボード
---

## 概要

Datadog クリップボードは、さまざまなコンテキストを収集して共有するためのクロスプラットフォーム型ツールです。各ユーザーが個別に使用でき、コピーしたすべてのグラフを保存したリンクと一緒に保存できます。また、シグナルは分類して、ダッシュボード、ノートブック、インシデントにエクスポートできます。

{{< img src="service_management/incidents/clipboard-full.png" alt="クリップボード">}}

## クロスページ検索

クリップボードは Datadog のすべてのページに対応しており、各ユーザーがコピーしたすべてのグラフの記録がクリップボードに保持されます。ただし、クエリテキスト、イベント JSON、その他のテキストベースのコンテンツは自動的にクリップボードにコピーされません。

## クリップボードを開く

クリップボードを開くには、いずれかのグラフをコピーして、ポップアップ内で **Open Clipboard** をクリックします。

{{< img src="service_management/incidents/open-clipboard.png" alt="クリップボードでグラフを開く" style="width:80%;">}}

または、最小化されたクリップボード上で "`Cmd/Ctrl + Shift + K` to open" をクリックします。

クリップボードの開閉には、`Cmd/Ctrl + Shift + K` も使用できます。クリップボードを最小化するには、最小化アイコンをクリックします。最小化されたクリップボードは、Datadog の全ページにそのまま残ります。

## クリップの追加

グラフを追加するには、`Cmd/Ctrl + C` キーを押してコピーするか、エクスポートメニューで **Copy** をクリックします。クリップボードが開いた際に、コピーしたグラフが自動的に追加されます。

URL を追加するには、クリップボードを開き、**Add current page** をクリクします。

{{< img src="service_management/incidents/add-page.png" alt="クリップボードにダッシュボードを追加" style="width:80%;">}}

## クリップの管理

クリップボードの各アイテムは、開く、閉じる、削除することができます。シグナルの上にカーソルを置くと、これらの操作を実行できます。アイテムを開くと、元のシグナルのリンクへと移動します。アイテムのタイトルをクリックすると、グラフのソース (クリップ元のダッシュボードなど) が開きます。

{{< img src="service_management/incidents/managing-clips.png" alt="クリップを管理" style="width:80%;">}}

クリップボードには、最大 20 個の信号を保存できます。削除する場合は、1 つずつ削除するか、**Remove All** をクリックします。20 個を超える信号が追加された場合、一番古い信号 (一番左側に保存) が自動的に削除されます。

## エクスポート

クリップボードのアイテムは、キーボードショートカットまたはエクスポートメニューを使用して、ダッシュボード、ノートブック、またはインシデントにエクスポートできます。個々のシグナルをコピーするには、シグナルにカーソルを合わせ、`Cmd/Ctrl + C` を使用してコピーし、`Cmd/Ctrl + V` を使用してダッシュボードまたはノートブックに貼り付けます。複数のシグナルをコピーするには、`Shift + Click` を使用してグラフとリンクを選択し、`Cmd/Ctrl + C` を使用してそれらをコピーします。

または、エクスポートメニューを使用して、選択内容を新規または既存のダッシュボード、ノートブック、またはインシデントにエクスポートします。ノートブックにエクスポートできるのは[サポートされているグラフ][1]のみです。

{{< img src="service_management/incidents/exporting.png" alt="クリップボードからエクスポート" style="width:80%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/notebooks/#visualization
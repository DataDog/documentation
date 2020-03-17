---
title: Live Tail
kind: documentation
description: すべてのログをリアルタイムに表示します。
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: ログ分析の実行
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/processing/parsing
    tag: Documentation
    text: パースの詳細
---
{{< img src="logs/live_tail/live_tail_demo.mp4" alt="Live Tail" video="true"  >}}

## 概要

Live Tail には、ほぼリアルタイムでインフラストラクチャーのどの位置からもすべてのログイベントを確認できる機能があります。[Pipeline セクション][1]から抽出したログを、Datadog が[インデックス化][2]する前に表示します。

1. Datadog によって収集されたすべてのログが表示されます。([Logging without Limits][2]*)
2. 表示されるログは処理済みです。
3. ストリームは一時停止できます。
4. 時間をさかのぼることはできません。

たとえば、この機能を使用して、プロセスが正しく開始されたかどうか、または新しいデプロイが順調に進んだかどうかを確認できます。

## Live Tail ビュー

タイムレンジセレクターで `Live Tail` オプションを選択して、Live Tail ビューに切り替えます。

{{< img src="logs/live_tail/live_tail_time_selector.png" alt="Live Tail タイムセレクター"  >}}

1 秒間に受け取ったイベントの数とサンプリングレートが左上に表示されます。1 秒間に数千のログのストリームは読み取り不可能なので、スループットが大きなログストリームはサンプリングされます。

[Live Tail の検索バーフィルター機能](#filtering-the-log-stream)を使用して、ログストリームを絞り込みます。また、画面右上の **Pause/Play** ボタンを使用して、ストリームを一時停止または再開できます。

**注**: ログを選択すると、ストリームが一時停止し、そのログの詳細が表示されます。

### 表示オプション

Live Tail のビューをカスタマイズして、ログの関連情報をよりわかりやすく強調します。
ページ右上の歯車アイコンをクリックして、以下のオプションから 1 つを起動します。

{{< img src="logs/live_tail/live_tail_column.png" alt="Live Tail" style="width:30%;">}}

1. ログストリームにログ属性を表示する際の行数 (1 行、3 行、10 行) を選択します。
2. Date 列および Message 列を有効/無効にします。
3. このパネル上、または列を直接クリックして、ログ属性を列として追加します。

{{< img src="logs/live_tail/live_tail_add_as_column.png" alt="Live Tail 列として追加"  style="width:50%;">}}

## ログストリームの絞り込み

検索バーに有効なクエリを入力すると、検索条件に一致するログが表示されます。
Live Tail ビューの検索構文は他のログビューのものと同じですが、クエリはインデックス化されたログだけでなく、収集されたすべてのログと照合されます。

### JSON の属性

他のビューで動作するクエリは Live Tail ビューでも動作しますが、さらに、**ファセットとして定義されていない属性でログを絞り込む**こともできます。

たとえば、以下の `filename` 属性で絞り込むには、2 つの方法があります。

{{< img src="logs/live_tail/live_tail_save.png" alt="Live Tail 保存"  style="width:50%;">}}

1. 属性をクリックして検索に追加します。

    {{< img src="logs/live_tail/live_tail_click_attribute.png" alt="Live Tail 属性をクリック"  style="width:50%;">}}

2. クエリ `@filename:runner.go` を使用します。

    {{< img src="logs/live_tail/live_tail_filtered.png" alt="Live Tail 絞り込み"  style="width:50%;">}}

行番号が 150 を超えるすべてのログで絞り込むには、クエリ `@linenumber:>150` を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/processing/pipelines
[2]: /ja/logs
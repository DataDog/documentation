---
aliases:
- /ja/real_user_monitoring/session_replay/playlists
- /ja/product_analytics/session_replay/playlists
description: Session Replay を整理するためのプレイリストを作成して使用する方法を学びましょう。
further_reading:
- link: /session_replay
  tag: ドキュメント
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: ブログ
  text: Datadog のプレイリストを使用して関連する Session Replay を整理および分析
title: Session Replay プレイリスト
---
## 概要 {#overview}

プレイリストは、Session Replay をフォルダーのような構造でまとめられるコレクションです。プレイリストを使用して、以下のことができます。

- 特定の Session Replay で観察したパターンを整理し、対応するラベルを付ける
- プレイリストをざっと確認し、各グループが何を対象としているのかを一目で把握する
- 特定の Session Replay の検索時間を短縮する

## はじめに {#getting-started}

プレイリストは、[プレイリストのページ][1] から直接作成するか、個別の Session Replay から作成できます。

もし Session Replay を視聴した後で何か注目すべき動作を見つけた場合は、{{< ui >}}Save to Playlist{{< /ui >}} をクリックして新規プレイリストを作成するか、既存のプレイリストにその Session Replay を追加できます。

{{< ui >}}Playlist page{{< /ui >}}から直接作成する場合:

1. Datadog で、[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1] に移動します。
2. {{< ui >}}New Playlist{{< /ui >}} をクリックします。
3. プレイリストに名前と説明を付けます。その後、RUM 内の Session Replay を探索してプレイリストに追加できます。

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="新しいプレイリストの作成" style="width:60%;">}}

個別の Session Replay から作成する場合:

1. 保存したいリプレイを開きます。
2. 上部の {{< ui >}}Share{{< /ui >}} ボタンをクリックし、{{< ui >}}Save to Playlist{{< /ui >}} を選択します。

      {{< img src="real_user_monitoring/session_replay/playlists/share-playlist.png" alt="個別の録画から新しいプレイリストを作成" style="width:90%;">}}
3. 録画を既存のプレイリストに追加するか、新しいプレイリストを作成します。

## デフォルトのプレイリスト {#default-playlists}

3 つのデフォルトプレイリストを使用して、Session Replay を確認できます。

- {{< ui >}}My Watch History{{< /ui >}}: 以前に視聴したリプレイ。
- {{< ui >}}All mentions to me{{< /ui >}}: チームメイトがコメントであなたを @メンションしたリプレイ。自分の対応が必要な調査を確認できます。
- {{< ui >}}Commented replays{{< /ui >}}: 組織内で 1 件以上のコメントがあるすべてのリプレイ。自分またはチームがコメントしたセッションを確認できます。

3 つのプレイリストはすべて [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1] から利用できます。

## ユースケース{#use-cases}

チームでは、さまざまな方法でプレイリストを活用できます。いくつかの活用例を紹介します。

- あるセッションでエラーを見つけたら、同じエラーパターンが存在する他のセッションを探し、一緒にグルーピングできます。
- UI を更新した際に、新しいフローでユーザーが迷っている可能性のあるセッションのプレイリストを作成できます。
- 収益を生むボタンのレイジクリックなど、特定の動作があるセッションのグループをブックマークするには、RUM でクエリを作成し、関連するすべてのセッションをプレイリストに保存できます。 

## トラブルシューティング{#troubleshooting}

### プレイリストに Session Replay を保存するとエラーが発生する {#saving-a-session-replay-to-a-playlist-leads-to-an-error}

プレイリスト内のすべての Session Replay は、完了済みのセッションである必要があります。プレイリストに追加可能な Session Replay を検索するには、以下のクエリを RUM Explorer にコピーアンドペーストしてください。

```@session.is_active:false @session.type:user @session.has_replay:true```

このクエリは、ユーザーによる実際の操作であり、Synthetic ではなく、かつリプレイが添付された完了済みのセッションを検索します。

### プレイリストを作成するとエラーが発生する {#creating-a-playlist-leads-to-an-error}
プレイリストを作成するために必要なロールと権限があることを確認してください。プレイリストの書き込み権限があると、次の操作を実行できます。

- プレイリストの作成
- プレイリストの編集
- プレイリストの削除
- セッションをプレイリストに追加
- セッションをプレイリストから削除

さらに、Session Replay の読み取り権限があると、以下の操作が可能です。

- プレイリストの閲覧
- プレイリスト内のセッションの閲覧

### 既定の 30 日間の Session Replay 保持期間より長くプレイリストにリプレイを保持する {#keeping-replays-in-a-playlist-for-longer-than-the-default-30-day-session-replay-retention-period}

既定では、Session Replay の保持期間は 30 日間です。[Extended Retention][2] を利用すると、個々の Session Replay の保持期間を最大 15 か月まで延長できます。Session Replay をプレイリストに追加すると、`rum_extend_retention` [権限][3] がある場合、そのリプレイの保持期間が自動的に延長されます。この権限がない場合、リプレイをプレイリストに追加しても、保持期間は延長されません。個々の Session Replay の Extended Retention は、いつでも取り消すことができます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /ja/session_replay/#retention
[3]: /ja/account_management/guide/secure-configuration/#synthetic-monitoring-and-rum
---
aliases: null
description: Learn how to create and use Playlists for organizing Session Replays.
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: Blog
  text: Organize and analyze related session replays with Playlists in Datadog RUM
title: Session Replay Playlists
---

## 概要

Playlists are collections of Session Replays you can aggregate in a folder-like structure. You can use Playlists to:

- Organize observed patterns from specific Session Replays and label them accordingly
- Glance through playlists and understand what each grouping is about at a glance
- 特定のセッションリプレイの検索時間を短縮する

## はじめに

You can create a playlist directly from the [Playlist page][1] or from an individual Session Replay.

To create it directly from the **Playlist page**:

1. In Datadog, go to [**Digital Experience > Session Replay > Playlists**][1].
2. Click **New Playlist**.
3. Give your playlist a name and description. You can then start exploring Session Replays in RUM to add to the playlist.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="Create a new Playlist" style="width:60%;">}}

To create it from an individual Session Replay:

1. Open the replay you want to save.
2. Click the **Save to Playlist** button at the top.
3. Add the recording to an existing playlist, or create a new one like in the video below.

   {{< img src="real_user_monitoring/session_replay/playlists/playlist-individual-session-replay.mp4" alt="Build a new playlist from the individual recording" video="true" width="90%" >}}

If you spot any notable behaviors after viewing a Session Replay, you can click **Save to Playlist** to build a new playlist or add that particular Session Replay to an existing playlist.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-build-new-playlist.mp4" alt="Build a new playlist" video="true" width="90%" >}}

## ユースケース

Your team can use playlists in many different ways. Here are some ideas to get started:

- After you spot an error in one session, you can find other sessions where that error pattern exists and group them together
- As you update your UI, you can create playlists for sessions where users may have gotten lost in a new flow
- 収益を生むボタンのレイジクリックなど、特定の動作があるセッションのグループをブックマークするには、RUM でクエリを作成し、関連するすべてのセッションをプレイリストに保存できます

## トラブルシューティング

### Saving a Session Replay to a playlist leads to an error

All Session Replays in playlists must be completed sessions. To find Session Replays that are eligible to be added to playlists, copy and paste the below query into the RUM explorer:

```@session.is_active:false @session.type:user @session.has_replay:true```

This query ensures you are searching for completed sessions that have a replay attached, and are from real user interactions, not synthetic sessions.

### Creating a playlist leads to an error
Ensure you have the right roles and permissions to create a playlist. The playlist write permission allows you to do the following:

- Create a playlist
- Edit a playlist
- Delete a playlist
- Add a session to a playlist
- Remove a session from a playlist

In addition, the Session Replay read permission allows you to do the following:

- View a playlist
- See a session in a playlist

### Keeping replays in a playlist for longer than the default 30-day Session Replay retention period

By default, Session Replay retention is 30 days. With [extended retention][2], you have the ability to extend the retention of individual Session Replays for up to 15 months. Adding a Session Replay to a playlist automatically extends the retention of that replay. You may revoke extended retention on an individual Session Replay basis at any time.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /ja/real_user_monitoring/session_replay/#retention
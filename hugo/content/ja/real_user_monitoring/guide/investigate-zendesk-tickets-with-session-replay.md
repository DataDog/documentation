---
description: Session Replay を Zendesk と統合することで、サポートチームはチケットから直接リプレイを視聴し、ユーザーの問題をトラブルシューティングできるようになります。
title: Session Replay で Zendesk チケットを調査する
---
## 概要 {#overview}

Zendesk チケットでユーザーから報告された問題をトラブルシューティングする際、エンジニアは問題が発生したコンテキストを理解するのに苦労することがよくあります。Zendesk と Session Replay のインテグレーションにより、サポートチームは Zendesk チケットからワンクリックでユーザーのコンテキストを即座に再現できます。これにより、サポートチームはより効率的にトラブルシューティングを行えるようになり、顧客への解決策の提供にかかる時間を短縮できます。

このインテグレーションにより、サポートエンジニアは以下のことが可能です。
- ユーザーのアクションの [Session Replay][3] を視聴してください
- 関連するバックエンドコールを調査してください
- 関連する Session Replay を 1 つのプレイリストに整理してください


## セットアップ {#setup}

Zendesk インテグレーションをセットアップするには、[Datadog RUM の Zendesk Marketplace ページ][2]の **How to install** セクションを完了してください。

## Zendesk から Session Replay を表示してください {#explore-a-session-replay-from-zendesk}

Zendesk チケットに関連付けられた Session Replay を表示するには、以下の手順に従います。

1. Zendesk でチケットに移動してください。
2. 右サイドバーの Datadog アイコンをクリックして、Session Replay を一覧表示してください。
3. Session Replay をクリックして、Datadog で表示してください。

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Zendesk から Session Replay にアクセスする" video=true >}}

リプレイページでは、ユーザーのアクションを一覧表示し、各アクションに関連付けられたバックエンドコールも表示できます。イベントにカーソルを合わせてください、{{< ui >}}Details{{< /ui >}} をクリックして、関連するトレースやエラーなどを表示してください。

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt="詳細ボタンが強調表示された Session Replay イベントのホバービュー" style="width:60%;" >}}

また、Session Replay をプレイリストに追加して関連する問題をグループ化することで、閲覧や共有が容易になります。詳しくは、[Session Replay Playlists のドキュメント][4]をご覧ください。

[1]: /ja/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /ja/session_replay/
[4]: /ja/session_replay/playlists
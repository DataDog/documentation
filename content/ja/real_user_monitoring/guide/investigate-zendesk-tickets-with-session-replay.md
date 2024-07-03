---
title: Investigate Zendesk Tickets with Session Replay
---

## 概要

Zendesk チケットに報告されたユーザーの問題をトラブルシューティングする際、エンジニアはしばしば問題が発生した状況を把握するのに苦労します。Zendesk と Session Replay のインテグレーションにより、サポートチームはワンクリックで Zendesk チケットからユーザーの状況を即座に再現できるため、効率的にトラブルシューティングが可能となり、顧客への対応時間を短縮できます。

このインテグレーションにより、サポートエンジニアは以下のことが可能です。
- ユーザーのアクションの [Session Replay][3] を視聴する
- 関連するバックエンドコールを調査する
- 関連する Session Replay を 1 つのプレイリストに整理する


## セットアップ

Zendesk インテグレーションをセットアップするには、[Datadog RUM の Zendesk Marketplace ページ][2]の **How to install** セクションを完了してください。

## Zendesk から Session Replay を見る

Zendesk チケットに関連付けられた Session Replay を表示するには、以下の手順に従います。

1. Zendesk でチケットに移動します。
2. 右サイドバーの Datadog アイコンをクリックして、Session Replayのリストを表示します。
3. Session Replay をクリックして、Datadog で表示します。

{{< img src="real_user_monitoring/guide/zendesk/zendesk-sr-demo.mp4" alt="Zendesk から Session Replay にアクセスする" video=true >}}

リプレイページでは、ユーザーのアクションの一覧と、各アクションに関連するバックエンドコールを表示できます。イベントにカーソルを合わせて **Details** をクリックすると、関連するトレースやエラーなどが表示されます。

{{< img src="real_user_monitoring/guide/zendesk/session-replay-details-button.png" alt=“Details ボタンがハイライトされた Session Replay イベントのホバー表示" style="width:60%;" >}}

また、リプレイをプレイリストに追加して、関連する問題をグループ化し、閲覧や共有を容易にすることもできます。詳細については、[Session Replay プレイリストのドキュメント][4]を参照してください。

[1]: /ja/integrations/zendesk/#zendesk-rum-app-installation
[2]: https://www.zendesk.com/sg/marketplace/apps/support/993138/datadog-rum/?queryID=fb54e1e367559c15de7e8a0f1eb8aa6f
[3]: /ja/real_user_monitoring/session_replay/browser/
[4]: /ja/real_user_monitoring/session_replay/playlists
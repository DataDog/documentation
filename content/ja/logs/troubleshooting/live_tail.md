---
description: Logs Live Tail のエラーや問題を解決する
title: Live Tail のトラブルシューティング
---

Live Tail ページにエラーが表示されたり、ログが読み込まれない場合は、次のトラブルシューティング手順をお試しください:

* ブラウザのシークレットモードで Live Tail ビューを開き、ログを表示できるか確認する
* 別のブラウザを試し、Live Tail がログを読み込むか確認する
* 他のチームメンバーが Live Tail ビューでログを確認できるか確認する
* Live Tail がログを読み込むのをブロックしている可能性のあるネットワーク制限、VPN 設定、アンチウイルスソフトなどを確認する:
    - `live.logs.datadoghq.com` へのインバウンド通信がローカルまたは社内ネットワークで許可されていることを確認する
    - [IP ranges][1] エンドポイントで Datadog の IP プレフィックスを確認する

## トレースリクエスト

Traceroute は、ソースから宛先までのパケットの経路をテストするのに役立つツールです。`traceroute` を使用して、Live Tail の読み込みを妨げる可能性のあるクライアント側のネットワーク問題を特定できます。

Linux または macOS で Live Tail ログへの経路を確認するには、次のコマンドを実行します:
{{< code-block lang="shell">}}
traceroute live.logs.datadoghq.com
{{< /code-block >}}

もしリクエストが途中でタイムアウトした場合は、クライアントと Datadog サーバーの間のどこかでリクエストがブロックされていることを意味します。ネットワーク管理チームに確認して、この問題に対処してください。

ルートのあるステップで `* * *` が表示される場合、それはホストが traceroute に応答しなかったか、ルーターがそのプロトコルに応答しない可能性があります。`* * *` のパターンは必ずしもタイムアウトを意味するわけではありません。`-I` オプションを使用して検出プロトコルを ICMP/PING に変更すると、より詳細な結果が得られる場合があります。

## ブラウザと DNS のキャッシュをクリアする

### ブラウザキャッシュ

ブラウザのキャッシュをクリアすると、Live Tail の問題が解消される場合があります。たとえば、Google Chrome でキャッシュをクリアする方法については [Google アカウントのヘルプ][2]を参照してください。

### DNS キャッシュ

DNS キャッシュをクリアすると、Live Tail の問題が解消される場合があります。

Google Chrome で DNS キャッシュをクリアするには:
1. Google Chrome を起動する
1. アドレスバーに `chrome://net-internals/#dns` と入力して Enter キーを押す
1. **Clear host cache** をクリックする

## ブラウザのプラグインと拡張機能を確認する

広告ブロッカーを含むブラウザのプラグインや拡張機能が、Live Tail の動作を妨げる場合があります。
- ブラウザまたは OS に広告ブロッカーアプリがインストールされていないか確認し、見つかった場合はアンインストールまたは無効化してから、Live Tail でログが表示されるか確かめてください。
- 他のブラウザプラグインや拡張機能も、一時停止、停止、またはアンインストールして確認してください。

## アクセス権を確認する

[`logs_live_tail`][3] の権限を持つロールが割り当てられていることを確認してください。詳細は [Datadog のロールと権限][4]を参照してください。

また、管理者が Datadog 組織で[ログ制限クエリ (RBAC)][5] を設定していないか確認してください。Live Tail でクエリしているログへのアクセス権がない場合、ログは表示されません。自分がこれらのログにアクセスできるはずと考える場合は、必要な権限を付与してもらうよう Datadog アカウントの管理者に連絡してください。

{{< img src="logs/explorer/live_tail/logs_rbac_page.png" alt="Logs RBAC ページ" style="width:100%;" >}}

## サポートチケットを作成する

上記の手順で Live Tail の問題が解決しない場合は、[サポートチケット][6] を作成してください。可能であれば、以下の情報をチケットに含めてください:

### オペレーティングシステムとブラウザの詳細

- ブラウザ名とバージョン
- プラグインや拡張機能
- オペレーティングシステム名とバージョン

### HAR ファイル

Google Chrome で HAR ファイルを生成する方法は[ウェブセッションのトラフィックをキャプチャ][7]を参照してください。

作成した HAR ファイルをサポートチケットに添付してください。

### スクリーンショットと録画
- ブラウザコンソールのスクリーンショットを撮影する
    - Google Chrome では [DevTools][8] を使用してブラウザコンソールを開く
- 問題の様子を示す短い動画を録画する

[1]: https://ip-ranges.datadoghq.com
[2]: https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop
[3]: /ja/logs/guide/logs-rbac-permissions/?tab=ui#logs_live_tail
[4]: /ja/account_management/rbac/permissions/
[5]: /ja/logs/guide/logs-rbac/?tab=ui
[6]: https://help.datadoghq.com/hc/en-us/requests/new
[7]: https://support.google.com/admanager/answer/10358597?hl=en
[8]: https://developer.chrome.com/docs/devtools/open
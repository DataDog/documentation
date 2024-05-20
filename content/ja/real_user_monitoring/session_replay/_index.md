---
aliases:
- /ja/real_user_monitoring/guide/session-replay-getting-started/
description: セッションリプレイでユーザーの Web 閲覧またはモバイルアプリの体験をキャプチャし、視覚的に再生する方法について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: ブログ
  text: Datadog Session Replay を使用してユーザージャーニーをリアルタイムで表示
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: ブログ
  text: ファネル分析により、主要なユーザーフローを理解し、最適化する
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: ブログ
  text: Zendesk と Datadog セッションリプレイでユーザーが直面する問題を視覚的に再生する
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: RUM データを Explorer で確認
- link: /integrations/content_security_policy_logs
  tag: ドキュメント
  text: Datadog で CSP 違反の検出と集計を行う
kind: documentation
title: Session Replay
---

## 概要

セッションリプレイは、ユーザーの Web 閲覧またはモバイルアプリの体験をキャプチャして視覚的に再生できるようにすることで、ユーザーエクスペリエンスモニタリングを拡張します。セッションリプレイを RUM パフォーマンスデータと組み合わせると、エラーの識別、再現、解決に有益で、アプリケーションの使用パターンと設計上の落とし穴に対する洞察をもたらすこともできます。

## ブラウザセッションリプレイ

ブラウザセッションリプレイは、ユーザーの Web 閲覧体験をキャプチャして視覚的に再生できるようにすることで、ユーザーエクスペリエンスモニタリングを拡張します。セッションリプレイを RUM パフォーマンスデータと組み合わせると、エラーの識別、再現、解決に有益で、Web アプリケーションの使用パターンと設計上の落とし穴に対する洞察をもたらすこともできます。

RUM ブラウザ SDK は[オープンソース][1]であり、オープンソースの [rrweb][2] プロジェクトを活用したものです。

[ブラウザ向けセッションリプレイ][3]について詳しくはこちらをご覧ください。

## モバイルセッションリプレイ

モバイルセッションリプレイは、タップ、スワイプ、スクロールなどの各ユーザー操作を視覚的に再生することで、モバイルアプリケーションの可視性を拡大します。Android と iOS の両方のネイティブアプリで利用できます。アプリケーション上のユーザーインタラクションを視覚的に再生することで、クラッシュやエラーの再現が容易になり、UI を改善するためのユーザージャーニーの理解も容易になります。

[モバイル向けセッションリプレイ][4]について詳しくはこちらをご覧ください。

## データ保持

デフォルトでは、セッションリプレイデータは 30 日間保持されます。

保持期間を 15 か月に延長するには、個々のセッションリプレイで _Extended Retention_ を有効にします。これらのセッションは非アクティブである必要があります (ユーザーは体験を完了している)。

Extended Retention はセッションリプレイにのみ適用され、関連イベントは含まれません。15 か月は、セッションが収集されたときではなく、Extended Retention が有効になったときに開始します。

Extended Retention はいつでも無効にできます。セッションリプレイの保持期間がまだデフォルトの 30 日以内である場合、リプレイは最初の 30 日間のウィンドウの終了時に失効します。30 日を過ぎたセッションリプレイで Extended Retention を無効にすると、リプレイは直ちに失効します。

{{< img src="real_user_monitoring/session_replay/session-replay-extended-retention.png" alt="Extended Retention を有効にする" style="width:100%;" >}}

保持期間の延長でどのようなデータが保持されるかは下の図を参照してください。

{{< img src="real_user_monitoring/session_replay/replay-extended-retention.png" alt="保持期間の延長で保持されるデータの図" style="width:100%;" >}}

## 再生履歴

プレーヤーページに表示される **watched** カウントをクリックすると、指定したセッションリプレイを誰が視聴したかを確認できます。この機能により、記録を共有したい相手がすでに視聴しているかどうかを確認することができます。

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="セッションの記録を誰が見たかを確認" style="width:100%;" >}}

履歴には、プレーヤーページまたは[ノートブック][5]やサイドパネルのような埋め込みプレーヤーでの再生のみが含まれます。含まれる再生は、[監査証跡][6]イベントも生成します。サムネイルプレビューは履歴に含まれません。

自分の再生履歴を見るには、プレイリストの [My Watch History][7] をご覧ください。

## VS コード

セッションリプレイのプレイリストを作成して、気づいたパターンで整理することができます。[セッションリプレイプレイリスト][8]について詳しくはこちらをご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: /ja/real_user_monitoring/session_replay/browser/
[4]: /ja/real_user_monitoring/session_replay/mobile/
[5]: https://docs.datadoghq.com/ja/notebooks/
[6]: https://docs.datadoghq.com/ja/account_management/audit_trail/
[7]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[8]: /ja/real_user_monitoring/session_replay/playlists
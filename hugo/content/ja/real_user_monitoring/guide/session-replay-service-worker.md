---
aliases:
- /ja/real_user_monitoring/faq/session_replay_service_worker/
description: Session Replay のサードパーティサービスワーカーの権限を設定し、最適なパフォーマンスとデータセキュリティを確保します。
further_reading:
- link: /session_replay/
  tag: ドキュメント
  text: Session Replay について
title: サードパーティサービスワーカーによる Session Replay を許可する
---
## 概要 {#overview}

Session Replay は、プライバシーを保護し、データの安全性を保証しながら、最高の体験を提供するために、別のドメイン `session-replay-datadoghq.com` にあるサービスワーカーを使用しています。

ブラウザの設定でサードパーティのクッキーをブロックしている場合、またはブラウザの初期設定でブロックしている場合、サービスワーカーが正しく登録できないことがあります。

### 例外を許可する {#allow-an-exception}

Datadog では、Session Replay のサービスワーカーが正しく機能するように、サードパーティのクッキーブロックを例外化することを推奨しています。

Google Chrome を使用している場合は、以下の手順に従ってください。この例外的なワークフローは、Firefox や、Brave、Edge を含むその他のデスクトップブラウザにも適用されます。

1. Web ブラウザで、ページの URL の左側にある {{< ui >}}Lock{{< /ui >}} アイコンをクリックします。
2. {{< ui >}}Cookies{{< /ui >}} をクリックします。ポップアップモーダルが表示されます。

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="サードパーティサービスワーカーによる Session Replay を許可する" >}}

3. {{< ui >}}Blocked{{< /ui >}} タブに移動し、ページのリストから `session-replay-datadoghq.com` を選択します。
4. {{< ui >}}Allow{{< /ui >}} と {{< ui >}}Done{{< /ui >}} をクリックします。

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="サードパーティサービスワーカーによる Session Replay を許可する" >}}

クッキーの設定を更新したら、ページを再読み込みしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
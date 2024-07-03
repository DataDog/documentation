---
aliases:
- /ja/real_user_monitoring/faq/session_replay_service_worker/
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: Learn about Session Replay
title: Allow Third-Party Service Workers For Session Replay
---

## 概要

セッションリプレイは、お客様のプライバシーを保護し、データの安全性を保証しながら、最高の体験を提供するために、別のドメイン `session-replay-datadoghq.com` にあるサービスワーカーを使用しています。

お客様がブラウザの設定でサードパーティーのクッキーをブロックしている場合、またはブラウザの初期設定でブロックしている場合、サービスワーカーが正しく登録できないことがあります。

### 例外を許可する

Datadog では、セッションリプレイのサービスワーカーが正しく機能するように、サードパーティーのクッキーブロックを例外化することを推奨しています。

Google Chrome を使用している場合は、以下の手順に従ってください。この例外的なワークフローは、Firefox や、Brave、Edge を含むその他のデスクトップブラウザにも適用されます。

1. Web ブラウザで、ページの URL の左側にある **Lock** アイコンをクリックします。
2. **Cookies** をクリックします。ポップアップモーダルが表示されます。

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="セッションリプレイサードパーティサービスワーカーを許可する" >}}

3. **Blocked** タブを開き、ページの一覧から `session-replay-datadoghq.com` を選択します。
4. **Allow** と **Done** をクリックします。

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="セッションリプレイサードパーティサービスワーカーを許可する" >}}

クッキーの設定を更新したら、ページを再読み込みしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
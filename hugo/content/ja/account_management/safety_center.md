---
further_reading:
- link: /account_management/api-app-keys/
  tag: ドキュメント
  text: API キーとアプリケーションキー
- link: /account_management/users/
  tag: ドキュメント
  text: ユーザー管理
- link: /account_management/org_settings/oauth_apps
  tag: ドキュメント
  text: OAuth アプリ
title: Safety Center
---

## 概要
Datadog の Safety Center は **Organization Settings** 内にある、セキュリティアラートとベストプラクティスを一元管理する場所です。組織の[管理者][1]はこのページを開いて、推奨事項を確認し、高優先度のセキュリティ警告やアラートに対して対策を講じることができます。

{{< img src="account_management/safety_center/overview.png" alt="Safety Center 概要ページ" style="width:80%;" >}}

## セキュリティアラート
組織に高優先度のセキュリティアラートがある場合、**Safety Center** の **Security Alerts** セクションに表示されます。 Safety Center は、漏洩した[アプリケーションキー][2]と漏洩した [API キー][3]の 2 種類のアラートをサポートします。

キーの漏洩アラートは、1 つ以上のプライベートキー (アプリケーションまたは API) が侵害されたか、インターネット上で公開されたことを意味します。公開されたキーは、組織のセキュリティリスクを最小限に抑えるために、できるだけ早く[取り消す][4]必要があります。 GitHub などの公開サイトからキーを含むファイルを削除しても、他の第三者が既にアクセスしていないことを**保証するものではありません**。

{{< img src="account_management/safety_center/revoke-leaked-api-key.png" alt="漏洩した API キーの取り消し" style="width:70%;" >}}

## 構成
**Safety Center** の **Configuration** タブでは、**Security Contacts** を設定できます。これは、 Datadog 組織のセキュリティ通知を受け取る一次および二次のメールアドレスです。Datadog キーが公開されたために[ローテーション][4]が必要であるなどのセキュリティ問題が検出されると、割り当てられた **Security Contacts** に通知されます。

{{< img src="account_management/safety_center/set-security-contacts.png" alt="Security Contacts の設定" style="width:70%;" >}}

潜在的なセキュリティリスクが迅速に対処および緩和されるように、**Security Contacts** を最新の状態に保つことが重要です。**Safety Center** ページは、6 か月ごとに割り当てられた **Security Contacts** を見直すようリマインドします。

## アクセスと共有
**Safety Center** の **Access &amp; Sharing** セクションには、 Datadog 組織への外部アクセスを許可するエンティティが一覧表示されます。ここでは以下の項目がハイライトされます。

- 60 日以上非アクティブ、または書き込みアクセスがあり 30 日以上非アクティブな [**OAuth アプリケーション**][5]。
- 30 日以上未使用の [**API キー**][3]。

### OAuth アプリ
非アクティブな **OAuth アプリケーション**は、侵害された場合、組織に潜在的なセキュリティリスクをもたらす可能性があります。定期的に見直し、使用されていないアプリケーションは無効化するべきです。

{{< img src="account_management/safety_center/disable-unused-oauth-app.png" alt="使用されていない OAuth アプリケーションの無効化" style="width:70%;" >}}

### API キー
未使用の **API キー**は、インターネット上に公開された場合、組織への不正アクセスを容易にする可能性があります。未使用のキーは見直し、組織のインフラストラクチャーが依存していないものは取り消す必要があります。

{{< img src="account_management/safety_center/revoke-unused-api-key.png" alt="未使用の API キーの取り消し" style="width:70%;" >}}

## ユーザー
組織を安全に保つためには、ユーザー管理のベストプラクティスに従うことが重要です。**Safety Center** の **Users** ページでは、ユーザー関連のセキュリティ推奨事項が表示されます。

- 30 日以上未承認の[ユーザー招待][7]。
- [管理者ユーザー][1]が組織内の全ユーザーの 10％ を超えた場合。

### 保留中の招待
非アクティブなユーザーアカウントや**古い保留中のユーザー招待**があると、アカウント乗っ取り攻撃のリスクが高まります。特に非アクティブなユーザーアカウントが高い権限を持っている場合は危険です。非アクティブなユーザー数を最小限に抑えるために、**古い保留中の招待**を再送するか、 Datadog プラットフォームへのアクセスが不要な場合は削除を検討してください。

{{< img src="account_management/safety_center/resend-pending-invite.png" alt="保留中の招待の再送" style="width:70%;" >}}

{{< img src="account_management/safety_center/delete-pending-invite.png" alt="保留中の招待の削除" style="width:70%;" >}}

### 管理者
慎重な考慮なしにユーザーに**管理者アクセス権**を与えると、高い権限を持つユーザーアカウントが侵害された場合、潜在的なセキュリティリスクが増大します。**管理者アクセス権**を持つユーザーの数を減らすために、定期的に管理者ユーザーを見直し、必要のないユーザーからは管理者権限を取り消してください。

{{< img src="account_management/safety_center/edit-admin-user.png" alt="管理者ユーザーの編集" style="width:70%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/#datadog-default-roles
[2]: /ja/account_management/api-app-keys/#application-keys
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/account_management/api-app-keys/#what-to-do-if-an-api-or-application-key-was-exposed
[5]: /ja/account_management/org_settings/oauth_apps
[7]: /ja/account_management/users/#add-new-members-and-manage-invites
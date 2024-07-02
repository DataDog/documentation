---
title: API and Application Keys
aliases:
    - /account_management/faq/how-do-i-reset-my-application-keys/
    - /agent/faq/how-do-i-reset-my-datadog-api-keys/
    - /account_management/faq/api-app-key-management/
algolia:
  tags: [api key]
---

## API キー

API キーは組織に固有で、Datadog Agent でメトリクスとイベントを Datadog に送信するには、[API キー][1]が必要です。

## アプリケーションキー

組織の API キーと組み合わせて[アプリケーションキー][2]を使用すると、ユーザーは Datadog のプログラム API に完全にアクセスできます。アプリケーションキーは、これを作成したユーザーアカウントに関連付けられており、デフォルトで作成したユーザーのアクセス許可とスコープを備えています。

### スコープ

アプリケーションの保護と安全性を高めるために、アプリケーションキーに[認可スコープ][3]を指定して、より細かい権限を定義し、アプリケーションが Datadog のデータにアクセスできる範囲を最小化することが可能です。これにより、アプリケーションに対するきめ細かなアクセス制御が可能になり、余計なアクセスを制限することでセキュリティの脆弱性を最小限に抑えることができます。例えば、ダッシュボードを読むだけのアプリケーションには、ユーザーを管理したり、組織のデータを削除したりするための管理者権限は必要ありません。

アプリケーションキーのスコープに関する推奨されるベストプラクティスは、アプリケーションが意図したとおりに機能するために必要な最小限の特権と最小限の権限をキーに与えることです。スコープされたアプリケーションキーには、ユーザーが指定したスコープのみが与えられ、それ以外の追加的な許可は与えられません。アプリケーションキーの認可スコープはいつでも変更できますが、 その変更がアプリケーションの既存の機能やアクセスにどのような影響を及ぼすかを考慮してください。

**注:**

- アプリケーションキーの作成または編集の[権限][4]を持つユーザーまたはサービスアカウントは、アプリケーションキーのスコープを行うことができます。ユーザーは自分のアプリケーションキーをスコープするためには `user_app_keys` 権限、または自分の組織内の任意のユーザーが所有するアプリケーションキーをスコープするためには `org_app_keys_write` 権限が必要です。サービスアカウントのアプリケーションキーをスコープするには、`service_account_write` 権限が必要です。
- アプリケーションの所有者は、必要な権限が不足している場合、自分が持っていない認可スコープでアプリケーションキーをスコープしても、アプリケーションを認可することができません。
- アプリケーションキーの書き込みやアプリケーションの認可時に権限が不足していることによるエラーは、`403 Forbidden` エラーを表示します。様々なエラーレスポンスについての詳細は、[Datadog API][5] のドキュメントを参照してください。
- ユーザーのロールや権限が変更されても、アプリケーションキーに指定された認可スコープは変更されません。

## クライアントトークン

セキュリティ上の理由から、API キーはクライアント側で公開されるため、ブラウザ、モバイル、TV アプリからのデータ送信には使用できません。その代わりに、エンドユーザー向けアプリケーションでは、クライアントトークンを使用して Datadog にデータを送信します。

以下の例を含む、いくつかのタイプのクライアントが、クライアントトークンを必要とするデータを送信します。
- The log collectors for [web browser][6], [Android][7], [iOS][8], [React Native][9], [Flutter][10], and [Roku][11] submit logs.
- [Real User Monitoring][12] applications submit events and logs.

クライアントトークンは、組織に固有のものです。クライアントトークンを管理するには、**Organization Settings** に移動し、**Client Tokens** タブをクリックします。

**注**: クライアントトークンを作成したユーザーが非アクティブ化されても、クライアントトークンはアクティブなままです。

## API キーまたはクライアントトークンを追加する

Datadog API キーまたはクライアントトークンを追加するには

1. Navigate to Organization settings, then click the [**API keys**][1] or [**Client Tokens**][13] tab.
2. 作成するものに応じて、**New Key** (新しいキー) または **New Client Token** (新しいクライアントトークン) ボタンをクリックします。
3. キーまたはトークンの名前を入力します。
4. **Create API key** (API キーの作成) または **Create Client Token** (クライアントトークンの作成) をクリックします。

{{< img src="account_management/api-key.png" alt="Navigate to the API Keys page for your organization in Datadog" style="width:80%;" >}}

**注:**

- 組織には、少なくとも最低 1 つ、最大 50 の API キーが必要です。
- キー名は、オーガニゼーション全体で一意である必要があります。

## API キーまたはクライアントトークンを削除する

Datadog API キーまたはクライアントトークンを削除するには、キーまたはトークンのリストに移動し、削除するキーまたはトークンの横にある **Revoke** のある**ごみ箱**アイコンをクリックします。

## アプリケーションキーを追加する

To add a Datadog application key, navigate to [**Organization Settings** > **Application Keys**][2]. If you have the [permission][4] to create application keys, click **New Key**.

{{< img src="account_management/app-key.png" alt="Navigate to the Application Keys page for your organization in Datadog" style="width:80%;" >}}

**注:**

- アプリケーションキー名を空白にすることはできません。

## アプリケーションキーを削除する

To remove a Datadog application key, navigate to [**Organization Settings** > **Application Keys**][2]. If you have the [permission][4] to create and manage application keys, you can see your own keys and click **Revoke** next to the key you want to revoke. If you have the permission to manage all org application keys, you can search for the key you want to revoke and click **Revoke** next to it.

## アプリケーションキーのスコープ

To specify [authorization scopes][3] for application keys, [make a request to the Datadog API][5] or the UI to create or edit an application key. Scopes can be specified for application keys owned by [the current user][14] or a [service account][15]. If this field is unspecified, application keys by default have all the same scopes and permissions as the user who created them.

**注:**

- スコープ名の大文字と小文字は区別されます。

## 複数の API キーの使用

組織に複数の API キーを設定することを検討します。たとえば、デプロイ方法ごとに異なる API キーを使用します（たとえば、AWS の Kubernetes に Agent をデプロイする用、Chef を使用してオンプレミスでデプロイする用、ダッシュボードやモニターを自動化する Terraform スクリプト用、ローカルでデプロイする開発者用など）。

複数の API キーを使用することで、セキュリティ対策の一環としてキーをローテーションしたり、特定のキーが誤って公開された場合やそのキーに関連づけられたサービスを停止したい場合に取り消すことができます。

If your organization needs more than the built-in limit of 50 API keys, contact [Support][16] to ask about increasing your limit.

## ユーザーアカウントの無効化

ユーザーのアカウントが無効になった場合、ユーザーが作成したアプリケーションキーはすべて取り消されます。無効なアカウントによって作成された API キーは削除されず、引き続き有効です。

## キーの転送

Due to security reasons, Datadog does not transfer application keys from one user to another. If you need to share an application key, use a [service account][17].

## API キーやアプリケーションキーが流出した場合の対処法

プライベートキーが漏洩したり、一般に公開された場合、アカウントのセキュリティを確保するために、できるだけ早く措置を講じる必要があります。GitHub などの公開サイトからキーの入ったファイルを削除しても、それがすでに他の者によってアクセスされていないことを保証するものでは**ありません**。

以下の手順で、アカウントを保護してください。

**注:** 有効なキーを無効にすると、サービスに影響を与える可能性があります。使用範囲が広い場合や未確定の場合は、対象となるキーを無効にする**前に**、手順 2～5 の検討をお願いします。

1. 影響を受けるキーを無効にします。
2. 一般にアクセス可能なファイルから、プライベートキーを含むコードを削除します。
    - サニタイズしたファイルを公開リポジトリに公開します。
    - コミット履歴から機密データを削除します。
3. 新しいキーを作成します。
4. 影響を受けるサービスを新しいキーで更新します。
5. 未承認のアクセスがないか、アカウントを確認します。
    - 最近追加されたユーザー
    - 新しいリソース
    - ロールまたは権限の変更

If any unusual activity is identified, or you need additional help securing your account, contact [Datadog support][16].

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/access/application-keys
[3]: /api/latest/scopes/
[4]: /account_management/rbac/permissions
[5]: /api/latest/key-management/
[6]: /logs/log_collection/javascript/
[7]: /logs/log_collection/android/
[8]: /logs/log_collection/ios/
[9]: /logs/log_collection/reactnative/
[10]: /logs/log_collection/flutter/
[11]: /logs/log_collection/roku/
[12]: /real_user_monitoring/
[13]: https://app.datadoghq.com/organization-settings/client-tokens
[14]: /api/latest/key-management/#create-an-application-key-for-current-user
[15]: /api/latest/service-accounts/
[16]: /help/
[17]: /account_management/org_settings/service_accounts/

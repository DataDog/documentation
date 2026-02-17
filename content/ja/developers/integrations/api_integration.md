---
aliases:
- /ja/developers/integrations/oauth_for_data_integrations/
- /ja/developers/integrations/oauth_for_integrations/
description: Datadog API インテグレーションを開発し、公開する方法をご紹介します。
further_reading:
- link: /developers/authorization/oauth2_in_datadog/
  tag: Documentation
  text: Datadog での OAuth2
- link: /developers/integrations/
  tag: Documentation
  text: インテグレーションの構築
- link: https://www.datadoghq.com/blog/oauth/
  tag: ブログ
  text: OAuth で Datadog のインテグレーションを認可する
title: API ベースのインテグレーションを作成する
---

## 概要

このページでは、Datadog API インテグレーションを作成する方法をテクノロジーパートナーに説明します。

[Datadog API エンドポイント][21] を使用して、バックエンドからデータを送信したり、ユーザーの Datadog アカウントからデータを取得したりすることで、顧客体験を強化します。テクノロジー パートナーは、自身の環境内でコードを作成し、ホストします。

API インテグレーションは、SaaS ベースで、ユーザーを認証する既存のプラットフォームを持っているテクノロジーパートナーに最適です。

API インテグレーションは、以下の種類のデータを Datadog に送信できます。

- [メトリクス][22]
- [ログ][23]
- [イベント][24]
- [サービス チェック][25]
- [トレース][26]
- [インシデント][27]

## 開発プロセス

### OAuth

Datadog では、ユーザーから直接 API キーやアプリケーションキーをリクエストする代わりに、[OAuth クライアント][14]を使用して API ベースのインテグレーションの認可とアクセスを処理することが求められています。OAuth の実装は、すべての [Datadog サイト][12]をサポートする必要があります。

OAuth を使用することで、Datadog のお客様は、Datadog 組織に対するサードパーティのアクセスを安全に許可することができます。この許可により、お客様が API やアプリのキーをどこかに入力しなくても、インテグレーションが Datadog にデータをプッシュしたり、 Datadog からデータをプルしたりすることができるようになります。たとえば、ユーザーは、Datadog 組織のモニターに対する読み取りアクセスをオンコール通知ツールに付与することに同意することができます。

注: この機能は、インテグレーションの構築を意図し Datadog に承認されたテクノロジー パートナーにのみ提供されます。その他の目的の OAuth クライアントはサポートされません。

OAuth クライアントを公開しても、インテグレーションは公開されません。インテグレーションが [Integrations ページ][16]に表示されるのは、別途、公開プロセスを完了した後になります。インテグレーションの作成と公開については、[インテグレーションの構築][18]を参照してください。

### インテグレーションで OAuth の使用が必要なケース

OAuth への対応は、パートナーが構築した SaaS インテグレーションが Datadog の公開 [API エンドポイント][12]に直接データを送信したり、そこからデータを照会したりする場合は必ず必要です。OAuth は、オンプレミスにデプロイされたソフトウェアや、Datadog の Agent チェックには適用されません。

以下の手順に従えば、新規インテグレーションに OAuth を含める (または既存のインテグレーションに追加する) ことができます。操作は [Marketplace][2] ページまたは [Integrations][3] ページから行います。

### OAuth クライアントを作成する
クライアントは、ユーザーがアプリケーションに顧客の Datadog データへのアクセスを許可できるようにする、アプリケーションのコンポーネントです。アクセスを得るには、クライアントに適切なアクセス トークンが必要です。
1. OAuth を設定する前に、Integration Developer Platform ドキュメントに従ってインテグレーションをセットアップしてください。構成方法を選択する際は、**API with OAuth** を選択します。
2. 名前、オンボーディング URL、リダイレクト URI などのクライアント詳細を入力します。
3. OAuth クライアント シークレットを生成します。
4. クライアント シークレットは再表示されないため保存してください。紛失した場合は新しいシークレットを再生成できます。

   この手順で作成されるクライアントはプライベート バージョンであり、その資格情報は自組織内でのテストにのみ使用できます。インテグレーションが公開されると、このクライアントの公開バージョンが新たに作成され、あらゆる Datadog 組織で認可に使用できる新しい資格情報が付与されます。

5. 適切なスコープを選択します。

   スコープは、顧客の Datadog アカウントでアプリがアクセスできるデータの種類を決定します。これにより、インテグレーションに必要なスコープへのアクセスが許可されます。ユース ケースに必要な最小限のスコープのみを要求してください。必要に応じて後から追加できます。Datadog へデータを投入するには、`api_keys_write` スコープを選択する必要があります。
6. 変更を保存します。

### OAuth プロトコルの実装

OAuth プロトコルの具体的な実装手順は [Datadog OAuth2][1] を参照してください。

### OAuth クライアントをテストする

OAuth プロトコルを実装したら、ユース ケースに応じて Datadog へデータを送信できるか、またはデータを取得できるかを確認するために OAuth クライアントをテストします。

**注**: インテグレーションタイルが公開されるまでは、サンドボックス組織の OAuth クライアントのみを認可できます。つまり、サンドボックスアカウントにデータを送信したり、サンドボックスアカウントからデータをプルしたりすることしかできません。

OAuth クライアントをテストするには、以下の手順を実行します。
1. 認可が正しく機能していることをテストする
2. API キーの作成
3. 複数の Datadog サイトをテストする
4. リージョン間サポートを確認する
5. すべてのスコープのデータ フローを確認する
6. インテグレーションと OAuth クライアントを審査に提出する

#### 認可が正しく機能していることをテストする

1. Developer Platform 内の OAuth クライアント ページで **Test Authorization** を選択します。オンボーディング URL に遷移し、ユーザー視点で認可フローが開始されます。このボタンをクリックすると、`domain` パラメータが `onboarding_url` へのリダイレクト時に付与されます。
2. OAuth フローを進み、インテグレーションを認可します。

#### API キーの作成

OAuth クライアントが `api_keys_write` スコープをリクエストした場合、リクエストのヘッダーにトークンを含めて `marketplace` エンドポイントに正常にリクエストできることを確認します。詳細については、[OAuth2 認可エンドポイントリファレンス][20]を参照してください。

このリクエストに成功すると、[API Keys Management ページ][10] にある API キーが返されます。このキーは、ユーザーに代わって Datadog にデータを送信する際に使用するため、安全に保存する必要があります。**最初のリクエストのレスポンス後、この API キーの値に再度アクセスすることはできません**。

#### 複数の Datadog サイトをテストする

異なる [Datadog サイト][8] 間でのテストは、承認後に開発者サンドボックスでインテグレーションのプレビューが利用可能になった時点でのみ使用できます。
1. 別のサイトのサンドボックスアカウントへのアクセス権がない場合は、`ecosystems@datadog.com` までご連絡ください。
2. インテグレーションは他のサンドボックスでも利用可能になります。
3. インテグレーションを接続し、OAuth フローを実行します。


##### リージョン間サポートを確認する

すべての Datadog リージョンのユーザーに対して OAuth を機能させるには、ユーザーのリージョンに基づいて正しい API 呼び出しを行っていることを確認する必要があります。ユーザが Datadog タイルから認可を要求すると、オンボーディング URL からリダイレクトでサイトパラメーターが送信されます。このサイトパラメーターを認可エンドポイントおよびトークンエンドポイントへの呼び出しで使用します。

ユーザーがパートナーのプラットフォームから直接認可を要求する場合、このサイトパラメーターは送信されず、ユーザーは代わりに Datadog の認可ページでサイトを選択するよう求められます。

必ず、ユーザーのリージョンに一致する Datadog API への呼び出しをテストするようにしてください。たとえば、米国の場合は `https://trace.browser-intake-datadoghq.com` 、EU の場合は `https://public-trace-http-intake.logs.datadoghq.eu` になります。

Datadog サイトに応じた呼び出し先のリストを確認するには、[Network traffic][19] ページに移動し、右側の **DATADOG SITE** セレクタを使ってリージョンを切り替えます。

#### すべてのスコープのデータフローを確認する

リクエストしたスコープごとに、データの送信、データの引き出し、データの編集ができることを確認します。

### OAuth クライアントを公開する

#### インテグレーションと OAuth クライアントを審査に提出する
1. インテグレーションの必須フィールドをすべて完了したら、審査に提出してください。
2. 提出すると、インテグレーションのパブリック バージョン用の新しい資格情報が発行されます。**これらの資格情報は再表示されません。安全な場所にコピーしてください。**
3. インテグレーションが Datadog に承認されリリース準備が整うと、その時点で OAuth クライアントも公開されます。公開後、インテグレーション タイルはサンドボックス アカウントで利用可能になりますが、顧客には表示されません。さらに、OAuth クライアントはサンドボックス組織に限らず、任意の Datadog 組織で認可できるようになります。
4. この時点で Datadog は、OAuth クライアントで最終テストを行い、認可がスムーズに動作することを確認することをお勧めします。

#### クライアントを公開のために送信した後の変更

公開済みの OAuth クライアントは直接編集できません。公開後に OAuth クライアントを更新するには、再度公開フローを実行して再提出する必要があります。

## トラブル シューティング

### API スコープのリストに、メトリクス、イベント、ログの送信が含まれていません。

Datadog にデータを送信するには、ユーザーに代わって API キーを生成する際に `api_keys_write` スコープを使用します。詳細については、[API キーの作成](#create-an-api-key)を参照してください。


### 無効なクライアント ID

エラー
: `invalid_request - Invalid client_id parameter value`

OAuth クライアントが公開されるまでは、その作成元となったアカウント (パートナーのサンドボックスアカウント) からのクライアントしか認可できません。このエラーは、クライアントが公開される前に、そのアカウント以外でクライアントを認可しようとした場合に発生します。

OAuth クライアントをすでに公開している場合は、申請時に付与されたクライアント ID とクライアントシークレットを必ず使用してください。クライアントシークレットは一度しか表示されないので、紛失した場合は [ecosystems@datadog.com][11] に連絡してください。

### アクセス拒否エラー

エラー
: `{"errors":["Forbidden"]}`

このエラーは、アプリのキーまたは API 認証情報の問題に関連している可能性があります。

#### アプリキーの使用

OAuth クライアントは認証に `access_token` を使用します。`access_token` をリクエストの認可ヘッダーの一部として送信することで、Datadog API エンドポイントを呼び出すために使用します。

```python
headers = {"Authorization": "Bearer {}".format(access_token)}
```

詳細については、[OAuth プロトコルの実装][17]を参照してください。

### API リクエスト

特定のエンドポイントにAPI 呼び出しを行おうとして禁止エラーが表示され、そのエンドポイントに対して正しいスコープを有効にしている場合、API キー、セッション、または OAuth トークンが無効であるか、有効期限が切れている可能性があります。

#### API キーとトークンの有効期限

リフレッシュトークンは、ユーザーが認可を取り消すか、パートナーがトークンを取り消さない限り、失効しません。パートナーがトークンを取り消した場合、ユーザーはインテグレーションを再度認可して、新しいリフレッシュトークンとアクセストークンを生成する必要があります。詳細については、[OAuth2 認可エンドポイントリファレンス][13]を参照してください。

#### パートナーのサンドボックスアカウントで API キーを取得する

[api_keys/marketplace][14] エンドポイントを使用してキーを作成すると、そのキーが応答で返されます。キーを再生成したり、再度表示したりすることはできません。継続的なデータ送信のために、キーを安全に保管するようにしてください。API キーを紛失した場合は、以下の手順に従ってキーを取り消して、再作成してください。

1. [Datadog API Keys Management ページ][15]に移動します。
1. `OAuth Client API Key` という名前の API キーを探し、それを選択します。
1. **Revoke** をクリックして API キーを無効にします。
1. [API キーの作成](#create-an-api-key)の手順に従って、新しいキーを作成します。
1. インテグレーションを再インストールして、OAuth のフローを最初からやり直します。


### ホスト名/IP が証明書の altname と一致しない

エラー
: `Hostname/IP does not match certificate's altnames`

Datadog API に接続する際は、API 呼び出しにサブドメインを含めないでください。たとえば、`bigcorp.datadoghq.eu` ではなく `datadoghq.eu` を使用します。

### リダイレクト URI の不一致

エラー
: `invalid_request - Mismatching redirect URI`

このエラーは通常、テスト用クライアントと公開クライアントで構成が異なるために発生します。次のことを確認してください。
- 認可時に正しい `client_id` を使用していることを確認してください。たとえば、公開クライアントの client_id ではなく、テスト用クライアントの`client_id` を使用している可能性があります。
- 正しいリダイレクト URI を使用していることを確認してください。たとえば、クライアントが公開されている場合、リダイレクト URI はテストに使用した URI ではなく、本番用に設定した URI と一致している必要があります。
- 正しいクライアントを使用していることを確認してください。インテグレーションがサンドボックスアカウントに公開されるまで、テスト用クライアントを使用してください。

### サブドメインを持つアプリケーション

Datadog は、顧客が個々のサブドメインを使用して認可する、マルチテナント型のアプリケーションをサポートしていません。認可は、単一のドメインを通じてのみサポートされます。

### PKCE が有効な OAuth

エラー
: `Invalid code or code verifier`

PKCE OAuth フローの問題については、`content-type` ヘッダーが `application/json` または `application/x-www-form-urlencoded` に正しく設定されていることを確認してください。

### クライアントシークレットの再生成とシークレットローテーション

シークレットが漏洩してローテーションが必要な場合は、[ecosystems@datadog.com][11] までご連絡ください。一度に有効にできるシークレットは一つだけです。シークレットを再生成すると、既存のシークレットは削除されます。インテグレーションを再認可する必要はありません。


## 関連情報

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: /ja/developers/integrations/marketplace_offering/#list-an-offering
[8]: /ja/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: mailto:ecosystems@datadog.com
[12]: /ja/api/latest/using-the-api/
[13]: /ja/developers/authorization/oauth2_endpoints/#exchange-authorization-code-for-access-token
[14]: /ja/developers/authorization/oauth2_endpoints/#post-apiv2api_keysmarketplace
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/integrations
[17]: /ja/developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[18]: /ja/developers/integrations/
[19]: /ja/agent/configuration/network/
[20]: /ja/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints
[21]: https://docs.datadoghq.com/ja/api/latest/using-the-api/
[22]: https://docs.datadoghq.com/ja/api/latest/metrics/
[23]: https://docs.datadoghq.com/ja/logs/faq/partner_log_integration/
[24]: https://docs.datadoghq.com/ja/api/latest/events/
[25]: https://docs.datadoghq.com/ja/api/latest/service-checks/
[26]: https://docs.datadoghq.com/ja/tracing/guide/send_traces_to_agent_by_api/
[27]: https://docs.datadoghq.com/ja/api/latest/incidents/
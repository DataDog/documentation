---
aliases:
- /ja/developers/integrations/oauth_for_data_integrations/
description: OAuth を使用してインテグレーションを認証する
further_reading:
- link: /developers/authorization/oauth2_in_datadog/
  tag: ドキュメント
  text: Datadog における OAuth2
- link: /developers/integrations/
  tag: ドキュメント
  text: インテグレーションの構築
- link: https://www.datadoghq.com/blog/oauth/
  tag: ブログ
  text: OAuth で Datadog のインテグレーションを認可する
title: インテグレーションのための OAuth
---

## 概要

OAuth を使用すると、Datadog の顧客は、自社の Datadog 組織に対するサードパーティのアクセスを安全に認可できます。この認可により、顧客がどこにも API キーやアプリケーションキーを入力する必要なく、インテグレーションが Datadog へデータを送信したり、Datadog からデータを取得したりできるようになります。たとえば、ユーザーはオンコール通知ツールに対し、自社の Datadog 組織のモニターへの読み取りアクセスの付与に同意できます。

Datadog における OAuth の実装の詳細については、[Datadog OAuth2 のドキュメント][1]をご覧ください。

OAuth クライアントを公開しても、インテグレーションは公開されません。インテグレーションが [Integrations ページ][16]に表示されるのは、別途、公開プロセスを完了した後になります。インテグレーションの作成と公開については、[インテグレーションの構築][18]を参照してください。

## インテグレーションで OAuth の使用が必要なケース

パートナーが構築した SaaS インテグレーションが Datadog の公開 [API エンドポイント][12]に直接データを送信したり、データを照会したりする場合、OAuth への対応は必須です。OAuth は、オンプレミスにデプロイされたソフトウェアや、Datadog Agent のチェックには適用されません。

## OAuth を使ったインテグレーションの構築

OAuth 対応のインテグレーションを構築する場合、アプリケーションに必要なスコープだけを選択してください。顧客がインテグレーションの認可に同意すると、記載されたすべてのスコープがトークンを介してアプリケーションで利用可能になります。

以下の手順に従うことで、[Marketplace][2] または [Integrations][3] ページで、新しいインテグレーションに OAuth を含める (または既存のインテグレーションに追加する) ことができます。既存のインテグレーションの場合、`manifest.json` の `app_uuid` を変更する必要はありません。

### テンプレートからアプリを作成する

1. [Datadog Developer Platform][4] に移動して、**+New App** をクリックします。

   インテグレーション用の OAuth クライアントそれぞれについて、アプリを作成する必要があります。インテグレーションが公開されると、Datadog がこのアプリをインテグレーションに紐付けます。

2. **Blank App** を選択して、アプリの名前を追加します。
3. **Create** をクリックします。
4. **Basic Information** タブで、詳細ビューに表示される情報を入力します。
5. OAuth クライアントの公開準備が整ったら、**Mark Stable** ボタンをクリックします。
6. **Save** をクリックします。

### OAuth クライアントを作成する

OAuth クライアントはアプリケーションのコンポーネントで、ユーザーがアプリケーションに対し、自身の Datadog データへのアクセスを許可することが可能になります。クライアントがアクセス権を取得するには、適切なアクセストークンが必要です。

1. **Features** の **OAuth & Permissions** タブに移動し、**New Confidential OAuth Client** をクリックします。

   インテグレーション用に作成する OAuth クライアントは**機密クライアント**で、クライアント ID とクライアントシークレットが提供されます。この段階で作成するクライアントはクライアントの非公開バージョンで、その資格情報を使ってテストを行うことができます。このクライアントは、組織内部での認可のみを許可します。このクライアントの公開バージョンが作成された際には、任意の Datadog 組織での認可を可能にする新しい資格情報が付与されます。

   <div class="alert alert-info">これらの資格情報は、クライアント作成後は二度と表示されないため、必ず安全な場所に保管してください。</div>

2. 名前、説明、リダイレクト先の URI、オンボーディング用 URL などのクライアント情報を入力します。 
3. スコープを検索して、**Requested** 欄のチェックボックスを選択することで、OAuth クライアントのスコープの構成を行います。

   スコープとは、顧客の Datadog アカウント内でアプリがアクセス可能なデータの種類を決定するものです。これにより、インテグレーションが必要なスコープにアクセスすることができます。スコープは必要に応じて後で追加できますので、ご自身のユースケースで必要とされる最低限のスコープのみを要求するようにしてください。

   Datadog にデータを送信するには、`api_keys_write` スコープを選択する必要があります。これは、インテグレーションパートナーにのみ認められる非公開のスコープで、ユーザーに代わって API キーを作成することが可能になり、このキーを使ってデータを Datadog に送信することができます。

4. **Save Changes** をクリックします。
5. OAuth クライアントを作成してスコープを割り当てた後は、OAuth を通じて利用可能なエンドポイントを利用して、インテグレーションに OAuth PKCE プロトコルを実装し、認可コードの付与フローを完成させ、インテグレーションコードの記述を開始することができます。

   認可コード付与フローでは、認可コードとリフレッシュトークンを受け取った後、認可コードをアクセストークンと交換します。アクセストークンは、Datadog からプルしたいデータにアクセスするために利用できます。

   Datadog で使用する OAuth プロトコルの実装に関する詳細については、[Datadog OAuth2][1] をご覧ください。また、インテグレーションのビルドと公開に関する詳細については、[インテグレーション開発者用ドキュメント][5]をご覧ください。

### OAuth クライアントをテストする

OAuth プロトコルを実装したら、OAuth クライアントをテストして、ユースケースに応じて Datadog にデータを送信したり、データをプルしたりできることを確認する必要があります。

**注**: インテグレーションタイルが公開されるまでは、サンドボックス組織の OAuth クライアントのみを認可できます。つまり、サンドボックスアカウントにデータを送信したり、サンドボックスアカウントからデータをプルしたりすることしかできません。

OAuth クライアントをテストするには、以下の手順を実行します。

#### 認可が正しく機能していることをテストする

基本的な認可フローを通過する際にエラーが発生しないことを確認します。

   1. Developer Platform に移動し、アプリの Edit アイコンをクリックし、**OAuth and Permissions** タブを開きます。
   2. OAuth クライアントを選択し、クライアントの詳細ページで **Test Authorization** ボタンをクリックします。
   3. これによりオンボーディング URL に移動し、顧客が取る認可フローが開始します。このボタンをクリックすると、`onboarding_url` へのリダイレクト時に `domain` パラメーターが提供されます。
   4. OAuth フローを進み、インテグレーションを認可します。

#### API キーの作成

OAuth クライアントが `api_keys_write` スコープをリクエストする場合は、リクエストヘッダーにトークンを含めて `marketplace` エンドポイントに正常にリクエストできることを確認してください。詳細は [OAuth2 認可エンドポイントリファレンス][20] を参照してください。

このリクエストに成功すると、[API Keys Management ページ][10] にある API キーが返されます。このキーは、ユーザーに代わって Datadog にデータを送信する際に使用するため、安全に保存する必要があります。**最初のリクエストのレスポンス後、この API キーの値に再度アクセスすることはできません**。

#### 複数の Datadog サイトをテストする

テスト用クライアントでは他組織をテストできませんが、クライアントを EU サンドボックスにコピーして認可フローを開始することで、OAuth クライアントが複数の [Datadog サイト][8]で機能することを確認できます。
   1. 別のサイトのサンドボックスアカウントへのアクセス権がない場合は、`ecosystems@datadog.com` までご連絡ください。
   2. Developer Platform で作成したアプリに移動して **Documentation** の右にある歯車アイコンをクリックし、**Export App Manifest** をクリックして、*オリジナル*の US1 Datadog サイトの組織からアプリのマニフェストをエクスポートします。
   3. EU のサンドボックス組織で Developer Platform に移動して、手順 2 でエクスポートしたアプリのマニフェストをインポートします。
   4. マニフェストのインポートが完了したら、**OAuth & Permissions** タブに移動して、OAuth クライアントとそのクライアント ID およびクライアントシークレットを確認します。これらの資格情報を使用するように OAuth 実装を更新します。
   5. **Test Authorization** ボタンに移動し、それをクリックし、OAuth フローを進みます。

OAuth クライアントが公開された後は、他の組織から自由にテストを行うことができます。

##### クロスリージョン対応

すべての Datadog リージョンのユーザーに対して OAuth が機能するようにするには、ユーザーのリージョンに応じた正しい API 呼び出しになっていることを確認する必要があります。ユーザーが Datadog タイルから認可フローを開始すると、オンボーディング URL からのリダイレクト時に site パラメータが送信されます。この site パラメータを、認可エンドポイントおよびトークンエンドポイントへの呼び出しで使用します。

ユーザーが自社のプラットフォームから直接認可フローを開始する場合、この site パラメータは送信されず、代わりに Datadog の認可ページでサイトの選択を求められます。

必ず、ユーザーのリージョンに一致する Datadog API への呼び出しをテストしてください。たとえば、米国は `https://trace.browser-intake-datadoghq.com` 、EU は `https://public-trace-http-intake.logs.datadoghq.eu` を使用します。

Datadog サイトに応じた呼び出し先のリストを確認するには、[Network traffic][19] ページに移動し、右側の **DATADOG SITE** セレクタを使ってリージョンを切り替えます。

### すべてのスコープのデータフローを確認する

リクエストしたスコープごとに、データの送信、データの引き出し、データの編集ができることを確認します。

### OAuth クライアントを公開する

#### プルリクエストを作成または更新する
OAuth クライアントを公開するには、まず [`integrations-extras`][5] または [Marketplace][6] GitHub リポジトリで、インテグレーションのプルリクエストを開く必要があります (まだの場合)。

プルリクエストの一部として、以下の手順を実行します。

1. README ファイルを更新します。`## Setup` 内に `## Uninstallation` セクションとして次の指示を記入します (カスタムの指示を追加した場合は併せて記入)。

   - このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。
   - また、[API Keys ページ][10]でインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。

2. `manifest.json` ファイルを更新して、この新しい `## Uninstallation` セクションを参照します。この参照は、サポートフィールドの直下に表示されるはずです。

   ```
   "support": "README.md#Support",
   "uninstallation": "README.md#Uninstallation",
   ```

#### Developer Platform で公開プロセスを開始する

[Developer Platform][4] で公開プロセスを開始する方法

1. **General** 配下の **Publishing** タブに移動し、**Next: Send App Details to Datadog** をクリックします。このタブの一番上で、公開されたクライアント ID とシークレットを取得します。OAuth の実装を更新して、これらのクライアント資格情報を含める必要があります。**注:** クライアント ID とクライアントシークレットは安全な場所に保存してください。この情報は二度と表示されません。

2. Integration Publishing セクションで、OAuth クライアント情報をプルリクエストに追加する手順に従います。これには、`manifest.json` ファイルの更新と、`assets` ディレクトリへのファイルの追加が含まれます。

3. 適切なフィールドに GitHub ディレクトリまたはプルリクエストへのリンクを追加します。
4. **Finish & Send** をクリックします。

OAuth クライアントが公開のために送信されると、チームに通知されます。プルリクエストがすべての関係者によって承認され、マージできる状態になると、その時点で OAuth クライアントも公開されます。その後インテグレーションタイルは、(すべての顧客に対してではなく) サンドボックスアカウントに公開され、OAuth クライアントは、(サンドボックス組織だけではなく) Datadog のどの組織でも認可できるようになります。

この時点で Datadog は、OAuth クライアントで最終テストを行い、認可がスムーズに動作することを確認することをお勧めします。

#### クライアントを公開のために送信した後の変更

公開済みの OAuth クライアントを直接編集することはできませんので、全てのテストが完了し、準備が整った段階で公開フローを実行してください。公開のために送信された後に OAuth クライアントを更新するには、公開フローを再度実行し、再送信する必要があります。**公開済みクライアントの資格情報は再表示されません**。

インテグレーションタイルの公開とプルリクエストの作成の詳細については、[Marketplace と Integrations のドキュメント][7]を参照してください。

## トラブルシューティング

### API スコープのリストには、メトリクス、イベント、ログの送信は含まれていません。

Datadog にデータを送信するには、ユーザーに代わって API キーを生成する際に `api_keys_write` スコープを使用します。詳細については、[API キーの作成](#create-an-api-key)を参照してください。


### 無効なクライアント ID

Error
: `invalid_request - Invalid client_id parameter value`

OAuth クライアントが公開されるまでは、その作成元アカウント (パートナーのサンドボックスアカウント) からしかクライアントを認可できません。クライアントの公開前に、そのアカウント以外で認可しようとするとこのエラーが発生します。

OAuth クライアントをすでに公開している場合は、申請時に付与されたクライアント ID とクライアントシークレットを必ず使用してください。クライアントシークレットは一度しか表示されないので、紛失した場合は [ecosystems@datadog.com][11] に連絡してください。

### アクセス拒否エラー

Error
: `{"errors":["Forbidden"]}`

このエラーは、アプリケーションキーまたは API 認証情報の問題に関連している可能性があります。

#### アプリケーションキーの使用

OAuth クライアントは認証に `access_token` を使用します。`access_token` はリクエストの Authorization ヘッダーに含めて送信し、Datadog の API エンドポイントを呼び出します。

```python
headers = {"Authorization": "Bearer {}".format(access_token)}
```

詳細については、[OAuth プロトコルの実装][17]を参照してください。

### API リクエスト

特定のエンドポイントに API 呼び出しを行った際に Forbidden エラーが発生し、そのエンドポイントに必要なスコープを有効化している場合は、API キー、セッション、または OAuth トークンが無効であるか、有効期限切れの可能性があります。

#### API キーとトークンの有効期限

リフレッシュトークンは、ユーザーが認可を取り消すか、パートナーがトークンを取り消した場合を除き、失効しません。パートナーがトークンを取り消した場合、ユーザーはインテグレーションを再度認可して、新しいリフレッシュトークンとアクセストークンを生成する必要があります。詳細は [OAuth2 認可エンドポイントリファレンス][13] を参照してください。

#### パートナーのサンドボックスアカウントで API キーを取得する

[api_keys/marketplace][14] エンドポイントでキーを作成すると、キーはレスポンスで返されます。キーは再生成も再表示もできません。継続運用のため、キーは安全に保管してください。API キーを紛失した場合は、以下の手順に従って取り消しと再作成を行ってください。

1. [Datadog API Keys Management ページ][15]に移動します。
1. `OAuth Client API Key` という名前の API キーを探し、それを選択します。
1. **Revoke** をクリックして API キーを無効にします。
1. [API キーの作成](#create-an-api-key)の手順に従って、新しいキーを作成します。
1. インテグレーションを再インストールし、OAuth フローを再実行します。


### ホスト名/IP が証明書の Subject Alternative Name (SAN) と一致しない

Error
: `Hostname/IP does not match certificate's altnames`

Datadog API に接続する際は、API 呼び出しにサブドメインを含めないでください。たとえば、`bigcorp.datadoghq.eu` ではなく `datadoghq.eu` を使用します。

### リダイレクト URI の不一致

Error
: `invalid_request - Mismatching redirect URI`

このエラーは通常、テスト用クライアントと公開クライアントで構成が異なるために発生します。次のことを確認してください。
- 認可時に正しい `client_id` を使用していることを確認してください。たとえば、公開クライアントの `client_id` ではなく、テスト用クライアントの `client_id` を使用している可能性があります。
- 正しいリダイレクト URI を使用していることを確認してください。たとえば、クライアントが公開されている場合、リダイレクト URI はテストに使用した URI ではなく、本番用に設定した URI と一致している必要があります。
- 正しいクライアントを使用していることを確認してください。インテグレーションがサンドボックスアカウントに公開されるまで、テスト用クライアントを使用してください。

### サブドメインを持つアプリケーション

Datadog は、顧客が個々のサブドメインで認可を行うマルチテナント型アプリケーションをサポートしていません。認可は単一ドメイン経由のみサポートされます。

### PKCE を用いた OAuth

Error
: `Invalid code or code verifier`

PKCE を用いた OAuth フローで問題が発生している場合は、`Content-Type` ヘッダーが `application/json` または `application/x-www-form-urlencoded` に正しく設定されていることを確認してください。

### クライアントシークレットの再生成とシークレットのローテーション

シークレットが漏洩してローテーションが必要な場合は [ecosystems@datadog.com][11] までご連絡ください。同時に有効化できるシークレットは 1 つだけです。シークレットを再生成すると、既存のシークレットは削除されます。インテグレーションを再認可する必要はありません。

## 参考資料

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
---
aliases:
- /ja/developers/integrations/oauth_for_data_integrations/
description: Use OAuth to authenticate integrations.
title: OAuth for Integrations
---
{{< callout btn_hidden="true" >}}
  Datadog Developer Platform はベータ版です。アクセス権をお持ちでない場合は、apps@datadoghq.com までご連絡ください。
{{< /callout >}} 

## 概要

OAuth enables Datadog customers to securely authorize third-party access to their Datadog organization. This authorization allows integrations to push data into Datadog or pull data out from Datadog without the need for customers to input API or app keys anywhere. For example, a user can consent to provide an on-call notification tool with read access to their Datadog organization's monitors.

Datadog における OAuth の実装の詳細については、[Datadog OAuth2 のドキュメント][1]をご覧ください。

## When to use OAuth in an integration

OAuth support is required for all partner-built SaaS integrations that directly submit data to, or query data from, Datadog's public [API endpoints][12]. OAuth does not apply to software deployed on-premises, or to Datadog Agent checks. 

## OAuth を使ったインテグレーションの構築

When building an integration with OAuth, you should only select the scopes to which your application needs access. After a customer consents to authorize your integration, all listed scopes become available to your application through a token.

You can include OAuth in a new integration (or add it to an existing integration) on the [Marketplace][2] or [Integrations][3] page by following the steps below. For existing integrations, note that there's no need to change your `app_uuid` in the `manifest.json`. 

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

1. Navigate to the **OAuth & Permissions** tab under **Features** and click **New Confidential OAuth Client**.

   インテグレーション用に作成する OAuth クライアントは、クライアント ID とクライアントシークレットを提供する**機密クライアント**です。この段階で作成するクライアントはクライアントの非公開バージョンで、その資格情報を使ってテストを行うことができます。このクライアントの公開バージョンが作成された際には、新しい資格情報が付与されます。**この資格情報は、クライアント作成後は二度と表示されないため、必ず安全な場所に保管してください。**

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
OAuth クライアントが `api_keys_write` スコープをリクエストした場合、リクエストのヘッダーにトークンを含めて `marketplace_create_api` エンドポイントに正常にリクエストできることを確認します。

このリクエストに成功すると、[API Keys Management ページ][10] にある API キーが返されます。このキーは、ユーザーに代わって Datadog にデータを送信する際に使用するため、安全に保存する必要があります。**最初のリクエストのレスポンス後、この API キーの値に再度アクセスすることはできません**。

#### 複数の Datadog サイトをテストする
EU の Datadog サンドボックス組織から認可を要求して、OAuth クライアントが複数の [Datadog サイト][8]で機能することをテストします。
   1. 別のサイトのサンドボックスアカウントへのアクセス権がない場合は、`ecosystems@datadog.com` までご連絡ください。
   2. Developer Platform で作成したアプリに移動して **Documentation** の右にある歯車アイコンをクリックし、**Export App Manifest** をクリックして、*オリジナル*の US1 Datadog サイトの組織からアプリのマニフェストをエクスポートします。
   3. EU のサンドボックス組織で Developer Platform に移動して、手順 2 でエクスポートしたアプリのマニフェストをインポートします。
   4. マニフェストのインポートが完了したら、**OAuth & Permissions** タブに移動して、OAuth クライアントとそのクライアント ID およびクライアントシークレットを確認します。これらの資格情報を使用するように OAuth 実装を更新します。
   5. **Test Authorization** ボタンに移動し、それをクリックし、OAuth フローを進みます。

### すべてのスコープのデータフローを確認する
リクエストしたスコープごとに、データの送信、データの引き出し、データの編集ができることを確認します。

### OAuth クライアントを公開する

#### プルリクエストを作成または更新する
OAuth クライアントを公開するには、まず [`integrations-extras`][5] または [Marketplace][6] GitHub リポジトリで、インテグレーションのプルリクエストを開く必要があります (まだの場合)。

プルリクエストの一部として、以下の手順を実行します。

1. README ファイルを更新します。`## Setup` 内に `## Uninstallation` セクションとして次の指示を記入します (カスタムの指示を追加した場合は併せて記入)。
       - このインテグレーションがアンインストールされると、以前の認可はすべて取り消されます。 
       - さらに、[API Keys ページ][10]でインテグレーション名を検索して、このインテグレーションに関連するすべての API キーが無効になっていることを確認します。
2. `manifest.json` ファイルを更新して、この新しい `## Uninstallation` セクションを参照します。この参照は、サポートフィールドの直下に表示されるはずです。
       - ```
           "support": "README.md#Support",
           "uninstallation": "README.md#Uninstallation",
         ```

#### Developer Platform で公開プロセスを開始する

[Developer Platform][4] で公開プロセスを開始する方法

1. Navigate to the **Publishing** tab under **General**. At the top of this tab, you receive your published client ID and secret. Your OAuth implementation needs to be updated to include these client credentials. **Note:** Save your client ID and client secret in a secure location. This information is not shown again.

2. Under the Integration Publishing section, follow the steps to add your OAuth information to use below within your pull request. 

3. When opening a pull request for a **new integration** in `integrations-extras` or `Marketplace`, copy the `app_uuid` value under the Integration Publishing section and paste this within your manifest.json file under the `app_uuid` field. 

OAuth クライアントが公開のために送信されると、チームに通知されます。プルリクエストがすべての関係者によって承認され、マージできる状態になると、その時点で OAuth クライアントも公開されます。その後インテグレーションタイルは、(すべての顧客に対してではなく) サンドボックスアカウントに公開され、OAuth クライアントは、(サンドボックス組織だけではなく) Datadog のどの組織でも認可できるようになります。

この時点で Datadog は、OAuth クライアントで最終テストを行い、認可がスムーズに動作することを確認することをお勧めします。

#### クライアントを公開のために送信した後の変更

公開済みの OAuth クライアントを直接編集することはできませんので、全てのテストが完了し、準備が整った段階で公開フローを実行してください。公開のために送信された後に OAuth クライアントを更新するには、公開フローを再度実行し、再送信する必要があります。**公開済みクライアントの資格情報は再表示されません**。

インテグレーションタイルの公開とプルリクエストの作成の詳細については、[Marketplace と Integrations のドキュメント][7]を参照してください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog の OAuth 2.0][1]
- [OAuth で Datadog のインテグレーションを認可する][11]

[1]: https://docs.datadoghq.com/ja/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/ja/developers/integrations/marketplace_offering/#list-an-offering
[8]: https://docs.datadoghq.com/ja/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://www.datadoghq.com/blog/oauth/
[12]: https://docs.datadoghq.com/ja/api/latest/using-the-api/
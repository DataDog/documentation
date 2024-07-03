---
title: Add Azure accounts via the Cloudcraft API
---

Cloudcraft は現在、Web インターフェイスを使用して複数の Azure アカウントを一度に追加する方法を提供していませんが、これは [API][1] を介して可能です。

<div class="alert alert-info">Azure アカウントの追加とスキャン、および Cloudcraft の開発者 API の使用は、Pro 契約者のみが利用できます。詳しくは <a href="https://www.cloudcraft.co/pricing">Cloudcraft の料金ページ</a>をご覧ください。</div>

## 前提条件

始める前に、以下があることを確認してください。

- [オーナーまたは管理者ロール][2]を持つ Cloudcraft ユーザー。
- 有効な [Cloudcraft Pro サブスクリプション][3]。
- 適切な権限を持つ Azure アカウント。
- cURL がインストールされた Linux、macOS、または Windows 上の WSL など、Unix ライクな環境。
- コマンドラインインターフェイスの基本的な理解。
- API の使い方の基本的な理解。

また、Azure アカウントの **Application ID**、**Directory ID**、**Subscription ID**、**Client secret** が必要です。これらの値の場所については、[Cloudcraft で Azure アカウントを接続する][4]を参照してください。

## Azure アカウントの追加

Cloudcraft に Azure アカウントを追加するには、コマンドラインを開き、以下の cURL コマンドを入力します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/azure/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AZURE_ACCOUNT_NAME","applicationId": "APPLICATION_ID","directoryId": "DIRECTORY_ID","subscriptionId": "SUBSCRIPTION_ID","clientSecret": "CLIENT_SECRET"}'
{{< /code-block >}}

`_AZURE_ACCOUNT_NAME_` は Cloudcraft で設定したいアカウント名に、その他の値は実際の値に置き換えます。`_API_KEY_` は API キーに置き換えます。

アカウントの追加に成功したら、同じコマンドを使用して Cloudcraft に他のアカウントを追加できます。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: /ja/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
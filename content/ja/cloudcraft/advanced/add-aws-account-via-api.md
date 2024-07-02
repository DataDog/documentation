---
title: Add AWS accounts via the Cloudcraft API
---

Cloudcraft は現在、Web インターフェイスを使用して複数の AWS アカウントを一度に追加する方法を提供していませんが、これは [API][1] を介して可能です。

<div class="alert alert-info">AWS アカウントの追加とスキャン、および Cloudcraft の開発者 API の使用は、Pro 契約者のみが利用できます。詳しくは <a href="https://www.cloudcraft.co/pricing">Cloudcraft の料金ページ</a>をご覧ください。</div>

## 前提条件

始める前に、以下があることを確認してください。

- [オーナーまたは管理者ロール][2]を持つ Cloudcraft ユーザー。
- 有効な [Cloudcraft Pro サブスクリプション][3]。
- IAM ロールの作成権限を持つ AWS アカウント。
- cURL と [AWS CLI][4] がインストールされた Linux、macOS、または Windows 上の WSL など、Unix ライクな環境。
- コマンドラインインターフェイスの基本的な理解。
- API の使い方の基本的な理解。

## AWS IAM ロールパラメーターの取得

まずは Cloudcraft の API の [Get my AWS IAM Role パラメーター][5]エンドポイントを使用し、レスポンスを保存することから始めます。

そのためには、コマンドラインを開き、以下の cURL コマンドを入力します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account/iamParameters' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer ${API_KEY}"
{{< /code-block >}}

`API_KEY` を Cloudcraft の API キーに置き換えます。レスポンスは以下のようになります。

{{< code-block lang="json" filename="cloudcraft-response.json" >}}
{
  "accountId": "1234567890",
  "externalId": "ex53e827-a724-4a2a-9fec-b13761540785",
  "awsConsoleUrl": "https://console.aws.amazon.com/iam/home?#/roles..."
}
{{< /code-block >}}

次のステップで IAM ロールを作成する際に必要になるので、`accountId` フィールドと `externalId` フィールドのコピーを取っておきます。

## IAM ロールの作成

次に、AWS CLI で _create-role_ コマンドを使用して IAM ロールを作成します。

{{< code-block lang="shell" >}}
aws iam create-role \
  --role-name 'cloudcraft' \
  --description 'Programmatically created IAM role for use with Cloudcraft.' \
  --max-session-duration '3600' \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"arn:aws:iam::ACCOUNT_ID:root"},"Action":"sts:AssumeRole","Condition":{"StringEquals":{"sts:ExternalId":"EXTERNAL_ID"}}}]}' \
  --query 'Role.Arn' \
  --output 'text'
{{< /code-block >}}

`ACCOUNT_ID` と `EXTERNAL_ID` を前のステップで取得した値に置き換えます。

成功すると、ロールのアカウント ARN がレスポンスとして表示されます。この値は保存しておいてください。

しかし、このロールにはまだ権限が割り当てられていません。`ReadOnlyAccess` ロールを接続するには、AWS CLI で `attach-role-policy` コマンドを使用します。

{{< code-block lang="shell" >}}
aws iam attach-role-policy \
  --role-name 'cloudcraft' \
  --policy-arn 'arn:aws:iam::aws:policy/ReadOnlyAccess'
{{< /code-block >}}

**注**: 前のステップでロールに別の名前を付けた場合は、_cloudcraft_ を使用した名前に必ず置き換えてください。

## Cloudcraft への AWS アカウントの追加

最後に、IAM ロールを作成したら、AWS アカウントを Cloudcraft に追加できます。このためには、作成したロールの ARN を使って [Cloudcraft の開発者 API][7] を呼び出します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AWS_ACCOUNT_NAME","roleArn":"ROLE_ARN","region":"us-east-1"}' \
{{< /code-block >}}

`AWS_ACCOUNT_NAME` を Cloudcraft でアカウントに付けたい名前に、`ROLE_ARN` を前のステップで作成したロールの ARN に置き換えます。また、`us-east-1` はアカウントをチェックするリージョンに、`API_KEY` は API キーに置き換えます。

アカウントの追加に成功したら、同じコマンドを使用して Cloudcraft に他のアカウントを追加できます。

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/85-roles-and-permissions
[3]: https://www.cloudcraft.co/pricing
[4]: https://aws.amazon.com/cli/
[5]: https://developers.cloudcraft.co/#aa18999e-f6da-4628-96bd-49d5a286b928
[6]: https://app.cloudcraft.co/support
[7]: https://developers.cloudcraft.co

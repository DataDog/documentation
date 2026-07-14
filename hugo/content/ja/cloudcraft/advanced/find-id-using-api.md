---
title: クラウドアカウントまたはチーム ID を API を使用して見つける
---

## 概要

現在、Cloudcraft の UI では、AWS または Azure のアカウントやチームの ID を表示することはできません。しかし、API と少しの手作業を組み合わせることで、これらの ID を見つけることが可能です。

## 前提条件

始める前に、以下があることを確認してください。

- [オーナーまたは管理者ロール][1]を持つ Cloudcraft ユーザー。
- [Cloudcraft Pro のサブスクリプション][2]。
- cURL と [jq][3] がインストールされた Linux、macOS、または Windows 上の WSL など、Unix ライクな環境。
- コマンドラインインターフェイスの基本的な理解。
- API の使い方の基本的な理解。

また、Cloudcraft に少なくとも 1 つの AWS または Azure アカウントを追加しておく必要があります。

## クラウドアカウント ID の検索

AWS または Azure アカウントの ID を検索するのは簡単です。API 呼び出しを 1 回実行するだけで可能です。

クラウドアカウントの ID を検索するには、次のコマンドを実行します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq .
{{< /code-block >}}

`PROVIDER` を `aws` または `azure` に置き換え、`API_KEY` を Cloudcraft API キーに置き換えます。

AWS の場合、応答は次のようになります。

{{< code-block lang="json" filename="cloudcraft-aws-response.json" >}}
{
  "accounts": [
    {
      "id": "8bfc6773-7fa2-49b3-8016-5e0e9a2e2aff",
      "name": "Development",
      "roleArn": "arn:aws:iam::600111810075:role/cloudcraft",
      "externalId": "93cf2e38-742a-4321-bcee-1d8b8fe35b8b",
      "readAccess": null,
      "writeAccess": null,
      "createdAt": "2024-02-21T15:19:26.232Z",
      "updatedAt": "2024-02-21T15:19:26.701Z",
      "CreatorId": "f179a0f9-ebf6-4a6a-afd8-74d608498a1f",
      "source": "aws"
    }
  ]
}
{{< /code-block >}}

Azure の場合、応答は次のようになります。

{{< code-block lang="json" filename="cloudcraft-azure-response.json" >}}
{
  "accounts": [
    {
      "id": "e18da22b-330d-4091-bb57-c46654df5351",
      "name": "Development",
      "applicationId": "598c6f24-c2e2-4870-88bd-d42fe6f5c998",
      "directoryId": "c6444a86-1cfe-4312-add5-61e2c140648b",
      "subscriptionId": "74efa8fe-0997-49b0-963d-ea88bf80fe11",
      "readAccess": null,
      "writeAccess": null,
      "createdAt": "2023-11-20T22:11:43.688Z",
      "updatedAt": "2023-11-20T22:11:43.688Z",
      "CreatorId": "2d95eeb8-7161-48f8-88e4-8f0d6bb7b47f",
      "hint": "9NP",
      "source": "azure"
    }
  ]
}
{{< /code-block >}}

`id` フィールドには、クラウドアカウントの ID が含まれています。

## チーム ID の検索

Cloudcraft では、UI や単純な API 呼び出しではチーム ID を表示していません。しかし、Cloudcraft UI と API を組み合わせることで、チーム ID を見つけることができます。

チーム ID を検索するには、以下の手順に従ってください。

1. Cloudcraft UI を開き、新しい空のブループリントを作成します。
2. 右上の **Share & Export** ボタンをクリックします。
3. **Share with a team...** のフィールドをクリックし、ID を取得したいチームを選択します。

{{< img src="cloudcraft/advanced/find-id-using-api/share-with-team.mp4" alt="Cloudcraft ユーザーが Share & Export メニューから Datadog と Cloudcraft チームを選択する様子を示した短いビデオ。" video="true">}}

4. URL からブループリントの ID をコピーします。ID は、URL の `blueprint/` 以降の部分です。

5. ターミナルに切り替えて、次のコマンドを実行します。

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/blueprint/ID' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq '.readAccess'
{{< /code-block >}}

`ID` を作成したブループリントの ID に置き換え、`API_KEY` を Cloudcraft API キーに置き換えます。

応答は次のようになります。

{{< code-block lang="json" filename="cloudcraft-blueprint-response.json" >}}
[
  "team/9e7e8b46-cfb7-486e-ade5-bd8c1ec1971a",
  "team/af6b55f1-f604-4b88-8b4f-c4779cb7a799"
]
{{< /code-block >}}

`team/` の後の UUID がチームの ID です。

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://jqlang.github.io/jq/
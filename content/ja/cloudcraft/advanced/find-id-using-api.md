---
title: Find a Cloud Account or Team ID using our API
---

## 概要

Currently, the Cloudcraft UI doesn't expose the ID of your AWS or Azure accounts or teams. However, you can still find these IDs using our API and a bit of manual work.

## 前提条件

始める前に、以下があることを確認してください。

- [オーナーまたは管理者ロール][1]を持つ Cloudcraft ユーザー。
- A [Cloudcraft Pro subscription][2].
- A Unix-like environment, such as Linux, macOS, or WSL on Windows with cURL and [jq][3] installed.
- コマンドラインインターフェイスの基本的な理解。
- API の使い方の基本的な理解。

You must also have at least one AWS or Azure account added to Cloudcraft.

## Finding the cloud account ID

Finding the ID of your AWS or Azure account is easy; you can do it by making a single API call.

To find the ID of your cloud account, run the following command:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq .
{{< /code-block >}}

Replace `PROVIDER` with `aws` or `azure` and `API_KEY` with your Cloudcraft API key.

The response should look something like this for AWS:

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

And something like this for Azure:

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

The `id` field contains the ID of your cloud account.

## Finding the team ID

Cloudcraft doesn't expose the team ID in the UI or through a simple API call. However, you can still find the team ID by using the Cloudcraft UI in combination with the API.

To find the ID of your team, follow these steps:

1. Open the Cloudcraft UI and create a new empty blueprint.
2. Click the **Share & Export** button in the top-right corner.
3. Under **Share with a team...**, click the field and select the team or teams you want to get the ID for.

{{< img src="cloudcraft/advanced/find-id-using-api/share-with-team.mp4" alt="A quick video showing a Cloudcraft user selecting the Datadog and Cloudcraft teams from the Share & Export menu." video="true">}}

4. Copy the ID of the blueprint from the URL. The ID is the part of the URL that comes after `blueprint/`.

5. Switch to the terminal and run the following command:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/blueprint/ID' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq '.readAccess'
{{< /code-block >}}

Replace `ID` with the ID of the blueprint you created and `API_KEY` with your Cloudcraft API key.

The response should look something like this:

{{< code-block lang="json" filename="cloudcraft-blueprint-response.json" >}}
[
  "team/9e7e8b46-cfb7-486e-ade5-bd8c1ec1971a",
  "team/af6b55f1-f604-4b88-8b4f-c4779cb7a799"
]
{{< /code-block >}}

The UUID after `team/` is the ID of your team.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://jqlang.github.io/jq/

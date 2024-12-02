---
title: API를 사용하여 클라우드 계정 또는 팀 ID 찾기
---

## 개요

현재 Cloudcraft UI는 AWS 또는 Azure 계정이나 팀의 ID를 노출하지 않습니다. 그러나 API와 약간의 수동 작업을 통해 ID를 찾을 수 있습니다.

## 사전 필수 조건

시작하기 전에 다음이 있는지 확인하세요.

- [Owner 또는 Administrator 역할][1]을 가진 Cloudcraft 사용자.
- [Cloudcraft Pro 구독][2].
- cURL 및 [jq][3]가 설치된 Windows의 Linux, macOS 또는 WSL과 같은 Unix 계열 환경.
- 명령줄 인터페이스에 관한 기본 이해가 있어야 합니다.
- API 사용법에 관한 기본 이해가 있어야 합니다.

또한 Cloudcraft에 하나 이상의 AWS 또는 Azure 계정이 추가되어 있어야 합니다.

## 클라우드 계정 ID 찾기

AWS 또는 Azure 계정의 ID는 단일 API 호출을 통해 쉽게 찾을 수 있습니다.  

클라우드 계정의 ID를 찾으려면 다음 명령을 실행하세요.

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq .
{{< /code-block >}}

`PROVIDER`를 `aws` 또는 `azure`로 변경하고 `API_KEY`를 Cloudcraft API 키로 변경합니다.

AWS에 대한 응답은 다음과 같은 형태로 표시됩니다:

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

Azure의 경우 다음과 같습니다.

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

`id` 필드는 클라우드 계정 ID를 포함합니다.

## 팀 ID 찾기

Cloudcraft는 UI 또는 간단한 API 호출을 통해 팀 ID를 노출하지 않습니다. 그러나 API와 함께 Cloudcraft UI를 사용하면 팀 ID를 찾을 수 있습니다.

팀 ID를 찾으려면 다음 단계를 따르세요.

1. Cloudcraft UI를 열고 새로운 빈 블루프린트를 생성합니다.
2. 오른쪽 상단에서 **Share & Export** 버튼을 클릭합니다.
3. **Share with a team...**에서 필드를 클릭하고 ID를 얻으려는 팀을 선택합니다.

{{< img src="cloudcraft/advanced/find-id-using-api/share-with-team.mp4" alt="Share & Export 메뉴에서 Datadog 및 Cloudcraft 팀을 선택하는 Cloudcraft 사용자를 보여주는 영상." video="true">}}

4. URL에서 블루프린트의 ID를 복사합니다. ID는 `blueprint/` 뒤에 오는 URL의 일부입니다.

5. 터미널로 전환하고 다음 명령을 실행합니다.

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/blueprint/ID' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq '.readAccess'
{{< /code-block >}}

`ID`를 생성한 블루프린트의 ID로 변경하고 `API_KEY`를 Cloudcraft API 키로 변경합니다.

응답은 다음과 같은 형태로 표시됩니다:

{{< code-block lang="json" filename="cloudcraft-blueprint-response.json" >}}
[
  "team/9e7e8b46-cfb7-486e-ade5-bd8c1ec1971a",
  "team/af6b55f1-f604-4b88-8b4f-c4779cb7a799"
]
{{< /code-block >}}

`team/` 뒤의 UUID가 팀 ID입니다.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://jqlang.github.io/jq/
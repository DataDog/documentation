---
title: Cloudcraft API를 통해 AWS 계정 추가
---

Cloudcraft에서는 현재 웹 인터페이스를 사용해 여러 AWS 계정을 한번에 추가할 수 있는 방법이 없습니. 그러나 [API]를 통해 가능합니다.

<div class="alert alert-info">AWS 계정을 스캔하고 추가하는 기능과  Cloudcraft의 개발자 API를 사용하는 기능은 Pro 구독자만 사용할 수 있습니다. </a>Cloudcraft의 요금 페이지</a>에서 자세한 정보를 확인하세요.</div>

## 사전 필수 조건

시작하기 전에 다음이 있는지 확인하세요.

- Cloudcraft 사용자에게 [소유자 또는 관리자 역할][2]이 있습니다.
- [Cloudcraft Pro를 구독][3] 중입니다.
- AWS 계정에 IAM 역할 생성 권한이 있습니다.
- Linux, macOS, 또는 Windows의 WSL과 같은 Unix 계열 환경에 cURL과 [AWS CLI][4]가 설치되어 있어야 합니다.
- 명령줄 인터페이스에 관한 기본 이해가 있어야 합니다.
- API 사용법에 관한 기본 이해가 있어야 합니다.

## AWS IAM 역할 파라미터 얻기

Cloudcraft API의 [AWS IAM 역할 파라미터 얻기][5] 엔드포인트를 사용하고 응답을 저장하는 것부터 시작하세요.

이를 위해 명령줄을 열고 다음 cURL 명령을 입력합니다.

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account/iamParameters' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer ${API_KEY}"
{{< /code-block >}}

`API_KEY`를 내 Cloudcraft API 키로 변경합니다. 응답이 다음과 같이 나와야 합니다.

{{< code-block lang="json" filename="cloudcraft-response.json" >}}
{
  "accountId": "1234567890",
  "externalId": "ex53e827-a724-4a2a-9fec-b13761540785",
  "awsConsoleUrl": "https://console.aws.amazon.com/iam/home?#/roles..."
}
{{< /code-block >}}

다음 단계에서 IAM 역할을 생성할 때 필요하므로 `accountId` 및 `externalId` 필드의 사본을 저장합니다.

## IAM 역할 생성

AWS CLI에서 다음으로 _create-role_ 명령을 사용해 IAM 역할을 생성합니다.

{{< code-block lang="shell" >}}
aws iam create-role \
  --role-name 'cloudcraft' \
  --description 'Programmatically created IAM role for use with Cloudcraft.' \
  --max-session-duration '3600' \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"arn:aws:iam::ACCOUNT_ID:root"},"Action":"sts:AssumeRole","Condition":{"StringEquals":{"sts:ExternalId":"EXTERNAL_ID"}}}]}' \
  --query 'Role.Arn' \
  --output 'text'
{{< /code-block >}}

`ACCOUNT_ID` 및 `EXTERNAL_ID`를 이전 단계에서 얻은 값으로 변경합니다.

정상적으로 완료되면 역할의 계정 ARN 응답이 표시됩니다. 나중을 위해 저장해 두세요.

그러나 아직 역할에 권한이 연결되어 있지 않습니다. `ReadOnlyAccess` 역할을 연결하려면 AWS CLI에서 `attach-role-policy` 명령을 사용하세요.

{{< code-block lang="shell" >}}
aws iam attach-role-policy \
  --role-name 'cloudcraft' \
  --policy-arn 'arn:aws:iam::aws:policy/ReadOnlyAccess'
{{< /code-block >}}

**참고**: 이전 단계에서 역할에 다른 이름을 사용한 경우 _cloudcraft_를 내가 사용한 이름을 바꿔야 합니다.

## Cloudcraft에 AWS 계정 추가

IAM 역할을 생성한 후에는 Cloudcraft에 AWS 계정을 추가할 수 있습니다. 생성한 역할의 ARN을 사용하고 [Cloudcraft의 개발자 API][7]를 사용하면 됩니다.

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

`AWS_ACCOUNT_NAME`을 Cloudcraft 계정 이름으로 변경하고 `ROLE_ARN`을 이전 단계에서 생성한 역할의 ARN으로 변경합니다. `us-east-1`을 계정을 확인하기 원하는 리전으로 변경하고 `API_KEY`를 내 API 키로 변경합니다.

계정을 성공적으로 추가한 후, 같은 명령을 사용해 Cloudcraft에 계정을 더 추가할 수 있습니다.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/85-roles-and-permissions
[3]: https://www.cloudcraft.co/pricing
[4]: https://aws.amazon.com/cli/
[5]: https://developers.cloudcraft.co/#aa18999e-f6da-4628-96bd-49d5a286b928
[6]: https://app.cloudcraft.co/support
[7]: https://developers.cloudcraft.co
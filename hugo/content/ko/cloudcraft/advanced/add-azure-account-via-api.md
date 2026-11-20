---
title: Cloudcraft API를 통해 Azure 계정 추가
---

Cloudcraft에서는 현재 웹 인터페이스를 사용해 여러 Azure 계정을 한번에 추가할 수 있는 방법이 없습니다. 그러나 [API]를 통해 가능합니다.

<div class="alert alert-info">Azure 계정을 스캔하고 추가하는 기능과  Cloudcraft의 개발자 API를 사용하는 기능은 Pro 구독자만 사용할 수 있습니다. </a>Cloudcraft의 요금 페이지</a>에서 자세한 정보를 확인하세요.</div>

## 사전 필수 조건

시작하기 전에 다음이 있는지 확인하세요.

- Cloudcraft 사용자에게 [소유자 또는 관리자 역할][2]이 있습니다.
- [Cloudcraft Pro를 구독][3] 중입니다.
- 적절한 권한이 있는 Azure 계정
- cURL이 설치된 Windows의 Linux, macOS 또는 WSL과 같은 Unix 계열 환경.
- 명령줄 인터페이스에 관한 기본 이해가 있어야 합니다.
- API 사용법에 관한 기본 이해가 있어야 합니다.

또한 Azure 계정의 **애플리케이션 ID**, **디렉터리 ID**, **구독 ID**, **클라이언트 비밀** 정보가 있어야 합니다. 이와 같은 값을 찾으려면 [Azure 계정을 Cloudcraft와 연결하기][4]를 참고하세요.

## Azure 계정 추가

Cloudcraft에 Azure 계정을 추가하려면 명령줄을 열고 다음 cURL 명령을 입력합니다.

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

`_AZURE_ACCOUNT_NAME_`을 Cloudcraft에서 사용할 이름으로 교체하고, 다른 값은 실제 값으로 바꾸세요. `_API_KEY_`를 내 API 키로 변경하세요.

계정을 성공적으로 추가한 후, 같은 명령을 사용해 Cloudcraft에 계정을 더 추가할 수 있습니다.

[1]: https://developers.cloudcraft.co/
[2]: /ko/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: /ko/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
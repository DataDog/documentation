---
title: API 키 생성
---

Cloudcraft에는 [개발자 API][1]가 있어, 아키텍처 다이어그램에 프로그래밍 방식으로 액세스하고 원격 렌더링 기능을 제공합니다. 또 이 API는 Cloudcraft 계정과 연결된 AWS 및 Azure 계정을 즉시 사용 가능한 이미지 또는 JSON 데이터 형태로 완전히 자동화된 시각화를 제공합니다.

이 API를 사용하려면 인증이 필요합니다. 이 가이드에서는 웹 인터페이스를 통해 API 키를 생성하는 방법을 설명합니다.

<div class="alert alert-info">Cloudcraft 개발자 API는 Pro 구독자에게만 제공됩니다. 구독 플랜에 관한 자세한 내용은 <a href="https://www.cloudcraft.co/pricing">Cloudcraft 가격 페이지</a>를 참조하세요.</div>

## 사전 필수 조건

이 가이드는 다음을 가정합니다.

- [Owner 또는 Administrator 역할][2]이 있는 Cloudcraft 사용자
- [Cloudcraft Pro 구독][3] 

## API 키 생성

자동화를 위한 API 키를 생성하려면 **User** > **API keys**에서 **Create API key**를 클릭합니다.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-button.png" alt="'Create API key' 버튼에 초점이 맞춰진 API 키 관리 목적의 Cloudcraft 사용자 인터페이스 스크린샷." responsive="true" style="width:75%;">}}

키의 용도를 설명하는 이름을 지정하고(예: '자동화 키') 적절한 권한을 할당합니다. 이 키에 가장 적합한 권한을 선택하되, [최소 권한 원칙][4]을 따릅니다. 이 키에 대한 접근 권한을 팀에 부여할 때도 동일한 원칙이 적용됩니다.

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-window.png" alt="이름 지정 및 권한 설정을 위한 필드가 있는 Cloudcraft의 API 키 생성 인터페이스 스크린샷." responsive="true" style="width:100%;">}}

완료되면 **Save key**를 클릭하여 새 API 키를 생성합니다. 나중에 사용할 수 있도록 키를 안전한 곳에 보관하세요.

API 키 생성과 관련하여 궁금한 점이나 문제가 있는 경우 [앱 내 비콘을 통해 Cloudcraft 지원팀에 문의하세요][5].

[1]: /ko/cloudcraft/api/
[2]: /ko/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[5]: https://app.cloudcraft.co/support
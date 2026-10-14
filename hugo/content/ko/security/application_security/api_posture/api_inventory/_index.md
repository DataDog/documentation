---
aliases:
- /ko/security/application_security/api-inventory/
description: API 엔드포인트와 서비스를 목록화하고, 전체 환경에서 API 보안 위험을 평가하세요.
further_reading:
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: 블로그
  text: 주요 API 보안 위험을 완화하세요.
- link: https://www.datadoghq.com/blog/improve-api-authentication-detection-with-datadog/
  tag: 블로그
  text: Datadog으로 API 인증 탐지를 개선하세요.
title: API 인벤토리
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

[API Inventory][1]는 API Posture가 전체 환경에서 발견한 API 엔드포인트와 서비스의 지속적으로 업데이트되는 카탈로그입니다. 인증 상태, 공개 노출, 민감한 데이터 흐름, 관련 탐지 결과 등 각 엔드포인트에 대한 보안 컨텍스트를 보여줍니다.

인벤토리는 다음과 같은 두 개의 탐색기로 구성됩니다.

- **[API Endpoints][2]**: API Endpoints 탐색기는 개별 엔드포인트를 목록화하여 섀도우 API(문서화되지 않은 엔드포인트로, API 정의가 없으며 Amazon API Gateway에서 탐지되지 않음)와 고아 API(문서화되었으나 트래픽이 없는 엔드포인트)를 노출시키고, 가장 위험한 엔드포인트의 우선순위를 지정하는 데 도움을 줍니다.
- **[Services][3]**: 서비스 탐색기는 서비스별로 탐지 결과, 취약성, 런타임 신호를 집계하므로 각 서비스의 위험과 보안 범위를 평가할 수 있습니다.

이러한 엔드포인트의 취약점, 공격 또는 잘못된 구성을 탐지하고 대응하려면 [API Findings][4]를 사용하세요. API Endpoints 탐색기의 각 행에는 API Findings에서 관련 탐지 결과를 여는 탐지 결과 칩이 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /ko/security/application_security/api_posture/api_inventory/api_endpoints/
[3]: /ko/security/application_security/api_posture/api_inventory/services/
[4]: /ko/security/application_security/api_posture/api_findings/
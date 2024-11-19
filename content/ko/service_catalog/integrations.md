---
aliases:
- /ko/tracing/service_catalog/integrations
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: 설명서
  text: 서비스 정의 API에 대해 자세히 알아보기
- link: /integrations/opsgenie/
  tag: 설명서
  text: OpsGenie 통합에 대해 자세히 알아보기
- link: /integrations/pagerduty/
  tag: 설명서
  text: PagerDuty 통합에 대해 자세히 알아보기
title: 서비스 카탈로그를 통한 통합 사용
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
 서비스 카탈로그용 PagerDuty 및 OpsGenie 통합은  {{< region-param key=dd_datacenter code="true" >}} 사이트에서 지원되지 않습니다.
</div>
{{% /site-region %}}

## 개요

[Datadog 통합][10]에 대한 서비스 계정을 설정하면 통합의 메타데이터를 [서비스 카탈로그][9]에 있는 서비스 정의에 통합할 수 있습니다. 또한 [통합 개발 환경(IDE)]에서 서비스 정의를 편집할 때 자동 완성 및 유효성 검사 기능을 사용할 수도 있습니다(#ide-integrations).

## PagerDuty 통합

PagerDuty 메타데이터를 서비스에 추가하여 서비스 카탈로그에 대기 중인 사용자 및 서비스에 대한 활성 PagerDuty 인시던트가 있는지 여부와 같은 정보를 표시하고 정보에 대한 링크를 생성할 수 있습니다. 대기 중인 사용자는 한 명만 표시될 수 있으므로 Datadog는 에스컬레이션 수준별로 첫 번째 사용자를 선택한 다음 이메일 알파벳 순으로 다음 사용자를 선택합니다.

### 설정

PagerDuty 서비스 디렉토리][1]에 있는 서비스를 연결할 수 있습니다. 서비스 카탈로그에 있는 서비스 하나당 하나의 PagerDuty 서비스를 매핑할 수 있습니다.

1. 아직 설정하지 않았다면 [Datadog PagerDuty 통합][2]을 설정하세요.

2. [API 액세스 키][3] 설명서에 설명된 대로 PagerDuty API 액세스 키를 받으세요.

3. [Pagerduty 통합 설정][4]에서 API 액세스 키를 입력하여 설정을 완료합니다.

  {{< img src="tracing/service_catalog/pagerduty-token.png" alt="API 키를 복사하여 Pagerduty 설정에 붙여넣기" style="width:100%;" >}}

4. 서비스 정의를 PagerDuty 정보로 업데이트합니다. 예를 들어, 전체 [서비스 정의][5] 내에 다음 `integrations` 설정 줄을 전달합니다:

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## OpsGenie 통합

OpsGenie 메타데이터를 서비스에 추가하여 서비스 카탈로그에 대기 중인 사용자 등의 정보를 표시하고 이에 대한 링크를 생성할 수 있습니다.

### 설정

1. 아직 설정하지 않았다면 [Datadog OpsGenie 통합][12]을 설정하세요.
2. [API 키 관리][13] 문서에 설명된 대로 OpsGenie API 액세스 키를 받으세요. 이 API 키에는 **설정 액세스** 및 **읽기** 액세스 권한이 필요합니다.
3. [통합 타일][14] 하단의 **계정** 섹션에서 계정을 추가하고, OpsGenie API 액세스 키를 붙여넣은 다음, OpsGenie 계정에서 지역을 선택합니다.

   {{< img src="tracing/service_catalog/create_account1.png" alt="OpsGenie의 새 계정 만들기 워크플로 통합 타일" 스타일="width:80%;" >}}
   {{< img src="tracing/service_catalog/create_account2.png" alt="OpsGenie의 새 계정 만들기 워크플로 통합 타일" 스타일="width:80%;" >}}

4. 서비스를 Datadog 서비스와 연결하기 위해 OpsGenie 정보로 서비스 정의를 업데이트합니다. 예를 들어 전체 [서비스 정의][5] 내에 다음 `integrations` 설정 줄을 전달합니다:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

이 단계를 완료하면 서비스 카탈로그에 있는 서비스 의 **소유권** 탭 에 **대기 중** 정보 상자가 나타납니다.

{{< img src="tracing/service_catalog/oncall_information.png" alt="서비스 카탈로그의 OpsGenie에서 정보를 표시하는 대기 중 정보 상자" style="width:85%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /ko/integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /ko/tracing/service_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /ko/tracing/service_catalog/
[10]: /ko/integrations/
[11]: https://app.datadoghq.com/services
[12]: /ko/integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie
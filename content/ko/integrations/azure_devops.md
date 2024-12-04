---
categories:
- azure
- 협업
- 개발 툴
- 문제 추적
- 프로비저닝
- 소스 컨트롤
dependencies: []
description: 핵심 Azure DevOps 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_devops
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: 블로그
  text: Datadog CI 가시성으로 Azure 파이프라인 모니터링
- link: https://www.datadoghq.com/blog/azure-pipeline-testing-with-datadog-synthetic-monitoring/
  tag: 블로그
  text: Azure 파이프라인에서 Datadog 신서틱(Synthetic) 테스트 실행
- link: https://www.datadoghq.com/blog/monitor-azure-devops/
  tag: 블로그
  text: Datadog으로 Azure DevOps 워크플로우 및 파이프라인 모니터링
git_integration_title: azure_devops
has_logo: true
integration_id: azuredevops
integration_title: Microsoft Azure DevOps
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_devops
public_title: Datadog-Microsoft Azure DevOps 통합
short_description: 핵심 Azure DevOps 메트릭을 추적하세요.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

[Azure DevOps][1]는 조직에서 제품을 더 빠르게 생산 개발하는 데 활용할 수 있는 기능을 제공해 드립니다. 다음과 같이 Datadog을 Azure DevOps와 통합해 보세요.

- 풀 리퀘스트를 추적하고 여러 프로젝트에 병합합니다.
- 스택의 다른 데이터로 컨텍스트의 이벤트 빌드 밀 릴리즈를 모니터링합니다.
- 완료한 빌드 및 작업 항목의 기간을 추적합니다.
- 작업 항목과 업데이트를 계속 추적합니다.

## 설정

### 설치

Datadog에서 [Azure DevOps 통합 타일][2] 설치 버튼을 클릭합니다.

### 설정

Azure DevOps 서비스 이벤트 응답으로, 서비스 훅을 사용하여 Datadog에서 이벤트 및 메트릭을 생성합니다.

{{< img src="integrations/azure_devops/configure-service-hook.gif" alt="서비스 훅 설정" >}}

1. Azure에서 프로젝트의 서비스 훅 페이지로 이동합니다.
2. **구독 생성**을 클릭합니다.
3. Datadog 서비스를 선택합니다.
4. Visual Studio 이벤트 트리거를 설정합니다.
5. 필수 입력란에 [Datadog API 키][3]를 입력합니다.
6. Datadog 조직 사이트를 추가합니다: {{< region-param key="dd_site_name" code="true" >}}
7. 서비스 훅 구독을 테스트하고 마법사를 완료합니다. **참고**: 본 테스트는 API 키 또는 Datadog 조직 사이트의 유효성을 검사하지 않습니다.
8. Datadog으로 전송하려는 각 이벤트 유형에 대해 4 ~ 7단계를 반복 수행합니다. 모든 이벤트 유형을 허용합니다.

서비스 훅 구성 후 Datadog으로 이동하여 Azure DevOps 이벤트 및 메트릭을 확인합니다.

Azure 추가 참조 문서: [Datadog으로 Azure DevOps용 서비스 훅 및 TFS 생성하기][4]

#### 프로그래밍

Azure 설명서에 따라 [프로그래밍으로 서비스 훅 구독을 생성][5]하고 Datadog 엔드포인트를 사용합니다.

```text
https://{{< region-param key="dd_full_site" >}}/intake/webhook/azuredevops?api_key=<DATADOG_API_KEY>
```

### Azure 파이프라인에서 Datadog 모니터를 게이트로 사용

Datadog 모니터를 Azure 파이프라인에서 [릴리스 배포 컨트롤][6]용 게이트로 사용할 수도 있습니다. 본 옵션을 사용하면 Datadog이 서비스 이상 상태를 감지한 경우 문제가 되는 배포를 자동 중지합니다.

1. [배포 게이트용 Datadog 모니터링][7] 확장 프로그램을 Azure DevOps 조직에 추가합니다.

    {{< img src="integrations/azure_devops/extension-service-connection.gif" alt="서비스 연결 확장 프로그램" >}}

2. Azure DevOps에서 프로젝트 설정의 **서비스 연결**로 이동하여 **신규 서비스 연결**을 선택합니다.
3. 목록에서 Datadog을 선택하고 **다음**을 누릅니다.
4. 필드란에 사용하려는 계정의 Datadog API 키와 애플리케이션 키를 추가한 후, 이름과 설명을 입력하여 Azure DevOps에서 본 Datadog 계정을 식별하도록 설정합니다. 그런 다음 **저장**을 클릭합니다. 여러 Datadog 계정의 쿼리 모니터링이 필요하다면 서비스 연결을 추가할 수 있습니다.
5. **Azure 파이프라인**으로 이동하여 배포를 설정합니다. 해당 섹션에는 단계 사이에 배포 전 또는 후 조건을 추가할 수 있는 옵션이 있습니다. Datadog 모니터링을 추가할 지점을 선택한 후 **게이트**용 토글 스위치를 활성화합니다.
6. **추가**를 클릭한 후 **쿼리 Datadog 모니터링** 옵션을 선택합니다.
7. Datadog 서비스 연결을 선택한 다음 모니터링 ID와 사용하려는 심각도 임계값을 입력합니다. 심각도 임계값은 어떠한 작업이 실패했는지 보여주는 모니터링(`Alert` 또는 `Warning`)상태를 뜻합니다.

    {{< img src="integrations/azure_devops/datadog-monitor-gate.gif" alt="Datadog 모니터링 게이트" >}}

8. 배포 파이프라인에서 필요한 만큼 5 ~ 7단계를 반복하여 게이트를 추가합니다.

**참고**: 각 단계의 단일 서비스 상태의 일환으로, [컴포짓(composite) 모니터링][8]을 사용하여 파이프라인에서 게이트에 대한 다중 조건을 모니터링하세요.

소스 코드를 보려면 [Azure Devops 모니터링 게이트 확장 프로그램 리포지토리][9]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_devops" >}}


### 이벤트

Azure DevOps 통합 기능은 다음 [서비스 훅 이벤트 유형][11]을 지원합니다.

- 빌드 및 릴리스
- 작업 항목
- 코드


### 서비스 검사

Azure DevOps 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

### FAQ

#### 본 통합 기능으로 청구되는 추가 비용이 있나요?
본 통합 기능으로 생성된 메트릭 및 이벤트에는 추가 비용이 부과되지 않습니다.

#### Datadog은 해당 데이터를 얼마나 보관하나요?
본 통합으로 생성된 데이터는 Datadog의 다른 시계열 데이터와 유사하게 15개월 동안 보관됩니다.

#### 이벤트와 메트릭이 Datadog에 표시되는 데 얼마나 걸리나요?
총 레이턴시에는 여러 변수가 존재하나, 대부분 인시던트 발생 후 30초 이내에 Datadog에 이벤트 및 메트릭이 표시됩니다.

#### Datadog에서 Azure DevOps 이벤트와 메트릭으로 무엇을 할 수 있나요?
해당 이벤트와 메트릭은 Datadog에서 다른 이벤트 및 메트릭처럼 대시보드 구축, 모니터링 설정, 트러블슈팅과 같은 작업에 활용할 수 있습니다.

#### 빌드 기간 및 작업 항목 기간 관련 메트릭은 어떻게 생성하나요?
빌드 기간은 '_빌드 완료_(_build completed_ ) 이벤트'에서 빌드 시작 시점과 완료 시점 사이의 시간 차이(초 단위로 측정)를 계산하여 생성됩니다.

작업 항목 기간은 '_업데이트한 작업 항목_(_work item updated_) 이벤트'에서 `Done` 전환 시점과 작업 항목 생성 시점 사이의 시간 차이(시간 단위로 측정)를 계산하여 생성됩니다.

**참고**: `Done` 작업 항목이 다시 열리면, 차후 `Done`으로 전환 시 다른 데이터 포인트가 생성됩니다. 초기 데이터 포인트는 수정되지 않으며 신규 데이터 포인트는 작업 항목이 처음 생성된 시점을 기준으로 측정됩니다.

#### 서비스 훅 구독 테스트가 성공 메시지를 반환하는데 Datadog에 이벤트가 전송되지 않는 이유는 무엇인가요?
서비스 훅 구독 기능은 Azure DevOps가 이벤트를 Datadog으로 전송할 수 있는지 여부만 점검합니다. API 키 또는 Datadog 조직 사이트(미국 또는 EU)의 유효성은 검사하지 않습니다. API 키와 사이트 정보가 올바른지 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?toc=%2Fazure%2Fdevops%2Fget-started%2Ftoc.json&view=azure-devops
[2]: https://app.datadoghq.com/integrations/azuredevops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/services/datadog?view=azure-devops
[5]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/create-subscription?view=azure-devops
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/release/approvals/gates?view=azure-devops
[7]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-monitors
[8]: /ko/monitors/monitor_types/composite/
[9]: https://github.com/DataDog/azure-devops-monitor-gate-extension
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_dev_ops/azure_dev_ops_metadata.csv
[11]: https://docs.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#available-event-types
[12]: https://docs.datadoghq.com/ko/help/
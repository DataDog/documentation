---
description: 통합을 위한 모니터를 만드는 방법에 대해 알아보세요.
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: 설명서
  text: 모니터 설정
title: 통합 권장 모니터 만들기
---
## 개요

주요 메트릭을 추적하는 [Datadog 모니터][1]를 통해 인프라스트럭처 및 통합을 효율적으로 모니터링할 수 있습니다. Datadog은 다양한 기능과 통합에 대한 즉시 사용 가능한 모니터 세트를 제공합니다. [모니터 템플릿 목록][2]에서 다양한 모니터를 확인하세요.

사용자가 Datadog 통합을 가장 유용하게 사용할 수 있도록 즉시 사용 가능한 모니터를 만듭니다. 이 가이드에서는 통합 권장 모니터를 생성하는 단계와 생성 프로세스 중에 따라야 할 모범 사례를 제공합니다.

Datadog 통합을 생성하려면 [새 통합 생성][3]을 참조하세요.

## 권장 모니터를 만드는 단계
### 모니터 JSON Schema 구축

1. **[Monitors > New Monitor][4]**로 이동하여 새 모니터를 만듭니다.

2. 이 가이드에 나와 있는 [모범 사례](#configuration-best-practices)에 따라 모니터를 설정합니다.

3. **Export Monitor**를 클릭합니다.

4. **Select to export as a recommended monitor**에 체크 표시합니다.
    {{< img src="developers/integrations/monitor_json.png" alt="권장 모니터로 내보낼 모니터 JSON 모달" style="width:100%;" >}}

5. 설정된 모니터의 JSON 스키마를 사용하려면 **Copy**를 클릭합니다.

6. 복사된 스키마를 JSON 파일에 저장하고 모니터 제목에 따라 이름을 지정합니다. 예: `your_integration_name_alert.json`

7. 모니터 JSON 파일에서 제목, 설명, 태그를 작성합니다. 자세한 내용은 [설정 모범 사례](#configuration-best practices)를 참조하세요.

### 풀 리퀘스트 열기

1. 모니터 JSON 파일을 해당 통합의 `assets/monitors` 폴더에 저장한 다음 에셋을 `manifest.json` 파일에 추가합니다. 통합의 파일 구조 및 매니페스트 파일에 대한 자세한 내용은 [통합 에셋 참조][5]를 확인하세요.

2. 풀 리퀘스트(PR)를 열어 [`integrations-extras` GitHub 저장소][6] 또는 [`Marketplace` GitHub 저장소][9]에서 권장 모니터 JSON 파일과 업데이트된 매니페스트 파일을 해당 통합 폴더에 추가합니다.

3. 승인된 후 Datadog은 PR을 병합하고 통합 권장 모니터는 프로덕션에 푸시됩니다.

## 프로덕션 환경에서 모니터 확인

즉시 사용 가능한 모니터를 보려면 관련 통합 타일이 Datadog에서 `Installed` 상태여야 합니다.

[모니터 템플릿 목록][2]에서 모니터를 찾습니다. 모니터 템플릿 목록 페이지에 로고가 올바르게 렌더링되었는지 확인합니다.

## 설정 모범 사례

권장 모니터에는 모니터 정의 외에 [제목](#title), [설명](#description), 태그 필드가 필요합니다. 태그를 "통합:<app_id>"으로 설정하세요. 사용 가능한 다른 모니터 태그는 [여기][8]에서 확인하시고, 자세한 내용은 [모니터 설정][7] 문서를 참조하세요.

### 타이틀

제목을 통해 사용자는 경고가 다루는 기본 오류 모드를 빠르게 이해할 수 있습니다.
- 능동태를 ​​사용하며, 목적어로 시작하고 뒤에 동사가 옵니다.
- 템플릿 변수를 사용하지 마세요.

| 수정 필요                                       | 더 나음                                 | 가장 적합                                        |
| -----------                                          | -----------                            | -----------                                 |
|{{host.name}}에 미확인 메시지가 많이 보고됨| 미확인 메시지가 많이 보고됨  |미확인 메시지가 평소보다 많음|

### 설명

오류 모드와 이 모드가 시스템에 미칠 수 있는 영향에 대해 추가 컨텍스트를 제공합니다. 이를 통해 사용자는 해당 모드가 모니터를 만들기에 적합한지 아닌지 한눈에 파악할 수 있습니다.

- 이것은 제목의 사본이 아닙니다.
- 제목에 명시된 문제를 정의하세요.
- 이 문제가 왜 경고할 가치가 있는 지 답변하세요.
- 문제의 영향에 대해 설명하세요.

| 수정 필요                                         | 더 나음                                       | 가장 적합                                    |
| -----------                                          | -----------                                  | -----------                             |
|미확인 메시지가 많을 때 팀에 알립니다. | 미확인 메시지는 소비자에게 전달되었으나 처리 또는 처리된 것으로 확인되지 않은 메시지입니다. 이 모니터는 미확인 메시지의 비율을 추적합니다.|미확인 메시지는 소비자에게 전달되었으나 처리 또는 처리된 것으로 확인되지 않은 메시지입니다. 이 모니터는 메시지 처리가 지연되는 잠재적인 병목 현상을 방지하기 위해 확인되지 않은 메시지의 비율을 추적합니다.| 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/monitors/
[2]: https://app.datadoghq.com/monitors/recommended
[3]: https://docs.datadoghq.com/ko/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/monitors/create
[5]: https://docs.datadoghq.com/ko/developers/integrations/check_references/#manifest-file
[6]: https://github.com/DataDog/integrations-extras
[7]: https://docs.datadoghq.com/ko/monitors/configuration/
[8]: https://docs.datadoghq.com/ko/monitors/manage/#monitor-tags
[9]: https://github.com/DataDog/marketplace
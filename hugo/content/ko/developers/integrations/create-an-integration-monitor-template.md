---
aliases:
- /ko/developers/integrations/create-an-integration-recommended-monitor
description: 통합에서 사용할 모니터를 만들어 보세요.
further_reading:
- link: https://docs.datadoghq.com/monitors/configuration/
  tag: 설명서
  text: 모니터 설정
title: 통합 모니터 템플릿 만들기
---
## 개요

이 가이드에서는 모니터 템플릿을 만드는 단계와 생성 과정에서 따라야 할 모범 사례를 알아봅니다.

[Datadog Monitors][1]는 주요 메트릭을 추적하여 인프라와 통합을 효율적으로 모니터링할 수 있도록 지원합니다. Datadog은 다양한 기능과 통합에 대한 기본 제공 모니터 세트를 제공합니다. [Monitors Template 목록][2]에서 확인해 보세요.

사용자가 Datadog 통합의 가치를 쉽게 파악할 수 있도록 기본 제공 모니터를 만듭니다. Datadog 통합을 생성하려면 [새 통합 생성][3]을 참고하세요.

## 모니터 생성
Datadog 샌드박스에서 모니터를 생성합니다.

{{< img src="developers/integrations/new_monitor.png" alt="Datadog의 Monitors Template 목록" style="width:100%;" >}}


이 가이드에 안내된 [모범 사례](#configuration-best-practices)를 따라 모니터를 구성하세요.

## 모니터 업로드하기
Integration Developer Platform의 통합 내에서 Content 탭으로 이동합니다. 여기에서 **import monitor**를 선택하여 사용 가능한 모니터 목록에서 원하는 모니터를 선택합니다. 통합에 포함할 모니터는 최대 10개까지 선택할 수 있습니다.

{{< img src="developers/integrations/content_tab.png" alt="Integration Developer Platform의 Content 탭" style="width:100%;" >}}


## 운영 환경에서 모니터 확인

기본 제공 모니터를 확인하는 방법:
1. Monitor Template 목록에서 탐지 규칙을 찾아 클릭해서 확장합니다.
2. 로고가 올바르게 표시되는지 확인합니다.
3. 모니터가 활성화되어 있는지 확인합니다.

[Monitors Template 목록][2]에서 해당 모니터를 찾고 Monitors Template 목록 페이지에서 로고가 올바르게 표시되는지 확인합니다.

## 구성 모범 사례

모니터 정의 외에도 모니터 템플릿에는 [Title](#title), [Description](#description), Tags 필드가 필요합니다. 태그를 "integration:<app_id>"으로 설정하고, 사용 가능한 다른 모니터 태그는 [여기][8]에서 확인하세요. 자세한 내용은 [모니터 구성][7] 문서를 참고하세요.

### 타이틀

제목을 통해 사용자는 경고가 다루는 근본적인 실패 유형을 빠르게 이해할 수 있습니다.
- 능동태를 ​​사용하고 목적어로 시작하며 그 뒤에 동사가 오도록 합니다.
- 템플릿 변수를 사용하지 않습니다.

| 수정 필요                                       | 개선된 버전                                 | 권장 버전                                        |
| -----------                                          | -----------                            | -----------                                 |
|{{host.name}}에서 미확인 메시지가 많이 보고됨| 보고된 미확인 메시지 수 많음  |미확인 메시지가 평소보다 많음|

### 설명

실패 모드와 이 모드가 시스템에 미치는 영향에 대한 추가적인 맥락을 제공합니다. 이를 통해 사용자가 실패 모드에 대한 모니터 필요 여부를 한눈에 파악할 수 있도록 합니다.

- 제목의 사본이 아니어야 합니다.
- 제목에 명시된 문제를 정의합니다.
- 왜 경고해야 할 문제인지 설명합니다.
- 문제가 미치는 영향을 설명합니다.

| 수정 필요                                         | 개선된 버전                                       | 권장 버전                                    |
| -----------                                          | -----------                                  | -----------                             |
|미확인 메시지가 많을 때 팀에 알립니다. | 미확인 메시지는 소비자에게 전달되었지만 처리된 것으로 확인되지 않은 메시지입니다. 이 모니터는 미확인 메시지의 비율을 추적합니다.|미확인 메시지는 소비자에게 전달되었지만 처리된 것으로 확인되지 않은 메시지입니다. 모니터는 메시지 처리 지연을 일으킬 잠재적 병목 현상을 방지하기 위해 미확인 메시지의 비율을 추적합니다.| 

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
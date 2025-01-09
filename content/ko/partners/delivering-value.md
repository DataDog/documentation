---
description: Datadog로 데이터가 전송되기 시작하면 실행해야 할 단계
private: true
title: 가치 제공하기
---

데이터 수집을 설정한 후, 클라이언트에게 최대로 가치를 제공하기 위해 실행할 수 있는 추가 단계가 몇 가지 있습니다. 초점을 맞춰야 할 핵심 영역은 다음과 같습니다.

## 모니터와 다운타임 설정하기

모니터와 알림을 통해 조사와 개입이 필요한 특정 시스템과 서비스를 살펴볼 수 있습니다. Datadog에서는 다음 알림을 생성할 수 있습니다.
- 모니터 - 알림 조건 정의
- 다운타임 - 알림을 보내거나 취소할 기간

모니터 개념과 친숙해지려면 다음 리소스를 참고하세요.
- [알림][1]
- [모니터링 101 - 중요한 사항 알림][2](블로그)
- [모니터링 소개][3](교육)

### 모니터 마이그레이션하기

서비스 공급자가 다른 모니터링이나 가시화 플랫폼에서 Datadog로 마이그레이션해야 할 경우가 자주 있습니다. 이 때 이전 솔루션에서 Datadog로 모니터를 그대로 복제하면 된다고 생각하는 경우가 많습니다. 그러나 이 방법으로는 유용한 Datadog 기능을 활용하지 못할 수 있습니다. 특히 문제를 더 빨리 감지하고 문제 해결 시간 및 알림 피로를 줄일 수 있는 기능을 자칫 놓칠 수 있습니다.

마이그레이션 프로젝트를 시작하기 전에 기존 알림과 임계값 정의를 재확인하고 다음 질문에 답해보세요.
- 메트릭에 시간 기반 변수가 있나요? [이상 값 모니터][4]가 좋은 대안이 될 수 있습니다.
- 메트릭에 로드 기반 변수가 있나요? 로드 표시 메트릭과 메트릭을 조합해 [산술 모니터][5]를 사용하는 것을 추천합니다. 예를 들어 서비스를 사용하는 사용자가 많으면 시스템 로드가 더 많아질 수 있습니다.
- 메트릭 절대값보다 변화율이 더 중요하나요? [변화 모니터][6]이나 [예측 모니터][7]가 좋은 방법이 될 수 있습니다.
- 메트릭 자체 값보다 다른 호스트나 엔터티 값과 다르다는 점이 더 중요하나요? 예를 들어 클러스터에 있는 노드 하나가 다른 노드에 비해 대기 시간이 더 긴가요? 이 경우 [이상값 모니터][8]를 사용하면 좋습니다.
- 여러 메트릭을 조합해야만 조치할 상황이 보이나요? [복합 모니터][9]을 통해 스크립팅 없이 문제를 해결할 수 있습니다.

### 프로그래밍 방식 모니터 관리

서비스 공급자는 다음 중 하나의 방법으로 프로그래밍 방식을 통해 사용자와 클라이언트의 모니터를 최적으로 관리할 수 있습니다.
- [Datadog 모니터 API][10]
- Terraform
  - [Terraform으로 Datadog 리소스 관리하는 방법][11](비디오)
  - [Terraform Datadog 공급자로 모니터링 자동화하기][12](HashiCorp 튜토리얼)

[모니터를 태그][13]해 대량의 모니터도 쉽게 관리할 수 있도록 하세요.

### 추천 모니터

클라이언트가 사용하는 기술이 내게 익숙지 않은 것일 수 있습니다. Datadog에서는 [추천 모니터][14]를 통해 새 기술을 빠르고 자신 있게 습득할 수 있도록 돕습니다.

모니터에 대해 더 알아보려면 다음을 참고하세요.
- [모니터 관리][15]
- [모니터][16]
- [태그 값으로 동적 알람 생성하기][17](비디오)
- [모니터 설정 변경 사항이 적용되지 않음][18]

### 다운타임<br>

모니터와 알림과 관련한 가장 일반적인 문제는 알림 피로입니다. 알림 피로는 알람이나 알림이 너무 많아서 알람을 무시하게 되는 현상을 뜻합니다. 알림 피로를 줄이는 방법의 하나는 가양성 알람 수를 제한하는 것입니다. 계획된 시스템 중단, 유지보수, 또는 Windows 업그레이드와 같은 통제된 환경일 경우 특히 이 방법을 사용하는 것이 좋습니다.

Datadog의 다운타임을 이용하면 계획된(또는 일시적인) 유지보수가 진행되는 동안 모니터 알림을 음소거할 수 있습니다.

다운타임 관리, 특히 프로그래밍 방식의 다운타임 관리에 대해 더 알아보려면 다음을 참고하세요.
- [다운타임][19]
- [계획된 다운타임 동안 Datadog 알림 음소거하기][20](블로그)
- [Terraform으로 Datadog 관리하기][21](블로그)
- [다운타임 API][22]
- [다운타임 상태인 모니터 알림 예방하기][23]

### 알림

다음은 알림과 관련한 일반 지침입니다.
- 알림은 많이 보내되 호출은 변별력 있게
- 원인이 아니라 증상에 따라 호출

Datadog에서는 다양한 채널을 통해 중요한 알림을 사용자와 클라이언트에게 보냅니다.

- 이메일 알림
- 다음 통합에서 알림:
  - [Slack][24]
  - [PagerDuty][25]
  - [Flowdock][26]
  - [ServiceNow][27]
  - [Google Chat][28]
  - [Microsoft Teams][29]
  - [그 외 기타][19]

또한 일반 [Webhooks 통합][30]을 사용해 REST API를 호출할 수 있습니다. Webhooks 통합은 사용자에게 알림을 보낼 때 사용할 뿐만 아니라 자동 수정 워크플로우를 트리거할 때도 사용할 수 있습니다.

알림에 관해 더 알아보려면 다음을 참고하세요.
- [알림][31]
- [Webhooks와 Twilio로 SMS 알림 보내기][32](블로그)

## 대시보드로 가시화 설정하기

복잡한 기술 스택과 수집 중인 다양한 메트릭과 이벤트를 가시화하면 정보를 명확히 얻을 수 있습니다. 이에 따라 모니터로 발견한 잠재적인 문제를 조사할 때 대시보드에서 시작하면 좋습니다. 

### 기본 제공 대시보드

에이전트나 클라우드 통합이 설정되면 Datadog에서 자동으로 새 통합 서비스와 기술의 기본 제공 대시보드가 활성화되어 즉각적으로 유용한 인사이트를 얻을 수 있습니다. 또 기본 제공 대시보드를 복제해 커스텀 대시보드를 만들 수 있습니다.

### 커스텀 대시보드 구축하기

비즈니스 관점을 두드러지게 하는 추가 값을 넣어 경쟁사와 차별화하고 여러 페르소나에 맞출 수 있습니다.

다음은 대시보드를 구축할 때 고려할 대시보드 모범 사례이니 참고하세요.
- 리소스 메트릭을 많이 사용하기보다는 작업 메트릭에 초점을 맞추세요. 이 차이에 대해 이해하려면 [모니터링 101: 올바른 데이터 수집하기][33](블로그)를 참고하세요.
- [이벤트 오버레이][34]를 사용해 메트릭과 이벤트의 상관 관계를 확인하세요.
- 대시보드에 [자유 형식 텍스트 정보][35]로 주석을 달아 표시된 데이터가 무엇인지, 대시보드에 문제가 나타났을 때 어떻게 조치할 지를 남기세요.

대시보드에 대해 더 알아보려면 다음을 참고하세요.
- [더 나은 대시보드 구축하기][36](교육)
- [Datadog Notebooks][37] 기능을 사용해 데이터를 실험적으로 수집하고 대시보드를 만들어 보세요.
- [Datadog로 데이터센터와 네트워크 모니터링하기][38](블로그)
- [연결된 템플릿 변수 사용하기][39](블로그)
- [Datadog 대시보드 API][40]
- [Terraform 및 Datadog를 사용해 코드로 가시성 구성하기][41](HashiCorp 웨비나)

### Datadog에 접근할 수 없는 사용자를 위해 가시화하기

비즈니스 모델에 따라 클라이언트가 Datadog에 접근할 수 없는 경우가 있습니다. 이런 클라이언트에게 Datadog 가시화 정보를 제공하고 싶을 경우, 다음 Datadog 가시화 옵션 중 하나를 선택할 수 있습니다.
- [대시보드 공유][42]: 읽기 전용 대시보드의 공용 URL을 공유하거나 개인 이메일 주소를 사용해 개인적으로 대시보드를 공유해 클라이언트에게 상태 페이지를 제공할 수 있습니다.
  - 서비스 공급자는 비즈니스 확장성을 갖춰야 합니다. [Datadog의 API를 사용해 공유된 대시보드를 관리][40]하는 것이 가장 효과적인 방법입니다.
- 임베드할 수 있는 그래프: Datadog 정보를 보여주고 싶은 클라이언트 포털이 있을 경우, 임베드할 수 있는 그래프를 사용할 수 있습니다. 파라미터를 사용해 필요한 데이터를 필터링할 수 있습니다. 자세한 정보는 다음을 참고하세요.
  - [임베드할 수 있는 그래프 API][43]
  - [템플릿 변수가 있고 임베드할 수 있는 그래프][44]

### 서비스 수준 목표 설정하기

클라이언트에게 서비스 품질과 수준을 지속적이고 투명하게 보여 주는 것이 좋습니다. 서비스 수준 목표(SLO)는 클라이언트 대신 서비스 품질을 모니터링 및 가시화해주고, 클라이언트가 서비스 수준 기반의 내부 보고를 구현하도록 도와줍니다.

다음은 SLO를 설정하고 관리할 때 도움이 되는 자료입니다.
- 시작하려면 [서비스 수준 목표 101: 효과적인 SLO 수립][45](블로그)를 참고하세요.
- [SLO 체크리스트][46]
- [Datadog로 SLO 관리하기 모범 사례][57](블로그)
- [Datadog에서 SLO 상태 모두 추적하기][48](블로그)
- [Datadog SLO API][49]

## Watchdog 사용하기

Watchdog는 애플리케이션과 인프라스트럭처의 잠재적 문제를 자동으로 감지하는 알고리듬 기능입니다.

사용자나 클라이언트가 Watchdog 모니터를 설정하면 새 이상 신호가 감지될 때 알림을 받을 수 있습니다.

자세한 정보는 [Watchdog][50]을 참고하세요.

## 다음 단계

[빌링 및 사용량 보고][51]를 통해 여러 조직 계정 설정에서 개별 클라이언트 및 Datadog 플랫폼 사용량 합계를 모니터링하는 방법을 알아보세요.

[1]: /ko/monitors
[2]: https://www.datadoghq.com/blog/monitoring-101-alerting/
[3]: https://learn.datadoghq.com/courses/introduction-to-observability
[4]: /ko/monitors/types/anomaly/
[5]: /ko/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[6]: /ko/monitors/types/metric/?tab=change
[7]: /ko/monitors/types/forecasts/?tab=linear
[8]: /ko/monitors/types/outlier/?tab=dbscan
[9]: /ko/monitors/types/composite/
[10]: /ko/api/latest/monitors/
[11]: https://www.youtube.com/watch?v=Ell_kU4gEGI
[12]: https://learn.hashicorp.com/tutorials/terraform/datadog-provider
[13]: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
[14]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[15]: /ko/monitors/manage/
[16]: /ko/monitors/
[17]: https://www.youtube.com/watch?v=Ma5pr-u9bjk
[18]: /ko/monitors/guide/why-did-my-monitor-settings-change-not-take-effect/
[19]: /ko/monitors/downtimes/
[20]: https://www.datadoghq.com/blog/mute-datadog-alerts-planned-downtime/
[21]: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
[22]: /ko/api/latest/downtimes/
[23]: /ko/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
[24]: /ko/integrations/slack/?tab=slackapplication
[25]: /ko/integrations/pagerduty/
[26]: /ko/integrations/flowdock/
[27]: /ko/integrations/servicenow/
[28]: /ko/integrations/google_hangouts_chat/
[29]: /ko/integrations/microsoft_teams/
[30]: /ko/integrations/webhooks/
[31]: /ko/monitors/notify/
[32]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/
[33]: https://www.datadoghq.com/blog/monitoring-101-collecting-data/
[34]: /ko/dashboards/widgets/timeseries/
[35]: /ko/dashboards/widgets/free_text/
[36]: https://learn.datadoghq.com/courses/building-better-dashboards
[37]: /ko/notebooks/
[38]: https://www.datadoghq.com/blog/network-device-monitoring/
[39]: https://www.datadoghq.com/blog/template-variable-associated-values/
[40]: /ko/api/latest/dashboards/
[41]: https://www.hashicorp.com/resources/configure-observability-as-code-with-terraform-and-datadog
[42]: /ko/dashboards/sharing/
[43]: /ko/api/latest/embeddable-graphs/
[44]: /ko/dashboards/guide/embeddable-graphs-with-template-variables/
[45]: https://www.datadoghq.com/blog/establishing-service-level-objectives/
[46]: /ko/service_management/service_level_objectives/guide/slo-checklist
[47]: https://www.datadoghq.com/blog/define-and-manage-slos/
[48]: https://www.datadoghq.com/blog/slo-monitoring-tracking/
[49]: /ko/api/latest/service-level-objectives/
[50]: /ko/monitors/types/watchdog/
[51]: /ko/partners/billing-and-usage-reporting/
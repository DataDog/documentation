---
title: API 사용
type: api
---

{{< h2 >}}API 사용{{< /h2 >}}

Datadog HTTP API를 사용해 프로그래밍 방식으로 Datadog 플랫폼에 액세스합니다. API를 사용하여 Datadog에 데이터를 전송하고, 데이터 시각화 자료를 만들고, 계정을 관리합니다.

{{< h2 >}}Datadog에 데이터 전송{{< /h2 >}}

API를 사용해 통합 데이터를 Datadog에 전송합니다. 또한 에이전트 추가 설정을 통해 API를 사용하여 신서틱(Synthetic) 테스트 데이터, 로그, 트레이스를 Datadog에 전송할 수 있습니다. 

**통합 엔드포인트**

사용 가능한 통합 엔드포인트:

- [AWS 통합][1]
- [AWS 로그 통합][2]
- [Azure 통합][3]
- [Google Cloud 통합][4]
- [Slack 통합][5]
- [PagerDuty 통합][6]
- [Webhooks 통합][7]

**플랫폼 엔드포인트**

이러한 엔드포인트를 사용하여 Datadog 플랫폼 다른 부분과 데이터를 주고받을 수 있습니다.

- [메트릭][8] 엔드포인트를 사용하면 [메트릭][9] 데이터를 게시하여 Datadog 대시보드에서 그래프화하고 어느 기간에 대해서나 메트릭을 쿼리할 수 있습니다.
- [이벤트][10] 엔드포인트를 통해 [Datadog 이벤트 탐색기][11]에서 이벤트를 주고받을 수 있습니다.
- [신서틱(Synthetic) 모니터링][12] 엔드포인트를 사용해 [신서틱 테스트][13] 결과를 생성, 시작, 중단 및 확인할 수 있습니다.
- [추적 에이전트 API][14]를 사용해 Datadog 에이전트에 트레이스를 전송한 다음 Datadog에 전달할 수 있습니다. 

{{< h2 >}}데이터 시각화{{< /h2 >}}

Datadog에 데이터를 전송하면 API를 사용해 프로그래밍 방식으로 데이터 시각화를 구축할 수 있습니다.

- [대시보드][15] 구축 및 [대시보드 목록][16] 보기
- [호스트 태그][17] 관리
- [내장 가능한 그래프][18] 생성
- [그래프 스냅샷][19] 찍기
- [서비스 종속성][20] - APM 서비스 및 종속성 목록을 확인합니다.
- [모니터][21] 생성
- [서비스 확인][22] - 모니터와 함께 사용할 수 있도록 상태를 사후 점검합니다.
- [로그][23] 생성 및 관리, [로그 인덱스][24] 및 [로그 파이프라인][25]
- 조직을 위한 [호스트][17] 정보 받기
- [서비스 수준 목표(Service Level Objectives][26] 생성 및 관리
- [보안 모니터링][27] 신호 생성

{{< h2 >}}계정 관리{{< /h2 >}}

또한 Datadog API를 사용하여 프로그래밍 방식으로 계정을 관리할 수 있습니다.

- [사용자][28] 관리
- [역할][29] 관리
- [조직][30] 관리
- [인증][31] 엔드포인트를 통해 API와 앱 키 확인
- [로그 제한 쿼리][32]를 통해 특정 로그 액세스 허용
- [키 관리][33]을 통해 기존 키 관리
- [사용량 측정][34] 엔드포인트를 통해 Datadog 구성 요소에 대한 시간별, 일별, 월별 사용량 받기
- [IP 범위][35]를 통해 Datadog에 속한 IP 접두사 목록 보기


[1]: /ko/api/v1/aws-integration/
[2]: /ko/api/v1/aws-logs-integration/
[3]: /ko/api/v1/azure-integration/
[4]: /ko/api/v1/gcp-integration/
[5]: /ko/api/v1/slack-integration/
[6]: /ko/api/v1/pagerduty-integration/
[7]: /ko/api/v1/webhooks-integration/
[8]: /ko/api/v1/metrics/
[9]: /ko/metrics/introduction/
[10]: /ko/api/v1/events/
[11]: /ko/events/
[12]: /ko/api/v1/synthetics/
[13]: /ko/synthetics/
[14]: /ko/tracing/guide/send_traces_to_agent_by_api/
[15]: /ko/api/v1/dashboards/
[16]: /ko/api/v1/dashboard-lists/
[17]: /ko/api/v1/hosts/
[18]: /ko/api/v1/embeddable-graphs/
[19]: /ko/api/v1/snapshots/
[20]: /ko/api/v1/service-dependencies/
[21]: /ko/api/v1/monitors/
[22]: /ko/api/v1/service-checks/
[23]: /ko/api/v1/logs/
[24]: /ko/api/v1/logs-indexes/
[25]: /ko/api/v1/logs-pipelines/
[26]: /ko/api/v1/service-level-objectives/
[27]: /ko/api/v2/security-monitoring/
[28]: /ko/api/v1/users/
[29]: /ko/api/v1/roles/
[30]: /ko/api/v1/organizations/
[31]: /ko/api/v1/authentication/
[32]: /ko/api/v2/logs-restriction-queries/
[33]: /ko/api/v1/key-management/
[34]: /ko/api/v1/usage-metering/
[35]: /ko/api/v1/ip-ranges/
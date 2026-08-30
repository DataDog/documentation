---
title: API 사용
type: api
---
{{< h2-with-copy-btn >}}API 사용{{< /h2-with-copy-btn >}}

Datadog HTTP API를 사용하여 프로그래밍 방식으로 Datadog 플랫폼에 액세스합니다. API를 사용하여 Datadog에 데이터를 전송하고, 데이터 시각화를 구축하며, 계정을 관리할 수 있습니다.

{{< h2 >}}Datadog에 데이터 전송{{< /h2 >}}

API를 사용하여 Datadog에 통합 데이터를 전송하기 시작합니다. Agent를 추가로 설정하면 API를 사용하여 Synthetic 테스트 데이터, 로그 및 트레이스를 Datadog에 전송할 수도 있습니다.

**통합 엔드포인트**

사용 가능한 통합 엔드포인트:

- [AWS 통합][1]
- [AWS Logs 통합][2]
- [Azure 통합][3]
- [Cloudflare 통합][37]
- [Fastly 통합][38]
- [Google Cloud 통합][4]
- [Jira 통합][39]
- [Microsoft Teams 통합][40]
- [Okta 통합][41]
- [Opsgenie 통합][42]
- [PagerDuty 통합][6]
- [Slack 통합][5]
- [Webhooks 통합][7]

**플랫폼 엔드포인트**

이러한 엔드포인트를 사용하여 Datadog 플랫폼 다른 부분과 데이터를 주고받을 수 있습니다. 

- [메트릭][8] 엔드포인트를 사용하면 [메트릭][9] 데이터를 게시하여 Datadog 대시보드에서 그래프화하고 어느 기간에 대해서나 메트릭을 쿼리할 수 있습니다.
- [이벤트][10] 엔드포인트를 통해 [Datadog Event Explorer][11]에서 이벤트를 주고받을 수 있습니다.
- [Synthetic Monitoring][12] 엔드포인트를 사용해 [Synthetic 테스트][13] 결과를 생성, 시작, 중단 및 확인할 수 있습니다.
- [Tracing Agent API][14]를 사용해 Datadog Agent에 트레이스를 전송한 다음 Datadog에 전달할 수 있습니다.
- [Agent Observability Export API][36]를 사용하여 Agent Observability 데이터에 액세스하고, 외부 평가를 실행하며 오프라인 저장을 위해 스팬을 내보낼 수 있습니다.

{{< h2 >}}데이터 시각화{{< /h2 >}}

Datadog에 데이터를 전송하면 API를 사용해 프로그래밍 방식으로 데이터 시각화를 구축할 수 있습니다.

- [Dashboard][15] 구축 및 [Dashboard List][16] 보기
- [호스트 태그][17] 관리
- [임베드 가능한 그래프][18] 생성
- [그래프 스냅샷][19] 찍기
- [서비스 종속성][20] - APM 서비스 및 해당 종속성 목록 확인
- [모니터][21] 생성
- [서비스 확인][22] - 모니터에서 사용할 수 있도록 체크 상태 전송
- [로그][23], [로그 인덱스][24] 및 [로그 파이프라인][25] 생성 및 관리
- 조직의 [호스트][17] 정보 가져오기
- [Service Level Objectives][26] 생성 및 관리
- [보안 모니터링][27] 신호 생성

{{< h2 >}}계정 관리{{< /h2 >}}

또한 Datadog API를 사용하여 프로그래밍 방식으로 계정을 관리할 수 있습니다.

- [사용자][28] 관리
- [역할][29] 관리
- [조직][30] 관리
- [인증][31] 엔드포인트를 통해 API와 앱 키 확인
- [로그 제한 및 쿼리][32]를 통해 특정 로그 액세스 허용
- [키 관리][33]를 통해 기존 키 관리
- [사용량 측정][34] 엔드포인트를 통해 Datadog 구성 요소에 대한 시간별, 일별, 월별 사용량 가져오기
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
[36]: /ko/llm_observability/evaluations/export_api
[37]: /ko/api/latest/cloudflare-integration/
[38]: /ko/api/latest/fastly-integration/
[39]: /ko/api/latest/jira-integration/
[40]: /ko/api/latest/microsoft-teams-integration/
[41]: /ko/api/latest/okta-integration/
[42]: /ko/api/latest/opsgenie-integration/
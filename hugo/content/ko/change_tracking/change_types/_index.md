---
description: Change Tracking이 모니터링하는 변경 유형, 각 유형이 어떤 Datadog 기능에서 비롯되는지, 각 변경 유형의
  추적을 활성화하는 방법을 알아보세요.
title: 추적된 변경 유형
---
Change Tracking은 여러 Datadog 제품에서 변경 사항을 수집합니다. 별도로 구매해야 하는 Change Tracking 제품은 없으며 대부분의 경우 별도의 Agent나 통합을 설치할 필요가 없습니다. 기본 텔레메트리를 전송 중이라면 변경 사항은 이미 추적되고 있는 것입니다.

이 페이지의 정보를 사용하여 다음 항목을 확인할 수 있습니다.

- 변경 유형이 발생한 Datadog 기능
- 구성해야 할 항목(있는 경우)

## 지원되는 변경 유형 {#supported-change-types}

### 배포 {#deployments}

| 변경 유형 | 출처 | 활성화 방법 |
| --- | --- | --- |
| 백엔드 코드 배포 | APM | 서비스에 `version` 태그가 있어야 합니다. 태그를 설정하려면 [Unified Service Tagging][11]을 참조하세요. |
| 프런트엔드 배포 | RUM | [RUM 배포 추적][2]을 설정합니다. |
| Kubernetes 배포 매니페스트 업데이트 | Kubernetes의 Datadog Agent | 가능한 경우 Kubernetes YAML에 `service` 레이블을 추가합니다. |

### Feature Flags {#feature-flags}

| 변경 유형 | 출처 | 활성화 방법 |
| --- | --- | --- |
| Datadog Feature Flags | Datadog Feature Flags | 자동으로 추적됩니다. |
| LaunchDarkly | LaunchDarkly 통합 | [LaunchDarkly 통합][3]을 설정합니다. |
| 기타 모든 Feature Flag 공급자 | Events API | [Events API][4]를 사용하여 Feature Flag 변경 사항을 사용자 지정 이벤트로 전송합니다. |
| 프런트엔드 Feature Flag 평가 | RUM | [RUM Feature Flag 추적][5]을 설정합니다. |

설정 및 고급 옵션은 [Track Feature Flag Changes][6]를 참조하세요.

### 인프라 변경 사항 {#infrastructure-changes}

| 변경 유형 | 출처 | 활성화 방법 |
| --- | --- | --- |
| 클라우드 리소스 및 구성 변경 사항(AWS) {{< tooltip text="in Preview" tooltip="이 기능은 미리 보기로 제공되며 소수의 클라우드 리소스 변경 사항에만 적용됩니다. 액세스를 요청하려면 리소스 수집 문서를 참조하세요." >}} | Infrastructure Monitoring | [리소스 수집][12]을 활성화하고 필요시 클라우드 공급자 이벤트 전달도 활성화합니다. |
| Kubernetes 배포 규모 조정 이벤트 | Kubernetes 통합 | [Kubernetes 감사 로깅][13]을 활성화합니다. |
| CrashLoopBackOff 포드 충돌 | Kubernetes 통합 | 가능한 경우 Kubernetes YAML에 `service` 레이블을 추가합니다. |

### 데이터베이스 변경 사항 {#database-changes}

| 변경 유형 | 출처 | 활성화 방법 |
| --- | --- | --- |
| PostgreSQL, SQL Server 및 MySQL 스키마 변경 사항 | Database Monitoring | [데이터베이스 스키마 탐색][7] 및 [Database Monitoring 및 트레이스 상호 연결][8]를 참조하세요. |
| MongoDB 인덱스 및 검색 인덱스 변경 사항, PostgreSQL 및 SQL Server 설정 변경 사항 | Database Monitoring | [Database Monitoring 및 트레이스 상호 연결][8]. |

설정 및 고급 옵션은 [Database Monitoring][14]을 참조하세요.

### 스트리밍 및 애플리케이션 동작 {#streaming-and-application-behavior}

| 변경 유형 | 출처 | 활성화 방법 |
| --- | --- | --- |
| Kafka 스키마 업데이트 | Data Streams Monitoring | [Data Streams Monitoring][9]을 설정합니다. |
| 트래픽 급증 | APM | [APM][15]을 통해 자동으로 추적됩니다. |
| Watchdog 경보 | Watchdog | 자동으로 추적됩니다. 경보별 요구 사항은 [Watchdog][10]을 참조하세요. |

### 사용자 지정 변경 사항 {#custom-changes}

| 변경 유형 | 출처 | 활성화 방법 |
| --- | --- | --- |
| 추적하려는 기타 변경 사항 | Events API | [Events API][4]를 사용하여 변경 이벤트를 전송합니다. |

[2]: /ko/real_user_monitoring/guide/setup-rum-deployment-tracking/
[3]: /ko/integrations/launchdarkly/#setup
[4]: /ko/api/latest/events/
[5]: /ko/real_user_monitoring/feature_flag_tracking/
[6]: /ko/change_tracking/change_types/feature_flags/
[7]: /ko/database_monitoring/schema_explorer/
[8]: /ko/database_monitoring/connect_dbm_and_apm/
[9]: /ko/data_streams/
[10]: /ko/watchdog/
[11]: /ko/getting_started/tagging/unified_service_tagging/
[12]: /ko/infrastructure/resource_catalog/resource_changes/
[13]: /ko/integrations/kubernetes_audit_logs/
[14]: /ko/database_monitoring/
[15]: /ko/tracing/
---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /data_security/logs/
  tag: 설명서
  text: 로그 데이터 보안
- link: /data_security/agent/
  tag: 설명서
  text: Agent 데이터 보안
- link: /data_security/synthetics/
  tag: 설명서
  text: Synthetic Monitoring 데이터 보안
- link: /tracing/configure_data_security/
  tag: 설명서
  text: 데이터 트레이싱 보안
- link: /data_security/real_user_monitoring/
  tag: 설명서
  text: RUM 데이터 보안
- link: /session_replay/privacy_options?platform=browser
  tag: 설명서
  text: Session Replay 개인정보 보호 옵션
- link: /security/sensitive_data_scanner/
  tag: 설명서
  text: Sensitive Data Scanner
title: 데이터 관련 리스크 줄이기
---
<div class="alert alert-info">이 페이지는 Datadog으로 전송되는 데이터를 보호하기 위한 도구와 보안에 대해 설명합니다. 클라우드 및 애플리케이션 보안 제품과 기능을 찾고 있다면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

Datadog을 일반적인 용도로 사용하면 Datadog으로 데이터를 전송하게 됩니다. Datadog은 전송하는 데이터를 적절히 제한할 수 있는 도구를 제공하고 전송 중 및 전송 후의 데이터를 보호하여 데이터 관련 위험을 줄일 수 있도록 지원합니다.

[Datadog Security][1]에 공개된 정보와 당사 [개인정보 보호 정책][2]도 확인해주세요.

## 사용자로부터 Datadog으로 데이터가 전송되는 방식 {#how-data-gets-from-you-to-datadog}

Datadog에서는 Agent, [DogStatsD][3], 퍼블릭 API 및 통합을 비롯한 여러 방법으로 Datadog에 데이터를 전송할 수 있습니다. 또한 Real User Monitoring SDK와 APM SDK는 애플리케이션 및 서비스 코드를 기반으로 데이터를 생성하여 Datadog으로 전송합니다. 

Datadog에서 제공하는 도구를 통해 전송 중인 데이터는 TLS 및 HSTS로 보호됩니다. Datadog에 저장된 데이터는 암호화, 액세스 제어 및 인증으로 보호됩니다. 자세한 내용은 [Datadog Security][1]에서 확인하세요.

### Datadog Agent {#the-datadog-agent}

Agent는 시스템의 데이터를 Datadog으로 전송하는 주요 채널입니다. [Agent의 데이터 보안 조치 자세히 알아보기][4]. 

Agent 설정 파일의 플레인 텍스트에 시크릿을 저장하지 않도록 하려면 [시크릿 관리][5] 가이드를 확인하세요.

### 타사 서비스 통합 {#third-party-services-integrations}

일부 타사 서비스의 통합은 Datadog에서 직접 구성되며, Datadog이 사용자를 대신해 해당 서비스에 연결할 수 있도록 자격 증명을 제공해야 할 수도 있습니다. 사용자가 제공하는 자격 증명은 암호화되어 Datadog의 보안 자격 증명 데이터스토어에 저장됩니다. 

이러한 통합을 통해 전송되는 모든 데이터는 Datadog 시스템에 저장된 상태와 전송 중 모두 암호화됩니다. 보안 자격 증명 데이터스토어에 대한 액세스는 제어 및 감사되며, 타사 서비스 내 특정 서비스나 작업은 필요한 범위로만 제한됩니다. 이상 행동 탐지 도구는 무단 액세스 여부를 지속적으로 모니터링합니다. 유지 관리 목적의 Datadog 직원 액세스는 일부 지정된 엔지니어로 제한됩니다.

### 클라우드 통합 {#cloud-integrations}

클라우드 공급자와 통합할 때는 민감한 특성을 고려하여 가능한 경우 제한된 권한이 부여된 Datadog 전용 자격 증명을 사용하는 등의 추가 보안 조치를 적용합니다. 예시는 다음과 같습니다.

* [Amazon Web Services와 통합][6]하는 경우, [AWS IAM 모범 사례 가이드][7]에 따라 AWS IAM을 사용하여 역할 위임을 설정하고, AWS 정책을 활용하여 특정 권한을 허용해야 합니다.
* [Microsoft Azure][8]와 통합하는 경우 Datadog용 테넌트를 정의하고, 특정 애플리케이션에는 모니터링하려는 구독에 대해 'Reader' 역할만 부여해야 합니다.
* [Google Cloud Platform][9]과 통합하는 경우 Datadog용 서비스 계정을 정의하고 'Compute Viewer' 및 'Monitoring Viewer' 역할만 부여해야 합니다.

## 데이터 리스크를 줄이기 위한 조치 {#measures-you-can-implement-to-reduce-your-data-risk}

Datadog의 목적은 인프라 및 서비스 전반의 다양한 소스에서 관측 가능성 정보를 수집하고 한곳에 통합하여 분석하고 조사할 수 있도록 하는 것입니다. 이를 위해 다양한 유형의 데이터를 Datadog 서버로 전송하게 됩니다. Datadog 제품을 본래 용도대로 사용할 때 수집되는 데이터 대부분은 비공개 정보나 개인 데이터를 포함할 가능성이 낮습니다. 불필요한 비공개 정보나 개인 데이터가 포함될 수 있는 데이터에 대해서는 Datadog과 공유되는 데이터에서 이러한 정보를 제거하거나 난독화하는 등 포함을 최소화할 수 있도록 지침, 도구 및 권장 사항을 제공합니다.

### Sensitive Data Scanner {#sensitive-data-scanner}

Sensitive Data Scanner는 스트림 기반의 패턴 매칭 서비스로, 민감한 데이터를 식별하고 태그를 지정하며 필요에 따라 마스킹하거나 해시 처리할 수 있습니다. 이를 구현하면 보안 및 규정 준수 팀이 민감한 데이터가 조직 외부로 유출되는 것을 방지하는 방어선을 마련할 수 있습니다. 스캐너 및 설정에 대한 자세한 내용은 [Sensitive Data Scanner][10]를 참조하세요.

### Logs Management {#logs-management}

로그는 시스템과 서비스, 그리고 그 안에서 발생하는 활동에 의해 생성되는 기록입니다. 로그 데이터를 필터링하고 난독화하는 방법을 포함한 로그 데이터 보안 고려 사항은 [Log Management Data Security][11]에서 확인하세요. 

[Manage Sensitive Logs Data Access][12] 가이드와 [Agent Advanced Configuration for Logs][13]을 통해 로그 데이터 제어 방법을 자세히 알아보세요.

로그 데이터 보안과 관련된 리스크를 줄이는 핵심 접근 방식은 액세스 제어입니다. Datadog에서 이를 수행하는 방법은 [Logs용 RBAC 설정 방법][14] 및 [Logs RBAC 권한][15]을 참조하세요.

### 라이브 프로세스 및 컨테이너 {#live-processes-and-containers}

라이브 프로세스 및 라이브 컨테이너를 모니터링할 때 민감한 데이터가 유출되지 않도록 Datadog은 프로세스 인수 및 Helm 차트의 민감한 키워드를 기본적으로 스크러빙합니다. [`custom_sensitive_words` 설정][16]을 사용하여 프로세스 명령 또는 인수 내의 추가적인 민감한 시퀀스를 난독화할 수 있으며, [`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` 환경 변수][17]를 사용하여 컨테이너 스크러빙 단어 목록에 추가할 수 있습니다.

### APM 및 기타 SDK 기반 제품 {#apm-and-other-sdk-based-products}

Datadog SDK는 애플리케이션, 서비스, 테스트 및 파이프라인을 계측하고 Agent를 통해 Datadog으로 성능 데이터를 전송하는 데 사용됩니다. 다음 제품에서 사용할 트레이스 및 스팬 데이터를 비롯한 다양한 데이터가 생성됩니다.

- Application Performance Monitoring(APM)
- Continuous Profiler
- CI Visibility
- App and API Protection

트레이싱 라이브러리에서 얻은 데이터를 관리하는 방법, 기본 보안 설정, 트레이스 관련 요소의 사용자 맞춤형 난독화, 스크러빙, 배제, 수정 방법을 자세히 알고자 하는 경우 [트레이스 데이터 보안을 위해 Agent와 Tracer 설정하기][18] 가이드를 참조하세요.

### 서버리스 분산 트레이싱 {#serverless-distributed-tracing}

Datadog을 사용하여 AWS Lambda 함수의 JSON 요청 및 응답 페이로드를 수집하고 시각화할 수 있습니다. 요청 또는 응답 JSON 객체의 민감한 데이터(예: 계정 ID 또는 주소)가 Datadog으로 전송되지 않도록 특정 파라미터를 스크러빙할 수 있습니다. 자세한 내용은 [AWS Lambda 페이로드 콘텐츠 난독화][19]를 참조하세요.

### Synthetic Monitoring {#synthetic-monitoring}

Synthetic Testing은 전 세계 테스트 위치에서 요청 및 비즈니스 트랜잭션을 시뮬레이션합니다. 구성, 자산, 결과 및 자격 증명에 대한 암호화 고려 사항과 테스트 개인정보 보호 옵션 사용 방법에 대한 자세한 내용은 [Synthetic Monitoring Data Security][20]를 참조하세요.

### RUM 및 Session Replay {#rum-session-replay}

브라우저에서 Real User Monitoring으로 수집되는 데이터를 수정하여 개인 식별 정보를 보호하고 수집 중인 RUM 데이터를 샘플링할 수 있습니다. 자세한 내용은 [RUM 데이터 및 컨텍스트 수정][21]을 참조하세요.
 
Session Replay 개인정보 보호 옵션은 기본적으로 최종 사용자의 개인정보를 보호하고 조직의 민감한 정보가 수집되지 않도록 설정되어 있습니다. Session Replay에서 요소를 마스킹, 재정의 및 숨기는 방법에 대한 자세한 내용은 [Session Replay Privacy Options][22]를 참조하세요. Session Replay의 마스킹은 영구적으로 적용됩니다.: 마스킹된 값은 외부로 전송되지 않으며 나중에 마스킹을 해제할 수 없습니다. 이는 수집 시 일치하는 값을 난독화하고 `Data Scanner Unmask` 권한이 있는 사용자가 원래 값을 볼 수 있도록 하는 [Sensitive Data Scanner Mask action][26]과는 다릅니다.

### Database Monitoring {#database-monitoring}

Database Monitoring Agent는 Datadog 수집 서비스로 전송되는 모든 쿼리 바인드 파라미터를 난독화합니다. 따라서 데이터베이스에 저장된 비밀번호, PII(개인 식별 정보) 및 기타 민감할 수 있는 정보는 쿼리 메트릭, 쿼리 샘플 또는 실행 계획에서 확인할 수 없습니다. 데이터베이스 성능 모니터링과 관련된 다른 유형의 데이터 리스크를 줄이는 방법은 [Database Monitoring Data Collected][23]를 참조하세요.

## 기타 민감할 수 있는 데이터의 소스 {#other-sources-of-potentially-sensitive-data}

자동으로 스크러빙하거나 난독화하는 등의 방식으로 수집을 방지할 수 있는 민감한 데이터 외에도, Datadog에서 수집하는 데이터의 상당 부분은 항목의 이름과 설명입니다. 전송하는 텍스트에 비공개 정보나 개인 정보를 포함하지 않는 것이 좋습니다. 제품을 본래 용도대로 사용할 때 Datadog으로 전송하는 다음 텍스트 데이터 목록을 참고하세요. 이 목록은 전체 항목을 포괄하지 않습니다.

메타데이터 및 태그
: 메타데이터는 주로 `key:value` 형식의 [태그][24]로 구성되며, 예시는 `env:prod`입니다. 메타데이터는 Datadog에서 데이터를 필터링하고 그룹화하여 의미 있는 정보를 도출하는 데 사용됩니다. 

대시보드, 노트북, 알림, 모니터, 알림, 인시던트, SLO
: Datadog에서 생성하는 항목에 부여하는 텍스트 설명, 제목 및 이름도 데이터입니다. 

메트릭
: 메트릭에는 인프라 메트릭, 통합에서 생성된 메트릭, 로그, 트레이스, RUM 및 Synthetic 테스트와 같은 기타 수집 데이터가 포함되며, 그래프에 표시되는 시계열 데이터입니다. 대개 관련 태그가 지정되어 있습니다.

APM 데이터
: APM 데이터에는 서비스, 리소스, 프로필, 트레이스, 스팬 및 관련 태그가 포함됩니다. 각 항목에 대한 설명은 [APM 용어집][25]을 참조하세요. 

데이터베이스 쿼리 서명
: Database monitoring 데이터는 Agent가 수집하여 정규화된 쿼리의 과거 성능을 추적하는 데 사용하는 메트릭과 샘플, 그리고 관련 태그로 구성됩니다. 이 데이터의 세분성은 정규화된 쿼리 서명과 고유 호스트 식별자에 의해 정의됩니다. 모든 쿼리 파라미터는 Datadog으로 전송되기 전에 난독화되고 수집된 샘플에서 삭제됩니다.

프로세스 정보
: 프로세스는 커널의 내부 데이터 구조에 대한 인터페이스 역할을 하는 `proc` 파일 시스템의 메트릭과 데이터로 구성됩니다. 프로세스 데이터에는 프로세스 명령(경로 및 인수 포함), 관련 사용자 이름, 프로세스 및 상위 프로세스의 ID, 프로세스 상태, 작업 디렉터리가 포함될 수 있습니다. 프로세스 데이터에는 일반적으로 관련 태그 메타데이터도 포함됩니다.

이벤트와 댓글
: 이벤트 데이터는 트리거된 모니터, 통합에서 제출된 이벤트, 애플리케이션 자체에서 제출된 이벤트, 사용자 또는 API를 통해 전송된 댓글 등 여러 소스에서 집계되어 하나의 통합 보기로 제공됩니다. 일반적으로 이벤트와 댓글은 관련 태그 메타데이터를 포함합니다.

Continuous Integration 파이프라인 및 테스트
: 브랜치, 파이프라인, 테스트 및 테스트 모음의 이름은 모두 Datadog으로 전송되는 데이터입니다.

### 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /ko/extend/dogstatsd/
[4]: /ko/data_security/agent/
[5]: /ko/agent/configuration/secrets-management/
[6]: /ko/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /ko/integrations/azure/
[9]: /ko/integrations/google_cloud_platform/
[10]: /ko/security/sensitive_data_scanner/
[11]: /ko/data_security/logs/
[12]: /ko/logs/guide/manage-sensitive-logs-data-access/
[13]: /ko/agent/logs/advanced_log_collection
[14]: /ko/logs/guide/logs-rbac
[15]: /ko/logs/guide/logs-rbac-permissions
[16]: /ko/infrastructure/process/#process-arguments-scrubbing
[17]: /ko/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /ko/tracing/configure_data_security/
[19]: /ko/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /ko/data_security/synthetics/
[21]: /ko/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[22]: /ko/session_replay/privacy_options?platform=browser
[23]: /ko/database_monitoring/data_collected/#sensitive-information
[24]: /ko/getting_started/tagging/
[25]: /ko/tracing/glossary/
[26]: /ko/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
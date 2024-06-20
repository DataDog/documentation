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
  text: 신서틱(Synthetic) 모니터링 데이터 보안
- link: /tracing/configure_data_security/
  tag: 설명서
  text: 데이터 트레이싱 보안
- link: /data_security/real_user_monitoring/
  tag: 설명서
  text: RUM 데이터 보안
- link: /real_user_monitoring/session_replay/browser/privacy_options
  tag: 설명서
  text: 세션 리플레이 프라이버시 옵션
- link: /sensitive_data_scanner/
  tag: 설명서
  text: Sensitive Data Scanner
kind: 설명서
title: 데이터 관련 리스크 줄이기
---

<div class="alert alert-info">이 페이지는 Datadog으로 전송된 데이터를 보호하기 위한 도구 및 보안에 대해 다룹니다. 클라우드 및 애플리케이션 보안 제품과 기능을 찾고 있다면 <a href="/security/" target="_blank">Security</a> 섹션을 참조하세요.</div>

일반적으로 Datadog를 의도한 목적에 맞추어 사용하는 과정에서 사용자 여러분은 Datadog로 데이터를 전송하게 됩니다. Datadog는 전송 데이터를 적절한 수준으로 제한하는 도구를 지원하며, 사용자와 협력해 전송 중이거나 전송 완료된 데이터를 보호합니다. 또한, 이를 통해 데이터와 관련된 리스크를 줄입니다.

[Datadog 보안][1]에 공개된 정보와 당사 [개인정보 보호 정책][2]도 확인해주세요.

## 사용자 데이터가 Datadog로 이동하는 흐름

Datadog 서비스를 이용할 때 Agent, [DogStatsD][3], 퍼블릭 API, 통합 등 여러 방법으로 Datadog에 데이터를 전송할 수 있습니다. 또한, Real User Monitoring SDK나 트레이싱 라이브러리는 사용자의 애플리케이션과 서비스 코드를 바탕으로 데이터를 생성하고 Datadog로 전송합니다.

Datadog가 제공하는 도구를 통해 이동하는 데이터는 TLS와 HSTS로 보호됩니다. Datadog가 저장하는 데이터는 암호화, 액세스 관리, 인증을 통해 보호됩니다. 자세한 내용은 [Datadog 보안][1]을 참조하세요.

### Datadog Agent

사용자 여러분의 시스템에서 Datadog로 데이터가 이동하는 주요 채널은 Agent입니다. [Agent에서 사용하는 모든 데이터 보안 수단에 대해 알아보세요.][4]

Agent 설정 파일의 플레인 텍스트에 시크릿을 저장하지 않도록 하려면 [시크릿 관리][5] 가이드를 확인하세요.

### 타사 서비스 통합

일부 타사 서비스의 통합은 Datadog에서 직접 설정 가능하며, Datadog에서 사용자 대신 서비스에 접속할 수 있도록 해당 서비스의 자격증명을 Datadog로 알려주셔야 하는 경우가 있습니다. 공유해주신 자격증명 정보는 암호화되며 Datadog의 안전한 자격증명 데이터 저장소에서 보관합니다.

이러한 통합과 관련된 모든 데이터는 Datadog 시스템에서 유휴 상태인 경우 암호화 처리하며, 전송 중에도 암호화됩니다. 안전한 자격증명 정보 데이터 저장소의 액세스는 면밀한 관리와 감사를 받습니다. 타사 서비스 내의 특정 서비스나 동작은 필수적인 것만 허용하도록 제한합니다. 이상 행동 탐지 도구는 무단 액세스가 발생하는지 지속 모니터링합니다. 또한, Datadog 서비스 점검을 위해 데이터에 접근할 수 있는 인원은 일부 엔지니어로 한정되어 있습니다.

### 클라우드 통합

민감한 사안임을 고려하여, 클라우드 공급자와의 통합 시에는 가능한 경우 추가 보안 조치를 취합니다. 이러한 보안 조치로는 제한적인 권한을 허용하는 Datadog 전용 자격증명을 이용하는 등의 대책이 있습니다. 구체적인 예시를 들면 다음과 같습니다.

* [Amazon Web Services와 통합][6]하는 경우, [AWS IAM 모범 사례 가이드][7]에 따라 AWS IAM을 사용하여 역할 위임을 설정하고, AWS 정책을 활용하여 특정 권한을 허용합니다.
* [Microsoft Azure][8]와 통합하는 경우, Datadog의 테넌트를 정의해야 합니다. 특정 애플리케이션의 액세스 권한은 모니터링 대상인 구독에서 "Reader" 역할만을 부여하세요.
* [Google Cloud Platform][9]과의 통합 시 Datadog의 서비스 계정을 정의해야 합니다. 해당 계정에는 "Compute Viewer" 또는 "Monitoring Viewer" 역할만을 부여하세요.

## 실천 가능한 데이터 리스크 절감법

Datadog의 목적은 사용자 여러분의 인프라스트럭처나 서비스와 관련된 다수의 소스에서 옵저버빌리티(observability) 정보를 수집하고, 사용자가 분석하고 조사할 수 있도록 한 화면에 간단명료하게 정리하는 것입니다. 따라서 사용자는 다양한 종류의 데이터 콘텐츠를 Datadog 서버로 전송하게 됩니다. Datadog 제품 본연의 목적을 위해 수집한 데이터 대부분은 개인정보를 포함할 가능성이 거의 없습니다. 불필요한 프라이버시나 개인정보를 포함할 가능성이 있는 데이터의 경우, 고객이 다양한 방법으로(예: 삭제, 난독화 등) Datadog와 공유하는 데이터에 포함된 개인정보를 줄이도록 안내 가이드와 도구를 제공하고 권장 사항을 알려드립니다.

### Sensitive Data Scanner

Sensitive Data Scanner는 스트림 기반 패턴 매칭 서비스입니다. 민감한 데이터를 식별하고 태그를 지정하는 용도로 쓰이며, 선택 사항으로는 민감한 데이터를 편집하거나 해시 처리하기 위해 활용할 수도 있습니다. Sensitive Data Scanner를 사용하면 보안팀과 컴플라이언스팀이 민감한 데이터가 조직 외부로 유출되지 않도록 막아주는 방어선을 구축할 수 있습니다. 스캐너의 정보와 설정 방법을 자세히 알고 싶다면 [Sensitive Data Scanner][10] 가이드를 참조하세요.

### 로그 관리

로그는 시스템과 서비스에서 생성하는 기록이자, 시스템과 서비스에서 수행하는 동작을 의미합니다. 로그 데이터를 필터링하고 난독화하는 방법을 비롯해, 로그 데이터 보안과 관련해 고려해야 하는 사항은 [로그 관리 데이터 관리][11]에서 알아볼 수 있습니다.

로그 데이터 컨트롤 방법을 더 자세히 알아보고 싶다면 [민감한 로그 데이터 관리][12] 가이드와 [Agent 고급 로그 설정][13]을 참조하세요.

로그 데이터 보안과 관련하여 리스크를 줄이는 주요 방법은 액세스 컨트롤입니다. [로그용 RBAC 설정 방법][14] 및 [로그 RBAC 권한 허용][15] 가이드를 읽고 Datadog에서 액세스를 관리하는 방법을 알아보세요.

### 실시간 프로세스 및 컨테이너

실시간 프로세스나 실시간 컨테이너를 모니터링할 때, Datadog는 민감한 데이터의 유출을 막기 위해 프로세스 인수(argument) 및 Helm 차트에서 민감한 키워드 일부를 스크러빙하는 기능을 기본 제공합니다. [`custom_sensitive_words` 설정][16]을 사용하여 프로세스 명령어나 인수 내 추가 기밀 시퀀스를 난독화하고, [`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` 환경 변수][17]를 활용하여 컨테이너 스크러빙 단어 목록에 추가할 수 있습니다.

### APM 및 기타 트레이싱 라이브러리 기반 제품

Datadog 트레이싱 라이브러리는 애플리케이션, 서비스, 테스트, 파이프라인을 계측하고 Agent를 통해 Datadog로 성능 데이터를 전송하는 데 사용됩니다. 트레이스 및 스팬(span) 데이터는 (그 이외의 다양한 데이터와 함께) 다음 제품에서 활용할 용도로 생성됩니다.

- APM(애플리케이션 성능 모니터링)
- Continuous Profiler
- CI Visibility
- 애플리케이션 보안 관리

트레이싱 라이브러리에서 얻은 데이터를 관리하는 방법, 기본 보안 설정, 트레이스 관련 요소의 사용자 맞춤형 난독화, 스크러빙, 배제, 수정 방법을 자세히 알고자 하는 경우 [트레이스 데이터 보안을 위해 Agent와 Tracer 설정하기][18] 가이드를 참조하세요.

### 서버리스 분산 트레이싱

Datadog를 사용하면 AWS Lambda 함수의 JSON 리퀘스트 및 리스폰스 페이로드를 수집하고 시각화할 수 있습니다. 리퀘스트나 리스폰스 JSON 객체(오브젝트) 내의 민감한 데이터(예: 계정 ID, 주소)를 Datadog로 전송하지 않도록 막으려면, 특정 파라미터를 Datadog로 전송하지 않도록 스크럽할 수 있습니다. 자세한 내용은 [AWS Lambda 페이로드 콘텐츠의 난독화][19] 설명서를 참조하세요.

### 신서틱(Synthetic) 모니터링

신서틱 테스트는 전 세계 테스트 위치에서 발생한 리퀘스트와 비즈니스 트랜잭션을 시뮬레이션합니다. 설정, 애셋, 결과, 자격증명 암호화에 관한 고려 사항이나 테스트 프라이버시 옵션 사용 방법을 알아보려면 [신서틱 모니터링 데이터 보안][20] 가이드를 읽어주세요.

### RUM & 세션 리플레이

개인을 식별할 수 있는 정보를 보호하고, 사용자가 수집하는 RUM 데이터를 샘플링하기 위해 브라우저에서 Real User Monitoring이 수집하는 데이터를 변경할 수 있습니다. 자세한 정보를 알아보려면 [RUM 데이터 및 컨텍스트의 수정][21] 가이드를 참조하세요.

세션 리플레이 프라이버시 옵션은 기본적으로 최종 사용자의 개인정보를 보호하고 조직의 민감한 정보를 수집하지 않도록 설정되어 있습니다. 세션 리플레이 요소의 마스킹, 오버라이드, 요소 숨김 처리와 관련하여 자세한 정보가 필요한 경우 [세션 리플레이 프라이버시 옵션][22]을 참조하세요.

### 데이터베이스 모니터링

Database Monitoring Agent는 Datadog로 전송된 모든 쿼리의 바인드(파라미터)변수를 난독화합니다. 따라서 데이터베이스에 저장된 비밀번호, PII(개인 식별 가능 정보), 기타 민감할 수 있는 정보는 쿼리의 메트릭, 쿼리 샘플이나 실행 계획으로 확인할 수 없습니다. 데이터베이스 성능 모니터링과 관련하여, 기타 유형의 데이터 리스크를 줄이는 방법은 [데이터베이스 모니터링 데이터 수집][23] 설명서에서 알아보시기 바랍니다.

## 기타 민감할 수 있는 데이터의 소스

Datadog는 민감한 데이터에 자동으로 스크럽, 난독화, 기타 수집 방지 조치를 취합니다. 또한, Datadog에서 수집하는 데이터는 대부분 이름과 설명으로 구성됩니다. 텍스트를 전송할 때는 프라이버시나 개인정보를 포함하지 않도록 유의하시기를 권장합니다. 의도한 목적에 따른 제품 사용과 관련하여 Datadog로 전송되는 텍스트 데이터 유형을 알아보려면 아래의 목록을 참조하세요. 단, 아래 목록이 모든 유형을 망라한 것은 아님에 유의하시기 바랍니다.

메타데이터와 태그
: 메타데이터는 주로 `key:value` 형식의 [태그][24]로 구성됩니다(예: `env:prod`). 메타데이터는 Datadog가 데이터 필터링이나 그룹화에 사용하며, 이를 통해 의미 있는 정보를 도출하는 데 도움이 됩니다.

대시보드, 노트북, 경고, 모니터링, 알림, 인시던트, SLO
: Datadog에서 생성한 것에 붙이는 텍스트 설명, 제목, 이름은 전송 대상 데이터입니다.

메트릭
: 메트릭에는 인프라스트럭처 메트릭, 통합 시 생성된 메트릭 및 로그, 트레이스, RUM, 신서틱 테스트 등의 기타 수집(ingested) 데이터가 포함됩니다. 메트릭은 그래프에 입력하는 데 사용되는 시계열 데이터이며, 대개 관련 태그가 지정되어 있습니다.

APM 데이터
: APM 데이터에는 서비스, 리소스, 프로파일, 트레이스, 스팬, 관련 태그가 포함됩니다. 각각에 대한 설명은 [APM 용어집][25]을 참조하세요.

데이터베이스 쿼리 시그니처
: 데이터베이스 모니터링 데이터는 Agent가 수집한 메트릭, 샘플과 관련 태그로 구성됩니다. 이 데이터는 정규화된 쿼리의 과거 퍼포먼스를 추적하기 위해 사용하며, 데이터 입도(granularity)는 정규화된 쿼리 시그니처와 고유 호스트 식별자를 이용해 정의합니다. 모든 쿼리 파라미터는 Datadog로 전송되기 전에 난독화 처리를 거치며 수집된 샘플에서 삭제됩니다.

프로세스 정보
: 프로세스는 `proc` 파일 시스템의 메트릭과 데이터로 구성됩니다. 이 파일 시스템은 커널의 내부 데이터 구조와 연결된 인터페이스로서 작동합니다. 프로세스 데이터는 프로세스 명령어(경로 및 인수 포함), 관련된 사용자 이름, 프로세스 ID와 부모, 프로세스 상태, 작업 디렉토리를 포함할 수 있습니다. 또한, 일반적으로 프로세스 데이터는 관련된 태그 메타데이터도 포함합니다.

이벤트와 코멘트
: 이벤트 데이터는 트리거된 모니터링, 통합을 통해 제출된 이벤트, 애플리케이션 자체에서 제출한 이벤트, 사용자 또는 API에서 전송한 코멘트를 비롯하여 다양한 소스에서 집계하며 통합 뷰에서 확인할 수 있습니다. 일반적으로 이벤트와 코멘트는 관련 태그 메타데이터를 포함합니다.

Continuous Integration 파이프라인과 테스트
: 브랜치, 파이프라인, 테스트, 테스트 스위트(suite)의 이름은 모두 Datadog로 전송되는 데이터입니다.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /ko/developers/dogstatsd/
[4]: /ko/data_security/agent/
[5]: /ko/agent/configuration/secrets-management/
[6]: /ko/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /ko/integrations/azure/
[9]: /ko/integrations/google_cloud_platform/
[10]: /ko/sensitive_data_scanner/
[11]: /ko/data_security/logs/
[12]: /ko/logs/guide/control-sensitive-logs-data/
[13]: /ko/agent/logs/advanced_log_collection
[14]: /ko/logs/guide/logs-rbac
[15]: /ko/logs/guide/logs-rbac-permissions
[16]: /ko/infrastructure/process/#process-arguments-scrubbing
[17]: /ko/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /ko/tracing/configure_data_security/
[19]: /ko/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /ko/data_security/synthetics/
[21]: /ko/real_user_monitoring/browser/advanced_configuration/
[22]: /ko/real_user_monitoring/session_replay/browser/privacy_options
[23]: /ko/database_monitoring/data_collected/#sensitive-information
[24]: /ko/getting_started/tagging/
[25]: /ko/tracing/glossary/
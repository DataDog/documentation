---
description: Datadog을 성공적으로 설치하려면 설치 계획을 세우세요.
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: 통합 서비스 태깅 시작하기
- link: /getting_started/tracing/
  tag: 설명서
  text: APM 추적 시작하기
title: Datadog 설치 계획 세우기
---

## 개요

새 소프트웨어 설치를 계획할 때는 해당 소프트웨어의 기능, 목표, 일정, 팀, 디자인 패턴을 이해하는 것이 중요합니다. 계획 단계에서는 Datadog 기본 사항을 배우고, 가장 중요한 목표를 정의하고, 모범 사례를 이해하고, Datadog 설치를 최적화하는 방법을 파악하세요. 

## 디자인

### 범위 지정 연습

Setting a clear goal is critical for installing Datadog. However, in a practical world, it is impossible to predict everything you might need at the outset. Product engineers iterate their rollouts and systems operators control their changes, all to control risk. Implementing a large-scale Datadog installation will benefit from standard project management practices. As part of that process, there are certain Datadog elements that you should include. 

**권장 사항:**   
조직에 대한 설문조사 수집 및 통합을 일찍 시작하세요. 에코시스템, 애플리케이션 언어, 데이터 스토리지, 네트워킹 및 인프라에 대한 종합적인 보기를 생성하세요.

샘플 설문조사 양식은 다음과 같습니다.

```
Application name:  
  Language:  
     Frameworks:  
  Model layer:  
  View layer: 
  Controller layer:  
  Infra type:  
  Operating systems:
```

## 일반적인 모범 사례 

범위 지정 작업으로 필요한 기술 유형을 파악하고 Datadog의 핵심 제품에 매핑해 봅니다.

### 리소스 태깅

Datadog는 머신 데이터와 실행 중인 애플리케이션 및 물리적 설명자를 상호 연관시키는 도구입니다. 유형에 관계없이 개별 데이터를 다른 데이터와 상호 참조할 수 있습니다. 호스트 이름, 클라우드 지역, 운영 체제 버전, IP는 자동으로 적용되는 리소스 속성 중 일부에 불과합니다. 또한 Datadog에서는 `cost-code`, `AppName`, `environment`, `version`과 같은 커스텀 태그를 생성할 수 있습니다.

Datadog의 강점은 통합 어휘를 유지 및 관리할 수 있는 기능과 내장된 데이터 기능에 있습니다. [통합 서비스 태깅][1]은 Datadog 플랫폼의 모든 기능에서 원격 측정 상관관계를 가능하게 하는 예약 태그를 사용합니다.

태그는 `key:value` 쌍 또는 간단한 값입니다. 애플리케이션 성능 데이터 및 인프라 메트릭에 차원을 추가합니다. Datadog는 통합을 통해 이러한 태그를 자동으로 가져오므로 Datadog로 모니터링을 시작하기 전에 플랫폼에서 제공하는 태그 기능을 활용하세요. 다음 표는 `key:value` 쌍의 작동 방식과 태그의 자동/수동 추가 여부를 보여줍니다.

| TAG                  | KEY            | VALUE         |  METHOD     |
|----------------------|----------------|---------------| ---------------|
| env:staging     | env            | staging  | automatic
| component_type:database | component_type | database      | manual
| region:us-west-1 | region | us-west-1      | automatic


[태그 시작하기][2] 가이드에서 이 주제를 시작하기에 좋은 참고 자료를 확인할 수 있습니다. 다음은 몇 가지 추가 주요 내용입니다.

- 서비스는 독립적으로 배포할 수 있는 단일 애플리케이션 설치 공간으로 정의됩니다.
- 태그 값은 일관성이 있어야 합니다. 예를 들어 'Production'은 'Prod'와 다릅니다.
- 코드 버전과 같은 동적 태그의 출처를 정의합니다.

**권장 사항**:  

- 가능한 한 빨리 [Datadog 통합 서비스 태깅][2]을 이해하고 태깅 체계를 개발하세요.
- 수집된 태그로 인프라를 설정하고 가능한 경우 태그 지정 프로세스를 자동화하세요(예: Kubernetes 레이블을 통해 CI 파이프라인의 git 해시 값을 버전 태그로 사용). 이렇게 하면 데이터를 통합하여 [서비스에 소유자를 할당][72]하고 서비스 메트릭, 로그 및 추적 간에 피벗하여 유용한 알림을 생성할 수 있습니다.

다음 다이어그램은 환경을 구축할 때 세 개의 예약 태그 각각이 어떻게 보일 수 있는지 보여줍니다.

{{< img src="/administrators_guide/unified_service_tagging_diagram.png" alt="3개 예약 태그(Service, Env, Version)를 포함하는 통합 서비스 태깅 다이어그램" style="width:90%;">}}

### 액세스 제어

아키텍처 설계 수준에서 Datadog 내에는 조직 구조와 [역할 기반 액세스 제어(RBAC)][4]의 두 가지 주요 액세스 제어 영역이 있습니다.

#### RBAC

Datadog 역할 기반 액세스 제어는 기존 SAML 인증 서비스에 연결해 줍니다. Datadog 기본 역할 및 팀 개체에 대해 SAML 그룹 매핑을 구축할 수 있습니다. Datadog는 AD/LDAP 역할의 복잡성에 따라 커스터마이즈할 수 있는 세 가지 기본 역할을 제공합니다 . 또한 [API 및 앱 키][7] 소유권과 같은 비대화형 목적으로 [서비스 계정][6]을 설정하여 사용자 활동을 시스템 작업과 분리할 수 있습니다. 세분화된 권한으로 필요한 액세스 및 보호 기능을 설정할 수 있습니다.  

추가 계층으로 [Teams][8]를 사용하면 사용자가 가입하거나 추가할 수 있는 유연하고 비공식적인 임시 그룹을 설정할 수 있습니다. Teams 기능은 Datadog 제품 전체에서 사용할 수 있습니다.

#### 다중 조직 구조

대규모 Datadog 고객은 종종 Datadog를 두 개 이상 설치하는 경우가 많습니다. 일반적으로 관리형 서비스 제공업체가 고객이 서로의 데이터에 액세스하지 못하도록 하기 위함입니다. 경우에 따라 단일 회사 내에서 완전한 격리가 필요한 경우도 있습니다. 이를 위해 토폴로지에서 [여러 조직 계정][5]을 관리할 수 있습니다. 예를 들어, 기술적으로 완전히 분리된 상태에서 상위 수준에서 총 사용량을 볼 수 있습니다. 하위 조직은 하나의 상위 조직 계정에서 관리해야 합니다. 

**권장 사항:**

- Datadog 사용자 역할 구축을 위한 구체적인 계획을 수립하세요.    
- API 키 관리를 위해 서비스 계정을 활용하세요.
- 대시보드, 서비스, 모니터, 인시던트 등의 리소스를 사용자 그룹에 연결하려면 Teams를 살펴보세요.

## 제품 모범 사례

### APM

APM은 통합 서비스 태깅의 적용에 따라 달라집니다. 이러한 태그는 운영 환경의 중추적인 역할을 하며, 원격 분석 데이터 전반에서 상관 관계를 활성화하는 데에도 유용합니다. Datadog가 발견한 임의의 Java 프로세스 소유자를 확인하는 데도 도움이 됩니다.  
일반적으로 대부분의 사용 사례에서는 기본 APM 설정으로 충분하지만, 예를 들어 샘플링 속도를 변경하거나 다른 APM 설정을 커스터마이즈하려면 다음 가이드라인을 참조하세요.

**권장 사항:** 
- 계측할 서비스를 식별하고 해당 서비스가 호스트, 컨테이너 , 서버리스를 기반으로 하는지 확인하세요.
- 사용 언어 또는 런타임 환경에 따라 Datadog에서 서비스 계측에 사용할 방법을 결정하세요. 이러한 방법은 단일 단계에서 수동 [계측][75]에 이르기까지 다양합니다.
- [수집 제어][9] 설명서를 검토하세요.  
- [원격 설정][10]을 사용하여 샘플링 속도를 구성하면 Agent 다시 시작할 필요 없이 필요에 따라 조직의 트레이스 수집을 확장할 수 있습니다. 자세한 내용은 [샘플링 속도 사용 사례][11]를 참조하세요.  
- [통합 서비스 태그 지정][12]이 적용되었는지 확인하고 [스팬 태그 시맨틱][13]을 검토합니다.
- 스팬 속성에서 서비스 이름을 자동으로 감지할 수 있도록 [추론된 서비스 종속성][51]에 동의합니다.

### 로그 관리

로그 관리 기능을 사용하면 Teams에서 인프라 문제를 진단하고 해결할 수 있습니다. [Logging without Limits™][14]을 사용하면 조정 가능한 로그 수집 패턴을 생성하고 로그 데이터에서 정보를 사용자 지정 메트릭으로 추출할 수 있습니다. 또한 로그를 인덱싱(즉, 저장)하지 않고도 로그의 중요한 오류에 대한 알림을 받을 수 있습니다.

{{< img src="/administrators_guide/logging_without_limits.png" alt="Logging without Limits 다이어그램" style="width:90%;">}}

Datadog 로그 인덱스 아키텍처는 대규모 스캔 및 집계 쿼리를 처리하는 데 최적화된 분산형 시계열 컬럼형 저장소입니다. Datadog 로깅 아키텍처에 대한 자세한 내용은 [Husky 소개][47] 및 [Husky 딥 다이브][48]를 참조하세요. 

로깅 플랫폼은 여러 계층의 로그 스토리지로 구성할 수 있습니다. 각각의 사용 사례는 여기에 설명되어 있습니다.
|  | Data captured | Retention | Retrieval to Datadog | Cost Driver |
| :---- | :---- | :---- | :---- | :---- |
| Ignored | No | None | None | N/A |
| [Ingested][15] | Logs-to-metrics | 15m in LiveTail | None | Volume |
| [Archive][16] | Upon rehydrate | Infinite | Slow | Volume |
| [Forward logs][17] | Logs-to-metrics | Determined by target | None | Volume |
| [Index][18] | Yes | 3,7,15,30 days | Immediate | Volume & message count |
| [Flex Logs][19] | Yes\* | [Storage tiers][74]  | Rapid | Retrieval volume |

\* Flex Logs 기능에는 모니터/경고 및 Watchdog가 포함되어 있지 않습니다. 하지만 로그가 인덱싱되기 전에 수집 스트림에서 log-to-metrics를 실행하여(표준 또는 플렉스) 모니터에서 해당 메트릭을 사용할 수 있습니다. 트레이스 등 다른 원격 분석과의 연계가 지원됩니다.

이러한 기본 함수를 사용하면 다음 사용 사례 중 일부에 대해 로그를 수집하고 모니터링할 수 있습니다:

로그 형식 정규화  
: 날짜/시간, 값 교체, 참조 조회를 중앙에서 제어합니다.

전세계 민감한 데이터 및 개인 식별 정보(PII) 관리
: 개인 식별 정보(PII) 및 SDS(Sensitive Data Scanner)가 먼저 스크러빙됩니다.

라우팅 및 포워딩 
: 로그를 인덱스, 아카이브 또는 전달 대상으로 전송하기 위한 하나의 중앙 집중식 UI입니다.  

비용 효율적인 가치 포착 
: 유연한 로그 필드 정의 및 대용량/저가치 분류가 가능합니다.

전역 로그 아카이브 
: 모든 로그를 아카이빙합니다.

전역 SIEM 
: 모든 로그는 수집 시 전처리기로서 보안 테스트를 거칩니다.

**권장 사항:**  
- Datadog 로그 URL 수집 엔드포인트로 직접 또는 Fluentbit, Syslog 또는 Logstash 와 같은 도구에서 Datadog에 로그를 전송할 방법을 결정합니다. 
- 로그 수집 계획을 미세 조정하고 로그 관리를 위한 모범 사례를 검토하세요.
- [Logging without Limits™][14]TM 가장 많이 로깅되는 서비스의 상태를 파악하고, 대용량 로깅 패턴을 관찰하고, 로그 패턴 제외 필터를 만드세요.
- [로그 아카이브][16]를 설정합니다.

### 실제 사용자 모니터링

실제 사용자 모니터링 및 Session Replay는 서비스 또는 애플리케이션 최종 사용자의 경험에 관한 자세한 인사이트를 제공합니다. 가치가 높은 세션이 있는 애플리케이션에 RUM을 설치하여 의미 있는 변경 데이터를 활용하세요. Session Replay는 사용자가 관찰한 문제를 해결하는 데 매우 유용한 시각적 정보를 제공합니다. 프로덕션 환경에서 가장 가치 있는 실제 고객 경험을 추적할 수 있습니다.    

**권장 사항:** 

- 추적할 웹사이트, 모바일 애플리케이션 화면, 사용자 행동 및 비즈니스에 중요한 프런트엔드 코드를 식별합니다.
- RUM 및 Session Replay를 프로덕션 및 프로덕션 근접 환경에 배포하세요.
- [프런트엔드 오류 삭제][21].  
- [RUM 샘플링 속도][22]를 설정합니다. 

### 신서틱 모니터링

Synthetic Monitoring은 브라우저 애플리케이션, 모바일 앱 및 API 테스트를 포함하는 종합 테스트 제품군입니다. Synthetic Monitoring 테스트 결과는 생성한 애플리케이션 동작과 데이터베이스, 메시지 대기열 및 다운스트림 서비스에 다시 연결할 수 있습니다.  

**권장 사항:**

- 비즈니스의 핵심이 되는 API 엔드포인트와 사용자 여정을 파악하고 이를 자주 테스트하세요.
- 테스트할 비즈니스 거래 로드맵을 개발하세요.
- Use Synthetic Monitoring in conjunction with [APM and RUM][49].
- [Synthetic Monitoring 소비 고려 사항][23]을 검토하세요.
- [하위 테스트][24]를 사용하여 테스트 유지 관리 작업을 줄입니다.
- 의도에 맞게 테스트 위치를 선정하세요. 고객의 실제 위치에서 테스트하세요.
- [HTTP 확인][25] 또는 [TCP 확인][50]을 사용하여 모니터 SSL 인증서 만료 또는 기본 가동 시간을 확인합니다.

## 통합

Datadog {{< translate key="integration_count" >}}+ 통합을 사용하여 인프라의 모든 메트릭과 로그를 한데 모아 전체 통합 가시성 시스템에 대한 인사이트를 얻을 수 있습니다. SaaS 기반 또는 Agent 기반 통합은 Datadog 내에서 모니터 메트릭을 수집합니다. 호스트 기반 통합은 `conf.d` 디렉터리에 있는 yaml 파일로 구성되며, 컨테이너 기반 통합은 주석이나 레이블과 같은 메타데이터로 구성됩니다. 

Datadog 는 다양한 유형의 통합이 있으며, 여기에 표시되는 순서는 Datadog에서 설치하도록 권장하는 순서입니다.

| 카테고리                                      | 설명                                                                                                                                                                                                                                   |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 클라우드 기술([AWS][52], [Google Cloud][53], [Azure][54])  | 이러한 통합은 프로비저닝된 크리덴셜을 사용하여 모니터링 엔드포인트에서 메트릭을 스크랩합니다. 원하는 원격 분석만 수집하도록 미세 조정할 수 있습니다.                                                                                                  |
| 인시던트 응답([Slack][55], [Jira][56], [PagerDuty][57])     | 이러한 통합 기능은 이벤트 발생 시 알림을 전송하며 효율적인 알림 시스템을 구축하는 데 필수적입니다.                                                                                                                          |
| 인프라스트럭처([오케스트레이션][58], [운영 체제][59], [네트워크][60]) | 이러한 통합은 메트릭과 로그를 모두 수집하여 인프라를 모니터링하는 기본 구성 요소 역할을 합니다.                                                                                                               |
| 데이터 레이어([데이터 저장소][61], [메시지 큐][62])      | 이러한 통합은 일반적으로 내부 DB 메트릭 테이블을 쿼리하므로 일반적으로 데이터베이스 관리자가 Agent 에 대한 액세스 권한을 제공해야 합니다.                                                                                              |
| 개발([자동화][63], [언어][64], 소스 제어][65]) | 이러한 통합은 지표를 Datadog으로 푸시하며 해당 측에서 구성해야 합니다. 일부는 DogStatsD으로 메트릭을 전송해야 할 수도 있습니다.                                                                                                               |
| 보안 및 규정 준수([Okta][66], [Agent 공개 정책[67])   | 이러한 통합을 통해 표준 준수 여부를 확인할 수 있습니다.                                                                                                     |

**권장 사항**:

- 가능한 한 개발 프로세스 초기에 프로젝트에 대한 메트릭 수집을 시작하세요.
- 설치된 Agent는 자동으로 시스템 및 NTP 통합이 실행되며 호스트에서 지원되는 기술을 자동 감지할 수 있습니다. ([라이브 프로세스](#live-processes)가 활성화되어 있어야 이 기능을 사용할 수 있습니다.)
- 위 목록에서 모니터링하려는 대상을 선택할 수 있습니다. 통합이 포함되지 않은 서비스를 모니터링하려는 경우 [라이브 프로세스](#live-processes), [Universal Services Monitoring][68], [프로세스 통합][69] 또는 [커스텀 점검][70]을 살펴볼 수 있습니다. 

## 추가 리소스

APM, RUM, Synthetic Monitoring, Log Management를 통해 중요한 성과를 달성하고 모범 사례를 도입할 수 있습니다. 설치 단계를 계획할 때 중요한 몇 가지 추가 리소스가 아래에 요약되어 있습니다.

### 라이브 프로세스 

실행 중인 모든 프로세스를 한 곳에서 보려면 [실시간 프로세스][26]를 사용하세요. 예를 들어 실행 중인 Apache 프로세스의 PID 수준 정보를 참조하면 일시적인 문제를 이해하고 해결하는 데 도움이 됩니다. 또한 특정 호스트, 특정 가용성 영역에서 실행 중이거나 특정 워크로드를 실행 중인 프로세스를 쿼리할 수도 있습니다. 이 기능을 활용하려면 호스트, 컨테이너 또는 AWS ECS Fargate 인스턴스에서 라이브 프로세스를 [설정][27]하세요.

### 가용성, 지연 시간 및 SSL 만료 

웹 서버 운영은 포트의 네트워크 가용성, SSL 인증서의 유효성,  지연 시간에 따라 달라집니다. 로컬 또는 원격 HTTP 엔드포인트를 모니터링하고 [HTTP_점검][25]을 설치하여 잘못된 응답 코드(예: 404)를 감지하고 Synthetic Monitoring API 테스트를 사용하여 곧 만료될 [SSL 인증서][71]를 식별합니다.

### 클라우드 네트워크 모니터링

웹 서버는 거의 항상 네트워크 패브릭을 통해 다른 서비스와 상호 연결되는데, 이 패브릭은 끊김에 취약하고 재전송을 초래할 수 있습니다. Datadog [네트워크 통합][28]을 사용하고 [Cloud Network Monitoring][29]을 활성화하여 인프라의 서비스, 컨테이너, 가용성 영역 및 기타 태그 간의 네트워크 트래픽에 대한 가시성을 확보하세요.

## 플랫폼 서비스

Datadog 인프라 모니터링에는 환경의 가시성을 극대화하는 데 사용할 수 있는 추가 제품이 함께 제공됩니다.

### Software Catalog

[Software Catalog][30]에서는 최근에 배포된 서비스, 한동안 배포되지 않은 서비스, 가장 많은 오류를 보고하는 서비스, 진행 중인 인시던트가 있는 서비스 등을 보여주는 서비스 개요를 확인할 수 있습니다.

Software Catalog는 통합 가시성 설정의 적용 범위를 평가하는 데도 도움이 됩니다. 롤아웃을 계속 진행하면서 각 서비스의 설정 안내 탭에서 체크인하여 예상되는 구성이 되어 있는지 확인할 수 있습니다:

{{< img src="/administrators_guide/software_catalog_2.png" alt="Software Catalog 홈 화면" style="width:90%;">}}

크론 작업이나 라이브러리처럼 당장 모니터링할 계획이 없는 구성 요소를 추가하여 시스템에 대한 종합적인 보기를 만들고, Datadog 롤아웃의 다음 단계에 앞서 이러한 구성 요소를 담당하는 팀원들을 표시할 수 있습니다.

분류하려는 [엔드포인트 목록][33]을 참조하여 성능 및 안정성을 모니터링하고 API 엔드포인트의 소유권을 관리하세요.

### Resource Catalog

[Resource Catalog][46]를 사용하여 메타데이터, 소유권, 구성, 자산 간의 관계, 활성 보안 위험과 같은 주요 리소스 정보를 확인하세요. [Resource Catalog]는 인프라 규정 준수와 관련한 가시성을 제공하고, 올바른 태깅 방법을 장려하며, 보안 취약성을 식별하여 애플리케이션 위험을 줄여줍니다. 또한 엔지니어링 리더십에 보안 활동에 관한 높은 수준의 뷰를 제공하며, 기록 보관 또는 감사를 위해 리소스를 내보낼 수 있게 해줍니다.

Resource Catalog를 다음과 같은 다양한 상황에서 사용할 수 있습니다.

- 리소스에 대한 팀 소유권을 이해하고 분리된 리소스를 찾아 정리합니다.
- 더 이상 사용되지 않는 버전을 실행 중인 리소스의 업그레이드를 계획합니다.
- 설정 정보 및 기타 메타데이터에 액세스하여 인시던트 응답 속도를 높입니다.
- 잘못된 설정과 취약점을 찾아 해결하여 보안 태세를 유지합니다.

### Event Management 

[Event Management][31]는 추가 설정 없이 타사 이벤트 상태, Agent에서 생성된 이벤트 및 설치된 통합 기능을 표시할 수 있습니다. Datadog Event Management 은 알림 및 변경 이벤트와 같은 타사 이벤트를 중앙 집중화합니다. Datadog는 모니터를 비롯한 다양한 제품에서 이벤트를 자동으로 생성하고 Error Tracking. 또한 Event Management를 사용하여 이벤트 쿼리를 기반으로 모니터 알림을 보낼 수도 있습니다.

### Error Tracking 

Datadog의 [Error Tracking][32]에서 오류가 발생하는 위치를 확인하세요. Error Tracking은 APM, Log Management, Real User Monitoring에서 오류를 수집하여 문제를 더 빠르게 디버깅할 수 있습니다.

### Fleet Automation  

[Fleet Automation][34]을 통해 모든 Datadog Agent를 중앙에서 관리하고 관리하세요. Fleet Automation은 업그레이드가 필요한 Agent를 식별하고, 지원팀에 플레어를 보내며, API 키를 비활성화하거나 로테이션하는 작업을 지원합니다.

{{< img src="/administrators_guide/fleet_automation.png" alt="Fleet Management 홈 화면" style="width:90%;">}}

### 원격 설정

Datadog [Remote Configuration][35](기본적으로 활성화됨)을 사용하여 인프라에 배포된 Datadog 구성 요소(예: Agent, 추적 라이브러리 및 Observability Pipelines Worker)의 동작을 원격으로 설정하고 변경할 수 있습니다. 자세한 내용은 [지원되는 제품 및 기능][36]을 참조하세요.

### Notebooks 

Datadog [Notebooks][37]을 사용하여 팀원들과 정보를 공유하고 인시던트 및 조사에 대한 문제 해결을 지원하세요.

## 데이터 수집 최적화 

Datadog는 사용자 환경에서 많은 것을 수집하므로 수집 지점의 수를 제한하고 가드 레일을 설정하는 것이 중요합니다. 이 섹션에서는 원격 분석 수집을 제어하는 메커니즘에 대해 알아보고 조직의 요구 사항을 어떻게 코드화할 수 있는지 논의합니다.

### 인프라스트럭처

Datadog는 HyperVisor 관리자(Hyper-V, vSphere, PCF), 컨테이너 스케줄러(Kubernetes, Rancher, Docker) 및 퍼블릭 클라우드 제공자(AWS, Azure, GCP)의 모니터링 API와 상호 작용합니다. 이러한 환경 내에서 리소스(포드, VM, EC2, ALB, AzureSQL, GCP 블롭)를 [자동 검색][38]하는 플랫폼을 제공합니다. 모니터링되는 리소스는 요금과 연관되어 있으므로 모니터링되는 리소스의 수를 제한해야 합니다.

**권장 사항**:   

[AWS][39] 및 [GCP][44]의 리소스 수집을 사용 설정하여 리소스 인벤토리와 비용 및 보안 인사이트를 확인합니다. 또한 [Azure 리소스][40] 및 [컨테이너화된][45] 환경에 대한 메트릭 수집을 제한하세요.

## 서비스 계층

계획 단계에서 통합 가시성 인스턴스별로 중요도가 다르다는 것을 알게 될 수 있습니다. 일부는 미션 크리티컬한 반면, 그렇지 않은 인스턴스도 있을 수 있습니다. 따라서 적용 범위 수준에 패턴을 설계하고, Datadog으로 어떤 환경을 모니터링할지 정하는 것이 좋습니다. 예를 들어, 프로덕션 환경은 모든 수준에서 모니터링할 수 있지만, 동일한 애플리케이션의 개발 인스턴스에는 개발자 중심 툴만 있을 수 있습니다.

**권장 사항**:

- 서비스 계층에 관한 예상치를 조기에 수립하세요. 처음부터 정확할 필요는 없지만 도입 영역을 점진적으로 확장하면 도움이 됩니다.

### 소프트웨어 개발 수명 주기

설치 패턴 매핑을 시작하려면 [Datadog 101][73] 교육과 [범위 설정 활동](#scoping-exercise)에서 수집한 정보를 결합하여 작업 계획을 수립합니다. 다음 예시를 참고하여 조직의 필요에 맞게 수정하세요. 이 예는 SDLC 환경(개발, 품질 관리, 단계, 프로덕션) 차원의 설치 패턴을 개략적으로 설명한 것으로, 표준 및 조건에 맞게 커스터마이즈할 수 있습니다. 자체 Datadog 사용자 기반 내에서 "표준 Datadog 설치"가 무엇을 의미하는지 기대치를 설정해 보세요.

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | 거부/허용 | 허용 | 허용 | 허용 |
| **Synthetic Monitoring** | 거부 | 거부/허용 | 허용 | 허용 |
| **Log Management** | 허용 | 허용 | 허용 | 허용 |
| **RUM** | 거부 | 거부/허용 |  허용 | 허용 |
| **DBM** | 거부/허용 | 거부/허용 | 허용 | 허용 |
| **라이브 프로세스** | 거부 | 거부/허용 | 허용 | 허용 |
|  |  |  |  |  |

**권장 사항** :
모든 도구가 모든 작업에 적합한 것은 아닙니다. Datadog 제품 사용 사례를 평가하여 필요에 맞게 사용하세요. SDLC 수준, 애플리케이션 중요도, 각 Datadog 제품의 용도를 고려하세요.

## 요약

Datadog을 설치할 때 과정을 현실적으로 개발 및 계획하는 것이 중요합니다. 이 섹션에서는 계획 및 성공 사례 단계를 알아보고, Datadog을 성공적으로 시작할 수 있는 설정을 알아보았습니다. 지식 기반과 팀원을 파악 및 구성하고, 설치 모델을 개발하며, 최적화를 계획하고, 핵심 제품의 모범 사례 목록을 작성했습니다. 이는 Datadog 설치의 다음 단계인 빌드 및 실행의 토대가 됩니다.

## 다음 단계

[빌드][41] 단계에서는 Datadog 구축에 집중하여 상세한 롤아웃 방법론을 만들고, 내 환경에서 반복 작업을 하며, 내부 지원 메커니즘을 설정하고, 프로덕션을 준비합니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: /ko/getting_started/tagging/
[3]: /ko/getting_started/tagging/unified_service_tagging
[4]: /ko/account_management/rbac/?tab=datadogapplication
[5]: /ko/account_management/multi_organization/
[6]: /ko/account_management/org_settings/service_accounts/
[7]: /ko/account_management/api-app-keys/
[8]: /ko/account_management/teams/
[9]: /ko/tracing/trace_pipeline/ingestion_controls/
[10]: /ko/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /ko/tracing/guide/ingestion_sampling_use_cases/
[12]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[13]: /ko/tracing/trace_collection/tracing_naming_convention/
[14]: /ko/logs/guide/getting-started-lwl/
[15]: /ko/logs/log_configuration/logs_to_metrics/
[16]: /ko/logs/log_configuration/archives/?tab=awss3
[17]: /ko/logs/log_configuration/forwarding_custom_destinations/?tab=http
[18]: /ko/logs/log_configuration/indexes
[19]: /ko/logs/log_configuration/flex_logs/
[20]: /ko/logs/guide/best-practices-for-log-management/
[21]: /ko/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event
[22]: /ko/real_user_monitoring/guide/best-practices-for-rum-sampling/
[23]: https://www.datadoghq.com/pricing/?product=synthetic-testing--monitoring#synthetic-testing--monitoring-common-questions
[24]: /ko/synthetics/browser_tests/advanced_options/#subtests
[25]: /ko/integrations/http_check/
[26]: /ko/infrastructure/process/?tab=linuxwindows
[27]: /ko/infrastructure/process/?tab=linuxwindows\#installation
[28]: /ko/integrations/network/
[29]: /ko/network_monitoring/cloud_network_monitoring/
[30]: /ko/software_catalog/
[31]: /ko/service_management/events/
[32]: /ko/error_tracking/
[33]: /ko/software_catalog/endpoints/
[34]: /ko/agent/fleet_automation/
[35]: /ko/agent/remote_config/
[36]: /ko/agent/remote_config/?tab=configurationyamlfile\#supported-products-and-feature-capabilities
[37]: /ko/notebooks/
[38]: /ko/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[39]: /ko/account_management/billing/aws/#aws-resource-exclusion
[40]: /ko/integrations/guide/azure-portal/?tab=vmextension\#metric-collection
[41]: /ko/administrators_guide/build
[42]: https://drive.google.com/file/d/1yUuz6fUFkFagNi0cYkpyDa7b2sQLHKD6/view
[43]: /ko/integrations/ping/
[44]: /ko/integrations/google_cloud_platform/?tab=project#resource-changes-collection
[45]: /ko/containers/guide/container-discovery-management/?tab=datadogoperator
[46]: /ko/infrastructure/resource_catalog/
[47]: https://www.datadoghq.com/blog/engineering/introducing-husky/
[48]: https://www.datadoghq.com/blog/engineering/husky-deep-dive/
[49]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[50]: /ko/integrations/tcp_check/?tab=host#data-collected
[51]: /ko/tracing/services/inferred_services
[52]: /ko/integrations/amazon_web_services/
[53]: /ko/integrations/google_cloud_platform/
[54]: /ko/integrations/azure/
[55]: /ko/integrations/slack/?tab=datadogforslack
[56]: /ko/integrations/jira/
[57]: /ko/integrations/pagerduty/
[58]: /ko/integrations/#cat-orchestration
[59]: /ko/integrations/#cat-os-system
[60]: /ko/integrations/network/
[61]: /ko/integrations/#cat-data-stores
[62]: /ko/integrations/#cat-message-queues
[63]: /ko/integrations/#cat-automation
[64]: /ko/integrations/#cat-languages
[65]: /ko/integrations/#cat-source-control
[66]: /ko/integrations/okta/
[67]: /ko/integrations/open_policy_agent/
[68]: /ko/universal_service_monitoring/
[69]: /ko/integrations/process/
[70]: /ko/developers/custom_checks/#should-you-write-a-custom-agent-check-or-an-integration
[71]: /ko/synthetics/api_tests/ssl_tests/
[72]: /ko/software_catalog/service_definitions/
[73]: https://learn.datadoghq.com/courses/dd-101-sre
[74]: /ko/logs/log_configuration/flex_logs/#configure-storage-tiers
[75]: /ko/tracing/trace_collection/
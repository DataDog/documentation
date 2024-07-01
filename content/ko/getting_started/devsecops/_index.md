---
kind: documentation
title: DevSecOps 번들 사용하기
---

이 가이드에서는 설치 및 설정에 도움이 되는 링크와 함께 DevSecOps 번들을 소개합니다.

## APM DevSecOps

APM DevSecOps 번들은 [애플리케이션 성능 모니터링(APM)][4]과 [애플리케이션 보안 관리(ASM)][2]의 [애플리케이션 취약성 관리][1] 기능을 결합한 것입니다.

{{< tabs >}}
{{% tab "APM DevSecOps" %}}

APM DevSecOps에는 [애플리케이션 성능 모니터링(APM)][1], [범용 서비스 모니터링][2] 및 [ASM][4]의 [애플리케이션 취약성 관리][3] 기능이 포함됩니다.

### 설정

APM DevSecOps를 시작하려면 애플리케이션 성능 모니터링(APM) 및 범용 서비스 모니터링을 위한 [Datadog Agent를 설치 및 설정하세요][5]. 자세한 지침은 다음 문서를 참조하세요:

- [APM][6]
- [범용 서비스 모니터링][7]

Agent를 설치한 후 환경에 맞게 ASM을 활성화합니다.

- [애플리케이션 보안 관리][8]

### 다음 단계

 APM DevSecOps에 포함된 기능에 대해 자세히 알아보세요:

- [APM 메트릭][9]: 트레이스 애플리케이션 메트릭에 대해 자세히 알아보기
- [범용 서비스 모니터링][2]: 서비스 상태 메트릭에 대한 가시성 확보
- [애플리케이션 취약성 관리][3]: 서비스의 오픈 소스 종속성 취약점 탐지

[1]: /ko/tracing/
[2]: /ko/universal_service_monitoring/
[3]: /ko/security/application_security/vulnerability_management/
[4]: /ko/security/application_security
[5]: /ko/agent/
[6]: /ko/tracing/trace_collection/
[7]: /ko/universal_service_monitoring/setup/
[8]: /ko/security/application_security/enabling/
[9]: /ko/tracing/metrics/

{{% /tab %}}
{{% tab "APM DevSecOps Pro" %}}

APM DevSecOps Pro에는 [애플리케이션 성능 모니터링(APM)][1], [범용 서비스 모니터링][2], [데이터 스트림 모니터링][3], [ASM][5]의 [애플리케이션 취약성 관리][4] 기능이 포함됩니다.

### 설정

APM DevSecOps Pro를 시작하려면 애플리케이션 성능 모니터링(APM), 범용 서비스 모니터링 및 데이터 스트림 모니터링을 위한 [Datadog Agent를 설치 및 설정하세요][6]. 자세한 지침은 다음 문서를 참조하세요:

- [APM][7]
- [범용 서비스 모니터링][8]
- [데이터 스트림 모니터링][9]

Agent를 설치한 후 환경에 맞게 ASM을 설정합니다.

- [애플리케이션 보안 관리][10]

#### 다음 단계

APM DevSecOps Pro에 포함된 기능에 대해 자세히 알아보세요:

- [APM 메트릭][11]: 트레이스 애플리케이션 메트릭에 대해 자세히 알아보기
- [범용 서비스 모니터링][2]: 서비스 상태 메트릭에 대한 가시성 확보
- [데이터 스트림 모니터링][3]: 규모에 따른 파이프라인 이해 및 관리
- [애플리케이션 취약성 관리][4]: 서비스의 오픈 소스 종속성 취약점 탐지

[1]: /ko/tracing/
[2]: /ko/universal_service_monitoring/
[3]: /ko/data_streams/
[4]: /ko/security/application_security/vulnerability_management/
[5]: /ko/security/application_security
[6]: /ko/agent/
[7]: /ko/tracing/trace_collection/
[8]: /ko/universal_service_monitoring/setup/
[9]: /ko/data_streams/#setup
[10]: /ko/security/application_security/enabling/
[11]: /ko/tracing/metrics/

{{% /tab %}}
{{% tab "APM DevSecOps Enterprise" %}}

APM DevSecOps Enterprise에는 [애플리케이션 성능 모니터링(APM)][1], [범용 서비스 모니터링][2], [데이터 스트림 모니터링][3], [지속적 프로파일러][4] 및 [ASM][6]의 [애플리케이션 취약성 관리][5] 기능이 포함됩니다.

### 설정

APM DevSecOps Enterprise를 시작하려면 APM, 범용 서비스 모니터링, 지속적 프로파일러 및 데이터 스트림 모니터링을 위한 [Datadog Agent를 설치 및 설정하세요][7]. 자세한 지침은 다음 문서를 참조하세요:

- [APM][8]
- [범용 서비스 모니터링][9]
- [데이터 스트림 모니터링][10]
- [지속적 프로파일러][11]

Agent를 설치한 후 환경에 맞게 ASM을 설정합니다.

- [애플리케이션 보안 관리][12]

### 다음 단계

APM DevSecOps Enterprise에 포함된 기능에 대해 자세히 알아보세요:

- [APM 메트릭][13]: 트레이스 애플리케이션 메트릭에 대해 자세히 알아보기
- [범용 서비스 모니터링][2]: 서비스 상태 메트릭에 대한 가시성 확보
- [데이터 스트림 모니터링][3]: 규모에 맞는 파이프라인 이해와 관리
- [지속적 프로파일러][4]: 프로덕션에서 코드 성능 최적화
- [애플리케이션 취약성 관리][5]: 서비스의 오픈 소스 종속성 취약점 탐지

[1]: /ko/tracing/
[2]: /ko/universal_service_monitoring/
[3]: /ko/data_streams/
[4]: /ko/profiler/
[5]: /ko/security/application_security/vulnerability_management/
[6]: /ko/security/application_security
[7]: /ko/agent/
[8]: /ko/tracing/trace_collection/
[9]: /ko/universal_service_monitoring/setup/
[10]: /ko/data_streams/#setup
[11]: /ko/profiler/enabling
[12]: /ko/security/application_security/enabling/
[13]: /ko/tracing/metrics/

{{% /tab %}}
{{< /tabs >}}

<br>

## 인프라스트럭처 DevSecOps

인프라스트럭처 DevSecOps 번들은 인프라스트럭처 모니터링과 [클라우드 보안 관리(CSM)][3]의 보안 기능을 결합합니다.

{{< tabs >}}
{{% tab "인프라스트럭처 DevSecOps Pro" %}}

인프라스트럭처 DevSecOps Pro에는 [컨테이너][1], [서버리스][2] 및 [CSM Pro][3]가 포함됩니다. 또한 [750개 이상의 즉시 사용 가능한 통합][4]이 포함됩니다.

### 설정

인프라스트럭처 DevSecOps Pro를 시작하려면 컨테이너 및 서버리스용 [Datadog Agent를 설치 및 설정하세요][5]. 또한 서비스에 대한 통합을 설정해야 합니다. 자세한 지침은 다음 문서를 참조하세요:

- [컨테이너][1]
- [서버리스][2]
- [통합][4]

Agent를 설치한 후 환경에 맞게 CSM Pro를 설정합니다.

- [클라우드 보안 관리 Pro][6]

### 다음 단계

인프라스트럭처 DevSecOps Pro에 포함된 기능에 대해 자세히 알아보세요:

- [인프라스트럭처 목록][7]: 호스트의 활동 보기
- [메트릭][8]: 메트릭 탐색 및 이해
- [호스트 및 컨테이너 맵][9]: 호스트 및 컨테이너 시각화
- [실시간 컨테이너][10]: 환경 전반에 걸쳐 모든 컨테이너를 실시간으로 파악
- [서버리스][2]: 서버리스 애플리케이션을 지원하는 모든 관리형 서비스에 대한 완벽한 가시성 확보
- [클라우드 보안 관리][11]: 클라우드 인프라스트럭처 전반에 걸쳐 실시간 위협 감지 및 지속적인 설정 오딧

[1]: /ko/containers/
[2]: /ko/serverless/
[3]: /ko/security/cloud_security_management/setup/
[4]: /ko/integrations/
[5]: /ko/agent/
[6]: /ko/security/cloud_security_management/setup/csm_pro
[7]: /ko/infrastructure/list/
[8]: /ko/metrics/
[9]: /ko/infrastructure/hostmap/
[10]: /ko/infrastructure/containers/
[11]: /ko/security/cloud_security_management/

{{% /tab %}}
{{% tab "인프라스트럭처 DevSecOps Enterprise" %}}

인프라스트럭처 DevSecOps Enterprise에는 [컨테이너][1], [서버리스][2], [실시간 프로세스][3] 및 [CSM Enterprise][4]가 포함됩니다. 또한 [750개 이상의 즉시 사용 가능한 통합][5]이 포함됩니다.

### 설정

인프라스트럭처 DevSecOps Enterprise를 시작하려면 컨테이너, 서버리스 및 실시간 프로세스용 [Datadog Agent를 설치 및 설정하세요][6]. 또한 서비스에 대한 통합을 설정해야 합니다. 자세한 지침은 다음 문서를 참조하세요:

- [컨테이너][1]
- [서버리스][2]
- [실시간 프로세스][7]
- [통합][5]

Agent를 설치한 후 환경에 맞게 CSM Enterprise를 설정합니다.

- [클라우드 보안 관리 엔터프라이즈][8]

### 다음 단계

인프라스트럭처 DevSecOps Enterprise에 포함된 기능에 대해 자세히 알아보세요:

- [인프라스트럭처 목록][9]: 호스트의 활동 보기
- [메트릭][10]: 메트릭에 대한 탐색 및 이해
- [메트릭 상관관계][11]: 불규칙한 동작을 보이는 다른 메트릭을 검색하여 문제에 대한 잠재적인 근본 원인 찾기
- [호스트 및 컨테이너 맵][12]: 호스트 및 컨테이너 시각화
- [실시간 컨테이너][13]: 환경 전반에 걸쳐 모든 컨테이너를 실시간으로 파악
- [실시간 프로세스][14]: 인프라스트럭처에서 실행 중인 프로세스에 대한 실시간 가시성 확보
- [서버리스][2]: 서버리스를 지원하는 모든 관리형 서비스에 대한 완벽한 가시성 확보
- [Watchdog][15]: 잠재적인 애플리케이션 및 인프라스트럭처 문제 자동 탐지
- [클라우드 보안 관리][16]: 클라우드 인프라스트럭처 전반에 걸쳐 실시간 위협 감지 및 지속적인 설정 오딧

[1]: /ko/containers/
[2]: /ko/serverless/
[3]: /ko/infrastructure/process/
[4]: /ko/security/cloud_security_management/setup/
[5]: /ko/integrations/
[6]: /ko/agent/
[7]: /ko/infrastructure/process/?tab=linuxwindows#installation
[8]: /ko/security/cloud_security_management/setup/csm_enterprise
[9]: /ko/infrastructure/list/
[10]: /ko/metrics/
[11]: /ko/dashboards/correlations/
[12]: /ko/infrastructure/hostmap/
[13]: /ko/infrastructure/containers/
[14]: /ko/infrastructure/process/
[15]: /ko/watchdog/
[16]: /ko/security/cloud_security_management/

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/security/application_security/vulnerability_management/
[2]: /ko/security/application_security
[3]: /ko/security/cloud_security_management/
[4]: /ko/tracing
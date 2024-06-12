---
aliases:
- /ko/integrations/cloud_foundry/
- /ko/integrations/pivotal_platform/
categories:
- 프로비저닝
- 설정 및 배포
- 로그 수집
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/vmware_tanzu_application_service.md
description: VMware Tanzu Application Service(이전 Pivotal Cloud Foundry) VM 상태 및 실행하는
  작업을 추적하세요.
doc_link: /integrations/vmware_tanzu_application_service/
further_reading:
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: 블로그
  text: Datadog를 통한 Pivotal 플랫폼 모니터링
- link: /integrations/guide/application-monitoring-vmware-tanzu/
  tag: documentation
  text: VMware Tanzu용 Datadog 애플리케이션 모니터링
- link: /integrations/guide/cluster-monitoring-vmware-tanzu/
  tag: documentation
  text: VMware Tanzu용 Datadog 클러스터 모니터링
integration_id: pivotal-platform
integration_title: VMware Tanzu Application Service
is_public: true
custom_kind: integration
name: vmware_tanzu_application_service
newhlevel: true
public_title: Datadog-VMware Tanzu Application Service (Pivotal Cloud Foundry) 통합
short_description: VMware Tanzu Application Service VM 상태 및 실행되는 작업을 추적하세요.
updated_for_agent: 6.0
---

## 개요

VMware Tanzu Application Service(이전 Pivotal Cloud Foundry, 자세한 정보는 [VMware 공지 사항][1] 참조) 배포는 Datadog에 메트릭과 이벤트를 전송할 수 있습니다. 배포 환경의 모든 노드 상태와 가용성을 추적하고, 실행하는 작업을 모니터링하고, Loggregator Firehose에서 메트릭을 수집할 수 있습니다.

최상의 경험을 위해 이 페이지를 사용하여 자동으로 VMware Tanzu Application Service와 VMware Tanzu Application Service 클러스터의 응용 프로그램에 대해 Tanzu Ops Manager를 통한 모니터링을 설정합니다. 수동 설정 단계는 [VMware Tanzu Application Service 수동 설치 가이드][2]를 참조하세요.

Datadog와 VMware Tanzu Application Service 통합에는 세 개의 주요 구성 요소가 있습니다. 첫 번째로 빌드팩은 애플리케이션에서 커스텀 메트릭을 수집하는 데 사용됩니다. 두 번째로 BOSH Release는 플랫폼에서 메트릭을 수집합니다. 세 번째로 Loggregator Firehose Nozzle은 인프라스트럭처에서 다른 모든 메트릭을 수집합니다. 자세한 정보는  [Datadog VMware Tanzu Application Service 아키텍처][3] 가이드를 읽으세요.

## 애플리케이션 모니터링

 [VMware Tanzu 설치 및 설정][4] 가이드를 사용해 Tanzu Ops Manager를 통한 통합을 설치합니다. 수동 설정 단계의 경우 수동 설정 가이드의 [애플리케이션 모니터링][5] 섹션을 읽으세요.

### 구성

#### 메트릭 수집

빌드팩을 활성화하려면 환경에서 API 키를 설정합니다.

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_API_KEY <DATADOG_API_KEY>
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP>
```

#### 트레이스 및 프로파일 수집

Datadog 애플리케이션 성능 모니터링(APM)은 기본적으로 활성화됩니다.  [APM 설정][6] 및 [프로파일링 설정][7]에서 사용자 언어를 위한 자세한 설정 정보를 알아보세요.

#### 오류

{{% site-region region="us3" %}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{% /site-region %}}

{{% site-region region="us,us5,eu,gov,ap1" %}}

##### 로그 수집 활성화

VMware Tanzu Application Service에서 로그 수집을 시작하려면, 빌드팩에 포함된 에이전트와 로그 수집 기능이 활성화되어 있어야 합니다.

```shell
cf set-env <YOUR_APP_NAME> DD_LOGS_ENABLED true
# Disable the Agent core checks to disable system metrics collection
cf set-env <YOUR_APP_NAME> DD_ENABLE_CHECKS false
# Redirect Container Stdout/Stderr to a local port so the Agent collects the logs
cf set-env <YOUR_APP_NAME> STD_LOG_COLLECTION_PORT <PORT>
# Configure the Agent to collect logs from the wanted port and set the value for source and service
cf set-env <YOUR_APP_NAME> LOGS_CONFIG '[{"type":"tcp","port":"<PORT>","source":"<SOURCE>","service":"<SERVICE>"}]'
# restage the application to make it pick up the new environment variable and use the buildpack
cf restage <YOUR_APP_NAME>
```

##### 로그 수집 설정

다음 표는 위에 나온 파라미터와 로그 수집을 위해 해당 파라미터를 어떻게 사용할 수 있는지를 설명합니다.

| 파라미터                 | 설명                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_LOGS_ENABLED`         | Datadog 에이전트 로그 수집을 사용하려면 `true`로 설정합니다.                                                                                      |
| `DD_ENABLE_CHECKS`        | `false`로 설정하여 핵심 검사를 통한 에이전트 시스템 메트릭 수집을 비활성화합니다.                                                       |
| `STD_LOG_COLLECTION_PORT` | `stdout` 또는 `stderr`에서 로그를 수집할 때 사용해야 합니다. `stdout` 또는 `stderr` 스트림을 해당 로컬 포트 값으로 리디렉션합니다. |
| `LOGS_CONFIG`             | 이 옵션을 사용해 에이전트가 로컬 TCP 포트와 통신하도록 설정하고 `service` 및 `source` 파타미터 값을 지정합니다.          |

**예시:**

`app01`이란 이름의 자바(Java) 애플리케이션이 VMware Tanzu Application Service에서 실행 중입니다. 다음 설정은 컨테이너 `stdout`/`stderr`를 로컬 포트 `10514`로 리디렉션합니다. 그런 다음 에이전트를 설정하여 포트에서 로그를 수집하고 `service` 및 `source`에 대한 적절한 값을 지정합니다.

```shell
# Redirect Stdout/Stderr to port 10514
cf set-env app01 STD_LOG_COLLECTION_PORT 10514
# Configure the Agent to listen to port 10514
cf set-env app01 LOGS_CONFIG '[{"type":"tcp","port":"10514","source":"java","service":"app01"}]'
```

##### 프록시가 잘못 설정된 경우 알림

에이전트 버전 6.12 이상의 경우 빌드팩과 함께 [프록시 설정][101]을 사용하면 인증이 실행되어 연결이 설정되었는지 확인합니다. 이 테스트 결과에 따라 로그 수집이 시작됩니다.

연결에 실패하고 로그 수집이 시작되지 않으면 이와 같은 이벤트가 [이벤트 탐색기][102]에 나타납니다. 모니터를 설정해 이러한 이벤트를 추적하고 잘못 설정된 빌드팩이 배포되면 알림을 받습니다.

{{< img src="integrations/cloud_foundry/logs_misconfigured_proxy.png" alt="Datadog 이벤트와 타이틀 로그 엔드포인트가 도달할 수 없음 - 로그 수집 시작 안 됨 및 TCP 연결을 설정할 수 없음이라는 메시지" >}}

### 태그 할당

애플리케이션에 커스텀 태그를 추가하려면 `manifest.yml` 파일 또는 CF CLI 명령을 통해 `DD_TAGS` 환경 변수를 설정하세요.

```shell
# set the environment variable
cf set-env <YOUR_APP> DD_TAGS key1=value1,key2=value2
# restage the application to make it pick up the new environment variable and use the new tags
cf restage <YOUR_APP>
```

[101]: /ko/agent/logs/proxy/
[102]: /ko/events/explorer/

{{% /site-region %}}

### 수집한 데이터

[DogStatsD][10]를 사용해 커스텀 애플리케이션 메트릭을 Datadog로 전송할 수 있습니다. 자세한 정보는 [메트릭 제출: DogStatsD][11]을 참조하세요. 다양한 애플리케이션과 호환되는 [DogStatsD 라이브러리][12] 목록이 있습니다.

## VMware Tanzu Application Service 클러스터 모니터링

[VMware Tanzu 설치 및 설정][13] 가이드를 사용해 Tanzu Ops Manager를 통한 통합을 설치하세요. 수동 설정 단계는 수동 설정 가이드의 [VMware Tanzu Application Service 클러스터 모니터링][14] 섹션을 읽으세요.

## 커뮤니티 오피스 아워

### 모바일 바이탈

다음 메트릭은 Datadog Firehose Nozzle에서 전송되었으며 접두어로 `cloudfoundry.nozzle`이 사용되었습니다. Datadog 에이전트는 기본적으로 Director 런타임 설정, [시스템][15], [네트워크][16], [디스크][17] 및 [NTP][18] 메트릭에서 설정한 모든 에이전트 검사에서 메트릭을 전송합니다.

Datadog Firehose Nozzle은 CounterEvents(이벤트가 아닌 메트릭으로만), ValueMetrics 및 ContainerMetrics만 수집하고 LogMessages 및 Errors를 무시합니다.

PCF 버전과 배포 환경에 따라 구체적인 메트릭 목록은 달라질 수 있습니다 Datadog는 [Loggregator v2 API][19]에서 전송된 개수 및 게이지 메트릭을 수집합니다. 기본적으로 전송되는 메트릭 목록은 [Cloud Foundry 구성 요소 메트릭][20]을 참조하세요.

{{< get-metrics-from-git "cloud_foundry">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://tanzu.vmware.com/pivotal#:~:text=Pivotal%20Cloud%20Foundry%20%28PCF%29%20is%20now%20VMware%20Tanzu%20Application%20Service
[2]: /ko/integrations/guide/pivotal-cloud-foundry-manual-setup
[3]: /ko/integrations/faq/pivotal_architecture
[4]: /ko/integrations/guide/application-monitoring-vmware-tanzu/
[5]: /ko/integrations/guide/pivotal-cloud-foundry-manual-setup#monitor-your-applications
[6]: /ko/tracing/setup/
[7]: /ko/profiler/enabling/
[8]: /ko/agent/logs/proxy/
[9]: /ko/events/explorer/
[10]: /ko/developers/dogstatsd/
[11]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[12]: /ko/libraries/
[13]: /ko/integrations/guide/cluster-monitoring-vmware-tanzu/#installation
[14]: /ko/integrations/guide/cloud-foundry-setup/#monitor-your-cloud-foundry-cluster
[15]: /ko/integrations/system/#metrics
[16]: /ko/integrations/network/#metrics
[17]: /ko/integrations/disk/#metrics
[18]: /ko/integrations/ntp/#metrics
[19]: https://github.com/cloudfoundry/loggregator-api
[20]: https://docs.cloudfoundry.org/running/all_metrics.html
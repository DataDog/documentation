---
description: Datadog와 VMware Tanzu Application Service 통합 개요
further_reading:
- link: https://www.datadoghq.com/blog/pivotal-cloud-foundry-architecture/
  tag: 블로그
  text: VMware Tanzu Application Service 아키텍처
- link: https://docs.datadoghq.com/integrations/pivotal_pks/
  tag: 설명서
  text: Pivotal Container Service
kind: faq
title: Datadog VMware Tanzu Application Service 통합 아키텍처
---

## 개요

이 페이지에서는 Datadog Pivotal Container Service 통합의 아키텍처를 설명합니다.

{{< img src="integrations/pivotal/pivotal_datadog_diagram.png" alt="VMware Tanzu Application Service와 Datadog 통합의 구성 요소 개요와 두 애플리케이션 간의 데이터 흐름" >}}

다음 섹션에서는 개별 구성 요소에 관한 자세한 내용와 각 구성 요소 간의 관계를 설명합니다.

## Pivotal Cloud Foundry/PAS의 Datadog 구성 요소

Tanzu Ops Manager의 애플리케이션 모니터링과 클러스터 모니터링 타일에서 Datadog와 VMware Tanzu Application Service 통합의 구성 요소를 배포 및 구성할 수 있습니다. 
- **Datadog 클러스터 모니터링 타일** - 플랫폼 엔지니어가 PCF 플랫폼 구성 요소에서 메트릭과 로그를 수집하고, 가시화하고, 알림을 설정할 때 사용합니다. 사용자는 이 타일에서 Datadog 노드 에이전트, Datadog 클러스터 에이전트(DCA), Firehose Nozzle을 배포할 수 있습니다.
- **Datadog 애플리케이션 모니터링 타일** - 애플리케이션 개발자가 애플리케이션에서 커스텀 메트릭, 트레이스, 로그를 수집할 때 사용합니다. 사용자는 이 타일에서 컨테이너 에이전트, 트레이스 에이전트, DogStatsD가 포함된 Datadog Buildpack을 배포할 수 있습니다.

## Datadog 클러스터 모니터링 타일 구성 요소

### 노드 에이전트

Datadog로 데이터를 전송하는 BOSH VM, 보고서 호스트(VM), 컨테이너, 프로세서에는 모두 노드 에이전트가 있습니다. 노드 에이전트는 Tanzu Ops Manager의 **클러스터 모니터링** 타일에서 구성하고 배포할 수 있습니다. 지원되는 통합에서 로그를 가져올 때도 노드 에이전트를 사용할 수 있습니다.

#### 수집하는 태그

   - 기본 BOSH VM과 관련된 메타데이터(예: `bosh_job`, `bosh_name`)
   - Datadog 클러스터 에이전트(DCA)의 해당 컨테이너와 애플리케이션 태그
   - 구성하는 동안 타일에서 추가된 커스텀 태그

수집된 메타데이터는 전부 호스트 VM과 컨테이너 태그로 나타납니다. 노드 에이전트가 모니터링하는 호스트 VM은 [Infrastructure List][1]에 표시되고 호스트 내 기본 컨테이너는 [Container Map][2]과 [Live Containers][3] 페이지에 표시됩니다.

### Datadog 클러스터 에이전트(DCA)

[DCA][4]를 사용하면 중앙 집중 방식으로 간편하게 클러스터 수준의 모니터링 데이터를 수집할 수 있습니다. 쿠버네티스 환경 내 DCA와 유사하게 작동합니다. DCA는 개별 단일 노드 에이전트 대신 CAPI(Cloud Controller API)를 쿼리하기 때문에 CAPI의 로드를 줄여줍니다. 또 클러스터 수준 메타데이터를 노드 에이전트로 릴레이하여 로컬로 수집된 메트릭을 보강해줍니다. 노드 에이전트가 정기적으로 DCA에서 클러스터 메타데이터를 얻기 위해 내부 API 엔드포인트를 폴링하고 VM 내 해당 컨테이너에 할당합니다.

#### 수집하는 메타데이터

   - 클러스터 수준 메타데이터(예: `org_id`, `org_name`, `space_id`, `space_name`)
   - 자동탐지 태그 형식 `tags.datadoghq.com/k=v`을 따르는 애플리케이션 메타데이터로 노출된 레이블과 주석
   - 각 호스트 VM에서 실행 중이 앱 목록

애플리케이션에 자동탐지 태그가 CAPI 수준에서 메타데이터로 추가됩니다. CAPI를 통해 커스텀 태그를 추가할 수 있고 DCA에서 이 태그를 정기적으로 확인합니다. 또 DCA가 Firehose Nozzle의 캐시로 작동하도록 클러스터 모니터링 타일에서 옵션을 구성할 수도 있습니다. 이 옵션을 사용하면 노즐이 CAPI 대신 DCA로 데이터를 쿼리할 수 있기 때문에 CAPI의 로드를 줄여줍니다. DCA에서 수집한 메타데이터는 Containers 페이지에서 볼 수 있고, PCF 컨테이너에는 `cloudfoundry`, `app_name`, `app_id`, `bosh_deployment` 태그가 할당됩니다.

### Firehose Nozzle

Datadog Firehose Nozzle의 경우 배포 Loggregator(배포 메트릭과 애플리케이션 로그를 집계하는 PCF 시스템)의 정보를 이용합니다. 노즐이 Firehose에서 내부 노즐 메트릭, 애플리케이션 메트릭, 조직 메트릭, 로그를 수집하고 CAPI에서 수집한 관련 태그와 애플리케이션 메타데이터를 추가합니다. 클러스터 모니터링 타일에서 허용 및 거부 목록 메커니즘을 이용해 Datadog Firehose Nozzle의 메타데이터 필터를 구성할 수 있습니다. 노즐에서 수집한 메트릭에 추가할 메타데이터를 지정하고 [Metrics Summary][5]와 [Metrics Explorer][6]에서 메트릭과 관련 태그를 볼 수 있습니다.

#### 수집된 메타데이터

   - 자동탐지 태그 형식 `tags.datadoghq.com/k=v`를 따르는 애플리케이션 메타데이터로 노출된 태그. CAPI에서 애플리케이션 메타데이터에 추가할 수 있는 태그.

## Datadog 애플리케이션 모니터링 타일 구성 요소

### Buildpack

Datadog Buildpack를 사용하면 애플리케이션과 컨테이너에 APM용 경량 프로그램인 Datadog 컨테이너 에이전트와 Datadog 트레이스 에이전트를 설치합니다. 에이전트는 로그 수집이 `DD_LOGS_ENABLED=TRUE` 설정으로 활성화된 경우에만 실행되며, 애플리케이션 수준 로그를 Datadog로 전송합니다. 그 외에는 DogStatsD가 메트릭을 전송합니다. Datadog 빌드팩으로 애플리케이션을 실행하면 애플리케이션의 환경 변수를 사용해 여러 구성 옵션을 적용할 수 있습니다. 변수는 애플리케이션 매니페스트(`manifest.yml`)나 CF(Cloud Foundry) CLI에서 `cf set-env` 명령을 사용해 가져올 수 있습니다.

#### 수집된 메타데이터

   - `VCAP_APPLICATION` 환경 변수에서 추출한 태그(예: `application_id`, `name`, `instance_index`, `space_name`, `uris`)와 `CF_INSTANCE_IP` 환경 변수에서 추출한 `cf_instance_ip` 태그
   - `DD_TAGS` 환경 변수를 사용해 추가한 태그 

이 태그는 Datadog 에이전트로 수집한 메트릭, 트레이스, 로그에 있습니다. 수집한 데이터에 따라 [Metrics Explorer][5]나 [Metrics Summary][6], [Trace Explorer][8], 또는 [Log Explorer][9]에서 볼 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/infrastructure/list/
[2]: /ko/infrastructure/containermap/
[3]: /ko/infrastructure/livecontainers/
[4]: /ko/containers/cluster_agent/
[5]: /ko/metrics/summary/
[6]: /ko/metrics/explorer/
[7]: /ko/containers/docker/
[8]: /ko/tracing/trace_explorer/
[9]: /ko/logs/explorer/
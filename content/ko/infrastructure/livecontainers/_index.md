---
aliases:
- /ko/guides/livecontainers
- /ko/graphing/infrastructure/livecontainers/
further_reading:
- link: /infrastructure/livecontainers/configuration
  tag: 설명서
  text: 실시간 컨테이너 설정
- link: /infrastructure/hostmap/
  tag: 설명서
  text: 호스트맵을 통해 모든 호스트를 한 화면에서 확인하세요.
- link: /infrastructure/process/
  tag: 설명서
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
- link: https://www.datadoghq.com/blog/monitor-kubernetes-anomalies/
  tag: 블로그
  text: 쿠버네티스 이상 징후를 사용해 인프라스트럭처 조사 신속화
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: 블로그
  text: 쿠버네티스 워크로드 규모 효율화를 위한 실용적인 팁
kind: 도움말
title: 실시간 컨테이너
---

## 개요

[Datadog 실시간 컨테이너][1]를 사용하면 환경 전반의 모든 컨테이너에 대한 실시간 가시성을 확보할 수 있습니다.

htop*, *ctop*, *kubectl*과 같은 기반 도구에서 영감을 얻은 실시간 컨테이너는 2초 단위의 리소스 메트릭, 패싯 검색, 스트리밍 컨테이너 로그를 통해 지속적으로 업데이트되는 테이블에서 컨테이너 인프라스트럭처를 완벽하게 파악할 수 있도록 해줍니다.

[도커][2], [쿠버네티스][3], [ECS][4] 및 기타 컨테이너 기술과 동적 구성 요소의 기본 제공 태그가 결합된 실시간 컨테이너 보기는 컨테이너의 상태, 리소스 소비, 로그 및 배포에 대한 자세한 개요를 실시간으로 제공합니다:

{{< img src="infrastructure/livecontainers/live-containers-overview.png" alt="실시간 컨테이너 요약" >}}

실시간 컨테이너를 확인하려면 [컨테이너 페이지][1]로 이동합니다. 그러면 자동으로 **컨테이너** 보기로 이동합니다.

## 설정

헬름과 데몬셋에 대한 자세한 설정은 [실시간 컨테이너 설정 도움말][5]을 참고하세요.

## 검색, 필터링, 피벗 기능

### 스트링 검색

컨테이너는 기본적으로 카디널리티가 매우 높은 개체입니다. Datadog의 유연한 스트링 검색은 컨테이너 이름, ID 또는 이미지 필드에 있는 하위 문자열을 일치시킵니다.

쿠버네티스 리소스를 활성화하면 `pod`, `deployment`, `ReplicaSet`, `service name` 등의 스트링과 쿠버네티스 라벨을 [쿠버네티스 리소스 보기](#kubernetes-resources-view)에서 검색할 수 있습니다.

여러 스트링 검색을 하나의 복잡한 쿼리로 결합하기 위해 다음 부울 연산자를 사용합니다:

`AND`
: **교집합**: 선택한 이벤트에 두 단어가 모두 있음(아무것도 추가하지 않을 경우, AND가 기본적으로 사용됨) <br> **예**: `java AND elasticsearch`

`OR`
: **합집합**: 선택한 이벤트에 두 단어 중 하나가 있음 <br> **예**: `java OR python`

`NOT` / `!`
: **제외**: 이벤트에 해당 단어가 없음.  `NOT` 또는 `!` 문자를 사용해 동일한 결과를 얻을 수 있음<br> **예**: `java NOT elasticsearch` 또는 `java !elasticsearch`

괄호를 사용하여 연산자를 그룹화합니다. 예를 들면, `(NOT (elasticsearch OR kafka) java) OR python`과 같습니다.

### 필터링 및 피벗 기능

아래 스크린샷은 25개 노드의 쿠버네티스 클러스터로 필터링된 시스템을 보여줍니다. 컨테이너에 프로비저닝 제한이 있는 경우 컨테이너의 RSS 및 CPU 사용률은 컨테이너의 프로비저닝 제한과 비교하여 보고됩니다. 여기에서는 이 클러스터의 컨테이너가 오버 프로비저닝된 것이 분명합니다. 더 엄격한 제한과 빈 패킹을 사용하여 리소스 활용도를 높일 수 있습니다.

{{< img src="infrastructure/livecontainers/filter-by.png" alt="25개 노드의 쿠버네티스 클러스터로 필터링된 시스템" style="width:80%;">}}

컨테이너 환경은 동적이며 따라가기 어려울 수 있습니다. 다음 스크린샷은 시스템 노이즈를 줄이기 위해 `kube_service`와 `host`로 피벗되고, `kube_namespace:default`로 필터링된 것을 보여줍니다. 어떤 서비스가 어디에서 실행되고 있는지, 주요 메트릭의 포화도가 어느 정도인지 확인할 수 있습니다:

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="호스트 x 서비스" style="width:80%;">}}

ECS `ecs_task_name`과 `ecs_task_version` 별로 피벗하여 업데이트 간 리소스 사용률의 변화를 파악할 수 있습니다.

{{< img src="infrastructure/livecontainers/tasksxversion2.png" alt="타스크 x 버전" style="width:80%;">}}

쿠버네티스 리소스의 경우 필터링을 위해 `environment`, `service`, `pod_phase`와 같은 Datadog 태그를 선택합니다. 왼쪽의 컨테이너 패싯을 사용하여 특정 쿠버네티스 리소스를 필터링할 수도 있습니다. Datadog 태그별로 포드를 그룹화하면 정보를 더 빠르게 찾을 수 있는 집계된 보기를 얻을 수 있습니다. 쿠버네티스 라벨은 검색할 수 있지만 클러스터 맵에서는 사용할 수 없습니다.

## 태그 설정

컨테이너에는 기존의 모든 호스트 레벨 태그, 그리고 개별 컨테이너와 연결된 메타데이터가 [태그][6]로 지정됩니다.

모든 컨테이너에는 추가 컨테이너 레벨 태그를 제공하는 [ECS][4] 및 [쿠버네티스][3]와 같은 인기 있는 오케스트레이터와의 통합을 포함하여 `image_name`로 태그가 지정됩니다. 또한 각 컨테이너에는 도커, ECS 또는 쿠버네티스 아이콘이 표시되어 어떤 컨테이너가 오케스트레이션 되고 있는지 한눈에 알 수 있습니다.

ECS 컨테이너의 태그는 다음과 같습니다:

* `task_name`
* `task_version`
* `ecs_cluster`

쿠버네티스 컨테이너의 태그는 다음과 같습니다:

* `pod_name`
* `kube_pod_ip`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster`

[통합 서비스 태깅][7]에 대한 설정이 있는 경우, `env`, `service`, `version`이 자동으로 선택됩니다.
이러한 태그로 APM, 로그, 메트릭, 실시간 컨테이너 데이터를 함께 묶을 수 있습니다.

## 보기

### 컨테이너 보기

**컨테이너** 보기에는 [산점도](#scatter-plot) 및 [시계열][8] 보기와 컨테이너 이름, 상태, 시작 시간 등의 필드별로 컨테이너 데이터를 정리할 수 있는 테이블이 포함되어 있습니다.

#### 산점도

산점도 분석을 이용하면 메트릭 두 개를 비교하여 컨테이너 성능을 더 깊이 이해할 수 있습니다.

컨테이너 페이지의 **요약 그래프** 섹션에서 "산점도"와 "시계열" 탭 사이를 전환할 수 있습니다:

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="산점도 선택" style="width:80%;">}}

기본적으로 그래프는 `short_image` 태그 키에 따라 그룹화됩니다. 각 점의 크기는 해당 그룹의 컨테이너 수를 나타내며, 점을 클릭하면 그룹에 기여하는 개별 컨테이너 및 호스트가 표시됩니다.

산점도 분석 상단에 있는 쿼리를 이용해 산점도 분석을 조정할 수 있습니다:

* 표시할 메트릭 선택
* 메트릭 두 개를 집계할 방법 선택
* X축과 Y축의 배율 선택(*선형*/*로그*).

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="산점도" style="width:80%;">}}

#### 실시간 모니터링

컨테이너 페이지에서 활발하게 작업하는 동안 메트릭은 2초 단위로 수집됩니다. 이는 CPU와 같이 변동성이 큰 메트릭에 중요한 역할을 합니다. 백그라운드에서는 히스토리 컨텍스트를 위해 메트릭이 10초 단위로 수집됩니다.

### 쿠버네티스 리소스 보기

라이브 컨테이너용 쿠버네티스 리소스를 활성화하면 페이지 왼쪽 상단의 "리소스 선택" 드롭다운 메뉴에서 **클러스터**, **포드**, **디플로이먼트**, **레플리카셋**, **데몬셋**, **스테이트풀셋**, **서비스**, **크론잡**, **잡** 및 **노드** 보기 간에 토글할 수 있습니다.

이러한 각 보기에는 상태, 이름, 쿠버네티스 라벨과 같은 필드별로 데이터를 정리하는데 유용한 데이터 테이블과 포드 및 쿠버네티스 클러스터에 대한 전반적인 진행 상황을 제공하는 클러스터 맵이 포함되어 있습니다.

{{< img src="infrastructure/livecontainers/kubernetes-resources-view.png" alt="필드별로 정리된 데이터 테이블" style="width:80%;">}}

#### 기능 및 패싯별로 그룹화

태그 또는 쿠버네티스 라벨 별로 포드를 그룹화하면 정보를 더 빠르게 찾을 수 있는 집계된 보기가 나타납니다. 페이지 오른쪽 상단의 "Group by" 막대를 사용하거나 특정 태그 또는 라벨을 클릭하고 아래 그림과 같이 컨텍스트 메뉴에서 기능별로 그룹을 찾습니다.

{{< img src="infrastructure/livecontainers/group-by.mp4" alt="팀별 그룹화의 예" video=true style="width:80%;">}}

또한 페이지 왼쪽의 패싯을 활용하여 리소스를 빠르게 그룹화하거나 CrashLoopBackOff 포드 상태의 포드와 같이 가장 관심 있는 리소스를 필터링할 수도 있습니다.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="CrashLoopBackOff 포드 상태 그룹화 예시" video=true style="width:80%;">}}

#### 클러스터 맵

쿠버네티스 클러스터 맵은 포드와 쿠버네티스 클러스터에 대한 전반적인 그림을 제공합니다. 커스텀 그룹과 필터를 사용하여 모든 리소스를 한 화면에서 함께 볼 수 있으며, 포드의 색상을 채울 메트릭을 선택할 수 있습니다.

상세 패널을 채우려면 클러스터 맵에서 원이나 그룹을 클릭하여 리소스를 살펴봅니다.

커스텀 그룹 및 필터를 사용하여 모든 리소스를 한 화면에서 함께 볼 수 있으며, 포드 색상을 채울 메트릭을 선택할 수 있습니다.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="사용자 지정 그룹 및 필터가 포함된 클러스터 맵" video=true style="width:80%;">}}

#### 정보 패널

테이블의 행이나 클러스터 맵의 개체를 클릭하면 사이드 패널에서 특정 리소스에 대한 정보를 볼 수 있습니다.

{{< img src="infrastructure/livecontainers/information-panel.mp4" alt="사이드 패널의 리소스 보기" video=true style="width:80%;">}}

이 리소스에 대한 자세한 대시보드를 보려면 이 패널의 오른쪽 상단에 있는 대시보드 보기를 클릭합니다.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="라이브 컨테이너 개요에서 포드 대시보드로 연결되는 링크" style="width:80%;">}}

이 패널은 선택한 컨테이너 또는 리소스에 대한 문제를 해결하고 정보를 찾는 데 유용합니다:

* [**로그**][9]: 컨테이너 또는 리소스의 로그를 확인합니다. 로그를 클릭하면 로그 탐색기에서 관련 로그를 볼 수 있습니다.
* [메트릭**][10]: 컨테이너 또는 리소스에 대한 실시간 메트릭을 확인합니다. 이 탭에서 그래프를 전체 화면으로 보거나, 스냅샷을 공유하거나, 내보낼 수 있습니다.
* **네트워크**: 소스, 대상, 송수신된 볼륨, 처리량 필드 등 컨테이너 또는 리소스의 네트워크 성능을 볼 수 있습니다. **Destination** 필드를 사용하여 `DNS` 또는 `ip_type`와 같은 태그로 검색하거나 **Group by** 필터를 사용하여 `pod_name` 또는 `service`와 같은 태그별로 네트워크 데이터를 그룹화할 수 있습니다.
* [**트레이스**][11]: 트레이스의 날짜, 서비스, 기간, 방법, 상태 코드를 포함하여 컨테이너 또는 리소스에서 트레이스를 확인합니다.

쿠버네티스 리소스 보기에는 몇 가지 추가 탭이 있습니다:

* **프로세스**: 이 리소스의 컨테이너에서 실행 중인 모든 프로세스를 확인합니다.
* **YAML**: 리소스에 대한 자세한 YAML 개요입니다.
* [**이벤트**][12]: 리소스에 대한 모든 쿠버네티스 이벤트를 확인합니다.

이 리소스에 대한 자세한 대시보드를 보려면 이 패널의 오른쪽 상단 모서리에 있는 **대시보드 보기**를 클릭하세요.

#### 리소스 사용

**리소스 사용** 탭은 **클러스터 맵** 탭의 오른쪽에 있습니다.

{{< img src="infrastructure/livecontainers/resource_utilization.png" alt="컨테이너 리소스 사용" style="width:80%;">}}

이 탭에는 시간 경과에 따른 CPU 및 메모리 사용량이 표시됩니다. 이 정보를 통해 리소스가 과잉 또는 부족하게 프로비저닝된 위치를 파악할 수 있습니다.

테이블의 행을 클릭하면 사이드 패널에서 특정 리소스에 대한 정보를 볼 수 있습니다.

{{< img src="infrastructure/livecontainers/resource_utilization_panel.png" alt="컨테이너 리소스 사용 사이드 패널 세부 정보" style="width:80%;">}}

위의 스크린샷에서, 포드는 클러스터 이름별로 그룹화되어 있습니다. 특정 클러스터 내의 포드에 대해 사이드 패널이 열리며, 포드의 평균 CPU 및 메모리 사용량이 표시됩니다.

### 컨테이너 로그

`docker logs -f` 또는 `kubectl logs -f`와 같은 Datadog에 있는 모든 컨테이너에 대한 스트리밍 로그를 확인합니다. 상세하게 살펴보려면 테이블에서 컨테이너를 클릭합니다. *로그* 탭을 클릭하면 [라이브 테일][13]의 실시간 데이터 또는 과거 어느 시점에서 인덱싱된 로그를 볼 수 있습니다.

#### 라이브 테일

라이브 테일을 사용하면 모든 컨테이너 로그가 스트리밍됩니다. 스트리밍을 일시 중지하면 빠르게 기록되는 로그를 읽을 수 있으며, 일시 중지를 해제하면 스트리밍을 계속할 수 있습니다.

스트리밍 로그는 간단한 스트링 매칭으로 검색할 수 있습니다. 자세한 내용은 [라이브 테일][13]을 참조하세요.

**참고**: 스트리밍 로그는 유지되지 않으며, 새 검색을 입력하거나 페이지를 새로고침하면 지워집니다.

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="로그 미리 보기 사이드 패널" video="true" >}}

#### 인덱싱된 로그

해당 기간을 선택하면 인덱싱 및 보존을 위해 선택한 인덱싱된 로그를 확인할 수 있습니다. 인덱싱을 사용하면 태그와 패싯을 사용하여 로그를 필터링할 수 있습니다. 예를 들어, 오류 상태의 로그를 검색하려면 검색 상자에 status:error를 입력합니다. 자동 완성 기능을 사용하면 원하는 특정 태그를 찾을 수 있습니다. 또한, 로그에 대한 주요 속성은 태그에 이미 저장되어 있으므로 필요에 따라 검색, 필터링 및 집계할 수 있습니다.

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="로그 미리 보기 사이드 패널" style="width:100%;">}}

## 참고 사항 및 이슈

* 30분 후에는 실시간 (2초) 데이터 수집 기능이 꺼집니다. 실시간 수집을 재개하려면 페이지를 새로 고침 하세요.
* RBAC 설정은 쿠버네티스 메타데이터 수집을 제한할 수 있습니다. [Datadog 에이전트의 RBAC 엔티티][14]를 참조하세요.
* 쿠버네티스에서 `health` 값은 컨테이너의 활성 프로브가 아니라 컨테이너의 준비 상태 프로브입니다.

### 쿠버네티스 리소스

* 데이터는 일정한 간격으로 자동 업데이트됩니다. 베타 버전에서는 업데이트 간격이 변경될 수 있습니다.
* 디플로이먼트 또는 레플리카셋이 1000개 이상인 클러스터에서는 클러스터 에이전트의 CPU 사용량이 증가할 수 있습니다. 헬름 차트에서 컨테이너 스크러빙을 비활성화하는 옵션이 있으며, 자세한 내용은 [헬름 차트 리포지토리][15]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ko/integrations/docker_daemon/
[3]: /ko/agent/kubernetes/
[4]: /ko/agent/amazon_ecs/
[5]: /ko/infrastructure/livecontainers/configuration
[6]: /ko/tagging/assigning_tags?tab=agentv6v7#host-tags
[7]: /ko/getting_started/tagging/unified_service_tagging
[8]: /ko/dashboards/widgets/timeseries/
[9]: /ko/logs
[10]: /ko/metrics
[11]: /ko/tracing
[12]: /ko/events
[13]: /ko/logs/explorer/live_tail
[14]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
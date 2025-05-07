---
aliases:
- /ko/graphing/infrastructure/hostmap/
- /ko/infrastructure/containermap/
- /ko/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: 설명서
  text: 환경 전반의 모든 컨테이너에 대한 실시간 가시성 확보
- link: /infrastructure/process/
  tag: 설명서
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
title: 호스트 및 컨테이너 맵
---

## 개요

Infrastructure Maps([Host Maps][4] 및 [Container Maps][5])를 사용하면 하나의 스크린에서 호스트와 컨테이너를 가시화할 수 있습니다. 색상과 형태를 이용해 메트릭을 종합적으로 이해할 수 있습니다.

{{< img src="infrastructure/containermap/containermap.png" alt="AWS 가용 영역별로 그룹화되어 네모 모양으로 표시된 컨테이너 맵" style="width:80%;">}}

왼쪽 상단 모서리에 있는 드롭다운 선택기를 사용해 호스트와 컨테이너 간 전환을 할 수 있습니다.

## 설치

[에이전트][6]를 배포한 후에는 다른 설정이 필요하지 않습니다. [Docker 에이전트][7]가 아닌 표준 설치에서 Docker 컨테이너 정보를 수집하려면 `dd-agent` 사용자에게 `docker.sock` 접근 권한이 있어야 합니다. 권한은 `dd-agent`를 `docker` 그룹에 추가하여 부여할 수 있습니다.

## 사용법

### 필터링

**Filter** 입력 박스를 사용해 호스트 맵을 인프라스트럭처의 특정 하위 집합으로 제한할 수 있습니다. 왼쪽 상단의 필터 입력 막대를 사용하면 태그 및 Datadog 제공 속성을 이용해 인프라스트럭처 맵을 필터링할 수 있습니다.

필터 입력 막대가 비어 있는 경우, 선택한 메트릭을 Datadog에 보고하는 모든 호스트/컨테이너가 맵에 표시됩니다.

예를 들어, 호스트가 위치한 환경별로 호스트에 태그를 지정하는 경우 'production'으로 필터링하여 스테이징 및 다른 환경의 호스트를 맵에서 제거할 수 있습니다. production에서 하나의 호스트 역할을 제외하고 모두 제거하려면 해당 역할을 필터에 추가하세요. 필터가 모두 `AND`로 묶입니다.

**참고**:  `tag:value` 필터링과 `"tag:value"` 필터링 사이에 차이가 있습니다. `tag:value` 필터링은 태그를 엄격하게 일치시키지만 `"tag:value"` 필터링은 해당 텍스트를 검색합니다.

### 그룹

**그룹** 입력 상자를 사용해 그룹에 호스트와 컨테이너를 배열할 수 있습니다. 그룹에 있는 호스트와 컨테이너는 그룹화한 단일 태그 또는 복수 태그를 공유합니다.

예를 들어, AWS 가용 영역별로 호스트를 그룹화할 수 있습니다. 인스턴스 유형과 같은 두 번째 그룹화 태그를 추가하면 아래와 같이 호스트가 먼저 가용 영역에 따라 그룹으로 세분화되고 인스턴스 유형별로 다시 세분화됩니다.

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="호스트(육각형으로 표현)가 가용 영역별로 두 그룹으로 나누어진 호스트 맵. 각 가용 영역 그룹 내에 호스트가 인스턴스 유형별로 하위 구분되어 있음" >}}

### 채우기 및 크기

기본적으로 각 호스트/컨테이너의 색상은 해당 호스트의 CPU 사용량 비율을 나타내며, 색상은 녹색 (사용률 0%)에서 주황색 (사용률 100%)까지 다양합니다. **Fill** 선택기에서 다른 메트릭을 선택할 수 있습니다.

Infrastructure Maps는 육각형이나 직사각형 크기로 선택 옵션 메트릭과 추가적으로 소통할 수 있습니다.

**참고**: CPU 사용률 메트릭은 Datadog 에이전트에서 보고하든 AWS 또는 vSphere에서 직접 보고하든 상관없이 CPU 사용률을 가장 안정적이고 최신으로 측정합니다.

### 태그

[태그][1]를 직접 적용하거나 [통합][2]을 사용해 자동으로 적용할 수 있습니다. 그리고 이 태그를 이용해 호스트와 컨테이너를 필터링할 수 있습니다.

예를 들어 일부 호스트가 AWS에서 실행되는 경우 다음과 같은 AWS 전용 태그를 사용할 수 있습니다:

* `availability-zone`
* `region`
* `image`
* `instance-type`
* `security-group`
* 사용할 수 있는 모든 EC2 태그(예: `name`)

Datadog 에이전트는 호스트 메타데이터 및 애플리케이션 정보도 수집하며, 이 중 일부는 필터로 사용하거나 용어를 그룹화하는 데 사용할 수 있습니다. 이러한 필드에는 다음이 포함됩니다:

- `field:metadata_agent_version`
- `field:metadata_platform`
- `field:metadata_processor`
- `field:metadata_machine`
- `field:apps`

`field:apps`는 Datadog 에이전트가 호스트에서 수집한 메트릭에서 파생한 것이고, 이를 통해 어떤 통합 또는 Datadog 제품이 활성화된 상태인지 알 수 있습니다. 예를 들어, `field:apps:universal` 값은 호스트에 범용 서비스 모니터링이 실행 중인지 여부를 나타냅니다.

### 확대

탐색하려는 호스트나 컨테이너를 발견한 경우 클릭하여 상세 정보를 봅니다. 확대하여 해당 호스트에 대한 최대 6개의 통합 보고 메트릭을 표시할 수 있습니다. 통합이 6개 이상인 경우 호스트 상세 정보 창의 **앱** 헤더 아래 목록화됩니다. 아래 스크린샷을 참조합니다.

통합 이름을 클릭하면 해당 통합에 대한 메트릭이 요약된 대시보드가 표시됩니다. 아래 스크린샷은 "시스템"을 클릭하여 CPU 사용량, 메모리 사용량, 디스크 대기 시간 등과 같은 시스템 메트릭을 가져오는 것을 보여줍니다.

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="사용자가 특정 호스트를 클릭했을 때 표시되는 보기입니다. 장보 패널은 하단에 표시되어 메트릭과 상태 점검 섹션과 함께 다양한 앱을 나열합니다." style="width:75%;" >}}

### 에이전트가 설치되지 않은 호스트를 호스트 맵에 표시합니다.

기본적으로 호스트 맵에는 선택한 메트릭을 보고하는 호스트만 표시되며, 이를 사용하여 그리드 내의 개별 육각형에 색상이나 크기를 설정할 수 있습니다.

### 데이터의 최신성 및 의미

호스트 맵의 데이터는 맵과 계속 상호작용하지 않는 한 1분에 한 번씩 새로 고침됩니다. 화면 왼쪽 하단에서 데이터가 마지막으로 업데이트된 시간을 확인할 수 있습니다.

## 사용 사례

### 리소스 최적화

AWS 사용자인 경우 다양한 인스턴스 유형을 사용할 수 있습니다. 일부 인스턴스는 메모리에, 일부 인스턴스는 계산에 최적화되어 있으며 크기도 다양합니다.

AWS 지출을 줄이려면 어떤 고비용 인스턴스가 사용되는지 먼저 파악해야 합니다. 먼저 `instance-type`별로 그룹화한 다음 `role` 또는 `name`으로 그룹화합니다. **c3.8xlarge** 등 고비용 인스턴스 유형을 살펴봅니다. CPU 활용률이 낮은 호스트 역할이 있나요? 그렇다면 확대하여 개별 호스트를 확인합니다. 모든 계산이 필요한 것이었는지, 이 호스트 그룹이 저비용 인스턴스 유형으로 이전할 대상이 될 수 있는지 확인합니다.

아래는 Datadog 인프라스트럭처의 하위 집합입니다. 보시다시피, **c3.2xlarge** 인스턴스의 부하가 매우 높습니다.

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="A view of a number of hosts, represented by hexagons, that have been grouped by instance type: m3.large, c3.2xlarge 및 m1.xlarge별로 그룹화된 육각형 표시된 호스트 개수에 대한 보기입니다. m3.large 및 m1.xlarge에 있는 대부분의 호스트는 녹색으로 낮은 CPU 활용률을 보여줍니다. 하지만 c3.2xlarge의 호스트는 주황색으로 높은 CPU 활용률을 보여줍니다." style="width:80%;">}}

c3.2xlarge 그룹을 클릭한 다음 역할(아래 표시)별로 하위 그룹화를 수행하면 일부 역할만 로딩되고 나머지는 거의 유휴 상태임을 확인할 수 있습니다. 이러한 7개의 녹색 노드를 c3.xlarge로 다운그레이드하면 거의 연간 13000 달러를 절약할 수 있습니다(호스트별 시간당 0.21 달러 절감 x 일 24시간 * 365일/연 * 7개 호스트 = 연간 12,877.20 달러). 

{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="이전에 표시된 c3.2xlarge 그룹으로 이제 역할별로 하위 그룹화되었습니다. 일부 그룹은 동일하게 주황색이지만 일부 그룹은 모두 녹색입니다." style="width:80%;">}}

### 가용 영역 배치

호스트 지도를 통해 각 가용성 영역(AZ)에서 기기의 분포를 볼 수 있습니다. 관련된 호스트에 대해 필터링하면 AZ별로 그룹화되어 즉시 재조정이 필요한 리소스를 확인할 수 있습니다.

아래 예시에서는 가용 영역에 걸쳐 `role:daniels`와 함께 호스트가 고르지 않게 분포되어 있습니다. (Daniels는 내부 애플리케이션의 이름입니다.)

{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="역할(daniels)별 필터링되고 가용성 영역으로 그룹화된 호스트 지도입니다. 세 그룹의 호스트가 표시됩니다." style="width:80%;" >}}

### 문제 조사

프로덕션에 문제가 있다고 가정해 봅시다. 일부 호스트의 CPU가 고정되어 긴 대기 시간을 유도할 수 있습니다. 호스트 지도는 빠르게 로드된 호스트와 로드되지 않은 호스트 간 차이를 확인할 수 있도록 해줍니다. 탐색하려는 차원별로 빠르게 그룹화하여 시각적으로 문제 서버가 특정 서버에 속하는지 파악할 수 있습니다. 예를 들어 AZ, 지역, 인스턴스 유형, 이미지 및 시스템에서 사용한 모든 태그별로 그룹화할 수 있습니다.

아래 스크린샷에서 일부 호스트는 동일한 클러스터에서도 다른 호스트 대비 사용 가능한 메모리가 적습니다. 기기 이미지별 그룹화는 사용되는 2개의 다른 이미지가 있고 그중 하나가 오버로드되었음을 보여줍니다.

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands" style="width:80%;" >}}

{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/
[2]: /ko/integrations/
[3]: /ko/infrastructure/hostmap/
[4]: https://app.datadoghq.com/infrastructure/map?node_type=host
[5]: https://app.datadoghq.com/infrastructure/map?node_type=container
[6]: /ko/agent/
[7]: /ko/agent/docker/
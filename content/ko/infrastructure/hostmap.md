---
aliases:
- /ko/graphing/infrastructure/hostmap/
- /ko/infrastructure/containermap/
- /ko/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: 그래프화
  text: 환경 전반의 모든 컨테이너에 대한 실시간 가시성 확보
- link: /infrastructure/process/
  tag: 그래프화
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
kind: 설명서
title: 요약
---

## 개요

인프라 지도([호스트 지도][4] 및 [컨테이너 지도][5])를 통해 단일 화면에 호스트와 컨테이너를 시각화할 수 있습니다. 색상과 도형을 통해 메트릭이 이해하기 쉽게 표시됩니다.

{{< img src="infrastructure/containermap/containermap.png" alt="AWS 가용성 영역별로 그룹화된 사각형 모양 컨테이너를 표시한 컨테이너 지도" style="width:80%;">}}

왼쪽 상단에서 드롭다운 선택기를 사용해 호스트와 컨테이너 간 전환합니다.

## 설치

[에이전트][6]을 배포한 후 다른 설정은 필요하지 않습니다. [도커(Docker) 에이전트][7]를 사용하는 대신 표준 설치로 도커 컨테이너 정보를 수집하는 경우 `dd-agent` 사용자가 `docker.sock`에 액세스할 수 있는 권한이 있어야 합니다. `docker` 그룹에 `dd-agent`을 추가하여 권한을 부여할 수 있습니다.

## 사용법

### 필터링

**필터** 입력 상자를 사용하여 인프라스트럭처 특정 하위집합으로 인프라스트럭처 지도를 제한할 수 있습니다. 왼쪽 삳단의 필터 입력 모음을 사용해 태그별 또는 Datadog 제공 속성별로 인프라스트럭처 지도 필터링을 활성화할 수 있습니다. 

필터 입력 모음이 비어 있는 경우 지도는 Datadog로 선택 메트릭을 보고하는 모든 호스트와 컨테이너를 표시합니다.

예를 들어, 호스트가 위치한 환경별로 호스트를 태그하는 경우 '프로덕션'별로 필터링하여 스테이징 환경 및 지도의 기타 환경에서 호스트를 제거할 수 있습니다. 프로덕션 환경에서 단일 호스트 역할만 제거하려면 해당 역할을 필터에 추가합니다. 그러면 필터가 `AND`로 함께 연결됩니다.

**참고**: `tag:value` 및 `"tag:value"` 필터링 간 차이가 존재합니다. `tag:value` 필터링은 태그와 완전히 일치하는 값을 찾고 `"tag:value"` 필터링은 해당 텍스트에 대한 검색을 수행합니다. 

### 그룹

**그룹** 입력 상자를 사용해 그룹에 호스트와 컨테이너를 배열할 수 있습니다. 그룹에 있는 호스트와 컨테이너는 그룹화한 단일 태그 또는 복수 태그를 공유합니다.

예를 들어 AWS 가용성 영역별로 호스트를 그룹화할 수 있습니다. 인스턴스 유형 등 두 번째 그룹화 태그를 추가한 경우 호스트가 그룹으로 하위 구분됩니다. 첫 번째 기준은 가용성 영역이고 두 번째 기분은 인스턴스 유형입니다. 아래를 참조합니다.

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="가용성 영역별로 두 그룹으로 나뉘어 호스트가 육각형으로 표시된 호스트 지도입니다. 각 가용성 영역 그룹화에서 호스트는 추가로 인스턴스 유형별로 하위 구분됩니다." >}}

### 입력 및 크기

기본적으로 각 호스트의 색상은 호스트/컨테이너에서 CPU 사용량에 대한 비율을 표시하도록 설정됩니다. 생성 범위는 녹색(0% 활용)에서 주황색(100% 활용)입니다. **입력** 선택기에서 각기 다른 메트릭을 선택할 수 있습니다.

인프라스트럭처 지도는 또한 추가로 부수적인 메트릭을 육각형 또는 사각형 크기로 표시합니다. 이 메트릭을 **크기** 선택기에서 선택할 수 있습니다.

**참고**: CPU 활용률 메트릭은 CPU 활용률에 대한 가장 안정적인 최신 측정값을 사용합니다. Datadog 에이전트가 보고한 것일 수도 있고 AWS 또는 vSphere에서 직접 보고한 것일 수 있습니다.

### 태그

수동으로 [태그][1]를 적용하거나 [통합][2]를 사용해 자동으로 적용할 수 있습니다. 그런 다음 해당 태그를 사용하여 호스트 또는 컨테이너를 필터링합니다.

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
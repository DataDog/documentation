---
aliases:
- /ko/graphing/infrastructure/hostmap/
- /ko/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: 그래프화
  text: 환경 전반의 모든 컨테이너에 대한 실시간 가시성 확보
- link: /infrastructure/process/
  tag: 그래프화
  text: 시스템의 모든 레벨에서 발생하는 상황 파악
kind: 설명서
title: 호스트 맵
---

## 개요

호스트 맵은 색상과 모양으로 이해하기 쉽게 만들어진 메트릭을 이용해 호스트를 한 화면에 시각화합니다.

## 사용법

### 필터링

`Filter by`는 호스트 맵을 인프라스트럭처의 특정 하위 집합으로 제한합니다. 왼쪽 상단의 필터 입력 막대는 태그 및 Datadog 제공 속성을 이용한 호스트 맵 필터링을 활성화합니다.

필터 입력 막대가 비어 있는 경우, 선택한 메트릭을 Datadog에 보고하는 모든 호스트가 맵에 표시됩니다.

예: 호스트가 위치한 환경별로 호스트에 태그를 지정하는 경우 'production'으로 필터링하여 스테이징 및 다른 환경의 호스트를 맵에서 제거할 수 있습니다. production에서 하나의 호스트 역할을 제외하고 모두 제거하려면 해당 역할을 필터에 추가하세요. 필터가 함께 `AND`가 됩니다.

**참고**:  `tag:value` 필터링과 `"tag:value"` 필터링의 차이 — `tag:value` 필터링은 태그를 엄격하게 일치시키지만 `"tag:value"` 필터링은 해당 텍스트에 대해 검색합니다.

### 태그별 그룹 호스트

`Group hosts by tags`는 호스트를 클러스터로 정렬합니다. 그룹에 속한 모든 호스트는 사용자가 그룹화한 태그를 공유합니다.

간단한 예로는 AWS 가용 영역별로 호스트를 그룹화하는 것입니다. 인스턴스 유형과 같은 두 번째 그룹화 태그를 추가하면 아래와 같이 호스트가 먼저 가용 영역에 따라 그룹으로 세분화되고 인스턴스 유형별로 다시 세분화됩니다.

{{< img src="infrastructure/hostmap/hostmappart2image2.png" alt="Datadog Host Maps AZ Instance Groups" >}}

### 태그

[태그][1]는 [Datadog 통합][2]에 의해 자동으로 적용되거나 수동으로 적용될 수 있습니다. 이를 사용하여 호스트를 필터링할 수 있습니다.

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

조사하려는 호스트를 식별했으면 해당 호스트를 클릭하여 자세한 내용을 확인합니다. 해당 호스트의 메트릭을 보고하는 통합을 최대 6개까지 확대하여 표시합니다. 6개 이상의 통합이 있는 경우 아래 스크린샷과 같이 호스트의 세부정보 창에 있는 "앱" 헤더 아래에 나열됩니다.

통합 이름을 클릭하면 해당 통합에 대한 메트릭이 요약된 대시보드가 표시됩니다. 아래 스크린샷은 "시스템"을 클릭하여 CPU 사용량, 메모리 사용량, 디스크 대기 시간 등과 같은 시스템 메트릭을 가져오는 것을 보여줍니다.

{{< img src="infrastructure/hostmap/blog-host-maps-01.png" alt="Datadog Host Maps Zoom In" style="width:75%;" >}}

### 모양과 색상

기본적으로 각 호스트의 색상은 해당 호스트의 CPU 사용량 비율을 나타내며, 색상은 녹색 (사용률 0%)에서 주황색 (사용률 100%)까지 다양합니다. `Fill by` 셀렉터에서 다른 메트릭을 선택할 수 있습니다.

호스트 맵은 육각형 크기와 함께 추가적으로 메트릭을 전달할 수도 있습니다: `Size by` 셀렉터를 사용하세요.

**참고**: "CPU 사용률 %" 메트릭은 Datadog 에이전트에서 보고하든 AWS 또는 vSphere에서 직접 보고하든 상관없이 CPU 사용률을 가장 안정적이고 최신으로 측정합니다.

### 에이전트가 설치되지 않은 호스트를 호스트 맵에 표시합니다.

기본적으로 호스트 맵에는 선택한 메트릭을 보고하는 호스트만 표시되며, 이를 사용하여 그리드 내의 개별 육각형에 색상이나 크기를 설정할 수 있습니다.

### 데이터의 최신성 및 의미

호스트 맵의 데이터는 맵과 계속 상호작용하지 않는 한 1분에 한 번씩 새로 고침됩니다. 화면 왼쪽 하단에서 데이터가 마지막으로 업데이트된 시간을 확인할 수 있습니다.

## 사용 사례

### 리소스 최적화

AWS 사용자라면 다양한 인스턴스 유형을 사용하고 있을 것입니다. 어떤 인스턴스는 메모리에 최적화되어 있고, 어떤 인스턴스는 컴퓨팅에 최적화되어 있으며, 어떤 인스턴스는 작고 어떤 인스턴스는 큽니다. 
AWS 지출을 줄이려면 고비용의 인스턴스가 어디에 사용되는지 파악할 필요가 있습니다. 먼저 `instance-type`로 그룹화한 후 `role` 또는 `name`로 그룹을 만듭니다. **c3.8xlarge**와 같은 고비용의 인스턴스 유형을 살펴보세요. CPU 사용률이 낮은 호스트 역할이 있나요? 그렇다면 개별 호스트를 확대하여 지난 몇 달 동안 해당 컴퓨팅 마력이 모두 필요했는지 또는 이 호스트 그룹이 더 저렴한 인스턴스 유형으로 마이그레이션할 수 있는 후보인지 확인합니다.

아래는 Datadog 인프라스트럭처의 하위 집합입니다. 보시다시피, **c3.2xlarge** 인스턴스의 부하가 매우 높습니다.

{{< img src="infrastructure/hostmap/hostmappart1image2.png" alt="Host map part 1" style="width:80%;">}}

아래에서 볼 수 있듯이, c3.2xlarge 그룹을 클릭한 다음 역할별로 하위 그룹화하면 일부 역할만 로드되고 다른 역할은 거의 유휴 상태인 것을 확인할 수 있습니다. 이 7개의 녹색 노드를 c3.xlarge로 다운그레이드하면 연간 약 13,000달러를 절약할 수 있습니다. (호스트당 시간당 $0.21 절약 x 24시간/일 * 365일/년 * 7개 호스트 = $12,877.20/년)

{{< img src="infrastructure/hostmap/hostmappart1image3.png" alt="Datadog Host Maps Instance-Role Groups" style="width:80%;">}}

### 가용 영역 배치

호스트 맵을 통해 각 가용 영역(AZ)에 있는 머신의 분포를 확인할 수 있습니다. 관심 있는 호스트를 필터링하고 AZ별로 그룹화하면 리소스의 재분배 필요 여부를 즉시 확인할 수 있습니다.

아래 예시에서는 가용 영역에 걸쳐 `role:daniels`와 함께 호스트가 고르지 않게 분포되어 있습니다. (Daniels는 내부 애플리케이션의 이름입니다.)

{{< img src="infrastructure/hostmap/hostmappart1image4.png" alt="Datadog Host Maps AZ Balance" style="width:80%;" >}}

### 문제 조사

프로덕션 환경에서 문제가 발생했다고 가정해 보세요. 일부 호스트의 CPU가 고정되어 있어 응답 시간이 길어지고 있을 수 있습니다. 호스트 맵을 사용하면 로드된 호스트와 로드되지 않은 호스트에 대해 다른 점이 있는지 빠르게 확인할 수 있습니다. 또한, 조사하고자 하는 관점별로 빠르게 그룹화하여 문제가 있는 서버가 특정 그룹에 속하는지 시각적으로 확인할 수 있습니다. 
예를 들어 가용 영역, 지역, 인스턴스 유형, 이미지 또는 시스템 내에서 사용하는 태그를 기준으로 그룹화합니다.

아래는 Datadog의 최근 이슈에서 나온 스크린샷입니다. 일부 호스트는 같은 클러스터에 속해 있음에도 불구하고 다른 호스트보다 사용 가능한 메모리가 훨씬 적습니다. 머신 이미지별로 그룹화하면 두 개의 서로 다른 이미지가 사용 중이며 그 중 하나가 과부하 상태임을 알 수 있습니다.

{{< img src="infrastructure/hostmap/hostmappart1image5.png" alt="Datadog Host Maps Two Memory Usage Bands" style="width:80%;" >}}

{{< img src="infrastructure/hostmap/hostmappart1image6.png" alt="Datadog Host Maps Two Image Groups" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/
[2]: /ko/integrations/
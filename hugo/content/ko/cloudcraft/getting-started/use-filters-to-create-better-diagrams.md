---
title: 필터를 사용하여 더 뛰어난 다이어그램 생성
---

대규모 환경의 다이어그램의 경우 한 번에 렌더링되는 컴포넌트의 수가 많으면 성능 및 가독성 문제가 발생할 수 있으며, 이로 인해 환경이 나빠질 수 있습니다.

이러한 문제를 방지하기 위해 Cloudcraft에서는 **필터링된 레이아웃** 기능을 사용하여 필터를 적용하거나 라이브 컴포넌트를 배치할 때 서비스를 제외할 것을 권장합니다.

보다 작은 다이어그램을 만들면 훨씬 쉽게 관리할 수 있습니다. 또한 사용자가 정보를 수집하는 방식을 더 잘 제어할 수 있습니다.

<div class="alert alert-info">Cloudcraft의 새 라이브 환경을 사용하는 경우 <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">더 뛰어난 다이어그램 생성하기: Cloudcraft의 라이브 다이어그램 작성 및 필터링</a> 문서를 참조하세요.</div>

## 검색 패턴

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/search-patterns.png" alt="Cloudcraft에서 사용하는 검색 패턴." responsive="true" style="width:100%;">}}

**라이브** 탭의 검색 상자에 스캔 결과에 영향을 미치는 패턴을 입력할 수 있습니다.

애플리케이션이 지원하는 패턴은 다음과 같습니다.

- 매칭되는 컴포넌트의 이름 또는 ID. 예: `i-052g93wu49qed3hxw`.
- 매칭되는 컴포넌트 유형. 예: `type=ec2`.
- 매칭되는 컴포넌트의 IP 주소. 예: `172.31.42.142`.
- 매칭되는 태그 지정 컴포넌트. 예: `environment=prod` 또는 `environment`.
- VPC, 보안 그룹 또는 서브넷 내부의 매칭되는 컴포넌트. 예: `vpc-088c40abeb9ce0c1d`.

다음과 같이 연산자를 사용할 수도 있습니다.

- AND(`type=ec2 AND env=prod`).
- OR(`type=ec2 OR type=rds`)
- NOT(`NOT platform=linux`)
- (...)(`type=rds AND (env=staging OR env=prod)`).

이 두 가지 기능을 조합하면 강력한 필터를 생성하여 하나 이상의 애플리케이션에 다이어그램을 범위 지정할 수 있습니다.

## 서비스 제외

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/excluding-services.png" alt="Cloudcraft 다이어그램에서 제외되는 AWS 서비스." responsive="true" style="width:100%;">}}

일부 서비스만 제외하려면 검색 패턴을 적용하는 것이 과도한 작업일 수 있으므로, Cloudcraft는 해당 작업을 보다 쉽게 할 수 있는 방법을 제공합니다.

AWS 계정을 스캔한 후 **Live** 탭에서 **Auto Layout**을 클릭하면 AWS 환경에서 열 두 개로 작성된 서비스 목록을 확인할 수 있습니다.

클릭하여 서비스를 **Included services**에서 **Excluded services** 열로 이동하거나 그 반대로 이동할 수 있습니다.

## 검색 패턴 사용 및 필터 적용

이러한 개념 중 몇 가지를 실제로 적용해 보겠습니다.

아키텍처 다이어그램을 생성하되 `service=wirecraft`로 태그 지정된 EC2 인스턴스와 EBS 볼륨만 표시하고 싶은 경우를 생각해 보겠습니다. 또한 'Stopped' 상태의 EC2 인스턴스는 모두 무시한다고 가정해 보겠습니다.

이미 AWS 환경을 스캔했고, Cloudcraft는 인벤토리에 계정의 컴포넌트 목록를 표시합니다. 다음으로 무엇을 해야 할까요?

1. **Live** 탭에서 쿼리에 해당하는 검색 패턴을 검색 상자에 입력합니다. 본 예시에서 패턴은 `service=wirecraft AND (type=ec2 running OR type=ebs)`입니다. 이제 **Auto Layout** 버튼이 **Filtered Layout**이라고 표시되어 있는 것을 확인할 수 있습니다.
2.  **Filtered Layout**을 클릭합니다.
3. **Layout**을 클릭합니다. 이제 다이어그램의 컴포넌트가 1단계의 패턴과 일치합니다.

기타 대안은 다음과 같습니다.

- 다른 AWS 지역에서 동일한 쿼리를 실행합니다. **Layout**을 클릭하기 전에 **Options** 드롭다운에서 **Include existing components**을 선택합니다. 현재 인벤토리에 있는 보조 지역의 모든 컴포넌트와 다이어그램에 이미 존재하는 모든 컴포넌트에 필터링된 레이아웃을 적용합니다.
- **Filtered layout**과 **Blueprint link** 기능을 조합하여 대규모 환경을 서로 연결되는 여러 개의 다이어그램으로 세분화할 수 있습니다. 또한 성능 저하 없이 전체 클라우드 아키텍처를 한눈에 파악할 수 있는 개요 다이어그램을 만들 수도 있습니다.

{{< img src="cloudcraft/getting-started/use-filters-to-create-better-diagrams/filtered-layout-search-patterns-wb5btuyldh4q.mp4" alt="Cloudcraft 사용자가 필터링된 다이어그램을 생성하는 53초 동영상." video="true">}}

[1]: https://www.cloudcraft.co/request-demo
[2]: https://app.cloudcraft.co/support
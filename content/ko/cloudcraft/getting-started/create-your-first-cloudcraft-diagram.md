---
title: 첫 번째 라이브 클라우드 다이어그램 만들기
---

Cloudcraft를 사용하면 AWS 및 Azure 클라우드 환경을 *라이브 다이어그램*으로 가져올 수 있습니다. Cloudcraft 은 클라우드 계정의 아키텍처를 리버스 엔지니어링하여 새 다이어그램을 자동 생성하거나 기존 다이어그램을 개선하여 몇 시간 또는 며칠의 작업 시간을 절약할 수 있습니다.

<div class="alert alert-info">Cloudcraft 새로운 라이브 환경을 사용하는 경우, 대신 <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">더 나은 다이어그램 만들기: Cloudcraft 의 라이브 다이어그램 작성 및 필터링</a>을 참조하세요.</div>

## 사전 필수 조건

시작하기 전에 클라우드 계정을 Cloudcraft에 연결하세요.

- AWS 계정의 경우 [AWS 계정과 Cloudcraft 계정 연결하기][1]를 참조하세요.
- Azure 계정의 경우 [Cloudcraft][2]로 Azure 계정 연결]을 참조하세요.

## 최초의 라이브 다이어그램

클라우드 아키텍처를 스캔하고 시각화하려면 청사진을 새로 만듭니다. 청사진에는 다이어그램, 예산, 개별 구성 요소에 첨부하는 모든 문서가 포함됩니다.

1. Cloudcraft에서 **AWS** 또는 **Azure** 탭을 선택한 다음 **라이브** 탭을 선택합니다. 이 가이드에서는 주로 AWS 계정에 중점을 둡니다. Azure 계정이 있는 경우 프로세스는 비슷합니다.

**Live** 탭에서는 계정을 선택하고, 지역을 스캔하고, 레이아웃을 생성하고, 계정의 모든 리소스를 볼 수 있습니다.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="Cloudcraft에서 AWS 및 Live 탭이 강조된 실시간 인프라 다이어그램" responsive="true" style="width:100%;">}}

Cloudcraft에 AWS 계정을 하나만 추가한 경우 해당 계정이 자동으로 선택됩니다. 그렇지 않은 경우 드롭다운에서 계정을 선택합니다.

2. 스캔할 지역을 선택합니다. 여러 지역을 스캔하여 하나의 다이어그램에 통합할 수도 있지만, 하나의 지역부터 시작하는 것이 좋습니다.

**Scan now** 버튼 아래에는 **Live** 또는 **Snapshot**이라는 토글이 있어 어떤 종류의 다이어그램을 만들 것인지 애플리케이션에 알려줍니다. **Live**를 선택하면 다이어그램이 내 계정의 정보로 계속 업데이트됩니다. **Snapshot**을 선택하면 특정 시점 이미지가 생성되며, 이는 다이어그램이 자동으로 업데이트되지 않음을 의미합니다.

이 예에서는 **Live* 옵션을 사용합니다. **Live** 토글을 활성화합니다. 옵션 오른쪽에 있는 톱니바퀴 아이콘은 다이어그램 업데이트를 위한 추가 사용자 지정 설정을 제공합니다. 이 가이드의 목적상 기본 상태로 두는 것이 좋습니다.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="ICloudcraft 인터페이스에서 토글을 Live로 설정하여 실시간 리소스 다이어그램을 표시한 화면." responsive="true" style="width:100%;">}}

3. **Scan now**을 클릭하여 계정에서 [지원되는 AWS 구성요소][3]를 스캔합니다. 스캔이 완료되면* *Scan complete**  메시지가 표시됩니다.

스캔이 완료되면 **자동 레이아웃** 버튼과 AWS 계정에서 지원되는 모든 구성 요소가 나타납니다. 즉시 수동으로 추가할 수도 있지만, 애플리케이션이 자동으로 레이아웃을 설정하도록 하는 것이 좋습니다.

두 가지 방법으로 이를 달성할 수 있습니다.

- **Auto layout** 기능 사용
- **Filtered layout** 기능 사용

**Auto layout** 기능은 모든 구성 요소를 다이어그램에 추가하고 그 연결과 관계를 보여주기 때문에 가장 간단합니다. 예를 들어, **Auto layout**을 구성하여 다른 모든 구성 요소는 제외하고 EC2 인스턴스만 표시하도록 할 수 있습니다.

이 설명서의 다이어그램 유형은 **Live*로, AWS 계정에서 EC2 인스턴스를 제거하면 변경 사항이 다이어그램에 반영된다는 의미입니다.

**Filtered Layout** 기능은 패턴과 일치하는 다이어그램을 만들 수 있으므로 클라우드 아키텍처를 다이어그램화하는 보다 고급적이고 강력한 방법입니다. 예를 들어 `environment=production` 및 `environment=staging`으로 태그된 리소스가 많지만 프로덕션에 있는 구성 요소만 다이어그램에 추가하려는 경우 `environment=production`으로 필터링하면 이 값과 키의 정확한 조합으로 태그된 구성 요소만 포함될 수 있습니다.

클라우드 제공업체에서 리소스에 태그를 지정하지 않아도 필터 기능을 사용할 수 있습니다. 예를 들어 전원이 꺼진 EC2 인스턴스만 있는 다이어그램을 만들려면 `ec2 !running` 필터를 사용할 수 있습니다.

다음 동영상은 **Filtered layout**의 힘을 보여줍니다. AWS에서 영업팀은 Cloudcraft 데모와 관련된 여러 리소스에 키 `Environment`와 값 `Demo`를 태그합니다. 데모하려는 내용과 각 구성 요소가 서로 어떻게 연결되는지 보려면 **Live** 탭 바로 아래의 검색창에서 `Environment=demo` 필터를 사용하면 됩니다.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example-video.mp4" alt="Cloudcraft에서 사용자가 필터링된 다이어그램을 생성하는 과정을 보여주는 11초 분량의 영상" video="true">}}

`Environment=demo`로 레이블이 지정된 구성 요소는 AWS에 해당 리소스에 태그가 지정되어 있지 않더라도 해당 VPC, 서브넷, 보안 그룹 내에 표시됩니다. WAF는 동일한 태그를 가지고 있음에도 불구하고 AWS API가 WAF와 나머지 구성 요소 간의 연결을 나타내지 않기 때문에 VPC 외부에 배치됩니다.

구성 요소가 서로 연결되는 방식은 서비스에 따라 다릅니다. Cloudcraft에서는 사용 가능한 모든 클라우드 API를 사용하여 가능한 한 관계를 검색합니다.

4. **Auto Layout** 기능을 계속 구성하려면 **Live/Snapshot** 토글 아래에서 **Auto Layout**을 선택합니다.

새 대화 상자에서 다이어그램에 포함할 AWS 구성 요소를 결정할 수 있습니다. 대화 상자에는 세 가지 옵션 중 하나를 선택할 수 있는 **Options** 드롭다운 메뉴도 포함되어 있습니다:

- 기존 구성 요소를 교체합니다.
- 기존 구성 요소를 포함합니다.
- 기존 구성 요소를 그대로 둡니다.

이 옵션은 이미 구성 요소가 있는 다이어그램에서 **Auto layout**을 사용하는 경우 애플리케이션에 실행할 작업을 알려줍니다.

- **Replace existing components**를 선택하면 다이어그램에 이미 있는 모든 구성 요소가 새 구성 요소로 바뀝니다.
- **Include existing components**을 선택하면 애플리케이션이 다이어그램의 모든 구성 요소만 아니라 인벤토리의 모든 구성 요소에 대해 자동 레이아웃을 실행합니다.
- **Leave existing components**를 선택하면 다이어그램의 구성 요소는 변경되지 않지만 애플리케이션에서 새 구성 요소에 대한 자동 레이아웃을 실행합니다.

새 다이어그램을 만들고 있으므로 메뉴에서 *Replace existing components**를 선택합니다. **Layout**을 선택하면 인벤토리에 있는 모든 구성 요소가 연결되어 다이어그램에 자동으로 추가됩니다.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="Cloudcraft에서 생성된 대화형 AWS 인프라 다이어그램으로, 구성 요소가 자동 레이아웃으로 배치되고 연결선이 보이는 격자 배경 위에 표시됨." responsive="true" style="width:100%;">}}

다이어그램은 사용자 정의가 가능하므로 각 구성 요소와 관련된 실시간 데이터를 관찰하면서 **Design** 탭의 요소를 사용하여 모양을 개선할 수 있습니다.

구성 요소를 선택하면 화면 왼쪽 하단에 **Live feed** 대화 상자가 나타나고 선택한 구성 요소에 대한 실시간 정보가 표시됩니다.

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="대화형 클라우드 인프라 다이어그램에서 EC2 인스턴스가 강조 표시되어 있으며, 라이브 피드 정보 대화 상자가 인스턴스 세부 정보와 상태를 표시" responsive="true" style="width:100%;">}}

## 새로운 라이브 경험

Cloudcraft는 사용자 경험을 개선하고 클라우드 인프라 다이어그램 작성 프로세스를 간소화하기 위한 지속적인 노력의 일환으로 개선된 라이브 환경을 도입했습니다. 이 업데이트된 환경은 모든 사용자가 액세스할 수 있으며 신규 사용자를 위한 표준 환경으로 설정되었습니다.

자세한 내용은 [더 나은 다이어그램 만들기: Cloudcraft 라이브 다이어그램 작성 및 필터링][4]을 참조하세요.

[1]: /ko/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /ko/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: /ko/cloudcraft/faq/supported-aws-components/
[4]: /ko/cloudcraft/getting-started/crafting-better-diagrams/
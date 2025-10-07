---
title: 여러 클라우드 계정 다이어그램
---

Cloudcraft는 원활하고 효율적인 방식으로 클라우드 아키텍처를 시각화하고 계획할 수 있도록 설계된 도구입니다. 이 가이드에서는 Cloudcraft 내의 레거시 환경을 사용하여 여러 클라우드 계정을 다이어그램화하는 방법을 설명합니다. 다음 단계에 따라 여러 클라우드 계정을 하나의 일관된 다이어그램으로 통합하세요.



## 1. 레거시 환경 사용

여러 클라우드 계정으로 작업하려면 레거시 다이어그램 환경을 사용하도록 설정해야 합니다.

1. Cloudcraft를 열고 **Live** 탭으로 이동합니다.
2. **New Live Experience** 토글을 찾아서 **off**로 설정되어 있는지 확인합니다.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/new-live-experience-toggle.png" alt="여러 클라우드 계정에 대한 새로운 라이브 경험 토글을 보여주는 Cloudcraft 인터페이스" responsive="true" style="width:100%;">}}

## 2. 첫 번째 계정 배열

레거시 환경을 사용하도록 설정한 후 첫 번째 계정을 배치합니다.

1. 시각화하려는 초기 클라우드 계정을 선택합니다.
2. 이 계정 검사를 시작하여 현재 아키텍처 세부 정보를 수집합니다.
3. **Auto Layout** 버튼을 선택하면 다이어그램 내에서 이 계정의 구성 요소를 자동으로 배열할 수 있습니다.

## 3. 두 번째 계정 배열

첫 번째 계정을 성공적으로 배열한 후에는 다이어그램에 더 많은 계정을 추가할 수 있습니다.

1. 추가하려는 두 번째 클라우드 계정을 선택합니다.
2. 두 번째 계정에 대한 검사를 실행하여 아키텍처를 캡처합니다.
3. **Auto Layout**을 선택합니다. 
4. **Options* 드롭다운에 액세스하여 **Include existing components**를 선택합니다. 이 작업은 첫 번째 계정의 구성 요소가 계속 표시되도록 하므로, 두 계정이 하나의 다이어그램에 통합됩니다.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/auto-layout-options.png" alt="AWS 인벤토리와 라이브 구성 요소 옵션을 보여주는 Cloudcraft 인터페이스" responsive="true" style="width:100%;">}}

<div class="alert alert-info">이 과정을 반복하여 다이어그램에 더 많은 계정을 포함할 수 있습니다.</div>

위의 단계에 따라 하나의 Cloudcraft 다이어그램에서 여러 클라우드 계정을 통합하여 볼 수 있습니다. 레이아웃을 검토하여 필요한 모든 구성 요소가 포함되어 있고 원하는 대로 배열되었는지 확인합니다. 명확성이나 표현을 개선하기 위해 필요한 경우 수동으로 배열를 조정하세요.
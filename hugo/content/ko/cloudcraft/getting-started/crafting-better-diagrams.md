---
title: '더 나은 다이어그램 만드는 방법: Cloudcraft의 실시간 다이어그램 만들기와 필터링'
---

## 개요

Cloudcraft는 클라우드 인프라스트럭처에서 다이어그램을 만들 수 있는 강력한 도구입니다. 새로운 실시간 경험 기능으로 클라우드 인프라스트럭처의 정확한 최신 다이어그램을 만들 수 있습니다.

유형과 태그로 리소스를 필터링하여 보고 싶은 특정 구성 요소에 초점을 맞춘, 타게팅된 다이어그램을 만들 수 있습니다. 이를 통해 다이어그램의 효율성과 이해도를 향상시킬 수 있고 인프라스트럭처에 관련해 더욱 의미 있는 가시화 항목을 만들 수 있습니다.

이 가이드에서는 새로운 실시간 경험 기능을 활성화하고 사용하는 방법을 설명합니다. 이를 통해 내게 맞는 유익한 다이어그램을 만들 수 있습니다.

## 사전 필수 조건

시작하기 전에 AWS 또는 Azure 계정을 Cloudcraft에 연결해야 합니다. 자세한 정보는 다음을 참고하세요.

- [AWS 계정을 Cloudcraft와 연결하기][1]
- [Azure 계정을 Cloudcraft와 연결하기][2]

## 새 실시간 경험 기능 활성화

활성화하려면 Cloudcraft에 있는 **Live** 탭 상단에 있는 **New Live Experience** 스위치를 토글합니다.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/enable-new-experience.png" alt="Cloudcraft 인터페이스에서 새 실시간 경험 베타 기능으로 전환을 강조 표시한 스크린샷. 빨간색 화살표로 전환을 강조 표시" responsive="true" style="width:80%;">}}

신규 사용자에게는 새 실시간 경험 기능이 기본적으로 활성화되어 있습니다.

## 계정과 지역 선택

**Account** 섹션 아래에 있는 드롭다운 메뉴에서 스캔하고 싶은 계정을 선택하세요. Cloudcraft에 AWS 또는 Azure 계정 하나만 추가한 경우에는 자동으로 선택됩니다.

**Region** 아래에서 스캔하고 싶은 리전을 선택합니다. 기본값은 `Global`과 내가 선택한 리전이며, **More** 버튼을 클릭해 추가 리전을 검색하고 선택할 수 있습니다.

선택 후 리전이 자동으로 스캔되며 리소스 수가 리전 이름 옆에 표시됩니다. **Region** 섹션 위에 있는 **Sync** 버튼을 클릭해 선택한 리전 전체를 수동으로 스캔할 수도 있습니다.

<div class="alert alert-danger">리전을 많이 선택하면 실시간 스캔 프로세스 성능에 영향을 미칠 수 있습니다.</div>

## 리소스 필터

유형과 태그에 따라 리소스를 필터할 수 있습니다.

AWS 계정의 태그를 자동으로 감지하고 **Custom tags**, **AWS tags**, **Terraform tags**, **Kubernetes tags** 섹션에 표시합니다.

- **Custom tags**는 내가 AWS 또는 Azure 리소스에 추가한 태그입니다.
- **AWS tags**는 AWS에서 자동으로 리소스에 추가한 태그입니다.
- **Terraform tags**는 Terraform에서 자동으로 리소스에 추가한 태그입니다.
- **Kubernetes tags**는 Kubernetes에서 자동으로 리소스에 추가한 태그입니다.

유형에 따라 리소스를 필터링하려면 **Resource** 섹션을 클릭하고 필터링에 이용하고 싶은 리소스 유형을 선택하세요. 기본적으로 발견한 리소스 순서에 따라 모든 리소스 유형이 선택 및 표시되어 있습니다.

태그로 리소스를 필터링하는 방법: **Custom tags**, **AWS tags**, **Terraform tags**, 또는 **Kubernetes tags** 섹션을 클릭하고 필터링에 사용하고 싶은 태그를 선택합니다. 기본적으로 찾은 리소스 순서에 따라 모든 태그가 선택 및 표시되어 있습니다. `Untagged`는 항상 맨 마지막에 표시됩니다.

<div class="alert alert-info">내 특정 사용 사례와 가장 관련성이 높은 리소스 유형과 태그에 초점을 맞춰서 다이어그램의 이해도와 성능을 최적화하는 것이 좋습니다 .</div>

## 사용 사례

### EC2 인스턴스와 RDS 데이터베이스만 표시하는 다이어그램 만들기

1. **Resource** 섹션을 클릭합니다.
2. 모든 리소스 유형을 선택 해제한 후 **EC2**와 **RDS**를 선택합니다.
3. **Apply layout**을 클릭해 선택한 리소스만 표시하는 다이어그램을 만듭니다.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources.mp4" alt="Cloudcraft 사용자가 리소스 섹션에서 EC2와 RDS 인스턴스를 선택하는 9초 영상" video="true">}}

### `Environment` 태그 없이 EC2 인스턴스와 RDS 데이터베이스를 나타내는 다이어그램 만들기

1. **Resource** 섹션을 클릭합니다.
2. 모든 리소스 유형을 선택 해제한 후 **EC2**와 **RDS**를 선택합니다.
3. **Custom tags** 섹션을 클릭합니다.
4. **Environment** 태그를 클릭하고 `Untagged` 옵션만 그대로 둡니다.
5. **Apply layout**을 클릭해 `Environment` 태그 없이 선택한 리소스만 표시하는 다이어그램을 만듭니다.

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources-and-tags.mp4" alt="Cloudcraft 사용자가 리소스와 커스텀 태그 섹션에서 EC2와 RDS 인스턴스와 태깅되지 않은 리소스를 선택하는 15초 영상" video="true">}}

## 피드백

Cloudcraft애서 는 사용자 경험을 향상하고 더욱 효과적이고 효율적으로 클라우드 인프라스트럭처를 다이어그램화하기 위해 새 실시간 경험 기능을 도입했습니다. 이 기능을 어떻게 사용하고 있는지 [이 양식을 통해서 피드백 주시면 감사하겠습니다][3].

[1]: https://docs.datadoghq.com/ko/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: https://docs.datadoghq.com/ko/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: https://docs.google.com/forms/d/e/1FAIpQLSemnd5CJgrS9o-5ZCoZSxi99ATqIg9jpgqtcUZpMBzPJO75Wg/viewform
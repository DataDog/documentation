---
description: 입력 파라미터를 사용하면 각 인스턴스에 대해 서로 다른 구성을 사용하여 동일한 앱을 여러 대시보드나 노트북에 임베드할 수 있습니다.
disable_toc: false
title: 입력 파라미터
---
입력 파라미터를 사용하면 각 인스턴스에 대해 서로 다른 구성을 사용하여 동일한 앱을 여러 대시보드나 노트북에 임베드할 수 있습니다. 

## 앱 예시 {#example-app}

입력 파라미터의 일반적인 사용 사례는 개발, 스테이징, 프로덕션과 같은 다양한 환경에 맞게 앱을 재사용하고 사용자 지정하는 것입니다. 아래 스크린샷에서는 하나의 앱이 대시보드에 두 번 임베드되어 있습니다. 왼쪽의 앱은 데모 환경의 모니터를 보여주고, 오른쪽의 앱은 스테이징 환경의 모니터에 대한 동일한 정보를 보여줍니다. [How to: Input Parameters][3] 블루프린트를 복제하여 이 앱을 사용해 볼 수 있습니다.

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-dashboard.png" alt="서로 다른 입력 파라미터가 선택된 두 개의 임베디드 앱" style="width:100%;" >}}

## 입력 파라미터 생성 {#create-an-input-parameter}

1. [App Builder][1]에서 앱을 선택하고 {{< ui >}}Edit{{< /ui >}}을 클릭합니다. 
1. {{< ui >}}App Properties{{< /ui >}} 아이콘({{< img src="actions/app_builder/embedded_apps/app_properties_icon.png" inline="true" width="12px" style="position:relative; bottom:1px;">}})을 클릭합니다.
1. 플러스 아이콘(<i class="icon-plus-2" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>)을 클릭하여 입력 파라미터를 추가합니다. 
1. 새 입력 파라미터를 클릭하여 해당 요소를 구성합니다. 
    - {{< ui >}}Parameter Name{{< /ui >}}
    - {{< ui >}}Display Name{{< /ui >}}(선택 사항) 
    - {{< ui >}}Data Type{{< /ui >}}
    - {{< ui >}}Allowed Values{{< /ui >}}
    - {{< ui >}}Default Value{{< /ui >}}
    - {{< ui >}}Description{{< /ui >}} (선택 사항) 
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 예제 입력 파라미터 {#example-input-parameter}

이 예제 입력 파라미터는 다양한 스테이징 환경에서 동일한 앱을 보여줍니다.

{{< img src="/actions/app_builder/embedded_apps/example-input-parameters-configuration.png" alt="앱 내에 구성된 입력 파라미터의 예" style="width:35%;" >}}

## 입력 파라미터 사용 {#use-input-parameters}

<div class="alert alert-info">입력 파라미터가 있는 앱은 대시보드 및 노트북에서 가장 잘 작동합니다. Self-Service Actions에 앱을 추가할 수는 있지만, 구성한 입력 파라미터를 선택할 수는 없습니다. 
</div>

입력 파라미터가 있는 앱을 임베드하려면 다음 단계를 따르세요.

1. [App Builder][1]에서 구성된 입력 파라미터가 있는 앱을 선택합니다.
1. {{< ui >}}Add to a dashboard{{< /ui >}}를 클릭합니다. 
1. 대시보드를 선택한 다음 {{< ui >}}Save and Open{{< /ui >}}을 클릭합니다.
1. 대시보드에서 앱 위로 마우스를 가져간 다음 {{< ui >}}Edit{{< /ui >}} 아이콘({{< img src="icons/pencil.png" inline="true" style="width:14px;">}})을 클릭합니다.
1. {{< ui >}}Input Parameters{{< /ui >}} 섹션에서 입력 파라미터를 선택합니다.
{{< img src="/actions/app_builder/embedded_apps/example-input-params-configuring-in-dashboard.png" alt="입력 파라미터가 원으로 표시된 편집 모드의 앱 예시" style="width:80%;" >}}
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 앱 재사용 {#reuse-an-app}

대시보드나 노트북에 앱을 임베드한 후 복사본을 만들어 다른 컨텍스트에서 재사용할 수 있습니다.
1. 임베디드 앱을 선택합니다. 
1. {{< ui >}}Options{{< /ui >}} 아이콘(<i class="icon-kebab-wui" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>)을 클릭한 다음 {{< ui >}}Clone{{< /ui >}}을 클릭합니다.
    - 또는 앱을 선택하고 복사 및 붙여넣기 키보드 단축키를 사용할 수 있습니다.
1. [위][2]의 단계에 따라 다른 입력 파라미터를 선택합니다.

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: /ko/actions/app_builder/embedded_apps/input_parameters/#use-input-parameters
[3]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to_input_parameters&viewMode=templatePreview
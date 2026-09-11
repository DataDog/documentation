---
description: Bits Detection이 중요한 서비스를 자율적으로 식별하고 시스템이 변화함에 따라 모니터링 범위를 관리하는 방법을 알아봅니다.
further_reading:
- link: https://www.datadoghq.com/blog/bits-detection/
  tag: 블로그
  text: Bits Detection을 사용해 영향이 큰 성능 저하를 자율적으로 모니터링
title: Bits Detection
---
{{< callout url="#" btn_hidden="true" header="false">}}
  Bits Detection은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 Datadog 담당자에게 문의하세요.
{{< /callout >}}

## 개요 {#overview}

모니터링 적용 범위는 시간이 지나면서 점점 실제 시스템 현황과 차이를 보입니다. 엔지니어가 엔드포인트를 추가하고, 종속성을 이동하고, 사용자 흐름을 변경하는데도 모니터링은 계속 기존의 시스템 상태를 반영합니다. 서비스가 간략한 상태만 보면 정상으로 보일지라도, 중요한 경로 하나에 문제가 발생했을 수 있습니다. Bits Detection은 모니터링이 필요한 엔드포인트를 식별하고, 관찰된 프로덕션 동작을 기반으로 탐지 로직을 설정하며, 팀에서 모든 모니터를 수동으로 생성하고, 조정하고, 유지 관리하지 않아도 모니터링 범위를 최신 상태로 유지합니다.

Bits Detection이 문제에 플래그를 지정하면 분류를 시작할 수 있도록 영향을 받은 엔드포인트와 관련 텔레메트리를 알려줍니다. 이것이 Bits AI 워크플로의 첫 번째 단계이며, [Bits Investigation][4]을 통한 조사, 근본 원인 분석 및 문제 해결로 이어집니다.

## Bits Detection 활성화 {#enable-bits-detection}

<div class="alert alert-danger">Bits Detection은 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 Datadog 담당자에게 문의하세요.</div>

Bits Detection을 활성화하면 서비스 텔레메트리, 종속성, 소유권 메타데이터, 최근 변경 사항 및 사용자 영향 신호를 기반으로 환경에서 가장 중요한 100개 서비스에 대한 모니터링이 초기화됩니다. APM으로 계측된 HTTP 및 gRPC 서비스에 대한 모니터링 범위가 지원되며, 애플리케이션 엣지에서의 모니터링을 우선시합니다. 추가 리소스 유형에 대한 모니터링 범위를 요청하려면 [Datadog 지원팀][1]에 문의하세요.

기존 모니터링은 그대로 유지됩니다. Bits Detection은 기존 모니터링과 함께 작동하며, 수동으로 모델링하기에는 너무 빠르게 변화하는 시스템 영역에 적응형 모니터링 범위를 추가합니다.

다음과 같은 여러 진입점에서 추가 서비스에 Bits Detection을 활성화할 수 있습니다.

### 옵션 1: Bits Detection Coverage 페이지 {#enable-from-bits-ai}
1. Datadog에서 [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5]으로 이동한 후 {{< ui >}}Enable New Detection Coverage{{< /ui >}}를 클릭합니다.
1. 서비스 목록을 필터링하여 활성화할 서비스를 찾고 목록에서 하나 이상의 서비스를 선택합니다.
1. Bits가 중요한 성능 저하를 발견했을 때 팀에 알림이 전달되도록 알림 대상을 설정합니다.
1. 초기화가 완료된 후 관리되는 모니터링 범위를 검토합니다. 새로운 상태가 준비되면 이메일이 발송됩니다.

### 옵션 2: 서비스 페이지 {#enable-from-service-page}

1. Datadog에서 [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2]로 이동한 후 서비스를 선택합니다.
1. 모니터 상태 표시줄 또는 Bits Detection 카드에서 해당 서비스의 모니터링 개요를 엽니다.
1. 안내에 따라 해당 서비스에 대한 Bits Detection 모니터링을 활성화합니다.
1. 초기화가 완료된 후 관리되는 모니터링 범위를 검토합니다. 새로운 상태가 준비되면 이메일이 발송됩니다.

## Bits Detection 사용 {#use-bits-detection}

Bits Detection은 다음 세 단계로 모니터링을 관리합니다.

- **중요한 리소스 식별**: Bits Detection은 지원되는 서비스 및 리소스를 평가하여 엔드포인트, 종속성 또는 흐름 중 사용자와 비즈니스에 중요할 가능성이 높은 항목을 확인합니다.
- **중요한 성능 저하 탐지**: Bits Detection은 중요한 리소스에 대한 관리형 모니터를 생성하고 조정합니다.
- **서비스 변화에 따라 적응**: Bits Detection은 서비스가 변화함에 따라 리소스의 중요도, 모니터링 범위 및 경보 동작을 재평가하여 모니터링을 프로덕션 환경에 맞게 유지합니다.

아래 섹션을 사용하여 적용 범위를 검토하고, 경보 라우팅을 구성하며, Bits가 시간이 지남에 따라 적응할 수 있도록 피드백을 제공합니다.

### Bits Detection 모니터링 검토 {#review-bits-detection-monitoring}

Bits Detection 적용 범위 페이지, 서비스 페이지 또는 모니터링 목록을 사용하여 Bits Detection이 시스템을 모니터링하는 방식을 검토합니다.

**Bits Detection 적용 범위 페이지**

Bits Detection이 활성화된 모든 범위를 검토하려면 [{{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Detection{{< /ui >}}][5]으로 이동합니다. 각 행은 탐지 범위를 나타내며, Bits가 유지 관리하는 중요 엔드포인트 및 관리형 모니터의 수, 해당 범위에서 마지막으로 경보가 발생한 시점, 경보 알림이 구성되어 있는지 여부 및 자동 조사가 활성화되어 있는지 표시됩니다. 범위를 선택하여 해당 범위의 Bits Detection Details를 엽니다. 여기에서 선택한 기간의 상태, Bits가 중요하다고 간주하는 엔드포인트(각 엔드포인트를 선택한 이유가 설명된 사유 포함), Bits가 관리하는 모니터, 그리고 범위의 경보 기록을 검토할 수 있습니다.

적용 범위 페이지에서 다음 작업을 수행할 수 있습니다.

- 모니터링 범위에 포함된 모든 서비스의 Bits Detection 상태를 검토합니다.
- Bits가 모니터링할 서비스를 선택하여 새로운 탐지 범위를 활성화합니다.
- 관리형 범위의 세부 정보를 조회합니다.
- Bits Detection이 모니터링하는 중요 엔드포인트를 검토합니다.
- 엔드포인트를 중요하지 않음으로 표시합니다.
- 경보 알림 규칙을 관리합니다.

**서비스 페이지**

서비스의 Bits Detection 보기를 열려면 [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}}][2]로 이동하여 서비스를 선택한 다음, 모니터 상태 표시줄 또는 Bits Detection 카드에서 모니터링 개요를 엽니다.

{{< img src="bits_ai/bits_detection/service_page_bits_detection_card.png" alt="APM Services 페이지의 Bits Detection 카드에는 서비스의 모니터링 상태와 중요 엔드포인트가 표시됩니다." style="width:90%;" >}}

서비스 페이지에는 해당 서비스의 Bits Detection 모니터가 표시되며, 여기에는 Bits가 중요하다고 간주하는 엔드포인트 물론 각 모니터의 현대 상태 및 경보 기록도 포함됩니다. Bits는 고객에게 직접 영향을 미칠 가능성이 가장 높은 엔드포인트(예: 결제, 가입 또는 인증 경로)를 우선적으로 처리하며, 각 엔드포인트에는 해당 엔드포인트가 선택된 이유를 설명하는 중요도 근거가 포함됩니다.

서비스 페이지에서 다음 작업을 수행할 수 있습니다.

- 서비스의 Bits Detection 상태를 검토합니다.
- 활성 경보를 엽니다.
- 관리형 탐지 유형의 세부 정보를 조회합니다.
- Bits Detection이 모니터링하는 중요 엔드포인트를 검토합니다.
- 엔드포인트를 중요하지 않음으로 표시합니다.
- 경보 알림 규칙을 관리합니다.

**모니터링 목록**

Bits Detection 모니터를 조회하려면 [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}List{{< /ui >}}][3]로 이동하여 {{< ui >}}Bits Managed{{< /ui >}} 필터를 선택합니다. 요약 배너에는 각 상태의 관리형 모니터 수가 표시됩니다. 서비스 행을 확장하여 해당 서비스의 관리형 모니터를 확인합니다.

{{< img src="bits_ai/bits_detection/monitor_list_bits_managed.png" alt="Bits 관리형 모니터로 필터링한 모니터링 목록. 관리형 모니터 상태별로 그룹화한 서비스를 표시했습니다." style="width:90%;" >}}

모니터링 목록은 Bits Detection을 서비스별로 그룹화합니다. 각 서비스에서 각 관리형 모니터의 상태, 우선 순위, 모니터 이름 및 태그를 검토할 수 있습니다. Bits Detection 모니터에는 반짝임 아이콘이 표시되므로 팀에서 생성하고 유지 관리하는 모니터와 구분할 수 있습니다.

### Bits Detection 알림 관리 {#manage-bits-detection-notifications}

Bits Detection 모니터는 고정된 임계값이 아니라 프로덕션 환경의 동작에 맞게 조정됩니다. 경보 알림 규칙을 사용하여 경보를 적절한 팀으로 라우팅합니다. 규칙을 설정하려면 [서비스 모니터링 개요][2]로 이동하여 {{< ui >}}Set Up Alert Notification Rules{{< /ui >}}를 클릭합니다.

1. {{< ui >}}Match notifications with specific tags{{< /ui >}}에서 쿼리를 검토합니다. Datadog은 선택한 서비스 및 Bits Detection 관리형 모니터에 대한 태그로 규칙을 미리 입력합니다. 필터는 더 추가할 수 있습니다.
1. {{< ui >}}Choose routing conditions and recipients{{< /ui >}}에서 {{< ui >}}Manual Routing{{< /ui >}} 또는 {{< ui >}}Dynamic Routing{{< /ui >}}을 선택합니다.
1. 일치하는 모니터 알림을 받을 수신자를 추가합니다.
1. 규칙의 이름을 지정합니다.
1. 규칙에 대한 권한을 정의합니다.
1. {{< ui >}}Create Rule{{< /ui >}}을 클릭합니다.

알림 규칙은 태그 쿼리와 일치하는 모니터에 적용됩니다. 사이드 패널에는 규칙과 일치하는 모니터 수가 표시되며, 일치하는 모니터의 예도 나열됩니다.

### Bits의 학습 지원 {#help-bits-learn}

피드백을 사용하여 환경에 맞게 Bits Detection을 조정하세요. 경보가 유용했는지 또는 불필요한 경보였는지 플래그할 수 있으며, 서비스 페이지에서 중요하다고 판단되는 엔드포인트를 업데이트할 수 있습니다.

**경보에 대한 피드백 제공**

1. Bits Detection 경보를 엽니다.
1. 피드백 프롬프트에서 Bits가 경보를 보냈어야 하면 {{< ui >}}Yes{{< /ui >}}를 클릭하고, 보내지 않았어야 하면 {{< ui >}}No, Because…{{< /ui >}}를 클릭합니다.
1. {{< ui >}}No, Because…{{< /ui >}}를 클릭한 경우 이유를 선택합니다.
1. {{< ui >}}Send Feedback{{< /ui >}}을 클릭합니다.

**리소스 중요도에 대한 피드백 제공**

Bits Detection은 중요도를 사용하여 어떤 리소스에 관리형 모니터링 범위를 적용해야 하는지 결정합니다. [서비스 모니터링 개요][2]에서 중요 모니터링 범위로 지정하지 않아야 할 엔드포인트 옆의 {{< ui >}}Mark as Not Critical{{< /ui >}}를 클릭하고, 중요 엔드포인트로 표시하려면 {{< ui >}}Add a New Endpoint{{< /ui >}}을 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help
[2]: https://app.datadoghq.com/apm/services
[3]: https://app.datadoghq.com/monitors/manage?bits_monitors=true
[4]: /ko/bits_ai/bits_investigation/
[5]: https://app.datadoghq.com/bits-ai/detection/scopes
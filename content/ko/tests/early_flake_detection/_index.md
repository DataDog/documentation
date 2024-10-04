---
description: 조기 결함 감지를 사용하여 기본 브랜치에 영향을 미치기 전에 결함을 감지하세요.
further_reading:
- link: /tests
  tag: 설명서
  text: 테스트 가시성에 대해 알아보기
- link: /tests/guides/flaky_test_management
  tag: 설명서
  text: 비정상적 테스트(Flaky Test) 관리에 대해 자세히 알아보기
- link: /quality_gates
  tag: 설명서
  text: 품질 게이트에 대해 알아보기
title: Early Flake Detection
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">현재 선택한 사이트({{< region-param key="dd_site_name" >}})에서는 조기 결함 감지 기능을 사용할 수 없습니다.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
조기 결함 감지 기능은 공개 베타 버전으로 제공됩니다.
{{< /callout >}}

## 개요

조기 결함 감지는 개발 주기 초기에 [결함 있는 테스트][1]를 식별하여 코드 품질을 향상하는 Datadog의 테스트 결함 솔루션입니다. 결함 테스트에 대한 자세한 내용은 [결함 있는 테스트 관리][2]를 참조하세요.

새로 추가된 테스트를 여러 번 실행하여 이러한 Datadog 테스트가 기본 브랜치에 병합되기 전에 결함을 감지할 수 있습니다. 한 연구에 따르면 이 방법으로 최대 [75%][3]의 결함 있는 테스트를 식별할 수 있다고 합니다.

알려진 테스트
: Datadog 백엔드는 특정 테스트에 대한 고유한 테스트 서비스를 저장합니다. 테스트 세션이 실행되기 전에 Datadog 라이브러리는 이러한 알려진 테스트의 목록을 가져옵니다.

새로운 테스트 탐지
: 알려진 테스트(목록)에 없는 테스트는 **새로운 테스트**로 간주되어 최대 10회까지 자동으로 재시도됩니다.

결함 식별
: 테스트를 여러 번 실행하면 테스트가 간헐적으로 통과 및 실패할 수 있는 경쟁 조건과 같은 문제를 발견하는 데 도움이 됩니다. 테스트 시도 중 하나라도 실패하면 해당 테스트에는 자동으로 결함 태그가 지정됩니다.

테스트를 여러 번 실행하면 플레이크를 유발하는 임의의 조건이 노출될 가능성이 높아집니다. 조기 플레이크 감지를 사용하면 안정적이고 신뢰할 수 있는 테스트만 메인 브랜치에 통합할 수 있습니다.

[품질 게이트][4]를 사용하여 기능 브랜치의 병합을 차단하도록 선택할 수 있습니다. 자세한 내용은 [품질 게이트 설명서][5]를 참조하세요.

## 설정

조기 결함 감지를 구현하기 전에 개발 환경에 대해 [테스트 가시성][6]을 수행해야 합니다. Datadog 에이전트를 통해 데이터를 보고하는 경우 v6.40 또는 7.40 이상을 사용하세요.

### 설정

테스트 가시성(Datadog 라이브러리)을 설정한 후 [테스트 서비스 설정 페이지][7]에서 조기 결함 감지를 설정할 수 있습니다.

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="Early flake Detection in Test Service Settings." style="width:100%" >}}

1. [**소프트웨어 제공** > **테스트 가시성** > **설정**][7]으로 이동합니다.
1. 조기 플레이크 감지 열에서 테스트 서비스에 대해 **설정**을 클릭합니다.
1. 토글을 클릭하여 조기 플레이크 감지를 활성화하고 [**조기 플레이크 감지 대상에서 제외된 브랜치**](#manage-excluded-branches)의 목록을 추가하거나 수정합니다.

{{< img src="continuous_integration/early_flake_detection_configuration_modal.png" alt="Enabling Early Flake Detection and defining excluded branches in the test service configuration" style="width:60%">}}

## 호환성
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

필요한 테스트 프레임워크 및 dd-trace 버전은 다음과 같습니다.

`dd-trace-js`:
* `>=5.12.0` 5.x 릴리스의 경우
* `>=4.36.0` 4.x 릴리스의 경우
* `>=3.57.0` 3.x 릴리스의 경우

테스트 프레임워크 호환성은 `>=1.38.0`에서만 지원되는 `playwright`을 제외하고는 [테스트 가시성 호환성][1]과 동일합니다.

[1]: /ko/tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet>=2.51.0`

{{% /tab %}}

{{% tab "Ruby" %}}

`datadog-ci-rb>=1.5.0`

{{% /tab %}}

{{< /tabs >}}


## 제외된 브랜치 관리

제외된 브랜치에서는 조기 플레이크 감지에 의해 재시도된 테스트가 없습니다. 이러한 지점에서 실행된 테스트는 조기 플레이크 감지의 목적상 새로운 것으로 간주되지 않습니다.

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation.png" alt="How Early Flake Detection works in your commits" style="width:100%">}}

[테스트 서비스 설정 페이지][7]에서 제외된 브랜치(목록)를 관리하여 특정 워크플로 및 브랜치 구조에 맞게 기능을 조정할 수 있습니다.

## 테스트 가시성 탐색기에서 결과 탐색

다음 패싯을 사용하여 [테스트 가시성 탐색기][8]에서 조기 플레이크 감지 및 새 테스트를 실행하는 세션을 쿼리로 이동할 수 있습니다.

* **테스트 세션**: 조기 결함 감지를 실행하는 테스트 세션은 `@test.early_flake.enabled` 태그가 `true`로 설정되어 있습니다.
* **새 테스트**: 새 테스트에는 `@test.is_new` 태그가 `true`로 설정되어 있고, 이 테스트의 재시도의 경우`@test.is_retry` 태그가 `true`로 설정되어 있습니다.

## 트러블슈팅

조기 결함 감지에 문제가 있다고 의심되는 경우 [테스트 서비스 설정 페이지][7]로 이동하여 테스트 서비스를 찾은 다음 **설정**을 클릭합니다. 토글을 클릭하여 조기 결함 감지를 비활성화합니다.

### 새 테스트가 다시 시도되지 않습니다.

이는 몇 가지 이유로 인해 발생할 수 있습니다.

* 이 테스트는 이미 `staging`, `main` 또는 `preprod`와 같은 제외된 브랜치에서 실행되었습니다.
* 이 테스트는 5분보다 느립니다. 이러한 테스트를 다시 시도하면 CI 파이프라인에 상당한 지연이 발생할 수 있으므로 너무 느린 테스트에서는 조기 결함 감지를 실행하지 않도록 하는 메커니즘이 있습니다.

### 새로운 테스트가 아닌 테스트가 다시 시도되었습니다.

Datadog 라이브러리에서 알려진 테스트의 전체 목록을 가져올 수 없는 경우, Datadog 라이브러리에서 새 테스트가 아닌 테스트를 다시 시도할 수 있습니다. 이 오류로 인해 CI 파이프라인이 느려지는 것을 방지하는 메커니즘이 있지만 이 오류가 발생하면 [Datadog 지원팀][9]으로 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/glossary/#flaky-test
[2]: /ko/tests/guides/flaky_test_management
[3]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[4]: /ko/quality_gates/
[5]: /ko/quality_gates/setup
[6]: /ko/tests
[7]: https://app.datadoghq.com/ci/settings/test-service
[8]: /ko/tests/explorer/
[9]: /ko/help/

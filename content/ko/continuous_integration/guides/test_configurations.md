---
further_reading:
- link: /continuous_integration/guides/flaky_test_management
  tag: 가이드
  text: 비정상적 테스트 관리
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 탐색하기
kind: guide
title: 테스트 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트 ({{< region-param key="dd_site_name" >}})에서 현재 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

테스트는 주어진 조건 집합에 대한 코드의 동작을 평가합니다. 이러한 조건 중 일부는 운영 체제 또는 사용된 런타임과 같이 테스트가 실행되는 환경과 관련이 있습니다. 다른 조건 집합에서 실행된 코드는 다르게 동작할 수 있기 때문에 개발자는 일반적으로 다른 조건에서 테스트를 실행하도록 설정하고 모든 조건에서 예상대로 동작을 얻을 수 있는지 확인합니다. 이러한 특정 조건 집합을 *설정*이라고 합니다.

CI Visibility에서 여러 설정을 포함하는 테스트는 각 설정에 대해 별도의 테스트인 여러 테스트로 취급됩니다. 설정 중 하나가 실패하고 다른 설정이 통과하는 경우 특정 테스트 및 설정 조합만 실패로 표시됩니다.

예를 들어, 하나의 커밋을 테스트하는 중이며, 세 가지 다른 Python 버전에 대해 실행되는 Python 테스트가 있다고 가정합니다. 이러한 버전 중 하나에서 테스트가 실패하면 해당 테스트는 실패한 것으로 표시되고 다른 버전은 통과된 것으로 표시됩니다. 동일한 커밋에 대해 테스트를 다시 시도한 결과 세 가지 Python 버전에 대한 테스트가 모두 통과되면 이전에 실패한 버전의 테스트는 통과 및 결함으로 표시되고, 다른 두 버전은 감지된 결함 없이 통과된 상태로 유지됩니다.

## 기본 설정

CI Visibility로 테스트를 실행하면 라이브러리에서 테스트가 실행되는 환경에 대한 정보를 테스트 태그로 감지하여 보고합니다. 예를 들어, `Windows`, `Linux`와 같은 운영 체제 이름과 `arm64`, `x86_64` 와 같은 플랫폼 아키텍처가 각 테스트에 태그로 추가됩니다. 이러한 값은 특정 설정에서 테스트가 실패하거나 결함이 있을 때 커밋 및 브랜치 개요 페이지에 표시됩니다. 다른 테스트 실행 간에 변경되는 설정 태그만 UI에 표시됩니다.

{{< img src="ci/test_configurations_in_errors.png" alt="테스트 실패에 대한 설정" style="width:100%;">}}

다음 태그는 테스트 설정을 식별하기 위해 자동으로 수집됩니다. 일부는 특정 플랫폼에만 적용됩니다:

* `os.platform` - 테스트가 실행되는 운영 체제의 이름
* `os.version` - 테스트가 실행되는 운영 체제의 버전
* `os.architecture` - 테스트가 실행되는 운영 체제의 아키텍처
* `runtime.name` - 테스트를 위한 런타임 시스템의 이름
* `runtime.version` - 런타임 시스템의 버전
* `runtime.architecture` - 런타임 시스템의 아키텍처
* `runtime.vendor` - 테스트가 실행되는 런타임 플랫폼을 구축한 벤더
* `device.model` - 테스트를 실행하는 기기 모델
* `device.name` - 기기 이름
* `ui.appearance` - 사용자 인터페이스 스타일
* `ui.orientation` - UI가 실행되는 방향
* `ui.localization` - 애플리케이션의 언어

## 커스텀 설정

일부 설정은 환경 변수, 테스트 실행 인수 또는 개발자가 사용하는 접근 방식에 따라 달라질 수 있으므로 직접 식별하고 보고할 수 없습니다. 이러한 경우 CI Visibility에서 올바르게 설정을 식별할 수 있도록 라이브러리에 세부 정보를 제공해야 합니다.

`test.configuration` 접두사를 사용하여 이러한 태그를 `DD_TAGS` 환경 변수의 일부로 정의합니다. 예를 들어, 다음 테스트 설정 태그는 디스크 응답 시간이 느리고 사용 가능한 메모리가 부족한 테스트 설정을 식별합니다:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

`test.configuration` 접두사가 있는 모든 태그는 자동으로 수집된 태그와 더불어 설정 태그로 사용됩니다.

**참고**: 이러한 설정 태그를 사용하여 필터링하려면 [이러한 태그에 대한 패싯을 명시적으로 생성해야 합니다][1].

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_explorer/facets/#creating-facets
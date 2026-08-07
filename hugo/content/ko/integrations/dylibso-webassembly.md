---
app_id: webassembly-observe-sdk
app_uuid: 30eb706f-9143-461e-99af-89015e8493d5
assets: {}
author:
  homepage: https://dylibso.com
  name: Dylibso
  sales_email: sales@dylibso.com
  support_email: support@dylibso.com
categories:
- 개발 툴
- 언어
- tracing
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/dylibso-webassembly/README.md
display_on_public_website: true
draft: false
git_integration_title: dylibso-webassembly
integration_id: webassembly-observe-sdk
integration_title: WebAssembly Observe SDK
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dylibso-webassembly
public_title: WebAssembly Observe SDK
short_description: 모든 런타임에서 WebAssembly(wasm) 코드에서 트레이스 추출
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Languages
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Traces
  - 제공::통합
  configuration: README.md#Setup
  description: 모든 런타임에서 WebAssembly(wasm) 코드에서 트레이스 추출
  media:
  - caption: 애플리케이션에서 실행 중인 WebAssembly 코드에서 캡처한 트레이스 시각화
    image_url: images/wasm-observability.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: WebAssembly Observe SDK
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 통합은 애플리케이션에서 실행 중인 WebAssembly(WASM) 코드의 함수 추적을 제공합니다. WebAssembly 코드 성능과 다음 동작에 관한 인사이트를 얻을 수 있습니다.
- 함수 호출 기간
- 실행 추적
- 메모리 할당

WebAssembly 코드는 안전하고 제약된 환경에서 실행되므로 기존 코드 모니터링 기법이 작동하지 않습니다. 특수 통합 가시성 스택을 사용하면 다른 애플리케이션에서 기대하는 것과 동일한 수준에서 지속적으로 WASM 모듈을 모니터링할 수 있습니다.

Datadog 고객은 당사의 개방형 소스 SDK 및 어댑터를 사용하여 WASM 프로그램에서 전체 트레이스를 방출할 수 있습니다. `dylibso/observe-sdk` ][1] 리포지토리를 참조하여 애플리케이션에 맞는 Datadog 어댑터를 설치하세요.

또한 Dylibso는 기존 WASM 모듈을 가져와 함수 및 메모리 할당 추적을 포함하도록 재컴파일할 수 있는 자동 계측 도구를 제공합니다. 자세한 내용은 [support@dylibso.com][2]에 문의하거나 [자동 WebAssembly 계측][3]에서 자세히 알아보세요.


## 설정

### 설치

애플리케이션이 작성된 프로그래밍 언어에 따라 GitHub의 [`dylibso/observe-sdk`][1]에서 적절한 Datadog 어댑터 중 하나를 선택합니다.


### 구성

SDK 및 어댑터를 Datadog Agent에 연결하려면 다음 정보를 준비해야 합니다.

1. Datadog Agent 호스트 URL
2. SDK 및 어댑터를 가져오는 애플리케이션의 서비스 이름

### 검증

Observe SDK 내의 사용 가능한 옵션에서 Datadog 어댑터를 가져와 설정한 후 다음을 실행합니다.

1. WebAssembly 코드를 호출하는 위치에 Datadog 어댑터가 포함되도록 애플리케이션을 다시 배포하세요.
2. WebAssembly 모듈(`.wasm`)이 로드되어 있고 내보낸 함수 중 하나를 호출하고 있는지 확인합니다.
3. Datadog 대시보드를 통해 서비스에서 전송된 트레이스를 확인하세요.

## 수집한 데이터

### 이벤트

WebAssembly Observe SDK는 애플리케이션에서 함수 실행 및 메모리 할당 이벤트의 추적을 수집합니다.

## 트러블슈팅

도움이 필요하신가요? [Dylibso 지원팀][2]에 문의하세요.

[1]: https://github.com/dylibso/observe-sdk
[2]: mailto:support@dylibso.com
[3]: https://dylibso.com/products/observe
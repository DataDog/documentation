---
description: 브라우저 애플리케이션에서 수집된 WASM 스택 트레이스를 읽을 수 있도록 WebAssembly 디버그 심볼을 업로드하세요.
further_reading:
- link: /error_tracking/frontend/browser
  tag: 문서
  text: 브라우저 Error Tracking 설정
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: 문서
  text: JavaScript 소스 맵 업로드
- link: /real_user_monitoring/guide/debug-symbols
  tag: 문서
  text: RUM 디버그 심볼로 난독화된 스택 트레이스 조사
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/wasm-symbols
  tag: 소스 코드
  text: WebAssembly 심볼 명령어 참조
title: WebAssembly 심볼 업로드
---
## 개요 {#overview}

WebAssembly(WASM)는 브라우저 애플리케이션의 일부로 실행됩니다. 별도의 Datadog 애플리케이션 유형이 아닙니다. Datadog Browser SDK는 주변 브라우저 컨텍스트와 함께 WASM 오류를 수집하며, Datadog Error Tracking은 업로드된 DWARF 디버그 정보를 사용하여 WASM 스택 프레임을 심볼화할 수 있습니다.

단일 오류에 JavaScript 프레임과 WASM 프레임이 모두 포함될 수 있습니다. JavaScript 프레임에 대해서는 [JavaScript 소스 맵][1]을, WASM 프레임에 대해서는 WASM 심볼을 업로드하세요.

<div class="alert alert-warning">WebAssembly 심볼화는 베타 버전입니다. 브라우저 SDK 플러그인과 <code>datadog-ci wasm-symbols upload</code> 명령어는 실험적 기능이며 변경될 수 있습니다.</div>

## 전제 조건 {#prerequisites}

심볼을 업로드하기 전에 다음 사항을 확인하세요.

- [RUM][2], [브라우저 로그][3] 또는 둘 다를 사용하여 WASM 모듈 메타데이터를 수집하도록 구성된 브라우저 애플리케이션.
- 임베디드 DWARF 디버그 섹션과 `build_id` 사용자 지정 섹션이 포함된 `.wasm` 심볼 파일.
- `@datadog/datadog-ci` 버전 5.23.0 이상.

## 디버그 심볼 생성 {#generate-debug-symbols}

다음 항목을 생성하도록 WASM 툴체인을 구성하세요.

- `.debug_info` 및 `.debug_line`과 같은 임베디드 DWARF 섹션.
- `build_id` 사용자 지정 섹션. 업로드된 심볼 파일의 빌드 ID는 브라우저에 의해 로드된 모듈의 빌드 ID와 일치해야 합니다.

예를 들어, Emscripten의 경우:

```shell
emcc -g -Wl,--build-id <SOURCES> -o <OUTPUT>.js
```

이 명령은 `<OUTPUT>.js`, JavaScript 로더, `<OUTPUT>.wasm`, 임베디드 DWARF 정보와 `build_id` 사용자 지정 섹션이 포함된 WebAssembly 바이너리를 생성합니다.

`wasm-objdump`를 사용하여 생성된 모듈을 검사할 수 있습니다.

```shell
wasm-objdump -h <OUTPUT>.wasm
wasm-objdump -j build_id -x <OUTPUT>.wasm
```

CI 파이프라인에서 업로드할 수 있도록 심볼 파일을 빌드 아티팩트로 보관하세요.

## 심볼 업로드 {#upload-your-symbols}

Datadog CLI를 설치하고 Datadog API 키와 사이트를 구성하세요.

```shell
npm install --save-dev @datadog/datadog-ci
export DATADOG_API_KEY=<DATADOG_API_KEY>
export DATADOG_SITE={{< region-param key="dd_site" >}}
```

베타 명령어를 활성화하고 하나의 `.wasm` 파일 또는 디렉터리를 업로드하세요. 디렉터리가 지정되면 CLI는 해당 디렉터리에서 `.wasm` 파일을 재귀적으로 검색합니다.

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build
```

이 명령은 임베디드 DWARF 정보와 `build_id` 사용자 지정 섹션을 모두 포함하지 않는 파일은 건너뜁니다. `--dry-run`을 사용하여 심볼 파일을 업로드하지 않고 유효성을 검사합니다.

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build --dry-run
```

기본적으로 Datadog은 빌드 ID에 대해 처음 업로드된 심볼 파일을 유지합니다. 의도적으로 교체해야 할 경우 `--replace-existing`을 사용하세요.

<div class="alert alert-info">업로더는 <code>external_debug_info</code> 참조를 확인하지 않습니다. 이 참조만 포함된 런타임 모듈은 건너뜁니다. 임베디드 DWARF 섹션이 포함되어 있고 런타임 모듈과 동일한 <code>build_id</code> 를 가진 심볼 파일을 업로드하세요.</div>

## 심볼이 일치되는 방식 {#how-symbols-are-matched}

Datadog은 모듈 URL 메타데이터를 사용하여 각 WASM 스택 프레임을 모듈과 연결한 다음, `build_id`로 모듈을 업로드된 심볼과 일치시킵니다. JavaScript 소스 맵과 달리 `service` 및 `version`은 WASM 심볼 조회에 포함되지 않습니다.

[RUM 디버그 심볼 페이지][4]에서 업로드된 파일을 조회할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/guide/upload-javascript-source-maps/
[2]: /ko/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[3]: /ko/logs/log_collection/javascript/#webassembly-errors
[4]: https://app.datadoghq.com/source-code/setup/rum
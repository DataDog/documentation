---
code_lang: haproxy
code_lang_weight: 40
further_reading:
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa
  tag: 소스 코드
  text: HAProxy 통합 소스 코드
- link: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
  tag: 컨테이너 이미지
  text: HAProxy SPOA Docker 이미지
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결
title: HAProxy용 App and API Protection 활성화
---
{{< callout url="https://www.datadoghq.com/product-preview/haproxy-integration/">}}
HAProxy용 App and API Protection은 미리 보기로 제공되고 있습니다. 가입하려면 <strong>Request Access</strong>를 클릭한 후 양식을 작성합니다.
{{< /callout >}}

HAProxy 인스턴스에서 App and API Protection을 활성화할 수 있습니다. Datadog HAProxy 통합은 HAProxy의 Stream Processing Offload Engine(SPOE)을 활용하여 인프라 엣지에서 트래픽 검사 및 보호를 실행해 위협을 탐지합니다.

## 전제 조건 {#prerequisites}

- [Datadog Agent][1]가 사용자 환경(호스트, 컨테이너, 오케스트레이터)에 설치 및 구성되어 있습니다.
- 공격자를 차단하려면 Datadog UI에서 [Remote Configuration으로 Agent 구성][2]을 수행합니다.

## 위협 탐지 활성화 {#enabling-threat-detection}

### 시작하기 {#get-started}

App and API Protection HAProxy 통합은 HAProxy의 [Stream Processing Offload Engine][3] (SPOE)를 사용하여 Datadog Stream Processing Offload Agent(SPOA)를 호출합니다. SPOA는 요청과 응답을 분석합니다.

HAProxy용 App and API Protection을 활성화하려면 다음을 수행합니다.
1. Datadog HAProxy SPOA 컨테이너를 배포합니다.
2. SPOA와 통합하도록 HAProxy 구성 파일을 업데이트합니다.

### SPOA 컨테이너 {#spoa-container}

[Datadog GitHub 컨테이너 레지스트리 ][4]에서 제공되는 Datadog HAProxy SPOA 이미지를 배포합니다. SPOA는 HAProxy의 SPOE 연결을 수신하고 보안 이벤트를 Datadog Agent로 전송합니다.

SPOA 컨테이너와 관련해 사용 가능한 구성 옵션은 [구성](#configuration)을 참조하세요.

### HAProxy 구성 파일 {#haproxy-configuration-files}

모든 필수 HAProxy 구성 파일은 [리포지토리 폴더][8]에서 확인할 수 있습니다. 구성 업데이트 및 변경 사항에 대한 정보는 [구성 변경 로그][9]를 참조하세요.

설정 시 다음과 같은 파일이 필요합니다.

- `spoe.cfg`: 핵심 SPOE 엔진 구성 파일입니다.
- `global-config.cfg`: `global` 섹션에 포함할 구성 라인입니다.
- `frontend-config.cfg`: 보호하려는 각 `frontend`의 상단에 추가할 구성 라인입니다.
- `backend.cfg`: SPOE 엔진에서 사용하는 SPOA 백엔드를 정의합니다.
- `datadog_aap_blocking_response.lua`: 응답 차단을 위한 Lua 스크립트입니다.

각 파일별 설정 지침은 아래에 제시되어 있습니다.

#### spoe.cfg {#spoecfg}

`spoe.cfg` 파일은 SPOE 에이전트와 해당 구성을 선언하는 역할을 합니다. 이 파일은 디스크에 저장해야 합니다(예: `/usr/local/etc/haproxy/spoe.cfg`). 이 파일의 위치는 `global` 섹션 내에 구성된 `DD_SPOA_SPOA_CONF_FILE` 환경 변수를 통해 참조됩니다.

이 파일에는 사용자 지정 수정을 적용하지 않는 것이 중요합니다.

#### global-config.cfg {#global-configcfg}

`global-config.cfg` 파일은 필수 Lua 스크립트를 로드하고 통합 시 필요한 변수를 구성합니다. 파일의 내용은 `global` 구성 파일의 `haproxy.cfg` 섹션에 반영되어야 합니다.

사용자 환경에 맞게 값을 조정할 수 있습니다. 각 설정에 대한 자세한 지침은 파일 내 주석을 검토하세요.

#### frontend-config.cfg {#frontend-configcfg}

`frontend-config.cfg` 파일은 SPOE 필터를 프런트엔드에 연결합니다. 이 섹션은 보호하려는 각 `frontend` 섹션의 상단에서 다른 필터 및 라우터보다 앞에 위치해야 합니다.

이 섹션에서는 다음 사항을 보장합니다.
- 요청 및 응답 이벤트를 SPOA로 전송
- Datadog 추적 헤더 삽입(해당하는 경우)
- 차단을 위해 Lua 헬퍼 조건부 호출

이 구성 영역에는 사용자 지정 수정을 적용하지 않는 것이 중요합니다.

#### backend.cfg {#backendcfg}

`backend.cfg` 파일은 SPOE 엔진 및 상태 확인 과정에서 사용되는 `spoa-backend`를 정의합니다. `haproxy.cfg` 파일의 끝부분에 이 구성을 추가해야 합니다.

`server spoa1 <host>:<port>` 줄에서 배포된 SPOA 컨테이너 인스턴스를 참조하도록 수정해야 합니다.

<div class="alert alert-info">
  <strong>참고:</strong> 고가용성 및 중복성 확보를 위해 <code>server</code> 줄(예: <code>server spoa1 ...</code>, <code>server spoa2 ...</code>등)을 추가하여 여러 SPOA 에이전트 서버를 구성할 수 있습니다. HAProxy는 이러한 SPOA 에이전트 간에 자동으로 로드 밸런싱 및 장애 조치를 수행하므로, 하나의 에이전트를 사용할 수 없게 되는 경우에도 지속적인 보호를 보장합니다.
</div>

#### datadog_aap_blocking_response.lua {#datadog-aap-blocking-responselua}

`datadog_aap_blocking_response.lua` 스크립트는 SPOA가 HAProxy에 요청 차단을 지시할 때 사용자 지정 차단 응답을 전송하는 역할을 합니다. 이 스크립트는 `/etc/haproxy/lua/datadog_aap_blocking_response.lua` 등의 위치에 저장될 수 있으며, `global` 섹션의 `lua-load` 지시문은 이 경로를 참조해야 합니다.

이 파일에는 사용자 지정 수정을 적용하지 않는 것이 중요합니다.

<div class="alert alert-info">
  <strong>참고:</strong> 이 Lua 스크립트는 HAProxy가 처리하는 모든 요청에 대해 호출되지는 않습니다. 이 스크립트는 App and API Protection에 의해 요청이 차단되는 시점에만 호출됩니다. 이러한 설계는 모든 요청에 대해 Lua 코드를 실행하는 오버헤드를 방지하여 최적의 성능을 실현합니다.
</div>

### 유효성 검사 {#validation}

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

## 구성 {#configuration}

Datadog HAProxy SPOA 컨테이너는 다음과 같은 구성 설정을 지원합니다.

| 환경 변수                | 기본값 | 설명                                                                                                   |
| ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| `DD_HAPROXY_SPOA_HOST`              | `0.0.0.0`     | SPOA 및 HTTP 상태 확인 서버가 수신을 대기하는 호스트입니다.                                                         |
| `DD_HAPROXY_SPOA_PORT`              | `3000`        | HAProxy와의 통신을 수락하는 SPOA에서 사용하는 포트입니다.                                                |
| `DD_HAPROXY_SPOA_HEALTHCHECK_PORT`  | `3080`        | HTTP 상태 확인 서버에 사용되는 포트입니다.                                                              |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` | `0`           | 처리할 본문의 최대 크기(바이트)입니다. `0`인 경우 본문이 처리되지 않습니다. 권장: `10000000` (10MB). |
| `DD_SERVICE`                        | `spoa`        | Datadog UI에 표시되는 서비스 이름입니다.                                                                         |

다음 환경 변수를 사용하여 Datadog Agent로 트레이스를 전송하도록 SPOA를 설정합니다.

| 환경 변수  | 기본값 | 설명                      |
| --------------------- | ------------- | -------------------------------- |
| `DD_AGENT_HOST`       | `localhost`   | 실행 중인 Datadog Agent의 호스트입니다. |
| `DD_TRACE_AGENT_PORT` | `8126`        | 실행 중인 Datadog Agent의 포트입니다. |

### Datadog Go Tracer 및 HAProxy 통합 {#datadog-go-tracer-and-haproxy-integration}

HAProxy 통합은 [Datadog Go Tracer][5]를 기반으로 구축되었으며 트레이서의 모든 환경 변수를 상속합니다. [Go SDK 구성][6] 및 [App and API Protection 라이브러리 구성][7]을 참조하세요.

<div class="alert alert-info">
  <strong>참고:</strong> Datadog SPOA는 Datadog Go Tracer를 기반으로 구축되었습니다. 이는 일반적으로 트레이서와 동일한 릴리스 프로세스를 따르며, Docker 이미지에는 해당 트레이서 버전 태그가 지정됩니다(예: <code>v2.4.0</code>). 경우에 따라 공식 트레이서 릴리스 사이에 초기 릴리스 버전이 게시될 수 있으며, 해당 이미지에는 다음과 같은 접미사가 태그로 지정됩니다. <code>-docker.1</code>.
</div> <br><br>

## 최신 구성 상태로 유지 {#keeping-your-configuration-up-to-date}

HAProxy의 SPOE 통합은 런타임 구성 요소(SPOA 컨테이너 이미지)와 HAProxy 구성을 모두 포함하므로, 업그레이드 시 두 부분을 모두 변경해야 할 수 있습니다.

업데이트 모니터링 및 추적에 도움이 되도록 참조 HAProxy 구성 및 관련 변경 로그를 제공합니다.
- [참조 HAProxy 구성 디렉터리][8] (SPOE 엔진, 글로벌, 프론트엔드/백엔드 스니펫, Lua)
- [구성 변경 로그][9]

### 권장 업그레이드 관행 {#recommended-upgrade-practices}

- SPOA 이미지를 특정 버전으로 고정하고, 구성 변경 로그를 검토한 후 의도적으로 업그레이드합니다.
- 손쉬운 업데이트를 위해 Datadog 구성을 중앙 집중화합니다.
- 참조 구성 및 변경 로그를 추적하고 업그레이드 시 사용자의 구성과 비교합니다.

## 제한 사항 {#limitations}

HAProxy 통합에는 다음과 같은 제한 사항이 있습니다.

- 비동기(관측 가능성) 모드는 현재 지원되지 않습니다.

HAProxy 통합 호환성에 대한 자세한 내용은 [HAProxy 통합 호환성 페이지][10]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ko/remote_configuration/
[3]: https://www.haproxy.com/blog/extending-haproxy-with-the-stream-processing-offload-engine
[4]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fhaproxy-spoa
[5]: https://github.com/DataDog/dd-trace-go
[6]: /ko/tracing/trace_collection/library_config/go/
[7]: /ko/security/application_security/policies/library_configuration/
[8]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/
[9]: https://github.com/DataDog/dd-trace-go/blob/main/contrib/haproxy/stream-processing-offload/cmd/spoa/haproxyconf/CHANGELOG.md
[10]: /ko/security/application_security/setup/compatibility/haproxy
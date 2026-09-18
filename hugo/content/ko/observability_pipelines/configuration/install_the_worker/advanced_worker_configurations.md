---
aliases:
- /ko/observability_pipelines/setup_opw/
- /ko/observability_pipelines/advanced_configurations/
description: Worker 부트스트랩 옵션 및 기타 구성 옵션에 대해 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/sensitive_data_redaction/
  tag: 설명서
  text: Observability Pipelines를 사용한 데이터 마스킹
- link: /observability_pipelines/configuration/update_existing_pipelines/
  tag: 설명서
  text: 기존 파이프라인 업데이트
title: 고급 Worker 구성
---
## 개요 {#overview}

이 문서는 Observability Pipelines Worker를 위한 [부트스트래핑](#bootstrap-options), [기타 Worker 구성 옵션](#other-worker-configuration-options), 그리고 [상태 확인 엔드포인트와 활성 및 준비 상태 프로브를 활성화](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes)하는 방법을 설명합니다.

## 부트스트랩 옵션 {#bootstrap-options}

<div class="alert alert-danger">파이프라인에 지정된 모든 구성 파일 경로는 다음 위치 아래에 있어야 합니다 <code>/DD_OP_DATA_DIR/config</code>.
OPW가 실행되는 동안 해당 위치의 파일을 수정하면 부정적인 영향을 미칠 수 있습니다.
</div>

파이프라인을 설정하기 전에 인프라 내에서 Observability Pipelines Worker를 부트스트랩하세요. 이 환경 변수는 파이프라인 환경 변수와는 별개입니다. 관련 디렉터리 및 파일의 위치:

- 기본 데이터 디렉터리: `/var/lib/observability-pipelines-worker`
- 부트스트랩 파일: `/etc/observability-pipelines-worker/bootstrap.yaml`
- 환경 변수 파일: `/etc/default/observability-pipelines-worker`

**참고**: `DD_OP_DATA_DIR`은 단일 Observability Pipelines Worker만 소유할 수 있습니다. 여러 Worker가 있는 경우 고유한 데이터 디렉터리를 사용해야 합니다.

부트스트랩 옵션을 설정하려면 다음 중 하나를 수행하세요.
- 환경 변수를 사용합니다.
- `bootstrap.yaml`을 생성하고 `--bootstrap-config /path/to/bootstrap.yaml`으로 Worker 인스턴스를 시작합니다.

다음은 부트스트랩 옵션, 관련 파이프라인 환경 변수, 그리고 둘 다 설정된 경우 부트스트랩 값과 환경 변수 중 어느 것이 더 높은 우선순위를 갖는지에 대한 목록입니다.

`api`
: **파이프라인 환경 변수**: `DD_OP_API_ENABLED`
: **우선순위**: `DD_OP_API_ENABLED`
: 구성 예시:
: &nbsp;&nbsp;&nbsp;&nbsp;`api`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`address`: `"127.0.0.1:8686" # optional`
: 참고: `address` 설정은 선택 사항입니다. API가 바인딩되어야 하는 네트워크 주소입니다. Worker를 Docker 컨테이너에서 실행 중인 경우 `0.0.0.0`에 바인딩하세요. 그렇지 않으면 API가 컨테이너 외부로 노출되지 않습니다.
: **설명**: `tap` 또는 `top` 명령을 사용하여 Worker의 프로세스를 볼 수 있도록 Observability Pipelines Worker API를 활성화하세요. 자세한 내용은 [Run, tap, or top the Worker][8]를 참조하세요. [파이프라인 설정][7] 시 제공되는 Helm 차트를 사용하는 경우 API는 이미 활성화되어 있습니다. 그렇지 않은 경우 `/etc/observability-pipelines-worker/bootstrap.yaml`에서 환경 변수 `DD_OP_API_ENABLED`가 `true`로 설정되어 있는지 확인합니다. 이렇게 하면 API가 `localhost` 및 포트 `8686`에서 수신 대기하도록 설정되며, 이는 `tap` CLI가 기대하는 설정입니다.
<br><br>`/health` 엔드포인트를 노출하는 방법은 [활성 및 준비 상태 프로브 활성화](#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes)를 참조하세요.

`api_key`
: **파이프라인 환경 변수**: `DD_API_KEY`
: **우선순위**: `DD_API_KEY`
: **설명**: 이 환경 변수에 대한 [Datadog API 키][1]를 생성하세요. API 키에 대해 [Remote Configuration][6]이 활성화되어 있어야 합니다. Remote Configuration에 구현된 보호 장치에 대한 자세한 내용은 [보안 고려 사항][11]을 참조하세요.

`data_dir`
: **파이프라인 환경 변수**: `DD_OP_DATA_DIR`
: **우선순위**: `DD_OP_DATA_DIR`
: **설명**: 데이터 디렉터리(선택 사항, 기본값: `/var/lib/observability-pipelines-worker`). Observability Pipelines Worker가 로컬 상태를 위해 사용하는 파일 시스템 디렉터리입니다.

`pipeline_id`
: **파이프라인 환경 변수**: `DD_OP_PIPELINE_ID`
: **우선순위**: `DD_OP_PIPELINE_ID`
: **설명**: 이 환경 변수에 대한 [Observability Pipelines 파이프라인 ID][2]를 생성하세요.

`proxy`
: **파이프라인 환경 변수**: `DD_PROXY_HTTP`, `DD_PROXY_HTTPS`, `DD_PROXY_NO_PROXY`
: Observability Pipelines Worker에 대한 프록시 서버를 설정하세요. Worker에 대한 프록시 구성은 [Datadog Agent][4]와 동일한 방식으로 작동합니다.
: **우선순위**: 설정이 전체 Worker 프로세스에 적용됩니다. HTTP 프록시 및 HTTPS 값은 다음 순서로 처리됩니다.
<br>&nbsp;&nbsp;&nbsp;1. `DD_PROXY_HTTP(S)`
<br>&nbsp;&nbsp;&nbsp;2. `HTTP(S)_PROXY`
<br>&nbsp;&nbsp;&nbsp;3. `proxy`
:
: 프록시 구성 예시:
: &nbsp;&nbsp;&nbsp;&nbsp;`proxy`:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`enabled`: `true`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`https`: `https://foo.bar:3128`
: **설명**: Observability Pipelines Worker는 Squid와 같은 포워드 프록시를 통해 외부 요청을 라우팅할 수 있습니다. 포워드 프록시는 Observability Pipelines Worker에서 인터넷으로 향하는 클라이언트 요청을 전달합니다. 특정 도메인, 포트 또는 프로토콜을 허용하거나 차단하기 위한 웹 방화벽으로 사용할 수 있습니다. 포워드 프록시는 일반적으로 SSL을 종료하지 않으므로 요청 콘텐츠에 액세스할 수 없습니다. 클라이언트와 대상 사이에서 패킷을 주고받기만 합니다. [HTTP 터널][5]은 포워드 프록시를 통한 통신을 보호하는 데 사용됩니다.
: **참고**:
: <li style="list-style-type: '- '">이 옵션은 Observability Pipelines Worker 2.1 이상에서 사용할 수 있습니다.</li>
: <li style="list-style-type: '- '">Observability Pipelines Worker는 HAProxy 및 NGINX와 같은 리버스 프록시를 통해 외부 요청을 라우팅할 수 없습니다.</li>
: <li style="list-style-type: '- '"> <code>DD_PROXY_HTTP(S)</code> 및 <code>HTTP(S)_PROXY</code> 환경 변수는 Worker가 해당 값을 확인할 수 있도록 환경에 미리 내보내져 있어야 합니다. Worker 설치 스크립트 앞에 추가할 수 없습니다.</li>

`secret`
: **파이프라인 환경 변수**: 없음
: **우선순위**: 해당 없음
: **설명**: Worker를 시크릿 관리자에 연결합니다. 구성 정보는 [비밀 관리][12]를 참조하세요.

`site`
: **파이프라인 환경 변수**: `DD_SITE`
: **우선순위**: `DD_SITE`
: **설명**: Datadog 사이트(선택 사항, 기본값: `datadoghq.com`).
: 자세한 내용을 확인하려면 [사이트 시작하기][3]를 참조하세요.

`tags: []`
: **파이프라인 환경 변수**: `DD_OP_TAGS`
: **우선순위**: `DD_OP_TAGS`
: **설명**: 내부 메트릭과 함께 보고되는 태그이며 Remote Configuration 배포를 위해 Observability Pipelines 인스턴스를 필터링하는 데 사용할 수 있습니다.

`threads`
: **파이프라인 환경 변수**: `DD_OP_THREADS`
: **우선순위**: `DD_OP_THREADS`
: **설명**: 처리에 사용할 스레드 수(선택 사항, 기본값: 사용 가능한 코어 수).

## 기타 Worker 구성 옵션 {#other-worker-configuration-options}

`VECTOR_HOSTNAME` 환경 변수를 사용하여 고유한 호스트 이름을 할당하고 Worker를 식별하세요.

## 상태 확인 엔드포인트와 활성 및 준비 상태 프로브 활성화 {#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes}

Worker가 정상적으로 실행 중인지 확인하기 위해 `/health` 엔드포인트로 로드 밸런서의 상태 확인을 구성하세요.

Kubernetes의 경우, 활성 및 준비 상태 프로브는 [Helm 차트][9]와 [values.yaml][10] 파일에서 이미 활성화되어 있습니다.

VM 기반 설치와 같은 다른 설치의 경우, `DD_OP_API_ENABLED`를`true`로 설정하고 `DD_OP_API_ADDRESS`를 `0.0.0.0:8686`으로 설정하여 `/health` 엔드포인트를 노출하세요. 구성 예시:

```
api:
  enabled: true
  address: "0.0.0.0:8686"
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/getting_started/site/
[4]: /ko/agent/configuration/proxy/?tab=linux#environment-variables
[5]: https://en.wikipedia.org/wiki/HTTP_tunnel
[6]: /ko/remote_configuration
[7]: /ko/observability_pipelines/set_up_pipelines/
[8]: /ko/observability_pipelines/install_the_worker/worker_commands/#run-tap-or-top-the-worker
[9]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L33-L40
[10]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L303-L329
[11]: /ko/remote_configuration/#security-considerations
[12]: /ko/observability_pipelines/configuration/secrets_management/
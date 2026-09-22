---
aliases:
- /ko/observability_pipelines/install_the_worker/worker_commands/
description: Observability Pipelines Worker 명령줄 인터페이스에서 사용 가능한 run, tap, top 명령 및
  옵션을 알아보세요.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/install_the_worker/
  tag: 설명서
  text: Worker 설치하기
title: Worker CLI 명령
---
## Worker 대상 run, tap, top 작업 {#run-tap-or-top-the-worker}

사용 예: `observability-pipelines-worker <COMMAND>`

컨테이너화된 환경을 사용하는 경우, `docker exec` 또는 `kubectl exec` 명령을 사용하여 컨테이너에 셸로 접속한 후 명령을 실행하세요. 예를 들면 다음과 같습니다.

- Kubernetes의 경우: `kubectl exec -it <pod_name> -- observability-pipelines-worker <opw_command>`
- Docker의 경우: `docker exec -it <container_name> observability-pipelines-worker <opw_command>`

| 명령   | 설명                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `run`     | Observability Pipelines Worker를 실행합니다.                                                                                |
| `tap`     | 파이프라인을 탭하여 소스 또는 변환 구성 요소의 이벤트를 관찰합니다. [tap 옵션](#tap-options)을 참조하세요.                |
| `top`     | 파이프라인의 구성 요소를 나열하고 각 구성 요소의 입력 및 출력 데이터 속도와 같은 통계를 제공합니다. 사용 가능한 모든 키 바인딩을 보려면 `?`을 입력하세요.  |

### tap 옵션 {#tap-options}

사용 예: `observability-pipelines-worker tap <OPTIONS> <COMPONENT_ID>`

[`top` 명령](#run-tap-or-top-the-worker)을 사용하여 `tap`하려는 구성 요소의 ID를 찾을 수 있습니다.

| 옵션                          | 설명                                                                                                   |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|
| `-i`, `--interval <INTERVAL>`    | 이벤트 샘플링 간격(밀리초 단위, 기본값: `500`)입니다.                                                |
| `-u`, `--url <URL>`              | GraphQL API 서버 엔드포인트입니다.                                                                                   |
| `-l`, `--limit <LIMIT>`          | 간격마다 샘플링할 최대 이벤트 수(기본값: `100`)입니다.                                             |
| `-f`, `--format <FORMAT>`        | 화면에 출력되는 이벤트의 인코딩 형식입니다.<br>기본값: `json`<br>가능한 값: `json`, `yaml`, `logfmt`  |
| `--outputs-of <OUTPUTS_OF>`      | 출력을 관찰하려는 소스 또는 프로세서 ID(쉼표로 구분, glob 패턴 허용)입니다.            |
| `--inputs-of <INPUTS_OF>`        | 입력을 관찰하려는 프로세서 또는 대상 ID(쉼표로 구분, glob 패턴 허용)입니다.        |
| `-q`, `--quiet`                  | 최소 출력에는 이벤트만 포함됩니다.                                                                             |
| `-m`, `--meta`                   | 이벤트와 연결된 구성 요소 ID와 같은 메타데이터를 포함합니다.                                                  |
| `-n`, `--no-reconnect`           | 기본 API 연결이 끊어질 경우에 재연결할지 여부입니다. 기본적으로 `tap`은 연결이 끊어지면 재연결을 시도합니다. |
| `-d`, `--duration-ms <DURATION_MS>` | 로그를 샘플링할 기간(밀리초 단위)을 지정합니다(예: `10000`을 지정하면 10초 동안 로그를 샘플링한 후 종료). |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
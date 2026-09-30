---
aliases:
- /ko/observability_pipelines/set_up_pipelines/run_multiple_pipelines_on_a_host/
description: 단일 호스트에서 서로 다른 파이프라인에 대해 여러 Observability Pipelines Worker를 실행하기 위해 추가
  및 수정해야 할 Worker 파일을 살펴봅니다.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: 설명서
  text: 파이프라인 설정
- link: /observability_pipelines/guide/environment_variables/
  tag: 설명서
  text: 소스, 프로세서 및 구성 요소를 위한 환경 변수
title: 호스트에서 여러 파이프라인 실행
---
## 개요 {#overview}

단일 호스트에서 여러 파이프라인을 실행하여 서로 다른 소스의 로그나 메트릭을 보내려면 추가 Worker에 대한 Worker 파일을 수동으로 추가해야 합니다. 이 문서에서는 이러한 Worker를 실행하기 위해 어떤 파일을 추가 및 수정해야 하는지 설명합니다.

## 전제 조건 {#prerequisites}

[첫 번째 파이프라인을 설정][1]하고 호스트에 Worker를 설치합니다.

## 추가 파이프라인 생성 {#create-an-additional-pipeline}

동일한 호스트에서 실행하려는 추가 Worker에 대해 [다른 파이프라인을 설정][1]합니다. 설치 페이지에 도달하면 아래 단계에 따라 이 파이프라인을 위한 Worker를 실행합니다.

## 추가 파이프라인을 위한 Worker 실행 {#run-the-worker-for-the-additional-pipeline}

첫 번째 Worker를 설치하면 기본적으로 다음 항목이 생성됩니다.

- 서비스 바이너리: `/usr/bin/observability-pipelines-worker`
- 다음과 같은 서비스 정의 파일:
    {{< code-block lang="bash" filename="/lib/systemd/system/observability-pipelines-worker.service" >}}
    [Unit]
    Description="Observability Pipelines Worker"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/observability-pipelines-worker

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
- 다음과 같은 환경 파일:
    {{< code-block lang="bash" filename="/etc/default/observability-pipelines-worker" >}}
    DD_API_KEY=<datadog_api_key>
    DD_SITE=<dd_site>
    DD_OP_PIPELINE_ID=<pipeline_id>
    {{< /code-block >}}
- 데이터 디렉터리: `/var/lib/observability-pipelines-worker`

### 추가 Worker 구성 {#configure-the-additional-worker}

이 예시에서는 Fluent 소스를 사용하여 또 다른 파이프라인을 생성했습니다. 이 파이프라인을 위한 Worker를 구성하려면 다음 작업을 수행하세요.

1. 다음 명령을 실행하여 새 데이터 디렉터리를 생성하고 `op-fluent`를 사용 사례에 맞는 디렉터리 이름으로 바꿉니다.
    ```shell
    sudo mkdir /var/lib/op-fluent
    ```
1. 다음 명령을 실행하여 데이터 디렉터리의 소유자를 `observability-pipelines-worker:observability-pipelines-worker`로 변경합니다. `op-fluent`를 데이터 디렉터리 이름으로 업데이트합니다.
    ```
    sudo chown -R observability-pipelines-worker:observability-pipelines-worker /var/lib/op-fluent/
    ```
1. 새 systemd 서비스를 위한 환경 파일을 생성합니다(예: `/etc/default/op-fluent`). 여기서 `op-fluent`는 구체적인 파일 이름으로 바꿉니다. 파일 콘텐츠 예시:
    {{< code-block lang="bash" filename="/etc/default/op-fluent" >}}
    DD_API_KEY=<datadog_api_key>
    DD_OP_PIPELINE_ID=<pipeline_id>
    DD_SITE=<dd_site>
    <destintation_environment_variables>
    DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091
    DD_OP_DATA_DIR=/var/lib/op-fluent
    {{< /code-block >}}
    이 예시에서는 다음과 같습니다.
    -  `DD_OP_DATA_DIR`은 `/var/lib/op-fluent`로 설정됩니다. `/var/lib/op-fluent`를 데이터 디렉터리 경로로 바꿉니다.
    - `DD_OP_SOURCE_FLUENT_ADDRESS=0.0.0.0:9091`은 이 예시에서 Fluent 소스에 필요한 환경 변수입니다. 이 변수를 사용 중인 소스에 대한 [환경 변수][2](으)로 바꿉니다.
    
    또한 다음과 같이 바꿉니다.
    - `<datadog_api_key>`를 [Datadog API 키][3]로 바꿉니다.
    - `<pipeline_id>`를 이 Worker에 대한 [파이프라인][1] ID로 바꿉니다.
    - `<dd_site>`를 사용 중인 [Datadog 사이트][4]로 바꿉니다.
    - `<destination_environment_variables>`를 대상에 대한 [환경 변수][2]로 바꿉니다.
1. 새 systemd 서비스 항목을 생성합니다(예: `/lib/systemd/system/op-fluent.service`). 이 항목에 대한 예시 콘텐츠:
    {{< code-block lang="bash" filename="/lib/systemd/system/op-fluent.service" >}}
    [Unit]
    Description="OPW for Fluent Pipeline"
    Documentation=https://docs.datadoghq.com/observability_pipelines/
    After=network-online.target
    Wants=network-online.target

    [Service]
    User=observability-pipelines-worker
    Group=observability-pipelines-worker
    ExecStart=/usr/bin/observability-pipelines-worker run
    Restart=always
    AmbientCapabilities=CAP_NET_BIND_SERVICE
    EnvironmentFile=-/etc/default/op-fluent

    [Install]
    WantedBy=multi-user.target
    {{< /code-block >}}
    이 예시에서는 다음과 같습니다.
    - 파이프라인이 Fluent 소스를 사용하므로 서비스 이름은 `op-fluent`입니다. `op-fluent.service`를 사용 사례에 맞는 서비스 이름으로 바꿉니다.
    - `Description`은 `OPW for Fluent Pipeline`입니다. `OPW for Fluent Pipeline`을 사용 사례에 대한 설명으로 바꿉니다.
    - `EnvironmentFile`은 `-/etc/default/op-fluent`로 설정되어 있습니다. `-/etc/default/op-fluent`를 Worker를 위해 생성한 systemd 서비스 환경 변수 파일로 바꿉니다.
1. systemd를 다시 로드하려면 다음 명령을 실행합니다.
    ```shell
    sudo systemctl daemon-reload
    ```
1. 새 서비스를 시작하려면 다음 명령을 실행합니다.
    ```shell
    sudo systemctl enable --now op-fluent
    ```
1. 서비스가 실행 중인지 확인하려면 이 명령을 실행합니다.
    ```shell
    sudo systemctl status op-fluent
    ```

또한 `sudo journalctl -u op-fluent.service` 명령을 사용하여 이슈를 디버깅할 수 있습니다.

## 파이프라인 배포 {#deploy-the-pipeline}

1.  추가 파이프라인의 설치 페이지로 이동합니다.
1.  {{< ui >}}Deploy your pipeline{{< /ui >}} 섹션에서 추가 Worker가 탐지된 것을 확인할 수 있습니다. {{< ui >}}Deploy{{< /ui >}}를 클릭합니다.

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/?tab=pipelineui
[2]: /ko/observability_pipelines/guide/environment_variables/?tab=sources
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/getting_started/site/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
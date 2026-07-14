---
disable_toc: false
title: 문제 해결
---
## 개요 {#overview}

Datadog Observability Pipelines(OP)를 사용하는 동안 예상치 못한 동작이 발생하는 경우 확인할 수 있는 몇 가지 일반적인 문제가 있으며, 이 가이드를 통해 문제를 빠르게 해결할 수 있습니다. 문제가 계속되면 추가 지원을 위해 [Datadog 지원팀][1]에 문의하세요.

## Observability Pipelines Worker 통계 및 로그 보기 {#view-observability-pipelines-worker-stats-and-logs}

활성 파이프라인에서 실행 중인 Observability Pipelines Worker 정보를 보려면 다음을 수행합니다.

1. [Observability Pipelines][2]로 이동합니다.
1. 파이프라인을 선택합니다.
1. **Workers** 탭을 클릭하여 Worker의 메모리 및 CPU 사용률, 트래픽 통계 및 오류를 확인합니다.
1. Worker의 상태 및 버전을 보려면 **Latest Deployment & Setup** 탭을 클릭합니다.
1. Worker 로그를 보려면 페이지 오른쪽 상단의 톱니바퀴 아이콘을 클릭한 다음 **View OPW Logs**를 선택합니다. 로그 필터링 방법에 대한 자세한 내용은 [Logs Search Syntax][3]를 참조하세요. 특정 Worker의 로그를 보려면 검색 쿼리에 `@op_worker.id:<worker_id>`을 추가합니다.<br>**참고**: Observability Pipelines Worker 로그가 표시되지 않으면 Log Management에 [Worker 로그를 인덱싱][10]하는지 확인하세요.

## 파이프라인을 통과하는 이벤트를 검사하여 설정 문제 식별 {#inspect-events-sent-through-your-pipeline-to-identify-setup-issues}

Observability Pipelines Worker에 로컬로 접근할 수 있는 경우 `tap` 명령을 사용하여 파이프라인의 소스 및 프로세서를 통과하는 원시 데이터를 확인합니다.

### Observability Pipelines Worker API 활성화 {#enable-the-observability-pipelines-worker-api}

 Observability Pipelines Worker API를 사용하면 `tap` 및 `top` 명령으로 Worker 프로세스와 상호 작용할 수 있습니다. [파이프라인 설정][4] 시 제공되는 Helm 차트를 사용하는 경우 API는 이미 활성화되어 있습니다. 그렇지 않은 경우 `/etc/observability-pipelines-worker/bootstrap.yaml`에서 환경 변수 `DD_OP_API_ENABLED`가 `true`로 설정되어 있는지 확인합니다. 자세한 내용은 [부트스트랩 옵션][5]을 참조하세요. 이렇게 하면 API가 `localhost` 및 포트 `8686`에서 수신 대기하도록 설정되며, 이는 `tap` CLI가 기대하는 설정입니다.

 **참고**: `/health` 엔드포인트를 노출하는 방법은 [생존 및 준비 프로브 사용][15]을 참조하세요. 엔드포인트를 노출한 후에는 로드 밸런서가 `/health` API 엔드포인트를 사용하여 Worker가 정상적으로 실행 중인지 확인하도록 구성합니다.

### `top`을 사용하여 구성 요소 ID 찾기 {#use-top-to-find-the-component-id}

소스 또는 프로세서의 구성 요소 ID는 해당 구성 요소에 `tap`하기 위해 필요합니다. `top` 명령을 사용하여 `tap`하려는 구성 요소의 ID를 찾습니다.

```
observability-pipelines-worker top
```

명령과 옵션의 전체 목록은 [Worker 명령][13]을 참조하세요.

### `tap`을 사용하여 데이터 보기 {#use-tap-to-see-your-data}

Worker와 동일한 호스트에서 작업 중인 경우 다음 명령을 실행하여 구성 요소의 출력을 `tap`합니다.

```
observability-pipelines-worker tap <component_ID>
```

컨테이너 환경을 사용하는 경우 먼저 `docker exec` 또는 `kubectl exec` 명령을 사용하여 컨테이너의 셸에 접속한 다음 위의 `tap` 명령을 실행합니다.

명령과 옵션의 전체 목록은 [Worker 명령][13]을 참조하세요.

## 디버그 로그 활성화 {#enable-debug-logs}

디버그 로그를 확인하려면 `VECTOR_LOG` 환경 변수를 `debug`로 설정한 상태로 Worker를 다시 시작합니다. 예를 들어 Docker에서 Worker를 실행하는 경우 `docker run` 명령에 `-e VECTOR_LOG=debug`를 추가합니다.

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## 포드 및 클러스터 이름을 사용하여 Kubernetes 환경에서 Worker 식별 {#identify-workers-in-a-kubernetes-environment-using-pod-and-cluster-names}

{{% observability_pipelines/install_worker/pod_cluster_name_worker %}}

## Worker 로그 문제 {#worker-logs-issues}

### 로그 탐색기에 Worker 로그가 표시되지 않음 {#no-worker-logs-in-log-explorer}

[로그 탐색기][12]에 Worker 로그가 표시되지 않는 경우 로그 파이프라인에서 제외되고 있지 않은지 확인합니다. 최적의 기능을 위해 Worker 로그는 Log Management에 인덱싱되어 있어야 합니다. 이 로그는 Worker 상태, 버전 및 오류와 같은 배포 정보를 제공하며, Observability Pipelines UI에 표시됩니다. 또한 Worker 또는 파이프라인 문제를 해결하는 데도 도움이 됩니다. 모든 Worker 로그에는 `source:op_worker` 태그가 지정됩니다.

### Observability Pipelines 로그 중복 {#duplicate-observability-pipelines-logs}

[로그 탐색기][7]에서 Observability Pipelines 로그가 중복으로 표시되고 Agent가 Docker 컨테이너에서 실행 중인 경우 `DD_CONTAINER_EXCLUDE_LOGS` 환경 변수를 사용하여 Observability Pipelines 로그를 제외해야 합니다. Helm을 사용하는 경우 `datadog.containerExcludeLogs`를 사용합니다. 이렇게 하면 Worker가 자체 로그를 Datadog로 직접 전송하기 때문에 발생하는 중복 로그를 방지할 수 있습니다. 자세한 내용은 [Docker 로그 수집][8] 또는 [Helm용 환경 변수 설정][9]을 참조하세요.

## Worker 문제 및 오류 {#worker-issues-and-errors}

### 새 버전의 Worker 설치 중 오류 발생 {#getting-an-error-when-installing-a-new-version-of-the-worker}

이전 버전의 Worker가 실행 중인 인스턴스에 새 버전의 Worker를 설치하려고 하면 오류가 발생합니다. 새 버전의 Worker를 설치하기 전에 이전 버전을 [제거][11]해야 합니다.

### Worker가 시작되지 않음 {#worker-is-not-starting}

Worker가 시작되지 않으면 Worker 로그가 Datadog로 전송되지 않으며 로그 탐색기에서도 확인할 수 없어 문제를 해결하기 어렵습니다. 로컬에서 로그를 보려면 다음 명령을 사용합니다.

- VM 기반 환경의 경우:
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- Kubernetes의 경우:
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

### 인증서 확인 실패 {#certificate-verify-failed}

`certificate verify failed` 및 `self-signed certificate in certificate chain`와 관련된 오류가 표시되면 [TLS 인증서][16]를 참조하세요. Observability Pipelines는 자체 서명 인증서를 보안상 이유로 허용하지 않습니다.

### 조직에서 RC가 활성화되어 있는지 확인 {#ensure-your-organization-is-enabled-for-rc}

`Please ensure you organization is enabled for RC` 오류가 표시되면 Worker API 키에서 [Remote Configuration][17]이 활성화되어 있는지 확인합니다. Remote Configuration에 구현된 보호 장치에 대한 자세한 내용은 [보안 고려 사항][19]을 참조하세요.

### Worker가 소스로부터 로그를 수신하지 않음 {#the-worker-is-not-receiving-logs-from-the-source}

소스가 Worker로 로그를 전송하도록 구성한 경우 Worker가 수신 대기 중인 포트와 소스가 로그를 전송하는 포트가 동일한지 확인합니다.

RHEL을 사용하는 경우 한 포트(예: UDP/514)에서 Worker가 수신 대기하는 포트(예: 권한이 필요 없는 포트인 UDP/1514)로 로그를 전달해야 한다면 [`firewalld`][14]를 사용하여 514번 포트에서 1514번 포트로 로그를 전달할 수 있습니다.

### 연결 실패 오류 {#failed-to-connect-error}

다음과 유사한 오류가 표시되고

```
Failed to connect to 34.44.228.240 port 80 after 56 ms: Couldn't connect to server
```

```
connect to 35.82.252.23 port 80  failed: Operation timed out
```

```
Failed to connect to ab52a1d16fxxxxxxxabd90c7526a1-1xxxx.us-west-2.elb.amazonaws.com port 80 after 225027 ms: Couldn't connect to server
```

다음 조건에 해당하는 경우:

- 소스와 Worker 사이에 방화벽이 있는 경우, 선택한 포트를 통해 소스와 Worker 간 트래픽이 허용되는지 확인합니다.
- Worker와 대상 사이에 방화벽이 있는 경우, 정의된 포트를 통해 Worker에서 대상까지의 트래픽이 허용되는지 확인합니다.

소스 시스템에 셸로 접근할 수 있다면 소스 위치에서 `curl` 명령을 사용하여 Observability Pipelines Worker 엔드포인트와의 연결을 테스트할 수 있습니다. 예를 들어 Datadog Agent 소스를 사용하는 경우 curl 명령은 다음과 같습니다.

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

사용하는 curl 명령은 사용 중인 포트와 소스에서 요구하는 경로 및 페이로드에 따라 달라집니다.

**참고**: 방화벽을 사용하는 경우 허용 목록에 추가해야 하는 도메인 목록은 [방화벽 허용 목록에 도메인 추가][21]를 참조하세요.

### 파일이 너무 많음 오류 {#too-many-files-error}

`Too many files` 오류가 표시되고 Worker 프로세스가 반복적으로 재시작되는 경우 호스트의 파일 디스크립터 제한이 너무 낮기 때문일 수 있습니다. Linux 환경에서는 systemd 서비스 구성에서 `LimitNOFILE`을 `65,536`으로 설정하여 파일 디스크립터 제한을 늘리면 이 문제를 해결할 수 있습니다.

## 일반적인 파이프라인 문제 {#general-pipeline-issues}

### 환경 변수 누락 {#missing-environment-variable}

`Configuration is invalid. Missing environment variable $<env_var>` 오류가 표시되면 Worker 설치 시 소스, 프로세서 및 대상에 필요한 환경 변수를 모두 추가했는지 확인합니다. 소스, 프로세서 및 대상 환경 변수 목록은 [환경 변수][18]를 참조하세요.

## 로그 파이프라인 문제 {#logs-pipeline-issues}

### 로그가 대상으로 전달되지 않음 {#logs-are-not-getting-forwarded-to-the-destination}

대상이 수신 대기 중인 포트를 다른 서비스가 사용하고 있지 않은지 확인하려면 `netstat -anp | find "<port_number>"` 명령을 실행합니다.

### 대상에서 로그가 지연되어 표시됨 {#seeing-delayed-logs-at-the-destination}

Observability Pipelines 대상은 이벤트를 다운스트림 통합으로 전송하기 전에 배치 처리합니다. 예를 들어 Amazon S3, Google Cloud Storage 및 Azure Storage 대상은 배치 시간 초과가 900초로 설정되어 있습니다. 다른 배치 파라미터(최대 이벤트 수 및 최대 바이트 수)가 900초 이내에 충족되지 않으면 900초 시점에 배치가 플러시됩니다. 즉, 대상 구성 요소가 이벤트 배치를 다운스트림 통합으로 전송하는 데 최대 15분이 걸릴 수 있습니다.

각 대상의 배치 파라미터는 다음과 같습니다.

{{% observability_pipelines/destination_batching %}}

자세한 내용은 [이벤트 배치 처리][6]를 참조하세요.

## 구성 요소 문제 {#component-issues}

### 할당량 상태 동기화 실패 오류 {#failed-to-sync-quota-state-error}

Quota 프로세서는 Datadog 조직 내의 모든 Worker 간에 동기화됩니다. 이 동기화에는 조직당 기본적으로 최대 50개의 Worker 제한이 있습니다. 조직의 Worker 수가 50개를 초과하는 경우:
- 프로세서는 계속 실행되지만 다른 Worker와 올바르게 동기화되지 않아 할당량 한도에 도달한 이후에도 로그가 전송될 수 있습니다.
- Worker는 `Failed to sync quota state errors`를 출력합니다.
- 조직당 기본 Worker 수를 늘리려면 [지원팀에 문의][20]하세요.

###  타임스탬프 필드 변환 오류 {#error-converting-timestamp-field}

Databricks(Zerobus) 대상을 사용하는 중 아래와 유사한 Worker 오류가 표시되면 로그의 타임스탬프가 문자열 형식인지 확인합니다.

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

로그 타임스탬프가 문자열 형식이고 Databricks 표의 타임스탬프 열이 `TIMESTAMP` 형식으로 선언되어 있다면 문자열 타임스탬프를 타임스탬프 형식으로 변환해야 합니다. 자세한 내용은 [문자열 타임스탬프를 타임스탬프 형식으로 변환][22]을 참조하세요.

[1]: /ko/help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/logs/explorer/search_syntax/
[4]: /ko/observability_pipelines/configuration/set_up_pipelines/#set-up-a-pipeline
[5]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[6]: /ko/observability_pipelines/destinations/#event-batching-intro
[7]: https://app.datadoghq.com/logs/
[8]: /ko/containers/docker/log/?tab=containerinstallation#linux
[9]: /ko/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[10]: /ko/observability_pipelines/configuration/install_the_worker/#index-your-worker-logs
[11]: /ko/observability_pipelines/install_the_worker#uninstall-the-worker
[12]: https://app.datadoghq.com/logs
[13]: /ko/observability_pipelines/configuration/install_the_worker/worker_commands/
[14]: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/security_guide/sec-port_forwarding#sec-Adding_a_Port_to_Redirect
[15]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#enable-the-health-check-endpoint-and-the-liveness-and-readiness-probes
[16]: /ko/observability_pipelines/sources/#tls-certificates
[17]: https://app.datadoghq.com/organization-settings/remote-config/setup
[18]: /ko/observability_pipelines/guide/environment_variables/
[19]: /ko/remote_configuration/#security-considerations
[20]: /ko/help/
[21]: /ko/observability_pipelines/configuration/install_the_worker/#add-domains-to-firewall-allowlist
[22]: /ko/observability_pipelines/destinations/databricks#convert-string-timestamps-to-timestamp-format
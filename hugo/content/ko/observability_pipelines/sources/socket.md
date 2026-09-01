---
description: Observability Pipelines Worker를 사용하여 TCP 또는 UDP 소켓 연결을 통해 전송된 로그를 수집하는
  방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: 소켓 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 소켓 소스를 사용하여 소켓 연결(TCP 또는 UDP)을 통해 Worker로 로그를 전송하세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/socket %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: 소켓 주소의 식별자와 해당하는 경우 TLS 키 암호만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][3], [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

**참고**: Worker는 TCP 또는 UDP를 통해서만 로그를 수신할 수 있습니다. 애플리케이션이 UNIX 도메인 소켓에 쓰는 경우 자세한 내용은 [UNIX 도메인 소켓](#unix-domain-sockets)을 참조하세요.

파이프라인 UI에서 소켓 소스를 선택한 후:

1.  소켓 주소에 대한 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1.  {{< ui >}}Mode{{< /ui >}} 드롭다운 메뉴에서 사용할 소켓 유형을 선택하세요.
1.  {{< ui >}}Framing{{< /ui >}} 드롭다운 메뉴에서 이벤트 스트림을 구분할 방법을 선택하세요.
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>프레이밍 방식</th>
                <th>설명</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>바이트 프레임은 줄 바꿈 문자로 구분됩니다.</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>바이트 프레임은 기본 I/O 경계에 따라 그대로 전달됩니다(예: 메시지 또는 스트림 세그먼트 간 분할).</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>바이트 프레임은 선택한 문자로 구분됩니다.</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>바이트 프레임은 청크된 GELF 메시지입니다.</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>바이트 프레임은 옥텟 계산 형식에 따라 구분됩니다.</td>
        </tr>
    </table>

{{% observability_pipelines/secrets_env_var_note %}}

### 선택 사항 TLS 설정 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## UNIX 도메인 소켓 {#unix-domain-sockets}

소켓 소스는 TCP 또는 UDP를 통한 로그 수신만 지원합니다. 애플리케이션이 UNIX 도메인 소켓에 쓰는 경우 `socat`을 사용하여 이를 TCP 또는 UDP 소켓으로 브리지하고 Worker로 로그를 전송하세요.

### 독립형 브리지 {#standalone-bridge}

UNIX 소켓에서 Worker로 전달하려면 애플리케이션과 함께 `socat`을 실행하세요.

```
socat UNIX-RECV:/var/run/app.sock TCP:<OPW_HOST>
```

<OPW_HOST>를 Observability Pipelines Worker와 연결된 호스트 IP 주소 또는 로드 밸런서 URL로 바꾸세요.

### Kubernetes 사이드카 {#kubernetes-sidecar}

Kubernetes에서 Observability Pipelines Worker는 일반적으로 서비스 뒤의 StatefulSet으로 실행되므로 `localhost`를 통해 연결할 수 없습니다. 애플리케이션과 동일한 포드에서 사이드카 컨테이너로 `socat`을 실행하고 소켓 파일을 위한 볼륨을 공유하세요. 예:

```yaml
volumes:
  - name: app-socket
    emptyDir: {}

initContainers:
  # Remove any stale socket file before the sidecar starts
  - name: socket-cleanup
    image: busybox:1.36
    command: ["sh", "-c", "rm -f /var/run/app/app.sock"]
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

containers:
  # Your application container
  - name: app
    # ...
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

  # socat sidecar: bridges the UNIX socket to the Worker's Service
  - name: socat-opw-bridge
    image: alpine/socat:1.8.0.0
    args:
      - UNIX-RECV:/var/run/app/app.sock,fork
      - TCP:<RELEASE_NAME>-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:5000
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

# Monitor and adjust resources as necessary
    resources:
      requests:
        cpu: 10m
        memory: 16Mi
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
```

`TCP` 인수가 `localhost` 대신 Observability Pipelines Worker의 Kubernetes 서비스 엔드포인트를 가리키도록 설정하세요. Observability Pipelines Worker의 StatefulSet 포드가 모든 노드에서 실행된다는 보장이 없으므로 `localhost`에서 Observability Pipelines Worker 포드에 연결하지 못할 수 있습니다. Observability Pipelines Worker와 워크로드에 대해 전용 노드 그룹이 있는 경우 특히 그렇습니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- 소켓 주소 식별자:
	- Observability Pipelines Worker가 수신 로그를 받기 위해 수신 대기하는 주소와 포트를 참조합니다.
	- 기본 식별자는 `SOURCE_SOCKET_ADDRESS`입니다.
- 소켓 TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_SOCKET_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
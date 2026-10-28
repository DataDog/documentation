---
description: Kafka 소스를 사용하여 Azure Event Hubs 로그를 Observability Pipelines로 보내는 방법을
  알아보세요.
disable_toc: false
title: Azure Event Hubs 로그를 Observability Pipelines로 보내기
---
## 개요 {#overview}

이 문서는 Kafka 소스를 사용하여 Azure Event Hubs 로그를 Observability Pipelines로 보내는 방법을 단계별로 설명합니다. 설정 단계에는 Kafka 소스를 위한 Azure Event Hubs 설정이 포함됩니다.

- [이벤트 허브 네임스페이스 생성](#create-an-azure-event-hubs-namespace)
- [이벤트 허브(Kafka 토픽) 생성](#create-an-event-hub-kafka-topic)
- [공유된 액세스 정책 설정](#configure-shared-access-policy)
- [진단 설정 생성](#set-up-diagnostic-settings)
- [이벤트 허브에 대한 Kafka 호환 연결 구성](#configure-kafka-compatible-connection-for-the-event-hub)

Azure Event Hubs가 설정된 후, [Kafka 소스로 파이프라인을 설정](#set-up-a-pipeline-with-the-kafka-source)하여 Azure Event Hubs 로그를 Observability Pipelines로 보냅니다.

## Kafka 소스를 위한 Azure Event Hubs 설정 {#set-up-azure-event-hubs-for-the-kafka-source}

### Azure 이벤트 허브 네임스페이스 생성 {#create-an-azure-event-hubs-namespace}

1. Azure 포털에서 [Event Hubs](https://portal.azure.com/#browse/Microsoft.EventHub%2Fnamespaces)로 이동합니다.
1. **Create**를 클릭합니다.
1. **프로젝트 세부 정보**(구독, 리소스 그룹) 및 **인스턴스 세부 정보**(네임스페이스 이름, 지역, Standard, Premium 또는 Dedicated 계층 선택)를 입력합니다.
1. 지역이 Azure 리소스와 일치하는지 확인합니다(예: `westus`).
1. **Review + create**를 클릭합니다.

**참고**: Kafka 엔드포인트는 Standard 이상의 계층에서 자동으로 활성화됩니다.

### 이벤트 허브(Kafka 토픽) 생성 {#create-an-event-hub-kafka-topic}

1. 생성한 네임스페이스에서 **Event Hubs**를 선택하고 **+ Event Hub**를 클릭합니다.
1. 이름을 입력하고(예: `datadog-topic`) 설정을 구성합니다(예: 파티션 4개 및 보존 기간 7일).
1. **Review + create**를 클릭합니다. 이 이벤트 허브는 Kafka 토픽 역할을 합니다.

### 공유된 액세스 정책 설정 {#configure-shared-access-policy}

1. 생성한 이벤트 허브에서 **Settings** > **Shared access policies**로 이동합니다.
1. **+ Add**를 클릭합니다.
1. 정책 이름을 입력합니다(예: `DatadogKafkaPolicy`).
1. **Manage** 확인란을 선택하면 **Send** 및 **Listen** 확인란이 자동으로 선택됩니다.
1. **Create**를 클릭합니다.
1. Observability Pipeline의 Kafka 소스를 설정할 때 Kafka 인증을 위해 **기본 키** 및 **기본 연결 문자열**이 필요합니다.

### 진단 설정 생성 {#set-up-diagnostic-settings}

1. Azure 리소스(예: VM, App Services) 또는 구독 수준 활동 로그를 구성하여 로그를 이벤트 허브로 스트리밍합니다.
1. 리소스의 경우:
    1. 리소스 탐색 후 **Monitoring** > **Diagnostic settings**로 이동합니다.
    1. **+ Add diagnostic setting**을 클릭합니다.
    1. 원하는 로그 범주를 선택합니다(예: Microsoft Entra ID의 경우 AuditLogs, SignInLogs).
    1. **Destination details**:
        1. **Stream to an event hub** 확인란을 선택합니다.
        1. 네임스페이스 및 이벤트 허브(`datadog-topic`)를 선택합니다.
    1. **Save**를 클릭합니다.
1. 활동 로그의 경우:
    1. **Microsoft Entra ID** > **Monitoring** > **Audit logs** > **Export Data Settings**로 이동합니다.
    1. **Stream to the Event Hub** 확인란을 선택합니다.
1. 각 리전에 대해 반복합니다. 로그는 동일한 리전의 이벤트 허브로 스트리밍되어야 합니다.

### 이벤트 허브에 대한 Kafka 호환 연결 구성 {#configure-kafka-compatible-connection-for-the-event-hub}

Azure Event Hubs는 `NAMESPACE.servicebus.windows.net:9093`에서 Kafka 엔드포인트를 노출하며, Observability Pipelines는 이를 Kafka 소스로 사용합니다.

#### Kafka 엔드포인트 가져오기 {#get-the-kafka-endpoint}

1. Azure 포털에서 이벤트 허브 네임스페이스(예: `myeventhubns`)로 이동합니다.
1. **Overview** 페이지의 **Essentials** 섹션에서 **Host name** 또는 **Fully Qualified Domain Name(FQDN)**을 찾습니다. 형식은 `<NAMESPACE>.servicebus.windows.net`입니다(예: `myeventhubns.servicebus.windows.net`).
1. Kafka 포트 `:9093`을 추가하여 부트스트랩 서버 값을 형성합니다(`<NAMESPACE>.servicebus.windows.net:9093`).
    - 예를 들어, 네임스페이스가 `myeventhubns`인 경우 부트스트랩 서버는 `myeventhubns.servicebus.windows.net:9093`입니다.
    - Observability Pipelines Kafka 소스 설정 시 이 정보가 필요합니다.

#### 인증을 설정합니다({#set-up-authentication}).

1. Azure Event Hubs는 Kafka 인증을 위해 SASL_SSL(PLAIN 메커니즘 사용)을 사용합니다.
1. 연결 문자열은 Observability Pipelines용으로 다음과 같은 형식입니다.
    ```
    Username: $$ConnectionString
    Password: Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>
    ```

## Kafka 소스로 파이프라인을 설정합니다({#set-up-a-pipeline-with-the-kafka-source}).

플랫폼을 선택합니다.

{{< tabs >}}
{{% tab "Kubernetes" %}}
1. [Observability Pipelines](https://app.datadoghq.com/observability-pipelines)로 이동합니다.
1. Kafka 소스를 선택합니다.
    1.  {{< ui >}}Group ID{{< /ui >}} 필드에 고유한 소비자 그룹을 지정하거나 생성합니다(예: `datadog-consumer-group`).
    1.  {{< ui >}}Topics{{< /ui >}} 필드에 `datadog-topic` 또는 이전에 이벤트 허브에 대해 구성한 토픽을 입력합니다.
    1.  스위치를 전환하여 SASL 인증을 활성화합니다.
    1.  {{< ui >}}Mechanism{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}PLAIN{{< /ui >}}을 선택합니다.
    1.  TLS를 활성화합니다.
        1. 컨테이너 이미지의 일부로 작동하는 인증서를 사용하도록 `values.yaml` 파일을 구성합니다.
            ```
            initContainers:
            - name: copy-config
            image: gcr.io/datadoghq/observability-pipelines-worker:latest
            imagePullPolicy: IfNotPresent
            command: ['/bin/sh', '-c', 'mkdir -p /config-volume/observability-pipelines-worker/config/ && cp /etc/ssl/certs/ca-certificates.crt /config-volume/observability-pipelines-worker/config/ca-certificates.crt']
            volumeMounts:
            - name: config-volume
                mountPath: /config-volume
            extraVolumes:
            - name: config-volume
            emptyDir: {}
            extraVolumeMounts:
            - name: config-volume
            mountPath: /config-volume
            ```
            **Note**: When install the Worker with the install command you need to add:
            ```
            --set env[0].name=DD_OP_DATA_DIR,env[0].value='/config-volume/observability-pipelines-worker/'
            ```
        1. In the {{< ui >}}Certificate path{{< /ui >}} 필드에 위 예제를 사용한 경우 `/ca-certificates.crt`를 입력합니다. 그렇지 않으면 인증서 이름을 입력합니다.
    {{< img src="observability_pipelines/sources/kafka_settings.png" alt="예제 값이 포함된 Kafka 소스 설정" style="width:45%;" >}}
1. {{< ui >}}Next: Select Destination{{< /ui >}}을 클릭합니다.
1. 대상 및 프로세서를 설정한 후 {{< ui >}}Next: Install{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Choose your installation platform{{< /ui >}} 드롭다운 메뉴에서 플랫폼을 선택합니다.
1. Kafka 소스에 대한 환경 변수를 입력합니다.
    1.  {{< ui >}}Kafka Bootstrap Servers{{< /ui >}}의 경우 `<NAMESPACE>.servicebus.windows.net:9093`을 입력합니다(예: `myeventhubns.servicebus.windows.net:9093`).
    1.  {{< ui >}}Kafka SASL Username{{< /ui >}}의 경우 `$$$$ConnectionString`을 입력합니다. **참고**: `$$$$`가 환경으로 변환될 때 `$$`가 되므로 `ConnectionString` 앞에 `$$$$`가 있어야 합니다.
    1.  {{< ui >}}Kafka SASL Password{{< /ui >}}의 경우 전체 연결 문자열을 입력합니다. 예를 들어, `Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>`입니다.
        - 이는 Event Hub 인스턴스 [공유 액세스 정책](#configure-shared-access-policy)에 있는 **기본 연결 문자열**입니다.
    1. Kafka TLS 암호를 입력합니다.
        - 이는 Event Hub 인스턴스의 [공유 액세스 정책](#configure-shared-access-policy)에 있는 **기본 키**입니다.
    {{< img src="observability_pipelines/sources/kafka_env_vars.png" alt="Kafka 환경 변수에 대한 예제 값이 포함된 설치 페이지" style="width:60%;" >}}
1. 해당하는 경우 대상에 대한 환경 변수를 입력합니다.
1. 페이지의 나머지 지침에 따라 플랫폼에 맞게 Worker를 설치합니다.
{{% /tab %}}
{{% tab "가상 머신(VM)" %}}

1. [Observability Pipelines](https://app.datadoghq.com/observability-pipelines)로 이동합니다.
1. Kafka 소스를 선택합니다.
    1.  {{< ui >}}Group ID{{< /ui >}} 필드에 고유한 소비자 그룹을 지정하거나 생성합니다(예: `datadog-consumer-group`).
    1.  `datadog-topic`을 {{< ui >}}Topics{{< /ui >}} 필드에 입력합니다.
    1.  스위치를 전환하여 SASL 인증을 활성화합니다.
    1.  {{< ui >}}Mechanism{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}PLAIN{{< /ui >}}을 선택합니다.
    1.  TLS를 활성화합니다. 인증서의 경우, 원래 위치에서 기본 Observability Pipelines 데이터 구성 디렉터리로 인증서를 복사합니다.
        1. Observability Pipelines Worker가 아직 설치되지 않았으므로, 이 명령을 실행하여 인증서용 디렉터리를 생성합니다.
            ```
            sudo mkdir -p /var/lib/observability-pipelines-worker/config
            ```
        1. Run this command to copy the certificate to the directory you created:
            ```
            sudo cp /etc/ssl/certs/ca-certificates.crt /var/lib/observability-pipelines-worker/config/
            ```
        1. In the {{< ui >}}Certificate path{{< /ui >}} f필드에 `/ca-certificates.crt`를 입력합니다.
    {{< img src="observability_pipelines/sources/kafka_settings_vm.png" alt="예제 값이 포함된 Kafka 소스 설정" style="width:45%;" >}}
1. {{< ui >}}Next: Select Destination{{< /ui >}}을 클릭합니다.
1. 대상 및 프로세서를 설정한 후 {{< ui >}}Next: Install{{< /ui >}}을 클릭합니다.
1. {{< ui >}}Choose your installation platform{{< /ui >}} 드롭다운 메뉴에서 플랫폼을 선택합니다.
1. Kafka 소스에 대한 환경 변수를 입력합니다.
    1.  {{< ui >}}Kafka Bootstrap Servers{{< /ui >}}의 경우 `<NAMESPACE>.servicebus.windows.net:9093`을 입력합니다(예: `myeventhubns.servicebus.windows.net:9093`).
    1.  {{< ui >}}Kafka SASL Username{{< /ui >}}의 경우 `\$\$ConnectionString`을 입력합니다. **참고**: `$` 앞의 `ConnectionString`을 이스케이프 처리해야 합니다. 그렇지 않으면 환경 변수가 로드되지 않습니다.
    1.  {{< ui >}}Kafka SASL Password{{< /ui >}}의 경우, 따옴표(`"`)로 묶인 전체 연결 문자열을 입력하세요 예를 들어, `"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`입니다.
        - 이는 Event Hub 인스턴스 [공유 액세스 정책](#configure-shared-access-policy)에 있는 **기본 연결 문자열**입니다.
    1. Kafka TLS 암호를 입력합니다.
        - 이는 Event Hub 인스턴스의 [공유 액세스 정책](#configure-shared-access-policy)에 있는 **기본 키**입니다.
    {{< img src="observability_pipelines/sources/kafka_env_vars_vm.png" alt="Kafka 환경 변수에 대한 예제 값이 포함된 설치 페이지" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

## 문제 해결 {#troubleshooting}

Worker를 설치한 후 문제가 발생하면 Observability Pipelines 환경 파일(`/etc/default/observability-pipelines-worker`)을 확인하여 환경 변수가 올바르게 설정되었는지 확인하세요.

- `DD_OP_SOURCE_KAFKA_SASL_USERNAME="$$ConnectionString"`
- `DD_OP_SOURCE_KAFKA_BOOTSTRAP_SERVERS=<NAMESPACE>.servicebus.windows.net:9093`
- `DD_OP_SOURCE_KAFKA_SASL_PASSWORD=<Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>>`
- `DD_OP_SOURCE_KAFKA_KEY_PASS=password`

### 환경 변수 누락 {#missing-environment-variable}

`Missing environment variable DD_OP_SOURCE_KAFKA_SASL_PASSWORD` 오류가 발생하고 VM에서 Worker를 실행 중인 경우, Worker 설치 스크립트를 실행할 때 변수가 따옴표(`"`)로 묶여 있는지 확인하세요. 예:

```
DD_OP_SOURCE_KAFKA_SASL_PASSWORD=`"Endpoint=sb://<NAMESPACE>.servicebus.windows.net/;SharedAccessKeyName=<PolicyName>;SharedAccessKey=<Key>"`
```

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][1] 및 [소스 버퍼 메트릭][2]은 [파이프라인 사용량 메트릭][3] 설명서를 참조하세요. Kafka 소스를 사용하여 Azure Event Hubs에서 Observability Pipelines로 로그를 전송하므로, `component_type:kafka` 태그를 사용하여 관련 메트릭을 필터링하세요.

[1]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
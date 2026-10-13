---
aliases:
- /ko/observability_pipelines/sources/prometheus
description: Observability Pipelines Worker에서 사용할 수 있는 소스에 대해 알아봅니다.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: 설명서
  text: Pipelines 설정하기
- link: /observability_pipelines/processors/
  tag: 설명서
  text: 파이프라인용 프로세서
- link: /observability_pipelines/destinations/
  tag: 설명서
  text: Observability Pipelines 대상
title: 소스
---
## 개요 {#overview}

Observability Pipelines의 소스를 사용하여 다양한 데이터 소스에서 로그 또는 메트릭을 수신하세요. 소스마다 필요한 전제 조건과 설정이 다릅니다. 일부 소스는 Observability Pipelines Worker로 데이터를 보내도록 구성해야 하기도 합니다.

왼쪽 탐색 메뉴에서 소스를 선택하면 해당 소스에 대한 자세한 정보를 확인할 수 있습니다.

## 소스 {#sources}

사용 가능한 소스는 다음과 같습니다.

{{< tabs >}}
{{% tab "로그" %}}

- [Akamai DataStream][1]
- [Amazon Data Firehose][2]
- [Amazon S3][3]
- [Azure Event Hubs][4]
- [Cloudflare Logpush][5]
- [Datadog Agent][6]
- [Filebeat][7]
- [Fluentd 및 Fluent Bit][8]
- [Google Pub/Sub][9]
- [HTTP 클라이언트][10]
- [HTTP 서버][11]
- [Kafka][12]
- [Lambda Extension][13]
- [Lambda Forwarder][14]
- [Logstash][15]
- [MySQL][16]
- [Okta][17]
- [OpenTelemetry][18]
- [Socket][19]
- [Splunk HTTP Event Collector(HEC)][20]
- [Splunk Heavy 또는 Universal Forwarders(TCP)][21]
- [Sumo Logic Hosted Collector][22]
- [Syslog][23]
- [WebSocket][24]

[1]: /ko/observability_pipelines/sources/akamai_datastream/
[2]: /ko/observability_pipelines/sources/amazon_data_firehose/
[3]: /ko/observability_pipelines/sources/amazon_s3/
[4]: /ko/observability_pipelines/sources/azure_event_hubs/
[5]: /ko/observability_pipelines/sources/cloudflare_logpush/
[6]: /ko/observability_pipelines/sources/datadog_agent/
[7]: /ko/observability_pipelines/sources/filebeat/
[8]: /ko/observability_pipelines/sources/fluent/
[9]: /ko/observability_pipelines/sources/google_pubsub/
[10]: /ko/observability_pipelines/sources/http_client/
[11]: /ko/observability_pipelines/sources/http_server/
[12]: /ko/observability_pipelines/sources/kafka/
[13]: /ko/observability_pipelines/sources/lambda_extension/
[14]: /ko/observability_pipelines/sources/lambda_forwarder/
[15]: /ko/observability_pipelines/sources/logstash/
[16]: /ko/observability_pipelines/sources/mysql/
[17]: /ko/observability_pipelines/sources/okta/
[18]: /ko/observability_pipelines/sources/opentelemetry/
[19]: /ko/observability_pipelines/sources/socket/
[20]: /ko/observability_pipelines/sources/splunk_hec/
[21]: /ko/observability_pipelines/sources/splunk_tcp/
[22]: /ko/observability_pipelines/sources/sumo_logic/
[23]: /ko/observability_pipelines/sources/syslog/
[24]: /ko/observability_pipelines/sources/websocket/

{{% /tab %}}
{{% tab "메트릭" %}}

- [Datadog Agent][1]
- [OpenTelemetry][2]

[1]: /ko/observability_pipelines/sources/datadog_agent/
[2]: /ko/observability_pipelines/sources/opentelemetry/

{{% /tab %}}
{{< /tabs >}}

## 표준 메타데이터 필드 {#standard-metadata-fields}

모든 소스는 수집된 이벤트에 다음 표준 메타데이터 필드를 추가합니다.

| 필드 이름     | 값 유형     | 예시                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | 문자열         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | 문자열         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | 문자열         | `"splunk_tcp"`               |

예를 들어, 원시 이벤트가 다음과 같은 경우:

```
{
  "foo": "bar"
}
```

표준 메타데이터 필드로 보강된 이벤트는 다음과 같습니다.

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

[`tap` 명령][2]을 사용해 소스를 통해 전송된 이벤트를 확인할 때 이러한 표준 메타데이터 필드를 확인할 수 있습니다.

소스가 이벤트를 수집한 이후, 이벤트는 다양한 프로레서 및 대상으로 전송되며 이에 따라 해당 필드가 업데이트될 수 있습니다. 예를 들어 이벤트가 Datadog Logs 대상으로 전송되면 타임스탬프 필드가 UNIX 형식으로 변환됩니다.

**참고**: UI의 `bytes in per second` 메트릭은 보강된 이벤트가 아닌 수집된 원시 이벤트에 대한 것입니다.

## TLS 인증서 {#tls-certificates}

Observability Pipelines에서 TLS를 활성화하여 전송 중에 데이터를 암호화하세요. 이렇게 하면 공격자가 데이터를 변조하지 못하도록 방지할 수 있습니다.

Observability Pipelines는 자체 서명된 인증서를 기본적으로 허용하지 않습니다. 이러한 인증서는 안전한 신뢰 검증을 제공하지 않고, 환경을 MITM(man-in-the-middle) 공격에 노출할 가능성이 있기 때문입니다.

인증서가 자체 서명되었는지 확인하려면 다음 명령을 실행하세요.

```
openssl verify -CAfile certificate.pem certificate.pem
```

인증서가 자체 서명되었고 자신을 기준으로 인증하는 경우 출력이 다음과 같습니다.

```
certificate.pem: OK
```

그렇지 않으면 `unable to get local issuer certificate` 오류가 표시됩니다.

Datadog은 자체 서명된 인증서를 사용하는 대신 다음과 같은 방안을 권장합니다.

1. 인증 기관(CA)이 서명한 인증서를 사용합니다.
2. CA 서명 인증서를 사용할 수 없는 경우 [Let's Encrypt][3]의 인증서를 사용합니다.

위의 접근 방식을 사용할 수 없어 자체 서명된 인증서를 사용해야만 하는 경우, Observability Pipelines Worker 호스트에서 자체 서명된 인증서를 신뢰하도록 환경을 구성할 수 있습니다.

<div class="alert alert-warning">Datadog은 자체 서명된 인증서를 권장하지 않습니다. 자체 서명된 인증서는 보안이 약하고 프로덕션 또는 인터넷에 연결된 사용에 적합하지 않습니다. 자체 서명된 인증서를 사용해야만 하는 경우, 내부 테스트용으로만 사용을 제한하세요.</a></div>

Worker 호스트가 자체 서명된 인증서를 신뢰하도록 설정하는 방법:

- Linux 호스트의 경우, 인증서를 OS 신뢰 저장소에 설치합니다.
- Kubernetes의 경우, 다음 중 하나 선택:
    - 인증서를 포함하는 사용자 지정 컨테이너 이미지를 빌드합니다.
    - 인증서를 마운트하고 컨테이너의 신뢰 저장소를 수동으로 업데이트합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/
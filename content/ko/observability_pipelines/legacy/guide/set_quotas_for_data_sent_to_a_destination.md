---
aliases:
- /ko/observability_pipelines/guide/set_quotas_for_data_sent_to_a_destination/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: 설명서
  text: Observability Pipelines 설정
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: 관측성 파이프라인에서 데이터 작업하기
- link: /monitors/configuration/
  tag: 설명서
  text: 모니터 설정에 관해 자세히 알아보기
is_beta: true
private: true
title: (레거시) 대상으로 전송되는 데이터의 할당량 설정
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
<code>Quota</code> 변환은 프라이빗 베타 버전입니다.
{{< /callout >}}

## 개요

Observability Pipelines `quota` 변환으로 특정 기간에 대상에 전송되는 데이터의 볼륨 또는 이벤트 수를 제한합니다. 이러한 방식으로 운영 비용에 영향을 미칠 수 있는 예상치 못한 데이터 급증을 방지할 수 있습니다. 또 이 도구를 사용해 할당량에 도달했을 때 데이터를 처리하는 여러 방법을 설정할 수 있습니다. 예를 들어, 다음과 같은 방법이 있습니다.

- 할당량에 도달하면 알림을 전송하는 모니터를 설정해 소프트 한도를 지정합니다.
- 할당량 한도 도달 이후 전송된 데이터를 콜드 스토리지와 등의 다른 대상으로 다시 라우팅합니다.
- 할당량 한도 도달 이후에 전송되는 데이터를 샘플링하여 대상에 전송되는 데이터가 줄어들도록 합니다.
- 할당량 한도를 초과한 후 전송된 데이터를 삭제합니다.

아울러, 다중 `quota` 변환으로 다양한 경고 및 알림 한도를 설정할 수도 있습니다. 예를 들어, 첫 번째 `quota` 변환으로 경고 수준 한도를 설정하고, 해당 한도에 도달하면 경고 알림을 보냅니다. 그런 다음 두 번째 `quota` 변환으로 하드 한도를 설정합니다. 하드 한도에 도달하면 경고 알림을 보내고 한도 도달 이후 전송된 데이터 샘플링을 시작하거나 해당 데이터를 다른 대상으로 다시 라우팅할 수 있습니다.

본 지침에서는 다음 사항을 설명합니다.

- [할당량 변환 설정하기](#set-up-the-quota-transform)
- [할당량에 도달했을 때 알려주는 모니터링 설정하기](#set-up-a-metric-monitor)
- [한도 도달 후에 전송된 로그 `datadog_archives`로 라우팅하기](#route-logs-sent-after-the-limit-to-datadog_archives)

## 할당량 변환 설정하기

1. [Observability Pipelines][1]로 이동합니다.
1. 파이프라인을 클릭합니다.
1. **Edit draft**를 클릭합니다.
1. **+ Add Component**를 클릭합니다.
1. **Transforms** 탭을 클릭합니다.
1. **Quota** 타일을 클릭합니다.
1. 컴포넌트의 이름을 입력합니다.
1. 변환의 입력값을 하나 이상 선택합니다.
1. **Limits** 섹션에서 다음을 실행합니다.
    a. 유닛 유형을 선택합니다. 할당량 한도 유닛은 이벤트 수 또는 데이터 볼륨 중 하나를 선택할 수 있습니다.
    b. **Max** 필드에 한도를 입력합니다.
1. **Window** 필드에 기간을 입력합니다.  
    예를 들어, 하루 최대 2GB의 로그를 대상에게 전송하도록 변환을 설정하려면 다음과 같이 설정합니다.
    - 유닛 유형: **Bytes**
    - **Max** 필드: `2000000000`
    - **Window** 필드: `24h`

1. **저장**을 클릭합니다.
1. `quota` 변환으로부터 로그를 수집하는 각 대상 또는 변환의 경우 구성 요소 타일을 클릭하고 한도에 도달한 후 전송된 데이터의 입력 ID에 `<transform_name>.dropped`를 추가합니다. 

### 한도 도달 이후 전송된 데이터 처리

다음 예시는 `quota` 변환을 사용한 설정입니다. 이 설정에서 할당량 한도 도달 이후 전송된 데이터는 `print_dropped` 대상으로 이동하여 콘솔에 출력된 후 삭제됩니다. 해당 데이터를 [샘플][2]로 추출하거나 삭제하는 대신 다른 [대상][3]으로 다시 라우팅할 수도 있습니다.

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # Parse the message as syslog
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 20000
   window:
     1h
sinks:
 print_syslog:
   type: console
   inputs:
     - quota_1
   encoding:
     codec: json
  print_dropped:
    type: console
    inputs:
      - quota_example.dropped
    encoding:
      codec: json

```

본 예시의 소스, 변환, 싱크에 관한 자세한 내용은 [설정][4]을 참조하세요.

## 할당량에 도달하면 알려주는 모니터 설정하기

### Quota 메트릭

다음 `quota` 변환 메트릭으로 모니터링을 설정할 수 있습니다.

- `quota_limit_events`(게이지)
- `quota_limit_bytes`(게이지)
- `component_errors_total`(카운터)

이전 [예시 설정](#handling-data-sent-after-the-limit)의 경우, 다음 메트릭 및 태그를 조합하여 한도 도달 이후 전송되어 삭제된 모든 이벤트를 찾을 수 있습니다.

- 메트릭: `vector.component_sent_event_bytes_total`
    - 태그: `component_id:quota_example` 및 `output:dropped`

설정에 `event` 유형이 지정되어 있는 경우 다음 메트릭과 태그 조합으로 한도 도달 이후 전송된 모든 이벤트를 표시합니다.

- 메트릭: `vector.component_sent_events_total`
    - 태그: `component_id:quota_example` 및 `output:dropped`

### 메트릭 모니터 설정하기

다음에 따라 할당량에 도달하면 알림을 보내는 모니터를 설정합니다.

1. [New Monitor][5] 페이지로 이동합니다.
1. **Metric**을 선택합니다.
1. 탐지 방법을 **Threshold Alert** 그대로 둡니다.
1. **Define the metric** 필드에서 다음을 실행합니다.
    a. 메트릭에 `vector.component_sent_event_bytes_total`을 입력합니다.
    b. **from** 필드에`component_id:<transform_name>,output:dropped`을 추가합니다. `<transform_name>`은 `quota` 변환의 이름입니다. 
    c. **sum by** 필드에 `host`를 입력합니다.  
    d. `last 5 minutes`의 동안 쿼리 `sum`를 평가하도록 설정을 그대로 둡니다.
1. **Set alert conditions** 섹션에서 다음을 실행합니다.  
    a. 평가값이 `host` 임계값의 `above`일 때 트리거되도록 설정을 그대로 둡니다.
    b. **Alert threshold**에 `1`을 입력합니다. 즉, 메트릭 쿼리가 1보다 크면 모니터 알림이 전송됩니다.
자세한 정보는 [메트릭 모니터][6]를 참고하세요.
1. **Configure notifications and automations** 섹션에서 다음을 실행합니다.
    a. 모니터링의 이름을 입력합니다.  
    b. 알림 메시지를 입력합니다. 메시지 사용자 지정에 관한 자세한 내용은 [알림][7] 및 [변수][8]를 참고하세요.
    c. 알림을 전송할 대상과 서비스를 선택합니다.
1. 옵션으로 모니터링의 [다시 알림][9], 태그, 팀, [우선순위][10]를 설정할 수 있습니다.
1. **Define permissions and audit notifications** 섹션에서 [권한][11]을 정의하고 알림을 감사할 수 있습니다.
1. **Create**를 클릭합니다.

## 한도 도달 이후 전송된 로그를 `datadog_archives`로 라우팅하기

Observability Pipelines `datadog_archives` 대상은 로그를 Datadog-rehydratable 형식으로 포맷한 다음 [로그 아카이브][12]로 라우팅합니다. `datadog_archives`를 설정하려면 [로그를 Datadog-rehydratable 형식으로 Amazon S3로 라우팅][13]을 참고하세요.

아래의 설정 예시는 대상 유형이 `datadog_archives`이라는 점만 제외하면 이전 [예제 설정](#handling-data-sent-after-the-limit)과 유사합니다. 할당량에 도달한 후 Observability Pipelines로 전송된 모든 로그는 아카이브로 라우팅됩니다.

```yaml
sources:
 generate_syslog:
   type: demo_logs
   format: syslog
   interval: 1
transforms:
 parse_syslog:
   type: remap
   inputs:
     - generate_syslog
   source: |
     # Parse the message as syslog
     . = parse_syslog!(.message)
     .environment = "demo"
     .application = "opw"
 quota_archiving_example:
   type:
     quota
   inputs:
     - parse_syslog
   limit:
     type: bytes
     bytes:
       max: 200000
   window:
     1m
sinks:
 archive_dropped:
   type: datadog_archives
   inputs:
     - quota_archiving_example.dropped
    bucket: "<DD_ARCHIVES_BUCKET>"
    service: "<STORAGE_SERVICE>"
```

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/legacy/reference/transforms/#sample
[3]: /ko/observability_pipelines/legacy/reference/sinks/
[4]: /ko/observability_pipelines/legacy/configurations/
[5]: https://app.datadoghq.com/monitors/create
[6]: /ko/monitors/types/metric/
[7]: /ko/monitors/notify/
[8]: /ko/monitors/notify/variables/
[9]: /ko/monitors/notify/#renotify
[10]: /ko/monitors/notify/#metadata
[11]: /ko/monitors/configuration/#permissions
[12]: /ko/logs/log_configuration/archives/
[13]: /ko/observability_pipelines/legacy/guide/route_logs_in_datadog_rehydratable_format_to_amazon_s3/
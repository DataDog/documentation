---
app_id: bonsai
categories:
- 메트릭
custom_kind: 통합
description: Bonsai Managed Elasticsearch
integration_version: 1.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
title: Bonsai
---
## 개요

Bonsai 클러스터의 요청 수준 메트릭을 추적하면 다음을 할 수 있습니다.

- 클러스터의 성능 가시화
- 검색 성능과 애플리케이션 성능 간의 상관 관계 수립
- 알림 생성

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png)

## 설정

클러스터를 Datadog와 통합하려면 Bonsai 앱에 API 키를 제공해야 합니다.

### API 키 얻기

In Datadog, navigate to [Integrations --> API](https://app.datadoghq.com/organization-settings/api-keys) and copy your API Key.

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png)

### API 키 제공

Navigate to [Bonsai --> Clusters](https://app.bonsai.io/clusters) and click the cluster you want to integrate. Navigate to the Manage tab and scroll to the bottom of the page.

"Datadog Integration" 섹션 아래에 API 키를 붙여 넣고 "Activate Datadog"를 클릭하세요.

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png)

### 확인

키가 유효하면 통합이 활성화됩니다.

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png)

몇 분 후 Datadog 대시보드에서 메트릭을 사용할 수 있습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **bonsai.req.2xx** <br>(gauge) | Number of requests with a 2xx (successful) response code<br>_Shown as request_ |
| **bonsai.req.4xx** <br>(gauge) | Number of requests with a 4xx (client error) response code<br>_Shown as request_ |
| **bonsai.req.5xx** <br>(gauge) | Number of requests with a 5xx (server error) response code<br>_Shown as request_ |
| **bonsai.req.max_concurrency** <br>(gauge) | Peak concurrent requests<br>_Shown as connection_ |
| **bonsai.req.p50** <br>(gauge) | The median request duration<br>_Shown as minute_ |
| **bonsai.req.p95** <br>(gauge) | The 95th percentile request duration<br>_Shown as minute_ |
| **bonsai.req.p99** <br>(gauge) | The 99th percentile request duration<br>_Shown as minute_ |
| **bonsai.req.queue_depth** <br>(gauge) | Peak queue depth (how many requests are waiting due to concurrency limits)<br>_Shown as connection_ |
| **bonsai.req.reads** <br>(gauge) | The number of requests which read data<br>_Shown as request_ |
| **bonsai.req.rx_bytes** <br>(gauge) | The number of bytes sent to elasticsearch<br>_Shown as byte_ |
| **bonsai.req.total** <br>(gauge) | The total number of requests<br>_Shown as request_ |
| **bonsai.req.tx_bytes** <br>(gauge) | The number of bytes sent to client<br>_Shown as byte_ |
| **bonsai.req.writes** <br>(gauge) | The total number of writes<br>_Shown as request_ |

메트릭은 클러스터별로 태그되어 있어 클러스터 기반으로 세그먼트화할 수 있습니다. 다음 태그 예시를 참고하세요.

```text
cluster:my-cluster-slug
```

### 이벤트

Bonsai 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Bonsai 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

Need help? Contact [Datadog Support](https://docs.datadoghq.com/help/).
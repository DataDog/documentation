---
description: CloudPrem을 로컬 환경에서 5분 이내에 시작해 보세요.
further_reading:
- link: /cloudprem/install/docker/
  tag: 설명서
  text: CloudPrem Docker 설치
- link: /cloudprem/ingest_logs/rest_api/
  tag: 설명서
  text: CloudPrem REST API
title: CloudPrem 퀵스타트
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem Preview에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

CloudPrem을 로컬 환경에서 5분 안에 시작해 보세요. 이 가이드에서는 다음 내용을 다룹니다.
1. Docker를 사용하여 CloudPrem을 로컬에서 시작합니다.
2. 클러스터 상태를 확인합니다.
3. "Hello World" 로그를 전송합니다.
4. Datadog Log Explorer에서 로그를 확인합니다.

## 사전 필수 조건

- [CloudPrem 평가판][1] 신청
- **Datadog API Key**: [API 키 받기][2].
- **Docker**: [Docker 설치하기][3].

## 1단계: CloudPrem 시작하기

터미널에서 다음 명령어를 실행하여 로컬 CloudPrem 인스턴스를 시작하세요. `<YOUR_API_KEY>`를 실제 Datadog API 키로 교체합니다.

```shell
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE="datadoghq.com"

docker run -d \
  --name cloudprem \
  -v $(pwd)/qwdata:/quickwit/qwdata \
  -e DD_SITE=${DD_SITE} \
  -e DD_API_KEY=${DD_API_KEY} \
  -p 127.0.0.1:7280:7280 \
  datadog/cloudprem run
```

## 2단계: CloudPrem 콘솔에서 상태 확인하기

Datadog에서 [CloudPrem 콘솔][4]로 이동하여 클러스터가 연결되었는지 확인합니다. `connected` 상태가 표시되어야 합니다.

CloudPrem 콘솔에서 클러스터 메타데이터를 편집하고 클러스터 이름 `demo`로 변경할 수 있습니다.

{{< img src="/cloudprem/quickstart/clouprem_console.png" alt="클러스터 연결 상태를 보여주는 CloudPrem 콘솔의 스크린샷" style="width:100%;" >}}

## 3단계: 로그 전송하기

터미널에서 API를 사용하여 "Hello World" 로그 항목을 로컬 CloudPrem 인스턴스로 직접 전송합니다.

```shell
curl -X POST "http://localhost:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d '[
    {
      "message": "Hello world from CloudPrem",
      "level": "info",
      "service": "demo"
    }
  ]'
```

## 4단계: 로그 탐색하기

1. [Datadog Log Explorer][5]로 이동합니다.
2. 왼쪽 패싯 패널에서 **CLOUDPREM INDEXES** 아래에 있는 인덱스 체크박스를 선택합니다.
3. "Hello world from CloudPrem" 로그 항목이 표시됩니다.

{{< img src="/cloudprem/quickstart/cloudprem_indexes.png" alt="Datadog Log Explorer에서 CloudPrem 인덱스 선택" style="width:100%;" >}}

## 다음 단계

CloudPrem이 실행 중이면 다음 작업을 할 수 있습니다.
- [Datadog Agent를 사용하여 로그를 전송하여][6] 컨테이너에서 로그를 자동으로 수집합니다.
- [Observability Pipelines를 사용하여 로그를 전송합니다][7].

[1]: https://www.datadoghq.com/product-preview/cloudprem/
[2]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.docker.com/get-docker/
[4]: https://app.datadoghq.com/cloudprem
[5]: https://app.datadoghq.com/logs?query=index=cloudprem-demo&storage=hot
[6]: /ko/cloudprem/ingest/agent/
[7]: /ko/cloudprem/ingest/observability_pipelines/
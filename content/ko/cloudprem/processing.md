---
description: CloudPrem에서 프로세싱 파이프라인을 구성하는 방법 알아보기
further_reading:
- link: /logs/log_configuration/processors/
  tag: 설명서
  text: Datadog Log Management Processors
- link: /cloudprem/
  tag: 설명서
  text: CloudPrem 개요
- link: /cloudprem/installation/
  tag: 설명서
  text: CloudPrem 설치 및 Agent를 사용하여 로그 전송
- link: /cloudprem/ingress/
  tag: 설명서
  text: CloudPrem Ingress 구성하기
- link: /cloudprem/aws_config
  tag: 설명서
  text: AWS 구성하기
- link: /cloudprem/cluster/
  tag: 설명서
  text: 클러스터 크기 조정 및 운영
- link: /cloudprem/architecture/
  tag: 설명서
  text: CloudPrem Architecture란?
- link: /cloudprem/troubleshooting/
  tag: 설명서
  text: 트러블슈팅
private: true
title: 프로세싱 구성
---

<div class="alert alert-warning">CloudPrem는 Preview 버전입니다.</div>

## 개요

CloudPrem에는 로그를 파싱하고 보강할 수 있는 프로세싱 기능이 포함되어 있어 JSON 형식으로 된 로그를 자동으로 파싱합니다. 파이프라인과 프로세서를 정의하여 반구조화된 텍스트에서 의미 있는 정보나 속성을 추출한 후 집계에 사용할 수 있습니다.

<div class="alert alert-info">CloudPrem 로그 파이프라인과 프로세서는 Datadog의 <a href="/logs/log_configuration/pipelines/?tab=source">클라우드 기반 로그 파이프라인과 프로세서</a>의 성능과 일치하도록 설계되었습니다.</div>

지원 프로세서와 미지원 프로세서 목록은 [클라우드 기반 파이프라인과의 호환성](#compatibility-with-cloud-based-pipelines)을 참고하세요.

Datadog 파이프라인 구성과 동일한 형식을 따르는 JSON 파일을 사용하여 로그 프로세싱 파이프라인을 구성할 수 있습니다.

## 프로세싱 설정하기

1. (선택 사항) Datadog에 기존 클라우드 기반 파이프라인이 있는 경우 [Logs Pipelines API][2]를 사용하여 구성을 가져올 수 있습니다.

   ```bash
   curl -X GET "https://api.datadoghq.com/api/v1/logs/config/pipelines" \
    -H "Accept: application/json" \
    -H "DD-API-KEY: ${DD_API_KEY}" \
    -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" > pipelines-config.json
   ```

이 JSON 파일은 CloudPrem에서 직접 사용할 수 있습니다.

2. Helm 차트에서 구성을 설정하려면 CloudPrem Helm 차트에서 `pipelinesConfig` 파라미터를 사용하여 JSON 구성 파일의 경로를 제공하세요.

   ```bash
   helm repo update
   helm upgrade <RELEASE_NAME> -n <NAMESPACE_NAME> --set-file pipelinesConfig=./pipelines-config.json -f datadog-values.yaml
   ```

   CloudPrem이 구성 파일을 성공적으로 읽으면 정보 메시지(`Successfully read pipeline config file`)를 기록합니다. 파일에 정의된 프로세서 중 CloudPrem에서 지원하지 않는 프로세서는 시작 시 무시됩니다.
   **참고**: Helm은 기본 저장소인 etcd의 제한 때문에 구성 파일 크기를 1MB로 제한합니다.

## 구성 파일 형식

구성은 JSON 배열이며, 각 요소는 프로세서나 중첩된 파이프라인을 나타냅니다.

배열 내 요소의 순서는 프로세서의 순차적 실행 순서를 정의합니다. 이 구조는 Datadog API 엔드포인트 `api/v1/logs/config/pipelines`의 출력을 반영합니다.


```json
[
  {
    // processor1 details
  },
  {
    // processor2 details
  }
]
```

```json
[
  {
    "type": "pipeline",
    "id": "U73LOMZ9QG2iM-04OcXypA",
    "name": "cluster agent logs parsing",
    "enabled": true,
    "filter": {
      "query": "service:cluster-agent"
    },
    "processors": [
      {
        "type": "grok-parser",
        "id": "xn2WAzysQ1asaasdfakjf",
        "enabled": true,
        "grok": {
          "supportRules": "",
          "matchRules": "agent_rule %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\) \\|( %{data::keyvalue(\":\")} \\|)?( - \\|)?( \\(%{notSpace:pyFilename}:%{number:pyLineno}\\) \\|)?%{data}\nagent_rule_pre_611 %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\)%{data}\njmxfetch_rule     %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level}\\s+\\| %{word:class} \\| %{data}"
        }
      },
      {
        "id": "xnsd5oanXq2893utcsQ",
        "type": "status-remapper",
        "enabled": true,
        "sources": ["level"]
      },
      {
        "type": "date-remapper",
        "id": "xn2WAzysQ1asdjJsb9dfb",
        "enabled": true,
        "sources": ["timestamp"]
      }
    ]
  }
]
```

## 클라우드 기반 파이프라인과의 호환성

CloudPrem 프로세싱는 클라우드 기반 [Datadog Log Management][3]와 긴밀하게 연계되도록 설계되어 기존 로그 파이프라인 구성을 그대로 사용할 수 있습니다. 이는 알려지지 않았거나 지원되지 않는 프로세서를 무시함으로써 가능합니다. 그러나 몇 가지 차이점이 있습니다.
- 일부 필터 쿼리는 파싱할 수 없습니다(예:`@data.message:+*`와 같이 결합된 와일드카드가 있는 필터).
- `message`에 있는 필터에 다른 매칭 동작이 있습니다(또한 카테고리 프로세서에도 영향을 미칩니다)
- CloudPrem은 단어를 찾기 위해 정규식을 사용하지만, 해당 텍스트를 토큰화한 후 토큰과 일치하는지 비교해야 합니다. 또한 구(Phrases)는 무시됩니다.
- Groks는 내부적으로 정규식을 사용합니다. 정규식 엔진마다 매칭 동작이 약간 다를 수 있습니다.
- 일부 grok 패턴은 파싱할 수 없습니다(예: `%{?>notSpace:db.severity}`).

무시된 프로세서는 인덱서 로그에 경고로 표시됩니다.

### 지원 프로세서:
- attribute-remapper
- category-processor
- date-remapper
- grok-parser(호환성 제한)
- message-remapper
- 파이프라인
- service-remapper
- status-remapper
- string-builder-processor
- trace-id-remapper

### 미지원 프로세서:
- arithmetic-processor
- geo-ip-parser
- lookup-processor
- url-parser
- user-agent-parser

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/pipelines/?tab=source
[2]: /ko/api/latest/logs-pipelines/#get-all-pipelines
[3]: /ko/logs/log_configuration/processors/
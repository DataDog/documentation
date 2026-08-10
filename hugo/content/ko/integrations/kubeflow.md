---
app_id: kubeflow
categories:
- 메트릭
- kubernetes
- ai/ml
custom_kind: 통합
description: Kubeflow용 통합
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Kubeflow
---
## 개요

이 점검은 Datadog Agent를 통해 [Kubeflow](https://docs.datadoghq.com/integrations/kubeflow/)를 모니터링합니다.

## 설정

<div class="alert alert-warning">
이 통합 기능은 현재 미리보기 모드로 출시되었습니다. 향후 사용 가능 여부는 변경될 수 있습니다. 
</div>

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

### 설치

Kubeflow 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있습니다.
서버에 추가 설치가 필요하지 않습니다.

### 설정

1. Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `kubeflow.d/conf.yaml` 파일을 편집하여 kubeflow 성능 데이터 수집을 시작하세요. 사용 가능한 모든 구성 옵션은 [샘플 kubeflow.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kubeflow/datadog_checks/kubeflow/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### 메트릭 수집

`kubeflow` 구성 요소에 Prometheus 형식의 메트릭이 노출되어 있는지 확인하세요.
Agent에서 메트릭 수집을 시작하려면 `kubeflow` 포드에 주석을 달아야 합니다.

Kubeflow에는 포트 `9090`에서 액세스할 수 있는 메트릭 엔드포인트가 있습니다.

Prometheus을 통해 Kubeflow에서 메트릭 노출을 활성화하려면 해당 구성 요소에 약속 서비스 모니터링을 활성화해야 할 수 있습니다.

Kube-Prometheus-Stack 또는 사용자 정의 Prometheus 설치를 사용할 수 있습니다.

##### Kube-Prometheus-Stack 설치 방법:

1. Helm 리포지토리 추가:

```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

2. 차트 설치:

```
helm install prometheus-stack prometheus-community/kube-prometheus-stack
```

3. Prometheus 서비스 외부 노출:

```
kubectl port-forward prometheus-stack 9090:9090
```

##### Kubeflow 구성 요소에 대한 ServiceMonitor 설정:

Prometheus 메트릭을 노출하려면 Kubeflow 구성 요소에 대한 ServiceMonitors를 구성해야 합니다.
Kubeflow 구성 요소가 기본적으로 Prometheus 메트릭을 노출하는 경우 이러한 메트릭을 스크래핑하도록 Prometheus를 구성하기만 하면 됩니다.

서비스 모니터는 다음과 같이 표시됩니다.

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: <kubeflow-component>-monitor
  labels:
    release: prometheus-stack
spec:
  selector:
    matchLabels:
      app: <kubeflow-component-name>
  endpoints:
  - port: http
    path: /metrics
```

`<kubeflow-component>`는 `pipelines`, `kserve` 또는 `katib`로, `<kubeflow-component-name>`은`ml-pipeline`, `kserve` 또는 `katib`로 대체됩니다.

**참고**: 안내된 메트릭은 사용 가능한 경우에만 수집할 수 있습니다(버전에 따라 다름). 일부 메트릭은 특정 작업이 실행될 때만 생성됩니다.

`kubeflow` 점검을 구성하는 데 필요한 유일한 파라미터는 `openmetrics_endpoint`입니다. 이 파라미터는 Prometheus 형식의 메트릭이 노출되는 위치로 설정해야 합니다. 기본 포트는 `9090`입니다. 컨테이너화된 환경에서는 [호스트 자동 감지]에 `%%host%%`를 사용해야 합니다(https://docs.datadoghq.com/agent/kubernetes/integrations/).

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/controller.checks: |
      {
        "kubeflow": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'controller'
# (...)
```

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `kubeflow`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **kubeflow.katib.controller.reconcide.count** <br>(count) | Katib 컨트롤러가 실행한 재조정 루프 수|
| **kubeflow.katib.controller.reconcide.duration.seconds.bucket** <br>(count) | Katib 컨트롤러가 실행하는 조정 루프(버킷) 기간|
| **kubeflow.katib.controller.reconcide.duration.seconds.count** <br>(count) | Katib 컨트롤러가 실행한 조정 루프 기간(count)|
| **kubeflow.katib.controller.reconcide.duration.seconds.sum** <br>(count) | Katib 컨트롤러가 실행한 조정 루프 기간(합계)<br>_second로 표시_ |
| **kubeflow.katib.experiment.created.count** <br>(count) | 생성된 총 실험 수|
| **kubeflow.katib.experiment.duration.seconds.bucket** <br>(count) | 실험 시작부터 완료까지 걸린 시간(버킷)|
| **kubeflow.katib.experiment.duration.seconds.count** <br>(count) | 실험 시작부터 완료까지 걸린 시간(개수)|
| **kubeflow.katib.experiment.duration.seconds.sum** <br>(count) | 실험 시작부터 완료까지 걸린 시간(합계)<br>_second로 표시_ |
| **kubeflow.katib.experiment.failed.count** <br>(count) | 실패한 실험의 수|
| **kubeflow.katib.experiment.running.total** <br>(gauge) | 현재 실행 중인 실험 수|
| **kubeflow.katib.experiment.succeeded.count** <br>(count) | 성공적으로 완료된 실험 수|
| **kubeflow.katib.suggestion.created.count** <br>(count) | 총 제안 건수|
| **kubeflow.katib.suggestion.duration.seconds.bucket** <br>(count) | 제안 프로세스 시작부터 완료까지 걸리는 시간(버킷)|
| **kubeflow.katib.suggestion.duration.seconds.count** <br>(count) | 제안 프로세스 시작부터 완료까지 걸린 시간(개수)|
| **kubeflow.katib.suggestion.duration.seconds.sum** <br>(count) | 제안 프로세스 시작부터 완료까지 소요된 시간(합계)<br>_second로 표시_ |
| **kubeflow.katib.suggestion.failed.count** <br>(count) | 실패한 제안의 수|
| **kubeflow.katib.suggestion.running.total** <br>(gauge) | 현재 처리 중인 제안 건수|
| **kubeflow.katib.suggestion.succeeded.count** <br>(count) | 성공적으로 완료된 제안 건수|
| **kubeflow.katib.trial.created.count** <br>(count) | 생성된 총 평가판 수|
| **kubeflow.katib.trial.duration.seconds.bucket** <br>(count) | 시작부터 완료까지의 평가판 기간(버킷)|
| **kubeflow.katib.trial.duration.seconds.count** <br>(count) | 시작부터 완료까지 시험 기간(개수)|
| **kubeflow.katib.trial.duration.seconds.sum** <br>(count) | 시작부터 완료까지의 시험 기간(합계)<br>_second로 표시_ |
| **kubeflow.katib.trial.failed.count** <br>(count) | 실패한 시도 횟수|
| **kubeflow.katib.trial.running.total** <br>(gauge) | 현재 실행 중인 평가판 수|
| **kubeflow.katib.trial.succeeded.count** <br>(count) | 성공적으로 완료된 평가판 수|
| **kubeflow.kserve.inference.duration.seconds.bucket** <br>(count) | 추론 요청 기간(버킷)|
| **kubeflow.kserve.inference.duration.seconds.count** <br>(count) | 추론 요청 기간(개수)|
| **kubeflow.kserve.inference.duration.seconds.sum** <br>(개수) | 추론 요청 기간(합계)<br>_second로 표시_ |
| **kubeflow.kserve.inference.errors.count** <br>(count) | 추론 중 발생한 오류 수|
| **kubeflow.kserve.inference.request.bytes.bucket** <br>(count) | 추론 요청 페이로드의 크기(버킷)|
| **kubeflow.kserve.inference.request.bytes.count** <br>(count) | 추론 요청 페이로드의 크기(개수)|
| **kubeflow.kserve.inference.request.bytes.sum** <br>(count) | 추론 요청 페이로드의 크기(합계)<br>_byte로 표시_ |
| **kubeflow.kserve.inference.response.bytes.bucket** <br>(count) | 추론 응답 페이로드의 크기(버킷)|
| **kubeflow.kserve.inference.response.bytes.count** <br>(count) | 추론 응답 페이로드의 크기(개수)|
| **kubeflow.kserve.inference.response.bytes.sum** <br>(count) | 추론 응답 페이로드의 크기(합계)<br>_byte로 표시_ |
| **kubeflow.kserve.inferences.count** <br>(count) | 추론한 총 횟수|
| **kubeflow.notebook.server.created.count** <br>(count) | 생성된 노트북 서버의 총 개수|
| **kubeflow.notebook.server.failed.count** <br>(count) | 장애가 발생한 노트북 서버 수|
| **kubeflow.notebook.server.reconcile.count** <br>(count) | 노트북 컨트롤러가 실행한 재조정 루프 수|
| **kubeflow.notebook.server.reconcile.duration.seconds.bucket** <br>(count) | 노트북 컨트롤러(버킷)가 실행한 조정 루프 기간|
| **kubeflow.notebook.server.reconcile.duration.seconds.count** <br>(count) | 노트북 컨트롤러가 실행한 조정 루프 기간(개수)|
| **kubeflow.notebook.server.reconcile.duration.seconds.sum** <br>(count) | 노트북 컨트롤러(합계)에 의해 실행된 조정 루프 기간<br>_second로 표시_ |
| **kubeflow.notebook.server.running.total** <br>(gauge) | 현재 실행 중인 노트북 서버 수|
| **kubeflow.notebook.server.succeeded.count** <br>(count) | 성공적으로 완료된 노트북 서버 수|
| **kubeflow.pipeline.run.duration.seconds.bucket** <br>(count) | 파이프라인 실행 기간(버킷)|
| **kubeflow.pipeline.run.duration.seconds.count** <br>(count) | 파이프라인 실행 기간(개수)|
| **kubeflow.pipeline.run.duration.seconds.sum** <br>(count) | 파이프라인 실행 시간(합계)<br>_second로 표시_ |
| **kubeflow.pipeline.run.status** <br>(gauge) | 파이프라인 실행 상태|

### 이벤트

Kubeflow 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

**kubeflow.openmetrics.health**

Agent가 Kuberflow에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그러지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.
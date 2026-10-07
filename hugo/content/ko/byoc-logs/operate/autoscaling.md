---
aliases:
- /ko/cloudprem/operate/autoscaling/
description: BYOC Logs 인덱서 및 컴팩터 워크로드를 위한 Horizontal Pod Autoscaler를 구성합니다.
further_reading:
- link: /byoc-logs/operate/sizing/
  tag: 설명서
  text: 클러스터 크기 조정
- link: /byoc-logs/operate/monitoring/
  tag: 설명서
  text: BYOC Logs 모니터링하기
- link: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/values.yaml
  tag: 소스
  text: CloudPrem Helm 차트 기본값
title: 인덱서 및 컴팩터 자동 확장
---
## 개요 {#overview}

`datadog/cloudprem` Helm 차트는 활성화 시 BYOC(Bring Your Own Cloud) Logs 인덱서 및 독립형 컴팩터를 위한 Horizontal Pod Autoscaler(HPA)를 생성합니다. HPA는 기본적으로 비활성화되어 있으며 각 구성 요소는 독립적으로 구성됩니다.

## 시작 전 참고 사항 {#before-you-begin}

자동 스케일링을 활성화하기 전에 다음이 필요합니다.

- `datadog/cloudprem` Helm 차트를 사용하여 설치된 BYOC Logs 배포.
- 독립형 컴팩터 자동 스케일링을 위한 차트 버전 `0.4.6` 이상.
- 클러스터에 설치된 Kubernetes Metrics Server 또는 기타 메트릭 API 구현.
- 인덱서 및 컴팩터 포드의 최대 수를 수용할 수 있는 충분한 노드 용량.
- 자동 스케일링되는 워크로드에 대해 구성된 CPU 요청.

CPU 기반 HPA 계산은 포드 CPU 요청을 사용합니다. 인덱서는 `indexer.podSize` 또는 `indexer.resources.requests.cpu`에서 CPU 요청을 받습니다. 독립형 컴팩터의 경우 `compactor.resources.requests.cpu`를 구성하세요.

## 인덱서 자동 스케일링 활성화 {#enable-indexer-autoscaling}

인덱서 HPA를 활성화하려면 `indexer.autoscaling.enabled`를 `true`로 설정하세요.

```yaml
indexer:
  autoscaling:
    enabled: true
```

인덱서 자동 스케일링을 활성화하면 HPA가 인덱서 포드 수를 제어하고 `indexer.replicaCount`를 무시합니다.

기본 인덱서 HPA 설정:

| 설정 | 기본값 | 설명 |
|---|---:|---|
| `indexer.autoscaling.minReplicas` | `2` | 인덱서 포드의 최소 개수 |
| `indexer.autoscaling.maxReplicas` | `10` | 인덱서 포드의 최대 개수 |
| CPU 타겟 | `70%` | 인덱서 포드 전체의 평균 CPU 사용률 타겟 |

## 컴팩터 자동 스케일링 활성화 {#enable-compactor-autoscaling}

컴팩터 HPA를 활성화하려면 독립형 컴팩터를 활성화하고 `compactor.autoscaling.enabled`를 `true`로 설정하세요.

```yaml
enableStandaloneCompactors: true

compactor:
  autoscaling:
    enabled: true
```

차트는 `enableStandaloneCompactors` 및 `compactor.autoscaling.enabled`를 모두 `true`로 설정할 때만 컴팩터 HPA를 생성합니다. 컴팩터 자동 스케일링을 활성화하면 HPA가 컴팩터 포드 수를 제어하고 `compactor.replicaCount`를 무시합니다.

기본 컴팩터 HPA 설정:

| 설정 | 기본값 | 설명 |
|---|---:|---|
| `compactor.autoscaling.minReplicas` | `1` | 컴팩터 포드의 최소 개수 |
| `compactor.autoscaling.maxReplicas` | `10` | 컴팩터 포드의 최대 개수 |
| CPU 타겟 | `80%` | 컴팩터 포드 전체의 평균 CPU 사용률 타겟 |

## 기본값 재정의 {#override-the-defaults}

워크로드의 확장 범위를 조정하려면 `enabled`와 함께 `minReplicas` 및 `maxReplicas`를 설정하세요. [클러스터 크기 조정][1] 가이드를 사용하여 노드 용량이 지원하는 최댓값을 선택하세요.

```yaml
indexer:
  autoscaling:
    enabled: true
    minReplicas: 4
    maxReplicas: 20
```

## 구성 적용 {#apply-the-configuration}

BYOC Logs 값 파일에 자동 스케일링 값을 추가한 다음 릴리스를 업그레이드하세요.

```shell
helm upgrade <RELEASE_NAME> datadog/cloudprem \
  --namespace <NAMESPACE_NAME> \
  --values datadog-values.yaml
```

## HPA 확인 {#verify-the-hpas}

BYOC Logs 네임스페이스의 HPA 목록을 표시합니다.

```shell
kubectl get hpa -n <NAMESPACE_NAME>
```

메트릭 및 최근 확장 이벤트를 확인하는 HPA에 대해 설명하세요.

```shell
kubectl describe hpa <RELEASE_NAME>-indexer -n <NAMESPACE_NAME>
kubectl describe hpa <RELEASE_NAME>-compactor -n <NAMESPACE_NAME>
```

`<RELEASE_NAME>-indexer` 및 `<RELEASE_NAME>-compactor`는 차트에서 생성된 기본 HPA 이름입니다. `nameOverride` 또는 `fullnameOverride`를 설정한 경우 결과로 생성된 이름을 대신 사용합니다.

`TARGETS` 열에서 `kubectl get hpa`가 `<unknown>`으로 표시되면 HPA는 CPU 메트릭을 읽을 수 없습니다. 메트릭 API가 실행 중인지, 타겟 포드에 CPU 요청이 있는지 검사하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/byoc-logs/operate/sizing/
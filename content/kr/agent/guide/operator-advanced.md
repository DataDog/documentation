---
further_reading:
- link: agent/kubernetes/log
  tag: 설명서
  text: Datadog와 쿠버네티스(Kubernetes)
kind: faq
title: Datadog Operator 고급 설정
---

<div class="alert alert-warning">Datadog Operator는 오픈 베타 상태입니다. 피드백이나 궁금하신 점이 있다면 <a href="/help">Datadog 지원팀</a>에 문의해주세요.</div>

[Datadog Operator][1]는 쿠버네티스나 OpenShift에 Datadog Agent를 배포하는 방법입니다. 커스텀 리소스(Custom Resource) 상태에서 배포 상황, 건전성, 오류를 보고하고 고급 설정 옵션을 지원해 설정 오류가 발생할 위험을 줄여줍니다.

## 전제 조건

Datadog Operator를 사용하려면 다음의 전제 조건을 만족해야 합니다.

- **Kubernetes Cluster 버전 v1.14.X 이상**: `1.14.0` 이상의 버전으로 테스트를 진행하였으나, `>= v1.11.0` 버전에서 작동해야 합니다. 그보다 오래된 버전에서는 CRD 지원이 부족하므로 Operator가 정상적으로 작동하지 않을 수 있습니다.
- `datadog-operator` 배포용 [`Helm`][2].
- `datadog-agent` 설치용 [`Kubectl` CLI][3].

## Datadog Operator의 배포

Datadog Operator를 사용하려면 쿠버네티스 클러스터에 배포해야 합니다. 다음으로 Datadog 배포 설정을 포함한 `DatadogAgent` 쿠버네티스 리소스를 생성하세요.

1. Datadog Helm 저장소 추가:
  ```
  helm repo add datadog https://helm.datadoghq.com
  ```

2. Datadog Operator 설치:
  ```
  helm install my-datadog-operator datadog/datadog-operator
  ```

## Operator로 Datadog Agents 배포하기

Datadog Operator를 배포한 후,  쿠버네티스 클러스터에서 Datadog Agent의 배포를 트리거하는 `DatadogAgent` 리소스를 생성하세요. 이 리소스를  `Datadog-Operator` 네임스페이스에서 생성하면 Agent가 클로스터의 모든 `Node`에서 `DaemonSet`로 배포됩니다.

다음 템플릿 중 하나를 활용해 `datadog-agent.yaml` 매니페스트를 생성하세요.

* [로그, APM, 프로세스, 메트릭 수집이 활성화된 매니페스트.][4]
* [로그, APM, 메트릭 수집이 활성화된 매니페스트.][5]
* [로그, 메트릭 수집이 활성화된 매니페스트.][6]
* [APM, 메트릭 수집이 활성화된 매니페스트.][7]
* [클러스터 Agent를 사용하는 매니페스트.][8]
* [톨러레이션(toleration)을 활용하는 매니페스트.][9]

`<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`를 [Datadog API와 애플리케이션 키][10]로 대체하고, 다음 명령어로 Agent 설치를 트리거합니다.

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog created
```

다음으로 `DatadogAgent` 리소스 상태를 점검할 수 있습니다.

```shell
kubectl get -n $DD_NAMESPACE dd datadog
NAME            ACTIVE   AGENT             CLUSTER-AGENT   CLUSTER-CHECKS-RUNNER   AGE
datadog-agent   True     Running (2/2/2)                                           110m
```

2개의 워커 노드를 사용하는 클러스터에서는 Agent 팟이 각 노드에 대해 생성되어 있습니다.

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get -n $DD_NAMESPACE pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```


## 초기화

다음 명령어는 위의 안내에 따라 생성된 쿠버네티스 리소스를 전체 삭제합니다.

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

### 톨러레이션(Toleration)

`datadog-agent.yaml` 파일을 다음의 설정으로 업데이트하여 `DaemonSet`의 `Daemonset.spec.template`에 톨러레이션을 추가할 수 있습니다.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - operator: Exists
```

다음의 새 설정을 적용하세요.

```shell
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

DaemonSet 업데이트는 다음과 같이 새 팟 값을 확인하여 검증할 수 있습니다.

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get -n $DD_NAMESPACE pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-all.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-logs-apm.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-logs.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-apm.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-clusteragent.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys
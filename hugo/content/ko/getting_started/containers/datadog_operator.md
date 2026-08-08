---
further_reading:
- link: /containers/datadog_operator
  tag: 설명서
  text: Datadog 오퍼레이터
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
  tag: GitHub
  text: 'Datadog Operator: 고급 설치'
- link: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
  tag: GitHub
  text: 'Datadog Operator: 설정'
title: Datadog Operator 시작하기
---

[Datadog Operator][1]는 오픈 소스 [Kubernetes Operator][2]로, Kubernetes 환경에서 Datadog Agent를 배포하고 구성할 수 있게 해줍니다. 이 가이드는 Operator를 사용하여 Datadog Agent를 배포하는 방법을 설명합니다.

## 전제 조건

- Kubernetes v1.20.X+
- Datadog Operator 배포를 위한 [Helm][3]
- Datadog Agent를 설치하기 위한 Kubernetes 명령줄 도구, [kubectl][4].

## 설치 및 배포

1. Helm으로 Datadog Operator를 설치하세요:
  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. API 및 애플리케이션 키로 Kubernetes 시크릿을 생성하세요:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`를 [Datadog API 및 애플리케이션 키][5]로 교체합니다.

3. `DatadogAgent` 배포 구성의 사양이 포함된 `datadog-agent.yaml` 파일을 만듭니다. 다음 샘플 구성은 메트릭, 로그 및 APM을 활성화합니다:
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiSecret:
          secretName: datadog-secret
          keyName: api-key
        appSecret:
          secretName: datadog-secret
          keyName: app-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
  ```
  모든 구성 옵션은 [Operator 설정 사양][6]을 참조하세요.

4. Datadog Agent를 배포하세요:
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

## 검증

`kubectl get daemonset` 및 `kubectl get pod -owide`를 사용해 설치를 확인합니다.

두 개의 워커 노드가 있는 클러스터에서는 각 노드에 생성된 Agent 파드를 볼 수 있어야 합니다:

```bash
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

## 클린업

다음 명령은 이 가이드에서 생성한 모든 Kubernetes 리소스를 삭제합니다.

```bash
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/datadog_operator
[2]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
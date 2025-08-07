---
further_reading:
- link: /containers/kubernetes/apm/
  tag: 설명서
  text: 트레이스 수집 설정
- link: /containers/cluster_agent/admission_controller
  tag: 설명서
  text: 어드미션 컨트롤러
title: Kubernetes 서비스로 APM 설정하기
---

## 개요

Kubernetes에서 Datadog 트레이서는 Unix Domain Socket(UDS), 호스트 IP 또는 Kubernetes 서비스의 세 가지 방법으로 Datadog Agent에 데이터를 전송할 수 있습니다. 각 옵션은 애플리케이션 포드가 APM 데이터를 전송할 때 해당 데이터가 동일한 노드의 Datadog Agent 포드에 도달하도록 합니다. 이러한 전략은 트래픽의 균형을 적절히 맞추고 데이터를 올바르게 태깅하도록 하기 위한 것입니다. Datadog은 데이터 전송에 UDS를 사용할 것을 권장합니다.

그러나 UDS에 필요한 `hostPath` 볼륨(및 호스트 IP 사용에 필요한 `hostPort` 포트)을 사용할 수 없는 경우, 대체 옵션으로 Kubernetes 서비스를 사용할 수 있습니다. 

본 지침에서는 Kubernetes 서비스를 활용해 Datadog Agent로 데이터를 전송하도록 설정하는 방법을 설명합니다.

## 서비스 설정

Kubernetes 1.22에서, [내부 트래픽 정책 기능][1]은 서비스에서 `internalTrafficPolicy: Local` 구성을 지정하는 옵션을 제공합니다. 이를 설정하면 애플리케이션 포드 트래픽이 *동일한 노드*에 있는 서비스 다운스트림 포드로 전달됩니다.

클러스터에서 Datadog [Helm 차트][3] 또는 [Datadog Operator][4]를 통해 Kubernetes v1.22.0+로 Datadog Agent를 설치한 경우, `internalTrafficPolicy: Local`에 Agent용 서비스가 자동으로 생성됩니다. 추가로 아래 설정으로 Agent용 APM 포트 옵션을 활성화합니다.

### 에이전트 구성
{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`를 업데이트하여 `features.apm.enabled`를 `true`로 설정합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml`를 업데이트하여 `datadog.apm.portEnabled`를 `true`로 설정합니다.

```yaml
datadog:
  apm:
    portEnabled: true
```    

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

## 애플리케이션 설정
Cluster Agent Admission Controller 또는 수동 설정으로 애플리케이션의 Kubernetes 서비스 사용을 설정할 수 있습니다.

### Cluster Agent Admission Controller
[Cluster Agent Admission Controller][2]로 APM 연결용 설정을 컨테이너에 주입할 수 있습니다. 옵션은 `hostip`, `socket` 또는 `service`입니다. `service` 모드를 선택하면 Admission Controller가 해당 서비스의 DNS 이름에 대한 `DD_AGENT_HOST` 환경 변수를 추가합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
다음을 사용해 `datadog-agent.yaml`을 업데이트합니다. 

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
    admissionController:
      enabled: true
      agentCommunicationMode: service
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

다음을 사용해 `datadog-values.yaml`을 업데이트합니다.

```yaml
clusterAgent:
  admissionController:
    enabled: true
    configMode: service
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

**참고:** 혼합 노드(Linux/Windows) 환경에서 Cluster Agent 및 해당 Admission Controller는 Linux 배포를 기준으로 동작합니다. 이로 인해 Windows 포드의 서비스 연결에 잘못된 환경 변수가 삽입될 수 있습니다.

### 수동 구성
수동으로 설정하려면 포드 매니페스트 내의 환경 변수 `DD_AGENT_HOST`를 설정하고 값은 `<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local`로 설정합니다.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: <SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local
```

`<SERVICE_NAME>`을 서비스 이름으로 변경하고, `<SERVICE_NAMESPACE>`를 서비스의 네임스페이스로 변경합니다.

예를 들어, 서비스 정의가 다음과 같을 경우가 있습니다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: datadog
  namespace: monitoring
  labels:
    #(...)
spec:
  selector:
    app: datadog
  ports:
    - protocol: UDP
      port: 8125
      targetPort: 8125
      name: dogstatsdport
    - protocol: TCP
      port: 8126
      targetPort: 8126
      name: traceport
  internalTrafficPolicy: Local
```

`DD_AGENT_HOST` 값을 `datadog.monitoring.svc.cluster.local`로 설정합니다.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: datadog.monitoring.svc.cluster.local
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/
[2]: /ko/containers/cluster_agent/admission_controller
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[4]: /ko/containers/datadog_operator
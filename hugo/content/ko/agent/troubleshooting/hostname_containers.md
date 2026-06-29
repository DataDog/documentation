---
description: Kubernetes, Docker 및 클라우드 플랫폼 기반 컨테이너화된 Datadog Agent 배포에서 호스트 이름 확인
  오류 문제를 해결하세요.
title: 컨테이너에서 호스트 이름 탐지
---

Datadog의 많은 기능은 Agent를 통해 모니터링되는 호스트에 대한 정확한 호스트 이름을 제공합니다. Agent가 호스트에서 직접 실행될 때는 이 작업이 간단하지만, 컨테이너화된 환경에서 실행될 때는 호스트 이름 확인 프로세스가 달라집니다.

버전 **7.40**부터 Agent는 컨테이너화된 환경에서 호스트 이름 확인 실패를 올바르게 인식합니다. 호스트 이름이 확인되지 않으면 Agent가 시작된 직후 오류와 함께 종료됩니다.

이 경우 로그에 다음 `ERROR` 메시지가 출력됩니다.
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

이 오류가 발생하면 일반적으로 Agent 구성의 일부가 잘못되었음을 의미합니다. 다음 정보를 사용하여 이러한 잘못된 구성을 해결하세요.

## Kubernetes 호스트 이름 오류

Kubernetes에서 호스트 이름 오류는 일반적으로 Agent가 다음 중 하나 이상에 액세스할 수 없음을 의미합니다.
* Kubelet API
* 클라우드 공급자 메타데이터 엔드포인트
* 컨테이너 런타임 API

일부 Kubernetes 배포판에는 전용 구성이 필요하므로 설정이 [권장 Kubernetes 설정][1]과 일치하는지 확인하세요.

### Kubelet API에 액세스

Agent가 Kubelet API에 액세스할 수 있는지 확인하세요. 가능한 경우 Agent는 다음 로그를 출력합니다.
```
Successful configuration found for Kubelet, using URL: ******
```

Kubernetes RBAC 권한은 공식 [Helm 차트][2], [Datadog Operator][3] 및 공식 [매니페스트][4]에 의해 자동으로 설정됩니다. 다른 솔루션을 사용하여 Agent를 배포하는 경우 Agent 서비스 계정에 바인딩되는 `Role` 또는 `ClusterRole`에 다음 권한이 있는지 확인합니다.

```yaml
rules:
  - apiGroups: # Kubelet connectivity
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/proxy
      - nodes/stats
    verbs:
      - get
```

Kubelet API 연결을 방해하는 가장 일반적인 오류는 Kubelet TLS 인증서 확인입니다. 많은 Kubernetes 배포판에서 Kubelet 인증서는 다음 중 하나입니다.
* 클러스터 CA에 의해 서명되지 않았습니다.
* 연결할 수 있는 주소에 해당하는 SAN을 포함하지 않습니다.

TLS 확인이 기본적으로 활성화되어 있으므로 Agent가 HTTPS를 통해 Kubelet API에 연결하는 것을 방지합니다.

전용 파라미터를 사용하거나 Agent 매니페스트에서 **모든 컨테이너**에 대한 `DD_KUBELET_TLS_VERIFY` 변수를 설정하여 TLS 확인을 비활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` Kubernetes 리소스:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    kubelet:
      tlsVerify: false
```

{{% /tab %}}
{{% tab "Helm" %}}

커스텀 `datadog-values.yaml`:

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}

DaemonSet 매니페스트:

```yaml
apiVersion: apps/v1
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_KUBELET_TLS_VERIFY
              value: "false"
```

{{% /tab %}}
{{< /tabs >}}

### 클라우드 공급자 메타데이터 엔드포인트에 액세스

AWS, Google Cloud 또는 Azure에서 실행하는 경우 Agent는 메타데이터 엔드포인트를 사용하여 호스트 이름을 검색할 수 있습니다.

클라우드 공급자 메타데이터 엔드포인트에 액세스하면 Datadog이 Agent 데이터와 애플리케이션의 클라우드 통합 데이터를 적절하게 일치시킬 수 있습니다.

이 문제가 발생한다는 것은 일반적으로 메타데이터 엔드포인트에 대한 액세스가 제한되었음을 의미합니다.
예를 들어 AWS에서는 [hop 제한 설정][5] 때문일 수 있습니다.

### 컨테이너 런타임 API에 액세스

Agent가 Kubelet API에 연결되는 것을 **명시적으로** 원하지 않는 경우와 위에서 설명한 지원 클라우드 공급자에서 실행하고 있지 않은 경우에만 이 솔루션을 사용하세요.

이 경우 하향 API를 사용하여 `DD_HOSTNAME`을 설정할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` Kubernetes 리소스:

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_HOSTNAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Helm" %}}

커스텀 `datadog-values.yaml`:

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}

{{% tab "수동 (DaemonSet)" %}}

DaemonSet 매니페스트:

```yaml
apiVersion: apps/v1
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          env:
            - name: DD_HOSTNAME
              valueFrom:
                fieldRef:
                  fieldPath: spec.nodeName
```

{{% /tab %}}
{{< /tabs >}}

## Amazon ECS 및 Docker VM 호스트 이름 오류

Agent가 클라우드 공급자의 Docker에서 실행될 때 호스트 이름 오류는 일반적으로 Agent가 다음 중 하나 이상에 액세스할 수 없음을 의미합니다.
* 컨테이너 런타임 API
* 클라우드 공급자 메타데이터 엔드포인트

### 컨테이너 런타임 API에 액세스

Agent가 Docker 소켓에 연결하도록 허용합니다.

{{< tabs >}}
{{% tab "EC2의 Amazon ECS" %}}

Docker 소켓이 [작업 정의][1]에 마운트되어 있는지 확인하세요.


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "VM의 Docker" %}}

Docker 소켓이 `docker run` 명령에 마운트되어 있는지 확인하세요.

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### 클라우드 공급자 메타데이터 엔드포인트에 액세스

AWS, Google Cloud 또는 Azure에서 실행하는 경우 Agent는 메타데이터 엔드포인트를 사용하여 호스트 이름을 검색할 수 있습니다.

클라우드 공급자 메타데이터 엔드포인트에 액세스하면 Datadog이 Agent 데이터와 애플리케이션의 클라우드 통합 데이터를 적절하게 일치시킬 수 있습니다.

이 문제가 발생한다는 것은 일반적으로 메타데이터 엔드포인트에 대한 액세스가 제한되었음을 의미합니다.
예를 들어 AWS에서는 [hop 제한 설정][5] 때문일 수 있습니다.

## CI 환경, 사이드카 설정 및 컨테이너 런타임에 액세스할 수 없는 환경에서의 호스트 이름 오류

Agent를 **CI 환경**(따라서  Agent는 임시임)에서 실행하거나 호스트 정보에 액세스할 수 없는 사이드카로 실행하는 경우 두 가지 옵션을 사용할 수 있습니다.

- `DD_HOSTNAME`(`datadog.yaml`에서 `hostname`)을 명시적으로 호스트이름으로 설정

```
-e DD_HOSTNAME=$(hostname)
```

- `DD_HOSTNAME_TRUST_UTS_NAMESPACE`(`datadog.yaml`에서 `hostname_trust_uts_namespace`)를 설정

이 옵션은 Datadog Agent **7.42.0**부터 사용할 수 있습니다.

```
-e DD_HOSTNAME_TRUST_UTS_NAMESPACE=true
```

이것이 설정되면 Agent는 컨테이너 내 호스트 이름(일반적으로 컨테이너 이름 또는 파드 이름)을 사용합니다.

**참고**: 이는 Fargate와 같은 서버리스 솔루션에는 적용되지 않습니다.

위의 해결 방법으로 Agent 설정이 해결되지 않으면 [Datadog 지원팀][6]에 문의하세요.

[1]: /ko/containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /ko/containers/troubleshooting/duplicate_hosts
[6]: /ko/help/
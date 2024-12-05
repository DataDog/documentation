---
title: 컨테이너에서 호스트 이름 탐지
---

Datadog 기능 중 다수가 호스트 모니터링을 하기 위해 호스트 이름을 사용하기 때문에 에이전트에서 정확한 호스트 이름을 제공해야 합니다. 에이전트가 호스트에서 직접 실행되는 경우에는 간단하지만, 에이전트가 컨테이너 환경에서 실행되는 경우에는 호스트 이름 확인 프로세스가 다릅니다.

**7.40** 버전부터 에이전트는 컨테이너 환경에서 이름 확인에 실패한  호스트 이름을 인식합니다. 확인된 호스트 이름이 없으면 에이전트가 시작된 직후 오류와 함께 종료됩니다.

이 경우 로그에 다음과 같은 `ERROR` 메시지가 나타납니다.
```
Error while getting hostname, exiting: unable to reliably determine the host name. You can define one in the agent config file or in your hosts file
```

이 오류가 발생하면 일반적으로 에이전트 설정의 일부가 잘못되었음을 의미합니다. 다음 정보를 이용해 이 잘못된 설정을 해결할 수 있습니다. 

## Kubernetes 호스트 이름 오류

Kubernetes 호스트 이름 오류는 일반적으로 에이전트가 다음 중 하나 이상에 액세스할 수 없음을 의미합니다.
* Kubelet API
* 클라우드 공급자 메타데이터 엔드포인트
* 컨테이너 런타임 API

일부 Kubernetes 배포에는 전용 설정이 필요하므로 [권장 Kubernetes 설치][1]와 설정이 일치하는지 확인합니다.

### Kubelet API 액세스

에이전트가 Kubelet API에 액세스할 수 있는지 확인합니다. 액세스할 수 있는 경우, 에이전트에 다음 로그가 나타납니다.
```
Successful configuration found for Kubelet, using URL: ******
```

Kubernetes RBAC 권한은 공식 [Helm 차트][2], [Datadog 운영자][3], 공식 [매니페스트][4]에서 자동으로 설정합니다. 다른 솔루션을 사용하여 에이전트를 배포하는 경우 `Role` 또는 `ClusterRole`에 다음 권한이 있거나 에이전트 서비스 계정에 국한되어 있는지 확인하세요.

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

Kubelet API에 연결할 수 없는 가장 일반적인 오류는 Kubelet TLS 인증서와 관련된 문제입니다. Kubernetes 배포에서 Kubelet 인증서와 관련된 문제는 보통 다음 두 가지 중 하나입니다.
* 클러스터 CA 서멍이 없음.
* 연결 가능한 주소에 해당하는 SAN이 없음.

이 경우 기본값으로 TLS 확인이 실행되므로 에이전트가 HTTPS를 통해 Kubelet API에 연결할 수 없습니다.

전용 파라미터를 사용하거나 에이전트 매니페스트에서 **모든 컨테이너**에 `DD_KUBELET_TLS_VERIFY` 변수를 설정해 TLS 확인을 비활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  kubelet:
    tlsVerify: false
```

{{% /tab %}}
{{% tab "Operator" %}}

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
{{% tab "매니페스트" %}}

`DaemonSet` 매니페스트:

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

### 클라우드 공급자 메타데이터 엔드포인트 액세스

에이전트를 AWS, Google Cloud, 또는 Azure에서 실행하는 경우 메타데이터 엔드포인트를 사용하여 호스트 이름을 검색할 수 있습니다.

클라우드 공급자 메타데이터 엔드포인트에 액세스하면 Datadog이 애플리케이션의 에이전트 데이터와 클라우드 통합 데이터를 적절하게 일치시킬 수 있습니다.

이 문제가 발생하면 일반적으로 메타데이터 엔드포인트 액세스가 제한되었음을 의미합니다.
예를 들어, AWS에서 이는 [홉 제한 설정][5] 때문일 수 있습니다.

### 컨테이너 런타임 API 액세스

이 솔루션은 **명시적으로** 에이전트가 Kubelet API에 연결하는 것을 원하지 않는 경우와 위에서 언급된 클라우드 공급자에서 실행되지 않는 이벤트에만 사용하세요.

이 경우 하향 API를 사용하여 `DD_HOSTNAME`를 설정할 수 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}

사용자 지정 `values.yaml`:

```yaml
datadog:
  env:
    - name: DD_HOSTNAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
```

{{% /tab %}}
{{% tab "Operator" %}}

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
{{% tab "Manifest" %}}

`DaemonSet` 매니페스트

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

에이전트가 클라우드 공급자의 Docker에서 실행되는 경우 일반적으로 에이전트가 다음 중 하나 이상에 액세스할 수 없을 때 호스트 이름 오류가 발생합니다.
* 컨테이너 런타임 API
* 클라우드 공급자 메타데이터 엔드포인트

### 컨테이너 런타임 API 액세스

에이전트가 Docker 소켓에 연결할 수 있도록 하세요.

{{< tabs >}}
{{% tab "EC2의 Amazon ECS" %}}

[작업 정의][1]에 Docker 소켓이 연결되어 있는지 확인합니다.


[1]: /resources/json/datadog-agent-ecs.json
{{% /tab %}}
{{% tab "VM의 Docker" %}}

`docker run` 명령에 따라 Docker 소켓이 연결되어 있는지 확인합니다.

```
-v /var/run/docker.sock:/var/run/docker.sock:ro
```

{{% /tab %}}
{{< /tabs >}}

### 클라우드 공급자 메타데이터 엔드포인트 액세스

에이전트를 AWS, Google Cloud, 또는 Azure에서 실행하는 경우 메타데이터 엔드포인트를 사용하여 호스트 이름을 검색할 수 있습니다.

클라우드 공급자 메타데이터 엔드포인트에 액세스하면 Datadog이 애플리케이션의 에이전트 데이터와 클라우드 통합 데이터를 적절하게 일치시킬 수 있습니다.

이 문제가 발생하면 일반적으로 메타데이터 엔드포인트 액세스가 제한되었음을 의미합니다.
예를 들어, AWS에서 이는 [홉 제한 설정][5] 때문일 수 있습니다.

## CI 환경, 사이드카 설정, 컨테이너 런타임 액세스가 없는 환경에서 호스트 이름 오류

**CI 환경**에서 에이전트를 실행하는 경우(그래서 에이전트는 임시) 또는 호스트 정보에 액세스 권한이 없는 사이드카로 실행하는 경우 두 가지 해결 방법이 있습니다.

- 호스트 이름에 명시적으로 `DD_HOSTNAME`을 설정(`datadog.yaml`에서`hostname`):

```
-e DD_HOSTNAME=$(hostname)
```

- `DD_HOSTNAME_TRUST_UTS_NAMESPACE`을 설정(`datadog.yaml`에서 `hostname_trust_uts_namespace`)

이 옵션은 Datadog 에이전트 **7.42.0**부터 사용할 수 있습니다.

```
-e DD_HOSTNAME_TRUST_UTS_NAMESPACE=true
```

이를 설정하면 에이전트는 컨테이너 내 호스트 이름(일반적으로 컨테이너 이름 또는 Pod 이름)을 사용합니다.

**참고**: Fargate와 같은 서버리스 솔루션에는 적용되지 않습니다.

위 방법으로 에이전트 설정을 수정하지 못한 경우 [Datadog 지원팀][6]에 문의하세요.

[1]: /ko/containers/kubernetes/distributions
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests
[5]: /ko/containers/troubleshooting/duplicate_hosts
[6]: /ko/help/
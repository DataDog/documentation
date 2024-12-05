---
aliases:
- /ko/agent/autodiscovery/endpointchecks
- /ko/agent/autodiscovery/endpointschecks
- /ko/agent/cluster_agent/endpointschecks
further_reading:
- link: /agent/kubernetes/cluster/
  tag: 설명서
  text: 클러스터 에이전트
- link: /containers/cluster_agent/clusterchecks/
  tag: 설명서
  text: 클러스터 점검
- link: /containers/troubleshooting/cluster-and-endpoint-checks
  tag: 설명서
  text: 엔드포인트 점검 트러블슈팅
title: 자동탐지로 엔드포인트 점검
---

## 개요

클러스터 점검 기능은 [자동탐지][1]가 가능하며 Kubernetes 서비스와 같은 로드 밸런스 클러스터 서비스 점검을 합니다. _엔드포인트 점검_해당 장치를 연장하여 Kubernetes 서비스로 관리되는 각 엔드포인트를 모니터링합니다. 

[클러스터 에이전트][2]는 Kubernetes 서비스의 [자동탐지][1] 주석을 기반으로 엔드포인트 점검 설정을 찾습니다. 그 후에 클러스터 에이전트는 이러한 설정을 개별적으로 작동하기 위해 노드 관련 에이전트에게 보냅니다. 엔드포인트 점검은 모니터링되는 Kubernetes 서비스의 엔드포인트를 지원하는 Pod와 같은 노드를 활용하는 에이전트에 보냅니다. 이 디스패칭 로직을 통해 에이전트는 이미 수집된 각각의 Pod에 Pod 및 컨테이너 태그를 추가할 수 있습니다.

에이전트는 10초마다 클러스터 에이전트와 연결하며 작동할 설정 점검을 검색합니다. 엔드 포인트 점검으로부터 나온 메트릭은 평가된 IP 주소를 기반으로 한 서비스 태그, [Kubernetes 태그][3], 호스트 태그 그리고 `kube_endpoint_ip` 태그와 함께 제출합니다. 

**버저닝**;
이 기능은 Datadog 에이전트 v6.12.0+ 그리고 Datadog 클러스터 에이전트 v1.3.0+ 위한 Kubernetes를 지원합니다. 클러스터 에이전트 v1.4.0를 먼저 살펴보면, 클러스터 에이전트는 Pod를 지원하지 않는 엔드포인드의 모든 엔드포인트 점검을 규칙적인 클러스터 점검으로 바꿉니다. 이 기능을 활용하려면 [클러스터 점검][4] 기능(엔드포인트 점검 기능 추가 외)을 사용하세요. 

**참고:** 만약 서비스 뒤 Pod가 정적이라면, `ad.datadoghq.com/endpoints.resolve` 주석을 추가해야 합니다. Datadog 클러스터 에이전트는 점검을 엔드포인트 점검으로 예약하고 [클러스터 점검 실행자][5]로 보냅니다. Kubernetes API 서버로 주석을 추가하는 [예시는 여기에서 참고하세요][6].

### 예: 엔드포인트 관련 서비스
아래 예시에서,  NGINX용 Kubernetes 배포는 3개의 Pod로 생성되었습니다.

```shell
kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

서비스도 만들어졌습니다. 이 세 가지 엔드포인트를 통해 Pod에 연결됩니다.

```shell
kubectl get service nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
kubectl get endpoints nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-m4c7t
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-smsxv
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-x2wzq
      ...
```

서비스 기반 클러스터 검사는 서비스의 단일 IP 주소를 테스트하는 반면, 엔드포인트 검사는 이 서비스와 연결된 3개의 엔드포인트 **각각**에 대해 예약됩니다.


설계상 엔드포인트 점검은 `nginx`서비스의 엔드포인트를 지원하는 Pod와 동일한 노드에서 작동되는 에이전트로 보냅니다. 이 예시에서 에이전트는 `gke-cluster-default-pool-4658d5d4-k2sn`와 `gke-cluster-default-pool-4658d5d4-p39c`노드에서 작동되고 `nginx` Pod를 점검합니다.

## 엔드포인트 점검 디스패칭 설치

{{< tabs >}}
{{% tab "Operator" %}}

클러스터 에이전트의 Operator 배포에서 `features.clusterChecks.enabled` 구성 키를 사용해 엔드포인트 점검 디스패치가 기본 값으로 활성화되어 있습니다.
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

이 설정으로 클러스터 에이전트와 에이전트 사이에 클러스터 점검 및 엔드포인트 점검 디스패칭을 모두 사용할 수 있습니다.

{{% /tab %}}
{{% tab "Helm" %}}

클러스터 에이전트의 Helm 배포에서 `features.clusterChecks.enabled` 구성 키를 통해 엔드포인트 점검 디스패치가 기본 값으로 활성화되어 있습니다.
```yaml
datadog:
clusterChecks:
enabled: true
# (...)
clusterAgent:
enabled: true
# (...)
```

이 설정으로 클러스터 에이전트와 에이전트 사이에 클러스터 점검 및 엔드포인트 점검 디스패칭을 모두 사용할 수 있습니다.

{{< /tabs >}}

{{% tab "DaemonSet" %}}
### 클러스터 에이전트 설치

Datadog 클러스터 에이전트에서 `kube_endpoints` 설정 프로바이더와 리스너를 사용할 수 있도록 합니다. `DD_EXTRA_CONFIG_PROVIDERS`와 `DD_EXTRA_LISTENERS` 환경 변수를 설정합니다.

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**참고**: 모니터링되는 엔드포인트가 Pod에서 지원되지 않는 경우 [클러스터 점검을 활성화][1]해야 합니다. `kube_services` 설정 프로바이더와 리스너를 추가하세요.

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

변경된 설정을 적용하기 위해 [에이전트 다시 시작][2]하세요.

### 에이전트 설정

노드 기반 에이전트에서 `endpointschecks` 설정 프로바이더를 사용합니다. 이 것은 두 가지 방법으로 작동할 수 있습니다.

- `DD_EXTRA_CONFIG_PROVIDERS` 환경 변수를 설정합니다. 값이 여러 개인 경우 스페이스로 구분된 문자열을 사용합니다.

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- 또는 `datadog.yaml` 설정 파일에 추가하세요.

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**참고**: 모니터링되는 엔드포인트가 Pod에서 지원되지 않는 경우 [클러스터 점검을 활성화][1]해야 합니다. `clusterchecks` 설정 프로바이더를 추가하여 활성화할 수 있습니다.

```shell
DD_EXTRA_CONFIG_PROVIDERS="엔드포인드점검 클러스터점검"
```

변경된 설정을 적용하기 위해 [에이전트 다시 시작][2]하세요.

[1]: /ko/agent/cluster_agent/clusterchecks/
[2]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## 설정 점검 설치하기

### 정적 설정 파일을 이용한 설정

클러스터 에이전트 v1.18.0+에서는 Kubernetes 엔드포인트를 대상으로 지정하기 위해 점검 설정에서`advanced_ad_identifiers`와  [자동탐지 템플릿 변수][7]를 사용할 수 있습니다([예시 보기][8]).

#### 예: Kubernetes 엔드포인트 HTTP 점검 

Kubernetes 서비스의 엔드포인트에 대해 [HTTP 점검][9]을 실행하려면,

{{< tabs >}}
{{% tab "Helm" %}}
점검 설정을 규정하기 위해 `clusterAgent.confd` 필드 사용:

```yaml
#(...)
clusterAgent:
confd:
<INTEGRATION_NAME>.yaml: |-
advanced_ad_identifiers:
- kube_endpoints:
name: "<ENDPOINTS_NAME>"
namespace: "<ENDPOINTS_NAMESPACE>"
cluster_check: true
init_config:
instances:
- url: "http://%%host%%"
 name: "<EXAMPLE_NAME>"

{{% /tab %}}
{{% tab "DaemonSet" %}}
다음 콘텐츠를 사용하여 클러스터 에이전트 컨테이너에 `/conf.d/http_check.yaml` 파일을 설치합니다.

```yaml
advanced_ad_identifiers:
  - kube_endpoints:
     name: "<ENDPOINTS_NAME>"
     namespace: "<ENDPOINTS_NAMESPACE>"
cluster_check: true
init_config:
instances:
 - url: "http://%%host%%"
name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{< /tabs >}}

### Kubernetes 서비스 주석을 이용한 설정

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

서비스 어노테이션 구문은 [Kubernetes Pod 어노테이션][1]의 구문과 유사합니다.

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

이 구문은 각 엔드포인트의 IP로 대체되는 `%%host%%` [템플릿 변수][11]를 지원합니다. `kube_namespace`,`kube_service` 그리고 `kube_endpoint_ip` 태그가 인스턴스에 자동으로 추가됩니다.

**참고**: 커스텀 엔드포인트 로그 설정은 Kubernetes 로그 파일 수집이 아닌 Docker 소켓 로그 수집 중에만 지원됩니다.

#### 예: 서비스의 엔드포인트 NGINX 점검으로 NGINX 지원 서비스 HTTP 점검

이 서비스는 `nginx` 배포 Pod와 연결됩니다. 이 설정을 기반으로:

- 이 서비스를 지원하는 각 NGINX Pod에 대해 [`nginx`][12] 기반 엔드포인트 점검을 보냅니다. 이 점검은 NGINX Pod와 같은 각 노드의 에이전트에 의해 작동됩니다(Pod IP를 `%%host%%`로 사용).
- [`http_check`][9] 기반 클러스터 점검은 클러스터의 단일 에이전트로 보냅니다. 이 점검은 서비스의 IP를 `%%host%%`로 사용하여 각 엔드포인트에 자동으로 로드 밸런스를 맞춥니다.
- 점검은 [통합 서비스 태깅][13] 레이블에 해당하는 `env:prod`, `service:my-nginx` 그리고`version:1.19.0` 태그와 함께 보냅니다.

```yaml
apiVersion: v1
kind: Service
metadata:
    name: nginx
    labels:
        app: nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url": "http://%%host%%",
                "name": "My Nginx",
                "timeout": 1
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.checks: |
        {
          "nginx": {
            "init_config": {},
            "instances": [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/status/"
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

[1]: /ko/containers/kubernetes/integrations/?tab=kubernetesadv2
[9]: /ko/integrations/http_check/
[11]: /ko/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /ko/integrations/nginx/
[13]: /ko/getting_started/tagging/unified_service_tagging

{{< /tabs >}}

{{% tab "Kubernetes (AD v1)" %}}

주석을 추가하는 서비스 구문은 [Kubernetes Pod 주석 달기][10]와 유사합니다.

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

이 구문은 각 엔드포인트의 IP로 대체되는 `%%host%%` [템플릿 변수][11]를 지원합니다. `kube_namespace`,`kube_service` 그리고 `kube_endpoint_ip` 태그가 인스턴스에 자동으로 추가됩니다.

**참고**: 커스텀 엔드포인트 로그 설정은 Kubernetes 로그 파일 수집이 아닌 Docker 소켓 로그 수집 중에만 지원됩니다.

#### 예: 서비스의 엔드포인트 NGINX 점검으로 NGINX 지원 서비스 HTTP 점검

이 서비스는 `nginx` 배포 Pod와 연결됩니다. 이 설정을 기반으로:

- 이 서비스를 지원하는 각 NGINX Pod에 대해 [`nginx`][12] 기반 엔드포인트 점검을 보냅니다. 이 점검은 NGINX Pod와 같은 각 노드의 에이전트에 의해 작동됩니다(Pod IP를 `%%host%%`로 사용).
- [`http_check`][9] 기반 클러스터 점검은 클러스터의 단일 에이전트로 보냅니다. 이 점검은 서비스의 IP를 `%%host%%`로 사용하여 각 엔드포인트에 자동으로 로드 밸런스를 맞춥니다.
- 점검은 [통합 서비스 태깅][13] 레이블에 해당하는 `env:prod`, `service:my-nginx` 그리고`version:1.19.0` 태그와 함께 보냅니다.

```yaml
apiVersion: v1
kind: Service
metadata:
name: nginx
labels:
app: nginx
tags.datadoghq.com/env: "prod"
tags.datadoghq.com/service: "my-nginx"
tags.datadoghq.com/version: "1.19.0"
annotations:
ad.datadoghq.com/endpoints.check_names: '["nginx"]'
ad.datadoghq.com/endpoints.init_configs: '[{}]'
ad.datadoghq.com/endpoints.instances: |
[
{
"name": "My Nginx Service Endpoints",
"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
}
]
ad.datadoghq.com/service.check_names: '["http_check"]'
ad.datadoghq.com/service.init_configs: '[{}]'
ad.datadoghq.com/service.instances: |
[
{
"name": "My Nginx Service",
"url": "http://%%host%%"
}
]
ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
ports:
- port: 80
protocol: TCP
selector:
app: nginx
```

[9]: /ko/integrations/http_check/
[10]: /ko/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /ko/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /ko/integrations/nginx/
[13]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/kubernetes/integrations/?tab=kubernetesadv2
[2]: /ko/agent/cluster_agent
[3]: /ko/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /ko/agent/cluster_agent/clusterchecks/
[5]: /ko/containers/guide/clustercheckrunners
[6]: /ko/containers/kubernetes/control_plane/?tab=helm#api-server-2
[7]: /ko/agent/guide/template_variables/
[8]: /ko/agent/cluster_agent/endpointschecks/#example-http_check-on-kubernetes-endpoints
[9]: /ko/integrations/http_check/
[10]: /ko/agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /ko/agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /ko/integrations/nginx/
[13]: /ko/getting_started/tagging/unified_service_tagging
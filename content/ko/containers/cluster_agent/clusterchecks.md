---
aliases:
- /ko/agent/autodiscovery/clusterchecks
- /ko/agent/faq/kubernetes-state-cluster-check
- /ko/agent/cluster_agent/clusterchecks
further_reading:
- link: /containers/cluster_agent/
  tag: 설명서
  text: Datadog 클러스터 에이전트
- link: /containers/cluster_agent/troubleshooting#cluster-checks
  tag: 설명서
  text: 클러스터 점검 트러블슈팅
- link: /containers/guide/clustercheckrunners
  tag: 설명서
  text: 클러스터 점검 실행기
title: 클러스터 점검
---

## 개요

Datadog 에이전트틑 자동으로 컨테이너를 검색하고 [자동탐지 메커니즘][1]을 사용해 점검 설정을 생성합니다.

_클러스터 점검_은 이 메커니즘을 확대해 다음을 포함한 컨테이너화되지 않은 워크로드를 모니터링합니다.

- 데이터 저장소와 엔드포인트는 클러스터 외부에서 실행됩니다(예: RDS 또는 CloudSQL).
- 로드 밸런스 클러스터 서비스(예: 쿠버네티스(Kubernetes) 서비스).

이를 사용하면 노드 기반 에이전트 포드 **각각**에서 점검을 실행하지 않고 개별 점검의 **단일** 인스턴스만 실행할 수 있습니다. [클러스터 에이전트][2]는 설정을 유지하고 동적으로 노드 기반 에이전트에 발송합니다. 에이전트는 10초마다 클러스터 에이전트에 연결해 실행할 설정을 검색합니다. 에이전트가 보고를 중단하면 클러스터 에이전트가 이를 활성 풀에서 제거하고 설정을 다른 에이전트로 발송합니다. 이를 통해 노드가 클러스터에서 추가 및 제거되더라도 단일 인스턴스가 항상 실행되도록 할 수 있습니다.

클러스터 점검에서 수집한 메트릭, 이벤트 및 서비스 점검은 호스트 이름과 관련이 없으므로 호스트 이름 없이 제출됩니다. `cluster_name` 태그가 추가되어 데이터 범위를 설정하고 필터링할 수 있습니다.

인프라가 고가용성(HA)으로 설정된 경우 클러스터 점검을 사용할 것을 권장합니다.

## 클러스터 점검 발송 설정
설정 프로세스는 클러스터 에이전트의 발송 기능을 활성화하는 것을 포함합니다. 또한, 에이전트가 `clusterchecks` 제공업체로부터 설정을 수신할 수 있도록 합니다. 이러한 작업이 완료되면 마운트된 설정 파일이나 쿠버네티스(Kubernetes) 서비스 주석을 통해 클러스터 에이전트에 설정이 전달됩니다.

{{< tabs >}}
{{% tab "Helm" %}}
클러스터 점검 발송은 `datadog.clusterChecks.enabled` 설정 키를 통해 클러스터 에이전트의 헬름(Helm) 배포에서 기본적으로 활성화됩니다.
```yaml
datadog:
clusterChecks:
enabled: true
# (...)
clusterAgent:
enabled: true
# (...)
```

이를 통해 클러스터 점검이 클러스터 에이전트에 설정되고 쿠버네티스(Kubernetes) 서비스 주석(`kube_services`)에서 설정을 처리할 수 있습니다.
{{% /tab %}}
{{% tab "Operator" %}}
클러스터 점검 발송은 `spec.features.clusterChecks.enabled` 설정 키를 사용해 클러스터 에이전트의 연산자 배포에서 활성화됩니다.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

이를 통해 클러스터 에이전트의 클러스터 점검 설정이 활성화하고 쿠버네티스(Kubernetes) 서비스 주석(`kube_services`)에서 설정이 처리할 수 있습니다.

{{% /tab %}}
{{% tab "DaemonSet" %}}
### 클러스터 에이전트

[클러스터 에이전트][1]이 실행되면 클러스터 에이전트 배포에서 다음을 변경하세요.

1. 환경 변수 `DD_CLUSTER_CHECKS_ENABLED`를 `true`로 설정합니다.
2. 클러스터 이름을 `DD_CLUSTER_NAME`로 전달합니다. 메트릭 범위를 설정할 수 있도록 Datadog는 `cluster_name` 인스턴스 태그로 클러스터 이름을 모든 설정에 주입합니다.
3. 서비스 이름이 기본 `datadog-cluster-agent`와 다른 경우 `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` 환경 변수가 서비스 이름을 반영하고 있는지 확인합니다.
4. 클러스터 에이전트가 쿠버네티스(Kubernetes) 서비스 주석에서 설정을 처리하도록 하려면 `DD_EXTRA_CONFIG_PROVIDERS` 및 `DD_EXTRA_LISTENERS` 환경 변수 모두를 `kube_services`로 설정합니다.

### Agent

Datadog **노드** 에이전트에서 `clusterchecks` 설정 제공업체를 활성화합니다. 두 가지 방법으로 실행할 수 있습니다.

- **권장**: 에이전트 DaemonSet에서 `DD_EXTRA_CONFIG_PROVIDERS` 환경 변수를 설정합니다. 값이 여러 개인 경우 공백으로 구분된 문자열이 필요합니다

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- 또는 `datadog.yaml` 설정 파일에 추가:

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[1]: /ko/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}


**참고**: 클러스터 점검을 사용하면 에이전트가 보고하는 메트릭이 제공된 호스트 이름과 연결되지 않습니다. 호스트 기반 메트릭이 아니라 클러스터 기반 메트릭이기 때문입니다. 그 결과 이러한 메트릭은 클러스터 제공업체에서 상속되거나 에이전트의 `DD_TAGS` 환경 변수에서 추가된 태그 등 해당 호스트와 연결된 호스트 수준 태그를 상속하지 않습니다. 클러스터 점검 메트릭에 태그를 추가하려면 `DD_CLUSTER_CHECKS_EXTRA_TAGS` 환경 변수를 사용합니다.

### 클러스터 점검 실행기

 [Datadog Helm 차트][3]와 [Datadog 연산자][4]는 추가로 클러스터 점검 실행기를 배포할 수 있는 방법을 제공합니다. 클러스터 점검 실행기는 일반적인 노드 기반 에이전트를 배포하는 대신 전송된 클러스터 점검만 실행하도록 구성된 소규모 Datadog 에이전트 세트를 배포합니다. 자세한 정보는 [클러스터 점검 실행기][5] 가이드를 참조하세요.

### 고급 전송

클러스터 에이전트는 점검 시간과 점검 인스턴스에 대한 메트릭 샘플을 고려하여 클러스터를 점검하는 고급 전송 로직을 사용할 수 있습니다. 이 로직을 사용하면 클러스터 에이전트가 클러스터 점검 실행기 간 전송과 배포를 최적화할 수 있습니다.

고급 전송 로직을 구성하려면 클러스터 에이전트에 대해 `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` 환경 변수를 `true`로 설정합니다.

점검 통계를 보려면 노드 에이전트(또는 클러스터 점검 실행기)를 구성하는 데 다음 환경 변수가 필요합니다. 클러스터 에이전트가 통계를 사용하며 통계는 클러스터 점검의 전송 로직을 최적화하는 데 쓰입니다.

```yaml
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```

### 클러스터 점검
클러스터 점검으로 [커스텀 에이전트 점검][6]을 실행하는 것이 지원됩니다. 단, 모든 노드 기반 에이전트가 점검을 실행할 수 있어야 합니다. 즉, 커스텀 점검 코드는 다음이어야 합니다.

- `clusterchecks` 설정 프로바이더를 사용하는 경우 모든 노드 기반 에이전트에 설치해야 합니다.
- 모든 에이전트에 액세스할 수 없는 로컬 리소스에 의존해선 안 됩니다.

## 설정 점검 설정하기

### 설정 파일의 설정

제공된 리소스의 URL 또는 IP가 항수인 경우(예: 외부 서비스 엔드포인트 또는 공개 URL), 고정 설정은 YAML 파일로 클러스터 에이전트로 전달됩니다. 파일 이름 명명 규칙과 구문은 노드 기반 에이전트의 고정 설정과 동일합니다. 필수로 `cluster_check: true` 줄을 추가해야 합니다.

클러스터 에이전트 v1.18.0 이상에서는 점검 설정에서 `advanced_ad_identifiers`와  [자동탐지 템플릿 변수][7]를 사용하여 쿠버네티스(Kubernetes) 서비스를 대상으로 할 수 있습니다([예시 참조][8]).

{{< tabs >}}
{{% tab "Helm" %}}
Helm을 사용하면 이러한 설정 파일이 `clusterAgent.confd` 섹션 내에 생성됩니다.

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      init_config:
        - <INIT_CONFIG>
      instances:
        - <INSTANCES_CONFIG>
```

**참고**: 파일이 노드 기반 에이전트에 생성되는 `datadog.confd` 섹션과는 별도입니다. `<INTEGRATION_NAME>`은 실행하려는 대상 통합 점검과 정확히 일치해야 합니다.

{{% /tab %}}
{{% tab "Operator" %}}
Datadog 연산자를 사용하면 이러한 설정 파일은 `spec.override.clusterAgent.extraConfd.configDataMap` 섹션 내에서 생성될 수 있습니다.

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            init_config:
              - <INIT_CONFIG>
            instances:
              - <INSTANCES_CONFIG>
```

대신 ConfigMap을 생성하여 고정 설정 파일을 저장하고 `spec.override.clusterAgent.extraConfd.configMap` 필드를 사용해 이 ConfigMap을 클러스터 에이전트에 마운트할 수 있습니다.

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configMap:
          name: "<NAME>-config-map"
          items:
            - key: <INTEGRATION_NAME>-config
              path: <INTEGRATION_NAME>.yaml
```

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
data:
  <INTEGRATION_NAME>-config: |-
    cluster_check: true
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
수동 접근 방식을 사용하는 경우 원하는 고정 설정 파일을 저장할 ConfigMap을 생성해야 합니다. 그런 다음 클러스터 에이전트 컨테이너의 해당하는 `/conf.d` 파일에 이 ConfigMap을 마운트합니다. [에이전트 컨테이너에 ConfigMaps 마운트하기]와 동일한 접근 방식을 따릅니다. 예: 

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
data:
  <INTEGRATION_NAME>-config: |-
    cluster_check: true
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

그런 다음 클러스터 에이전트의 구축 매니페스트에서 `ConfigMap`에 해당되는 `volumeMounts` 및 `volumes`과 대응되는 데이터 키를 정의합니다.

```yaml
        volumeMounts:
          - name: <NAME>-config-map
            mountPath: /conf.d/
            # (...)
      volumes:
        - name: <NAME>-config-map
          configMap:
            name: <NAME>-config-map
            items:
              - key: <INTEGRATION_NAME>-config
                path: <INTEGRATION_NAME>.yaml
          #(...)
```
통합에 해당되는 클러스터 에이전트 `/conf.d/` 디렉터리에 파일이 생성됩니다. 예: `/conf.d/mysql.yaml` 또는 `/conf.d/http_check.yaml`


[1]: /ko/agent/kubernetes/integrations/?tab=configmap#configuration
{{% /tab %}}
{{< /tabs >}}

#### 예; 외부 호스트된 데이터베이스의 MySQL 점검

CloudSQL 또는 RDS 등 외부 호스트된 데이터베이스와 데이터베이스에 액세스할 [Datadog 사용자][9]를 설정한 후 다음 콘텐츠를 포함하는 클러스터 에이전트 컨테이너에 `/conf.d/mysql.yaml` 파일을 마운트합니다.

```yaml
cluster_check: true
init_config:
instances:
    - server: "<PRIVATE_IP_ADDRESS>"
      port: 3306
      user: datadog
      pass: "<YOUR_CHOSEN_PASSWORD>"
```

#### 예:  외부 URL에서 HTTP_점검

클러스터당 1회 [HTTP 점검][10]을 수행하려는 URL이 있는 경우 다음 콘텐츠를 포하하는 클러스터 에이전트 컨테이너에 `/conf.d/http_check.yaml` 파일을 마운트합니다.

```yaml
cluster_check: true
init_config:
instances:
    - name: "<EXAMPLE_NAME>"
      url: "<EXAMPLE_URL>"
```

#### 예: 쿠버네티스(Kubernetes) 서비스에서 HTTP_점검
클러스터당 1회 [HTTP 점검][10]을 수행하려는 쿠버네티스(Kubernetes) 서비스가 있는 경우 

{{< tabs >}}
{{% tab "Helm" %}}
점검 설정을 규정하기 위해 `clusterAgent.confd` 필드를 사용합니다.

```yaml
#(...)
clusterAgent:
  confd:
    http_check.yaml: |-
      advanced_ad_identifiers:
        - kube_service:
            name: "<SERVICE_NAME>"
            namespace: "<SERVICE_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{% tab "Operator" %}}
`spec.override.clusterAgent.extraConfd.configDataMap` 필드를 사용해 점검 설정을 정의합니다.

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          http_check.yaml: |-
            advanced_ad_identifiers:
              - kube_service:
                  name: "<SERVICE_NAME>"
                  namespace: "<SERVICE_NAMESPACE>"
            cluster_check: true
            init_config:
            instances:
              - url: "http://%%host%%"
                name: "<EXAMPLE_NAME>"
```
{{% /tab %}}
{{% tab "DaemonSet" %}}
다음 콘텐츠를 사용하여 클러스터 에이전트 컨테이너에 `/conf.d/http_check.yaml` 파일을 설치합니다.

```yaml
advanced_ad_identifiers:
  - kube_service:
      name: "<SERVICE_NAME>"
      namespace: "<SERVICE_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{< /tabs >}}

**참고**: 필드 `advanced_ad_identifiers`는 Datadog 클러스터 에이전트 v1.18+에서 지원됩니다.

### 쿠버네티스 서비스 주석을 이용한 설정

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

주석을 추가하는 서비스 구문은 [쿠버네티스 파드 주석 달기][10]와 유사합니다.

```yaml
ad.datadoghq.com/service.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
```

이 시스템은 `%%host%%` [템플릿 변수][11]를 지원합니다. 변수는 서비스 IP로 대체되며, `kube_namespace` 및 `kube_service` 태그가 자동으로 인스턴스에 추가됩니다.

#### 예: NGINX 기반 서비스에서 HTTP 점검

다음 서비스 정의는 `my-nginx` 배포에서 포드를 노출시키고 [HTTP 점검][10]을 실행하여 로드 밸런스 서비스의 지연을 측정합니다.

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
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
                "url":"http://%%host%%",
                "name":"My Nginx",
                "timeout":1
              }
            ]
          }
        }
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

또한 각 포드는 집계 서비스와 각 작업자 모니터링을 활성화하므로 [NGINX 점검][12]을 사용해 모니터링해야 합니다.

[1]: /ko/agent/kubernetes/integrations/
[10]: /ko/integrations/http_check/
[11]: /ko/agent/faq/template_variables/
[12]: /ko/integrations/nginx/
{{< /tabs >}}

{{% tab "Kubernetes (AD v1)" %}}

주석을 추가하는 서비스 구문은 [쿠버네티스 파드 주석 달기][10]와 유사합니다.

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

이 시스템은 `%%host%%` [템플릿 변수][11]를 지원합니다. 변수는 서비스 IP로 대체되며, `kube_namespace` 및 `kube_service` 태그가 자동으로 인스턴스에 추가됩니다.

#### 예: NGINX 기반 서비스에서 HTTP 점검

다음 서비스 정의는 `my-nginx` 배포에서 포드를 노출시키고 [HTTP 점검][10]을 실행하여 로드 밸런스 서비스의 지연을 측정합니다.

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

또한 각 포드는 집계 서비스와 각 작업자 모니터링을 활성화하므로 [NGINX 점검][12]을 사용해 모니터링해야 합니다.

[1]: /ko/agent/kubernetes/integrations/
[10]: /ko/integrations/http_check/
[11]: /ko/agent/faq/template_variables/
[12]: /ko/integrations/nginx/

{{% /tab %}}
{{< /tabs >}}

## 검증

Datadog 클러스터 에이전트는 각 클러스터 점검을 노드 에이전트로 전송하여 실행합니다. [Datadog 클러스터 에이전트 `clusterchecks` 하위 명령][13]을 실행하고 노드 에이전트의 호스트 이름 아래에서 점검 이름을 찾습니다. 

```
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
(...)
===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

이제 [노드 에이전트의 `status` 하위 명령][14]을 실행하고 점검 섹션 아래에서 점검 이름을 찾습니다.

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/integrations/
[2]: /ko/agent/cluster_agent/
[3]: /ko/agent/cluster_agent/clusterchecksrunner?tab=helm
[4]: /ko/agent/cluster_agent/clusterchecksrunner?tab=operator
[5]: /ko/containers/guide/clustercheckrunners
[6]: /ko/developers/custom_checks/write_agent_check/
[7]: /ko/agent/guide/template_variables/
[8]: /ko/agent/cluster_agent/clusterchecks/#example-http_check-on-a-kubernetes-service
[9]: /ko/integrations/mysql/
[10]: /ko/integrations/http_check/
[11]: /ko/agent/faq/template_variables/
[12]: /ko/integrations/nginx/
[13]: /ko/containers/cluster_agent/troubleshooting/#dispatching-logic-in-the-cluster-agent
[14]: /ko/containers/cluster_agent/commands/#cluster-agent-commands
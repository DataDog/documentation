---
categories:
- aws
- cloud
- 로그 수집
- 네트워크
- 추적
creates_events: false
dependencies: []
description: AWS App Mesh는 오픈 소스 엣지이자 서비스 프록시입니다.
display_name: AWS  App Mesh
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/envoy/
  tag: 설명서
  text: Envoy 통합
git_integration_title: amazon_app_mesh
guid: 04669673-120b-48c9-a855-06d57d92c7cf
integration_id: amazon-app-mesh
integration_title: AWS App Mesh
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.stats.overflow
name: amazon_app_mesh
public_title: Datadog-AWS App Mesh 통합
short_description: AWS App Mesh는 오픈 소스 엣지이자 서비스 프록시입니다.
support: 코어
supported_os:
- linux
- mac_os
- windows
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

[AWS App Mesh][1]는 Amazon ECS Fargate나 AWS EKS 클러스터에서 실행 중인 마이크로 서비스에 애플리케이션 수준 네트워킹을 제공하는 서비스 메시입니다.


## 설정

{{< tabs >}}
{{% tab "EKS" %}}

아래 지침에 따라 AWS App Mesh 프록시 사이드카인 Envoy에서 메트릭 수집을 활성화하세요. 사용자는 배포, 나중에 배포 패치, 또는 AWS APP Mesh 인젝터 사용의 세 가지 모드 중 하나를 선택해 사이드카를 추가할 수 있습니다. 이 세 가지 모두 다음 단계에서 지원됩니다.

#### 메트릭 수집

**사전 요구 사항**: 쿠버네티스 클러스터에서 [EKS 통합][1] 설명서에 따라 Datadog 에이전트를 DaemonSet로 배포하세요.

1. App Mesh에는 제한 사항이 있어 EKS에서 Datadog로 메트릭을 전송할 때 Egress 필터를 `Allow External Traffic`로 설정해야 합니다.

2. 클러스터에 ConfigMap을 생성해 각 Pod에 추가된 App Mesh의 Envoy 사이드카를 자동으로 찾을 수 있습니다.

    ```yaml
      apiVersion: v1
      kind: ConfigMap
      metadata:
      name: datadog-config
      data:
      envoy: |-
        ad_identifiers:
        - aws-appmesh-envoy
        init_config:
        instances:
        - stats_url: http://%%host%%:9901/stats
          tags:
            - <TAG_KEY>:<TAG_VALUE>  # Example - cluster:eks-appmesh
    ```

3. Datadog 에이전트의 DaemonSet YAML 파일에서 `volumeMounts` 개체를 업데이트하세요.

    ```yaml
          volumeMounts:
           - name: datadog-config
             mountPath: /conf.d
    ```

4. Datadog 에이전트의 DaemonSet YAML 파일에서 `volumes` 개체를 업데이트하세요.

    ```yaml
         volumes:
          - name: datadog-config
            configMap:
              name: datadog-config
              items:
              - key: envoy
                path: envoy.yaml
    ```

#### 로그 수집

{{< site-region region="us3" >}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

로그 수집을 활성화하려면 에이전트의 전용 [쿠버네티스 로그 수집 지침][1]에 따라 DaemonSet를 업데이트하세요.

[1]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### 트레이스 수집

`datadog-agent`와 서비스를 배포하려면 네임스페이스를 선택하세요(예: `monitoring`). appmesh-injector를 다음으로 배포하는 옵션에 이를 사용하세요.

    ```shell
      helm upgrade -i appmesh-controller eks/appmesh-controller \
      --namespace appmesh-system \
      --set sidecar.logLevel=debug \
      --set tracing.enabled=true \
      --set tracing.provider=datadog \
      --set tracing.address=ref:status.hostIP \
      --set tracing.port=8126
    ```


또는 [EKS와 App Mesh][2] 설명서에 따라 `enable-datadog-tracing=true` 옵션이나 환경 변수 `ENABLE_DATADOG_TRACING=true`를 사용해 앱메시 인젝터를 배포할 수도 있습니다.


[1]: https://docs.datadoghq.com/ko/integrations/amazon_eks/
[2]: https://github.com/aws/aws-app-mesh-examples/blob/master/walkthroughs/eks/base.md#install-app-mesh--kubernetes-components
{{% /tab %}}
{{% tab "ECS Fargate" %}}

#### 메트릭 수집

**사전 요구 사항**: [ECS Fargate 통합][1] 설명서에 따라 App Mesh를 활성화한 상태에서 각 Fargate 작업 정의에 Datadog 에이전트를 추가하세요(예: 사이드카가 삽입된 Envoy).

1. App Mesh에는 제한 사항이 있어 ECS 작업에서 Datadog로 메트릭을 전송할 때 Egress 필터를 `Allow External Traffic`로 설정해야 합니다.

2. Envoy 사이드카와 다음 Docker 레이블이 있는 Datadog 에이전트를 포함한 모든 작업 정의를 업데이트하세요. 자세한 내용은 [ECS Fargate 통합 설정][2]을 참고하세요.

    ```text
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### 로그 수집

{{< site-region region="us3" >}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

[ECS Fargate 통합 설명서][1]에 안내된 지침에 따라 로그 수집을 활성화합니다.

[1]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/#log-collection

{{< /site-region >}}

#### 트레이스 수집

1. [ECS Fargate 통합][3] 설명서에 안내된 지침에 따라 트레이스 수집을 활성화합니다.

ECS Fargate 작업 정의에서 AWS App Mesh 파라미터인 `ENABLE_ENVOY_DATADOG_TRACING`과 `DATADOG_TRACER_PORT`를 환경 변수로 설정합니다. 자세한 내용은 [AWS App Mesh][4] 설명서를 참고하세요


[1]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/
[2]: https://docs.datadoghq.com/ko/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{% tab "ECS EC2" %}}

#### 메트릭 수집

**사전 요구 사항**: [ECS Fargate 통합][1] 설명서에 따라 App Mesh를 활성화한 상태에서 각 ECS EC2 작업 정의에 Datadog 에이전트를 추가하세요(예: 사이드카가 삽입된 Envoy).

1. App Mesh에는 제한 사항이 있어 ECS 작업에서 Datadog로 메트릭을 전송할 때 Egress 필터를 `Allow External Traffic`로 설정해야 합니다.

2. Envoy 사이드카와 다음 Docker 레이블이 있는 Datadog 에이전트를 포함한 모든 작업 정의를 업데이트합니다. 자세한 내용은 [ECS Fargate 통합 설정][2]을 참고하세요.

    ```text
        "dockerLabels": {
              com.datadoghq.ad.instances : [{"stats_url": "http://%%host%%:9901/stats"}]
              com.datadoghq.ad.check_names : ["envoy"]
              com.datadoghq.ad.init_configs : [{}]
            },
    ```

#### 로그 수집

{{< site-region region="us3" >}}

로그 수집은 이 사이트에서 지원되지 않습니다.

{{< /site-region >}}

{{< site-region region="us,eu,gov" >}}

[ECS 통합 설명서][1]에 안내된 지침에 따라 로그 수집을 활성화합니다.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_ecs/#log-collection

{{< /site-region >}}

#### 트레이스 수집

1. [ECS 통합][3] 설명서에 안내된 지침에 따라 트레이스 수집을 활성화합니다.

2. ECS 작업 정의에서 AWS App Mesh 파라미터인 `ENABLE_ENVOY_DATADOG_TRACING`과 `DATADOG_TRACER_PORT`를 환경 변수로 설정합니다. 자세한 내용은 [AWS App Mesh][4] 설명서를 참고하세요


[1]: https://docs.datadoghq.com/ko/integrations/amazon_ecs/
[2]: https://docs.datadoghq.com/ko/integrations/faq/integration-setup-ecs-fargate/
[3]: https://docs.datadoghq.com/ko/integrations/amazon_ecs/#trace-collection
[4]: https://docs.aws.amazon.com/app-mesh/latest/userguide/envoy.html
{{% /tab %}}
{{< /tabs >}}

## 수집한 데이터

### 메트릭

메트릭 목록을 보려면 [Envoy 통합][2]을 참고하세요.

### 이벤트

AWS App Mesh 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

AWS App Mesh 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/app-mesh
[2]: https://docs.datadoghq.com/ko/integrations/envoy/#metrics
[3]: https://docs.datadoghq.com/ko/help/
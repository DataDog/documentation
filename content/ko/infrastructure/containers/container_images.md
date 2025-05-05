---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: 블로그
  text: Datadog 컨테이너 모니터링의 컨테이너 이미지로 트러블슈팅 워크플로우 보강하기
- link: /security/cloud_security_management/vulnerabilities
  tag: 설명서
  text: 클라우드 보안 관리 취약점
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: 설명서
  text: 컨테이너 이미지 취약점 설정
- link: /security/cloud_security_management/troubleshooting/vulnerabilities/
  tag: 설명서
  text: 클라우드 보안 관리 취약점 트러블슈팅
title: 컨테이너 이미지 보기
---

## 개요

Datadog의 [컨테이너 이미지 보기][1]는 환경에 사용된 모든 이미지에 관한 주요 인사이트를 제공하여 배포 풋프린트를 평가합니다. 아울러, 여러 컨테이너에 영향을 미칠 수 있는 보안 및 성능 문제를 감지 및 해결합니다. 나머지 컨테이너 데이터와 같이 컨테이너 이미지 세부 정보를 확인하여 인프라스트럭처 서비스 상태에 영향을 미치는 이미지 문제를 해결할 수 있습니다. 또한, 컨테이너 이미지에서 발견된 취약점을 [클라우드 보안 관리][2](CSM)에서 확인하여 보안 유지 노력을 간소화할 수 있도록 도와드립니다.

{{< img src="security/vulnerabilities/container_images.png" alt="취약점과 컨테이너 컬럼 정렬 기능을 강조 표시한 컨테이너 이미지 보기" width="100%">}}

[컨테이너 이미지 트렌드 보기][9] 기능은 컨테이너화된 인프라스트럭처의 모든 이미지에 대한 수준 높은 인사이트를 제공합니다. 컨테이너 이미지 트렌드 메트릭스는 몇 주 또는 몇 달 동안의 보안 상태 및 배포 풋프린트에 대한 주요 질문에 답을 얻을 수 있도록 도와드립니다.

{{< img src="infrastructure/containerimages/container_image_trends.png" alt="이미지 사이즈, 이미지 수명, 취약점, 실행 중인 컨테이너 카운트 메트릭이 강조 표시된 이미지 트렌드 보기" width="100%">}}

## 컨테이너 이미지 보기 설정

컨테이너 이미지 보기의 이미지는 여러 소스(실시간 컨테이너, 이미지 컬렉션 및 Amazon ECR)에서 수집됩니다. 다음 지침에서는 이러한 각 소스의 이미지를 활성화하는 방법을 설명합니다.

### 실시간 컨테이너

실시간 컨테이너 수집을 활성화하려면 [컨테이너][3] 문서를 참조하세요. 본 문서에서는 프로세스 에이전트를 활성화하고 컨테이너를 제외 및 포함하는 방법을 설명합니다.

### 이미지 수집

Datadog은 컨테이너 이미지 메타데이터를 수집하여 관련 컨테이너 및 [클라우드 보안 관리][8](CSM) 취약성에 대한 향상된 디버깅 컨텍스트를 제공해 드립니다.

#### 컨테이너 이미지 수집 활성화

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

Datadog 오퍼레이터 v1.3.0+의 경우 이미지 수집이 기본적으로 활성화되어 있습니다. 이전 버전의 Datadog 오퍼레이터를 사용한다면 Datadog은 v1.3.0+로 업데이트할 것을 권장합니다.


{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Datadog Helm 차트 v3.46.0 이상에서 이미지 수집은 [기본적으로 활성화][1]되어 있습니다. 이를 확인해야 하거나 이전 Helm 차트 버전을 사용하는 경우, `datadog-values.yaml`에서 `datadog.containerImageCollection.enabled`가 `true`로 설정되어 있는지 확인하세요.

```yaml
datadog:
  containerImageCollection:
    enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

[ECS EC2 인스턴스][1]에서 컨테이너 이미지 수집을 활성화하려면 `datadog-agent` 컨테이너 정의에 다음 환경 변수를 추가합니다.

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

[1]: https://docs.datadoghq.com/ko/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

`datadog.yaml` 설정 파일에 다음을 추가합니다.

```yaml
container_image:
  enabled: true
```

[1]: /ko/containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

#### SBOM 수집 활성화

다음 지침에 따라 CSM 취약점에 대한 [소프트웨어 자재 명세서][5](SBOM) 수집을 활성화합니다. SBOM 수집을 사용하면 컨테이너 이미지 취약점을 자동으로 탐지할 수 있습니다. 컨테이너의 취약점이 매시간 평가 및 스캔됩니다. 컨테이너 이미지에 대한 취약성 관리 기능은 [CSM Pro 및 Enterprise 플랜][10]에 포함되어 있습니다.

**참고**: CSM 취약성 기능은 AWS Fargate 또는 윈도우즈 환경에서 사용할 수 없습니다.

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

`datadog-agent.yaml` 파일의 사양 섹션에 다음을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    # ...
    sbom:
      enabled: true
      containerImage:
        enabled: true
      host:
        enabled: true
```

{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

`datadog-values.yaml` Helm 설정 파일에 다음을 추가합니다.

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    host:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

[ECS EC2 인스턴스][1]에서 컨테이너 이미지 취약성을 스캔하려면 `datadog-agent` 컨테이너 정의에 다음 환경 변수를 추가합니다.

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_HOST_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

에이전트가 컨테이너 이미지에서 SBOM을 추출하지 못하면 다음과 같이 컨테이너 정의에서 에이전트 메모리를 늘립니다.

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```
[1]: https://docs.datadoghq.com/ko/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

`datadog.yaml` 설정 파일에 다음을 추가합니다.

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
  host:
    enabled: true
```

[1]: /ko/containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

### 컨테이너 레지스트리

#### Amazon Elastic 컨테이너 레지스트리(Amazon ECR)

[AWS 통합][4]을 설정하여 Amazon ECR에서 컨테이너 이미지 메타데이터 크롤링을 시작합니다.

## 컨테이너 이미지 트렌드 설정

컨테이너 이미지 트렌드 설정 모달을 사용하고 **컨테이너 이미지 메트릭 수집**을 활성화하여 이미지 메트릭을 생성합니다.

이미지 메트릭은 [실시간 컨테이너](#live-containers) 및 [이미지 점검](#image-collection) 소스에서 수집됩니다. 위와 동일한 지침에 따라 인프라스트럭처 전반에 해당 수집이 활성화되어 있는지 확인하여 트렌드 보기의 이점을 최대한 활용하세요.

{{< img src="infrastructure/containerimages/container_image_trends_configuration_modal.png" alt="컨테이너 이미지 트렌드 설정 모달" width="100%">}}

## 컨테이너 이미지 태깅

에이전트에서 [레이블을 태그][6]로 추출 설정을 사용하여 컨테이너 이미지를 임의의 태그로 보강 및 태깅합니다. 해당 태그는 컨테이너 이미지 점검으로 선택합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/container-images
[2]: /ko/security/cloud_security_management
[3]: /ko/infrastructure/containers/?tab=docker#setup
[4]: /ko/integrations/amazon_web_services/
[5]: https://www.cisa.gov/sbom
[6]: /ko/containers/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[8]: /ko/security/cloud_security_management/vulnerabilities
[9]: https://app.datadoghq.com/container-images/image-trends
[10]: https://www.datadoghq.com/pricing/?product=cloud-security-management#products
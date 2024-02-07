---
aliases:
- /ko/agent/autodiscovery/ad_identifiers
- /ko/agent/guide/ad_identifiers
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 컨테이너에 Agent 자동탐지를 포함하도록 관리하기
kind: 도움말
title: 자동탐지 컨테이너 식별자
---

자동탐지 컨테이너 식별자 또는 `ad_identifiers`를 사용하면 컨테이너 이미지 이름을 사용하거나 커스텀 자동탐지 컨테이너 식별자를 사용하여 지정된 컨테이너에 자동탐지 구성 파일 템플릿을 적용할 수 있습니다.

자동탐지 설정이 커스텀 설정 파일 내에 정의되어 있더라도 `env`, `service` 및 `version` 태그 지정을 위해 표준 라벨을 사용할 수 있습니다. 컨테이너에 이러한 라벨을 설정하는 방법은 [통합 서비스 태깅][1]을 참조하세요.

**참고**: 키 값 저장소, Docker 라벨 또는 Kubernetes 파드 어노테이션을 포함한 다른 설정 유형은 통합 설정 템플릿을 해당 컨테이너에 일치시키는 다른 방법을 사용합니다. 이러한 설정 유형의 경우 통합 설정 템플릿과 컨테이너 간의 매칭은 키 값 저장소, 라벨 또는 어노테이션에 포함된 `<CONTAINER_IDENTIFIER>`을 기반으로 합니다.

## 컨테이너 이미지 이름

다음 자동탐지 설정 템플릿을 지정된 컨테이너에 적용하려면 컨테이너 이미지의 짧은 이름을 `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`과 같이 사용합니다.

```yaml
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

**예**: 다음 Apache 자동탐지 설정 템플릿은 `httpd`라는 이름의  컨테이너 이미지에 적용됩니다:

```yaml
ad_identifiers:
  - httpd
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

호스트의 **모든** `httpd` 컨테이너 이미지와 일치합니다. 하나의 컨테이너가 `foo/httpd:latest`를 실행 중이고 다른 컨테이너가 `bar/httpd:v2`를 실행 중인 경우 Agent는 위 템플릿을 두 컨테이너 모두에 적용합니다.

짧은 이미지 이름을 자동탐지 컨테이너 식별자로 사용하는 경우 Agent는 다른 소스 또는 다른 태그의 동일한 이름의 이미지를 구별할 수 없습니다.

### 여러 개의 식별자

`ad_identifiers` 목록에 추가해 여러 개의 이미지 이름을 지정하세요. 예를 들면 다음과 같습니다.

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## 커스텀 자동탐지 컨테이너 식별자

동일한 이미지를 실행하는 컨테이너에 서로 다른 자동탐지 설정 템플릿을 적용하려면 `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`로 제공할 커스텀 값을 선택합니다. 그런 다음 이 커스텀 값이 포함된 컨테이너에 Docker 라벨 또는 Kubernetes 어노테이션을 적용합니다.

**예시**: 다음 Apache 자동탐지 설정 템플릿은 커스텀 이름 `foo`를 사용해 컨테이너 이미지를 지정합니다:

```yaml
ad_identifiers:
  - foo
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

그런 다음 Docker 라벨 또는 Kubernetes 어노테이션을 적용하여 컨테이너를 `foo`과 같이 식별합니다:

{{< tabs >}}
{{% tab "Docker 라벨" %}}

```yaml
com.datadoghq.ad.check.id: foo
```

**참고**: 이미지 이름보다 `com.datadoghq.ad.check.id` 라벨이 우선됩니다.

{{% /tab %}}
{{% tab "Kubernetes 어노테이션" %}}

```text
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

`<CONTAINER_IDENTIFIER>`을 파드 내의 컨테이너 이름으로 대체합니다.

**참고**: Datadog Agent  v6.25+ 및 v7.25에서 지원됩니다. `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id` 라벨은 이미지 이름보다 우선합니다.
{{% /tab %}}
{{< /tabs >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
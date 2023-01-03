---
aliases:
- /kr/agent/autodiscovery/ad_identifiers
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 컨테이너에 에이전트 자동탐지를 포함하도록 관리하기
kind: 설명서
title: 자동탐지 컨테이너 식별자
---

자동탐지 컨테이너 식별자(`ad_identifiers`)를 사용하면 자동탐지 설정 파일 템플릿을 특정 컨테이너에 적용할 수 있습니다.  [컨테이너 숏 이미지](#short-image-container-identifiers) 또는 [커스텀 자동탐지 컨테이너 식별자](#custom-autodiscovery-container-identifiers)를 활용하면 됩니다.

**참조**: 기타 설정 유형(키값 저장, 도커(Docker) 라벨, 쿠버네티스(Kubernetes) 팟 어노테이션 등)의 경우 통합 설정 템플릿과 상응하는 컨테이너를 매치할 때 키값 저장, 라벨 또는 어노테이션 설정에 포함된 `<CONTAINER_IDENTIFIER>`를 기준으로 합니다.

## 숏 이미지 컨테이너 식별자

다음의 자동탐지 설정 템플릿을 특정 컨테이너에 적용하려면 `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`라고 명명된 **컨테이너 숏 이미지**를 사용하세요.

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

예를 들어 Agent에서 다음의 Apache 자동탐지 설정 템플릿을 사용할 수 있습니다.

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

이는 포스트 상의 **모든** `httpd` 컨테이너 이미지와 매치됩니다. `library/httpd:latest`를 실행 중인 컨테이너가 하나, `<WHATEVER>/httpd:v2`를 실행 중인 컨테이너가 하나 있다고 가정해보세요. Agent는 위의 템플릿을 두 컨테이너 모두에 적용합니다. `library/httpd:latest`가 아닌, `httpd` 같은 형식으로 컨테이너 이미지의 숏 네임을 사용했기 때문입니다.

자동탐지 컨테이너 식별자로 숏 이미지를 사용할 때, **소스나 태그가 다르지만 이름이 동일한 이미지가 여러 개 있는 경우 Agent에서 구분하지 못하니 주의하시기 바랍니다**.

## 표준 라벨에서 태그 추가하기

커스텀 설정 파일로 자동탐지 설정을 정의했더라도 태깅 표준 라벨(`env`, `service`, `version`)을 함께 사용할 수 있습니다.

이러한 라벨을 컨테이너에 설정하는 방법을 자세히 알아보려면 [통합 서비스 태깅][1] 페이지를 참조하세요.

### 여러 개의 식별자

`ad_identifiers` 목록에 추가해 여러 이미지 이름을 특정하세요. 예를 들면 다음과 같습니다.

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## 커스텀 자동탐지 컨테이너 식별자

동일한 이미지를 실행 중인 컨테이너에 다양한 자동탐지 설정 템플릿을 적용하려면 커스텀 값 `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`를 사용하고, `com.datadoghq.ad.check.id` 라벨과 함께 적용해 컨테이너를 식별하세요. 다음의 설정 파일을 사용하면 됩니다.

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

다음 라벨을 추가해 자동탐지 설정 템플릿을 특정 컨테이너에 적용하세요.

```text
com.datadoghq.ad.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

**참조**: 이미지/이름보다 `com.datadoghq.ad.check.id` 라벨이 우선합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/getting_started/tagging/unified_service_tagging
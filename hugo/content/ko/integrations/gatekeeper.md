---
app_id: gatekeeper
app_uuid: 9c48b05d-ee74-4557-818e-14456c6f427b
assets:
  dashboards:
    Gatekeeper base dashboard: assets/dashboards/gatekeeper_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gatekeeper.constraints
      metadata_path: metadata.csv
      prefix: gatekeeper.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10148
    source_type_name: Gatekeeper
  logs:
    source: gatekeeper
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: ara.pulido@datadoghq.com
  support_email: ara.pulido@datadoghq.com
categories:
- cloud
- 준수
- 설정 및 배포
- 컨테이너
- 보안
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/README.md
display_on_public_website: true
draft: false
git_integration_title: gatekeeper
integration_id: gatekeeper
integration_title: Gatekeeper
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: gatekeeper
public_title: Gatekeeper
short_description: Gatekeeper 통합
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Compliance
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Security
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Gatekeeper 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gatekeeper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

이 점검에서는 [OPA Gatekeepr][1]에서 메트릭을 수집합니다.

![Gatekeeper 개요 대시보드][2]

## 설정

아래 지침을 따라 쿠버네티스 클러스터에서 실행되는 에이전트에 이 점검을 설치하고 설정하세요. 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][3]을 참고하세요.

### 설치

#### 에이전트 버전 >=7.26.0 또는 >=6.26.0

Docker 에이전트를 사용하는 `integrations-extra`에서 통합을 사용하려면 통합을 설치한 상태에서 에이전트를 구축하기를 권고합니다. 다음 Dockerfile을 사용해 `integrations-extras`에서 `gatekeeper` 통합을 포함하고 업데이트된 에이전트를 구축하세요.

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-gatekeeper==<INTEGRATION_VERSION>
```

#### 에이전트 버전 <7.26.0 또는 <6.26.0

쿠버네티스 클러스터에서 gatekeeper 점검 설치하는 방법:

1. [개발자 툴킷][4]을 설치합니다.
2. `integrations-extras` 리포지토리를 복제합니다.

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `integrations-extras/` 경로로 `ddev` config을 업데이트합니다.

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `gatekeeper` 패키지를 구축하려면 다음을 실행하세요.

   ```shell
   ddev -e release build gatekeeper
   ```

5. [에이전트 매니페스트를 다운로드해 Datadog 에이전트를 DaemonSet으로 설치][5]합니다.
6. `PersistentVolumeClaim`을 두 개 생성합니다. 하나는 점검 코드용, 다른 하나는 구성용입니다.
7. 생성한 두 파일을 에이전트 포드 템플릿에 볼륨으로 추가하고 내 점검과 구성에 사용하세요.

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

8. Datadog 에이전트를 쿠버네티스 클러스터에 배포합니다.

   ```shell
   kubectl apply -f agent.yaml
   ```

9. 통합 아티팩트 .whl 파일을 내 쿠버네티스 노드에 복사하거나 공용 URL에 업로드합니다.

10. 다음 명령을 실행해 통합 에이전트와 통합 휠을 설치하세요.

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_GATEKEEPER_ARTIFACT_>/<GATEKEEPER_ARTIFACT_NAME>.whl
    ```

11. 다음 명령을 실행해 점검과 구성을 복사해 해당 PVC로 붙여넣으세요.

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Datadog 에이전트 포드를 재시작하세요.

### 구성

1. 에이전트 포드에 추가한 `/confd` 폴더에 있는 `gatekeeper/conf.yaml` 파일을 편집해 gatekeeper 성능 데이터 수집을 시작하세요. 사용할 수 있는 구성 옵션을 모두 보려면 [샘플 gatekeeper/conf.yaml][6]을 참고하세요.

2. [에이전트를 다시 시작][7]합니다.

### 검증

[에이전트 상태 하위 명령을 실행][8]하고 Checks 섹션 아래 `gatekeeper`를 찾으세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "gatekeeper" >}}


### 이벤트

Gatekeeper에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "gatekeeper" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.


[1]: https://github.com/open-policy-agent/gatekeeper
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gatekeeper/images/gatekeeper_dashboard.png
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ko/developers/integrations/python/
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile
[6]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/assets/service_checks.json
[11]: https://docs.datadoghq.com/ko/help/
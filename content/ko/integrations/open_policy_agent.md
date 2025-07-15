---
app_id: open-policy-agent
app_uuid: 98c54837-27eb-48ca-9780-29bb593eecb8
assets:
  dashboards:
    OPA base dashboard: assets/dashboards/open_policy_agent_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: open_policy_agent.policies
      metadata_path: metadata.csv
      prefix: open_policy_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10142
    source_type_name: open_policy_agent
  logs:
    source: opa
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 커뮤니티
  sales_email: ara.pulido@datadoghq.com
  support_email: ara.pulido@datadoghq.com
categories:
- compliance
- 설정 및 배포
- 컨테이너
- 로그 수집
- security
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/README.md
display_on_public_website: true
draft: false
git_integration_title: open_policy_agent
integration_id: open-policy-agent
integration_title: Open Policy Agent
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: open_policy_agent
public_title: Open Policy Agent
short_description: OPA 통합
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Compliance
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: OPA 통합
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Open Policy Agent
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

본 점검은 [Open Policy Agent][1]에서 메트릭을 수집합니다.

## 설정

아래 지침을 따라 쿠버네티스 클러스터에서 실행되는 에이전트에 이 점검을 설치하고 설정하세요. 지침을 적용하는 데 가이드가 필요하면 [자동탐지 통합 템플릿][2]을 참고하세요.

### 설치

다음과 같이 쿠버네티스(Kubernetes) 클러스터에서 open_policy_agent 점검을 설치합니다.

1. [개발자 툴킷][3]을 설치합니다.
2. `integrations-extras` 리포지토리를 복제합니다.

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `integrations-extras/` 경로로 `ddev` config을 업데이트합니다.

   ```shell
   ddev config set repos.extras ./integrations-extras
   ```

4. `open_policy_agent` 패키지를 빌드하려면 다음을 실행합니다.

   ```shell
   ddev -e release build open_policy_agent
   ```

5. [에이전트 매니페스트를 다운로드해 Datadog 에이전트를 DaemonSet으로 설치][4]합니다.
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

8. Datadog 에이전트를 쿠버네티스(Kubernetes) 클러스터에 배포합니다.

   ```shell
   kubectl apply -f agent.yaml
   ```

9. 통합 아티팩트 .whl 파일을 내 쿠버네티스(Kubernetes) 노드에 복사하거나 공용 URL에 업로드합니다.

10. 다음 명령을 실행해 통합 에이전트와 통합 휠을 설치하세요.

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_OPEN_POLICY_AGENT_ARTIFACT_>/<OPEN_POLICY_AGENT_ARTIFACT_NAME>.whl
    ```

11. 다음 명령을 실행해 점검과 구성을 복사해 해당 PVC로 붙여넣으세요.

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python2.7/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Datadog 에이전트 포드를 재시작하세요.

### 로그 생성 메트릭

기본 대시보드에는 `open_policy_agent.decisions` OPA 결정에 대한 메트릭과 연관된 그래프가 포함되어 있습니다. 본 메트릭은 OPA '결정 로그'에 기반하여 생성됩니다. 메트릭을 생성하고 대시보드의 해당 부분을 채우려면, Datadog의 신규 로그 생성 메트릭을 새로 만듭니다.

먼저, OPA 로그의 `msg` 필드에 대한 패싯을 생성합니다. 로그 엔트리의 "결정 로그" 유형에 대해서만 메트릭을 생성하기 때문입니다. 해당 작업을 하려면 OPA에서 수신하는 로그 엔트리 중 하나를 선택하고, `msg` 필드 근처의 엔진 로그를 클릭한 다음 "@msg에 대한 패싯 생성하기"를 선택합니다.

![메시지 패싯][5]

`input.request.kind.kind` 필드용 패싯 하나와`result.response.allowed` 필드용 패싯 하나, 이렇게 두 개의 패싯을 생성하고, 둘 다 "결정 로그" 로그 엔트리 유형에서 사용할 수 있습니다.

![유형 패싯][6]
![허용 패싯][7]

패싯을 생성한 다음 필요한 메트릭을 생성하여 대시보드를 완성합니다. "로그 -> 메트릭 생성" 메뉴를 클릭합니다. "새 메트릭 추가"를 클릭하고 다음 데이터로 양식을 채웁니다.

![OPA 결정 메트릭][8]

### 설정

1. 에이전트 포드에 추가한 `/confd` 폴더에 있는 `open_policy_agent/conf.yaml` 파일을 편집해 OPA 성능 데이터 수집을 시작하세요. 사용할 수 있는 설정 옵션을 모두 보려면 [open_policy_agent/conf.yaml 샘플][9]을 참고하세요.

2. [에이전트를 다시 시작합니다][10].

### 검증

[에이전트 상태 하위 명령][11]을 실행하고 점검 섹션에서 `open_policy_agent`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "open-policy-agent" >}}


### 이벤트

Open_policy_agent는 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "open-policy-agent" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.


[1]: https://www.openpolicyagent.org/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ko/developers/integrations/python/
[4]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/msg_facet.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/kind_facet.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/allowed_facet.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/metric.png
[9]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/datadog_checks/open_policy_agent/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help/
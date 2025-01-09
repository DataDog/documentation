---
aliases:
- /ko/network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
- link: /agent/cluster_agent
  tag: 설명서
  text: 쿠버네티스(Kubernetes)용 클러스터 에이전트
- link: /agent/cluster_agent/clusterchecks
  tag: 설명서
  text: 클러스터 점검
title: 클러스터 에이전트를 사용한 네트워크 장치 모니터링
---

쿠버네티스 환경에서는 클러스터 점검 소스로 네트워크 장치 모니터링(Network Device Monitoring, NDM)의 자동탐지 로직을 사용하도록 [Datadog 클러스터 에이전트][1](DCA)를 설정할 수 있습니다.

에이전트의 자동탐지와 DCA를 병용하면 확장이 가능해져, 대규모 장치를 모니터링할 수 있습니다.

## 설정

### 설치

1. [DCA][1]를 설치했는지 확인하세요.

2. Datadog Helm 저장소(리포지토리)를 추가하고 Datadog `helm-chart`를 사용하여 NDM 자동탐지에서 DCA를 설정합니다.

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. 다음으로 `datadog-monitoring`을 설치하고 [Datadog API 키][3]를 설정하세요.

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### 구성

`cluster-agent-values.yaml`의 예시는 다음과 같습니다.

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - 문자열 - 필수
  ## 에이전트를 실행하기 전에 이를 Datadog API 키로 설정하세요.
  ## ref: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
  #
  apiKey: <DATADOG_API_KEY>

  ## @param clusterName - 문자열 - 선택
  ## 고유 클러스터 이름을 설정해 손쉽게 호스트와 클러스터 점검 범위를 지정하세요. 
  ## 이름은 고유해야 하며, 문자열 마침표(dot)로 구분하는 토큰이어야 합니다. 여기서 토큰은 최대 40자까지 입력할 수 있고, 다음의 제약 사항을 따릅니다.
  ## * 영문 소문자, 숫자, 하이픈(-) 기호만 사용할 수 있습니다.
  ## * 영문자로 시작해야 합니다.
  ## * 숫자나 영문자로 끝나야 합니다.
  ## GKE 규칙과 비교했을 때, GKE에서 사용할 수 없던 위치에도 마침표를 입력할 수 있습니다.
  ## https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters#Cluster.FIELDS.name
  #
  clusterName: my-snmp-cluster

  ## @param clusterChecks - 개체 - 필수
  ## 클러스터 에이전트와 daemonset에서 클러스터 점검 기능을 활성화하세요
  ## 참조: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## Kube Service 어노테이션을 통한 자동탐지가 자동으로 활성화됩니다
  #
  clusterChecks:
    enabled: true

  ## @param 태그  - 키 목록:값 요소 - 선택
  ## 에이전트에서 수집한 메트릭, 이벤트, 서비스 점검에 추가할 태그 목록.
  ##
  ## 태깅에 대해 자세히 알아보기: https://docs.datadoghq.com/tagging/
  #
태그:
    - 'env:test-snmp-cluster-agent'

## @param clusterAgent - 개체 - 필수
## Datadog 클러스터 에이전트 구현 환경은 클러스터 전반의
## 메트릭을 더 깔끔하게 처리하고, 더 나은 RBAC를 제공합니다.
## 또한 외부 메트릭 API를 적용하여 Datadog 메트릭을 기반으로 HPA를 자동 확장하도록 해줍니다
## 참조: https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param 활성화됨 - 부울 - 필수
  ## 참(true)으로 설정해 Datadog 클러스터 에이전트 활성화합니다.
  #
  enabled: true

  ## @param confd - 개체 목록 - 선택
  ## 추가 클러스터 점검 설정을 제공합니다.
  ## 각 키는 /conf.d에서 파일이 됩니다.
  ## 참조: https://docs.datadoghq.com/agent/autodiscovery/
  #
  confd:
     # 정적 점검
     http_check.yaml: |-
       클러스터_점검: true
       인스턴스:
         - 이름: 'Check Example Site1'
           url: http://example.net
         - 이름: 'Check Example Site2'
           url: http://example.net
         - 이름: 'Check Example Site3'
           url: http://example.net
     # 인스턴스 설정을 위해 `snmp_listener`에 필요한 자동탐지 템플릿입니다. 
     snmp.yaml: |-
      cluster_check: true
      ad_identifiers:
        - snmp
      init_config:
      instances:
        -
          ## @param ip_주소 - 문자열 - 선택
          ## 장치 모니터링을 위한 IP 주소입니다.
          #
          ip_address: "%%host%%"

          ## @param 포트 - 정수 - 선택 - 기본값: 161
          ## 기본 SNMP 포트입니다.
          #
          port: "%%port%%"

          ## @param snmp_version - 정수 - 선택 - 기본값: 2
          ## SNMP v1 사용 시 snmp_버전을 1로 설정 (필수)
          ## SNMP v3 사용 시 snmp_버전을 3으로 설정(필수)
          #
          snmp_version: "%%extra_version%%"

          ## @param 시간 초과 - 정수 - 선택 - 기본값: 5
          ## 시간 초과 전까지의 초(시간).
          #
          timeout: "%%extra_timeout%%"

          ## @param 재시도 - 정수 - 선택 - 기본값: 5
          ## 실패 전 재시도 횟수입니다.
          #
          retries: "%%extra_retries%%"

          ## @param 커뮤니티_문자열 - 문자열 - 선택
          ## SNMP v1 & v2에만 사용됩니다.
          #
          community_string: "%%extra_community%%"

          ## @param 사용자 - 문자열 - 선택
          ## SNMP 장치 연결에 필요한 USERNAME입니다.
          #
          user: "%%extra_user%%"

          ## @param authKey - 문자열 - 선택
          ## 인증 유형과 함께 사용하는 인증 키입니다.
          #
          authKey: "%%extra_auth_key%%"

          ## @param authProtocol - 문자열 - 선택
          ## SNMP 장치 연결 시 사용되는 인증 유형입니다.
          ## 다음 중 하나: MD5, SHA, SHA224, SHA256, SHA384, SHA512.
          ## `authKey`가 지정된 경우 기본값은 MD5입니다.
          #
          authProtocol: "%%extra_auth_protocol%%"

          ## @param privKey - 문자열 - 선택
          ## 비공개 유형과 함께 사용하는 비공개 유형 키입니다.
          #
          privKey: "%%extra_priv_key%%"

          ## @param privProtocol - 문자열 - 선택
          ## SNMP 장치 연결 시 사용되는 비공개 유형입니다.
          ## 다음 중 하나: DES, 3DES, AES, AES192, AES256, AES192C, AES256C.
          ##  `privKey`가 지정된 경우 DES가 기본값입니다.
          #
          privProtocol: "%%extra_priv_protocol%%"

          ## @param 컨텍스트_엔진_id - 문자열 - 선택
          ## 컨텍스트 엔진 ID로 일반적으로 필요하지 않습니다.
          ## (선택 SNMP v3 전용 파마미터)
          #
          context_engine_id: "%%extra_context_engine_id%%"

          ## @param context_name - 문자열 - 선택
          ## 컨텍스트 이름(선택 SNMP v3 전용 파라미터)입니다.
          #
          context_name: "%%extra_context_name%%"

          ## @param 태그 - 키 목록:값 요소 - 선택
          ## 이 통합에서 전송되는 모든 메트릭, 이벤트 및 서비스 점검에 추가할 수 있는 태그 목록입니다
          ##
          ## 태깅에 대해 자세히 알아보기 https://docs.datadoghq.com/tagging/
          #
          태그:
            # 장치의 일부인 자동탐지 서브넷입니다.
            # 서브넷 이름 통과를 위해 에이전트 자동탐지에서 사용합니다.
            - "autodiscovery_subnet:%%extra_autodiscovery_subnet%%"

          ## @param extra_tags - string - optional
          ## 쉼표로 분리된 태그를 이 통합에서 전송되는 모든 메트릭, 이벤트, 서비스 점검에 추가합니다.
          ## 예시:
          ##  extra_tags: "tag1:val1,tag2:val2"
          #
          extra_tags: "%%extra_tags%%"

          ## @param oid_batch_size - integer - optional - default: 60
          ## 각 배치에서 처리하는 OID 수입니다. 수가 늘어나면 성능이 향상됩니다. 하지만
          ## 추가 리소스를 사용합니다.
          #
          oid_batch_size: "%%extra_oid_batch_size%%"


  ## @param datadog-cluster.yaml - object - optional
  ## Specify custom contents for the datadog cluster agent config (datadog-cluster.yaml).
  #
  datadog_cluster_yaml:

    # `network_devices.autodiscovery` 구성을 보려면 다음을 참고하세요. https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
    autodiscovery:
      workers: 2
      discovery_interval: 10
      configs:
        - network: 192.168.1.16/29
          version: 2
          port: 1161
          community: cisco_icm
        - network: 192.168.1.16/29
          version: 2
          port: 1161
          community: public
{{< /code-block >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/agent/cluster_agent
[2]: /ko/agent/cluster_agent/clusterchecks
[3]: https://app.datadoghq.com/organization-settings/api-keys
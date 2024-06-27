---
aliases:
- /ko/network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
- link: /agent/cluster_agent
  tag: 설명서
  text: 쿠버네티스(Kubernetes)용 클러스터 Agent
- link: /agent/cluster_agent/clusterchecks
  tag: 설명서
  text: 클러스터 점검
kind: 가이드
title: 클러스터 Agent로 네트워크 기기 모니터링
---

쿠버네티스 환경에서는 클러스터 점검 소스로 네트워크 기기 모니터링(Network Device Monitoring, "NDM")의 자동탐지 로직을 사용하도록 [Datadog 클러스터 Agent][1](DCA)를 설정할 수 있습니다.

Agent의 자동탐지와 DCA를 병용하면 확장이 가능해져, 많은 기기를 모니터링할 수 있습니다.

## 구성

### 설치

1. [DCA][1]를 설치했는지 확인하세요.

2. Datadog Helm 저장소(레포지토리)를 추가하고 Datadog `helm-chart`를 사용하여 NDM 자동탐지에서 DCA를 구성합니다.

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. 다음으로 `datadog-monitoring`을 설치하고 [Datadog API 키][3]를 설정하세요.

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### 설정

`cluster-agent-values.yaml`의 예시는 다음과 같습니다.

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - string - required
  ## Agent를 실행하기 전에 이 내용을 Datadog API 키로 설정하세요.
  ## ref: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
  #
  apiKey: <DATADOG_API_KEY>

  ## @param clusterName - string - optional
  ## 고유 클러스터명을 설정해 호스트 및 클러스터 점검의 범위를 용이하게 설정하세요
  ## 이름은 고유해야 하며, 문자열 마침표(dot)로 구분하는 토큰이어야 합니다. 여기서 토큰은 최대 40자까지 입력할 수 있고, 다음의 제약 사항을 따릅니다.
  ## * 영문 소문자, 숫자, 하이픈(-) 기호만 사용할 수 있습니다.
  ## * 영문자로 시작해야 합니다.
  ## * 숫자나 영문자로 끝나야 합니다.
  ## GKE 규칙과 비교했을 때, GKE에서 사용할 수 없던 위치에도 마침표를 입력할 수 있습니다.
  ## https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters#Cluster.FIELDS.name
  #
  clusterName: my-snmp-cluster

  ## @param clusterChecks - object - required
  ## 클러스터 agent와 daemonset에서 클러스터 점검 기능을 활성화하세요
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## Kube Service 어노테이션을 통한 자동탐지가 자동으로 활성화됩니다
  #
  clusterChecks:
    enabled: true

  ## @param tags  - list of key:value elements - optional
  ## Agent에서 수집한 메트릭, 이벤트, 서비스 점검에 추가할 태그 목록.
  ##
  ## 태깅에 대해 자세히 알아보기: https://docs.datadoghq.com/tagging/
  #
  tags:
    - 'env:test-snmp-cluster-agent'

## @param clusterAgent - object - required
## 이 Datadog 클러스터 Agent 구현은  클러스터 전반의
## 메트릭을 더 깔끔하게 처리하고, 더 나은 rbac를 위해 우려 사항을 분리하며
## 외부 메트릭 API를 구현하여 Datadog 메트릭을 기반으로 HPA를 자동 확장하도록 해줍니다
## ref: https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param enabled - boolean - required
  ## Datadog 클러스터 Agent에서 true로 설정하세요
  #
  enabled: true

  ## @param confd - list of objects - optional
  ## 부가적인 클러스터 점검 설정을 지원합니다
  ## 각 키는 /conf.d 내의 파일이 됩니다
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/
  #
  confd:
     # Static checks
     http_check.yaml: |-
       cluster_check: true
       instances:
         - name: 'Check Example Site1'
           url: http://example.net
         - name: 'Check Example Site2'
           url: http://example.net
         - name: 'Check Example Site3'
           url: http://example.net
     # Autodiscovery template needed for `snmp_listener` to create instance configs
     snmp.yaml: |-
      cluster_check: true
      ad_identifiers:
        - snmp
      init_config:
      instances:
        -
          ## @param ip_address - string - optional
          ## The IP address of the device to monitor.
          #
          ip_address: "%%host%%"

          ## @param port - integer - optional - default: 161
          ## Default SNMP port.
          #
          port: "%%port%%"

          ## @param snmp_version - integer - optional - default: 2
          ## If you are using SNMP v1 set snmp_version to 1 (required)
          ## If you are using SNMP v3 set snmp_version to 3 (required)
          #
          snmp_version: "%%extra_version%%"

          ## @param timeout - integer - optional - default: 5
          ## Amount of second before timing out.
          #
          timeout: "%%extra_timeout%%"

          ## @param retries - integer - optional - default: 5
          ## Amount of retries before failure.
          #
          retries: "%%extra_retries%%"

          ## @param community_string - string - optional
          ## Only useful for SNMP v1 & v2.
          #
          community_string: "%%extra_community%%"

          ## @param user - string - optional
          ## USERNAME to connect to your SNMP devices.
          #
          user: "%%extra_user%%"

          ## @param authKey - string - optional
          ## Authentication key to use with your Authentication type.
          #
          authKey: "%%extra_auth_key%%"

          ## @param authProtocol - string - optional
          ## Authentication type to use when connecting to your SNMP devices.
          ## It can be one of: MD5, SHA, SHA224, SHA256, SHA384, SHA512.
          ## Default to MD5 when `authKey` is specified.
          #
          authProtocol: "%%extra_auth_protocol%%"

          ## @param privKey - string - optional
          ## Privacy type key to use with your Privacy type.
          #
          privKey: "%%extra_priv_key%%"

          ## @param privProtocol - string - optional
          ## Privacy type to use when connecting to your SNMP devices.
          ## It can be one of: DES, 3DES, AES, AES192, AES256, AES192C, AES256C.
          ## Default to DES when `privKey` is specified.
          #
          privProtocol: "%%extra_priv_protocol%%"

          ## @param context_engine_id - string - optional
          ## ID of your context engine; typically unneeded.
          ## (optional SNMP v3-only parameter)
          #
          context_engine_id: "%%extra_context_engine_id%%"

          ## @param context_name - string - optional
          ## Name of your context (optional SNMP v3-only parameter).
          #
          context_name: "%%extra_context_name%%"

          ## @param tags - list of key:value element - optional
          ## List of tags to attach to every metric, event and service check emitted by this integration.
          ##
          ## Learn more about tagging: https://docs.datadoghq.com/tagging/
          #
          tags:
            # The autodiscovery subnet the device is part of.
            # Used by Agent autodiscovery to pass subnet name.
            - "autodiscovery_subnet:%%extra_autodiscovery_subnet%%"

          ## @param extra_tags - string - optional
          ## Comma separated tags to attach to every metric, event and service check emitted by this integration.
          ## Example:
          ##  extra_tags: "tag1:val1,tag2:val2"
          #
          extra_tags: "%%extra_tags%%"

          ## @param oid_batch_size - integer - optional - default: 60
          ## The number of OIDs handled by each batch. Increasing this number improves performance but
          ## uses more resources.
          #
          oid_batch_size: "%%extra_oid_batch_size%%"


  ## @param datadog-cluster.yaml - object - optional
  ## Datadog 클러스터 Agent 설정용 커스텀 콘텐츠를 특정합니다(datadog-cluster.yaml).
  #
  datadog_cluster_yaml:
    listeners:
      - name: snmp

    # 모든 `snmp_listener` 설정을 확인하려면 여기를 참조하세요: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
    snmp_listener:
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
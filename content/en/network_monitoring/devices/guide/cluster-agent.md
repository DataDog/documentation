---
title: Network Device Monitoring with the Cluster Agent
kind: guide
aliases:
    - /network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
- link: "/agent/cluster_agent"
  tag: "Documentation"
  text: "Cluster Agent for Kubernetes"
- link: "/agent/cluster_agent/clusterchecks"
  tag: "Documentation"
  text: "Cluster Checks"
---

For Kubernetes environments, the [Datadog Cluster Agent][1] (DCA) can be configured to use the Network Device Monitoring (NDM) auto-discovery logic as a source of [cluster checks][2].

Agent auto-discovery combined with the DCA is very scalable. It can monitor a large number of devices.

## Setup

### Installation

1. Ensure the [DCA][1] is installed.

2. Set up the DCA with NDM auto-discovery using Datadog `helm-chart` by adding the Datadog Helm repository:

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. Then, install `datadog-monitoring` and set your [Datadog API key][3].

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### Configuration

Below is an example of the `cluster-agent-values.yaml`:

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - string - required
  ## Set this to your Datadog API key before the Agent runs.
  ## ref: https://app.datadoghq.com/account/settings#agent/kubernetes
  #
  apiKey: <DATADOG_API_KEY>

  ## @param clusterName - string - optional
  ## Set a unique cluster name to allow scoping hosts and Cluster Checks easily
  ## The name must be unique and must be dot-separated tokens where a token can be up to 40 characters with the following restrictions:
  ## * Lowercase letters, numbers, and hyphens only.
  ## * Must start with a letter.
  ## * Must end with a number or a letter.
  ## Compared to the rules of GKE, dots are allowed whereas they are not allowed on GKE:
  ## https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters#Cluster.FIELDS.name
  #
  clusterName: my-snmp-cluster

  ## @param clusterChecks - object - required
  ## Enable the Cluster Checks feature on both the cluster-agents and the daemonset
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## Autodiscovery via Kube Service annotations is automatically enabled
  #
  clusterChecks:
    enabled: true

  ## @param tags  - list of key:value elements - optional
  ## List of tags to attach to every metric, event and service check collected by this Agent.
  ##
  ## Learn more about tagging: https://docs.datadoghq.com/tagging/
  #
  tags:
    - 'env:test-snmp-cluster-agent'

## @param clusterAgent - object - required
## This is the Datadog Cluster Agent implementation that handles cluster-wide
## metrics more cleanly, separates concerns for better rbac, and implements
## the external metrics API so you can autoscale HPAs based on datadog metrics
## ref: https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param enabled - boolean - required
  ## Set this to true to enable Datadog Cluster Agent
  #
  enabled: true

  ## @param confd - list of objects - optional
  ## Provide additional cluster check configurations
  ## Each key will become a file in /conf.d
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


  ## @param datadog-cluster.yaml - object - optional
  ## Specify custom contents for the datadog cluster agent config (datadog-cluster.yaml).
  #
  datadog_cluster_yaml:
    listeners:
      - name: snmp

    # See here for all `snmp_listener` configs: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
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
          community: f5
{{< /code-block >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks
[3]: https://app.datadoghq.com/account/settings#api

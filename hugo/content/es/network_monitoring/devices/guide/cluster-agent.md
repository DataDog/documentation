---
aliases:
- /es/network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
- link: /agent/cluster_agent
  tag: Documentación
  text: Agent de clúster para Kubernetes
- link: /agent/cluster_agent/clusterchecks
  tag: Documentación
  text: Verificaciones de clúster
title: Network Device Monitoring con el Agent de clúster
---
Para entornos de Kubernetes, el [Datadog Cluster Agent][1] (DCA) puede configurarse para utilizar la lógica de detección automática de Network Device Monitoring (NDM) como fuente de [verificaciones de clúster][2].

La detección automática de Agent combinada con el DCA es escalable Puede hacer un seguimiento de una gran cantidad de dispositivos.

## Configuración {#setup}

### Instalación {#installation}

1. Asegúrese de que el [DCA][1] esté instalado.

2. Configure el DCA con la detección automática de NDM usando Datadog `helm-chart` al agregar el repositorio de Helm de Datadog:

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. Luego, instale `datadog-monitoring` y establezca su [clave de Datadog API][3].

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### Configuración {#configuration}

A continuación se muestra un ejemplo de `cluster-agent-values.yaml`:

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - string - required
  ## Set this to your Datadog API key before the Agent runs.
  ## ref: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
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
  ## Specify custom contents for the datadog cluster agent config (datadog-cluster.yaml).
  #
  datadog_cluster_yaml:

    # See here for all `network_devices.autodiscovery` configs: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
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


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks
[3]: https://app.datadoghq.com/organization-settings/api-keys
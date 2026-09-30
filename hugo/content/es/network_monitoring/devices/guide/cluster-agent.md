---
aliases:
- /es/network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
- link: /agent/cluster_agent
  tag: Documentación
  text: Cluster Agent para Kubernetes
- link: /agent/cluster_agent/clusterchecks
  tag: Documentación
  text: Checks de clúster (Cluster Checks)
title: Network Device Monitoring con el Cluster Agent
---

Para los entornos de Kubernetes, el [Datadog Cluster Agent][1] (DCA) se puede configurar para utilizar la lógica de autodescubrimiento de Network Device Monitoring (NDM) como fuente de [checks de clúster][2].

El autodescubrimiento del Agent combinado con el DCA es escalable y puede monitorizar una gran cantidad de dispositivos.

## Ajustes

### Instalación

1. Asegúrate de que el [DCA][1] esté instalado.

2. Configura el DCA con el autodescubrimiento de NDM usando el `helm-chart` de Datadog al añadir el repositorio Helm de Datadog:

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. A continuación, instala `datadog-monitoring` y configura tu [clave de API de Datadog][3].

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### Configuración

A continuación, se muestra un ejemplo del `cluster-agent-values.yaml`:

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - string - obligatorio
  ## Establece esto en tu clave de API de Datadog antes de que se ejecute el Agent.
  ## ref: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
  #
  apiKey: <DATADOG_API_KEY>

  ## @param clusterName - string - opcional
  ## Establece un nombre de clúster único para permitir el alcance de los hosts y los checks de clúster fácilmente
  ## El nombre debe ser único y debe estar separado por puntos, donde un token puede tener hasta 40 caracteres con las siguientes restricciones:
  ## * Sólo letras minúsculas, números y guiones.
  ## * Debe comenzar con una letra.
  ## * Debe terminar con un número o una letra.
  ## Comparado con las reglas de GKE, los puntos están permitidos mientras que no lo están en GKE:
  ## https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters#Cluster.FIELDS.name
  #
  clusterName: my-snmp-cluster

  ## @param clusterChecks - object - obligatorio
  ## Habilita la función de checks de clúster tanto en los agents de clúster como en el daemonset
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## El autodescubrimiento a través de las anotaciones del servicio Kube se habilita automáticamente
  #
  clusterChecks:
    enabled: true

  ## @param tags  - list of key:value elements - opcional
  ## Lista de etiquetas (tags) para adjuntar a cada métrica, evento y check de servicio recopilados por este Agent.
  ##
  ## Más información sobre el etiquetado: https://docs.datadoghq.com/tagging/
  #
  tags:
    - 'env:test-snmp-cluster-agent'

## @param clusterAgent - object - obligatorio
## Este despliegue del Datadog Cluster Agent que maneja todo el clúster.
## métricas más claras, separa las preocupaciones para un mejor RBAC e implementa
## la API de métricas externas para que puedas escalar automáticamente HPA en función de las métricas de Datadog
## ref: https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param enabled - boolean - obligatorio
  ## Establece esto en true para habilitar Datadog Cluster Agent
  #
  enabled: true

  ## @param confd - list of objects - opcional
  ## Proporciona configuraciones de check de clúster adicionales
  ## Cada clave se convertirá en un archivo en /conf.d
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/
  #
  confd:
     # Checks estáticos
     http_check.yaml: |-
       cluster_check: true
       instances:
         - name: 'Check Example Site1'
           url: http://example.net
         - name: 'Check Example Site2'
           url: http://example.net
         - name: 'Check Example Site3'
           url: http://example.net
     # Plantilla de autodescubrimiento necesaria para `snmp_listener` a fin de crear configs de instancia
     snmp.yaml: |-
      cluster_check: true
      ad_identifiers:
        - snmp
      init_config:
      instances:
        -
          ## @param ip_address - string - opcional
          ## La dirección IP del dispositivo a monitorizar.
          #
          ip_address: "%%host%%"

          ## @param port - integer - opcional - predeterminado: 161
          ## Puerto SNMP predeterminado.
          #
          port: "%%port%%"

          ## @param snmp_version - integer - opcional - predeterminado: 2
          ## Si estás utilizando SNMP v1, configura snmp_version en 1 (obligatorio)
          ## Si estás utilizando SNMP v3 configura snmp_version en 3 (obligatorio)
          #
          snmp_version: "%%extra_version%%"

          ## @param timeout - integer - opcional - predeterminado: 5
          ## Cantidad de segundos antes de que se agote el tiempo.
          #
          timeout: "%%extra_timeout%%"

          ## @param retries - integer - opcional - predeterminado: 5
          ## Cantidad de reintentos antes del fallo.
          #
          retries: "%%extra_retries%%"

          ## @param community_string - string - opcional
          ## Solo útil SNMP v1 & v2.
          #
          community_string: "%%extra_community%%"

          ## @param user - string - opcional
          ## USERNAME para conectarte a tus dispositivos SNMP.
          #
          user: "%%extra_user%%"

          ## @param authKey - string - opcional
          ## Clave de autenticación para utilizar con tu tipo de autenticación.
          #
          authKey: "%%extra_auth_key%%"

          ## @param authProtocol - string - opcional
          ## Tipo de autenticación que se utilizará al conectarse a tus dispositivos SNMP.
          ## Puede ser uno de los siguientes: MD5, SHA, SHA224, SHA256, SHA384, SHA512.
          ## El valor predeterminado es MD5 cuando se especifica `authKey`.
          #
          authProtocol: "%%extra_auth_protocol%%"

          ## @param privKey - string - opcional
          ## Clave de tipo de privacidad para usar con tu tipo de privacidad.
          #
          privKey: "%%extra_priv_key%%"

          ## @param privProtocol - string - opcional
          ## Tipo de privacidad que se utilizará al conectarse a tus dispositivos SNMP.
          ## Puede ser uno de los siguientes: DES, 3DES, AES, AES192, AES256, AES192C, AES256C.
          ## El valor predeterminado es DES cuando se especifica `privKey`.
          #
          privProtocol: "%%extra_priv_protocol%%"

          ## @param context_engine_id - string - opcional
          ## ID de tu motor de contexto; normalmente no es necesario.
          ## (SNMP v3 opcional-solo parámetro)
          #
          context_engine_id: "%%extra_context_engine_id%%"

          ## @param context_name - string - opcional
          ## Nombre de tu contexto (SNMP v3 opcional-solo parámetro).
          #
          context_name: "%%extra_context_name%%"

          ## @param tags - list of key:value element - opcional
          ## Lista de etiquetas para adjuntar a cada métrica, evento y check de servicio emitido por esta integración.
          ##
          ## Obtén más información sobre el etiquetado: https://docs.datadoghq.com/tagging/
          #
          tags:
            # La subred de detección automática de la que forma parte el dispositivo.
            # Utilizado por el autodescubrimiento del Agent para pasar el nombre de la subred.
            - "autodiscovery_subnet:%%extra_autodiscovery_subnet%%"

          ## @param extra_tags - string - opcional
          ## Etiquetas separadas por comas para adjuntar a cada métrica, evento y check de servicio emitido por esta integración.
          ## Ejemplo:
          ##  extra_tags: "tag1:val1,tag2:val2"
          #
          extra_tags: "%%extra_tags%%"

          ## @param oid_batch_size - integer - opcional - predeterminado: 60
          ## La cantidad de OID que maneja cada lote. Aumentar esta cantidad mejora el rendimiento, pero
          ## usa más recursos.
          #
          oid_batch_size: "%%extra_oid_batch_size%%"


  ## @param datadog-cluster.yaml - object - opcional
  ## Especifica contenidos personalizados para la configuración del Datadog Cluster Agent (datadog-cluster.yaml).
  #
  datadog_cluster_yaml:

    # Consulte aquí todas las configuraciones `network_devices.autodiscovery`: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
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


## Para leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks
[3]: https://app.datadoghq.com/organization-settings/api-keys
---
aliases:
- /es/agent/autodiscovery/clusterchecks
- /es/agent/faq/kubernetes-state-cluster-check
- /es/agent/cluster_agent/clusterchecks
further_reading:
- link: /containers/cluster_agent/
  tag: Documentación
  text: Datadog Cluster Agent
- link: /containers/troubleshooting/cluster-and-endpoint-checks
  tag: Documentación
  text: Solucionar problemas en los checks de clúster
- link: /containers/guide/clustercheckrunners
  tag: Documentación
  text: Ejecutores de checks de clúster
kind: documentación
title: Checks de clúster
---

## Información general

El Datadog Agent descubre automáticamente los contenedores y crea configuraciones de checks utilizando el [mecanismo de Autodiscovery][1].

Los _checks de clúster_ amplían este mecanismo para monitorizar cargas de trabajo no contenedorizadas, entre las que se incluyen:

- Almacenes de datos y endpoints ejecutados fuera del clúster (por ejemplo, RDS o CloudSQL).
- Servicios de clúster con carga equilibrada (por ejemplo, los servicios de Kubernetes).

Esto garantiza que solo se ejecute **una** instancia de cada check, en lugar de que **todos** los pods del Agent basados en nodos ejecuten el check correspondiente. El [Cluster Agent][2] almacena las configuraciones y las envía dinámicamente a los Agents basados en nodos. Los Agents se conectan al Cluster Agent cada diez segundos y recuperan las configuraciones que deben ejecutarse. Si un Agent deja de enviar información, el Cluster Agent lo elimina del grupo activo y distribuye las configuraciones a otros Agents. Esto garantiza que siempre se ejecute una (y solo una) instancia, aunque se añadan y eliminen nodos del clúster.

Las métricas, eventos y checks de servicio recopilados por los checks de clúster se envían sin nombre de host, ya que no es relevante. Asimismo, se añade una etiqueta `cluster_name` para permitirte dimensionar y filtrar tus datos.

Se recomienda usar checks de clúster si tu infraestructura está configurada para casos de alta disponibilidad (HA).

## Configurar la distribución de checks de clúster
El proceso de configuración implica habilitar la capacidad de distribución en el Cluster Agent, así como garantizar que los Agents están preparados para recibir configuraciones del proveedor `clusterchecks`. Una vez hecho esto, las configuraciones pasan al Cluster Agent a través de la integración de archivos de configuración o a través de anotaciones en los servicios de Kubernetes.

{{< tabs >}}
{{% tab "Helm" %}}
La distribución de checks de clúster se habilita por defecto en el despliegue de Helm del Cluster Agent a través de la clave de configuración de `datadog.clusterChecks.enabled`:
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

Esto habilita la configuración de checks de clúster en el Cluster Agent y le permite procesar configuraciones desde las anotaciones de los servicios de Kubernetes (`kube_services`).
{{% /tab %}}
{{% tab "Operator" %}}
La distribución de checks de clúster se habilita en el despliegue del Operator del Cluster Agent mediante el uso de la clave de configuración `spec.features.clusterChecks.enabled`:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

Esto habilita la configuración de checks de clúster en el Cluster Agent y permite procesar configuraciones desde las anotaciones de los servicios de Kubernetes (`kube_services`).

{{% /tab %}}
{{% tab "DaemonSet" %}}
### Cluster Agent

Una vez que tu [Cluster Agent][1] esté en ejecución, debes realizar los siguientes cambios en su despliegue:

1. Establece la variable de entorno `DD_CLUSTER_CHECKS_ENABLED` como `true`.
2. Transfiere el nombre de tu clúster a `DD_CLUSTER_NAME`. Para ayudarte entender el contexto de tus métricas, Datadog inserta el nombre del clúster como una etiqueta (tag) de instancia `cluster_name` en todas las configuraciones.
3. Si el nombre del servicio es diferente al parámetro `datadog-cluster-agent` predeterminado, asegúrate de que la variable de entorno `DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME` refleja el nombre del servicio.
4. Para permitir que el Cluster Agent procese las configuraciones de las anotaciones de servicios de Kubernetes, establece estas **dos** variables de entorno, `DD_EXTRA_CONFIG_PROVIDERS` y `DD_EXTRA_LISTENERS`, como `kube_services`.

### Agent

Habilita el proveedor de configuración `clusterchecks` en el Agent del **nodo** de Datadog. Esto se puede hacer de dos maneras:

- **Recomendado**: Estableciendo la variable de entorno `DD_EXTRA_CONFIG_PROVIDERS` en el DaemonSet de tu Agent. Si tienes varios valores, se necesita una cadena en la que los valores estén separados entre sí por espacios:

    ```text
    DD_EXTRA_CONFIG_PROVIDERS="clusterchecks"
    ```

- O añadiéndolo al archivo de configuración `datadog.yaml`:

    ```yaml
    config_providers:
        - name: clusterchecks
          polling: true
    ```

[1]: /es/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}


**Nota**: Con los checks de clúster, las métricas notificadas por el Agent no se vinculan a un nombre de host determinado, ya que se supone que son métricas centradas en el clúster y no están necesariamente basadas en el host. Como resultado, estas métricas no heredan ninguna etiqueta en el host asociada a ese host, tales como las heredadas de un proveedor de servicios en la nube o las añadidas por la variable de entorno `DD_TAGS` del Agent. Para agregar etiquetas a las métricas de check de clúster, utiliza la variable de entorno `DD_CLUSTER_CHECKS_EXTRA_TAGS`.

### Ejecutores de checks de clúster

El [Helm chart de Datadog][3] y el [Datadog Operator][4] ofrecen, además, la posibilidad de desplegar ejecutores de checks de clúster. Se trata del despliegue de un pequeño conjunto de Datadog Agents configurados para ejecutar únicamente los checks de clúster distribuidos, en lugar de distribuirlos a los Agents normales que se basan en nodos. Para más detalles, consulta la guía [Ejecutores de checks de clúster][5].

### Distribución avanzada

El Cluster Agent puede utilizar una lógica de distribución avanzada para los checks de clúster que tenga en cuenta el tiempo de ejecución y las muestras de las métricas de las instancias del check. Esta lógica permite que el Cluster Agent optimice la distribución entre los ejecutores de checks de clúster.

Para configurar la lógica de distribución avanzada, se debe establecer la variable de entorno `DD_CLUSTER_CHECKS_ADVANCED_DISPATCHING_ENABLED` como `true` en el Cluster Agent.

Las siguientes variables de entorno son necesarias a la hora de configurar los Agents del nodo (o los ejecutores de checks de clúster) para mostrar las estadísticas de sus checks. El Cluster Agent utiliza estas estadísticas para optimizar la lógica de distribución de los checks de clúster.

```yaml
  env:
    - name: DD_CLC_RUNNER_ENABLED
      value: "true"
    - name: DD_CLC_RUNNER_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
```

### Checks personalizados
Se admite la ejecución de [checks personalizados del Agent][6], como los checks de clúster, siempre que todos los Agents basados en nodos puedan ejecutar el check. Esto significa que el código de tu check personalizado:

- debe instalarse en todos los Agents basados en nodos en los que se haya habilitado el proveedor de configuración `clusterchecks`;
- **no** debe depender de recursos locales que no sean accesibles a todos los Agents.

## Cómo configurar los checks

### Configuración a partir de archivos de configuración

Cuando la URL o la IP de un determinado recurso es constante (por ejemplo, un endpoint de servicio externo o una URL pública), se puede transferir una configuración estática al Cluster Agent en forma de archivos YAML. La nomenclatura y la sintaxis de estos archivos son las mismas que las de las configuraciones estáticas del Agent basado en el nodo, excepto por la adición obligatoria de la línea `cluster_check: true`.

En la versión 1.18.0 (y posteriores) del Cluster Agent, puedes utilizar `advanced_ad_identifiers` y las [variables de plantilla de Autodiscovery][7] en la configuración de tu check para dirigirte a los servicios de Kubernetes ([ver ejemplo][8]).

{{< tabs >}}
{{% tab "Helm" %}}
Con Helm, estos archivos de configuración se pueden crear dentro de la sección `clusterAgent.confd`.

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      cluster_check: true
      init_config:
        - <INIT_CONFIG>
      instances:
        - <INSTANCES_CONFIG>
```

**Nota**: Esto es independiente de la sección `datadog.confd`, en la que los archivos se crean en los Agents basados en nodos. El parámetro `<INTEGRATION_NAME>` debe coincidir exactamente con el check de integración que quieres ejecutar.

{{% /tab %}}
{{% tab "Operator" %}}
Con el Datadog Operator, estos archivos de configuración se pueden crear dentro de la sección `spec.override.clusterAgent.extraConfd.configDataMap`:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            cluster_check: true
            init_config:
              - <INIT_CONFIG>
            instances:
              - <INSTANCES_CONFIG>
```

Si lo prefieres, puedes crear un ConfigMap para almacenar el archivo de configuración estática e integrar dicho ConfigMap en el Cluster Agent utilizando el campo `spec.override.clusterAgent.extraConfd.configMap`:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configMap:
          name: "<NAME>-config-map"
          items:
            - key: <INTEGRATION_NAME>-config
              path: <INTEGRATION_NAME>.yaml
```

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
data:
  <INTEGRATION_NAME>-config: |-
    cluster_check: true
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Con el método manual, debes crear un ConfigMap para almacenar los archivos de configuración estática que quieras y, luego, integrar dicho ConfigMap en el archivo `/conf.d` correspondiente del contenedor del Cluster Agent. Se sigue el mismo enfoque para [integrar ConfigMaps en el contenedor del Agent][1]. Ejemplo:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
data:
  <INTEGRATION_NAME>-config: |-
    cluster_check: true
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

A continuación, en el manifiesto para el despliegue del Cluster Agent, define los parámetros `volumeMounts` y `volumes` según tu `ConfigMap` y la clave correspondiente de tus datos.

```yaml
        volumeMounts:
          - name: <NAME>-config-map
            mountPath: /conf.d/
            # (...)
      volumes:
        - name: <NAME>-config-map
          configMap:
            name: <NAME>-config-map
            items:
              - key: <INTEGRATION_NAME>-config
                path: <INTEGRATION_NAME>.yaml
          #(...)
```
Esto crea un archivo en el directorio `/conf.d/` del Cluster Agent correspondiente a la integración. Ejemplo: `/conf.d/mysql.yaml` o `/conf.d/http_check.yaml`.


[1]: /es/agent/kubernetes/integrations/?tab=configmap#configuration
{{% /tab %}}
{{< /tabs >}}

#### Ejemplo: check de MySQL en una base de datos alojada externamente

Después de configurar una base de datos alojada externamente, como CloudSQL o RDS, y un [usuario de Datadog][9] correspondiente para acceder a la base de datos, integra un archivo `/conf.d/mysql.yaml` en el contenedor del Cluster Agent con el siguiente contenido:

```yaml
cluster_check: true
init_config:
instances:
    - server: "<PRIVATE_IP_ADDRESS>"
      port: 3306
      user: datadog
      pass: "<YOUR_CHOSEN_PASSWORD>"
```

#### Ejemplo: check HTTP en una URL externa

Si hay una URL en la que desees realizar un [check HTTP][10] por clúster, integra un archivo `/conf.d/http_check.yaml` en el contenedor del Cluster Agent con el siguiente contenido:

```yaml
cluster_check: true
init_config:
instances:
    - name: "<EXAMPLE_NAME>"
      url: "<EXAMPLE_URL>"
```

#### Ejemplo: check HTTP en un servicio de Kubernetes
Si hay un servicio de Kubernetes en el que desees realizar un [check HTTP][10] por clúster:

{{< tabs >}}
{{% tab "Helm" %}}
Utiliza el campo `clusterAgent.confd` para definir la configuración del check:

```yaml
#(...)
clusterAgent:
  confd:
    http_check.yaml: |-
      advanced_ad_identifiers:
        - kube_service:
            name: "<SERVICE_NAME>"
            namespace: "<SERVICE_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{% tab "Operator" %}}
Utiliza el campo `spec.override.clusterAgent.extraConfd.configDataMap` para definir la configuración del check:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
          http_check.yaml: |-
            advanced_ad_identifiers:
              - kube_service:
                  name: "<SERVICE_NAME>"
                  namespace: "<SERVICE_NAMESPACE>"
            cluster_check: true
            init_config:
            instances:
              - url: "http://%%host%%"
                name: "<EXAMPLE_NAME>"
```
{{% /tab %}}
{{% tab "DaemonSet" %}}
Integra un archivo `/conf.d/http_check.yaml` en el contenedor del Cluster Agent con el siguiente contenido:

```yaml
advanced_ad_identifiers:
  - kube_service:
      name: "<SERVICE_NAME>"
      namespace: "<SERVICE_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

{{% /tab %}}
{{< /tabs >}}

**Nota:** El campo `advanced_ad_identifiers` es compatible con el Datadog Cluster Agent v1.18 (y sus versiones posteriores).

### Configuración a partir de anotaciones en los servicios de Kubernetes

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Nota:** AD Annotations v2 se introdujo en el Datadog Agent v7.36 para simplificar la configuración de la integración. Si tu versión del Datadog Agent es anterior, usa AD Annotations v1.

La sintaxis para anotar servicios es similar a la utilizada para [anotar pods de Kubernetes][1]:

```yaml
ad.datadoghq.com/service.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
```

Esta sintaxis admite una [variable de plantilla][11] `%%host%%`, que se sustituye por la IP del servicio. Las etiquetas `kube_namespace` y `kube_service` se añaden automáticamente a la instancia.

#### Ejemplo: check HTTP en un servicio respaldado por NGINX

La siguiente definición de servicio expone los pods desde el despliegue de `my-nginx` y ejecuta un [check HTTP][10] para medir la latencia del servicio de carga equilibrada:

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url":"http://%%host%%",
                "name":"My Nginx",
                "timeout":1
              }
            ]
          }
        }
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

Además, debería monitorizar cada pod con el [check de NGINX][12], dado que así se podrían monitorizar también todos los workers y el servicio agregado.

[1]: /es/agent/kubernetes/integrations/
[10]: /es/integrations/http_check/
[11]: /es/agent/faq/template_variables/
[12]: /es/integrations/nginx/
{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

La sintaxis para anotar servicios es similar a la utilizada para [anotar pods de Kubernetes][1]:

```yaml
ad.datadoghq.com/service.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
```

Esta sintaxis admite una [variable de plantilla][11] `%%host%%`, que se sustituye por la IP del servicio. Las etiquetas `kube_namespace` y `kube_service` se añaden automáticamente a la instancia.

#### Ejemplo: check HTTP en un servicio respaldado por NGINX

La siguiente definición de servicio expone los pods desde el despliegue de `my-nginx` y ejecuta un [check HTTP][10] para medir la latencia del servicio de carga equilibrada:

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx",
                "url": "http://%%host%%",
                "timeout": 1
              }
            ]
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

Además, debería monitorizar cada pod con el [check de NGINX][12], dado que así se podrían monitorizar también todos los workers y el servicio agregado.

[1]: /es/agent/kubernetes/integrations/
[10]: /es/integrations/http_check/
[11]: /es/agent/faq/template_variables/
[12]: /es/integrations/nginx/

{{% /tab %}}
{{< /tabs >}}

## Validación

El Datadog Cluster Agent distribuye cada check de clúster a un Agent de nodo para que lo ejecute. Ejecuta el [subcomando `clusterchecks` del Datadog Cluster Agent][13] y busca el nombre del check bajo el nombre de host del Agent de nodo:

```
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
(...)
===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

Ahora, ejecuta el [subcomando `status` del Agent de nodo][14] y busca el nombre del check en la sección Checks.

```
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/integrations/
[2]: /es/agent/cluster_agent/
[3]: /es/agent/cluster_agent/clusterchecksrunner?tab=helm
[4]: /es/agent/cluster_agent/clusterchecksrunner?tab=operator
[5]: /es/containers/guide/clustercheckrunners
[6]: /es/developers/custom_checks/write_agent_check/
[7]: /es/agent/guide/template_variables/
[8]: /es/agent/cluster_agent/clusterchecks/#example-http_check-on-a-kubernetes-service
[9]: /es/integrations/mysql/
[10]: /es/integrations/http_check/
[11]: /es/agent/faq/template_variables/
[12]: /es/integrations/nginx/
[13]: /es/containers/troubleshooting/cluster-and-endpoint-checks#dispatching-logic-in-the-cluster-agent
[14]: /es/containers/cluster_agent/commands/#cluster-agent-commands
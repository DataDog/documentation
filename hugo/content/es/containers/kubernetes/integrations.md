---
aliases:
- /es/agent/autodiscovery/integrations
- /es/guides/servicediscovery/
- /es/guides/autodiscovery/
- /es/agent/kubernetes/integrations
description: Configure integraciones de monitoreo para aplicaciones que se ejecutan
  en Kubernetes mediante plantillas de Autodiscovery
further_reading:
- link: https://www.datadoghq.com/blog/monitor-karpenter-datadog
  tag: Blog
  text: Monitoree Karpenter con Datadog
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopile sus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
- link: https://www.youtube.com/watch?v=nuxmVf9ByE0
  tag: Video
  text: 'Consejos y trucos de Datadog: Cómo escribir anotaciones en Kubernetes con
    JSON para Autodiscovery de Datadog'
title: Kubernetes e Integrations
---
Esta página cubre cómo instalar y configurar integraciones para su infraestructura de Kubernetes mediante una función de Datadog conocida como _Autodiscovery_. Esto le permite usar [variables][16] como `%%host%%` para completar dinámicamente sus ajustes de configuración. Para obtener una explicación detallada de cómo funciona Autodiscovery, consulte [Introducción a Containers: Autodiscovery][12]. Para opciones avanzadas de Autodiscovery, como excluir ciertos contenedores de Autodiscovery o tolerar pods que no están listos, consulte [Gestión de descubrimiento de contenedores][23].

Si usa Docker o Amazon ECS, consulte [Docker e Integrations][1].

<div class="alert alert-info">
Algunas integraciones de Datadog no funcionan con Autodiscovery porque requieren datos del árbol de procesos o acceso al sistema de archivos: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a> y <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Para monitorear integraciones que no son compatibles con Autodiscovery, puede usar un exportador de Prometheus en el pod para exponer un punto de conexión HTTP y, luego, usar la <a href="/integrations/openmetrics/">integración de OpenMetrics</a> (que admite Autodiscovery) para encontrar el pod y consultar el punto de conexión.
</div>

## Configure su integración {#set-up-your-integration}

Algunas integraciones requieren pasos de configuración, como crear un token de acceso u otorgar permiso de lectura al Datadog Agent. Siga las instrucciones de la sección **Setup** de la documentación de su integración.

### Integraciones de la comunidad {#community-integrations}
Para usar una integración que no viene incluida con el Datadog Agent, debe crear una imagen personalizada que contenga la integración deseada. Consulte [Cómo usar Integrations de la comunidad][13] para obtener instrucciones.

## Configuración {#configuration}

Algunas integraciones de uso común vienen con una configuración predeterminada para Autodiscovery. Consulte [Autodiscovery auto-configuration][20] para obtener detalles, incluida una lista de integraciones autoconfiguradas y sus archivos de configuración predeterminados correspondientes. Si su integración está en esta lista y la configuración predeterminada es suficiente para su caso de uso, no se requiere ninguna acción adicional.

De lo contrario, configure una integración:

1. Elija un método de configuración: el recurso personalizado `DatadogInstrumentation` (recomendado), anotaciones de pod de Kubernetes, un archivo local, un ConfigMap, un almacén de clave-valor, un manifiesto de Datadog Operator o un chart de Helm.
2. Consulte el formato de plantilla para el método elegido. Cada formato contiene marcadores de posición, como `<CONTAINER_NAME>`.
3. [Proporcione valores](#placeholder-values) para estos marcadores de posición.

{{< tabs >}}
{{% tab "CRD de DatadogInstrumentation" %}}

Puede configurar comprobaciones de Autodiscovery y recopilación de logs para una carga de trabajo específica a través del recurso personalizado `DatadogInstrumentation`, en lugar de anotaciones de pod. Esto le permite actualizar o eliminar la configuración de Autodiscovery sin editar las especificaciones de los pods ni reiniciar los pods de su aplicación. También puede dirigirse a un `Service` de Kubernetes para programar comprobaciones de puntos de conexión para cada punto de conexión de ese Service.

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <CR_NAME>
  namespace: default
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <WORKLOAD_NAME>
  config:
    checks:
      - integration: <INTEGRATION_NAME>
        containerName: <CONTAINER_NAME>
        initConfig:
          <INIT_CONFIG>
        instances:
          - <INSTANCES_CONFIG>
    logs:
      - containerName: <CONTAINER_NAME>
        <LOGS_CONFIG>
```

Para conocer los pasos de configuración, el esquema completo del recurso y las reglas de precedencia, consulte [Configure Autodiscovery con el CRD de DatadogInstrumentation][29].

[29]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

Si define sus pods de Kubernetes directamente con `kind: Pod`, agregue las anotaciones de cada pod directamente bajo su sección `metadata`, como se muestra:

**Anotaciones de Autodiscovery v2** (para Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

**Anotaciones de Autodiscovery v1**

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.instances: '[<INSTANCES_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

Si define pods indirectamente (con deployments, ReplicaSets o ReplicationControllers), agregue las anotaciones de pod bajo `spec.template.metadata`.

{{% /tab %}}
{{% tab "Archivo local" %}}

Puede almacenar plantillas de Autodiscovery como archivos locales dentro del directorio `conf.d` montado (`/etc/datadog-agent/conf.d`). Debe reiniciar sus contenedores del Agent cada vez que cambie, agregue o elimine plantillas.

1. Cree un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en su servidor:
   ```yaml
   ad_identifiers:
     - <CONTAINER_IMAGE>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. Monte la carpeta `conf.d/` de su servidor en la carpeta `conf.d` del Agent en contenedor.

   Para Datadog Operator:
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Para Helm:
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

Puede utilizar [ConfigMaps][1] para definir configuraciones externamente y montarlas posteriormente.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <CONTAINER_IMAGE>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap

{{% /tab %}}
{{% tab "Almacén de clave-valor" %}}

Puede recopilar plantillas de Autodiscovery de [Consul][1], [etcd][2] o [ZooKeeper][3]. Puede configurar su almacén de clave-valor en el archivo de configuración `datadog.yaml` (y posteriormente montar este archivo dentro del contenedor del Agent), o como variables de entorno en el contenedor del Agent.

**Configure en datadog.yaml**:

En `datadog.yaml`, establezca la dirección `<KEY_VALUE_STORE_IP>` y `<KEY_VALUE_STORE_PORT>` de su almacén de clave-valor:

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

[Reinicie el Datadog Agent][4] para aplicar sus cambios.

**Configure en las variables de entorno**:

Con el almacén de clave-valor habilitado como fuente de plantilla, el Agent busca plantillas bajo la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía de clave-valor como esta:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /es/integrations/consul/
[2]: /es/integrations/etcd/
[3]: /es/integrations/zk/
[4]: /es/agent/configuration/agent-commands/

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Para configurar integraciones en `datadog-agent.yaml`, añada una anulación `extraConfd.configDataMap` al componente `nodeAgent` de su configuración de `DatadogAgent`. Cada clave se convierte en un archivo en el directorio `conf.d` del Agent.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```
<div class="alert alert-info">Cuando varios CRD implementados <code>DatadogAgent</code> usan <code>configDataMap</code>, cada CRD escribe en un ConfigMap compartido llamado <code>nodeagent-extra-confd</code>. Esto puede causar que las configuraciones se sobrescriban entre sí. </div>

Para supervisar un [Cluster Check][1], agregue una anulación `extraConfd.configDataMap` al componente `clusterAgent`. También debe habilitar las comprobaciones de clúster configurando `features.clusterChecks.enabled: true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    clusterChecks:
      enabled: true
    [...]
  override:
    nodeAgent:
      [...]
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            cluster_check: true
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

Consulte [Cluster Checks][1] para obtener más contexto.

[1]: /es/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

Su archivo `datadog-values.yaml` contiene una sección `datadog.confd` donde puede definir plantillas de Autodiscovery. Puede encontrar ejemplos en línea en el archivo de muestra [values.yaml][1]. Cada clave se convierte en un archivo en el directorio `conf.d` del Agent.

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

Para supervisar un [Cluster Check][3], defina su plantilla en `clusterAgent.confd`. Puede encontrar ejemplos en línea en el archivo de muestra [values.yaml][2]. También debe habilitar el Cluster Agent configurando `clusterAgent.enabled: true` y habilitar las comprobaciones de clúster configurando `datadog.clusterChecks.enabled: true`.

```yaml
datadog:
  clusterChecks:
    enabled: true
clusterAgent:
  enabled: true
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      cluster_check: true
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

Consulte [Cluster Checks][3] para obtener más contexto.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /es/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### Valores de los marcadores de posición {#placeholder-values}

Proporcione los valores de marcador de posición de la siguiente manera:

`<INTEGRATION_NAME>`
: El nombre de su integración de Datadog, como `etcd` o `redisdb`.

`<CONTAINER_NAME>`
: Un identificador para comparar con los nombres (`spec.containers[i].name`, **no** `spec.containers[i].image`) de los contenedores que corresponden a su integración.

`<CONTAINER_IMAGE>`
: Un identificador para comparar con la imagen del contenedor (`.spec.containers[i].image`). <br/><br/>
Por ejemplo: si proporciona `redis` como identificador de contenedor, su plantilla de Autodiscovery se aplica a todos los contenedores con nombres de imagen que coincidan con `redis`. Si tiene un contenedor ejecutando `foo/redis:latest` y `bar/redis:v2`, su plantilla de Autodiscovery se aplica a ambos contenedores.<br/><br/>
El parámetro `ad_identifiers` acepta una lista, por lo que puede proporcionar múltiples identificadores de contenedor. También puede usar identificadores personalizados. Consulte [Identificadores personalizados de Autodiscovery][21].

`<INIT_CONFIG>`
: Los parámetros de configuración enumerados bajo `init_config` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de su integración. La sección `init_config` suele estar vacía.

`<INSTANCES_CONFIG>`
: Los parámetros de configuración enumerados bajo `instances` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de su integración.

`<LOGS_CONFIG>`
: Los parámetros de configuración enumerados bajo `logs` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de su integración.

### Configuración avanzada de comprobaciones {#advanced-check-configuration}

Personalice el etiquetado de comprobaciones en un recurso `DatadogInstrumentation` o con anotaciones de pod.

#### Cardinalidad de etiquetas {#tag-cardinality}

Establezca el nivel de cardinalidad de etiquetas para una comprobación específica en `low`, `orchestrator` o `high`. Esta configuración anula el ajuste global de cardinalidad de etiquetas del Agent para las métricas recopiladas por esa comprobación. Si se omite, la comprobación hereda el ajuste del Agent.

{{< tabs >}}
{{% tab "CRD de DatadogInstrumentation" %}}

Establezca `checkTagCardinality` en la entrada de la comprobación. El siguiente ejemplo configura una comprobación de Redis para el contenedor `redis` en el StatefulSet `redis`:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: redis-instrumentation
  namespace: default
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        checkTagCardinality: low
        instances:
          - host: "%%host%%"
            port: 6379
```

Para obtener información sobre la configuración y los campos admitidos, consulte [Configurar Autodiscovery con la CRD de DatadogInstrumentation][29].

[29]: /es/containers/guide/configure-autodiscovery-with-the-datadoginstrumentation-crd/

{{% /tab %}}
{{% tab "Anotaciones" %}}

Establezca la anotación `check_tag_cardinality`:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.check_tag_cardinality: "<low|orchestrator|high>"
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

{{% /tab %}}
{{< /tabs >}}

Estos ajustes afectan solo a las métricas recopiladas por las comprobaciones de integración, no a las métricas enviadas a través de DogStatsD. Para configurar la cardinalidad de etiquetas de DogStatsD, utilice el parámetro de configuración global `dogstatsd_tag_cardinality` o la variable de entorno `DD_DOGSTATSD_TAG_CARDINALITY`.

Para obtener más información sobre la cardinalidad de etiquetas, consulte [Configuración de etiquetas por comprobación][27].

#### Deshabilitar etiquetas de Autodiscovery {#disable-autodiscovery-tags}

Para suprimir las etiquetas de contenedor y pod añadidas por Autodiscovery, establezca `ignoreAutodiscoveryTags: true` en la entrada de comprobación en `spec.config.checks`. El valor predeterminado es `false`. Este ajuste no elimina las etiquetas configuradas explícitamente en la comprobación ni las etiquetas emitidas por la propia integración.

Para configuraciones basadas en anotaciones, establezca `ignore_autodiscovery_tags` junto con `init_config` y `instances` en la configuración JSON de la comprobación. Por ejemplo, añada la siguiente anotación a un pod con un contenedor llamado `redis`:

```yaml
ad.datadoghq.com/redis.checks: |
  {
    "redisdb": {
      "ignore_autodiscovery_tags": true,
      "init_config": {},
      "instances": [{"host": "%%host%%", "port": 6379}]
    }
  }
```

### Configuración automática {#auto-configuration}

El Datadog Agent reconoce automáticamente y proporciona la configuración básica para algunas tecnologías comunes. Para obtener una lista completa, consulte [Configuración automática de Autodiscovery][20].

Las configuraciones establecidas con anotaciones de Kubernetes tienen prioridad sobre los recursos `DatadogInstrumentation` y la configuración automática. Los recursos `DatadogInstrumentation` tienen prioridad sobre la configuración estática, incluida la configuración automática y las configuraciones establecidas con Datadog Operator o Helm. Para usar Datadog Operator o Helm para configurar una integración en la lista de [Configuración automática de Autodiscovery][20], debe [deshabilitar la configuración automática][22].

## Seguridad de Integrations {#integrations-security}

Las integraciones a menudo necesitan leer archivos de configuración, certificados u otros recursos del sistema de archivos. Cuando las rutas de archivo provienen de proveedores de configuración no confiables (por ejemplo, anotaciones de pod o Autodiscovery de servicios externos), existe un riesgo de recorrido de directorio o acceso no autorizado a archivos.

A partir de la versión 7.78.0 del Datadog Agent, puede establecer los siguientes parámetros en el `datadog.yaml` del Agent para controlar el acceso al sistema de archivos según el nivel de confianza de un proveedor de configuración.

| Parámetro | Tipo | Predeterminado | Descripción |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | bool | `false` | Cuando está habilitado, las integraciones ignoran los parámetros de configuración que hacen referencia a rutas de archivo si el proveedor de configuración no es confiable. |
| `integration_file_paths_allowlist` | list | `[]` | Lista de rutas de archivo a las que las integraciones tienen permitido acceder, incluso cuando son proporcionadas por un proveedor de configuración no confiable. Una lista vacía significa que todas las rutas de archivo están permitidas. |
| `integration_trusted_providers` | list | `["file", "remote-config"]` | Lista de proveedores de configuración considerados confiables. Cualquier proveedor que no esté en esta lista se considera no confiable. De forma predeterminada, los archivos de configuración locales (`file`) y Datadog Remote Configuration (`remote-config`) son confiables. Para obtener la lista completa de proveedores admitidos, consulte [nombres de proveedores de Datadog Agent][28]. |
| `integration_security_excluded_checks` | list | `[]` | Lista de nombres de integración que están excluidos de las restricciones de seguridad anteriores. |

Estas opciones son compatibles con versiones anteriores: los valores predeterminados conservan el comportamiento existente. Para activar esta opción, habilite `integration_ignore_untrusted_file_params` y ajuste los parámetros restantes para que se adapten a su entorno.

Ejemplo `datadog.yaml`:

```yaml
integration_ignore_untrusted_file_params: true
integration_file_paths_allowlist:
  - /etc/datadog-agent/certs
  - /var/run/secrets
integration_trusted_providers:
  - file
  - remote-config
integration_security_excluded_checks:
  - <INTEGRATION_NAME>
```

Con esta configuración, una integración configurada a través de anotaciones de pod (un proveedor no confiable) no puede hacer referencia a rutas de archivo fuera de `/etc/datadog-agent/certs` o `/var/run/secrets`, a menos que el nombre de la integración esté listado en `integration_security_excluded_checks`.

## Ejemplo: Integración de Postgres {#example-postgres-integration}

En este escenario de ejemplo, usted desplegó Postgres en Kubernetes. Usted desea instalar y configurar la [integración de Datadog-Postgres][26]. Todos sus contenedores de Postgres tienen nombres de contenedor que contienen la cadena `postgres`.

Primero, consulte la [documentación de la integración de Postgres][26] para conocer los pasos de configuración adicionales. La integración de Postgres requiere que cree un usuario de solo lectura llamado `datadog` y almacene la contraseña correspondiente como una variable de entorno llamada `PG_PASSWORD`.

Si usted configurara esta integración **en un servidor**, podría consultar [`postgresql.d/conf.yaml.example`][15] para obtener los parámetros y crear un archivo `postgresql.d/conf.yaml` que contenga lo siguiente:

```yaml
init_config:
instances:
  - host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/postgres.log
    source: postgresql
    service: pg_service
```

Aquí, `<PASSWORD>` corresponde a la contraseña del usuario `datadog` que creó.

Para aplicar esta configuración a sus contenedores de Postgres:

{{< tabs >}}
{{% tab "CRD de DatadogInstrumentation" %}}

Cree el siguiente recurso en el espacio de nombres de la carga de trabajo de Postgres seleccionada:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: postgres-instrumentation
  namespace: <WORKLOAD_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: postgres
  config:
    checks:
      - integration: postgres
        containerName: postgres
        instances:
          - host: "%%host%%"
            port: 5432
            username: datadog
            password: "%%env_PG_PASSWORD%%"
    logs:
      - containerName: postgres
        type: file
        path: /var/log/postgres.log
        source: postgresql
        service: pg_service
```

Utilice la versión de la API, el tipo y el nombre de su carga de trabajo en `targetRef`. El Agent debe tener acceso a `/var/log/postgres.log` para recopilar el archivo. Para obtener más información, consulte [Recopilar logs de un archivo de logs local de un contenedor][30].

Guarde el recurso como `postgres-instrumentation.yaml`, aplíquelo y verifique su estado:

```shell
kubectl apply -f postgres-instrumentation.yaml
kubectl describe datadoginstrumentation postgres-instrumentation -n <WORKLOAD_NAMESPACE>
```

[30]: /es/containers/kubernetes/log/#from-a-container-local-log-file

{{% /tab %}}
{{% tab "Anotaciones" %}}

En su manifiesto de pod:

**Anotaciones de Autodiscovery v2** (para Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgres": {
          "instances": [
            {
              "host": "%%host%%",
              "port": "5432",
              "username": "datadog",
              "password":"%%env_PG_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Anotaciones de Autodiscovery v1**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.check_names: '["postgres"]'
    ad.datadoghq.com/postgres.init_configs: '[{}]'
    ad.datadoghq.com/postgres.instances: |
      [
        {
          "host": "%%host%%",
          "port": "5432",
          "username": "datadog",
          "password":"%%env_PG_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

{{% /tab %}}
{{% tab "Archivo local" %}}
1. Cree un archivo `conf.d/postgresql.d/conf.yaml` en su servidor:

   ```yaml
   ad_identifiers:
     - postgres
   init config:
   instances:
     - host: "%%host%%"
       port: "5432"
       username: "datadog"
       password: "%%env_PG_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/postgres.log"
       source: "postgresql"
       service: "pg_service"
   ```

2. Monte la carpeta `conf.d/` de su servidor en la carpeta `conf.d` del Agent en contenedor.

   Para Datadog Operator:
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Para Helm:
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

En un ConfigMap:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: postgresql-config-map
  namespace: default
data:
  postgresql-config: |-
    ad_identifiers:
      - postgres
    init_config:
    instances:
      - host: "%%host%%"
        port: "5432"
        username: "datadog"
        password: "%%env_PG_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/postgres.log"
        source: "postgresql"
        service: "pg_service"
```

Luego, en su manifiesto, defina `volumeMounts` y `volumes`:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: postgresql-config-map
            mountPath: /etc/datadog-agent/conf.d/postgresql.d
        # [...]
      volumes:
      # [...]
        - name: postgresql-config-map
          configMap:
            name: postgresql-config-map
            items:
              - key: postgresql-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Almacén de clave-valor" %}}

Los siguientes comandos de etcd crean una plantilla de integración de Postgres con un parámetro `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

Observe que cada uno de los tres valores es una lista. Autodiscovery ensambla los elementos de la lista en las configuraciones de integración basándose en índices de lista compartidos. En este caso, compone la primera (y única) configuración de comprobación a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

En `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          postgres.yaml: |-
            ad_identifiers:
              - postgres
            init_config:
            instances:
              - host: "%%host%%"
                port: 5432
                username: "datadog"
                password: "%%env_PG_PASSWORD%%"
```
Como resultado, el Agent contiene un archivo `postgres.yaml` con la configuración anterior en el directorio `conf.d`.

{{% /tab %}}
{{% tab "Helm" %}}

En `datadog-values.yaml`:

```yaml
datadog:
  confd:
    postgres.yaml: |-
      ad_identifiers:
        - postgres
      init_config:
      instances:
        - host: "%%host%%"
          port: 5432
          username: "datadog"
          password: "%%env_PG_PASSWORD%%"
```
Como resultado, el Agent contiene un archivo `postgres.yaml` con la configuración anterior en el directorio `conf.d`.

{{% /tab %}}
{{< /tabs >}}

Estas plantillas hacen uso de [variables de plantilla de Autodiscovery][16]:
- `%%host%%` se completa dinámicamente con la IP del contenedor.
- `%%env_PG_PASSWORD%%` hace referencia a una variable de entorno llamada `PG_PASSWORD` tal como la ve el proceso del Agent.

Para obtener más ejemplos, incluido cómo configurar varias comprobaciones para varios conjuntos de contenedores, consulte [Autodiscovery: escenarios y ejemplos][24].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/docker/integrations/
[2]: /es/getting_started/integrations/#configuring-agent-integrations
[3]: /es/agent/configuration/secrets-management/
[4]: /es/integrations/ceph/
[5]: /es/integrations/varnish/#autodiscovery
[6]: /es/integrations/postfix/
[7]: /es/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /es/integrations/gunicorn/
[9]: /es/integrations/apache/#setup
[10]: /es/integrations/http_check/#setup
[11]: /es/getting_started/integrations/
[12]: /es/getting_started/containers/autodiscovery
[13]: /es/agent/guide/use-community-integrations/
[14]: /es/integrations/redis
[15]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[16]: /es/containers/guide/template_variables/
[17]: /es/integrations/coredns
[18]: /es/integrations/etcd/
[19]: /es/integrations/kube_apiserver_metrics
[20]: /es/containers/guide/auto_conf
[21]: /es/containers/guide/ad_identifiers
[22]: /es/containers/guide/auto_conf/#disable-auto-configuration
[23]: /es/containers/guide/autodiscovery-management
[24]: /es/containers/guide/autodiscovery-examples
[25]: /es/integrations/istio/
[26]: /es/integrations/postgres
[27]: /es/getting_started/integrations/#per-check-tag-configuration
[28]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/providers/names/provider_names.go#L10-L38
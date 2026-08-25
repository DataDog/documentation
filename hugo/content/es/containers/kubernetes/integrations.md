---
aliases:
- /es/agent/autodiscovery/integrations
- /es/guides/servicediscovery/
- /es/guides/autodiscovery/
- /es/agent/kubernetes/integrations
description: Configura integraciones de monitoreo para aplicaciones que se ejecutan
  en Kubernetes utilizando plantillas de Autodiscovery
further_reading:
- link: https://www.datadoghq.com/blog/monitor-karpenter-datadog
  tag: Blog
  text: Monitorea Karpenter con Datadog
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopila los registros de tu aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopila las trazas de tu aplicación
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos a un subconjunto de contenedores solamente
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
- link: https://www.youtube.com/watch?v=nuxmVf9ByE0
  tag: Video
  text: 'Consejos y trucos de Datadog: Cómo escribir anotaciones en Kubernetes con
    JSON para Datadog Autodiscovery'
title: Kubernetes and Integrations
---
Esta página cubre cómo instalar y configurar integraciones para tu infraestructura de Kubernetes utilizando una función de Datadog conocida como _Autodiscovery_. Esto te permite usar [variables][16] como `%%host%%` para poblar dinámicamente la configuración. Para una explicación detallada de cómo funciona Autodiscovery, consulta [Introducción a los Containers: Autodiscovery][12]. Para opciones avanzadas de Autodiscovery, como excluir ciertos contenedores de Autodiscovery o tolerar pods no listos, consulta [Gestión del Descubrimiento de Containers][23].

Si estás utilizando Docker o Amazon ECS, consulta [Docker and Integrations][1].

<div class="alert alert-info">
Algunas integraciones de Datadog no funcionan con Autodescubrimiento porque requieren datos del árbol de procesos o acceso al sistema de archivos: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, y <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Para monitorear integraciones que no son compatibles con Autodiscovery, puedes usar un exportador de Prometheus en el pod para exponer un punto de conexión HTTP, y luego usar la <a href="/integrations/openmetrics/">integración OpenMetrics</a> (que soporta Autodiscovery) para encontrar el pod y consultar el punto de conexión.
</div>

## Configura tu integración {#set-up-your-integration}

Algunas integraciones requieren pasos de configuración, como crear un token de acceso o otorgar permiso de lectura al Datadog Agent. Sigue las instrucciones en la sección **Setup** de la documentación de tu integración.

### Integraciones comunitarias {#community-integrations}
Para usar una integración que no está empaquetada con el Datadog Agent, debes construir una imagen personalizada que contenga la integración deseada. Consulta [Usar Integraciones Comunitarias][13] para obtener instrucciones.

## Configuration {#configuration}

Algunas integraciones de uso común vienen con una configuración predeterminada para Autodiscovery. Consulta [Autodiscovery auto-configuration][20] para más detalles, incluyendo una lista de integraciones configuradas automáticamente y sus correspondientes archivos de configuración predeterminados. Si tu integración está en esta lista y la configuración predeterminada es suficiente para tu caso de uso, no se requiere ninguna acción adicional.

De lo contrario:

1. Elige un método de configuración (anotaciones de pod de Kubernetes, un archivo local, un ConfigMap, un almacén de clave-valor, un manifiesto de Datadog Operator o un Helm chart) que se adapte a tu caso de uso.
2. Consulta el formato de plantilla para el método que elegiste. Cada formato contiene marcadores de posición, como `<CONTAINER_NAME>`.
3. [Proporciona valores](#placeholder-values) para estos marcadores de posición.

{{< tabs >}}
{{% tab "Anotaciones" %}}

Si defines tus pods de Kubernetes directamente con `kind: Pod`, agrega las anotaciones de cada pod directamente bajo su sección `metadata`, como se muestra:

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

Si defines pods de manera indirecta (con deployments, ReplicaSets o ReplicationControllers), agrega anotaciones de pod bajo `spec.template.metadata`.

{{% /tab %}}
{{% tab "Archivo local" %}}

Puedes almacenar plantillas de Autodiscovery como archivos locales dentro del directorio montado `conf.d` (`/etc/datadog-agent/conf.d`). Debes reiniciar tus contenedores del Agent cada vez que cambies, agregues o elimines plantillas.

1. Crea un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en tu host:
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

2. Monta la carpeta `conf.d/` de tu host en la carpeta `conf.d` del Agent en contenedor.

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

Puedes usar [ConfigMaps][1] para definir configuraciones externamente y posteriormente montarlas.

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
{{% tab "Almacenamiento de clave-valor" %}}

Puedes obtener plantillas de Autodiscovery de [Consul][1], [etcd][2] o [ZooKeeper][3]. Puedes configurar tu almacenamiento de clave-valor en el archivo de configuración `datadog.yaml` (y posteriormente montar este archivo dentro del contenedor del Agent), o como variables de entorno en el contenedor del Agent.

**Configura en datadog.yaml**:

En `datadog.yaml`, establece la dirección `<KEY_VALUE_STORE_IP>` y `<KEY_VALUE_STORE_PORT>` de tu almacenamiento de clave-valor:

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

[Reinicia el Datadog Agent][4] para aplicar tus cambios.

**Configura en variables de entorno**:

Con el almacén de clave-valor habilitado como fuente de plantillas, el Agent busca plantillas bajo la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía de clave-valor como esta:

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

Para configurar integraciones en `datadog-agent.yaml`, agrega una anulación `extraConfd.configDataMap` al componente `nodeAgent` de tu configuration `DatadogAgent`. Cada clave se convierte en un archivo en el directorio `conf.d` del Agent.

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
<div class="alert alert-info">Cuando se despliegan múltiples <code>DatadogAgent</code> Los CRDs utilizan <code>configDataMap</code>, cada CRD escribe en un ConfigMap compartido llamado <code>nodeagent-extra-confd</code>. Esto puede causar que las configuraciones se anulen entre sí. </div>

Para monitorear un [Cluster Check][1], agrega una anulación `extraConfd.configDataMap` al componente `clusterAgent`. También debes habilitar los cluster checks configurando `features.clusterChecks.enabled: true`.

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

Consulta [Cluster Checks][1] para más contexto.

[1]: /es/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

Tu archivo `datadog-values.yaml` contiene una sección `datadog.confd` donde puedes definir plantillas de Autodiscovery. Puedes encontrar ejemplos en línea en el archivo de muestra [values.yaml][1]. Cada clave se convierte en un archivo en el directorio `conf.d` del Agent.

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

Para monitorear un [Cluster Check][3], define tu plantilla bajo `clusterAgent.confd`. Puedes encontrar ejemplos en línea en el archivo de muestra [values.yaml][2]. También debes habilitar el Cluster Agent configurando `clusterAgent.enabled: true` y habilitar los cluster checks configurando `datadog.clusterChecks.enabled: true`.

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

Consulta [Cluster Checks][3] para más contexto.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /es/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### Valores de marcador de posición {#placeholder-values}

Proporcione valores de marcador de posición de la siguiente manera:

`<INTEGRATION_NAME>`
: El nombre de su integración de Datadog, como `etcd` o `redisdb`.

`<CONTAINER_NAME>`
: Un identificador para hacer coincidir con los nombres (`spec.containers[i].name`, **no** `spec.containers[i].image`) de los contenedores que corresponden a su integración.

`<CONTAINER_IMAGE>`
: Un identificador para hacer coincidir con la imagen del contenedor (`.spec.containers[i].image`). <br/><br/>
Por ejemplo: si proporcionas `redis` como un identificador de contenedor, tu plantilla de Autodiscovery se aplica a todos los contenedores con nombres de imagen que coincidan con `redis`. Si tienes un contenedor ejecutándose `foo/redis:latest` y `bar/redis:v2`, tu plantilla de Autodiscovery se aplica a ambos contenedores.<br/><br/>
El parámetro `ad_identifiers` acepta una lista, por lo que puedes proporcionar múltiples identificadores de contenedor. También puedes usar identificadores personalizados. Consulta [Identificadores de Autodiscovery Personalizados][21].

`<INIT_CONFIG>`
: Los parámetros de configuración que se enumeran bajo `init_config` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración. La sección `init_config` suele estar vacía.

`<INSTANCES_CONFIG>`
: Los parámetros de configuración que se enumeran bajo `instances` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración.

`<LOGS_CONFIG>`
: Los parámetros de configuración que se enumeran bajo `logs` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración.

### Parámetros avanzados de anotación {#advanced-annotation-parameters}

Además de las anotaciones básicas de Autodiscovery para verificaciones, registros e instancias, puedes usar anotaciones adicionales para personalizar el comportamiento de las verificaciones:

#### Cardinalidad de etiquetas {#tag-cardinality}

Establece el nivel de cardinalidad de etiquetas para una verificación específica utilizando la anotación `check_tag_cardinality`. Esto anula la configuración global de cardinalidad de etiquetas del Agent para las métricas recopiladas por ese check.

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

<div class="alert alert-info">El <code>check_tag_cardinality</code> la anotación solo afecta a las métricas recopiladas por las verificaciones de integración. No afecta a las métricas enviadas a través de DogStatsD. Para configurar la cardinalidad de etiquetas de DogStatsD, utiliza el parámetro de configuración global <code>dogstatsd_tag_cardinality</code> o la variable de entorno. <code>DD_DOGSTATSD_TAG_CARDINALITY</code> variable de entorno.</div>

Para más información sobre la cardinalidad de etiquetas, consulta [Configuración de etiquetas por verificación][27].

### Auto-configuración{#auto-configuration}

El Datadog Agent reconoce automáticamente y proporciona una configuración básica para algunas tecnologías comunes. Para una lista completa, consulta [Auto-configuración de Autodiscovery][20].

Las configuraciones establecidas con anotaciones de Kubernetes tienen prioridad sobre la auto-configuración, pero la auto-configuración tiene prioridad sobre las configuraciones establecidas con Datadog Operator o Helm. Para usar Datadog Operator o Helm para configurar una integración en la lista de [Auto-configuración de Autodiscovery][20], debes [deshabilitar la auto-configuración][22].

## Las integraciones a menudo necesitan leer archivos de configuración, certificados u otros recursos del sistema de archivos.{#integrations-security}

Cuando las rutas de archivos provienen de proveedores de configuración no confiables (por ejemplo, anotaciones de pods o auto-descubrimiento de servicios externos), existe un riesgo de recorrido de ruta o acceso no autorizado a archivos. .

A partir de la versión 7.78.0 del Agente de Datadog, puede establecer los siguientes parámetros en el `datadog.yaml` del Agente para controlar el acceso al sistema de archivos según el nivel de confianza de un proveedor de configuración.

| Parámetro | Tipo | Predeterminado | Descripción |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | bool | `false` | Cuando está habilitado, las integraciones ignoran los parámetros de configuración que se refieren a rutas de archivos si el proveedor de configuración no es de confianza. |
| `integration_file_paths_allowlist` | lista | `[]` | Lista de rutas de archivos a las que las integraciones tienen permitido acceder, incluso cuando son proporcionadas por un proveedor de configuración no confiable. Una lista vacía significa que se permiten todas las rutas de archivos. |
| `integration_trusted_providers` | lista | `["file", "remote-config"]` | Lista de proveedores de configuración considerados de confianza. Cualquier proveedor que no esté en esta lista se considera no confiable. Por defecto, los archivos de configuración locales (`file`) y Datadog Remote Configuration (`remote-config`) son de confianza. Para la lista completa de proveedores soportados, consulte [nombres de proveedores del Datadog Agent][28]. |
| `integration_security_excluded_checks` | lista | `[]` | Lista de nombres de integraciones que están excluidas de las restricciones de seguridad anteriores. |

Estas opciones son compatibles hacia atrás: los valores predeterminados preservan el comportamiento existente. Para optar por esta opción, habilite `integration_ignore_untrusted_file_params` y ajuste los parámetros restantes para que coincidan con su entorno.

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

Con esta configuración, una integración configurada a través de anotaciones de pod (un proveedor no confiable) no puede hacer referencia a rutas de archivos fuera de `/etc/datadog-agent/certs` o `/var/run/secrets`, a menos que el nombre de la integración esté listado en `integration_security_excluded_checks`.

## Ejemplo: integración de Postgres {#example-postgres-integration}

En este escenario de ejemplo, implementaste Postgres en Kubernetes. Deseas configurar la [integración de Datadog-Postgres][26]. Todos tus contenedores de Postgres tienen nombres de contenedor que contienen la cadena `postgres`.

Primero, consulta la [documentación de integración de Postgres][26] para cualquier paso adicional de configuración. La integración de Postgres requiere que crees un usuario de solo lectura llamado `datadog` y almacenes la contraseña correspondiente como una variable de entorno llamada `PG_PASSWORD`.

Si configuraras esta integración **en un host**, podrías consultar [`postgresql.d/conf.yaml.example`][15] para los parámetros y crear un archivo `postgresql.d/conf.yaml` que contenga lo siguiente:

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

Aquí, `<PASSWORD>` corresponde a la contraseña para el usuario `datadog` que creaste.

Para aplicar esta configuración a tus contenedores de Postgres:

{{< tabs >}}
{{% tab "Anotaciones" %}}

En tu manifiesto de pod:

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
1. Crea un archivo `conf.d/postgresql.d/conf.yaml` en tu host:

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

2. Monta la carpeta `conf.d/` de tu host en la carpeta `conf.d` del Datadog Agent en contenedor.

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

Luego, en tu manifiesto, define el `volumeMounts` y el `volumes`:

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
{{% tab "Almacenamiento de clave-valor" %}}

Los siguientes comandos de etcd crean una plantilla de integración de Postgres con un parámetro `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

Nota que cada uno de los tres valores es una lista. Autodiscovery ensambla los elementos de la lista en las configuraciones de integración basándose en índices de lista compartidos. En este caso, compone la primera (y única) configuración de verificación a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

{{% /tab %}}
{{% tab "Operador de Datadog" %}}

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
Como resultado, el Datadog Agent contiene un archivo `postgres.yaml` con la configuración anterior en el directorio `conf.d`.

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
Como resultado, el Datadog Agent contiene un archivo `postgres.yaml` con la configuración anterior en el directorio `conf.d`.

{{% /tab %}}
{{< /tabs >}}

Estas plantillas utilizan [variables de plantilla de Autodiscovery][16]:
- `%%host%%` se llena dinámicamente con la IP del contenedor.
- `%%env_PG_PASSWORD%%` hace referencia a una variable de entorno llamada `PG_PASSWORD` tal como la ve el proceso del Datadog Agent.

Para más ejemplos, incluyendo cómo configurar múltiples verificaciones para múltiples conjuntos de contenedores, consulte [Autodiscovery: Escenarios y Ejemplos][24].

## Lectura adicional {#further-reading}

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
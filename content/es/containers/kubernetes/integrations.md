---
aliases:
- /es/agent/autodiscovery/integrations
- /es/guides/servicediscovery/
- /es/guides/autodiscovery/
- /es/agent/kubernetes/integrations
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/apm/
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/kubernetes/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Kubernetes e integraciones
---

Esta página cubre la instalación y la configuración de integraciones para tu infraestructura Kubernetes utilizando una característica de Datadog conocida como _Autodiscovery_. Esto te permite utilizar [variables][16] como `%%host%%` para rellenar dinámicamente tus parámetros de configuración. Para ver una explicación detallada de cómo funciona Autodiscovery, consulta [Empezando con contenedores: Autodiscovery][12]. Para ver las opciones avanzadas de Autodiscovery, como la exclusión de determinados contenedores de Autodiscovery o la tolerancia de pods no listos, consulta la [gestión de Autodiscovery][23].

Si utilizas Docker o Amazon ECS, consulta [Docker e integraciones][1].

<div class="alert alert-info">
Algunas integraciones de Datadog no funcionan con Autodiscovery, ya que requieren datos del árbol de procesos o un acceso a los sistemas de archivos: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">nodetools Cassandra</a> y <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Para monitorizar integraciones que no son compatibles con Autodiscovery, puedes utilizar un exportador Prometheus en el pod, para exponer un endpoint HTTP, y luego puedes utilizar la <a href="/integrations/openmetrics/">integración con OpenMetrics</a> (compatible con Autodiscovery) para encontrar el pod y consultar el endpoint. 
</div>

## Configurar su integración

Algunas integraciones requieren pasos de configuración, como la creación de un token de acceso o la concesión de permisos de lectura al Datadog Agent. Sigue las instrucciones de la sección **Configuración** de la documentación de integraciones.

### Integraciones comunitarias
Para utilizar una integración que no está empaquetada con el Datadog Agent, debes crear una imagen personalizada que contenga la integración deseada. Consulta el [uso de integraciones comunitarias][13] para obtener instrucciones.

## Configuración

Algunas integraciones de uso común vienen por defecto con una configuración para Autodiscovery. Consulta [Auto-configuración de Autodiscovery][20] para obtener más detalles, incluyendo una lista de integraciones auto-configuradas y sus correspondientes archivos de configuración por defecto. Si tu integración está en esta lista y la configuración por defecto es suficiente para tu caso de uso, no es necesario realizar ninguna acción adicional.

O:

1. Elige un método de configuración (anotaciones en pods de Kubernetes, un archivo local, un ConfigMap, una base de datos clave-valor, un manifiesto del Datadog Operator o un chart de Helm) que se adapte a tu caso de uso.
2. Consulta el formato de plantilla del método que hayas elegido. Cada formato contiene parámetros como `<CONTAINER_IDENTIFIER>`.
3. [Proporciona valores](#placeholder-values) para estos parámetros.

{{< tabs >}}
{{% tab "Annotations" (Anotaciones) %}}

Si defines tus pods de Kubernetes directamente con `kind: Pod`, añade las anotaciones de cada pod directamente bajo su sección `metadata`, como se muestra a continuación:

**Anotaciones de Autodiscovery v2** (para el Datadog Agent v7.36 o posteriores)

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
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
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCES_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

Si defines pods indirectamente (con despliegues, ReplicaSets o ReplicationControllers), añade anotaciones de pod en `spec.template.metadata`.

{{% /tab %}}
{{% tab "Local file" (Archivo local) %}}

Puedes almacenar plantillas de Autodiscovery como archivos locales dentro del directorio montado `/conf.d`. Debes reiniciar tus contenedores del Agent cada vez que cambies, añadas o elimines plantillas.

1. Crea un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en tu host:
   ```yaml
   ad_identifiers:
     - <CONTAINER_IDENTIFIER>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. Monta tu carpeta host `conf.d/` en la carpeta `conf.d` del Agent contenedorizado.

{{% /tab %}}
{{% tab "ConfigMap" %}}

Puedes utilizar [ConfigMaps][1] para definir externamente configuraciones y montarlas posteriormente.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <CONTAINER_IDENTIFIER>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap

{{% /tab %}}
{{% tab "Key-value store" (Base de datos clave-valor) %}}

Puedes obtener plantillas de Autodiscovery de [Consul][1], [etcd][2] o [ZooKeeper][3]. Puedes configurar tu base de datos clave-valor en el archivo de configuración `datadog.yaml` (y posteriormente montar este archivo en el contenedor del Agent) o como variables de entorno en el contenedor del Agent.

**Configurar en datadog.yaml**:

En `datadog.yaml`, configura la dirección `<KEY_VALUE_STORE_IP>` y el`<KEY_VALUE_STORE_PORT>` de tu base de datos clave-valor:

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

**Configurar en variables de entorno**:

Si la base de datos clave-valor se ha activado como fuente de plantillas, el Agent busca plantillas con la clave `/datadog/check_configs`. Autodiscovery espera una jerarquía clave-valor como la siguiente:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
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

Para configurar integraciones en `datadog-agent.yaml`, añade una sobreescritura al componente `extraConfd.configDataMap` `nodeAgent` de tu configuración del `DatadogAgent`. Cada clave se convierte en archivo en el directorio `conf.d` del Agent.

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
              - <CONTAINER_IDENTIFIER>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

Para monitorizar un [check de clústeres][1], añade una sobreescritura `extraConfd.configDataMap` al componente `clusterAgent`. También debes activar los checks de clústeres configurando `features.clusterChecks.enabled: true`. 

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
              - <CONTAINER_IDENTIFIER>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

Consulta los [checks de clústeres][1] para más contexto.

[1]: /es/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

Tu archivo `datadog-values.yaml` contiene una sección `datadog.confd` donde puedes definir plantillas de Autodiscovery. Puedes encontrar ejemplos en línea en [values.yaml][1]. Cada clave se convierte en archivo en el directorio `conf.d` del Agent.

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IDENTIFIER>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

Para monitorizar un [check de clústeres][3], define tu plantilla en `clusterAgent.confd`. Puedes encontrar ejemplos en línea en [values.yaml][2]. También debes habilitar el Cluster Agent, configurando `clusterAgent.enabled: true`, y habilitar los checks de clústeres, configurando `datadog.clusterChecks.enabled: true`. 

```yaml
datadog:
  clusterChecks:
    enabled: true
clusterAgent:
  enabled: true
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IDENTIFIER>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

Consulta los [checks de clústeres][1] para más contexto.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /es/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### Valores de parámetros

Proporcione los siguientes valores de parámetros:

`<INTEGRATION_NAME>`
: nombre de tu integración de Datadog, como `etcd` o `redisdb`.

`<CONTAINER_IDENTIFIER>`
: identificador para cotejar con los nombres (`spec.containers[0].name`, **no** `spec.containers[0].image`) de los contenedores que corresponden a tu integración. El parámetro `ad_identifiers` toma una lista, por lo que puedes proporcionar varios identificadores de contenedores.<br/><br/>
Por ejemplo: si proporcionas `redis` como identificador de contenedor, tu plantilla de Autodiscovery se aplicará a todos los contenedores cuyos nombres coincidan con `redis`. Si tienes un contenedor que ejecuta `foo/redis:latest` y `bar/redis:v2`, tu plantilla de Autodiscovery se aplicará a ambos contenedores.<br/><br/>
También puedes utilizar identificadores personalizados. Consulta los [identificadores personalizados de Autodiscovery][21].

`<INIT_CONFIG>`
: parámetros de configuración que figuran en `init_config` en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración. La sección `init_config` suele estar vacía.

`<INSTANCES_CONFIG>`
: parámetros de configuración que figuran en `instances`, en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración.

`<LOGS_CONFIG>`
: parámetros de configuración que figuran en `logs`, en el archivo `<INTEGRATION_NAME>.d/conf.yaml.example` de tu integración.

### Auto-configuración

El Datadog Agent reconoce y proporciona automáticamente una configuración básica para algunas tecnologías comunes. Para ver una lista completa, consulta [Auto-configuración de Autodiscovery][20].

Las configuraciones establecidas con anotaciones de Kubernetes tienen prioridad sobre la auto-configuración, pero la auto-configuración tiene prioridad sobre las configuraciones establecidas con el Datadog Operator o con Helm. Para utilizar el Datadog Operator o Helm para configurar una integración en la lista de [auto-configuración de Autodiscovery][20], debes [desactivar la auto-configuración][22].

## Ejemplo: integración con Postgres

En este escenario de ejemplo, has desplegado Postgres en Kubernetes y quieres configurar la [integración Datadog-Postgres][26]. Todos tus contenedores de Postgres tienen nombres de contenedor que contienen la cadena `postgres`.

En primer lugar, consulta la [documentación de integraciones de Postgres][26] para conocer los pasos de configuración adicionales. La integración de Postgres requiere la creación de un usuario de sólo lectura llamado `datadog` y el almacenamiento de la contraseña correspondiente como una variable de entorno llamada `PG_PASSWORD`.

Si tuvieras que configurar esta integración **en un host**, podrías hacer referencia a [`postgresql.d/conf.yaml.example`][15] para ver los parámetros y crear un archivo `postgresql.d/conf.yaml` que contenga lo siguiente:

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

Aquí, `<PASSWORD>` corresponde a la contraseña del usuario `datadog` que has creado.

Para aplicar esta configuración a tus contenedores Postgres:

{{< tabs >}}
{{% tab "Annotations" (Anotaciones) %}}

En el manifiesto de tu pod:

**Anotaciones de Autodiscovery v2** (para el Datadog Agent v7.36 o posteriores)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgresql": {
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
    ad.datadoghq.com/postgres.check_names: '["postgresql"]'
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
{{% tab "Local file" (Archivo local) %}}
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

2. Monta tu carpeta host `conf.d/` en la carpeta `conf.d` del Agent contenedorizado.
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

A continuación, define `volumeMounts` y `volumes` en tu manifiesto:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: postgresql-config-map
            mountPath: /conf.d/postgresql.d
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
{{% tab "Key-value store" (Base de datos clave-valor) %}}

Los siguientes comandos etcd crean una plantilla de integración con Postgres con un parámetro `password` personalizado:

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgresql"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

Fíjate que cada uno de los tres valores es una lista. Autodiscovery agrupa los elementos de la lista en configuraciones de integraciones basadas en índices de lista compartidos. En este caso, conforma la primera (y única) configuración de checks a partir de `check_names[0]`, `init_configs[0]` y `instances[0]`.

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
          postgresql.yaml: |-
            ad_identifiers:
              - postgres
            init_config:
            instances:
              - host: "%%host%%"
                port: 5432
                username: "datadog"
                password: "%%env_PG_PASSWORD%%"
```
Como resultado, el Agent contiene un archivo `postgresql.yaml` con la configuración anterior en el directorio `conf.d`.

{{% /tab %}}
{{% tab "Helm" %}}

En `datadog-values.yaml`:

```yaml
datadog:
  confd:
    postgresql.yaml: |-
      ad_identifiers:
        - postgres
      init_config:
      instances:
        - host: "%%host%%"
          port: 5432
          username: "datadog"
          password: "%%env_PG_PASSWORD%%"
```
Como resultado, el Agent contiene un archivo `postgresql.yaml` con la configuración anterior en el directorio `conf.d`.

{{% /tab %}}
{{< /tabs >}}

Estas plantillas utilizan [variables de plantillas de Autodiscovery][16]:
- `%%host%%` se rellena dinámicamente con la IP del contenedor.
- `%%env_PG_PASSWORD%%` hace referencia a una variable de entorno denominada `PG_PASSWORD`, que es como la ve el proceso del Agent.

Para ver más ejemplos, incluyendo la configuración de múltiples checks para múltiples conjuntos de contenedores, consulta [Autodiscovery: escenarios y ejemplos][24].

## Leer más

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
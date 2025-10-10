---
aliases:
- /es/integrations/guide/pivotal-cloud-foundry-manual-setup
description: Pasos para configurar la integración de Cloud Foundry
further_reading:
- link: https://www.datadoghq.com/blog/monitor-tanzu-application-service/
  tag: Blog
  text: Monitorizar aplicaciones que se ejecutan en el servicio de VMware Tanzu Application
title: Guía de configuración de Cloud Foundry
---

## Información general

Los despliegues de Cloud Foundry pueden enviar métricas y eventos a Datadog. Puedes realizar un seguimiento del estado y la disponibilidad de todos los nodos de un despliegue, monitorizar los trabajos que ejecutan, recopilar métricas de Loggregator Firehose y mucho más. Esta página te explica cómo configurar la monitorización para tu entorno de Cloud Foundry.

Existen cuatro componentes principales para la integración de Cloud Foundry con Datadog.

- **Cloud Foundry Buildpack** (Paquete de compilación de Cloud Foundry): utilizado para recopilar métricas personalizadas, logs, trazas y perfiles de tus aplicaciones de Cloud Foundry.
- **Agent BOSH Release** (Versión de Agent BOSH): utilizado para recopilar eventos y métricas de VMs de BOSH y los envía a Datadog.
- **Cluster Agent BOSH Release** (Versión del Cluster Agent BOSH) utilizado para recopilar metadatos a nivel de clúster y de aplicación desde CAPI y BBS y etiquetas de contenedor.
- **Firehose Nozzle**: recopila el resto de métricas del Loggregator Firehose en tu infraestructura.

Lee la guía de la [arquitectura de Datadog VMware Tanzu Application Service][32] para obtener más información.

## Monitorizar tus aplicaciones

Utiliza el **Paquete de compilación de Datadog Cloud Foundry** para monitorizar tu aplicación de Cloud Foundry. Se trata de un [paquete de compilación de suministro][2] de Cloud Foundry que instala el Datadog Container Agent (una versión ligera del Agent), Datadog Trace Agent para APM, y el archivo binario de Datadog DogStatsD en el que se ejecuta tu aplicación.

### Múltiples paquetes de compilación (recomendado)

1. Descarga la [última versión del paquete de compilación de Datadog][7] y súbela a tu entorno de Cloud Foundry.

    ```shell
    cf create-buildpack datadog-cloudfoundry-buildpack ./datadog-cloudfoundry-buildpack-latest.zip
    ```

2. Haz push de tu aplicación, incluyendo tanto el paquete de compilación de Datadog como tus paquetes de compilación normales. El proceso para subir tu aplicación con múltiples paquetes de compilación se describe en [Pushing an App with Multiple Buildpacks][3].

    ```shell
    cf push <YOUR_APP> --no-start -b binary_buildpack
    cf v3-push <YOUR_APP> -b datadog-cloudfoundry-buildpack -b <YOUR-BUILDPACK-1> -b <YOUR-FINAL-BUILDPACK>
    ```

      **Nota**: Si estabas utilizando un único paquete de compilación anteriormente, debería ser el último cargado para que funcione como el paquete de compilación final. Para obtener más información, consulta [How Buildpacks Work de Cloud Foundry][6].

### Múltiples paquetes de compilación (obsoleto)

El paquete de compilación de Datadog utiliza la función de Cloud Foundry [Pushing an App with Multiple Buildpacks][3] introducida en la versión `1.12`.

Para versiones anteriores, Cloud Foundry proporciona una versión anterior compatible de esta función en forma de [múltiples paquetes de compilación][4]. Debes instalar y configurar esta versión para utilizar el paquete de compilación de Datadog.

1. Descarga la última versión de múltiples paquetes de compilación y súbela a tu entorno de Cloud Foundry.

    ```shell
    cf create-buildpack multi-buildpack ./multi-buildpack-v-x.y.z.zip 99 --enable
    ```

2. Añade un manifiesto de múltiples paquetes de compilación a tu aplicación. Como se detalla en la [sección de uso][5] del repositorio de múltiples paquetes de compilación, crea un archivo `multi-buildpack.yml` en la raíz de tu aplicación y configúralo para tu entorno. Añade un enlace al paquete de compilación de Datadog Cloud Foundry y a tu paquete de compilación normal:

    ```yaml
    buildpacks:
      - "https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-4.36.0.zip"
      - "https://github.com/cloudfoundry/ruby-buildpack#v1.7.18" # Replace this with your regular buildpack
    ```

      Las direcciones URL del paquete de compilación de Datadog son:
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip`
      - `https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-x.y.z.zip`

      No utilices aquí la versión `latest` (sustituye `x.y.z` por la versión específica que desees utilizar).

      **Nota**: Tu paquete de compilación normal debe ser el último que aparezca en el manifiesto. Para obtener más información, consulta [How Buildpacks Work de Cloud Foundry][6].

3. Haz push de tu aplicación con múltiples paquetes de compilación. Asegúrate de que `multi-buildpack` es el paquete de compilación seleccionado por Cloud Foundry para tu aplicación:

    ```shell
    cf push <YOUR_APP> -b multi-buildpack
    ```

### Paquete de compilación meta **(obsoleto)**

Si eres un usuario de [paquete de compilación meta][8], el paquete de compilación de Datadog se puede utilizar como un decorador predefinido.

**Nota**: Cloud Foundry ha dejado obsoleto el paquete de compilación meta en favor del paquete de compilación meta.

## Monitorizar tu clúster de Cloud Foundry

Hay tres puntos de integración con Datadog, cada uno de los cuales logra un objetivo diferente:

- **Datadog Agent BOSH release** (Versión del Datadog Agent BOSH): instala el Datadog Agent en cada nodo de tu despliegue para realizar un seguimiento del sistema, red y métricas del disco. Habilita cualquier otro check del Agent que desees.
- **Datadog Cluster Agent BOSH release** (Versión del Datadog Cluster Agent BOSH): despliega un trabajo del Datadog Cluster Agent. El trabajo consulta CAPI y la API BBS para recopilar metadatos a nivel de clúster y de aplicación para proporcionar capacidades mejoradas de etiquetado en tus aplicaciones y contenedores.
- **Datadog Firehose Nozzle**: despliega uno o más trabajos de Datadog Firehose Nozzle. Las tareas acceden al Loggregator Firehose de tu despliegue y envían todo lo que no sean métricas de contenedor a Datadog.

<div class="alert alert-danger">
Estas integraciones están destinadas a los administradores de despliegue de Cloud Foundry, no a los usuarios finales.
</div>

### Requisitos previos

Debes tener un despliegue de Cloud Foundry en funcionamiento y acceso al BOSH Director que lo gestiona. También necesitas la CLI de BOSH para desplegar cada integración. Puedes utilizar cualquiera de las versiones principales de la CLI: [v1][15] o [v2][16].

### Instalar la versión del Datadog Agent BOSH

Datadog proporciona tarballs del Datadog Agent empaquetados como una versión de BOSH. Sube la última versión a tu BOSH Director e instálala en cada nodo de tu despliegue como un [complemento][17] (del mismo modo que un Director despliega el BOSH Agent en todos los nodos).

#### Cargar la versión de Datadog a tu BOSH Director

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
```

Si quieres crear tu propia versión, consulta el [repositorio de versiones del Datadog Agent BOSH][18].

#### Configurar el Agent como complemento en tu BOSH Director

Añade lo siguiente al archivo de configuración de tu BOSH Director en tiempo de ejecución (`runtime.yml`):

```text
---
releases:
  - name: datadog-agent
    version: <VERSION_YOU_UPLOADED> # specify the real version (x.y.z not 'latest')
addons:
- name: datadog
  jobs:
  - name: dd-agent
    release: datadog-agent
  properties:
    dd:
      use_dogstatsd: true
      dogstatsd_port: 18125       # Many CF deployments have a StatsD already on port 8125
      api_key: <DATADOG_API_KEY>
      tags: ["<KEY:VALUE>"]       # any tags you wish
      generate_processes: true    # to enable the process check
```

Para ver qué versión de `datadog-agent` se cargó antes, ejecuta `bosh releases`.

#### Cargar el archivo runtime.yml

Comprueba si tienes un `runtime-config` previamente configurado ejecutando:

```text
# BOSH CLI v1
`bosh runtime-config`
# BOSH CLI v2
bosh -e <BOSH_ENV> runtime-config
```

En BOSH v2, si el archivo `runtime.yml` está vacío, deberías ver la respuesta: `No runtime config`.

#### Activar checks adicionales del Agent

Por cada check del Agent adicional que desees habilitar en tu despliegue, añade tu configuración bajo la clave `properties.dd.integrations`, por ejemplo:

```yaml
properties:
    dd:
        integrations:
            directory:
                init_config: {}
                instances:
                    directory: '.'
            #process:
            #  init_config: {}
            #...
```

La configuración bajo cada nombre de check utiliza el mismo formato que al configurar el check en tu propio archivo en el directorio `conf.d` del Agent.

Todo lo que configures en `runtime.yml` se aplica a todos los nodos. No puedes configurar un check para un subconjunto de nodos en tu despliegue.

Para personalizar la configuración de los checks por defecto (sistema, red, disco y NTP), consulta [todas las opciones de la lista de configuración ][19] para la versión del Datadog Agent BOSH.

#### Sincronizar la configuración del tiempo de ejecución con BOSH Director

```text
# BOSH CLI v1
bosh update runtime-config runtime.yml
# BOSH CLI v2
bosh update-runtime-config -e <BOSH_ENV> runtime.yml
```

#### Volver a hacer el despliegue de Cloud Foundry

```text
# BOSH CLI v1
bosh deployment <YOUR_DEPLOYMENT_MANIFEST>.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d <YOUR_DEPLOYMENT> -e <BOSH_ENV> deploy --recreate <YOUR_DEPLOYMENT_MANIFEST>.yml
```

Dado que la configuración de tiempo de ejecución se aplica globalmente, BOSH vuelve a desplegar todos los nodos del despliegue. Si tienes más de un despliegue, vuelve a hacer todos los despliegues para instalar el Datadog Agent en todas partes.

#### Comprobar que el Agent está instalado en todas partes

Para comprobar si las instalaciones del Agent se han realizado correctamente, filtra por `cloudfoundry` en el [Mapa de host][20]. La versión del Datadog Agent BOSH etiqueta cada host con `cloudfoundry`. Opcionalmente, agrupa hosts por cualquier etiqueta, como `bosh_job`, como en la siguiente captura de pantalla:

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map.png" alt="El mapa de host en Datadog con cloudfoundry ingresado en la sección Filtro y bosh_job en la sección Grupo" >}}

Haz clic en cualquier host para ampliarlo y, a continuación, haz clic en **sistema** dentro de tu hexágono para asegurarte de que Datadog recibe las métricas del sistema:

{{< img src="integrations/cloud_foundry/cloud-foundry-host-map-detail.png" alt="La vista de detalles para un host en el mapa de host de Datadog con la integración del sistema seleccionada y múltiples gráficos que muestran datos" >}}

#### Recopilación de metadatos de CAPI y etiquetas del Cluster Agent en contenedores de Cloud Foundry

Para versiones `7.40.1` y posteriores del Datadog Agent, puedes recopilar metadatos de CAPI y etiquetas del Datadog Cluster Agent (DCA) desde contenedores de Cloud Foundry. Las etiquetas y anotaciones de la aplicación están presentes en los logs, métricas y trazas de aplicación. 

### Instalar la versión del Datadog Cluster Agent (DCA) BOSH

La versión del Datadog Cluster Agent BOSH es un paquete de BOSH para ejecutar Datadog Cluster Agent en Cloud Foundry.

Este paquete es para ser usado en conjunto con la [versión de Datadog Agent BOSH][18].
Proporciona un enlace BOSH consumido por la versión del Datadog Agent BOSH para Autodiscover y para programar integraciones para tus aplicaciones, así como un mejor etiquetado para contenedores de aplicaciones y detección de procesos. Para más información, consulta la [especificación en GitHub][33].

#### Cargar la versión del Cluster Agent de Datadog a tu BOSH Director

```text
# BOSH CLI v1
bosh upload release https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> https://cloudfoundry.datadoghq.com/datadog-cluster-agent/datadog-cluster-agent-boshrelease-latest.tgz
```

#### Despliegue
Utiliza la plantilla de manifiesto de despliegue de ejemplo que aparece a continuación para desplegar el Datadog Cluster Agent y exponerlo al Datadog Agent. Consulta la [especificación en GitHub][33] para ver las propiedades disponibles.

```yaml
jobs:
- name: datadog-cluster-agent
  release: datadog-cluster-agent
  properties:
    cluster_agent:
      token: <TOKEN>  # 32 or more characters in length 
      bbs_poll_interval: 10
      warmup_duration: 5
      log_level: INFO
      bbs_ca_crt: <CA_CERTIFICATE>
      bbs_client_crt: <CLIENT_CERTIFICATE>
      bbs_client_key: <CLIENT_PRIVATE_KEY>
  provides:
    datadog-cluster-agent:
      aliases:
        - domain: <DNS_NAME (e.g. datadog-cluster-agent)>
```

Sustituye `<TOKEN>` por tu [token del Cluster Agent][34].

**Nota**: Esto crea un alias de DNS para el servicio del Datadog Cluster Agent que lo hace direccionable a través de un alias estático. Consulta [Alias de servicios](https://bosh.io/docs/dns/#aliases-to-services) en la documentación de BOSH para más detalles sobre los alias de DNS de BOSH.

Este alias de DNS se especifica en la propiedad de trabajo [`cluster_agent.address`](https://bosh.io/jobs/dd-agent?source=github.com/DataDog/datadog-agent-boshrelease&version=4.0.0#p%3dcluster_agent.address) de la configuración de tiempo de ejecución del Datadog Agent, como se muestra en la plantilla de ejemplo siguiente:

```yaml
jobs:
- name: datadog-agent
  release: datadog-agent
  properties: 
    ...
    cluster_agent:
      address: <DNS_NAME>
    ...
```

#### Detección de configuraciones de integración
El Datadog Cluster Agent detecta integraciones basándose en una variable de entorno `AD_DATADOGHQ_COM` establecida en tus aplicaciones.
Esta variable de entorno es un objeto JSON que contiene las plantillas de configuración de Autodiscovery para tu aplicación. El Datadog Cluster Agent puede detectar y renderizar dos tipos de configuraciones:
  1. Configuraciones para servicios vinculados a tu aplicación, ya sean proporcionados por el usuario o por un intermediario de servicio.
  2. Configuraciones para servicios que se ejecutan dentro de tu aplicación, por ejemplo, un servidor web.

El objeto JSON debe ser un diccionario que asocie un nombre de servicio a tu plantilla de Autodiscovery:
```
{
    "<SERVICE_NAME>": {
        "check_names": [<LIST_OF_INTEGRATION_NAMES_TO_CONFIGURE>],
        "init_configs": [<LIST_OF_INIT_CONFIGS>],
        "instances": [<LIST_OF_INSTANCES>],
        "variables": [<LIST_OF_VARIABLES_DEFINITIONS>]
    }
}
```

Para servicios vinculados a la aplicación, el `<SERVICE_NAME>` debe ser el nombre del servicio tal y como aparece en la salida del comando `cf services`. Para servicios dentro de la aplicación, `<SERVICE_NAME>` puede ser cualquier cosa.  

La clave `variables` se utiliza únicamente para servicios vinculados para resolver variables de plantilla dentro de la plantilla de configuración, y debe contener la ruta JSON del valor deseado para la variable de entorno `VCAP_SERVICES`. Puedes inspeccionar esto con el comando `cf env <APPLICATION_NAME>`.

**Nota:** El Datadog Cluster Agent sólo es capaz de resolver credenciales de servicios directamente disponibles en la variable de entorno `VCAP_SERVICES` para Autodiscovery.

##### Ejemplo

Esta configuración de Autodiscovery en la variable de entorno `AD_DATADOGHQ_COM` demuestra una aplicación de Cloud Foundry ejecutando un servidor web enlazado a un servicio de PostgreSQL:

```
AD_DATADOGHQ_COM: '{
    "web_server": {
        "check_names": ["http_check"],
        "init_configs": [{}],
        "instances": [
            {
                "name": "My Nginx",
                "url": "http://%%host%%:%%port_p8080%%",
                "timeout": 1
            }
        ]
    }
    "postgres-service-name": {
        "check_names": ["postgres"],
        "init_configs": [{}],
        "instances": [
            {
                "host": "%%host%%",
                "port": 5432,
                "username": "%%username%%",
                "dbname": "%%dbname%%",
                "password": "%%password%%"
            }
        ],
        "variables": {
            "host": "$.credentials.host",
            "username": "$.credentials.Username",
            "password": "$.credentials.Password",
            "dbname": "$.credentials.database_name"
        }
    }
}'
```

Este ejemplo muestra la variable de entorno que acompaña a `VCAP_SERVICES`:

```
VCAP_SERVICES: '{
    "my-postgres-service": [
        {
            "credentials": {
                Password: "1234",
                Username: "User1234",
                host: "postgres.example.com",
                database_name: "my_db",
            },
            "name": "postgres-service-name",
        }
    ]
}'
```

En el ejemplo anterior, el primer elemento `web_server` es una configuración para un servicio que se ejecuta dentro de la aplicación.
No hay `variables` y utiliza las variables de plantilla `%%host%%` y `%%port%%` disponibles a través de Autodiscovery.

El segundo elemento `postgres-service-name` es una configuración para un servicio vinculado a la aplicación.
Para resolver las variables de plantilla, utiliza el diccionario `variables` para definir los valores utilizados en la configuración de la instancia.
Este diccionario contiene un objeto JSONPath que indica dónde encontrar los valores de la variable para el servicio `postgres-service-name` definido en la variable de entorno `VCAP_SERVICES`.

Consulta [Checks de clúster][35] para más información sobre Autodiscovery a través del DCA.

#### Mejorar el rendimiento de CCCache en error de caché

Para versiones `7.40.1` y posteriores del Datadog Agent, puedes añadir más indicadores para aumentar el control sobre el comportamiento de CCCache y el número de llamadas a la API:

- `refresh_on_cache_miss` para controlar el comportamiento del error de caché
- Divide `advanced_tags` en `sidecars_tags` y `isolation_segments_tags`

#### Mejora del etiquetado para contenedores de aplicaciones y detección de proceso 

Una vez vinculadas las dos versiones, el Datadog Cluster Agent proporciona automáticamente metadatos a nivel de clúster, que los Node Agents adjuntan como etiquetas a sus correspondientes contenedores de aplicaciones de Cloud Foundry.

### Desplegar el Datadog Firehose Nozzle

Datadog proporciona una versión BOSH de Datadog Firehose Nozzle. Después de cargar la versión en tu Director, añade el Nozzle a un despliegue existente o crea un nuevo despliegue que solo incluya el Nozzle. En las siguientes instrucciones, se asume que lo estás añadiendo a un despliegue existente de Cloud Foundry que tiene un Loggregator Firehose en funcionamiento.

#### Cargar la versión de Datadog a tu BOSH Director

```text
# BOSH CLI v1
bosh upload release http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
# BOSH CLI v2
bosh upload-release -e <BOSH_ENV> http://cloudfoundry.datadoghq.com/datadog-firehose-nozzle/datadog-firehose-nozzle-release-latest.tgz
```

Si deseas crear tu propia versión, consulta el [repositorio de versiones de Datadog Firehose Nozzle][21].

#### Configurar un cliente de UAA

En el manifiesto que contiene tu configuración de UAA, añade un nuevo cliente para el Datadog Nozzle para que los trabajos puedan acceder al Firehose:

```yaml
uaa:
    clients:
        datadog-firehose-nozzle:
            access-token-validity: 1209600
            authorities: doppler.firehose,cloud_controller.admin_read_only
            authorized-grant-types: client_credentials
            override: true
            scope: doppler.firehose,cloud_controller.admin_read_only
            secret: <YOUR_SECRET>
```

Vuelve a desplegar para añadir el usuario.

#### Añadir trabajos de Firehose Nozzle

Configurar uno o más trabajos de Nozzle en tu manifiesto de despliegue principal de Cloud Foundry (`cf-manifest.yml`):

```yaml
jobs:
#- instances: 4
#  name: some_other_job
#  ...
# add more instances if one job cannot keep up with the Firehose
- instances: 1
  name: datadog_nozzle_z1
  networks:
    # some network you've configured elsewhere in the manifest
    - name: cf1
  # some resource_pool you've configured elsewhere in the manifest
  resource_pool: small_z1
  templates:
    - name: datadog-firehose-nozzle
      release: datadog-firehose-nozzle
  properties:
    datadog:
      api_key: "<YOUR_DATADOG_API_KEY>"
      api_url: https://api.datadoghq.com/api/v1/series
      # seconds between flushes to Datadog. Default is 15.
      flush_duration_seconds: 15
    loggregator:
      # do NOT append '/firehose' or even a trailing slash to the URL; 'ws://<host>:<port>' works
      # for example, ws://traffic-controller.your-cf-domain.com:8081
      traffic_controller_url: "<LOGGREGATOR_URL>"
    nozzle:
      # tags each firehose metric with 'deployment:<DEPLOYMENT_NAME>'
      deployment: "<DEPLOYMENT_NAME>"
      # can be anything (firehose streams data evenly to all jobs using the same subscription_id)
      subscription_id: datadog-nozzle
      # for development only
      # disable_access_control: true
      # for development only; enable if your UAA does not use a verifiable cert
      # insecure_ssl_skip_verify: true
    uaa:
      client: datadog-firehose-nozzle # client name you just configured
      client_secret: "<SECRET_YOU_JUST_CONFIGURED>"
      url: <UAA_URL> # for example, https://uaa.your-cf-domain.com:8443
```

Para ver todas las opciones disponibles de configuración, comprueba el [repositorio de Datadog Firehose Nozzle][22].

En el mismo manifiesto, añade el nombre y la versión de la versión de Datadog Nozzle:

```yaml
releases:
    # - name: "<SOME_OTHER_RELEASE>"
    #   version: <x.y.z>
    # ...
    - name: datadog-firehose-nozzle
      version: '<VERSION_YOU_UPLOADED>' # specify the real version (x.y.z not 'latest')
```

Para ver qué versión de `datadog-firehose-nozzle` se cargó antes, ejecuta `bosh releases`.

#### Redistribuir el despliegue

```text
# BOSH CLI v1
bosh deployment cf-manifest.yml
bosh -n deploy --recreate
# BOSH CLI v2
bosh -n -d cf-manifest -e <BOSH_ENV> deploy --recreate cf-manifest.yml
```

#### Comprobar que Firehose Nozzle está recopilando datos

En el [Metrics Explorer][23], busca las métricas que comienzan con `cloudfoundry.nozzle`.

{{< img src="integrations/cloud_foundry/cloud-foundry-nozzle-metrics.png" alt="El Metrics Explorer en Datadog con cloudfoundry.nozzle ingresado en la barra de búsqueda" >}}

#### Controlar el prefijo de metadatos de la aplicación

Puedes activar o desactivar el prefijo de metadatos de la aplicación en las métricas de aplicación de Firehose Nozzle.

{{< img src="integrations/cloud_foundry/enable_metadata_app_prefix.png" alt="La configuración del cuadro de integración en Datadog con Habilitar prefijo de métricas de aplicación de metadatos sin marcar" >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[2]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html#supply-script
[3]: https://docs.cloudfoundry.org/buildpacks/use-multiple-buildpacks.html
[4]: https://github.com/cloudfoundry/multi-buildpack
[5]: https://github.com/cloudfoundry/multi-buildpack#usage
[6]: https://docs.cloudfoundry.org/buildpacks/understand-buildpacks.html
[7]: https://cloudfoundry.datadoghq.com/datadog-cloudfoundry-buildpack/datadog-cloudfoundry-buildpack-latest.zip
[8]: https://github.com/cf-platform-eng/meta-buildpack
[15]: https://bosh.io/docs/bosh-cli.html
[16]: https://bosh.io/docs/cli-v2.html#install
[17]: https://bosh.io/docs/runtime-config.html#addons
[18]: https://github.com/DataDog/datadog-agent-boshrelease
[19]: https://github.com/DataDog/datadog-agent-boshrelease/blob/master/jobs/dd-agent/spec
[20]: https://app.datadoghq.com/infrastructure/map
[21]: https://github.com/DataDog/datadog-firehose-nozzle-release
[22]: https://github.com/DataDog/datadog-firehose-nozzle-release/blob/master/jobs/datadog-firehose-nozzle/spec
[23]: https://app.datadoghq.com/metric/explorer
[24]: /es/integrations/system/#metrics
[25]: /es/integrations/network/#metrics
[26]: /es/integrations/disk/#metrics
[27]: /es/integrations/ntp/#metrics
[28]: https://github.com/cloudfoundry/loggregator-api
[29]: https://docs.cloudfoundry.org/running/all_metrics.html
[30]: /es/profiler/enabling/
[32]: /es/integrations/faq/pivotal_architecture
[33]: https://github.com/DataDog/datadog-cluster-agent-boshrelease/blob/master/jobs/datadog-cluster-agent/spec
[34]: /es/containers/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[35]: /es/containers/cluster_agent/clusterchecks/
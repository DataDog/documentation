---
app_id: logstash
app_uuid: efcb18d9-2789-4481-bd4b-ff5a4c058dc3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: logstash.process.cpu.percent
      metadata_path: metadata.csv
      prefix: logstash.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10016
    source_type_name: Logstash
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Community
  sales_email: ervansetiawan@gmail.com
  support_email: ervansetiawan@gmail.com
categories:
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md
display_on_public_website: true
draft: false
git_integration_title: logstash
integration_id: logstash
integration_title: Logstash
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: logstash
public_title: Logstash
short_description: Monitorización y recopilación de métricas del tiempo de ejecución
  de una instancia Logstash
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Recopilación de logs
  - Offering::Integración
  configuration: README.md#Configuración
  description: Monitorización y recopilación de métricas del tiempo de ejecución de
    una instancia Logstash
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Logstash
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas de Logstash en tiempo real para:

- Visualizar y monitorizar estados de Logstash.
- Recibir notificaciones sobre eventos de Logstash.

## Configuración

### Instalación

El check de Logstash está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalarlo.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para el Agent v7.21/v6.21 y posteriores, sigue las siguientes instrucciones para instalar el check de Logstash en tu host. Para versiones anteriores del Agent, consulta el [uso de integraciones de la comunidad][1]. 

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][2] de base.

[1]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[2]: https://docs.datadoghq.com/es/getting_started/integrations/
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Utiliza el siguiente archivo Docker para crear una imagen personalizada del Datadog Agent que incluya la integración Logstash.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-logstash==<INTEGRATION_VERSION>
```

Si utilizas Kubernetes, actualiza la configuración de tu Datadog Operator o tu Helm chart para extraer esa imagen personalizada del Datadog Agent.

Para obtener más información, consulta el [uso de integraciones de la comunidad][1].

[1]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
{{% /tab %}}
{{< /tabs >}}

### Configuración

#### Recopilación de métricas

{{< tabs >}}
{{% tab "Host" %}}

##### Host

1. Edita el archivo `logstash.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][1].

   ```yaml
   init_config:

   instances:
     # The URL where Logstash provides its monitoring API.
     # This will be used to fetch various runtime metrics about Logstash.
     #
     - url: http://localhost:9600
   ```

   Para ver todas las opciones de configuración disponibles, consulta el [ejemplo logstash.d/conf.yaml][2].

2. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

##### Contenedores

Para entornos contenedorizados, utiliza una plantilla de Autodiscovery con los siguientes parámetros:

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `logstash`                           |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:9600"}` |

Para saber cómo aplicar esta plantilla, consulta las [integraciones Docker][1] o las [integraciones Kubernetes][2].

Para ver todas las opciones de configuración disponibles, consulta el [ejemplo logstash.d/conf.yaml][3].

[1]: https://docs.datadoghq.com/es/containers/docker/integrations
[2]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

#### Recopilación de logs

Datadog cuenta con un [complemento de salida][2] para Logstash que se encarga de enviar tus logs a tu plataforma Datadog.

Para instalar este complemento ejecuta el siguiente comando:

- `logstash-plugin install logstash-output-datadog_logs`

A continuación, configura el complemento `datadog_logs` con tu [clave de API Datadog][3]:

```conf
output {
    datadog_logs {
        api_key => "<DATADOG_API_KEY>"
    }
}
```

Por defecto, el complemento está configurado para enviar logs a través de HTTPS (puerto 443) utilizando la compresión gzip.
Puedes cambiar este comportamiento utilizando los siguientes parámetros:

- `use_http`: Configúralo como `false` si quieres utilizar el reenvío TCP y actualiza el `host` y el `port` en consecuencia (por defecto es `true`).
- `use_compression`: La compresión sólo está disponible para HTTP. Deshabilítala configurándola como `false` (por defecto es `true`).
- `compression_level`: Define el nivel de compresión de HTTP. El rango es de 1 a 9, siendo 9 la mejor proporción (por defecto es `6`).

Se pueden utilizar parámetros adicionales para cambiar el endpoint utilizado para pasar por un [proxy][4]:

- `host`: Endpoint de proxy para logs no reenviados directamente a Datadog (valor por defecto: `http-intake.logs.datadoghq.com`).
- `port`: Puerto de proxy para logs no reenviados directamente a Datadog (valor por defecto: `80`).
- `ssl_port`: Puerto utilizado para logs reenviados a través de una conexión segura TCP/SSL a Datadog (valor por defecto: `443`).
- `use_ssl`: Indica al Agent que inicie una conexión TCP/SSL segura con Datadog (valor por defecto: `true`).
- `no_ssl_validation`: Deshabilita la validación de nombres de host SSL (valor por defecto: `false`).

**Nota**: Define el `host` y el `port` para tu región {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
output {
   datadog_logs {
       api_key => "<DATADOG_API_KEY>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### Añadir metadatos a tus logs

Para lograr el mejor uso de tus logs en Datadog, es importante asociar los metadatos apropiados a tus logs, incluyendo el nombre de host y la fuente. Por defecto, el nombre y la marca de tiempo del nombre de host deberían reasignarse correctamente gracias a la [reasignación de atributos reservados][5] por defecto de Datadog. Para asegurarte de que el servicio se reasigna correctamente, añade el valor de su atributo a la lista de reasignación servicios.

##### Fuente

Configure un filtro de Logstash para definir el (nombre de la integración Datadog) de origen en tus logs.

```conf
filter {
  mutate {
    add_field => {
 "ddsource" => "<MY_SOURCE_VALUE>"
       }
    }
 }
```

Esta acción activa la [configuración automática de la integración][6] en Datadog.

##### Etiquetas (tags) personalizadas

Las [etiquetas de host][7] se configuran automáticamente en tus logs si existe un nombre de host coincidente en tu [lista de infraestructuras][8]. Utiliza el atributo `ddtags` para añadir etiquetas personalizadas a tus logs:

```conf
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```

### Validación

[Ejecuta el subcomando `status` del Agent][9] y busca `logstash` en la sección Checks.

## Compatibilidad

El check de Logstash es compatible con las versiones 5.x, 6.x y 7.x de Logstash. También es compatible con las nuevas métricas de pipelines múltiples, introducidas en Logstash v6.0. Probado con las versiones 5.6.15, 6.3.0 y 7.0.0 de Logstash.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "logstash" >}}


### Eventos

El check de Logstash no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "logstash" >}}


## Solucionar problemas

### El Agent no se puede conectar

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Verifica que la `url` en `conf.yaml` es correcta.

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][10].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/logstash-output-datadog_logs
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.datadoghq.com/es/agent/proxy/#proxy-for-logs
[5]: /es/logs/#edit-reserved-attributes
[6]: /es/logs/processing/#integration-pipelines
[7]: /es/getting_started/tagging/assigning_tags
[8]: https://app.datadoghq.com/infrastructure
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[10]: http://docs.datadoghq.com/help
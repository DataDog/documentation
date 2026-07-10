---
app_id: ibm-was
app_uuid: c4c79ae5-b702-415c-bc76-a7b71efd43d8
assets:
  dashboards:
    IBM_WAS: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_was.can_connect
      metadata_path: metadata.csv
      prefix: ibm_was.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10048
    source_type_name: IBM WAS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- sistema operativo y sistema
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_was/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_was
integration_id: ibm-was
integration_title: IBM WAS
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: ibm_was
public_title: IBM WAS
short_description: IBM Websphere Application Server es un marco que aloja aplicaciones
  Java.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Sistema operativo y sistema
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: IBM Websphere Application Server es un marco que aloja aplicaciones
    Java.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: IBM WAS
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [IBM Websphere Application Server (WAS)][1] a través del Datadog Agent. Este check es compatible con las versiones de IBM WAS a partir de la 8.5.5.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

La integración de IBM WAS de Datadog recopila los contadores de PMI habilitados del entorno de WebSphere Application Server. La configuración requiere la habilitación del PerfServlet, que brinda una manera para que Datadog recupere datos de rendimiento de WAS.

De forma predeterminada, este check recopila métricas de JDBC, JVM, thread pool y Servlet Session Manager. De manera opcional, puedes especificar métricas adicionales para su recopilación en la sección "custom_queries". Consulta la [configuración del check de ejemplo][3] para ver ejemplos.

### Instalación

El check de IBM WAS está incluido en el paquete del [Datadog Agent][4].

#### Habilitar el `PerfServlet`

El archivo .ear del servlet (PerfServletApp.ear) se encuentra en el directorio `<WAS_HOME>/installableApps`, donde `<WAS_HOME>` es la ruta de instalación de WebSphere Application Server.

El servlet de rendimiento se despliega exactamente igual que cualquier otro servlet. Despliega el servlet en una única instancia del servidor de aplicaciones dentro del dominio.

**Nota**: A partir de la versión 6.1, debes habilitar la seguridad de las aplicaciones para que el PerfServlet funcione.

### Modificar el conjunto de estadísticas monitorizadas

De forma predeterminada, el servidor de aplicaciones solo está configurado para una monitorización "básica". Para obtener visibilidad de tu JVM, conexiones JDBC y conexiones servlet, cambia el conjunto de estadísticas monitorizadas del servidor de aplicaciones de "Basic" (Básico) a "All" (Todos).

Desde la consola de administración de Websphere, puedes encontrar esta configuración en `Application servers > <YOUR_APP_SERVER> > Performance Monitoring Infrastructure (PMI)`.

Una vez realizado este cambio, haz clic en "Apply" (Aplicar) para guardar la configuración y reinicia el servidor de aplicaciones. Las métricas adicionales de JDBC, JVM y servlet deberían aparecer en Datadog poco después de este cambio.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ibm_was.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de IBM WAS. Consulta el [archivo de ejemplo ibm_was.d/conf.yaml][1] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][2].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Luego, edita `ibm_was.d/conf.yaml` y quita los comentarios de las líneas `logs` de la parte inferior. Actualiza `path` con la ruta correcta a tus archivos de logs de WAS.

   ```yaml
   logs:
     - type: file
       path: /opt/IBM/WebSphere/AppServer/profiles/InfoSphere/logs/server1/*.log
       source: ibm_was
       service: websphere
   ```

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_was`                                                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"servlet_url": "http://%%host%%:%%port%%/wasPerfTool/servlet/perfservlet"}` |

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_was", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `ibm_was` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ibm-was" >}}


### Eventos

IBM WAS no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "ibm-was" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].


[1]: https://www.ibm.com/cloud/websphere-application-platform
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/
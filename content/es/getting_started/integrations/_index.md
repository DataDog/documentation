---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: Centro de aprendizaje
  text: Introducción a las integraciones
- link: /integrations/
  tag: Documentación
  text: Consulta la lista de integraciones de Datadog
kind: documentación
title: Introducción a las integraciones
---

## Información general

En esta guía, te explicamos cómo utilizar las integraciones. Si lo que buscas es información sobre cómo crear una integración nueva, consulta la página [Crear una nueva integración][1].

Una integración, al más alto nivel, se produce cuando se ensambla un sistema unificado a partir de unidades que normalmente se consideran por separado. En Datadog, puedes utilizar integraciones para reunir todas las métricas y registros de tu infraestructura y obtener información sobre el sistema unificado como un todo: puedes ver las secciones de forma individual, así como el impacto que estas tienen sobre el conjunto.

**Nota**: Lo mejor es empezar a recopilar métricas sobre tus proyectos desde la fase más temprana posible del proceso de desarrollo, pero puedes empezar en cualquier momento.

Datadog ofrece tres tipos principales de integraciones:

- Integraciones **basadas en el Agent** que se instalan con el Datadog Agent y utilizan un método de clase Python denominado `check` para definir las métricas que se deben recopilar.
- Integraciones **basadas en (un rastreador de) autenticación** que se configuran en [Datadog][2] y donde el usuario debe introducir las credenciales para obtener métricas con la API. Entre ellas, hay integraciones tan populares como [Slack][3], [AWS][4], [Azure][5] y [PagerDuty][6].
- Integraciones de **bibliotecas** que utilizan la [API de Datadog][7] para poder monitorizar aplicaciones en función del lenguaje en el que estén redactadas, como, por ejemplo, [Node.js][8] o [Python][9].

También puedes crear un [check personalizado][10] para definir y enviar métricas a Datadog desde tu propio sistema interno.

## Configurar una integración

El paquete del Datadog Agent incluye integraciones compatibles oficialmente con Datadog en el [núcleo de integraciones][11]. Para poder utilizar esas integraciones, es necesario descargar el Datadog Agent. Las integraciones basadas en la comunidad se encuentran en [integraciones adicionales][12]. Para obtener más información sobre cómo instalar o gestionar estas integraciones, consulta la [guía de gestión de integraciones][14].

### Permisos

El permiso `manage_integrations` es necesario para interactuar con un cuadro de integración. Ver [roles RBAC][45] para obtener más información.

### Claves de API y de aplicación

Para [instalar el Datadog Agent][15], necesitas una [clave de API][16]. Si ya te has descargado el Agent, recuerda configurar la clave de API en el archivo `datadog.yaml`. Además, es necesaria una [clave de aplicación][16] para utilizar la mayoría de las funcionalidades adicionales de Datadog, así como para enviar métricas y eventos. Puedes gestionar las claves de API y de aplicación de tus cuentas en la [página de Configuración de la API][17].

### Instalación

En caso de que quieras conectarte con una integración basada en un rastreador o biblioteca, accede a ese proveedor a través de la [página de Integrations (Integraciones)][18] para consultar las instrucciones específicas para conectarte. Para el resto de las integraciones compatibles, instala el [Datadog Agent][15]. La mayoría de las integraciones son compatibles con los siguientes Agents contenedorizados: [Docker][19] y [Kubernetes][20]. Después de descargar el Agent, ve a la [página de Integraciones][18] para consultar las instrucciones de configuración específicas de cada integración.

### Configurar las integraciones del Agent

La mayoría de los parámetros de configuración son propios de cada [integración][18]. Accede a la carpeta `conf.d` en la raíz del directorio de configuración de tu Agent para configurar las integraciones. Cada una cuenta con una carpeta llamada `<INTEGRATION_NAME>.d` que contiene el archivo `conf.yaml.example`. En el siguiente archivo de ejemplo, se muestran todas las opciones de configuración disponibles para la integración en cuestión.

Para activar una integración concreta:

1. Cambia el nombre del archivo `conf.yaml.example` (en la carpeta de `<INTEGRATION_NAME>.d` correspondiente) a `conf.yaml`.
2. Actualiza los parámetros obligatorios dentro del archivo de configuración que acabas de crear con los valores que se correspondan con tu entorno.
3. [Reinicia el Datadog Agent][21].

**Nota**: Todos los archivos de configuración siguen el formato que se describe en la [especificación @param][22].

A continuación, puedes ver un ejemplo del archivo de configuración `conf.yaml` mínimo necesario para recopilar métricas y logs de la [integración de Apache][23]:

```yaml
init_config:
  service: apache

instances:
    - apache_status_url: http://localhost/server-status?auto

logs:
    - type: file
      path: /var/log/apache2/access.log
      source: apache
      sourcecategory: http_web_access
    - type: file
      path: /var/log/apache2/error.log
      source: apache
      sourcecategory: http_web_access
```

Si deseas monitorear varias instancias de Apache en el mismo check del Agent, añade más instancias a la sección `instances`:

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### Intervalo de recopilación

El intervalo de recopilación predeterminado para todas las integraciones estándar de Datadog es de 15 segundos. Si quieres cambiar este intervalo, utiliza el parámetro `min_collection_interval`. Para obtener más información, consulta la sección [Actualizar el intervalo de recopilación][24].

### Etiquetado

El etiquetado es clave para filtrar y agregar los datos que llegan a Datadog desde diversas fuentes. Para obtener más información sobre el etiquetado, consulta [Empezando con las etiquetas (tags)][25].

Si defines etiquetas (tags) en el archivo `datadog.yaml`, se aplicarán a todos los datos de tus integraciones. Una vez que definas una etiqueta en `datadog.yaml`, la heredarán todas las nuevas integraciones.

Por ejemplo, la [configuración del Agent][26] recomendada para monitorear sistemas separados e independientes consiste en definir `service` en tu archivo de configuración.

También es recomendable configurar la etiqueta `env` en el Agent para unificar mejor el entorno. Si deseas obtener más información, consulta [Etiquetado de servicios unificado][27].

De forma predeterminada, las métricas que envían las integraciones incluyen etiquetas del entorno detectadas automáticamente. Por ejemplo, las métricas que envía un check de Redis ejecutadas dentro de un contenedor incluyen etiquetas que hacen referencia a dicho contenedor, como `image_name`. Si deseas desactivar este comportamiento, configura el parámetro `ignore_autodiscovery_tags` con el valor `true`:
```yaml
init_config:

ignore_autodiscovery_tags: true

# Rest of the config here
```

### Validación

Para validar la configuración de tu Agent y tus integraciones, [ejecuta el subcomando `status` del Agent][28] y busca la nueva configuración en la sección Checks.

## Instalar varias integraciones

Para instalar más de una integración, basta con añadir la información de configuración en un nuevo archivo `conf.yaml` dentro de la carpeta `<INTEGRATIONS>.d` correspondiente. Busca los parámetros necesarios para la nueva integración en el archivo `conf.yaml.example`, añádelos al nuevo archivo `conf.yaml` y sigue los mismos pasos para validar tu configuración.

## Integraciones detectadas automáticamente

Si configuras la [recopilación de procesos][29], Datadog detectará de forma automática las tecnologías que se ejecutan en tus hosts. De este modo, se identificarán las integraciones de Datadog que pueden ayudarte a monitorear estas tecnologías. Estas integraciones detectadas automáticamente se muestran en la [sección de búsqueda de Integrations (Integraciones)][2]:

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="Integraciones detectadas automáticamente" >}}

Cada integración tiene uno de estos tres tipos de estado:

- **Detectada**: la tecnología se está ejecutando en un host, pero la integración no está instalada ni configurada y solo se recopilan métricas parciales. Configura la integración para obtener una cobertura completa. Para encontrar una lista de hosts que estén ejecutando una tecnología autodetectada, abre el cuadro de integraciones y selecciona la pestaña **hosts**.
- **Instalada**: esta integración está instalada y configurada en un host.
- **Disponible**: todas las integraciones que no entran en las categorías **Instalada** y **Detectada**.

## Protocolos de seguridad

Para obtener información sobre cómo Datadog maneja tus datos y otras cuestiones de seguridad, consulta la [documentación acerca de la seguridad][30].

## ¿Qué toca hacer ahora?

Después de configurar tu primera integración, [explora todas las métricas][31] que tu aplicación envía a Datadog y utilízalas para empezar a configurar [dashboards][32] y [alertas][33] para monitorear tus datos.

Consulta también las siguientes soluciones de Datadog: [Log Management][34], [APM][35] y la [Synthetic Monitoring][36].

## Solucionar problemas

El primer paso para solucionar problemas de integración es utilizar un plugin en tu editor de código o utilizar una de las numerosas herramientas disponibles en línea para verificar que el YAML es válido. A continuación, ejecuta todos los pasos descritos en [Solucionar problemas del Agent][37].

Si sigues teniendo problemas, ponte en contacto con el [equipo de asistencia de Datadog][38].

## Términos clave

`conf.yaml`
: Crea el archivo `conf.yaml` en la carpeta `conf.d/<INTEGRATION_NAME>.d`, en la raíz del [directorio de configuración del Agent][39], y utilízalo para conectar integraciones a tu sistema y para configurar sus ajustes.

check personalizado
: Si tienes un sistema único y quieres monitorearlo, o si vas a ampliar las métricas ya enviadas por una integración, puedes crear un [check personalizado][10] para definir y enviar métricas a Datadog. Sin embargo, si lo que quieres es monitorear una aplicación disponible de forma general, un servicio público o un proyecto de código abierto, y la integración no existe, puedes [crear una nueva integración][1] en lugar de un check personalizado.

`datadog.yaml`
: Se trata del archivo de configuración principal donde debes definir cómo interactúa el Agent en su totalidad con sus propias integraciones y con tu sistema. Utiliza este archivo para actualizar claves de API, proxies, etiquetas de host y otros ajustes generales.

evento
: Los eventos son mensajes informativos sobre tu sistema que [el explorador de eventos][40] utiliza para que puedas crear monitores a partir de ellos.

instancia
: En el archivo `conf.yaml`, se define y asigna la instancia de lo que se está monitoreando. Por ejemplo, en la [integración `http_check`][41], defines el nombre asociado a la instancia del endpoint HTTP que vas a monitorear durante los tiempos de actividad y caída del sistema. Puedes monitorear **varias instancias** en la misma integración al definir todas las instancias en el archivo `conf.yaml`.

`<INTEGRATION_NAME>.d`
: Si se trata de una configuración compleja, puedes dividirla en varios archivos `YAML` y, después, almacenarlos todos en la carpeta `<INTEGRATION_NAME>.d` para definir la configuración. El Agent carga cualquier archivo `YAML` válido en la carpeta `<INTEGRATION_NAME>.d`.

logs
: Si el sistema que estás monitorizando tiene logs, personaliza los que envías a Datadog con la [solución Log Management][34].

`metadata.csv`
: Archivo que muestra una lista de las métricas recopiladas por cada integración y las almacena.

métricas
: La lista que cada integración recopila de tu sistema. Puedes encontrar las métricas de cada integración en el archivo `metadata.csv` de cada integración en particular. Para obtener más información sobre las métricas, consulta la página para desarrolladores [Métricas][42]. También puedes configurar [métricas personalizadas][43]; de modo que si la integración no brinda una métrica de forma predeterminada, puedes añadirla.

parámetros
: Utiliza los parámetros del archivo `conf.yaml` para controlar los accesos entre tu fuente de datos de la integración y el Agent. El archivo `conf.yaml.example` de las integraciones incluye una lista con todos los parámetros obligatorios y opcionales.

check de servicio
: Los checks de servicio son un tipo de monitor que se utiliza para realizar un seguimiento del estado del tiempo de actividad del servicio. Para obtener más información, consulta la [guía sobre checks de servicio][44].

etiquetado
: Las [etiquetas (tags)][25] te permiten personalizar las métricas para que puedas filtrarlas y visualizarlas de la forma que te resulte más útil.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/developers/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /es/integrations/slack/
[4]: /es/integrations/amazon_web_services/
[5]: /es/integrations/azure/
[6]: /es/integrations/pagerduty/
[7]: /es/api/
[8]: /es/integrations/node/
[9]: /es/integrations/python/
[10]: /es/developers/custom_checks/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[14]: /es/agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings/agent/latest
[16]: /es/account_management/api-app-keys/
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: /es/integrations/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[20]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[21]: /es/agent/guide/agent-commands/#restart-the-agent
[22]: /es/developers/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /es/developers/custom_checks/write_agent_check/#updating-the-collection-interval
[25]: /es/getting_started/tagging/
[26]: /es/getting_started/agent/#setup
[27]: /es/getting_started/tagging/unified_service_tagging/
[28]: /es/agent/guide/agent-commands/#agent-status-and-information
[29]: /es/infrastructure/process/
[30]: /es/data_security/
[31]: /es/metrics/explorer/
[32]: /es/dashboards/
[33]: /es/monitors/
[34]: /es/logs/
[35]: /es/tracing/
[36]: /es/synthetics/
[37]: /es/agent/troubleshooting/
[38]: /es/help/
[39]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[40]: https://app.datadoghq.com/event/explorer
[41]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[42]: /es/metrics/
[43]: /es/metrics/custom_metrics/
[44]: /es/monitors/guide/visualize-your-service-check-in-the-datadog-ui/
[45]: /es/account_management/rbac/permissions/#integrations
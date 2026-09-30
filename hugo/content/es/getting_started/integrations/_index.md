---
description: Unifique las métricas y los registros de la infraestructura mediante
  integraciones basadas en Agent, basadas en autenticación y basadas en bibliotecas.
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-integrations
  tag: Centro de aprendizaje
  text: Introducción a Integrations
- link: https://learn.datadoghq.com/courses/getting-started-integrations
  tag: Centro de aprendizaje
  text: Primeros pasos con Integrations
- link: /integrations/
  tag: Documentación
  text: Vea una lista de Integrations de Datadog
- link: https://www.datadoghq.com/blog/1k-integrations-milestone/
  tag: Blog
  text: 'Escalamiento de la observabilidad de Datadog: 1,000 Integrations y contando'
title: Introducción a Integrations
---
## Descripción general {#overview}

Esta es una guía para el uso de Integrations. Si busca información sobre cómo crear una nueva Integration, consulte la página [Crear una nueva Integration][1].

Una Integration, en el nivel más alto, es cuando usted ensambla un sistema unificado a partir de unidades que generalmente se consideran por separado. En Datadog, usted puede utilizar Integrations para reunir todas las métricas y registros de su infraestructura y obtener información sobre el sistema unificado en su conjunto; usted puede ver las piezas individualmente y también cómo las piezas individuales están afectando al todo.

**Nota**: Es mejor comenzar a recopilar métricas en sus proyectos lo antes posible en el proceso de desarrollo, pero usted puede comenzar en cualquier etapa.

Datadog ofrece tres tipos principales de Integrations:

Las Integrations - **basadas en Agent** se instalan con el Datadog Agent y utilizan un método de clase de Python llamado `check` para definir las métricas que se deben recopilar.
Las Integrations - **basadas en autenticación (rastreador)** se configuran en [Datadog][2], donde usted proporciona las credenciales para obtener métricas con la API. Estas incluyen Integrations populares como [Slack][3], [AWS][4], [Azure][5] y [PagerDuty][6].
Las Integrations de - **biblioteca** utilizan la [Datadog API][7] para permitirle hacer un seguimiento de las aplicaciones según el lenguaje en el que estén escritas, como [Node.js][8] o [Python][9].

También puede crear una [verificación personalizada][10] para definir y enviar métricas a Datadog desde su sistema interno único.

## Configuración de una Integration {#setting-up-an-integration}

El paquete del Datadog Agent incluye Integrations compatibles oficialmente con Datadog, en [integrations core][11]. Para utilizar esas Integrations, descargue el Datadog Agent. Las Integrations basadas en la comunidad se encuentran en [integrations extras][12]. Para obtener más información sobre la instalación o administración de estas Integrations, consulte la [guía de administración de Integrations][14].

### Permisos{#permissions}

Se requiere el permiso de Gestión de Integrations para interactuar con un mosaico de Integration. Consulte [roles RBAC][45] para obtener más información.

### Claves de API y de aplicación {#api-and-application-keys}

Para [instalar el Datadog Agent][15], necesita una [clave de API][16]. Si el Agent ya está descargado, asegúrese de configurar la clave de API en el archivo `datadog.yaml`. Para utilizar la mayoría de las funcionalidades adicionales de Datadog además del envío de métricas y eventos, necesita una [clave de aplicación][16]. Puede gestionar las claves de API y de aplicación de sus cuentas en la [página de Configuración de API][17].

### Instalación {#installation}

Si desea conectarse con una integración basada en rastreador o biblioteca, navegue a ese proveedor en la [página de Integrations][18] para obtener instrucciones específicas sobre cómo conectarse. Para otras integraciones compatibles, instale el [Datadog Agent][15]. La mayoría de las integraciones son compatibles con los Agents en contenedores: [Docker][19] y [Kubernetes][20]. Después de descargar el Agent, vaya a la [página Integrations][18] para encontrar instrucciones de configuración específicas para cada integración.

### Configuración de integraciones del Agent {#configuring-agent-integrations}

<div class="alert alert-info">Puede configurar las integraciones del Agent de forma remota en toda su flota desde una interfaz de usuario y una API centralizadas con <a href="/agent/fleet_automation/configure_integrations/">Fleet Automation</a>, en lugar de editar <code>conf.yaml</code> archivos en cada servidor. Descubra servicios detectados automáticamente, limite una configuración a cualquier subconjunto de servidores mediante etiqueta o filtro de servidor, y realice la implementación en cada Agent coincidente en una sola acción. Esto requiere Remote Configuration y la versión 7.76 o posterior del Agent en máquinas virtuales Linux o Windows.</div>

La mayoría de los parámetros de configuración son específicos de la [integración individual][18]. Configure las integraciones del Agent navegando a la carpeta `conf.d` en la raíz del directorio de configuración de su Agent. Cada integración tiene una carpeta llamada `<INTEGRATION_NAME>.d`, que contiene el archivo `conf.yaml.example`. Este archivo de ejemplo enumera todas las opciones de configuración disponibles para la integración en particular.

Para activar una integración determinada:

1. Cambie el nombre del archivo `conf.yaml.example` (en la carpeta `<INTEGRATION_NAME>.d` correspondiente) a `conf.yaml`.
2. Actualice los parámetros requeridos dentro del archivo de configuración recién creado con los valores correspondientes a su entorno.
3. [Reinicie el Datadog Agent][21].

**Nota**: Todos los archivos de configuración siguen el formato documentado en [@param specification][22].

Por ejemplo, este es el archivo de configuración `conf.yaml` mínimo necesario para recopilar métricas y registros de la [integración de apache][23]:

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

Para hacer un seguimiento de múltiples instancias de Apache en la misma verificación del Agent, agregue instancias adicionales a la sección `instances`:

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### Intervalo de recolección {#collection-interval}

El intervalo de recolección predeterminado para todas las Integrations estándar de Datadog es de 15 segundos. Para cambiar el intervalo de recolección, utilice el parámetro `min_collection_interval`. Para obtener más detalles, consulte [Updating the collection interval][24].

### Etiquetado {#tagging}

El etiquetado es una parte clave del filtrado y la agregación de los datos que llegan a Datadog desde muchas fuentes. Para obtener más información sobre el etiquetado, consulte [Getting started with tags][25].

Si define etiquetas en el archivo `datadog.yaml`, las etiquetas se aplican a todos los datos de sus Integrations. Una vez que haya definido una etiqueta en `datadog.yaml`, todas las nuevas Integrations la heredan.

Por ejemplo, establecer `service` en su archivo de configuración es la [configuración del Agent][26] recomendada para monitorear sistemas independientes y separados.

Para unificar mejor su entorno, también se recomienda configurar la etiqueta `env` en el Agent. Para obtener más información, consulte [Unified Service Tagging][27].

#### Configuración de etiquetas por verificación {#per-check-tag-configuration}
Puede personalizar el comportamiento de las etiquetas para verificaciones individuales, anulando la configuración global a nivel de Agent:

1. **Deshabilitar etiquetas de Autodiscovery**

    De forma predeterminada, las métricas reportadas por las integraciones incluyen etiquetas detectadas automáticamente desde el entorno. Por ejemplo, las métricas reportadas por una verificación de Redis que se ejecuta dentro de un contenedor incluyen etiquetas asociadas con el contenedor, como `image_name`. Puede desactivar este comportamiento configurando el parámetro `ignore_autodiscovery_tags` en `true`.

1. **Establecer la cardinalidad de etiquetas por verificación de integración**

    Puede definir el nivel de cardinalidad de etiquetas (baja, orquestador o alta) por cada verificación utilizando el parámetro `check_tag_cardinality`. Esto anula la configuración global de cardinalidad de etiquetas definida en la configuración del Agent.

```yaml
init_config:
# Ignores tags coming from autodiscovery
ignore_autodiscovery_tags: true

# Override global tag cardinality setting
check_tag_cardinality: low

# Rest of the config here
```

Para entornos en contenedores, también puede establecer estos parámetros a través de [Kubernetes Autodiscovery annotations][47].

### Validación {#validation}

Para validar la configuración de su Agent e Integrations, [ejecute el subcomando `status` del Agent][28] y busque la nueva configuración en la sección Checks.

## Instalación de múltiples Integrations {#installing-multiple-integrations}

Instalar más de una Integration es cuestión de agregar la información de configuración a un nuevo archivo `conf.yaml` en la carpeta `<INTEGRATIONS>.d` correspondiente. Busque los parámetros requeridos para la nueva Integration en el archivo `conf.yaml.example`, agréguelos al nuevo archivo `conf.yaml` y luego siga los mismos pasos para validar su configuración.

## Integraciones autodetectadas {#autodetected-integrations}

Si configura la [recopilación de procesos][29], Datadog autodetecta las tecnologías que se ejecutan en sus servidores. Esto identifica las Integrations de Datadog que pueden ayudarle a hacer un seguimiento de estas tecnologías. Estas Integrations autodetectadas se muestran en la [Integrations search][2]:

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="Integrations autodetectadas" >}}

Cada Integration tiene uno de cuatro tipos de estado:

- {{< ui >}}Detected{{< /ui >}}: La tecnología se está ejecutando en un servidor, pero la Integration no se ha instalado ni configurado y solo se están recopilando métricas parciales. Configure la integración para una cobertura completa. Para encontrar una lista de hosts que ejecutan una tecnología autodetectada, abra el mosaico de integraciones y seleccione la pestaña {{< ui >}}Hosts{{< /ui >}}.
- {{< ui >}}Installed{{< /ui >}}: Esta integración está instalada y configurada en un servidor.
- {{< ui >}}Available{{< /ui >}}: Todas las integraciones que no entran en las categorías {{< ui >}}Installed{{< /ui >}} y {{< ui >}}Detected{{< /ui >}}.
- {{< ui >}}Missing Data{{< /ui >}}: No se han detectado métricas de integración en las últimas 24 horas. 

## Security practices {#security-practices}

Para obtener información sobre cómo Datadog maneja sus datos y otras consideraciones de seguridad, consulte el [Security documentation][30].

## Control de acceso granular {#granular-access-control}
De forma predeterminada, el acceso a los recursos de integración (cuentas, servicios, webhooks) no está restringido. Se pueden usar controles de acceso granulares para restringir el comportamiento de usuarios, equipos, roles o toda su organización a nivel de recurso de integración.

**Nota**: La opción de acceso restringido solo es visible si la integración admite el control de acceso granular. Para verificar si se admite el control de acceso granular para una integración, revise la [documentación de esa integración][46].
{{< img src="getting_started/integrations/GRACE integration-account-modal.png" alt="Controles de acceso granulares" style="width:70%;" >}}

1. Mientras visualiza una integración, navegue a la pestaña {{< ui >}}Configure{{< /ui >}} y localice el recurso (cuenta, servicio, webhook) al que se deben aplicar los controles de acceso granulares. 
2. Haga clic en {{< ui >}}Set Permissions{{< /ui >}}.
3. De forma predeterminada, todos en su organización tienen acceso completo. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}. 
4. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen acceso {{< ui >}}Viewer{{< /ui >}} de forma predeterminada.
5. Use el menú desplegable para seleccionar uno o más equipos, roles o usuarios que puedan editar el monitor.
    **Nota**: También se requiere el permiso [Integrations Manage][45] para editar recursos individuales.  
6. Haga clic en {{< ui >}}Add{{< /ui >}}.
7. El cuadro de diálogo se actualiza para mostrar los permisos actualizados.
8. Haga clic en {{< ui >}}Save{{< /ui >}}. La página de integración se actualiza automáticamente con los permisos actualizados. 

**Nota:** Para mantener el acceso de edición al recurso, el sistema requiere que incluya al menos un rol o equipo del que usted sea miembro antes de guardar.

Para restaurar el acceso general a un recurso de integración con acceso restringido, siga los pasos a continuación:

1. Mientras visualiza una integración, navegue a la pestaña {{< ui >}}Configure{{< /ui >}} y localice el recurso (cuenta, servicio, webhook) al que se le debe restaurar el acceso general.
2. Haga clic en {{< ui >}}Set Permissions{{< /ui >}}.
3. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
4. Haga clic en {{< ui >}}Save{{< /ui >}}. La página de integración se actualiza automáticamente con los permisos actualizados. 

## ¿Qué sigue? {#whats-next}

Después de configurar su primera integración, [explore todas las métricas][31] que su aplicación envía a Datadog y utilice estas métricas para comenzar a configurar [dashboards][32] y [alerts][33] para hacer un seguimiento de sus datos.

Consulte también las soluciones de [Log Management][34], [APM][35] y [Synthetic Monitoring][36] de Datadog.

## Solución de problemas {#troubleshooting}

El primer paso para solucionar problemas de una integración es usar un complemento en su editor de código o usar una de las muchas herramientas en línea para verificar que el YAML sea válido. El siguiente paso es seguir todos los pasos de [Agent troubleshooting][37].

Si continúa teniendo problemas, comuníquese con el [Datadog support][38].

## Términos clave {#key-terms}

`conf.yaml`
: Usted crea el `conf.yaml` en la carpeta `conf.d/<INTEGRATION_NAME>.d` en la raíz de su [Agent's configuration directory][39]. Utilice este archivo para conectar integraciones a su sistema, así como para configurar sus ajustes.

verificación personalizada
: Si usted tiene un sistema único que desea hacer un seguimiento, o si va a expandir las métricas ya enviadas por una integración, puede crear una [verificación personalizada][10] para definir y enviar métricas a Datadog. Sin embargo, si usted desea hacer un seguimiento de una aplicación de disponibilidad general, un servicio público o un proyecto de código abierto y la integración no existe, considere [crear una nueva integración][1] en lugar de una verificación personalizada.

`datadog.yaml`
: Este es el archivo de configuración principal donde usted define cómo el Agent en su conjunto interactúa con sus propias integraciones y con su sistema. Utilice este archivo para actualizar claves de API, proxies, etiquetas de servidor y otros ajustes globales.

evento
: Los eventos son mensajes informativos sobre su sistema que son consumidos por [the events explorer][40] para que usted pueda crear monitores sobre ellos.

instancia
: Usted define y asigna la instancia de lo que sea que esté monitoreando en el archivo `conf.yaml`. Por ejemplo, en la [`http_check` integration][41], usted define el nombre asociado con la instancia del punto de conexión HTTP del que está monitoreando el tiempo de actividad y de inactividad. Usted puede hacer un seguimiento de **múltiples instancias** en la misma integración, y lo hace definiendo todas las instancias en el archivo `conf.yaml`.

`<INTEGRATION_NAME>.d`
: Si usted tiene una configuración compleja, puede dividirla en múltiples archivos `YAML` y luego almacenarlos todos en la carpeta `<INTEGRATION_NAME>.d` para definir la configuración. El Agent carga cualquier archivo `YAML` válido en la carpeta `<INTEGRATION_NAME>.d`.

registro
: Si el sistema que usted está monitoreando tiene registros, personalice los registros que envía a Datadog utilizando la [Log Management solution][34].

`metadata.csv`
: El archivo que enumera y almacena las métricas recopiladas por cada integración.

métricas
: La lista de lo que se recopila de su sistema mediante cada integración. Puede encontrar las métricas para cada integración en el archivo `metadata.csv` de esa integración y en la tabla **Datos recopilados** en la página de documentación de la integración. En esa tabla, una métrica enumerada con *Shown as \<unit\>* ya tiene una unidad definida en los metadatos de la integración. Una métrica sin esta notación no tiene una unidad establecida de forma predeterminada, por lo que debe configurar una manualmente en la página de [metric summary][48]. Para obtener más información sobre las métricas, consulte la página para desarrolladores de [Metrics][42]. También puede configurar [métricas personalizadas][43], por lo que si la integración no ofrece una métrica de forma inmediata, generalmente puede agregarla.

parámetros
: Utilice los parámetros en el archivo `conf.yaml` para controlar los accesos entre su fuente de datos de integración y el Agent. El archivo `conf.yaml.example` de las integraciones individuales tiene enumerados todos los parámetros requeridos y no requeridos.

verificación de servicio
: Las verificaciones de servicio son un tipo de monitor utilizado para rastrear el estado de tiempo de actividad del servicio. Para obtener más información, consulte la [Service checks guide][44].

etiquetado
: [Tags] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/extend/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /es/integrations/slack/
[4]: /es/integrations/amazon_web_services/
[5]: /es/integrations/azure/
[6]: /es/integrations/pagerduty/
[7]: /es/api/
[8]: /es/integrations/node/
[9]: /es/integrations/python/
[10]: /es/extend/custom_checks/write_agent_check/
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
[22]: /es/extend/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /es/extend/custom_checks/write_agent_check/#updating-the-collection-interval
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
[46]: /es/integrations/
[47]: /es/containers/kubernetes/integrations/#tag-cardinality
[48]: https://app.datadoghq.com/metric/summary
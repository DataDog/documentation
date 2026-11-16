---
description: Guía para instalar y configurar el Datadog Agent para recopilar métricas,
  eventos y logs a nivel de sistema desde servidores.
further_reading:
- link: agent/
  tag: Documentación
  text: El Datadog Agent
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para potenciar su monitoreo de infraestructura
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: PREGUNTAS FRECUENTES
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: Blog
  text: Haga un seguimiento de instancias administradas de AWS Lambda con Datadog
title: Primeros pasos con el Agent
---
## Descripción general {#overview}

Esta guía presenta el Datadog Agent y cubre:

  - [Introducción al Agent](#what-is-the-datadog-agent)
  - [Instalación](#installation)
  - [Datos recopilados por el Agent](#data-collected-by-the-agent)
  - [Configuraciones y funciones avanzadas](#advanced-configurations-and-features)
  - [Solución de problemas](#troubleshooting)


## ¿Qué es el Datadog Agent? {#what-is-the-datadog-agent}

El Datadog Agent es un software que se ejecuta en sus servidores. Recopila eventos y métricas de los servidores y los envía a Datadog, donde puede analizar sus datos de monitoreo y rendimiento. 

El Agent puede ejecutarse en:
- Servidores locales (Windows, Linux, macOS) 
- Entornos en contenedores (Docker, Kubernetes)
- Centros de datos locales (on-premises) 

También puede instalar y configurar el Agent utilizando herramientas de gestión de configuración como Chef, Puppet o Ansible.

El Agent puede recopilar entre 75 y 100 métricas a nivel de sistema cada 15 a 20 segundos. Con una configuración adicional, puede enviar datos en vivo, logs y trazas de los procesos en ejecución a Datadog. El Datadog Agent es de código abierto y su código fuente está disponible en GitHub en [DataDog/datadog-agent][1].

### El archivo de configuración del Agent {#the-agent-configuration-file}

El archivo de configuración principal del Agent es `datadog.yaml`. Los parámetros requeridos son:
- Su [clave de Datadog API][16], que se utiliza para asociar los datos del Agent con su organización. 
- Su [sitio de Datadog][41] ("{{< region-param key="dd_site" code="true" >}}).

Para conocer todas las opciones de configuración disponibles, consulte los [ejemplos de archivos de configuración del Agent][23] para su sistema operativo. Puede ajustar los archivos de configuración del Agent para aprovechar otras funciones de Datadog.

## Instalación {#installation}

### Requisitos previos {#prerequisites}
1. Cree una [cuenta de Datadog][15].

2. Tenga a mano su [Datadog API key][16].

### Configuración {#setup}

Utilice [Fleet Automation][39], el flujo de trabajo integrado en la aplicación de Datadog, para instalar, actualizar, configurar y solucionar problemas del Datadog Agent en un solo servidor o a escala. 

Consulte la [documentación del Agent][40] para obtener información adicional sobre la configuración del Agent para su plataforma específica.


## Datos recopilados por el Agent {#data-collected-by-the-agent}

Para brindarle una visibilidad completa de su infraestructura, el Datadog Agent informa métricas sobre su propio estado y configuración, así como métricas recopiladas de sus hosts y servicios a través de sus verificaciones predeterminadas.

### Métricas del Agent {#agent-metrics}

El Agent informa las siguientes métricas sobre sí mismo a Datadog. Estas métricas proporcionan información sobre qué servidores o contenedores tienen el Agent en ejecución, cuándo se inició cada uno y la versión de Python que está utilizando el Agent.

| Métrica                           | Descripción                                      |
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Un valor de `1` si el Agent se está ejecutando y enviando informes a Datadog, etiquetado con la versión del Agent.  |
| `datadog.agent.started`        | Un conteo de `1` cada vez que el Agent se inicia.    |
| `datadog.agent.python.version` | Un valor de `1`, etiquetado con la versión de Python.     |


Consulte la integración de [Métricas del Agent][3] para obtener una lista completa de las métricas del Agent.

### Verificaciones {#checks}

Dependiendo de su plataforma, el Agent tiene varias verificaciones principales habilitadas de forma predeterminada que recopilan métricas.

| Verificación       | Métricas       | Plataformas          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][4]  | Todos                |
| Disco        | [Disk][5]    | Todos                |
| IO          | [System][4]  | Todos                |
| Memoria      | [System][4]  | Todos                |
| Red          | [Network][6] | Todos                |
| NTP         | [NTP][7]     | Todos                |
| Tiempo de actividad      | [System][4]  | Todos                |
| Manejador de archivos | [System][4]  | Todos excepto Mac     |
| Carga        | [System][4]  | Todos excepto Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [System][4]  | Windows            |

Para recopilar métricas de otras tecnologías, consulte la página de [Integrations][9].



### Verificaciones de servicio {#service-checks}

El Agent está configurado para proporcionar las siguientes verificaciones de servicio:

  - `datadog.agent.up`: Devuelve **OK** si el Agent se conecta a Datadog.
  - `datadog.agent.check_status`: Devuelve **CRITICAL** si una verificación del Agent no puede enviar métricas a Datadog; de lo contrario, devuelve **OK**.

Estas verificaciones se pueden utilizar en Datadog para visualizar el estado del Agente a través de monitores y paneles de control de un vistazo. Consulta [Información general de verificación de servicios][21] para obtener más información.


## Configuraciones y funciones avanzadas {#advanced-configurations-and-features}

{{% collapse-content title="Diferencias entre el Agent para servidores y contenedores" level="h3" expanded=false id="agent-hosts-vs-containers" %}}

Existen diferencias clave entre la instalación del Agent en un servidor y en un entorno contenedorizado: 

- **Diferencias de configuración**: 
    - **Host**: El Agent se configura mediante un archivo YAML.
    - **Contenedor**: Las opciones de configuración se pasan mediante [variables de entorno][10], por ejemplo:
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **Detección de integraciones**: 
    - **Host**: Las [integrations][9] se identifican a través del archivo de configuración del Agent.
    - **Contenedor**: Las integrations se identifican automáticamente mediante la función de Autodiscovery de Datadog. Consulta [Autodiscovery básico del Agente][11] para obtener más información.

Además, consulte [Docker Agent][12] o [Kubernetes][13] para obtener una guía sobre cómo ejecutar el Agent en un entorno contenedorizado.
{{% /collapse-content %}} 


{{% collapse-content title="Configuración de etiquetas a través del archivo de configuración del Agent." level="h3" expanded=false id="setting-tags-agent-config-file" %}}

Las etiquetas añaden una capa adicional de metadatos a sus métricas y eventos. Le permiten delimitar y comparar sus datos en las visualizaciones de Datadog. Cuando se envían datos a Datadog desde múltiples servidores, etiquetar esta información le permite delimitar los datos que más le interesa visualizar.

Por ejemplo, supongamos que tiene datos recopilados de diferentes equipos y solo le interesa ver las métricas del equipo alfa; etiquetar esos servidores específicos con la etiqueta `team:alpha` o `team:bravo` le permite filtrar las métricas que están etiquetadas con `team:alpha`. Consulte [Introducción a las etiquetas][24] para obtener más información sobre cómo etiquetar sus datos.

1. Localice el [archivo de configuración principal][25] de su Agent. Para Ubuntu, la ubicación del archivo es `/etc/datadog-agent/datadog.yaml`.

2. En el archivo `datadog.yaml`, localice el parámetro `tags`. Las etiquetas a nivel de servidor se pueden establecer en la configuración `datadog.yaml` para aplicar etiquetas a todas las métricas, trazas y registros reenviados desde este servidor.

   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   # tags:
   #   - team:infra
   #   - <TAG_KEY>:<TAG_VALUE>
   ```

3. Quite el comentario del parámetro de etiquetas y la etiqueta de ejemplo `team:infra` proporcionada. También puede agregar su propia etiqueta personalizada, por ejemplo `test:agent_walkthrough`.
   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   tags:
      - team:infra
      - test:agent_walkthrough
   ```

4. Reinicie el Agent ejecutando el [comando de reinicio][26] del Agent. El comando de reinicio para Ubuntu:

   ```shell
   sudo service datadog-agent restart
   ```

5. Después de unos minutos, vaya a la [{{< ui >}}Metrics Summary{{< /ui >}} página][22] nuevamente y haga clic en la métrica `datadog.agent.started`. Además de las etiquetas predeterminadas `host` y `version`, también puede ver la etiqueta `team` y cualquier etiqueta personal que haya agregado. También puede filtrar las métricas por el campo {{< ui >}}Tag{{< /ui >}} en la parte superior de la página.

6. Vaya a la [{{< ui >}}Events Explorer{{< /ui >}} página][20] y busque las etiquetas personalizadas que se muestran con el Agent Event más reciente.

{{% /collapse-content %}} 

{{% collapse-content title="Búsqueda de métricas en la Datadog UI" level="h3" expanded=false id="finding-metrics-in-the-datadog-ui" %}}

Puede confirmar que el Agent se está ejecutando correctamente verificando sus métricas predeterminadas en la Datadog UI. Vaya a la [{{< ui >}}Metrics Summary{{< /ui >}} página][22] y busque la métrica `datadog.agent.started` o la métrica `datadog.agent.running`. Si estas métricas no son visibles de inmediato, puede tomar unos minutos para que el Agent envíe los datos a Datadog.

Haga clic en cualquiera de las métricas y se abrirá un panel de Métricas. Este panel muestra metadatos adicionales sobre dónde se recopilan estas métricas y cualquier etiqueta asociada. Si no hay etiquetas configuradas en un servidor, debería ver solo las etiquetas predeterminadas que Datadog asigna a las métricas, incluidas `version` y `host`. Consulte la sección anterior sobre cómo configurar etiquetas a través de los archivos de configuración del Agent para obtener más información sobre cómo agregar etiquetas.

Explore otras métricas predeterminadas como `ntp.offset` o `system.cpu.idle`.
{{% /collapse-content %}} 


{{% collapse-content title="Sobrecarga del Agent" level="h3" expanded=false id="agent-overhead" %}}

La cantidad de espacio y recursos que ocupa el Agent depende de la configuración y de los datos que el Agent esté enviando. Al principio, puede esperar alrededor de un 0.08% de CPU utilizada en promedio con un espacio en disco de aproximadamente 880MB a 1.3GB.

Consulte [Agent Overhead][2] para obtener más información sobre estos puntos de referencia.
{{% /collapse-content %}}

{{% collapse-content title="Opciones de configuración adicionales" level="h3" expanded=false id="additional-configuration-options" %}}

La recopilación de datos de [registros][27], [trazas][28] y [processes][29] se puede habilitar a través del archivo de configuración del Agent. Estas funciones no están habilitadas de forma predeterminada. Por ejemplo, en el archivo de configuración, el parámetro `logs_enabled` está establecido en false.

```yaml
##################################
## Log collection Configuration ##
##################################

## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Enable Datadog Agent log collection by setting logs_enabled to true.
#
# logs_enabled: false
```

Otras funciones de Datadog que se pueden configurar a través del archivo de configuración del Agent incluyen:
- Habilitación de [OTLP Trace Ingestion][30]
- [Personalización de la recopilación de registros][31] para filtrar o depurar datos confidenciales
- Configuración de datos personalizados a través de [DogStatsD][32]

A lo largo de su configuración, cuando la documentación hace referencia al archivo `datadog.yaml` o al archivo de configuración del Agent, este es el archivo que necesita configurar.

{{% /collapse-content %}} 


## Comandos {#commands}

Consulte [Agent Commands][33] para [Start][34], [Stop][35] o [Restart][26] su Agent.

## Solución de problemas {#troubleshooting}

Para obtener ayuda con la solución de problemas del Agent:

- Consulte [Agent Troubleshooting][36]
- Visualice los [Agent Log Files][37]
- Comuníquese con el [soporte de Datadog][38]

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Próximos pasos {#next-steps}

{{< whatsnext desc="Después de instalar el Agent:">}}
{{< nextlink href="/getting_started/integrations" >}}Obtenga información sobre Integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Obtenga información sobre la Datadog UI.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Aprenda a recopilar registros a través del Agent.{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Aprenda a recopilar trazas a través del Agent{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /es/agent/basic_agent_usage/?tab=agentv6v7#agent-overhead
[3]: /es/integrations/agent_metrics/
[4]: /es/integrations/system/#metrics
[5]: /es/integrations/disk/#metrics
[6]: /es/integrations/network/#metrics
[7]: /es/integrations/ntp/#metrics
[8]: /es/agent/docker/data_collected/#metrics
[9]: /es/getting_started/integrations/
[10]: /es/agent/guide/environment-variables/#overview
[11]: /es/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[12]: /es/agent/docker/?tab=standard
[13]: /es/agent/kubernetes/installation?tab=operator
[14]: /es/getting_started/agent/#checks
[15]: https://www.datadoghq.com
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: /es/agent/supported_platforms
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /es/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /es/extend/service_checks/#visualize-your-service-check-in-datadog
[22]: https://app.datadoghq.com/metric/summary
[23]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[24]: /es/getting_started/tagging/
[25]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[26]: /es/agent/configuration/agent-commands/#restart-the-agent
[27]: /es/logs/
[28]: /es/tracing/
[29]: /es/infrastructure/process/?tab=linuxwindows#introduction
[30]: /es/opentelemetry/otlp_ingest_in_the_agent/?tab=host
[31]: /es/agent/logs/advanced_log_collection/
[32]: /es/extend/dogstatsd/?tab=hostagent
[33]: /es/agent/configuration/agent-commands/
[34]: /es/agent/configuration/agent-commands/#start-the-agent
[35]: /es/agent/configuration/agent-commands/#stop-the-agent
[36]: /es/agent/troubleshooting/
[37]: /es/agent/configuration/agent-log-files/
[38]: /es/help/
[39]: /es/agent/fleet_automation/
[40]: /es/agent/?tab=Host-based
[41]: /es/getting_started/site/
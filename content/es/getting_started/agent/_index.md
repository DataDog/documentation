---
description: Guía para instalar y configurar el Agente de Datadog para recopilar métricas,
  eventos y registros a nivel de sistema desde los servidores.
further_reading:
- link: agent/
  tag: Documentation
  text: El Agente de Datadog
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únete a una sesión interactiva para potenciar la monitorización de tu infraestructura
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: ¿Por qué debería instalar el Agente de Datadog en mis instancias en la nube?
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: Blog
  text: Monitorea instancias administradas de AWS Lambda con Datadog
title: Introducción al Agente
---
## Visión general {#overview}

Esta guía presenta el Agente de Datadog y cubre:

  - [Introducción al Agente](#what-is-the-datadog-agent)
  - [Instalación](#installation)
  - [Datos recopilados por el Agente](#data-collected-by-the-agent)
  - [Configuraciones y características avanzadas](#advanced-configurations-and-features)
  - [Solución de problemas](#troubleshooting)


## ¿Qué es el Agente de Datadog? {#what-is-the-datadog-agent}

El Agente de Datadog es un software que se ejecuta en tus servidores. Recopila eventos y métricas de los servidores y los envía a Datadog, donde puedes analizar tus datos de monitorización y rendimiento. 

El Agente puede ejecutarse en:
- Hosts locales (Windows, macOS) 
- Entornos en contenedores (Docker, Kubernetes)
- Centros de datos locales 

También puede instalar y configurar el Agente utilizando herramientas de gestión de configuración como Chef, Puppet o Ansible.

El Agente puede recopilar de 75 a 100 métricas a nivel de sistema cada 15 a 20 segundos. Con una configuración adicional, puede enviar datos en vivo, registros y trazas de procesos en ejecución a Datadog. El Agente de Datadog es de código abierto, y su código fuente está disponible en GitHub en [DataDog/datadog-agent][1].

### El archivo de configuración del Agente {#the-agent-configuration-file}

El archivo de configuración principal del Agente es `datadog.yaml`. Los parámetros requeridos son:
- Su [clave API de Datadog][16], que se utiliza para asociar los datos del Agente con su organización. 
- Su [sitio de Datadog][41] ({{< region-param key="dd_site" code="true" >}}).

Consulte el [archivo de muestra `config_template.yaml`][23] para todas las opciones de configuración disponibles. Puede ajustar los archivos de configuración del Agente para aprovechar otras características de Datadog.


## Instalación {#installation}

### Requisitos previos {#prerequisites}
1. Cree una [cuenta de Datadog][15].

2. Tenga a mano su [clave API de Datadog][16].

### Configuración {#setup}

Utilice [Fleet Automation][39], el flujo de trabajo en la aplicación de Datadog, para instalar, actualizar, configurar y solucionar problemas del Agente de Datadog en un solo servidor o a gran escala. 

Consulte la [documentación del Agente][40] para obtener información adicional sobre la configuración del Agente para su plataforma específica.


## Datos recopilados por el Agente {#data-collected-by-the-agent}

Para brindarle visibilidad completa de su infraestructura, el Agente de Datadog informa métricas sobre su propia salud y configuración, así como métricas recopiladas de sus hosts y servicios a través de sus verificaciones predeterminadas.

### Métricas del Agente {#agent-metrics}

El Agente informa las siguientes métricas a Datadog sobre sí mismo. Estas métricas proporcionan información sobre qué servidores o contenedores tienen Agentes en ejecución, cuándo se inició cada Agente y la versión de Python que está utilizando el Agente.

| Métrica                           | Descripción                                      |
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Muestra un valor de `1` si el Agente está informando a Datadog.                    |
| `datadog.agent.started`        | Un conteo enviado con un valor de `1` cuando el Agente se inicia (disponible en v6.12+).    |
| `datadog.agent.python.version` | La métrica está etiquetada con el `python_version`.     |


Consulte la integración de [Métricas del Agente][3] para obtener una lista completa de métricas del Agente.

### Verificaciones {#checks}

Dependiendo de su plataforma, el Agente tiene varias verificaciones básicas habilitadas por defecto que recopilan métricas.

| Verificación       | Métricas       | Plataformas          |
| ----------- | ------------- | ------------------ |
| CPU         | [Sistema][4]  | Todos                |
| Disco        | [Disco][5]    | Todos                |
| IO          | [Sistema][4]  | Todos                |
| Memoria      | [Sistema][4]  | Todos                |
| Red         | [Red][6] | Todos                |
| NTP         | [NTP][7]     | Todos                |
| Tiempo de actividad      | [Sistema][4]  | Todos                |
| Manejador de archivos | [Sistema][4]  | Todos excepto Mac     |
| Carga        | [Sistema][4]  | Todos excepto Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [Sistema][4]  | Windows            |

Para recopilar métricas de otras tecnologías, consulte la página de [Integraciones][9].



### Verificaciones de servicio {#service-checks}

El Agente está configurado para proporcionar las siguientes verificaciones de servicio:

  - `datadog.agent.up`: Devuelve **OK** si el Agente se conecta a Datadog.
  - `datadog.agent.check_status`: Devuelve **CRÍTICO** si una verificación del Agente no puede enviar métricas a Datadog; de lo contrario, devuelve **OK**.

Estas verificaciones se pueden utilizar en Datadog para visualizar el estado del Agente a través de monitores y tableros de un vistazo. Consulte [Descripción general de las verificaciones de servicio][21] para obtener más información.


## Configuraciones y características avanzadas {#advanced-configurations-and-features}

{{% collapse-content title="Diferencias entre el Agente para servidores y contenedores" level="h4" expanded=false id="id-for-anchoring" %}}

Existen diferencias clave entre la instalación del Agente en un servidor y en un entorno de contenedores: 

- **Diferencias de configuración**: 
    - **Servidor**: El Agente se configura utilizando un archivo YAML.
    - **Contenedor**: Las opciones de configuración se pasan utilizando [variables de entorno][10], por ejemplo:
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **Detección de integraciones**: 
    - **Servidor**: Las integraciones se identifican a través del archivo de configuración del Agente.
    - **Contenedor**: Las integraciones se identifican automáticamente utilizando la función de Autodiscovery de Datadog. Consulte [Autodiscovery básico del Agente][11] para obtener más información.

Además, consulte el [Agente de Docker][12] o [Kubernetes][13] para obtener una guía sobre cómo ejecutar el Agente en un entorno de contenedores.
{{% /collapse-content %}} 


{{% collapse-content title="Configurando etiquetas a través del archivo de configuración del Agente" level="h4" expanded=false id="id-for-anchoring" %}}

Las etiquetas añaden una capa adicional de metadatos a sus métricas y eventos. Te permiten delimitar y comparar tus datos en las visualizaciones de Datadog. Cuando se envían datos a Datadog desde múltiples servidores, etiquetar esta información te permite filtrar los datos que más te interesan visualizar.

Por ejemplo, supongamos que tienes datos que se recopilan de diferentes equipos y solo te interesa ver las métricas del equipo alfa; etiquetar esos servidores específicos con la etiqueta `team:alpha` o `team:bravo` te permite filtrar las métricas que están etiquetadas con `team:alpha`. Consulta [Introducción a las Etiquetas][24] para aprender más sobre cómo etiquetar tus datos.

1. Localiza el [archivo de configuración principal][25] de tu Agente. Para Ubuntu, la ubicación del archivo es `/etc/datadog-agent/datadog.yaml`.

2. En el archivo `datadog.yaml`, localiza el parámetro `tags`. Las etiquetas a nivel de servidor se pueden establecer en la configuración `datadog.yaml` para aplicar etiquetas en todas las métricas, trazas y registros enviados desde este servidor.

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

3. Descomenta el parámetro de etiquetas y el ejemplo de etiqueta proporcionado `team:infra`. También puedes agregar tu propia etiqueta personalizada, por ejemplo `test:agent_walkthrough`.
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

4. Reinicia el Agente ejecutando el [comando de reinicio del Agente][26]. El comando de reinicio de Ubuntu:

   ```shell
   sudo service datadog-agent restart
   ```

5. Después de unos minutos, ve a la [Metrics Summary page][22] nuevamente y haz clic en la métrica `datadog.agent.started`. Además de las etiquetas predeterminadas `host` y `version`, también puedes ver la etiqueta `team` y cualquier etiqueta personal que hayas agregado. También puedes filtrar métricas por el campo `Tag` en la parte superior de la página.

6. Ve a la [Event Explorer page][20] y encuentra las etiquetas personalizadas mostradas con el último evento del Agente.

{{% /collapse-content %}} 

{{% collapse-content title="Encontrando métricas en la interfaz de usuario de Datadog" level="h4" expanded=false id="id-for-anchoring" %}}

Puedes confirmar que el Agente está funcionando correctamente al verificar sus métricas predeterminadas en la interfaz de usuario de Datadog. Ve a la [Metrics Summary page][22] y busca la métrica `datadog.agent.started` o la métrica `datadog.agent.running`. Si estas métricas no son visibles de inmediato, puede tardar unos minutos para que el Agente envíe los datos a Datadog.

Haz clic en cualquiera de las métricas y se abrirá un panel de Métricas. Este panel muestra metadatos adicionales sobre dónde se recopilan estas métricas y cualquier etiqueta asociada. Si no hay etiquetas configuradas en un host, deberías ver solo las etiquetas predeterminadas que Datadog asigna a las métricas, incluyendo `version` y `host`. Consulta la sección anterior sobre cómo configurar etiquetas a través de los archivos de configuración del Agente para aprender más sobre cómo agregar etiquetas.

Explora otras métricas predeterminadas como `ntp.offset` o `system.cpu.idle`.
{{% /collapse-content %}} 


{{% collapse-content title="Sobrecarga del Agente" level="h4" expanded=false id="id-for-anchoring" %}}

La cantidad de espacio y recursos que utiliza el Agente depende de la configuración y de los datos que el Agente está enviando. Al principio, puedes esperar alrededor del 0.08% de CPU utilizada en promedio con un espacio en disco de aproximadamente 880MB a 1.3GB.

Consulta [Sobrecarga del Agente][2] para aprender más sobre estos puntos de referencia.
{{% /collapse-content %}}

{{% collapse-content title="Opciones de configuración adicionales" level="h4" expanded=false id="id-for-anchoring" %}}

La recopilación de datos de [registros][27], [trazas][28] y [procesos][29] se puede habilitar a través del archivo de configuración del Agente. Estas características no están habilitadas por defecto. Por ejemplo, en el archivo de configuración, el parámetro `logs_enabled` está configurado como falso.

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

Otras características de Datadog que se pueden configurar a través del archivo de configuración del Agente incluyen:
- Habilitar [Ingesta de Trazas OTLP][30]
- [Personalizar la recopilación de registros][31] para filtrar o eliminar datos sensibles
- Configurar datos personalizados a través de [DogStatsD][32]

A lo largo de tu configuración, cuando la documentación se refiere al archivo `datadog.yaml` o al archivo de configuración del Agente, este es el archivo que necesitas configurar.

{{% /collapse-content %}} 


## Comandos {#commands}

Ve a [Agent Commands][33] para [Iniciar][34], [Detener][35] o [Reiniciar][26] tu Agente.

## Solución de problemas {#troubleshooting}

Para obtener ayuda con la solución de problemas del Agente:

- Consulta [Agent Troubleshooting][36]
- Consulta los [Agent Log Files][37]
- Contacta a [soporte de Datadog][38]

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Próximos pasos {#next-steps}

{{< whatsnext desc="Después de que el Agente esté instalado:">}}
{{< nextlink href="/getting_started/integrations" >}}Aprende sobre Integraciones{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Aprende sobre la interfaz de usuario de Datadog{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Aprende cómo recopilar registros a través del Agente{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Aprende cómo recopilar Trazas a través del Agente{{< /nextlink >}}
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
[23]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
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
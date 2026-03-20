---
further_reading:
- link: /agent/basic_agent_usage/
  tag: Documentación
  text: Uso básico del Agent
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para monitorizar mejor tu infraestructura
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
title: Empezando con el Agent
---

Esta guía sirve de introducción al Agent y te explica cómo usarlo para enviar métricas de nivel de sistema a la plataforma de Datadog. Se utilizará como ejemplo la instalación del Agent en Ubuntu. Estos son los puntos que trataremos:

  - Instalación del Agent
  - Verificar que el Agent se esté ejecutando
  - Configurar las funciones del Agent
  - Solucionar problemas en los recursos

## Información general

### Acerca del Agent

El Datadog Agent es un software que se ejecuta en tus hosts. Recopila eventos y métricas de los hosts y los envía a Datadog, donde puedes analizar tus datos de monitorización y rendimiento. Puede ejecutarse en tus hosts locales (Windows, MacOS), entornos contenedorizados (Docker, Kubernetes) y en los centros de datos on-premise. Para instalarlo y configurarlo, puedes utilizar herramientas de gestión de configuración (como Chef, Puppet o Ansible).

El Agent puede recopilar entre 75 y 100 métricas de nivel de sistema cada 15-20 segundos. Con configuración adicional, el Agent puede enviar datos, logs y trazas en tiempo real desde los procesos en ejecución a la plataforma de Datadog. El Datadog Agent es de código abierto, y su código fuente está disponible en GitHub: [DataDog/datadog-agent][1].

### Sobrecarga del Agent

La cantidad de espacio y recursos que ocupa el Agent depende de la configuración y de los datos que el Agent esté configurado para enviar. Al principio, puedes esperar alrededor de un 0,08% de CPU utilizada de media con un espacio en disco de aproximadamente 880MB a 1,3GB.

Para obtener más información sobre estos puntos de referencia, consulta [Sobrecarga del Agent][2].

### Datos recopilados

#### Métricas del Agent

Las métricas del Agent que presentamos a continuación son información que el Agent envía a Datadog sobre sí mismo. Su propósito es que dispongas de datos como en qué hosts y contenedores se están ejecutando Agents, cuándo se inicia un Agent y qué versión de Python se está utilizando.

| Métrica                           | Descripción                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `datadog.agent.python.version` | La métrica está etiquetada con `python_version`. |
| `datadog.agent.running`        | Muestra un valor de `1` si el Agent envía información a Datadog.                                                 |
| `datadog.agent.started`        | Envía un count con un valor de `1` cuando se inicia el Agent (disponible en v6.12+).                                        |

Para ver la lista completa de métricas del Agent, consulta la integración de [Métricas del Agent][3].

#### Checks

Dependiendo de la plataforma que utilices, el Agent puede tener varios checks básicos activados de forma predeterminada que recopilen métricas.

| Check       | Métricas       | Platformas          |
| ----------- | ------------- | ------------------ |
| CPU         | [Sistema][4]  | Todas                |
| Disco        | [Disco][5]    | Todas                |
| E/S          | [Sistema][4]  | Todas                |
| Memoria      | [Sistema][4]  | Todas                |
| Red     | [Red][6] | Todas                |
| NTP         | [NTP][7]     | Todas                |
| Tiempo de actividad      | [Sistema][4]  | Todas                |
| Identificador de archivos | [Sistema][4]  | Todas menos Mac     |
| Carga        | [Sistema][4]  | Todas menos Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [Sistema][4]  | Windows            |

Para recopilar métricas de otras tecnologías, consulta la página de [Integraciones][9].

## Diferencias entre Agents para hosts y para contenedores

En esta guía, te enseñaremos a instalar y configurar un Agent en un host. Si tu intención es instalar Agents en un entorno contenedorizado, deberías tener en cuenta que existen algunas diferencias.

1. En un host, el Agent se configura mediante un archivo YAML (como podrás comprobar más adelante en esta guía). En cambio, las opciones de configuración del Agent en un contenedor se habilitan con [variables de entorno][10] como, por ejemplo:
    - `DD_API_KEY` para la clave de API de Datadog
    - `DD_SITE` para el sitio de Datadog

2. De un modo similar, mientras que en un host las [integraciones][9] se identifican mediante el archivo de configuración del Agent, en un entorno de contenedor se identifican automáticamente mediante la función Autodiscovery de Datadog. Para más información, consulta [Autodiscovery básico del Agent][11].

Consulta [Docker Agent][12] o [Kubernetes][13] para ver un tutorial sobre cómo ejecutar el Agent en un entorno contenedorizado.

## ¿Por qué debería instalar el Agent?

Para que el Agent envíe datos desde cualquiera de las numerosas integraciones basadas en Agent, tiene que estar instalado. No tiene necesidad de desviar los datos a la plataforma de Datadog; por ejemplo, puedes enviar logs y métricas a través de la API de Datadog. Sin embargo, el Agent es el método recomendado obstante para desviar tus datos hacia la plataforma de Datadog.

El Agent recopila datos del host cada 15 segundos para ofrecer información precisa sobre lo que sucede en tus entornos. Como se ha mencionado anteriormente en la sección [Checks][14], el Agent tiene varios checks activados que recopilan más de 50 métricas predeterminadas para brindar más información sobre los datos de nivel de sistema.

## Configuración

### Requisitos previos

1. Crea una [cuenta de Datadog][15].

2. Ten a mano tu [clave de API de Datadog][16].

3. Ten la IU de Datadog abierta.

**Nota**: Este tutorial utiliza el sistema operativo Ubuntu. Consulta la página [Uso básico del Agent][17] para obtener una lista completa de las plataformas compatibles.

### Instalación

En la interfaz de usuario de Datadog, ve a la página [Instalación del Agent][18] y haz clic en **Ubuntu**. Para instalar el Datadog Agent en un host, utiliza el comando de instalación de una línea de esa página (el ejemplo se muestra a continuación), actualizado con tu [clave de API de Datadog][16].

Ejemplo para Ubuntu de un comando de instalación de una línea:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Utiliza la [página de instalación del Agent][18] para consultar las instrucciones de instalación más actualizadas para tu sistema operativo.

### Validación

#### Comando del terminal

Ejecuta el [comando de estado][19] del Agent para verificar la instalación.

```shell
sudo datadog-agent status
```
Si la instalación se realiza correctamente, devolverá un informe de estado de Agent con la información del Agent al comienzo. Ejemplo:

```text
===============
Agent (v7.36.1)
===============

  Status date: 2022-06-15 15:54:48.364 EDT / 2022-06-15 19:54:48.364 UTC (1655322888364)
  Agent start: 2022-06-15 15:54:29.85 EDT / 2022-06-15 19:54:29.85 UTC (1655322869850)
  Pid: 9801
  Go Version: go1.17.6
  Python Version: 3.8.11
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 6
  Log Level: info
```

#### Eventos

En la interfaz de usuario de Datadog, ve a la [Página del Event Explorer][20]. Cuando se inicia o reinicia un Agent, envía eventos a Datadog. El siguiente mensaje aparece si tu Agent se instala correctamente:

```text
Agent de Datadog (v. 7.XX.X) iniciado en <Hostname>
```

#### Checks de servicio

El Agent está configurado para ofrecer los siguientes checks de servicio:

  - `datadog.agent.up`: devuelve `OK` si el Agent se conecta a Datadog.
    <div class="alert alert-danger">AIX Agents no informan el check de servicio <code>datadog.agent.up</code>. Puedes utilizar la métrica <code>datadog.agent.running</code> para monitorizar el tiempo de actividad de un AIX Agent. La métrica emite un valor de <code>1</code> si el Agent está informando a Datadog.</div>
  - `datadog.agent.check_status`: devuelve `CRITICAL` si un Agent check no puede enviar métricas a Datadog, en caso contrario devuelve `OK`.


Estos checks pueden utilizarse en la plataforma de Datadog para visualizar el estado del Agent a través de monitores y dashboards de forma rápida. Consulta [Información general sobre el check de servicio][21] para obtener más información.

#### Métricas

En la interfaz de usuario de Datadog, ve a la [página Resumen de métricas][22] y busca la métrica `datadog.agent.started` o la métrica `datadog.agent.running`. Si estas métricas no son visibles de inmediato, es posible que el Agent tarde unos minutos en enviar los datos a la plataforma de Datadog.

Haz clic en cualquiera de las métricas para que se abra un panel de métrica. Aquí, podrás ver metadatos adicionales sobre el lugar desde el que se recopilaron las métricas, así como cualquier etiqueta asociada. Como no se ha configurado ninguna etiqueta en el host a estas alturas del tutorial, solo deberías ver las etiquetas predeterminadas que Datadog asigna a las métricas, como `version` y `host`. Para obtener más información sobre cómo añadir etiquetas, consulta la siguiente sección sobre los archivos de configuración del Agent.

Explora otras métricas predeterminadas, como `ntp.offset` o `system.cpu.idle`.

## Archivos de configuración del Agent

El archivo de configuración principal del Agent es `datadog.yaml`. Estos son los parámetros obligatorios:
- tu [clave de API de Datadog][16], que se utiliza para asociar los datos del Agent con tu organización, y
- el sitio de Datadog ({{< region-param key="dd_site" code="true" >}}).

Consulta el [ejemplo de archivo `config_template.yaml`][23] para ver todas las opciones disponibles de configuración.

Puedes modificar los archivos de configuración del Agent para aprovechar otras funciones de Datadog, incluidas las etiquetas (tags).

#### Configurar etiquetas (tags) mediante el archivo de configuración del Agent

Las etiquetas añaden una capa adicional de metadatos a tus métricas y eventos. Te permiten contexto y comparar los datos en visualizaciones de Datadog. Cuando los datos se envían a Datadog desde múltiples hosts, el etiquetado de esta información te permite limitar los datos que más te interesa visualizar.

Por ejemplo, supongamos que tienes datos recopilados de diferentes equipos y sólo te interesa ver las métricas del equipo alfa, el etiquetado de esos hosts específicos con `team:alpha` o `team:bravo` te permite filtrar hasta las métricas que están etiquetadas con `team:alpha`. Consulta [Empezando con etiquetas][24] para obtener más información sobre el etiquetado de tus datos.

1. Localiza el [archivo principal de configuración][25] del Agent. Para Ubuntu, las localizaciones del archivos son `/etc/datadog-agent/datadog.yaml`.

2. En el archivo `datadog.yaml`, localiza el parámetro `tags`. Puedes definir las etiquetas de nivel de host en la configuración de `datadog.yaml` para aplicar las etiquetas en todas las métricas, trazas y logs que se desvíen desde este host.

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

3. Quita la marca de comentario del parámetro de etiquetas y de la etiqueta `team:infra` del ejemplo. También puedes añadir tu propia etiqueta personalizada (por ejemplo, `test:agent_walkthrough`).
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

4. Reinicia el Agent ejecutando el [comando de reinicio] del Agent [26]. El comando de reinicio de Ubuntu:

   ```shell
   sudo service datadog-agent restart
   ```

5. Unos minutos más tarde, ve de nuevo a la [página Resumen de métricas][22] y haz clic en la métrica `datadog.agent.started`. Además de las etiquetas `host` y `version` predeterminadas, verás la etiqueta `team` y las etiquetas personales que hayas añadido. También puedes filtrar las métricas con el campo `Tag` en la parte superior de la página.

6. Ve a la [página del Event Explorer][20] y busca las etiquetas personalizadas que aparecen con el último evento del Agent.

#### Otras opciones de configuración

La recopilación de datos de [logs][27], [trazas (traces)][28] y [procesos][29] puede habilitarse a través del archivo de configuración del Agent. No son funciones activadas por defecto. Por ejemplo, en el archivo de configuración, el parámetro `logs_enabled` está establecido en false.

```yaml
##################################
## Configuración de la recopilación de logs ##
##################################

## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Para activar la recopilación de logs del Datadog Agent, establece logs_enabled como true.
#
# logs_enabled: false
```

Para configurar otras funciones de Datadog mediante el archivo de configuración del Agent, es necesario:
- Activar [la ingesta de trazas de OTLP][30]
- [Personalizar la recopilación de logs][31] para filtrar o limpiar datos confidenciales
- Configurar datos personalizados a través de [DogStatsD][32]

Durante la configuración, cuando veas que la documentación hace referencia al archivo `datadog.yaml` o al archivo de configuración del Agent, ten en cuenta que se trata del archivo que tienes que configurar.

## Comandos

Consulta [Comandos del Agent][33] para [Iniciar][34], [Detener][35] o [Reiniciar][26] tu Agent.

## Solucionar problemas

Si necesitas ayuda para solucionar problemas relacionados con el Agent:

- Consulta [Solucionar problemas del Agent][36]
- Ve los [archivos de log del Agent][37]
- Contacta con el [soporte de Datadog][38]

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Siguientes pasos

{{< whatsnext desc="After the Agent is installed:">}}
{{< nextlink href="/getting_started/integrations" >}}Obtén información sobre las integraciones{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}Obtén información sobre la IU de Datadog{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Obtén información sobre cómo recopilar logs a través del Agent{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Obtén información sobre cómo recopilar trazas a través del Agent{{< /nextlink >}}
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
[17]: /es/agent/basic_agent_usage/?tab=agentv6v7
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /es/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /es/developers/service_checks/#visualize-your-service-check-in-datadog
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
[32]: /es/developers/dogstatsd/?tab=hostagent
[33]: /es/agent/configuration/agent-commands/
[34]: /es/agent/configuration/agent-commands/#start-the-agent
[35]: /es/agent/configuration/agent-commands/#stop-the-agent
[36]: /es/agent/troubleshooting/
[37]: /es/agent/configuration/agent-log-files/
[38]: /es/help/
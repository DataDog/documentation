---
algolia:
  tags:
  - desinstalar
  - desinstalación
aliases:
- /es/agent/basic_agent_usage/aix/
description: Instala y gestiona Datadog UNIX Agent en sistemas IBM AIX para la monitorización
  de infraestructuras y la recopilación de métricas personalizadas.
further_reading:
- link: /agent/architecture/#agent-architecture
  tag: Documentación
  text: Más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
- link: https://www.datadoghq.com/blog/announcing-ibm-aix-agent/
  tag: Blog
  text: Monitorizar AIX con el Datadog UNIX Agent
title: AIX
---

## Información general
El [Datadog UNIX Agent][4] lleva la monitorización a nivel de host a IBM AIX (PowerPC 8+) para que puedas visualizar las métricas del sistema, habilitar productos adicionales de Datadog y solucionar problemas de servicios que aún se ejecutan on-premises.

El UNIX Agent admite Infrastructure Monitoring y Métricas personalizadas usando [DogStatsD][11]. Otros productos como APM, Live Process Monitoring, Cloud Network Monitoring y Log Management no son compatibles con UNIX Agent. Consulta [Plataformas compatibles][5] para obtener la lista completa de versiones AIX compatibles.

Esta página te guía a través de la instalación, el funcionamiento y la eliminación de Datadog UNIX Agent en AIX.

## Instalación

### Requisitos previos
- Privilegios raíz (o sudo) en cada host
- HTTPS saliente (443) a `.datadoghq.com`
- curl o ksh (incluidos por defecto en AIX)
- Verifica que tu host está ejecutando una [Versión AIX compatible][5]

### Instalar el Agent

Para instalar el Agent en AIX, sigue las [instrucciones de la aplicación en Fleet Automation][6] y ejecuta el script generado en tus hosts.

{{< img src="/agent/basic_agent_usage/aix_img2_july_25.png" alt="El paso de instalación del Datadog Agent para hosts AIX." style="width:90%;">}}



### Archivos de log de la instalación

Puedes encontrar el log de la instalación del Agent en el archivo `dd-aix-install.log`. Para desactivar este log, elimina el parámetro `-e dd-aix-install.log` en el comando de instalación.

## Comandos

| Descripción   | Comando (como root)           |
|---------------|-----------------------------|
| Iniciar Agent   | `startsrc -s datadog-agent` |
| Detener Agent    | `stopsrc -s datadog-agent`  |
| Estado del servicio del Agent | `lssrc -s datadog-agent`|
| Página de estado del Agent | `datadog-agent status`      |
| Enviar flare | `datadog-agent flare` |
| Mostrar todos los comandos | `datadog-agent --help`  |


## Configuración del Agent

El [archivo de configuración del Datadog Agent][7] se encuentra en `/etc/datadog-agent/datadog.yaml`. Este archivo YAML contiene los detalles de conexión de todo el host utilizados para enviar datos a Datadog, incluidos:
- `api_key`: [clave de API de Datadog][8] de tu organización
- `site`: región de Datadog de destino (consulta [sitios de Datadog][1])
- `proxy`: endpoints de proxy HTTP/HTTPS para el tráfico saliente (consulta [Configuración de proxy del Datadog Agent][9])
- Etiquetas por defecto, nivel de log y configuraciones Datadog 

Un archivo de referencia totalmente comentado, situado en `/etc/datadog-agent/datadog.yaml.example`, enumera todas las opciones disponibles para compararlas o copiarlas y pegarlas.

También puedes consultar el [archivo datadog.yaml.example][10] para ver todas las opciones de configuración disponibles.


### Archivos de integración

Los archivos de configuración de las integraciones se encuentran en `/etc/datadog-agent/conf.d/`.
Cada integración tiene su propio subdirectorio, `<INTEGRATION>.d/`, que contiene:
- `conf.yaml`: la configuración activa que controla cómo la integración recopila métricas y logs
- `conf.yaml.example`: Un ejemplo que ilustra las teclas compatibles y los valores por defecto


## Integraciones disponibles

Integraciones listas para usar
: `cpu`
: `filesystem`
: `iostat`
: `load`
: `memory`
: `uptime`
: `disk`
: `network`

Integraciones adicionales
: `process`
: `lparstats`
: `ibm_was` (WebSphere Application Server)


**Nota:** La cobertura de métricas puede diferir de las integraciones de UNIX, Linux, Windows y macOS.


## Monitorizar el tiempo de actividad del Agent

Puedes utilizar la métrica `datadog.agent.running` para monitorizar el tiempo de actividad de un Agent. La métrica emite un valor de `1` si el Agent está informando a Datadog.

## Desinstalar el Agent

Para eliminar un Agent ya instalado, ejecuta el siguiente comando `installp`:

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

**Nota:** Los logs de desinstalación del Agent se pueden encontrar en el archivo `dd-aix-install.log`. Para desactivar este registro, elimina el parámetro `-e` en el comando de desinstalación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/#access-the-datadog-site
[4]: https://github.com/DataDog/datadog-unix-agent/blob/master/README.md
[5]: /es/agent/supported_platforms/?tab=unix
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aix
[7]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /es/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-unix-agent/blob/master/docs/datadog.yaml.example
[11]: /es/developers/dogstatsd/?tab=hostagent
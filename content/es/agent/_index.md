---
aliases:
- /es/agent/faq/agent-check-directory-structure
- /es/agent/faq/install-core-extra
- /es/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /es/agent/faq/the-datadog-agent-for-logs-or-traces-only
- /es/agent/basic_agent_usage/
- /es/guides/basic_agent_usage/
- /es/agent/faq/where-is-the-configuration-file-for-the-agent/
- /es/agent/faq/log-location
cascade:
- _target:
    lang: en
    path: /agent/basic_agent_usage/chef
  tags:
  - desinstalar
- _target:
    lang: en
    path: /infrastructure/**/*
  algolia:
    rank: 80
    tags:
    - agent
description: Instalar y configurar el Agent para recopilar datos
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar tus trazas
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentación
  text: ¿Por qué debería instalar el Agent en instancias de nube?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: No temas al Agent
title: Agent
---

<div class="alert alert-info">
La versión 7 del Agent ya está disponible. <a href="/agent/versions/upgrade_to_agent_v7">Actualiza a la última versión</a> para acceder a las nuevas funciones.
</div>

## Información general

El Datadog Agent es un software que se ejecuta en tus hosts. Se encarga de recopilar eventos y métricas de los hosts y los envía a Datadog, donde puedes analizar tus datos de monitorización y rendimiento. El Datadog Agent es de código abierto, y su código fuente está disponible en GitHub: [DataDog/datadog-agent][1].

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog recomienda actualizar el Datadog Agent con cada versión secundaria y de parche o, como mínimo, mensualmente. </p>
<p>
Actualizar a una versión principal del Datadog Agent y mantenerlo actualizado es la única forma admitida de obtener las últimas funciones y correcciones del Agent.</p>
</div>

## Gestión del Agent

### Gestión del Agent con Fleet Automation (recomendado)
[Fleet Automation][15] es el principal workflow (UI) / proceso (generic) en la aplicación para instalar, actualizar, configurar y solucionar problemas del Datadog Agent a escala.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="La vista de Fleet Automation que te permite gestionar centralmente tus Datadog Agents en un solo lugar." style="width:100%;">}}


- **Ver configuración e historial**: Visualiza cada Agent de tu flota, su versión, productos habilitados, archivos de configuración y cambios históricos desde una sola page (página).
- **Actualizar Agents obsoletos][13]**: Activa las actualizaciones remotas de tus Agents para mantener tu flota actualizada en unos pocos clics.
- **[Enviar una flare para compatibilidad][14]**: Desde la pestaña Compatibilidad de un host, genera una flare y adjúntala a un case (incidencia) de Compatibilidad existente o nuevo sin necesidad de utilizar la línea de comandos.
- **Uso de claves de API de auditoría**: Identifica qué Agents están utilizando una clave de API específica y rota las claves de forma segura.


### GUI del Datadog Agent Manager

<div class="alert alert-info">La GUI del Agent no es compatible con las plataformas de Windows de 32 bits.</div>

Utiliza la GUI del Datadog Agent Manager para:
- Ver la información de estado del Agent
- Ver todos los checks en ejecución
- Ver el log del Agent
- Editar el archivo de configuración (`datadog.yaml`) del Agent
- Añadir o editar los checks del Agent
- Enviar flares

La interfaz gráfica de usuario del administrador del Datadog Agent Manager está activada en forma predeterminada en Windows y macOS y se ejecuta en el puerto `5002`. Utiliza el comando `datadog-agent launch-gui` para abrir la interfaz gráfica de usuario en tu navegador web predeterminado.

Puedes cambiar el puerto predeterminado de la GUI en tu archivo de configuración `datadog.yaml`. Para deshabilitar la GUI, establece el valor del puerto en `-1`. En Linux, la GUI se encuentra deshabilitada por defecto.

Requisitos de la GUI:
- Las cookies deben estar habilitadas en tu navegador. La GUI genera y guarda un token en el navegador, que se utiliza para autenticar todas las comunicaciones con el servidor de la GUI.
- Para iniciar la GUI, el usuario debe tener los permisos necesarios. Si puedes abrir `datadog.yaml`, puedes utilizar la GUI.
- Por razones de seguridad, **solo** se puede acceder a la GUI desde la interfaz de red local (`localhost`/`127.0.0.1`), por lo que debes estar en el host donde se ejecuta el Agent. No puedes ejecutar el Agent en una VM o contenedor y acceder a este desde la máquina host.

### Interfaz de línea de comandos

A partir del Agent 6, la interfaz de línea de comandos del Agent se basa en subcomandos. Para obtener la lista completa de los subcomandos del Agent, consulta los [comandos del Agent][2].

## Aprender más sobre el Datadog Agent

### Actualizar el Agent

Para llevar a cabo la actualización básica del Datadog Agent de forma manual entre dos versiones secundarias de un host determinado, ejecuta el [comando de instalación correspondiente para tu plataforma][7].

**Nota**: Si quieres actualizar de forma manual una integración específica del Agent, consulta la [guía de gestión de integraciones][8].

### Archivos de configuración

Consulta la [documentación sobre los archivos de configuración del Agent][9].

### Sitio Datadog

Edita el [archivo de configuración principal del Agent][10], `datadog.yaml`, para establecer el parámetro `site` (por defecto, `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Nota**: Consulta la [documentación de Empezando con los sitios de Datadog][11] para obtener más información sobre el parámetro `site`.

### Localización de logs

Consulta la [documentación sobre los archivos de log del Agent][12].

## Sobrecarga del Agent

A continuación, se muestra un ejemplo del consumo de recursos del Datadog Agent. Las pruebas se realizaron en una instancia `c5.xlarge` de una máquina de Amazon EC2 (4 VCPU/8 GB de RAM) y se observó un rendimiento comparable para instancias basadas en ARM64 con recursos similares. El `datadog-agent` estándar se ejecutó con un check de proceso para monitorizar el propio Agent. Habilitar más integraciones puede aumentar la cantidad de recursos que consume el Agent.
Habilitar los checks de JMX obliga al Agent a utilizar más memoria dependiendo del número de beans expuestos por los JVMs monitorizados. Habilitar los Agents de rastreo y proceso también aumenta el consumo de recursos.

* Versión de prueba del Agent: 7.34.0
* CPU: ~ 0,08 % de la CPU utilizada en promedio
* Memoria: ~ 130 MB de RAM utilizados (memoria RSS)
* Ancho de banda de red: ~ 140 B/s ▼ | 800 B/s ▲
* Disco:
  * Linux: de 830 MB a 880 MB, dependiendo de la distribución
  * Windows: 870 MB

**Recopilación de logs**:

Los resultados que se muestran a continuación se obtuvieron a partir de una recopilación de *110 KB de logs por segundo* de un archivo con el [Forwarder de HTTP][6] habilitado. Muestra la evolución del uso de recursos en los distintos niveles de compresión disponibles.

{{< pestañas >}}
{{% tab "Nivel 6 de compresión HTTP" %}}

* Versión de prueba del Agent: 6.15.0
* CPU: ~ 1,5 % de la CPU utilizada en promedio
* Memoria: ~ 95 MB de RAM utilizados.
* Ancho de banda de red: ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "Nivel 1 de compresión HTTP" %}}

* Versión de prueba del Agent: 6.15.0
* CPU: ~ 1 % de la CPU utilizada en promedio
* Memoria: ~ 95 MB de RAM utilizados.
* Ancho de banda de red: ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP sin comprimir" %}}

* Versión de prueba del Agent: 6.15.0
* CPU: ~ 0,7 % de la CPU utilizada en promedio
* Memoria: ~ 90 MB de RAM utilizados (memoria RSS)
* Ancho de banda de red: ~ 200 KB/s ▲

{{% /tab %}}
{{< /tabs >}}


## Recursos adicionales
{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Instala y configura el Datadog Agent en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Agent del clúster</u>: Instala y configura el Agent del clúster para Kubernetes, una versión del Datadog Agent creada para recopilar eficazmente datos de monitorización de todo un clúster orquestado.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}Amazon<u>ECS</u>: Instala y configura el Datadog Agent en Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Instala y configura el Datadog Agent con Amazon ECS en AWS Fargate{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Instala y configura el Datadog IoT Agent, una versión del Datadog Agent optimizada para monitorizar dispositivos y aplicaciones integradas de IoT.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Recopilación de logs</u>: Activa y configura la recopilación de logs en la aplicación del Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>Proxy</u>: Si la configuración de tu red restringe el tráfico saliente, utiliz un proxy para el tráfico del Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>Versiones</u>: El Agent 7 es la última versión principal del Datadog Agent. Más información sobre los cambios entre las versiones principales del Agent y cómo actualizarlo.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Solucionar problemas</u>: Encuentra información sobre solucionar problemas para el Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guías</u>: Se trata de tutoriales detallados, paso a paso, para el uso del Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Seguridad</u>: Información sobre las principales capacidades y funciones de seguridad a disposición de los clientes para garantizar la seguridad de su entorno.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Configura Observability Pipelines y Datadog</u>: Despliega Observability Pipelines Worker como agregador para recopilar, transformar y redirigir todos tus logs y métricas a cualquier destino.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /es/agent/configuration/agent-commands/
[6]: /es/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /es/agent/guide/integration-management/
[9]: /es/agent/configuration/agent-configuration-files/
[10]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /es/getting_started/site/
[12]: /es/agent/configuration/agent-log-files/
[13]: /es/agent/fleet_automation/remote_management/#remotely-upgrade-your-agents
[14]: /es/agent/troubleshooting/send_a_flare/?tab=agent#send-a-flare-from-the-datadog-site
[15]: /es/agent/fleet_automation
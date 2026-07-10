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
  - uninstall
- _target:
    lang: en
    path: /infrastructure/**/*
  algolia:
    rank: 80
    tags:
    - agent
description: Instale y configure el Agente para recopilar datos
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopile sus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Recopile sus procesos
- link: /tracing/
  tag: Documentación
  text: Recopile sus trazas
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentación
  text: ¿Por qué instalar el Agente en instancias en la nube?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: No tema al Agente
- link: https://learn.datadoghq.com/courses/agent-on-host
  tag: Centro de Aprendizaje
  text: El Agente en un servidor
title: Agente
---
<div class="alert alert-info">
La versión 7 del Agente está disponible. <a href="/agent/versions/upgrade_to_agent_v7">Actualice a la versión más reciente</a> para beneficiarse de toda la nueva funcionalidad.
</div>

## Resumen {#overview}

El Agente de Datadog es un software que se ejecuta en sus servidores. Recopila eventos y métricas de los servidores y los envía a Datadog, donde puede analizar sus datos de monitoreo y rendimiento. El Agente de Datadog es de código abierto y su código fuente está disponible en GitHub en [DataDog/datadog-agent][1].

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog recomienda que actualices el Agente de Datadog con cada versión menor y de parche, o, como mínimo, mensualmente. </p>
<p>
Actualizar a una versión principal del Agente de Datadog y mantenerlo actualizado es la única forma soportada para obtener la última funcionalidad y correcciones del Agente.</p>
<p> <em>Se recomienda instalar completamente el Agente.</em> Sin embargo, hay un paquete independiente de DogStatsD disponible para Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE y Ubuntu. Este paquete se utiliza en entornos contenedorizados donde DogStatsD se ejecuta como un sidecar o en entornos que ejecutan un servidor DogStatsD sin la funcionalidad completa del Agente.</p>
</div>

## Gestionando el Agente {#managing-the-agent}

### Managing the Agent with Fleet Automation (recomendado) {#managing-the-agent-with-fleet-automation-recommended}
[Fleet Automation][15] es el flujo de trabajo principal en la aplicación para instalar, actualizar, configurar y solucionar problemas del Agente de Datadog a gran escala.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="La vista de Fleet Automation que te permite gestionar centralmente tus Agentes de Datadog en un solo lugar." style="width:100%;">}}


- **{{< ui >}}View configuration & history{{< /ui >}}**: Ver cada Agente en tu flota, su versión, productos habilitados, archivos de configuración y cambios históricos desde una sola página.
- **[Actualizar Agentes desactualizados][13]**: Iniciar actualizaciones remotas para tus Agentes y mantener tu flota actualizada en unos pocos clics.
- **[Enviar una señal para soporte][14]**: Desde la pestaña {{< ui >}}Support{{< /ui >}} de un servidor, genera una señal y adjúntala a una incidencia de soporte existente o nueva sin tener que usar la línea de comandos.
- **Auditar el uso de la clave API**: Identificar qué Agentes están utilizando una clave API específica y rotar claves de manera segura.


### Administrador del Agente de Datadog GUI {#datadog-agent-manager-gui}

<div class="alert alert-info">La interfaz gráfica del Agente no es compatible en plataformas Windows de 32 bits.</div>

Utilice la interfaz gráfica del Administrador del Agente de Datadog para:
- Ver la información de estado de su Agente
- Ver todas las verificaciones en ejecución
- Ver el registro del Agente
- Editar el archivo de configuración del Agente (`datadog.yaml`)
- Agregar o editar verificaciones del Agente
- Enviar señales

La interfaz gráfica del Administrador del Agente de Datadog está habilitada por defecto en Windows y macOS, y se ejecuta en el puerto `5002`. Utilice el comando `datadog-agent launch-gui` para abrir la interfaz gráfica en su navegador web predeterminado.

Puede cambiar el puerto predeterminado de la interfaz gráfica en su archivo de configuración `datadog.yaml`. Para deshabilitar la interfaz gráfica, establezca el valor del puerto en `-1`. En Linux, la interfaz gráfica está deshabilitada por defecto.

Requisitos de la interfaz gráfica:
- Las cookies deben estar habilitadas en su navegador. La interfaz gráfica genera y guarda un token en su navegador, que se utiliza para autenticar todas las comunicaciones con el servidor de la interfaz gráfica.
- Para iniciar la interfaz gráfica, el usuario debe tener los permisos requeridos. Si puede abrir `datadog.yaml`, puede usar la interfaz gráfica.
- Por razones de seguridad, la interfaz gráfica solo puede ser accedida desde la interfaz de red local (`localhost`/`127.0.0.1`), por lo tanto, debe estar en el servidor donde se está ejecutando el Agente. No puede ejecutar el Agente en una máquina virtual o un contenedor y acceder a él desde el servidor.

### Interfaz de línea de comandos {#command-line-interface}

Desde el Agente 6 en adelante, la interfaz de línea de comandos del Agente se basa en subcomandos. Para una lista completa de los subcomandos del Agente, consulte [Comandos del Agente][2].

## Avanzando más con el Agente de Datadog {#getting-further-with-the-datadog-agent}

### Actualizar el Agente {#update-the-agent}

Para actualizar manualmente el núcleo del Agente de Datadog entre dos versiones menores en un servidor determinado, ejecute el [comando de instalación correspondiente para su plataforma][7].

**Nota**: Si desea actualizar manualmente una integración específica del Agente, consulte la [guía de Gestión de Integraciones][8].

### Archivos de configuración {#configuration-files}

Consulte la [documentación de archivos de configuración del Agente][9].

### Sitio de Datadog {#datadog-site}

Edite el [archivo de configuración principal del Agente][10], `datadog.yaml`, para establecer el parámetro `site` (por defecto es `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Nota**: Consulte la [documentación de Introducción a los Sitios de Datadog][11] para más detalles sobre el parámetro `site`.

### Ubicación de registro {#log-location}

Consulte la [documentación de archivos de registro del Agente][12].

## Sobrecarga del Agente {#agent-overhead}

Un ejemplo del consumo de recursos del Agente de Datadog se muestra a continuación. Se realizaron pruebas en una instancia de máquina Amazon EC2 `c5.xlarge` (4 VCPU/ 8GB RAM) y se observó un rendimiento comparable en instancias basadas en ARM64 con recursos similares. El `datadog-agent` estándar se estaba ejecutando con un chequeo de proceso para monitorear el propio Agente. Habilitar más integraciones puede aumentar el consumo de recursos del Agente.
Habilitar las Comprobaciones JMX obliga al Agente a usar más memoria dependiendo del número de beans expuestos por las JVMs monitoreadas. Habilitar los Agentes de trazas y procesos también aumenta el consumo de recursos.

* Versión de prueba del Agente: 7.34.0
* CPU: ~ 0.08% de la CPU utilizada en promedio
* Memoria: ~ 130MB de RAM utilizados (memoria RSS)
* Ancho de banda de red: ~ 140 B/s ▼ | 800 B/s ▲
* Disco:
  * Linux 830MB a 880MB dependiendo de la distribución
  * Windows: 870MB

**Colección de registros**:

Los resultados a continuación se obtienen de una colección de *110KB de registros por segundo* de un archivo con el [reenvío HTTP][6] habilitado. Muestra la evolución del uso de recursos para los diferentes niveles de compresión disponibles.

{{< tabs >}}
{{% tab "Nivel de compresión HTTP 6" %}}

* Versión de prueba del Agente: 6.15.0
* CPU: ~ 1.5% de la CPU utilizada en promedio
* Memoria: ~ 95MB de RAM utilizados.
* Ancho de banda de red: ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "Nivel de compresión HTTP 1" %}}

* Versión de prueba del Agente: 6.15.0
* CPU: ~ 1% de la CPU utilizada en promedio
* Memoria: ~ 95MB de RAM utilizados.
* Ancho de banda de red: ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP sin comprimir" %}}

* Versión de prueba del Agente: 6.15.0
* CPU: ~ 0.7% de la CPU utilizada en promedio
* Memoria: ~ 90MB de RAM utilizados (memoria RSS)
* Ancho de banda de red: ~ 200 KB/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## Recursos adicionales {#additional-resources}
{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Instalar y configurar el Agente de Datadog en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: Instalar y configurar el Cluster Agent para Kubernetes, una versión del Agente de Datadog diseñada para recopilar de manera eficiente datos de monitoreo de un clúster orquestado.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Instalar y configurar el Datadog Agent en Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Instalar y configurar el Datadog Agent con Amazon ECS en AWS Fargate.{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Instalar y configurar el Datadog IoT Agent, una versión del Datadog Agent optimizada para monitorear dispositivos IoT y aplicaciones embebidas.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Recolección de registros</u>: Habilitar y configurar la recolección de registros en el Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>Proxy</u>: Si la configuración de su red restringe el tráfico saliente, use un proxy para el tráfico del Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>Versiones</u>: El Datadog Agent 7 es la última versión principal del Datadog Agent. Conozca los cambios entre las versiones principales del Datadog Agent y cómo actualizar.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Solución de Problemas</u>: Encuentre información de solución de problemas para el Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guías</u>: Estos son tutoriales detallados y paso a paso para usar el Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Seguridad</u>: Información sobre las principales capacidades y características de seguridad disponibles para los clientes para garantizar que su entorno esté seguro.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Configurar Observability Pipelines y Datadog</u>: Desplegar el Observability Pipelines Worker como un agregador para recopilar, transformar y dirigir todos sus registros y métricas a cualquier destino.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura Adicional {#further-reading}

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
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
description: Instala y configura el Agente para recopilar datos
further_reading:
- link: /logs/
  tag: Documentation
  text: Recopila tus registros
- link: /infrastructure/process/
  tag: Documentation
  text: Recopila tus procesos
- link: /tracing/
  tag: Documentation
  text: Recopila tus trazas
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: ¿Por qué instalar el Agente en instancias en la nube?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: No temas al Agente
title: Agente
---
<div class="alert alert-info">
El Agente v7 está disponible. <a href="/agent/versions/upgrade_to_agent_v7">Actualiza a la versión más reciente</a> para beneficiarte de toda la nueva funcionalidad.
</div>

## Resumen

El Agente de Datadog es un software que se ejecuta en tus hosts. Recopila eventos y métricas de los hosts y los envía a Datadog, donde puedes analizar tus datos de monitoreo y rendimiento. El Agente de Datadog es de código abierto y su código fuente está disponible en GitHub en [DataDog/datadog-agent][1].

<br>

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog recomienda que actualices el Agente de Datadog con cada lanzamiento menor y de parches, o, como mínimo, mensualmente. </p>
<p>
Actualizar a una versión principal del Agente de Datadog y mantenerlo actualizado es la única forma soportada de obtener la última funcionalidad y correcciones del Agente.</p>
<p> <em>Se recomienda instalar completamente el Agente.</em> Sin embargo, un paquete independiente de DogStatsD está disponible para Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE y Ubuntu. Este paquete se utiliza en entornos contenedorizados donde DogStatsD se ejecuta como un sidecar o en entornos que ejecutan un servidor DogStatsD sin la funcionalidad completa del Agente.</p>
</div>

## Gestión del Agente

### Gestión del Agente con Automatización de Flota (recomendado)
[Automatización de Flota][15] es el flujo de trabajo principal dentro de la aplicación para instalar, actualizar, configurar y solucionar problemas del Agente de Datadog a gran escala.

{{< img src="/agent/basic_agent_usage/basic_agent_2_july_25.png" alt="La vista de Automatización de Flota que permite gestionar centralmente sus Agentes de Datadog en un solo lugar." style="width:100%;">}}


- **Ver configuración e historial**: Ver cada Agente en su flota, su versión, productos habilitados, archivos de configuración y cambios históricos desde una sola página.
- **[Actualizar Agentes desactualizados][13]**: Activar actualizaciones remotas para sus Agentes y mantener su flota actualizada con unos pocos clics.
- **[Enviar una señal para soporte][14]**: Desde la pestaña de Soporte de un host, generar una señal y adjuntarla a un caso de Soporte existente o nuevo sin tener que usar la línea de comandos.
- **Auditar el uso de la clave API**: Identificar qué Agentes están utilizando una clave API específica y rotar claves de manera segura.


### Interfaz Gráfica del Administrador del Agente de Datadog

<div class="alert alert-info">La interfaz gráfica del Agente no es compatible con plataformas Windows de 32 bits.</div>

Utilice la interfaz gráfica del Administrador del Agente de Datadog para:
- Ver la información de estado de su Agente
- Ver todas las verificaciones en ejecución
- Ver el registro del Agente
- Editar el archivo de configuración del Agente (`datadog.yaml`)
- Agregar o editar verificaciones de Agente
- Enviar bengalas

La interfaz gráfica del administrador de Agente de Datadog está habilitada por defecto en Windows y macOS, y se ejecuta en el puerto `5002`. Utiliza el comando `datadog-agent launch-gui` para abrir la interfaz gráfica en tu navegador web predeterminado.

Puedes cambiar el puerto predeterminado de la interfaz gráfica en tu archivo de configuración `datadog.yaml`. Para deshabilitar la interfaz gráfica, establece el valor del puerto en `-1`. En Linux, la interfaz gráfica está deshabilitada por defecto.

Requisitos de la interfaz gráfica:
- Las cookies deben estar habilitadas en tu navegador. La interfaz gráfica genera y guarda un token en tu navegador, que se utiliza para autenticar todas las comunicaciones con el servidor de la interfaz gráfica.
- Para iniciar la interfaz gráfica, el usuario debe tener los permisos requeridos. Si puedes abrir `datadog.yaml`, puedes usar la interfaz gráfica.
- Por razones de seguridad, la interfaz gráfica solo puede ser accedida desde la interfaz de red local (`localhost`/`127.0.0.1`), por lo tanto, debes estar en el host donde se está ejecutando el Agente. No puedes ejecutar el Agente en una máquina virtual o un contenedor y acceder a él desde la máquina host.

### Interfaz de línea de comandos

Desde el Agente 6 en adelante, la interfaz de línea de comandos del Agente se basa en subcomandos. Para una lista completa de subcomandos del Agente, consulta [Comandos del Agente][2].

## Avanzando más con el Agente de Datadog

### Actualizar el Agente

Para actualizar manualmente el núcleo del Agente de Datadog entre dos versiones menores en un host determinado, ejecute el [comando de instalación correspondiente para su plataforma][7].

**Nota**: Si desea actualizar manualmente una integración específica del Agente, consulte la [guía de Gestión de Integraciones][8].

### Archivos de configuración

Consulte la [documentación de archivos de configuración del Agente][9].

### Sitio de Datadog

Edite el [archivo de configuración principal del Agente][10], `datadog.yaml`, para establecer el parámetro `site` (por defecto es `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Nota**: Consulte la [documentación de Introducción a los Sitios de Datadog][11] para más detalles sobre el parámetro `site`.

### Ubicación de los registros

Consulte la [documentación de archivos de registro del Agente][12].

## Sobrecarga del Agente

Un ejemplo del consumo de recursos del Agente de Datadog se muestra a continuación. Se realizaron pruebas en una instancia de máquina Amazon EC2 `c5.xlarge` (4 VCPU/ 8GB RAM) y se observó un rendimiento comparable en instancias basadas en ARM64 con recursos similares. El `datadog-agent` estándar se estaba ejecutando con un chequeo de proceso para monitorear el Agente en sí. Habilitar más integraciones puede aumentar el consumo de recursos del Agente.
Habilitar las verificaciones de JMX obliga al Agente a usar más memoria dependiendo del número de beans expuestos por las JVMs monitoreadas. Habilitar los Agentes de traza y proceso también aumenta el consumo de recursos.

* Versión de prueba del Agente: 7.34.0
* CPU: ~ 0.08% del CPU utilizado en promedio
* Memoria: ~ 130MB de RAM utilizada (memoria RSS)
* Ancho de banda de red: ~ 140 B/s ▼ | 800 B/s ▲
* Disco:
  * Linux 830MB a 880MB dependiendo de la distribución
  * Windows: 870MB

**Recolección de registros**:

Los resultados a continuación se obtienen de una colección de *110KB de registros por segundo* de un archivo con el [reenvío HTTP][6] habilitado. Muestra la evolución del uso de recursos para los diferentes niveles de compresión disponibles.

{{< tabs >}}
{{% tab "Nivel de compresión HTTP 6" %}}

* Versión de prueba del Agente: 6.15.0
* CPU: ~ 1.5% del CPU utilizado en promedio
* Memoria: ~ 95MB de RAM utilizada.
* Ancho de banda de red: ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "Nivel de compresión HTTP 1" %}}

* Versión de prueba del Agente: 6.15.0
* CPU: ~ 1% del CPU utilizado en promedio
* Memoria: ~ 95MB de RAM utilizada.
* Ancho de banda de red: ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP sin comprimir" %}}

* Versión de prueba del Agente: 6.15.0
* CPU: ~ 0.7% de la CPU utilizada en promedio
* Memoria: ~ 90MB de RAM utilizada (memoria RSS)
* Ancho de banda de red: ~ 200 KB/s ▲
 
{{% /tab %}}
{{< /tabs >}}


## Recursos adicionales
{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: Instalar y configurar el Agente de Datadog en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Agente de Clúster</u>: Instalar y configurar el Agente de Clúster para Kubernetes, una versión del Agente de Datadog diseñada para recopilar datos de monitoreo de manera eficiente desde un clúster orquestado.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: Instalar y configurar el Agente de Datadog en Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: Instalar y configurar el Agente de Datadog con Amazon ECS en AWS Fargate{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: Instalar y configurar el Agente de IoT de Datadog, una versión del Agente de Datadog optimizada para monitorear dispositivos IoT y aplicaciones embebidas.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Recolección de Registros</u>: Habilitar y configurar la recolección de registros en el Agente de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>Proxy</u>: Si la configuración de su red restringe el tráfico saliente, use un proxy para el tráfico del Agente.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>Versiones</u>: El Agente 7 es la última versión principal del Agente de Datadog. Conozca los cambios entre las versiones principales del Agente y cómo actualizar.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Solución de Problemas</u>: Encuentre información sobre la solución de problemas para el Agente de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guías</u>: Estos son tutoriales detallados, paso a paso, para usar el Agente.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Seguridad</u>: Información sobre las principales capacidades y características de seguridad disponibles para los clientes para garantizar que su entorno esté seguro.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Configurar Pipelines de Observabilidad y Datadog</u>: Desplegar el Trabajador de Pipelines de Observabilidad como un agregador para recopilar, transformar y enrutar todos sus registros y métricas a cualquier destino.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura Adicional

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
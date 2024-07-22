---
aliases:
- /es/guides/basic_agent_usage/
- /es/agent/faq/where-is-the-configuration-file-for-the-agent/
- /es/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: FAQ
  text: ¿Cómo determina Datadog el nombre de host del Agent?
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: Lista de todos los comandos del Agent
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: Localización de todos los archivos de configuración del Agent
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: Blog
  text: Mejoras de rendimiento en el pipeline de métricas del Datadog Agent
title: Uso básico del Agent
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Gestión del Agent

Puedes gestionar la instalación del Agent mediante la GUI del Datadog Agent Manager o desde la línea de comandos.

### GUI del Datadog Agent Manager

<div class="alert alert-info">La GUI del Agent no es compatible con las plataformas de Windows de 32 bits.</div>

Utiliza la GUI del Datadog Agent Manager para:
- Ver la información de estado del Agent
- Ver todos los checks en ejecución
- Ver el log del Agent
- Editar el archivo de configuración (`datadog.yaml`) del Agent
- Añadir o editar los checks del Agent
- Enviar flares

La GUI del Datadog Agent Manager se encuentra habilitada por defecto en Windows y macOS, y se ejecuta en el puerto `5052`. Utiliza el comando `datadog-agent launch-gui` para abrir la GUI en tu navegador web predeterminado.

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

### Sitio de Datadog

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

{{< tabs >}}
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

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/troubleshooting/send_a_flare/
[2]: /es/agent/configuration/agent-commands/
[6]: /es/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /es/agent/guide/integration-management/
[9]: /es/agent/configuration/agent-configuration-files/
[10]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /es/getting_started/site/
[12]: /es/agent/configuration/agent-log-files/
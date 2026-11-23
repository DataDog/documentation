---
description: Aprenda estrategias para comenzar con su nueva instalación de Datadog.
further_reading:
- link: /getting_started/support/
  tag: Documentación
  text: Introducción al soporte de Datadog
title: Introducción
---
## Descripción general {#overview}

Esta guía de Introducción ofrece estrategias para implementar Datadog de manera efectiva en su organización. Explore recursos de asistencia, cursos del Learning Center para profundizar sus conocimientos, e instrucciones para configurar un entorno de prueba.

## Obtener ayuda {#getting-help}

### Recursos de autoservicio {#self-service-resources}

A medida que avance en esta guía, puede consultar los siguientes recursos de autoservicio:

* [Cursos de capacitación](#learn-datadog-basics) de Datadog.
* La [documentación][16] de Datadog, especialmente las páginas de [Introducción][17], para familiarizarse más con la plataforma.  
* La [Datadog UI][18], que proporciona ayuda en contexto, información sobre campos de configuración específicos, notas de la versión y otros recursos; haga clic en el <kbd>?</kbd> icono en toda la aplicación o en la parte inferior de la navegación del producto.

{{< img src="/administrators_guide/help_center.png" alt="Captura de pantalla del centro de ayuda en el Datadog UI" style="width:90%;">}} 

### Enviar un ticket de soporte {#file-a-support-ticket}

Para obtener soporte cuando se encuentre un problema:

* [**Soporte de Datadog**][20]: Disponible para ayudar con problemas difíciles, guiar su instalación, traducir problemas a condiciones locales, identificar errores y agregar al registro las solicitudes de funciones.
* [**Datadog Agent flare**][21]: Esta herramienta de CLI crea automáticamente un nuevo ticket de soporte y envía un archivo comprimido con archivos de registro relevantes redactados, configuraciones de nivel de depuración y configuraciones locales al soporte de Datadog, sin necesidad de iniciar sesión. Para obtener información sobre cómo usar y enviar el flare al soporte de Datadog, consulte [envío de un flare][21].  
* [**Fleet Automation**][5]: Permite la generación remota de flare desde la interfaz de usuario de la plataforma.

## Aprenda los conceptos básicos de Datadog {#learn-datadog-basics}

Familiarícese con las partes de Datadog que son más importantes para su incidencia de uso. Comience inscribiéndose en nuestros cursos gratuitos del [Learning Center][1]. Incorpore los siguientes cursos a sus flujos de trabajo de incorporación:

**Introducción**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Fundamentos de Datadog{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Prácticas recomendadas de etiquetado{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-software-catalog" >}}Administración del catálogo{{< /nextlink >}}
{{< /whatsnext >}}

**Administradores**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}El Agent en un servidor{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Monitoreo de un clúster de Kubernetes{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: automatización e infraestructura como código{{< /nextlink >}}
{{< /whatsnext >}} 

**Interfaz de usuario**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introducción a los dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Descubrimiento de widgets de gráficos{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Uso de dashboards y SLOs{{< /nextlink >}}
{{< /whatsnext >}}

**Ingenieros de confiabilidad del sitio**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog 101: ingeniero de confiabilidad del sitio{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}Monitors and Alerting de APM{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Uso de Datadog RUM para realizar un seguimiento de las métricas web principales{{< /nextlink >}}
{{< /whatsnext >}}

**Desarrolladores**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Configure APM para aplicaciones Java{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: Desarrollador{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Seguimiento de errores con RUM para aplicaciones web JavaScript{{< /nextlink >}}
{{< /whatsnext >}}

## Cree un entorno de prueba {#create-a-test-environment}

Después de completar algunos cursos, aplique lo que ha aprendido a sus condiciones locales. Instale y experimente con Datadog en un entorno aislado de bajo riesgo para familiarizarse con el entorno. Cree un entorno sencillo y accesible para desarrollar su configuración de monitoreo antes de una instalación más amplia. 

### Configuración de su entorno de prueba {#configuring-your-test-environment}

#### In-App {#in-app}

La [Datadog UI][18] es el mejor lugar para comenzar a construir su entorno de prueba. La plataforma proporciona asistencia de configuración, analizadores automáticos de datos en vivo, sugerencias contextuales y muchas otras herramientas. La [Datadog UI][18] proporciona recursos útiles para completar algunas de estas tareas. 

Algunos ejemplos son:

* Cree una [prueba de Synthetic Monitoring][14] para comenzar a probar transacciones comerciales críticas en sus aplicaciones.
* Cree algunos [Service Level Objectives][15] (SLOs) para definir objetivos para el rendimiento de la aplicación.
* Revise la página de [configuración del servicio APM][9] y siga las instrucciones paso a paso para comenzar a instrumentar sus servicios.
* Configure y pruebe las [pipelines de registros][8] para determinar cómo desea ingerir diferentes conjuntos de registros provenientes de la infraestructura y las aplicaciones.
* Revise la página de [Monitor Templates][10] para comenzar a agregar alertas en su entorno de prueba.

#### Plantillas de configuración del Agent en servidor {#host-agent-config-templates}

El [Datadog Agent][2] es de código abierto y se publica en GitHub. El repositorio de GitHub del Datadog Agent es un recurso útil para ver plantillas de configuración y especificaciones que le ayudarán a construir su entorno. 

Aquí tiene algunos ejemplos:

* [Agent Config Examples][3]
* [Integration Config Specs][4]   
* [Fleet Automation][5]

## Próximos pasos {#next-steps}

Para crear correctamente una nueva instalación de Datadog, revise la página de [plan][11]. Aprenderá a crear un ejercicio de alcance, configurar el [resource tagging][12], conocer las mejores prácticas del producto, agregar más productos y optimizar su recopilación de datos para garantizar una instalación sin problemas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /es/getting_started/tagging/unified_service_tagging/
[7]: /es/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/templates
[11]: /es/administrators_guide/plan
[12]: /es/administrators_guide/plan/#resource-tagging
[13]: https://github.com/DataDog/datadog-agent/tree/main/examples
[14]: https://app.datadoghq.com/synthetics/tests
[15]: https://app.datadoghq.com/slo/manage
[16]: https://docs.datadoghq.com
[17]: /es/getting_started
[18]: https://app.datadoghq.com
[19]: /es/bits_ai/
[20]: /es/help
[21]: /es/agent/troubleshooting/send_a_flare/?tab=agent
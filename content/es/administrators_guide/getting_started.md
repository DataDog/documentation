---
description: Aprende estrategias para empezar a utilizar tu nueva instalación de Datadog.
further_reading:
- link: /getting_started/support/
  tag: Documentación
  text: Empezando con el soporte técnico de Datadog
title: Empezando
---

## Información general

Esta guía Empezando te ofrece estrategias para implementar eficazmente Datadog en tu organización. Explora los recursos de ayuda, los cursos del Centro de aprendizaje para ampliar tus conocimientos y las instrucciones para configurar un entorno de prueba.

## Obtener ayuda

### Recursos de autoservicio

A medida que avances en esta guía, puedes consultar los siguientes recursos de autoservicio:

* Cursos de [formación de Datadog](#learn-datadog-basics).
* La [documentación][16] de Datadog, especialmente las páginas [Empezando][17], para familiarizarte aún más con la plataforma.  
* La [interfaz de usuario de Datadog][18], que proporciona ayuda en contexto, información sobre campos específicos de configuración, notas de versión y otros recursos, haz clic en el icono `"?"` en toda la aplicación, o en la parte inferior de navegación del producto.

{{< img src="/administrators_guide/help_center.png" alt="Captura de pantalla del centro de ayuda en la interfaz de usuario de Datadog" style="width:90%;">}} 

### Presentar un tique de soporte

Para obtener ayuda cuando te encuentres con un problema:

* [**Soporte de Datadog**][20]: disponible para ayudarte con problemas difíciles, guiar tu instalación, traducir problemas a condiciones locales, identificar errores y loguear solicitudes de características.
* [**Flare del Datadog Agent**][21]: esta herramienta de CLI crea automáticamente un nuevo tique de soporte y envía un archivo comprimido con los archivos de log pertinentes redactados, los ajustes del nivel de depuración y las configuraciones locales al soporte de Datadog, sin necesidad de iniciar sesión. Para obtener información sobre cómo utilizar y enviar el flare al soporte de Datadog, consulta [envío de un flare][21].  
* [Automatización de flotas**][5]: permite la generación remota de flares desde la interfaz de usuario de la plataforma.

## Aprender los conceptos básicos de Datadog

Ponte al día con las partes de Datadog que son más importantes para tu caso de uso. Empieza por inscribirte en nuestros cursos gratuitos del [Centro de formación][1]. Incluye los siguientes cursos a tus flujos de trabajo de incorporación:

**Empezando**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Fundación de Datadog{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Prácticas recomendadas de etiquetado{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-service-catalog" >}}Gestión del Catálogo de servicios{{< /nextlink >}}
{{< /whatsnext >}}

**Administradores**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}El Agent en un host{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Monitorización de un clúster de Kubernetes{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}API de Datadog: Automatización e infraestructura como código{{< /nextlink >}}
{{< /whatsnext >}} 

**Interfaz de usuario**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introducción a dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Detección de widgets de gráficos{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Uso de dashboards y SLOs{{< /nextlink >}}
{{< /whatsnext >}}

**Ingenieros de fiabilidad del sitio**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog 101: ingeniero de fiabilidad del sitio{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}Monitores y alertas de APM{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Uso de Datadog RUM para rastrear Core Web Vitals{{< /nextlink >}}
{{< /whatsnext >}}

**Desarrolladores**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Configuración de APM para aplicaciones de Java{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: desarrollador{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Seguimiento de errores con RUM para aplicaciones web de javascript{{< /nextlink >}}
{{< /whatsnext >}}

## Crear un entorno de test

Después de completar algunos cursos, aplica lo que has aprendido a tus condiciones locales. Instala y experimenta con Datadog en un sandbox de bajo riesgo, para familiarizarte con el entorno. Crea un entorno sencillo y accesible para desarrollar tu configuración de monitorización antes de una instalación más amplia.

### Configuración de tu entorno de test

#### En la aplicación

La [interfaz de usuario de Datadog][18] es el mejor lugar para empezar a crear tus entornos de test. La plataforma ofrece asistencia de configuración, analizadores automáticos de datos en tiempo real, sugerencias contextuales y muchas otras herramientas. La interfaz de usuario de Datadog proporciona recursos útiles para completar algunas de estas tareas.

Algunos ejemplos son:

* Crea un [test de Synthetic][14] para empezar a probar las transacciones empresariales críticas en tus aplicaciones.
* Crea unos [Objetivos de nivel de servicio (SLOs)][15] para definir los objetivos de rendimiento de la aplicación.
* Revisa la página de [Configuración del servicio de APM][9] y sigue las instrucciones paso a paso para comenzar a instrumentar tus servicios.
* Configura y prueba [Log Pipelines][8] para averiguar cómo te gustaría ingerir diferentes conjuntos de logs procedentes de infraestructura y aplicaciones.
* Revisa la página [Plantillas de monitor][10] para empezar a añadir algunas alertas en tu entorno de test.

#### Plantillas de configuración del Agent host

El [Datadog Agent][2] es de código abierto y está publicado en GitHub. El repositorio de GitHub del Agent es un recurso útil para consultar plantillas y especificaciones de configuración que te ayudarán a crear tu entorno. 

He aquí algunos ejemplos:

* [Plantilla de configuración del Agent][3]   
* [Especificaciones de configuración de la integración][4]   
* [Automatización de flotas][5]

## Próximos pasos

Para crear con éxito una nueva instalación de Datadog, revisa la página del [plan][11]. Aprenderás a crear un ejercicio de alcance, a configurar el [etiquetado de recursos][12], a conocer las prácticas recomendadas de productos, a añadir más productos y a optimizar la recopilación de datos para asegurar una instalación sin problemas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /es/getting_started/tagging/unified_service_tagging/
[7]: /es/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/recommended
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
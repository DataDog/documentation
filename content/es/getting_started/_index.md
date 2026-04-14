---
aliases:
- /es/overview
- /es/getting_started/faq/
cascade:
  algolia:
    category: Empezando
    rank: 50
description: Introducción a la plataforma de observabilidad de Datadog con guías para
  la instalación, la configuración y puesta en marcha de las principales funciones.
disable_sidebar: verdadero
further_reading:
- link: https://learn.datadoghq.com/
  tag: Centro de aprendizaje
  text: Haz un curso para empezar a utilizar Datadog
- link: https://datadoghq.com/blog/
  tag: Blog
  text: Obtén información sobre los nuevos productos y funciones de Datadog, integraciones
    y mucho más
- link: https://app.datadoghq.com/help/quick_start
  tag: Aplicación
  text: Explorar la Guía de inicio rápido
title: Empezando
---

## ¿Qué es Datadog?

Datadog es una plataforma de observabilidad que respalda cada fase del desarrollo de software en cualquier stack tecnológico. La plataforma consta de muchos productos que permiten crear, probar, monitorizar, depurar, optimizar y proteger tu software. Estos productos pueden utilizarse individualmente o combinados en una solución personalizada.

En la tabla siguiente, se enumeran algunos ejemplos de productos de Datadog:

<table>
    <thead>
        <th>Categoría</th>
        <th>Ejemplos de productos</th>
    </thead>
    <tr>
        <td><p><strong>Desarrollo</strong></p></td>
        <td>
        <ul>
        <li>Resalta las vulnerabilidades del código en tu editor de textos o en GitHub con <a href="/security/code_security/">Code Security</a>.</li>
        <li>Organiza una sesión remota de programación en parejas con <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Tests</strong></p></td>
        <td>
            <ul>
                <li>Bloquea el código defectuoso para que no se despliegue en producción con <a href="/pr_gates/">PR Gates</a>.</li>
                <li>Incentiva a tus usuarios de todo el mundo a probar tu aplicación web, API o aplicación móvil con <a href="/synthetics/">Synthetic Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitorización</strong></p></td>
        <td>
            <ul>
                <li>Ingiere <a href="/logs/">logs</a>, <a href="/metrics/">métricas</a>, <a href="/events/">eventos</a> y <a href="/tracing/glossary/#trace">trazas (traces) de red</a> con un control detallado del procesamiento, la agregación y las <a href="/monitors/">alertas.</a></li>
                <li>Evalúa el rendimiento del host con <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Evalúa el rendimiento de la aplicación con <a href="/tracing/">Application Performance Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Resolución de problemas</strong></p></td>
        <td>
            <ul>
                <li>Gestiona <a href="/error_tracking/">errores</a> e <a href="/service_management/incident_management/">incidencias</a>, resumiendo los problemas y recomendando correcciones.</li>
                <li>Mide el índice de abandono de los usuarios y detecta la frustración de los usuarios con <a href="/real_user_monitoring/">Real User Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Seguridad</strong></p></td>
        <td>
            <ul>
                <li>Detecta amenazas y ataques con <a href="/security/">Datadog Security</a>.</li>
            </ul>
        </td>
    </tr>
</table>

Además, cientos de [integraciones][1] te permiten superponer funciones de Datadog a las tecnologías que ya utilizas. Por ejemplo, la [integración de AWS][2] recopila logs, eventos y métricas de más de 90 servicios de AWS.

## Más información

{{< learning-center-callout header="Únete a una sesión de webinar de Enablement" hide_image="true" btn_title="Inscríbete" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  Esta sesión de capacitación básica ayuda a responder a la pregunta clave: "¿Qué es Datadog y qué puede hacer por mí?". Aprenderás cómo enviar datos a Datadog y qué páginas visitar para comprender mejor el estado de tus diversos entornos, aplicaciones e infraestructura.
{{< /learning-center-callout >}}

### Haz un curso
El Centro de aprendizaje de Datadog ofrece experiencia práctica en la plataforma de Datadog. Los [cursos introductorios][3] abarcan prácticas de observabilidad, conceptos clave de Datadog y mucho más.

Para comenzar rápidamente con la navegación por Datadog, prueba el [Curso de inicio rápido][4].

### Conocer más sobre un área de producto
{{< whatsnext desc="Empíeza con una de las siguientes guías:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Descubre cómo utilizar la interfaz de usuario de Datadog: dashboards, lista de infraestructuras, mapas y mucho más.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Sitio Datadog</u>: Selecciona el sitio Datadog adecuado para tu región y tus requisitos de seguridad.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>Paquetes DevSecOps</u>: Empieza con los paquetes DevSecOps de infraestructura.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: Envía métricas y eventos de tus hosts a Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Empieza a utilizar la API HTTP de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>Integraciones</u>: Aprende a recopilar métricas, trazas y logs con las integraciones de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/search" >}}<u>Búsqueda</u>: Aprende los fundamentos de la búsqueda y el filtrado en productos de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>Etiquetas (Tags)</u>: Empieza a etiquetar tus métricas, trazas y logs.{{< /nextlink >}}
{{< nextlink href="/getting_started/OpenTelemetry" >}}<u>OpenTelemetry</u>: Aprende a enviar métricas, trazas y logs de OpenTelemetry a Datadog. {{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>Centro de aprendizaje</u>: Sigue un recorrido de aprendizaje, toma una clase o un laboratorio autoguiado y explora el programa de certificación de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Servicios de plataforma:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>Dashboards</u>: Crea, comparte y realiza un mantenimiento de aquellos dashboards que responden a las preguntas relacionadas con el trabajo que más te importan.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Gestión de incidencias</u>: Comunica y realiza un seguimiento de los problemas en tus sistemas.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>Monitores</u>: Configura alertas y notificaciones para que tu equipo sepa cuándo ocurren cambios críticos.{{< /nextlink >}}
{{< nextlink href="/getting_started/notebooks" >}}<u>Notebooks</u>: Combina gráficos, métricas, logs y monitores en directo para aislar los problemas y crear guías interactivas.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: Automatiza los procesos de extremo a extremo en respuesta a las alertas y señales de seguridad.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Producto:">}}
{{< nextlink href="/getting_started/containers" >}}<u>Contenedores</u>: Aprende a utilizar Agent Autodiscovery y el Datadog Operator.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless para AWS Lambda</u>: Aprende a recopilar métricas, logs y trazas de tu infraestructura sin servidor.{{< /nextlink >}}
{{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Portal interno para desarrolladores</u>: Unifica telemetría, metadatos y flujos de trabajo para acelerar la entrega. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>Rastreo</u>: Configura el Agent para rastrear una aplicación pequeña.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Utiliza el Continuous Profiler para encontrar y solucionar problemas de rendimiento en tu código.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: Visualiza la salud y el rendimiento de las bases de datos, y soluciona rápidamente cualquier problema que surja.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Empieza a probar y monitorizar tus endpoints de API y tus experiencias empresariales clave con tests Synthetic.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: Ejecuta tests Synthetic de extremo a extremo en tus pipelines y tus IDE de CI.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Observa en profundidad como interactúan tus usuarios con tu producto con Session Replays.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>App and API Protection</u>: Descubre las prácticas recomendadas para poner a tu equipo en marcha con AAP.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Descubre las prácticas recomendadas para poner a tu equipo en marcha con Cloud Security.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Descubre las prácticas recomendadas para poner a tu equipo en marcha con Cloud SIEM.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>Logs</u>: Envía tus primeros logs y utiliza el procesamiento de logs para enriquecerlos.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: Recopila datos de pipelines CI configurando integraciones con tus proveedores CI.{{< /nextlink >}}
{{< nextlink href="/getting_started/feature_flags" >}}<u>Marcadores de funciones</u>: Gestiona la entrega de funciones y personaliza la experiencia del usuario gracias a la observabilidad incorporada.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Recopila datos de tests CI configurando servicios de test en Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Test Impact Analysis</u>: Optimiza tu paquete de tests y reduce los costes de CI ejecutando solo los tests pertinentes para tu cambio de código.{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: Analiza tu código y tus bibliotecas de código abierto en tus aplicaciones, desde el desarrollo hasta la ejecución.{{< /nextlink >}}
{{< /whatsnext >}}

## Probar la versión preliminar de un producto o una función

Los equipos de productos Datadog añaden con frecuencia nuevas funciones que pueden ayudarte. Puedes probar algunas de ellas antes de que estén disponibles, para ver si te sirven, y luego darnos tu opinión para mejorarlas. Para ver una lista completa de las versiones preliminares activas, obtener más información e inscribirte para participar, visita el [programa de versiones preliminares de productos Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/integrations/
[2]: /es/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/
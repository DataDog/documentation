---
title: Empezando
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Centro de aprendizaje'
      text: 'Haz un curso para empezar a utilizar Datadog'
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: "Obtén información sobre los nuevos productos y funciones de Datadog, integraciones y mucho más"
    - link: 'https://app.datadoghq.com/help/quick_start'
      tag: "Aplicación"
      text: "Explorar la Guía de inicio rápido"
cascade:
    algolia:
        rank: 50
        category: Empezando
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
        <li>Resalta las vulnerabilidades del código en su editor de texto o en GitHub con <a href="/security/code_security/">Code Security</a>.</li>
        <li>Facilita una sesión remota de programación en parejas con <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Tests</strong></p></td>
        <td>
            <ul>
                <li>Impide que el código defectuoso se despliegue en producción con <a href="/quality_gates/">Quality Gates</a>.</li>
                <li>Simula usuarios de todo el mundo para probar tu aplicación web, API o aplicación móvil con <a href="/synthetics/">Synthetic Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitorización</strong></p></td>
        <td>
            <ul>
                <li>Ingiere trazas (traces) de <a href="/logs/">logs</a>, <a href="/metrics/">métricas</a>, <a href="/events/">eventos</a> y <a href="/tracing/glossary/#trace">red</a> con un control preciso del procesamiento, la agregación y las <a href="/monitors/">alertas.</a></li>
                <li>Evalúa el rendimiento del host con <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Evalúa el rendimiento de las aplicaciones con <a href="/tracing/">Application Performance Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Solucionar problemas</strong></p></td>
        <td>
            <ul>
                <li>Gestiona <a href="/error_tracking/">errores</a> e <a href="/service_management/incident_management/">incidentes</a>, resume los problemas y sugiere soluciones.</li>
                <li>Mide la tasa de cancelación de los usuarios y detecta su frustración con <a href="/real_user_monitoring/">Real User Monitoring</a>.</li>
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
{{< whatsnext desc="Empieza con una de las siguientes guías:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Aprende a utilizar la interfaz de usuario de Datadog: dashboards, lista de infraestructuras, mapas y mucho más.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Sitio Datadog</u>: Selecciona el sitio Datadog apropiado para tu región y tus requisitos de seguridad.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>Paquetes DevSecOps</u>: Empieza con los paquetes de infraestructura DevSecOps.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: Envía métricas y eventos desde tus hosts a Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Empieza con la API HTTP de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>Integraciones</u>: Aprende a recopilar métricas, trazas y logs utilizando las integraciones de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>Etiquetas (tags)</u>: Empieza a etiquetar tus métricas, logs y trazas.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Aprende a enviar métricas, logs y trazas de OpenTelemetry a Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>Centro de aprendizaje</u>: Sigue un recorrido de aprendizaje, únete a una clase o laboratorio autoguiado y explora el programa de certificaciones de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Servicios de plataforma:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>Dashboards</u>: crea, comparte y mantén dashboards que responden a los temas de trabajo que te importan.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}</u>Monitores</u>: configura alertas y notificaciones para que tu equipo sepa cuándo se producen cambios críticos.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}</u>Gestión de incidencias</u>: comunica los problemas en tus sistemas y realiza un seguimiento de ellos.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}</u>Workflow Automation</u>: automatiza de principio a fin los procesos en respuesta a alertas y señales de seguridad.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Producto:">}}
{{< nextlink href="/getting_started/containers" >}}<u>Contenedores</u>: Aprende a utilizar Agent Autodiscovery y el Datadog Operator.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless para AWS Lambda</u>: Aprende a recopilar métricas, logs y trazas de tu infraestructura serverless.{{< /nextlink >}}
{{< nextlink href="/getting_started/software_catalog" >}}<u>Catálogo de software</u>: Gestiona la propiedad, la fiabilidad y el rendimiento de los servicios a escala en el Catálogo de software. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>Rastreo</u>: Configura el Agent para rastrear una aplicación pequeña.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Utiliza Continuous Profiler para detectar y corregir problemas de rendimiento en tu código.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: Visualiza el estado y el rendimiento de las bases de datos y soluciona con rapidez cualquier problema que surja.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Empieza a probar y monitorizar tus endpoints de API y experiencias comerciales clave utilizando tests Synthetic.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: Ejecuta tests Synthetic de extremo a extremo en tus pipelines CI y entornos de desarrollo integrados (IDE).{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Obtén una visibilidad profunda de la interacción de los usuarios con tus productos utilizando Session Replays.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>App and API Protection</u>: Descubre las prácticas recomendadas para que tu equipo aproveche al máximo AAP.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Descubre las prácticas recomendadas para que tu equipo aproveche al máximo Cloud Security.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Descubre las prácticas recomendadas para que tu equipo aproveche al máximo Cloud SIEM.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>Logs</u>: Envía tus primeros logs y utiliza el procesamiento de logs para enriquecerlos.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: Recopila datos de pipelines CI configurando las integraciones con los proveedores de CI.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Recopila datos de tests CI configurando servicios en Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Test Impact Analysis</u>: Optimiza tu paquete de tests y reduce los costes de CI ejecutando sólo aquellos tests relevantes para tus cambios de código.{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: Analiza tu código principal y tus bibliotecas open source en tus aplicaciones, desde el desarrollo hasta la ejecución.{{< /nextlink >}}
{{< /whatsnext >}}

## Probar la versión preliminar de un producto o una función

Los equipos de productos Datadog añaden con frecuencia nuevas funciones que pueden ayudarte. Puedes probar algunas de ellas antes de que estén disponibles, para ver si te sirven, y luego darnos tu opinión para mejorarlas. Para ver una lista completa de las versiones preliminares activas, obtener más información e inscribirte para participar, visita el [programa de versiones preliminares de productos Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/

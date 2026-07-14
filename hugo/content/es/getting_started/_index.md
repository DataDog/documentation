---
aliases:
- /es/overview
- /es/getting_started/faq/
cascade:
  algolia:
    category: Getting Started
    rank: 50
description: Introducción a la plataforma de observabilidad de Datadog con guías sobre
  la instalación, la configuración y el inicio de uso de sus características clave.
disable_sidebar: true
further_reading:
- link: https://learn.datadoghq.com/
  tag: Centro de Aprendizaje
  text: Toma un curso para comenzar con Datadog
- link: https://datadoghq.com/blog/
  tag: Blog
  text: Conoce los nuevos productos y características de Datadog, integraciones y
    más
- link: https://app.datadoghq.com/help/quick_start
  tag: App
  text: Explora la Guía de Inicio Rápido
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centro de Aprendizaje
  text: Introducción a la Observabilidad
title: Comenzando
---
## ¿Qué es Datadog? {#what-is-datadog}

Datadog es una plataforma de observabilidad que apoya cada fase del desarrollo de software en cualquier stack. La plataforma consiste en muchos productos que te ayudan a construir, probar, monitorear, depurar, optimizar y proteger tu software. Estos productos pueden ser utilizados individualmente o combinados en una solución personalizada.

La tabla siguiente enumera algunos ejemplos de productos de Datadog:

<table>
    <thead>
        <th>Categoría</th>
        <th>Ejemplos de productos</th>
    </thead>
    <tr>
        <td><p><strong>Desarrollo</strong></p></td>
        <td>
        <ul>
        <li>Destaca las vulnerabilidades de código en tu editor de texto o en GitHub con <a href="/security/code_security/">Code Security</a>.</li>
        <li>Facilita una sesión de programación en pareja remota con <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Pruebas</strong></p></td>
        <td>
            <ul>
                <li>Bloquea el código defectuoso para que no se despliegue en producción con <a href="/pr_gates/">PR Gates</a>.</li>
                <li>Simula usuarios alrededor del mundo para probar tu aplicación web, API o aplicación móvil con <a href="/synthetics/">Synthetic Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitoreo</strong></p></td>
        <td>
            <ul>
                <li>Ingesta <a href="/logs/">registros</a>, <a href="/metrics/">métricas</a>, <a href="/events/">eventos</a> y <a href="/tracing/glossary/#trace">trazas de red</a> con control granular sobre el procesamiento, la agregación y <a href="/monitors/">las alertas.</a></li>
                <li>Evalúa el rendimiento del servidor con <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Evalúa el rendimiento de la aplicación con <a href="/tracing/">Application Performance Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Resolución de Problemas</strong></p></td>
        <td>
            <ul>
                <li>Gestione <a href="/error_tracking/">errores</a> e <a href="/incident_response/incident_management/">incidentes</a>, resumiendo problemas y sugiriendo soluciones.</li>
                <li>Mide la rotación de usuarios y detecta la frustración del usuario con <a href="/real_user_monitoring/">Real User Monitoring</a>.</li>
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

Además, cientos de [integraciones][1] te permiten superponer las características de Datadog sobre las tecnologías que ya utilizas. Por ejemplo, la [integración de AWS][2] recopila registros, eventos y métricas de más de 90 servicios de AWS.

## Aprende más {#learn-more}

{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}}
  Esta sesión de habilitación fundamental ayuda a responder la pregunta clave: "¿Qué es Datadog y qué puede hacer por mí?" Aprenderás cómo enviar datos a Datadog y qué páginas visitar para comprender mejor el estado de tus diversos entornos, aplicaciones e infraestructura.
{{< /learning-center-callout >}}

### Toma un curso {#take-a-course}
El Centro de Aprendizaje de Datadog ofrece experiencia práctica con la plataforma de Datadog. Los [cursos de Introducción][3] cubren prácticas de observabilidad, conceptos clave de Datadog y más.

Para la introducción más rápida a la navegación en Datadog, prueba el [curso de Inicio Rápido][4].

### Profundiza en un área de producto {#dive-deeper-into-a-product-area}
{{< whatsnext desc="Comienza con una de las guías a continuación:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Descubre cómo usar la interfaz de usuario de Datadog: Tableros, lista de infraestructura, mapas y más.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Sitio de Datadog</u>: Selecciona el sitio de Datadog apropiado para tu región y requisitos de seguridad.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps Bundles</u>: Comienza con los DevSecOps Bundles de Infrastructure.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: Envía métricas y eventos desde tus servidores a Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Comienza con la API HTTP de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>Integraciones</u>: Aprende cómo recopilar métricas, trazas y registros con las integraciones de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/search" >}}<u>Búsqueda</u>: Aprende los fundamentos de la búsqueda y filtrado en los productos de Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>Etiquetas</u>: Comienza a etiquetar tus métricas, registros y trazas.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Aprende cómo enviar métricas, trazas y registros de OpenTelemetry a Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>Centro de Aprendizaje</u>: Sigue un camino de aprendizaje, toma una clase o laboratorio autodirigido y explora el programa de certificación de Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Servicios de Plataforma:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>Dashboards</u>: Crea, comparte y mantén tableros que respondan a las preguntas laborales que son importantes para ti.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Incident Management</u>: Comunica y rastrea problemas en tus sistemas.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>Monitors</u>: Configura alertas y notificaciones para que tu equipo sepa cuándo ocurren cambios críticos.{{< /nextlink >}}
{{< nextlink href="/getting_started/notebooks" >}}<u>Notebooks</u>: Combina gráficos en vivo, métricas, registros y monitors para aislar problemas y crear guías interactivas.{{< /nextlink >}}
{{< nextlink href="/getting_started/organization_topology" >}}<u>Topología de Organización</u>: Elige entre implementaciones de Datadog de una sola organización y múltiples organizaciones y gestiona el aislamiento con controles de acceso.{{< /nextlink >}}
{{< nextlink href="/getting_started/teams" >}}<u>Teams</u>: Construye un modelo de propiedad confiable sincronizando datos de equipo desde proveedores de identidad, GitHub y otras fuentes en Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: Automatiza procesos de extremo a extremo en respuesta a alertas y señales de seguridad.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Producto:">}}
{{< nextlink href="/getting_started/containers" >}}<u>Containers</u>: Aprende cómo usar Agent Autodiscovery y el Datadog operator.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless for AWS Lambda</u>: Aprende cómo recopilar métricas, registros y trazas de tu infraestructura sin servidor.{{< /nextlink >}}
{{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Internal Developer Portal</u>: Unifica telemetría, metadatos y flujos de trabajo para acelerar la entrega. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>Tracing</u>: Configura el Agent para trazar una pequeña aplicación.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Utiliza Continuous Profiler para encontrar y solucionar problemas de rendimiento en tu código.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: Observa la salud y el rendimiento de las bases de datos, y soluciona rápidamente cualquier problema que surja.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Comienza a probar y monitorear tus puntos de conexión de API y los principales recorridos de negocio con pruebas Synthetic.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: Ejecuta pruebas Synthetic de extremo a extremo en tus canalizaciones de CI y en tus IDEs.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Obtén una visión detallada de cómo los usuarios interactúan con tu producto mediante la reproducción de sesión.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>App and API Protection</u>: Descubre las mejores prácticas para que tu equipo comience a trabajar con AAP.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Descubre las mejores prácticas para que tu equipo comience a trabajar con Cloud Security.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Descubre las mejores prácticas para que tu equipo comience a trabajar con Cloud SIEM.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>Registros</u>: Envía tus primeros registros y utiliza el procesamiento de registros para enriquecerlos.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: Recopila datos de canalizaciones de CI configurando integraciones con tus proveedores de CI.{{< /nextlink >}}
{{< nextlink href="/getting_started/feature_flags" >}}<u>Feature Flags</u>: Gestiona la entrega de funciones y personaliza las experiencias de los usuarios, con observabilidad integrada.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Recopila datos de pruebas de CI configurando servicios de pruebas en Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Análisis de Impacto de Pruebas</u>: Optimiza tu conjunto de pruebas y reduce los costos de CI ejecutando solo las pruebas que son relevantes para tus cambios de código.{{< /nextlink >}}
{{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: Analiza tu código propio y las bibliotecas de código abierto en tus aplicaciones desde el desarrollo hasta el tiempo de ejecución.{{< /nextlink >}}
{{< /whatsnext >}}

## Prueba un producto o función de vista previa {#try-a-preview-product-or-feature}

Los equipos de producto de Datadog están agregando frecuentemente nuevas funciones que podrían ayudarte. Puedes probar algunas de ellas antes de que estén disponibles en general para ver si te ayudan y para darnos retroalimentación que nos permita mejorarlas. Para ver una lista completa de vistas previas activas, obtener más información y registrarte para participar, visita [Programa de Vista Previa de Productos de Datadog][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/integrations/
[2]: /es/integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/
---
title: Empezando
description: "Introducción a la plataforma de observabilidad de Datadog con guías para la instalación, configuración y comenzar con las características clave."
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Learning Center'
      text: '''Haz un curso para empezar a utilizar Datadog'''
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: '"Obtén información sobre los nuevos productos y funciones de Datadog, integraciones y mucho más".'
    - link: 'https://app.datadoghq.com/help/quick_start'
      tag: 'App'
      text: '"Explorar la Guía de inicio rápido"'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## ¿Qué es Datadog?

Datadog es una plataforma de observabilidad que soporta cada fase del desarrollo de software en cualquier pila. La plataforma consta de muchos productos que le ayudan a construir, probar, monitorear, depurar, optimizar y proteger su software. Estos productos se pueden utilizar individualmente o combinar en una solución personalizada.

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
        <li>Destaca vulnerabilidades de código en tu editor de texto o en GitHub con <a href="/security/code_security/">Code Security</a>.</li>
        <li>Facilitar una sesión remota de programación por parejas con <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Tests</strong></p></td>
        <td>
            <ul>
                <li>Bloquee el código defectuoso para que no se despliegue en producción con <a href="/pr_gates/">PR Gates</a>.</li>
                <li>Simule usuarios de todo el mundo para probar su aplicación web, API o aplicación móvil con <a href="/synthetics/">Monitorización sintética</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitorización</strong></p></td>
        <td>
            <ul>
                <li>Ingerir <a href="/logs/">registros</a>, <a href="/metrics/">métricas</a>, <a href="/events/">eventos</a> y <a href="/tracing/glossary/#trace">trazos de red</a> con control granular sobre el procesamiento, la agregación y las <a href="/monitors/">alertas.</a></li>
                <li>Evalúe el rendimiento del host con <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Evalúe el rendimiento de la aplicación con <a href="/tracing/">la supervisión</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Solucionar problemas</strong></p></td>
        <td>
            <ul>
                <li>Gestionar <a href="/error_tracking/">errores</a> e <a href="/incident_response/incident_management/">incidencias</a>, resumiendo problemas y sugiriendo soluciones.</li>
                <li>Mida la agitación del usuario y detecte la frustración del usuario con <a href="/real_user_monitoring/">la supervisión real</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Seguridad</strong></p></td>
        <td>
            <ul>
                <li>Detecte amenazas y ataques con <a href="/security/">Datadog Security</a>.</li>
            </ul>
        </td>
    </tr>
</table>

Además, cientos de [integraciones][1] le permiten aplicar las características de Datadog a las tecnologías que ya utiliza. Por ejemplo, la [integración de AWS][2] recopila registros, eventos y métricas de más de 90 servicios de AWS.

## Más información

{{< learning-center-callout header="Únete a una sesión de webinar de habilitación" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}} Esta sesión de habilitación de bases ayuda a responder a la pregunta clave: "¿Qué es Datadog y qué puede hacer por mí?" Aprenderá cómo enviar datos a Datadog y qué páginas visitar para comprender mejor el estado de sus diversos entornos, aplicaciones e infraestructura. {{< /learning-center-callout >}}

### Haz un curso
El Datadog Learning Center ofrece experiencia práctica con la plataforma Datadog. Los [cursos de Introducción][3] cubren prácticas de observabilidad, conceptos clave de Datadog y más.

Para comenzar rápidamente con la navegación por Datadog, prueba el \[Curso de inicio rápido]\[4].

### Conocer más sobre un área de producto
{{< whatsnext desc="Get started with one of the guides below:">}} {{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Descubre cómo usar la interfaz de usuario de Datadog: Paneles, lista de infraestructura, mapas y más.{{< /nextlink >}} {{< nextlink href="/getting_started/site" >}}<u>Sitio de Datadog</u>: Seleccione el sitio Datadog apropiado para su región y los requisitos de seguridad.{{< /nextlink >}} {{< nextlink href="/getting_started/devsecops" >}}<u>Paquetes DevSecOps</u>: Comience con los paquetes DevSecOps de infraestructura.{{< /nextlink >}} {{< nextlink href="/getting_started/agent" >}}<u>Agente</u>: Envíe métricas y eventos desde sus hosts a Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/api" >}}<u>API</u>: Comience con la API HTTP de Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/integrations" >}}<u>Integraciones</u>: Aprenda a recopilar métricas, trazas y registros con integraciones de Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/search" >}}<u>Buscar</u>: Aprenda los fundamentos de la búsqueda y el filtrado de productos Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/tagging" >}}<u>Etiquetas</u>: Comience a etiquetar sus métricas, registros y trazas.{{< /nextlink >}} {{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Aprenda a enviar métricas, trazas y registros de OpenTelemetry a Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/learning_center" >}}<u>Centro de aprendizaje</u>: Siga una ruta de aprendizaje, tome una clase o laboratorio autoguiado y explore el programa de certificación Datadog.{{< /nextlink >}} {{< /whatsnext >}}

/dashboards Cree, comparta y mantenga paneles que respondan a las preguntas de trabajo que le importan.{{< /nextlink >}} {{< nextlink href="/getting_started/incident_management" >}}<u>Gestión de incidentes</u>: Comunique y rastree los problemas en sus sistemas.{{< /nextlink >}} {{< nextlink href="/getting_started/monitors" >}}<u>Monitores</u>: Configure alertas y notificaciones para que su equipo sepa cuándo se producen cambios críticos.{{< /nextlink >}} {{< nextlink href="/getting_started/notebooks" >}}<u>Cuadernos</u>: Combine gráficos, métricas, registros y monitores en vivo para aislar problemas y crear guías interactivas.{{< /nextlink >}} {{< nextlink href="/getting_started/workflow_automation" >}}<u>Automatización de flujos</u> de trabajo: Automatice los procesos de extremo a extremo en respuesta a alertas y señales de seguridad.{{< /nextlink >}} {{< /whatsnext >}}

:Contenedores" Aprenda a usar Agent Autodiscovery y el operador Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/serverless" >}}<u>Serverless para AWS Lambda</u>: Aprenda a recopilar métricas, registros y rastros de su infraestructura sin servidor.{{< /nextlink >}} {{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Portal interno para</u> desarrolladores: Unificar la telemetría, los metadatos y los flujos de trabajo para acelerar la entrega. {{< nextlink href="/getting_started/tracing" >}}<u>Trazado</u> de {{< /nextlink >}}: Configure el Agente para rastrear una aplicación pequeña.{{< /nextlink >}} {{< nextlink href="/getting_started/profiler" >}}<u>Perfil</u>: Utilice Continuous Profiler para encontrar y solucionar problemas de rendimiento en su código.{{< /nextlink >}} {{< nextlink href="/getting_started/database_monitoring" >}}<u>Monitorización de base</u> de datos: Vea el estado y el rendimiento de las bases de datos y solucione rápidamente cualquier problema que surja.{{< /nextlink >}} {{< nextlink href="/getting_started/synthetics" >}}<u>Monitorización sintética</u>: Comience a probar y monitorear sus endpoints API y sus viajes de negocios clave con pruebas sintéticas.{{< /nextlink >}} {{< nextlink href="/getting_started/continuous_testing" >}}<u>Pruebas continuas</u>: Ejecute pruebas sintéticas de extremo a extremo en sus pipelines e IDE de CI.{{< /nextlink >}} {{< nextlink href="/getting_started/session_replay" >}}<u>Repetición de sesión</u>: Obtenga una visión detallada de cómo interactúan los usuarios con su producto con las repeticiones de sesión.{{< /nextlink >}} {{< nextlink href="/getting_started/application_security" >}}<u>Protección de aplicaciones</u>: Descubra las mejores prácticas para poner en marcha su equipo con AAP.{{< /nextlink >}} {{< nextlink href="/getting_started/cloud_security_management" >}}<u>Seguridad en nube</u>: Descubra las mejores prácticas para poner en marcha su equipo con Cloud Security.{{< /nextlink >}} {{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Descubra las mejores prácticas para poner en marcha su equipo con Cloud SIEM.{{< /nextlink >}} {{< nextlink href="/getting_started/logs" >}}<u>Registros</u>: Envíe sus primeros registros y utilice el procesamiento de registros para enriquecerlos.{{< /nextlink >}} {{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibilidad</u>: Recopile datos de canalizaciones de CI configurando integraciones con sus proveedores de CI.{{< /nextlink >}} {{< nextlink href="/getting_started/feature_flags" >}}<u>Feature Flags</u>: Gestiona la entrega de funciones y personaliza las experiencias de usuario con observabilidad integrada.{{< /nextlink >}} {{< nextlink href="/getting_started/test_optimization" >}}<u>Optimización de pruebas</u>: Recopile datos de pruebas de IC configurando servicios de prueba en Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Análisis de impacto</u> de prueba: Optimice su conjunto de pruebas y reduzca los costes de CI solo ejecutando pruebas relevantes para los cambios de código.{{< /nextlink >}} {{< nextlink href="/getting_started/code_security" >}}<u>Seguridad del código</u>: Analice su código de origen y bibliotecas de código abierto en sus aplicaciones, desde el desarrollo hasta el tiempo de ejecución.{{< /nextlink >}} {{< /whatsnext >}}

## Probar la versión preliminar de un producto o una función

Los equipos de Datadog Product suelen añadir nuevas funciones que podrían ayudarte. Puedes probar algunos de ellos antes de que estén disponibles en general para ver si te ayudan y darnos tu opinión para mejorarlos. Para ver una lista completa de vistas previas activas, obtener más información e inscribirse para participar, vaya al [Programa de Vistas][5] Previas de Productos de Datadog.

## Referencias adicionales

| ---------------------------------- | ----------------------------------- |

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/

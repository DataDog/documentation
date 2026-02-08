---
title: Empezando
description: "Introducción a la plataforma de observación de Datadog con guías para la instalación, configuración y puesta en marcha de funciones clave."
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
      text: '"Explorar la Quick Start Guide"'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## ¿Qué es Datadog?

Datadog es una plataforma de observabilidad que respalda cada fase del desarrollo de software en cualquier pila. La plataforma consta de muchos productos que le ayudan a crear, probar, supervisar, depurar, optimizar y proteger su software. Estos productos pueden utilizarse individualmente o combinarse para crear una solución personalizada.

En la tabla siguiente, se enumeran algunos ejemplos de productos de Datadog:

<table>
    <thead>
        <th>Categoría</th>
        <th>Ejemplos de productos</th>
    </thead>
    <tr>
        <td><p><strong>Development</strong></p></td>
        <td>
        <ul>
        <li>Resalte las vulnerabilidades del código en su editor de texto o en GitHub con <a href="/security/code_security/">Code Security</a>.</li>
        <li>Facilite una sesión de programación en pareja remota con <a href="/coscreen/">CoScreen</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Testing</strong></p></td>
        <td>
            <ul>
                <li>Bloquee la implementación de código defectuoso en producción con <a href="/pr_gates/">PR Gates</a>.</li>
                <li>Simule usuarios de todo el mundo para probar su aplicación web, API o aplicación móvil con <a href="/synthetics/">Synthetic Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitoring</strong></p></td>
        <td>
            <ul>
                <li>Ingiera <a href="/logs/">registros</a>, <a href="/metrics/">métricas</a>, <a href="/events/">eventos</a>y <a href="/tracing/glossary/#trace">seguimientos de red</a> con control granular sobre el procesamiento, la agregación y <a href="/monitors/">las alertas.</a></li>
                <li>Evalúe el rendimiento del host con <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Evalúe el rendimiento de las aplicaciones con <a href="/tracing/">Application Performance Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Solucionar problemas</strong></p></td>
        <td>
            <ul>
                <li>Gestionar <a href="/error_tracking/">errores</a> e <a href="/incident_response/incident_management/">incidentes</a>, resumiendo los problemas y sugiriendo soluciones.</li>
                <li>Mida la pérdida de usuarios y detecte su frustración con <a href="/real_user_monitoring/">Real User Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Security</strong></p></td>
        <td>
            <ul>
                <li>Detecte amenazas y ataques con <a href="/security/">Datadog Security</a>.</li>
            </ul>
        </td>
    </tr>
</table>

Además, cientos de [integraciones][1] le permiten agregar funciones de Datadog a las tecnologías que ya utiliza. Por ejemplo, la [integración de AWS][2] recopila registros, eventos y métricas de más de 90 servicios de AWS.

## Más información

{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrese" btn_url="https://www.datadoghq.com/technical-enablement/session/datadog-overview/">}} Esta sesión de capacitación básica ayuda a responder la pregunta clave: "¿Qué es Datadog y qué puede hacer por mí?" Aprenderá cómo enviar datos a Datadog y qué páginas visitar para comprender mejor el estado de sus diversos entornos, aplicaciones e infraestructura. {{< /learning-center-callout >}}

### Haz un curso
El Centro de aprendizaje Datadog ofrece experiencia práctica con la plataforma Datadog. Los [Getting Started courses][3] cubren prácticas de observabilidad, conceptos clave de Datadog y más.

Para comenzar rápidamente con la navegación por Datadog, prueba el [\[Quick Start course.][4]

### Conocer más sobre un área de producto
{{< whatsnext desc="Comienza con una de las guías a continuación:">}} {{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Descubra cómo utilizar la interfaz de usuario de Datadog: Paneles de control, lista de infraestructura, mapas y más. {{< /nextlink >}} {{< nextlink href="/getting_started/site" >}}<u>Sitio de Datadog</u>: Seleccione el sitio Datadog adecuado para su región y requisitos de seguridad.{{< /nextlink >}} {{< nextlink href="/getting_started/devsecops" >}}<u>Paquetes DevSecOps</u>: Comience a utilizar los paquetes de Infrastructure DevSecOps.{{< /nextlink >}} {{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: Envía métricas y eventos desde tus hosts a Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/api" >}}<u>API</u>: Comience a utilizar la API HTTP de Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/integrations" >}}<u>Integraciones</u>: Aprenda a recopilar métricas, seguimientos y registros con las integraciones de Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/search" >}}<u>Buscar</u>: Aprenda los conceptos básicos de búsqueda y filtrado en los productos Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/tagging" >}}<u>Etiquetas</u>: Comience a etiquetar sus métricas, registros y seguimientos.{{< /nextlink >}} {{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Aprenda a enviar métricas, seguimientos y registros de OpenTelemetry a Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/learning_center" >}}<u>Learning Center</u>: Siga una ruta de aprendizaje, tome una clase o laboratorio autoguiado y explore el programa de certificación Datadog.{{< /nextlink >}} {{< /whatsnext >}}

{{< whatsnext desc="Servicios de plataforma:">}} {{< nextlink href="/getting_started/dashboards" >}}<u>Paneles de control</u>: Cree, comparta y mantenga paneles que respondan las preguntas laborales que le interesan.{{< /nextlink >}} {{< nextlink href="/getting_started/incident_management" >}}<u>Gestión de incidentes</u>: Comunique y realice un seguimiento de los problemas en sus sistemas.{{< /nextlink >}} {{< nextlink href="/getting_started/monitors" >}}<u>Monitores</u>: Configure alertas y notificaciones para que su equipo sepa cuándo ocurren cambios críticos.{{< /nextlink >}} {{< nextlink href="/getting_started/notebooks" >}}<u>Notebooks</u>: Combine gráficos en vivo, métricas, registros y monitores para aislar problemas y crear guías interactivas.{{< /nextlink >}} {{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: Automatice procesos de extremo a extremo en respuesta a alertas y señales de seguridad.{{< /nextlink >}} {{< /whatsnext >}}

{{< whatsnext desc="Producto:">}} {{< nextlink href="/getting_started/containers" >}}<u>Contenedores</u>: Aprenda a usar el descubrimiento automático del agente y el operador Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/serverless" >}}<u>Serverless para AWS Lambda</u>: Aprenda a recopilar métricas, registros y seguimientos de su infraestructura sin servidor.{{< /nextlink >}} {{< nextlink href="/getting_started/internal_developer_portal" >}}<u>Internal Developer Portal </u>: Unifique la telemetría, los metadatos y los flujos de trabajo para acelerar la entrega. {{< /nextlink >}} {{< nextlink href="/getting_started/tracing" >}}<u>Rastreo</u>: Configurar el agente para rastrear una aplicación pequeña.{{< /nextlink >}} {{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Utilice Continuous Profiler para encontrar y solucionar problemas de rendimiento en su código.{{< /nextlink >}} {{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: Visualice el estado y el rendimiento de las bases de datos y solucione rápidamente cualquier problema que surja.{{< /nextlink >}} {{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Comience a probar y monitorear sus puntos finales de API y recorridos comerciales clave con pruebas sintéticas. {{< /nextlink >}} {{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: Ejecute pruebas sintéticas de extremo a extremo en sus pipelines de CI e IDE.{{< /nextlink >}} {{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Obtenga una visión en profundidad de cómo interactúan los usuarios con su producto con Session Replays.{{< /nextlink >}} {{< nextlink href="/getting_started/application_security" >}}<u>App and API protection</u>: Descubra las mejores prácticas para que su equipo esté listo para trabajar con AAP.{{< /nextlink >}} {{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security</u>: Descubra las mejores prácticas para que su equipo esté listo para trabajar con seguridad en la nube.{{< /nextlink >}} {{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud Security</u>: Descubra las mejores prácticas para que su equipo esté listo para trabajar con Cloud SIEM.{{< /nextlink >}} {{< nextlink href="/getting_started/logs" >}}<u>Logs</u>: Envíe sus primeros registros y utilice el procesamiento de registros para enriquecerlos.{{< /nextlink >}} {{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: Recopile datos de canalización de CI configurando integraciones con sus proveedores de CI.{{< /nextlink >}} {{< nextlink href="/getting_started/feature_flags" >}}<u>Feature Flags</u>: Administre la entrega de funciones y personalice las experiencias de los usuarios con observabilidad incorporada.{{< /nextlink >}} {{< nextlink href="/getting_started/test_optimization" >}}<u>Test Optimization</u>: Recopile datos de prueba de CI configurando servicios de prueba en Datadog.{{< /nextlink >}} {{< nextlink href="/getting_started/test_impact_analysis" >}}<u>Análisis de impacto de pruebas</u>: Optimice su conjunto de pruebas y reduzca los costos de CI ejecutando únicamente pruebas que sean relevantes para los cambios en su código.{{< /nextlink >}} {{< nextlink href="/getting_started/code_security" >}}<u>Code Security</u>: Analice su código propio y las bibliotecas de código abierto en sus aplicaciones desde el desarrollo hasta el tiempo de ejecución.{{< /nextlink >}} {{< /whatsnext >}}

## Probar la versión preliminar de un producto o una función

Los equipos de productos de Datadog agregan con frecuencia nuevas funciones que podrían ayudarlo. Puede probar algunos de estos antes de que estén disponibles para ver si le ayudan y darnos su opinión para mejorarlos. Para ver una lista completa de vistas previas activas, obtener más información y registrarse para participar, visite [Programa de vista previa de productos Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart
[5]: https://www.datadoghq.com/product-preview/

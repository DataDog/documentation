---
algolia:
  tags:
  - recomendaciones de apm
  - recomendación de apm
  - recomendación de rum
  - recomendaciones de rum
  - application performance monitoring
  - recomendaciones de rendimiento
  - recomendaciones de fiabilidad
  - rastreo
description: Aprende a optimizar el rendimiento y la fiabilidad de tu aplicación con
  las Recomendaciones de APM.
further_reading:
- link: /tracing/
  tag: Documentación
  text: Más información sobre Application Performance Monitoring (APM)
- link: /tracing/guide/apm_dashboard/
  tag: Documentación
  text: Guía del dashboard de APM
- link: /cloud_cost_management/recommendations/
  tag: Documentación
  text: Recomendaciones de costes en la nube
- link: /database_monitoring/recommendations/
  tag: Documentación
  text: Recomendaciones de DBM
- link: https://www.datadoghq.com/blog/proactive-app-recommendations/
  tag: Blog
  text: Mejora el rendimiento y la fiabilidad con Proactive App Recommendations
multifiltersearch:
  data:
  - category: Rendimiento
    recommendation_description: Una aplicación de backend llama a la misma base de
      datos de forma secuencial en lugar de realizar consultas por lotes.
    recommendation_prerequisite: APM
    recommendation_type: Consultas N+1 a la base de datos
    scope: Servicios de backend
  - category: Rendimiento
    recommendation_description: Una aplicación de backend llama a la misma API de
      forma secuencial en lugar de realizar consultas por lotes.
    recommendation_prerequisite: APM
    recommendation_type: Llamadas secuenciales a la API
    scope: Servicios de backend
  - category: Rendimiento
    recommendation_description: Una aplicación de backend reintenta llamadas defectuosas
      a una API sin backoff.
    recommendation_prerequisite: APM
    recommendation_type: Reintentos agresivos
    scope: Servicios de backend
  - category: Rendimiento
    recommendation_description: El plan de ejecución de la consulta realiza escaneos
      secuenciales costosos. Cuando se detecta, Datadog recomienda utilizar un índice
      para agilizar la consulta.
    recommendation_prerequisite: APM + DBM
    recommendation_type: Sin índice
    scope: Bases de datos
  - category: Experiencia del usuario
    recommendation_description: Se detectan acciones comunes de rage o death en los
      elementos de una página, las cuales indican que la interfaz de usuario es engañosa
      o que hay elementos rotos.
    recommendation_prerequisite: RUM
    recommendation_type: Acción de frustración del usuario
    scope: Aplicaciones de navegador
  - category: Experiencia del usuario
    recommendation_description: Recursos grandes de JS que causan retrasos en el renderizado
      de la página inical señalando una interfaz de usuario engañosa o elementos rotos.
    recommendation_prerequisite: RUM
    recommendation_type: Tamaño de paquete no optimizado
    scope: Aplicaciones de navegador y vistas web en aplicaciones móviles
  - category: Tasa de error
    recommendation_description: Una aplicación de backend comenzó a generar un nuevo
      Error de firma.
    recommendation_prerequisite: Error Tracking
    recommendation_type: Nuevo problema
    scope: Servicios de backend
  - category: Rendimiento
    recommendation_description: Una aplicación de backend está lanzando un elevado
      número de excepciones como flujo de control
    recommendation_prerequisite: APM + Continuous Profiler
    recommendation_type: Alto volumen de excepciones lanzadas
    scope: Servicios de backend
  headers:
  - filter_by: true
    id: categoría
    name: Categoría de recomendación
  - filter_by: true
    id: recommendation_type
    name: Tipo de recomendación
  - filter_by: true
    id: contexto
    name: Alcance de la recomendación
  - id: recommendation_description
    name: Descripción de la recomendación
  - filter_by: true
    id: recommendation_prerequisite
    name: Requisito previo de la recomendación
site_support_id: apm_recommendations
title: Recomendaciones de APM
---

{{< callout url="https://www.datadoghq.com/product-preview/apm-proactive-recommendations/" >}}
Las Recomendaciones de APM están en vista previa. Las funciones y recomendaciones pueden cambiar antes de la disponibilidad general. Para solicitar acceso, rellena este formulario.
{{< /callout >}}

Las Recomendaciones de APM te ayudan a optimizar el rendimiento, la fiabilidad y los porcentajes de error de tus aplicaciones ofreciéndote oportunidades de optimización basadas en la telemetría recopilada sobre tus aplicaciones. Estas recomendaciones están diseñadas para:

- Identificar y resolver los cuellos de botella en el rendimiento
- Mejorar la fiabilidad y el tiempo de actividad del servicio
- Reducir la tasa de errores y mejorar la experiencia del usuario final

{{< img src="/tracing/recommendations/apm_recommendations.png" alt="Tu descripción de imagen" style="width:100%;" >}}

## Requisitos previos

Algunas recomendaciones dependen de productos específicos de Datadog. Utiliza el menú desplegable **Recommendation Prerequisite** (Requisito previo a la recomendación) para filtrar las recomendaciones que puedes esperar en función de tu configuración específica.

## Cómo funciona

Las Recomendaciones de APM se basan en datos recopilados de diferentes partes de tu stack tecnológico:

- Sesiones y recorridos de los usuarios a partir de Real User Monitoring (RUM)
- Trazas distribuidas a partir de Application Performance Monitoring (APM)
- Datos de error a partir de Error Tracking
- Telemetría de bases de datos a partir de Database Monitoring (DBM)

Al examinar conjuntamente estas fuentes, Datadog encuentra formas de ayudarte a mejorar el rendimiento, la fiabilidad y la experiencia del usuario.

## Uso de las Recomendaciones de APM 

Revisar las recomendaciones que requieren tu atención:

1. Ve a [**APM** > **Recommendations** (APM > Recomendaciones)][1].
2. Revisa las recomendaciones en **For Review** (Para revisión).
3. Selecciona una recomendación de la lista para ver el problema, el impacto y cómo resolverlo.
4. Revisa el problema, su impacto y la recomendación de Datadog para resolverlo.

Una vez abordada la recomendación, puedes utilizar el menú desplegable **FOR REVIEW** (PARA REVISIÓN) para cambiar el estado de la recomendación a *Reviewed*, *Ignored* o *Resolved* (Revisada, Ignorada o Resuelta). También puedes hacer clic en **Create Case** (Crear caso) para asignar la recomendación a un propietario y realizar un seguimiento del trabajo relacionado.

## Recomendaciones compatibles

<!-- La tabla a continuación es autogenerada. Añade nuevas entradas en multifiltersearch con nuevas recomendaciones a medida que estén disponibles. -->

{{< multifilter-search >}} 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/recommendations
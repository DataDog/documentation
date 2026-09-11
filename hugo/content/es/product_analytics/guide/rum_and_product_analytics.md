---
description: Guía para usuarios existentes de RUM que deseen comprender la relación
  entre RUM y Product Analytics.
further_reading:
- link: /real_user_monitoring/
  tag: Documentación
  text: Más información sobre RUM
title: Comprensión de RUM y Product Analytics
---

## ¿Qué es Product Analytics?

Product Analytics es una oferta específica creada para jefes de producto, propietarios de producto, líderes de ingeniería y otras personas que desean aprovechar el comportamiento real de los usuarios para obtener información sobre el producto y el negocio, sin necesidad de conocer otros productos de observabilidad de Datadog.

{{< img src="product_analytics/guide/understanding-PANA-RUM-summary.png" alt="Product Analytics en Datadog. El meú izquierdo muestra Product Analytics como título y contiene los elementos de navegación Inicio, Tablas,  Dashboards, Session Replay, Usuarios y Segmentos." style="width:100%;" >}}

## Product Analytics y RUM

Anteriormente, **Pathways** y **Retention Analysis** formaban parte de Datadog Real User Monitoring (RUM). Estas funciones se trasladan a Datadog Product Analytics.

Esta transición sucederá el **1 de junio de 2025**.


## Preguntas frecuentes

### ¿Cuál es la diferencia entre RUM y Product Analytics?

- Tanto Product Analytics como Real User Monitoring se basan en los SDKs para navegadores o móviles.
- Product Analytics ofrece una retención de 15 meses sobre los eventos de comportamiento (Sesiones, Vistas y Acciones). Real User Monitoring se dedica a la monitorización del rendimiento.
- Los usuarios tienen la opción de adquirir ambos productos juntos o cada uno por separado.

### ¿Cómo se ven afectados los clientes de RUM?

Como parte de la introducción de Product Analytics, se están realizando los siguientes cambios tanto para los clientes existentes como para los nuevos clientes de RUM:

- **Product Analytics Summary**, **Retention Analytics** y **Pathways** ahora son parte de **Product Analytics** y ya no están disponibles en RUM.

- **Heatmaps** (Mapas de calor) siguen estando disponibles, pero se han reubicado en la pestaña **Session Replay** para facilitar el acceso y la relevancia contextual.

- Las pestañas **Funnel** (Túnel) y **Conversion** (Conversión) siguen estando disponibles en el **RUM Explorer**. Para ver los detalles de la conversión, selecciona la visualización **Túnel** y haz clic en cualquier paso para abrir el panel **Conversión**.

Estas actualizaciones garantizan una separación más clara de los casos de uso entre RUM y Product Analytics, lo que permite flujos de trabajo más centrados y perspectivas más profundas.

###  ¿Cómo configuro Product Analytics?

Product Analytics utiliza los mismos SDKs y configuración que RUM. Para activar Product Analytics, ve a la página [Gestión de aplicaciones][3] y activa los productos deseados.

Si RUM ya está configurado, no se requiere instrumentación adicional para Product Analytics.

### ¿Por qué ya no puedo acceder a Sankeys y Retention Analysis?
- Estas funciones formaban parte de una versión preliminar y estaban disponibles para los clientes de RUM como versión beta, pero no formaban parte de la oferta principal de RUM. Estas funciones están disponibles exclusivamente para los clientes con un contrato de Product Analytics.

### ¿Session Replay está disponible con Product Analytics?

[Session Replay][1] es una oferta independiente que puede adquirirse junto con Product Analytics.

### ¿De qué disponen los clientes de RUM y de qué disponen los clientes de Product Analytics?
Consulta a continuación la tabla comparativa completa de funciones.

| Función | RUM | Análisis de productos |
|---------|-----|-------------------|
| Conservación de datos | De 15 a 30 días | 15 meses |
| Eventos de Sesión, Vista y Acción | {{< X >}} (con 30 días de retención) |  {{< X >}} |
| Eventos de Error, Recurso, Tarea larga y Vitales | {{< X >}} (con 30 días de retención para Errores, <br> 15 días para el resto) | |
| Atributos de usuario | {{< X >}} | {{< X >}} |
| Señales de frustración | {{< X >}} | {{< X >}} |
| Core Web Vitals y Mobile Vitals | {{< X >}} | {{< X >}} |
| Resumen de resultados | {{< X >}} | |
| Resumen analítico | {{< X >}} (ofrecido como vista previa en Product Analytics) | {{< X >}} |
| Solucionar problemas con los eventos vitales | {{< X >}} (solo navegador) | |
| Eventos vitales personalizados | {{< X >}} (solo navegador) | |
| Rendimiento de Feature Flags/Página de Deployment Tracking | {{< X >}} | |
| Error Tracking/Informe de fallos | {{< X >}} | |
| Correlación de RUM <> APM  | {{< X >}} | |
| Retention Analysis | | {{< X >}} |
| Embudos | {{< X >}} | {{< X >}} |
| Pathways | | {{< X >}} |
| Segmentación | | {{< X >}} |
| Mapas de calor (Heatmaps) | {{< X >}} (cuando se compra con Session Replay)| {{< X >}} (cuando se compra con Session Replay) |


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/pricing/?product=real-user-monitoring#products
[3]: https://app.datadoghq.com/rum/list?
---
kind: documentación
title: Facturación de la integración de Azure
---

## Información general

Datadog cobra por todas las [máquinas virtuales de Azure monitorizadas en Datadog][1]. Estas máquinas son facturables con independencia de que el Datadog Agent esté o no instalado. No se te cobrará dos veces si estás ejecutando el Agent en una máquina virtual de Azure seleccionada por la integración de Azure.

Además, Datadog contabiliza también los nodos dentro de los planes del servicio de aplicaciones de Azure como hosts facturables. **Nota**: Los planes del servicio de aplicaciones compartidos, dinámicos o gratuitos no computan en cuanto a nodos asociados ni repercuten en tu factura de Datadog.
La integración de Azure recopila métricas para todos los demás recursos de Azure (Azure SQL DB, Azure Redis Cache, Azure Load Balancer, etc.) sin afectar a la facturación mensual.

## Exclusión de máquinas virtuales de Azure

Usa el cuadro de integración Datadog-Azure para filtrar tus máquinas virtuales monitorizadas por Datadog. Ve a la pestaña Configuración y edita un registro de aplicación existente o añade uno nuevo. Cada filtro se controla en "Optionally limit metrics collection to hosts with tag:" (Opcionalmente, limitar la recopilación de métricas a hosts con etiqueta).

Al añadir límites a usuarios de Azure existentes dentro del cuadro de integración, las máquinas virtuales detectadas previamente podrían permanecer en la lista de infraestructura hasta dos horas. Durante el periodo de transición, las máquinas virtuales muestran un estado de `???`. Esto no cuenta a efectos de facturación.  

Las máquinas virtuales con un Agent en ejecución siguen mostrándose y se incluyen en la facturación. El uso de la opción de límite solo es aplicable a las máquinas virtuales sin ningún Agent en ejecución.

## Exclusión de planes del servicio de aplicaciones de Azure

Usa el cuadro de integración Datadog-Azure para filtrar tus planes del servicio de aplicaciones de Azure monitorizados por Datadog. Ve a la pestaña Configuración y edita un registro de aplicación existente o añade uno nuevo. El filtro se controla en "Optionally limit metrics collection to App Service Plans with tag:" (Opcionalmente limitar la recopilación de métricas a los planes del servicio de aplicaciones con etiqueta:).

**Nota**: Esto filtra las métricas de todas las aplicaciones o funciones que se ejecutan en los planes del servicio de aplicaciones.

## Métricas personalizadas de App Insights

Si [habilitas la recopilación de métricas personalizadas][5], Datadog recopilará todas las métricas personalizadas escritas en cualquier instancia de Azure App Insights con el contexto de la integración. Estas métricas se consideran métricas personalizadas en Datadog y pueden afectar a tus costes. Para obtener más información, consulta la [guía de facturación de métricas personalizadas][4].

## Solucionar problemas

Para preguntas técnicas, ponte en contacto con el [equipo de asistencia][2].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu gestor de [satisfacción al cliente][3].

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/getting_started/tagging/using_tags/#integrations
[3]: /es/infrastructure/
[4]: /es/account_management/billing/custom_metrics/?tab=countrate
[5]: /es/integrations/azure#configuration
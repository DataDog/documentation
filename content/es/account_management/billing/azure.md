---
title: Facturación de la integración de Azure
---

## Información general

Datadog factura por todas las [máquinas virtuales Azure que se monitorizan en Datadog][1]. Estas máquinas son facturables independientemente de si Datadog Agent está instalado. No se te facturará dos veces si estás ejecutando el Agent en una máquina virtual Azure respaldada por la integración de Azure. Además, Datadog cuenta los nodos en los planes de Azure App Service como hosts facturables.

**Nota**: Los planes de servicios de aplicaciones compartidas, dinámicas y de nivel gratuito no tienen asociado ningún recuento de nodos y no afectan tu factura de Datadog.

La integración de Azure recopila métricas para todos los demás recursos de Azure (como bases de datos de Azure SQL, Azure Cache for Redis, Azure Load Balancer y otros) sin afectar la facturación mensual. Para obtener un lista completa de las métricas recopiladas, consulta las [métricas admitidas por Azure Monitor][6].

## Exclusión de máquinas virtuales de Azure

Utiliza el cuadro de la integración de Azure de Datadog para filtrar tus máquinas virtuales monitorizadas por Datadog. Ve a la pestaña de configuración y edita un registro de aplicación existente o añade uno nuevo. Cada filtro se controla mediante "Limitar opcionalmente la recopilación de métricas a hosts con etiquetas (tags):"

Al añadir límites a los inquilinos de Azure existentes dentro del cuadro de la integración, las máquinas virtuales descubiertas previamente podrían permanecer en la lista de infraestructuras hasta dos horas. Durante el periodo de transición, las máquinas virtuales muestran un estado `???`. Esto no cuenta para tu facturación.

Las máquinas virtuales con Agent en ejecución siguen mostrándose y se incluyen en la facturación. El uso de la opción de límite sólo es aplicable a las máquinas virtuales sin Agent en ejecución.

## Exclusión del plan de servicios de aplicaciones de Azure

Utiliza el cuadro de la integración de Azure de Datadog para filtrar tus planes de servicios de aplicaciones de Azure monitorizados por Datadog. Ve a la pestaña de configuración y edita un registro de aplicación existente o añade uno nuevo. El filtro se controla mediante "Limitar opcionalmente la recopilación de métricas a planes de servicios de aplicaciones):"


**Nota**: Esta opción filtra las métricas de todas las aplicaciones o funciones que se ejecutan en planes de servicios de aplicaciones.

## Métricas personalizadas de App Insights

Si [habilitas la recopilación de métricas personalizadas][5], Datadog recopila todas las métricas personalizadas escritas en cualquier instancia de Azure App Insights con el contexto de la integración. En Datadog, estas métricas se consideran métricas personalizadas y pueden afectar a tus costes. Consulta la [guía de facturación de métricas personalizadas][4].

## Solucionar problemas

Si tiene preguntas técnicas, ponte en contacto con el [servicio de asistencia de Datadog][2].

Si tienes preguntas sobre facturación, ponte en contacto con tu [asesor de clientes][3].

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/getting_started/tagging/using_tags/#integrations
[3]: /es/infrastructure/
[4]: /es/account_management/billing/custom_metrics/?tab=countrate
[5]: /es/integrations/azure#configuration
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported
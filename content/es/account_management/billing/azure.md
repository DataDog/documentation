---
title: Facturación de la integración de Azure
---

## Información general

Datadog factura por todas las [máquinas virtuales Azure que se monitorizan en Datadog][1]. Estas máquinas son facturables independientemente de si Datadog Agent está instalado o no. No se te facturará dos veces si estás ejecutando el Agent en una máquina virtual Azure respaldada por la integración de Azure. Además, Datadog cuenta los nodos en los planes de Azure App Service como hosts facturables.

**Nota**: Los planes compartidos, dinámicos y de nivel gratuito de App Service no tienen asociado ningún recuento de nodos y no afectan tu factura de Datadog.

La integración de Azure recopila métricas para todos los demás recursos de Azure (como bases de datos de Azure SQL, Azure Cache for Redis, Azure Load Balancer y otros) sin afectar la facturación mensual. Para obtener un lista completa de las métricas recopiladas, consulta las [métricas compatibles con Azure Monitor][6].

## Exclusión de máquinas virtuales de Azure

Utiliza el cuadro de la integración de Azure y Datadog para filtrar tus máquinas virtuales monitorizadas por Datadog. Ve a la pestaña Metric Collection (Recopilación de métricas) y edita un registro de aplicación existente o añade uno nuevo. Cada filtro se controla con "Optionally limit metrics collection to hosts with tag:" (Limitar opcionalmente la recopilación de métricas a los hosts con etiqueta).

Al añadir límites a los inquilinos de Azure existentes dentro del cuadro de la integración, las máquinas virtuales descubiertas previamente podrían permanecer en la lista de infraestructuras hasta dos horas. Durante el periodo de transición, las máquinas virtuales muestran un estado `???`. Esto no cuenta para tu facturación.

Las máquinas virtuales con Agent en ejecución siguen mostrándose y se incluyen en la facturación. El uso de la opción de límite sólo es aplicable a las máquinas virtuales sin Agent en ejecución.

## Exclusión del plan de Azure App Service

Utiliza el cuadro de la integración Azure de Datadog para filtrar tus planes de Azure App Service monitorizados por Datadog. Ve a la pestaña de configuración y edita un registro de aplicación existente o añade uno nuevo. El filtro se controla con "Limitar opcionalmente la recopilación de métricas a los planes de App Service con etiquetas:"


**Nota**: Esta opción filtra las métricas de todas las aplicaciones o funciones que se ejecutan en planes de App Service.

## Métricas personalizadas de App Insights

Si [habilitas la recopilación de métricas personalizadas][5], Datadog recopila todas las métricas personalizadas escritas en cualquier instancia de Azure App Insights en el ámbito de la integración. En Datadog, estas métricas se consideran métricas personalizadas y pueden afectar tus costes. Consulta la [guía de facturación de métricas personalizadas][4].

## Solucionar problemas

Si tiene preguntas técnicas, ponte en contacto con el [servicio de asistencia de Datadog][2].

Si tienes preguntas sobre facturación, ponte en contacto con tu [asesor de clientes][3].

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /es/getting_started/tagging/using_tags/#integrations
[3]: /es/infrastructure/
[4]: /es/account_management/billing/custom_metrics/?tab=countrate
[5]: /es/integrations/azure#data-collected
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported
---
title: Integración de la facturación con Alibaba
---

## Información general

Datadog cobra por todas las máquinas virtuales de Alibaba monitorizadas en Datadog. Estas máquinas son facturables con independencia de que el Datadog Agent esté o no instalado. **No se te cobrará dos veces** si estás ejecutando el Agent en una máquina virtual de Alibaba seleccionada por la integración de Alibaba.

Otros recursos de Alibaba (CDN, Express Connect Instances, Aspara DB, etc.) no forman parte de la facturación mensual.

## Exclusión de máquinas virtuales de Alibaba

Usa el cuadro de [integración Datadog-Alibaba][1] para filtrar tus máquinas virtuales monitorizadas por Datadog que usen [etiquetas de host][2]. Ve a la pestaña **Configuración** y edita una cuenta existente o añade una nueva. Para filtrar por cada cuenta, haz clic en una de ellas y rellena el campo **Optionally limit metrics collection to hosts with tag:** (Opcionalmente, limitar la recopilación de métricas a los hosts con etiqueta:).

{{< img src="account_management/billing/alibaba_filter.png" alt="Filtro de máquinas virtuales de Alibaba" >}}

Al añadir límites a usuarios de Alibaba existentes dentro del cuadro de integración, las máquinas virtuales detectadas previamente podrían permanecer en la [lista de infraestructura][3] hasta dos horas. Durante el periodo de transición, las máquinas virtuales muestran un estado de `???`. Esto no cuenta a efectos de facturación.

Las máquinas virtuales con un Agent en ejecución siguen mostrándose y se incluyen en la facturación. Por tanto, usar la opción de límite solo sirve para máquinas virtuales sin ningún Agent en ejecución.

## Solucionar problemas

Si tienes alguna pregunta técnica, ponte en contacto con el [equipo de asistencia de Datadog][4].

Si tienes alguna pregunta sobre facturación, ponte en contacto con tu [asesor de clientes][5].

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba-cloud
[2]: /es/getting_started/tagging/using_tags/#integrations
[3]: /es/infrastructure/
[4]: /es/help/
[5]: mailto:success@datadoghq.com
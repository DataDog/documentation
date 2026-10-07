---
title: Facturación de la integración de Alibaba
---

## Información general

Datadog cobra todas las Máquinas Virtuales de Alibaba que estén siendo monitorizadas en Datadog. Estas máquinas son facturables independientemente de si el Datadog Agent está instalado. **No se te facturará dos veces** si estás ejecutando el Agent en una máquina virtual de Alibaba recogida por la integración de Alibaba.

Otros recursos de Alibaba (CDNs, instancias de Express Connect, bases de datos de Aspara, etc.) no forman parte de la facturación mensual.

## Exclusión de máquinas virtuales de Alibaba

Utiliza el cuadro de [integración de Datadog y Alibaba][1] para filtrar tus máquinas virtuales monitorizadas por Datadog con [etiquetas (tags) de host][2]. Ve a la pestaña **Configuration** (Configuración) y edita una cuenta existente o añade una nueva. El filtrado para cada cuenta se controla haciendo clic en ella y rellenando el campo **Optionally limit metrics collection to hosts with tag** (Opcionalmente, limita la recopilación de métricas a hosts con etiquetas):

{{< img src="account_management/billing/alibaba_filter.png" alt="Filtro de máquinas virtuales de Alibaba" >}}

Al añadir límites a cuentas de Alibaba existentes dentro del cuadro de integración, las máquinas virtuales descubiertas previamente podrían permanecer en [la lista de infraestructura][3] hasta 2 horas. Durante el período de transición, las máquinas virtuales muestran un estado de `???`. Esto no cuenta para tu facturación.

Las máquinas virtuales con un Agent en ejecución siguen mostrándose y se incluyen en la facturación, por lo que utilizar la opción de límite sólo es útil para las máquinas virtuales sin un Agent en ejecución.

## Solucionar problemas

Si tienes preguntas técnicas, ponte en contacto con [el soporte de Datadog][4].

Si tiene preguntas en Facturación, póngase en contacto con su gestor de [Éxito del cliente][5].

[1]: https://app.datadoghq.com/account/settings#integrations/alibaba-cloud
[2]: /es/getting_started/tagging/using_tags/#integrations
[3]: /es/infrastructure/
[4]: /es/help/
[5]: mailto:success@datadoghq.com
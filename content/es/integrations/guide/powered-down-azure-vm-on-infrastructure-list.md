---
aliases:
- /es/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
further_reading:
- link: /account_management/billing/azure/
  tag: FAQ
  text: Facturación de la integración de Azure
- link: /account_management/billing/azure/#azure-vm-exclusion
  tag: Documentación
  text: Filtrar máquinas virtuales de Azure por etiqueta
title: Máquinas virtuales de Azure apagadas en la lista de infraestructura
---

Cuando apagas tus máquinas virtuales en Azure, la integración de Datadog Azure sigue recopilando la métrica `azure.vm.status` para esa máquina virtual. Esta métrica se etiqueta con `status:running`, `status:not_running` o `status:unknown`.

Esto es intencionado, pero hace que la VM permanezca en tu lista de infraestructura. Si tu VM sólo informa de esta métrica, no cuenta para tu recuento de host facturable. Consulta la [sección de facturación][1] de Datadog para obtener más información sobre la facturación.

Si destruyes tu máquina virtual de Azure, desaparecerá de tu lista de infraestructura en un plazo de 3 horas.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/billing/
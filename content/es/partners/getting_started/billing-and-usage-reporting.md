---
aliases:
- /es/partners/billing-and-usage-reporting/
description: Monitorización del uso de cliente individual y el uso agregado de la
  plataforma de Datadog en configuraciones de cuenta de varias organizaciones.
title: Facturación e informes de uso
---

Sigue leyendo para obtener información sobre cómo monitorizar tanto el uso del cliente individual como el uso agregado de la plataforma de Datadog en tu cuenta de múltiples organizaciones.

Con un [rol de administrador][1] de Datadog en la organización principal, puedes ver el uso total y facturable de todas tus organizaciones, secundarias y principal, así como cómo ha cambiado el uso de tus clientes en los últimos seis meses. Para obtener más información, consulta [Uso de varias organizaciones][2].

El uso se agrega por todas las organizaciones secundarias y se factura a nivel de la organización principal. Desde la organización principal, los administradores pueden ver el uso agregado de todas las organizaciones secundarias y analizar el uso de cada una de ellas.

En caso de que los roles existentes no sean lo suficientemente flexibles para ti o tu organización de cliente, puedes crear nuevos roles personalizados. Con los roles personalizados, además de los permisos generales, es posible definir permisos más detallados para activos o tipos de datos específicos. Puedes encontrar la lista de permisos específicos para la facturación y activos de uso [en la documentación del Control de acceso basado en roles][3].

Además de la página de uso, aquí tienes algunos recursos adicionales que puedes utilizar para estimar y gestionar el uso de los clientes, así como para facilitar las asignaciones y las devoluciones de cargos:
- [Métricas de uso estimado][4]: Datadog calcula el uso estimado actual de tus clientes casi en tiempo real. Las métricas de uso estimado te permiten hacer gráficos de tu uso estimado, crear monitores o alertas en torno a tu uso estimado en función de los umbrales que elijas y recibir alertas instantáneas sobre picos o caídas en tu uso.
- [Dashboards compartidos][5]: los gráficos y dashboards compartidos te permiten mostrar visualizaciones de métricas, trazas y logs a tus usuarios fuera de Datadog. Puedes publicar dashboards de métricas de uso estimado para que tus clientes realicen un seguimiento.
- [Atribución de uso][6]:
  - Proporciona listas a las claves de etiqueta existentes por las que se está desglosando el uso y ofrece la posibilidad de cambiar y añadir nuevas etiquetas.
  - Genera diariamente archivos .tsv (valores separados por tabulaciones) para la mayoría de los tipos de uso.
  - Resume el uso al final de cada mes, no sólo por organizaciones secundarias, sino también por etiqueta.
  Ten en cuenta que la atribución de uso es una función avanzada incluida en el plan Enterprise. Para el resto de los planes, ponte en contacto con tu representante de socios de Datadog para solicitar esta función.

[1]: /es/account_management/rbac/
[2]: /es/account_management/multi_organization/#multi-org-usage
[3]: /es/account_management/rbac/permissions/?tab=ui#billing-and-usage
[4]: /es/account_management/billing/usage_metrics/
[5]: /es/dashboards/sharing/
[6]: /es/account_management/billing/usage_attribution/
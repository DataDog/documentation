---
disable_toc: false
further_reading:
- link: /observability_pipelines/set_up_pipelines/
  tag: Documentación
  text: Configurar pipelines
title: Live Capture
---

{{< beta-callout url="" header="false" btn_hidden="true">}}
Live Capture está en vista previa.
{{< /beta-callout >}}

## Información general

Utiliza Live Capture para ver los datos que una fuente envía a través del pipeline y también los datos que un procesador recibe y envía.
En concreto, se muestra la siguiente información:
- Fecha de recepción de los datos
- Los datos que se enviaron y si fueron:
    - Modificado
    - Sin modificar
    - Abandonos
    - Reducidos

## Permisos

Sólo los usuarios con el permiso `Observability Pipelines Live Capture Write` pueden configurar capturas. Los usuarios con el permiso `Observability Pipelines Live Capture Read` sólo pueden ver las eventos que ya han sido capturados. Consulta [Permisos de Observability Pipelines][1] para ver la lista de permisos para activos de Observability Pipelines.

Los administradores tienen permisos de lectura y escritura por defecto. Los usuarios estándar sólo tienen permisos de lectura por defecto. Consulta [Control de acceso][2] para obtener más información sobre los roles predeterminados de Datadog y cómo crear roles personalizados.

## Captura de eventos

1. Navega hasta [Observability Pipelines][3].
1. Selecciona tu pipeline.
1. Haz clic en el engranaje de la fuente o procesador para el que deseas capturar eventos.
1. Selecciona **Capture and view events** (Capturar y ver eventos) en el panel lateral.
1. Haz clic en **Capture** (Capturar).
1. Haz clic en **Confirm** (Confirmar) para iniciar la captura de eventos.<br>**Nota**: La captura de eventos suele tardar hasta 60 segundos. Los datos capturados son visibles para todos los usuarios con acceso de visualización y se almacenan en la plataforma de Datadog durante 72 horas.
1. Una vez finalizada la captura, haz clic en una captura específica de evento para ver los datos recibidos y enviados. También puedes buscar eventos específicos en la barra de búsqueda. Utiliza el menú desplegable situado junto a la barra de búsqueda para mostrar eventos en función del estado (`MODIFIED`, `UNMODIFIED`, `DROPPED` y `REDUCED`).
    - **Capture N** es el número de solicitud de captura. Por ejemplo, Capture N es `1` para la primera captura y `6` para la sexta captura.
    - Los datos resaltados en rojo indican datos modificados o eliminados.
    - Los datos resaltados en verde indican los datos que se han añadido.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#observability-pipelines
[2]: /es/account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
---
description: Aprenda a usar el procesador Remap to OCSF para reasignar registros a
  eventos de Open Cybersecurity Schema Framework (OCSF).
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Procesador Remap to OCSF
---
{{< product-availability >}}

## Descripción general {#overview}

Use este procesador para reasignar registros a eventos de Open Cybersecurity Schema Framework (OCSF). Las clases de eventos del esquema OCSF se establecen para una fuente y un tipo de registro específicos. Puede agregar varios mapeos a un procesador. **Nota**: Datadog recomienda que el procesador OCSF sea el último procesador en su canalización, para que la reasignación se realice después de que los registros hayan sido procesados por todos los demás procesadores.

## Configuración {#setup}

Para configurar este procesador:

Haga clic en {{< ui >}}Manage mappings{{< /ui >}}. Esto abre un modal:

- Si ya ha agregado mapeos, haga clic en un mapeo en la lista para editarlo o eliminarlo. Puede usar la barra de búsqueda para encontrar un mapeo por su nombre. Haga clic en {{< ui >}}Add Mapping{{< /ui >}} si desea agregar otro mapeo. Seleccione {{< ui >}}Library Mapping{{< /ui >}} o {{< ui >}}Custom Mapping{{< /ui >}} y haga clic en {{< ui >}}Continue{{< /ui >}}.
- Si aún no ha agregado ningún mapeo, seleccione {{< ui >}}Library Mapping{{< /ui >}} o {{< ui >}}Custom Mapping{{< /ui >}}. Haga clic en {{< ui >}}Continue{{< /ui >}}.

{{% collapse-content title="Mapeo de biblioteca" level="h3" expanded=false id="library_mapping" %}}

### Agregar un mapeo {#add-a-mapping}

1. Seleccione el tipo de registro en el menú desplegable.
1. Defina una consulta de filtro. Solo se reasignan los registros que coinciden con la consulta de filtro especificada. Todos los registros, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso de la canalización. Consulte [Sintaxis de búsqueda][1] para obtener más información.
1. Revise el registro de fuente de muestra y la salida OCSF resultante.
1. Haga clic en {{< ui >}}Save Mapping{{< /ui >}}.

### Mapeos de biblioteca {#library-mappings}

Estas son los mapeos de biblioteca disponibles:

| Fuente de registro             | Tipo de registro                                      | Categoría OCSF                 | Versiones de OCSF compatibles|
|------------------------|-----------------------------------------------|-------------------------------| -----------------------|
| AWS CloudTrail         | Tipo: Administración<br>Nombre del evento: ChangePassword | Cambio de cuenta (3001)         | 1.3.0<br>1.1.0         |
| AWS GuardDuty          | Todos los tipos de hallazgos                             | Hallazgo de detección (2004)      | 1.3.0                  |
| AWS WAF                | WebACL                                        | Actividad HTTP (4002)          | 1.3.0                  |
| GitHub                 | Crear usuario                                   | Cambio de cuenta (3001)         | 1.1.0                  |
| Auditoría de Google Cloud     | CreateBucket                                  | Cambio de cuenta (3001)         | 1.3.0<br>1.1.0         |
| Auditoría de Google Cloud     | CreateSink                                    | Cambio de cuenta (3001)         | 1.3.0<br>1.1.0         |
| Auditoría de Google Cloud     | SetIamPolicy                                  | Cambio de cuenta (3001)         | 1.3.0<br>1.1.0         |
| Auditoría de Google Cloud     | UpdateSync                                    | Cambio de cuenta (3001)         | 1.3.0<br>1.1.0         |
| Administrador de Google Workspace | addPrivilege                                  | Gestión de cuentas de usuario (3005)| 1.1.0                  |
| Infoblox               | API de auditoría                                     | Actividad de la API (6003)           | 1.3.0                  |
| Infoblox               | Autenticación de auditoría                          | Autenticación (3002)         | 1.3.0                  |
| Infoblox               | DHCP                                          | Actividad de DHCP (4004)          | 1.3.0                  |
| Infoblox               | Consulta DNS                                     | Actividad DNS (4003)           | 1.3.0                  |
| Infoblox               | Puerto                                          | Evento base (0)                | 1.3.0                  |
| Microsoft 365 Defender | Incidente                                      | Hallazgo de incidente (2005)        | 1.3.0<br>1.1.0 |
| Okta                   | Inicio de sesión de usuario                            | Autenticación (3002)         | 1.1.0                  |
| Palo Alto Networks     | Amenaza                                        | Actividad de red (4001)       | 1.3.0                  |
| Palo Alto Networks     | Tráfico                                       | Actividad de red (4001)       | 1.1.0                  |
| Zscaler ZPA            | Actividad de usuario                                 | Actividad de red (4001)       | 1.3.0                  |
| Zscaler ZPA            | Estado del usuario                                   | Autenticación (3002)         | 1.3.0                  |

{{% /collapse-content %}}

{{% collapse-content title="Mapeo personalizado" level="h3" expanded=false id="custom_mapping" %}}

Cuando configura un mapeo personalizado, si intenta cerrar o salir del modal, se le solicitará que exporte su mapeo. Datadog recomienda que exporte su mapeo para guardar lo que ha configurado hasta el momento. El mapeo exportado se guarda como un archivo JSON.

Para configurar un mapeo personalizado:

1. Opcionalmente, agregue un nombre para el mapeo. El nombre predeterminado es `Custom Authentication`.
1. Defina un {{< ui >}}filter query{{< /ui >}}. Consulte [Sintaxis de búsqueda de registros][1] para obtener más información.
   - Solo se reasignan los registros que coinciden con el filtro.
   - Todos los registros, independientemente de si coinciden con la consulta de filtro, se envían al siguiente paso de la canalización.
1. Seleccione la categoría de evento OCSF en el menú desplegable.
1. Seleccione la clase de evento OCSF en el menú desplegable.
1. Ingrese una muestra de registro para que pueda consultarla cuando agregue campos.
1. Haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Seleccione los perfiles OCSF que desee agregar. Consulte [Explorador de esquemas OCSF][1] para obtener más información.
1. Se muestran todos los campos obligatorios. Ingrese el {{< ui >}}Source Logs Fields{{< /ui >}} y {{< ui >}}Fallback Values{{< /ui >}} requeridos para ellos. Si desea agregar campos adicionales manualmente, haga clic en {{< ui >}}+ Field{{< /ui >}}. Haga clic en el icono de la papelera para eliminar un campo. **Nota**: Los campos obligatorios no se pueden eliminar.
    - El valor de respaldo se utiliza para el campo OCSF si el registro no tiene el campo de registro de origen.
    - Puede agregar varios campos para {{< ui >}}Source Log Fields{{< /ui >}}. Por ejemplo, los registros `user.system.start` de Okta tienen el campo `eventType` o `legacyEventType`. Puede asignar ambos campos al mismo campo OCSF.
    - Si tiene sus propios mapeos de OCSF en JSON o guardó un mapeo previo que desea utilizar, haga clic en {{< ui >}}Import Configuration File{{< /ui >}}.
1. Haga clic en {{< ui >}}Continue{{< /ui >}}.
1. Algunos valores de la fuente de registro deben asignarse a valores de OCSF. Por ejemplo, los valores del campo de gravedad de un registro de la fuente que se asigna al campo `severity_id` de OCSF, deben asignarse a los valores de `severity_id` de OCSF. Consulte `severity_id` en [Authentication][2] para obtener una lista de valores de OCSF. Un ejemplo de mapeo de valores de gravedad:
    | Valor de la fuente de registro | Valor de OCSF      |
    | ---------------- | --------------- |
    | `INFO`           | `Informational` |
    | `WARN`           | `Medium`        |
    | `ERROR`          | `High`          |
1. Se enumeran todos los valores que deben asignarse a un valor de OCSF. Haga clic en {{< ui >}}+ Add Row{{< /ui >}} si desea asignar valores adicionales.
1. Haga clic en {{< ui >}}Save Mapping{{< /ui >}}.

[1]: https://schema.ocsf.io/
[2]: https://schema.ocsf.io/1.4.0/classes/authentication?extensions=

{{% /collapse-content %}}

## Métricas de estado {#health-metrics}

Para [métricas de componentes][3] y [métricas de búfer de procesador][4] emitidas por todos los procesadores, consulte la documentación sobre el uso de la canalización. Para filtrar o agrupar por métricas del procesador OCSF Mapper, utilice la etiqueta `component_type:ocsf_mapper`.

[1]: /es/observability_pipelines/search_syntax/logs/
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
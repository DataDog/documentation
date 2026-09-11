---
aliases:
- /es/tracing/services/inferred_entity_remapping_rules/
- /es/tracing/services/renaming_rules/
further_reading:
- link: https://www.datadoghq.com/blog/service-remapping/
  tag: Blog
  text: Conecte de manera integral los datos de su servicio con Service Remapping
site_support_id: service_remapping_rules
title: Reglas de Service Remapping
---
## Descripción general {#overview}

Actualice cómo aparecen sus servicios en Datadog sin cambiar la configuración del rastreador ni volver a implementar código. Las reglas de Service Remapping le permiten renombrar, fusionar o dividir servicios; o crear nuevos servicios basados en etiquetas de infraestructura desde la interfaz de usuario de Datadog. También puede crear reglas de Service Remapping para otros tipos de entidades, como servicios inferidos, almacenes de datos y colas.

<div class="alert alert-info">Cada organización puede contener hasta 100 reglas de remapeo.</div>

## Requisitos previos {#prerequisites}

Debe tener el permiso **APM Service Remapping Write** (`apm_service_renaming_write`) para crear, editar y eliminar reglas de Service Remapping. Consulte [Permisos][1] para obtener detalles sobre el control de acceso basado en roles de Datadog.

### Requisitos de versión del rastreador {#tracer-version-requirements}

Solo puede crear reglas de Service Remapping para servicios instrumentados con versiones de rastreador compatibles. Si un servicio está reportando desde una versión de rastreador anterior, actualice el SDK antes de crear reglas de Service Remapping para ese servicio.

**Nota**: Esto solo aplica a servicios instrumentados. No hay requisitos de versión de rastreador para remapear servicios inferidos, almacenes de datos o colas. 

| Lenguaje   | Versión mínima de rastreador compatible |
|------------|----------------------------------|
| C++        | Todas las versiones compatibles           |
| Dotnet     | [3.4.0][3]                       |
| Go         | [1.55.0][6]                      |
| Java       | [1.20.0][2]                      |
| JavaScript | [3.37.0][16]-3.x o [4.16.0][4]  |
| PHP        | [0.94.1][7]                      |
| Python     | [1.19.0][5]                      |
| Ruby       | [1.15.0][8]                      |

## Cree una regla de Service Remapping {#create-a-service-remapping-rule}

### Paso 1: Seleccione la acción de Service Remapping y las entidades a las que apuntar {#step-1-select-remapping-action-and-entities-to-target}

1. En Datadog, navegue a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Service Remapping{{< /ui >}}][13]. Haga clic en {{< ui >}}Add Service Rule{{< /ui >}} para aplicar Service Remapping a servicios instrumentados. Para aplicar Service Remapping a servicios inferidos, almacenes de datos o colas, seleccione la pestaña {{< ui >}}Inferred Entity Rules{{< /ui >}} y haga clic en {{< ui >}}Add Inferred Entity Rule{{< /ui >}}. 

   Alternativamente, navegue a {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Catalog{{< /ui >}}][14] y haga clic en un servicio para abrir el panel lateral del servicio. Desde ahí, haga clic en {{< ui >}}Service Page{{< /ui >}} > {{< ui >}}Service Remapping{{< /ui >}}.
   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="El panel lateral de un servicio, que muestra el menú desplegable de la Service Page con una opción de Service Remapping" style="width:100%;" >}}
1. Elija una acción de Service Remapping para realizar en su nueva regla de Service Remapping.
   - Seleccione {{< ui >}}Remap services{{< /ui >}} para dividir una sola entidad, renombrar una entidad, combinar varias entidades o renombrar varias entidades.
   - Seleccione {{< ui >}}Correlate telemetry{{< /ui >}} para identificar un servicio basado en una etiqueta de infraestructura.
1. Utilice la barra de búsqueda para seleccionar las entidades a las que desea aplicar Service Remapping.
   - Puede seleccionar una o más entidades, pero todas deben ser del mismo tipo (servicio, servicio inferido, almacén de datos o cola). Seleccione servicios basados en su etiqueta `service` o `peer.service`, no por sus metadatos de Display Name.
   - A medida que selecciona entidades, se crea una consulta de tramos en segundo plano. Para editar la consulta, seleccione {{< ui >}}Build Advanced Query{{< /ui >}}.
   - Si está correlacionando un servicio con etiquetas de infraestructura, solo puede seleccionar _un_ servicio. Elija la(s) etiqueta(s) de infraestructura para correlacionar la telemetría. Toda la telemetría con la(s) misma(s) etiqueta(s) de infraestructura que el servicio elegido se reasignará a un único nombre de servicio unificado.

### Paso 2: Especifique el nuevo nombre de la entidad {#step-2-specify-new-entity-name}

En el cuadro de texto, ingrese un nombre único para la entidad (o entidades) seleccionada(s). Alternativamente, use valores de etiqueta con la sintaxis `{{tagName}}` para aplicar remapeo según las etiquetas de una entidad. A medida que escribe, aparece una vista previa del nuevo nombre (o nombres) de servicio.
   1. Si los valores de etiqueta siguen un patrón, aplique una expresión regular para extraer solo la parte que desea en el nombre.
**Nota**: La vista previa no es una lista exhaustiva. Si está reasignando un servicio basado en una etiqueta con varios valores, solo los valores con la mayor cantidad de tramos aparecerán en la vista previa. 

### Paso 3: Nombre su regla de Service Remapping y revise {#step-3-name-your-rule-and-review}

1. Opcionalmente, ingrese un nombre descriptivo para la regla de Service Remapping para que pueda identificarla más tarde.
1. Revise y guarde su regla de Service Remapping. Después de guardar su regla de Service Remapping, _puede tardar aproximadamente un minuto en surtir efecto_.

## Comportamiento de las reglas de Service Remapping {#remapping-rules-behavior}

Las reglas de Service Remapping funcionan anulando la etiqueta `service` para remapear servicios, o la etiqueta `peer.service` para remapear servicios inferidos, almacenes de datos y colas. Los servicios se remapean en la ingesta, y cualquier configuración preexistente que especifique un nombre de servicio no cambia cuando se crea una regla de Service Remapping. Las reglas de Service Remapping tienen prioridad sobre todas las demás configuraciones de nombres de servicio.

Las reglas de Service Remapping se aplican en APM, registros, métricas, USM, DSM, DJM, DBM, creación de perfiles, NPM, Live Processes, Live Containers, Kubernetes y eventos.

- **Datos históricos:** Los cambios realizados por las reglas de Service Remapping afectan solo a la telemetría ingerida mientras una regla está activa, y los datos pasados no se actualizan retroactivamente. Eliminar o modificar una regla de Service Remapping impide que se aplique a datos nuevos, pero no revierte los nombres en los datos ingeridos previamente.
- **Orden de las reglas:** Las reglas de Service Remapping se aplican en orden. Las reglas en la parte superior de la lista de reglas se aplican primero. Un servicio se remapea únicamente mediante la primera regla que lo capture (no se aplican múltiples reglas al mismo servicio).
- **Expresiones regulares:** Se pueden usar expresiones regulares para definir nuevos nombres de servicio, pero no se permiten cuantificadores codiciosos dentro del grupo de captura.
- **Remapeador del servicio de registros:** Las reglas de Service Remapping se aplican antes que las canalizaciones de registros. Si tanto el rempaeador de servicios de registros como las reglas de Service Remapping se aplican a un servicio, las reglas de Service Remapping tienen prioridad. 
- **Dashboards y monitores:** Las consultas existentes que hacen referencia a nombres de servicio antiguos no se actualizan automáticamente. Revíselas y actualícelas manualmente.
**Anulaciones de integración y personalizadas:** Si las anulaciones de integración o las anulaciones personalizadas se encuentran dentro del contexto de una regla de Service Remapping, también se remapean. [Elimine las anulaciones de integración][15] para obtener la mejor experiencia de APM.
- **Jerarquía de nombres de servicio:** Los nombres de servicio se determinan mediante la siguiente jerarquía, de mayor a menor prioridad:
  1. Reglas de Service Remapping
  2. Servicio definido en el código (`tracer.Start(WithService(xx))`)
  3. Servicio definido en la propiedad del sistema (`-Ddd.service={}`)
  4. Servicio definido en la variable de entorno (`DD_SERVICE`)
  5. Servicio definido en el archivo de configuración (`application_monitoring.yaml`)

[1]: /es/account_management/rbac/permissions
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.20.0
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.4.0
[4]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.16.0
[5]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.19.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.55.0
[7]: https://github.com/DataDog/dd-trace-php/releases/tag/0.94.1
[8]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.15.0
[9]: /es/tracing/services/
[10]: /es/internal_developer_portal/catalog/
[11]: /es/logs/explorer/
[12]: /es/metrics/explorer/
[13]: https://app.datadoghq.com/software/settings/service-rename
[14]: https://app.datadoghq.com/software
[15]: /es/tracing/services/service_override_removal
[16]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.37.0

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
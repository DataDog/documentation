---
aliases:
- /es/tracing/services/service_override_removal/
description: Aprenda a eliminar las sustituciones de integraciones de Datadog.
disable_toc: false
further_reading:
- link: /tracing/guide/service_overrides
  tag: Documentación
  text: Sobreescritura de servicios
- link: /tracing/services/inferred_services
  tag: Documentación
  text: Servicios inferidos
site_support_id: service_override_removal
title: Eliminación de la sustitución de la integración
---

{{< callout url="https://www.datadoghq.com/product-preview/service-overrides-removal-from-the-ui/"
 btn_hidden="false" header="Join the Preview!">}}
La eliminación de la sustitución de integración está en Vista previa. Para registrarte, haz clic en <b>Solicitar acceso</b> y rellena el formulario.
{{< /callout >}}

En esta page (página) se explica cómo eliminar las sustituciones de integración, que utilizan nombres de servicio específicos de integración para representar llamadas a otros servicios. Para obtener más información conceptual, consulta [Servicio base, sustituciones de integración y sustituciones de servicio][10] y [Servicios inferidos][8].

## Requisitos previos

Antes de eliminar las sustituciones de integración:

1. Debes contar con el permiso de `apm_service_renaming_write`.
1. Tu versión del kit de desarrollo de software (SDK) de Datadog debe admitir la eliminación de sustituciones. Consulta los [requisitos de la versión del kit de desarrollo de software (SDK)](#sdk-version-requirements).

### Requisitos de la versión del kit de desarrollo de software (SDK)

| Lenguaje   | Versión mínima compatible |
|------------|---------------------------|
| .NET       | [3.4.0][1]                |
| Go         | [1.55.0][2]               |
| Java       | [1.20.0][3]               |
| Node.js    | [4.16.0][4]               |
| PHP        | [0.94.1][5]               |
| Python     | [1.19.0][6]               |
| Ruby       | [1.15.0][7]               |

## Eliminar sustituciones de integración

Para eliminar las sustituciones de integración en Datadog:

1. Ve a **Software Catalog** (Catálogo de software) > **Manage** (Gestionar) > [**Manage Remapping Rules**][12] (Gestionar reglas de reasignación) y haz clic en **Manage Overrides** (Gestionar sustituciones).  

   {{< img src="tracing/guide/base_service/SO_removal_page.png" alt="Page (página) de sustituciones de integraciones en la que se muestra el progreso de la migración y las opciones de eliminaciones" style="width:100%;" >}}

1. Para cada sustitución que desees eliminar, revisa los monitores y dashboards relacionados.

   Estos activos hacen referencia al nombre de servicio sustituido y dejan de coincidir tras su eliminación. Actualízalos para que utilicen el nombre de servicio base (`service:<DD_SERVICE>`) para conservar la funcionalidad.

   {{< img src="tracing/guide/base_service/SO_removal_page_sidepanel.png" alt="Panel lateral de sustituciones de servicios en el que se muestran los monitores y dashboards afectados" style="width:100%;" >}}

1. Elimina las sustituciones individualmente o en bloque:
   - **Seleccionar sustituciones específicas para eliminar**: Selecciona las sustituciones de integración que desees eliminar. En una barra de **Migration Progress** (Progreso de la migración) se muestra el progreso a medida que se eliminan las sustituciones.
   - **Eliminar todas las sustituciones**: Selecciona **Finish Migration** (Finalizar migración) para eliminar todas las sustituciones de integración y evitar que aparezcan otras en el futuro a medida que aumente el uso de APM. Las sustituciones de servicios personalizados no se ven afectadas.

   La eliminación de sustituciones es reversible.


## Ejemplos: Nomenclatura de servicios tras la eliminación

La eliminación de las sustituciones de integración cambia el modo en que se etiquetan los spans (tramos) de cliente y en que se identifican las dependencias descendentes. Una vez eliminadas las sustituciones, los spans (tramos) de cliente utilizan el nombre del servicio de llamada (`service:<DD_SERVICE>`) en lugar del nombre específico de la integración. La dependencia llamada se identifica mediante [atributos de `peer.*`][11] (por ejemplo, base de datos o cola).

**ejemplo de gRPC:**

| Escenario                  | Nombre del servicio                                              | Atributos adicionales de `peer.*`  |
|---------------------------|-----------------------------------------------------------|--------------------------------|
| Con sustituciones de integración  | `service:my-service-grpc-client` o `service:grpc-client` | Ninguno                           |
| Sin sustituciones de integración | `service:myservice`                                       | `@peer.service:otherservice`   |

**Ejemplo de MySQL:**

| Escenario | Nombre del servicio | Atributos adicionales de `peer.*`  |
|----------|--------------|--------------------------------|
| Con sustituciones de integración | `service:my-service-mysql` o `service:mysql` | Ninguno |
| Sin sustituciones de integración | `service:myservice` | `@peer.db.name:user-db`, `@peer.db.system:mysql` |

## Eliminación basada en la configuración

También puedes eliminar las sustituciones de integración estableciendo una variable de entorno en la configuración de tu aplicación. Este método es útil si no puedes acceder a la interfaz de usuario de Datadog.

1. Confirma que tu kit de desarrollo de software (SDK) cumple los [requisitos mínimos de la versión](#sdk-version-requirements).
2. Establece la siguiente variable de entorno:
   ```sh
   DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true
   ```

Esto garantiza que el atributo `service` utilice siempre el nombre del servicio base en lugar de añadir el nombre de la integración (por ejemplo, `*-postgres`, `*-http-client`). Las sustituciones de servicios personalizadas no se ven afectadas y deben eliminarse directamente en el código.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.4.0
[2]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.55.0
[3]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.20.0
[4]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.16.0
[5]: https://github.com/DataDog/dd-trace-php/releases/tag/0.94.1
[6]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.19.0
[7]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.15.0
[8]: /es/tracing/services/inferred_services
[9]: https://app.datadoghq.com/apm/settings/service-naming
[10]: /es/tracing/guide/service_overrides
[11]: /es/tracing/services/inferred_services/#peer-tags
[12]: https://app.datadoghq.com/software/settings/service-remapping
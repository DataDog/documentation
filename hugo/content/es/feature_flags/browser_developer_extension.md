---
description: Explore sus Feature Flags y anúlelos localmente en su navegador con la
  extensión para desarrolladores del SDK de navegador de Datadog.
further_reading:
- link: /feature_flags/client/javascript/
  tag: Documentación
  text: Feature Flags de JavaScript
- link: /feature_flags/implementation_patterns/local_flag_overrides/
  tag: Documentación
  text: Anulaciones locales de marcadores con el patrón de proveedor múltiple
- link: /feature_flags/concepts/variants_and_flag_types/
  tag: Documentación
  text: Variantes y tipos de marcadores
title: Extensión para desarrolladores de navegador
---
## Descripción general {#overview}

La [extensión para desarrolladores del SDK de navegador de Datadog][1] para Chrome incluye una pestaña de **Feature Flags**. La pestaña lista los Feature Flags de su organización y le permite anularlos localmente en su navegador. Úsela para ver cómo se comporta su aplicación con diferentes valores de Feature Flags, sin cambiar la configuración de los Feature Flags en Datadog.

Las anulaciones se aplican solo a su navegador. Nunca se envían a Datadog y no afectan a otros usuarios.

{{< img src="feature_flags/devtools_extension/flags-tab-overview.png" alt="La pestaña Feature Flags que muestra el encabezado Anulaciones de Feature Flag, una insignia de Conectado para US1, la fila de filtros y una lista de Feature Flags con botones de variante." style="width:100%;" >}}

La extensión incluye otras pestañas para inspeccionar el comportamiento del Datadog Browser SDK. Esta página cubre la pestaña **Feature Flags**.

## Requisitos previos {#prerequisites}

Antes de comenzar, necesita:

- Google Chrome.
- Acceso a Feature Flags en una organización de Datadog en un [sitio de Datadog][2] comercial: US1 (`datadoghq.com`), US3 (`us3.datadoghq.com`), US5 (`us5.datadoghq.com`), EU1 (`datadoghq.eu`), AP1 (`ap1.datadoghq.com`) o AP2 (`ap2.datadoghq.com`). Los sitios de Datadog para organizaciones gubernamentales no son compatibles.
- Una aplicación de navegador instrumentada con el [Datadog Feature Flags SDK para JavaScript][3].
- El contenedor `DatadogDevtools` integrado en su pila de proveedores de OpenFeature. Consulte [Agregar el contenedor DatadogDevtools](#add-the-datadogdevtools-wrapper).

## Instale la extensión {#install-the-extension}

Instale la [extensión para desarrolladores del SDK de navegador de Datadog][1] desde Chrome Web Store.

## Agregar el contenedor DatadogDevtools {#add-the-datadogdevtools-wrapper}

`DatadogDevtools` es un proveedor de OpenFeature que envuelve a otro proveedor. Lee las anulaciones que establece la extensión, las devuelve para las claves de Feature Flags coincidentes y delega cualquier otra evaluación al proveedor que envuelve. Sin él, la pestaña muestra un aviso de **DatadogDevtools no detectado**. Aún puede establecer anulaciones, pero no se aplican hasta que el contenedor esté en su lugar.

Importe `DatadogDevtools` desde `@datadog/openfeature-browser`, páselo y registre el contenedor a través de la API de OpenFeature:

{{< code-block lang="javascript" >}}
import { DatadogProvider, DatadogDevtools } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  env: '<ENV_NAME>',
});

await OpenFeature.setProviderAndWait(new DatadogDevtools(provider));
{{< /code-block >}}

Establezca `site` en el [sitio de Datadog][2] que utiliza su organización. Utilice el mismo sitio que seleccione en el menú desplegable de la extensión. Si difieren, usted navega y elige variantes del catálogo de marcadores de una organización mientras su aplicación resuelve los marcadores contra el catálogo de una organización diferente.

El contenedor acepta cualquier proveedor de OpenFeature, por lo que también puede usarlo sobre un `InMemoryProvider` en una compilación de desarrollo local. Si su aplicación registra proveedores para múltiples dominios, envuelva cada uno.

<div class="alert alert-warning">Las anulaciones locales omiten su configuración de marcadores en Datadog, y cualquier persona que pueda escribir en el almacenamiento del navegador puede establecerlas. Restrinja el contenedor a compilaciones que no sean de producción para que los usuarios finales no puedan cambiar el comportamiento de los marcadores en su aplicación de producción.</div>

### Confirme que se aplicó una anulación {#confirm-that-an-override-applied}

`DatadogDevtools` lee las anulaciones una vez, cuando el proveedor se inicializa. Evalúe el marcador con un método de detalles para ver de dónde provino el valor: un marcador anulado se resuelve con un `reason` de `STATIC` y `flagMetadata.overridden` establecido en `true`.

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const details = client.getBooleanDetails('<FLAG_KEY>', false);

console.log(details.value, details.reason, details.flagMetadata.overridden);
{{< /code-block >}}

Una anulación cuyo valor no coincide con su tipo declarado se ignora cuando el contenedor la lee durante la inicialización, y el contenedor registra una advertencia en la consola del navegador. Las anulaciones de enteros deben ser números enteros.

## Abra la pestaña de Feature Flags {#open-the-feature-flags-tab}

1. Abra su aplicación en Chrome.
2. Abra las herramientas para desarrolladores de Chrome (`Cmd+Opt+I` en Mac, `F12` en Windows o Linux).
3. Seleccione el panel **Browser SDK**. Si no lo ve, seleccione el menú de desbordamiento (`»`) en la barra de pestañas de DevTools.
4. Seleccione la pestaña **Feature Flags**.
5. Seleccione su sitio de Datadog en el menú desplegable antes de iniciar sesión. La selección de su sitio determina de qué organización de Datadog provienen el inicio de sesión y la lista de marcadores. Luego haga clic en **Iniciar sesión en Datadog**.

{{< img src="feature_flags/devtools_extension/flags-tab-connect.png" alt="La pantalla de inicio de sesión de la pestaña Feature Flags, que muestra el menú desplegable del sitio de Datadog configurado en US1 y el botón Iniciar sesión en Datadog." style="width:100%;" >}}

Sus credenciales se almacenan para la sesión del navegador y se borran cuando la sesión finaliza. Para cerrar sesión y revocar la sesión, haga clic en **Desconectar**. También puede revocar el acceso de la extensión en Datadog en **Configuración de la organización > Aplicaciones autorizadas**.

## Explorar y filtrar marcadores {#browse-and-filter-flags}

La pestaña muestra un encabezado de **Feature Flag Overrides** y una insignia que confirma a qué sitio de Datadog está conectado. Encima de la lista hay un recuento de los marcadores disponibles para usted. Cada marcador muestra su nombre, clave, descripción y botones de variante.

Para acotar la lista, utilice la fila de filtro:

| Filtrar | Descripción |
| --- | --- |
| **Filtre sus Feature Flags** | Muestre coincidencias con un nombre, clave o etiqueta de marcador. |
| **Mis Feature Flags** | Muestre solo los marcadores que usted creó. |
| **Mis Teams** | Muestre solo los marcadores con etiqueta para los Teams a los que pertenece. |
| **Tipo** | Muestre solo los marcadores de tipo booleano, cadena, entero, número o JSON. |
| **Etiquetas** | Muestre solo marcadores con una o más etiquetas seleccionadas. |

## Anular un marcador {#override-a-flag}

Para anular un marcador de la lista, haga clic en uno de sus botones de variante.

Para establecer un valor que no esté definido como una variante, expanda **Agregar una anulación personalizada**. Ingrese la clave del marcador, seleccione el tipo de valor e ingrese el valor. Aplicar una clave que ya tiene una anulación reemplaza el valor existente. Un valor que no coincide con el tipo del marcador se rechaza en la interfaz de usuario de la extensión antes de guardarse.

Los marcadores anulados se mueven a una sección resaltada de **Anulaciones locales** en la parte superior de la lista, que muestra cuántos están activos. La variante seleccionada se resalta y cada fila tiene un control de reversión para eliminar esa única anulación. Para eliminar anulaciones de forma masiva, haga clic en **Borrar todo** en la parte inferior de la pestaña. Consulte [Borrar todas las anulaciones](#clear-all-overrides).

Una fila de anulación también puede mostrar una advertencia:

| Advertencia | Descripción |
| --- | --- |
| El tipo de la anulación almacenada no coincide con el tipo del marcador, por lo que la anulación no se aplica.|  Las anulaciones con discrepancia de tipo se ignoran cuando el proveedor se inicializa y se registran como una advertencia en la consola del navegador; la pestaña muestra la discrepancia antes de que usted vuelva a cargar. |
| Nota atenuada debajo de la clave del marcador | El marcador ya no está en el catálogo de marcadores de su organización, porque se archivó o eliminó después de establecer la anulación. La anulación sigue resolviéndose. La nota es informativa. |

{{< img src="feature_flags/devtools_extension/flags-tab-local-overrides.png" alt="La pestaña de Feature Flags con dos anulaciones activas resaltadas en una sección de Anulaciones locales en la parte superior de la lista, encima de los botones Borrar todo y Actualizar página." style="width:100%;" >}}

## Aplique anulaciones a su aplicación {#apply-overrides-to-your-application}

Las anulaciones se guardan tan pronto como las establece, pero `DatadogDevtools` las lee una vez, cuando su proveedor se inicializa. Establecer o revertir una anulación no tiene efecto en la página en ejecución. Haga clic en **Actualizar página** en la parte inferior de la pestaña para recargar de modo que los nuevos valores surtan efecto.

## Administrar anulaciones {#manage-overrides}

Las anulaciones persisten independientemente de su inicio de sesión en Datadog. Cerrar sesión, cerrar las herramientas de desarrollo y reiniciar su navegador las mantienen en su lugar. Cuando una página tiene anulaciones y usted ha cerrado sesión, la pantalla de conexión muestra cuántas anulaciones están almacenadas para la página. También ofrece **Borrar todo**, para que pueda eliminarlas sin iniciar sesión.

Revierta anulaciones individuales o haga clic en **Borrar todo** cuando termine de probar, luego actualice la página para que su aplicación resuelva los marcadores de Datadog nuevamente.

### Las anulaciones se aplican en el contexto de un sitio de Datadog {#overrides-are-scoped-to-a-datadog-site}

Las anulaciones se almacenan por separado para cada sitio de Datadog. Una anulación que establezca mientras está conectado a un sitio no se aplica mientras está conectado a otro.

Seleccionar un sitio diferente en el menú desplegable cambia qué anulaciones se aplican. La pestaña muestra un banner de **Recargar para aplicar `<SITE>`las anulaciones de**: la página sigue usando las anulaciones con las que se cargó hasta que la recargue. Seleccionar el sitio original de nuevo restaura las anulaciones de ese sitio. Cambiar de sitio no elimina ninguna anulación.

### Borrar todas las anulaciones {#clear-all-overrides}

**Borrar todo** elimina las anulaciones de forma masiva y le pide que confirme primero. Lo que elimina depende de si ha iniciado sesión:

| Estado | Contexto |
| --- | --- |
| Sesión iniciada | Elimina las anulaciones solo para el sitio conectado. Las anulaciones de otros sitios se mantienen. |
| Sesión cerrada | Elimina las anulaciones de todos los sitios, ya que no hay ningún sitio conectado en cuyo contexto aplicar la acción. El mensaje de confirmación lo indica. |

Después de borrar las anulaciones, la pestaña le solicita que vuelva a cargar. La página sigue aplicando las anulaciones borradas hasta que lo haga.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chromewebstore.google.com/detail/datadog-browser-sdk-devel/boceobohkgenpcpogecpjlnmnfbdigda
[2]: /es/getting_started/site/
[3]: /es/feature_flags/client/javascript/
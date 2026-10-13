---
description: Incruste una aplicación de Datadog publicada en Dashboards, Notebooks,
  la página de inicio del Internal Developer Portal y en el Catalog side panel.
further_reading:
- link: /actions/datadog_apps/
  tag: Documentación
  text: Datadog Apps
- link: /actions/app_builder/embedded_apps/
  tag: Documentación
  text: Incruste aplicaciones de App Builder
- link: https://www.npmjs.com/package/@datadog/apps-frontend
  tag: Sitio externo
  text: paquete @datadog/apps-frontend en npm
title: Incruste aplicaciones
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Datadog Apps está en versión preliminar (Preview). Utilice este formulario para solicitar acceso.
{{< /callout >}}

Incruste [Datadog Apps][1] en otros productos de Datadog para colocar herramientas operativas directamente en las superficies donde los usuarios investigan problemas y toman medidas. Una aplicación incrustada puede mostrar su experiencia existente o responder al contexto en vivo proporcionado por su servidor, como el rango de tiempo y las variables de plantilla de un Dashboard.

## Requisitos previos {#prerequisites}

- Una aplicación de Datadog creada, cargada y publicada
- Permiso para usar la aplicación y editar la superficie de destino

Para obtener información sobre cómo crear, cargar y publicar una aplicación, consulte [Datadog Apps][1].

## Incrustar una aplicación {#embed-an-app}

<div class="alert alert-info">Solo puede incrustar una aplicación en la Datadog UI. Los agentes de IA no pueden incrustar aplicaciones.</div>

Después de cargar y publicar una aplicación, puede agregarla a una superficie de Datadog compatible sin cambiar la aplicación.

Puede incrustar una aplicación desde la propia aplicación o desde la superficie donde desea que aparezca.

### Incrustar desde la aplicación {#embed-from-the-app}

1. En la [Lista de aplicaciones][2], abra la aplicación publicada que desea incrustar.
1. En la parte superior de la página, haga clic en **+ Add to Dashboard**, o haga clic en la flecha hacia abajo junto a ella y seleccione un tipo de destino en el menú.
1. Seleccione el destino y luego haga clic en **Guardar**.

### Incruste desde el destino {#embed-from-the-destination}

{{< tabs >}}
{{% tab "Dashboard" %}}

1. Abra el Dashboard donde desea agregar la aplicación.
1. En la bandeja de widgets, busque el widget **Apps** en **Actions and Remediations** y arrástrelo al Dashboard.
1. En el editor, elija la aplicación en el menú desplegable **Select app**. Para limitar la lista a las aplicaciones que usted posee, habilite **My Apps Only**.
1. Cambie el tamaño del widget y luego guarde el Dashboard.

{{% /tab %}}
{{% tab "Notebook" %}}

1. Abra el notebook donde desea agregar la aplicación.
1. Agregue una celda y seleccione el tipo de celda **Apps**.
1. Elija la aplicación en el menú desplegable.
1. Guarde el notebook.

La celda **Apps** utiliza el intervalo de tiempo del notebook. Para leer el intervalo de tiempo en la aplicación, utilice la entrada `datadogNotebook`.

{{% /tab %}}
{{% tab "Catalog" %}}

1. Vaya a [Catalog][1] y seleccione un servicio.
1. En el panel lateral del servicio, seleccione la pestaña **+ Add App**.
1. Elija la aplicación en el menú desplegable. Para limitar la lista a las aplicaciones que usted posee, habilite **My Apps Only**.

[1]: https://app.datadoghq.com/services

{{% /tab %}}
{{< /tabs >}}

Después de incrustar la aplicación, opcionalmente [configure la aplicación](#customize-the-embedded-experience) para que responda al contexto, tema o estado del enlace compartido de su servidor. Luego [verifíquela](#verify-the-app). Una aplicación incrustada muestra la versión publicada más recientemente, así que publique sus cambios antes de incrustarla.

## Personalice la experiencia incrustada {#customize-the-embedded-experience}

Si aún no lo ha hecho, instale el paquete [`@datadog/apps-frontend`][3] en la aplicación:

```shell
npm install @datadog/apps-frontend
```

Para hacer que una aplicación incrustada responda a su servidor de Datadog, mantenga `DatadogAppProvider` en la raíz de la aplicación. El proveedor establece la comunicación con el servidor de Datadog, pone las entradas del servidor a disposición de los hooks y conserva el estado de la URL de la aplicación en los enlaces compartidos de Datadog.

```typescript
import { DatadogAppProvider } from '@datadog/apps-frontend/embedding/react';

export function Root() {
  return (
    <DatadogAppProvider>
      <App />
    </DatadogAppProvider>
  );
}
```

El andamiaje estándar de las aplicaciones de Datadog incluye este proveedor de forma predeterminada. Cada hook `@datadog/apps-frontend` debe renderizarse debajo de él, así que mantenga el proveedor en su lugar cuando reestructure la aplicación.

### Leer entradas del servidor {#read-host-inputs}

Las entradas del servidor son valores y funciones proporcionados por el producto de Datadog que contiene la aplicación. Por ejemplo, un dashboard puede proporcionar su rango de tiempo actual y variables de plantilla, mientras que el panel lateral del Catálogo puede proporcionar el servicio que está mostrando.

Los valores del servidor se actualizan automáticamente cuando cambia el contexto del producto circundante.

Importe `useDatadogAppInput` y el esquema de entrada para la superficie del producto relevante:

```typescript
import { useDatadogAppInput } from '@datadog/apps-frontend/inputs/react';
import {
  datadogDashboard,
  datadogIdp,
  datadogNotebook,
  datadogServicePanel,
  datadogTheme,
} from '@datadog/apps-frontend/inputs/schema';
```

Para ver las definiciones completas de TypeScript, consulte la [`@datadog/apps-frontend` fuente en npm][4].

#### Estados de entrada {#input-states}

`useDatadogAppInput` devuelve un objeto de estado cuyo `status` es `pending`, `ready`, `unavailable` o `failed`. Los valores están disponibles en `fields` solo cuando el estado es `ready`.

`unavailable` es un resultado normal en lugar de un error. Significa que la aplicación se está ejecutando en una superficie que no proporciona esa entrada, como leer `datadogDashboard` dentro de un Notebook. Renderice una alternativa para este caso.

Por ejemplo:

```typescript
function PanelHeader() {
  const panel = useDatadogAppInput(datadogServicePanel);

  switch (panel.status) {
    case 'pending':
      return <Spinner />;
    case 'unavailable':
      return <p>Open this app from a Catalog side panel.</p>;
    case 'failed':
      return <p>{panel.error.message}</p>;
    case 'ready':
      return (
        <header>
          {panel.fields.service}
          <button onClick={() => panel.fields.close()}>×</button>
        </header>
      );
  }
}
```

### Entradas disponibles {#available-inputs}

{{< tabs >}}
{{% tab "Tema" %}}

Utilice `datadogTheme` para responder al tema que utiliza actualmente el servidor de Datadog.

```typescript
const theme = useDatadogAppInput(datadogTheme);
```

Cuando el estado es `ready`, `fields` proporciona:

```typescript
{
  theme: 'light' | 'dark';
}
```

El valor se actualiza cuando el usuario cambia el tema de Datadog.

Si la aplicación utiliza [DRUIDS][1], utilice `DruidsEnvironmentWithThemeInput` para aplicar el tema del servidor automáticamente:

```typescript
import { DruidsEnvironmentWithThemeInput } from '@datadog/apps-frontend/druids/react';

<DatadogAppProvider>
  <DruidsEnvironmentWithThemeInput defaultThemePreference="light">
    <App />
  </DruidsEnvironmentWithThemeInput>
</DatadogAppProvider>
```

[1]: /es/actions/datadog_apps/#ui-components

{{% /tab %}}
{{% tab "Dashboard" %}}

Utilice `datadogDashboard` para leer el rango de tiempo y las variables de plantilla actuales de un Dashboard.

```typescript
const dashboard = useDatadogAppInput(datadogDashboard);
```

Cuando el estado es `ready`, `fields` proporciona:

```typescript
{
  dashboard: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

Utilice el rango de tiempo para limitar las consultas de la aplicación al Dashboard. Utilice las variables de plantilla para aplicar el mismo servicio, entorno, equipo u otros filtros utilizados por el Dashboard circundante.

{{% /tab %}}
{{% tab "Notebook" %}}

Utilice `datadogNotebook` para leer el rango de tiempo y las variables de plantilla actuales de un Notebook.

```typescript
const notebook = useDatadogAppInput(datadogNotebook);
```

Cuando el estado es `ready`, `fields` proporciona:

```typescript
{
  notebook: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      availableValues?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

Utilice este contexto para mantener la aplicación sincronizada con el rango de tiempo y los filtros aplicados al Notebook circundante.

{{% /tab %}}
{{% tab "Página de inicio del IDP" %}}

Utilice `datadogIdp` para leer y cambiar la posición de la aplicación en la página de inicio del Internal Developer Portal.

```typescript
const idp = useDatadogAppInput(datadogIdp);
```

Cuando el estado es `ready`, `fields` proporciona:

```typescript
{
  position: number;
  move: (inputs: { delta: number }) => number;
}
```

Utilice `position` para leer la posición actual de la aplicación en la página de inicio. Llame a `move()` para mover la aplicación una cantidad de posiciones; se resuelve en la nueva posición de la aplicación.

```typescript
const newPosition = await idp.fields.move({ delta: 1 });
```

{{% /tab %}}
{{% tab "Panel lateral del catálogo" %}}

Utilice `datadogServicePanel` para identificar el servicio que se muestra en el panel lateral del catálogo.

```typescript
const servicePanel = useDatadogAppInput(datadogServicePanel);
```

Cuando el estado es `ready`, `fields` proporciona:

```typescript
{
  service: string;
  close: () => undefined;
}
```

Utilice `service` para establecer el contexto del contenido de la aplicación en el servicio seleccionado. Llame a `close()` cuando una acción de la aplicación deba cerrar el panel lateral.

{{% /tab %}}
{{< /tabs >}}

No asuma que una entrada disponible en una superficie de producto está disponible en otra. Solicite solo el contexto que la aplicación necesita y proporcione una experiencia útil cuando ese contexto no esté presente.

## Conserve el estado en los enlaces compartidos {#preserve-state-in-shared-links}

`DatadogAppProvider` conserva la cadena de consulta y el fragmento de URL de la aplicación en los enlaces compartidos de Datadog. Almacene el estado compartible (como servicios seleccionados, filtros, registros o rutas dentro de la aplicación) en la URL. Cuando otro usuario abre el enlace compartido, la aplicación incrustada puede restaurar el mismo estado. Los [enlaces profundos][5] a un estado específico de la aplicación funcionan sin configuración adicional, siempre que la aplicación permanezca envuelta en `DatadogAppProvider`.

## Verifique la aplicación {#verify-the-app}

Después de incrustar la aplicación, verifique lo siguiente en la superficie donde la incrustó:

- **Acceso**: Abra la superficie como un usuario que tiene permiso para usar la aplicación pero que no la incrustó. La aplicación se renderiza en lugar de mostrar un error de permiso.
- **Tamaño**: Cambie el tamaño de la aplicación al tamaño más pequeño que espera que los usuarios configuren. El contenido permanece legible, sin desbordamiento ni recortes.
- **Contexto del servidor**: Cambie el contexto del servidor, como el rango de tiempo de un Dashboard o el valor de una variable de plantilla, y confirme que la aplicación se actualice. Si la aplicación incrustada renderiza su `unavailable` fallback en lugar de ello, significa que está leyendo una entrada que la superficie no proporciona.
- **Enlaces compartidos**: Cambie el estado dentro de la aplicación, copie el enlace para compartir de Datadog y ábralo en una nueva sesión del navegador. La aplicación restaura el mismo estado.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/datadog_apps/
[2]: https://app.datadoghq.com/app-builder/apps/list
[3]: https://www.npmjs.com/package/@datadog/apps-frontend
[4]: https://www.npmjs.com/package/@datadog/apps-frontend?activeTab=code
[5]: /es/actions/datadog_apps/#share-embedded-app-state-with-deep-links
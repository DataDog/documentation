---
aliases:
- /es/internal_developer_portal/plugins/
description: Cree e implemente aplicaciones personalizadas localmente utilizando un
  flujo de trabajo de desarrollo basado en código con React, funciones de backend
  y una CLI.
further_reading:
- link: https://www.datadoghq.com/blog/internal-applications-datadog-apps/
  tag: blog
  text: Envíe aplicaciones internas desde su AI Agent con Datadog Apps
- link: https://www.youtube.com/watch?v=HEDjpMyqkSE
  tag: Video
  text: Demostración de Datadog Apps
- link: /actions/app_builder/
  tag: Documentación
  text: App Builder
- link: /actions/app_builder/embedded_apps/
  tag: Documentación
  text: Aplicaciones integradas
- link: /actions/app_builder/access_and_auth/
  tag: Documentación
  text: Acceso y autenticación
title: Apps
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Datadog Apps está en versión preliminar (Preview). Utilice este formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Con Apps, usted crea aplicaciones localmente como código con React y TypeScript (o JavaScript), utilizando su flujo de trabajo de desarrollo estándar.

Las aplicaciones utilizan el mismo [modelo de permisos][1] que las [aplicaciones de App Builder][2]. También puede integrarlas en otros productos de Datadog, como [tableros y el Internal Developer Portal][3].

Elija Apps cuando necesite:

- **Colaboración en equipo**: varios ingenieros contribuyendo a la misma aplicación, con revisión de código e historial de versiones a través de su control de código fuente existente.
- **Control de código fuente y CI/CD**: almacene su aplicación en GitHub e impleméntela automáticamente al realizar una fusión.
- **Desarrollo asistido por IA**: utilice sus herramientas locales preferidas (como Cursor, GitHub Copilot o Claude) para generar y refinar código.
- **Proveedores de nube y API personalizados**: intégrese con servicios más allá del [Action Catalog][4] utilizando su propio código de backend.
- **Interfaz de usuario y lógica complejas**: control total de React y TypeScript sobre componentes, estado y renderizado.

## Requisitos previos {#prerequisites}

- **Node.js versión 20.12.0 o posterior**. Verifique su versión:
  ```shell
  node --version
  ```
- Opcional: una **clave de API** de Datadog y una **clave de aplicación** con [Acceso a la API de acciones][5] habilitado. Requerido para la telemetría de compilación respaldada por clave de API (métricas de compilación y cargas de sourcemaps de Error Tracking) y para cargas de CI/CD. Para obtener instrucciones, consulte [Claves de API y de aplicación][6].

  Para habilitar el Acceso a la API de acciones en una clave de aplicación:

  1. Vaya a [**Configuración de la organización > Claves de aplicación**][7].
  1. Seleccione su clave de aplicación.
  1. Habilite **Acceso a la API de acciones**

## Genere una estructura de aplicación {#scaffold-an-app}

1. Ejecute el comando de generación de estructura para crear una aplicación:
   ```shell
   npm create @datadog/apps@latest
   ```
2. Siga las instrucciones interactivas para configurar el nombre y la plantilla de su aplicación.

### Estructura de la aplicación generada {#generated-app-structure}

El proyecto generado incluye:

| Archivo o directorio | Descripción |
|---|---|
| `src/App.tsx` | Componente de interfaz de usuario raíz (React) |
| `src/**/*.backend.ts` | Funciones de backend que se ejecutan en el lado del servidor con acceso a [conexiones de Datadog][8] |
| `vite.config.ts` | Configuración de compilación con [`@datadog/vite-plugin`][9] preconfigurada |
| `package.json` | Dependencias y scripts (`dev`, `build`, `upload`) |

## Utilice la `datadog-app` habilidad {#use-the-datadog-app-skill}

La [`datadog-app` habilidad de agente][20] proporciona a los agentes de codificación de IA orientación sobre los flujos de trabajo de las aplicaciones de Datadog, incluyendo la generación de estructuras, el desarrollo local, las cargas, la publicación, CI/CD, la resolución de problemas, DDSQL y el uso de Action Catalog. La habilidad está disponible en el [repositorio de GitHub de habilidades de agente][21].

### Instalar {#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill datadog-app \
  --full-depth -y
```

La `skills` CLI es compatible con Claude Code, Codex, Cursor, Gemini CLI, OpenCode y otros agentes de programación. Para dirigirse a un agente específico, consulte la [documentación de la CLI de skills][22]. Si la habilidad no aparece después de la instalación, reinicie su agente de programación.

### Ejemplos de prompts {#example-prompts}

- `Scaffold a Datadog App called my-app.`
- `Run this Datadog App locally.`
- `Upload and publish this Datadog App.`
- `Set up CI/CD for this Datadog App.`
- `Troubleshoot this Datadog App authentication error.`
- `Add a table component to this Datadog App using Druids.`

## Desarrolle su aplicación localmente {#develop-your-app-locally}

1. Inicie el servidor de desarrollo:
   ```shell
   npm run dev
   ```
2. Abra la URL que se muestra en la terminal (por ejemplo, `http://localhost:5173/`) para obtener una vista previa de su aplicación.

Cuando el servidor de desarrollo necesita llamar a Datadog, como al ejecutar una función de backend localmente, utiliza OAuth de forma predeterminada. Si se requiere autorización, el comando abre un aviso en el navegador. Una vez completada la autorización, el token se almacena en caché en el almacén de credenciales de su sistema operativo.

Si configura tanto `DD_API_KEY` como `DD_APP_KEY`, la aplicación generada utiliza esas claves en lugar de OAuth.

### Funciones de backend {#backend-functions}

Los archivos que coinciden con `*.backend.ts` o `*.backend.js` contienen funciones de backend. Las funciones de backend se ejecutan en el lado del servidor con acceso a sus [conexiones][8]. El frontend los importa y los llama como módulos ES estándar.

Las funciones de backend pueden llamar a cualquier acción en el [Action Catalog][4] de Datadog a través de la biblioteca [`@datadog/action-catalog`][10]. El Action Catalog proporciona acciones predefinidas y reutilizables para interactuar con proveedores de nube, herramientas SaaS y la Datadog API. Puedes construir sobre integraciones existentes en lugar de escribir clientes de API desde cero.

La biblioteca es un cliente de TypeScript totalmente tipado que envuelve integraciones, incluyendo AWS, Azure, GCP, Datadog API, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic y HTTP genérico. Importar acciones desde `@datadog/action-catalog` le brinda entradas y respuestas tipadas para cada acción.

Puede visualizar las utilidades de backend a través del paquete [@datadog/apps-backend][24]. Utilice las utilidades para ayudar con acciones comunes, como recuperar la información del usuario que realiza la invocación.

   ```
import { getInitiatingUser, type User } from '@datadog/apps-backend/user';

export async function getCurrentUser(): Promise<User> {
    return getInitiatingUser();
}
   ```

{{% collapse-content title="Ejemplo de función de backend" level="h4" expanded=false %}}

Cree una función de backend que enumere los hosts a través del Action Catalog:

**src/listHosts.backend.ts**

```typescript
import { listHosts, type ListHostsResponse } from '@datadog/action-catalog/dd/hosts';

export async function getHosts(filter?: string): Promise<ListHostsResponse> {
    const response = await listHosts({
        inputs: {
            filter: filter ?? '*',
            count: 10,
            include_hosts_metadata: true,
        },
    });
    return response;
}
```

Luego, llámela desde el `App.tsx` de su aplicación:

**src/App.tsx**

```tsx
import { useState, useEffect } from 'react';
import { getHosts } from './listHosts.backend';

function App() {
    const [hostCount, setHostCount] = useState<number>(0);

    useEffect(() => {
        getHosts().then((response) => {
            setHostCount(response.host_list?.length ?? 0);
        });
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to my-app</h1>
            <p>Monitoring {hostCount} hosts</p>
        </div>
    );
}

export default App;
```
{{% /collapse-content %}}

### Componentes de UI {#ui-components}

Utilice [`@datadog/druids`][23] para crear la interfaz de usuario de su aplicación con los mismos componentes de React que se utilizan en los productos de Datadog, como tablas, botones, gráficos y formularios. Crear con Druids ayuda a que su aplicación coincida con la apariencia del resto de Datadog.

Instale la biblioteca:

```shell
npm install @datadog/druids
```

Importe los componentes de la misma manera que importa cualquier componente de React:

```tsx
import { Button } from '@datadog/druids';
```

Druids requiere React 18 o 19 como dependencia del mismo nivel. Para ver el conjunto de componentes disponibles, consulte el [paquete en npm][23].

<div class="alert alert-info">
Los componentes de Druids son solo para uso en Datadog Apps y App Builder. Consulte la licencia del paquete para obtener más detalles.
</div>

## Desarrolle y cargue su aplicación {#build-and-upload-your-app}

Utilice `npm run build` para desarrollar la aplicación localmente sin cargarla. Esta es la opción predeterminada recomendada para el desarrollo local, donde normalmente no desea cargar cada compilación.

Utilice `npm run upload` para desarrollar y cargar la aplicación en Datadog. Esto ejecuta `vite build` con `DD_APPS_UPLOAD_ASSETS=1`.

```shell
npm run upload
```

Las cargas utilizan OAuth de forma predeterminada y pueden abrir un flujo de autorización del navegador la primera vez. Si establece tanto `DD_API_KEY` como `DD_APP_KEY`, las cargas utilizan la autenticación mediante clave de API y clave de aplicación en su lugar.

Las siguientes variables de entorno están disponibles:

| Variable | Descripción |
|---|---|
| `DD_API_KEY` | Opcional. Clave de Datadog API utilizada con `DD_APP_KEY` para el desarrollo local y las cargas. También habilita la telemetría de compilación respaldada por clave de API, como las métricas de compilación y las cargas de sourcemaps de Error Tracking. |
| `DD_APP_KEY` | Opcional. Clave de aplicación utilizada con `DD_API_KEY` para el desarrollo local y las cargas. |
| `DD_APPS_AUTH_METHOD` | Opcional. Establezca en `oauth` o `apiKey` para anular el método de autenticación de la aplicación generada. |
| `DD_APPS_VERSION_NAME` | Opcional. El nombre de la versión para la versión de la aplicación cargada. Debe ser una cadena única por aplicación. Si no se establece, Datadog asigna un nombre de versión. |
| `DD_APPS_UPLOAD_ASSETS` | Si se establece, carga los recursos compilados a Datadog. Se establece automáticamente mediante `npm run upload`. |

Para implementaciones en producción, [configure CI/CD con GitHub Actions](#set-up-cicd-with-github-actions). [`DataDog/apps-github-action`][11] maneja el paso para usted.

Después de una carga exitosa, la salida de la compilación muestra una URL donde su aplicación es accesible en Datadog.

## Publique y administre sus aplicaciones {#publish-and-manage-your-apps}

Después de cargar una aplicación, esta aparece en su lista de [App Builder][12]. Desde App Builder, puede:

- [Publicar su aplicación][13]
- [Editar el nombre y la descripción de la aplicación][13]
- Administrar [permisos][14]
- [Integrar la aplicación][3] en tableros, cuadernos y el Internal Developer Portal

<div class="alert alert-danger">
Las siguientes funciones de App Builder no están disponibles para aplicaciones creadas localmente:
<ul>
<li>Edición de la UI con componentes de arrastrar y soltar</li>
<li>Variables, eventos y expresiones administrados en la UI de App Builder</li>
</ul>
Para cambiar la UI o la lógica de una aplicación, actualice el código en su proyecto local y vuelva a cargar.
</div>

## Configure CI/CD con GitHub Actions {#set-up-cicd-with-github-actions}

Para cargar automáticamente su aplicación en cada push a la rama `main`, utilice la GitHub Action [`DataDog/apps-github-action`][11]. Esta acción compila su aplicación y la carga en Datadog.

Las cargas de CI/CD requieren autenticación con clave de API y de aplicación. Cree una clave de Datadog API y una clave de aplicación con [Actions API Access][5] habilitado, luego guárdelas como secretos de GitHub.

Si su organización no está en US1 (`datadoghq.com`), configure `auth.site` en `vite.config.ts` con su [Datadog site][15]. La compilación lee esta configuración al cargar la aplicación, por lo que el mismo ajuste también se aplica al desarrollo local. Su [Datadog site] es `{{< region-param key="dd_site" >}}`.

{{< site-region region="us3,us5,eu,ap1,ap2,uk1" >}}

```ts
datadogVitePlugin({
  auth: {
    site: '<YOUR_DATADOG_SITE>',
  },
});
```
{{< /site-region >}}

Cree `.github/workflows/cd.yml` en el repositorio de su aplicación:

```yaml
name: Continuous Deployment
on:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  deploy-app:
    name: Deploy Datadog App
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6

      - name: Deploy
        uses: DataDog/apps-github-action@v0.0.2
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## Solución de problemas {#troubleshooting}

### Errores de autenticación {#authentication-errors}

Para el desarrollo y las cargas locales, los errores de autenticación de OAuth pueden tener una de estas causas:

- El flujo del navegador de OAuth no se completó.
- El token de OAuth en caché no es válido.
- `auth.site` no coincide con su [Datadog site].

Vuelva a ejecutar el comando y complete el flujo de autorización del navegador.

Si utiliza autenticación con clave de API y de aplicación, los errores de autenticación suelen indicar credenciales faltantes o no válidas. Los fallos en la llamada a la función de backend pueden tener la misma causa. Verifique que `DD_API_KEY` y `DD_APP_KEY` estén configurados, y que la clave de aplicación tenga habilitado [Actions API Access][5].

### La compilación se realiza correctamente pero no se carga nada {#build-succeeds-but-nothing-uploads}

Asegúrese de haber ejecutado `npm run upload` (no `npm run build`), y que `dryRun` en `vite.config.ts` no esté configurado como `true`.

### Errores de versión node.js durante scaffolding {#nodejs-version-errors-during-scaffolding}

La herramienta de scaffolding requiere Node.js 20.12.0 o una versión posterior. Si ve errores incluso en una versión compatible, actualice a la v22. Utilice un administrador de versiones como [nvm][16], [Volta][17] o [fnm][18], o descárguela desde el [Node.js website][19].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/app_builder/access_and_auth/
[2]: /es/actions/app_builder/
[3]: /es/actions/app_builder/embedded_apps/
[4]: /es/actions/actions_catalog/
[5]: /es/account_management/api-app-keys/#actions-api-access
[6]: /es/account_management/api-app-keys/
[7]: https://app.datadoghq.com/organization-settings/application-keys
[8]: /es/actions/connections/
[9]: https://github.com/DataDog/build-plugin
[10]: https://www.npmjs.com/package/@datadog/action-catalog
[11]: https://github.com/DataDog/apps-github-action
[12]: https://app.datadoghq.com/app-builder/apps/list
[13]: /es/actions/app_builder/build/#customize-your-app
[14]: /es/actions/app_builder/access_and_auth/#app-permissions
[15]: /es/getting_started/site/
[16]: https://github.com/nvm-sh/nvm
[17]: https://volta.sh
[18]: https://github.com/Schniz/fnm
[19]: https://nodejs.org
[20]: https://github.com/datadog-labs/agent-skills/tree/main/dd-apps/datadog-app
[21]: https://github.com/datadog-labs/agent-skills/blob/main/README.md
[22]: https://github.com/vercel-labs/skills
[23]: https://www.npmjs.com/package/@datadog/druids
[24]: https://www.npmjs.com/package/@datadog/apps-backend
---
title: Embed Apps
description: Embed a published Datadog app in dashboards, notebooks, the Internal Developer Portal homepage, and the Service Catalog side panel.
further_reading:
- link: "/actions/datadog_apps/"
  tag: "Documentation"
  text: "Datadog Apps"
- link: "/actions/app_builder/embedded_apps/"
  tag: "Documentation"
  text: "Embed App Builder Apps"
- link: "https://www.npmjs.com/package/@datadog/apps-frontend"
  tag: "External Site"
  text: "@datadog/apps-frontend package on npm"
---

{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="Join the Preview!">}}
Datadog Apps is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

Embed [Datadog Apps][1] in other Datadog products to place operational tools directly in the surfaces where users investigate issues and take action. An embedded app can display its existing experience or respond to live context supplied by its host, such as a dashboard's time range and template variables.

## Prerequisites

- A built, uploaded, and published Datadog app
- Permission to use the app and edit the destination surface

For information about building, uploading, and publishing an app, see [Datadog Apps][1].

## Embed an app

<div class="alert alert-info">You can only embed an app through Datadog. AI coding agents cannot embed apps.</div>

After you upload and publish an app, you can add it to a supported Datadog surface without changing the app.

You can embed an app from the app itself, or from the surface where you want it to appear.

### From the app

1. In the [App list][2], open the published app you want to embed.
1. At the top of the page, click **+ Add to Dashboard**, then select a destination type from the menu.
1. Select the destination, then click **Save**.

### From the destination

{{< tabs >}}
{{% tab "Dashboard" %}}

1. Open the dashboard you want to add the app to.
1. In the widget tray, find the **Apps** widget under **Actions and Remediations**, and drag it onto the dashboard.
1. In the editor, choose the app from the **Select app** dropdown. To limit the list to apps you own, enable **My Apps Only**.
1. Resize the widget, then save the dashboard.

{{% /tab %}}
{{% tab "Notebook" %}}

1. Open the notebook you want to add the app to.
1. Add a cell and select the **Apps** cell type.
1. Choose the app from the dropdown.
1. Save the notebook.

The **Apps** cell has no per-cell time control. It reads the notebook's time range through the `datadogNotebook` input.

{{% /tab %}}
{{% tab "Service Catalog" %}}

1. Navigate to [Service Catalog][1] and select a service.
1. In the service's side panel, select the **+ Add App** tab.
1. Choose the app from the dropdown. To limit the list to apps you own, enable **My Apps Only**.

[1]: https://app.datadoghq.com/services

{{% /tab %}}
{{< /tabs >}}

After you embed the app, [verify it](#verify-the-app). Optionally, [configure the app](#customize-the-embedded-experience) to respond to its host's context, theme, or shared-link state. An embedded app displays the most recently published version, so publish your changes before embedding.

## Customize the embedded experience

If you haven't already, install the [`@datadog/apps-frontend`][3] package in the app:

```shell
npm install @datadog/apps-frontend
```

To make an embedded app respond to its Datadog host, keep `DatadogAppProvider` at the application root. The provider establishes communication with the Datadog host, makes host inputs available to hooks, and preserves the app's URL state in shared Datadog links.

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

The standard Datadog Apps scaffold includes this provider by default. Every `@datadog/apps-frontend` hook must render below it, so keep the provider in place when you restructure the app.

### Read host inputs

Host inputs are values and functions supplied by the Datadog product containing the app. For example, a dashboard can provide its current time range and template variables, while the Service Catalog side panel can provide the service it is displaying.

Host values update automatically when the surrounding product context changes.

Import `useDatadogAppInput` and the input schema for the relevant product surface:

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

For the complete TypeScript definitions, see the [`@datadog/apps-frontend` source on npm][4].

#### Input states

`useDatadogAppInput` returns a state object whose `status` is `pending`, `ready`, `unavailable`, or `failed`. Values are available in `fields` only when the status is `ready`.

`unavailable` is a normal outcome rather than an error. It means the app is running on a surface that does not provide that input, such as reading `datadogDashboard` inside a notebook. Render a fallback for this case.

For example:

```typescript
function PanelHeader() {
  const panel = useDatadogAppInput(datadogServicePanel);

  switch (panel.status) {
    case 'pending':
      return <Spinner />;
    case 'unavailable':
      return <p>Open this app from a Service Catalog side panel.</p>;
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

### Available inputs

{{< tabs >}}
{{% tab "Theme" %}}

Use `datadogTheme` to respond to the theme currently used by the Datadog host.

```typescript
const theme = useDatadogAppInput(datadogTheme);
```

When the status is `ready`, `fields` provides:

```typescript
{
  theme: 'light' | 'dark';
}
```

The value updates when the user changes the Datadog theme.

If the app uses Druids, you can use `DruidsEnvironmentWithThemeInput` to apply the host theme automatically:

```typescript
import { DruidsEnvironmentWithThemeInput } from '@datadog/apps-frontend/druids/react';

<DatadogAppProvider>
  <DruidsEnvironmentWithThemeInput defaultThemePreference="light">
    <App />
  </DruidsEnvironmentWithThemeInput>
</DatadogAppProvider>
```

{{% /tab %}}
{{% tab "Dashboard" %}}

Use `datadogDashboard` to read a dashboard's current time range and template variables.

```typescript
const dashboard = useDatadogAppInput(datadogDashboard);
```

When the status is `ready`, `fields` provides:

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

Use the time range to scope the app's queries to the dashboard. Use template variables to apply the same service, environment, team, or other filters used by the surrounding dashboard.

{{% /tab %}}
{{% tab "Notebook" %}}

Use `datadogNotebook` to read a notebook's current time range and template variables.

```typescript
const notebook = useDatadogAppInput(datadogNotebook);
```

When the status is `ready`, `fields` provides:

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

Use this context to keep the app synchronized with the time range and filters applied to the surrounding notebook.

{{% /tab %}}
{{% tab "IDP homepage" %}}

Use `datadogIdp` to read and change the app's position on the Internal Developer Portal homepage.

```typescript
const idp = useDatadogAppInput(datadogIdp);
```

When the status is `ready`, `fields` provides:

```typescript
{
  position: number;
  move: (inputs: { delta: number }) => number;
}
```

Use `position` to read the app's current position on the homepage. Call `move()` to move the app by a number of positions; it resolves to the app's new position.

```typescript
const newPosition = await idp.fields.move({ delta: 1 });
```

{{% /tab %}}
{{% tab "Service Catalog side panel" %}}

Use `datadogServicePanel` to identify the service displayed in the Service Catalog side panel.

```typescript
const servicePanel = useDatadogAppInput(datadogServicePanel);
```

When the status is `ready`, `fields` provides:

```typescript
{
  service: string;
  close: () => undefined;
}
```

Use `service` to scope the app's content to the selected service. Call `close()` when an app action should close the side panel.

{{% /tab %}}
{{< /tabs >}}

Do not assume that an input available on one product surface is available on another. Request only the context the app needs and provide a useful experience when that context is absent.

## Preserve state in shared links

`DatadogAppProvider` preserves the app's query string and URL fragment in shared Datadog links. Store shareable state—such as selected services, filters, records, or in-app routes—in the URL. When another user opens the shared link, the embedded app can restore the same state. [Deep links][5] to a specific app state work without additional configuration, as long as the app remains wrapped in `DatadogAppProvider`.

## Verify the app

After you embed the app, check the following on the surface where you embedded it:

- **Access**: Open the surface as a user who has permission to use the app but did not embed it. The app renders instead of a permission error.
- **Size**: Resize the app to the smallest size you expect users to configure. Content stays readable, without overflow or clipping.
- **Host context**: Change the host's context, such as a dashboard's time range or a template variable value, and confirm that the app updates. If the app renders its `unavailable` fallback instead, it is reading an input that the surface does not provide.
- **Shared links**: Change the state inside the app, copy the Datadog share link, and open it in a new browser session. The app restores the same state.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/datadog_apps/
[2]: https://app.datadoghq.com/app-builder/apps/list
[3]: https://www.npmjs.com/package/@datadog/apps-frontend
[4]: https://www.npmjs.com/package/@datadog/apps-frontend?activeTab=code
[5]: /actions/datadog_apps/#share-embedded-app-state-with-deep-links

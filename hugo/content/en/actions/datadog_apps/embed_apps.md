---
title: Embed Apps
description: Embed a published Datadog App in dashboards, notebooks, the Internal Developer Portal homepage, and the Service Catalog side panel.
further_reading:
- link: "/actions/datadog_apps/"
  tag: "Documentation"
  text: "Datadog Apps"
- link: "/actions/app_builder/embedded_apps/"
  tag: "Documentation"
  text: "Embed App Builder apps in Datadog"
- link: "https://www.npmjs.com/package/@datadog/apps-frontend"
  tag: "External Site"
  text: "@datadog/apps-frontend package"
---

{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="Join the Preview!">}}
Datadog Apps is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

Embed [Datadog Apps][2] in other Datadog products to place operational tools directly in the Datadog surfaces where users investigate issues and take action. An embedded app can display its existing experience or respond to live context supplied by its host, such as a dashboard's time range and template variables.

## Prerequisites

- A Datadog App that has been built, uploaded, and published
- Permission to use the app and edit the destination surface

For information about building, uploading, and publishing an app, see [Datadog Apps][2].

## Embed an app

<div class="alert alert-info">An app can only be embedded through the Datadog site, AI coding agents cannot embed an app.</div>

After you upload and publish a Datadog App, you can add it to a supported Datadog surface without changing the app. Optionally, [configure the app](#customize-the-embedded-experience) to respond to its host's context, theme, or shared-link state.

To embed an app in Datadog:

1. Open the dashboard, notebook, Internal Developer Portal homepage, or Service Catalog surface where you want the app to appear.
1. Choose the option to add an app.
1. Select the published app.
1. Configure its placement and size, if applicable.
1. Save your changes and [verify the app](#verify-the-app) to confirm that it loads and behaves as expected.

## Customize the embedded experience

If you haven't already, install the  [`@datadog/apps-frontend`][1] package in the app:

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

Host inputs are values and functions supplied by the Datadog product containing the app. For example, a dashboard can provide its current time range and template variables, while a service side panel can provide the service it is displaying.

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

For the complete TypeScript definitions, see the [`@datadog/apps-frontend` package][3].

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
      return <p>Open this app from a service panel.</p>;
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
{{% tab "Service panel" %}}

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

Do not assume that an input available on one product surface will be available on another. Request only the context the app needs and provide a useful experience when that context is absent.

## Preserve state in shared links

`DatadogAppProvider` preserves the app's query string and URL fragment in shared Datadog links. Store shareable state—such as selected services, filters, records, or in-app routes—in the URL. When another user opens the shared link, the embedded app can restore the same state. Deep links to a specific app state work without additional configuration, as long as the app remains wrapped in `DatadogAppProvider`.

## Verify the app

After embedding the app, verify that it:

- Loads for its intended users
- Works at the configured size
- Responds to the expected host context
- Preserves its state in shared links

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/apps-frontend
[2]: /actions/datadog_apps/
[3]: https://www.npmjs.com/package/@datadog/apps-frontend?activeTab=code

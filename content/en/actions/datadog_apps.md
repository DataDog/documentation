---
title: Datadog Apps
description: Build and deploy custom Datadog apps locally using a code-based development workflow with React, backend functions, and a CLI.
further_reading:
- link: "/actions/app_builder/"
  tag: "Documentation"
  text: "App Builder"
- link: "/actions/app_builder/embedded_apps/"
  tag: "Documentation"
  text: "Embedded Apps"
- link: "/actions/app_builder/access_and_auth/"
  tag: "Documentation"
  text: "Access and Authentication"
---

## Overview

With Datadog Apps, you build applications locally as code with React and TypeScript (or JavaScript), using a standard frontend development workflow.

Datadog Apps use the same permissions model as the [drag-and-drop apps in App Builder][1] and can also be [embedded in dashboards][2].

Choose Datadog Apps when you need:

- **Team collaboration**: multiple engineers contributing to the same app, with code review and version history through your existing source control
- **Source control and CI/CD**: store your app in GitHub and deploy automatically on merge
- **AI-assisted development**: use your preferred local tooling (such as Claude) to generate and refine code
- **Custom cloud providers and APIs**: integrate with services beyond the [Action Catalog][3] using your own backend code
- **Complex UI and logic**: full React and TypeScript control over components, state, and rendering

## Prerequisites

- **Node.js version v20.12.0 or later**. Check your version:
  ```shell
  node --version
  ```
- A Datadog **API key** and an **Application key** with Actions API Access enabled. For instructions on creating keys, see [API and Application Keys][4].

  To enable Actions API Access on an application key:

  1. Navigate to [**Organization Settings > Application Keys**][5].
  1. Select your application key.
  1. Enable **Actions API Access**.

## Scaffold an app

1. Run the scaffolding command to create a new app:

   ```shell
   npm create @datadog/apps
   ```

2. Follow the interactive prompts to configure your app name and template.
3. (Optional) Set up the RUM integration for the app. This automatically sets up the Browser SDK so you can use RUM to report user metrics.

### App structure

The scaffolded project includes:

| File or directory | Description |
|---|---|
| `src/App.tsx` | Root UI component (React) |
| `src/**/*.backend.ts` | Backend functions that run server-side with access to API keys |
| `vite.config.ts` | Build configuration with `@datadog/vite-plugin` pre-configured |
| `package.json` | Dependencies and scripts (`dev`, `build`) |

## Develop your app locally

1. Set your Datadog credentials as environment variables:

   ```shell
   export DD_API_KEY="<YOUR_API_KEY>"
   export DD_APP_KEY="<YOUR_APPLICATION_KEY>"
   ```

2. Start the development server:

   ```shell
   npm run dev
   ```

3. Open the URL shown in the terminal (`http://localhost:5173/`) to preview your app.

### Backend functions

Files matching `*.backend.ts` or `.js` contain backend functions. These run server-side with access to your API keys and are never shipped to the browser. The frontend imports and calls them like standard ES modules.

Backend functions can call any action in Datadog's [Actions Catalog][3] through the [`@datadog/action-catalog`][6] library. The Actions Catalog provides reusable, pre-built actions for interacting with cloud providers, SaaS tools, and the Datadog API, so you can build functionality on top of existing integrations instead of writing API clients from scratch.

The library is a fully typed TypeScript client that wraps 50+ integrations, including AWS, Azure, GCP, the Datadog API, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic, and generic HTTP. Importing actions from `@datadog/action-catalog` gives you typed inputs and responses for each action.

{{% collapse-content title="Example backend function" level="h4" expanded=false %}}

Create a backend function that lists hosts through the Action Catalog:

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

Then call it from your app's `App.tsx`:

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

## Publish your app

Run a production build to upload your app to Datadog:

```shell
npm run build
```

The following environment variables are available with `npm run build`:

| Variable | Description |
|---|---|
| `DD_API_KEY` | Datadog API key. |
| `DD_APP_KEY` | Datadog application key. |
| `DD_APPS_VERSION_NAME` | Optional. The version name of the app version to be uploaded. Can be any string, but each app version must have a unique name (not duplicated for the same app). If unset, Datadog assigns a version name. |
| `DD_APPS_UPLOAD_ASSETS` | If set and `dryRun` is `false`, uploads built assets to Datadog when `npm run build` is run. |

By default, `npm run build` runs in dry run mode, which builds the app without uploading it to Datadog. This is the recommended default for local development, since you typically don't want every local build to publish.

For production deployments, [set up CI/CD with GitHub Actions](#set-up-cicd-with-github-actions). The [`DataDog/apps-github-action`][7] handles the upload step on your behalf, so you don't need to change `dryRun` for this workflow.

To upload from your local environment as an end-to-end test — for example, to verify that the build pipeline works before a release — set `DD_APPS_UPLOAD_ASSETS`:

```shell
DD_APPS_UPLOAD_ASSETS=1 npm run build
```

If you run your own deployment pipeline without the official GitHub Action, set `dryRun` to `false` in `vite.config.ts` so every build uploads:

```js
apps: {
    enable: true,
    dryRun: false,
},
```

After a successful upload, the build output displays a URL where your app is accessible in Datadog.

## View and manage your apps

After you publish an app, it appears in your [App Builder][8] app list alongside your other apps. From the App Builder UI, you can:

- Edit the app name and description
- Manage permissions
- Embed the app in dashboards, notebooks, and the Internal Developer Portal

<div class="alert alert-danger">
Apps built locally cannot be edited through the App Builder drag-and-drop interface. The following App Builder features are not available for locally-built apps:
<ul>
<li>UI editing with drag-and-drop components</li>
<li>Variables, events, and expressions managed in the App Builder UI</li>
</ul>
To change an app's UI or logic, update the code in your local project and redeploy.
</div>

## Set up CI/CD with GitHub Actions

To automatically deploy your app on every push to the `main` branch, use the [`DataDog/apps-github-action`][7] GitHub Action. This action builds your app and deploys it to Datadog. For all available inputs and configuration options, see the [action's README][7].

**If your organization is not on US1** (`datadoghq.com`), set `auth.site` in `vite.config.ts` to your [Datadog site][9]. The build reads this configuration when uploading the app, so the same setting also applies to local development. Your Datadog site: (`{{< region-param key="dd_site" >}}`)

<!-- TODO: Confirm US1-FED support before GA. The @datadog/vite-plugin README documents auth.site values for datadoghq.com, datadoghq.eu, us3.datadoghq.com, us5.datadoghq.com, and ap1.datadoghq.com — it does not list a FED value. Verify with engineering whether FED is supported and, if so, what the correct site string is. -->
{{< site-region region="us3,us5,eu,ap1,ap2,gov,gov2" >}}

```ts
datadogVitePlugin({
  auth: {
    site: '<YOUR_DATADOG_SITE>',
  },
});
```
{{< /site-region >}}

Create `.github/workflows/cd.yml` in your app's repository:

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
        uses: DataDog/apps-github-action@v0.0.1
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## Troubleshooting

### 401 or "Missing authentication token" errors

Verify that `DD_API_KEY` and `DD_APP_KEY` are set and that the application key has Actions API Access enabled.

### Backend function calls fail

Check that both `DD_API_KEY` and `DD_APP_KEY` are set and that the application key has Actions API Access enabled.

### Build succeeds but nothing uploads

The build defaults to dry run mode. Set `DD_APPS_UPLOAD_ASSETS=1` or configure `dryRun: false` in `vite.config.ts`.

### Node.js version errors during scaffolding

The scaffolding tool requires Node.js v20.12.0 or later. If you still encounter version errors on a supported version, try upgrading to v22. Use a version manager such as [nvm][10], [Volta][11], or [fnm][12], or download from [nodejs.org][13].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder/access_and_auth/
[2]: /actions/app_builder/embedded_apps/
[3]: /actions/actions_catalog/
[4]: /account_management/api-app-keys/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://www.npmjs.com/package/@datadog/action-catalog
[7]: https://github.com/DataDog/apps-github-action
[8]: /actions/app_builder/
[9]: /getting_started/site/
[10]: https://github.com/nvm-sh/nvm
[11]: https://volta.sh
[12]: https://github.com/Schniz/fnm
[13]: https://nodejs.org

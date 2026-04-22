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

With Datadog Apps, you can build applications locally as code, using a standard frontend development workflow. Unlike the [drag-and-drop App Builder][1], Datadog Apps give you full control over your application's UI and logic with React and TypeScript (or JavaScript).

Datadog Apps use the same permissions model as drag-and-drop apps and can be [embedded in dashboards][2] in the same way. After you publish a code-based app, it appears in your [App Builder][1] app list alongside your other apps.

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

{{< img src="/actions/app_builder/datadog-create-apps.png" alt="Screenshot of the Datadog App Builder's code-based app creation interface" style="width:70%;" >}}

1. Run the scaffolding command to create a new app:

   ```shell
   npm create @datadog/apps@0.0.1-dev.1
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

Backend functions can call any action in Datadog's [Actions Catalog][10] through the [`@datadog/action-catalog`][11] library. The Actions Catalog provides reusable, pre-built actions for interacting with cloud providers, SaaS tools, and the Datadog API, so you can build functionality on top of existing integrations instead of writing API clients from scratch.

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

By default, `npm run build` runs in dry run mode, which builds the app without uploading it to Datadog. You can enable uploading in two ways:

- **Set the `DD_APPS_UPLOAD_ASSETS` environment variable:**
  ```shell
  DD_APPS_UPLOAD_ASSETS=1 npm run build
  ```

- **For CI/CD pipelines where every build should deploy, set `dryRun` to `false` in `vite.config.ts`:**
  ```js
  apps: {
      enable: true,
      dryRun: false,
  },
  ```

After a successful upload, the build output displays a URL where your app is accessible in Datadog.

## Set up CI/CD with GitHub Actions

To automatically deploy your app on every push to the `main` branch, use the [`DataDog/apps-github-action`][9] GitHub Action. This action builds your app and deploys it to Datadog. For all available inputs and configuration options, see the [action's README][9].

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

The scaffolding tool requires Node.js v22 or later. Upgrade using a version manager such as [nvm][3], [Volta][6], or [fnm][7], or download from [nodejs.org][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder/
[2]: /actions/app_builder/embedded_apps/
[3]: https://github.com/nvm-sh/nvm
[4]: /account_management/api-app-keys/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://volta.sh
[7]: https://github.com/Schniz/fnm
[8]: https://nodejs.org
[9]: https://github.com/DataDog/apps-github-action
[10]: /actions/actions_catalog/
[11]: https://www.npmjs.com/package/@datadog/action-catalog

---
title: Apps
description: Build and deploy custom Apps locally using a code-based development workflow with React, backend functions, and a CLI.
further_reading:
- link: "https://www.datadoghq.com/blog/internal-applications-datadog-apps/"
  tag: "Blog"
  text: "Ship internal applications from your AI Agent with Datadog Apps"
- link: "https://www.youtube.com/watch?v=HEDjpMyqkSE"
  tag: "Video"
  text: "Datadog Apps Demo"
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

{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="Join the Preview!">}}
Datadog Apps is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

With Apps, you build applications locally as code with React and TypeScript (or JavaScript), using your standard development workflow.

Apps use the same [permissions model][1] as [App Builder apps][2]. You can also embed them in other Datadog products, such as [dashboards and the Internal Developer Portal][3].

Choose Apps when you need:

- **Team collaboration**: Multiple engineers contributing to the same app, with code review and version history through your existing source control.
- **Source control and CI/CD**: Store your app in GitHub and deploy automatically on merge.
- **AI-assisted development**: Use your preferred local tooling (such as Cursor, GitHub Copilot, or Claude) to generate and refine code.
- **Custom cloud providers and APIs**: Integrate with services beyond the [Action Catalog][4] using your own backend code.
- **Complex UI and logic**: Full React and TypeScript control over components, state, and rendering.

## Prerequisites

- **Node.js version 20.12.0 or later**. Check your version:
  ```shell
  node --version
  ```
- Optional: A Datadog **API key** and an **application key** with [Actions API Access][5] enabled. Required for API-key-backed build telemetry (build metrics and Error Tracking sourcemap uploads) and for CI/CD uploads. For instructions, see [API and Application Keys][6].

  To enable Actions API Access on an application key:

  1. Navigate to [**Organization Settings > Application Keys**][7].
  1. Select your application key.
  1. Enable **Actions API Access**.

## Scaffold an app

1. Run the scaffolding command to create an app:
   ```shell
   npm create @datadog/apps@latest
   ```
2. Follow the interactive prompts to configure your app name and template.

### Generated app structure

The scaffolded project includes:

| File or directory | Description |
|---|---|
| `src/App.tsx` | Root UI component (React) |
| `src/**/*.backend.ts` | Backend functions that run server-side with access to [Datadog connections][8] |
| `vite.config.ts` | Build configuration with [`@datadog/vite-plugin`][9] pre-configured |
| `package.json` | Dependencies and scripts (`dev`, `build`, `upload`) |

## Use the `datadog-app` skill

The [`datadog-app` agent skill][20] gives AI coding agents guidance on Datadog Apps workflows, including scaffolding, local development, uploads, publishing, CI/CD, troubleshooting, DDSQL, and Action Catalog usage. The skill is available in the [agent-skills GitHub repository][21].

### Install

```shell
npx skills add datadog-labs/agent-skills \
  --skill datadog-app \
  --full-depth -y
```

The `skills` CLI supports Claude Code, Codex, Cursor, Gemini CLI, OpenCode, and other coding agents. To target a specific agent, see the [skills CLI documentation][22]. If the skill does not appear after installation, restart your coding agent.

### Example prompts

- `Scaffold a Datadog App called my-app.`
- `Run this Datadog App locally.`
- `Upload and publish this Datadog App.`
- `Set up CI/CD for this Datadog App.`
- `Troubleshoot this Datadog App authentication error.`

## Develop your app locally

1. Start the development server:
   ```shell
   npm run dev
   ```
2. Open the URL shown in the terminal (for example, `http://localhost:5173/`) to preview your app.

When the dev server needs to call Datadog, such as when running a backend function locally, it uses OAuth by default. If authorization is required, the command opens a browser prompt. After authorization completes, the token is cached in your operating system credential store.

If you set both `DD_API_KEY` and `DD_APP_KEY`, the generated app uses those keys instead of OAuth.

### Backend functions

Files matching `*.backend.ts` or `*.backend.js` contain backend functions. Backend functions run server-side with access to your [connections][8]. The frontend imports and calls them like standard ES modules.

Backend functions can call any action in Datadog's [Action Catalog][4] through the [`@datadog/action-catalog`][10] library. The Action Catalog provides reusable, prebuilt actions for interacting with cloud providers, SaaS tools, and the Datadog API. You can build on top of existing integrations instead of writing API clients from scratch.

The library is a fully typed TypeScript client that wraps integrations, including AWS, Azure, GCP, the Datadog API, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic, and generic HTTP. Importing actions from `@datadog/action-catalog` gives you typed inputs and responses for each action.

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

## Build and upload your app

Use `npm run build` to build the app locally without uploading it. This is the recommended default for local development, where you typically don't want to upload every build.

Use `npm run upload` to build and upload the app to Datadog. This runs `vite build` with `DD_APPS_UPLOAD_ASSETS=1`.

```shell
npm run upload
```

Uploads use OAuth by default and may open a browser authorization flow the first time. If you set both `DD_API_KEY` and `DD_APP_KEY`, uploads use API and application key authentication instead.

The following environment variables are available:

| Variable | Description |
|---|---|
| `DD_API_KEY` | Optional. Datadog API key used with `DD_APP_KEY` for local development and uploads. Also enables API-key-backed build telemetry, such as build metrics and Error Tracking sourcemap uploads. |
| `DD_APP_KEY` | Optional. Application key used with `DD_API_KEY` for local development and uploads. |
| `DD_APPS_AUTH_METHOD` | Optional. Set to `oauth` or `apiKey` to override the generated app's authentication method. |
| `DD_APPS_VERSION_NAME` | Optional. The version name for the uploaded app version. Must be a unique string per app. If unset, Datadog assigns a version name. |
| `DD_APPS_UPLOAD_ASSETS` | If set, uploads built assets to Datadog. Set automatically by `npm run upload`. |

For production deployments, [set up CI/CD with GitHub Actions](#set-up-cicd-with-github-actions). [`DataDog/apps-github-action`][11] handles the upload step for you.

After a successful upload, the build output displays a URL where your app is accessible in Datadog.

## Publish and manage your apps

After you upload an app, it appears in your [App Builder][12] app list. From App Builder, you can:

- [Publish your app][13]
- [Edit the app name and description][13]
- Manage [permissions][14]
- [Embed the app][3] in dashboards, notebooks, and the Internal Developer Portal

<div class="alert alert-danger">
The following App Builder features are not available for locally-built apps:
<ul>
<li>UI editing with drag-and-drop components</li>
<li>Variables, events, and expressions managed in the App Builder UI</li>
</ul>
To change an app's UI or logic, update the code in your local project and re-upload.
</div>

## Set up CI/CD with GitHub Actions

To automatically upload your app on every push to the `main` branch, use the [`DataDog/apps-github-action`][11] GitHub Action. This action builds your app and uploads it to Datadog.

CI/CD uploads require API and application key authentication. Create a Datadog API key and an application key with [Actions API Access][5] enabled, then store them as GitHub secrets.

If your organization is not on US1 (`datadoghq.com`), set `auth.site` in `vite.config.ts` to your [Datadog site][15]. The build reads this configuration when uploading the app, so the same setting also applies to local development. Your Datadog site is `{{< region-param key="dd_site" >}}`.

{{< site-region region="us3,us5,eu,ap1,ap2,uk1" >}}

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
        uses: DataDog/apps-github-action@v0.0.2
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## Troubleshooting

### Authentication errors

For local development and uploads, OAuth authentication errors may have one of these causes:

- The OAuth browser flow did not complete.
- The cached OAuth token is invalid.
- `auth.site` does not match your Datadog site.

Rerun the command and complete the browser authorization flow.

If you use API and application key authentication, authentication errors usually point to missing or invalid credentials. Backend function call failures can have the same cause. Verify that `DD_API_KEY` and `DD_APP_KEY` are set, and that the application key has [Actions API Access][5] enabled.

### Build succeeds but nothing uploads

Make sure you ran `npm run upload` (not `npm run build`), and that `dryRun` in `vite.config.ts` is not set to `true`.

### Node.js version errors during scaffolding

The scaffolding tool requires Node.js 20.12.0 or later. If you see errors even on a supported version, upgrade to v22. Use a version manager such as [nvm][16], [Volta][17], or [fnm][18], or download from the [Node.js website][19].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder/access_and_auth/
[2]: /actions/app_builder/
[3]: /actions/app_builder/embedded_apps/
[4]: /actions/actions_catalog/
[5]: /account_management/api-app-keys/#actions-api-access
[6]: /account_management/api-app-keys/
[7]: https://app.datadoghq.com/organization-settings/application-keys
[8]: /actions/connections/
[9]: https://github.com/DataDog/build-plugin
[10]: https://www.npmjs.com/package/@datadog/action-catalog
[11]: https://github.com/DataDog/apps-github-action
[12]: https://app.datadoghq.com/app-builder/apps/list
[13]: /actions/app_builder/build/#customize-your-app
[14]: /actions/app_builder/access_and_auth/#app-permissions
[15]: /getting_started/site/
[16]: https://github.com/nvm-sh/nvm
[17]: https://volta.sh
[18]: https://github.com/Schniz/fnm
[19]: https://nodejs.org
[20]: https://github.com/datadog-labs/agent-skills/tree/main/dd-apps/datadog-app
[21]: https://github.com/datadog-labs/agent-skills/blob/main/README.md
[22]: https://github.com/antfu/skills-cli

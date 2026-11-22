---
title: Build and Develop Apps
description: Build an app with Datadog Apps using Bits AI in App Builder, an AI coding agent, or the CLI.
further_reading:
- link: "/actions/datadog_apps/"
  tag: "Documentation"
  text: "Datadog Apps"
- link: "/actions/datadog_apps/embed_apps/"
  tag: "Documentation"
  text: "Embed Apps"
- link: "/bits_ai/bits_code/"
  tag: "Documentation"
  text: "Bits Code"
---

{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="Join the Preview!">}}
Datadog Apps is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

An app built with Datadog Apps is a React and TypeScript (or JavaScript) project, with optional backend functions that run server-side. You can build an app in the Datadog UI or in your local development environment:

- **In Datadog with Bits AI**: Describe the app you want in App Builder, and Bits Code writes the code for you. Bits Code works in a sandbox and opens a pull request in your GitHub repository. When you merge the pull request, a GitHub Action publishes the app. You don't need a local development environment, but you need a GitHub repository connected to Datadog. See [Build an app with Bits AI](#build-an-app-with-bits-ai).
- **Locally with an AI agent**: Install the `datadog-app` skill in a coding agent, such as Claude Code, Cursor, or Codex. Then prompt the agent to scaffold, run, and upload your app. The agent runs the same commands as the CLI workflow for you. See [Build an app with an AI agent](#build-an-app-with-an-ai-agent).
- **Locally with the CLI**: Scaffold an app with `npm create @datadog/apps`, then develop, build, and upload it yourself. This workflow gives you full control over each step. See [Build an app with the CLI](#build-an-app-with-the-cli).

All three workflows produce the same kind of app, and you manage it the same way afterward. From the [App list][1], you can publish your app, manage its permissions, and embed it in other Datadog products.

## Build an app with Bits AI

<div class="alert alert-info">Building apps with Bits AI is in Preview and might not be available for your organization.</div>

You can build an app in App Builder by prompting [Bits Code][2]. Bits Code writes the app code in a sandbox and opens a pull request in your GitHub repository. When you merge the pull request, a GitHub Action deploys and publishes the app.

Apps built with Bits AI are code-based, and the [App list][1] shows them as **Apps AI** in the **Built With** column. You can't edit these apps in the Classic drag-and-drop editor or convert them to Classic apps. To change an app, prompt Bits Code again or edit the code in your repository.

### Set up your repository

Complete these steps before you build your first app. To view the steps in Datadog, click **Start Guide** in the app editor.

1. Connect Datadog to GitHub. In the [GitHub integration tile][3], install the GitHub App and grant it access to the repositories you want to use. For details, see [Bits Code setup][4].
1. Create an [API key][5] and an [application key][6] with [Actions API Access][7] enabled.
1. In your terminal, run the following command to create a monorepo for your apps. The command requires Node.js 20.12.0 or later and an authenticated [GitHub CLI][8] (`gh`).
   ```shell
   npm create @datadog/apps@latest -- --monorepo
   ```
   Follow the prompts to name your first app, enter your Datadog site, and create a private GitHub repository for the monorepo. When the command asks to set the Datadog deploy secrets, enter your API key and application key. The command stores them as the `DATADOG_API_KEY` and `DATADOG_APP_KEY` secrets on the repository, and the monorepo's deployment workflow uses them to publish your apps.
1. If the Datadog GitHub App has access only to selected repositories, grant it access to the new repository.

### Build and publish an app

1. In the [App list][1], click **New App** > **Build with Bits AI**.
1. Select your monorepo from the repository dropdown.
1. In the prompt field, describe the app you want to build. Bits Code uses the **Auto** model by default.
1. Review Bits Code's changes in the **Changed Files** tab.
1. Open a pull request with the changes, then review and merge it in GitHub. Merging the pull request triggers a GitHub Action that uploads and publishes the app.

After the action finishes, your app appears as **Published** in the [App list][1]. To change the app, open it, prompt Bits Code again, and merge the new pull request.

<!-- **Note**: To use Bits Code with an app you built locally, push its source code to a GitHub repository that Bits Code can access. -->

## Build an app with an AI agent

The [`datadog-app` agent skill][9] gives AI coding agents guidance on Datadog Apps workflows, including scaffolding, local development, uploads, publishing, CI/CD, troubleshooting, DDSQL, and Action Catalog usage. The skill is available in the [agent-skills GitHub repository][10].

With the skill installed, your agent runs the steps in [Build an app with the CLI](#build-an-app-with-the-cli) for you. Your environment needs the same [prerequisites](#prerequisites).

{{< skill-callout
    title="Build an app with an agent"
    text="Install the `datadog-app` skill in your AI coding agent for guided app development."
    action_name="copy_datadog_app_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill datadog-app --full-depth -y
{{< /skill-callout >}}

The `skills` CLI supports Claude Code, Codex, Cursor, Gemini CLI, OpenCode, and other coding agents. To target a specific agent, see the [skills CLI documentation][11]. If the skill does not appear after installation, restart your coding agent.

After you install the skill, describe what you want your agent to do. For example:

- `Scaffold a Datadog App called my-app.`
- `Run this Datadog App locally.`
- `Upload and publish this Datadog App.`
- `Set up CI/CD for this Datadog App.`
- `Troubleshoot this Datadog App authentication error.`
- `Add a table component to this Datadog App using DRUIDS.`

## Build an app with the CLI

Use the CLI to scaffold, develop, and upload your app from your local environment.

### Prerequisites

- **Node.js version 20.12.0 or later**. Check your version:
  ```shell
  node --version
  ```
- Optional: A Datadog **API key** and an **application key** with [Actions API Access][7] enabled. Required for API-key-backed build telemetry (build metrics and Error Tracking sourcemap uploads) and for CI/CD uploads. For instructions, see [API and Application Keys][5].

  To enable Actions API Access on an application key:

  1. Navigate to [**Organization Settings > Application Keys**][6].
  1. Select your application key.
  1. Enable **Actions API Access**.

### Scaffold an app

1. Run the scaffolding command to create an app:
   ```shell
   npm create @datadog/apps@latest
   ```
2. Follow the interactive prompts to configure your app name and template.

The scaffolded project includes:

| File or directory | Description |
|---|---|
| `src/App.tsx` | Root UI component (React) |
| `src/**/*.backend.ts` | Backend functions that run server-side with access to [Datadog connections][12] |
| `vite.config.ts` | Build configuration with [`@datadog/vite-plugin`][13] pre-configured |
| `package.json` | Dependencies and scripts (`dev`, `build`, `upload`) |

### Develop your app locally

1. Start the development server:
   ```shell
   npm run dev
   ```
2. Open the URL shown in the terminal (for example, `http://localhost:5173/`) to preview your app.

When the dev server needs to call Datadog, such as when running a backend function locally, it uses OAuth by default. If authorization is required, the command opens a browser prompt. After authorization completes, the token is cached in your operating system credential store.

If you set both `DD_API_KEY` and `DD_APP_KEY`, the generated app uses those keys instead of OAuth.

#### Backend functions

Files matching `*.backend.ts` or `*.backend.js` contain backend functions. Backend functions run server-side with access to your [connections][12]. The frontend imports and calls them like standard ES modules.

Backend functions can call any action in Datadog's [Action Catalog][14] through the [`@datadog/action-catalog`][15] library. The Action Catalog provides reusable, prebuilt actions for interacting with cloud providers, SaaS tools, and the Datadog API. You can build on top of existing integrations instead of writing API clients from scratch.

The library is a fully typed TypeScript client that wraps integrations, including AWS, Azure, GCP, the Datadog API, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic, and generic HTTP. Importing actions from `@datadog/action-catalog` gives you typed inputs and responses for each action.

You can view backend utilities through the [@datadog/apps-backend][16] package. Use utilities to help with common actions such as retrieving the invoking user's information.

   ```
import { getInitiatingUser, type User } from '@datadog/apps-backend/user';

export async function getCurrentUser(): Promise<User> {
    return getInitiatingUser();
}
   ```

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

#### UI components

Use [`@datadog/druids`][17] to build your app's UI with the same React components used across Datadog products, such as tables, buttons, charts, and forms. Building with DRUIDS helps your app match the look and feel of the rest of Datadog.

Install the library:
```shell
npm install @datadog/druids
```

Import components the same way you import any React component:
```tsx
import { Button } from '@datadog/druids';
```

DRUIDS requires React 18 or 19 as a peer dependency. For the set of available components, see the [package on npm][17].

<div class="alert alert-info">
DRUIDS components are for use in Datadog Apps and App Builder only. See the package's license for details.
</div>

### Build and upload your app

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

For production deployments, [set up CI/CD with GitHub Actions](#set-up-cicd-with-github-actions). [`DataDog/apps-github-action`][18] handles the upload step for you.

After a successful upload, the build output displays a URL where your app is accessible in Datadog.

### Set up CI/CD with GitHub Actions

To automatically upload your app on every push to the `main` branch, use the [`DataDog/apps-github-action`][18] GitHub Action. This action builds your app and uploads it to Datadog.

CI/CD uploads require API and application key authentication. Create a Datadog API key and an application key with [Actions API Access][7] enabled, then store them as GitHub secrets.

If your organization is not on US1 (`datadoghq.com`), set `auth.site` in `vite.config.ts` to your [Datadog site][19]. The build reads this configuration when uploading the app, so the same setting also applies to local development. Your Datadog site is `{{< region-param key="dd_site" >}}`.

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

## Share embedded app state with deep links

When an app is [embedded][20], its URL state mirrors into the host page's URL. This includes routes, tabs, hash values, and query parameters. Copying and sharing that host URL opens the app to the same in-app state.

Deep links are automatically supported with the `DatadogAppProvider` wrapper. If deep links don't work in your app, install [`@datadog/apps-frontend`][21] and wrap the app in `DatadogAppProvider` in `main.tsx`:

```shell
npm install @datadog/apps-frontend@latest
```

```tsx
import { DatadogAppProvider } from '@datadog/apps-frontend/embedding/react';

function App() {
  return (
    <DatadogAppProvider>
      {/* your app */}
    </DatadogAppProvider>
  );
}
```

No other code changes are required. Any `history.pushState`, `history.replaceState`, or hash navigation in the app mirrors into the host page's URL automatically.

To turn off deep links, pass the `datadog.deep-links` module to `disabledModules`:

```tsx
<DatadogAppProvider disabledModules={['datadog.deep-links']}>
  {/* your app */}
</DatadogAppProvider>
```

<div class="alert alert-info">
Deep links capture only state stored in the app's URL. They do not capture React component state or data in local storage.
</div>

## Troubleshooting

### Authentication errors

For local development and uploads, OAuth authentication errors may have one of these causes:

- The OAuth browser flow did not complete.
- The cached OAuth token is invalid.
- `auth.site` does not match your Datadog site.

Rerun the command and complete the browser authorization flow.

If you use API and application key authentication, authentication errors usually point to missing or invalid credentials. Backend function call failures can have the same cause. Verify that `DD_API_KEY` and `DD_APP_KEY` are set, and that the application key has [Actions API Access][7] enabled.

### Build succeeds but nothing uploads

Make sure you ran `npm run upload` (not `npm run build`), and that `dryRun` in `vite.config.ts` is not set to `true`.

### Node.js version errors during scaffolding

The scaffolding tool requires Node.js 20.12.0 or later. If you see errors even on a supported version, upgrade to v22. Use a version manager such as [nvm][22], [Volta][23], or [fnm][24], or download from the [Node.js website][25].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: /bits_ai/bits_code/
[3]: https://app.datadoghq.com/integrations/github
[4]: /bits_ai/bits_code/setup/
[5]: /account_management/api-app-keys/
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: /account_management/api-app-keys/#actions-api-access
[8]: https://cli.github.com/
[9]: https://github.com/datadog-labs/agent-skills/tree/main/dd-apps/datadog-app
[10]: https://github.com/datadog-labs/agent-skills/blob/main/README.md
[11]: https://github.com/vercel-labs/skills
[12]: /actions/connections/
[13]: https://github.com/DataDog/build-plugin
[14]: /actions/actions_catalog/
[15]: https://www.npmjs.com/package/@datadog/action-catalog
[16]: https://www.npmjs.com/package/@datadog/apps-backend
[17]: https://www.npmjs.com/package/@datadog/druids
[18]: https://github.com/DataDog/apps-github-action
[19]: /getting_started/site/
[20]: /actions/datadog_apps/embed_apps/
[21]: https://www.npmjs.com/package/@datadog/apps-frontend
[22]: https://github.com/nvm-sh/nvm
[23]: https://volta.sh
[24]: https://github.com/Schniz/fnm
[25]: https://nodejs.org

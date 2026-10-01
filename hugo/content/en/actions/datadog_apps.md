---
title: Apps
description: Build and deploy custom Apps locally using a code-based development workflow with React, backend functions, and a CLI.
aliases:
- /internal_developer_portal/plugins/
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
- link: "/actions/datadog_apps/embed_apps/"
  tag: "Documentation"
  text: "Embed Apps"
- link: "/actions/app_builder/embedded_apps/"
  tag: "Documentation"
  text: "Embed App Builder Apps"
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

- **Node.js 20.19.0 or later in the Node.js 20 release line, or Node.js 22.13.0 or later**. Check the generated `package.json` `engines.node` field for the versions supported by the scaffold. Check your installed version:
  ```shell
  node --version
  ```
- Access to an organization with Datadog Apps enabled and permission to create and publish apps. See [App permissions][14].
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
2. Follow the interactive prompts to configure the app name and template, then change into the generated project directory. The scaffold installs dependencies and initializes a Git repository.

To scaffold a React and TypeScript app without interactive prompts:

```shell
npm create @datadog/apps@latest -- my-app --template vite-react --name "My App" --yes
cd my-app
```

### Generated app structure

| File or directory | Description |
|---|---|
| `datadog-app.config.json` | Permanent app identifier, Datadog site, name, and description |
| `src/main.tsx` | React entry point with `DatadogAppProvider`, React Query, and the Druids theme environment |
| `src/App.tsx` | Main React UI component |
| `src/**/*.backend.ts` | Server-side functions, imported by frontend code as asynchronous calls |
| `vite.config.ts` | Build configuration with [`@datadog/vite-plugin`][9] pre-configured |
| `package.json` | Supported Node.js versions, dependencies, and development and deployment scripts |
| `AGENTS.md` and `docs/agents/` | Agent instructions and guides for backend functions, authentication, uploads, data access, and embedding |
| `dist/datadog-app-assets.zip` | Generated app package from a local production build |

Keep `id` in `datadog-app.config.json` unchanged. It is the app's permanent identifier, distinct from its App Builder UUID. Subsequent uploads update the app associated with that identifier; changing it creates a different app.

Set `datadogSite` to the [Datadog site][15] containing the target organization. For example:

```json
{
  "datadogSite": "datadoghq.eu"
}
```

Keep the providers in `src/main.tsx` when restructuring the app. `DatadogAppProvider` supports communication with the host and shared URL state. `DruidsEnvironmentWithThemeInput` follows the Datadog theme. For details, see [Embed Apps][25].

## Use the `datadog-app` skill

The [`datadog-app` agent skill][20] guides AI coding agents through scaffolding, development, deployment, and troubleshooting. It also covers DDSQL and Action Catalog usage. The skill is available in the [agent-skills GitHub repository][21].

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
- `Add a table component to this Datadog App using Druids.`

## Develop your app locally

1. Start the development server:
   ```shell
   npm run dev
   ```
2. Open the URL shown in the terminal (for example, `http://localhost:5173/`) to preview your app.

The generated scripts use the Datadog Apps CLI. It resolves credentials before starting the development server and uses OAuth by default. In an interactive terminal, the CLI opens a browser authorization flow when no usable session is saved. It refreshes saved sessions when needed. In a non-interactive environment, first log in from an interactive terminal or use API and application keys.

### Authentication and organization selection

Inspect saved OAuth sessions and their organization UUIDs:

```shell
npm run cli -- auth status
```

To log in explicitly or select a saved organization for development:

```shell
npm run cli -- auth login
npm run dev -- --org <ORG_UUID>
```

If multiple organizations are saved for a site, select one with `--org` or set the default:

```shell
npm run cli -- auth default --org <ORG_UUID>
```

The CLI stores OAuth sessions in `credentials.json` in its configuration directory. The default is `~/.config/datadog-apps`; see [Environment variables](#environment-variables) for overrides. Treat this file as a secret and exclude it from source control. To revoke and clear one saved session, run:

```shell
npm run cli -- auth logout --org <ORG_UUID>
```

For API-key authentication, export both keys in the shell before running a CLI command:

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APPLICATION_KEY>"
```

A complete key pair takes precedence over saved OAuth sessions. The keys determine the organization; `--org` does not redirect them to a different organization. If only one key is set, the CLI ignores the incomplete pair and uses OAuth. The CLI reads the process environment, so use exported variables rather than relying on `.env.local` for authentication.

### Backend functions

Files matching `*.backend.ts` or `*.backend.js` contain named asynchronous backend functions. The frontend imports and calls them like standard ES modules; the Datadog Vite plugin rewrites those imports into backend calls.

With `npm run dev`, backend functions execute in the local Node.js process. With cloud verification or a deployed app, they execute in the Datadog-managed runtime. Pass only serializable arguments and results. Keep credentials and privileged operations in backend functions, and validate frontend inputs before using them.

Use Action Catalog actions for supported integrations. For external HTTP requests, use the generic HTTP action from `@datadog/action-catalog/http/http`. Direct `fetch`, Node.js networking, and subprocess access are not supported in backend functions. Configure [connections][8] when an action requires them.

Backend functions can call any action in Datadog's [Action Catalog][4] through the [Action Catalog client library][10]. The Action Catalog provides reusable, prebuilt actions for interacting with cloud providers, SaaS tools, and the Datadog API. You can build on top of existing integrations instead of writing API clients from scratch.

The library provides typed clients for cloud providers, the Datadog API, and SaaS integrations. Examples include AWS, Azure, GCP, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic, and generic HTTP. Importing actions from `@datadog/action-catalog` gives you typed inputs and responses for each action.

Use the [Apps backend helper library][24] for backend utilities. Use utilities to help with common actions such as retrieving the invoking user's information.

```typescript
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
import { useQuery } from '@tanstack/react-query';
import { getHosts } from './listHosts.backend';

function App() {
    const hosts = useQuery({
        queryKey: ['hosts'],
        queryFn: () => getHosts(),
    });

    if (hosts.isLoading) return <p>Loading hosts…</p>;
    if (hosts.isError) return <p>Unable to load hosts.</p>;

    return <p>Monitoring {hosts.data?.host_list?.length ?? 0} hosts</p>;
}

export default App;
```

Wrap backend proxies when passing them to React Query: use `queryFn: () => getHosts()`, not `queryFn: getHosts`. React Query passes a context object containing an `AbortSignal` to its callback, which cannot cross the backend bridge.
{{% /collapse-content %}}

### UI components

Use [`@datadog/druids`][23] to build your app's UI with the same React components used across Datadog products, such as tables, buttons, charts, and forms. Building with Druids helps your app match the look and feel of the rest of Datadog.

The React scaffold includes Druids. To add it to another app:
```shell
npm install @datadog/druids
```

Import components from their public entry points:
```tsx
import { Button } from '@datadog/druids/form/Button';
```

Inspect the installed package's `exports` map and TypeScript definitions for available entry points and component props. Druids requires React 18 or 19 as a peer dependency. For the set of available components, see the [package on npm][23].

<div class="alert alert-info">
Druids components are for use in Datadog Apps and App Builder only. See the package's license for details.
</div>

### Persistent app data

Use a [Datadog data store][26] for durable task records or other shared app data. Provision the data store and keep its ID in app configuration. Read and write records through backend functions. Inspect the installed `@datadog/action-catalog` exports and types before choosing data store actions. Bound list queries and handle pagination. Browser storage is scoped to the app's origin and can behave differently in embedded contexts; see [Embed Apps][25].

## Build and upload your app

Validate the app before deployment:

```shell
npm run typecheck
npm run lint
npm run build
```

`npm run build` creates a local production build and app package without uploading or publishing it. It does not require Datadog credentials.

For apps with backend functions, exercise the cloud runtime before publishing:

```shell
npm run dev:verify
```

This routes backend calls through the Datadog cloud execution path. Exercise the app's loading, empty, error, and mutation states. The equivalent CLI command is `npm run cli -- dev --verify`.

To build, upload, and **publish the app live**, run:

```shell
npm run upload
```

The generated `upload` script runs `datadog-apps upload`. The CLI builds an app package, uploads it, and publishes the selected version. In an interactive terminal, it offers a cloud-verification check before deployment. Non-interactive uploads skip that prompt; run cloud verification separately.

To target a saved OAuth organization and label the version:

```shell
npm run upload -- --org <ORG_UUID> --version-name <VERSION_NAME>
```

Use a unique version name for each upload. A successful upload prints `Published version <VERSION_NAME> live.` and an App Builder URL. Open that URL to confirm the app loads and the expected version is live.

### Command reference

Run these commands from the generated project directory. Use `npm run cli -- <COMMAND> --help` to inspect options for the installed CLI version.

| Command | Purpose |
|---|---|
| `npm run dev` | Start local development with resolved credentials |
| `npm run dev:verify` | Start development with backend calls routed through the cloud runtime |
| `npm run typecheck` | Check TypeScript without emitting files or requiring credentials |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Build locally without uploading or publishing |
| `npm run upload` | Build, upload, and publish live |
| `npm run cli -- auth login` | Authorize an OAuth session in an interactive terminal |
| `npm run cli -- auth status` | Inspect saved sessions, organization UUIDs, and expiration status |
| `npm run cli -- auth default --org <ORG_UUID>` | Select the default OAuth organization for its site |
| `npm run cli -- auth logout --org <ORG_UUID>` | Revoke and clear one saved OAuth session |

For `dev` and `upload`, pass `--org <ORG_UUID>` to select a saved OAuth organization or `--site <DATADOG_SITE>` to select a site. Pass flags through npm with `--`, as in `npm run upload -- --site datadoghq.eu`.

### Environment variables

This reference applies to the generated CLI-based workflow. CLI site selection uses an explicit `--site`, then the site environment variable, then `datadogSite` in `datadog-app.config.json`. When `--org` selects a saved organization and `--site` is omitted, the CLI derives the site from that session. For supported aliases with conflicting values, the CLI gives the `DATADOG_`-prefixed value precedence.

| Variable | Purpose and default |
|---|---|
| `DD_API_KEY` / `DATADOG_API_KEY` | API key. Used with the application key to select API-key authentication. The generated Vite configuration also enables API-key-backed build metrics and Error Tracking sourcemap uploads when both keys are present. |
| `DD_APP_KEY` / `DATADOG_APP_KEY` | Application key. Requires a complete key pair and the permissions needed for the requested actions and app deployment. |
| `DD_SITE` / `DATADOG_SITE` | Datadog site for CLI authentication and deployment. Defaults to the app configuration when no flag or environment override is present. |
| `DD_APPS_VERSION_NAME` / `DATADOG_APPS_VERSION_NAME` | Unique uploaded version label. `--version-name` takes precedence. If unset, Datadog assigns a label. |
| `DD_APPS_CONFIG_DIR` / `DATADOG_APPS_CONFIG_DIR` | Directory containing CLI configuration and `credentials.json`. If unset, uses `$XDG_CONFIG_HOME/datadog-apps` when `XDG_CONFIG_HOME` is absolute, otherwise `~/.config/datadog-apps`. |
| `DD_OAUTH_ACCESS_TOKEN` | OAuth credential supplied by the CLI to the dev server. Let the CLI manage it rather than extracting or storing tokens in app code. |

The CLI does not use `DD_APPS_UPLOAD_ASSETS` or `DD_APPS_AUTH_METHOD` to select upload behavior or authentication. For a generated project, use its npm scripts, CLI flags, and complete key pair or saved OAuth session.

For production deployments, [set up CI/CD with GitHub Actions](#set-up-cicd-with-github-actions). [`DataDog/apps-github-action`][11] handles deployment.

## Publish and manage your apps

The CLI publishes the uploaded version live. The app appears in the [App Builder app list][12]. From App Builder:

- Confirm the published version and test the app.
- [Edit the app name and description][13].
- Manage [permissions][14].
- [Embed the app][25] in supported Datadog surfaces.

Validate code changes before deploying them. Run `npm run upload` again with the same permanent app identifier.

<div class="alert alert-danger">
The following App Builder features are not available for locally-built apps:
<ul>
<li>UI editing with drag-and-drop components</li>
<li>Variables, events, and expressions managed in the App Builder UI</li>
</ul>
To change an app's UI or logic, update the code in your local project and re-upload.
</div>

## Set up CI/CD with GitHub Actions

To automatically upload your app on every push to the `main` branch, use the [`DataDog/apps-github-action`][11] GitHub Action. This action builds, uploads, and publishes the app through the Datadog Apps CLI.

CI/CD uploads require API and application key authentication. Create a Datadog API key and an application key with [Actions API Access][5] enabled, then store them as GitHub secrets.

The application key also needs permission to create, update, and publish the app. See [App permissions][14].

For non-US1 organizations, set `datadogSite` in `datadog-app.config.json` to the [Datadog site][15]. Alternatively, set the action's `datadog-site` input. Keep CI and local deployment settings aligned.

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
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: "22.22.2"

      - name: Deploy
        uses: DataDog/apps-github-action@v0.1.1
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## Troubleshooting

### Node.js version errors during scaffolding

Check `node --version` and the generated `package.json` `engines.node` field. Node.js 20.12 does not satisfy the React scaffold's requirement. Errors such as `ERR_INVALID_ARG_VALUE` from `node:util.styleText` can occur before the scaffold prompts appear. Switch to Node.js 20.19 or later in the Node.js 20 release line, or Node.js 22.13 or later. Use a version manager such as [nvm][16], [Volta][17], or [fnm][18], or download from the [Node.js website][19].

### Authentication errors

Run `npm run cli -- auth status` to inspect the saved site, organization, and session status. An expired access token can still have a refresh token; the CLI attempts to refresh it when a command needs credentials.

If refresh fails, run `npm run cli -- auth login` in an interactive terminal and complete the browser flow. If login cannot run in a non-interactive environment, authorize a session interactively first or export a complete API/application-key pair.

For key-based authentication, check that both keys are exported, belong to the target organization and site. Confirm the application key has [Actions API Access][5] enabled. Never put keys in frontend code.

### Permission errors

A `403` response can indicate missing app permissions or access to a connection or data store. Check the permission required by the operation: executing a backend action and creating or publishing an app require different access. See [App permissions][14] and [Connections][8]. Enabling Actions API Access alone does not grant every app permission.

### Wrong organization or site

Check `npm run cli -- auth status`, `datadogSite` in `datadog-app.config.json`, and site environment overrides. With OAuth, select the intended organization with `--org <ORG_UUID>`. With API keys, the key pair determines the organization even when OAuth sessions are saved.

### Build succeeds but the expected version is not live

Run `npm run upload`, then check the publication message and App Builder URL. `npm run build` only creates a local package. Confirm the target organization, permanent app identifier, and version label. For an older plugin-based upload configuration, also check that `dryRun` is not enabled.

If an upload creates a duplicate app, compare `id` in `datadog-app.config.json` with the original project's identifier. Do not replace it with the App Builder UUID.

### Backend function works locally but fails in Datadog

Run `npm run dev:verify` and reproduce the failing operation. Check that outbound requests use Action Catalog actions. Confirm required connections and data store IDs exist in the target organization. Validate inputs in the backend function. Check that arguments and results can cross the backend bridge. When using React Query, wrap backend calls in a callback instead of passing the proxy directly as `queryFn`.

### Druids imports or component props fail

Use a public subpath such as `@datadog/druids/form/Button`. Inspect the installed package's `exports` map and TypeScript definitions for the version in the project. Keep the Druids styles and theme environment in `src/main.tsx`.

### App works standalone but fails when embedded

Check the root provider hierarchy, host input availability, iframe restrictions, and layout at the embedded size. Store shareable filters and routes in the URL. See [Embed Apps][25] for theme, host context, and shared-state troubleshooting.

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
[22]: https://github.com/vercel-labs/skills
[23]: https://www.npmjs.com/package/@datadog/druids
[24]: https://www.npmjs.com/package/@datadog/apps-backend

[25]: /actions/datadog_apps/embed_apps/
[26]: /actions/datastores/

---
title: Plugins
further_reading:
- link: "/internal_developer_portal/software_catalog/"
  tag: "Documentation"
  text: "Learn about the Software Catalog"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Explore available Datadog Actions"
  
---

{{< callout url="https://forms.gle/nyNVPmjQqEKdJwre9" d_target="#signupModal" btn_hidden="false" header="Join the Preview for Plugins!" >}}
{{< /callout >}}

## Overview

Plugins let developers build, deploy, and manage fully custom applications natively within Datadog using local development workflows and the Datadog CLI.  

Plugins introduces a local, code-first development model within Datadog, building on [App Builder][1] concepts to support platform engineers and developers who prefer working with code instead of visual editors.

A plugin combines a React-based frontend, serverless backend functions, and Datadog-managed infrastructure, including Datastore, secret management, and telemetry.

## Developer workflow

Develop and deploy plugins directly from your local environment using the Datadog CLI.

### 1. Install the CLI

```bash
npm install -g @Datadog/dd-app-cli
```

### 2. Scaffold a plugin

```bash
dd-app create --agent=claude my-plugin
```

This command generates the following project structure:

```text
/frontend   → React components
/backend    → Serverless functions (Node.js handlers)
package.json
AGENT.md    → AI agent guidance and structure
config.json → Plugin metadata and UUID
```

### 3. Develop locally

```bash
dd-app dev
```

Output:

```text
➜ Local: http://localhost:3000/
```

This command starts a local development server with live preview. Frontend updates hot-reload automatically, and backend logic runs locally for fast iteration.

### 4. Deploy to Datadog

```bash
dd-app deploy
```

Authenticate through your browser and publish your plugin:

```text
https://app.datadoghq.com/app-builder/apps/65afc2dc-60de-455b-8d32-64950504fbec
```

Plugins are automatically instrumented with telemetry and can appear anywhere Datadog supports App Builder apps, such as dashboards, notebooks, and the Internal Developer Portal.

## Key features

- **End-to-end development flow**: Build multi-folder React apps locally using CLI commands, AI agents, and Datadog SDKs.
- **Full-stack capabilities**: Combine frontend (React) and backend (serverless) logic using Datadog Actions, including private actions and Lambda-style handlers.
- **Datadog integrations**: Use Datastore, Connections, and RBAC for secure and seamless data and secret management.
- **Preview and publish**: Use `dd-app preview` for local testing and `dd-app publish` for one-click deployment to Datadog.
- **AI assistance**: AI agents in `AGENT.md` provide inline code generation, scaffolding, and refactoring guidance.
- **Collaboration and GitOps**: Integrate with GitHub Sync for pull requests, code reviews, and automated deployments.
- **Security and observability**: All plugins include built-in telemetry, error monitoring, and code security scanning.
- **Platform embedding**: Embed plugins across Datadog surfaces, such as entity pages, self-service actions, homepages, or custom pages.
- **Consistent UI**: Use **Druids**, Datadog's UI component library, to ensure a unified design and experience.

## Permissions

Plugins inherit the [App Builder permissions][2] model:

- Plugins execute as the **creator**, requiring **resolve** permissions on any connections used.
- App-level permissions control who can deploy or modify a plugin.
- Connectionless Datadog actions run with the app creator's credentials.

## Architecture

The plugin framework provides an opinionated scaffold optimized for the Datadog ecosystem.

### Frontend

- Built with React and Druids components.
- Automatically instrumented with RUM and error tracking.

### Backend

- Lightweight serverless functions triggered by Datadog Actions.
- Written in TypeScript using the `@Datadog/actions` SDK.

```typescript
// backend/getRecentPRs.ts
import * as actions from '@Datadog/actions';
import * as CONNECTIONS from './connections';

export async function getRecentPRs() {
  const results = await actions.github.listPullRequests({
    connectionId: CONNECTIONS.githubConnectionId,
  });
  return results.filter();
}
```

### Frontend usage

```tsx
// frontend/Root.tsx
import { useBackendQuery } from '@Datadog/react-action-query';

export default function Root() {
  const results = useBackendQuery('getRecentPRs');
  if (results.isLoading) return 'Loading...';
  return <Table data={results.data} />;
}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder/
[2]: /actions/app_builder/access_and_auth/#app-permissions
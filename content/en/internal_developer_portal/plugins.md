---
title: Plugins
aliases:
  - /internal_developer_portal/plugins
further_reading:
- link: "/internal_developer_portal/software_catalog/"
  tag: "Documentation"
  text: "Learn about the Software Catalog"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Explore available Datadog Actions"
  
---

## Overview

**Plugins** enable developers to build, deploy, and manage fully custom React applications natively within Datadog using the CLI and local development workflows.  
This evolution of App Builder introduces a **local development model** optimized for **platform engineers** and **technical users** who prefer building with code instead of visual editors.

Plugins combine a **React-based frontend**, **serverless backend functions**, and **Datadog-managed infrastructure**—including Datastore, secret management, and telemetry—all accessible through the Datadog CLI.

{{< callout url="https://forms.gle/nyNVPmjQqEKdJwre9" header="Join the Plugins Beta" >}}
Be among the first to build locally with Datadog’s plugin development experience.
{{< /callout >}}

---

## Developer Workflow

Developers can build and deploy plugins entirely from their local environment using the Datadog CLI.

### 1. Install the CLI

```bash
npm install -g @Datadog/dd-app-cli
```

### 2. Scaffold a New Plugin

```bash
dd-app create --agent=claude my-plugin
```

Generates a complete project structure:

```text
/frontend   → React components
/backend    → Serverless functions (Node.js handlers)
package.json
AGENT.md    → AI agent guidance and structure
config.json → Plugin metadata and UUID
```

### 3. Develop Locally

```bash
dd-app dev
```

Output:

```text
➜ Local: http://localhost:3000/
```

Runs a local development server with live preview. Frontend changes hot-reload instantly, and backend logic executes locally for rapid iteration.

### 4. Deploy to Datadog

```bash
dd-app deploy
```

Authenticate via browser and publish the plugin:

```text
https://app.datadoghq.com/app-builder/apps/65afc2dc-60de-455b-8d32-64950504fbec
```

Plugins are automatically instrumented with telemetry and can appear in any Datadog surface that supports App Builder apps, such as dashboards, notebooks, or the Internal Developer Portal.

---

## Key Features

- **Plugin Development Flow:** Build multi-folder React apps locally using CLI commands, AI agents, and Datadog SDKs.
- **Full-Stack Capabilities:** Support both **frontend** (React) and **backend** (serverless functions) logic using Datadog Actions—including private actions and Lambda-like handlers.
- **Datadog Integrations:** Leverage Datastore, Connections, and RBAC for secure and seamless data and secret management.
- **Preview and Publish:** Use `dd-app preview` for local testing, and `dd-app publish` for one-click deployment to Datadog.
- **AI Assistance:** AI coding agents provide inline code generation, scaffolding, and refactoring guidance through `AGENT.md`.
- **Collaboration and GitOps:** Integrate with GitHub Sync for pull request workflows, code reviews, and auto-deployment on merge.
- **Security and Observability:** All plugins are instrumented for telemetry, error monitoring, and code security scanning.
- **Platform Embedding:** Embed plugins throughout the Datadog platform — on entity pages, self-service actions, home, or custom pages.
- **Datadog UI Consistency:** Use **Druids**, Datadog’s UI component library, to ensure visual and interaction consistency across all apps.


---

## Permissions

Plugins inherit the App Builder permissions model:

- Plugins execute as the **creator**, requiring **resolve** permissions on any connections used.
- App-level permissions control who can deploy or modify a plugin.
- Connectionless Datadog actions run with the app creator’s credentials.

---

## Architecture

The plugin framework provides an opinionated scaffold optimized for Datadog’s ecosystem.

### Frontend

- Built with React and Druids components.
- Automatically instrumented with RUM and error tracking.

### Backend

- Lightweight **serverless functions** triggered via Datadog Actions.
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

### Frontend Usage

```tsx
// frontend/Root.tsx
import { useBackendQuery } from '@Datadog/react-action-query';

export default function Root() {
  const results = useBackendQuery('getRecentPRs');
  if (results.isLoading) return 'Loading...';
  return <Table data={results.data} />;
}
```
 

---

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

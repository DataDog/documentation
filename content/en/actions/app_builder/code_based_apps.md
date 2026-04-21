---
title: Build Code-Based Apps
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

Code-based apps let you build Datadog apps locally as code, using a standard frontend development workflow. Unlike the [drag-and-drop App Builder][1], code-based apps give you full control over your app's UI and logic with React and TypeScript (or JavaScript).

Code-based apps use the same permissions model as drag-and-drop apps and can be [embedded in dashboards][2] in the same way. After you publish a code-based app, it appears in your [App Builder][1] app list alongside your other apps.

## Prerequisites
<!-- [TO CONFIRM, the internal guide uses older than v20.12.0, but troubleshooting says older than v22] -->
- **Node.js version 22 or later**. If your version is older, upgrade Node.js using a version manager such as [nvm][3], [Volta][6], or [fnm][7], or download it from [nodejs.org][8]. Check your version:
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

2. Follow the interactive prompts to configure your app name and template. After scaffolding completes, install dependencies:

   ```shell
   cd <APP_NAME>
   npm install
   ```

### App structure

The scaffolded project includes:

| File or directory | Description |
|---|---|
| `src/App.tsx` | Root UI component (React) |
| `src/*.backend.ts` | Backend functions that run server-side with access to API keys |
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

Files matching `*.backend.ts` (or `.js`, `.tsx`, `.jsx`) contain backend functions. These run server-side with access to your API keys and are never shipped to the browser. The frontend imports and calls them like standard ES modules.

{{% collapse-content title="Example backend function" level="h4" expanded=false %}}

Create a backend function:

**src/greet.backend.ts**
```typescript
export async function greet(name: string) {
    return { message: `Hello, ${name}!` };
}
```

Then call it from your app's existing `App.tsx`:

**src/App.tsx**
```tsx
import { useState, useEffect } from 'react';
import { greet } from './greet.backend';

function App() {
    const [message, setMessage] = useState('Your Datadog App is ready!');

    useEffect(() => {
        greet('World').then((result) => setMessage(result.message));
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to my-app</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;
```
{{% /collapse-content %}}

## Publish your app

Run a production build to upload your app to Datadog:

<!-- [TO CONFIRM, is it just npm run build or do you need to set the environment variable] -->

```shell
DD_APPS_UPLOAD_ASSETS=1 npm run build
```
<!-- [TO CONFIRM, is this part of the instructions or just the skill?] -->
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

You can automatically deploy your app on every push to the `main` branch with GitHub Actions.

**Note**: This workflow uses [`dd-sts`][9] to provision temporary Datadog API and Application keys through GitHub OIDC token federation, so no long-lived secrets are stored in the repository.

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
      - name: Get Datadog Credentials
        id: dd-sts
        uses: DataDog/dd-sts-action@2e8187910199bd93129520183c093e19aa585c75
        with:
          policy: datadog-apps-deploy

      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6

      - name: Deploy
        uses: DataDog/apps-github-action@v0.0.1
        with:
          datadog-api-key: ${{ steps.dd-sts.outputs.api_key }}
          datadog-app-key: ${{ steps.dd-sts.outputs.app_key }}
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
[9]: https://github.com/DataDog/dd-sts-action

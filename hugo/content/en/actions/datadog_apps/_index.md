---
title: Apps
description: Build and deploy custom Apps as code with React and backend functions, using Bits AI in App Builder, an AI coding agent, or the CLI.
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
- link: "/actions/app_builder/embedded_apps/"
  tag: "Documentation"
  text: "Embed App Builder Apps"
- link: "/actions/app_builder/access_and_auth/"
  tag: "Documentation"
  text: "Access and Authentication"
---

## Overview

With Apps, you build applications as code with React and TypeScript (or JavaScript). You can build an app in App Builder with Bits AI, or locally with your standard development workflow. You can embed published apps in other Datadog products, such as [dashboards and the Internal Developer Portal][3].

Apps use the same [permissions model][1] as [App Builder apps][2]. However, you can't edit these apps in the Classic drag-and-drop editor or convert them to Classic apps. To change an app, prompt Bits Code again or edit the code in your repository.

Choose Apps when you need:

- **Team collaboration**: Multiple engineers contributing to the same app, with code review and version history through your existing source control.
- **Source control and CI/CD**: Store your app in GitHub and deploy automatically on merge.
- **AI-assisted development**: Prompt Bits AI in App Builder, or use your preferred local tooling (such as Cursor, GitHub Copilot, or Claude) to generate and refine code.
- **Custom cloud providers and APIs**: Integrate with services beyond the [Action Catalog][4] using your own backend code.
- **Complex UI and logic**: Full React and TypeScript control over components, state, and rendering.

## Choose a workflow

You can build an app in one of three ways:

| Workflow | Where you build | How it works |
|---|---|---|
| [Build with Bits AI][5] | App Builder | Describe your app in Datadog. Bits Code writes the code and opens a pull request in your GitHub repository. No local development environment required. |
| [Build with an AI agent][6] | Your local environment | Install the `datadog-app` skill in your coding agent, then prompt the agent to scaffold, develop, and upload your app. |
| [Build with the CLI][7] | Your local environment | Run the scaffolding, development, and upload commands yourself. |

All three workflows produce the same kind of app. After you upload or publish an app, you manage it the same way. See [Publish and manage your apps](#publish-and-manage-your-apps).

**Note**: In the [App list][8], the **New App** menu also includes **Build with Classic**, which creates a drag-and-drop [App Builder app][2] instead of a code-based app.

## Publish and manage your apps

After you upload an app, it appears in your [App list][8]. From the App list, you can:

- [Publish your app][9]
- [Edit the app name and description][9]
- Manage [permissions][10]
- [Embed the app][3] in dashboards, notebooks, and the Internal Developer Portal

<div class="alert alert-danger">
The following features are not available for Datadog Apps, including apps built with Bits AI:
<ul>
<li>UI editing with drag-and-drop components</li>
<li>Variables, events, and expressions managed in the App Builder UI</li>
</ul>
To change an app's UI or logic, update its code and re-upload, or prompt Bits Code and merge the pull request.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/app_builder/access_and_auth/
[2]: /actions/app_builder/
[3]: /actions/datadog_apps/embed_apps/
[4]: /actions/actions_catalog/
[5]: /actions/datadog_apps/build/#build-an-app-with-bits-ai
[6]: /actions/datadog_apps/build/#build-an-app-with-an-ai-agent
[7]: /actions/datadog_apps/build/#build-an-app-with-the-cli
[8]: https://app.datadoghq.com/app-builder/apps/list
[9]: /actions/app_builder/build/#customize-your-app
[10]: /actions/app_builder/access_and_auth/#app-permissions

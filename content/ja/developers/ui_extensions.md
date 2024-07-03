---
aliases:
- /ja/developers/datadog_apps/
dependencies:
- https://github.com/DataDog/apps/blob/master/docs/en/getting-started.md
further_reading:
- link: https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md
  tag: Github
  text: Design Guidelines
- link: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
  tag: Github
  text: Programming Model
kind: documentation
title: Datadog UI Extensions
---
## What is a UI Extension?

UI Extensions enable developers to extend the native functionality of Datadog through custom dashboard widgets. For example, if there is a data visualization you want that Datadog does not support, or a common remediation workflow you execute in a third-party platform, you could write a UI Extension to extend this functionality within Datadog.

## セットアップ

### Set up your local development environment

1. Create a Datadog app for your UI Extension:
   ```
   yarn create @datadog/app
   ```

1. Navigate to the folder you have created:
   ```
   cd starter-kit
   ```

1. Set up your development environment:
   ```
   yarn start
   ```

This starts your local development server on `http://localhost:3000/`.

If you see the following message, your application is running:

<img style="max-width:70%" alt="The application controller is running in the background" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

Note that there are two pages:
- `http://localhost:3000`: A main controller that orchestrates all of your different extensions (such as widgets, menus, or modals). It will come in handy as you enrich app functionality.
- `http://localhost:3000/widget`: Components for widgets, modals, or anything that needs a dedicated display.

See the [Developer Platform Developer Guide][3] for details about this architecture.

<div class="alert alert-info">
You may notice an uncaught <strong>HandshakeTimeoutError</strong> in your JavaScript Console when you interact with the local widget in your browser directly. This is expected. The Datadog Apps SDK is <a href="https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md">designed</a> to run in an iframe that connects to the Datadog User Interface and the handshake attempt between the widget and the Datadog UI will timeout when there is no Datadog UI for the SDK has to communicate with.
</div>

### Add your app to the Developer Platform

1. Navigate to [**Integrations** > **Developer Platform**][4] and click **+ New App**.
   <img style="max-width:80%" alt="Add a new app to the developer platform" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

1. Enter a unique name for your application.

1. Optionally, once you're presented with the dashboard for your new application, you can change the app name, give the app a more detailed description, or change its icon.
   <img style="max-width:80%" alt="Edit app information from the app dashboard" src="https://user-images.githubusercontent.com/17037651/163401812-d21a9d3a-e73f-49b0-bda4-e7c447295784.png">


### Add your app to a dashboard

1. Before you can add your app to a dashboard, you must enable it by clicking on **UI Extensions**.
   <img style="max-width:80%" alt="App Edit Enable UI Extensions" src="https://user-images.githubusercontent.com/17037651/163401958-153f6c80-d7ba-4b47-a40d-1cf08913602d.png">

   Once this view loads, click on the **Enable UI Extensions** button.

1. Once you're presented with more options for your app, change the **Root URL** and **Debug Mode Root URL** to match the `localhost` version of the widget you're running. The main controller path is `/widget`. These URL values will change as you build your application and begin to host it on your own infrastructure.

1. Turn the toggle to **Dashboard Custom Widget** on. This generates JSON for the app.

   <img style="max-width:80%" alt="App Edit UI Extensions" src="https://user-images.githubusercontent.com/17037651/163402086-a3afbecd-c9c0-4608-bb91-6cb5391fec93.png">

   In this example, the JSON output contains a value called `Your first widget`. This is the name of your widget as it appears in the menu to add to your Dashboards.

1. Navigate to your dashboard and add a widget.

   <img style="max-width:80%" alt="Add widget to your Dashboard" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


1. The **Custom Widgets** section is at the bottom of the sidebar. Find your widget in the list and add it to your dashboard.

   <img style="max-width:80%" alt="Add your widget from the custom widgets section" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

1. A preview of your new widget appears, along with some options. Scroll down and click **Done** to add it to your dashboard.

   <img style="max-width:80%" alt="Click Done to add your widget to the dashboard" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

1. To build your application, run `yarn build` in your terminal. Then, move your static generated site to the hosting platform of your choice and update the URLs in the app settings.

### OAuth API Access

When OAuth API Access is enabled, users need to be authenticated before using the app. This feature allows you to integrate your existing authentication mechanism (for example, cookie-based username and password login) with the Developer Platform.

### Sample Applications

- [Starter kit][1]
- [Sentiment analysis][2]

## Further reading

- [Learn about the Datadog Developer Platform](https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/)
- [Learn about UI Extensions](https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md#oauth-api-access)

[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8
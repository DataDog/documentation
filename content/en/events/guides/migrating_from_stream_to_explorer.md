---
title: Migrating from the Events Stream to the Events Explorer
kind: documentation
---


## 1. Request beta access

<div class="alert alert-warning">
  The Events Explorer is in private beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a>. If you are looking for legacy events information, see the <a href="https://docs.datadoghq.com/events/stream/">Events Stream documentation</a>.</div>

Once you have the beta enabled, you have access to these new events features:
- Events Explorer
- Event Analytics
- Events to Metrics
- Events Pipelines
- Event as a new source in Dashboards widgets
- Event monitors v2

You can continue to access the Events Stream from the navigation menu alongside the new features:

{{< img src="events/guides/navigation.png" alt="This image shows the events explorer side by side with the events stream in the Datadog app navigation." >}}

## 2. Migrate existing event monitors and dashboard widgets

You can still edit your existing event monitors and widgets. However, new event monitors and widgets use the new event monitor query syntax. You also may want to migrate existing event stream, event timeline, or event overlay monitors and widgets. To migrate, you update the search query to match the new one. This can be done manually, or by using this script:

1. Create a list of your existing event monitors and dashboards that need to be migrated.
2. Create new event monitors with new query and facets based on your current monitor definitions.
3. Use this script to convert dashboard widgets and overlays with events queries to the new syntax:
    ```curl
    ADD SCRIPT HERE
    ```


If you use the API, Terraform or other 3rd party solution to manage your monitors, you need to manually update your script using the syntax described above.

**Note:** If you have SLOs based on event monitors, be sure to update their definitions to point to the newones.

## 4. Sunset legacy events

When your monitor and dashboards have been successfully migrated, Datadog automatically stops writing events to the previous intake, so sunset. The Events Stream will continue to be accessible to view your event history.

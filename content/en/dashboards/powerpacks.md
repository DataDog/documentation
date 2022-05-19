---
title: Powerpacks
kind: documentation
disable_toc: false
is_public: true
beta: true
is_beta: true
---

# What are Powerpacks?

Powerpacks are templated groups of widgets that take input variables. Like building blocks, they speed up dashboard creation while allowing authors to customize content and flexibly organize entire dashboards. Open the dashboard widget tray and click the “Powerpacks” tab to view available packs.

Powerpacks can be preset (created by Datadog) or custom (created by a user). 

  * **Preset Powerpacks** provide out-of-the-box views for common monitoring patterns like performance metrics or feature usage. They can be linked to a specific product or integration (like RUM Page Views) or generic (System Resource Utilization).
  * **Custom Powerpacks** can be created by anyone with dashboard write permissions to help users share and standardize internal best practices, like the best way to compare desktop vs. mobile usage of a feature.

# Create a Powerpack

## Saving a Group

To create a new Powerpack, click the \` \` icon on any existing group widget. Powerpack titles and descriptions are searchable; include a title and description that can help someone discover and use your Powerpack. 

{{< img src="dashboards/powerpack-save.png" alt="Image displaying the Datadog UI with Save as Powerpack shown" style="width:100%;" >}}

## Configuration Options

Configuration variables allow dashboard authors to scope your Powerpack to their specific dashboard and context. Decide which variables you want to set as configuration variables.

Configuration variables are determined by which template variables your pack is using. To add a new configuration variable, add a template variable to at least one graph in your group. 

You can then set the default value for this variable.

{{< img src="dashboards/powerpack-create.png" alt="Image displaying the Datadog UI with the Create Powerpack screen shown. Under Set Configuration Options the application.id template variable is switched on" style="width:100%;" >}}

# Find and Use Powerpacks

To find a Powerpack, search in the widget tray.

Click the Powerpack to add it to our dashboard, or drag it into the desired location.

Select values for any configuration options that are available. Use the live preview of the pack to ensure there is data that approximately matches what you expect. You can save configuration variables to the dashboard as template variables by checking the box on the far right.

{{< img src="dashboards/powerpack-variables.png" alt="Image displaying the Datadog UI with Save as Powerpack shown" style="width:100%;" >}}
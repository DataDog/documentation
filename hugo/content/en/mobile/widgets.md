---
title: Mobile Device Widgets
description: "Add Datadog widgets to your mobile home screen or lock screen for quick access to SLOs, incidents, dashboards, monitors, and on-call information."
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: "Blog"
  text: "Improve your on-call experience with Datadog mobile dashboard widgets"
---
The Datadog mobile app supports SLO, incident, dashboard, on-call, and monitor widgets on your device's home screen or lock screen. 

## Home screen widgets
Add widgets on your home screen to quickly access real-time critical information directly from your home screen without ever having to open the Datadog mobile app.

{{< tabs >}}
{{% tab "iOS" %}}
1. Long press on your home screen.
2. Tap {{< ui >}}Edit{{< /ui >}}, then tap the {{< ui >}}Add Widget{{< /ui >}} button on the top left corner of the screen.
2. Search for "Datadog" widgets.
3. Tap your desired widget and your preferred size (small, medium, or large).
4. Tap {{< ui >}}Add Widget{{< /ui >}} and configure the widget fields. When accessing the mobile app from the widget, these are the fields that will be queried in the app.
5. Drag, minimize, or expand the widget to customize the location and size of the widget on your home screen.

{{% /tab %}}
{{% tab "Android" %}}
1. Long press on your home screen.
2. Tap the {{< ui >}}Widgets{{< /ui >}} button on your home screen editor. If you have app shortcuts, it might appear as only an icon on the top right corner of the bubble.
3. Search for "Datadog" widgets.
4. Tap your desired widget and tap {{< ui >}}Add{{< /ui >}}.
4. Resize the widget to fit your preference.
5. Tap the widget to configure the widget fields. When accessing the mobile app from the widget, these are the fields that will be queried in the app.

{{% /tab %}}
{{< /tabs >}}

**Note**: Widgets refresh every 30 minutes. Manually trigger refresh by tapping on timeframe located at top left of the widget.

### Incident widgets
View your [open incidents][1] from your mobile home screen with Datadog widgets. To dive deeper into issues, tap any open incident displayed in the widget to have it open with more details in the Datadog mobile app.

Also, you can customize your Open Incidents widgets by filtering on:

- Organization
- Severity levels
- Customers impacted
- Ordering

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_incident_widget_may_2025.png" alt="Datadog incident mobile widget displayed on iOS devices" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press the widget to configure.
2. Tap {{< ui >}}Edit Widget{{< /ui >}}.
2. Tap {{< ui >}}Choose{{< /ui >}} next to the {{< ui >}}Organization{{< /ui >}} label to fetch open incidents from the selected organization.
3. Tap {{< ui >}}SEV-1 and SEV-2{{< /ui >}} next to the Severities label to specify severity filters.
4. Tap {{< ui >}}Both{{< /ui >}} next to the {{< ui >}}Customer Impacted{{< /ui >}} label to filter on open incidents that have impacted customers.
5. Type in the {{< ui >}}Type additional filters{{< /ui >}} text box to specify any further filtering.
6. Tap {{< ui >}}Ordering{{< /ui >}} to specify the order of how incidents are listed.
7. Tap outside of the widget to save your selection and exit the configuration screen.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_incidents_widget_may_2025.png" alt="Datadog incident mobile widget displayed on Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap the widget title to configure.
2. Tap {{< ui >}}Organization{{< /ui >}} to fetch open incidents from the selected organization.
3. Tap {{< ui >}}Severities{{< /ui >}} to specify severity filters.
4. Tap {{< ui >}}Customer impacted{{< /ui >}} to filter on open incidents that have impacted customers.
5. Tap {{< ui >}}Query{{< /ui >}} to specify any further filtering.
6. Tap {{< ui >}}Sorted by{{< /ui >}} to specify the order of how incidents are listed.
7. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}} to save your selection and exit the configuration screen.
8. Long press and resize the widget to fit your preference.

{{% /tab %}}
{{< /tabs >}}

#### Display open incidents from multiple organizations

You can display open incidents from multiple organizations on your mobile home screen.

{{< tabs >}}
{{% tab "iOS" %}}
- Tap {{< ui >}}Choose{{< /ui >}} next to the Organization label to fetch open incidents from the selected organization.


{{% /tab %}}
{{% tab "Android" %}}

1. Tap the widget title to configure.
2. From the configuration screen, tap {{< ui >}}Organization{{< /ui >}}.
3. Select a new organization (you may need to sign in).
4. Size the widget to fit your preference.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}}.


{{% /tab %}}
{{< /tabs >}}

### SLOs widget

View your [SLOs][2] from your mobile home screen with Datadog widgets. You can add any SLOs from your organization as a widget, along with a timeframe.

The timeframe options are:
- 7 days
- 30 days
- 90 days
- Previous week
- Previous month
- Week to date
- Month to date

You can also specify a dashboard that opens by default when you tap on an SLOs widget, allowing you to quickly investigate further into your metrics.

**Note**: If you do not specify a dashboard that opens by default, tapping an SLOs widget opens the Datadog app.

#### Edit an SLOs widget

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_slo_widget_may_2025.png" alt="Application Uptime SLO widgets displayed iOS devices" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap {{< ui >}}Edit Widget{{< /ui >}}.
3. Tap {{< ui >}}Choose{{< /ui >}} next to the SLO label to choose an SLO to track.
4. Depending on the SLO chosen, a {{< ui >}}Timeframe{{< /ui >}} label may appear. Tap {{< ui >}}Choose{{< /ui >}} next to the {{< ui >}}Timeframe{{< /ui >}} label to choose the SLO timeframe.
5. Tap {{< ui >}}Choose{{< /ui >}} next to the {{< ui >}}Dashboard to open{{< /ui >}} label to choose a dashboard that opens when the SLOs widget is tapped.
6. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_slo_widget_may_2025.png" alt="Application Uptime SLO widgets displayed on Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap the widget title to configure.
2. Tap {{< ui >}}Selected SLO{{< /ui >}} to choose an SLO to track.
3. Tap {{< ui >}}Selected Time Window{{< /ui >}} to choose the SLO timeframe.
4. Tap {{< ui >}}Dashboard to open{{< /ui >}} to choose a dashboard that opens when the SLOs widget is tapped.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}} to validate your selection and exit the configuration screen.
6. Long press and resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Display SLOs from multiple organizations

You can display SLOs from multiple organizations on your mobile home screen.

{{< tabs >}}
{{% tab "iOS" %}}

All organizations you've logged into are displayed in the configuration screen. If you do not see your organization, sign into it again.


{{% /tab %}}
{{% tab "Android" %}}

1. Tap the widget title to configure.
2. From the configuration screen, tap {{< ui >}}Organization{{< /ui >}}.
3. Select a new organization (you might need to sign in).
4. Size the widget to fit your preference.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}}.


{{% /tab %}}
{{< /tabs >}}

### Monitors widget

View your [monitors][3] from your home screen with Datadog widgets. Tap any cell to open the {{< ui >}}Monitor Search{{< /ui >}} screen in the app, with your monitors already filled in.

**Note**: If you do not have any monitor saved views, the widget shows you all monitors by default.

#### Edit a Monitors widget

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_monitor_widget_may_2025.png" alt="Configured monitor widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap on {{< ui >}}Edit Widget{{< /ui >}}.
3. Tap on the individual saved view cell to select and deselect.
4. Reorder the views by dragging and dropping each cell.
5. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_monitor_widget_may_2025.png" alt="Configured monitor widgets displayed on Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap on the widget title to configure.
2. Tap on {{< ui >}}Saved Views{{< /ui >}}.
3. Tap on the individual saved view cell to select and deselect.
4. Reorder the views by dragging and dropping each cell.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}} to validate your selection and exit the configuration screen.
6. Scroll inside the widget to see more saved views. Long press and resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Display Monitors from multiple organizations

You can display Monitors from multiple organizations within the same widget.

{{< tabs >}}
{{% tab "iOS" %}}

All organizations you are logged into are displayed in the configuration screen. If you do not see your organization, you may need to sign in again.


{{% /tab %}}
{{% tab "Android" %}}

1. Tap the widget title to configure.
2. From the configuration screen, tap {{< ui >}}Organization{{< /ui >}}.
3. Select a new organization (you might need to sign in).
4. Edit the widget to fit your preference.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

### Dashboard widget

View your [dashboard][4] from your home screen with Datadog widgets. Tap any cell to open the {{< ui >}}dashboard search{{< /ui >}} screen in the app, with your dashboard already loaded.

#### Edit a dashboard widget

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_dashboard_widget_may_2025.png" alt="Configured dashboard widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap on {{< ui >}}Edit Widget{{< /ui >}}.
3. From the configuration screen, tap {{< ui >}}Dashboard{{< /ui >}} and select a dashboard.
4. Tap {{< ui >}}Widget{{< /ui >}} to select a specific widget from the selected dashboard.
5. Select a {{< ui >}}Period{{< /ui >}} for the widget query.
6. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_dashboard_widget_may_2025.png" alt="Configured dashboard widgets displayed on Android" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap on the widget title to configure.
2. Tap on {{< ui >}}Saved Views{{< /ui >}}.
3. Tap on the individual saved view cell to select and deselect.
4. Reorder the views by dragging and dropping each cell.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}} to validate your selection and exit the configuration screen.
6. Scroll inside the widget to see more saved views. Long press and resize the widget to fit your preference.


{{% /tab %}}
{{< /tabs >}}

#### Display dashboards from multiple organizations

You can display dashboards from multiple organizations on your mobile home screen.

{{< tabs >}}
{{% tab "iOS" %}}

All organizations you've logged into are displayed in the configuration screen. If you do not see your organization, sign into it again.


{{% /tab %}}
{{% tab "Android" %}}

1. Tap the widget title to configure.
2. From the configuration screen, tap {{< ui >}}Organization{{< /ui >}}.
3. Select a new organization (you may need to sign in).
4. Size the widget to fit your preference.
5. Tap {{< ui >}}Save{{< /ui >}} or {{< ui >}}Apply{{< /ui >}}.
   
{{% /tab %}}
{{< /tabs >}}

### On-Call widget

View your On-Call shifts and On-Call pages on your mobile home screen with Datadog widgets.

You can customize your On-Call shifts widgets by filtering on:

- Organization
- Timeframe period

You can customize your On-Call pages widgets by filtering on:

- Organization
- Team
- Order

**Note**: You can add additional filters for the On-Call pages widget.

#### Edit an On-Call shift widget

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="Configured home screen on-call shift widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap {{< ui >}}Edit Widget{{< /ui >}} to bring up the configure screen.
3. Select the {{< ui >}}Organization{{< /ui >}} and {{< ui >}}Period{{< /ui >}} you would like to see your On-Call shifts.
4. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Configured home screen On-Call shift widgets displayed on Android screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap on the widget to configure.
2. Select the {{< ui >}}Organization{{< /ui >}} and {{< ui >}}Time Period{{< /ui >}} you would like to see your On-Call shifts.
3. Tap {{< ui >}}✓{{< /ui >}} to save the configuration.
4. Long press and resize the widget to fit your preference.

{{% /tab %}}
{{< /tabs >}}

#### Edit an On-Call pages widget

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_pages_widget_may_2025.png" alt="Configured home screen On-Call page widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap {{< ui >}}Edit Widget{{< /ui >}} to bring up the configure screen.
3. Select the {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}}, and {{< ui >}}Order{{< /ui >}} in which you would like to see On-Call pages.
4. Type in any additional filters and tap {{< ui >}}Done{{< /ui >}}.
5. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_pages_widget_may_2025.png" alt="Configured home screen on-call page widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap on the widget to configure.
2. Select the {{< ui >}}Organization{{< /ui >}}, {{< ui >}}Teams{{< /ui >}} and {{< ui >}}Sort by{{< /ui >}} in which you would like to see On-Call pages.
3. Tap to type in any {{< ui >}}Additional Filter{{< /ui >}} and tap {{< ui >}}Save{{< /ui >}}.
4. Tap {{< ui >}}✓{{< /ui >}} when done configurations
5. Long press and resize the widget to fit your preference.

{{% /tab %}}
{{< /tabs >}}


## Lock screen widgets
{{< img src="mobile/widgets/lockscreen_widget_may_2025.png" alt="Configured lock screen widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Lock screen widgets for On-Call, Monitors, SLOs, Incidents, and Dashboards are supported on iOS.

1. Long press on your lock screen.
2. Tap {{< ui >}}Customize{{< /ui >}}, then {{< ui >}}Lock Screen{{< /ui >}}.
3. Tap on the lock screen widget space to pull up the {{< ui >}}Add Widgets{{< /ui >}} card.
4. Scroll to and tap on the {{< ui >}}Datadog{{< /ui >}} app.
4. Tap the lock screen widget you would like to add.
5. Tap the widget on the lock screen to pull up the configuration panel.
6. Configure the widget according to the fields specified for the selected widget.
7. Drag, minimize, or expand the widget to customize the location and size of the widget on your lock screen.

**Note**: You must have an empty space on your lock screen to add a new widget. You can delete lock screen widget by tapping the {{< ui >}}-{{< /ui >}} button on top left of the widget you would like to delete.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/incident_management
[2]: /dashboards/widgets/slo/#setup
[3]: /monitors/
[4]: /dashboards/
[5]: /incident_response/on-call/

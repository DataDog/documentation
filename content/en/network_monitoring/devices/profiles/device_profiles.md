---
title: Getting Started with Device Profiles
aliases:
    - /network_monitoring/devices/guide/device_profiles/
further_reading:
- link: "/network_monitoring/devices/profiles/build-ndm-profile/"
  tag: "Documentation"
  text: "Build an NDM Profile (Advanced)"
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Read more about NDM Profiles"
site_support_id: snmp_profile_manager
---

## Overview

Device profiles define which metrics to collect and how to transform them into Datadog metrics. Each [profile][2] monitors a class of similar devices from the same vendor.

The SNMP Profile Manager provides a simplified, guided experience for enabling and managing the metrics collected from your network devices. Starting from a single device, you can:

- Browse available metrics grouped by category and enable them with one click.
- Manage the devices covered by a profile and trigger SNMP walks to refresh available metrics.
- Use metric packs for AI-guided bulk metric recommendations.
- Save and deploy profile changes directly to your Agents, with a built-in audit view and Agent health check.

For advanced profile configuration, see [Build an NDM Profile][3].

## Prerequisites

- Agent version `7.75.2` or later.
- [Remote Configuration][14] enabled for your organization.
- Permissions required:
  - [NDM Device Profiles View][20]: Provides read-only access to the profile page. (Included in the Datadog Standard Role).
  - [NDM Device Profiles Edit][20]: Allows editing of device profiles. (Included in the Datadog Admin Role).

## Setup

1. Enable device scanning by setting `network_devices.default_scan.enabled: true` in your `datadog.yaml`:

   ```yaml
   network_devices:
       default_scan:
         enabled: true
   ```

2. Set `use_remote_config_profiles: true` in your configuration:

   For SNMP Autodiscovery, add the following to your `datadog.yaml` file under `network_devices.autodiscovery`:

    ```yaml
    network_devices:
        autodiscovery:
          use_remote_config_profiles: true
    ```

   For manual SNMP checks, add the following to your `conf.d/snmp.d/conf.yaml` file under `init_config`:

    ```yaml
    init_config:
      use_remote_config_profiles: true
    ```

  **Note**: EXOS 33.1.1 devices may crash when device scan is enabled due to a firmware bug. As a workaround, disable device scan globally (`network_devices.default_scan.enabled: false`) or upgrade the device firmware. If you are affected by this issue, contact [Datadog Support][21] for assistance.

## Configure a device profile

The recommended entry point for the SNMP Profile Manager is from a single device in NDM. Every device matches to a profile, either a custom profile or a generic Datadog-provided one. Editing a profile from a device automatically creates a custom version of that profile on your behalf, so you never need to create a profile from scratch.

### Open a device profile from NDM

1. Navigate to [**Infrastructure > Network Devices**][15].
2. Click on a device to open the device side panel.
3. Click the **View all metrics** to view the list of metrics being automatically collected for the device.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_view_all_metrics.png" alt="The NDM device View all metrics tab with the metrics list" style="width:80%;">}}

4. To edit the profile, click **SNMP Profile** in the **View all metrics** tab.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_metrics_tab.png" alt="The NDM device Metrics tab with the SNMP Profile option highlighted in the left sidebar" style="width:80%;">}}

This opens the profile editor for the profile that covers this device. The profile editor shows all metrics available for the devices covered by this profile where you can toggle to enable or disable metrics.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_profile_editor.png" alt="The NDM device view panel showing the profile editor with metrics enabled and disabled" style="width:80%;">}}

#### Scalar metrics

To enable a scalar metric, click **Enable** next to the metric. To disable it, click **Disable**. Changes are not applied until you [save and deploy](#step-5-save-and-deploy).

#### Table metrics

Table metrics require you to select an index tag before enabling the associated metrics. The index tag determines how rows in the SNMP table are identified.

1. Click on a table metric group to expand it.
2. Select an index tag from the dropdown to index the table.
3. Enable the individual metrics within the table you want to collect.
4. Click **Enable**.

<!-- TODO: New screenshot — Table metric expanded, showing the index tag picker and metric checkboxes -->
{{< img src="/network_device_monitoring/profile_onboarding/add_metrics_manually.mp4" alt="Table metric expanded showing index tag selection and metric enablement" video=true >}}

**Note**: Table metrics require an index tag to be selected. If the index tag is not set, the metric does not work even after enabling it.

### Step 3: Manage devices

The **Devices** section shows all devices covered by this profile. Use this section to add or remove devices, filter the device list, or trigger an SNMP walk on a specific device.

<!-- TODO: New screenshot — Manage Devices panel showing device list, add/remove controls, and filters -->
{{< img src="/network_device_monitoring/profile_onboarding/reference_devices.png" alt="The profile editor Manage Devices panel" style="width:100%;">}}

- **Add or remove devices**: Click **Manage** to search for devices to add or select object IDs to remove. Removing an object ID removes all matching devices from the profile's coverage.
- **Filter devices**: Use the filter bar to narrow the device list by device type, name, or other attributes.
- **Jump to NDM**: Click a device in the list to open it in NDM for a closer look.
- **Rescan device**: Click **Rescan Device** to trigger a new SNMP walk on the device. This refreshes the list of available metrics shown in the **Metrics** tab. The available metrics list is a union of all metrics discoverable across all devices covered by the profile.

### Step 4: Explore metric packs

The **Metric Packs** tab provides AI-guided recommendations for enabling groups of related metrics in bulk. Metric packs are curated sets of metrics organized by category, such as interface metrics or routing metrics.

<!-- TODO: New screenshot — Metric Packs tab showing pack list, AI recommendations, and preview of a selected pack -->
{{< img src="/network_device_monitoring/profile_onboarding/scan_reference_devices_2.png" alt="The Metric Packs tab showing recommended packs and a pack preview" style="width:80%;">}}

1. Browse or search for a metric pack.
2. Click a pack to preview the metrics included.
3. Click **Add Metric Pack** to enable all metrics in the pack at once.

### Step 5: Save and deploy

After making your changes, click **Save and Deploy** to review and apply them.

<!-- TODO: New screenshot — Save and Deploy review screen showing added/changed/removed metrics, agents list, and prereq warnings -->
{{< img src="/network_device_monitoring/profile_onboarding/save_sync_agents.png" alt="The Save and Deploy review screen showing a summary of changes and the list of agents receiving the update" style="width:100%;">}}

The review screen shows:

- A summary of metrics added, changed, or removed in this session.
- The list of Agents that receive the profile update.
- Any Agent configuration issues to resolve before deploying, such as Remote Configuration not being enabled.

Click **Deploy** to push changes to all healthy Agents. Changes are applied using [Remote Configuration][14].

To apply profiles manually, see [Download profiles](#download-profiles).

### Advanced settings

Click **Advanced Settings** to access metadata and global tag configuration. These options are unchanged from the previous profile editor experience and are not required for most use cases.

#### Metadata

Datadog provides defaults for most devices through out-of-the-box profiles, such as device name and description. Use the **Metadata** section to override these defaults.

<!-- TODO: New screenshot — Advanced Settings > Metadata section -->
{{< img src="/network_device_monitoring/profile_onboarding/define_metadata_2.png" alt="The Advanced Settings section showing metadata configuration" style="width:80%;">}}

Click the pencil icon to edit a metadata field. Metadata is displayed on the [Network Device Monitoring][15] page as searchable facets and in the device side panel.

{{< img src="/network_device_monitoring/profile_onboarding/device_metadata_2.png" alt="The NDM side panel highlighting the metadata sections" style="width:100%;">}}

#### Global tags

Add global tags to apply metadata, metrics, and tags to all devices matching the profile.

<!-- TODO: New screenshot — Advanced Settings > Global Tags section -->
{{< img src="/network_device_monitoring/profile_onboarding/add_global_tag.mp4" alt="The Advanced Settings Global Tags section" video=true >}}

| Modification    | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| No Modification | The device's returned value is used directly as the tag value.                                 |
| Format          | This can be [mac_address][5] or [ip_address][6].                                                    |
| Extract Value   | A regular expression used to [extract][7] the tag value from the SNMP value provided by the device. |
| Mapping         | See the [profile format reference][8].                                                              |

## Inventory page

To view all profiles in one place, navigate to [**Infrastructure > Network Devices > Configuration**][1]. The **Inventory** page shows a summary of out-of-the-box (OOTB) Datadog profiles and any custom profiles you have created.

<!-- TODO: New screenshot — Updated inventory page (no "Create New Profile" button visible) -->
{{< img src="/network_device_monitoring/profile_onboarding/device_inventory_page_2.png" alt="The Network Device profile inventory page" style="width:100%;">}}

This page includes the following features:

- **Filters**: Filter profiles by type:
  - Custom Profiles: User-created device profiles.
  - Created by Datadog: Out-of-the-box profiles that you can view and use as the basis for customization.
  - Draft Profiles: Profiles that have not yet been deployed to Agents.

<!-- TODO: New screenshot — Updated filter options on the inventory page -->
{{< img src="/network_device_monitoring/profile_onboarding/device_filters.png" alt="Screenshot of the device profile inventory page showing the filter options" style="width:60%;">}}

- **Edit a profile**: Click on any profile to open the profile editor. For OOTB profiles, editing creates a custom version on your behalf.

- **Kebab menu**: Click the kebab menu to the right of a profile to edit, clone, or delete the profile (custom profiles only), or to navigate to **View related devices** in NDM.

<!-- TODO: New screenshot — Updated kebab menu -->
{{< img src="/network_device_monitoring/profile_onboarding/device_kebab_menu.png" alt="Screenshot of the device profile inventory page showing the kebab menu" style="width:40%;">}}

### Download profiles

Click the download button on the inventory page to generate and download a `.zip` bundle containing the `yaml` files for your custom profiles. To apply profiles manually to Agents:

1. Place the `yaml` files in the [profile directory][13] on each relevant installed Agent.
2. Restart the Datadog Agent.
3. Confirm that NDM is receiving metrics from the matched devices.

{{< img src="/network_device_monitoring/profile_onboarding/profile_download_2.png" alt="The Network Device profile main page highlighting the Download All Profiles option" style="width:100%;">}}

## Profile inheritance

Profile inheritance happens automatically in the background. When you edit a profile, Datadog creates a custom extension of the matching profile. You do not need to configure inheritance manually. Datadog automatically includes base inherited profiles (`_base.yaml`, `_generic-if.yaml`, `_generic-ip.yaml`, `_generic-ospf.yaml`, `_generic-tcp.yaml`, and `_generic-udp.yaml`).

For advanced inheritance configuration, see [Profile Format Reference][3].

## Troubleshooting

### What is a profile?
* A profile is a configuration file that defines the metadata, metrics, and tags to collect from a device. See [metadata definition][17] for more information.

### What is a device scan?
* A device scan conducts a complete SNMP walk of the device, collecting all available data and forwarding it to Datadog for display in the UI. This process identifies the OIDs available on the device and populates the list of available metrics in the profile editor.

### Why are there no matching devices?
If no matching devices are found, it may be due to the following reasons:
  * **The profile is in Draft mode**:
    * Draft profiles are not applied to the Agent. To start monitoring devices with your profile, open the profile and click [**Save and Deploy**](#step-5-save-and-deploy).
    After a profile is applied, you cannot bring it back to draft status.
  * **The profile is applied but is not matching any device(s)**:
    * Profiles are matched to devices using their SysObjectID. Confirm that the SysObjectID in the profile matches one or more of your monitored devices.
  * **Multiple profiles have the same SysObjectID(s)**:
    * If multiple profiles share the same SysObjectID, it can cause matching conflicts at the Agent level. Confirm that each SysObjectID is assigned to only one profile.

### Why would a device not be scanned?

The device scan may take up to 10 minutes to complete. You can monitor the scan's progress in the UI.

If a device is not being scanned, it may be due to the following reasons:

- **Default device scan is disabled**: Device scan is disabled by default in Agent 7.75.2+. Set `network_devices.default_scan.enabled: true` in `datadog.yaml`.
- **Infinite loop detected**: The scan detected an infinite loop and was terminated. Check the Agent logs for `next OID 'X' is not after last OID 'Y'`. This can occur with some device firmware.
- **Known issue: EXOS 33.1.1 firmware bug**: EXOS 33.1.1 devices may crash when device scan is enabled. As a workaround, keep device scan disabled or upgrade the device firmware. Contact [Datadog Support][21] for assistance.

{{< site-region region="gov" >}}
- **GovCloud**: Device scans cannot be triggered from the UI. Enable the default device scan (`network_devices.default_scan.enabled: true`) and trigger scans manually from the Agent for specific devices.
{{< /site-region >}}

### Remote Configuration is not enabled on collectors

The Profile Manager requires:

- Agent version `7.75.2` or later
- [Remote Configuration][14] enabled
- `use_remote_config_profiles: true` in your SNMP configuration
- `network_devices.default_scan.enabled: true` for device scanning

If Remote Configuration is not enabled, you cannot trigger device scans or sync profiles to Agents through the UI. To apply profiles manually, see [Download profiles](#download-profiles).

Datadog recommends enabling Remote Configuration to take advantage of the full UI-based experience and minimize manual Agent interactions.

### Why is a table metric not working?

Table metrics require an index tag to be configured. If a table metric is enabled but not appearing in Datadog, confirm that an index tag was selected when enabling the metric. See [Table metrics](#table-metrics) for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles
[14]: /agent/remote_config
[15]: https://app.datadoghq.com/devices
[17]: /network_monitoring/devices/profiles/#metadata-definition-by-profile
[20]: /account_management/rbac/permissions/#network-device-monitoring
[21]: /help/

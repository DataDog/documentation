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

Device profiles define which SNMP metrics Datadog collects for a group of network devices. The SNMP Profile Manager provides a guided experience for enabling and managing those metrics. Starting from a single device, you can:

- Browse available metrics grouped by category and enable them with one click.
- Manage the devices covered by a profile and enable or disable available metrics.
- Use metric packs for AI-guided bulk metric recommendations.
- Save and deploy profile changes directly to your Agents, with a built-in audit view and Agent health check.

For advanced profile configuration, see [Build an NDM Profile][3].

## Prerequisites

- Agent version `7.77.0` or later.
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

## Configure metrics

The recommended entry point for the SNMP Profile Manager is from a single device in NDM. Every device matches to a profile, either a custom profile or a generic Datadog-provided one. Editing a profile from a device automatically creates a custom version of that profile on your behalf, so you never need to create a profile from scratch.

1. Navigate to [**Infrastructure > Network Devices**][15].
2. Click on a device to open the device side panel.
3. Click the **View all metrics** to view the list of metrics being automatically collected for the device.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_view_all_metrics.png" alt="The NDM device side panel showing the Metrics section with the View all metrics button highlighted" style="width:90%;">}}

4. The **Metrics** tab opens, showing all metrics collected for the device. Use the left sidebar to browse by category: **Alerting Metrics**, **Starred Metrics**, **Key Metrics**, and **Additional Metrics**. 

   {{< img src="/network_device_monitoring/profile_onboarding/profile_manager_metrics_tab.png" alt="The NDM device Metrics tab showing metric graphs and a left sidebar with categories including Alerting Metrics, Starred Metrics, Key Metrics, Additional Metrics, and SNMP Profile" style="width:90%;">}}

5. To open the profile editor and manage which metrics are collected, click **SNMP Profile** in the sidebar.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_metrics_tab.png" alt="The NDM device Metrics tab with the SNMP Profile option highlighted in the left sidebar" style="width:90%;">}}

   This opens the profile editor in the **Metrics** tab, containing the list of all available metrics for the devices covered by the profile, organized by name, MIB, OID, category, and compatibility. This is the primary view for controlling what data Datadog collects from your devices. You can filter the metric list by category or use the search bar to find specific metrics by name or OID.

6. To enable a metric, click the **Enable** toggle next to the metric name. To disable a metric, click the toggle again. Changes are not applied until you save and deploy the profile.

   {{< img src="/network_device_monitoring/profile_onboarding/ndm_profile_editor.png" alt="The SNMP Profile Manager profile editor showing the Metrics tab with all available metrics listed by name, MIB, OID, category, and compatibility" style="width:90%;">}}

### Device coverage

The **Device Coverage** tab shows which network devices are associated with a profile and how the profile is applied. Use this view to verify device associations, filter devices by attributes, and identify SNMP collection issues.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_device_coverage.png" alt="The Device Coverage tab showing a list of devices with their IP addresses, SysObjectIDs, tags, and last SNMP walk status" style="width:90%;">}}


Use the filters at the top of the table to narrow results by SysObjectID, SysType, vendor, model, device type, or device name.

To update which devices are associated with the profile, click **Manage Devices**. From there you can:

- Search for devices to add or select object IDs to remove. Removing an object ID removes all matching devices from the profile's coverage.
- Filter the device list by device type, name, or other attributes.

#### SNMP walk status

The **Last SNMP walk** column indicates whether Datadog was able to successfully query the device:

- **Failed**: The SNMP walk did not complete successfully. Metrics may be missing or incomplete.
- **Timestamp**: Indicates the date and time of the last successful SNMP walk.

If SNMP walks are failing, verify that:

- SNMP is correctly configured on the device.
- Network connectivity allows SNMP polling.
- Credentials and ports are correct.

### Advanced options

Click **Advanced Options** to access device metadata and global tag configuration. These settings are not required for most use cases.

#### Device metadata

The **Device metadata** section defines how Datadog maps SNMP OIDs to device attributes. Each metadata field corresponds to a standard device property, such as:

- Device name
- Vendor
- Model
- OS version
- Location

Values are defined using SNMP OIDs. During collection, Datadog queries these OIDs to populate device metadata. For example:

- `1.3.6.1.2.1.1.5.0` maps to device name.
- `1.3.6.1.2.1.1.1.0` maps to device description.

This metadata enriches device details in the UI, enables filtering and grouping, and provides consistent tagging across devices.

Click the pencil icon to edit a metadata field. Metadata is displayed on the [Network Device Monitoring][15] page as searchable facets and in the device side panel.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_advanced_options_edit.png" alt="The Advanced Options tab with Device metadata selected, showing a table of metadata field names such as Device name, Vendor, and Location, and their mapped SNMP OID values" style="width:90%;">}}

The following table describes the different modification options for a metadata field:
| Modification    | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| No Modification | The device's returned value is used directly as the tag value.                                 |
| Format          | This can be [mac_address][5] or [ip_address][6].                                                    |
| Extract Value   | A regular expression used to [extract][7] the tag value from the SNMP value provided by the device. |
| Mapping         | See the [profile format reference][8].                                                              |

#### Global tags

Use **Global tags** to apply tags to all metrics and device-level metadata for devices associated with the profile. Global tags help standardize tagging across similar devices and add context such as environment, location, or ownership.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_global_tags.png" alt="The Advanced Options tab with Global tags selected, showing a table of tag names and their OID values with an Add global tag button" style="width:90%;">}}


### Explore metric packs

Metric packs are curated sets of metrics you can enable in bulk. They are accessible from the **Metrics** tab and provide AI-guided recommendations based on your devices.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_metric_packs.png" alt="The Metrics tab showing the Start with metric packs banner at the top and the Metric packs button highlighted in the top right corner" style="width:90%;">}}

To add a metric pack:

1. From the **Metrics** tab, click **Metric packs** in the top right corner, or click **View All** in the **Start with metric packs** banner.
2. In the **Add metric pack** modal, browse all available packs or click **Suggested packs** to view AI-guided recommendations.
3. Click a pack to preview its included metrics, global tags, and metadata.
4. Click **Add metric pack** to enable all metrics in the pack at once.

{{< img src="/network_device_monitoring/profile_onboarding/ndm_add_metric_pack.png" alt="The Add metric pack modal showing the pack list on the left and a preview of the selected pack's metrics, global tags, and metadata on the right" style="width:90%;">}}

## Inventory page

To view all profiles in one place, navigate to [**Infrastructure > Network Devices > Settings**][1] and click **SNMP Profile Manager** in the left sidebar. This page lists all profiles, both Datadog out-of-the-box profiles and any custom profiles you have created.

{{< img src="/network_device_monitoring/profile_onboarding/snmp_profile_manager.png" alt="The SNMP Profile Manager page showing a list of profiles with their name, vendor, device coverage, and last update columns" style="width:90%;">}}

Use the **Device vendor** filter or the search bar to narrow the list by profile name, vendor, or device name. Toggle **Show only profiles with matching devices** to hide profiles with no associated devices.

If Agents are misconfigured for Remote Config, a warning banner appears at the top of the page. Click **Fix Agents** to resolve the issue.

To open the profile editor, click on any profile. For Datadog-provided profiles, editing creates a custom version on your behalf.

Click the three-dot menu to the right of a profile row to:

- **Edit profile**: Open the profile editor for that profile.
- **Delete profile**: Permanently remove a custom profile.
- **Review related devices**: Navigate to NDM filtered to the devices matched to that profile.

### Download profiles

To download profiles as YAML files, click **Download Profiles** in the top right corner of the page. This generates a `.zip` bundle containing the `yaml` files for your custom profiles. To apply profiles manually to Agents:

1. Place the `yaml` files in the [profile directory][13] on each relevant installed Agent.
2. Restart the Datadog Agent.
3. Confirm that NDM is receiving metrics from the matched devices.

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

---
title: Getting Started with Device Profiles

is_beta: true
further_reading:
- link: "/network_monitoring/devices/guide/build-ndm-profile/"
  tag: "Documentation"
  text: "Build an NDM Profile (Advanced)"
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Read more about NDM Profiles"
site_support_id: snmp_profile_manager
---

{{< callout url="https://www.datadoghq.com/product-preview/easily-onboard-and-start-monitoring-network-devices-to-datadog/" >}}
  SNMP Profile Manager is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

Device profiles define which metrics to collect and how to transform them into Datadog metrics. Each [profile][2] is expected to monitor a class of similar devices from the same vendor. 

The SNMP Profile Manager template provides a guided, GUI-based experience to:
- Seamlessly create and manage device profiles.
- Specify tags and metrics to be collected from your network devices. 
- Verify the matching devices to each profile.
- Review a snapshot of the device profiles you created on the [Inventory page](#inventory-page).

For more information on advanced profile details, review the [Profile Format Reference][3] page.

## Prerequisites 

- The minimum Agent version required is `7.65` or higher.
- [Remote Configuration][14] enabled for your organization.
- Permissions required:
  - [NDM Device Profiles View][20]: Provides read-only access to the profile page. (Included in the Datadog Standard Role).
  - [NDM Device Profiles Edit][20]: Allows editing of device profiles. (Included in the Datadog Admin Role).
- To [automatically apply created device profiles](#apply-a-profile-to-created-devices) using Remote Configuration, ensure the following setting is enabled in your `datadog-agent/conf.d/snmp.d/conf.yaml` file:

  {{< highlight yaml "hl_lines=5" >}}
    init_config:
      loader: core
      use_device_id_as_hostname: true
      min_collection_interval: 15
      use_remote_config_profiles: true

    instances:
    ......
  {{< /highlight >}}

## Setup

### Step 1: Profile details

  1. Build your own NDM profile by navigating to [Infrastructure > Network Devices > Configuration][1]. 
  2. Click on **SNMP Profile Manager > + Create New Profile**. This brings you to the profile creation page shown below.
     {{< img src="/network_device_monitoring/profile_onboarding/create_profile_3.png" alt="The Network Device profile creation page" style="width:100%;">}}

  3. Provide your device profile with a name and description (optional).
  4. Select the `SysObjectID`. This parameter matches network devices to the device profiles. 

     {{< img src="/network_device_monitoring/profile_onboarding/Sys_object_ID_Field_2.png" alt="The Network Device profile creation page showing the Sys Object ID Dropdown" style="width:60%;">}}

### Step 2: Profile inheritance 

Use profile inheritance to adopt configurations such as metadata, metrics, and tags. This simplifies scaling your device profiles and allows you to build on existing ones. Datadog automatically includes some inherited profiles, (`_base.yaml` `_generic-if.yaml`, `_generic-ip.yaml`, `_generic-ospf.yaml`, `_generic-tcp.yaml` and `_generic-udp.yaml`), which are recommended **not** to be removed. 

Reference the [Supported Device Profiles][16] for the full list of inherited profiles.

1. Keep the Datadog `_base.yaml` profile, and any other inherited Datadog profiles specific to your needs. Optionally, you can select additional profiles to inherit. The relevant fields appear on the right under Inherited Profiles, with an `Inherited` tag next to any inherited metrics, tags, or metadata:

   {{< img src="/network_device_monitoring/profile_onboarding/profile_inheritance.png" alt="The Network Device profile creation page showing the Profile inheritance section." style="width:100%;">}}

    **Note**: Changes made to the parent profile automatically apply to the child profiles. If you need to adjust any inherited attributes in the child profiles, such as metrics, tags, or metadata, you must modify the parent profile.

### Step 3: Select reference devices

Use reference devices to select which devices you want to gather {{< tooltip text="OIDs (Object Identifiers)" tooltip="A unique ID or address on a device that when polled returns the response code of that value." >}} for your chosen device models. The **reference devices** field is pre-selected based on the `SysObjectID` you specified in the [profile details](#step-1-profile-details).

1. Keep the current reference device selection to perform a device scan. Additionally, you can add more devices or change the current selection.

2. Click **Scan Devices** to proceed to Step 4, which initiates the scan.

3. Optionally, click **Proceed Manually** to proceed without performing a scan.

  {{< img src="/network_device_monitoring/profile_onboarding/reference_devices.png" alt="The Network Device profile creation page showing the Reference device section." style="width:100%;">}}

### Step 4: Scan reference devices

This step scans your devices to discover their available metrics. Running a scan allows you to view all available metrics for your device, making it easier to fill in metrics, metadata, and tags. The scan performs an SNMP walk on your devices using [Datadog Remote Configuration][14]. 

The **Scanned Devices** tab displays which devices were scanned with Remote Configuration or manually.

  {{< img src="/network_device_monitoring/profile_onboarding/scan_reference_devices_2.png" alt="The Network Device profile creation page showing the Scan reference device section." style="width:80%;">}}

### Step 5: Define metadata

Datadog provides reasonable defaults for most devices through out-of-the-box (OOTB) profiles, such as device and description. You can override these defaults in the **Define Metadata** section.

  {{< img src="/network_device_monitoring/profile_onboarding/define_metadata_2.png" alt="The Network Device profile creation page showing the define metrics section." style="width:80%;">}}

  1. Click the pencil icon to edit and modify any of the default metadata fields.
  
  2. Metadata functionality is available and displayed on the [Network Device Monitoring (NDM)][15] page as searchable facets, and on the side panel of a selected device:

     {{< img src="/network_device_monitoring/profile_onboarding/device_metadata_2.png" alt="The NDM side panel page profile, highlighting the metadata sections." style="width:100%;">}}

### Step 6: Define metrics

Metrics can be added either from a device scan or by manually creating a new metric for the profile. Inherited metrics are highlighted in purple with the `Inherited` tag.

{{< tabs >}}
{{% tab "Device scan (recommended)" %}}

1. To define a metric using the **Device Scan** option, click **Add Metrics**. This opens a modal displaying all available metrics for the device.
2. Hover over metrics to see units and descriptions for easier selection.
3. Select the metrics you wish to add, then click **Add Metric**.
4. This returns you to the define metrics screen where you can see the new metric that was added.

   {{< img src="/network_device_monitoring/profile_onboarding/define_metrics_2.mp4" alt="Video showing the add metrics modal, adding a new metric and returning to define metrics step." video=true >}}

{{% /tab %}}

{{% tab "Manual" %}}

1. To define a metric using the **Manual** option, click **Add Metrics**. This opens a modal displaying all available metrics for the device.
2. Click **Create New Metric** at the top of the modal.
3. Specify the OID (Scalar, or Tabular). 
4. Click the dropdown in the search field to add the OID name. The search bar offers an autocomplete feature that suggests OIDs matching the searched value, or you can manually enter the name or OID.
5. Select the metric type, scale factor, and extract value (regex pattern). 
See [advanced options for scalar metrics](?tab=manual#scalar-metrics) and [advanced options for tabular metrics](?tab=manual#tabular-metrics) for more information.
6. Click **Create** to save the metric.
7. This returns you to the define metrics screen where you can see the new metric that was added.

**Note**: To avoid a validation error for tabular metrics, at least one metric tag must be added on the Define metrics screen. 

{{< img src="/network_device_monitoring/profile_onboarding/add_metrics_manually.mp4" alt="Video showing the add metrics modal, adding a new metric with the manual method and returning to define metrics step." video=true >}}

{{% collapse-content title="Advanced options scalar" level="h4" expanded=false %}}

#### Scalar metrics

[Metric Type][11]
: One of `gauge`, `rate`, `monotonic_count`, or `monotonic_count_and_rate`. 

[Scale Factor][12]
: Before being transmitted to Datadog, the extracted value is multiplied by this factor.

[Extract Value][7]
: This is the same as the [advanced options](?tab=manual#global-tags) for global tags.

[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[11]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#forced-metric-types
[12]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#scale_factor

{{% /collapse-content %}}

{{% collapse-content title="Advanced options tabular" level="h4" expanded=false %}}

#### Tabular metrics

Adding tags to tabular metrics is similar to adding [global tags](#step-7-global-tags), with two additional options:

1. Select whether the tag value originates from an `OID` value or a segment of the table index. If `Index` is chosen as the source, an index position must be specified, which then becomes the tag.

    <details>
      <summary><b>Example of using an Index position</b></summary></br>
  
      Consider a table at `OID 1.2.3.1.1` with two indices. Each row in this table includes a two-number index. Suppose column 3 of a row has `OID 1.2.3.1.1.3.55.12` - here, `1.2.3.1.1` represents the table, `.3` is the column number within the table, and `.55.12` is the index of this specific row (all other columns for this row will also end with `.55.12`). If you establish a tag with the Source set to `Index` and `Index Position` set to 1, the tag's value for metrics from this table row will be `55`; if you set the index position to 2, it will be 12. If you use an index less than 1 or more than the number of indices in the table, the tag will not be populated. 
  
      See [Using an Index][9] for more information.
  
    </details>

2. Use Index Transformation when you need to tag a table metric value with a value from a _different_ table that employs a subset of this table's index. This is **not** a typical scenario. You configure this by adding one or more transformation segments, each with a start and end number. These numbers index into the original table's index to create a new index value for the new table.

    <details>
      <summary><b>Example of using Index Transformation</b></summary></br>

      Consider the `CPI-UNITY-MIB` module. It has a `table`, `cpiPduTable`, with details about a specific PDU, and another table, `cpiPduBranchTable`, with information about specific PDU branches. The index of the main table is the PDU's MAC address, such as `6.0.36.155.53.3.246`. The branch table's index is a `branch ID` followed by the `PDU MAC`, therefore a branch table row index might be `1.6.0.36.155.53.3.246`. 
      If you want to report the current on a PDU branch, you could add `cpiPduBranchCurrent` (`OID 1.3.6.1.4.1.30932.1.10.1.3.110.1.3`, from the branch table) as a tabular metric. To tag this metric with the PDU name, add `cpiPduName` as a tag (`OID 1.3.6.1.4.1.30932.1.10.1.2.10.1.3`, from the main table), then add an index transform with `start:1` and `end:7`. This means the branch current metric from the branch table indexed with `1.6.0.36.155.53.3.246` would be tagged using the name from the main table indexed with `6.0.36.155.53.3.246`. 
  
      For more information see [Using a column from a different table with different indexes][10].

    </details>

[9]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-an-index
[10]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-a-column-from-a-different-table-with-different-indexes 

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Step 7: Global Tags

Add global tags to ensure the metadata, metrics, and global tags are applied to all matching devices. Global tags can be added either from a device scan or by manually creating a new tag for the profile. Additionally, the `Inherited` tag appears next to any global tags inherited from this profile. 

{{< tabs >}}
{{% tab "Device scan (recommended)" %}}

1. To define a global tag using the **Device Scan** option, click **+ Add Tags**. This opens a modal displaying all available tags for the device.
2. Select one or more tags you wish to add to the device profile, then click **Add Tag**.
3. This returns you to the define global tags screen where you can see and edit the new tag that was added.

   {{< img src="/network_device_monitoring/profile_onboarding/add_global_tag.mp4" alt="Video showing the add global tags modal, adding a new tag and returning to global tags step." video=true >}}

{{% /tab %}}

{{% tab "Manual" %}}

1. To define a global tag using the **Manual** option, click **+ Add Tags**. This opens a modal displaying all available tags for the device.
2. Click **Create New Tag** at the top of the modal.
3. Select the dropdown in the search field to add the OID name.
4. Click the **Modification** dropdown to add a modification. See [advanced options](?tab=manual#global-tags).
5. Click **Create** to save the new tag.
6. This returns you to the define global tags screen where you can see the new tag that was added.

   {{< img src="/network_device_monitoring/profile_onboarding/add_global_tags_manual.mp4" alt="Video showing the add global tags modal, adding a new tag with the manual method, and returning to global tags step." video=true >}}

{{% collapse-content title="Advanced options" level="h4" expanded=false %}}

#### Global tags:

| Modification    | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| No Modification | The device's returned value is used directly as the tag value.                                 |
| Format          | This can be [mac_address][5] or [ip_address][6].                                                    |
| Extract Value   | A regular expression used to [extract][7] the tag value from the SNMP value provided by the device. |
| Mapping         | See the [profile format reference][8].   

[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value

{{% /collapse-content %}}

{{% /tab %}}
{{< /tabs >}}

### Apply a profile to created devices

{{< tabs >}}
{{% tab "Automatic (recommended)" %}}

After applying your configuration options to your device profile, click **Save and Sync Agents** to automatically apply this profile to all NDM agents. The configurations are applied to your devices with [Remote Configuration][14]. See [prerequisites](#prerequisites) for more information.

{{< img src="/network_device_monitoring/profile_onboarding/save_sync_agents.png" alt="The Network Device profile page showing the final step to save and sync agents" style="width:100%;">}}

[14]: /agent/remote_config

{{% /tab %}}

{{% tab "Manual" %}}

1. After you save a profile as a draft, navigate back to the [profile home page][4], then select the **Download All Profiles** option. This allows you to download the `.zip` bundle which contains the `yaml` files for the profiles you created. 
2. Place the `yaml` files in the [profile directory][13] on each of the relevant installed Agents.
3. Restart the Datadog Agent.
4. To ensure the profiles you created are accurate, confirm that NDM is receiving metrics from the matched devices as expected.

{{< img src="/network_device_monitoring/profile_onboarding/profile_download_2.png" alt="The Network Device profile main page highlighting the Download All Profiles option" style="width:100%;">}}

[4]: https://app.datadoghq.com/devices/profiles
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles

{{% /tab %}}
{{< /tabs >}}

## Inventory page

Navigate to [Infrastructure > Network Devices > Configuration][1] to view the device profile [Inventory][1] page. Here, you can view a summary of the out-of-the-box (OOTB) profiles, as well as the device profiles you created using the [Device Profile Setup](#setup) above.  

  {{< img src="/network_device_monitoring/profile_onboarding/device_inventory_page_2.png" alt="The Network Device profile inventory page" style="width:100%;">}}

This page includes the following features:

- **Draft status**: Indicates a net new profile that has not yet been applied to the Agent. To apply a profile to the Agent, click into the profile and sync the Agent.
Once a profile is applied, you cannot bring it back to draft status.

  {{< img src="/network_device_monitoring/profile_onboarding/device_status.png" alt="Screenshot of a device profile showing the draft state status" style="width:50%;">}}

- **Filters**: The filters include the following options:
  - Custom Profiles - User created device profiles.
  - Created by Datadog - Datadog out-of-the-box profiles that can be viewed and used to build your own custom profile.
  - Draft Profiles - Devices profiles in that are in draft mode.

  {{< img src="/network_device_monitoring/profile_onboarding/device_filters.png" alt="Screenshot of the device profile inventory page showing the filter options" style="width:60%;">}}

- **Create new profile and Download**: The **+ Create New Profile** button opens the profile creation form which allows you to [build a new device profile.](#build-device-profiles) Clicking the download button generates and download a `.zip` bundle which contains the `yaml` files for the profiles you created. <br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/create_profile_download.png" alt="Screenshot of the device profile inventory page showing the download and create a new profile buttons" style="width:50%;">}}

- **Kebab menu**: Clicking the kebab menu to the right of a profile allows you to edit, clone, or delete the profile (for custom profiles only). You can also navigate to **View related devices** on the NDM page, filtered to the device(s) the profile is applied to.<br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/device_kebab_menu.png" alt="Screenshot of the device profile inventory page showing the kebab menu on the right hand side" style="width:40%;">}}
                                                  
## Troubleshooting

### What is a profile?
* A profile is a configuration file that defines the metadata, metrics, and tags to collect from a device. See [metadata definition][17] for more information.

### What is a device scan?
* A device scan conducts a complete SNMP walk of the device, collecting all available data and forwarding it to Datadog for display in the UI. This process helps you identify the OIDs available on the device and add them to the profile for monitoring.

### Why would I see no matching devices? 
If no matching devices are found, it may be due to the following reasons:  
  * **The profile is in Draft mode**:
    * Draft profiles are not applied to the Agent. To start monitoring devices with your profile, you must sync it to the Agent(s). This can be done by opening the profile and clicking on the [**Save & Sync Agents**](#apply-a-profile-to-created-devices) button.  
  * **The profile is applied but is not matching any device(s)**:  
    * Profiles are matched to devices using their SysObjectID. Ensure that the SysObjectID specified in the profile matches one or more of your monitored devices.
  * **Multiple profiles have the same SysObjectID(s)**:  
    * Profiles are matched to devices using their SysObjectID. If multiple profiles share the same SysObjectID, it can cause matching conflicts at the Agent level. Ensure that each [SysObjectID](#step-1-profile-details) is assigned to only one profile.

### Why would a device not be scanned?

* The device scan may take up to 10 minutes to complete. You can monitor the scan's progress in the UI. If errors occur, try restarting the scan or selecting a different [reference device](#step-3-select-reference-devices).

### What if I don't have Remote Configuration enabled on my collectors? 

* If you are using an Agent version earlier than `7.47.0` and do not already have [Remote Configuration][18] manually enabled on your hosts, you will not be able to trigger device scans or sync profiles to the Agents through the UI. However, you can perform these steps manually. <br /><br>

   To scan a device, follow the instructions in the UI: <br /><br>

   {{< img src="/network_device_monitoring/profile_onboarding/remote_configuration.png" alt="Screenshot of the " style="width:80%;">}}

   Or, to apply the profiles to your Agents manually:  

     1. Save the profile.  
     2. Click on the download button to save a zip file of all your profiles.  
     3. Upload the zip file to your Agents by following the instructions in the [manually apply a profile to created devices][19] section.

Datadog strongly recommends enabling Remote Configuration to ensure a seamless, UI-based experience and to minimize unnecessary interactions with the Agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/profiles
[2]: /network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[14]: /agent/remote_config
[15]: https://app.datadoghq.com/devices
[16]: /network_monitoring/devices/supported_devices/
[17]: /network_monitoring/devices/profiles/#metadata-definition-by-profile
[18]: /agent/remote_config/?tab=configurationyamlfile&site=us#setup
[19]: /network_monitoring/devices/guide/device_profiles/?tab=manual#apply-a-profile-to-created-devices
[20]: https://docs.datadoghq.com/account_management/rbac/permissions/#network-device-monitoring
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
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">The Device Onboarding Experience is not supported on this site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/easily-onboard-and-start-monitoring-network-devices-to-datadog/" >}}
  Device Onboarding is in Preview. Use this form to request access.
{{< /callout >}}

## Overview

Device profiles define which metrics to collect and how to transform them into Datadog metrics. Each [profile][2] is expected to monitor a class of similar devices from the same vendor. 

The Device profiles template provides a guided, GUI-based experience to:
- Seamlessly create and manage device profiles.
- Specify tags and metrics to be collected from your network devices. 
- Verify the matching devices to each profile.

For more information on advanced profile details, review the [Profile Format Reference][3] page.

## Prerequisites 

The minimum Agent version required is `7.64` or higher.

## Inventory page

Navigate to [Infrastructure > Network Devices > Configuration][1] to view the device profile [Inventory][4] page. This is where you can see a snapshot of the device profiles you created using the [Device Profile Setup](#setup) below. 

  {{< img src="/network_device_monitoring/profile_onboarding/device_inventory_page.png" alt="The Network Device profile inventory page" style="width:100%;">}}

This page includes the following features:

- **Draft status**: Indicates a net new profile that has not yet been applied to the Agent. To apply a profile to the Agent, click into the profile and sync the Agent.
Once a profile is applied, you cannot bring it back to draft status.

  {{< img src="/network_device_monitoring/profile_onboarding/device_status.png" alt="Screenshot of a device profile showing the draft state status" style="width:50%;">}}

- **Filters**: The filters include the following options:
  - Custom Profiles - User created device profiles.
  - Created by Datadog - Datadog out-of-the-box profiles that can be viewed and used to build your own custom profile.
  - Draft Profiles - Devices profiles in that are in draft mode.

  {{< img src="/network_device_monitoring/profile_onboarding/device_filters.png" alt="Screenshot of the device profile inventory page showing the filter options" style="width:60%;">}}

- **Create new profile and Download**: The **+ Create New Profile** button opens the profile creation form which allows you to [build a new device profile.](#build-device-profiles) Clicking the download button will generate and download a `.zip` bundle which contains the `yaml` files for the profiles you created. <br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/create_profile_download.png" alt="Screenshot of the device profile inventory page showing the download and create a new profile buttons" style="width:50%;">}}

- **Kebab menu**: Clicking the kebab menu to the right of a profile allows you to edit, clone, or delete the profile (for custom or draft profiles only). You can also navigate to the **View related devices** on the NDM page, filtered to the device the profile is applied to.<br></br>

  {{< img src="/network_device_monitoring/profile_onboarding/device_kebab_menu.png" alt="Screenshot of the device profile inventory page showing the kebab menu on the right hand side" style="width:40%;">}}

## Setup

### Profile details

1. Build your own NDM profile by navigating to [Infrastructure > Network Devices > Configuration][1]. 
2. Click on Device Onboarding > **+ Create New Profile**. This brings you to the profile creation page shown below.
  {{< img src="/network_device_monitoring/profile_onboarding/create_profile_3.png" alt="The Network Device profile creation page" style="width:100%;">}}

3. Provide your device profile a name and description (optional).
4. Select the `SysObjectID`. This is what is used to match network devices to the device profiles that define what is collected and monitored from each device. 

  {{< img src="/network_device_monitoring/profile_onboarding/Sys_object_ID_Field_2.png" alt="The Network Device profile creation page showing the Sys Object ID Dropdown" style="width:60%;">}}

### Profile inheritance (optional)

Use profile inheritance to adopt configurations such as metadata, metrics, and tags. This simplifies scaling your device profiles and allows you to build on existing ones. After you select a profile to inherit, the fields are populated on the right side of the screen under **Inherited Profiles**, with an `Inherited` tag next to any metrics or metadata inherited from this profile:

  {{< img src="/network_device_monitoring/profile_onboarding/profile_inheritance.png" alt="The Network Device profile creation page showing the Profile inheritance section." style="width:100%;">}}

**Note**: Changes to parent profiles will be propagated to the child profiles.

### Select reference devices

Use reference devices to select which devices you want to gather OIDs for your chosen device models. This field is pre-selected based on the `SysObjectID` that was specified in the [profile details](#profile-details).

**Note**: A single reference device is sufficient to perform a device scan, however, you have the option to add more devices or change the current selection.

  {{< img src="/network_device_monitoring/profile_onboarding/reference_devices.png" alt="The Network Device profile creation page showing the Reference device section." style="width:100%;">}}

### Scan reference devices

Scan additional reference devices to discover their available metrics. This runs an SNMP walk with Remote Configuration. 

Troubleshooting
If device is unscanned 
If remote config is not enabled (direct them to Fleet Automation) - add screenshot of error state  
Direct them to enabled RC 
Option to do manual scan 

  {{< img src="/network_device_monitoring/profile_onboarding/scan_reference_devices.png" alt="The Network Device profile creation page showing the Scan reference device section." style="width:80%;">}}

### Define metadata

DD has sensible defaults for the majority of devices from our DD created OOTB profiles if they’re using an inherited profile
Even if they don’t inherit from any profile, device name, device description will be defined
Option to override 
Metadata functionality
Shown in the NDM page view (screenshot as example)

### Define metrics

Click add metrics, which will pull up modal 
See list of all possible metrics for that device 
See units, description on hover to make selection easy
Add the metrics either from a device scan or manually creating a new metric to the profile


### Global Tags

Add global tags for more advanced and granular options, which allows you to assign a weight to a specific metric.

{{< img src="/network_device_monitoring/profile_onboarding/Add_global_tags.png" alt="The Network Device profile creation page showing the Add Global Tags dropdown" style="width:100%;">}}

#### Advanced Options

| Modification    | Description                                                                                         |
|-----------------|-----------------------------------------------------------------------------------------------------|
| No Modification | The device's returned value will be used directly as the tag value.                                 |
| Format          | This can be [mac_address][5] or [ip_address][6].                                                    |
| Extract Value   | A regular expression used to [extract][7] the tag value from the SNMP value provided by the device. |
| Mapping         | This is described [here][8].                                                                        |


### Scalar metrics

See [Metrics Advanced Options](#metrics-advanced-options).

### Tabular metrics

See [Metrics Advanced Options](#metrics-advanced-options).

### Add Tabular Tags

Adding tags to tabular metrics is similar to adding global tags, with two additional options:

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


### Metrics Advanced Options

The advanced options for scalar and tabular metrics are the same:

[Metric Type][11]
: One of `gauge`, `rate`, `monotonic_count`, or `monotonic_count_and_rate`. 

[Scale Factor][12]
: Before being transmitted to Datadog, the extracted value is multiplied by this factor.

[Extract Value][7]
: This is the same as the [advanced options](#advanced-options) for global tags.

### Apply a profile to created devices

1. After you save a profile, navigate back to the [profile home page][4] and select the **Download All Profiles** option. This allows you to download the `.zip` bundle which contains the `yaml` files for the profiles you created. 
2. Place the `yaml` files in the [profile directory][13] on each of the relevant installed Agents.
3. Restart the Datadog Agent.
4. To ensure the profiles you created are accurate, confirm that NDM is receiving metrics from the matched devices as expected.


{{< img src="/network_device_monitoring/profile_onboarding/download_all_profiles_2.png" alt="The Network Device profile main page highlighting the Download All Profiles option" style="width:100%;">}}

## Troubleshooting

- What is a profile?
- What is a device scan?
- Why do I see no matching devices? 
- What happens if I don't have remote configuration enabled on my collectors?
- Inherited data (metrics, global tags) cannot be overridden from the children 


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/devices/enrichment
[2]: /network_monitoring/devices/profiles/
[3]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/
[4]: https://app.datadoghq.com/devices/profiles
[5]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-mac_address
[6]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#format-ip_address
[7]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#extract_value
[8]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#mapping-index-to-tag-string-value
[9]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-an-index
[10]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#using-a-column-from-a-different-table-with-different-indexes 
[11]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#forced-metric-types
[12]: https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/#scale_factor
[13]: https://github.com/DataDog/integrations-core/tree/master/snmp/datadog_checks/snmp/data/profiles

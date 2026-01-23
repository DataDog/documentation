---
title: Determine the Cloud SIEM product your organization is using
description: Cloud SIEM is available in Standalone, Add-on with Flex Logs, and Legacy products. Follow this guide to determine which product your organization is using.
---

## Overview
Cloud SIEM is available as the following products:
- Standalone
- Add-on with Flex Logs
- Legacy

There are two ways to see which Cloud SIEM product your organization is using:
- [Check the Plan & Usage page](#plan-usage)
- [Check the Cloud SIEM settings page](#settings)

## Check the Plan & Usage page{#plan-usage}

<div class="alert alert-info">You may not be able to use this option if:
  <ul>
    <li>You don't have access to this page</li>
    <li>Your organization has multi-org configured; the Plan & Usage page is a roll-up of all sub-orgs, so you might see multiple Cloud SIEM product tiles</li>
  </ul>
  In either case, follow the instructions in the <a href="#settings">Check the Cloud SIEM settings page</a> section to determine which product your organization is using.
</div>

1. In Datadog, go to the **Plan & Usage** > [**Usage & Cost**][1] page.
1. Scroll to the **Usage Summary** section and click the **Security** tab.
1. Find the tile that indicates which Cloud SIEM product your organization is using:
   <table>
     <thead>
       <tr>
         <th style="width:60%">Tile</th>
         <th style="width:40%">Product</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><strong>Security Analyzed and Indexed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_security_analyzed_indexed_logs.png" alt="Tile labelled with 'Security Analyzed and Indexed Logs,' in addition to a usage amount, and indication of whether that usage was on-demand" width="50%">}}
         </td>
         <td>Standalone</td>
       </tr>
       <tr>
         <td><strong>Cloud SIEM - Analyzed Logs (Add-On)</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs_add_on.png" alt="Tile labelled with 'Cloud SIEM - Analyzed Logs (Add-On),' in addition to a usage amount, and indication of whether that usage was on-demand" width="50%">}}
         </td>
         <td>Add-on with Flex Logs</td>
       </tr>
       <tr>
         <td><strong>SIEM - Analyzed Logs</strong><br />
           {{< img src="security/cloud_siem/guide/tile_analyzed_logs.png" alt="Tile labelled with 'SIEM - Analyzed Logs,' in addition to a usage amount, and indication of whether that usage was on-demand" width="50%">}}
         </td>
         <td>Legacy</td>
       </tr>
     </tbody>
   </table>

## Check the Cloud SIEM settings page{#settings}

In Datadog, go to the [Cloud SIEM settings][2] page. The page shows either a **Core Configuration** or **Settings** section, which indicates the Cloud SIEM product your organization is using.
<table>
  <thead>
    <tr>
      <th style="width:80%">Settings section</th>
      <th style="width:20%">Product</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Index Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_index.png" alt="Configuration settings including a Core Configuration heading, which contains an Index Configuration section" width="80%">}}
      </td>
      <td>Standalone</td>
    </tr>
    <tr>
      <td><strong>Core Configuration</strong> section with <strong>Security Filters Configuration</strong><br />
        {{< img src="security/cloud_siem/guide/config_core_security_filters.png" alt="Configuration settings including a Core Configuration heading, which contains an Index Configuration section" width="80%">}}
      </td>
      <td>Add-on with Flex Logs</td>
    </tr>
    <tr>
      <td><strong>Sources</strong> table<br />
        {{< img src="security/cloud_siem/guide/config_sources.png" alt="Configuration settings including a Sources table" width="80%">}}
      </td>
      <td>Legacy</td>
    </tr>
  </tbody>
</table>


[1]: https://app.datadoghq.com/billing/usage
[2]: https://app.datadoghq.com/security/configuration/siem/setup
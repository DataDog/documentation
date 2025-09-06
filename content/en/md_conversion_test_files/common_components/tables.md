---
title: Tables
---

## Plain Markdown tables

### Expected .md output

No changes expected, beyond some spacing changes that don't impact the parseability of the content. The rendering library uses a uniform format for outputting Markdown tables, which sometimes won't match the original markup exactly.

### Example input

| Column 1     | Column 2     | Column 3     | Supported? |
| ------------ | ------------ | ------------ | ---------- |
| Row 1, Col 1 | Row 1, Col 2 | Row 1, Col 3 | {{< X >}}  |
| Row 2, Col 1 | Row 2, Col 2 | Row 2, Col 3 |            |
| Row 3, Col 1 | Row 3, Col 2 | Row 3, Col 3 | {{< X >}}  |
| Row 4, Col 1 | Row 4, Col 2 | Row 4, Col 3 |            |

## HTML tables

### Expected .md output

Both of these should be included:

- A plain Markdown table rendered to the best of our ability, with a preference for omitting rows vs. accidentally changing their meaning.
- For further reference, the raw HTML contents, wrapped in a `{% raw_html %}` tag.

### Example input

<table>
  <colgroup>
    <col style="width:20%">
    <col style="width:20%">
  </colgroup>
  <tr>
    <th>Icon</th>
    <th>Description</th>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/access-point.png" alt="Access point icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Access Point</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/firewall.png" alt="Firewall icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Firewall</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/router.png" alt="Router icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Router</td>
  </tr>
  <tr>
   <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/server.png" alt="Server icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Server</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/switch.png" alt="Switch icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Switch</td>
  </tr>
  <tr>
    <td style="text-align:center;">{{<img src="/network_device_monitoring/network_topology_map/icons/device.png" alt="Device icon" style="width:10%; border:none;" popup="false">}}</td>
    <td>Device</td>
  </tr>
</table>
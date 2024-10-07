---
title: Diagram Multiple Cloud Accounts
---

Cloudcraft is a tool designed to help visualize and plan cloud architecture in a seamless and efficient manner. While the current live experience does not support diagrams involving multiple cloud accounts, this guide explains how to achieve this using the legacy experience within Cloudcraft.

Follow the steps below to consolidate multiple cloud accounts into a single cohesive diagram.

## Multiple accounts diagram

### 1. Enable the legacy experience

To work with multiple cloud accounts, use the legacy diagramming experience. Follow these steps to enable it:

1. Open Cloudcraft and navigate to the **Live** tab.
2. Locate the **New Live Experience** toggle switch and ensure it is turned off.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/new-live-experience-toggle.png" alt="Cloudcraft interface showing new live experience toggle for multiple cloud accounts." responsive="true" style="width:100%;">}}

### 2. Layout the first account

Once the legacy experience is enabled, proceed with laying out the first account:

1. Choose the initial cloud account you want to visualize.
2. Start a scan of this account to gather its current architecture details.
3. Select the **Auto Layout** button to automatically arrange the components of this account within the diagram.

### 3. Layout the second account

After successfully laying out the first account, you can incorporate additional accounts into the diagram:

1. Choose the second cloud account you wish to add.
2. Perform a scan of the second account to capture its architecture.
3. Select **Auto Layout** again. This time, access the **Options** dropdown and select **Include existing components.** This action ensures the components from the first account remain visible, integrating both accounts into a single diagram.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/auto-layout-options.png" alt="Cloudcraft interface showing AWS inventory and live component options." responsive="true" style="width:100%;">}}

<div class="alert alert-info">You can repeat this process to include more accounts in a diagram.</div>

By following the above steps, you will have a consolidated view of multiple cloud accounts within one Cloudcraft diagram. Review the layout to ensure all necessary components are included and positioned as desired. Adjust any placements manually if needed to improve clarity or presentation.

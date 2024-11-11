---
title: Diagram Multiple Cloud Accounts
---

Cloudcraft is a tool designed to help visualize and plan cloud architecture in a seamless and efficient manner. This guide explains how to use the legacy experience within Cloudcraft to diagram multiple cloud accounts. Consolidate multiple cloud accounts into a single cohesive diagram with the following steps.



## 1. Enable the legacy experience

To work with multiple cloud accounts, you must enable the legacy diagramming experience:

1. Open Cloudcraft and navigate to the **Live** tab.
2. Locate the **New Live Experience** toggle and ensure it is switched **off**.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/new-live-experience-toggle.png" alt="Cloudcraft interface showing new live experience toggle for multiple cloud accounts." responsive="true" style="width:100%;">}}

## 2. Layout the first account

After the legacy experience is enabled, lay out the first account:

1. Choose the initial cloud account you want to visualize.
2. Start a scan of this account to gather its current architecture details.
3. Select the **Auto Layout** button to automatically arrange the components of this account within the diagram.

## 3. Layout the second account

After successfully laying out the first account, you can add more accounts into the diagram:

1. Choose the second cloud account you wish to add.
2. Perform a scan of the second account to capture its architecture.
3. Select **Auto Layout**. 
4. Access the **Options** dropdown and select **Include existing components.** This action ensures the components from the first account remain visible, integrating both accounts into a single diagram.

{{< img src="cloudcraft/getting-started/diagram-multiple-cloud-accounts/auto-layout-options.png" alt="Cloudcraft interface showing AWS inventory and live component options." responsive="true" style="width:100%;">}}

<div class="alert alert-info">You can repeat this process to include more accounts in a diagram.</div>

Follow the above steps to have a consolidated view of multiple cloud accounts within one Cloudcraft diagram. Review the layout to ensure all necessary components are included and positioned as desired. Adjust any placements manually if needed to improve clarity or presentation.

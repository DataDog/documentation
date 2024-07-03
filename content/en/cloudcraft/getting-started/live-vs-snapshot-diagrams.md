---
title: Live vs Snapshot Diagrams
---

## Overview

Cloudcraft offers two types of diagrams for visualizing your cloud infrastructure: Live and Snapshot. This document explains the key differences between these diagram types and how to use them effectively.

## Live diagrams

Live diagrams provide real-time representation of your AWS or Azure infrastructure. Key features include:

- **Automatic updates**: The diagram reflects changes in your infrastructure when you access it.
- **Real-time accuracy**: Ensures your diagram always represents the current state of your cloud infrastructure.
- **Read-only**: Prevents accidental modifications to your infrastructure layout.

## Snapshot diagrams

Snapshot diagrams offer a static view of your infrastructure that you can modify to suit your visual needs. Important characteristics include:

- **Editable layout**: Allows you to move components and adjust the diagram's design.
- **Custom additions**: You can add components from the Design tab.
- **Static representation**: The diagram doesn't update automatically to reflect infrastructure changes.

## Key differences

### Updating mechanism

- **Live diagrams**: Update automatically when accessed, reflecting any changes in your AWS or Azure infrastructure.
- **Snapshot diagrams**: Remain static an don't update automatically.

### Editing capabilities

- **Live diagrams**: Read-only prevents modifications to the diagram.
- **Snapshot diagrams**: Allow full editing of the layout and design.

### Transitioning between diagram types

- **Live to Snapshot**: Any modification to a Live diagram (e.g., moving a component or adding a new one) automatically switches it to Snapshot mode.
- **Snapshot to Live**: Reverting to Live mode discards all changes made in Snapshot mode.

## Using Live and Snapshot diagrams

1. Start with a Live diagram to get an accurate, current view of your infrastructure. See [Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering][1] for more information.
2. Make changes to the layout, design, or components, which automatically switches the diagram to Snapshot mode.
3. In Snapshot mode, freely adjust the layout and design as needed.
4. To update the diagram with the latest infrastructure changes, switch back to Live mode by selecting the mode drop-down in the top-right corner of the diagram. However, note that this action deletes all modifications made in Snapshot mode.

{{< img src="cloudcraft/getting-started/live-vs-snapshot-diagrams/mode-dropdown.png" alt="Screenshot of Cloudcraft's diagram mode selection drop-down showing the Live and Snapshot modes." responsive="true" style="width:100%;">}}

By understanding the differences between Live and Snapshot diagrams, you can effectively visualize and manage your cloud infrastructure in Cloudcraft.

[1]: /cloudcraft/getting-started/crafting-better-diagrams/

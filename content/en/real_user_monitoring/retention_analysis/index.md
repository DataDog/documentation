---
title: Retention Analysis
kind: documentation
private: true
is_beta: true
---

<div class="alert alert-info">Retention Analysis is in private beta. If you have any questions, contact your customer success manager.</a></div>

## Overview
RUM Retention Analysis allows you to measure how often users are successfully returning to a page or action. By tracking user retention over time, you can measure user engagement with specific features as a tool to understand their overall satisfaction.

## Build a graph and analyze a cohort

A cohort is a group of users who participate in an *initial event*, such as clicking a link. Each user is considered retained if they subsequently complete a *return event*, such as clicking the same link again, viewing a page, or clicking a **Proceed to Payment** button.

The retention graph displays the percentage of users who completed the return event each week.

<!-- SCREENSHOT: Retention graph -->

To build a retention graph, navigate to **RUM > Retention Analysis**.

### Define the initial event
1. Select the view or action to act as the initial event for defining a group of users.
2. Optionally, add filters such as the device used or the country of origin.
  - If your initial event is a view, you can add any view facets or context facets.
  - If your initial event is an action, you can add any action facets or context facets.

### Define the return event

### Analyze the cohort
TODO: Notes on what the different graphs show. Note that they can download results to CSV or click on a diagram cell to view a sidepanel list of users.

## Limitations

Retention Analysis is in private beta, and has the following limitations:
- Retention is limited to 30 days unless your organization is configured to retain data for 90 days. You can file a support ticket to increase retention to 90 days at no additional cost.
- The unique user attributes field must be populated. (TODO: Link to the field docs.)
- Only views and actions can act as events.
- While retention data can be downloaded as a CSV, the retention graph itself cannot be exported.
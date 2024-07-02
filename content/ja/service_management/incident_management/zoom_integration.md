---
title: Zoom Integration
kind: documentation
description: Connect Zoom to Datadog to help your team collaborate
private: true
---

## Overview

By connecting Zoom and Datadog, you can quickly create Zoom meetings to collaborate with your team on active incidents.

## Setup

### Installation

To install the Datadog for Zoom app:

1. In Datadog, find the Incidents Settings page under **Service Management**.
2. Go to **Integrations** and enable the **Automatically create a meeting in Zoom for every incident** toggle. This setting replaces the **Add Video Call** button with a **Start Zoom Call** button for one-click Zoom meeting creation from Datadog's incident overview page.
3. When you click the **Start Zoom Call** button, you are prompted to add the Datadog Zoom App. Be sure to allow it to view and manage information on Zoom's behalf.

## Usage

Once the app has been installed, you can click the **Start Zoom Call** button from an incident to create a new Zoom call and link it to the incident automatically.

## Permissions

Datadog for Zoom requires the following OAuth Scopes. For more information, see the [Zoom OAuth scopes documentation][2].

### User-level Scopes

| Scopes                   | Request Reason                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Create meetings when users click **Start Zoom Call** in the Incident Management product.                         |

## Removing the App
To remove the Datadog for Zoom app:

1. Log into your Zoom account and navigate to the Zoom App Marketplace.
2. Click **Manage** > **Added Apps**, or search for the **Datadog** app.
3. Click the **Datadog** app.
4. Click **Remove**.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: /help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/

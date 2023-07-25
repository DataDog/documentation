---
title: Zoom Integration
kind: documentation
description: Connect Zoom to Datadog to help your team collaborate
private: true
---

## Overview

Connect Zoom to Datadog to help your team collaborate by quickly creating Zoom meetings for active incidents.

## Setup

### Installation

First, in the Incident Management settings, a user must enable the **Automatically create a meeting in Zoom for every incident** toggle. This setting replaces the **Add Video Call** button with a **Start Zoom Call** button for one-click Zoom meeting creation from the incident overview page.

Next, when a user first clicks the **Start Zoom Call** button, they are prompted to add the Datadog Zoom App and allow it to view and manage information on their behalf.

## Usage

After the app has been installed, users are able to click the **Start Zoom Call** button from a incident to create a new Zoom call and link it to the incident automatically.

## Permissions

Datadog for Zoom requires the following OAuth Scopes. For more information, see the [Zoom OAuth scopes documentation][2].

### User-level Scopes

| Scopes                   | Request Reason                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `meeting:write`          | Create meetings when users click **Start Zoom Call** in the Incident Management product.                         |

## Removing the App

1. Log in to your Zoom account and navigate to the Zoom App Marketplace.
2. Click **Manage** >> **Added Apps**, or search for the **Datadog** app.
3. Click the **Datadog** app.
4. Click **Remove**.

## Troubleshooting

Need help? Contact [Datadog support][1].

[1]: https://docs.datadoghq.com/help/
[2]: https://developers.zoom.us/docs/integrations/oauth-scopes/

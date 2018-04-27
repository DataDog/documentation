---
description: Centrally track error rates across your applications as they rise and
  fall.
doclevel: basic
integration_title: Bugsnag
kind: integration
placeholder: true
title: Datadog-Bugsnag Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Bugsnag provides software teams with an automated crash detection platform for their web and mobile applications. Bugsnag automatically captures and alerts you of errors as they happen. Integrating Datadog with Bugsnag will send error notifications to your Datadog event stream.

With this integration:

- Get a summary of the error in your Datadog event stream
- Get notified when a project has a spike in error rates
- Filter notifications by severity and release stage

## Setup
### Installation

No installation is required.

### Configuration

To integrate Bugsnag with Datadog:

1. Go to **Settings** in [Bugsnag](https://bugsnag.com/) for the project you would like to configure to send notifications to Datadog.

2. Select **Team Notifications** and then **Datadog**.

3. Customize the notifications you'll see in Datadog by selecting error notification triggers.
{{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_notification_setting" >}}

4. Apply custom filters to your notification triggers to see errors from specific release stages and severities.
{{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_filters_setting" >}}

5. Enter your Datadog API key.

6. Select **Test Notification** to test the configuration. A test error from Bugsnag should appear in your Datadog application.

7. Save your settings.

8. Add more streams from the same project to see error events based on a different set of notification criteria.

## Data Collected
### Metrics

This integration does not include metrics at this time.

### Events

This integration will push configured Bugsnag errors and alerts to your Datadog event stream.

---
title: Datadog-Sumo Logic Integration
integration_title: Sumo Logic
kind: integration
---

## Overview

Datadog integrates with Sumo Logic in two ways: you can forward Sumo Logic log data to your Datadog event stream, and you can use Sumo Logic as a notification channel from Datadog alerts and events. In other words, each service can inform the other.

## Installation

### Datadog to Sumo Logic

1. Login to Sumo Logic as a user with Administrator rights.
2. From the main menu, choose **Manage** -> **Collection**.
3. Click the **Add Collector** link at the top left. ![Hosted Collection](/static/images/integrations-sumo-hostedcollector.png)
4. Choose **Hosted Collector**.
5. Enter a Name and optionally a description, category, and time zone. Click **Save**.
6. Click **HTTP** under Cloud APIs. Fill in the form as appropriate for the collector. Click **Save**.
7. Copy the URL given on the next dialog. You will need this again soon.
8. Go to the [Sumo Logic Integration settings](https://app.datadoghq.com/account/settings#integrations/sumo_logic) screen in Datadog.
9. Enter the name you want to assign to the collector and the URL from above.
10. Next time you want to send a message from Datadog to Sumo Logic, use **@sumologic-{YOUR COLLECTOR NAME}**.

### Sumo Logic to Datadog

1. Login to Sumo Logic as a user with Administrator rights.
2. From the main menu, choose **Manage** -> **Connections**.
3. Click the **Add** button.
4. Click the **Datadog** button. ![Click the Datadog Button](/static/images/integrations-sumo-connectiontype.png)
5. Give the connection a Name and optionally a Description. For the URL, enter:

        https://app.datadoghq.com/api/v1/events?api_key=YOUR_API_KEY

6. Customize the payload as needed. Click the **Help** link to learn about the available variables.
7. Click **Test Connection**. You should see a new item in your Event Stream similar to this: ![Test Event](/static/images/integrations-sumo-event.png)
8. If everything looks good, click **Save**.
9. In Sumo Logic, save any search and choose to schedule the search.
10. Choose Webhook for the **Alert Type**. Choose your new Datadog Connection from the list of webhooks. Optionally customize the Payload. You will probably want to change the **Alert Condition** to send a notification only if the number of results is greater than 0. ![Hosted Collection](/static/images/integrations-sumo-savesearch.png)


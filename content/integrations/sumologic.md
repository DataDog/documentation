---
title: Datadog-SumoLogic Integration
integration_title: SumoLogic
kind: integration
---

## Overview

Enable the Sumo Logic integration to:

* correlate your log data with Datadog metrics
* send your alerts to Sumo Logic

## Installation

There are two parts to the SumoLogic integration, based on the direction of information between the products. You can send alerts and events from Datadog to Sumologic and you can have SumoLogic send data to Datadog.

### Datadog to SumoLogic

1. Login to SumoLogic.
2. From the main menu, choose **Manage** -> **Collection**.
3. Click the **Add Collector** link at the top left. ![Hosted Collection](/static/images/integrations-sumo-hostedcollector.png)
4. Choose **Hosted Collector**.
5. Enter a Name and optionally a description, category, and time zone. Click **Save**.
6. Click **HTTP** under Cloud APIs. Fill in the form as appropriate for the collector. Click **Save**.
7. Copy the URL given on the next dialog. You will need this again soon.
8. Go to the [SumoLogic Integration settings](https://app.datadoghq.com/account/settings#integrations/sumo_logic) screen in Datadog.
9. Enter the name you want to assign to the collector and the URL from above.
10. Next time you want to send a message from Datadog to SumoLogic, use **@sumologic-{YOUR COLLECTOR NAME}**.


### SumoLogic to Datadog

1. Login to SumoLogic.
2. From the main menu, choose **Manage** -> **Connections**.
3. Click the **Add** button.
4. Click the **Datadog** button. ![Click the Datadog Button](/static/images/integrations-sumo-connectiontype.png)
5. Give the connection a Name and optionally a Description. For the URL, enter:

        https://app.datadoghq.com/api/v1/events?api_key=YOUR_API_KEY

6. Customize the payload as needed. Click the **Help** link to learn about the available variables.
7. Click **Test Connection**. You should see a new item in your Event Stream similar to this: ![Test Event](/static/images/integrations-sumo-event.png)
8. If everything looks good, click **Save**.
9. In SumoLogic, save any search and choose to schedule the search.
10. Choose Webhook for the **Alert Type**. Choose your new Datadog Connection from the list of webhooks. Optionally customize the Payload. You will probably want to change the **Alert Condition** to send a notification only if the number of results is greater than 0. ![Hosted Collection](/static/images/integrations-sumo-savesearch.png)


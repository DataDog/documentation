---
"aliases":
- "/integrations/sumologic/"
"categories":
- "notifications"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Sumo Logic から Datadog にログを送信。Datadog 通知を Sumo Logic に送信。"
"doc_link": "https://docs.datadoghq.com/integrations/sumologic/"
"draft": false
"git_integration_title": "sumo_logic"
"has_logo": true
"integration_id": ""
"integration_title": "Sumo Logic"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "sumo_logic"
"public_title": "Datadog-Sumo Logic Integration"
"short_description": "Send logs from Sumo Logic to Datadog; send Datadog notifications to Sumo Logic."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Datadog integrates with Sumo Logic in two ways: you can forward Sumo Logic log data to your Datadog event stream, and you can use Sumo Logic as a notification channel from Datadog alerts and events. In other words, each service can inform the other.

## セットアップ

### インストール

#### Datadog to Sumo Logic

1. Login to Sumo Logic as a user with Administrator rights.
2. From the main menu, choose **Manage** -> **Collection**.
3. Click the **Add Collector** link at the top left. {{< img src="integrations/summologic/integrations-sumo-hostedcollector.png" alt="Hosted Collection" popup="true">}}
4. Choose **Hosted Collector**.
5. Enter a Name and optionally a description, category, and time zone. Click **Save**.
6. Click **HTTP** under Cloud APIs. Fill in the form as appropriate for the collector. Click **Save**.
7. Copy the URL given on the next dialog.
8. Go to the [Sumo Logic Integration settings][1] screen in Datadog.
9. Enter the name you want to assign to the collector and the URL from above.
10. Next time you want to send a message from Datadog to Sumo Logic, use **@sumologic-{YOUR COLLECTOR NAME}**.

#### Sumo Logic to Datadog

1. Login to Sumo Logic as a user with Administrator rights.
2. From the main menu, choose **Manage** -> **Connections**.
3. Click the **Add** button.
4. Click the **Datadog** button. {{< img src="integrations/summologic/integrations-sumo-connectiontype.png" alt="Click the Datadog Button" popup="true">}}
5. Give the connection a Name and optionally a Description. For the URL, enter:

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<DATADOG_API_KEY>
    ```

6. Customize the payload as needed. Click the **Help** link to learn about the available variables.
7. Click **Test Connection**. You should see a new item in your Event Stream similar to this: {{< img src="integrations/summologic/integrations-sumo-event.png" alt="Test Event" popup="true">}}
8. If everything looks good, click **Save**.
9. In Sumo Logic, save any search and choose to schedule the search.
10. Choose Webhook for the **Alert Type**. Choose your new Datadog connection from the list of webhooks. Optionally customize the payload and change the **Alert Condition** to send a notification only if the number of results is greater than 0. {{< img src="integrations/summologic/integrations-sumo-savesearch.png" alt="Hosted Collection" popup="true">}}

[1]: https://app.datadoghq.com/integrations/sumo_logic


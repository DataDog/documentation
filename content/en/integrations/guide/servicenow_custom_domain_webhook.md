---
title: Configure Webhook Integration for ServiceNow with a Custom Domain
further_reading:
- link: "/integrations/servicenow/"
  tag: "Documentation"
  text: "ServiceNow integration"
- link: "/integrations/webhooks"
  tag: "Documentation"
  text: "Webhooks integration"
---

## Overview

The Datadog ServiceNow integration is built to support instances with the `.service-now.com` domain. If you have a self-managed ServiceNow instance on a custom domain and encounter errors, you can use the [Datadog Webhooks integration][1] to send alerts to your ServiceNow instance.

## Setup

1. Navigate to the [Webhooks integration tile][1] in Datadog.
2. Click **New Webhook** and configure:
   - **Name**: `servicenow-alerts`
   - **URL**: Your ServiceNow endpoint (for example, `https://your-instance.example.com/api/now/table/incident`)
   - **Encode as Basic Auth**: Enable and enter your ServiceNow username and password
   - **Payload**:

      ```json
      {
        "short_description": "$EVENT_TITLE",
        "description": "$EVENT_MSG",
        "urgency": "3",
        "category": "monitoring"
      }
      ```


3. Click **Save**.
4. In your monitor notifications, add `@webhook-servicenow-alerts` to send alerts to ServiceNow.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/webhooks
[2]: https://app.datadoghq.com/integrations/webhooks
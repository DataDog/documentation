---
"app_id": "salesforce-commerce-cloud"
"app_uuid": "fe465a7e-7702-40fb-9a88-a0e4198d1983"
"assets":
  "integration":
    "auto_install": false
    "configuration": {}
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "616"
    "source_type_name": Salesforce Commerce Cloud
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "salesforce_commerce_cloud"
"integration_id": "salesforce-commerce-cloud"
"integration_title": "Salesforce Commerce Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "salesforce_commerce_cloud"
"public_title": "Salesforce Commerce Cloud"
"short_description": "Import your Salesforce Commerce Cloud logs into Datadog"
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Import your Salesforce Commerce Cloud logs into Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Salesforce Commerce Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Salesforce Commerce Cloud is a multi-tenant, cloud-based commerce platform. Integrate Salesforce Commerce Cloud with
Datadog to view and parse your logs using [Datadog Logs][1].

## Setup

### Installation

No installation is required.

### Configuration

To configure Salesforce Commerce Cloud to allow access for Datadog to import log data, you must create
an API client. Then, register that API client with Datadog.

#### Creating an API client
1. Follow the steps in the [Commerce Cloud instructions for creating a client][2]. In the `Token Endpoint Auth Method` field choose `private_key_jwt`. For the `Access Token Format` field choose `JWT`. **Note**: This integration only supports API clients provisioned using the main Account Manager instance at `https://account.demandware.com/`.
2. Make note of the API client ID and secret (also called the username and password.) They are needed in subsequent steps.
3. Under **Administration >  Organization >  WebDAV Client Permissions** in your Business Manager interface, add the following JSON. Make sure to insert your client ID in the appropriate place.

```json
{  
   "clients":[  
      {  
         "client_id":"<your-client-id-here>",
         "permissions":[  
            {  
               "path":"/logs",
               "operations":[  
                  "read"
               ]
            }
         ]
      }
   ]
}
```

#### Connecting the Datadog integration

1. Click **Add New** on the Configuration tab of the [Salesforce Commerce Cloud integration tile][3].
2. Enter your Business Manager domain (for example, `my-0001.sandbox.us02.dx.commercecloud.salesforce.com`) and the API client ID and secret obtained in the previous step.
3. Click the green checkmark **Save** button.

#### Results

Wait ten minutes to see [logs][1] coming in under the source `salesforce.commerce.cloud`. 

The SFCC Log Center represents log data differently than Datadog does. For instance, some error logs with large stack traces are broken into two log events in the SFCC Log Center, while the stack trace details are omitted in Datadog. This results in a discrepancy in the total count of log events between the two systems.

## Data Collected

### Metrics

The Salesforce Commerce Cloud integration does not include any metrics.

### Logs

The Salesforce Commerce Cloud integration collects logs via a webdav connection to your Commerce Cloud instance. 

### Service Checks

The Salesforce Commerce Cloud integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][4].

[1]: /logs/
[2]: https://help.salesforce.com/s/articleView?id=cc.b2c_account_manager_add_api_client_id.htm&type=5
[3]: https://app.datadoghq.com/account/settings#integrations/salesforce-commerce-cloud
[4]: https://docs.datadoghq.com/help/


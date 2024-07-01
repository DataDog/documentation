---
"app_id": "oracle-cloud-infrastructure"
"app_uuid": "c2b4d38f-dd23-4ca2-8bc4-b70360868e8c"
"assets":
  "dashboards":
    "OCI-Overview-Beta": assets/dashboards/oci-overview-beta-dashboard.json
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check":
      - oci.computeagent.cpu_utilization
      "metadata_path": metadata.csv
      "prefix": oci.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "310"
    "source_type_name": Oracle Cloud Infrastructure
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- cloud
- log collection
- network
- oracle
"custom_kind": "integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "oracle_cloud_infrastructure"
"integration_id": "oracle-cloud-infrastructure"
"integration_title": "Oracle Cloud Infrastructure"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "oracle_cloud_infrastructure"
"public_title": "Oracle Cloud Infrastructure"
"short_description": "Oracle Cloud Infrastructure (OCI) is an IaaS platform that delivers high-performance computing and simple migrations."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Network"
  - "Category::Oracle"
  "configuration": "README.md#Setup"
  "description": Oracle Cloud Infrastructure (OCI) is an IaaS platform that delivers high-performance computing and simple migrations.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Oracle Cloud Infrastructure
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

Oracle Cloud Infrastructure (OCI) is an infrastructure-as-a-service (IaaS) and platform-as-a-service (PaaS) used by enterprise-scale companies. With a full suite of managed services for hosting, storage, networking, databases, and more.

With the Datadog integration, OCI users can stream all of their logs directly into Datadog, where they can then be stored indefinitely, analyzed for troubleshooting, and monitored for security and compliance posturing.

## Setup

### Log collection

Send logs from your Oracle Cloud Infrastructure to Datadog by following either process:

{{< tabs >}}
{{% tab "Service Connector Hub" %}}

1. Configure an OCI log.
2. Create an OCI function.
3. Setup an OCI Service Connector.

The instructions below use the OCI portal to set up the integration.

#### OCI logging

1. In the OCI portal, navigate to *Logging -> Log Groups*.
2. Select your compartment and click **Create Log Group**. A side panel opens.
3. Enter `data_log_group` for the name, and optionally provide a description and tags.
4. Click **Create** to set up your new Log Group.
5. Under **Resources**, click **Logs**.
6. Click to **Create custom log** or **Enable service log** as desired.
7. Click **Enable Log**, to create your new OCI Log.

For more information on OCI Logs, see [Enabling Logging for a Resource][1].

#### OCI function

1. In the OCI portal, navigate to *Functions*.
2. Select an existing application or click **Create Application**.
3. Create a new OCI function within your application. See the [Oracle Overview of Functions][2] for details.
4. It is recommended to create a boilerplate Python function first and replace the auto generated files with Datadog's source code:
   - Replace `func.py` with code from the [Datadog OCI repo][3].
   - Replace `func.yaml` with code from the [Datadog OCI repo][4]. `DATADOG_TOKEN` and `DATADOG_HOST` must be replaced with your Datadog API key and region logs intake link.
   - Replace `requirements.txt` with code from the [Datadog OCI repo][5].

#### OCI service connector hub

1. In the OCI portal, navigate to *Logging -> Service Connectors*.
2. Click **Create Service Connector** to be directed to the **Create Service Connector** page.
3. Select the **Source** as Logging and **Target** as Functions.
4. Under **Configure Source Connection** select a **Compartment name**, **Log Group**, and **Log**. (The **Log Group** and **Log** created in the first step)
5. If you also want to send **Audit Logs**, click **+Another Log** and select the same **Compartment** while replacing "_Audit" as your **Log Group**.
6. Under **Configure target** select a **Compartment**, **Function application**, and **Function**. (The **Function Application** and **Function** created in the previous step)
7. If you are prompted to create a policy, click **Create** from the prompt.
8. Click **Create** at the bottom to finish creating your Service Connector.

For more information on OCI Object Storage, see [Oracle's Service Connector blog post][6].

## Troubleshooting

Need help? Contact [Datadog support][7].


[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
[7]: https://docs.datadoghq.com/help/
{{% /tab %}}
{{% tab "Object store" %}}

1. Configure an OCI log.
2. Create an OCI object store and enable read/write access for OCI logs.
3. Create an OCI function.
4. Set up an OCI event.

The instructions below use the OCI portal to set up the integration.

#### OCI logging

1. In the OCI portal, navigate to *Solutions and Platform -> Logging -> Logs*.
2. Click **Create Custom Log** to be directed to the **Create Custom Log** page.
3. Give your new OCI log a name.
4. Select a **Compartment** and **Log Group**. These selections remain consistent across the entire installation.
5. Click **Create Custom Log** to be directed to the **Create Agent Config** page.
6. Click **Create new configuration**.
7. Give your new configuration a name. Your compartment is preselected for you.
8. Set the group type to **Dynamic Group** and group to one of your existing groups.
9. Set the input type to **Log Path**, enter your preferred input name and use "/" for file paths.
10. Click **Create Custom Log**, then your OCI log is created and available on the logs page.

For more information on OCI Logs, see [Enabling Logging for a Resource][1].

#### OCI object storage

1. In the OCI portal, navigate to *Core Infrastructure -> Object Storage -> Object Storage*.
2. Click **Create Bucket** to be directed to the **Create Bucket** form.
3. Select **Standard** for your storage tier and check **Emit Object Events**.
4. Complete the rest of the form based on your preference.
5. Click **Create Bucket**, then your bucket is created and available in the bucket list.
6. Select your new bucket from the active bucket list and click **Logs** under resources.
7. Toggle **read** to enabled which directs you to an **Enable Log** side menu.
8. Select a **Compartment** and **Log Group** (use the same selections as your OCI log).
9. Enter a name for the **Log Name** and select your preferred log retention.

For more information on OCI Object Storage, see [Putting Data into Object Storage][2].

#### OCI function

1. In the OCI portal, navigate to *Solutions and Platform -> Developer Services -> Functions*.
2. Select an existing application or click **Create Application**.
3. Create a new OCI function within your application. See the [Oracle Overview of Functions][3] for more details.
4. It is recommended to create a boilerplate Python function first and replace the auto generated files with Datadog's source code:
   - Replace `func.py` with code from the [Datadog OCI repo][4].
   - Replace `func.yaml` with code from the [Datadog OCI repo][5]. `DATADOG_TOKEN` and `DATADOG_HOST` must be replaced with your Datadog API key and region logs intake link.
   - Replace `requirements.txt` with code from the [Datadog OCI repo][6].

#### OCI event

1. In the OCI portal, navigate to *Solutions and Platform -> Application Integration -> Event Service*.
2. Click **Create Rule** to be directed to the **Create Rule** page.
3. Give your event rule a name and description.
4. Set your condition as **Event Type**, service name as **Object Storage**, and event type as **Object - Create**.
5. Set your action type as **Functions**.
6. Ensure that your function compartment is the same selection you made for OCI Log, OCI Bucket, and OCI Function.
7. Select your function application and function (according to the previous installation step.)
8. Click **Create Rule**, then your rule is created and available in the rules list.

For more information on OCI Object Storage, see [Getting Started with Events][7].



[1]: https://docs.cloud.oracle.com/en-us/iaas/Content/Logging/Concepts/service_logs.htm#enabling_logging
[2]: https://docs.cloud.oracle.com/en-us/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/en-us/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/en-us/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}
{{< /tabs >}}


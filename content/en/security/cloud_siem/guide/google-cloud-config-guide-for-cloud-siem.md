---
title: Google Cloud Configuration Guide for Cloud SIEM
further_reading:
- link: "/security/default_rules/#cat-cloud-siem-log-detection"
  tag: "Documentation"
  text: "Explore Cloud SIEM default detection rules"
- link: "/security/cloud_siem/investigate_security_signals"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security/cloud_siem/log_detection_rules/"
  tag: "Documentation"
  text: "Create new detection rules"
- link: "/integrations/google_cloud_platform/#log-collection"
  tag: "Documentation"
  text: "Collect Google Cloud Platform logs"
- link: "https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/"
  tag: "Blog"
  text: "Visualize activity in your Google Cloud environment with Datadog Cloud SIEM Investigator"
---

## Overview

[Datadog Cloud SIEM][1] applies detection rules to all processed logs in Datadog to detect threats, like a targeted attack, a threat intel listed IP communicating with your systems, or an insecure resource modification. The threats are surfaced as Security Signals in the Security Signals Explorer for triaging.

Use [Google Cloud Dataflow][2] and the [Datadog template][3] to forward logs from your Google Cloud services to Datadog. This guide walks you through the following steps so that you can start detecting threats with your Google Cloud audit logs:

1. [Enable Data Access audit logs](#enable-data-access-audit-logs)
1. [Create a Google Cloud publish/subscription (Pub/Sub) topic and pull subscription](#create-a-google-cloud-publishsubscription-pubsub-system) to receive logs from a configured log sink
1. [Create a custom Dataflow worker service account](#create-a-custom-dataflow-worker-service-account)
1. [Create a log sink to publish logs to the Pub/Sub](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Create and run the Dataflow job](#create-and-run-the-dataflow-job)
1. [Use Cloud SIEM to triage Security Signals](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Collecting Google Cloud logs with a Pub/Sub Push subscription</a> is in the process of being deprecated for the following reasons:

- If you have a Google Cloud VPC, the Push subscription cannot access endpoints outside the VPC.
- The Push subscription does not provide compression or batching of events, and so is only suitable for a low volume of logs.

Documentation for the <strong>Push</strong> subscription is only maintained for troubleshooting or modifying legacy setups. Use a <strong>Pull</strong> subscription with the Datadog Dataflow template to forward your Google Cloud logs to Datadog instead.
</div>

## Enable Data Access audit logs

1. Navigate to the IAM & Admin Console > [Audit Log][4].
1. Select the services for which you want to enable data access logs.
1. In the **Log Types** panel, enable **Admin Read**, **Data Read**, and **Data Write**.
1. Click **Save**.

### Change default configuration for new services

If a new Google Cloud service is added, it inherits your [default audit configuration][5].

To ensure that Data Access audit logs are captured for new Google Cloud services, modify your default audit configuration:

1. Navigate to the **IAM & Admin Console > [Audit Log][4]**.
1. Enable **Admin Read**, **Data Read**, and **Data Write**.
1. Click **Save**.

## Create a Google Cloud publish/subscription (Pub/Sub) system

1. Navigate to Pub/Sub > [Topics][5].
1. Click **Create Topic**.
1. Enter a descriptive topic name. For example, `export-audit-logs-to-datadog`.
1. Leave **Add a default subscription** selected, which creates a subscription with default configuration values. The name of the subscription is automatically generated as your topic name with "-sub" appended to it. This subscription name is used when you create your [Dataflow job](#create-and-run-the-dataflow-job) later.
1. Click **Create**.

### Create an additional topic and subscription for outputDeadletterTopic parameter
Create an additional topic and default subscription to handle any log messages rejected by the Datadog API. This topic is used when you set up the [Dataflow job](#create-and-run-the-dataflow-job) later.

1. Navigate back to Pub/Sub > [Topics][5]
1. Click **Create Topic**.
1. Enter a descriptive topic name.
1. Leave **Add a default subscription** selected.
1. Click **Create**.

**Warning**: Pub/subs are subject to [Google Cloud quotas and limitations][6]. If the number of logs you have is higher than those limitations, Datadog recommends you split your logs over several topics. See [Monitor the Log Forwarding][7] for information on how to set up a monitor to notify when you are close to those limits.

### Create a secret in Secret Manager

Datadog recommends creating a secret in [Secret Manager][8] with your valid Datadog API key value. This secret is used when you set up the [Dataflow job](#create-and-run-the-dataflow-job) later.

1. Navigate to Security > [Secret Manager][8].
1. Click **Create Secret**.
1. Enter a name for the secret.
1. Copy your [Datadog API key][9] and paste it into the **Secret value** section.
1. Optionally, set the other configurations based on your use case.
1. Click **Create Secret**.

## Create a custom Dataflow worker service account

The default behavior for Dataflow pipeline workers is to use your project's [Compute Engine default service account][10], which grants permissions to all resources in the project. If you are forwarding logs from a production environment, create a custom worker service account with only the necessary roles and permissions, and assign this service account to your Dataflow pipeline workers.

**Note**: If you are not creating a custom service account for the Dataflow pipeline workers, ensure that the default Compute Engine service account has the [required permissions](#required-permissions) below.

1. Navigate to Google Cloud's [Service Account][11] page.
1. Select your project.
1. Click **Create Service Account**.
1. Enter a descriptive name for the service account.
1. Click **Create and Continue**.
1. Add the following roles:
    ##### Required permissions
    | Role | Path | Description |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  Allow this service account to perform Dataflow administrative tasks
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  Allow this service account to perform Dataflow job operations 
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | Allow this service account to view messages from the Pub/Sub subscription with your Google Cloud logs
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | Allow this service account to consume messages from the Pub/Sub subscription with your Google Cloud logs
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | Allow this service account to publish failed messages to a separate subscription, which allows for analysis or resending the logs
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | Allow this service account to access the Datadog API key in Secret Manager
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | Allow this service account to read and write to the Cloud Storage bucket specified for staging files |
7. Continue **Continue**.
8. Click **Done**.

##  Create a log sink to publish logs to the Pub/Sub

1. Navigate to Google Cloud's [Logs Explorer][19].
1. Select **Log Router** in the left side menu.
1. Click **Create Sink**.
1. Enter a descriptive name for the sink.
1. Click **Next**.
1. In the **Select Sink Service** dropdown menu, select **Cloud Pub/Sub topic**.   
    **Note**: The Cloud Pub/Sub topic can be located in a different project.
1. In the **Select a Cloud Pub/Sub topic**, select the Pub/Sub created earlier.
1. Click **Next**.
1. Enter an inclusion filter for the logs you want to send to Datadog.
1. Click **Next**.
1. Optionally, enter an exclusion filter to exclude logs you do not want sent to Datadog.
1. Click **Create Sink**.

**Note**: You can create multiple exports from Google Cloud Logging to the same Pub/Sub topic with different sinks.

## Create and run the Dataflow job

1. Navigate to Google Cloud [Dataflow][20].
1. Click **Create job from template**.
1. Enter a name for the job.
1. Select a regional endpoint.
1. In the **Dataflow template** dropdown menu, select **Pub/Sub to Datadog**.
1. In **Required Parameters** section:  
      a. In the **Pub/Sub input subscription** dropdown menu, select the default subscription that was created earlier when you created a new [Pub/Sub system](#create-a-google-cloud-publishsubscription-pubsub-system).  
      b. Enter the following in the **Datadog Logs API URL** field:
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **Note**: Ensure that the Datadog site selector on the right of this documentation page is set to your Datadog site before copying the URL above.  
      c. In the **Output deadletter Pub/Sub topic** field, select the [additional topic](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic) you created earlier for receiving messages rejected by the Datadog API.  
      d. Specify a path for temporary files in your storage bucket in the **Temporary location** field.
1. If you [created a secret in Secret Manager](#create-a-secret-in-secret-manager) for your Datadog API key value earlier:  
    a. Click **Optional Parameters** to see the additional fields.  
    b. Enter the resource name of the secret in the **Google Cloud Secret Manager ID** field.  
        To get the resource name, go to your secret in [Secret Manager][8]. Click on your secret. Click on the three dots under **Action** and select **Copy resource name**.  
    c. Enter `SECRET_MANAGER` in the **Source of the API key passed** field.  
1. If you are not using a secret for your Datadog API key value:
    - **Recommended**:
        - Set `Source of API key passed` to `KMS`.
        - Set `Google Cloud KMS  key for the API key` to your Cloud KMS key ID.
        - Set `Logs API Key` to the encrypted API key.
    - **Not recommended**: `Source of API key passed` set to `PLAINTEXT` with `Logs API Key` set to the plaintext API key.
1. See [Template parameters][21] in the Dataflow template for details on other available options.
1. If you created a custom worker service account, select it in the **Service account email** dropdown menu.
1. Click **Run Job**.

See new logging events delivered to the Cloud Pub/Sub topic in the [Datadog Log Explorer][22].

## Use Cloud SIEM to triage Security Signals

Cloud SIEM applies out-of-the-box detection rules to all processed logs, including the Google Cloud audit logs you have just set up. When a threat is detected with a detection rule, a Security Signal is generated and can be viewed in the Security Signals Explorer.

- Go to the [Cloud SIEM Signals Explorer][23] to view and triage threats. See Security Signals Explorer for further details.
- You can also use the [Google Cloud Audit Log dashboard][24] to investigate anomalous activity.
- See [out-of-the-box detection rules][25] that are applied to your logs.
- Create [new rules][26] to detect threats that match your specific use case.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /integrations/google_cloud_platform/#monitor-the-cloud-pubsub-log-forwarding
[8]: https://console.cloud.google.com/security/secret-manager
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[11]: https://console.cloud.google.com/iam-admin/serviceaccounts
[12]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[13]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[16]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[17]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[18]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[19]: https://console.cloud.google.com/logs/
[20]: https://console.cloud.google.com/dataflow/
[21]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[22]: https://app.datadoghq.com/logs/
[23]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /security/default_rules/#cat-cloud-siem
[26]: /security/detection_rules/

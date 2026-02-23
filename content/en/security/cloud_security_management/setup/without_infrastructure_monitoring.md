---
title: Setting Up Cloud Security without Infrastructure Monitoring
---

## Set up Cloud Security with your cloud provider

In addition to setting up Cloud Security with or without an Agent, you can also set it up without Infrastructure Monitoring. Doing so disables metric data submission (including Custom Metrics) so that hosts stop showing up in Datadog.

### AWS

1. Navigate to the [AWS Integration configuration page][2] in Datadog.
1. On the **Configuration** tab, select the account you want to enable Cloud Security on.<br />If you don't see the required account, add it by clicking **Add AWS Account(s)** and following the onscreen prompts.
1. To turn off infrastructure monitoring on the selected account, under the account number, navigate to the **Metric Collection** tab, then click the **disable metric collection** link. Then, click **Disable Metric Collection** to confirm.
1. On the **Resource Collection** tab, click **Enable** next to Cloud Security. You are redirected to the Cloud Security Setup page, and a setup dialog automatically opens for the selected account.
1. On the setup dialog, switch the **Enable Resource Scanning** toggle to the on position.
1. Click **Done** to complete the setup.

**Note**: In your Cloud Security settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

### Azure

1. Navigate to the [Azure Integration configuration page][3] in Datadog.
1. Select the client ID or subscription you want to enable Cloud Security on.<br />If you don't see the required client ID, add it by clicking **Add New App Registration** and following the onscreen prompts.
1. To turn off infrastructure monitoring on the selected account, under the client ID, navigate to the **Metric Collection** tab, then turn off the **Enable Metric Collection** toggle. 
1. On the **Resource Collection** tab, click **Enable** next to Cloud Security. You are redirected to the Cloud Security Setup page, which automatically scrolls to the selected Azure subscription in the Cloud Integrations section.
1. Switch the **Resource Scanning** toggle to the on position.
1. Click **Done** to complete the setup.

**Note**: In your Cloud Security settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

### Google Cloud Platform

1. Navigate to the [Google Cloud Platform configuration page][4] in Datadog.
1. Select the service account you want to enable Cloud Security on.<br />If you don't see the required account, add it by clicking **Add GCP Account** and following the onscreen prompts.
1. To turn off infrastructure monitoring on the selected account, under the account name, navigate to the **Metric Collection** tab. Then, above the Metric Collection table, click **Disable All**.
1. On the **Resource Collection** tab, click **Enable** next to Cloud Security. You are redirected to the Cloud Security Setup page, which automatically scrolls to the selected Google Cloud Platform project in the Cloud Integrations section.
1. Switch the **Resource Scanning** toggle to the on position.
1. Click **Done** to complete the setup.

**Note**: In your Cloud Security settings, set up [resource evaluation filters][1] to limit the number of hosts you need security on.

## Set up the Datadog Agent

If you're using the Datadog Agent, you must run Agent v6.4+.

{{< tabs >}}
{{% tab "Host " %}}

1. Open the [datadog.yaml configuration file][1].
2. Add `enable_payloads` as a top-level attribute anywhere in the configuration file with the following settings:

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Configure the Agent with Cloud Security][2].
4. [Restart the Agent][3].

[1]: /agent/configuration/agent-configuration-files/
[2]: /security/cloud_security_management/setup/agent
[3]: /agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

If you're using the Docker containerized Agent, add and set the following environment variables to `false` to the [Cloud Security configuration for Agent][4]:
```shell
-e DD_ENABLE_PAYLOADS_EVENTS=false \
-e DD_ENABLE_PAYLOADS_SERIES=false \
-e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false \
-e DD_ENABLE_PAYLOADS_SKETCHES=false \
```

[4]: /security/cloud_security_management/setup/agent/docker/

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you're deploying the Agent in Kubernetes, make the following changes in your Helm chart in addition to the [Cloud Security configuration for Agent][5]:

```yaml
clusterAgent:
  enabled: false
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  env:
    - name: DD_ENABLE_PAYLOADS_EVENTS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERIES
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SKETCHES
      value: "false"
```
[5]: /security/cloud_security_management/setup/agent/kubernetes?tab=helm
{{% /tab %}}
{{< /tabs >}}

[1]: /security/cloud_security_management/guide/resource_evaluation_filters/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
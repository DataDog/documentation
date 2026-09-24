---
title: Datadog Disaster Recovery
aliases:
- /agent/guide/datadog-disaster-recovery/
site_support_id: datadog_disaster_recovery
further_reading:
- link: "https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/"
  tag: "Blog"
  text: "Datadog Disaster Recovery mitigates cloud provider outages"
---

Datadog Disaster Recovery (DDR) keeps your observability running when a cloud provider region or the Datadog services within it are disrupted. With DDR, you configure a secondary Datadog organization in a different region ahead of time and replicate your resources to it. When you fail over, the secondary site already has the dashboards, monitors, and users your team needs.

DDR uses an active-passive model: your secondary site stays in sync but passive until you decide to fail over to it. Failover is never automatic; you choose when to cut over.

DDR also lets you run periodic disaster recovery drills to test your ability to recover from outages and to meet your business and regulatory compliance needs.

## How DDR works

DDR has two independent parts. Both are required for failover:

* **Organization synchronization**: Datadog regularly replicates dashboards, monitors, users, notebooks, and other resources from your primary organization to a secondary organization in another region. You're responsible for initial setup, including creating the secondary organization, configuring SSO, and setting up cloud integrations.
* **Traffic failover**: When your primary region is unavailable, your Agents and other telemetry sources must send data to the secondary region. Datadog recommends customer-managed DNS failover to redirect this traffic. For other failover options, contact your Datadog Account Team.

## What DDR supports

| Category | Supported | Not supported |
|----------|-----------|---------------|
| Telemetry | APM traces, logs, metrics, processes, profiling, and Synthetics | Other telemetry types (such as RUM); senders that don't re-resolve DNS or cache DNS indefinitely |
| Assets and configurations | Users, roles, dashboards, monitors, log configurations, and other resources [supported by Datadog Sync CLI][9] | Cloud SIEM detection rules and signals configuration; Observability Pipelines configurations (pipelines, processors, destinations) |
| Integrations | Agent and cloud integrations (AWS, Azure, GCP) | Automatically syncing integration settings and credentials between orgs |

**Telemetry sources:** DDR supports Agent-based sources and supported non-Agent sources, such as OpenTelemetry Collector. Non-Agent sources must meet the same DNS re-resolution requirements as the Agent.

**Integration setup:** Manually configure integrations and credentials in your secondary org. See [Set up access, integrations, syncing, and agents](#2-set-up-access-integrations-syncing-and-agents).

## Prerequisites 

The minimum Datadog Agent version you need depends on which products you use:

|Supported telemetry |Supported products          |Agent version required | 
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54+                |
|Metrics             |Infrastructure Monitoring   | v7.54+                |
|Traces              |APM                         | v7.68+                |

<div class="alert alert-info">
Datadog is continuously evaluating customer requests to support DDR for additional products. Contact the <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery team</a> to learn about upcoming capabilities and your specific needs if they are not covered above.
</div>

Non-Agent telemetry sources, such as Lambda extensions, Fluent Bit, OpenTelemetry Collector, and custom API clients, handle DNS caching and connection reuse differently. For each supported source you use, you're responsible for verifying that it picks up DNS changes and sends telemetry to the secondary region after failover.

**Requirements for customer-initiated DNS failover**: Telemetry is supported only if its type, source, and intake path are listed as supported in this documentation. The source must send telemetry to the Datadog-delegated domain and re-resolve DNS to pick up destination changes. Sources that never re-resolve DNS or cache DNS indefinitely are not supported.

## Setup

Follow these steps to enable Datadog Disaster Recovery. If you have questions about any of the steps, contact your [Customer Success Manager][14] or [Datadog Support][15].

### 1. Create and link your secondary organization

{{% collapse-content title="1\. Create your secondary organization" level="h4" %}}

[Sign up][16] for a new Datadog organization on a Datadog site in a different region and data center than your primary organization, to help ensure geographic separation.

This organization should be standalone and not a child of any other organization. See the [Datadog site list][17] for available sites; work with your Datadog account team to determine the right secondary site for your organization.

If you use cloud provider integrations to send telemetry to Datadog, add those cloud provider accounts to your secondary organization too. See [Set up your cloud integrations](#set-up-cloud-integrations) for setup instructions. Datadog does not collect telemetry through these integrations while the secondary organization is passive (not in failover).

{{% /collapse-content %}}

{{% collapse-content title="2\. Create a dedicated service account for sync" level="h4" id="syncing-data" %}}

Datadog manages resource sync on your behalf using the open source [datadog-sync-cli][8] tool, which replicates dashboards, monitors, users, notebooks, and [34+ other resource types][9] from your primary organization into your secondary organization on a schedule.

Create a Datadog [service account][10] in your secondary organization for managed sync, and share its UUID with your Datadog account team.

Synced resources are provisioned under a user mapped to their original owner when possible. Otherwise, they are provisioned under the service account.

{{% /collapse-content %}}

{{% collapse-content title="3\. Share organization details with Datadog" level="h4" %}}

Share your new organization's name and details with your Datadog account team.

Datadog configures your new organization as your secondary failover organization and starts the synchronization process. Wait for confirmation that synchronization has started.

{{% /collapse-content %}}

{{% collapse-content title="4\. Retrieve organization IDs and link organizations" level="h4" %}}

<div class="alert alert-info">For security reasons, Datadog is unable to link organizations on your behalf.</div>

After your Datadog account team confirms that synchronization has started:

1. Add the [`disaster_recovery_status_write` scope][18] to your [application key][19] in the primary organization.

1. Use the [List your managed organizations][1] endpoint to retrieve the public IDs of your primary and secondary organizations.

1. Run the following commands, replacing the placeholders with the appropriate values.

    ```shell
    export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
    export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
    export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

    export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
    export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
    export USER_EMAIL=<USER_EMAIL>
    export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

    curl -v -H "Content-Type: application/json" -H \
    "dd-api-key:${PRIMARY_DD_API_KEY}" -H \
    "dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
    ```

After you link your organizations, only your secondary organization displays the DDR banner.

{{% /collapse-content %}}

### 2. Configure access, integrations, and sync

{{% collapse-content title="1\. Configure Single Sign-On (SSO) for your secondary organization" level="h4" %}}

**Datadog recommends using Single Sign-On (SSO)** to enable all your users to log in to your secondary organization during an outage. Go to [Organization Settings][2] in your secondary organization to configure [SAML][3] or Google Login for your users.

Managed sync replicates user accounts from your primary organization to your secondary organization. Datadog recommends configuring [Just-in-Time provisioning with SAML][4] so users can access your secondary organization during a failover without needing to reset their password.

{{% /collapse-content %}}

{{% collapse-content title="2\. Configure cloud integrations" level="h4" id="set-up-cloud-integrations" %}}

Configure your cloud integrations (AWS, Azure, and GCP) in both your primary and secondary organizations. These integrations run in only one organization at a time: normally in your primary organization, and in your secondary organization during failover.

<div class="alert alert-danger">Failing over cloud integrations to your secondary organization stops all cloud integration data collection in your primary organization for as long as the integrations remain failed over. Only fail over cloud integrations as part of a real failover.</div>

{{% /collapse-content %}}

{{% collapse-content title="3\. Verify access and synced resources" level="h4" %}}

After synchronization is in place, confirm that:

- You can access your secondary organization.
- Your users, roles, dashboards, monitors, and log configurations have been copied from your primary organization.

{{% /collapse-content %}}

{{% collapse-content title="Configure DNS-based failover" level="h4" %}}

DNS-based failover is a complementary approach to Agent-based failover. Instead of configuring Agents with a secondary site endpoint, you configure all your data sources to send telemetry to a single Datadog-provided custom intake URL. During a failover event, Datadog updates the DNS record for that URL to redirect traffic from your primary site to your DDR site.

<div class="alert alert-info">DNS failover is all-or-nothing. All telemetry sources using your custom endpoint cut over simultaneously.</div>

#### Receive your custom DNS endpoint

If you choose to use DNS-based failover, Datadog provisions a custom intake URL for your organization (for example, `<your-org>.intake.datadoghq.com`). Configure all your data sources (such as Agents, log shippers, and custom instrumentation) to send telemetry to this endpoint instead of to the default Datadog intake URL. This is a one-time configuration change.

#### Trigger a DNS failover

Contact your [Customer Success Manager][14] or [Datadog Support][15] to initiate a DNS failover. Datadog updates the DNS record to redirect traffic from your primary site to your DDR site. The target Recovery Time Objective (RTO) is 2 hours from the time failover is initiated.

<div class="alert alert-info">A customer-controlled way to trigger DNS failover directly from the DDR org is in Preview. Contact your <a href="mailto:success@datadoghq.com">Customer Success Manager</a> to learn more.</div>

{{% /collapse-content %}}

### 3. Run failover tests in various environments

{{% collapse-content title="Activate and test DDR failover in Agent-based environments" level="h4" %}}

To trigger a failover of your Agents, click one of the policies in [Fleet Automation][13] in your DDR org, then click {{< ui >}}Enable{{< /ui >}}. The status of each host updates as the failover occurs.

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="Enable the failover policy in the DDR org" style="width:80%;" >}}

Use the steps appropriate for your environment to activate/test the DDR failover.

{{< tabs >}}
{{% tab "Agent in non-containerized environments" %}}

For Agent deployments in non-containerized environments, use the below Agent CLI commands:

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_apm true
```

{{% /tab %}}

{{% tab "Agent in containerized environments" %}}

If you are running the Agent in a containerized environment like Kubernetes, you can still use the Agent command-line tool, but you need to invoke it on the container running the Agent. You can make changes using one of the following, depending on your needs:

- [kubectl](#using-kubectl)
- [Agent configuration file (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm chart or Datadog Operator](#using-the-helm-chart-or-datadog-operator)

##### Using kubectl

Below is an example of using `kubectl` to fail over metrics and logs for a Datadog Agent pod deployed with either the official Helm chart or Datadog Operator. The `<POD_NAME>` should be replaced with the name of the Agent pod:

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Using the Agent configuration file

Alternatively, you can specify the below settings in the main Agent configuration file (`datadog.yaml`) and restart the Datadog Agent for the changes to apply:

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_apm: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

##### Using the Helm chart or Datadog Operator

You can make similar changes with either the official Helm chart or Datadog Operator if you need to specify a custom configuration. Otherwise, you can pass the settings as environment variables:

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_FAILOVER_APM=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Activate and test DDR failover in cloud integrations" level="h4" id="id-for-cloud" %}}

You can test failover for your cloud integrations from your DDR organization's landing page.

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="Enable the failover policy in the DDR org" style="width:80%;" >}}

On the failover landing page, you can check the status of your DDR org, or click {{< ui >}}Fail over your integrations{{< /ui >}} to test your cloud integration failover.

When no longer in failover, **disable the failover policy** in the DDR org to return integration data collection to the primary org.

During testing, integration telemetry is spread over both organizations. If you cancel a failover test, the integrations return to running in the primary data center.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/organizations/list-your-managed-organizations/
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /account_management/saml/
[4]: /account_management/saml/#just-in-time-jit-provisioning
[8]: https://github.com/DataDog/datadog-sync-cli
[9]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[10]: /account_management/org_settings/service_accounts/
[11]: /agent/remote_config/?tab=configurationyamlfile
[12]: /agent/fleet_automation/#overview
[13]: https://app.datadoghq.com/fleet
[14]: mailto:success@datadoghq.com
[15]: https://www.datadoghq.com/support/
[16]: https://app.datadoghq.com/signup
[17]: /getting_started/site#access-the-datadog-site
[18]: /account_management/guide/secure-configuration/#audit-and-compliance
[19]: /account_management/api-app-keys#application-keys
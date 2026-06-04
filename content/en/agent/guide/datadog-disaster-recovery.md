---
title: Datadog Disaster Recovery
site_support_id: datadog_disaster_recovery
private: true
further_reading:
- link: "agent/remote_config/?tab=configurationyamlfile"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/getting_started/site/"
  tag: "Documentation"
  text: "Getting Started with Datadog Sites"
- link: "https://www.datadoghq.com/blog/ddr-mitigates-cloud-provider-outages/"
  tag: "Blog"
  text: "Datadog Disaster Recovery mitigates cloud provider outages"
---

## Overview

Datadog Disaster Recovery (DDR) provides you with observability continuity during events that may impact a cloud service provider region or Datadog services running within a cloud provider region. Using DDR, you can recover live observability at an alternate, functional Datadog site, enabling you to meet your critical observability availability goals.

DDR also allows you to periodically conduct disaster recovery drills to not only test your ability to recover from outage events, but to also meet your business and regulatory compliance needs.

## Prerequisites 
The minimum version of the Datadog Agent you need depends on the types of telemetry you need to use:

|Supported telemetry |Supported products          |Agent version required | 
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54+                |
|Metrics             |Infrastructure Monitoring   | v7.54+                |
|Traces              |APM                         | v7.68+                |



<div class="alert alert-info">
Datadog is continuously evaluating customer requests to support DDR for additional products. Contact the <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery team</a> to learn about upcoming capabilities and your specific needs if they are not covered above.
</div>
<br>

## Setup

To enable Datadog Disaster Recovery, follow these steps. If you have any questions about any of the steps, contact your [Customer Success Manager](mailto:success@datadoghq.com) or [Datadog Support](https://www.datadoghq.com/support/).

### 1. Create a DDR org and link it to your primary org

{{% collapse-content title="Create and share your DDR org" level="h5" %}}

<div class="alert alert-info">If required, Datadog can set this up for you.</div>

#### Create your DDR org

1. Go to [Get Started with Datadog](https://app.datadoghq.com/signup). You may need to log out of your current session, or use incognito mode to access this page.
2. Choose a different Datadog site than your primary (for example, if you're on `US1`, choose `EU` or `US5`).
3. Follow the prompts to create an account.

All Datadog sites are geographically separated. Reference the [Datadog Site List](https://docs.datadoghq.com/getting_started/site#access-the-datadog-site) for options.

If you are also sending telemetry to Datadog using cloud provider integrations, you must add your cloud provider accounts in the DDR org. Datadog does not use cloud providers to receive telemetry data while the DDR site is passive (not in failover).

#### Share the DDR org information with Datadog

Email your new org name to your [Customer Success Manager](mailto:success@datadoghq.com). Then, your Customer Success Manager sets this new org as your DDR org.

{{% /collapse-content %}}

{{% collapse-content title="Retrieve the public IDs and link your DDR and primary orgs" level="h5" %}}

For security reasons, Datadog is unable to link the orgs on your behalf.

After the Datadog team has set your DDR org, use the Datadog [public API endpoint](https://docs.datadoghq.com/api/latest/organizations/#list-your-managed-organizations) to retrieve the public IDs of the primary and DDR org.

To link your DDR org to your primary org:

- Add the `disaster_recovery_status_write` scope to your application key in the primary org.
- Run the following commands, replacing the placeholders with the appropriate values.

```
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

After linking your orgs, only the failover org displays this banner:

{{< img src="agent/guide/ddr/ddr-banner.png" alt="The DDR banner in the DDR org" >}}

{{% /collapse-content %}}

### 2. Set up access, integrations, syncing, and agents

{{% collapse-content title="Configure Single Sign On for the DDR org" level="h5" %}}

**Datadog recommends using Single Sign On (SSO)** to enable all your users to log in to your Disaster Recovery org during an outage.

Go to the [Organization Settings](https://app.datadoghq.com/organization-settings/users) in your DDR org to configure [SAML](https://docs.datadoghq.com/account_management/saml/#overview) or {{< ui >}}Google Login{{< /ui >}} for your users.

Managed sync replicates user accounts from your primary org to your DDR org. Datadog recommends configuring [Just-in-Time provisioning with SAML](https://docs.datadoghq.com/account_management/saml/#just-in-time-jit-provisioning) so users can access the DDR org during a failover without needing to reset their password.

{{% /collapse-content %}}

{{% collapse-content title="Set up your cloud integrations (AWS, Azure, Google Cloud)" level="h5" %}}

See the [AWS](https://docs.datadoghq.com/integrations/amazon-web-services), [Azure](https://docs.datadoghq.com/integrations/azure), and [Google Cloud](https://docs.datadoghq.com/integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview) integrations for setup steps.

Your cloud integrations must be configured in both primary and DDR orgs, but they run in only one org at a time: by default in the primary org, and in the DDR org during failover.

For more information, see the [Cloud integrations failover](#id-for-cloud) section.

{{% /collapse-content %}}

{{% collapse-content title="Set up credentials for managed resource sync" level="h5" id="syncing-data" %}}

Datadog manages resource sync on your behalf using the open source [datadog-sync-cli](https://github.com/DataDog/datadog-sync-cli) tool. You do not need to run or operate this tool yourself.

Managed sync replicates resources from your primary org to your DDR org on a regular schedule. Replicated resources include dashboards, monitors, users, notebooks, and [34+ other resource types](https://github.com/DataDog/datadog-sync-cli#supported-resources). Replication runs on this schedule so your DDR org stays current before an outage.

**Users are scoped to each Datadog site.** Managed sync replicates user accounts to your DDR org. However, users may need to reset their password on first login to the DDR org. Datadog recommends configuring [Just-in-Time provisioning with SAML](https://docs.datadoghq.com/account_management/saml/#just-in-time-jit-provisioning) so users can access the DDR org without manual password resets.

**Managed sync uses a Datadog [service account](https://docs.datadoghq.com/account_management/org_settings/service_accounts/).** During onboarding, create a service account in your DDR org to read and replicate resources from your primary org. Resources synced by managed sync are provisioned by a user mapped to their original owner when possible.

{{% /collapse-content %}}

{{% collapse-content title="Enable Remote Configuration [**RECOMMENDED]" level="h5" %}}

[Remote Configuration (RC)](https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile) allows you to remotely configure and change the behavior of Datadog Agents deployed in your infrastructure.

Remote Configuration is enabled by default for new orgs, including your DDR org. Any new API keys you create are RC-enabled for use with your Agent. For more details, see the [Remote Configuration documentation](https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile).

Datadog strongly recommends using Remote Configuration for better failover control. As an alternative to RC, you can manually configure your Agents or use configuration management tools such as Puppet, Ansible, or Chef.

{{% /collapse-content %}}

{{% collapse-content title="Dual ship telemetry to DDR org during failover or drills" level="h5" %}}


To enable Dual Shipping, Datadog recommends using [Fleet Automation](https://docs.datadoghq.com/agent/fleet_automation/#overview) for management at scale. Alternatively, you can configure it manually by editing your `datadog.yaml` file.

Contact your Datadog Customer Success Manager to schedule dedicated time windows for failover testing to measure performance and Recovery Time Objective (RTO).

{{< tabs >}}
{{% tab "Using Fleet Automation (recommended)" %}}

From the [Fleet Automation](https://app.datadoghq.com/fleet) page in your failover org, on the {{< ui >}}Configure Agents{{< /ui >}} tab, you can create a new failover policy or reuse an existing one, and apply it to your fleet of Agents. Soon after the policy is enabled, Agents begin dual-shipping telemetry to both the primary and DDR (failover) observability sites.

To create a failover policy, click on {{< ui >}}Create Failover Policy{{< /ui >}}.

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="Manage DDR policies" style="width:80%;" >}}

Then, follow the prompt to scope the hosts and telemetry (metrics, logs, traces) that you are required to failover.

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="Scope the hosts and telemetry required to failover" style="width:80%;" >}}

**Note**: Cloud Integrations can only run in either your primary or DDR Datadog site, but not both at the same time, so failing them over will cease Cloud Integration data in your primary site. **During an integration failover, integrations run only in the DDR data center**. When no longer in failover, disable the failover policy to return integration data collection to the primary org.

{{% /tab %}}

{{% tab "Manually" %}}

During a failover or failover exercises, update your Datadog Agent's `datadog.yaml` configuration file as shown in the example below and restart the Agent.

- `enabled: true` allows the Agent to send {{< tooltip text="metadata" tooltip="Data about the Agent and the infrastructure host. For example, `host name`, `host tags`, `Agent version`. " >}} to the DDR Datadog site so you can view Agents and your Infra hosts in the DDR org. This allows you to see your Agents and infrastructure hosts in the failover org.

- `failover_metrics`, `failover_logs`, and `failover_apm` are `false` by default. Setting these to `true` causes the Agent to start sending {{< tooltip text="telemetry" tooltip="Data that is sent to the Datadog platform. For example, `logs`, `metrics`, `traces`. " >}} to the DDR org.

```
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_apm: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Configure DNS-based failover" level="h5" %}}

DNS-based failover is a complementary approach to Agent-based failover. Instead of configuring Agents with a secondary site endpoint, you configure all your data sources to send telemetry to a single Datadog-provided custom intake URL. During a failover event, Datadog updates the DNS record for that URL to redirect traffic from your primary site to your DDR site.

**Note:** DNS failover is all-or-nothing. All telemetry sources using your custom endpoint cut over simultaneously. Dual shipping is not supported for DNS-based failover.

#### Receive your custom DNS endpoint

If you choose to use DNS-based failover, Datadog provisions a custom intake URL for your organization (for example, `<your-org>.intake.datadoghq.com`). Configure all your data sources — Agents, log shippers, and custom instrumentation — to send telemetry to this endpoint instead of the default Datadog intake URL. This is a one-time configuration change.

#### Trigger a DNS failover

To initiate a DNS failover, contact Datadog through your [Customer Success Manager](mailto:success@datadoghq.com) or [Datadog Support](https://www.datadoghq.com/support/). Datadog updates the DNS record to redirect traffic from your primary site to your DDR site. The target RTO from the time failover is initiated is 2 hours. A customer-controlled way to trigger DNS failover directly from the DDR org is in Preview — contact your [Customer Success Manager](mailto:success@datadoghq.com) to learn more.

{{% /collapse-content %}}

### 3. Run failover tests in various environments

{{% collapse-content title="Activate and test DDR failover in Agent-based environments" level="h5" %}}

To trigger a failover of your Agents, you can click on one of the policies in [Fleet Automation](https://app.datadoghq.com/fleet) in your DDR org, and then click {{< ui >}}Enable{{< /ui >}}. The status of each host updates as the failover occurs.

{{< img src="/agent/guide/ddr/ddr-fa-policy-enable3.png" alt="Enable the failover policy in the DDR org" style="width:80%;" >}}

Use the steps appropriate for your environment to activate/test the DDR failover.

{{< tabs >}}
{{% tab "Agent in non-containerized environments" %}}

For Agent deployments in non-containerized environments, use the below Agent CLI commands:

```
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

```
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```

##### Using the Agent configuration file

Alternatively, you can specify the below settings in the main Agent configuration file (`datadog.yaml`) and restart the Datadog Agent for the changes to apply:

```
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

```
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

{{% collapse-content title="Activate and test DDR failover in cloud integrations" level="h5" id="id-for-cloud" %}}

You can test failover for your cloud integrations from your DDR organization's landing page.

{{< img src="/agent/guide/ddr/ddr-failover-main-page.png" alt="Enable the failover policy in the DDR org" style="width:80%;" >}}

On the failover landing page, you can check the status of your DDR org, or click {{< ui >}}Fail over your integrations{{< /ui >}} to test your cloud integration failover.

When no longer in failover, **disable the failover policy** in the DDR org to return integration data collection to the primary org.

During testing, integration telemetry is spread over both organizations. If you cancel a failover test, the integrations return to running in the primary data center.

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

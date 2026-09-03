---
title: Set Up Access, Integrations, Syncing, and Agents
---

<div class="alert alert-info">This is step 2 of 3 in setting up DDR. Previous: <a href="/disaster_recovery/create_ddr_org/">Create a DDR org</a>. Next: <a href="/disaster_recovery/failover_tests/">Run failover tests</a>.</div>

After creating your DDR org, configure access, integrations, and Agents so your infrastructure is ready to fail over when needed.

## 1. Configure Single Sign On for the DDR org

**Datadog recommends using Single Sign On (SSO)** to enable all your users to log in to your Disaster Recovery org during an outage.

Go to the [Organization Settings][2] in your DDR org to configure [SAML][3] or {{< ui >}}Google Login{{< /ui >}} for your users.

Managed sync replicates user accounts from your primary org to your DDR org. Datadog recommends configuring [Just-in-Time provisioning with SAML][4] so users can access the DDR org during a failover without needing to reset their password.

## 2. Set up your cloud integrations (AWS, Azure, Google Cloud)

See the [AWS][5], [Azure][6], and [Google Cloud][7] integrations for setup steps.

Your cloud integrations must be configured in both primary and DDR orgs, but they run in only one org at a time: by default in the primary org, and in the DDR org during failover.

For more information, see the [Cloud integrations failover][15] section.

## 3. Set up credentials for managed resource sync {#syncing-data}

Datadog manages resource sync on your behalf using the open source [datadog-sync-cli][8] tool. You do not need to run or operate this tool yourself.

Managed sync replicates resources from your primary org to your DDR org on a regular schedule. Replicated resources include dashboards, monitors, users, notebooks, and [34+ other resource types][9]. Replication runs on this schedule so your DDR org stays current before an outage.

**Users are scoped to each Datadog site.** Managed sync replicates user accounts to your DDR org. However, users may need to reset their password on first login to the DDR org. Datadog recommends configuring [Just-in-Time provisioning with SAML][4] so users can access the DDR org without manual password resets.

**Managed sync uses a Datadog [service account][10].** During onboarding, create a service account in your DDR org to read and replicate resources from your primary org. Resources synced by managed sync are provisioned by a user mapped to their original owner when possible.

## 4. Enable Remote Configuration

<div class="alert alert-info"><strong>Recommended</strong>: Datadog strongly recommends using Remote Configuration for better failover control.</div>

[Remote Configuration (RC)][11] allows you to remotely configure and change the behavior of Datadog Agents deployed in your infrastructure.

Remote Configuration is enabled by default for new orgs, including your DDR org. Any new API keys you create are RC-enabled for use with your Agent. For more details, see the [Remote Configuration documentation][11].

As an alternative to RC, you can manually configure your Agents or use configuration management tools such as Puppet, Ansible, or Chef.

## 5. Dual ship telemetry to DDR org during failover or drills

To enable Dual Shipping, Datadog recommends using [Fleet Automation][12] for management at scale. Alternatively, you can configure it manually by editing your `datadog.yaml` file.

Contact your Datadog Customer Success Manager to schedule dedicated time windows for failover testing to measure performance and Recovery Time Objective (RTO).

{{< tabs >}}
{{% tab "Using Fleet Automation (recommended)" %}}

From the [Fleet Automation][100] page in your failover org, on the {{< ui >}}Configure Agents{{< /ui >}} tab, you can create a failover policy or reuse an existing one, and apply it to your fleet of Agents. Soon after the policy is enabled, Agents begin dual-shipping telemetry to both the primary and DDR (failover) observability sites.

To create a failover policy, click on {{< ui >}}Create Failover Policy{{< /ui >}}.

{{< img src="/agent/guide/ddr/ddr-fa-policy.png" alt="Manage DDR policies" style="width:80%;" >}}

Then, follow the prompt to scope the hosts and telemetry (metrics, logs, traces) that you are required to failover.

{{< img src="/agent/guide/ddr/ddr-fa-policy-scope.png" alt="Scope the hosts and telemetry required to failover" style="width:80%;" >}}

<div class="alert alert-danger">Cloud Integrations can only run in either your primary or DDR Datadog site, but not both at the same time, so failing them over ceases Cloud Integration data in your primary site. <strong>During an integration failover, integrations run only in the DDR data center.</strong> When no longer in failover, disable the failover policy to return integration data collection to the primary org.</div>

[100]: https://app.datadoghq.com/fleet

{{% /tab %}}

{{% tab "Manually" %}}

During a failover or failover exercises, update your Datadog Agent's `datadog.yaml` configuration file as shown in the example below and restart the Agent.

- `enabled: true` allows the Agent to send {{< tooltip text="metadata" tooltip="Data about the Agent and the infrastructure host. For example, `host name`, `host tags`, `Agent version`." >}} to the DDR Datadog site so you can view Agents and your Infra hosts in the DDR org. This allows you to see your Agents and infrastructure hosts in the failover org.

- `failover_metrics`, `failover_logs`, and `failover_apm` are `false` by default. Setting these to `true` causes the Agent to start sending {{< tooltip text="telemetry" tooltip="Data that is sent to the Datadog platform. For example, `logs`, `metrics`, `traces`." >}} to the DDR org.

```shell
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

## 6. Configure DNS-based failover

DNS-based failover is a complementary approach to Agent-based failover. Instead of configuring Agents with a secondary site endpoint, you configure all your data sources to send telemetry to a single Datadog-provided custom intake URL. During a failover event, Datadog updates the DNS record for that URL to redirect traffic from your primary site to your DDR site.

<div class="alert alert-info">DNS failover is all-or-nothing. All telemetry sources using your custom endpoint cut over simultaneously.</div>

### Receive your custom DNS endpoint

If you choose to use DNS-based failover, Datadog provisions a custom intake URL for your organization (for example, `<your-org>.intake.datadoghq.com`). Configure all your data sources (Agents, log shippers, and custom instrumentation) to send telemetry to this endpoint instead of the default Datadog intake URL. This is a one-time configuration change.

### Trigger a DNS failover

To initiate a DNS failover, contact Datadog through your [Customer Success Manager][13] or [Datadog Support][14]. Datadog updates the DNS record to redirect traffic from your primary site to your DDR site. The target Recovery Time Objective (RTO) from the time failover is initiated is 2 hours.

<div class="alert alert-info">A customer-controlled way to trigger DNS failover directly from the DDR org is in Preview. Contact your <a href="mailto:success@datadoghq.com">Customer Success Manager</a> to learn more.</div>

## Next step

After completing setup, [run failover tests][16] to validate your configuration.

[16]: /disaster_recovery/failover_tests/
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /account_management/saml/#overview
[4]: /account_management/saml/#just-in-time-jit-provisioning
[5]: /integrations/amazon-web-services/
[6]: /integrations/azure/
[7]: /integrations/google-cloud-platform/?tab=organdfolderlevelprojectdiscovery#overview
[8]: https://github.com/DataDog/datadog-sync-cli
[9]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[10]: /account_management/org_settings/service_accounts/
[11]: /agent/remote_config/?tab=configurationyamlfile
[12]: /agent/fleet_automation/#overview
[13]: mailto:success@datadoghq.com
[14]: https://www.datadoghq.com/support/
[15]: /disaster_recovery/failover_tests/

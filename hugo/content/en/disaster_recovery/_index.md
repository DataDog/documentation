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

### 3. Set up DNS-based failover

{{% collapse-content title="1\. Optimize DNS-related configurations across Agents and other data sources" level="h4" id="optimize-dns-configurations" %}}

Failover speed depends on your DNS record's time to live (TTL) and how quickly Agents and other telemetry sources pick up DNS changes. Configure DNS caching and connection reuse together to help meet your recovery time objective (RTO).

See [Recommended Settings for DNS Failover][20] for the specific DNS, Agent, and application-level settings to configure, and why each one matters.

{{% /collapse-content %}}

{{% collapse-content title="2\. Set up customer-initiated DNS failover" level="h4" id="set-up-customer-initiated-dns-failover" %}}

Customer-initiated DNS failover gives you direct control over when and where failover happens, using a DNS record you own. This is the recommended path for triggering a DDR failover, because it requires no coordination with Datadog at failover time. If customer-initiated DNS failover is not suitable for your organization, contact your Datadog account team for alternatives.

Customer-initiated DNS failover works through a two-step DNS delegation:

- Datadog's delegation to your domain: `<CUSTOMER>.mrf.datadoghq.com` → `CNAME` → `datadog.<CUSTOMER_DOMAIN>.com`
- Your domain's record, pointing to the active data center: `datadog.<CUSTOMER_DOMAIN>.com` → `CNAME` → `mrf.<DATA_CENTER>.datadoghq.com`

To set up the two-step DNS delegation:

1. Create a DNS record (for example, `datadog.<CUSTOMER_DOMAIN>.com`) with your DNS provider.
1. Point this record to your current active Datadog data center endpoint. Your Datadog account team provides the list of available data center endpoints for your organization.
1. Communicate your chosen domain to your Datadog account team, so Datadog can configure the initial `CNAME` delegation on its side.
1. Configure your Agents and other telemetry sources to use your Datadog-delegated domain (`<CUSTOMER>.mrf.datadoghq.com`) as the intake URL, following the [Optimize DNS-related configurations across Agents and other data sources](#optimize-dns-configurations) section, instead of a standard Datadog [site URL][17].
1. Validate the end-to-end DNS chain with your Datadog account team before relying on it during a real failover.

{{% /collapse-content %}}

{{% collapse-content title="3\. Test DNS failover" level="h4" %}}

Datadog recommends validating your DNS failover setup with a scheduled drill before you need it in a real incident.

1. Update your DNS record to point to the secondary Datadog data center endpoint (for example, from `mrf.us5.datadoghq.com` to `mrf.us3.datadoghq.com`). No coordination with Datadog is required to initiate DNS failover.
1. Confirm that new telemetry appears in your secondary organization.
1. Restore your DNS record's original value to roll back.
1. Confirm that new telemetry resumes in your primary organization.

Datadog recommends running this drill at least annually and after any material change to your DNS provider or telemetry pipeline.

{{% /collapse-content %}}

## Fail over during an incident

After completing and testing your DNS failover setup, you can fail over during an incident. To fail over:

1. Update your DNS record to point to the secondary Datadog data center endpoint (for example, from `mrf.us5.datadoghq.com` to `mrf.us3.datadoghq.com`). No coordination with Datadog is required to initiate DNS failover.
1. **Cloud integrations (if applicable):** TODO
1. Confirm that new telemetry appears in your secondary organization.

When the primary region is available and you're ready to return, restore your DNS record's original value. Confirm that new telemetry resumes in your primary organization.

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
[20]: /disaster_recovery/required_settings
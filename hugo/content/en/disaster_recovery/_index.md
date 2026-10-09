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

{{< callout header="Limited Availability" url="#" btn_hidden="true" >}}
Datadog Disaster Recovery is currently offered on a limited basis. Contact your Datadog account team to check availability for your organization.
{{< /callout >}}

Datadog Disaster Recovery (DDR) keeps your observability running when a cloud provider region or the Datadog services within it are disrupted. With DDR, you configure a secondary Datadog organization in a different region ahead of time and replicate your resources to it. When you fail over, the secondary site already has the dashboards, monitors, and users your team needs.

DDR uses an active-passive model: your secondary site stays in sync but passive until you decide to fail over to it. Failover is never automatic; you choose when to cut over.

DDR also lets you run periodic disaster recovery drills to test your ability to recover from outages and help meet your business and regulatory compliance needs.

## How DDR works

DDR has two independent parts. Both are required for failover:

* **Organization synchronization**: Datadog regularly replicates dashboards, monitors, users, notebooks, and other resources from your primary organization to a secondary organization in another region. You're responsible for initial setup, including creating the secondary organization, configuring SSO, and setting up cloud integrations.
* **Traffic failover**: When your primary region is unavailable, your Agents and other telemetry sources must send data to the secondary region. Datadog recommends customer-initiated DNS failover to redirect this traffic. For other failover options, contact your Datadog account team.

## What DDR supports

| Category | Supported | Not supported |
|----------|-----------|---------------|
| Telemetry | APM traces, logs, metrics, processes, profiling, and Synthetic Monitoring | Other telemetry types (such as RUM) |
| Assets and configurations | Users, roles, dashboards, monitors, log configurations, and other resources [supported by Datadog Sync CLI][6] | Cloud SIEM detection rules and signals configuration; Observability Pipelines configurations (pipelines, processors, destinations) |
| Integrations | Agent and cloud integrations (AWS, Azure, Google Cloud) | Automatic synchronization of integration settings and credentials between organizations. |

**Integration setup**: You must manually configure integrations and credentials in your secondary organization. See [Configure cloud integrations](#set-up-cloud-integrations).

## Prerequisites

The minimum Datadog Agent version you need depends on which products you use:

|Supported telemetry |Supported products          |Agent version required | 
|--------------------|----------------------------|-----------------------|
|Logs                |Logs                        | v7.54+                |
|Metrics             |Infrastructure Monitoring   | v7.54+                |
|Traces              |APM                         | v7.68+                |

<div class="alert alert-info">
To request DDR support for additional products, contact the <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery team</a>.
</div>

For each supported non-Agent telemetry source you use, validate its DNS caching and connection reuse behavior. See [Recommended Settings for DNS Failover][14] for configuration guidance.

**Requirements for customer-initiated DNS failover**: Telemetry is supported only if its type, source, and intake path are listed as supported in this documentation. The source must send telemetry to the Datadog-delegated domain and re-resolve DNS to pick up destination changes. Sources that never re-resolve DNS or cache DNS indefinitely are not supported.

## Setup

Follow these steps to enable Datadog Disaster Recovery. If you have questions about any of the steps, contact your [Customer Success Manager][8] or [Datadog Support][9].

### 1. Create and link your secondary organization

{{% collapse-content title="1\. Create your secondary organization" level="h4" %}}

[Sign up][10] for a new Datadog organization on a Datadog site in a different region and data center than your primary organization. This provides geographic separation.

This organization should be standalone and not a child of any other organization. See the [Datadog site list][11] for available sites. Work with your Datadog account team to determine the right secondary site for your organization.

{{% /collapse-content %}}

{{% collapse-content title="2\. Create a dedicated service account for sync" level="h4" id="syncing-data" %}}

Datadog manages resource sync on your behalf using the open source [datadog-sync-cli][5] tool. It replicates dashboards, monitors, users, notebooks, and [other supported resource types][6] from your primary organization to your secondary organization on a schedule.

Create a Datadog [service account][7] in your secondary organization for managed sync, and share its UUID with your Datadog account team.

Synced resources are provisioned under a user mapped to their original owner when possible. Otherwise, they are provisioned under the service account.

{{% /collapse-content %}}

{{% collapse-content title="3\. Share organization details with Datadog" level="h4" %}}

Share your new organization's name and details with your Datadog account team.

Datadog configures your new organization as your secondary failover organization and starts the synchronization process. Wait for confirmation that synchronization has started.

{{% /collapse-content %}}

{{% collapse-content title="4\. Retrieve organization IDs and link organizations" level="h4" %}}

<div class="alert alert-info">For security reasons, Datadog cannot link organizations on your behalf.</div>

After your Datadog account team confirms that synchronization has started:

1. Add the [`disaster_recovery_status_write` scope][12] to your [application key][13] in the primary organization.

1. Use the [List your managed organizations][1] endpoint to retrieve the public IDs of your primary and secondary organizations.

1. Run the following commands, replacing the placeholders with the appropriate values:

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

Datadog recommends using SSO so all your users can log in to your secondary organization during an outage. Go to [Organization Settings][2] in your secondary organization to configure [SAML][3] or Google Login for your users.

Managed sync replicates user accounts from your primary organization to your secondary organization. Datadog recommends configuring [Just-in-Time provisioning with SAML][4] so users can access your secondary organization during a failover without needing to reset their passwords.

{{% /collapse-content %}}

{{% collapse-content title="2\. Configure cloud integrations" level="h4" id="set-up-cloud-integrations" %}}

Cloud integrations such as AWS and Google Cloud collect data through your cloud provider's APIs. Their failover is separate from DNS failover.

Configure each supported integration, including its settings and credentials, in both your primary and secondary organizations before an incident. During normal operation, Datadog collects data only through the primary organization's integrations.

<div class="alert alert-danger">Failing over cloud integrations to your secondary organization stops all cloud integration data collection in your primary organization for as long as the integrations remain failed over. Fail over cloud integrations only as part of a real failover.</div>

{{% /collapse-content %}}

{{% collapse-content title="3\. Verify access and synced resources" level="h4" %}}

After synchronization is in place, confirm that:

- You can access your secondary organization.
- Your users, roles, dashboards, monitors, and log configurations have been copied from your primary organization.

{{% /collapse-content %}}

### 3. Set up DNS-based failover

{{% collapse-content title="1\. Set up customer-initiated DNS failover" level="h4" id="set-up-customer-initiated-dns-failover" %}}

Customer-initiated DNS failover gives you direct control over when and where failover happens, using a DNS record you own. This is the recommended path for triggering a DDR failover, because it requires no coordination with Datadog at failover time. If customer-initiated DNS failover is not suitable for your organization, contact your Datadog account team for alternatives.

Customer-initiated DNS failover works through a two-step DNS delegation:

- Datadog's delegation to your domain: `<CUSTOMER>.mrf.datadoghq.com` → `CNAME` → `datadog.<YOUR_DOMAIN>`
- Your domain's record, pointing to the active data center: `datadog.<YOUR_DOMAIN>` → `CNAME` → `mrf.<DATA_CENTER>.datadoghq.com`

To set up the two-step DNS delegation:

1. Create a `CNAME` record (for example, `datadog.<YOUR_DOMAIN>`) with your DNS provider.
1. Point this record to your primary Datadog data center endpoint. Your Datadog account team provides the list of available data center endpoints for your organization.
1. Share your chosen domain with your Datadog account team so Datadog can configure the initial `CNAME` delegation on its side.

{{% /collapse-content %}}

{{% collapse-content title="2\. Configure Agents and other telemetry sources" level="h4" id="optimize-dns-configurations" %}}

Failover speed depends on your DNS record's time to live (TTL) and how quickly Agents and other telemetry sources pick up DNS changes. Configure DNS caching and connection reuse together to help meet your recovery time objective (RTO).

1. Configure your Agents and other telemetry sources to use the Datadog-delegated domain (`<CUSTOMER>.mrf.datadoghq.com`) as the intake endpoint instead of a standard Datadog [site URL][11].
1. Apply the [Recommended Settings for DNS Failover][14] to configure DNS caching and connection reuse.
1. Validate the end-to-end DNS chain with your Datadog account team before relying on it during a real failover.

{{% /collapse-content %}}

{{% collapse-content title="3\. Test DNS failover" level="h4" %}}

Datadog recommends validating your DNS failover setup with a scheduled drill before you need it in a real incident. Do not fail over cloud integrations during this drill.

1. Update your `CNAME` record to point to the secondary Datadog data center endpoint (for example, from `mrf.us5.datadoghq.com` to `mrf.us3.datadoghq.com`). No coordination with Datadog is required to initiate DNS failover.
1. Confirm that new telemetry appears in your secondary organization.
1. Restore your `CNAME` record's original value to roll back.
1. Confirm that new telemetry resumes in your primary organization.

Datadog recommends running this drill at least annually and after any material change to your DNS provider or telemetry pipeline.

{{% /collapse-content %}}

## Fail over during an incident

After completing and testing your DNS failover setup, you can fail over during an incident. To fail over:

1. Update your `CNAME` record to point to the secondary Datadog data center endpoint (for example, from `mrf.us5.datadoghq.com` to `mrf.us3.datadoghq.com`). No coordination with Datadog is required to initiate DNS failover.
1. If you use supported cloud integrations, go to {{< ui >}}Disaster Recovery{{< /ui >}} in your secondary organization and click {{< ui >}}Fail over your integrations{{< /ui >}}. Datadog stops collecting integration data in the primary organization and starts collecting it in the secondary organization.
1. Confirm that new telemetry appears in your secondary organization.

When the primary region is available and you're ready to return, restore your `CNAME` record's original value. Confirm that new telemetry resumes in your primary organization.

If you failed over cloud integrations, return to {{< ui >}}Disaster Recovery{{< /ui >}} in your secondary organization and use the same button to switch integration data collection back to the primary organization. Datadog resumes collection in the primary organization and stops collection in the secondary organization. Confirm that new integration data appears in your primary organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/organizations/list-your-managed-organizations/
[2]: https://app.datadoghq.com/organization-settings/users
[3]: /account_management/saml/
[4]: /account_management/saml/#just-in-time-jit-provisioning
[5]: https://github.com/DataDog/datadog-sync-cli
[6]: https://github.com/DataDog/datadog-sync-cli#supported-resources
[7]: /account_management/org_settings/service_accounts/
[8]: mailto:success@datadoghq.com
[9]: https://www.datadoghq.com/support/
[10]: https://app.datadoghq.com/signup
[11]: /getting_started/site#access-the-datadog-site
[12]: /account_management/guide/secure-configuration/#audit-and-compliance
[13]: /account_management/api-app-keys#application-keys
[14]: /disaster_recovery/recommended_settings

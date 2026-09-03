---
title: Create a DDR Org and Link It to Your Primary Org
---

<div class="alert alert-info">This is step 1 of 3 in setting up DDR. Next: <a href="/disaster_recovery/setup/">Set up access, integrations, syncing, and agents</a>.</div>

To use Datadog Disaster Recovery, you first create a new org on a different Datadog site than your primary, then link the two orgs together.

## 1. Create your DDR org

<div class="alert alert-info">If required, Datadog can set this up for you.</div>

1. Go to [Get Started with Datadog][5]. You may need to log out of your current session, or use incognito mode to access this page.
2. Choose a different Datadog site than your primary (for example, if you're on `US1`, choose `EU` or `US5`).
3. Follow the prompts to create an account.

All Datadog sites are geographically separated. Reference the [Datadog Site List][6] for options.

If you are also sending telemetry to Datadog using cloud provider integrations, you must add your cloud provider accounts in the DDR org. Datadog does not use cloud providers to receive telemetry data while the DDR site is passive (not in failover).

## 2. Share the DDR org information with Datadog

Email your new org name to your [Customer Success Manager][3]. Then, your Customer Success Manager sets this new org as your DDR org.

## 3. Retrieve the public IDs and link your DDR and primary orgs

For security reasons, Datadog is unable to link the orgs on your behalf.

After the Datadog team has set your DDR org, use the Datadog [public API endpoint][1] to retrieve the public IDs of the primary and DDR org.

To link your DDR org to your primary org:

- Add the `disaster_recovery_status_write` scope to your application key in the primary org.
- Run the following commands, replacing the placeholders with the appropriate values.

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

After linking your orgs, only the failover org displays this banner:

{{< img src="agent/guide/ddr/ddr-banner.png" alt="The DDR banner in the DDR org" >}}

## Next step

After linking your orgs, [set up access, integrations, syncing, and agents][7].

[1]: /api/latest/organizations/#list-your-managed-organizations
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/support/
[5]: https://app.datadoghq.com/signup
[6]: /getting_started/site#access-the-datadog-site
[7]: /disaster_recovery/setup/
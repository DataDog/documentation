---
title: Datadog Disaster Recovery
private: true
further_reading:
- link: "agent/remote_config/?tab=configurationyamlfile"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/getting_started/site/"
  tag: "Documentation"
  text: "Getting Started with Datadog Sites"
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-disaster-recovery/" header="Join the Preview!">}}
Datadog Disaster Recovery is in Preview, but you can request access! Use this form to submit your request.
{{< /callout >}}

## Overview 
Datadog Disaster Recovery (DDR) provides you with observability continuity during events that may impact a cloud service provider region or Datadog services running within a cloud provider region. Using DDR, you can recover live observability at an alternate, functional Datadog site in typically under two hours, enabling you to meet your critical observability availability goals.


DDR also allows you to periodically conduct disaster recovery drills to not only test your ability to recover from outage events, but to also meet your business and regulatory compliance needs.


## Prerequisites 
Datadog Agent version **7.54 or above** is required for Datadog Disaster Recovery. 

### Supported telemetry types and products
The Agent-based failover description provided on this page supports failover of metrics, traces, and logs telemetry types. It also supports Datadog Infrastructure Monitoring, APM, and Logs products.

<div class="alert alert-info">
Datadog is continuously evaluating customer requests to support DDR for additional products. Contact the <a href="mailto:disaster-recovery@datadoghq.com">Disaster Recovery team</a> to learn about upcoming capabilities and your specific needs if they are not covered above.
</div>


## Setup 
To enable Datadog Disaster Recovery:

1. [Configure Datadog Disaster Recovery](#configure-datadog-disaster-recovery)
2. [Confirm and link your organization](#confirm-and-link-your-organization)
3. [Configure your DDR organization](#configure-your-ddr-organization)
4. [Test the failover process](#test-the-failover-process)

### Configure Datadog Disaster Recovery
{{% collapse-content title=" 1. Create your DDR Datadog organization and share it with your Customer Success Manager" level="h5" %}}
<div class="alert alert-info">Datadog can set this up for you if you'd prefer.</div>

#### Create the DDR org
Identify which site your primary organization is on by matching your Datadog website URL to the [`SITE URL`][4] in the table. Then, select a secondary site for your DDR organization.

{{% agent/sites_no_fed %}}

For example, if you are hosted in [US1](https://app.datadoghq.com), you may choose to select another Datadog site to ensure observability continuity in the event of a regional disaster. All Datadog sites are geographically separated.

If you're also sending telemetry to Datadog using cloud provider integrations, you must add your cloud provider accounts in the DDR org. 

Datadog does not use cloud providers to receive telemetry data while the DDR site is passive.

#### Share the DDR org with your Customer Success Manager
Share your organization name with your Datadog [Customer Success Manager](mailto:success@datadoghq.com) so they can configure your new organization to be your DDR failover organization. 

Contact your [Customer Success Manager](mailto:success@datadoghq.com) or [Datadog Support](https://www.datadoghq.com/support/) if you need help to select the DDR Datadog site and configure your new organization to be your DDR failover organization.


**Note**: This organization appears in your Datadog billing hierarchy, but all usage and cost associated is _not_  billed during the Preview.

{{% /collapse-content %}}
<br>



### Confirm and link your organization
{{% collapse-content title=" 2. Confirm the public IDs of your orgs and link the DDR org to the primary org" level="h5" %}}

#### Confirm the public IDs (optional)

After the Datadog team has completed the configuration of the designated orgs, use the cURL commands from the Datadog [public API endpoint][8] to retrieve the public IDs of the primary and DDR org. 


#### Link the DDR org to the primary org

<div class="alert alert-warning"> For security reasons, Datadog is unable to link the orgs on your behalf. </div>

To link your DDR and primary orgs, run these commands replacing the placeholders for their values:

```shell
export PRIMARY_DD_API_KEY=<PRIMARY_ORG_API_KEY>
export PRIMARY_DD_APP_KEY=<PRIMARY_ORG_APP_KEY>
export PRIMARY_DD_API_URL=<PRIMARY_ORG_API_SITE>

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${PRIMARY_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${DDR_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'", "IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H 
"dd-api-key:${PRIMARY_DD_API_KEY}" -H 
"dd-application-key:${PRIMARY_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${PRIMARY_DD_API_URL}/api/v2/hamr
```
{{% /collapse-content %}} <br>



### Configure your DDR organization
{{% collapse-content title=" 3. Create your Datadog API and App key for syncing" level="h5" %}}
In DDR Datadog org, create a set of `API key` **and** `App key`. These are useful in [steps 5][id="using-sync-cli-tool"] to copy dashboards and monitors between Datadog sites. 

<div class="alert alert-info">
Datadog can help copy the API key signatures for your Agents to the DDR back-up account. Contact your <a href="mailto:success@datadoghq.com">Customer Success Manager</a> for any questions regarding this.
</div>
{{% /collapse-content %}}


{{% collapse-content title=" 4. Configure Single Sign On for the Datadog App" level="h5" %}}
Go to your [Organization Settings][1] to configure [SAML][9] or Google Login for your users. 

**Datadog recommends using Single Sign On (SSO)** to enable all your users to seamlessly login to your Disaster Recovery organization during an outage.

You must invite your users to your Disaster Recovery organization and give them appropriate roles and permissions. Alternatively, to streamline this operation, you can use [Just-in-Time provisioning with SAML][2].
{{% /collapse-content %}}


{{% collapse-content title=" 5. Set up Resources syncing and scheduler" level="h5" id="using-sync-cli-tool" %}}
Datadog provides a tool called [datadog sync-cli][3] to copy your dashboards, monitors, and other configurations from your primary organization to your secondary organization. Regular syncing is essential to ensure that your secondary organization is up-to-date in the event of a disaster. Datadog recommends performing this operation on a daily basis; you can determine the frequency and timing of syncing based on your business requirements. For information on setting up and running the backup process, see the [datadog-sync-cli README][5]. 

Sync-cli is primarily intended for unidirectional copying and updating resources from your primary org to your DDR org. Resources copied to the DDR organization can be edited, but any new syncing overrides changes that differ from the source in the primary organization.

Use the sync-cli configuration available in the documentation to add each item to the sync scope. Here's an example of a configuration file for syncing specific dashboards and monitors using name and tag filtering from an `EU` site to a `US5` site.

```shell 
destination_api_url="https://api.us5.datadoghq.com"
destination_api_key="<US5_API_KEY>"
destination_app_key="<US5_APP_KEY>"
source_api_key="<EU_API_KEY>"
source_app_key="<EU_APP_KEY>"
source_api_url="https://api.datadoghq.eu"
filter=["Type=Dashboards;Name=title","Type=Monitors;Name=tags;Value=sync:true"]

# Make sure to increase the retry timeout to cope with the rate limit
http_client_retry_timeout=600
```

Here's an example of a sync-cli command for syncing log configurations:

```shell
datadog-sync import –config config –resources users,roles,logs_pipelines,logs_pipelines_order,logs_indexes,logs_indexes_order,logs_metrics,logs_restriction_queries

# remember to set the –cleanup=Force option
datadog-sync sync –config config –resources users,roles,logs_pipelines,logs_pipelines_order,logs_indexes,logs_indexes_order,logs_metrics,logs_restriction_queries –cleanup=Force
```

<div class="alert alert-warning"> <strong>Sync-cli Limitation for Log Standard Attributes </strong><br>Sync-cli is regularly being updated with new resources. At this time, syncing Log standard attributes is not supported for private beta. If you use standard attributes with your log pipelines and are remapping your logs, attributes are a dependency that you need to manually re-configure in your DDR org. You can refer to the Datadog <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#overview">standard attribute documentation</a> for support.
</div>

#### Verify availability at the DDR site
Verify that your DDR org is accessible and that your Dashboards and Monitors are copied from your primary org to your DDR org.

Contact your [Customer Success Manager](mailto:success@datadoghq.com) or [Datadog Support](https://www.datadoghq.com/support/) if you need assistance.

{{% /collapse-content %}}



{{% collapse-content title=" 6. Enable Remote Configuration [**RECOMMENDED]" level="h5" %}}
[Remote configuration (RC)][7] allows you to remotely configure and change the behavior of Datadog Agents deployed in your infrastructure. 

Remote Configuration will be turned on by default on your new organization and you can create new API keys that are RC-enabled by default for use with your Agent. See the documentation for [Remote configuration][7] for more information.

Remote Configuration is strongly recommended for a more seamless failover control. Alternatively, you can configure your Agents manually or using configuration management tools like Puppet, Ansible, Chef, etc. 

{{% /collapse-content %}}

{{% collapse-content title=" 7. Update your Datadog Agent configuration" level="h5" %}}
This step requires that you are on the Agent version **7.54 or higher**. 

Agent **v7.54+** has a new configuration for Disaster Recovery which enables Datadog Agents to also send telemetry to the configured DDR Datadog site after DDR failover is activated. The Agent dual ships telemetry to support customers conducting periodic disaster recovery exercises/drills. 

Update your Datadog Agent's `datadog.yaml` configuration file as shown in the example below and restart the Agent.

```shell
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_traces: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

Setting the **enabled** field to `true` enables the Agent to ship Agent metadata to the DDR Datadog site so you can view Agents and your Infra Hosts in the DDR org. Note that while you can see your Agents and Infra Hosts in the DDR org, you will not receive telemetry until DDR failover is activated.

During the preview, we recommend having `failover_metrics`, `failover_logs` and `failover_traces` set to **false** when in passive phases. 

Your Datadog customer success manager will work with you on scheduling dedicated time windows for failover testing to measure performance and Recovery Time Objective (RTO).
{{% /collapse-content %}} <br>


### Test the failover process
{{% collapse-content title=" 8. Activate and test DDR failover" level="h5" %}}
Use the steps appropriate for your environment to activate/test the DDR failover. 

{{< tabs >}}
{{% tab "Agent in non-containerized environments" %}}

##### Agent in non-containerized environments

For Agent deployments in non-containerized environments, use the below Agent CLI commands:

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_traces true
```
{{% /tab %}}

{{% tab "Agent in containerized environments" %}}
##### Agent in containerized environments

If you are running the Agent in a containerized environment like Kubernetes, the Agent command-line tool can still be used, but it needs to be invoked on the container running the Agent. 

Below is an example of using `kubectl` to fail over metrics and logs for a Datadog Agent pod deployed via either the official Helm chart or Datadog Operator. The `<POD_NAME>` should be replaced with the name of the Agent pod:

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_traces true
```

Alternatively, you can specify the below settings in the main Agent configuration file (`datadog.yaml`) and restart the Datadog Agent for the changes to apply:

```shell
multi_region_failover:
  enabled: true
  failover_metrics: true
  failover_logs: true
  failover_traces: true
  site: NEW_ORG_SITE
  api_key: NEW_SITE_API_KEY
```

You can make similar changes with either the official Helm chart or Datadog Operator if you need to specify a custom configuration. Otherwise, you can pass the settings as environment variables:

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_TRACES=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```
{{% /tab %}}

{{% tab "Cloud integrations failover" %}}

For Cloud integration failover:  
1. Integrations must be configured in both Primary and DDR organizations.
2. Integrations only run in one Datacenter at a time. Keep in mind that:
  - Integrations normally run only in the Primary data center.
  - During an integration failover, integrations will run only in the DDR data center.
  - During testing, integration telemetry will be spread over both organizations.
  - Cancelling a failover returns integrations to running in the Primary data center.
3. Failing over integrations is a separate and distinct action available on the disaster recovery landing page in the DDR region.

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}<br>



## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/users
[2]: /account_management/saml/#just-in-time-jit-provisioning
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
[5]: https://github.com/DataDog/datadog-sync-cli/blob/main/README.md 
[6]: https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#overview
[7]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile
[8]: https://docs.datadoghq.com/api/latest/organizations/#get-organization-information 
[9]: https://docs.datadoghq.com/account_management/saml/#overview
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
Datadog Disaster Recovery (DDR) provides you with observability continuity during events that may impact a cloud service provider region or Datadog services running within a cloud provider region. Using DDR, you can recover live observability at an alternate, functional Datadog site, enabling you to meet your critical observability availability goals.

DDR also allows you to periodically conduct disaster recovery drills to not only test your ability to recover from outage events, but to also meet your business and regulatory compliance needs.


## Prerequisites 
Datadog Disaster Recovery requires Datadog Agent version **7.54 or above**. The APM product support requires a **v7.68 or above**.

### Supported telemetry types and products
The Agent-based failover supports the following telemetry types and products:

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
To enable Datadog Disaster Recovery, follow these steps:

### 1. Create a DDR org and link it to your primary org

<div class="alert alert-info">If required, Datadog can set this up for you.</div>

{{% collapse-content title="Create and share your DDR org" level="h5" %}}

**To create your DDR org:**

  - Go to [Get Started with Datadog](https://app.datadoghq.com/signup)
  - Choose a different Datadog site than your primary (for example if you're on `US1`, choose `EU` or `US5`)
  - Follow the prompts to create an account


All Datadog sites are geographically separated. Reference the [Datadog Site List](https://docs.datadoghq.com/getting_started/site#access-the-datadog-site) for options. 

If you are also sending telemetry to Datadog using cloud provider integrations, you must add your cloud provider accounts in the DDR org. Datadog does not use cloud providers to receive telemetry data while the DDR site is passive (not in failover).

**To share the DDR org information with Datadog:**

- Email your DDR org name to your [Customer Success Manager](mailto:success@datadoghq.com)
- Your Customer Success Manager sets this new org as your **DDR failover organization**


**Note:** Although this organization appears in your Datadog billing hierarchy, all usage and cost associated is _not_  billed during the Preview period.
{{% /collapse-content %}}


{{% collapse-content title="Retrieve the public IDs and link your DDR and primary orgs " level="h5" %}}

After the Datadog team has set your DDR org, use the cURL commands from the Datadog [public API endpoint][8] to retrieve the public IDs of the primary and DDR org. 


To link your DDR and primary orgs, run these commands replacing the placeholders for their values:

<div class="alert alert-warning"> For security reasons, Datadog is unable to link the orgs on your behalf. </div>


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
{{% /collapse-content %}}

<br>

<!-- ------------------------------- -->


### 2. Set up access, integrations, syncing, and agents

{{% collapse-content title="Create your Datadog API and App key for syncing" level="h5" %}}
In DDR Datadog org, create a set of `API key` **and** `App key`. These are useful for copying dashboards and monitors between Datadog sites. 

<div class="alert alert-info">
Datadog can help copy the API key signatures for your Agents to the DDR back-up account. Contact your <a href="mailto:success@datadoghq.com">Customer Success Manager</a> for any questions regarding this.
</div>
{{% /collapse-content %}}


{{% collapse-content title="Configure Single Sign On for the Datadog App" level="h5" %}}
Go to your [Organization Settings][1] to configure [SAML][9] or Google Login for your users. 

**Datadog recommends using Single Sign On (SSO)** to enable all your users to seamlessly login to your Disaster Recovery organization during an outage.

You must invite each of your users to your Disaster Recovery organization and give them appropriate roles and permissions. Alternatively, to streamline this operation, you can use [Just-in-Time provisioning with SAML][2].
{{% /collapse-content %}}


{{% collapse-content title=" Set up your cloud integrations (AWS, Azure, Google Cloud)" level="h5" %}}

Your cloud integrations must be configured in both primary and DDR organizations. Because these integrations only run in one data center at a time, **the integrations must run only in the primary data center.**

During testing, integration telemetry is spread over both organizations and cancelling a failover testing returns the integrations to running in the Primary data center.

During an integration failover, integrations runs only in the DDR data center.


{{% /collapse-content %}}



{{% collapse-content title="Set up Resources syncing and scheduler" level="h5" id="using-sync-cli-tool" %}}
Use Datadog's [datadog sync-cli][3] tool to copy your dashboards, monitors, and other configurations from your primary organization to your secondary organization. Regular syncing is essential to ensure that your secondary organization is up-to-date in the event of a disaster. 

Datadog recommends performing this operation on a daily basis; you can determine the frequency and timing of syncing based on your business requirements. For information on setting up and running the backup process, see the [datadog-sync-cli README][5]. 

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
datadog-sync migrate –config config –resources="users,roles,logs_pipelines,logs_pipelines_order,logs_indexes,logs_indexes_order,logs_metrics,logs_restriction_queries" –cleanup=Force
```

<div class="alert alert-warning"> <strong>Sync-cli Limitation for Log Standard Attributes </strong><br>Sync-cli is regularly being updated with new resources. At this time, syncing Log standard attributes is not supported for private beta. If you use standard attributes with your log pipelines and are remapping your logs, attributes are a dependency that you need to manually re-configure in your DDR org. See the Datadog <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#overview">standard attribute documentation</a> for support.
</div>

#### Verify availability at the DDR site
Verify that your DDR org is accessible and that your Dashboards and Monitors are copied from your primary org to your DDR org.

Contact your [Customer Success Manager](mailto:success@datadoghq.com) or [Datadog Support](https://www.datadoghq.com/support/) if you need assistance.

{{% /collapse-content %}}



{{% collapse-content title="Enable Remote Configuration [**RECOMMENDED]" level="h5" %}}
[Remote configuration (RC)][7] allows you to remotely configure and change the behavior of Datadog Agents deployed in your infrastructure. 

Remote Configuration is enabled by default for new organizations, this includes your DDR org. Any new API keys you create is RC-enabled for use with your Agent. For more details, see the [Remote Configuration documentation][7].

Using Remote Configuration is strongly recommended for a more seamless failover control. As an alternative to RC, you can manually configure your Agents or use configuration management tools such as Puppet, Ansible, or Chef.

{{% /collapse-content %}}

{{% collapse-content title="Update your Datadog Agent configuration" level="h5" %}}
This step requires that you are on the Agent version **7.54 or higher**. 

Agent **v7.54+** has a new configuration for Disaster Recovery which enables Datadog Agents to also send telemetry to the configured DDR Datadog site after DDR failover is activated. The Agent dual ships telemetry to support customers conducting periodic disaster recovery exercises/drills. 

Update your Datadog Agent's `datadog.yaml` configuration file as shown in the example below and restart the Agent.

```shell
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_apm: false
  site: <DDR_SITE>  # For example "site: us5.datadoghq.com" for a US5 site
  api_key: <DDR_SITE_API_KEY>
```

Setting the **enabled** field to `true` allows the Agent to ship metadata to the DDR Datadog site, so you can view Agents and your Infra Hosts in the DDR org. Although you can see Agents and Hosts appear in the DDR org, the system does not receive telemetry unless DDR failover is activated.

During the Preview period, Datadog recommends having `failover_metrics`, `failover_logs` and `failover_apm` set to **false** when in passive phases (when not in failover). 

Connect with your Datadog Customer Success Manager to schedule dedicated time windows for failover testing to measure performance and Recovery Time Objective (RTO).
{{% /collapse-content %}} <br>


<!-- ------------------------------- -->

### 3. Test	Run failover tests in various environments
{{% collapse-content title="Activate and test DDR failover in Agent-based environments" level="h5" %}}
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

If you are running the Agent in a containerized environment like Kubernetes, the Agent command-line tool can still be used, but it needs to be invoked on the container running the Agent. You can make changes using one of the following depending on your needs: 

- [kubectl](#using-kubectl)
- [Agent configuration file (`datadog.yaml`)](#using-the-agent-configuration-file)
- [Helm chart or Datadog Operator](#using-the-helm-chart-or-datadog-operator)

<br>

 ##### Using kubectl

Below is an example of using `kubectl` to fail over metrics and logs for a Datadog Agent pod deployed via either the official Helm chart or Datadog Operator. The `<POD_NAME>` should be replaced with the name of the Agent pod:

```shell
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_metrics true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_logs true
kubectl exec <POD_NAME> -c agent -- agent config set multi_region_failover.failover_apm true
```
<br>

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
<br>

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

{{% collapse-content title="Activate and test DDR failover in cloud integrations" level="h5" %}}

##### Cloud integrations failover

Failing over cloud integrations is a separate and distinct action available on the disaster recovery landing page in the DDR region.

Contact your [Customer Success Manager](mailto:success@datadoghq.com) or [Datadog Support](https://www.datadoghq.com/support/) if you have any questions.

{{% /collapse-content %}}<br>

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/users
[2]: /account_management/saml/#just-in-time-jit-provisioning
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: /getting_started/site/#access-the-datadog-site
[5]: https://github.com/DataDog/datadog-sync-cli/blob/main/README.md 
[6]: /logs/log_configuration/attributes_naming_convention/#overview
[7]: /agent/remote_config/?tab=configurationyamlfile
[8]: /api/latest/organizations/?code-lang=curl#get-organization-information 
[9]: /account_management/saml/#overview
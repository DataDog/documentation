---
title: Datadog Disater Recovery
private: true
further_reading:
- link: "agent/remote_config/?tab=configurationyamlfile"
  tag: "Documentation"
  text: "Remote Configuration"
- link: "/getting_started/site/"
  tag: "Documentation"
  text: "Getting Started with Datadog Sites"
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-disaster-recovery/" header="false" >}}
 Datadog Disaster Recovery is in preview. To request access, complete the form.
{{< /callout >}}

## Overview 
Datadog Disaster Recovery (DDR) provides you with observability continuity in rare outage events that may impact a cloud service provider region or Datadog services running within a cloud provider region. In such cases, DDR enables your organization to meet observability, availability, and business continuity goals. You can also recover live observability at an alternate, functional Datadog site in typically under an hour with DDR. <br><br>
Additionally, Datadog Disaster Recover allows you to periodically conduct disaster recovery drills to not only test your ability to recover from outage events but to also meet your business and regulatory compliance needs.


## Prerequisites 
Datadog Agents versions **7.54 or above** is required for Datadog Disaster Recovery. 


## Setup 
To enable Datadog Disaster Recovery, follow the relevant steps for when:

1. [you are ready to configure Datadog Disaster Recovery](#when-you-are-ready-to-configure-datadog-disaster-recovery)
2. [Datadog confirms your new organization as your secondary failover organization](#when-datadog-confirms-your-new-organization-as-your-secondary-failover-organization)
3. [you have linked the DDR org to your primary org](#when-you-have-linked-the-ddr-org-to-your-primary-org)
4. [you are ready to test the failover process](#when-you-are-ready-to-test-the-failover-process)

<!-------- GROUP 1------------------------------------------------------------->
#### when you are ready to configure Datadog Disaster Recovery: 
{{% collapse-content title=" 1. Create your secondary Datadog organization" level="h5" %}}
Identify which site your primary organization is on by matching your Datadog website URL to the [`SITE URL`][4] in the table. Then, select a secondary site for your DDR organization.

{{< img src="getting_started/site/site.png" alt="The site URL in your browser tab" style="width:40%" >}}

| Site    | Site URL                    | Site Parameter      | Location |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Germany) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japan |

For example, if you are hosted in `US1` (https://app.datadoghq.com), you may choose to select the `US5` Datadog site **which is hosted on GCP Central US and is geographically separated from your primary organization**(`INCLUDE THIS?`). This ensures observability continuity in the event of a regional disaster.<br><br>
**Note**: Datadog can set this up for you if you'd prefer. 
{{% /collapse-content %}}


{{% collapse-content title=" 2. Contact Datadog to share your new organization" level="h5" %}}
Share your organization name with your Datadog contact(`IS THIS THE CSM`?) and they will configure your new organization to be your secondary failover organization.<br><br>
**Note**: This organization will appear in your Datadog billing hierarchy, but all usage and cost associated will _not_ be billed during the private beta.
{{% /collapse-content %}} <br>



<!------GROUP 2------------------------------------------------------------->
#### when Datadog confirms your new organization as your secondary failover organization
{{% collapse-content title=" 3. Confirm the public IDs of your orgs" level="h5" %}}
Once the Datadog team has completed the configuration of the designated orgs, they will share with you the public IDs of the primary org and the DDR org. You can confirm these IDs using the cURL commands from the Datadog [public API endpoint][8]:  

**Note:** If any of your sites is in a region other than the `US1` region, you would need to specify the <SITE> parameter.

``` shell
# Run this command to get the Public ID for your DDR site. 
curl -X GET "https://api.<SITE>.datadoghq.com/api/v1/org/<PUBLIC-ID>" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DDR_DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DDR_DD_APP_KEY}"

# Run this command to get the Public ID for your primary site. 
curl -X GET "https://api.<SITE>.datadoghq.com/api/v1/org/<PUBLIC-ID>" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${PRIMARY_DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${PRIMARY_DD_APP_KEY}"
```
{{% /collapse-content %}}


{{% collapse-content title=" 4. Link the DDR org to the primary org" level="h5" %}}
After the Datadog team has completed the configuration of the designated orgs and you have confirmed the public IDs for your orgs, you can now link them. For security reasons, Datadog is unable to link the orgs on your behalf. To link your primary and DDR orgs, run these commands:

```shell
export DDR_DD_API_KEY=<>
export DDR_DD_APP_KEY= 
export DDR_DD_API_URL=https://api.datadoghq.com\

export DDR_ORG_ID=<DDR_ORG_PUBLIC_ID>
export PRIMARY_ORG_ID=<PRIMARY_ORG_PUBLIC_ID>
export USER_EMAIL=<USER_EMAIL>
export CONNECTION='{"data":{"id":"'${DDR_ORG_ID}'","type":"hamr_org_connections","attributes":{"TargetOrgUuid":"'${PRIMARY_ORG_ID}'","HamrStatus":1,"ModifiedBy":"'${USER_EMAIL}'","IsPrimary":true}}}'

curl -v -H "Content-Type: application/json" -H 
"dd-api-key:${CRDR_DD_API_KEY}" -H 
"dd-application-key:${CRDR_DD_APP_KEY}" --data "${CONNECTION}" --request POST ${CRDR_DD_API_URL}/api/v2/hamr
```
{{% /collapse-content %}} <br>




<!------GROUP 3------------------------------------------------------------->
#### when you have linked the DDR org to your primary org
{{% collapse-content title=" 5. Create your Datadog API and App key for syncing" level="h5" %}}
At the secondary Datadog site, create a set of API key and App key. You will use these keys in _steps 7_ to copy dashboards and monitors between Datadog sites. 

For your Agents, Datadog can copy API key signatures to the secondary backup account for you to prevent you from maintaining another set of API keys for your Agent.
{{% /collapse-content %}}


{{% collapse-content title=" 6. Configure Single Sign On for the Datadog App" level="h5" %}}
Go to your [Organization Settings][1] to configure SAML or Google Login for your users. **Single Sign On (SSO) is highly recommended** to enable all your users to be able to seamlessly login to your Disater Recovery organization during an outage. 

You must invite your users to your Disaster Recovery organization and give them appropriate roles and permissions. 

Alternatively to streamline this operation you can use [Just-in-Time provisioning with SAML][2].
{{% /collapse-content %}}


{{% collapse-content title=" 7. Set up Resources syncing and scheduler" level="h5" %}}
Datadog provides a tool called [Datadog sync-cli][3] to copy your dashboards, monitors and other configurations from your primary organization to your secondary organization. You can determine the frequency and timing of syncing based on your business requirements. Regular syncing is essential to ensure that your secondary organization is up-to-date in the event of a disaster. We recommend performing this operation on a daily basis. For information on setting up and running the backup process, see the [datadog-sync-cli README][5]. 

Sync-cli is primarily intended for unidirectional copying and updating resources from your primary org to your secondary org. Resources copied to the secondary organization can be edited, but any new syncing will override changes that differ from the source in the primary organization. `Sync-cli can be configured for bidirectional syncing, but this is not yet fully tested and should be considered experimental at this moment`(**should we mention this? it doesn't sound like we recommned this at the moment**).

Each item can be added to the sync scope using the sync-cli configuration available in the documentation. Here’s an example of a configuration file for syncing specific dashboards and monitors using name and tag filtering from an `EU` site to a `US5` site.

```shell 
destination_api_url="https://api.us5.datadoghq.com"
destination_api_key="<API_KEY>"
destination_app_key="<APP_KEY>"
source_api_key="<API_KEY>"
source_app_key="<APP_KEY>"
source_api_url="https://api.datadoghq.eu"
filter=["Type=Dashboards;Name=title","Type=Monitors;Name=tags;Value=sync:true"]

# Make sure to increase the retry timeout to cope with the rate limit
http_client_retry_timeout=600
```

Here's an example of a Sync-cli commands for syncing log configurations:

```shell
datadog-sync import –config config –resources users,roles,logs_pipelines,logs_pipelines_order,logs_indexes,logs_indexes_order,logs_metrics,logs_restriction_queries

# remember to set the –cleanup=Force option
datadog-sync sync –config config –resources users,roles,logs_pipelines,logs_pipelines_order,logs_indexes,logs_indexes_order,logs_metrics,logs_restriction_queries –cleanup=Force
```

<div class="alert alert-warning"> <strong>Sync-cli Limitation </strong><br><br>

**Log Standard Attributes:** Sync-cli is regularly being updated with new resources. Currently, syncing Log standard attributes is not supported for private beta. If you use standard attributes with your log pipelines and are remapping your logs, attributes are a dependency that you need to manually re-configure in your secondary org. You can refer to the Datadog [standard attribute documentation][6] for support.
</div>
{{% /collapse-content %}}


{{% collapse-content title=" 8. Verify availability at the secondary site" level="h5" %}}
Verify that your secondary org is accessible and that your Dashboards and Monitors are copied from your primary org to your secondary org.
{{% /collapse-content %}}


{{% collapse-content title=" 9. Enable Remote Configuration [**RECOMMENDED]" level="h5" %}}
Remote configuration (RC) is a Datadog capability that allows you to remotely configure and change the behavior of Datadog Agents deployed in your infrastructure. Remote Configuration is strongly recommended for a more seamless failover control; alternatively, you can configure your Agents manually or using configuration management tools like Puppet, Ansible, Chef, etc. 

Remote configuration will be turned on by default on your new organization and you can create new API keys that are RC-enabled by default for use with your Agent. See the documentation for [Remote configuration][7] for more information.
{{% /collapse-content %}}


{{% collapse-content title=" 10. Update your Datadog Agent configuration" level="h5" %}}
Update your Datadog Agents to version **7.54 or higher**. This version comes with a new configuration for Disaster Recovery. 
Configure your Datadog Agent's `datadog.yaml` configuration file as shown below for a `US5` site and restart the Agent.

```shell 
multi_region_failover:
  enabled: true
  failover_metrics: false
  failover_logs: false
  failover_traces: false
  site: us5.datadoghq.com
  api_key: us5_site_api_key
```
During the preview, we recommend having `failover_metrics`, `failover_logs` and `failover_traces` set to **false** when in passive phases. Your Datadog contact will work with you on scheduling dedicated windows for game day testing to measure performance and Recovery Time Objective(RTO).
{{% /collapse-content %}} <br>




<!-------GROUP 4------------------------------------------------------------->
#### when you are ready to test the failover process
{{% collapse-content title=" 11. Activate and test DDR failover" level="h5" %}}
There are several methods that can be used for activating/testing the DDR failover. 

For Agent deployments in non-containerized environments, use the below Agent CLI commands:

```shell
agent config set multi_region_failover.failover_metrics true
agent config set multi_region_failover.failover_logs true
agent config set multi_region_failover.failover_traces true
```

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

Similar changes can also be made with either the official Helm chart or Datadog Operator if specifying a custom configuration, otherwise the settings can be passed as environment variables:

```shell
DD_MULTI_REGION_FAILOVER_ENABLED=true
DD_MULTI_REGION_FAILOVER_METRICS=true
DD_MULTI_REGION_FAILOVER_LOGS=true
DD_MULTI_REGION_FAILOVER_TRACES=true
DD_MULTI_REGION_FAILOVER_SITE=ADD_NEW_ORG_SITE
DD_MULTI_REGION_FAILOVER_API_KEY=ADD_NEW_SITE_API_KEY
```
{{% /collapse-content %}}<br>



## Further Reading
{{< partial name="whats-next/whats-next.html" >}}


<!------LINKS ------------------------------------------------------------->
[1]: https://app.datadoghq.com/organization-settings/users
[2]: https://docs.datadoghq.com/account_management/saml/#just-in-time-jit-provisioning
[3]: https://github.com/DataDog/datadog-sync-cli
[4]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
[5]: https://github.com/DataDog/datadog-sync-cli/blob/main/README.md 
[6]: https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#overview
[7]: https://docs.datadoghq.com/agent/remote_config/?tab=configurationyamlfile
[8]: https://docs.datadoghq.com/api/latest/organizations/#get-organization-information 
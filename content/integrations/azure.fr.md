---
aliases:
- /guides/azure/
categories:
- cloud
- azure
ddtype: crawler
description: Collect metrics from instances and many, many Azure services.
doc_link: https://docs.datadoghq.com/integrations/azure/
git_integration_title: azure
has_logo: true
integration_title: Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure
public_title: Datadog-Microsoft Azure Integration
short_description: Collect metrics from instances and many, many Azure services.
version: '1.0'
---

## Overview

Connect to Microsoft Azure in order to:

* Get metrics from Azure VMs with or without installing the Agent
* Tag your Azure VMs with Azure-specific information (e.g. location)
* Get metrics for other services: Application Gateway, App Service (Web & Mobile), Batch Service, Event Hub, IOT Hub, Logic App, Redis Cache, Server Farm (App Service Plan), SQL Database, SQL Elastic Pool, and Virtual Machine Scale Set

Related integrations include:

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| [App Service](https://docs.datadoghq.com/integrations/azure_app_services) | easy-to-use service for deploying and scaling web, mobile, API and business logic applications |
| [Batch Service](https://docs.datadoghq.com/integrations/azure_batch) | managed task scheduler and processor |
| [Event Hub](https://docs.datadoghq.com/integrations/azure_event_hub) | large scale data stream managed service |
| [IOT Hub](https://docs.datadoghq.com/integrations/azure_iot_hub) | connect, monitor, and manage billions of IOT assets |
| [Logic App](https://docs.datadoghq.com/integrations/azure_logic_app) | quickly build powerful integration solutions |
| [Redis Cache](https://docs.datadoghq.com/integrations/azure_redis_cache) | managed data cache |
| [Storage](https://docs.datadoghq.com/integrations/azure_storage) | blob, file, queue, and table storage |
| [SQL Database](https://docs.datadoghq.com/integrations/azure_sql_database) | highly scalable relational database in the cloud |
| [SQL Database Elastic Pool](https://docs.datadoghq.com/integrations/azure_sql_elastic_pool) | manage the performance of multiple databases |
| [Virtual Machine](https://docs.datadoghq.com/integrations/azure_vm) | virtual machine management service |
| [Virtual Machine Scale Set](https://docs.datadoghq.com/integrations/azure_vm_scale_set) | deploy, manage, and autoscale a set of identical VMs |

## Setup
### Installation

You can integrate your Microsoft Azure account with Datadog using the Azure CLI tool or the Azure portal.

#### Integrating through the Azure CLI


To integrate Datadog with Azure using the Azure CLI, make sure you have [Azure CLI installed][6].

First, login to the Azure account you want to integrate with Datadog

__For Azure CLI 2.0__

~~~~
az login
~~~~

Run the account show command and copy & paste the `Tenant ID` value into the form on the Azure setup tile under "Tenant Name/ID"

~~~~
az account show
~~~~

+ Create an application as a service principal using the format below.
+ Grant the Service Principal the "reader" role for the subscription(s) you would like to monitor.
+ The `appID` generated from this command must be pasted into the "Client ID" text box in the Azure installation form in Datadog.
+ Add  `--name {some-name}` to use a hand-picked name. Otherwise Azure will generate a unique one. The `Name` will not be used in any way in the setup process.
+ Add  `--password {some-password}` to use a hand-picked password. Otherwise Azure will generate a unique one. This password must be copied and pasted into the "Client Secret" text box in the Azure installation form in Datadog.

~~~
az ad sp create-for-rbac --role reader --scopes /subscriptions/{subscription_id}
~~~

__For Azure CLI 1.0__

~~~~
azure login
~~~~

Run the account show command and copy & paste the `Tenant ID` value into the form on the Azure setup tile under "Tenant Name/ID"

~~~~
azure account show
~~~~

+ Create an application as a service principal using the format below. The `name` is NOT used in any way and is simply required as part of the setup process.
+ The `password` you choose must be copied and pasted into the form on the Azure setup tile under "Client Secret".
+ You must also pass the "Client ID" of the application into Datadog. The "Client ID" is the unique ID generated from this command, shown under Service Principal Name. It is _not_ the Object ID.

~~~
azure ad sp create -n {name} -p {password}
~~~

+ Grant the Service Principal the "Reader" role for the subscription you are interested in monitoring.
+ Use the `Object Id` returned from the previous command to fill in `{object-Id}`.
`{subscription-Id}` is the azure subscription you would like to monitor, and is listed as `ID` in `azure account show` or through the portal

~~~
azure role assignment create --objectId {object-Id} -o Reader -c /subscriptions/{subscription-Id}/
~~~

__For Azure CLI < 1.0__

~~~~
azure login
~~~~


Run the account show command and copy & paste the `Tenant ID` value into the form on the Azure setup tile under "Tenant Name/ID"

~~~~
azure account show
~~~~

+ Create an Active Directory application using the format below.
+ The `name`, `home-page`, and `identifiter-uris` will be NOT used in any way and are simply required as part of the setup process.
+ The `password` you choose must be copied and pasted into the form on the Azure setup tile under "Client Secret"

~~~~
azure ad app create --name "DatadogAuth" --home-page "http://app.datadoghq.com" --identifier-uris "http://app.datadoghq.com" --password "SomePassword"
~~~~

+ Create a Service Principal using the `AppId` returned from the last command.
+ Copy and paste this `AppId` into the form on the Azure setup tile under "Client ID"

azure cli <0.10.2:

~~~~
azure ad sp create {app-id}
~~~~

azure cli >= 0.10.2:

~~~~
azure ad sp create -a {app-id}
~~~~

+ Grant the Service Principal the "Reader" role for the subscription you are interested in monitoring.
+ Use the `Object Id` returned from the previous command to fill in `{object-Id}`
`{subscription-Id}` is the azure subscription you would like to monitor, and is listed as `ID` in `azure account show` or through the portal

~~~~
azure role assignment create --objectId {object-Id} --roleName Reader --subscription {subscription-Id}
~~~~


#### Integrating through the Azure Portals


1. <a href="#installation1">Get your tenant name</a> and pass it to Datadog.
2. <a href="#installation2">Create a web application</a> in your Active Directory and pass the correct credentials to Datadog.
3. <a href="#installation3">Give this application read-access</a> to any subscriptions you would like to monitor.

##### Getting your Tenant Name


1. Navigate to [portal.azure.com][2]
2. In the leftmost blade, select "Azure Active Directory"
3. Under properties, copy the Directory ID Value

    {{< img src="integrations/azure/Azure_tenant_name.png" alt="Azure tenant name" responsive="true" popup="true" style="width:70%;" >}}

4. Paste the ID under "Tenant Name/ID" in the form on the Azure setup tile

    {{< img src="integrations/azure/tenant_name_form.png" alt="tenant name form" responsive="true" popup="true" style="width:70%;" >}}

##### Creating the Web Application


1. Navigate to the "App Registrations" tab within your Azure Active Directory.
2. Press "Add"
3. Enter a name and Sign-on URL for this app.
  * These will NOT be used in any way and are simply required as part of the setup process.
  * Leave Application "Type as Web app/ API"
4. Press "Create"

    {{< img src="integrations/azure/Azure_create_ad.png" alt="azure create ad" responsive="true" popup="true" style="width:70%;" >}}

5. Once it is created, select the App from the list of App Registrations
6. Copy the "Application ID" and paste the value into "Client ID" in the form on the Azure setup tile

    {{< img src="integrations/azure/Azure_client_id.png" alt="azure client id" responsive="true" popup="true" style="width:70%;" >}}

    {{< img src="integrations/azure/client_id_form.png" alt="client id form" responsive="true" popup="true" style="width:70%;" >}}

7. For the same app, go to "All settings"
8. Go to "Keys"
9. Enter a new Client Secret key and press Save
  * Make sure to note when the key will expire!
10. When the Secret Key is shown, copy and paste it in "Client Secret" in the form on the Azure setup tile

    {{< img src="integrations/azure/Azure_client_secret.png" alt="azure client secret" responsive="true" popup="true" style="width:70%">}}

    {{< img src="integrations/azure/client_secret_form.png" alt="client secret" responsive="true" popup="true" style="width:70%">}}

11. Click "Install Integration" to complete the application creation process

#### Giving Read Permissions to the Application


1. Navigate to “Subscriptions” on the left hand menu

    {{< img src="integrations/azure/subscriptions_icon.png" alt="subscriptions icon" responsive="true" popup="true" style="width:40%">}}

2. Click on the subscription you would like to monitor
3. Click on "Access control (IAM)" in the lefthand menu

    {{< img src="integrations/azure/access_control_button.png" alt="access control button" responsive="true" popup="true" style="width:40%">}}

4. Click "Add"

    {{< img src="integrations/azure/add_user_button.png" alt="add user button" responsive="true" popup="true" style="width:40%">}}

5. Select “Reader” as a role

    {{< img src="integrations/azure/reader_icon.png" alt="reader icon" responsive="true" popup="true" style="width:40%">}}

6. Search/select for the name of the Application you just created (i.e. Datadog Auth)
7. Click Select
8. Click OK
9. Repeat this process for any other subscriptions you would like to monitor
10. **Diagnostics must be enabled for ARM deployed VMs to collect metrics. <a href="#diagnostics">See the instructions below</a>**

**In a few minutes, metrics from applications under that subscription will begin to appear!**

{{< img src="integrations/azure/azure_vm_screenboard.png" alt="azure vm screenboard" responsive="true" popup="true" style="width:70%">}}
Naviate to the [Azure VM Default Dashboard][5] to see this dashboard populate with your infrastructure's data

Learn more about how to monitor Azure VM performance metrics with [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Azure VMs.

### Configuration


Optionally, you can limit the Azure VMs that are pulled into Datadog by entering tags in the "Optionally filter to VMs with tag" textbox. This comma separated list of tags (in the form 'key:value') defines a filter that we will use when collecting metrics from Azure VMs. Wildcards, such as '?' (for single characters) and '*' (for multiple characters) can also be used. Only VMs that match one of the defined tags will be imported into Datadog. The rest will be ignored.

VMs matching a given tag can also be excluded by adding '!' before the tag. For example:

~~~
datadog:monitored,env:production,!env:staging,instance-type:c1.*
~~~

{{< img src="integrations/azure/filter_form.png" alt="filter_form" responsive="true" popup="true" style="width:70%">}}

### Deploy Agents


1. Navigate to your VM in the Azure Portal > Settings > Extenstions > Add > Select Datadog Agent. Use an API key found <a href="https://app.datadoghq.com/account/settings#api">here</a>
2. Manually deploy Agents by following the instructions <a href="https://docs.datadoghq.com/integrations/azure/">here</a>
3. Install based on operating system or CICD tool <a href="https://app.datadoghq.com/account/settings#agent"> using these instructions</a>

## Data Collected
### Metrics
{{< get-metrics-from-git "azure" >}}


View the specific metrics we collect for each Azure service integration:

* [App Service](https://docs.datadoghq.com/integrations/azure_app_services#metrics)
* [Batch Service](https://docs.datadoghq.com/integrations/azure_batch#metrics)
* [Event Hub](https://docs.datadoghq.com/integrations/azure_event_hub#metrics)
* [IOT Hub](https://docs.datadoghq.com/integrations/azure_iot_hub#metrics)
* [Logic App](https://docs.datadoghq.com/integrations/azure_logic_app#metrics)
* [Redis Cache](https://docs.datadoghq.com/integrations/azure_redis_cache#metrics)
* [SQL Database](https://docs.datadoghq.com/integrations/azure_sql_database#metrics)
* [SQL Database Elastic Pool](https://docs.datadoghq.com/integrations/azure_sql_elastic_pool#metrics)
* [Virtual Machine](https://docs.datadoghq.com/integrations/azure_vm#metrics)
* [Virtual Machine Scale Set](https://docs.datadoghq.com/integrations/azure_vm_scale_set#metrics)

### Events

The Datadog-Azure integrations send all your azure events in your [Event stream](https://docs.datadoghq.com/graphing/event_stream/).

## Troubleshooting

Here are some common issues you might be seeing.

### I don't know my tenant name

1. Navigate to [portal.azure.com][2]
2. In the leftmost blade, select "Azure Active Directory"
3. Under properties, it is the Directory ID

    {{< img src="integrations/azure/Azure_tenant_name.png" alt="azure tenant name" responsive="true" popup="true" style="width:70%">}}

Your tenant name is also available from the URL after navigating to the [classic portal][4]. It is the text in between (**not including**) the @ and # symbol

{{< img src="integrations/azure/azure_tenant_url.png" alt="azure tenant url" responsive="true" popup="true" style="width:70%">}}

### Unable to login
If you have experienced an error logging in while trying to install the integration, please reach out to [support@datadoghq.com][3]. When possible, please attach a screenshot.

### No Metrics Are Showing Up
Please ensure you completed <a href="#installation3">step three</a> of the installation process, which entails giving read permissions to the Azure application (created in <a href="#installation2">step two</a>) for the subscriptions you want to monitor.

For ARM deployed virtual machines, you must also turn on Diagnostics and select the VM metrics you would like to collect. See Enable Diagnostics below for instructions.

### Missing Metrics?
For ARM virtual machines, ensure you have enabled diagnostics and selected the metrics you would like to collect using the instructions below.

For other missing metrics, please reach out to [support@datadoghq.com][3].

#### Enable diagnostics

Turning on Diagnostics allows ARM deployed VMs to collect logging information which includes metrics for CPU, Network, etc. To do this, first go to [Azure Portal][2] then follow the instructions below.

After locating your VM:

1. Click on Diagnostics settings under the Monitoring section
2. Shift the status to On
3. Select the metrics you would like to collect (we recommend "Basic metrics", "Network and web metrics", and ".Net metrics". Un-checking logs collection could save you some storage space. Linux Virtual Machines only collect "Basic" and "Boot" diagnostics)
4. Click Save to save your changes

    {{< img src="integrations/azure/azure_enable_diagnostics.png" alt="azure enable diagnostics" responsive="true" popup="true" style="width:70%">}}


   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
   [4]: https://manage.windowsazure.com
   [5]: https://app.datadoghq.com/screen/integration/azure_vm
   [6]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/

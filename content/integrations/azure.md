---
title: Datadog-Microsoft Azure Integration
integration_title: Microsoft Azure
kind: integration
sidebar:
  nav:
    - header: Azure integration
    - text: Installation
      href: "#installation"
    - text: Integrating through the Azure CLI
      href: "#installation_cli"
    - text: Integrating through the Azure Portals
      href: "#installation_portal"
    - text: Getting your Tenant Name
      href: "#installation1"
    - text: Creating the Web Application
      href: "#installation2"
    - text: Giving Read Permissions to the Application
      href: "#installation3"
    - text: Configuration
      href: "#configuration"
    - text: Deploy agents
      href: "#agents"
    - text: Metrics
      href: "#metrics"
    - text: Troubleshooting
      href: "#troubleshooting"
    - header: Integrations
    - text: Back to Overview
      href: "/integrations/"
---

### Overview

Connect to Microsoft Azure in order to:

* Get metrics from Azure VMs with or without installing the Agent
* Tag your Azure VMs with Azure-specific information (e.g. location)
* Get metrics for other services: Application Gateway, App Service (Web & Mobile), Batch Service, Event Hub, IOT Hub, Logic App, Redis Cache, Server Farm (App Service Plan), SQL Database, SQL Elastic Pool, and Virtual Machine Scale Set

Related integrations include:

| [App Service](/integrations/azure_app_services) | easy-to-use service for deploying and scaling web, mobile, API and business logic applications |
| [Batch Service](/integrations/azure_batch) | managed task scheduler and processor |
| [Event Hub](/integrations/azure_event_hub) | large scale data stream managed service |
| [IOT Hub](/integrations/azure_iot_hub) | connect, monitor, and manage billions of IOT assets |
| [Logic App](/integrations/azure_logic_app) | quickly build powerful integration solutions |
| [Redis Cache](/integrations/azure_redis_cache) | managed data cache |
| [Storage](/integrations/azure_storage) | blob, file, queue, and table storage |
| [SQL Database](/integrations/azure_sql_database) | highly scalable relational database in the cloud |
| [SQL Database Elastic Pool](/integrations/azure_sql_elastic_pool) | manage the performance of multiple databases |
| [Virtual Machine](/integrations/azure_vm) | virtual machine management service |
| [Virtual Machine Scale Set](/integrations/azure_vm_scale_set) | deploy, manage, and autoscale a set of identical VMs |
{:.table}

### Installation
{: #installation}

You can integrate your Microsoft Azure account with Datadog using the Azure CLI tool or the Azure portal.

#### Integrating through the Azure CLI
{: #installation_cli}

To integrate Datadog with Azure using the Azure CLI, make sure you have [Azure CLI installed][7]. 

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
+ NOTE, you may add  `--name {some-name}` to use a hand-picked name. Otherwise Azure will generate a unique one. The `Name` will not be used in any way in the setup process.
+ NOTE, you may add  `--password {some-password}` to use a hand-picked password. Otherwise Azure will generate a unique one. This password must be copied and pasted into the "Client Secret" text box in the Azure installation form in Datadog.

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
{: #installation_portal}

1. <a href="#installation1">Get your tenant name</a> and pass it to Datadog. 
2. <a href="#installation2">Create a web application</a> in your Active Directory and pass the correct credentials to Datadog.
3. <a href="#installation3">Give this application read-access</a> to any subscriptions you would like to monitor.

##### Getting your Tenant Name
{: #installation1}

1. Navigate to [portal.azure.com][2]
2. In the leftmost blade, select "Azure Active Directory"
3. Under properties, copy the Directory ID Value

    ![settings](/static/images/azure/Azure_tenant_name.png)

4. Paste the ID under "Tenant Name/ID" in the form on the Azure setup tile 

    ![settings](/static/images/azure/tenant_name_form.png)

##### Creating the Web Application
{: #installation2}

1. Navigate to the "App Registrations" tab within your Azure Active Directory.
2. Press "Add"
3. Enter a name and Sign-on URL for this app. 
  * These will NOT be used in any way and are simply required as part of the setup process. 
  * Leave Application "Type as Web app/ API"
4. Press "Create"

    ![settings](/static/images/azure/Azure_create_ad.png)

5. Once it is created, select the App from the list of App Registrations
6. Copy the "Application ID" and paste the value into "Client ID" in the form on the Azure setup tile
    
    ![settings](/static/images/azure/Azure_client_id.png)

    ![settings](/static/images/azure/client_id_form.png)

7. For the same app, go to "All settings"
8. Go to "Keys"
9. Enter a new Client Secret key and press Save
  * Make sure to note when the key will expire!
10. When the Secret Key is shown, copy and paste it in "Client Secret" in the form on the Azure setup tile

    ![settings](/static/images/azure/Azure_client_secret.png)

    ![settings](/static/images/azure/client_secret_form.png)

11. Click "Install Integration" to complete the application creation process

##### Giving Read Permissions to the Application
{: #installation3}

1. Navigate to “Subscriptions” on the left hand menu

    ![settings](/static/images/azure/subscriptions_icon.png){:style="width:50%;"}

2. Click on the subscription you would like to monitor
3. Click on "Access control (IAM)" in the lefthand menu 

    ![settings](/static/images/azure/access_control_button.png){:style="width:50%;"}

4. Click "Add" 

    ![settings](/static/images/azure/add_user_button.png){:style="width:50%;"}

5. Select “Reader” as a role 

    ![settings](/static/images/azure/reader_icon.png){:style="width:50%;"}

6. Search/select for the name of the Application you just created (i.e. Datadog Auth)
7. Click Select
8. Click OK
9. Repeat this process for any other subscriptions you would like to monitor
10. **Please note that Diagnostics must be enabled for ARM deployed VMs to collect metrics. <a href="#diagnostics">See the instructions below</a>**

**In a few minutes, metrics from applications under that subscription will begin to appear!**

![Azure VM Default Dashboard](/static/images/azure/azure_vm_screenboard.png)
Naviate to the [Azure VM Default Dashboard][6] to see this dashboard populate with your infrastructure's data

Learn more about how to monitor Azure VM performance metrics with [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Azure VMs.

### Configuration
{: #configuration}

Optionally, you can limit the Azure VMs that are pulled into Datadog by entering tags in the "Optionally filter to VMs with tag" textbox. This comma separated list of tags (in the form 'key:value') defines a filter that we will use when collecting metrics from Azure VMs. Wildcards, such as '?' (for single characters) and '*' (for multiple characters) can also be used. Only VMs that match one of the defined tags will be imported into Datadog. The rest will be ignored.

VMs matching a given tag can also be excluded by adding '!' before the tag. For example:

~~~
datadog:monitored,env:production,!env:staging,instance-type:c1.*
~~~

![settings](/static/images/azure/filter_form.png)

### Deploy Agents
{: #agents}

1. Navigate to your VM in the Azure Portal > Settings > Extenstions > Add > Select Datadog Agent. Use an API key found <a href="https://app.datadoghq.com/account/settings#api">here</a> 
2. Manually deploy Agents by following the instructions <a href="/guides/azure/">here</a>
3. Install based on operating system or CICD tool <a href="https://app.datadoghq.com/account/settings#agent"> using these instructions</a>

### Metrics
{: #metrics}

View the specific metrics we collect for each Azure service integration:

* [App Service](/integrations/azure_app_services#metrics) 
* [Batch Service](/integrations/azure_batch#metrics) 
* [Event Hub](/integrations/azure_event_hub#metrics) 
* [IOT Hub](/integrations/azure_iot_hub#metrics) 
* [Logic App](/integrations/azure_logic_app#metrics)
* [Redis Cache](/integrations/azure_redis_cache#metrics)
* [SQL Database](/integrations/azure_sql_database#metrics)
* [SQL Database Elastic Pool](/integrations/azure_sql_elastic_pool#metrics)
* [Virtual Machine](/integrations/azure_vm#metrics)
* [Virtual Machine Scale Set](/integrations/azure_vm_scale_set#metrics)


### Troubleshooting
{: #troubleshooting}
Here are some common issues you might be seeing.

#### I don't know my tenant name

1. Navigate to [portal.azure.com][2]
2. In the leftmost blade, select "Azure Active Directory"
3. Under properties, it is the Directory ID

    ![settings](/static/images/azure/Azure_tenant_name.png)

Your tenant name is also available from the URL after navigating to the [classic portal][5]. It is the text in between (**not including**) the @ and # symbol

![settings](/static/images/azure/azure_tenant_url.png)

#### Unable to login
If you have experienced an error logging in while trying to install the integration, please reach out to [support@datadoghq.com][3]. When possible, please attach a screenshot.

#### No Metrics Are Showing Up
Please ensure you completed <a href="#installation3">step three</a> of the installation process, which entails giving read permissions to the Azure application (created in <a href="#installation2">step two</a>) for the subscriptions you want to monitor. 

For ARM deployed virtual machines, you must also turn on Diagnostics and select the VM metrics you would like to collect. See Enable Diagnostics below for instructions.

#### Missing Metrics?
For ARM virtual machines, ensure you have enabled diagnostics and selected the metrics you would like to collect using the instructions below. 

For other missing metrics, please reach out to [support@datadoghq.com][3].  

##### Enable diagnostics
{: #diagnostics}
Turning on Diagnostics allows ARM deployed VMs to collect logging information which includes metrics for CPU, Network, etc. To do this, first go to [Azure Portal][2] then follow the instructions below.

After locating your VM:

1. Click on Diagnostics settings under the Monitoring section
2. Shift the status to On 
3. Select the metrics you would like to collect (note: we recommend "Basic metrics", "Network and web metrics", and ".Net metrics". Un-checking logs collection could save you some storage space. Linux Virtual Machines only collect "Basic" and "Boot" diagnostics)
4. Click Save to save your changes

    ![settings](/static/images/azure/azure_enable_diagnostics.png)


   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
   [4]: https://management.azure.com
   [5]: https://manage.windowsazure.com
   [6]: https://app.datadoghq.com/screen/integration/azure_vm
   [7]: https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/

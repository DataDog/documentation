---
title: Datadog-Microsoft Azure Integration
integration_title: Microsoft Azure
kind: integration
sidebar:
  nav:
    - header: Azure integration
    - text: Installation
      href: "#installation"
    - text: Creating the Web Application
      href: "#installation1"
    - text: Giving Read Permissions to the Application
      href: "#installation2"
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

Connect to Microsft Azure in order to:

* Get metrics from Azure VMs with or without installing the Agent
* Tag your Azure VMs with Azure-specific information (e.g. location)
* Get metrics from Azure SQL Databases through the Azure SQL Database API
* Get metrics from Azure Mobile Apps and Web Apps through the Azure Insights API

Related integrations include:

| [App Service](/integrations/azure_app_services) | easy-to-use service for deploying and scaling web, mobile, API and business logic applications |
| [SQL Database](/integrations/azure_sql_database) | highly scalable relational database in the cloud |
| [Virtual Machine](/integrations/azure_vm) | virtual machine management service |
{:.table}

### Installation
{: #installation}

Integrating Datadog with Microsoft Azure is a three step process. 

1. The first step is <a href="#installation1">Getting your tenant name</a> and passing it to Datadog. 
2. The second step is <a href="#installation2">Creating a web application</a> in your Active Directory and passing the correct credentials to Datadog.
3. The third step is <a href="#installation3">Giving this application read-access</a> to any subscriptions you would like to monitor.

#### Getting your Tenant Name
{: #installation1}
1. Go to [manage.windowsazure.com][5]
2. Once the URL redirects, copy the tenant name from the URL. It is the text in between (**not including**) the @ and # symbol <img src="/static/images/azure/azure_tenant_url.png" style="width: 75%;display:block;"/>
3. Paste the Tenant Name in the form on the Datadog setup page <img src="/static/images/azure/tenant_name_form.png" style="width: 50%;display:block;display:block;"/>

#### Creating the Web Application
{: #installation2}

1. Navigate to the “Active Directory” tab on the left-hand menu <img src="/static/images/azure/active_directory_icon.png" style="width: 25%;display:block;"/>
2. Click on the Active Directory you want to monitor <img src="/static/images/azure/active_directory_name_click.png" style="width: 50%;display:block;"/>
3. Click on "Applications" <img src="/static/images/azure/application_click.png" style="width: 50%;display:block;"/>
4. Click "Add" <img src="/static/images/azure/add_application_icon.png" style="width: 50%;display:block;"/>
5. Click "Add an application my organization is developing"
6. Give it a name, i.e. Datadog Auth App
7. Select “Web application and/or web api”
8. Provide a sign-on URL and App ID URI
	- Fill in any details for sign-on URL and App ID URI. These will NOT be used in any way and are simply required as part of the setup process.
	- i.e. https://app.datadoghq.com	
9. Click the check mark. You should be on a page that says "Your app has been added!"
10. Click on "Configure" (Make sure you are on the page for the app, not the active directory) <img src="/static/images/azure/configure_click.png" style="width: 50%;display:block;"/>
11. Scroll down to Client ID. Copy and paste the value into the form on the Datadog setup page <img src="/static/images/azure/client_id_form.png" style="width: 50%;display:block;display:block;"/>
12. Scroll down to Keys and create a new key (1 or 2 years are both acceptable)
	- Note: the client secret key will be shown after you save
13. Scroll down to "Permissions To Other Applications"
14. Click Add Application
15. Select Windows Azure Service Management API and click the check mark on the bottom right of the screen
16. Under Delegated Permissions, check off “Access Azure Service Management as organization users (preview)” <img src="/static/images/azure/app_permissions_dropdown.png" style="width: 50%;display:block;"/>
17. Click "Save" at the bottom of the screen 
18. Scroll back up to Keys, and copy and paste the generated Client Secret key into the form on the Datadog setup page <img src="/static/images/azure/client_secret_form.png" style="width: 50%;display:block;display:block;"/>
19. Click "Install Integration" to complete the application creation process

#### Giving Read Permissions to the Application
{: #installation3}

1. Navigate to [portal.azure.com][2]
2. Navigate to “Subscriptions” on the left hand menu <img src="/static/images/azure/subscriptions_icon.png" style="width: 25%;display:block;"/>
3. Click on the subscription you would like to monitor
4. Click on the user icon <img src="/static/images/azure/user_button.png" style="width: 50%;display:block;"/>
5. Click "Add" User <img src="/static/images/azure/add_user_button.png" style="width: 25%;display:block;"/>
6. Select “Reader” as a role <img src="/static/images/azure/reader_icon.png" style="width: 25%;display:block;"/>
7. Search/select for the name of the Application you just created (i.e. Datadog Auth App)
8. Click Select
9. Click OK
10. Repeat this process for any other subscriptions you would like to monitor
11. **Please note that Diagnostics must be enabled for ARM deployed VMs to collect metrics. <a href="#diagnostics">See the instructions below</a>**

**In a few minutes, metrics from applications under that subscription will begin to appear!**

![Azure VM Default Dashboard](/static/images/azure/azure_vm_screenboard.png)
Naviate to the [Azure VM Default Dashboard][6] to see this dashboard populate with your infrastructure's data

Learn more about how to monitor Azure VM performance metrics with [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Azure VMs.

### Deploy Agents
{: #agents}

1. Follow the steps in the [Azure integrations][1] tile
2. Manually deploy Agents by following the instructions <a href="/guides/azure/">here</a> 

### Metrics

View the specific metrics we collect for each Azure service integration:

* [App Service](/integrations/azure_app_services)
* [SQL Database](/integrations/azure_sql_database)
* [Virtual Machine](/integrations/azure_vm)


### Troubleshooting
{: #troubleshooting}
Here are some common issues you might be seeing.

#### I don't know my tenant name
To locate your tenant name first log into the classic [Azure portal][5].
After logging in, locate the settings page on the left side of the screen.
![](/static/images/azure_tenent.png)

The text in the red box shown in the screenshot above is your tenant name. Please only include text between parentheses.

Your tenant name is also available from the URL after navigating to the classic portal. It is the text in between (**not including**) the @ and # symbol <img src="/static/images/azure/azure_tenant_url.png" style="width: 75%;display:block;"/>

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
Turning on Diagnostics allows ARM deployed VMs to collect logging information which includes metrics for CPU, Network, etc... To do this, first go to [Azure Portal][2] then follow the instructions below.
![](/static/images/azure/azure_enable_diagnostics.png)

After locating your VM:

1. Click on All settings
2. Click on Diagnostics
3. Shift the status to on and select the metrics you would like to collect (note: we recommend "Basic metrics", "Network and web metrics", and ".Net metrics". Un-checking logs collection could save you some storage space. Linux Virtual Machines only collect "Basic" and "Boot" diagnostics)
4. Click Save to save your changes



   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
   [4]: https://management.azure.com
   [5]: https://manage.windowsazure.com
   [6]: https://app.datadoghq.com/screen/integration/azure_vm

---
title: Datadog - Microsoft Azure Integration
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
    - text: Troubleshooting
      href: "#troubleshooting"
    - header: Integrations
    - text: Back to Overview
      href: "/integrations/"
---

### Overview

Datadog's Azure integration currently monitors Virtual Machines, SQL Databases, and App Services. For any other service, please reach out to [support@datadoghq.com][3].
Datadog's agent can also be deployed on your Azure virtual machines.


### Installation
{: #installation}

Integrating Datadog with Microsoft Azure is a three step process. 

1. The first step is <a href="#installation1">Getting your tenant ID</a> and passing it to Datadog. 
2. The second step is <a href="#installation2">Creating a web application</a> in your Active Directory and passing the correct credentials to Datadog
3. The third step is <a href="#installation3">Giving this application read-access</a> to any subscriptions you would like to monitor.

#### Getting your tenant ID
{: #installation1}
1. Go to [manage.windowsazure.com][5]
2. Once the URL redirects, copy the tenant name from the URL. It is the text in between the @ and # symbol <img src="/static/images/azure/azure_tenant_url.png" style="width: 75%;display:block;"/>
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
10. Click on "Configure" (Make sure this is configure for the app, not the active directory) <img src="/static/images/azure/configure_click.png" style="width: 50%;display:block;"/>
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

**In a few minutes, metrics from applications under that subscription will begin to appear!**

![Azure VM Default Dashboard](/static/images/azure/azure_vm_screenboard.png)
Naviate to the [Azure VM Default Dashboard][6] to see this dashboard populate with your infrastructure's data

Learn more about how to monitor Azure VM performance metrics with [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Azure VMs.

### Deploy agents
{: #agents}

1. Follow the steps in the [Azure integrations][1] tile
2. Manually deploy agents by following the instructions <a href="/guides/azure/">here</a> 

### Troubleshooting
{: #troubleshooting}
Here are some common issues you might be seeing.

#### I don't know my tenent name
To locate your tenent name first log into the classic [Azure portal][5].
After logging in, locate the settings page on the left side of the screen.
![](/static/images/azure_tenent.png)

The text in the red box shown in sceenshot above is your tenent name. Please only include text between parentheses.

Your tenant name is also available from the URL after navigating to the classic portal. It is the text in between the @ and # symbol <img src="/static/images/azure/azure_tenant_url.png" style="width: 75%;display:block;"/>

#### Unable to login
If you have experienced error logging in while trying to install the integration, please reach out to [support@datadoghq.com][3]. When possible, please attach a screen shot.

#### No Metrics Are Showing Up
Please ensure you completed <a href="#installation3">step three</a> of the installation process, which entails giving read permissions to the Azure application (created in <a href="#installation2">step two</a>) for the subscriptions you want to monitor. 

For ARM deployed VMs, diagnostics must be enabled to collect metrics. See Enable Diagnostics below for instructions.

#### Missing Metrics?
Classicly deployed VMs must have diagnostics enabled to collect advanced metrics. Diagnostics allows VMs to collect logging information which includes metrics for CPU, Network, etc...

##### Enable diagnostics
To collect advanced metrics for virtual machines, you must enable diagnostics. Right now this is only support by Windows based machines. To do this, first go to [Azure Portal][2] then follow the instructions below.
![](/static/images/azure_diag_manual.png)

After locating your VM:

1. Click on the CPU percentage today panel to show metrics panel
2. Click on Diagnostics
3. Shift the status to on (note: Datadog only requires "Basic metrics", "Network and web metrics", and ".Net metrics" to function correctly. Un-checking logs collection could save you some storage space)
4. Click OK to save your changes



   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
   [4]: https://management.azure.com
   [5]: https://manage.windowsazure.com
   [6]: https://app.datadoghq.com/screen/integration/azure_vm

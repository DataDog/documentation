---
title: Datadog - Microsoft Azure Integration
integration_title: Microsoft Azure
kind: integration
sidebar:
  nav:
    - header: Azure integration
    - text: Configure Monitoring
      href: "#monitoring"
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


### Configure Azure Monitoring
{: #monitoring}

Integrating Datadog with Microsoft Azure is a two step process. The first step is creating a web application in your Active Directory and passing the correct credentials to Datadog, and the second step is giving this application read-access to any subscriptions you would like to monitor.

#### Getting your tenant ID
1. Go to [manage.windowsazure.com][5]
2. Once the URL redirects, copy the tenant name from the URL. It is the text in between the @ and # symbol ![](/static/images/setup/azure/Azure_tenant_url.png)
3. Paste the Tenant Name in the form on the Datadog setup page 

#### Creating the Web Application

1. Navigate to the “Active Directory” tab on the left-hand menu ![](/static/images/setup/azure/Active_directory_icon.png)
2. Click on the appropriate Active Directory ![](/static/images/setup/azure/Active_Directory_Name_Click.png)
3. Click on "Applications" ![](/static/images/setup/azure/Application_Click.png)
4. Click "Add" ![](/static/images/setup/azure/Add_application_icon.png)
5. Click "Add an application my organization is developing"
6. Give it a name, i.e. Datadog Auth App
7. Select “Web application and/or web api”
8. Provide a sign-on URL and App ID URI
	- These can be any value, they are not needed for authentication 
	- i.e. http://mydatadogapp123.com	
9. Click the check mark. You should be on a page that says "Your app has been added!"
10. Click on "Configure" (Make sure this is configure for the app, not the active directory) ![](/static/images/setup/azure/Configure_Click.png)
11. Scroll down to Client ID. Copy and paste the value in the form on the Datadog setup page
12. Scroll down to Keys and create a new key (1 or 2 years are both acceptable)
	- Note: the client secret key will be shown after you save
13. Scroll down to "Permissions To Other Applications"
14. Click Add Application
15. Select Windows Azure Service Management API and press the check mark on the bottom right of the screen
16. Under Delegated Permissions, check off “Access Azure Service Management as organization users (preview)” ![](/static/images/setup/azure/App_Permissions_Dropdown.png)
17. Click "Save" at the bottom of the screen 
18. Scroll back up to Keys, and copy and paste the generated Client Secret key in the form on the Datadog setup page

#### Giving Read Permissions to the Application

1. Navigate to [portal.azure.com][2]
2. Navigate to “Subscriptions” on the left hand menu ![](/static/images/setup/azure/Subscriptions_icon.png)
3. Click on the subscription you would like to monitor
4. Click on the user icon ![](/static/images/setup/azure/User_button.png)
5. Click "Add" User ![](/static/images/setup/azure/Add_user_button.png)
6. Select “Reader” as a role ![](/static/images/setup/azure/Reader_icon.png)
7. Search/select for the name of the Application you just created (i.e. Datadog Auth App)
8. Click Select
9. Press OK
10. Repeat this process for any other subscriptions you would like to monitor

**Navigate back to the Datadog setup page, and click "Update Configuration" to complete the installation process**

**In a few minutes, metrics from applications under that subscription will begin to appear!**



![Azure default dashboard](/static/images/azure.png)

Learn more about how to monitor Azure performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor Azure VMs.

#### Enable diagnostics
To enable agent-less monitoring, you must enable diagnostics. Right now this is only support by Windows based machines. To do this, first go to [Azure preview portal][2] then follow the instructions below.
![](/static/images/azure_diag_manual.png)

After locating your VM:
1. Click on the CPU percentage today panel to show metrics panel
2. Click on Diagnostics
3. Shift the switch to open
4. Click OK to save your changes

Datadog only requires Basic metrics, network and web metrics as well as .Net metrics to function correctly. Un-check logs collection could save you some storage space.

### Deploy agents
{: #agents}
You can either deploy agents manually by following the instructions <a href="/guides/azure/">here</a>.

### Troubleshooting
{: #troubleshooting}
Here are some common issues you might be seeing.

#### I don't know my tenent name
To locate your tenent name first log into the current [Azure portal][4].
After logging in, locate the settings page on the left side of the screen.
![](/static/images/azure_tenent.png)

The text in the red box shown in sceenshot above is your tenent name. Please only include text between parentheses.

#### Unable to login
If you have experienced error logging in while trying to install the integration, please reach out to [support@datadoghq.com][3]. When possible, please attache screen shot.

#### No metrics are showing up
Please make sure you have enabled diagnostics on your VMs. Diagnostics allows VMs to collect logging information which includes metrics for CPU, Network etc.





   [1]: https://app.datadoghq.com/account/settings#integrations/azure
   [2]: https://portal.azure.com
   [3]: mailto:support@datadoghq.com
   [4]: https://management.azure.com
   [5]: https://manage.windowsazure.com

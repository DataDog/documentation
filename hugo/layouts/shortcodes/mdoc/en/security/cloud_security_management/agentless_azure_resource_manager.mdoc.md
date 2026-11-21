Complete the following steps to enable Agentless Scanning for your Azure subscriptions:

##### Cloud Security Setup page

1. On the [Cloud Security Setup](https://app.datadoghq.com/security/configuration/csm/setup) page, click {% ui %}Cloud Integrations{% /ui %} > {% ui %}Azure{% /ui %}.
1. Locate the tenant ID of your subscription.
1. **(Optional)** To enable detection of misconfigurations, toggle {% ui %}Posture Management{% /ui %} to the on position.
1. Expand the list of Azure subscriptions and locate the subscription where you want to deploy the Agentless scanner.
1. Click the subscription where you want to deploy the Agentless scanner to open the side panel.
1. On the {% ui %}Features{% /ui %} tab, click {% ui %}Configure Agentless Scanning{% /ui %} or {% ui %}Manage{% /ui %} to open the Agentless Scanning Setup modal.
1. Under {% ui %}How would you like to set up Agentless Scanning?{% /ui %}, select {% ui %}Azure Resource Manager{% /ui %}.
1. Select an {% ui %}API key{% /ui %} that has [Remote Configuration](/remote_configuration) enabled.
1. Select an application key.
1. Click {% ui %}Launch Azure Resource Manager{% /ui %} to be redirected to the Azure portal.

##### Azure portal

1. Log in to the Azure portal. The template creation form is displayed.
1. Select the subscription and the resource group in which the Agentless scanners are to be deployed. Datadog recommends that you deploy the Datadog Agentless Scanner in a dedicated resource group.
1. In {% ui %}Subscriptions to scan{% /ui %}, select all the subscriptions you want to scan.
1. Enter your {% ui %}Datadog API Key{% /ui %}, select your {% ui %}Datadog Site{% /ui %}, and fill out the remainder of the form.
1. Click {% ui %}Review + create{% /ui %}.

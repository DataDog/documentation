---
"app_id": "komodor"
"app_uuid": "995fe904-e761-4f2f-8dbf-148baf3f080a"
"assets": {}
"author":
  "homepage": "https://komodor.com/"
  "name": Komodor
  "sales_email": sales@komodor.com
  "support_email": support@komodor.com
"categories":
- containers
- kubernetes
- notifications
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/komodor/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "komodor"
"integration_id": "komodor"
"integration_title": "Komodor Automation"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "komodor"
"public_title": "Komodor Automation"
"short_description": "Track changes across your entire K8s landscape and stack"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Notifications"
  - "Offering::Integration"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Track changes across your entire K8s landscape and stack
  "media":
  - "caption": Main services screen.
    "image_url": images/Komodor_screen_01.png
    "media_type": image
  - "caption": Service view events timeline and related services.
    "image_url": images/Komodor_screen_02.png
    "media_type": image
  - "caption": Services view reviewing a deployment and its changes.
    "image_url": images/Komodor_screen_03.png
    "media_type": image
  - "caption": Reviewing a deployment's replicaset and its pods and logs
    "image_url": images/Komodor_screen_04.png
    "media_type": image
  - "caption": Events timelines for multiple clusters and deployments.
    "image_url": images/Komodor_screen_05.png
    "media_type": image
  - "caption": Service view showing Datadog Monitoring Alert.
    "image_url": images/Komodor_screen_06.png
    "media_type": image
  - "caption": Datadog metrics view showing link back into Komodor.
    "image_url": images/Komodor_screen_07.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Komodor Automation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Komodor tracks changes across your entire K8s stack, analyzes their ripple effect, and provides you with the context you need to troubleshoot efficiently and independently. Komodor gives you insight into your Kubernetes deployments on a timeline with relevant information such as what changed, what code was pushed, and who pushed it. You can also view data from Git, config maps, your infrastructure, alerting, and other tools such as Datadog, in one centralized and easy-to-understand display. 

With this integration, you can link to Datadog metrics with dynamic deployment links that take you directly to the dashboards you need. This allows you to troubleshoot your microservices based on the most relevant context, connections, and service dependencies detected in Datadog.

## セットアップ

1. Log onto the [Komodor platform][1].
2. Install the Komodor pod-based agent on each Kubernetes cluster by using a Helm chart or Kustomize. For more information, see the [Komodor docs][2] for installing the agent.

3. Once the agent is installed, follow the steps below to set up the Datadog integration:
    - Install the [Komodor platform integration][3] - This first integration step allows Komodor to access your Datadog account via API key and Token key, and to suggest related services based on service dependencies detected in Datadog.
    - Install the [Datadog Webhook integration][4] - This allows Komodor to receive alerts from Datadog monitors. You can see all alerts in the Komodor Service View.
    - Configure a Datadog monitor notification - Adding a Komodor [dynamic link][5] to Datadog [monitor notifications][6] generates a direct link to the relevant service in Komodor. See the alert link in your Alerting provider connected to Datadog.

4. Use Kubernetes [annotations][7] to enrich the Komodor service and deployment screens with links to relevant Datadog APM dashboards, as well as dynamic links to specific service metrics and time ranges within Datadog.

## Support

For more information please [visit our website][8] or [contact us][9].

[1]: https://app.komodor.com/
[2]: https://docs.komodor.com/Learn/Komodor-Agent.html
[3]: https://docs.komodor.com/Integrations/Datadog.html
[4]: https://docs.komodor.com/Integrations/datadog-webhook.html
[5]: https://docs.komodor.com/Integrations/Datadog-Monitor-Notification.html
[6]: https://docs.datadoghq.com/monitors/notify/
[7]: https://docs.komodor.com/Learn/Annotations.html
[8]: https://komodor.com/sign-up/
[9]: https://komodor.com/contact-us/


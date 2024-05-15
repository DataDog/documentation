---
title: Monitor Argo CD Deployments
kind: documentation
description: Learn how to monitor deployments from Argo CD in Datadog CD Visibility.
is_beta: true
further_reading:
- link: "/continuous_delivery/deployments"
  tag: "Documentation"
  text: "Learn about Deployment Visibility"
- link: "/continuous_delivery/explorer"
  tag: "Documentation"
  text: "Learn how to query and visualize deployment executions"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CD Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" header="false" >}}
CD Visibility for Argo CD is in private beta. To request access, complete the form.
{{< /callout >}}

## Overview

[Argo CD][1] is a declarative GitOps continuous delivery (CD) tool for Kubernetes. It follows the GitOps pattern by using Git repositories to define the desired application state, and automates the deployment of applications in specified target environments.

Datadog CD Visibility integrates with Argo CD by using [Argo CD Notifications][2].
Argo CD notifications consists of two main components:
1. [Triggers][3], which define _when_ to send a notification.
2. [Templates][4], which define _what_ to send in a notification.

## Setup

For more information on how to set up Argo CD notifications using webhooks, see the [official Argo CD guide][5].

The first step is to create the service containing the Datadog intake URL and the Datadog API Key:
1. Add your [Datadog API Key][11] in the
`argocd-notifications-secret` secret with the `dd-api-key` key. See [the Argo CD guide][2] for information on modifying the `argocd-notifications-secret`.
1. Add a service in the `argocd-notifications-cm` config map with the following format:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.webhook.cd-visibility-webhook: |
    url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
    headers:
    - name: "DD-CD-PROVIDER-ARGOCD"
      value: "true"
    - name: "DD-API-KEY"
      value: $dd-api-key
    - name: "Content-Type"
      value: "application/json"
```

`cd-visibility-webhook` is the name of the service, and `$dd-api-key` is a reference to the API Key stored in the `argocd-notifications-secret` secret.

The second step is to add the template in the same `argocd-notifications-cm` config map:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  template.cd-visibility-template: |
    webhook:
      cd-visibility-webhook:
        method: POST
        body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
```

<div class="alert alert-warning">
The call to populate the <code>commit_metadata</code> field is not required. The field is used to enrich the payload with Git information.
If you are using Helm repositories as the source of your Argo CD application, adjust the body by removing that line and the comma in the previous line.
</div>

`cd-visibility-template` is the name of the template, and `cd-visibility-webhook` is a reference to the service created above.

The third step is to add the trigger, again in the same `argocd-notifications-cm` config map:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error', 'Running'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

`cd-visibility-trigger` is the name of the trigger, and `cd-visibility-template` is a reference to the template created above.

After the service, trigger, and template have been added to the config map, you can subscribe any of your Argo CD applications to the integration.
Modify the annotations of the Argo CD application by either using the Argo CD UI or modifying the application definition with the following annotations:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
```

There are three annotations:
1. The notifications annotation subscribes the Argo CD application to the notification setup created above.
2. The `dd_env` annotation configures the environment of the application. Replace `YOUR_ENV` above with the environment
   to which this application is deploying (for example: `staging` or `prod`). If you don't set this annotation,
   the environment defaults to `none`.
3. The `dd_service` annotation configures the service of the application. Replace `YOUR_SERVICE` above with the service
   that the Argo CD application is deploying (for example: `transaction-service`). When this annotation is used, the service
   name is added to all the deployment executions generated from the application. Moreover, if your service is
   registered in [Service Catalog][13], the team name is also added to all the deployment executions. Omit this annotation
   if your Argo CD application is configured to deploy more than one service.

See the [Argo CD official guide][12] for more details on applications subscriptions.

After this final step is completed, you can start monitoring your Argo CD deployments in Datadog.

## Adding custom tags to deployment executions

You can optionally add custom tags to the deployment executions generated from Argo CD applications deployments. These tags can be used to filter, group, and aggregate deployment executions in Datadog.
To add custom tags, add the `dd_customtags` annotation to your Argo CD application annotations and set the value to a comma-separated list of tags, structured as `key:value` pairs. For example:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_customtags: "region:us1-east, team:backend"
```

## Visualize deployments in Datadog

The [**Deployments**][6] and [**Executions**][7] pages populate with data after a deployment is executed. For more information, see [Search and Manage][9] and [CD Visibility Explorer][10].

## Troubleshooting

If notifications are not sent, examine the logs of the `argocd-notification-controller` pod. The controller logs when it is sending a notification (for example: `Sending notification ...`) and when it fails to notify a recipient
(for example: `Failed to notify recipient ...`). For additional troubleshooting scenarios, see the [official Argo CD documentation][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/
[3]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/
[5]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/
[6]: https://app.datadoghq.com/ci/deployments
[7]: https://app.datadoghq.com/ci/deployments/executions
[8]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/troubleshooting/
[9]: /continuous_delivery/search
[10]: /continuous_delivery/explorer
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/
[13]: /tracing/service_catalog

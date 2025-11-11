---
title: Monitor Argo CD Deployments
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

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility for Argo CD is in Preview. If you're interested in this feature, complete the form to request access.
{{< /callout >}}

## Overview

[Argo CD][1] is a declarative GitOps continuous delivery (CD) tool for Kubernetes. It follows the GitOps pattern by using Git repositories to define the desired application state, and automates the deployment of applications in specified target environments.

Datadog CD Visibility integrates with Argo CD by using [Argo CD Notifications][2]. Argo CD notifications consists of two main components:
1. [Triggers][3], which define _when_ to send a notification.
2. [Templates][4], which define _what_ to send in a notification.

## Minimal setup

The setup below uses the [Webhook notification service][5] of Argo CD to send notifications to Datadog.

First, add your [Datadog API Key][11] in the `argocd-notifications-secret` secret with the `dd-api-key` key. See [the Argo CD guide][2] for information on modifying the `argocd-notifications-secret`.

Choose one of the following setup methods based on how you installed Argo CD:

- **Regular setup (kubectl apply)**: For standard Argo CD installations using `kubectl apply`
- **Helm**: For Helm-based Argo CD deployments

### Regular setup (kubectl apply)

Modify the `argocd-notifications-cm` ConfigMap to create the notification service, template, and trigger to send notifications to Datadog:

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
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
    - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

### Helm setup

If you used Helm to install Argo CD, add the following configuration to your `values.yaml`:

```yaml
notifications:
  notifiers:
    service.webhook.cd-visibility-webhook: |
      url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
      headers:
        - name: "DD-CD-PROVIDER-ARGOCD"
          value: "true"
        - name: "Content-Type"
          value: "application/json"
        - name: "DD-API-KEY"
          value: $dd-api-key
  templates:
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
  triggers:
    trigger.cd-visibility-trigger: |
      - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
      - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
```

### Configuration summary

The following resources have been added:
1. The `cd-visibility-webhook` service targets the Datadog intake and configures the correct headers for the request. The `DD-API-KEY` header references the `dd-api-key` entry added previously in the `argocd-notifications-secret`.
2. The `cd-visibility-template` defines what to send in the request for the `cd-visibility-webhook` service.
3. The `cd-visibility-trigger` defines when to send the notification, and it references the `cd-visibility-template`.

The `commit_metadata` field is optional and can be used to enrich the deployment with Git information. It should be removed (together with the comma in the previous line) in the following cases:
- You are already syncing your repository information to Datadog (see [Synchronize repository metadata to Datadog][20]).
- Your Argo CD application source does not have a defined commit SHA (for example, if you are using Helm repositories).

After the notification service, trigger, and template have been added to the config map, you can subscribe any of your Argo CD applications to the integration.
Modify the annotations of the Argo CD application by either using the Argo CD UI or modifying the application definition with the following annotations:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
    dd_customtags: "region:us1-east, team:backend"
```

From the above snippet:
1. The notifications annotation subscribes the Argo CD application to the notification setup created above. See the [Argo CD official guide][12] for more details on applications subscriptions.
2. You can use the `dd_env` annotation to configure the environment of the application. Replace `YOUR_ENV` above with the environment
   to which this application is deploying (for example: `staging` or `prod`). If you don't set this annotation,
   the environment defaults to `none`.
3. You can use the `dd_service` annotation to configure the service of the application. Replace `YOUR_SERVICE` above with the service
   that the Argo CD application is deploying (for example: `transaction-service`). When this annotation is used, the service
   name is added to all the deployment executions generated from the application. Moreover, if your service is
   registered in [Software Catalog][13], the team name is also added to all the deployment executions. If your Argo CD
   application is configured to deploy more than one service, see [Tag an Argo CD application deploying multiple services](#tag-an-argo-cd-application-deploying-multiple-services).
4. You can use the `dd_customtags` annotation to optionally add custom tags to the deployment executions generated for this Argo CD application.
   The value should be set to a comma-separated list of tags, structured as `key:value` pairs.

After you have subscribed your Argo CD application by adding the annotations above, new deployments of the application will start to appear in Datadog.

The [Recommended Setup](#recommended-setup) section below contains recommended actions to improve the monitoring reported in CD Visibility.

## Recommended setup

### Change duration to wait for resources health
The duration reported in deployment events matches the sync duration in Argo CD. However, the sync duration generally represents the time spent by Argo CD to sync the Git repository state and the Kubernetes cluster state.
This means that what happens after the sync (for example, the time spent by the Kubernetes resources to start up) is not included in the duration.

To change the duration reported to wait until the configured resources have started up and reached a healthy state, add a new no-op resource monitored by your Argo CD application, with a [PostSync Hook][19] annotation.
The PostSync Hook will run after all the resources have reached a Healthy state, and the Argo CD sync will wait on the PostSync Hook result to update the application status as Healthy.

Below is represented an example of a PostSync Hook Job that runs a simple `echo` command.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: cdvisibility-postsync-job # Ensures that the Argo CD sync duration waits for resources health
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: noop-echo
          image: alpine:latest
          command: ["echo", "all the sync resources have reached a healthy state"]
      restartPolicy: Never
  backoffLimit: 0
```

### Correlate deployments with CI pipelines

By default, the Git metadata reported in deployment events is associated with the repository that Argo CD monitors. However, a common setup is to:
- Have an application repository, storing the source code, and a configuration repository, storing the Kubernetes manifests. Then, configure Argo CD to monitor the configuration repository, as outlined in the [Argo CD Best Practices page][17].
- When a change occurs in the application repository, perform an automated commit that updates the configuration repository (for example, changing the current image of a Kubernetes resource).

The following diagram represents an example of this kind of setup:

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Triggering Argo CD deployments using git" style="width:100%;">}}

The [`datadog-ci deployment correlate-image` command][14] can be used to correlate an image with an application repository commit. When an Argo CD deployment occurs, the configuration commit information in the deployment event is replaced with the related application repository commit obtained by looking at the deployed images, if any.

To enable this correlation, you also need to add the `dd_k8s_cluster` annotation to your Argo CD application, specifying the name of the Kubernetes cluster that the application deploys to. The name must match the name reported in the [Datadog Kubernetes product][16]. The image name must also contain the service name it relates to. This helps us discard irrelevant images on a deployment.

Here is an example on how you can run the command when generating the image that will later be deployed by Argo CD:
```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


This command correlates images from deployment resources. When Datadog receives a deployment, if multiple images are present and more than one of the images is correlated, Datadog takes the image that contains the service name. The correlation only works for deployment resources.



#### Validation

If the command has been correctly run, deployments contain Git metadata from the application repository instead of the configuration repository. Also, the deployment executions view now contains a new **Pipeline** tab representing the related CI pipeline trace.

## Tag an Argo CD application deploying multiple services

If your Argo CD application deploys more than one service, Datadog can automatically infer the services deployed from an application sync. Datadog infers the services based on the Kubernetes resources that were modified.

<div class="alert alert-danger">
Automatic service discovery is not supported when <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a> is used.
</div>

To enable automatic service tagging, you need to [monitor your Kubernetes infrastructure using the Datadog Agent][15] and your Kubernetes resources should have the following labels:
- `tags.datadoghq.com/service` (required): specifies the Datadog service of this resource. For more information, see [Unified Service Tagging][18].
- `team` (optional): specifies the Datadog team of this resource. If this label is omitted, the team is automatically retrieved from [Software Catalog][13] based on the service label.

Only the Kubernetes resources with the following kinds are eligible: `Deployment`, `Rollout`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job`, and `CronJob`.

Add the following annotations to your Argo CD application:
- `dd_multiservice`: `true`. This annotation specifies whether Datadog automatically infers the services deployed in a sync based on the changed Kubernetes resources.
- `dd_k8s_cluster`: set to the name of the Kubernetes cluster that the Argo CD application deploys to. The name must match the name reported in the [Datadog Kubernetes product][16].

For example:
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_multiservice: true
    dd_k8s_cluster: example-cluster
```

## Visualize deployments in Datadog

The [**Deployments**][6] and [**Executions**][7] pages populate with data after a deployment has finished. For more information, see [Explore CD Visibility Deployments][10].

## Troubleshooting

If notifications are not sent, examine the logs of the `argocd-notification-controller` pod. The controller logs when it is sending a notification (for example: `Sending notification ...`) and when it fails to notify a recipient
(for example: `Failed to notify recipient ...`). For additional troubleshooting scenarios, see the [official Argo CD documentation][8].

### Discrepancy between ArgoCD & DatadogCD

If you notice a discrepancy between ArgoCD and Datadog CD, where ArgoCD deployments are reported as successful in ArgoCD but show as errors in Datadog. The key difference lies in how each platform evaluates deployment success:
- **ArgoCD** considers a sync successful as long as it can apply the changes to the Kubernetes manifests, regardless of the runtime state of the resources.
- **Datadog’s CD** Visibility evaluates the outcome of the deployment more comprehensively. If any of the resources modified during the sync end up in a degraded state (e.g., due to a bad image or configuration issue), the deployment will be marked as “failed” or "degraded" in Datadog, even though ArgoCD reports it as “successful”.

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
[13]: /tracing/software_catalog
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog

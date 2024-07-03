---
description: Learn how to monitor deployments from Argo CD in Datadog CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentation
  text: Learn about Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentation
  text: Learn how to query and visualize deployment executions
is_beta: true
title: Monitor Argo CD Deployments
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

サービス、トリガー、およびテンプレートが構成マップに追加されたら、インテグレーションに Argo CD アプリケーションをサブスクライブできます。
Argo CD UI を使用するか、以下のアノテーションでアプリケーション定義を変更することで、Argo CD アプリケーションのアノテーションを変更します。

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
```

アノテーションは 3 つあります。
1. notifications アノテーションは、上記で作成した通知セットアップに Argo CD アプリケーションをサブスクライブします。
2. The `dd_env` annotation configures the environment of the application. Replace `YOUR_ENV` above with the environment
   to which this application is deploying (for example: `staging` or `prod`). If you don't set this annotation,
   the environment defaults to `none`.
3. `dd_service` アノテーションはアプリケーションのサービスを構成します。上記の `YOUR_SERVICE` を、
   Argo CD アプリケーションがデプロイしているサービス (例えば `transaction-service`) に置き換えます。このアノテーションを使用すると、
   アプリケーションから生成されるすべてのデプロイメント実行にサービス名が追加されます。さらに、サービスが
   [サービスカタログ][13]に登録されている場合、チーム名もすべてのデプロイメント実行に追加されます。Argo CD アプリケーションが
   複数のサービスをデプロイするように構成されている場合は、このアノテーションを省略します。

See the [Argo CD official guide][12] for more details on applications subscriptions.

After this final step is completed, you can start monitoring your Argo CD deployments in Datadog.

## デプロイメント実行にカスタムタグを追加する

Argo CD アプリケーションのデプロイメントから生成されたデプロイメント実行には、オプションでカスタムタグを追加できます。これらのタグは、Datadog でデプロイメント実行をフィルタリング、グループ化、集計するために使用できます。
カスタムタグを追加するには、`dd_customtags` アノテーションを Argo CD アプリケーションのアノテーションに追加し、`key:value` ペアとして構造化されたタグのカンマ区切りリストを値に設定します。例:

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

## トラブルシューティング

If notifications are not sent, examine the logs of the `argocd-notification-controller` pod. The controller logs when it is sending a notification (for example: `Sending notification ...`) and when it fails to notify a recipient
(for example: `Failed to notify recipient ...`). For additional troubleshooting scenarios, see the [official Argo CD documentation][8].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/
[3]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/
[5]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/
[6]: https://app.datadoghq.com/ci/deployments
[7]: https://app.datadoghq.com/ci/deployments/executions
[8]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/troubleshooting/
[9]: /ja/continuous_delivery/search
[10]: /ja/continuous_delivery/explorer
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/
[13]: /ja/tracing/service_catalog
---
title: Private Actions Overview
disable_toc: false
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflows/connections"
  tag: "Documentation"
  text: "Workflow Connections"
- link: "service_management/workflows/private_actions/use_private_actions"
  tag: "Documentation"
  text: "Using Private Actions in Workflows"
- link: "service_management/app_builder/private_actions/use_private_actions"
  tag: "Documentation"
  text: "Using Private Actions in App Builder"
- link: "service_management/workflows/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials for Workflow Automation"
- link: "service_management/app_builder/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials for App Builder"
---

{{< callout url="https://www.datadoghq.com/private-beta/private-actions/" btn_hidden="false" header="Join the Beta!">}}
Private Actions are in beta. Use this form to request access today.
{{< /callout >}}

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing them to the public internet. To use private actions, you must install a private action runner on a host in your network using Docker or [Kubernetes][1] and pair the runner with a [connection][2].

The runner authenticates using a private key that is generated when you first start the runner. This private key is never accessible by Datadog and ensures you exclusive access. Datadog uses a public key derived from the private key as the means to authenticate specific runners.

{{< img src="service_management/private_action_runner-diagram_general.png" alt="Overview diagram illustrating how Private actions interact with Datadog and the user's browser" style="width:100%;" >}}

## Modes

A private action runner can be used with App Builder, Workflow Automation, or both.

### Mode differences

Some main distinctions between App Builder and Workflows modes include their triggering mechanisms and operational models. App Builder is human-driven, meaning that each action is initiated by user interaction with an App. In contrast, Workflows can run automatically without direct human intervention. Another key difference is that App Builder mode operates through a push model, where actions are triggered by directly accessing a URL on the runner. Conversely, Workflows use a pull model, where the runner periodically checks for tasks to execute. This difference in models results in distinct data handling practices. In Workflows mode, the runner reports the result of private action executions to Datadog. In contrast, App Builder mode does not send your data to Datadog, keeping it in your private environment.

The difference in models can also result in varying latencies. The push model in App Builder mode might lead to more immediate responses, whereas the pull model in Workflows mode might introduce delays based on polling frequency.

### App Builder mode

When your private action runner is in App Builder mode, queries that call your private services are sent directly from the user's browser to the private action runner, which then proxies requests to your services. At no point does your data enter Datadog when the runner is in App Builder mode; it communicates with Datadog only for enrollment and authentication purposes.

In the following diagram, **App Management** refers to backend App Builder actions that are unrelated to the Private Action runner, such as deleting an app.

{{< img src="service_management/private_action_runner-diagram_app_builder.png" alt="Overview diagram illustrating how Private actions work in App Builder mode, including authentication" style="width:100%;" >}}

#### Authentication

To ensure secure communication, the Datadog frontend sends a single-use scoped token with each request, which the runner validates using a private key. This mechanism ensures that your data remains within your network and does not enter Datadog while maintaining the integrity and security of your private actions.

#### Runner hostname

In App Builder mode, the user's browser talks directly to your private action runner. As a result, you must specify a custom domain name that points to your runner. To set up your domain, point an `A` or `CNAME` record to your network's ingress. Your ingress must be capable of terminating HTTPS requests and forwarding them to the runner container on port 9016. The domain and ingress do not have to be accessible to the public internet; the `A` or `CNAME` record can point, for example, to a load balancer that is only accessible through your company's VPN.

### Workflow Automation mode

If your private action runner runs in Workflows-only mode, you do not need to perform any setup beyond the initial enrollment. The private actions runner continuously polls for tasks from your Datadog account, executes them by interacting with your internal service, and reports the result back to Datadog.

{{< img src="service_management/private_action_runner-diagram_workflow.png" alt="Overview diagram illustrating how Private actions work in Workflow Automation mode" style="width:100%;" >}}

### Both

When you select the option to use both modes, the runner dynamically adjusts the mode it uses based on the type of request it receives. This ensures smooth operation whether the runner is handling app requests, Workflow Automation executions, or a combination of both.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[2]: /service_management/workflows/connections/
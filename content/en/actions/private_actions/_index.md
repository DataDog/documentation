---
title: Private Actions Overview
description: Allow workflows and apps to interact with private network services using Docker-based private action runners with secure authentication.
disable_toc: false
aliases:
- service_management/workflows/private_actions/
- service_management/app_builder/private_actions/
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflows/connections"
  tag: "Documentation"
  text: "Workflow Connections"
- link: "actions/private_actions/use_private_actions"
  tag: "Documentation"
  text: "Use Private Actions"
- link: "actions/private_actions/run_script"
  tag: "Documentation"
  text: "Run a Script with the Private Action Runner"
- link: "actions/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials"
- link: "https://www.datadoghq.com/blog/private-actions/"
  tag: "Blog"
  text: "Remediate Kubernetes incidents faster using private actions in your apps and workflows"
- link: "https://www.datadoghq.com/blog/pm-app-automation/"
  tag: "Blog"
  text: "How we created a single app to automate repetitive tasks with Datadog Workflow Automation, Datastore, and App Builder"
---

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing them to the public internet. To use private actions, you must install a private action runner on a host in your network using Docker or [Kubernetes][1] and pair the runner with a [connection][2].

<div class="alert alert-danger">To install a private action runner, your organization must have <a href="/remote_configuration">Remote Configuration</a> enabled.</div>

When you first start the runner, it generates a private key for authentication with Datadog's servers. This private key is never accessible by Datadog and ensures you exclusive access. Datadog uses a public key derived from the private key as the means to authenticate specific runners.

## Modes

A private action runner can be used with App Builder, Workflow Automation, or both.

The following is a general overview diagram for private actions:

{{< img src="service_management/private_action_runner_-_diagram_general.png" alt="Overview diagram illustrating how Private actions interact with Datadog and the user's browser" style="width:90%;" >}}

### Mode differences

The following table explains some distinctions between App Builder and Workflows modes, including their triggering mechanisms and operational models.

| Distinction              | App Builder mode | Workflows mode |
|--------------------------| -----------------|----------------|
| **Trigger<br>mechanism** | Human-driven - each action is initiated by user interaction with an App      | Can run automatically without direct human intervention    |
| **Trigger<br>model**     | Push model - actions are triggered by directly accessing a URL on the runner | Pull model - periodically checks for tasks to execute      |
| **Data<br>handling**     | Keeps data in your private environment and does not send it to Datadog       | Reports the result of private action executions to Datadog |

The difference in models can result in varying latencies. App Builder mode's push model might lead to more immediate responses, whereas the pull model in Workflows mode might introduce delays based on polling frequency.

### App Builder mode

When your private action runner is in App Builder mode, queries that call your private services are sent directly from the user's browser to the private action runner, which proxies requests to your services. At no point does your data enter Datadog when the runner is in App Builder mode; it communicates with Datadog only for enrollment and authentication purposes.

In the following diagram, **App Management** refers to backend App Builder actions that are unrelated to the Private Action runner, such as deleting an app.

{{< img src="service_management/private_action_runner_-_diagram_app_builder.png" alt="Overview diagram illustrating how Private actions work in App Builder mode, including authentication" style="width:90%;" >}}

#### Authentication

To ensure secure communication, the Datadog frontend sends a single-use scoped token with each request, which the runner validates using a private key. This mechanism ensures that your data remains within your network and does not enter Datadog while maintaining the integrity and security of your private actions.

#### Runner hostname

In App Builder mode, the user's browser talks directly to your private action runner. As a result, you must specify a custom domain name that points to your runner. To set up your domain, point an `A` or `CNAME` record to your network's ingress. Your ingress must be capable of terminating HTTPS requests and forwarding them to the runner container on port 9016. The domain and ingress do not have to be accessible to the public internet; the `A` or `CNAME` record can point, for example, to a load balancer that is only accessible through your company's VPN.

### Workflow Automation mode

If your private action runner runs in Workflows-only mode, you do not need to perform any setup beyond the initial enrollment. The private action runner continuously polls for tasks from your Datadog account, executes them by interacting with your internal service, and reports the result back to Datadog.

{{< img src="service_management/private_action_runner_-_diagram_workflow.png" alt="Overview diagram illustrating how Private actions work in Workflow Automation mode" style="width:90%;" >}}

### Both

When you select the option to use both modes, the runner dynamically adjusts the mode it uses based on the type of request it receives. This ensures smooth operation whether the runner is handling app requests, Workflow Automation executions, or a combination of both.

## Monitor your Private Action Runners with Datadog Metrics

While setting up your Private Action Runners, you can enable observability metrics to monitor your runners' health and private action usage. These metrics can be used in Datadog products like Dashboards and Monitors. To get started quickly, you can use the provided [out-of-the-box Dashboard][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[2]: /service_management/workflows/connections/
[3]: https://app.datadoghq.com/dash/integration/private_actions_runner

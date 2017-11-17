---
title: Datadog-Kubernetes state Integration
integration_title: Kubernetes State
kind: integration
git_integration_title: kubernetes_state
newhlevel: true
description: "{{< get-desc-from-git >}}"
---

## Overview

Get metrics from kubernetes_state service in real time to:

* Visualize and monitor kubernetes_state states
* Be notified about kubernetes_state failovers and events.

## Setup


#### Compatibility

The kubernetes_state check is compatible with all major platforms

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

### Events
The Kubernetes-state check does not include any event at this time.

### Service Checks
The Kubernetes-state check does not include any service check at this time.

## Troubleshooting

If you have any questions about Datadog or a use case our [Docs](https://docs.datadoghq.com/) didn’t mention, we’d love to help! Here’s how you can reach out to us:

### Visit the Knowledge Base

Learn more about what you can do in Datadog on the [Support Knowledge Base](https://datadog.zendesk.com/agent/).

### Web Support

Messages in the [event stream](https://app.datadoghq.com/event/stream) containing **@support-datadog** will reach our Support Team. This is a convenient channel for referencing graph snapshots or a particular event. In addition, we have a livechat service available during the day (EST) from any page within the app.

### By Email

You can also contact our Support Team via email at [support@datadoghq.com](mailto:support@datadoghq.com).

### Over Slack

Reach out to our team and other Datadog users on [Slack](http://chat.datadoghq.com/).

## Further Reading

* [How to get more out of your Kubernetes integration?](/agent/faq/how-to-get-more-out-of-your-kubernetes-integration)
* [How to report host disk metrics when dd-agent runs in a docker container?](/agent/faq/how-to-report-host-disk-metrics-when-dd-agent-runs-in-a-docker-container)
* [Client Authentication against the apiserver and kubelet](/integrations/faq/client-authentication-against-the-apiserver-and-kubelet)
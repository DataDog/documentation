---
title: Kubernetes Tag Extraction
kind: documentation
aliases:
- /agent/autodiscovery/tag/
further_reading:
- link: "tagging/"
  tag: "Documentation"
  text: "Getting started with tags"
- link: "tagging/using_tags"
  tag: "Documentation"
  text: "Using tags with Datadog"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
---

The Agent can create and assign tags to all metrics, traces, and logs emitted by a Pod, based on its labels or annotations.

If running the Agent as a binary on a host, configure your tag extractions with the [Agent](?tab=agent) tab instructions. If running the Agent as a container in your kubernetes cluster configure your tag extraction with the  [Containerized Agent](?tab=containerizedagent) tab instructions.

## Tag Autodiscovery

Starting with Agent v6.10+, the Agent can autodiscover tags from Pod annotations. It allows the Agent to associate tags to all data emitted by the entire pods or an individual container within this pod.

To apply a `<TAG_KEY>":<TAG_VALUE>` tag to all data emitted by a given pod and collected by the Agent use the following annotation on your pod:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

If you want to apply a `<TAG_KEY>":<TAG_VALUE>` tag to an individual container `<CONTAINER_IDENTIFIER>` within a pod, use the following annotation on your pod:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_IDENTIFIER>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Starting with Agent v7.17+, the Agent can Autodiscover tags from Docker labels. This process allows the Agent to associate custom tags to all data emitted by a container, without [modifying the Agent `datadog.yaml` file][1].

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

## Node Labels as Tags

Starting with Agent v6.0+, the Agent can collect labels for a given node and use them as tags to attach to all metrics emitted by all pods on this node:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

To extract a given node label `<NODE_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_node_labels_as_tags:
  <NODE_LABEL>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_node_labels_as_tags:
  app: kube_app
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pod Labels as Tags

Starting with Agent v6.0+, the Agent can collect labels for a given pod and use them as tags to attach to all metrics emitted by this pod:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given pod label `<POD_LABEL>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

For Agent v6.8.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tags names are prefixed by `<PREFIX>_`:

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```

**Note**: Using this method may increase the number of [custom metrics][1] for your organization and impact your billing.

[1]: /developers/metrics/
{{% /tab %}}
{{% tab "Agent" %}}

To extract a given pod label `<POD_LABEL>` and transform it as a Tag Key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_pod_labels_as_tags:
  <POD_LABEL>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_pod_labels_as_tags:
  app: kube_app
```

For Agent v6.8.0+, use the following environment variable configuration to add all pod labels as tags to your metrics. In this example, the tag names are prefixed by `<PREFIX>_`:

```yaml
kubernetes_pod_labels_as_tags:
  *: <PREFIX>_%%label%%
```

**Note**: Using this method may [increase the number of metrics][2] for your organization and impact your billing.

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /developers/metrics/
{{% /tab %}}
{{< /tabs >}}

## Pod Annotations as Tags

Starting with Agent v6.0+, the Agent can collect annotations for a given pod and use them as tags to attach to all metrics emitted by this pod:

{{< tabs >}}
{{% tab "Containerized Agent" %}}

To extract a given pod label `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following environment variable to the Datadog Agent:

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

For example, you could set up:

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

To extract a given pod annotation `<POD_ANNOTATION>` and transform it as a tag key `<TAG_KEY>` within Datadog, add the following configuration block in the [Agent `datadog.yaml` configuration file][1]:

```yaml
kubernetes_pod_annotations_as_tags:
  <POD_ANNOTATION>: <TAG_KEY>
```

For example, you could set up:

```yaml
kubernetes_pod_annotations_as_tags:
  app: kube_app
```

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/tag/?tab=agent#extract-labels-as-tags

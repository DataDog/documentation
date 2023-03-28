---
title: Container Troubleshooting
kind: documentation
description: Troubleshooting containers-related issues
---

This page provides troubleshooting information for container monitoring.


There are three methods of deploying the Agent:
1. As a [**container in a runtime**][1] 

2. In a **cloud environment**, such as [Amazon ECS][2] [Fargate in an Amazon ECS environment][3], or [Amazon EKS][4]

3. In a [Kubernetes environment][2]

These different methods present unique deployment challenges. Use this page as a starting point to resolve issues. If you continue to have trouble, reach out to [Datadog support][6] for further assistance. 

For details on Agent release updates or changes, refer to Datadog’s [release notes][7].

 

## General issues

### Environment variables are not being set, and tags are not injected

A useful way to inject [environment variables][8] or to configure a DogStatsD library is to implement the [Admission Controller][9] feature on the Cluster Agent. **Note**: The Cluster Agent must be deployed and running _before_ the application is deployed.

### Metrics are not appearing on the Datadog Web Platform

Verify that the following are true:

- The metrics endpoint is exposed and is open for the the Agent to reach.

- There are no proxies or firewalls that might impede the Agent from accessing the endpoint. 

- Agent has [Autodiscovery](10] enabled.


### Logs are not collected

There are two [environment variables][8] that can impact if logs will be collected and from which containers:

- Set `DD_LOGS_ENABLED` to `true` to collect logs. 
- Additionally, set `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` to `true` to collect all logs from all containers.

To exclude logs (and other features) from collection, see the [Container Discovery Management guide][11].

### Cannot connect to the Kubelet

The most common error that prevents connection to the Kubelet API is the verification of the Kubelet TLS certificate.

TLS verification is enabled by default, and may prevent the Agent from connecting to the Kubelet API through HTTPS. You can disable TLS verification by using dedicated parameters or by setting the `DD_KUBELET_TLS_VERIFY` variable for all containers in the Agent manifest:

 - Set `TLS_VERIFY` to `false`.

### HPA metrics are not appearing or are not aligning with the expected value

First, ensure that the Cluster Agent is deployed and able to send data to the node Agent.

Then, review the query used to scale the external metrics in the Metrics Summary. Only valid queries autoscale. If there are multiple queries, **all** queries are ignored if **any** of the queries are invalid.

When reaching out for further assistance for HPA metrics, provide the following to [Datadog support][6]:
  - A `describe` output of the HPA manifest:


      > kubectl describe hpa > hpa.log

  - A `describe` output of the DatadogMetric Custom Resource Definition:


      > kubectl describe DatadogMetric > DatadogMetric.log



## Runtime:

 

For logs, make sure that the Agent deployment command has `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` and `DD_LOGS_ENABLED` enabled.

 

## Cloud:

 

**Make sure that the IAM policy has been updated.**

**Not collecting logs in Fargate**

  - [ECS](https://docs.datadoghq.com/integrations/ecs_fargate/?tab=webui#log-collection) => Ensure that the log router is attached to the container from which you would like to collect logs.

  - [EKS](https://docs.datadoghq.com/integrations/eks_fargate/#log-collection) => There are two common ways for the Agent to collect logs in an EKS Fargate environment: Log forwarding through Kinesis Data Firehose and log forwarding with CloudWatch logs: 

  - [Kinesis Data Firehose](https://docs.datadoghq.com/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/#overview) => Using Kinesis Data Firehose to collect logs requires the successful implementation of the Kinesis Data Firehose delivery stream, as well as some command line tools. 
 

## Kubernetes:
 

- Container not deploying or collecting metrics

 - Ensure API key is valid.

 - Bash into the Node Agent pod and run the `agent status` command to review the results.

- Not getting `kubeapi_server`, `kube_controller_manager`, and `etcd` metrics:

  - Your Kubernetes environment may be running on a managed service. On managed services such as Azure Kubernetes Service (AKS) and Google Kubernetes Engine (GKE), the user cannot access the control plane components. As a result, it is not possible to run the `kube_apiserver`, `kube_controller_manager`, `kube_scheduler`, or `etcd` checks in these environments.

 

# Troubleshooting Data Requested by Datadog Support:

 

When opening a support ticket, our support team may ask for some combination of the following types of information:

 

### - Node Agent Flare 

 

Read more about flares here. The command needed to receive a Node Agent flare is below: 


> kubectl exec <AGENT_POD_NAME> -it agent flare <CASE_ID> 

 

### - Cluster Agent Flare 

Read more about flares here. The command needed to receive a Cluster Agent flare is below: 

 

> kubectl exec <CLUSTER_AGENT_POD_NAME> -it agent flare <CASE_ID>

 

### - Describe Pod output 

 

This will provide the team with insight on how the Cluster/Node Agent was deployed, what the most recent events were for the pod, and if some qualities (such as custom tags) were injected and applied to host metrics. The `> <FILENAME>.yaml` section of the command creates a file output that can be sent to Support via an attachment: 

 

> kubectl describe pod <POD_NAME> > <FILENAME>.yaml


 

### - Manifest/Deployment 

 

This is the file used to deploy the Agent in your environment, and informs Datadog of the tags configured, wether logs were enabled, or if certain containers are defined to be ignored. 

In the case of deploying the Agent in a runtime environment, please send Support the command line used to deploy the Agent.

 

  The three most common deployment methods are: 

    - Helm Chart deployment. 


    - Daemonset deployment 


    - Operator deployment: The operator is still in public beta, and could result in unexpected blockers.

 

### - cURL output 

If you are experiencing missing or inaccurate metrics, Datadog Support may ask for the result of a cURL output of the Node Agent trying to reach the metric endpoint. This is done by running the command from inside the Agent container, and can inform Support if the Agent has access to the metrics. Please note that this is not possible in a Fargate or Managed Service: 


> kubectl exec -it <AGENT_POD_NAME> curl -k -v ""<METRIC_ENDPOINT>""



> docker exec -it <AGENT_CONTAINER_ID> curl -k -v "<METRIC_ENDPOINT>"

---

{{< whatsnext desc="List of Frequently Asked Questions:">}}
    {{< nextlink href="agent/faq/host-metrics-with-the-container-agent" >}}Host Metrics with the Container Agent{{< /nextlink >}}
    {{< nextlink href="agent/faq/kubernetes-secrets" >}}How do I use Kubernetes secrets to set my API key?{{< /nextlink >}}
    {{< nextlink href="agent/faq/kubernetes-state-cluster-check" >}}How do I run the kubernetes_state check as a cluster check?{{< /nextlink >}}
    {{< nextlink href="agent/guide/auto_conf" >}}Auto-configuration for Autodiscovery{{< /nextlink >}}
    {{< nextlink href="agent/guide/template_variables" >}}Template variables used for Autodiscovery{{< /nextlink >}}
    {{< nextlink href="agent/faq/docker-hub" >}}Docker Hub{{< /nextlink >}}
    {{< nextlink href="containers/faq/build_cluster_agent" >}}How do I build the Cluster Agent?{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://docs.datadoghq.com/containers/docker/?tab=standard
[2]: https://docs.datadoghq.com/containers/amazon_ecs/?tab=awscli
[3]: https://docs.datadoghq.com/integrations/ecs_fargate/?tab=webui#
[4]: https://docs.datadoghq.com/integrations/eks_fargate
[5]: https://docs.datadoghq.com/containers/kubernetes/
[6]: https://docs.datadoghq.com/help/
[7]: https://app.datadoghq.com/release-notes
[8]: https://docs.datadoghq.com/agent/guide/environment-variables/#overview
[9]: https://docs.datadoghq.com/containers/cluster_agent/admission_controller/?tab=operator
[10]: https://docs.datadoghq.com/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[11]: https://docs.datadoghq.com/agent/guide/autodiscovery-management/?tab=containerizedagent
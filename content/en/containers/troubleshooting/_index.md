---
title: Containers FAQ
kind: faq
cascade: 
  - private: true
disable_sidebar: true
---

When deploying the Agent in a containerized environment, Datadog recommends following the documentation provided on this site. There are three methods of deploying the Agent:

 

[As a container in a runtime](https://docs.datadoghq.com/containers/docker/?tab=standard) 

In a Cloud environment => Common cloud environments are [Amazon ECS](https://docs.datadoghq.com/containers/amazon_ecs/?tab=awscli) [Fargate in an Amazon ECS environment](https://docs.datadoghq.com/integrations/ecs_fargate/?tab=webui#), and [Amazon EKS](https://docs.datadoghq.com/integrations/eks_fargate/#pagetitle).

[In a Kubernetes environment](https://docs.datadoghq.com/containers/kubernetes/)

 

As these processes may present unique deployment challenges, investigate this guide and use it as a starting point to resolve issues. If you continue to have trouble, reach out to [Datadog support](https://docs.datadoghq.com/help/) for further assistance. For details on Agent release updates or changes, please refer to Datadog’s Releases page (not specific to the Containers product area). 

 

## General Issues: 

 

**[Environment Variables](https://docs.datadoghq.com/agent/guide/environment-variables/#overview) are not being set and tags are not injected:**

 A useful way to inject environment variables or to configure a DogStatsD library is to implement the Admissions Controller feature on the Cluster Agent. Please note that the Cluster Agent must be deployed and running BEFORE the application is deployed.

 

**Metrics are not appearing on the Datadog Web Platform:**

This can be due to many different factors, but it is important to ensure that the:

 - Metrics endpoint is exposed and is open for the the Agent to reach.

 - There are no proxies or firewalls that might impede the Agent from accessing the endpoint. 

 - Agent has [Autodiscovery](https://docs.datadoghq.com/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736#overview) enabled.

 

**Not getting logs:**

There are two [environment variables](https://docs.datadoghq.com/agent/guide/environment-variables/#overview) that can impact if logs will be collected and, if so, from which containers. The first variable is `DD_LOGS_ENABLED`, which must be enabled. To collect all logs from all containers, you can set the environment variable `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` to `true`.

To exclude logs (and other features) from collection, please refer to Datadog’s [Container Discovery Management page](https://docs.datadoghq.com/agent/guide/autodiscovery-management/?tab=containerizedagent#pagetitle) for more insight.

                                                                           

**Cannot connect to the Kubelet:**

The most common error that prevents connection to the Kubelet API is the verification of the Kubelet TLS certificate.

TLS verification is enabled by default, and may prevent the Agent from connecting to the Kubelet API through HTTPS. You can disable TLS verification by using dedicated parameters or by setting the `DD_KUBELET_TLS_VERIFY` variable for all containers in the Agent manifest:

 - Set `TLS_VERIFY` to `false`.


 

**HPA metrics are not appearing or are not alining with the expected value.**

- Ensure that the Cluster Agent is deployed and able to send data to the Node Agent

- Review the query used to scale the external metrics in the Metrics Summary. Only valid queries will autoscale, and if there are multiple queries, ALL will be ignored if **ANY** of the queries are invalid.

- To further assist Datadog Support in such issues, please provide Support with:

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

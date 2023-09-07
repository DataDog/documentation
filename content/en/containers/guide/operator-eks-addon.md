---
title: Installing the Datadog Agent on Amazon EKS with the Datadog Operator add-on
kind: guide
aliases:
 - /agent/guide/operator-eks-addon
further_reading:
  - link: 'agent/kubernetes/log'
    tag: 'Documentation'
    text: 'Datadog and Kubernetes'
---

You can install the Datadog Agent on an Amazon EKS cluster by installing [Datadog Operator](/containers/datadog_operator)
as an [Amazon EKS add-on](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) and apply `DatadogAgent` manifest.

There are certain differences when using add-on, compared to the regular [Helm installation][4]:
* During Operator installation, images must be pulled only from EKS repository, this can't be changed by the user.
* Operator Helm Chart values, which can be overriden is restricted by following [schema file][3].

These restriction are necessary to make Operator compliant with the add-on policies, allow EKS ensure safety of the installation, and disable features not yet supported in add-on environment.

## Prerequisites


* Subscription to the [Datadog Operator][1] product. 
* [TODO] License manager SLR.
* Kubectl
* If you are using the command line interface for setting up add-on, [AWS CLI](https://aws.amazon.com/cli/)

## Installing Operator

{{< tabs >}}
{{% tab "Console" %}}

* Go to the EKS cluster in the AWS console.
* Go to add-on tab, select *Get more add-ons*.
* Find *Datadog Operator*, select and follow the prompts to complete the installation.

{{% /tab %}}
{{% tab "CLI" %}}

To install the Operator add-on, run:
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME> 
  ```

Add-on installation is asynchronous. To check installation status, run:
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME> 
  ```

To delete the add-on, run:
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

To verify that the installation was successful, use the AWS Management Console, `eksctl`, or the AWS CLI to confirm that a `datadog-operator` pod is running.

## Configuring Agent

Operator add-on 0.1.x installs Operator only. For Agent setup you need to setup `DatadogAgent` custom resource.

1. Switch to Operator installation namespace, `datadog-agent` by default.
  ```bash
  kubens datadog-agent
  ```
2. Create a Kubernetes secret with your API and application keys:
  ```bash
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
  ```
  Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][5].
3. Create a `datadog-agent.yaml` file with the spec of your `DatadogAgent` deployment configuration. By default Operator will use default Agent and Cluster agent image settings and pull them from non-EKS registry.
If user wants to pull images from EKS repository, one can add `global.registry`. The following sample configuration enables metrics, logs, and APM and sets EKS repository as a default:
  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com
      credentials:
        apiSecret:
          secretName: datadog-secret
          keyName: api-key
        appSecret:
          secretName: datadog-secret
          keyName: app-key
    features:
      apm:
        enabled: true
      logCollection:
        enabled: true
  ```
 For all configuration options, see the [Operator configuration spec][6].
4. Deploy the Datadog Agent:
  ```bash
  kubectl apply -f /path/to/your/datadog-agent.yaml
  ```

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/account/settings#api

---
title: Installing the Datadog Agent on Amazon EKS with the Datadog Operator add-on
aliases:
 - /agent/guide/operator-eks-addon
further_reading:
  - link: 'agent/kubernetes/log'
    tag: 'Documentation'
    text: 'Datadog and Kubernetes'
---

<div class="alert alert-info"> Starting with v0.1.9 Datadog Operator add-on supports automatic Agent sidecar injection in pods scheduled on Fargate instances. See <a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">this guide</a> for more details.
</div>


You can install the Datadog Agent on an Amazon EKS cluster by installing the [Datadog Operator](/containers/datadog_operator)
as an [Amazon EKS add-on](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html) and applying the `DatadogAgent` manifest.

Agents installed using the Operator add-on only collect data from pods running on EC2 instances. For pods running on AWS Fargate, follow the [Amazon EKS on AWS Fargate documentation][10].

Compared to the regular [Helm installation][4], there are certain differences when installing as an add-on:
* During Operator installation, images must be pulled only from the EKS repository. This can't be changed by the user.
* Operator Helm Chart values, which can be overriden, are restricted to a [schema file][3].

These restriction are necessary to make Operator compliant with the EKS add-on policies, allow EKS to ensure the safety of the installation, and disable features not yet supported in the add-on environment.

## Prerequisites

* Subscription to the [Datadog Operator][1] product.
* kubectl installed
* If you are using the command line interface for setting up the add-on, [AWS CLI](https://aws.amazon.com/cli/)

## Installing Operator

{{< tabs >}}
{{% tab "Console" %}}

* Go to the EKS cluster in the AWS console.
* Go to the add-on tab and select *Get more add-ons*.
* Find and select *Datadog Operator*. Then follow the prompts to complete the installation.

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
{{% /tab %}}
{{< /tabs >}}

To verify that the installation was successful, use the AWS Management Console, `eksctl`, or the AWS CLI to confirm that a `datadog-operator` pod is running.

## Configuring the Agent

After you have installed the Operator add-on, you can proceed to set up the Datadog Agent.

Follow the instructions to set up the Datadog Agent by using the `DatadogAgent` custom resource.

1. Switch to the Operator installation namespace, which is `datadog-agent` by default.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. Create a Kubernetes secret with your [Datadog API and application keys][5]:
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API and application keys][5].


3. Create a `datadog-agent.yaml` file with the spec of your `DatadogAgent` deployment configuration. The Datadog Operator uses default Agent and Cluster Agent image settings and pulls them from a public registry.

   If you want to pull images from a private EKS registry, you can add `global.registry`. The following configuration enables metrics, logs, and APM:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: 709825985650.dkr.ecr.us-east-1.amazonaws.com/datadog
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
   This Agent instance configuration pulls the Datadog agent image from an AWS Marketplace hosted ECR repository, which also contains the image for the Datadog Operator Amazon EKS add-on. Should you require alternatives, edit the 'global.registry' entry in the manifest above.

   For all configuration options, see the [Operator configuration spec][6].

   **Note:** If access to IMDS v1 is blocked on the node, the Agent cannot resolve the cluster name, and certain features (for example, [Orchestrator Explorer][6]) do not work. Hence, Datadog recommends adding `spec.global.ClusterName` in the `DatadogAgent` manifest. See this [comment][8] on how to configure the Agent to request metadata using IMDS v2.

4. Deploy the Datadog Agent:
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Uninstall the Operator

If you want to uninstall the Agent and Operator, first delete the `DatadogAgent` custom resource:

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

Confirm all Agent resources are deleted and proceed with add-on uninstallation:

{{< tabs >}}
{{% tab "Console" %}}

* Go to the EKS cluster in the AWS console.
* Go to the add-on tab and select the *Datadog Operator* add-on.
* Click **Remove** and confirm when prompted.

{{% /tab %}}
{{% tab "CLI" %}}

To delete the add-on, run:
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **Note:** If you uninstall the Operator add-on before deleting the `DatadogAgent` custom resource, Agents continue to run on the cluster. Deleting the namespace fails since the `DatadogAgent` cannot be finalized without a running Operator. See this Github [issue][9] for a workaround.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/4896a45f586f74de1da2e985f98988f0181afc36/pkg/config/config_template.yaml#L407-L416
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /integrations/eks_fargate/#setup

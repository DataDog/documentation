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

Datadog Operator can be installed on EKS cluster as an add-on. Add-ons provide installation and management of a curated set of add-ons for Amazon EKS clusters. 

## Prerequisites


* Ability to subscribe to [Datadog Operator][1] product. 
* [TODO] License manager SLR.
* Kubectl, AWS CLI if using command line interface.

## Installing Operator

There are certain differences when using add-on, compared to the regular [Helm installation][4]:
* During Operator installation images must be pulled only from EKS repository, this can't be change by user.
* Operator Helm Chart values which can be overriden is restricted by following [schema file][3].

These restriction are necessary to make Operator compliant with the add-on policies, allow EKS ensure safety of the installation, and disable features not yet supported in add-on environment.

{{< tabs >}}
{{% tab "Console" %}}

* Go to the EKS cluster in the AWS console.
* Go to add-on tab, select *Get more add-ons*.
* Find *Datadog Operator*, select and follow the prompts to complete the installation.

{{% /tab %}}
{{% tab "CLI" %}}

To install the Operator add-on, run:
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGOIN> --cluster-name <CLUSTER_NAME> 
  ```

Add-on installation is asynchrnous, to check the status of add-on run:
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGOIN> --cluster-name <CLUSTER_NAME> 
  ```

To delete add-on run:
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGOIN> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

To verify wheather installation was successful, confirm that datadog-operator pod is running either via Console, `eksctl` or AWS CLI.

## Configuring Agent

Operator add-on 0.1.x installs Operator only. For Agent setup one can follow steps 2-4 from the Operator [installation guide][2].
By default Operator will use default Agent and Cluster agent image settings and pull them from non-EKS registry.
If user wants to pull images from EKS repository, one can add `global.registry` setting in the manifest:
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

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration_schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
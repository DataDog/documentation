---
title: Installing Agent on AWS EKS using Operator Add-on
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

Installing Operator as an add-on requires following prerequisites:

* Ability to subscribe to [Datadog Operator][1] product. 
* [TODO] License manager SLR.
* Kubectl, AWS CLI if using command line interface.

## Installing Operator

{{< tabs >}}
{{% tab "Console" %}}

* Subscribe [Datadog Operator][1] product.
* Go to the EKS cluster in the AWS console.
* Go to add-on tab, select *Get more add-ons*.
* Find *Datadog Operator*, select and follow the prompts to complete the installation.

To verify installation confirm datadog-operator pod is running.

{{% /tab %}}
{{% tab "CLI" %}}

Run the following command to install Operator add-on:
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

Opereator add-on version 0.1.x installs Operator only. For Agent setup one has to follow steps 2-4 from Operator [installation guide][1].

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/getting_started/containers/datadog_operator?s=Autopilot#installation-and-deployment
[2]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe

---
title: Recommendations
description: View recommendations to proactively address issues in your system


---

DBM Recommendations draw attention to potential optimizations problematic areas across your database fleet.

## Recommendation types

Datadog generates a set of recommendations by combining your observability data with your underlying cloud provider's billing data. You can see the detailed logic for each recommendation type, along with observability metrics or cost data used to generate the recommendation, [on the **Recommendations** page][1].

{{< img src="cloud_cost/recommendations/overprovisioned_k8s_containers_sidepanel_1.png" alt="A side panel displaying a Kubernetes container that is over-provisioned in the ad-auction service with recommended next steps to change its usage as well as investigation metrics." style="width:100%;" >}}

Recommendations are run on a daily basis, and are automatically refreshed in your account. When new recommendations are released, Datadog automatically adds them to your account.

### Unused resource recommendations

Datadog identifies resources that are running on legacy hardware or are not utilized efficiently in your cloud environment. You can consider upgrading or removing these resources to reduce your costs and improve the performance of your resources.

Unused EC2 Instances
: EC2 instances with less than 5% CPU utilization, and less than 10% memory utilization.
---
"aliases":
- /integrations/aws-compute-optimizer
- /integrations/aco
"categories":
- cloud
- aws
"custom_kind": "integration"
"dependencies": []
"description": "provide resource configuration recommendations to help users rightsize their workloads."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_compute_optimizer/"
"draft": false
"git_integration_title": "amazon_compute_optimizer"
"has_logo": true
"integration_id": "amazon-compute-optimizer"
"integration_title": "AWS Compute Optimizer"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_compute_optimizer"
"public_title": "Datadog-AWS Compute Optimizer"
"short_description": "provide resource configuration recommendations to help users rightsize their workloads."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Compute Optimizer is a web service that provides resource configuration recommendations to help users rightsize their workloads.

This integration enables you to get better EC2 instance type recommendations in AWS Compute Optimizer using memory utilization data from the Datadog Agent. For more information on Compute Optimizer, read [What is AWS Compute Optimizer?][1] in the AWS documentation.

## Setup

### Installation

#### AWS
1. In the AWS Compute Optimizer console, go to the **Accounts** page and set your account-level preferences for external metrics ingestion to `Datadog`.
2. Repeat step #1 for each AWS account you wish to get enhanced recommendations for.

#### Datadog
3. If you haven't already, set up the [Amazon Web Services integration first][2] for each desired AWS account.
4. Install the [Datadog Agent][3] on any EC2 instances to include in the improved recommendations from Compute Optimizer.
5. Install the [Datadog - AWS Compute Optimizer integration][4].

After all steps are completed, it may take **up to 30 hours** for the recommendations in AWS Compute Optimizer to use the memory utilization data from Datadog.

#### Validation
Confirm that Datadog is referenced as an `External metrics source` in the recommendations table for EC2 instances:

{{< img src="integrations/amazon_compute_optimizer/compute_optimizer.png" alt="The AWS dashboard for Compute Optimizer Recommendations with three instances listed and a Datadog link under the external metrics source column for each instance" popup="true">}}

## How it Works

For all EC2 instances monitored by both [Datadog's AWS Integration][2] and the [Datadog Agent][3], Datadog sends memory utilization data from the Agent to AWS Compute Optimizer to provide enhanced instance recommendations that can potentially lead to cost savings.

**Note:** The Datadog memory utilization metrics are integrated directly with the AWS Compute Optimizer service and not your AWS account. No additional IAM permissions are needed for this integration since Datadog is not interacting with your AWS account directly.


## Data Collected

### Metrics

The AWS Compute Optimizer integration does not include any metrics.

### Events

The AWS Compute Optimizer integration does not include any events.

### Service Checks

The AWS Compute Optimizer integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

[1]: https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://docs.datadoghq.com/agent/
[4]: https://app.datadoghq.com/integrations/amazon-compute-optimizer/
[5]: https://docs.datadoghq.com/help/


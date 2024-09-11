1. Select one of the options in the dropdown to provide the expected log volume for the pipeline:
|   Option   | Description |
| ---------- | ----------- |
| Unsure | Use this option if you are not able to project the log volume or you want to test the Worker. This option provisions the EC2 Auto Scaling group with a maximum of 2 general purpose `t4g.large` instances. |
| 1-5 TB/day | This option provisions the EC2 Auto Scaling group with a maximum of 2 compute optimized instances `c6g.large`. |
| 5-10 TB/day | This option provisions the EC2 Auto Scaling group with a minimum of 2 and a maximum of 5 compute optimized `c6g.large` instances. |
| >10 TB/day | Datadog recommends this option for large-scale production deployments. It provisions the EC2 Auto Scaling group with a minimum of 2 and a maximum of 10 compute optimized `c6g.xlarge` instances. |

    **Note**: All other parameters are set to reasonable defaults for a Worker deployment, but you can adjust them for your use case as needed in the AWS Console before creating the stack.
1. Select the AWS region you want to use to install the Worker.
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Click **Launch CloudFormation Template** to navigate to the AWS Console to review the stack configuration and then launch it. Make sure the CloudFormation parameters are as expected.
1. Select the VPC and subnet you want to use to install the Worker.
1. Review and check the necessary permissions checkboxes for IAM. Click **Submit** to create the stack. CloudFormation handles the installation at this point; the Worker instances are launched, the necessary software is downloaded, and the Worker starts automatically.
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][7001] if you want to make changes to your pipeline's configuration.

[7001]: /observability_pipelines/update_existing_pipelines
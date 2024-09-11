
1. Select the expected log volume for the pipeline from the dropdown.
1. Select the AWS region you want to use to install the Worker.
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Click **Launch CloudFormation Template** to navigate to the AWS Console to review the stack configuration and then launch it. Make sure the CloudFormation parameters are set as expected.
1. Select the VPC and subnet that you want to use to install the Worker.
1. Review and check the necessary permissions checkboxes for IAM. Click **Submit** to create the stack. CloudFormation handles the installation at this point; the Worker instances are launched, the necessary software is downloaded, and the Worker starts automatically.
1. Delete the previous CloudFormation stack and resources associated with it.
1. Click **Navigate Back** to go back to the Observability Pipelines edit pipeline page.
1. Click **Deploy Changes**.
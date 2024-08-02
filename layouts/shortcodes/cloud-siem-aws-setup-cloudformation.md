1. Go to Datadog's [AWS integration tile][102] to install the integration.
2. Click **Automatically Using CloudFormation**. If there is already an AWS account set up, click **Add Another Account** first.
3. Select the AWS Region where the CloudFormation stack will be launched.
4. Select or create the Datadog API Key used to send data from your AWS account to Datadog.
5. Select **Yes** for *Send Logs to Datadog* to set up the Datadog Lambda Forwarder to be used later for sending AWS CloudTrail logs to Datadog.
6. Click **Launch CloudFormation Template**. This opens the AWS Console and loads the CloudFormation stack with the parameters filled in based on your selections in the Datadog form. 

    **Note:** The `DatadogAppKey` parameter enables the CloudFormation stack to make API calls to Datadog, allowing it to add and edit the configuration for this AWS account. The key is automatically generated and tied to your Datadog account. 

7. Check the required boxes from AWS and click **Create stack**.
8. After the CloudFormation stack is created, return to the AWS integration tile in Datadog and click **Ready!**

**Notes**:

- For more information about Datadog's AWS integration and CloudFormation template, see [Getting Started with AWS][103].
- If you need to set up the AWS integration manually, see [AWS manual setup instructions][104].

[102]: https://app.datadoghq.com/integrations/amazon-web-services?
[103]: https://docs.datadoghq.com/getting_started/integrations/aws/
[104]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#manual
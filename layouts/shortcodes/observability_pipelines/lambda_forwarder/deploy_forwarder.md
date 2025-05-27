Follow the [Datadog Forwarder CloudFormation installation instructions][10015] to deploy the Datadog Forwarder. After you have filled in `DdApiKey` and selected the appropriate `DdSite`, go to the **Log Forwarding (Optional)** section. Enter the following information in that section to configure the Forwarder for sending logs to Observability Pipelines:

1. In the **DdUrl** field, enter your load balancer address, which for this example is `9997`. **Note**: Datadog recommends fronting your Worker with a load balancer.
1. In the **DdPort** field, enter `80`.
1. If you want to encrypt traffic from the Datadog Forwarder to your Observability Pipelines Worker load balancer, you need to create an HTTPS listener and manage a certificate on your load balancer. Consult your cloud provider's documentation. For example in AWS, see [Create an HTTPS listener for your Application Load Balancer][10016] for more information.
1. If you do not need to maintain encryption between the Datadog Forwarder and load balancer, select **true** in the **DdNoSsl** dropdown menu.
1. Click **Create stack**, and wait for the creation to complete.
1. You can find the installed forwarder Lambda function under the stack's **Resources** tab with the logical ID `Forwarder`.
1. [Set up triggers][10017] for the installed Datadog Forwarder.

[10015]: /logs/guide/forwarder/?tab=cloudformation#installation
[10016]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html
[10017]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
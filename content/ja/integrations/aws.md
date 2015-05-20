---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-AWS Cloudwatch Integration
integration_title: AWS Cloudwatch
kind: integration
doclevel: complete
sidebar:
  nav:
    - header: AWS integration
    - text: Configure CloudWatch
      href: "#cloudwatch"
    - text: Configure CloudTrail
      href: "#cloudtrail"
    - text: Troubleshooting
      href: "#troubleshooting"
---


### <a name="cloudwatch"></a>Configure CloudWatch

The recommended way to configure Cloudwatch in Datadog is to create a
new user via the <a target="_blank" href="https://console.aws.amazon.com/iam/home#s=Home">IAM Console</a>
and grant that user (or group of user) **Amazon EC2, Cloudwatch and CloudTrail *read-only* access**.

These can be set via policy templates in the console.

Alternatively they can set via Amazon's API according to the following
specifications:

    {
      "Statement": [
        {
          "Action": [
            "autoscaling:Describe*",
            "cloudformation:DescribeStacks",
            "cloudformation:DescribeStackEvents",
            "cloudformation:DescribeStackResources",
            "cloudformation:GetTemplate",
            "cloudfront:Get*",
            "cloudfront:List*",
            "cloudtrail:DescribeTrails",
            "cloudtrail:GetTrailStatus",
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*",
            "dynamodb:GetItem",
            "dynamodb:BatchGetItem",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:DescribeTable",
            "dynamodb:ListTables",
            "ec2:Describe*",
            "elasticache:Describe*",
            "elasticbeanstalk:Check*",
            "elasticbeanstalk:Describe*",
            "elasticbeanstalk:List*",
            "elasticbeanstalk:RequestEnvironmentInfo",
            "elasticbeanstalk:RetrieveEnvironmentInfo",
            "elasticloadbalancing:Describe*",
            "iam:List*",
            "iam:Get*",
            "route53:Get*",
            "route53:List*",
            "rds:Describe*",
            "rds:ListTagsForResource",
            "s3:List*",
            "sdb:GetAttributes",
            "sdb:List*",
            "sdb:Select*",
            "ses:Get*",
            "ses:List*",
            "sns:Get*",
            "sns:List*",
            "sqs:GetQueueAttributes",
            "sqs:ListQueues",
            "sqs:ReceiveMessage"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
      ]
    }

Once these credentials are configured within AWS, go into the
<a target="_blank" href="https://app.datadoghq.com/account/settings#integrations/amazon_web_services">AWS integration tile</a>
within Datadog to pull this data in.

### <a name="cloudtrail"></a>CloudTrail integration

AWS CloudTrail records AWS API calls for your account in log files. Datadog can read these files and create events in your stream. Here is an example of a CloudTrail event:

<img src="/static/images/cloudtrail_event.png" style="width:100%; border:1px solid #777777"/>

#### How to configure CloudTrail?

First make sure that you have configured CloudWatch and that the user you created for Datadog has the **AWS CloudTrail read-only access**. <a href="#cloudwatch">See above explanation</a>.
Besides the instructions below you will also have to configure the separate
<a target="_blank" href="https://app.datadoghq.com/account/settings#integrations/cloudtrail">Cloudtrail integration tile</a> within Datadog.

CloudTrail has to be configured on a per-region basis. Make sure you complete the two steps below for **all regions** that you want Datadog to collect CloudTrail data from.

1. <a href="https://console.aws.amazon.com/cloudtrail">Go to your CloudTrail console</a> to enable it. Then select the S3 bucket you wish to use as follows:

    <img src="/static/images/cloudtrail_config.png" style="width:100%; border:1px solid #777777"/>

2. Your user must have access to the S3 bucket you have selected. To grant your user read-only access to your bucket, you would paste the following policy in the IAM console:

        {
          "Statement": [
            {
              "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:GetObject"
              ],
              "Effect": "Allow",
              "Resource": [
                "arn:aws:s3:::your-s3-bucket-name",
                "arn:aws:s3:::your-s3-bucket-name/*"
              ]
            }
          ]
        }

#### What events are collected?

Below is the list of events that Datadog will collect from CloudTrail and display in your event stream. If you would like to see other events that are not mentionned here, please reach out to <a href="/help">our support team</a>.

*EC2 Actions**<br/>
AttachVolume<br/>
AuthorizeSecurityGroup<br/>
CreateSecurityGroup<br/>
CreateVolume<br/>
CreateTags<br/>
DeleteVolume<br/>
DeleteTags<br/>
DetachVolume<br/>
RebootInstances<br/>
RevokeSecurityGroupEgress<br/>
RevokeSecurityGroupIngress<br/>
RunInstances<br/>
StartInstances<br/>
StopInstances<br/>
TerminateInstances<br/>

**RDS Actions**<br/>
CreateDBInstance<br/>
RebootDBInstance<br/>
ModifyDBInstance<br/>
DeleteDBInstance<br/>

**IAM Actions**<br/>
AddRoleToInstanceProfile<br/>
AddUserToGroup<br/>
ChangePassword<br/>
CreateAccessKey<br/>
CreateAccountAlias<br/>
CreateGroup<br/>
CreateInstanceProfile<br/>
CreateLoginProfile<br/>
CreateRole<br/>
CreateSAMLProvider<br/>
CreateUser<br/>
CreateVirtualMFADevice<br/>
DeleteAccessKey<br/>
DeleteAccountAlias<br/>
DeleteAccountPasswordPolicy<br/>
DeleteGroup<br/>
DeleteGroupPolicy<br/>
DeleteInstanceProfile<br/>
DeleteLoginProfile<br/>
DeleteRole<br/>
DeleteRolePolicy<br/>
DeleteSAMLProvider<br/>
DeleteServerCertificate<br/>
DeleteSigningCertificate<br/>
DeleteUser<br/>
DeleteUserPolicy<br/>
DeleteVirtualMFADevice<br/>
PutGroupPolicy<br/>
PutRolePolicy<br/>
PutUserPolicy<br/>
RemoveRoleFromInstanceProfile<br/>
RemoveUserFromGroup<br/>
UpdateAccessKey<br/>
UpdateAccountPasswordPolicy<br/>
UpdateAssumeRolePolicy<br/>
UpdateGroup<br/>
UpdateLoginProfile<br/>
UpdateSAMLProvider<br/>
UpdateServerCertificate<br/>
UpdateSigningCertificate<br/>
UpdateUser<br/>
UpdateServerCertificate<br/>
UpdateSigningCertificate<br/>

**VPC Actions**<br/>
AssociateDhcpOptions<br/>
AssociateRouteTable<br/>
AttachVpnGateway<br/>
CreateCustomerGateway<br/>
CreateDhcpOptions<br/>
CreateRouteTable<br/>
CreateVpnConnection<br/>
CreateVpnConnectionRoute<br/>
CreateVpnGateway<br/>
DeleteCustomerGateway<br/>
DeleteDhcpOptions<br/>
DeleteRouteTable<br/>
DeleteVpnConnection<br/>
DeleteVpnConnectionRoute<br/>
DeleteVpnGateway<br/>
DetachVpnGateway<br/>
DisassociateRouteTable<br/>
ReplaceRouteTableAssociation<br/>

**ELB Actions**<br/>
ApplySecurityGroupsToLoadBalancer<br/>
AttachLoadBalancerToSubnets<br/>
ConfigureHealthCheck<br/>
CreateAppCookieStickinessPolicy<br/>
CreateLBCookieStickinessPolicy<br/>
CreateLoadBalancer<br/>
CreateLoadBalancerListeners<br/>
CreateLoadBalancerPolicy<br/>
DeleteLoadBalancer<br/>
DeleteLoadBalancerListeners<br/>
DeleteLoadBalancerPolicy<br/>
DeregisterInstancesFromLoadBalancer<br/>
DetachLoadBalancerFromSubnets<br/>
DisableAvailabilityZonesForLoadBalancer<br/>
EnableAvailabilityZonesForLoadBalancer<br/>
ModifyLoadBalancerAttributes<br/>
RegisterInstancesWithLoadBalancer<br/>
SetLoadBalancerListenerSSLCertificate<br/>
SetLoadBalancerPoliciesForBackendServer<br/>
SetLoadBalancerPoliciesOfListener<br/>


### <a name="troubleshooting"></a>Troubleshooting

#### Do you believe you're seeing a discrepancy between your data in Cloudwatch and Datadog?

<p>There are two important distinctions to be aware of:</p>
<ol>
<li>In AWS for counters, a graph that is set to 'sum' '1minute' shows the total number of occurrences
in one minute leading up to that point, i.e. the rate per 1 minute.  Datadog is
displaying the raw data from AWS normalized to per second values, regardless of the
timeframe selected in AWS, which is why you will probably see our value as lower.</li>

<li>Overall, min/max/avg have a different meaning within AWS than in Datadog.
In AWS, average latency,
minimum latency, and maximum latency are three distinct metrics that AWS collects.
When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single time
series per ELB.
Within Datadog, when you are selecting 'min', 'max', or 'avg', you are
controlling how multiple time series will be combined. For example, requesting
<code>system.cpu.idle</code> without any filter would return one series for each host that
reports that metric and those series need to be combined to be graphed. On the
other hand, if you requested <code>system.cpu.idle</code> from a single host, no aggregation
would be necessary and switching between average and max would yield the same
result.</li>
</ol>

#### Metrics delayed?


<p>When using the AWS integration, we're pulling in metrics via the Cloudwatch API. You may
see a slight delay in metrics from AWS due to some constraints that exist for their API.</p>

<p>To begin, the Cloudwatch API only offers a metric-by-metric crawl to pull data. The Cloudwatch
APIs have a rate limit that varies based on the combination of authentication credentials, region,
and service. Metrics are made available by AWS dependent on the account level. For example, if
you are paying for "detailed metrics" within AWS, they are available more quickly. This level
of service for detailed metrics also applies to granularity, with some metrics being
available per minute and others per five minutes.</p>

<p>On the Datadog side, we do have the ability to prioritize certain metrics within an account
to pull them in faster, depending on the circumstances. Please contact
<a href="mailto:support@datadoghq.com">support@datadoghq.com</a> for more info on this.</p>

<p>To obtain metrics with virtually zero delay, we recommend installing the Datadog Agent on those hosts. We’ve
written a bit about this <a target="_blank" href="http://www.datadoghq.com/2013/10/dont-fear-the-agent">here</a>,
especially in relation to CloudWatch.</p>

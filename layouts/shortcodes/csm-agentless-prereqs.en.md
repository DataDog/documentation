
## Prerequisites

To deploy Agentless scanning in your AWS environment, in addition to having [Cloud Security Management][3] enabled, you must enable Remote Configuration.

### Enable Remote Configuration

[Remote Configuration][1] (enabled by [default][2] as of **April 8th, 2024**) is required to allow Datadog to send information to Agentless scanners, such as which cloud resources should be scanned. If Remote Configuration has not been enabled for your organization, navigate to your [Organization Settings in Datadog][4] and follow [steps 1-4][2] in the Remote Configuration docs.

**Note**: CSM-enabled AWS accounts that have scanners deployed require Remote-config enabled API keys.

### Permissions

**Note**: The following are permissions required for Agentless scanning, and are applied automatically as a part of the installation process.

####  IAM permissions (host and container permissions)

The Agentless Scanning instance requires the following IAM permissions to scan for hosts and containers:

```
ec2:DescribeVolumes
ec2:CreateTags
ec2:CreateSnapshot
ec2:DeleteSnapshot
ec2:DescribeSnapshots
ec2:DescribeSnapshotAttribute
ebs:ListSnapshotBlocks
ebs:ListChangedBlocks
ebs:GetSnapshotBlock
```

#### Lambda permissions

The Agentless Scanning instance requires the following IAM permissions to scan for Lambdas:

```
lambda:GetFunction
```


[1]: /agent/remote_config/?tab=configurationyamlfile
[2]: /agent/remote_config/?tab=configurationyamlfile#setup
[3]: /security/cloud_security_management/setup
[4]: https://app.datadoghq.com/organization-settings/remote-config
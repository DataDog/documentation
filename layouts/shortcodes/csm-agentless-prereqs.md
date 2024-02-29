
## Prerequisites

To deploy Agentless Scanning in your AWS environment, in addition to having [Cloud Security Management][3] enabled, complete the following steps:

### Enable Remote Configuration

[Remote Configuration][1] is required to allow Datadog to send information to agentless scanners, such as which EC2 compute instances should be scanned. To enable remote configuration for your organization, go to the AWS Integration tile and click the account you wish to enable Agentless Scanning for. One-click to enable Remote Configuration. This only needs to be configured once per AWS account.

### Enable API keys for Remote Configuration

After configuring Remote Configuration for Agentless Scanning, Remote Configuration needs to be enabled for the API keys configured for Agentless Scanning. See [Enabling Remote Configuration][2] for more information.

**Note**: Only the CSM-enabled AWS Accounts that have scanners deployed need Remote-config enabled API keys.

###  IAM permissions

The Agentless Scanning instance requires the following IAM permissions to scan for resources:

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

### Lambda permissions

The Agentless Scanning instance requires the following Lambda permissions to scan for resources:

Permissions required:
```
lambda:GetFunction
```


[1]: /agent/remote_config/?tab=configurationyamlfile
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /security/cloud_security_management/setup
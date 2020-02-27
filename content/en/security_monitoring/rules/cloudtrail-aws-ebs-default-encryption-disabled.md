---
title: AWS EBS Default Encryption Disabled
kind: documentation
parent: cloudtrail
tags:
- security:compliance
- service:ec2.amazonaws.com
- source:cloudtrail
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---
## **Goal:**
Detect when EBS encryption is disabled by default 

## **Strategy:**
Monitor CloudTrail and detect when EBS encryption is disabled by default via the following API call:
* [DisableEbsEncryptionByDefault][1]

## **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and inform them of best practices to enable EBS encryption by default.
3. Re-enable EBS encryption by default.

More details on Amazon EBS Encryption can be found [here][2].[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DisableEbsEncryptionByDefault.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html

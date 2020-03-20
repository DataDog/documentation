---
title: AWS S3 Buckets Enumerated
kind: documentation
type: security_rules
parent: cloudtrail
security: attack
tactic: TA0007-discovery
technique: T1083-file-and-directory-discovery
source: cloudtrail
service: s3
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---

## Overview

### **Goal:**
Detect when an EC2 instance makes an API call to AWS to list all of the S3 Buckets.

### **Strategy:**
Monitor CloudTrail and detect when the [ListBuckets][1] API call is made and the session name is prefixed with `i-`. A session name prefixed with `i-` _typically_ indicates that it is an EC2 instance using an [Instance Profile][2] to communicate with other AWS services. 

### **Triage & Response:**
1. Determine if the EC2 instance should be making this API call.
   * If not, open an investigation into how this instance was compromised and what assets were accessed due to the compromise
   * If the application or legitimate user on the EC2 instance is making the `ListBuckets` API call, consider whether this API call is really needed as this is a common attacker technique to enumerate all S3 buckets in your AWS account.  

[1]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListBuckets.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#ec2-instance-profile

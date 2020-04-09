---
title: AWS S3 Public Access Block Removed
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
source: cloudtrail
scope: s3
meta_image: /images/integrations_logos/amazon_s3.png
aliases:
- 4cd-f56-dfa
---

## Overview

### Goal
Detect when the S3 Public Access Block configuration has been removed 

### Strategy
Monitor CloudTrail and detect when S3 Public Access Block configuration has been removed via the following API call:

* [DeleteAccountPublicAccessBlock][1]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and inform them of best practices of enabling Public Access Block on S3 buckets.
3. Re-enable Public Access Block on the S3 bucket.

More details on S3 Public Block Public Access can be found [here][2].

[1]: https://docs.aws.amazon.com/cli/latest/reference/s3api/delete-public-access-block.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html

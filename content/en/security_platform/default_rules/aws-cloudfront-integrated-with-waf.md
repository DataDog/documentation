---
aliases:
- 7cf-b7e-cc9
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudfront
security: compliance
source: cloudfront
title: CloudFront distribution is integrated with WAF
type: security_rules
---

## Description

Verify that your [AWS CloudFront][1] distributions are integrated with [AWS Web Application Firewall][2] (AWS WAF).

## Rationale

AWS WAF helps protect web applications from common exploits, such as SQL injection or cross-site scripting.

## Remediation

### Console

Follow the [associate or disassociate an AWS WAF web ACL and an existing CloudFront distribution by using the CloudFront console][3] docs to integrate with AWS WAF.

### CLI

1. Run `aws waf get-change-token` to generate a token.
2. Run `aws waf create-ip-set` with your newly generated token.

    {{< code-block lang="bash" filename="create-ip-set.sh" >}}
    create-ip-set
        --name test_ipset
        --change-token abcd0123-1234-a12b-1234-a0b1c2e3d4f5
    {{< /code-block >}}

3. Create an `IPSetDescriptor` JSON object in a new document and define the IP address or ranges you wish to block. Save the file.

    {{< code-block lang="bash" filename="ip-set-descriptor.sh" >}}
    [
      {
        "Action": "INSERT",
        "IPSetDescriptor": {
        "Type": "IPV4" | "IPV6",
        "Value": "192.0.2.0/24"
        }
      }
    ]
    {{< /code-block >}}

4. Run `aws waf update-ip-set` with the `change-token` (generated in step 1), `ip-set-id` (generated in step 2), and the file you just created.

    {{< code-block lang="bash" filename="update-ip-set.sh" >}}
    aws waf update-ip-set
        --ip-set-id bd12ea6c-012a-4b7c-9342-80ab96e4b291
	    --change-token abcd0123-1234-a12b-1234-a0b1c2e3d4f5
	    --updates file://ip-set-descriptor.json
    {{< /code-block >}}

5. Run `aws waf create-rule` with a new rule `name` and your `change-token` (generated in step 1).

    {{< code-block lang="bash" filename="update-ip-set.sh" >}}
    aws waf create-rule
	    --name NameOfRule
	    --change-token abcd0123-1234-a12b-1234-a0b1c2e3d4f5
    {{< /code-block >}}

6. Run `aws waf create-web-acl` with a `name` and your `change-token` (generated in step 1), and set the default action to block.

    {{< code-block lang="bash" filename="update-ip-set.sh" >}}
    aws waf create-rule
	    --name NameOfACL
        --default-action Type=BLOCK
	    --change-token abcd0123-1234-a12b-1234-a0b1c2e3d4f5
    {{< /code-block >}}

7. Create a new JSON file and define `ActivatedRule` as an object that references the ACL rule created in step 6. Assign it a default action, `INSERT`.

    {{< code-block lang="json" filename="actived-rule.json" >}}
    [
      {
        "Action": "INSERT",
        "ActivatedRule": {
          "RuleId": "your-rule-id",
          "Action": {
            "Type": "BLOCK"
          }
        }
      }
    ]
    {{< /code-block >}}

8. Run `update-web-acl` with the `web-acl-id` (generated in step 5), `change-token` (generated in step 1), and the file you just created in step 7.

    {{< code-block lang="bash" filename="update-web-acl.sh" >}}
    aws waf update-web-acl
        --web-acl-id webaclid
        --change-token 96836241-b667-4f0a-a655-e4bc49eaa2c4
        --update activated-rule.json
    {{< /code-block >}}

9. Run `get-distribution-config`.
10. In a new JSON file, modify the returned configuration information to attach the WAF ACL. Set the `WebACLId` as the ID you returned in step 5. Save the file.

    {{< code-block lang="json" filename="activated-rule.json" >}}
    {
      "ETag": "etag",
      "DistributionConfig": {
        ...
        "WebACLId": "webaclid",
        ...
      }
    }
    {{< /code-block >}}

11. Run `update-distribution` with the `id` and `etag` previously returned in step 9.

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id webaclid
        --distribution-config activated-ruled.json
        --if-match etag
    {{< /code-block >}}

[1]: https://aws.amazon.com/cloudfront/
[2]: https://aws.amazon.com/waf/
[3]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-awswaf.html

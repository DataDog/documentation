---
aliases:
- 659-w20-jub
- /security_monitoring/default_rules/659-w20-jub
- /security_monitoring/default_rules/cis-aws-1.3.0-1.19
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: All the expired SSL/TLS certificates stored in AWS IAM are removed
type: security_rules
---

## Description

To enable HTTPS connections to your website or application in AWS, you need an SSL/TLS server certificate. You can use ACM or IAM to store and deploy server certificates. Use IAM as a certificate manager only when you must support HTTPS connections in a region that is not supported by ACM. IAM securely encrypts your private keys and stores the encrypted version in IAM SSL certificate storage. IAM supports deploying server certificates in all regions, but you must obtain your certificate from an external provider for use with AWS. You cannot upload an ACM certificate to IAM. Additionally, you cannot manage your certificates from the IAM Console.

## Rationale

Removing expired SSL/TLS certificates eliminates the risk that an invalid certificate will be deployed accidentally to a resource such as AWS Elastic Load Balancer (ELB), which can damage the credibility of the application/website behind the ELB. As a best practice, it is recommended to delete expired certificates.

## Remediation

AWS Console:

Removing expired certificates via AWS Management Console is not currently supported. To delete SSL/TLS certificates stored in IAM via the AWS API use the Command Line Interface (CLI).

AWS CLI:

To delete an expired certificate, run the following command by replacing `<CERTIFICATE_NAME>` with the name of the certificate to delete: `aws iam delete-server-certificate --server-certificate-name <CERTIFICATE_NAME>`.

**Note**: When the preceding command is successful, it does not return any output.

## Impact

Deleting a certificate can have implications for your application. If you are using an expired server certificate with Elastic Load Balancing, Cloudfront, etc., you must update the configuration of the respective service to ensure there is no application interruption.

## References

1. https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs.html
2. https://docs.aws.amazon.com/cli/latest/reference/iam/delete-server-certificate.html

## CIS Controls

Version 7 13 - Data Protection

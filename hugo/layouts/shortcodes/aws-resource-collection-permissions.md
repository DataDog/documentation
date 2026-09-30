## AWS IAM permissions
AWS IAM permissions enable Datadog to collect resource data necessary to monitor your AWS environment.
To correctly set up the AWS Integration, you must attach the relevant IAM policies to the **Datadog AWS Integration IAM Role** in your AWS account.
### AWS integration IAM policies
The set of permissions necessary to use all the integrations for individual AWS services which are not included in [AWS Security Audit Policy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html).
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": {{ $.Site.Data.aws_resource_collection_permissions | jsonify (dict "prefix" "      " "indent" "  ") }},
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

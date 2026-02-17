## AWS IAM permissions
AWS IAM permissions enable Datadog to collect metrics, tags, EventBridge events and other data necessary to monitor your AWS environment.
To correctly set up the AWS Integration, you must attach the relevant IAM policies to the **Datadog AWS Integration IAM Role** in your AWS account.
### AWS integration IAM policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": {{ $.Site.Data.aws_permissions | jsonify (dict "prefix" "      " "indent" "  ") }},
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

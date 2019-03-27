---
title: Install the Agent with AWS SSM
kind: faq
further_reading:
- link: "agent/"
  tag: "Documentation"
  text: "Learn more about the Datadog Agent"
---

Follow the steps below to install the Datadog Agent on an EC2 instance with AWS Systems Manager.   
**Note**: The EC2 step is for a single manual instance. Use the other steps for multiple instances.

### EC2 instance
* Create an [EC2 IAM Role][1] with the `AmazonEC2RoleforSSM` prebuilt policy or update your current [AWS Datadog policy][2].
* Launch an [EC2 instance][3] with this role attached.

### Parameter Store
In the [Parameter Store][4], create a parameter with:

* Name: `dd-api-key-for-ssm`
* Description: (Optional)
* Type: `SecureString`
* KMS key source: `My current account`
* KMS Key ID: Use the default value selected.
* Value: Your [Datadog API key][5]

### Systems Manager
#### Documents
In the Systems Manager, create a new [Document][6]:

* Name: `dd-agent-install`
* Target type: (Optional)
* Document type: `Command document`
* Content: `JSON`

Use the JSON below updated with your `<AWS_REGION>` under `runCommand` (e.g. `us-east-1`):
```json
{
  "schemaVersion": "2.2",
  "description": "Installs Datadog.",
  "parameters": {
    "workingDirectory": {
      "type": "String",
      "default": "/tmp",
      "description": "(Optional) The path to the working directory on your instance.",
      "maxChars": 4096
    }
  },
  "mainSteps": [
    {
      "action": "aws:runShellScript",
      "name": "install_datadog",
      "precondition": {
        "StringEquals": [
          "platformType",
          "Linux"
        ]
      },
      "inputs": {
        "runCommand": [
          "wget -O ddinstall.sh https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh",
          "export DD_API_KEY=$(aws --region <AWS_REGION> ssm get-parameters --names dd-api-key-for-ssm --with-decryption --query Parameters[].Value --output text)",
          "bash ./ddinstall.sh"
        ],
        "workingDirectory": "{{ workingDirectory }}",
        "timeoutSeconds": "3600"
      }
    }
  ]
}
```

#### Run Command
Under [Run Command][7], click the **Run command** button and follow the steps below:

* **Command document**:
    * Click on the search box and select *Owner -> Owned by me*.
    * Click the radio button next to your document.
    * If necessary, choose the **Document version**.
* **Targets**:
    * Select the EC2 instance to target.
* **Output options** (optional):
    * Select the **CloudWatch output** checkbox to log any issues.
* **Other sections** (optional):
    * Modify other sections as needed for your setup.

Click the **Run** button and a confirmation page displays showing the status. Wait for it to finish, then check the [Infrastructure list][8] in Datadog. **Note**: It could take up to 10 minutes for the host to display.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/iam/home?#/roles
[2]: /integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[3]: https://console.aws.amazon.com/ec2/v2/home
[4]: https://console.aws.amazon.com/systems-manager/parameters
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://console.aws.amazon.com/systems-manager/documents
[7]: https://console.aws.amazon.com/systems-manager/run-command/executing-commands
[8]: https://app.datadoghq.com/infrastructure

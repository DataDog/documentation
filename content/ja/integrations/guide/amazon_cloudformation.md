---
aliases:
- /developers/amazon_cloudformation/
dependencies:
- "https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md"
kind: guide
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1] gives you templates to describe, configure, and provision all of the AWS resources in your environment at once. The Datadog-AWS CloudFormation Resources allow you to interact with the supported Datadog resources, send resources to any Datadog datacenter, and privately register an extension in any region with Datadog resources.

To access these resources, use the AWS Management Console (UI) or the AWS Command Line Interface (CLI).

## AWS Management Console

To get started:

1. Sign in to the [AWS Management Console][16] with your account and navigate to CloudFormation.

2. Select "Public extensions" from the left hand pane and filter Publisher by "Third Party".

3. Use the search bar to filter by the "Datadog" prefix.

  Note: All official Datadog resources begin with `Datadog::` and specify that they are `Published by Datadog`.

4. Select the desired resource name to view more information about its schema, and click **Activate**.

5. On the **Extension details** page, specify:
  - Extension name
  - Execution role ARN
  - Automatic updates for minor version releases
  - Configuration

6. For the resource configuration, **it is strongly recommended to use [AWS Secrets Manager][17] or similar service for storing your Datadog API and Application keys instead of clear text**.

  If using AWS Secrets Manager, you can dynamically reference your API and Application keys in the configuration. For more information, see the [AWS documentation][18].

  For example:

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```
   Specify the `ApiURL` if you are using a non-US account (defaults to `https://api.datadoghq.com`). For example, use `https://api.datadoghq.eu` for an EU account.

7. After you have your resource configured, [create your AWS stack][3] that includes any of the activated Datadog resources.

For more information about available commands and workflows, see the official [AWS documentation][4].

## AWS Command Line Interface

To get started:

1. Create an execution role for the CloudFormation resource based on the file `<RESOURCE_DIR>/resource-role.yaml`

1. In your terminal, use the [aws-cli tool][2] to register a Datadog resource:

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>" \
        --execution-role-arn "<ROLE_ARN_FROM_STEP_1>"
    ```

1. View the version of the newly registered resource by running the following in your terminal:

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

1. Set this newly registered version as the `default` by running the following in your terminal:

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

    With the following required placeholders:
    * `<REGION>`: Your AWS region.
    * `<DATADOG_RESOURCE_NAME>`: The name of the resource to register, refer to the [table below](#resources-available) to see the Datadog supported resources.
    * `<LINK_TO_S3>`: S3 link to the resource.
      * S3 link: `s3://datadog-cloudformation-resources/<RESOURCE_FOLDER>/<RESOURCE_FOLDER>-<RESOURCE_VERSION>.zip`
      * See the [Resources Available section](#resources-available), which links to examples of the latest supported S3 links.
    * `VERSION_ID`: The underlying version of the resource as returned by the command in step `2`.

1. Set the newly registered resource configuration by running the following in your terminal:

    ```shell
    aws cloudformation set-type-configuration \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --type RESOURCE \
        --configuration '{"DatadogCredentials": {"ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}", "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"}}'
    ```

1. In your AWS account, [create your AWS stack][3] that includes any of the registered Datadog resources.

For more information about available commands and workflows, see the official [AWS documentation][4].

## Resources available

The following Datadog resources can be registered within your AWS account. Refer to their specific documentation to see how to configure them:

| Resource                | Name                                  | Description                                             | Folder                              | S3 Package Links              |
|---------------------------|---------------------------------------|---------------------------------------------------------|-------------------------------------|-------------------------------|
| Dashboard                 | `Datadog::Dashboards::Dashboard`      | [Create, update, and delete Datadog dashboards][5]      | `datadog-dashboards-dashboard`      | [Schema Handler Versions][6]  |
| Datadog-AWS integration   | `Datadog::Integrations::AWS`          | [Manage your Datadog-Amazon Web Service integration][7] | `datadog-integrations-aws`          | [Schema Handler Versions][8]  |
| Monitor                   | `Datadog::Monitors::Monitor`          | [Create, update, and delete Datadog monitors][9]        | `datadog-monitors-monitor`          | [Schema Handler Versions][10] |
| Downtime (**Deprecated**) | `Datadog::Monitors::Downtime`         | [Enable or disable downtimes for your monitors][11]     | `datadog-monitors-downtime`         | [Schema Handler Versions][12] |
| Downtime Schedule         | `Datadog::Monitors::DowntimeSchedule` | [Schedule Datadog downtimes][21]                        | `datadog-monitors-downtimeschedule` | [Schema Handler Versions][22] |
| User                      | `Datadog::IAM::User`                  | [Create and manage Datadog users][13]                   | `datadog-iam-user`                  | [Schema Handler Versions][14] |
| SLO                       | `Datadog::SLOs::SLO`                  | [Create and manage Datadog SLOs][19]                    | `datadog-slos-slo`                  | [Schema Handler Versions][20] |

## Supported regions

The Datadog-Amazon CloudFormation resources are available on the CloudFormation Public Registry in the following regions:

| Code            | Name                      |
|-----------------|---------------------------|
| us-east-1       | US East (N. Virginia)     |
| us-east-2       | US East (Ohio)            |
| us-west-1       | US West (N. California)   |
| us-west-2       | US West (Oregon)          |
| ap-south-1      | Asia Pacific (Mumbai)     |
| ap-northeast-1  | Asia Pacific (Tokyo)      |
| ap-northeast-2  | Asia Pacific (Seoul)      |
| ap-southeast-1  | Asia Pacific (Singapore)  |
| ap-southeast-2  | Asia Pacific (Sydney)     |
| ca-central-1    | Canada (Central)          |
| eu-central-1    | Europe (Frankfurt)        |
| eu-west-1       | Europe (Ireland)          |
| eu-west-2       | Europe (London)           |
| eu-west-3       | Europe (Paris)            |
| eu-north-1      | Europe (Stockholm)        |
| sa-east-1       | South America (São Paulo) |

**Note**: To privately register a resource in any other region, use the provided packages.

## Troubleshooting

Need help? Contact [Datadog support][15].

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[5]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-dashboards-dashboard-handler
[6]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-dashboards-dashboard-handler/CHANGELOG.md
[7]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[8]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[9]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[10]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[11]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[12]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[13]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[14]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[15]: https://docs.datadoghq.com/help/
[16]: https://aws.amazon.com/console/
[17]: https://aws.amazon.com/secrets-manager/
[18]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-secretsmanager
[19]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-slos-slo-handler
[20]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-slos-slo-handler/CHANGELOG.md
[21]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtimeschedule-handler
[22]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtimeschedule-handler/CHANGELOG.md

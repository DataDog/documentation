---
aliases:
- /developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
kind: documentation
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1] gives you templates to describe, configure, and provision all of the AWS resources in your environment at once. The Datadog-AWS CloudFormation Resources allow you to interact with the supported Datadog resources.

You can use either the AWS Management Console (UI) or the AWS CLI to use these resources.

## AWS Management Console

To get started:

1. Sign in to the [AWS Management Console][2] with your account and navigate to CloudFormation.

2. Select "Public extensions" from the left hand pane and filter Publisher by "Third Party".

3. Use the search bar to filter by the "Datadog" prefix.

  Note: All official Datadog resources begin with `Datadog::` and specify that they are `Published by Datadog`.

4. Select the desired resource name to view more information about its schema, and click **Activate**.

5. On the Extension details page, specify:
  - Extension name
  - Execution role ARN
  - Automatic updates for minor version releases
  - Configuration

6. For the resource configuration, **it is strongly recommended to use [AWS Secrets Manager][3] or similar service for storing your Datadog API and Application keys instead of clear text**.

  If using AWS Secrets Manager, you can dynamically reference your API and Application keys in the configuration. See the [AWS docs][4] for more information.

  Example:

  ```json
  {
    "DatadogCredentials": {
        "ApiKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAPIKey}}",
        "ApplicationKey": "{{resolve:secretsmanager:MySecret:SecretString:SecretAppKey}}"
    }
  }
  ```

4. After you have your resource configured, [create your AWS stack][5] that includes any of the activated Datadog resources.

For more information about the available commands and workflows, see the official [AWS documentation][6].

## AWS Command Line Interface

To get started:

1. In your terminal, use the [aws-cli tool][7] to register a Datadog resource:

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>"
    ```

2. View the version of the newly registered resource by running the following in your terminal:

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

3. Set this newly registered version as the `default` by running the following in your terminal:

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

4. In your AWS account, [create your AWS stack][5] that includes any of the registered Datadog resources.

For more information about the available commands and workflows, see the the official [AWS documentation][6].

## Resources available

The following Datadog resources can be registered within your AWS account, refer to their specific documentation to see how to configure them:

| Resource                | Name                              | Description                                             | Folder                          | S3 Package Links              |
|-------------------------|-----------------------------------|---------------------------------------------------------|---------------------------------|-------------------------------|
| Dashboards              | `Datadog::Dashboards::Dashboard`  | [Create, update, and delete Datadog dashboards][8]      | `datadog-dashboards-dashboard`  | [Schema Handler Versions][9]  |
| Datadog-AWS integration | `Datadog::Integrations::AWS`      | [Manage your Datadog-Amazon Web Service integration][10] | `datadog-integrations-aws`      | [Schema Handler Versions][11]  |
| Monitors                | `Datadog::Monitors::Monitor`      | [Create, update, and delete Datadog monitors][12].       | `datadog-monitors-monitor`      | [Schema Handler Versions][13] |
| Downtimes               | `Datadog::Monitors::Downtime`     | [Enable or disable downtimes for your monitors][14].    | `datadog-monitors-downtime`     | [Schema Handler Versions][15] |
| User                    | `Datadog::IAM::User`              | [ Create and manage Datadog users][16].                 | `datadog-iam-user`              | [Schema Handler Versions][17] |
| SLOs                    | `Datadog::SLOs::SLO`              | [ Create and manage Datadog SLOs ][18].                 | `datadog-slos-slo`              | [Schema Handler Versions][19] |

## Troubleshooting

Need help? Contact [Datadog support][20].

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/console/
[3]: https://aws.amazon.com/secrets-manager/
[4]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html#dynamic-references-secretsmanager
[5]: https://console.aws.amazon.com/cloudformation/home
[6]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[7]: https://aws.amazon.com/cli/
[8]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-dashboards-dashboard-handler
[9]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-dashboards-dashboard-handler/CHANGELOG.md
[10]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[11]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-integrations-aws-handler/CHANGELOG.md
[12]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[13]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-monitor-handler/CHANGELOG.md
[14]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[15]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-monitors-downtime-handler/CHANGELOG.md
[16]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-iam-user-handler
[17]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-iam-user-handler/CHANGELOG.md
[18]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-slos-slo-handler
[19]: https://github.com/DataDog/datadog-cloudformation-resources/blob/master/datadog-slos-slo-handler/CHANGELOG.md
[20]: https://docs.datadoghq.com/help/

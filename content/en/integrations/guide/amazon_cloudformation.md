---
aliases:
- /developers/amazon_cloudformation/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-resources/blob/master/README.md
kind: documentation
title: Datadog-Amazon CloudFormation
---
[AWS CloudFormation][1] gives you templates to describe, configure, and provision all of the AWS resources in your environment at once. The Datadog-AWS CloudFormation Resources allow you to interact with the supported Datadog resources. To get started:

1. In your terminal, use the [aws-cli tool][2] to register a Datadog resource.

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

4. In your AWS account, [create your AWS stack][3] that includes any of the registered Datadog resources.

For more information about the available commands and workflows, see the the official [AWS documentation][4].

## Resources available

The following Datadog resources can be registered within your AWS account, refer to their specific documentation to see how to configure them:

| Resource                | Name                              | Description                                             | Folder                      | S3 Package Links              |
|-------------------------|-----------------------------------|---------------------------------------------------------|---------------------------------|-------------------------------|
| Dashboards              | `Datadog::Dashboards::Dashboard`  | [Create, update, and delete Datadog dashboards][5]      | `datadog-dashboards-dashboard`  | [Schema Handler Versions][6]  |
| Datadog-AWS integration | `Datadog::Integrations::AWS`      | [Manage your Datadog-Amazon Web Service integration][7] | `datadog-integrations-aws`      | [Schema Handler Versions][8]  |
| Monitors                | `Datadog::Monitors::Monitor`      | [Create, update, and delete Datadog monitors][9].       | `datadog-monitors-monitor`      | [Schema Handler Versions][10] |
| Downtimes               | `Datadog::Monitors::Downtime`     | [Enable or disable downtimes for your monitors][11].    | `datadog-monitors-downtime`     | [Schema Handler Versions][12] |
| User                    | `Datadog::IAM::User`              | [ Create and manage Datadog users][13].                 | `datadog-iam-user`              | [Schema Handler Versions][14] |

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

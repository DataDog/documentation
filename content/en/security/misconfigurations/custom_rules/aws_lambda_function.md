---
dependencies: []
disable_edit: true
---
# aws_lambda_function

## `account_id`
**Type**: `STRING`<br>
## `architectures`
**Type**: `UNORDERED_LIST_STRING`<br>
**Provider name**: `Architectures`<br>
**Description**: The instruction set architecture that the function supports. Architecture is a string array with one of the valid values. The default architecture value is <code>x86_64</code>.<br>
## `code_sha256`
**Type**: `STRING`<br>
**Provider name**: `CodeSha256`<br>
**Description**: The SHA256 hash of the function's deployment package.<br>
## `code_size`
**Type**: `INT64`<br>
**Provider name**: `CodeSize`<br>
**Description**: The size of the function's deployment package, in bytes.<br>
## `dead_letter_config`
**Type**: `STRUCT`<br>
**Provider name**: `DeadLetterConfig`<br>
**Description**: The function's dead letter queue.<br>
   - `target_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TargetArn`<br>
    **Description**: The Amazon Resource Name (ARN) of an Amazon SQS queue or Amazon SNS topic.<br>
## `description`
**Type**: `STRING`<br>
**Provider name**: `Description`<br>
**Description**: The function's description.<br>
## `environment`
**Type**: `STRUCT`<br>
**Provider name**: `Environment`<br>
**Description**: The function's <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html">environment variables</a>.<br>
   - `error`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Error`<br>
    **Description**: Error messages for environment variables that couldn't be applied.<br>
       - `error_code`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ErrorCode`<br>
        **Description**: The error code.<br>
       - `message`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Message`<br>
        **Description**: The error message.<br>
   - `variables`<br>
    **Type**: `MAP_STRING_STRING`<br>
    **Provider name**: `Variables`<br>
    **Description**: Environment variable key-value pairs.<br>
## `ephemeral_storage`
**Type**: `STRUCT`<br>
**Provider name**: `EphemeralStorage`<br>
**Description**: The size of the function’s /tmp directory in MB. The default value is 512, but can be any whole number between 512 and 10240 MB.<br>
   - `size`<br>
    **Type**: `INT32`<br>
    **Provider name**: `Size`<br>
    **Description**: The size of the function’s /tmp directory.<br>
## `file_system_configs`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `FileSystemConfigs`<br>
**Description**: Connection settings for an <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html">Amazon EFS file system</a>.<br>
   - `arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **Description**: The Amazon Resource Name (ARN) of the Amazon EFS access point that provides access to the file system.<br>
   - `local_mount_path`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LocalMountPath`<br>
    **Description**: The path where the function can access the file system, starting with <code>/mnt/</code>.<br>
## `function_arn`
**Type**: `STRING`<br>
**Provider name**: `FunctionArn`<br>
**Description**: The function's Amazon Resource Name (ARN).<br>
## `function_name`
**Type**: `STRING`<br>
**Provider name**: `FunctionName`<br>
**Description**: The name of the function.<br>
## `handler`
**Type**: `STRING`<br>
**Provider name**: `Handler`<br>
**Description**: The function that Lambda calls to begin executing your function.<br>
## `image_config_response`
**Type**: `STRUCT`<br>
**Provider name**: `ImageConfigResponse`<br>
**Description**: The function's image configuration values.<br>
   - `error`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `Error`<br>
    **Description**: Error response to GetFunctionConfiguration.<br>
       - `error_code`<br>
        **Type**: `STRING`<br>
        **Provider name**: `ErrorCode`<br>
        **Description**: Error code.<br>
       - `message`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Message`<br>
        **Description**: Error message.<br>
   - `image_config`<br>
    **Type**: `STRUCT`<br>
    **Provider name**: `ImageConfig`<br>
    **Description**: Configuration values that override the container image Dockerfile.<br>
       - `command`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `Command`<br>
        **Description**: Specifies parameters that you want to pass in with ENTRYPOINT.<br>
       - `entry_point`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `EntryPoint`<br>
        **Description**: Specifies the entry point to their application, which is typically the location of the runtime executable.<br>
       - `working_directory`<br>
        **Type**: `STRING`<br>
        **Provider name**: `WorkingDirectory`<br>
        **Description**: Specifies the working directory.<br>
## `kms_key_arn`
**Type**: `STRING`<br>
**Provider name**: `KMSKeyArn`<br>
**Description**: The KMS key that's used to encrypt the function's environment variables. This key is only returned if you've configured a customer managed key.<br>
## `last_modified`
**Type**: `STRING`<br>
**Provider name**: `LastModified`<br>
**Description**: The date and time that the function was last updated, in <a href="https://www.w3.org/TR/NOTE-datetime">ISO-8601 format</a> (YYYY-MM-DDThh:mm:ss.sTZD).<br>
## `last_update_status`
**Type**: `STRING`<br>
**Provider name**: `LastUpdateStatus`<br>
**Description**: The status of the last update that was performed on the function. This is first set to <code>Successful</code> after function creation completes.<br>
## `last_update_status_reason`
**Type**: `STRING`<br>
**Provider name**: `LastUpdateStatusReason`<br>
**Description**: The reason for the last update that was performed on the function.<br>
## `last_update_status_reason_code`
**Type**: `STRING`<br>
**Provider name**: `LastUpdateStatusReasonCode`<br>
**Description**: The reason code for the last update that was performed on the function.<br>
## `layers`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `Layers`<br>
**Description**: The function's <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html"> layers</a>.<br>
   - `arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **Description**: The Amazon Resource Name (ARN) of the function layer.<br>
   - `code_size`<br>
    **Type**: `INT64`<br>
    **Provider name**: `CodeSize`<br>
    **Description**: The size of the layer archive in bytes.<br>
   - `signing_job_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SigningJobArn`<br>
    **Description**: The Amazon Resource Name (ARN) of a signing job.<br>
   - `signing_profile_version_arn`<br>
    **Type**: `STRING`<br>
    **Provider name**: `SigningProfileVersionArn`<br>
    **Description**: The Amazon Resource Name (ARN) for a signing profile version.<br>
## `master_arn`
**Type**: `STRING`<br>
**Provider name**: `MasterArn`<br>
**Description**: For Lambda@Edge functions, the ARN of the main function.<br>
## `memory_size`
**Type**: `INT32`<br>
**Provider name**: `MemorySize`<br>
**Description**: The amount of memory available to the function at runtime.<br>
## `package_type`
**Type**: `STRING`<br>
**Provider name**: `PackageType`<br>
**Description**: The type of deployment package. Set to <code>Image</code> for container image and set <code>Zip</code> for .zip file archive.<br>
## `revision_id`
**Type**: `STRING`<br>
**Provider name**: `RevisionId`<br>
**Description**: The latest updated revision of the function or alias.<br>
## `role`
**Type**: `STRING`<br>
**Provider name**: `Role`<br>
**Description**: The function's execution role.<br>
## `runtime`
**Type**: `STRING`<br>
**Provider name**: `Runtime`<br>
**Description**: The runtime environment for the Lambda function.<br>
## `signing_job_arn`
**Type**: `STRING`<br>
**Provider name**: `SigningJobArn`<br>
**Description**: The ARN of the signing job.<br>
## `signing_profile_version_arn`
**Type**: `STRING`<br>
**Provider name**: `SigningProfileVersionArn`<br>
**Description**: The ARN of the signing profile version.<br>
## `state`
**Type**: `STRING`<br>
**Provider name**: `State`<br>
**Description**: The current state of the function. When the state is <code>Inactive</code>, you can reactivate the function by invoking it.<br>
## `state_reason`
**Type**: `STRING`<br>
**Provider name**: `StateReason`<br>
**Description**: The reason for the function's current state.<br>
## `state_reason_code`
**Type**: `STRING`<br>
**Provider name**: `StateReasonCode`<br>
**Description**: The reason code for the function's current state. When the code is <code>Creating</code>, you can't invoke or modify the function.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `timeout`
**Type**: `INT32`<br>
**Provider name**: `Timeout`<br>
**Description**: The amount of time in seconds that Lambda allows a function to run before stopping it.<br>
## `tracing_config`
**Type**: `STRUCT`<br>
**Provider name**: `TracingConfig`<br>
**Description**: The function's X-Ray tracing configuration.<br>
   - `mode`<br>
    **Type**: `STRING`<br>
    **Provider name**: `Mode`<br>
    **Description**: The tracing mode.<br>
## `version`
**Type**: `STRING`<br>
**Provider name**: `Version`<br>
**Description**: The version of the Lambda function.<br>
## `vpc_config`
**Type**: `STRUCT`<br>
**Provider name**: `VpcConfig`<br>
**Description**: The function's networking configuration.<br>
   - `security_group_ids`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `SecurityGroupIds`<br>
    **Description**: A list of VPC security groups IDs.<br>
   - `subnet_ids`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `SubnetIds`<br>
    **Description**: A list of VPC subnet IDs.<br>
   - `vpc_id`<br>
    **Type**: `STRING`<br>
    **Provider name**: `VpcId`<br>
    **Description**: The ID of the VPC.<br>

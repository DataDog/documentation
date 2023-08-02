---
dependencies: []
disable_edit: true
---
# aws_cloudtrail_trail

## `account_id`
**Type**: `STRING`<br>
## `cloud_watch_logs_log_group_arn`
**Type**: `STRING`<br>
**Provider name**: `CloudWatchLogsLogGroupArn`<br>
**Description**: Specifies an Amazon Resource Name (ARN), a unique identifier that represents the log group to which CloudTrail logs will be delivered.<br>
## `cloud_watch_logs_role_arn`
**Type**: `STRING`<br>
**Provider name**: `CloudWatchLogsRoleArn`<br>
**Description**: Specifies the role for the CloudWatch Logs endpoint to assume to write to a user's log group.<br>
## `event_selectors`
**Type**: `UNORDERED_LIST_STRUCT`<br>
**Provider name**: `EventSelector`<br>
   - `data_resources`<br>
    **Type**: `UNORDERED_LIST_STRUCT`<br>
    **Provider name**: `DataResources`<br>
    **Description**: CloudTrail supports data event logging for Amazon S3 objects, Lambda functions, and Amazon DynamoDB tables with basic event selectors. You can specify up to 250 resources for an individual event selector, but the total number of data resources cannot exceed 250 across all event selectors in a trail. This limit does not apply if you configure resource logging for all data events. For more information, see <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html">Data Events</a> and <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/WhatIsCloudTrail-Limits.html">Limits in CloudTrail</a> in the <i>CloudTrail User Guide</i>.<br>
       - `type`<br>
        **Type**: `STRING`<br>
        **Provider name**: `Type`<br>
        **Description**: The resource type in which you want to log data events. You can specify the following <i>basic</i> event selector resource types: <ul> <li>  <code>AWS::S3::Object</code>  </li> <li>  <code>AWS::Lambda::Function</code>  </li> <li>  <code>AWS::DynamoDB::Table</code>  </li> </ul> The following resource types are also availble through <i>advanced</i> event selectors. Basic event selector resource types are valid in advanced event selectors, but advanced event selector resource types are not valid in basic event selectors. For more information, see AdvancedFieldSelector$Field. <ul> <li>  <code>AWS::S3Outposts::Object</code>  </li> <li>  <code>AWS::ManagedBlockchain::Node</code>  </li> <li>  <code>AWS::S3ObjectLambda::AccessPoint</code>  </li> <li>  <code>AWS::EC2::Snapshot</code>  </li> <li>  <code>AWS::S3::AccessPoint</code>  </li> <li>  <code>AWS::DynamoDB::Stream</code>  </li> <li>  <code>AWS::Glue::Table</code>  </li> </ul>
       - `values`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
        **Provider name**: `Values`<br>
        **Description**: An array of Amazon Resource Name (ARN) strings or partial ARN strings for the specified objects. <ul> <li> To log data events for all objects in all S3 buckets in your Amazon Web Services account, specify the prefix as <code>arn:aws:s3</code>. <note> This also enables logging of data event activity performed by any user or role in your Amazon Web Services account, even if that activity is performed on a bucket that belongs to another Amazon Web Services account. </note> </li> <li> To log data events for all objects in an S3 bucket, specify the bucket and an empty object prefix such as <code>arn:aws:s3:::bucket-1/</code>. The trail logs data events for all objects in this S3 bucket. </li> <li> To log data events for specific objects, specify the S3 bucket and object prefix such as <code>arn:aws:s3:::bucket-1/example-images</code>. The trail logs data events for objects in this S3 bucket that match the prefix. </li> <li> To log data events for all Lambda functions in your Amazon Web Services account, specify the prefix as <code>arn:aws:lambda</code>. <note> This also enables logging of <code>Invoke</code> activity performed by any user or role in your Amazon Web Services account, even if that activity is performed on a function that belongs to another Amazon Web Services account.  </note> </li> <li> To log data events for a specific Lambda function, specify the function ARN. <note> Lambda function ARNs are exact. For example, if you specify a function ARN <i>arn:aws:lambda:us-west-2:111111111111:function:helloworld</i>, data events will only be logged for <i>arn:aws:lambda:us-west-2:111111111111:function:helloworld</i>. They will not be logged for <i>arn:aws:lambda:us-west-2:111111111111:function:helloworld2</i>. </note> </li> <li> To log data events for all DynamoDB tables in your Amazon Web Services account, specify the prefix as <code>arn:aws:dynamodb</code>. </li> </ul>
   - `exclude_management_event_sources`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Provider name**: `ExcludeManagementEventSources`<br>
    **Description**: An optional list of service event sources from which you do not want management events to be logged on your trail. In this release, the list can be empty (disables the filter), or it can filter out Key Management Service or Amazon RDS Data API events by containing <code>kms.amazonaws.com</code> or <code>rdsdata.amazonaws.com</code>. By default, <code>ExcludeManagementEventSources</code> is empty, and KMS and Amazon RDS Data API events are logged to your trail. You can exclude management event sources only in regions that support the event source.<br>
   - `include_management_events`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IncludeManagementEvents`<br>
    **Description**: Specify if you want your event selector to include management events for your trail.  For more information, see <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-events-with-cloudtrail.html">Management Events</a> in the <i>CloudTrail User Guide</i>. By default, the value is <code>true</code>. The first copy of management events is free. You are charged for additional copies of management events that you are logging on any subsequent trail in the same region. For more information about CloudTrail pricing, see <a href="http://aws.amazon.com/cloudtrail/pricing/">CloudTrail Pricing</a>.<br>
   - `read_write_type`<br>
    **Type**: `STRING`<br>
    **Provider name**: `ReadWriteType`<br>
    **Description**: Specify if you want your trail to log read-only events, write-only events, or all. For example, the EC2 <code>GetConsoleOutput</code> is a read-only API operation and <code>RunInstances</code> is a write-only API operation.  By default, the value is <code>All</code>.<br>
## `has_custom_event_selectors`
**Type**: `BOOLEAN`<br>
**Provider name**: `HasCustomEventSelectors`<br>
**Description**: Specifies if the trail has custom event selectors.<br>
## `has_insight_selectors`
**Type**: `BOOLEAN`<br>
**Provider name**: `HasInsightSelectors`<br>
**Description**: Specifies whether a trail has insight types specified in an <code>InsightSelector</code> list.<br>
## `home_region`
**Type**: `STRING`<br>
**Provider name**: `HomeRegion`<br>
**Description**: The region in which the trail was created.<br>
## `include_global_service_events`
**Type**: `BOOLEAN`<br>
**Provider name**: `IncludeGlobalServiceEvents`<br>
**Description**: Set to <b>True</b> to include Amazon Web Services API calls from Amazon Web Services global services such as IAM. Otherwise, <b>False</b>.<br>
## `is_multi_region_trail`
**Type**: `BOOLEAN`<br>
**Provider name**: `IsMultiRegionTrail`<br>
**Description**: Specifies whether the trail exists only in one region or exists in all regions.<br>
## `is_organization_trail`
**Type**: `BOOLEAN`<br>
**Provider name**: `IsOrganizationTrail`<br>
**Description**: Specifies whether the trail is an organization trail.<br>
## `kms_key_id`
**Type**: `STRING`<br>
**Provider name**: `KmsKeyId`<br>
**Description**: Specifies the KMS key ID that encrypts the logs delivered by CloudTrail. The value is a fully specified ARN to a KMS key in the following format.  <code>arn:aws:kms:us-east-2:123456789012:key/12345678-1234-1234-1234-123456789012</code><br>
## `log_file_validation_enabled`
**Type**: `BOOLEAN`<br>
**Provider name**: `LogFileValidationEnabled`<br>
**Description**: Specifies whether log file validation is enabled.<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `Name`<br>
**Description**: Name of the trail set by calling CreateTrail. The maximum length is 128 characters.<br>
## `s3_bucket_name`
**Type**: `STRING`<br>
**Provider name**: `S3BucketName`<br>
**Description**: Name of the Amazon S3 bucket into which CloudTrail delivers your trail files. See <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create_trail_naming_policy.html">Amazon S3 Bucket Naming Requirements</a>.<br>
## `s3_key_prefix`
**Type**: `STRING`<br>
**Provider name**: `S3KeyPrefix`<br>
**Description**: Specifies the Amazon S3 key prefix that comes after the name of the bucket you have designated for log file delivery. For more information, see <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-find-log-files.html">Finding Your CloudTrail Log Files</a>. The maximum length is 200 characters.<br>
## `sns_topic_arn`
**Type**: `STRING`<br>
**Provider name**: `SnsTopicARN`<br>
**Description**: Specifies the ARN of the Amazon SNS topic that CloudTrail uses to send notifications when log files are delivered. The following is the format of a topic ARN.  <code>arn:aws:sns:us-east-2:123456789012:MyTopic</code><br>
## `sns_topic_name`
**Type**: `STRING`<br>
**Provider name**: `SnsTopicName`<br>
**Description**: This field is no longer in use. Use SnsTopicARN.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `trail_arn`
**Type**: `STRING`<br>
**Provider name**: `TrailARN`<br>
**Description**: Specifies the ARN of the trail. The following is the format of a trail ARN.  <code>arn:aws:cloudtrail:us-east-2:123456789012:trail/MyTrail</code><br>
## `trail_status`
**Type**: `STRUCT`<br>
**Provider name**: `GetTrailStatusResponse`<br>
   - `is_logging`<br>
    **Type**: `BOOLEAN`<br>
    **Provider name**: `IsLogging`<br>
    **Description**: Whether the CloudTrail trail is currently logging Amazon Web Services API calls.<br>
   - `latest_cloud_watch_logs_delivery_error`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestCloudWatchLogsDeliveryError`<br>
    **Description**: Displays any CloudWatch Logs error that CloudTrail encountered when attempting to deliver logs to CloudWatch Logs.<br>
   - `latest_cloud_watch_logs_delivery_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LatestCloudWatchLogsDeliveryTime`<br>
    **Description**: Displays the most recent date and time when CloudTrail delivered logs to CloudWatch Logs.<br>
   - `latest_delivery_attempt_succeeded`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestDeliveryAttemptSucceeded`<br>
    **Description**: This field is no longer in use.<br>
   - `latest_delivery_attempt_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestDeliveryAttemptTime`<br>
    **Description**: This field is no longer in use.<br>
   - `latest_delivery_error`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestDeliveryError`<br>
    **Description**: Displays any Amazon S3 error that CloudTrail encountered when attempting to deliver log files to the designated bucket. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html">Error Responses</a> in the Amazon S3 API Reference.  <note> This error occurs only when there is a problem with the destination S3 bucket, and does not occur for requests that time out. To resolve the issue, create a new bucket, and then call <code>UpdateTrail</code> to specify the new bucket; or fix the existing objects so that CloudTrail can again write to the bucket. </note><br>
   - `latest_delivery_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LatestDeliveryTime`<br>
    **Description**: Specifies the date and time that CloudTrail last delivered log files to an account's Amazon S3 bucket.<br>
   - `latest_digest_delivery_error`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestDigestDeliveryError`<br>
    **Description**: Displays any Amazon S3 error that CloudTrail encountered when attempting to deliver a digest file to the designated bucket. For more information, see <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html">Error Responses</a> in the Amazon S3 API Reference.  <note> This error occurs only when there is a problem with the destination S3 bucket, and does not occur for requests that time out. To resolve the issue, create a new bucket, and then call <code>UpdateTrail</code> to specify the new bucket; or fix the existing objects so that CloudTrail can again write to the bucket. </note><br>
   - `latest_digest_delivery_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LatestDigestDeliveryTime`<br>
    **Description**: Specifies the date and time that CloudTrail last delivered a digest file to an account's Amazon S3 bucket.<br>
   - `latest_notification_attempt_succeeded`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestNotificationAttemptSucceeded`<br>
    **Description**: This field is no longer in use.<br>
   - `latest_notification_attempt_time`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestNotificationAttemptTime`<br>
    **Description**: This field is no longer in use.<br>
   - `latest_notification_error`<br>
    **Type**: `STRING`<br>
    **Provider name**: `LatestNotificationError`<br>
    **Description**: Displays any Amazon SNS error that CloudTrail encountered when attempting to send a notification. For more information about Amazon SNS errors, see the <a href="https://docs.aws.amazon.com/sns/latest/dg/welcome.html">Amazon SNS Developer Guide</a>.<br>
   - `latest_notification_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `LatestNotificationTime`<br>
    **Description**: Specifies the date and time of the most recent Amazon SNS notification that CloudTrail has written a new log file to an account's Amazon S3 bucket.<br>
   - `start_logging_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `StartLoggingTime`<br>
    **Description**: Specifies the most recent date and time when CloudTrail started recording API calls for an Amazon Web Services account.<br>
   - `stop_logging_time`<br>
    **Type**: `TIMESTAMP`<br>
    **Provider name**: `StopLoggingTime`<br>
    **Description**: Specifies the most recent date and time when CloudTrail stopped recording API calls for an Amazon Web Services account.<br>
   - `time_logging_started`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TimeLoggingStarted`<br>
    **Description**: This field is no longer in use.<br>
   - `time_logging_stopped`<br>
    **Type**: `STRING`<br>
    **Provider name**: `TimeLoggingStopped`<br>
    **Description**: This field is no longer in use.<br>

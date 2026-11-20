---
dependencies: []
disable_edit: true
---
# aws_cloudtrail_trail

## `account_id`
**タイプ**: `STRING`<br>
## `cloud_watch_logs_log_group_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CloudWatchLogsLogGroupArn`<br>
**説明**: CloudTrail のログを配信するロググループを表す一意の識別子である Amazon Resource Name (ARN) を指定します。<br>
## `cloud_watch_logs_role_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CloudWatchLogsRoleArn`<br>
**説明**: CloudWatch Logs エンドポイントがユーザーのロググループに書き込むために想定するロールを指定します。<br>
## `event_selectors`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `EventSelector`<br>
   - `data_resources`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `DataResources`<br>
    **説明**: CloudTrail は、基本的なイベントセレクタを持つ Amazon S3 オブジェクト、Lambda 関数、Amazon DynamoDB テーブルのデータイベントロギングをサポートしています。個々のイベントセレクタに最大 250 のリソースを指定できますが、トレイル内のすべてのイベントセレクタでデータリソースの合計数が 250 を超えることはできません。この制限は、すべてのデータイベントのリソースロギングを構成した場合は適用されません。詳細については、<i>CloudTrail ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html">データイベント</a>と<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/WhatIsCloudTrail-Limits.html"> CloudTrail の制限</a>を参照してください。<br>
       - `type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `Type`<br>
        **説明**: データイベントを記録するリソースタイプ。以下の<i>基本</i>イベントセレクタリソースタイプを指定することができます。 <ul> <li>  <code>AWS::S3::Object</code>  </li> <li>  <code>AWS::Lambda::Function</code>  </li> <li>  <code>AWS::DynamoDB::Table</code>  </li> </ul> 以下のリソースタイプは、<i>高度</i>イベントセレクタでも利用可能です。基本イベントセレクタのリソースタイプは、高度イベントセレクタで有効ですが、上級イベントセレクタのリソースタイプは、基本イベントセレクタでは有効ではありません。詳しくは、AdvancedFieldSelector$Field を参照してください。 <ul> <li>  <code>AWS::S3Outposts::Object</code>  </li> <li>  <code>AWS::ManagedBlockchain::Node</code>  </li> <li>  <code>AWS::S3ObjectLambda::AccessPoint</code>  </li> <li>  <code>AWS::EC2::Snapshot</code>  </li> <li>  <code>AWS::S3::AccessPoint</code>  </li> <li>  <code>AWS::DynamoDB::Stream</code>  </li> <li>  <code>AWS::Glue::Table</code>  </li> </ul>
       - `values`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `Values`<br>
        **説明**: 指定したオブジェクトの Amazon Resource Name (ARN) 文字列あるいは部分 ARN 文字列の配列。 <ul> <li> Amazon Web Services アカウントのすべての S3 バケット内のすべてのオブジェクトのデータイベントをログに記録するには、プレフィックスを <code>arn:aws:s3</code> と指定します。 <note> また、Amazon Web Services アカウントの任意のユーザーまたはロールによって実行されたデータイベントアクティビティを、そのアクティビティが別の Amazon Web Services アカウントに属するバケットで実行されたとしても、ログに記録することができます。 </note> </li> <li> S3 バケット内のすべてのオブジェクトのデータイベントをログに記録するには、バケットと空のオブジェクトプレフィックス (<code>arn:aws:s3:::bucket-1/</code> など) を指定します。 トレイルは、この S3 バケットのすべてのオブジェクトのデータイベントをログに記録します。 </li> <li> 特定のオブジェクトのデータイベントを記録するには、<code>arn:aws:s3:::bucket-1/example-images</code> のように S3 バケットとオブジェクトのプレフィックスを指定します。トレイルは、プレフィックスに一致するこの S3 バケット内のオブジェクトのデータイベントをログに記録します。 </li> <li> Amazon Web Services アカウント内のすべての Lambda 関数のデータイベントを記録するには、プレフィックスを <code>arn:aws:lambda</code> と指定します。 <note> また、Amazon Web Services アカウント内の任意のユーザーまたはロールによって実行された <code>Invoke</code> アクティビティを、そのアクティビティが別の Amazon Web Services アカウントに属する関数で実行されたとしても、ログに記録することが可能です。  </note> </li> <li> 特定の Lambda 関数のデータイベントを記録するには、関数の ARN を指定します。 <note> Lambda 関数の ARN は正確です。例えば、関数 ARN <i>arn:aws:lambda:us-west-2:1111111111:function:helloworld</i> を指定すると、データイベントは <i>arn:aws:lambda:us-west-2:1111111111:function:helloworld</i> に対してのみロギングされます。<i>arn:aws:Lambda:us-west-2:11111111:function:helloworld2</i> には記録されません。 </note> </li> <li> Amazon Web Services アカウント内のすべての DynamoDB テーブルのデータイベントを記録するには、プレフィックスを <code>arn:aws:dynamodb</code> と指定します。 </li> </ul>
   - `exclude_management_event_sources`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `ExcludeManagementEventSources`<br>
    **説明**: 管理イベントをトレイルにログ記録させたくないサービスイベントソースのオプションのリスト。このリリースでは、リストは空 (フィルターを無効にする)、または <code>kms.amazonaws.com</code> または <code>rdsdata.amazonaws.com</code> を含むことによってキーマネジメントサービスまたは Amazon RDS Data API イベントをフィルタリングすることが可能です。デフォルトでは、<code>ExcludeManagementEventSources</code> は空で、KMS と Amazon RDS Data API イベントはトレイルにログされます。イベントソースをサポートするリージョンでのみ、管理イベントソースを除外することができます。<br>
   - `include_management_events`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IncludeManagementEvents`<br>
    **説明**: イベントセレクタに、トレイルの管理イベントを含めるかどうかを指定します。 詳細については、<i>CloudTrail ユーザーガイド</i>の<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-events-with-cloudtrail.html">管理イベント</a>を参照してください。デフォルトでは、この値は <code>true</code> です。管理イベントの最初のコピーは無料です。同じリージョン内の後続のトレイルでログを記録している管理イベントのコピーの追加には課金されます。CloudTrail の価格の詳細については、<a href="http://aws.amazon.com/cloudtrail/pricing/">CloudTrail の価格について</a>を参照してください。<br>
   - `read_write_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ReadWriteType`<br>
    **説明**: トレイルが読み取り専用イベント、書き込み専用イベント、またはすべてのイベントのいずれを記録するかを指定します。例えば、EC2 の <code>GetConsoleOutput</code> は読み取り専用の API 操作で、<code>RunInstances</code> は書き込み専用の API 操作です。 デフォルトでは、<code>All</code> が指定されています。<br>
## `has_custom_event_selectors`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `HasCustomEventSelectors`<br>
**説明**: トレイルにカスタムイベントセレクタがあるかどうかを指定します。<br>
## `has_insight_selectors`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `HasInsightSelectors`<br>
**説明**: トレイルが <code>InsightSelector</code> リストで指定されたインサイトタイプを持つかどうかを指定します。<br>
## `home_region`
**タイプ**: `STRING`<br>
**プロバイダー名**: `HomeRegion`<br>
**説明**: トレイルが作成されたリージョン。<br>
## `include_global_service_events`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IncludeGlobalServiceEvents`<br>
**説明**: IAM などの Amazon Web Services グローバルサービスからの Amazon Web Services API コールを含めるには、<b>True</b> に設定します。それ以外は <b>False</b> です。<br>
## `is_multi_region_trail`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IsMultiRegionTrail`<br>
**説明**: トレイルが 1 つのリージョンのみに存在するか、すべてのリージョンに存在するかを指定します。<br>
## `is_organization_trail`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `IsOrganizationTrail`<br>
**説明**: 組織トレイルであるかどうかを指定します。<br>
## `kms_key_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KmsKeyId`<br>
**説明**: CloudTrail で配信されるログを暗号化する KMS キー ID を指定します。値は以下のフォーマットで KMS キーに完全指定された ARN です。  <code>arn:aws:kms:us-east-2:123456789012:key/12345678-1234-1234-1234-123456789012</code><br>
## `log_file_validation_enabled`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `LogFileValidationEnabled`<br>
**説明**: ログファイル検証を有効にするかどうかを指定します。<br>
## `name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Name`<br>
**説明**: CreateTrail の呼び出しによって設定されたトレイルの名前。最大文字数は 128 文字です。<br>
## `s3_bucket_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `S3BucketName`<br>
**説明**: CloudTrail がトレイルファイルを配信する Amazon S3 バケットの名前。<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create_trail_naming_policy.html">Amazon S3 バケットの命名要件</a>を参照してください。<br>
## `s3_key_prefix`
**タイプ**: `STRING`<br>
**プロバイダー名**: `S3KeyPrefix`<br>
**説明**: ログファイル配信用に指定したバケット名の後に付く、Amazon S3 キーのプレフィックスを指定します。詳細は、<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-find-log-files.html">CloudTrail ログファイルの検索</a>を参照してください。最大長は 200 文字です。<br>
## `sns_topic_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnsTopicARN`<br>
**説明**: CloudTrail がログファイル配信時の通知送信に使用する Amazon SNS のトピックの ARN を指定します。トピック ARN の形式は以下のとおりです。  <code>arn:aws:sns:us-east-2:123456789012:MyTopic</code><br>
## `sns_topic_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SnsTopicName`<br>
**説明**: このフィールドは使用されなくなりました。SnsTopicARN を使用してください。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `trail_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TrailARN`<br>
**説明**: トレイルの ARN を指定します。トレイル ARN の形式は以下のとおりです。  <code>arn:aws:cloudtrail:us-east-2:123456789012:trail/MyTrail</code><br>
## `trail_status`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `GetTrailStatusResponse`<br>
   - `is_logging`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `IsLogging`<br>
    **説明**: CloudTrail トレイルが現在 Amazon Web Services API コールをロギングしているかどうか。<br>
   - `latest_cloud_watch_logs_delivery_error`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestCloudWatchLogsDeliveryError`<br>
    **説明**: CloudWatch Logs にログを配信しようとした際に、CloudTrail が遭遇した CloudWatch Logs のエラーを表示します。<br>
   - `latest_cloud_watch_logs_delivery_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LatestCloudWatchLogsDeliveryTime`<br>
    **説明**: CloudTrail が CloudWatch Logs にログを配信した直近の日時を表示します。<br>
   - `latest_delivery_attempt_succeeded`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestDeliveryAttemptSucceeded`<br>
    **説明**: このフィールドは使用されなくなりました。<br>
   - `latest_delivery_attempt_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestDeliveryAttemptTime`<br>
    **説明**: このフィールドは使用されなくなりました。<br>
   - `latest_delivery_error`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestDeliveryError`<br>
    **説明**: 指定したバケットにログファイルを配信しようとした際に、CloudTrail が遭遇した Amazon S3 エラーを表示します。詳細については、Amazon S3 API リファレンスの<a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html">エラーレスポンス</a>を参照してください。  <note> このエラーは、宛先の S3 バケットに問題がある場合にのみ発生し、タイムアウトしたリクエストでは発生しません。問題を解決するには、新しいバケットを作成し、<code>UpdateTrail</code> を呼び出して新しいバケットを指定するか、CloudTrail が再びバケットに書き込めるように、既存のオブジェクトを修正します。 </note><br>
   - `latest_delivery_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LatestDeliveryTime`<br>
    **説明**: CloudTrail が最後にアカウントの Amazon S3 バケットにログファイルを配信した日時を指定します。<br>
   - `latest_digest_delivery_error`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestDigestDeliveryError`<br>
    **説明**: 指定したバケットにダイジェストファイルを配信しようとした際に、CloudTrail が遭遇した Amazon S3 エラーを表示します。詳細については、Amazon S3 API リファレンスの<a href="https://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html">エラーレスポンス</a>を参照してください。  <note> このエラーは、宛先の S3 バケットに問題がある場合にのみ発生し、タイムアウトしたリクエストでは発生しません。問題を解決するには、新しいバケットを作成し、<code>UpdateTrail</code> を呼び出して新しいバケットを指定するか、CloudTrail が再びバケットに書き込めるように、既存のオブジェクトを修正します。 </note><br>
   - `latest_digest_delivery_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LatestDigestDeliveryTime`<br>
    **説明**: CloudTrail が最後にアカウントの Amazon S3 バケットにダイジェストファイルを配信した日時を指定します。<br>
   - `latest_notification_attempt_succeeded`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestNotificationAttemptSucceeded`<br>
    **説明**: このフィールドは使用されなくなりました。<br>
   - `latest_notification_attempt_time`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestNotificationAttemptTime`<br>
    **説明**: このフィールドは使用されなくなりました。<br>
   - `latest_notification_error`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LatestNotificationError`<br>
    **説明**: 通知を送信しようとしたときに CloudTrail が遭遇した Amazon SNS のエラーを表示します。Amazon SNS エラーの詳細については、<a href="https://docs.aws.amazon.com/sns/latest/dg/welcome.html">Amazon SNS デベロッパーガイド</a>を参照してください。<br>
   - `latest_notification_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LatestNotificationTime`<br>
    **説明**: CloudTrail がアカウントの Amazon S3 バケットに新しいログファイルを書き込んだことを通知する最新の Amazon SNS の日時を指定します。<br>
   - `start_logging_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `StartLoggingTime`<br>
    **説明**: CloudTrail が Amazon Web Services アカウントの API コールの記録を開始した直近の日時を指定します。<br>
   - `stop_logging_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `StopLoggingTime`<br>
    **説明**: CloudTrail が Amazon Web Services アカウントの API コールの記録を停止した直近の日時を指定します。<br>
   - `time_logging_started`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TimeLoggingStarted`<br>
    **説明**: このフィールドは使用されなくなりました。<br>
   - `time_logging_stopped`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TimeLoggingStopped`<br>
    **説明**: このフィールドは使用されなくなりました。<br>
---
dependencies: []
disable_edit: true
---
# aws_lambda_function

## `account_id`
**タイプ**: `STRING`<br>
## `architectures`
**タイプ**: `UNORDERED_LIST_STRING`<br>
**プロバイダー名**: `Architectures`<br>
**説明**: その関数がサポートする命令セットアーキテクチャ。アーキテクチャは文字列配列で、有効な値のいずれかを指定します。デフォルトのアーキテクチャは <code>x86_64</code> です。<br>
## `code_sha256`
**タイプ**: `STRING`<br>
**プロバイダー名**: `CodeSha256`<br>
**説明**: 関数のデプロイメントパッケージの SHA256 ハッシュ値。<br>
## `code_size`
**タイプ**: `INT64`<br>
**プロバイダー名**: `CodeSize`<br>
**説明**: 関数のデプロイメントパッケージのサイズ (バイト単位)。<br>
## `dead_letter_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `DeadLetterConfig`<br>
**説明**: 関数のデッドレターキュー。<br>
   - `target_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TargetArn`<br>
    **説明**: Amazon SQS キューまたは Amazon SNS トピックの Amazon Resource Name (ARN)。<br>
## `description`
**タイプ**: `STRING`<br>
**Provider name**: `Description`<br>
**説明**: 関数の説明。<br>
## `environment`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `Environment`<br>
**説明**: 関数の環境変数。<br>
   - `error`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Error`<br>
    **説明**: 環境変数が適用できなかった場合のエラーメッセージ。<br>
       - `error_code`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ErrorCode`<br>
        **説明**: エラーコード。<br>
       - `message`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Message`<br>
        **説明**: エラーメッセージ。<br>
   - `variables`<br>
    **タイプ**: `MAP_STRING_STRING`<br>
    **プロバイダー名**: `Variables`<br>
    **説明**: 環境変数のキーと値のペア。<br>
## `ephemeral_storage`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `EphemeralStorage`<br>
**説明**: 関数の /tmp ディレクトリのサイズ (MB 単位)。デフォルトは 512 ですが、512 から 10240 MB の間の任意の整数値を指定できます。<br>
   - `size`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `Size`<br>
    **説明**: 関数の /tmp ディレクトリのサイズ。<br>
## `file_system_configs`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `FileSystemConfigs`<br>
**説明**: <a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-filesystem.html">Amazon EFS ファイルシステム</a>の接続設定。<br>
   - `arn`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **説明**: ファイルシステムへのアクセスを提供する Amazon EFS アクセスポイントの Amazon Resource Name (ARN)。<br>
   - `local_mount_path`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `LocalMountPath`<br>
    **説明**: 関数がファイルシステムにアクセスできるパスで、<code>/mnt/</code> から始まります。<br>
## `function_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `FunctionArn`<br>
**説明**: 関数の Amazon Resource Name (ARN)。<br>
## `function_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `FunctionName`<br>
**説明**: 関数の名前。<br>
## `handler`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Handler`<br>
**説明**: Lambda が関数の実行を開始するために呼び出す関数。<br>
## `image_config_response`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ImageConfigResponse`<br>
**説明**: 関数のイメージ構成値。<br>
   - `error`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Error`<br>
    **説明**: GetFunctionConfiguration に対するエラー応答。<br>
       - `error_code`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ErrorCode`<br>
        **説明**: エラーコード。<br>
       - `message`<br>
        **タイプ**: `STRING`<br>
        **Provider name**: `Message`<br>
        **説明**: エラーメッセージ。<br>
   - `image_config`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ImageConfig`<br>
    **説明**: コンテナイメージの Dockerfile をオーバーライドする構成値。<br>
       - `command`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `Command`<br>
        **説明**: ENTRYPOINT で渡したいパラメーターを指定します。<br>
       - `entry_point`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `EntryPoint`<br>
        **説明**: そのアプリケーションのエントリポイントを指定します。これは通常、ランタイムの実行ファイルの場所です。<br>
       - `working_directory`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `WorkingDirectory`<br>
        **説明**: 作業ディレクトリを指定します。<br>
## `kms_key_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `KMSKeyArn`<br>
**説明**: 関数の環境変数を暗号化するために使用する KMS キー。このキーは、カスタマーマネージドキーを構成している場合にのみ返されます。<br>
## `last_modified`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LastModified`<br>
**説明**: 関数が最後に更新された <a href="https://www.w3.org/TR/NOTE-datetime">ISO-8601 形式</a> (YYYY-MM-DDThh:mm:ss.sTZD) の日時。<br>
## `last_update_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LastUpdateStatus`<br>
**説明**: 関数に対して最後に実行された更新のステータス。関数の作成完了後、初めて <code>Successful</code> に設定されます。<br>
## `last_update_status_reason`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LastUpdateStatusReason`<br>
**説明**: 関数に対して最後に行われた更新の理由。<br>
## `last_update_status_reason_code`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LastUpdateStatusReasonCode`<br>
**説明**: 関数に対して最後に行われた更新の理由コード。<br>
## `layers`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Layers`<br>
**説明**: 関数の<a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html">レイヤー</a>。<br>
   - `arn`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `Arn`<br>
    **説明**: 関数レイヤーの Amazon Resource Name (ARN)。<br>
   - `code_size`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `CodeSize`<br>
    **説明**: レイヤーアーカイブのサイズ (バイト単位)。<br>
   - `signing_job_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SigningJobArn`<br>
    **説明**: 署名ジョブの Amazon Resource Name (ARN)。<br>
   - `signing_profile_version_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SigningProfileVersionArn`<br>
    **説明**: 署名プロファイルのバージョンの Amazon Resource Name (ARN)。<br>
## `master_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `MasterArn`<br>
**説明**: Lambda@Edge 関数の場合、main 関数の ARN。<br>
## `memory_size`
**タイプ**: `INT32`<br>
**プロバイダー名**: `MemorySize`<br>
**説明**: 関数がランタイム時に使用可能なメモリ量。<br>
## `package_type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `PackageType`<br>
**説明**: デプロイメントパッケージの種類。コンテナイメージの場合は <code>Image</code>、.zip ファイルアーカイブの場合は <code>Zip</code> と設定します。<br>
## `revision_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `RevisionId`<br>
**説明**: 関数またはエイリアスの最新の更新リビジョン。<br>
## `role`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Role`<br>
**説明**: 関数の実行ロール。<br>
## `runtime`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Runtime`<br>
**説明**: Lambda 関数のランタイム環境。<br>
## `signing_job_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SigningJobArn`<br>
**説明**: 署名ジョブの ARN。<br>
## `signing_profile_version_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `SigningProfileVersionArn`<br>
**説明**: 署名プロファイルのバージョンの ARN。<br>
## `state`
**タイプ**: `STRING`<br>
**Provider name**: `State`<br>
**説明**: 関数の現在の状態。状態が <code>Inactive</code> の場合、関数を呼び出すことで再有効化することができます。<br>
## `state_reason`
**タイプ**: `STRING`<br>
**Provider name**: `StateReason`<br>
**説明**: 関数の現在の状態の理由。<br>
## `state_reason_code`
**タイプ**: `STRING`<br>
**プロバイダー名**: `StateReasonCode`<br>
**説明**: 関数の現在の状態を表す理由コード。このコードが <code>Creating</code> の場合、関数を呼び出したり、変更したりすることはできません。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `timeout`
**タイプ**: `INT32`<br>
**プロバイダー名**: `Timeout`<br>
**説明**: Lambda が関数を停止する前に実行を許可する時間 (秒単位)。<br>
## `tracing_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `TracingConfig`<br>
**説明**: 関数の X-Ray トレース構成。<br>
   - `mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Mode`<br>
    **説明**: トレースモード。<br>
## `version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `Version`<br>
**説明**: Lambda 関数のバージョン。<br>
## `vpc_config`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `VpcConfig`<br>
**説明**: 関数のネットワーク構成。<br>
   - `security_group_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `SecurityGroupIds`<br>
    **説明**: VPC セキュリティグループ ID のリスト。<br>
   - `subnet_ids`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `SubnetIds`<br>
    **説明**: VPC サブネット ID のリスト。<br>
   - `vpc_id`<br>
    **タイプ**: `STRING`<br>
    **Provider name**: `VpcId`<br>
    **Description**: The ID of the VPC.<br>
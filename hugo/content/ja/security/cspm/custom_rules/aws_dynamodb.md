---
dependencies: []
disable_edit: true
---
# aws_dynamodb

## `account_id`
**タイプ**: `STRING`<br>
## `archival_summary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ArchivalSummary`<br>
**説明**: テーブルアーカイブに関する情報が含まれています。<br>
   - `archival_backup_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ArchivalBackupArn`<br>
    **説明**: アーカイブの理由に該当する場合、テーブルがアーカイブされたバックアップの Amazon Resource Name (ARN)。このバックアップを同じテーブル名で復元したい場合は、元のテーブルを削除する必要があります。<br>
   - `archival_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `ArchivalDateTime`<br>
    **説明**: DynamoDB によってテーブルアーカイブが開始された日時 (UNIX エポックタイム形式)。<br>
   - `archival_reason`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ArchivalReason`<br>
    **説明**: DynamoDB がテーブルをアーカイブした理由。現在、唯一の可能な値は次のとおりです: <ul> <li>  <code>INACCESSIBLE_ENCRYPTION_CREDENTIALS</code> - テーブルの KMS キーが 7 日以上アクセスできないため、テーブルがアーカイブされました。アーカイブ時にオンデマンドバックアップが作成されました。 </li> </ul>
## `attribute_definitions`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `AttributeDefinitions`<br>
**説明**: <code>AttributeDefinition</code> オブジェクトの配列。これらのオブジェクトは、それぞれテーブルおよびインデックスキーのスキーマにおけるひとつの属性を記述します。この配列の各 <code>AttributeDefinition</code> オブジェクトは、次のような構成になっています。<br>
   - `attribute_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AttributeName`<br>
    **説明**: 属性の名前。<br>
   - `attribute_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AttributeType`<br>
    **説明**: 属性のデータタイプ。 <ul> <li>  <code>S</code> - 属性は String タイプです </li> <li>  <code>N</code> - 属性は  Number タイプです </li> <li>  <code>B</code> - 属性は Binary タイプです</li> </ul>
## `billing_mode_summary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `BillingModeSummary`<br>
**説明**: 読み出し/書き込み容量モードの詳細が記載されています。<br>
   - `billing_mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `BillingMode`<br>
    **説明**: 読み取りと書き込みのスループットに対する課金方法と、容量の管理方法を制御します。この設定は後で変更することができます。 <ul> <li>  <code>PROVISIONED</code> - 読み取り/書き込みの容量モードを <code>PROVISIONED</code> に設定します。予測可能なワークロードには <code>PROVISIONED</code> を使用することをお勧めします。 </li> <li>  <code>PAY_PER_REQUEST</code> - 読み取り/書き込みの容量モードを <code>PAY_PER_REQUEST</code> に設定します。予測不可能なワークロードには、<code>PAY_PER_REQUEST</code> を使用することをお勧めします。  </li> </ul>
   - `last_update_to_pay_per_request_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastUpdateToPayPerRequestDateTime`<br>
    **説明**: 最後に <code>PAY_PER_REQUEST</code> を読み書き可能な容量モードに設定した時刻を表します。<br>
## `creation_date_time`
**タイプ**: `TIMESTAMP`<br>
**プロバイダー名**: `CreationDateTime`<br>
**説明**: テーブルが作成された日時 (<a href="http://www.epochconverter.com/">UNIX エポックタイム</a>形式)。<br>
## `global_secondary_indexes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `GlobalSecondaryIndexes`<br>
**説明**: テーブル上にグローバルセカンダリインデックスがある場合、そのインデックス。各インデックスは、与えられたパーティションキー値にスコープされています。テーブルが <code>DELETING</code> 状態にある場合、インデックスに関する情報は返されません。<br>
   - `backfilling`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `Backfilling`<br>
    **説明**: インデックスが現在バックフィリング中かどうかを示します。<i>Backfilling</i> とは、テーブルから項目を読み取り、インデックスに追加可能かどうかを判断する処理です (すべての項目が適格であるわけではありません。例えば、パーティションキーは重複した値を持つことができません)。インデックスに追加できるアイテムがあれば、DynamoDB はインデックスに追加します。すべてのアイテムが処理された後、バックフィリング操作は完了し、<code>Backfilling</code> は false になります。<code>IndexStatus</code> が CREATING に設定され、<code>Backfilling</code> が true のとき、<code>Backfilling</code> フェーズで作成中のインデックスを削除することができます。<code>IndexStatus</code> が CREATING に設定され、<code>Backfilling</code> が false の場合、作成中のインデックスを削除することはできません。<note> <code>CreateTable</code> 操作中に作成されたインデックスでは、<code>Backfilling</code> 属性が <code>DescribeTable</code> 出力に表示されません。 </note><br>
   - `index_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IndexArn`<br>
    **説明**: インデックスを一意に識別する Amazon Resource Name (ARN)。<br>
   - `index_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IndexName`<br>
    **説明**: グローバルセカンダリインデックスの名前。<br>
   - `index_size_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `IndexSizeBytes`<br>
    **説明**: 指定したインデックスの総サイズ (バイト数)。DynamoDB はこの値をおよそ 6 時間ごとに更新します。最近の変更はこの値には反映されないかもしれません。<br>
   - `index_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IndexStatus`<br>
    **説明**: グローバルセカンダリインデックスの現在の状態: <ul> <li>  <code>CREATING</code> - インデックスを作成中です。 </li> <li>  <code>UPDATING</code> - インデックスを更新中です。 </li> <li>  <code>DELETING</code> - インデックスを削除中です。 </li> <li>  <code>ACTIVE</code> - インデックスを使用することができます。 </li> </ul>
   - `item_count`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `ItemCount`<br>
    **説明**: 指定されたインデックスに含まれる項目の数。DynamoDB はこの値をおよそ 6 時間ごとに更新します。最近の変更はこの値には反映されないかもしれません。<br>
   - `key_schema`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `KeySchema`<br>
    **説明**: グローバルセカンダリインデックスの完全なキースキーマで、1 つ以上の属性名とキータイプの組で構成されます。<ul> <li>  <code>HASH</code> - パーティションキー </li> <li>  <code>RANGE</code> - ソートキー </li> </ul> <note> アイテムのパーティションキーは、<i>ハッシュ属性</i>とも呼ばれます。ハッシュ属性とは、DynamoDB の内部ハッシュ関数が、パーティションキーの値に基づいて、パーティション間でデータを均等に分配することに由来しています。アイテムのソートキーは、<i>範囲属性</i>とも呼ばれます。DynamoDB では、同じパーティションキーを持つアイテムは、ソートキーの値でソートされた状態で物理的に近くに格納されるため、「範囲属性」と呼ばれます。 </note><br>
       - `attribute_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `AttributeName`<br>
        **説明**: キー属性の名前。<br>
       - `key_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `KeyType`<br>
        **説明**: このキー属性が担うロール。<ul> <li>  <code>HASH</code> - パーティションキー </li> <li>  <code>RANGE</code> - ソートキー </li> </ul> <note> アイテムのパーティションキーは、<i>ハッシュ属性</i>とも呼ばれます。ハッシュ属性とは、DynamoDB の内部ハッシュ関数が、パーティションキーの値に基づいて、パーティション間でデータを均等に分配することに由来しています。アイテムのソートキーは、<i>範囲属性</i>とも呼ばれます。DynamoDB では、同じパーティションキーを持つアイテムは、ソートキーの値でソートされた状態で物理的に近くに格納されるため、「範囲属性」と呼ばれます。 </note><br>
   - `projection`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Projection`<br>
    **説明**: テーブルからグローバルセカンダリインデックスにコピーされる (投影される) 属性を表わします。これらは、自動的に投影されるプライマリキー属性とインデックスキー属性に追加されます。<br>
       - `non_key_attributes`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `NonKeyAttributes`<br>
        **説明**: インデックスに投影される非キー属性の名前を表します。ローカルのセカンダリインデックスでは、<code>NonKeyAttributes</code> の総数をローカルのセカンダリインデックス全体で合計しても 100 を超えてはいけません。同じ属性を 2 つの異なるインデックスに投影した場合、合計を求める際には 2 つの異なる属性としてカウントされます。<br>
       - `projection_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ProjectionType`<br>
        **説明**: インデックスに投影される属性のセット: <ul> <li>  <code>KEYS_ONLY</code> - インデックスと主キーのみがインデックスに投影されます。 </li> <li>  <code>INCLUDE</code> - <code>KEYS_ONLY</code> で説明した属性に加えて、セカンダリインデックスには、指定した他の非キー属性が含まれます。 </li> <li>  <code>ALL</code> - テーブルの属性はすべてインデックスに投影されます。 </li> </ul>
   - `provisioned_throughput`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ProvisionedThroughput`<br>
    **説明**: 指定されたグローバルセカンダリインデックスのプロビジョニングスループットの設定を表します。現在のプロビジョニングスループットの最小値と最大値については、<i>Amazon DynamoDB 開発者ガイド</i>の<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html">サービス、アカウント、およびテーブルのクォータ</a>を参照してください。<br>
       - `last_decrease_date_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `LastDecreaseDateTime`<br>
        **説明**: このテーブルのスループットが最後に減少したプロビジョニングの日時。<br>
       - `last_increase_date_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `LastIncreaseDateTime`<br>
        **説明**: このテーブルのスループットが最後に増加したプロビジョニングの日時。<br>
       - `number_of_decreases_today`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `NumberOfDecreasesToday`<br>
        **説明**: この UTC 暦日の間にこのテーブルに対してプロビジョニングされたスループットの減少の数。プロビジョニングされたスループット減少の現在の最大値については、<i>Amazon DynamoDB 開発者ガイド</i>の<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html">サービス、アカウント、およびテーブルのクォータ</a>を参照してください。<br>
       - `read_capacity_units`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `ReadCapacityUnits`<br>
        **説明**: DynamoDB が <code>ThrottlingException</code> を返す前に、1 秒間に消費される強く一貫性のある読み出しの最大数。最終的に一貫性のある読み出しは、強く一貫性のある読み出しよりも少ない労力で済むので、毎秒 50 <code>ReadCapacityUnits</code>の設定は、毎秒 100 の最終的に一貫性のある <code>ReadCapacityUnits</code> を提供します。<br>
       - `write_capacity_units`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `WriteCapacityUnits`<br>
        **説明**: DynamoDB が <code>ThrottlingException</code> を返すまでの、1 秒間に消費される最大書き込み回数。<br>
## `global_table_version`
**タイプ**: `STRING`<br>
**プロバイダー名**: `GlobalTableVersion`<br>
**説明**: テーブルが Amazon Web Services リージョン間でレプリケートされる場合、使用中の<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html">グローバルテーブル</a>のバージョンを表わします。<br>
## `item_count`
**タイプ**: `INT64`<br>
**プロバイダー名**: `ItemCount`<br>
**説明**: 指定されたテーブルに含まれる項目の数。DynamoDB はこの値をおよそ 6 時間ごとに更新します。最近の変更はこの値には反映されないかもしれません。<br>
## `key_schema`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `KeySchema`<br>
**説明**: テーブルの主キー構造。各 <code>KeySchemaElement</code> は次で構成されます。 <ul> <li>  <code>AttributeName</code> - 属性の名前。 </li> <li>  <code>KeyType</code> - 属性のロール: <ul> <li>  <code>HASH</code> - パーティションキー </li> <li>  <code>RANGE</code> - ソートキー </li> </ul> <note> アイテムのパーティションキーは、<i>ハッシュ属性</i>とも呼ばれます。ハッシュ属性とは、DynamoDB の内部ハッシュ関数が、パーティションキーの値に基づいて、パーティション間でデータを均等に分配することに由来しています。アイテムのソートキーは、<i>範囲属性</i>とも呼ばれます。DynamoDB では、同じパーティションキーを持つアイテムは、ソートキーの値でソートされた状態で物理的に近くに格納されるため、「範囲属性」と呼ばれます。</note> </li> </ul> 主キーの詳細については、<i>Amazon DynamoDB 開発者ガイド</i>の<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html#DataModelPrimaryKey">主キー</a>を参照してください。<br>
   - `attribute_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `AttributeName`<br>
    **説明**: キー属性の名前。<br>
   - `key_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KeyType`<br>
    **説明**: このキー属性が担うロール。<ul> <li>  <code>HASH</code> - パーティションキー </li> <li>  <code>RANGE</code> - ソートキー </li> </ul> <note> アイテムのパーティションキーは、<i>ハッシュ属性</i>とも呼ばれます。ハッシュ属性とは、DynamoDB の内部ハッシュ関数が、パーティションキーの値に基づいて、パーティション間でデータを均等に分配することに由来しています。アイテムのソートキーは、<i>範囲属性</i>とも呼ばれます。DynamoDB では、同じパーティションキーを持つアイテムは、ソートキーの値でソートされた状態で物理的に近くに格納されるため、「範囲属性」と呼ばれます。 </note><br>
## `latest_stream_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LatestStreamArn`<br>
**説明**: このテーブルの最新のストリームを一意に識別する Amazon Resource Name (ARN)。<br>
## `latest_stream_label`
**タイプ**: `STRING`<br>
**プロバイダー名**: `LatestStreamLabel`<br>
**説明**: このストリームの ISO 8601 フォーマットのタイムスタンプ。別のテーブルからのストリームが同じタイムスタンプを持つ可能性があるため、LatestStreamLabel はストリームの一意な識別子ではないことに注意してください。ただし、以下の 3 つの要素の組み合わせは一意であることが保証されます: <ul> <li> Amazon Web Services カスタマー ID </li> <li> テーブル名 </li> <li>  <code>StreamLabel</code>  </li> </ul>
## `local_secondary_indexes`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `LocalSecondaryIndexes`<br>
**説明**: テーブル上の 1 つまたは複数のローカルセカンダリインデックスを表します。各インデックスは、指定されたパーティションキー値にスコープされます。1 つ以上のローカルセカンダリインデックスを持つテーブルは、アイテムコレクションサイズ制限の対象となり、与えられたアイテムコレクション内のデータ量は 10 GB を超えることはできません。テーブルが <code>DELETING</code> 状態にある場合、インデックスに関する情報は返されません。<br>
   - `index_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IndexArn`<br>
    **説明**: インデックスを一意に識別する Amazon Resource Name (ARN)。<br>
   - `index_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `IndexName`<br>
    **説明**: ローカルセカンダリインデックスの名前を表します。<br>
   - `index_size_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `IndexSizeBytes`<br>
    **説明**: 指定したインデックスの総サイズ (バイト数)。DynamoDB はこの値をおよそ 6 時間ごとに更新します。最近の変更はこの値には反映されないかもしれません。<br>
   - `item_count`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `ItemCount`<br>
    **説明**: 指定されたインデックスに含まれる項目の数。DynamoDB はこの値をおよそ 6 時間ごとに更新します。最近の変更はこの値には反映されないかもしれません。<br>
   - `key_schema`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `KeySchema`<br>
    **説明**: ローカルセカンダリインデックスの完全なキースキーマで、1 つ以上の属性名とキータイプの組で構成されます。<ul> <li>  <code>HASH</code> - パーティションキー </li> <li>  <code>RANGE</code> - ソートキー </li> </ul> <note> アイテムのパーティションキーは、<i>ハッシュ属性</i>とも呼ばれます。ハッシュ属性とは、DynamoDB の内部ハッシュ関数が、パーティションキーの値に基づいて、パーティション間でデータを均等に分配することに由来しています。アイテムのソートキーは、<i>範囲属性</i>とも呼ばれます。DynamoDB では、同じパーティションキーを持つアイテムは、ソートキーの値でソートされた状態で物理的に近くに格納されるため、「範囲属性」と呼ばれます。 </note><br>
       - `attribute_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `AttributeName`<br>
        **説明**: キー属性の名前。<br>
       - `key_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `KeyType`<br>
        **説明**: このキー属性が担うロール。<ul> <li>  <code>HASH</code> - パーティションキー </li> <li>  <code>RANGE</code> - ソートキー </li> </ul> <note> アイテムのパーティションキーは、<i>ハッシュ属性</i>とも呼ばれます。ハッシュ属性とは、DynamoDB の内部ハッシュ関数が、パーティションキーの値に基づいて、パーティション間でデータを均等に分配することに由来しています。アイテムのソートキーは、<i>範囲属性</i>とも呼ばれます。DynamoDB では、同じパーティションキーを持つアイテムは、ソートキーの値でソートされた状態で物理的に近くに格納されるため、「範囲属性」と呼ばれます。 </note><br>
   - `projection`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `Projection`<br>
    **説明**: テーブルからグローバルセカンダリインデックスにコピーされる (投影される) 属性を表わします。これらは、自動的に投影されるプライマリキー属性とインデックスキー属性に追加されます。<br>
       - `non_key_attributes`<br>
        **タイプ**: `UNORDERED_LIST_STRING`<br>
        **プロバイダー名**: `NonKeyAttributes`<br>
        **説明**: インデックスに投影される非キー属性の名前を表します。ローカルのセカンダリインデックスでは、<code>NonKeyAttributes</code> の総数をローカルのセカンダリインデックス全体で合計しても 100 を超えてはいけません。同じ属性を 2 つの異なるインデックスに投影した場合、合計を求める際には 2 つの異なる属性としてカウントされます。<br>
       - `projection_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `ProjectionType`<br>
        **説明**: インデックスに投影される属性のセット: <ul> <li>  <code>KEYS_ONLY</code> - インデックスと主キーのみがインデックスに投影されます。 </li> <li>  <code>INCLUDE</code> - <code>KEYS_ONLY</code> で説明した属性に加えて、セカンダリインデックスには、指定した他の非キー属性が含まれます。 </li> <li>  <code>ALL</code> - テーブルの属性はすべてインデックスに投影されます。 </li> </ul>
## `provisioned_throughput`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `ProvisionedThroughput`<br>
**説明**: テーブルのプロビジョニングされたスループット設定。読み取りと書き込みの容量単位で構成され、増加および減少に関するデータも含まれます。<br>
   - `last_decrease_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastDecreaseDateTime`<br>
    **説明**: このテーブルのスループットが最後に減少したプロビジョニングの日時。<br>
   - `last_increase_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastIncreaseDateTime`<br>
    **説明**: このテーブルのスループットが最後に増加したプロビジョニングの日時。<br>
   - `number_of_decreases_today`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `NumberOfDecreasesToday`<br>
    **説明**: この UTC 暦日の間にこのテーブルに対してプロビジョニングされたスループットの減少の数。プロビジョニングされたスループット減少の現在の最大値については、<i>Amazon DynamoDB 開発者ガイド</i>の<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Limits.html">サービス、アカウント、およびテーブルのクォータ</a>を参照してください。<br>
   - `read_capacity_units`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `ReadCapacityUnits`<br>
    **説明**: DynamoDB が <code>ThrottlingException</code> を返す前に、1 秒間に消費される強く一貫性のある読み出しの最大数。最終的に一貫性のある読み出しは、強く一貫性のある読み出しよりも少ない労力で済むので、毎秒 50 <code>ReadCapacityUnits</code>の設定は、毎秒 100 の最終的に一貫性のある <code>ReadCapacityUnits</code> を提供します。<br>
   - `write_capacity_units`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `WriteCapacityUnits`<br>
    **説明**: DynamoDB が <code>ThrottlingException</code> を返すまでの、1 秒間に消費される最大書き込み回数。<br>
## `replicas`
**タイプ**: `UNORDERED_LIST_STRUCT`<br>
**プロバイダー名**: `Replicas`<br>
**説明**: テーブルのレプリカを表します。<br>
   - `global_secondary_indexes`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `GlobalSecondaryIndexes`<br>
    **説明**: レプリカ固有のグローバルセカンダリインデックス設定。<br>
       - `index_name`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `IndexName`<br>
        **説明**: グローバルセカンダリインデックスの名前。<br>
       - `provisioned_throughput_override`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `ProvisionedThroughputOverride`<br>
        **説明**: 記載がない場合は、ソーステーブル GSI の読み込み容量設定を使用します。<br>
           - `read_capacity_units`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `ReadCapacityUnits`<br>
            **説明**: レプリカ固有の読み取り容量単位。指定しない場合、ソーステーブルの読み取り容量設定を使用します。<br>
   - `kms_master_key_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KMSMasterKeyId`<br>
    **説明**: KMS 暗号化に使用されるレプリカの KMS キー。<br>
   - `provisioned_throughput_override`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ProvisionedThroughputOverride`<br>
    **説明**: レプリカ固有のプロビジョニングされたスループット。記述されていない場合は、ソーステーブルのプロビジョニングされたスループット設定を使用します。<br>
       - `read_capacity_units`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `ReadCapacityUnits`<br>
        **説明**: レプリカ固有の読み取り容量単位。指定しない場合、ソーステーブルの読み取り容量設定を使用します。<br>
   - `region_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `RegionName`<br>
    **説明**: リージョンの名前。<br>
   - `replica_inaccessible_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `ReplicaInaccessibleDateTime`<br>
    **説明**: レプリカがアクセス不能として最初に検出された時刻。アクセス不能の原因を調べるには、<code>ReplicaStatus</code> プロパティを確認します。<br>
   - `replica_status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ReplicaStatus`<br>
    **説明**: レプリカの現在の状態: <ul> <li>  <code>CREATING</code> - レプリカを作成中です。 </li> <li>  <code>UPDATING</code> - レプリカを更新中です。 </li> <li>  <code>DELETING</code> - レプリカを削除中です。 </li> <li>  <code>ACTIVE</code> - レプリカを使用することができます。 </li> <li>  <code>REGION_DISABLED</code> - Amazon Web Services のリージョンが無効になっているため、レプリカにアクセスできません。 <note> Amazon Web Services リージョンに 20 時間以上アクセスできない状態が続くと、DynamoDB はこのレプリカをレプリケーショングループから削除します。レプリカは削除されず、このリージョンからのレプリケーションとこのリージョンへのレプリケーションが停止します。 </note> </li> <li>  <code>INACCESSIBLE_ENCRYPTION_CREDENTIALS </code> - テーブルの暗号化に使用した KMS キーにアクセスできません。 <note> KMS キーに 20 時間以上アクセスできない状態が続くと、DynamoDB はこのレプリカをレプリケーショングループから削除します。レプリカは削除されず、このリージョンからのレプリケーションとこのリージョンへのレプリケーションが停止します。 </note> </li> </ul>
   - `replica_status_description`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ReplicaStatusDescription`<br>
    **説明**: レプリカのステータスの詳細情報。<br>
   - `replica_status_percent_progress`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `ReplicaStatusPercentProgress`<br>
    **説明**: レプリカの Create、Update、Delete アクションの進捗状況をパーセンテージで指定します。<br>
   - `replica_table_class_summary`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `ReplicaTableClassSummary`<br>
       - `last_update_date_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `LastUpdateDateTime`<br>
        **説明**: テーブルクラスが最後に更新された日時。<br>
       - `table_class`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `TableClass`<br>
        **説明**: 指定されたテーブルのテーブルクラス。有効な値は <code>STANDARD</code> および <code>STANDARD_INFREQUENT_ACCESS</code> です。<br>
## `restore_summary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `RestoreSummary`<br>
**説明**: リストアに関する詳細が含まれています。<br>
   - `restore_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `RestoreDateTime`<br>
    **説明**: 時点またはソースバックアップ時間。<br>
   - `restore_in_progress`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `RestoreInProgress`<br>
    **説明**: リストア中であるか否かを示します。<br>
   - `source_backup_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SourceBackupArn`<br>
    **説明**: テーブルのリストア元となったバックアップの Amazon Resource Name (ARN)。<br>
   - `source_table_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SourceTableArn`<br>
    **説明**: リストアされるバックアップのソーステーブルの ARN。<br>
## `sse_description`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `SSEDescription`<br>
**説明**: 指定されたテーブルのサーバー側暗号化ステータスの説明。<br>
   - `inaccessible_encryption_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `InaccessibleEncryptionDateTime`<br>
    **説明**: DynamoDB がテーブルの KMS キーにアクセスできないことを検出した時刻を、UNIX エポック日付形式で示します。この属性は、DynamoDB がテーブルの KMS キーに再びアクセスできるようになったことを検出すると、自動的にクリアされます。この日付から 7 日以上 KMS キーにアクセスできない状態が続くと、DynamoDB はテーブルアーカイブの処理を開始します。<br>
   - `kms_master_key_arn`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `KMSMasterKeyArn`<br>
    **説明**: KMS の暗号化に使用される KMS キー ARN。<br>
   - `sse_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `SSEType`<br>
    **説明**: サーバー側の暗号化タイプ。サポートされている値は次のとおりです: <ul> <li>  <code>KMS</code> - Key Management Service を利用したサーバー側の暗号化。キーはお使いのアカウントに保存され、KMS によって管理されます (KMS の料金がかかります)。 </li> </ul>
   - `status`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `Status`<br>
    **説明**: サーバー側の暗号化の現在の状態を表します。サポートされる値は次のとおりです: <ul> <li>  <code>ENABLED</code> - サーバー側の暗号化が有効になっています。 </li> <li>  <code>UPDATING</code> - サーバー側の暗号化を更新しています。 </li> </ul>
## `stream_specification`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `StreamSpecification`<br>
**説明**: テーブルに対する現在の DynamoDB Streams の構成。<br>
   - `stream_enabled`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `StreamEnabled`<br>
    **説明**: テーブル上で DynamoDB Streams が有効 (true) か無効 (false) かを示します。<br>
   - `stream_view_type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `StreamViewType`<br>
    **説明**: テーブルの項目が変更されたとき、<code>StreamViewType</code> はこのテーブルのストリームにどのような情報を書き込むかを決定します。<code>StreamViewType</code> の有効な値は次のとおりです。 <ul> <li>  <code>KEYS_ONLY</code> - 変更された項目のキー属性のみがストリームに書き込まれます。 </li> <li>  <code>NEW_IMAGE</code> - 変更後に表示される項目全体がストリームに書き込まれます。 </li> <li>  <code>OLD_IMAGE</code> - 変更前の項目全体がストリームに書き込まれます。 </li> <li>  <code>NEW_AND_OLD_IMAGES</code> - 項目の新旧両方のイメージがストリームに書き込まれます。 </li> </ul>
## `table_arn`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TableArn`<br>
**説明**: テーブルを一意に識別する Amazon Resource Name (ARN)。<br>
## `table_class_summary`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `TableClassSummary`<br>
**説明**: テーブルクラスに関する詳細が含まれています。<br>
   - `last_update_date_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `LastUpdateDateTime`<br>
    **説明**: テーブルクラスが最後に更新された日時。<br>
   - `table_class`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `TableClass`<br>
    **説明**: 指定されたテーブルのテーブルクラス。有効な値は <code>STANDARD</code> および <code>STANDARD_INFREQUENT_ACCESS</code> です。<br>
## `table_id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TableId`<br>
**説明**: バックアップが作成されたテーブルの一意な識別子。<br>
## `table_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TableName`<br>
**説明**: テーブルの名前。<br>
## `table_size_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `TableSizeBytes`<br>
**説明**: 指定したテーブルの総サイズ (バイト数)。DynamoDB はこの値をおよそ 6 時間ごとに更新します。最近の変更はこの値には反映されないかもしれません。<br>
## `table_status`
**タイプ**: `STRING`<br>
**プロバイダー名**: `TableStatus`<br>
**説明**: テーブルの現在の状態: <ul> <li>  <code>CREATING</code> - テーブルを作成中です。 </li> <li>  <code>UPDATING</code> - テーブルを更新中です。 </li> <li>  <code>DELETING</code> - テーブルを削除中です。 </li> <li>  <code>ACTIVE</code> - テーブルを使用することができます。 </li> <li>  <code>INACCESSIBLE_ENCRYPTION_CREDENTIALS</code> - テーブルを暗号化するために使用した KMS キーにアクセスできません。KMS キーが使用できないため、テーブルの操作が失敗する可能性があります。DynamoDB は、テーブルの KMS キーが 7 日以上アクセスできない状態が続くと、テーブルのアーカイブ処理を開始します。  </li> <li>  <code>ARCHIVING</code> - テーブルをアーカイブ中です。アーカイブが完了するまで操作はできません。  </li> <li>  <code>ARCHIVED</code> - テーブルがアーカイブされました。詳しくは ArchivalReason を参照してください。  </li> </ul>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
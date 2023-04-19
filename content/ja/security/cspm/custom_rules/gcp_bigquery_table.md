---
dependencies: []
disable_edit: true
---
# gcp_bigquery_table

## `ancestors`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `clone_definition`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `cloneDefinition`<br>
**説明**: [出力のみ] 複製の定義。<br>
   - `base_table_reference`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `baseTableReference`<br>
    **説明**: [必須] 複製されたテーブルの ID を記述したリファレンス。<br>
       - `dataset_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `datasetId`<br>
        **説明**: [必須] このテーブルを含むデータセットの ID。<br>
       - `project_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `projectId`<br>
        **説明**: [必須] このテーブルを含むプロジェクトの ID。<br>
       - `table_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `tableId`<br>
        **説明**: [必須] テーブルの ID。ID には、文字 (a-z、A-Z) か数字 (0-9) かアンダースコア (_) のみを含める必要があります。最大長は 1,024 文字です。<br>
   - `clone_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `cloneTime`<br>
    **説明**: [必須] ベーステーブルが複製された時刻。この値は、RFC3339 形式で JSON 応答に報告されます。<br>
## `clustering`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `clustering`<br>
**説明**: [ベータ版] テーブルのクラスタリング指定。パーティショニングと一緒に指定する必要があり、テーブル内のデータはまずパーティショニングされ、その後クラスター化されます。<br>

## `creation_time`
**タイプ**: `INT64`<br>
**プロバイダー名**: `creationTime`<br>
**説明**: [出力のみ] このテーブルが作成された時刻 (エポックからのミリ秒単位)。<br>
## `default_collation`
**タイプ**: `STRING`<br>
**プロバイダー名**: `defaultCollation`<br>
**説明**: [出力のみ] テーブルのデフォルト照合。<br>
## `default_rounding_mode`
**タイプ**: `STRING`<br>
**プロバイダー名**: `defaultRoundingMode`<br>
**説明**: [出力のみ] テーブルのデフォルトの丸めモード。<br>
## `description`
**タイプ**: `STRING`<br>
**プロバイダー名**: `description`<br>
**説明**: [オプション] このテーブルのわかりやすい説明。<br>
## `encryption_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `encryptionConfiguration`<br>
**説明**: カスタム暗号化構成 (Cloud KMS キーなど)。<br>
   - `kms_key_name`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `kmsKeyName`<br>
    **説明**: [オプション] 宛先の BigQuery テーブルを保護するために使用される Cloud KMS 暗号化キーについて記述します。プロジェクトに関連付けられた BigQuery サービスアカウントは、この暗号化キーにアクセスする必要があります。<br>
## `etag`
**タイプ**: `STRING`<br>
**プロバイダー名**: `etag`<br>
**説明**: [出力のみ] テーブルのメタデータのハッシュ。アップデートを試みる際に、リソースが同時に変更されていないことを確認するために使用します。テーブルの内容やフィールド numRows、numBytes、numLongTermBytes、lastModifiedTime が変更されても、その変更は保証されません。<br>
## `expiration_time`
**タイプ**: `INT64`<br>
**プロバイダー名**: `expirationTime`<br>
**説明**: [オプション] このテーブルが期限切れとなる時刻 (エポックからのミリ秒単位)。存在しない場合、このテーブルは無期限に存続します。期限切れのテーブルは削除され、そのストレージは再利用されます。カプセル化されたデータセットの defaultTableExpirationMs プロパティを使用して、新しく作成されたテーブルのデフォルトの有効期限を設定することができます。<br>
## `external_data_configuration`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `externalDataConfiguration`<br>
**説明**: [オプション] BigQuery の外部に保存されたテーブルのデータ形式、場所、およびその他のプロパティを記述します。これらのプロパティを定義することで、データソースはあたかも BigQuery の標準テーブルのようにクエリすることができるようになります。<br>
   - `autodetect`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `autodetect`<br>
    **説明**: スキーマとフォーマットのオプションを自動的に検出しようとします。明示的に指定されたオプションはすべて尊重されます。<br>
   - `avro_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `avroOptions`<br>
    **説明**: sourceFormat が Avro に設定されている場合に設定する追加プロパティ。<br>
       - `use_avro_logical_types`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `useAvroLogicalTypes`<br>
        **説明**: [オプション] sourceFormat が "AVRO" に設定されている場合、論理型を生の型 (例えば INTEGER) ではなく、対応する BigQuery のデータ型 (例えば TIMESTAMP) として解釈するかどうかを指定します。<br>
   - `bigtable_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `bigtableOptions`<br>
    **説明**: [オプション] sourceFormat が BIGTABLE に設定されている場合の追加オプション。<br>
       - `column_families`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `columnFamilies`<br>
        **説明**: [オプション] テーブルスキーマで公開する列ファミリーのリストと、そのタイプ。このリストは、クエリを参照できる列ファミリーを制限し、その値のタイプを指定します。このリストを使って、タイプ変換を行うことができます。詳しくは 'type' フィールドを参照してください。このリストを空にすると、すべての列ファミリーがテーブルスキーマに存在することになり、その値は BYTES として読み込まれます。クエリ中は、そのクエリで参照されるカラムファミリーのみが Bigtable から読み込まれます。<br>
           - `columns`<br>
            **タイプ**: `UNORDERED_LIST_STRUCT`<br>
            **プロバイダー名**: `columns`<br>
            **説明**: [オプション] (カラム名、値) のペアのリストではなく、個々のフィールドとして公開されるべきカラムのリスト。修飾子がこのリストの修飾子にマッチするすべての列は、. としてアクセスすることができます。その他の列は、.Column field を通してリストとしてアクセスすることができます。<br>
               - `encoding`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `encoding`<br>
                **説明**: [オプション] 型が STRING でない場合の値のエンコーディング。使用可能なエンコーディングの値は以下の通りです。TEXT - 値が英数字のテキスト文字列であることを表します。BINARY - 値が HBase Bytes.toBytes 関数ファミリーを使用してエンコードされていることを表します。'encoding' は列のファミリーレベルでも設定することができます。しかし、両方のレベルで 'encoding' を設定した場合は、 このレベルでの設定が優先されます。<br>
               - `field_name`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `fieldName`<br>
                **説明**: [オプション] 修飾子が有効な BigQuery フィールド識別子でない場合、つまり [a-zA-Z][a-zA-Z0-9_]* にマッチしない場合は、有効な識別子を列フィールド名として指定する必要があり、クエリのフィールド名として使用されるようになります。<br>
               - `only_read_latest`<br>
                **タイプ**: `BOOLEAN`<br>
                **プロバイダー名**: `onlyReadLatest`<br>
                **説明**: [オプション] これが設定されている場合、この列の値の最新バージョンのみが公開されます。また、'onlyReadLatest' は列ファミリーレベルでも設定することができます。しかし、'onlyReadLatest' が両方のレベルで設定されている場合は、このレベルでの設定が優先されます。<br>
               - `qualifier_string`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `qualifierString`<br>
               - `type`<br>
                **タイプ**: `STRING`<br>
                **プロバイダー名**: `type`<br>
                   **説明**: [オプション] この列のセル内の値を変換するためのタイプ。エンコーディングに BINARY を指定した場合は、HBase Bytes.toBytes 関数を用いて値をエンコードすることが期待されます。BigQuery では、BYTES STRING INTEGER FLOAT BOOLEAN のタイプが使用できます (大文字小文字を区別する)。デフォルトのタイプは BYTES です。'type' は列ファミリーレベルでも設定することができます。しかし、両方のレベルで 'type' が設定されている場合は、このレベルでの設定が優先されます。<br>
           - `encoding`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `encoding`<br>
            **説明**: [オプション] 型が STRING でない場合の値のエンコーディング。使用可能なエンコーディングの値は以下の通りです。TEXT - 値が英数字のテキスト文字列であることを表します。BINARY - 値が HBase Bytes.toBytes 関数ファミリーを使用してエンコードされていることを表します。これは、'columns' でその列をリストアップし、そのエンコーディングを指定することで、特定の列に対してオーバーライドすることができます。<br>
           - `family_id`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `familyId`<br>
            **説明**: 列ファミリーの識別子。<br>
           - `only_read_latest`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `onlyReadLatest`<br>
            **説明**: [オプション] この設定がされている場合、この列ファミリーのすべての列に対して、最新バージョンの値のみが公開されます。これは、'columns' にその列をリストアップし、その列に対して別の設定を指定することで、特定の列に対してオーバーライドすることができます。<br>
           - `type`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `type`<br>
               **説明**: [オプション] この列ファミリーのセル内の値を変換するためのタイプ。エンコーディングに BINARY を指定した場合は、HBase Bytes.toBytes 関数を用いて値をエンコードすることが期待されます。BigQuery では、BYTES STRING INTEGER FLOAT BOOLEAN のタイプが利用できます (大文字小文字を区別する)。デフォルトのタイプは BYTES です。これは、'columns' に列を列挙し、その列のタイプを指定することで、特定の列に対してオーバーライドすることができます。<br>
       - `ignore_unspecified_column_families`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `ignoreUnspecifiedColumnFamilies`<br>
        **説明**: [オプション] フィールドが true の場合、columnFamilies リストで指定されていない列ファミリーは、テーブルスキーマで公開されません。そうでない場合は、BYTES タイプの値で読み込まれます。デフォルトは false です。<br>
       - `read_rowkey_as_string`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `readRowkeyAsString`<br>
        **説明**: [オプション] フィールドが true の場合、rowkey タイプの列ファミリーが読み込まれ、文字列に変換されます。それ以外の場合は、BYTES タイプの値で読み込まれ、必要に応じて CAST で手動でキャストする必要があります。デフォルト値は false です。<br>
   - `compression`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `compression`<br>
    **説明**: [オプション] データソースの圧縮形式。指定可能な値は GZIP および NONE です。デフォルトは NONE です。この設定は、Google Cloud Bigtable、Google Cloud Datastore のバックアップ、および Avro 形式では無視されます。<br>
   - `connection_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `connectionId`<br>
    **説明**: [オプション、信頼できるテスター] 外部データソースへの接続。<br>
   - `csv_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `csvOptions`<br>
    **説明**: sourceFormat が CSV に設定されている場合に設定する追加プロパティ。<br>
       - `allow_jagged_rows`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `allowJaggedRows`<br>
        **説明**: [オプション] 末尾のオプション列がない行を BigQuery が受け入れるかどうかを示します。true の場合、BigQuery は末尾にない列を null 値として扱います。false の場合、末尾のカラムが欠損しているレコードは不良レコードとして扱われ、不良レコードが多すぎる場合は、ジョブ結果に無効なエラーが返されます。デフォルトは false です。<br>
       - `allow_quoted_newlines`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `allowQuotedNewlines`<br>
        **説明**: [オプション] CSV ファイルにおいて、改行文字を含む引用符付きのデータセクションを BigQuery が許可するかどうかを示します。デフォルトは false です。<br>
       - `encoding`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `encoding`<br>
        **説明**: [オプション] データの文字エンコーディング。サポートされる値は UTF-8 または ISO-8859-1 です。デフォルトは UTF-8 です。BigQuery は、quote および fieldDelimiter プロパティの値を用いてバイナリデータを分割した後、データをデコードします。<br>
       - `field_delimiter`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `fieldDelimiter`<br>
        **説明**: [オプション] CSV ファイル内のフィールドの区切り文字。BigQuery は文字列を ISO-8859-1 エンコーディングに変換し、エンコーディングされた文字列の最初のバイトを使用して、データを生のバイナリ状態のまま分割します。BigQuery は、タブ区切り文字を指定するためのエスケープシーケンス "\t" もサポートしています。デフォルトはカンマ (',') です。<br>
       - `null_marker`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `null_marker`<br>
        **説明**: [オプション] CSV インポートデータにおいて、NULL 値を表すカスタム文字列。<br>
       - `preserve_ascii_control_characters`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `preserveAsciiControlCharacters`<br>
        **説明**: [オプション] CSV からの読み込み時に、埋め込まれた ASCII 制御文字 (ASCII テーブルの最初の 32 文字、'\x00' から '\x1F' まで) を保持します。CSV のみ適用可能で、他の形式では無視されます。<br>
       - `quote`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `quote`<br>
        **説明**: [オプション] CSV ファイルのデータセクションを引用するために使用される値。BigQuery は文字列を ISO-8859-1 エンコーディングに変換し、エンコーディングされた文字列の最初のバイトを使用して、データを生のバイナリ状態で分割します。デフォルトは二重引用符 ('"') です。データに引用符で囲まれたセクションがない場合は、プロパティ値に空の文字列を設定します。データに引用符で囲まれた改行文字が含まれている場合、allowQuotedNewlines プロパティも true に設定する必要があります。<br>
       - `skip_leading_rows`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `skipLeadingRows`<br>
        **説明**: [オプション] CSV ファイルの先頭で、BigQuery がデータを読み込む際にスキップする行数。デフォルト値は 0 です。このプロパティは、スキップすべきヘッダー行がファイル内にある場合に便利です。自動検出がオンの場合、以下のような動作になります。* skipLeadingRows 指定なし - Autodetect は、最初の行でヘッダーの検出を試みます。ヘッダが検出されない場合、その行はデータとして読み込まれます。検出されない場合は、データとして読み込まれます。* skipLeadingRows が 0 - ヘッダーが存在しないため、最初の行からデータを読み込むよう、自動検出を指示します。* skipLeadingRows = N > 0 - N-1 行をスキップして、N 行目のヘッダーを検出しようとします。ヘッダーが検出されない場合、N 行は単にスキップされます。それ以外の場合、N 行は検出されたスキーマの列名を抽出するために使用されます。<br>
   - `decimal_target_types`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `decimalTargetTypes`<br>
    **説明**: [オプション] 元となる 10 進数値の変換先となり得る SQL データ型のリストを定義します。このリストと、10 進数フィールドの精度およびスケールパラメーターによって、変換先の型が決定されます。NUMERIC、BIGNUMERIC、STRING の順に、指定されたリストに含まれ、精度とスケールをサポートする型が選択されます。STRING は、すべての精度とスケールの値をサポートします。もしリストにあるどの型も精度とスケールをサポートしていなければ、指定されたリストの中で最も広い範囲をサポートしている型が選ばれ、データを読み込む際に値がサポートされている範囲を超えていれば、エラーがスローされることになります。例: このフィールドの値が ["NUMERIC", "BIGNUMERIC"] であったとします。もし (precision,scale) が: (38,9) -> NUMERIC; (39,9) -> BIGNUMERIC (NUMERIC は 30 桁の整数を保持できない); (38,10) -> BIGNUMERIC (NUMERIC は 10 桁の小数を保持できない); (76,38) -> BIGNUMERIC; (77,38) -> BIGNUMERIC (値がサポートされる範囲外であればエラー)。このフィールドには、重複するタイプを含めることはできません。このフィールドの型の順序は無視されます。例えば、["BIGNUMERIC", "NUMERIC"] は ["NUMERIC", "BIGNUMERIC"] と同じで、NUMERIC は常に BIGNUMERIC より優先されます。デフォルトは、ORC では ["NUMERIC", "STRING"]、その他のファイル形式では ["NUMERIC"] です。<br>
   - `google_sheets_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `googleSheetsOptions`<br>
    **説明**: [オプション] sourceFormat が GOOGLE_SHEETS に設定されている場合の追加オプション。<br>
       - `range`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `range`<br>
        **説明**: [オプション] クエリを実行するシートの範囲。空でない場合のみ使用されます。典型的なフォーマット: sheet_name!top_left_cell_id:bottom_right_cell_id 例: sheet1!A1:B20<br>
       - `skip_leading_rows`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `skipLeadingRows`<br>
        **説明**: [オプション] シートの先頭で、BigQuery がデータを読み込む際にスキップする行数。デフォルト値は 0 です。このプロパティは、スキップすべきヘッダー行がある場合に便利です。自動検出がオンの場合、以下のような動作になります。* skipLeadingRows 指定なし - Autodetect は、最初の行でヘッダーの検出を試みます。ヘッダが検出されない場合、その行はデータとして読み込まれます。検出されない場合は、データとして読み込まれます。* skipLeadingRows が 0 - ヘッダーが存在しないため、最初の行からデータを読み込むよう、自動検出を指示します。* skipLeadingRows = N > 0 - N-1 行をスキップして、N 行目のヘッダーを検出しようとします。ヘッダーが検出されない場合、N 行は単にスキップされます。それ以外の場合、N 行は検出されたスキーマの列名を抽出するために使用されます。<br>
   - `hive_partitioning_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `hivePartitioningOptions`<br>
    **説明**: [オプション] ハイブパーティショニングのサポートを構成するためのオプション。<br>
       - `mode`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `mode`<br>
        **説明**: [オプション] 設定すると、データを読み込むときにどのようなハイブパーティショニングのモードを使用するかを指定します。以下のモードがサポートされています。(1) AUTO: パーティションキーの名前とタイプを自動的に推測します。(2) STRINGS: パーティションキー名を自動的に推測します。すべてのタイプは文字列として解釈されます。(3) CUSTOM: パーティションキースキーマをソース URI のプレフィックスにエンコードします。すべてのストレージ・フォーマットがハイブパーティショニングをサポートするわけではありません。ハイブパーティショニングをサポートしていないフォーマットでハイブパーティショニングをリクエストすると、エラーになります。現在サポートされているタイプには、AVRO、CSV、JSON、ORC、Parquet があります。<br>
       - `require_partition_filter`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `requirePartitionFilter`<br>
        **説明**: [オプション] true に設定すると、このテーブルに対するクエリでは、パーティション除去に使用できるパーティションフィルターを指定する必要があります。このフィールドは、永続的な外部テーブルを作成するとき、または一時的な外部テーブルをクエリするときのみ、true にする必要があることに注意してください。ハイブパーティションのロードで requirePartitionFilter が明示的に true に設定されている場合は失敗します。<br>
       - `source_uri_prefix`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `sourceUriPrefix`<br>
        **説明**: [オプション] ハイブパーティション検出がリクエストされた場合、すべてのソース URI に共通のプレフィックスが提供されなければなりません。このプレフィックスは、パーティションキーエンコーディングが始まる直前で終了していなければなりません。たとえば、次のようなデータレイアウトのファイルを考えてみましょう。gs://bucket/path_to_table/dt=2019-01-01/country=BR/id=7/file.avro gs://bucket/path_to_table/dt=2018-12-31/country=CA/id=3/file.avro ハイブパーティショニングが AUTO または STRINGS 検出でリクエストされた場合、共通プレフィックスは gs://bucket/path_to_table または gs://bucket/path_to_table/ (最後のスラッシュは重要ではありません) のいずれかを指定します。<br>
   - `ignore_unknown_values`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `ignoreUnknownValues`<br>
       **説明**: [オプション] テーブルスキーマで表現されていない余分な値を BigQuery が許容するかどうかを示します。true の場合、余分な値は無視されます。false の場合、余分な列を持つレコードは不正なレコードとして扱われ、不正なレコードが多すぎる場合はジョブ結果に無効なエラーが返されます。デフォルトは false です。sourceFormat プロパティは、BigQuery が何を余分な値として扱うかを決定します。CSV: 末尾の列 JSON: どの列名にも一致しない名前付き値 Google Cloud Bigtable: この設定は無視されます。Google Cloud Datastore backups: この設定は無視されます。Avro: この設定は無視されます。<br>
   - `max_bad_records`<br>
    **タイプ**: `INT32`<br>
    **プロバイダー名**: `maxBadRecords`<br>
    **説明**: [オプション] BigQuery がデータ読み込み時に無視できる不良レコードの最大数。不良レコードの数がこの値を超えると、ジョブ結果に無効なエラーが返されます。これは CSV、JSON、Google Sheets に対してのみ有効です。デフォルト値は 0 で、すべてのレコードが有効であることが要求されます。この設定は、Google Cloud Bigtable、Google Cloud Datastore のバックアップ、および Avro フォーマットでは無視されます。<br>
   - `metadata_cache_mode`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `metadataCacheMode`<br>
    **説明**: [オプション] テーブルのメタデータキャッシュモード。外部データソースからのメタデータのキャッシュを有効にする場合に設定します。<br>
   - `object_metadata`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `objectMetadata`<br>
    **説明**: ObjectMetadata は、Object Tables の作成に使用されます。Object Tables には、source_uris で見つかったオブジェクトのリスト (メタデータ付き) が含まれます。ObjectMetadata が設定されている場合、source_format は省略される必要があります。現在、サポートされている Object Metadata のタイプは SIMPLE のみです。<br>
   - `parquet_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `parquetOptions`<br>
    **説明**: sourceFormat が Parquet に設定されている場合に、追加で設定するプロパティ。<br>
       - `enable_list_inference`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enableListInference`<br>
        **説明**: [オプション] Parquet の LIST 論理型に対してスキーマ推論を行うかどうかを指定します。<br>
       - `enum_as_string`<br>
        **タイプ**: `BOOLEAN`<br>
        **プロバイダー名**: `enumAsString`<br>
        **説明**: [オプション] Parquet の ENUM 論理型を、デフォルトでは BYTES ではなく STRING として推論するかどうかを指定します。<br>
   - `reference_file_schema_uri`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `referenceFileSchemaUri`<br>
    **説明**: [オプション] 予想されるテーブルスキーマを含む参照用ファイルを提供します。AVRO、PARQUET、ORC のフォーマットに対して有効です。<br>
   - `schema`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `schema`<br>
    **説明**: [オプション] データのスキーマ。CSV と JSON 形式ではスキーマが必要です。Google Cloud Bigtable、Cloud Datastore バックアップ、Avro 形式ではスキーマは許可されません。<br>

   - `source_format`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `sourceFormat`<br>
    **説明**: [必須] データフォーマット。CSV ファイルの場合は "CSV" と指定します。Google シートの場合は "GOOGLE_SHEETS" と指定します。改行コードで区切られた JSON の場合は "NEWLINE_DELIMITED_JSON" と指定します。Avro ファイルには `AVRO` を指定します。Google Cloud Datastore のバックアップには "DATASTORE_BACKUP" を指定します。 [ベータ版] Google Cloud Bigtable の場合は、"BIGTABLE" を指定します。<br>
   - `source_uris`<br>
    **タイプ**: `UNORDERED_LIST_STRING`<br>
    **プロバイダー名**: `sourceUris`<br>
    **説明**: [必須] Google Cloud 上のデータを指す完全修飾 URI。Google Cloud Storage の URI の場合: 各 URI には '*' ワイルドカード文字を 1 つ含めることができ、それは 'bucket' 名の後に来る必要があります。ロードジョブに関連するサイズ制限は、外部データソースにも適用されます。Google Cloud Bigtable の URI の場合: URI は 1 つだけ指定可能で、Google Cloud Bigtable テーブルに対して完全に指定された有効な HTTPS URL でなければなりません。Google Cloud Datastore のバックアップの場合、指定できる URI は 1 つだけです。また、'*' ワイルドカード文字は使用できません。<br>
## `friendly_name`
**タイプ**: `STRING`<br>
**プロバイダー名**: `friendlyName`<br>
**説明**: [オプション] このテーブルの説明的な名前。<br>
## `id`
**タイプ**: `STRING`<br>
**プロバイダー名**: `id`<br>
**説明**: [出力のみ] テーブルを一意に識別する不透明な ID。<br>
## `kind`
**タイプ**: `STRING`<br>
**プロバイダー名**: `kind`<br>
**説明**: [出力のみ] リソースのタイプ。<br>
## `labels`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `last_modified_time`
**タイプ**: `INT64`<br>
**プロバイダー名**: `lastModifiedTime`<br>
**説明**: [出力のみ] このテーブルが最後に変更された時刻 (エポックからのミリ秒単位)。<br>
## `location`
**タイプ**: `STRING`<br>
**プロバイダー名**: `location`<br>
**説明**: [出力のみ] テーブルが存在する地理的な場所。この値はデータセットから継承されます。<br>
## `materialized_view`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `materializedView`<br>
**説明**: [オプション] 実体化されたビューの定義。<br>
   - `allow_non_incremental_definition`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `allow_non_incremental_definition`<br>
    **説明**: [オプション] 非インクリメンタルな実体化されたビューの定義を許可します。デフォルトは "false" です。<br>
   - `enable_refresh`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `enableRefresh`<br>
    **説明**: [オプション] [TrustedTester] ベーステーブルが更新されたときに、実体化されたビューの自動更新を有効にします。デフォルト値は "true" です。<br>
   - `last_refresh_time`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `lastRefreshTime`<br>
    **説明**: [出力のみ] [TrustedTester] この実体化されたビューが最後に変更された時刻 (エポックからのミリ秒単位)。<br>
   - `query`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `query`<br>
    **説明**: [必須] 結果が永続化されるクエリ。<br>
   - `refresh_interval_ms`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `refreshIntervalMs`<br>
    **説明**: [オプション] [TrustedTester] この実体化されたビューをリフレッシュする最大の頻度。デフォルト値は "1800000" (30分) です。<br>
## `model`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `model`<br>
**説明**: [出力のみ、ベータ版] このテーブルが ML モデルを表している場合に存在します。モデルのトレーニング情報を記述し、'PREDICT' クエリを実行するために必要です。<br>
   - `model_options`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `modelOptions`<br>
    **説明**: [出力のみ、ベータ版] 最初のトレーニング実行に使用されるモデルオプション。これらのオプションは、以降のトレーニング実行において不変です。入力クエリで指定されていないオプションは、デフォルト値が使用されます。<br>
       - `loss_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `lossType`<br>
       - `model_type`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `modelType`<br>
   - `training_runs`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `trainingRuns`<br>
    **説明**: [出力のみ、ベータ版] ml のトレーニング実行に関する情報。各トレーニング実行は複数の反復から成り、ウォームスタートが使用された場合や、ユーザーが以前にキャンセルしたクエリを継続することを決定した場合、モデルに対して複数のトレーニング実行が存在する可能性があります。<br>
       - `iteration_results`<br>
        **タイプ**: `UNORDERED_LIST_STRUCT`<br>
        **プロバイダー名**: `iterationResults`<br>
        **説明**: [出力のみ、ベータ版] 各反復の結果一覧。<br>
           - `duration_ms`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `durationMs`<br>
            **説明**: [出力のみ、ベータ版] トレーニング反復の実行に要した時間 (ミリ秒単位)。<br>
           - `eval_loss`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `evalLoss`<br>
            **説明**: [出力のみ、ベータ版] 反復計算の最後に評価データに対して計算される評価損失。評価損失はオーバーフィッティングを避けるための早期停止に使われます。eval_split_method オプションが no_split または auto_split で、入力データサイズが 500 行未満の場合、評価損失は発生しません。<br>
           - `index`<br>
            **タイプ**: `INT32`<br>
            **プロバイダー名**: `index`<br>
            **説明**: [出力のみ、ベータ版] ML のトレーニング反復のインデックス (各トレーニング実行でゼロから開始)。<br>
           - `learn_rate`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `learnRate`<br>
            **説明**: [出力のみ、ベータ版] この反復で使用される学習速度。learn_rate_strategy オプションが一定でない場合、変化します。<br>
           - `training_loss`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `trainingLoss`<br>
            **説明**: [出力のみ、ベータ版] 反復計算の最後にトレーニングデータに対して計算されるトレーニング損失。トレーニング損失関数はモデルタイプによって定義されます。<br>
       - `start_time`<br>
        **タイプ**: `TIMESTAMP`<br>
        **プロバイダー名**: `startTime`<br>
        **説明**: [出力のみ、ベータ版] トレーニング実行開始時刻 (エポックからのミリ秒単位)。<br>
       - `state`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `state`<br>
        **説明**: [出力のみ、ベータ版] トレーニング実行に適用される各種状態。IN PROGRESS: トレーニング実行が進行中です。FAILED: 再試行不可能な失敗によりトレーニング実行が終了しました。SUCCEEDED: トレーニング実行が正常に終了しました。CANCELLED: ユーザーによってトレーニング実行がキャンセルされました。<br>
       - `training_options`<br>
        **タイプ**: `STRUCT`<br>
        **プロバイダー名**: `trainingOptions`<br>
        **説明**: [出力のみ、ベータ版] このトレーニング実行で使用されるトレーニングオプション。これらのオプションは、次回以降のトレーニング実行時に変更可能です。最初のトレーニング実行の入力クエリで指定されなかったオプションは、デフォルト値が明示的に保存されます。それ以降のトレーニング実行では、入力クエリで明示的に指定されていないオプションは、前回のトレーニング実行のものがコピーされます。<br>
           - `early_stop`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `earlyStop`<br>
           - `l1_reg`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `l1Reg`<br>
           - `l2_reg`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `l2Reg`<br>
           - `learn_rate`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `learnRate`<br>
           - `learn_rate_strategy`<br>
            **タイプ**: `STRING`<br>
            **プロバイダー名**: `learnRateStrategy`<br>
           - `line_search_init_learn_rate`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `lineSearchInitLearnRate`<br>
           - `max_iteration`<br>
            **タイプ**: `INT64`<br>
            **プロバイダー名**: `maxIteration`<br>
           - `min_rel_progress`<br>
            **タイプ**: `DOUBLE`<br>
            **プロバイダー名**: `minRelProgress`<br>
           - `warm_start`<br>
            **タイプ**: `BOOLEAN`<br>
            **プロバイダー名**: `warmStart`<br>
## `num_active_logical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_active_logical_bytes`<br>
**説明**: [出力のみ] 90 日未満の論理バイト数。<br>
## `num_active_physical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_active_physical_bytes`<br>
**説明**: [出力のみ] 90 日未満の物理バイト数。このデータはリアルタイムで保持されているわけではなく、数秒から数分程度遅れることがあります。<br>
## `num_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `numBytes`<br>
**説明**: [出力のみ] ストリーミングバッファのデータを除いた、このテーブルのサイズ (バイト単位)。<br>
## `num_long_term_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `numLongTermBytes`<br>
**説明**: [出力のみ] テーブルの中で、"long-term storage" とみなされるバイト数。<br>
## `num_long_term_logical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_long_term_logical_bytes`<br>
**説明**: [出力のみ] 90 日超の論理バイト数。<br>
## `num_long_term_physical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_long_term_physical_bytes`<br>
**説明**: [出力のみ] 90 日超の物理バイト数。このデータはリアルタイムで保持されているわけではなく、数秒から数分程度遅れることがあります。<br>
## `num_partitions`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_partitions`<br>
**説明**: [出力のみ] テーブルまたは実体化されたビューに存在するパーティションの数。このデータはリアルタイムで保持されているわけではなく、数秒から数分遅れることがあります。<br>
## `num_physical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `numPhysicalBytes`<br>
**説明**: [出力のみ] [TrustedTester] ストリーミングバッファのデータを除いた、このテーブルの物理的なサイズ (バイト単位)。圧縮やタイムトラベルに使用されるストレージも含まれます。<br>
## `num_rows`
**タイプ**: `INT64`<br>
**プロバイダー名**: `numRows`<br>
**説明**: [出力のみ] ストリーミングバッファのデータを除いた、このテーブルのデータ行数。<br>
## `num_time_travel_physical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_time_travel_physical_bytes`<br>
**説明**: [出力のみ] タイムトラベルストレージで使用された物理バイト数 (削除されたデータ、変更されたデータ)。このデータはリアルタイムで保持されているわけではなく、数秒から数分程度遅れることがあります。<br>
## `num_total_logical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_total_logical_bytes`<br>
**説明**: [出力のみ] テーブルまたは実体化されたビューの論理バイトの総数。<br>
## `num_total_physical_bytes`
**タイプ**: `INT64`<br>
**プロバイダー名**: `num_total_physical_bytes`<br>
**説明**: [出力のみ] このテーブルの物理的なサイズ (バイト単位)。これには、タイムトラベルに使用されるストレージも含まれます。このデータはリアルタイムで保持されているわけではなく、数秒から数分程度遅れることがあります。<br>
## `organization_id`
**タイプ**: `STRING`<br>
## `parent`
**タイプ**: `STRING`<br>
## `project_id`
**タイプ**: `STRING`<br>
## `project_number`
**タイプ**: `STRING`<br>
## `range_partitioning`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `rangePartitioning`<br>
**説明**: [TrustedTester] このテーブルの範囲分割の指定。timePartitioning と rangePartitioning のどちらか一方のみを指定する必要があります。<br>
   - `field`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `field`<br>
    **説明**: [TrustedTester] [必須] テーブルはこのフィールドによって分割されます。このフィールドはトップレベルの NULLABLE/REQUIRED フィールドでなければなりません。サポートされるタイプは INTEGER/INT64 のみです。<br>
   - `range`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `range`<br>
    **説明**: [TrustedTester] [必須] 範囲分割の範囲を定義します。<br>
       - `end`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `end`<br>
        **説明**: [TrustedTester] [必須] 範囲分割の終了、排他的。<br>
       - `interval`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `interval`<br>
        **説明**: [TrustedTester] [必須] 各インターバルの幅。<br>
       - `start`<br>
        **タイプ**: `INT64`<br>
        **プロバイダー名**: `start`<br>
        **説明**: [TrustedTester] [必須] 範囲分割の開始、包含的。<br>
## `require_partition_filter`
**タイプ**: `BOOLEAN`<br>
**プロバイダー名**: `requirePartitionFilter`<br>
**説明**: [オプション] true に設定すると、このテーブルに対するクエリでは、パーティション除去に使用できるパーティションフィルターの指定が必要になります。<br>
## `resource_name`
**タイプ**: `STRING`<br>
## `schema`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `schema`<br>
**説明**: [オプション] このテーブルのスキーマを記述します。<br>

## `self_link`
**タイプ**: `STRING`<br>
**プロバイダー名**: `selfLink`<br>
**説明**: [出力のみ] このリソースに再びアクセスするために使用できる URL。<br>
## `snapshot_definition`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `snapshotDefinition`<br>
**説明**: [出力のみ] スナップショットの定義。<br>
   - `base_table_reference`<br>
    **タイプ**: `STRUCT`<br>
    **プロバイダー名**: `baseTableReference`<br>
    **説明**: [必須] スナップショットされたテーブルの ID を記述したリファレンス。<br>
       - `dataset_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `datasetId`<br>
        **説明**: [必須] このテーブルを含むデータセットの ID。<br>
       - `project_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `projectId`<br>
        **説明**: [必須] このテーブルを含むプロジェクトの ID。<br>
       - `table_id`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `tableId`<br>
        **説明**: [必須] テーブルの ID。ID には、文字 (a-z、A-Z) か数字 (0-9) かアンダースコア (_) のみを含める必要があります。最大長は 1,024 文字です。<br>
   - `snapshot_time`<br>
    **タイプ**: `TIMESTAMP`<br>
    **プロバイダー名**: `snapshotTime`<br>
    **説明**: [必須] ベーステーブルがスナップショットされた時刻。この値は、RFC3339 形式で JSON 応答に報告されます。<br>
## `streaming_buffer`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `streamingBuffer`<br>
**説明**: [出力のみ] このテーブルのストリーミングバッファ (存在する場合) に関する情報を含みます。テーブルがストリーミングされていない場合、あるいはストリーミングバッファにデータがない場合、このフィールドは存在しません。<br>
   - `estimated_bytes`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `estimatedBytes`<br>
    **説明**: [出力のみ] 現在ストリーミングバッファにあるバイト数の下限推定値。<br>
   - `estimated_rows`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `estimatedRows`<br>
    **説明**: [出力のみ] 現在ストリーミングバッファにある行数の下限推定値。<br>
   - `oldest_entry_time`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `oldestEntryTime`<br>
    **説明**: [出力のみ] ストリーミングバッファが利用可能な場合、ストリーミングバッファ内の最も古いエントリのタイムスタンプをエポックからのミリ秒単位で格納します。<br>
## `table_reference`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `tableReference`<br>
**説明**: [必須] このテーブルの ID を記述したリファレンス。<br>
   - `dataset_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `datasetId`<br>
    **説明**: [必須] このテーブルを含むデータセットの ID。<br>
   - `project_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `projectId`<br>
    **説明**: [必須] このテーブルを含むプロジェクトの ID。<br>
   - `table_id`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `tableId`<br>
    **説明**: [必須] テーブルの ID。ID には、文字 (a-z、A-Z) か数字 (0-9) かアンダースコア (_) のみを含める必要があります。最大長は 1,024 文字です。<br>
## `tags`
**タイプ**: `UNORDERED_LIST_STRING`<br>
## `time_partitioning`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `timePartitioning`<br>
**説明**: このテーブルの時間ベースの分割の指定。timePartitioning と rangePartitioning のどちらか一方のみを指定する必要があります。<br>
   - `expiration_ms`<br>
    **タイプ**: `INT64`<br>
    **プロバイダー名**: `expirationMs`<br>
    **説明**: [オプション] テーブル内のパーティションのストレージを保持するためのミリ秒数。パーティション内のストレージは、そのパーティション時間にこの値を加えた時間が有効期限となります。<br>
   - `field`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `field`<br>
    **説明**: [ベータ版] [オプション] 設定されていない場合は、'_PARTITIONTIME' (TIMESTAMP タイプ) または '_PARTITIONDATE' (DATE タイプ) で参照される疑似カラムでテーブルを分割します。フィールドが指定された場合は、そのフィールドによってテーブルが分割されます。フィールドは、トップレベルの TIMESTAMP または DATE フィールドでなければなりません。そのモードは NULLABLE または REQUIRED でなければなりません。<br>
   - `require_partition_filter`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `requirePartitionFilter`<br>
   - `type`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `type`<br>
    **説明**: [必須] サポートされているタイプは DAY、HOUR、MONTH、YEAR で、それぞれ日、時間、月、年ごとに 1 つのパーティションを生成します。タイプが指定されていない場合、デフォルトの動作は DAY です。<br>
## `type`
**タイプ**: `STRING`<br>
**プロバイダー名**: `type`<br>
**説明**: [出力のみ] テーブルの種類を記述します。以下の値がサポートされています。TABLE: 通常の BigQuery テーブル。VIEW: SQL クエリで定義された仮想テーブル。SNAPSHOT: 他のテーブルのコピーであり、不変の読み取り専用テーブル。[TrustedTester] MATERIALIZED_VIEW: 結果が永続化される SQL クエリ。EXTERNAL: Google Cloud Storage などの外部ストレージシステムに保存されたデータを参照するテーブル。デフォルトは TABLE です。<br>
## `view`
**タイプ**: `STRUCT`<br>
**プロバイダー名**: `view`<br>
**説明**: [オプション] ビューの定義。<br>
   - `query`<br>
    **タイプ**: `STRING`<br>
    **プロバイダー名**: `query`<br>
    **説明**: [必須] ビューが参照されたときに BigQuery が実行するクエリ。<br>
   - `use_explicit_column_names`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `useExplicitColumnNames`<br>
    **説明**: 列の名前が明示的に指定された場合は true。例えば、'CREATE VIEW v(c1, c2) AS ...' 構文を使用することで指定できます。BigQuery の標準 SQL (https://cloud.google.com/bigquery/sql-reference/) を使ってのみ設定可能です。<br>
   - `use_legacy_sql`<br>
    **タイプ**: `BOOLEAN`<br>
    **プロバイダー名**: `useLegacySql`<br>
    **説明**: このビューで BigQuery のレガシー SQL を使用するかどうかを指定します。デフォルトは true です。false に設定すると、このビューは BigQuery の標準 SQL (https://cloud.google.com/bigquery/sql-reference/) を使用します。このビューを参照するクエリおよびビューは、同じフラグ値を使用する必要があります。<br>
   - `user_defined_function_resources`<br>
    **タイプ**: `UNORDERED_LIST_STRUCT`<br>
    **プロバイダー名**: `userDefinedFunctionResources`<br>
    **説明**: クエリで使用するユーザー定義関数リソースを記述します。<br>
       - `inline_code`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `inlineCode`<br>
        **説明**: [1 つ選択] ユーザー定義関数 (UDF) のコードを含むインラインリソース。インラインコードリソースを提供することは、同じコードを含むファイルへの URI を提供することと同じです。<br>
       - `resource_uri`<br>
        **タイプ**: `STRING`<br>
        **プロバイダー名**: `resourceUri`<br>
        **説明**: [1 つ選択] Google Cloud Storage の URI (gs://bucket/path) からロードするコードリソース。<br>
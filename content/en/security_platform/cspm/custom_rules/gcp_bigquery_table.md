# gcp_bigquery_table





## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `clone_definition`
  **Type**: `STRUCT`<br>
  **Description**: [Output-only] Clone definition.<br>
  **GCP name**: `cloneDefinition`
   - `base_table_reference`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Required] Reference describing the ID of the table that was cloned.<br>
      **GCP name**: `baseTableReference`
       - `dataset_id`<br>
        **Type**: `STRING`<br>
            **Description**: [Required] The ID of the dataset containing this table.<br>
            **GCP name**: `datasetId`<br>
       - `project_id`<br>
        **Type**: `STRING`<br>
            **Description**: [Required] The ID of the project containing this table.<br>
            **GCP name**: `projectId`<br>
       - `table_id`<br>
        **Type**: `STRING`<br>
            **Description**: [Required] The ID of the table. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.<br>
            **GCP name**: `tableId`<br>
   - `clone_time`<br>
    **Type**: `TIMESTAMP`<br>
        **Description**: [Required] The time at which the base table was cloned. This value is reported in the JSON response using RFC3339 format.<br>
        **GCP name**: `cloneTime`<br>
## `clustering`
  **Type**: `STRUCT`<br>
  **Description**: [Beta] Clustering specification for the table. Must be specified with partitioning, data in the table will be first partitioned and subsequently clustered.<br>
  **GCP name**: `clustering`
    
## `creation_time`
**Type**: `INT64`<br>
    **Description**: [Output-only] The time when this table was created, in milliseconds since the epoch.<br>
    **GCP name**: `creationTime`<br>
## `default_collation`
**Type**: `STRING`<br>
    **Description**: [Output-only] The default collation of the table.<br>
    **GCP name**: `defaultCollation`<br>
## `description`
**Type**: `STRING`<br>
    **Description**: [Optional] A user-friendly description of this table.<br>
    **GCP name**: `description`<br>
## `encryption_configuration`
  **Type**: `STRUCT`<br>
  **Description**: Custom encryption configuration (e.g., Cloud KMS keys).<br>
  **GCP name**: `encryptionConfiguration`
   - `kms_key_name`<br>
    **Type**: `STRING`<br>
        **Description**: [Optional] Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key.<br>
        **GCP name**: `kmsKeyName`<br>
## `etag`
**Type**: `STRING`<br>
    **Description**: [Output-only] A hash of the table metadata. Used to ensure there were no concurrent modifications to the resource when attempting an update. Not guaranteed to change when the table contents or the fields numRows, numBytes, numLongTermBytes or lastModifiedTime change.<br>
    **GCP name**: `etag`<br>
## `expiration_time`
**Type**: `INT64`<br>
    **Description**: [Optional] The time when this table expires, in milliseconds since the epoch. If not present, the table will persist indefinitely. Expired tables will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created tables.<br>
    **GCP name**: `expirationTime`<br>
## `external_data_configuration`
  **Type**: `STRUCT`<br>
  **Description**: [Optional] Describes the data format, location, and other properties of a table stored outside of BigQuery. By defining these properties, the data source can then be queried as if it were a standard BigQuery table.<br>
  **GCP name**: `externalDataConfiguration`
   - `autodetect`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Try to detect schema and format options automatically. Any option specified explicitly will be honored.<br>
        **GCP name**: `autodetect`<br>
   - `avro_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: Additional properties to set if sourceFormat is set to Avro.<br>
      **GCP name**: `avroOptions`
       - `use_avro_logical_types`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER).<br>
            **GCP name**: `useAvroLogicalTypes`<br>
   - `bigtable_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Optional] Additional options if sourceFormat is set to BIGTABLE.<br>
      **GCP name**: `bigtableOptions`
       - `column_families`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: [Optional] List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable.<br>
          **GCP name**: `columnFamilies`
           - `columns`<br>
              **Type**: `UNORDERED_LIST_STRUCT`<br>
              **Description**: [Optional] Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as .. Other columns can be accessed as a list through .Column field.<br>
              **GCP name**: `columns`
               - `encoding`<br>
                **Type**: `STRING`<br>
                    **Description**: [Optional] The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. 'encoding' can also be set at the column family level. However, the setting at this level takes precedence if 'encoding' is set at both levels.<br>
                    **GCP name**: `encoding`<br>
               - `field_name`<br>
                **Type**: `STRING`<br>
                    **Description**: [Optional] If the qualifier is not a valid BigQuery field identifier i.e. does not match [a-zA-Z][a-zA-Z0-9_]*, a valid identifier must be provided as the column field name and is used as field name in queries.<br>
                    **GCP name**: `fieldName`<br>
               - `only_read_latest`<br>
                **Type**: `BOOLEAN`<br>
                    **Description**: [Optional] If this is set, only the latest version of value in this column are exposed. 'onlyReadLatest' can also be set at the column family level. However, the setting at this level takes precedence if 'onlyReadLatest' is set at both levels.<br>
                    **GCP name**: `onlyReadLatest`<br>
               - `qualifier_string`<br>
                **Type**: `STRING`<br>
               - `type`<br>
                **Type**: `STRING`<br>
                    **Description**: [Optional] The type to convert the value in cells of this column. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive) - BYTES STRING INTEGER FLOAT BOOLEAN Default type is BYTES. 'type' can also be set at the column family level. However, the setting at this level takes precedence if 'type' is set at both levels.<br>
                    **GCP name**: `type`<br>
           - `encoding`<br>
            **Type**: `STRING`<br>
                **Description**: [Optional] The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it.<br>
                **GCP name**: `encoding`<br>
           - `family_id`<br>
            **Type**: `STRING`<br>
                **Description**: Identifier of the column family.<br>
                **GCP name**: `familyId`<br>
           - `only_read_latest`<br>
            **Type**: `BOOLEAN`<br>
                **Description**: [Optional] If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column.<br>
                **GCP name**: `onlyReadLatest`<br>
           - `type`<br>
            **Type**: `STRING`<br>
                **Description**: [Optional] The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive) - BYTES STRING INTEGER FLOAT BOOLEAN Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it.<br>
                **GCP name**: `type`<br>
       - `ignore_unspecified_column_families`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false.<br>
            **GCP name**: `ignoreUnspecifiedColumnFamilies`<br>
       - `read_rowkey_as_string`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false.<br>
            **GCP name**: `readRowkeyAsString`<br>
   - `compression`<br>
    **Type**: `STRING`<br>
        **Description**: [Optional] The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups and Avro formats.<br>
        **GCP name**: `compression`<br>
   - `connection_id`<br>
    **Type**: `STRING`<br>
        **Description**: [Optional, Trusted Tester] Connection for external data source.<br>
        **GCP name**: `connectionId`<br>
   - `csv_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: Additional properties to set if sourceFormat is set to CSV.<br>
      **GCP name**: `csvOptions`
       - `allow_jagged_rows`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false.<br>
            **GCP name**: `allowJaggedRows`<br>
       - `allow_quoted_newlines`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false.<br>
            **GCP name**: `allowQuotedNewlines`<br>
       - `encoding`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] The character encoding of the data. The supported values are UTF-8 or ISO-8859-1. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties.<br>
            **GCP name**: `encoding`<br>
       - `field_delimiter`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] The separator for fields in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. BigQuery also supports the escape sequence "\t" to specify a tab separator. The default value is a comma (',').<br>
            **GCP name**: `fieldDelimiter`<br>
       - `null_marker`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] An custom string that will represent a NULL value in CSV import data.<br>
            **GCP name**: `null_marker`<br>
       - `quote`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ('"'). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true.<br>
            **GCP name**: `quote`<br>
       - `skip_leading_rows`<br>
        **Type**: `INT64`<br>
            **Description**: [Optional] The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.<br>
            **GCP name**: `skipLeadingRows`<br>
   - `decimal_target_types`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: [Optional] Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is ["NUMERIC", "BIGNUMERIC"]. If (precision,scale) is: (38,9) -> NUMERIC; (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); (76,38) -> BIGNUMERIC; (77,38) -> BIGNUMERIC (error if value exeeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, ["BIGNUMERIC", "NUMERIC"] is the same as ["NUMERIC", "BIGNUMERIC"] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to ["NUMERIC", "STRING"] for ORC and ["NUMERIC"] for the other file formats.<br>
        **GCP name**: `decimalTargetTypes`<br>
   - `google_sheets_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Optional] Additional options if sourceFormat is set to GOOGLE_SHEETS.<br>
      **GCP name**: `googleSheetsOptions`
       - `range`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20<br>
            **GCP name**: `range`<br>
       - `skip_leading_rows`<br>
        **Type**: `INT64`<br>
            **Description**: [Optional] The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, behavior is the following: * skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. * skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. * skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema.<br>
            **GCP name**: `skipLeadingRows`<br>
   - `hive_partitioning_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Optional] Options to configure hive partitioning support.<br>
      **GCP name**: `hivePartitioningOptions`
       - `mode`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] When set, what mode of hive partitioning to use when reading data. The following modes are supported. (1) AUTO: automatically infer partition key name(s) and type(s). (2) STRINGS: automatically infer partition key name(s). All types are interpreted as strings. (3) CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported types include: AVRO, CSV, JSON, ORC and Parquet.<br>
            **GCP name**: `mode`<br>
       - `require_partition_filter`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with requirePartitionFilter explicitly set to true will fail.<br>
            **GCP name**: `requirePartitionFilter`<br>
       - `source_uri_prefix`<br>
        **Type**: `STRING`<br>
            **Description**: [Optional] When hive partition detection is requested, a common prefix for all source uris should be supplied. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout. gs://bucket/path_to_table/dt=2019-01-01/country=BR/id=7/file.avro gs://bucket/path_to_table/dt=2018-12-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/ (trailing slash does not matter).<br>
            **GCP name**: `sourceUriPrefix`<br>
   - `ignore_unknown_values`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: [Optional] Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored.<br>
        **GCP name**: `ignoreUnknownValues`<br>
   - `max_bad_records`<br>
    **Type**: `INT32`<br>
        **Description**: [Optional] The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. This is only valid for CSV, JSON, and Google Sheets. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups and Avro formats.<br>
        **GCP name**: `maxBadRecords`<br>
   - `parquet_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: Additional properties to set if sourceFormat is set to Parquet.<br>
      **GCP name**: `parquetOptions`
       - `enable_list_inference`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] Indicates whether to use schema inference specifically for Parquet LIST logical type.<br>
            **GCP name**: `enableListInference`<br>
       - `enum_as_string`<br>
        **Type**: `BOOLEAN`<br>
            **Description**: [Optional] Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default.<br>
            **GCP name**: `enumAsString`<br>
   - `schema`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Optional] The schema for the data. Schema is required for CSV and JSON formats. Schema is disallowed for Google Cloud Bigtable, Cloud Datastore backups, and Avro formats.<br>
      **GCP name**: `schema`
        
   - `source_format`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". [Beta] For Google Cloud Bigtable, specify "BIGTABLE".<br>
        **GCP name**: `sourceFormat`<br>
   - `source_uris`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
        **Description**: [Required] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '*' wildcard character is not allowed.<br>
        **GCP name**: `sourceUris`<br>
## `friendly_name`
**Type**: `STRING`<br>
    **Description**: [Optional] A descriptive name for this table.<br>
    **GCP name**: `friendlyName`<br>
## `id`
**Type**: `STRING`<br>
    **Description**: [Output-only] An opaque ID uniquely identifying the table.<br>
    **GCP name**: `id`<br>
## `kind`
**Type**: `STRING`<br>
    **Description**: [Output-only] The type of the resource.<br>
    **GCP name**: `kind`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `last_modified_time`
**Type**: `INT64`<br>
    **Description**: [Output-only] The time when this table was last modified, in milliseconds since the epoch.<br>
    **GCP name**: `lastModifiedTime`<br>
## `location`
**Type**: `STRING`<br>
    **Description**: [Output-only] The geographic location where the table resides. This value is inherited from the dataset.<br>
    **GCP name**: `location`<br>
## `materialized_view`
  **Type**: `STRUCT`<br>
  **Description**: [Optional] Materialized view definition.<br>
  **GCP name**: `materializedView`
   - `enable_refresh`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: [Optional] [TrustedTester] Enable automatic refresh of the materialized view when the base table is updated. The default value is "true".<br>
        **GCP name**: `enableRefresh`<br>
   - `last_refresh_time`<br>
    **Type**: `INT64`<br>
        **Description**: [Output-only] [TrustedTester] The time when this materialized view was last modified, in milliseconds since the epoch.<br>
        **GCP name**: `lastRefreshTime`<br>
   - `query`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] A query whose result is persisted.<br>
        **GCP name**: `query`<br>
   - `refresh_interval_ms`<br>
    **Type**: `INT64`<br>
        **Description**: [Optional] [TrustedTester] The maximum frequency at which this materialized view will be refreshed. The default value is "1800000" (30 minutes).<br>
        **GCP name**: `refreshIntervalMs`<br>
## `model`
  **Type**: `STRUCT`<br>
  **Description**: [Output-only, Beta] Present iff this table represents a ML model. Describes the training information for the model, and it is required to run 'PREDICT' queries.<br>
  **GCP name**: `model`
   - `model_options`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Output-only, Beta] Model options used for the first training run. These options are immutable for subsequent training runs. Default values are used for any options not specified in the input query.<br>
      **GCP name**: `modelOptions`
       - `loss_type`<br>
        **Type**: `STRING`<br>
       - `model_type`<br>
        **Type**: `STRING`<br>
   - `training_runs`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: [Output-only, Beta] Information about ml training runs, each training run comprises of multiple iterations and there may be multiple training runs for the model if warm start is used or if a user decides to continue a previously cancelled query.<br>
      **GCP name**: `trainingRuns`
       - `iteration_results`<br>
          **Type**: `UNORDERED_LIST_STRUCT`<br>
          **Description**: [Output-only, Beta] List of each iteration results.<br>
          **GCP name**: `iterationResults`
           - `duration_ms`<br>
            **Type**: `INT64`<br>
                **Description**: [Output-only, Beta] Time taken to run the training iteration in milliseconds.<br>
                **GCP name**: `durationMs`<br>
           - `eval_loss`<br>
            **Type**: `DOUBLE`<br>
                **Description**: [Output-only, Beta] Eval loss computed on the eval data at the end of the iteration. The eval loss is used for early stopping to avoid overfitting. No eval loss if eval_split_method option is specified as no_split or auto_split with input data size less than 500 rows.<br>
                **GCP name**: `evalLoss`<br>
           - `index`<br>
            **Type**: `INT32`<br>
                **Description**: [Output-only, Beta] Index of the ML training iteration, starting from zero for each training run.<br>
                **GCP name**: `index`<br>
           - `learn_rate`<br>
            **Type**: `DOUBLE`<br>
                **Description**: [Output-only, Beta] Learning rate used for this iteration, it varies for different training iterations if learn_rate_strategy option is not constant.<br>
                **GCP name**: `learnRate`<br>
           - `training_loss`<br>
            **Type**: `DOUBLE`<br>
                **Description**: [Output-only, Beta] Training loss computed on the training data at the end of the iteration. The training loss function is defined by model type.<br>
                **GCP name**: `trainingLoss`<br>
       - `start_time`<br>
        **Type**: `TIMESTAMP`<br>
            **Description**: [Output-only, Beta] Training run start time in milliseconds since the epoch.<br>
            **GCP name**: `startTime`<br>
       - `state`<br>
        **Type**: `STRING`<br>
            **Description**: [Output-only, Beta] Different state applicable for a training run. IN PROGRESS: Training run is in progress. FAILED: Training run ended due to a non-retryable failure. SUCCEEDED: Training run successfully completed. CANCELLED: Training run cancelled by the user.<br>
            **GCP name**: `state`<br>
       - `training_options`<br>
          **Type**: `STRUCT`<br>
          **Description**: [Output-only, Beta] Training options used by this training run. These options are mutable for subsequent training runs. Default values are explicitly stored for options not specified in the input query of the first training run. For subsequent training runs, any option not explicitly specified in the input query will be copied from the previous training run.<br>
          **GCP name**: `trainingOptions`
           - `early_stop`<br>
            **Type**: `BOOLEAN`<br>
           - `l1_reg`<br>
            **Type**: `DOUBLE`<br>
           - `l2_reg`<br>
            **Type**: `DOUBLE`<br>
           - `learn_rate`<br>
            **Type**: `DOUBLE`<br>
           - `learn_rate_strategy`<br>
            **Type**: `STRING`<br>
           - `line_search_init_learn_rate`<br>
            **Type**: `DOUBLE`<br>
           - `max_iteration`<br>
            **Type**: `INT64`<br>
           - `min_rel_progress`<br>
            **Type**: `DOUBLE`<br>
           - `warm_start`<br>
            **Type**: `BOOLEAN`<br>
## `num_active_logical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] Number of logical bytes that are less than 90 days old.<br>
    **GCP name**: `num_active_logical_bytes`<br>
## `num_active_physical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] Number of physical bytes less than 90 days old. This data is not kept in real time, and might be delayed by a few seconds to a few minutes.<br>
    **GCP name**: `num_active_physical_bytes`<br>
## `num_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] The size of this table in bytes, excluding any data in the streaming buffer.<br>
    **GCP name**: `numBytes`<br>
## `num_long_term_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] The number of bytes in the table that are considered "long-term storage".<br>
    **GCP name**: `numLongTermBytes`<br>
## `num_long_term_logical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] Number of logical bytes that are more than 90 days old.<br>
    **GCP name**: `num_long_term_logical_bytes`<br>
## `num_long_term_physical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] Number of physical bytes more than 90 days old. This data is not kept in real time, and might be delayed by a few seconds to a few minutes.<br>
    **GCP name**: `num_long_term_physical_bytes`<br>
## `num_partitions`
**Type**: `INT64`<br>
    **Description**: [Output-only] The number of partitions present in the table or materialized view. This data is not kept in real time, and might be delayed by a few seconds to a few minutes.<br>
    **GCP name**: `num_partitions`<br>
## `num_physical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] [TrustedTester] The physical size of this table in bytes, excluding any data in the streaming buffer. This includes compression and storage used for time travel.<br>
    **GCP name**: `numPhysicalBytes`<br>
## `num_rows`
**Type**: `INT64`<br>
    **Description**: [Output-only] The number of rows of data in this table, excluding any data in the streaming buffer.<br>
    **GCP name**: `numRows`<br>
## `num_time_travel_physical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] Number of physical bytes used by time travel storage (deleted or changed data). This data is not kept in real time, and might be delayed by a few seconds to a few minutes.<br>
    **GCP name**: `num_time_travel_physical_bytes`<br>
## `num_total_logical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] Total number of logical bytes in the table or materialized view.<br>
    **GCP name**: `num_total_logical_bytes`<br>
## `num_total_physical_bytes`
**Type**: `INT64`<br>
    **Description**: [Output-only] The physical size of this table in bytes. This also includes storage used for time travel. This data is not kept in real time, and might be delayed by a few seconds to a few minutes.<br>
    **GCP name**: `num_total_physical_bytes`<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `range_partitioning`
  **Type**: `STRUCT`<br>
  **Description**: [TrustedTester] Range partitioning specification for this table. Only one of timePartitioning and rangePartitioning should be specified.<br>
  **GCP name**: `rangePartitioning`
   - `field`<br>
    **Type**: `STRING`<br>
        **Description**: [TrustedTester] [Required] The table is partitioned by this field. The field must be a top-level NULLABLE/REQUIRED field. The only supported type is INTEGER/INT64.<br>
        **GCP name**: `field`<br>
   - `range`<br>
      **Type**: `STRUCT`<br>
      **Description**: [TrustedTester] [Required] Defines the ranges for range partitioning.<br>
      **GCP name**: `range`
       - `end`<br>
        **Type**: `INT64`<br>
            **Description**: [TrustedTester] [Required] The end of range partitioning, exclusive.<br>
            **GCP name**: `end`<br>
       - `interval`<br>
        **Type**: `INT64`<br>
            **Description**: [TrustedTester] [Required] The width of each interval.<br>
            **GCP name**: `interval`<br>
       - `start`<br>
        **Type**: `INT64`<br>
            **Description**: [TrustedTester] [Required] The start of range partitioning, inclusive.<br>
            **GCP name**: `start`<br>
## `require_partition_filter`
**Type**: `BOOLEAN`<br>
    **Description**: [Optional] If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified.<br>
    **GCP name**: `requirePartitionFilter`<br>
## `resource_name`
**Type**: `STRING`<br>
## `schema`
  **Type**: `STRUCT`<br>
  **Description**: [Optional] Describes the schema of this table.<br>
  **GCP name**: `schema`
    
## `self_link`
**Type**: `STRING`<br>
    **Description**: [Output-only] A URL that can be used to access this resource again.<br>
    **GCP name**: `selfLink`<br>
## `snapshot_definition`
  **Type**: `STRUCT`<br>
  **Description**: [Output-only] Snapshot definition.<br>
  **GCP name**: `snapshotDefinition`
   - `base_table_reference`<br>
      **Type**: `STRUCT`<br>
      **Description**: [Required] Reference describing the ID of the table that was snapshot.<br>
      **GCP name**: `baseTableReference`
       - `dataset_id`<br>
        **Type**: `STRING`<br>
            **Description**: [Required] The ID of the dataset containing this table.<br>
            **GCP name**: `datasetId`<br>
       - `project_id`<br>
        **Type**: `STRING`<br>
            **Description**: [Required] The ID of the project containing this table.<br>
            **GCP name**: `projectId`<br>
       - `table_id`<br>
        **Type**: `STRING`<br>
            **Description**: [Required] The ID of the table. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.<br>
            **GCP name**: `tableId`<br>
   - `snapshot_time`<br>
    **Type**: `TIMESTAMP`<br>
        **Description**: [Required] The time at which the base table was snapshot. This value is reported in the JSON response using RFC3339 format.<br>
        **GCP name**: `snapshotTime`<br>
## `streaming_buffer`
  **Type**: `STRUCT`<br>
  **Description**: [Output-only] Contains information regarding this table's streaming buffer, if one is present. This field will be absent if the table is not being streamed to or if there is no data in the streaming buffer.<br>
  **GCP name**: `streamingBuffer`
   - `estimated_bytes`<br>
    **Type**: `INT64`<br>
        **Description**: [Output-only] A lower-bound estimate of the number of bytes currently in the streaming buffer.<br>
        **GCP name**: `estimatedBytes`<br>
   - `estimated_rows`<br>
    **Type**: `INT64`<br>
        **Description**: [Output-only] A lower-bound estimate of the number of rows currently in the streaming buffer.<br>
        **GCP name**: `estimatedRows`<br>
   - `oldest_entry_time`<br>
    **Type**: `INT64`<br>
        **Description**: [Output-only] Contains the timestamp of the oldest entry in the streaming buffer, in milliseconds since the epoch, if the streaming buffer is available.<br>
        **GCP name**: `oldestEntryTime`<br>
## `table_reference`
  **Type**: `STRUCT`<br>
  **Description**: [Required] Reference describing the ID of this table.<br>
  **GCP name**: `tableReference`
   - `dataset_id`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] The ID of the dataset containing this table.<br>
        **GCP name**: `datasetId`<br>
   - `project_id`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] The ID of the project containing this table.<br>
        **GCP name**: `projectId`<br>
   - `table_id`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] The ID of the table. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters.<br>
        **GCP name**: `tableId`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `time_partitioning`
  **Type**: `STRUCT`<br>
  **Description**: Time-based partitioning specification for this table. Only one of timePartitioning and rangePartitioning should be specified.<br>
  **GCP name**: `timePartitioning`
   - `expiration_ms`<br>
    **Type**: `INT64`<br>
        **Description**: [Optional] Number of milliseconds for which to keep the storage for partitions in the table. The storage in a partition will have an expiration time of its partition time plus this value.<br>
        **GCP name**: `expirationMs`<br>
   - `field`<br>
    **Type**: `STRING`<br>
        **Description**: [Beta] [Optional] If not set, the table is partitioned by pseudo column, referenced via either '_PARTITIONTIME' as TIMESTAMP type, or '_PARTITIONDATE' as DATE type. If field is specified, the table is instead partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED.<br>
        **GCP name**: `field`<br>
   - `require_partition_filter`<br>
    **Type**: `BOOLEAN`<br>
   - `type`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively. When the type is not specified, the default behavior is DAY.<br>
        **GCP name**: `type`<br>
## `type`
**Type**: `STRING`<br>
    **Description**: [Output-only] Describes the table type. The following values are supported: TABLE: A normal BigQuery table. VIEW: A virtual table defined by a SQL query. SNAPSHOT: An immutable, read-only table that is a copy of another table. [TrustedTester] MATERIALIZED_VIEW: SQL query whose result is persisted. EXTERNAL: A table that references data stored in an external storage system, such as Google Cloud Storage. The default value is TABLE.<br>
    **GCP name**: `type`<br>
## `view`
  **Type**: `STRUCT`<br>
  **Description**: [Optional] The view definition.<br>
  **GCP name**: `view`
   - `query`<br>
    **Type**: `STRING`<br>
        **Description**: [Required] A query that BigQuery executes when the view is referenced.<br>
        **GCP name**: `query`<br>
   - `use_explicit_column_names`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: True if the column names are explicitly specified. For example by using the 'CREATE VIEW v(c1, c2) AS ...' syntax. Can only be set using BigQuery's standard SQL: https://cloud.google.com/bigquery/sql-reference/<br>
        **GCP name**: `useExplicitColumnNames`<br>
   - `use_legacy_sql`<br>
    **Type**: `BOOLEAN`<br>
        **Description**: Specifies whether to use BigQuery's legacy SQL for this view. The default value is true. If set to false, the view will use BigQuery's standard SQL: https://cloud.google.com/bigquery/sql-reference/ Queries and views that reference this view must use the same flag value.<br>
        **GCP name**: `useLegacySql`<br>
   - `user_defined_function_resources`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: Describes user-defined function resources used in the query.<br>
      **GCP name**: `userDefinedFunctionResources`
       - `inline_code`<br>
        **Type**: `STRING`<br>
            **Description**: [Pick one] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code.<br>
            **GCP name**: `inlineCode`<br>
       - `resource_uri`<br>
        **Type**: `STRING`<br>
            **Description**: [Pick one] A code resource to load from a Google Cloud Storage URI (gs://bucket/path).<br>
            **GCP name**: `resourceUri`<br>

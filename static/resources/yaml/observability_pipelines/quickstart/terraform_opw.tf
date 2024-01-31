module "opw" {
    source     = "https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    pipeline-config = <<EOT
## SOURCES: Data sources that Observability Pipelines Worker collects data from.
## For a Datadog use case, we will receive data from the Datadog agent.
sources:
  datadog_agent:
    address: 0.0.0.0:8282
    type: datadog_agent
    multiple_outputs: true

transforms:
  ## The Datadog Agent natively encodes its tags as a comma-separated list
  ## of values that are stored in the string `.ddtags`. To work with
  ## and filter off of these tags, you need to parse that string into
  ## more structured data.
  logs_parse_ddtags:
    type: remap
    inputs:
      - datadog_agent.logs
    source: |
      .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  ## The `.status` attribute added by the Datadog Agent needs to be deleted, otherwise
  ## your logs can be miscategorized at intake.
  logs_remove_wrong_level:
    type: remap
    inputs:
      - logs_parse_ddtags
    source: |
      del(.status)

  ## This is a placeholder for your own remap (or other transform)
  ## steps with tags set up. Datadog recommends these tag assignments.
  ## They show which data has been moved over to OP and what still needs
  ## to be moved.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - logs_remove_wrong_level
    source: |
      .ddtags.sender = "observability_pipelines_worker"
      .ddtags.opw_aggregator = get_hostname!()

  ## Before sending data to the logs intake, you must re-encode the
  ## tags into the expected format, so that it appears as if the Agent is
  ## sending it directly.
  logs_finish_ddtags:
    type: remap
    inputs:
      - LOGS_YOUR_STEPS
    source: |
      .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  metrics_add_dd_tags:
    type: remap
    inputs:
      - datadog_agent.metrics
    source: |
      .tags.sender = "observability_pipelines_worker"
      .tags.opw_aggregator = get_hostname!()

## SINKS: Data output destinations
## datadog_logs: Ship logs to Datadog Log Management
## datadog_metrics: Publish metric events to Datadog
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - logs_finish_ddtags
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    ## We've omitted the disk buffer here to simplify quickstart setup.
    ## Consider re-enabling and configuring before deploying to production environments.
    ## The disk buffer size is currently set to 240GB.
    #buffer:
    #   type: disk
    #   max_size: 257698037760
  datadog_metrics:
    type: datadog_metrics
    inputs:
      - metrics_add_dd_tags
    default_api_key: "$${DD_API_KEY}"
    ## We've omitted the disk buffer to simplify quickstart setup.
    ## Consider re-enabling and configuring before deploying to production environments.
    ## The disk buffer size is currently set to 48GB.
    #buffer:
    #  type: disk
    #  max_size: 51539607552
EOT
}

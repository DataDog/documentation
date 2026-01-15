---
title: Get Started with the Custom Processor
disable_toc: false
further_reading:
- link: "/observability_pipelines/processors/custom_processor/"
  tag: "Documentation"
  text: "Learn more about the Custom Processor"
- link: "/observability_pipelines/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: "https://www.datadoghq.com/blog/migrate-historical-logs/"
  tag: "Blog"
  text: "Migrate historical logs from Splunk and Elasticsearch using Observability Pipelines"
---

## Overview

Observability Pipelines enables you to transform your logs before sending them to your destinations. Use the Custom Processor to create scripts with custom functions that conditionally modify log fields, values, and events.

This guide walks you through how to use the following functions in your Custom Processor script:

- [Decode Base64](#decode-base64)
- [Decode an entire Base64 event](#decode-an-entire-base64-encoded-event)
- [Encode Base64](#encode-base64)

It also goes over example scripts that address common use cases, such as:

- [Remap timestamps for historical logs](#remap-timestamps-for-historical-logs)
- [Extract a field from the Datadog tags array (`ddtags`)](#extract-a-field-from-the-datadog-tags-array)
- [Reference another field's value](#reference-another-fields-value)
- [Remove attributes containing null values](#remove-attributes-containing-null-values)
- [Merge nested attributes to root level](#merge-nested-attributes-to-root-level)
- [Serialize outbound logs in _raw format](#serialize-outbound-logs-in-_raw-format)
- [Append tags to Datadog logs](#append-tags-to-datadog-logs)

## Decode Base64

For incoming log fields or events encoded in Base64, use the [`decode_base64`][1] function to decode the field or event. This function's syntax also works for [`decode_base16`][1].

### Example

#### Input

Example log event containing a Base64 field to decode:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ=="
}
```

#### Custom function

Use the `decode_base64` function to decode `payload` and store the result in a new field called `decoded_payload`.

```yaml
.decoded_payload = decode_base64!(.payload)
```


Alternatively, you can rewrite the original `payload` value with the decoded value by replacing `decoded_payload` in the previous function with `payload`.

```yaml
.payload = decode_base64!(.payload)
```

#### Output

The output when you use `decoded_payload` to store the decoded value.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "payload": "VXNlciByZXF1ZXN0ZWQgYWNjZXNzIHRvIHByb3RlY3RlZCByZXNvdXJjZQ==",
    "decoded_payload": "User requested access to protected resource"
}
```

## Decode an entire Base64-encoded event

### Example

#### Input

Example input of an event encoded in Base64:

```json
{
    "raw": "eyJ0aW1lc3RhbXAiOiAiMjAyNS0wNS0yOFQxOTozMDowMFoiLCAibGV2ZWwiOiAiaW5mbyIsICJtessagemIjogIlVzZXIgbG9naW4gc3VjY2Vzc2Z1bCJ9"
}
```

#### Custom function

The script to decode the entire Base64-encoded event `raw`.

```yaml
.json_string = decode_base64!(.raw)`
.full_event = parse_json!(.json_string)
. = .full_event
```

**Note:** The syntax `. = .full_event` is shorthand for replacing the entire event with the contents of a field.

#### Output

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Encode Base64

For outgoing log fields or events that you want to encode in Base64, use the [`encode_base64`][2] function to encode the field or event. This function's syntax also works for [`encode_base16`][3].

### Example

#### Input

Example log event containing the `message` field that you want to encode in Base64:

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "user_id": "user_9876",
    "message": "User login successful"
}
```

#### Custom function

Use the `encode_base64` function to decode `message` and store the result in a new field called `encoded_message`.

```yaml
.encoded_message = encode_base64!(.message)
```

Alternatively, you can overwrite the original message field (`message`) with the decoded value by replacing `encoded_message` in the previous function with `message`.

```yaml
.message = encode_base64!(.message)
```

#### Output

The output when you use `encoded_message` to store the encoded value.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "level": "info",
    "source": "auth-service",
    "message": "User login successful",
    "encoded_message": "VXNlciBsb2dpbiBzdWNjZXNzZnVs"
}
```

## Remap timestamps for historical logs

If you want to migrate archived logs from other platforms, ensuring those logs have the correct historical timestamp is essential. Remapping logs with historical timestamps enables you to handle older logs stored for compliance, audit, and archive purposes.

### Example

#### Input

If the Worker does not find the `timestamp` field on a log, the timestamp of when the Worker received the log is used. This is an example of a log showing the timestamp of when the Worker received the log, as well as the log's historical timestamp (`historical_ts`), which is the value that the Worker is looking for.

```json
{
    "timestamp": "2025-05-28T19:30:00Z",
    "historical_ts": "2019-03-14T17:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

#### Custom function

For the above example, you can create a function to store the ingested timestamp in a new field and remap `timestamp` to the `historical_ts` value.

```yaml
#Create a new field for the ingested/processed timestamp
.ingested_ts = {{.timestamp}}

#Remap timestamp to be the historical field
.timestamp = {{.historical_ts}}

#Remove the original historical timestamp
del(.historical_ts)

```

#### Output

```json
{
    "timestamp": "2019-03-14T17:30:00Z",
    "ingested_ts": "2025-05-28T19:30:00Z",
    "level": "info",
    "message": "User login successful"
}
```

## Extract a field from the Datadog tags array

Fields nested within the Datadog tags (`ddtags`) array can contain useful information. You may want to extract these fields as top level key-value pairs, or as values for other fields.

### Example

#### Input

Sample log containing the `ddtags` array with Datadog tags.

```json
{
    "timestamp": "2025-005-27T05:26:18.205Z",
    "status": "info",
    "service": "chaos-engineering",
    "ddsource": "python",
    "hostname": "gke-prod-node-abc123.internal",
    "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
    "source_type": "datadog_agent",
    "ddtags": [
        "env:prod",
        "team:sre",
        "service:chaos-engineering",
        "version:1.0.0",
        "pod_name:load-generator-main-abcde"
    ]
}
```

#### Custom function to extract the env field

```yaml
#Extract a tag from ddtags array and elevate as log attribute
.my_tag, err = filter(array!(.ddtags)) -> |_index, value| {
    #Keep any elements that have the key name "env"
    starts_with(value, "env:")
}
#Assign env to be value of the key
.env = split!(.my_tag[0], ":")[1]
del(.my_tag)

```

#### Output

```json
{
   "ddsource": "python",
   "ddtags": [
       "env:prod",
       "team:sre",
       "service:chaos-engineering",
       "version:1.0.0",
       "pod_name:load-generator-main-abcde"
   ],
   "env": "prod",
   "hostname": "gke-prod-node-abc123.internal",
   "message": "2025-05-27 05:26:17,609 -- Sending request to rails: checkout_v2",
   "service": "chaos-engineering",
   "source_type": "datadog_agent",
   "status": "info",
   "timestamp": "2025-005-27T05:26:18.205Z"
}
```

## Reference another field's value

If you want a field's value to be based on another field, you can dynamically reference the other field's value.

### Example

#### Input

For this example, you have a service field that contains an incorrect service name, and you want to use the value of `app_id` for the service instead.

```json
{
    "timestamp": "2025-05-27T05:26:18.205Z",
    "status": "info",
    "service": "mywrongservice",
    "app_id": "web-store"
}
```

#### Custom function

```yaml
#Overwrite service to be the value of app_id
.service = {{.app_id}}
```

#### Output

```json
{
  "timestamp": "2025-05-27T05:26:18.205Z",
  "status": "info",
  "service": "web-store",
  "app_id": "web-store"
}
```

## Remove attributes containing null values

Attributes with null or empty values can add unnecessary bloat to your logs. Remove null values to trim the log and only send attributes that provide information. In the script below, the `empty_patterns` section contains the list of empty patterns to check for in your logs. You can add and remove patterns to fit your use case.

```json
# Define your empty patterns
empty_patterns = ["null", "NULL", "N/A", "n/a", "none", "NONE", "-", "undefined"]

# Apply generic cleanup
. = compact(map_values(., recursive: true) -> |v| {
 if is_null(v) ||
    includes(empty_patterns, v) ||
    (is_string(v) && strip_whitespace!(v) == "") ||
    (is_array(v) && length!(v) == 0) ||
    (is_object(v) && length!(v) == 0) {
   null
 } else {
   v
 }
})
```

## Merge nested attributes to root level

Targeting nested objects or fields in a filter query may require you to define multiple paths. This is common when working with the message field, where the resulting parsed contents are nested in an object. When you use the Observability Pipelines' filter syntax, accessing a nested field requires the `<OUTER_PATH>.<INNER_PATH>` notation.

For example, this log contains a stringified JSON message:

```json
{
 "level": "info",
 "message": "{\"event_type\":\"user_login\",\"result\":\"success\",\"login_method\":\"oauth\",\"user_agent\":\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\",\"ip_address\":\"192.168.1.100\",\"session_id\":\"sess_abc123xyz\",\"duration_ms\":245}",
 "timestamp": "2019-03-12T11:30:00Z",
 "processed_ts": "2025-05-22T14:30:00Z",
 "user_id": "12345",
 "app_id": "streaming-services",
 "ddtags": [
   "kube_service:my-service",
   "k8_deployment:your-host",
   "kube_cronjob:myjob"
 ]
}
```

This is the output after the `message` field has been parsed. The parsed content is nested in the `message` object.

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```
In this case, to filter for `event_type`, you need to specify `@message.event_type`. To directly filter for `event_type` or another field within an object, Datadog recommends flattening the object to the root level.

To merge the events from the `message` object to root level, use this script:

```json
if is_object(.message) {
 . = merge!(., .message)
 del(.message)
}
```

**Note**: This script works with any JSON object. You just need to replace the `message` attribute with the name of the field you are trying to flatten.

This results in the log with flattened attributes that you can filter directly:

```json
{
   "app_id": "streaming-services",
   "ddtags": [
       "kube_service:my-service",
       "k8_deployment:your-host",
       "kube_cronjob:myjob"
   ],
   "duration_ms": 245,
   "event_type": "user_login",
   "ip_address": "192.168.1.100",
   "level": "info",
   "login_method": "oauth",
   "processed_ts": "2025-05-22T14:30:00Z",
   "result": "success",
   "session_id": "sess_abc123xyz",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
   "user_id": "12345"
}
```

**Note**: If you flatten the message field, the resulting log no longer has a message object. This means if the log is sent to Datadog, when you view the log in Log Explorer, you will not see a **Log Message** section in the log side panel.

## Serialize outbound logs in _raw format

Splunk and CrowdStrike prefer a format called `_raw` for log ingestion. Sending data in `_raw` normalizes your logs and allows you to benefit from their out-of-the-box dashboards, monitors, and threat detection content. To ensure the `_raw` log format gets applied, you can serialize the outbound event in `_raw`.

**Notes**:
- You should add other processing, remapping, and parsing steps before serializing your logs in `_raw` format.
- To ensure your logs are correctly routed after serialization, configure your preferred destination with **Raw** as the encoding type. 

An example input log:

```json
{
   "app_id": "streaming-services",
   "level": "info",
   "message": {
       "duration_ms": 245,
       "event_type": "user_login",
       "ip_address": "192.168.1.100",
       "login_method": "oauth",
       "result": "success",
       "session_id": "sess_abc123xyz",
       "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
   },
   "processed_ts": "2025-05-22T14:30:00Z",
   "timestamp": "2019-03-12T11:30:00Z",
   "user_id": "12345"
}
```

This custom function serializes the event into `_raw` format:

```json
# Serialize the entire event into _raw
._raw = encode_key_value!(.)
# Only keep _raw
. = { "_raw": ._raw }
```

This is the output of the example log after it's been processed by the custom script:

```json
{
   "_raw": "app_id=streaming-services level=info message.duration_ms=245 message.event_type=user_login message.ip_address=192.168.1.100 message.login_method=oauth message.result=success message.session_id=sess_abc123xyz message.user_agent=\"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36\" processed_ts=2025-05-22T14:30:00Z timestamp=2019-03-12T11:30:00Z user_id=12345"
}
```

## Append tags to Datadog logs

You can use the custom processor to append tags to your Datadog logs. For example, if you want to the add the tag `system:service-mesh` to `ddtag`, use the following custom function:

```
If !exists(.ddtags) {
  .ddtag = []
}
  .ddtags = push(array!(.ddtags), "system:service-mesh")
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/processors/custom_processor/#decode_base16
[2]: /observability_pipelines/processors/custom_processor/#encode_base64
[3]: /observability_pipelines/processors/custom_processor/#encode_base16

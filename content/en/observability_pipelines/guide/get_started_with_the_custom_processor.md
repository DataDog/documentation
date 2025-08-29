---
title: Get Started with the Custom Processor
disable_toc: false
further_reading:
- link: "observability_pipelines/processors/custom_processor/"
  tag: "Documentation"
  text: "Learn more about the Custom Processor"
- link: "observability_pipelines/set_up_pipelines/"
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/processors/custom_processor/#decode_base16
[2]: /observability_pipelines/processors/custom_processor/#encode_base64
[3]: /observability_pipelines/processors/custom_processor/#encode_base16

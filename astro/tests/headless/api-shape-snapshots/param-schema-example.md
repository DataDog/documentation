<!-- param-schema-example: /api/latest/rendering-shapes/delete-rum-replay-playlist/ -->

### Arguments

#### Path Parameters

| Field                    | Type    | Description                        |
| ------------------------ | ------- | ---------------------------------- |
| playlist_id [*required*] | integer | Unique identifier of the playlist. |

{% tab label="Curl" %}
```bash
# Path parameters
export playlist_id="1234567"

# Set your Datadog site and credentials
export DD_SITE="datadoghq.com" # Or us3.datadoghq.com, us5.datadoghq.com, datadoghq.eu, ap1.datadoghq.com, ap2.datadoghq.com, ddog-gov.com
export DD_API_KEY="<DD_API_KEY>"
export DD_APP_KEY="<DD_APP_KEY>"

curl -X DELETE "https://api.${DD_SITE}/api/v2/rum/replay/playlists/${playlist_id}" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```
{% /tab %}

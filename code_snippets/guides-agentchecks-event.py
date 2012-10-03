{
    "timestamp": int, the epoch timestamp for the event,
    "event_type": string, the event time name,
    "api_key": string, the api key of the account to associate the event with,
    "msg_title": string, the title of the event,
    "msg_text": string, the text body of the event,
    "aggregation_key": string, a key to aggregate events on,
    "alert_type": (optional) string, one of ('error', 'warning', 'success', 'info').
        Defaults to 'info'.
    "source_type_name": (optional) string, the source type name,
    "host": (optional) string, the name of the host,
    "tags": (optional) list, a list of tags to associate with this event
}
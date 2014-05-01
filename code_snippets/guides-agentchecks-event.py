{
    "timestamp": int, the epoch timestamp for the event,
    "event_type": string, the event name,
    "api_key": string, the api key for your account,
    "msg_title": string, the title of the event,
    "msg_text": string, the text body of the event,
    "aggregation_key": string, a key to use for aggregating events,
    "alert_type": (optional) string, one of ('error', 'warning', 'success', 'info');
        defaults to 'info',
    "source_type_name": (optional) string, the source type name,
    "host": (optional) string, the name of the host,
    "tags": (optional) list, a list of tags to associate with this event
}

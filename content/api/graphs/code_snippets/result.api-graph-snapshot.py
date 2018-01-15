{
    'graph_def': {"viz": "timeseries", "requests": [{"q": "avg:system.load.1{*}", "conditional_formats": [], "type": "line"}, {"q": "avg:system.load.5{*}", "type": "line"}, {"q": "avg:system.load.15{*}", "type": "line"}], "events": [{"q": "hosts:* ", "tags_execution": "and"}]}',
    'metric_query': 'system.load.1{*}',
    'snapshot_url': 'https://s3.amazonaws.com/dd-snapshots-prod/org_1499/2013-07-19/2459d291fc021c84f66aac3a87251b6c92b589da.png'
}

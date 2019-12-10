{
  "data": [
    {
      "id": '12341234123412341234123412341234',
      "description": 'Track the uptime of host foo which is critical to the core business.',
      "name": 'Critical Foo Host Uptime',
      "tags": ['app:core', 'kpi'],
      "type": 'monitor',
      "type_id": 0,
      "monitor_ids": [42],
      "thresholds": [
        {
          "timeframe": '30d',
          "target": 95,
          "warning": 98
        }
      ],
      "creator": {
        "handle": 'foo',
        "email": 'foo@foo.example.com',
        "id": 42
      },
      "created": '2015-12-18T16:34:14.014039+00:00',
      "modified": '2015-12-18T16:34:14.014039+00:00'
    }
  ],
  "error": null
}

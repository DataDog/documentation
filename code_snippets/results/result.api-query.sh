{
  "status": "ok",
  "res_type": "time_series",
  "series": [
    {
      "metric": "system.cpu.idle",
      "attributes": {},
      "display_name": "system.cpu.idle",
      "unit": null,
      "pointlist": [
        [
          1430311800000,
          98.19375610351562
        ],
        [
          1430312400000,
          99.85856628417969
        ]
      ],
      "end": 1430312999000,
      "interval": 600,
      "start": 1430311800000,
      "length": 2,
      "aggr": null,
      "scope": "host:vagrant-ubuntu-trusty-64",
      "expression": "system.cpu.idle{host:vagrant-ubuntu-trusty-64}"
    }
  ],
  "from_date": 1430226140000,
  "group_by": [
    "host"
  ],
  "to_date": 1430312540000,
  "query": "system.cpu.idle{*}by{host}",
  "message": ""
}

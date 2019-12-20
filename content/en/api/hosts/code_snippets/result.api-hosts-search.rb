{
  "total_returned": 1,
  "host_list": [
    {
      "name": "i-deadbeef",
      "up": true,
      'is_muted': false,
      "last_reported_time": 1560000000,
      "apps": [
        "agent"
      ],
      "tags": {
        "role:database": [
          "test.example.com.host"
        ],
        "env:test": [
            "test.metric.host"
        ]
      },
        "Amazon Web Services": [
          "account:staging"
        ]
      },
      "aws_name": "mycoolhost-1",
      "metrics": {
        "load": 0.5,
        "iowait": 3.2,
        "cpu": 99.0
      },
      "maintenance": [
        {
          "code": "instance-stop",
          "description": "The instance is running on degraded hardware",
          "not_before": "2020-01-03 00:00:00" 
        }
      ],
      "sources": [
        "aws",
        "agent"
      ],
      "meta": {
        "nixV": [
          "Ubuntu",
          "14.04",
          "trusty"
        ]
      },
      "host_name": "i-deadbeef",
      "id": 123456,
      "aliases": [
        "mycoolhost-1"
      ]
    }
  ],
  "total_matching": 1
}

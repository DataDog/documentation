## Monitor Based
{
  "data": {
    "errors": null,
    "to_ts": 1571329541,
    "thresholds": {
      "90d": {
        "target": 98.0,
        "target_display": "98.000",
        "timeframe": "90d"
      }
    },
    "overall": {
      "sli_value": 99.04629516601562,
      "span_precision": 2.0,
      "name": "We're not meeting our 1m SLAs for foo",
      "precision": {
        "90d": 3
      },
      "preview": true,
      "history": [
        [
          1564151047,
          0
        ],
        [
          1569231667,
          1
        ],
        [
          1569232747,
          0
        ],
        [
          1569310147,
          1
        ],
        [
          1569310447,
          0
        ],
        [
          1569345427,
          1
        ],
        [
          1569345487,
          0
        ],
        [
          1569355507,
          1
        ],
        [
          1569356347,
          0
        ],
        [
          1569504487,
          1
        ],
        [
          1569505027,
          0
        ],
        [
          1569506227,
          1
        ],
        [
          1569506407,
          0
        ],
        [
          1569524287,
          1
        ],
        [
          1569529147,
          0
        ],
        [
          1569592627,
          1
        ],
        [
          1569595687,
          0
        ],
        [
          1569801967,
          1
        ],
        [
          1569805987,
          0
        ],
        [
          1570796767,
          1
        ],
        [
          1570797067,
          0
        ],
        [
          1571061727,
          1
        ],
        [
          1571069707,
          0
        ],
        [
          1571133367,
          1
        ],
        [
          1571134687,
          0
        ],
        [
          1571327527,
          1
        ],
        [
          1571327707,
          0
        ]
      ]
    },
    "from_ts": 1568737541,
    "groups": [
      {
        "sli_value": 99.68518829345703,
        "preview": false,
        "group": "foo:pig",
        "history": [
          [
            1568685667,
            0
          ],
          [
            1571061727,
            1
          ],
          [
            1571069707,
            0
          ],
          [
            1571327527,
            1
          ],
          [
            1571327707,
            0
          ]
        ]
      },
      {
        "sli_value": 99.69444274902344,
        "preview": false,
        "group": "foo:sheep",
        "history": [
          [
            1568685667,
            0
          ],
          [
            1571061727,
            1
          ],
          [
            1571069527,
            0
          ],
          [
            1571327527,
            1
          ],
          [
            1571327647,
            0
          ]
        ]
      },
      {
        "sli_value": 99.7615737915039,
        "preview": true,
        "group": "foo:cow",
        "history": [
          [
            1564151047,
            0
          ],
          [
            1569310147,
            1
          ],
          [
            1569310447,
            0
          ],
          [
            1569504487,
            1
          ],
          [
            1569505027,
            0
          ],
          [
            1569506227,
            1
          ],
          [
            1569506407,
            0
          ],
          [
            1569524287,
            1
          ],
          [
            1569529147,
            0
          ],
          [
            1570796767,
            1
          ],
          [
            1570797067,
            0
          ]
        ]
      },
      {
        "sli_value": 99.84027862548828,
        "preview": true,
        "group": "foo:donkey",
        "history": [
          [
            1564151047,
            0
          ],
          [
            1569310147,
            1
          ],
          [
            1569310447,
            0
          ],
          [
            1569504487,
            1
          ],
          [
            1569505027,
            0
          ],
          [
            1569526027,
            1
          ],
          [
            1569529027,
            0
          ],
          [
            1570796767,
            1
          ],
          [
            1570797067,
            0
          ]
        ]
      },
      {
        "sli_value": 99.84490966796875,
        "preview": false,
        "group": "foo:cat",
        "history": [
          [
            1568685667,
            0
          ],
          [
            1569801967,
            1
          ],
          [
            1569805987,
            0
          ]
        ]
      },
      {
        "sli_value": 99.84954071044922,
        "preview": true,
        "group": "foo:dog",
        "history": [
          [
            1564151047,
            0
          ],
          [
            1569355507,
            1
          ],
          [
            1569356347,
            0
          ],
          [
            1569592627,
            1
          ],
          [
            1569595687,
            0
          ]
        ]
      },
      {
        "sli_value": 99.90509033203125,
        "preview": true,
        "group": "foo:horse",
        "history": [
          [
            1564151047,
            0
          ],
          [
            1569231667,
            1
          ],
          [
            1569232747,
            0
          ],
          [
            1569345427,
            1
          ],
          [
            1569345487,
            0
          ],
          [
            1571133367,
            1
          ],
          [
            1571134687,
            0
          ]
        ]
      },
      {
        "sli_value": 100.0,
        "preview": false,
        "group": "foo:duck",
        "history": [
          [
            1568685667,
            0
          ]
        ]
      },
      {
        "sli_value": 100.0,
        "preview": false,
        "group": "foo:chicken",
        "history": [
          [
            1568685667,
            0
          ]
        ]
      }
    ]
  },
  "error": null
}

## Event Based
{
  "data": {
    "errors": null,
    "to_ts": 1571766900,
    "series": {
      "res_type": "time_series",
      "interval": 3600,
      "resp_version": 2,
      "denominator": {
        "count": 2,
        "sum": 3698988,
        "metadata": {
          "query_index": 1,
          "aggr": "sum",
          "scope": "env:prod,status:good",
          "metric": "foo.count",
          "expression": "sum:foo.count{env:prod,status:good}.as_count()",
          "unit": null
        },
        "values": [
          1738124,
          1960864
        ],
        "times": [
          1571256000000,
          1571259600000
        ]
      },
      "numerator": {
        "count": 2,
        "sum": 3698988,
        "metadata": {
          "query_index": 0,
          "aggr": "sum",
          "scope": "env:prod",
          "metric": "foo.count",
          "expression": "sum:foo.count{env:prod}.as_count()",
          "unit": null
        },
        "values": [
          1738124,
          1960864
        ],
        "times": [
          1571256000000,
          1571259600000
        ]
      },
      "from_date": 1571162100000,
      "group_by": [],
      "to_date": 1571766900000,
      "timing": "0.830218076706",
      "query": "sum:foo.count{env:prod}.as_count(), sum:foo.count{env:prod,status:good}.as_count()",
      "message": ""
    },
    "thresholds": {
      "7d": {
        "warning": 99.5,
        "warning_display": "99.500",
        "target": 99,
        "target_display": "99.000",
        "timeframe": "7d"
      },
      "30d": {
        "warning": 99.5,
        "warning_display": "99.500",
        "target": 99,
        "target_display": "99.000",
        "timeframe": "30d"
      },
      "90d": {
        "warning": 99.5,
        "warning_display": "99.500",
        "target": 99,
        "target_display": "99.000",
        "timeframe": "90d"
      }
    },
    "overall": {
      "sli_value": 100,
      "span_precision": 0,
      "precision": {
        "7d": 0,
        "30d": 0,
        "90d": 0
      }
    },
    "from_ts": 1571162100
  },
  "error": null
}

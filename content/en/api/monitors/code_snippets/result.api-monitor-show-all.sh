[  
   {  
      "tags":[  

      ],
      "deleted":null,
      "query":"change(avg(last_5m),last_1m):avg:apache.net.hits{*} by {host} > 500",
      "message":"Host {{host.name}} with IP {{host.ip}} is under heavy load.",
      "matching_downtimes":[  

      ],
      "id":1111111,
      "multi":true,
      "name":"example title",
      "created":"2019-03-11T17:20:45.414125+00:00",
      "created_at":1552324845000,
      "creator":{  
         "id":1111111,
         "handle":"example@example.com",
         "name":"Jane Doe",
         "email":"example@example.com"
      },
      "org_id":1111111,
      "modified":"2019-03-11T17:20:45.414125+00:00",
      "overall_state_modified":"2019-03-19T12:55:48.320241+00:00",
      "overall_state":"No Data",
      "type":"query alert",
      "options":{  
         "notify_audit":false,
         "locked":false,
         "timeout_h":0,
         "silenced":{  

         },
         "include_tags":true,
         "no_data_timeframe":null,
         "require_full_window":true,
         "new_host_delay":300,
         "notify_no_data":false,
         "renotify_interval":0,
         "escalation_message":"",
         "thresholds":{  
            "critical":500,
            "warning":250
         }
      }
   },
   {  
      "tags":[  

      ],
      "deleted":null,
      "query":"avg(last_1m):outliers(avg:apache.net.hits{*} by {host}, 'DBSCAN', 3) > 0",
      "message":"@example@example.com",
      "matching_downtimes":[  

      ],
      "id":1111111,
      "multi":true,
      "name":"example title",
      "created":"2019-03-11T18:10:09.957865+00:00",
      "created_at":1552327809000,
      "creator":{  
         "id":111111,
         "handle":"example@example.com",
         "name":"Jane Doe",
         "email":"example@example.com"
      },
      "org_id":1111111,
      "modified":"2019-03-11T18:11:25.217705+00:00",
      "overall_state_modified":"2019-03-20T12:50:45.684420+00:00",
      "overall_state":"No Data",
      "type":"query alert",
      "options":{  
         "notify_audit":false,
         "locked":false,
         "timeout_h":0,
         "silenced":{  

         },
         "include_tags":true,
         "no_data_timeframe":null,
         "require_full_window":true,
         "new_host_delay":300,
         "notify_no_data":false,
         "renotify_interval":0,
         "escalation_message":""
      }
   }
]
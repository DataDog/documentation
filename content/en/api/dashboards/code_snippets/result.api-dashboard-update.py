{
   'notify_list':[
        'user@domain.com'
   ],
   'description':'An updated dashboard with memory info.',
   'template_variables':[
      {
         'default':'my-host',
         'prefix':'host',
         'name':'host1'
      }
   ],
   'is_read_only':True,
   'id':'qc9-tuk-9kv',
   'title':'Sum of Memory Free',
   'url':'/dashboard/qc9-tuk-9kv/sum-of-memory-free',
   'created_at':'2019-02-05T01:06:36.636295+00:00',
   'modified_at':'2019-02-05T02:14:15.769022+00:00',
   'author_handle':'user@domain.com',
   'widgets':[
      {
         'definition':{
            'requests':[
               {
                  'q':'sum:system.mem.free{*}'
               }
            ],
            'type':'timeseries',
            'title':'Sum Memory Free Shell'
         },
         'id':6744688099018785
      }
   ],
   'layout_type':'ordered'
}

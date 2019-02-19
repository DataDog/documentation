[
   "200",
   {
      "notify_list" => ["user@domain.com"],
      "description" => nil,
      "template_variables" => nil,
      "is_read_only" => false,
      "id" => "qc9-tuk-9kv",
      "title" => "Sum of Memory Free",
      "url" => "/dashboard/qc9-tuk-9kv/sum-of-memory-free",
      "created_at" => "2019-02-05T01:06:36.636295+00:00",
      "modified_at" => "2019-02-05T02:19:06.792555+00:00",
      "author_handle" => "user@domain.com",
      "widgets" => [
         {
            "definition" => {
               "requests" => [
                  {
                     "q" => "sum:system.mem.free{*}"
                  }
               ],
               "type" => "timeseries",
               "title" => "Sum Memory Free Shell"
            },
            "id" => 7763291144447019
         }
      ],
      "layout_type" => "ordered"
   }
]

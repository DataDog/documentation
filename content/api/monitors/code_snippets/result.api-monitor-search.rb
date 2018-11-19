["200",
 {"counts"=>
   {"status"=>[{"count"=>1, "name"=>"Alert"}],
    "muted"=>[{"count"=>1, "name"=>false}],
    "tag"=>
     [{"count"=>1, "name"=>"env:myenv"},
      {"count"=>1, "name"=>"service:sample"}],
    "type"=>[{"count"=>1, "name"=>"apm"}]},
  "monitors"=>
   [{"status"=>"Alert",
     "scopes"=>["env:myenv", "service:sample"],
     "classification"=>"apm",
     "creator"=>
      {"handle"=>"jane@example.com",
       "id"=>795042,
       "name"=>"Jane"},
     "metrics"=>["trace.servlet.request.hits", "trace.servlet.request.errors"],
     "notifications"=>
      [{"handle"=>"jane@example.com", "name"=>"Jane"}],
     "last_triggered_ts"=>1540483133,
     "id"=>6797333,
     "name"=>"Service sample has a high error rate on env:myenv",
     "tags"=>["env:myenv", "service:sample"],
     "org_id"=>11287,
     "type"=>"query alert"}],
  "metadata"=>{"total_count"=>1, "page_count"=>1, "page"=>0, "per_page"=>30}}]

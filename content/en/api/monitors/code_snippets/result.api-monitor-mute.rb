[
  '200', {
    'name' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 200',
    'org_id' => 1499,
    'options' => {
      'notify_no_data' => false,
      'notify_audit' => true,
      'timeout_h' => nil,
      'silenced' => {
        '*' => nil
      },
      'is_data_sparse' => false,
      'renotify_interval' => nil
    },
    'state' => {},
    'query' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 200',
    'message' => '',
    'type' => 'metric alert',
    'id' => 62_628,
    'created' => '2015-12-18T16:34:14.014039+00:00',
    'modified' => '2015-12-18T18:39:24.391207+00:00'
  }
]

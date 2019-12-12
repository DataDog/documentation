[
  '200', [{
    'name' => 'Bytes received on host0',
    'org_id' => 1499,
    'options' => {
      'notify_no_data' => false, 'notify_audit' => false, 'silenced' => {}
    },
    'query' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100',
    'message' => 'We may need to add web hosts if this is consistently high.',
    'type' => 'metric alert',
    'multi' => false,
    'id' => 91_879,
    'created' => '2015-12-18T16:34:14.014039+00:00',
    'modified' => '2015-12-18T16:34:14.014039+00:00'
  }, {
    'name' =>
    '**system.net.bytes_rcvd** over **host:host0** was **> 100** on average during the **last 1h**.',
    'org_id' => 1499,
    'options' => {
      'notify_audit' => true,
      'timeout_h' => nil,
      'silenced' => {},
      'no_data_timeframe' => false,
      'notify_no_data' => false,
      'renotify_interval' => nil,
      'escalation_message' => ''
    },
    'query' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100',
    'message' => '',
    'type' => 'metric alert',
    'multi' => false,
    'id' => 91_875,
    'created' => '2015-12-18T16:34:14.014039+00:00',
    'modified' => '2015-12-18T16:34:14.014039+00:00'
  }]
]

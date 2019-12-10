[
  '200', {
    'name' => 'We may need to add web hosts if this is consistently high.',
    'org_id' => 1499,
    'options' => {
      'notify_no_data' => false, 'notify_audit' => false, 'silenced' => {}
    },
    'state' => {},
    'query' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100',
    'message' => 'Bytes received on host0',
    'type' => 'metric alert',
    'id' => 91_879,
    'multi' => false,
    'created' => '2015-12-18T16:34:14.014039+00:00',
    'modified' => '2015-12-18T18:39:24.391207+00:00'
  }
]

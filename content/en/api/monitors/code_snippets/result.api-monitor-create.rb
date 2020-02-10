['200', {
  'name' => 'Bytes received on host0',
  'org_id' => 1499,
  'tags' => ['app:webserver', 'frontend'],
  'options' => {
    'notify_no_data' => true,
    'no_data_timeframe' => 20,
    'notify_audit' => false,
    'silenced' => {}
  },
  'state' => {},
  'query' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100',
  'message' => 'We may need to add web hosts if this is consistently high.',
  'type' => 'metric alert',
  'id' => 92_089,
  'multi' => false,
  'created' => '2015-12-18T16:34:14.014039+00:00',
  'modified' => '2015-12-18T16:34:14.014039+00:00'
}]

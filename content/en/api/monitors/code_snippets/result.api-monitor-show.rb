['200', {
  'name' => 'Bytes received on host0',
  'org_id' => 1499,
  'options' => {
    'no_data_timeframe' => 20,
    'notify_no_data' => false,
    'notify_audit' => false,
    'silenced' => {}
  },
  'query' => 'avg(last_1h):sum:system.net.bytes_rcvd{host:host0} > 100',
  'message' => 'We may need to add web hosts if this is consistently high.',
  'type' => 'metric alert',
  'id' => 91_879,
  'multi' => false,
  'created' => '2015-12-18T16:34:14.014039+00:00',
  'modified' => '2015-12-18T16:34:14.014039+00:00',
  'state' => {
    'groups' => {
      'host:host0' => {
        'last_nodata_ts' => null,
        'last_notified_ts' => 1_481_909_160,
        'last_resolved_ts' => 1_481_908_200,
        'last_triggered_ts' => 1_481_909_160,
        'name' => 'host:host0',
        'status' => 'Alert',
        'triggering_value' => {
          'from_ts' => 1_481_909_037,
          'to_ts' => 1_481_909_097,
          'value' => 1000
        }
      }
    }
  }
}]

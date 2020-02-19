[
  '200', {
    'disabled' => false,
    'canceled' => nil,
    'active' => true,
    'message' => nil,
    'id' => 169_267_581,
    'end' => 1_445_978_819,
    'parent_id' => nil,
    'monitor_id' => nil,
    'monitor_tags' => ['*'],
    'recurrence' => {
      'until_date' => 1_448_387_219,
      'until_occurrences' => nil,
      'week_days' => %w[Mon Tue Wed Thu Fri],
      'type' => 'weeks',
      'period' => 1
    },
    'start' => 1_445_968_019,
    'creator_id' => 3658,
    'scope' => ['env:testing'],
    'updater_id' => nil
  }
]

# with RRULE recurrence
{
...
'recurrence': {
    'type' => 'rrule',
    'rrule' => FREQ=MONTHLY;BYSETPOS=3;BYDAY=WE;INTERVAL=1
}

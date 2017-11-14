name 'base'
description 'base role, runs on every node'
run_list(
  'ntp',
  'datadog::dd-agent',
  'some_other_base_cookbook::recipe'
)
default_attributes(
  'datadog' => {
    'api_key' => "PUT_YOUR_API_KEY_HERE",
    'application_key' => "PUT_YOUR_APPLICATION_KEY_HERE"
  }
)

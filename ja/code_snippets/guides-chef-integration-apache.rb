name 'webserver'
description 'Webserver role, runs apache'
run_list(
  'apache2',
  'datadog::apache',
)
default_attributes(
  'apache' => {
    'ext_status' => true,
  }
  'datadog' => {
    'apache' => {
      'instances' => [
        { 'status_url' => 'http://localhost:8080/server-status/',
          'tags' => ['extra_tag', 'env:example'] }
      ]
    }
  }
)

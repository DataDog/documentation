{
    'status' => 'ok',
    'res_type' => 'time_series',
    'series' => [{
        'end' => 1430313599000,
        'metric' => 'system.cpu.idle',
        'interval' => 30,
        'start' => 1430312070000,
        'length' => 10,
        'aggr' => nil,
        'attributes' => {},
        'pointlist' => [
            [1430312070000.0, 75.08000183105469],
            [1430312100000.0, 99.33000183105469],
            [1430312130000.0, 99.83499908447266],
            [1430312160000.0, 100.0],
            [1430312190000.0, 99.66999816894531],
            [1430312220000.0, 100.0],
            [1430312250000.0, 99.83499908447266],
            [1430312280000.0, 99.66999816894531],
            [1430312310000.0, 99.83499908447266],
            [1430312340000.0, 99.66999816894531]
        ],
        'expression' => 'system.cpu.idle{host:vagrant-ubuntu-trusty-64}',
        'scope' => 'host:vagrant-ubuntu-trusty-64',
        'unit' => nil,
        'display_name' => 'system.cpu.idle'
    }],
    'from_date' => 1430309983000,
    'group_by' => ['host'],
    'to_date' => 1430313583000,
    'query' => 'system.cpu.idle{*}by{host}',
    'message' => ''
}
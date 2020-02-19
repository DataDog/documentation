
{
    'active': True,
    'canceled': None,
    'creator_id': 3658,
    'disabled': False,
    'end': 1445978817,
    'id': 169267576,
    'message': None,
    'monitor_id': None,
    'monitor_tags': ['*'],
    'parent_id': None,
    'recurrence': {
        'period': 1,
        'type': 'weeks',
        'until_date': 1448387217,
        'until_occurrences': None,
        'week_days': [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri'
        ]
    },
    'scope': ['env:staging'],
    'start': 1445968017,
    'updater_id': None
}

# with RRULE recurrence
{
...
'recurrence': {
        'type': 'rrule',
        'rrule': 'FREQ=MONTHLY;BYSETPOS=3;BYDAY=WE;INTERVAL=1'
}

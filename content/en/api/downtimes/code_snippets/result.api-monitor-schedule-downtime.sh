{
  "active": true,
  "canceled": null,
  "creator_id": 3658,
  "disabled": false,
  "end": 1445979093,
  "id": 169267786,
  "message": null,
  "monitor_id": null,
  "monitor_tags": ["*"],
  "parent_id": null,
  "recurrence": {
    "period": 1,
    "type": "weeks",
    "until_date": 1447786293,
    "until_occurrences": null,
    "week_days": [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri"
    ]
  },
  "scope": [
    "env:prod"
  ],
  "start": 1445968293,
  "updater_id": null
}

# with RRULE recurrence
{
...
"recurrence": {
    "type": "rrule",
    "rrule": "FREQ=MONTHLY;BYSETPOS=3;BYDAY=WE;INTERVAL=1"
}

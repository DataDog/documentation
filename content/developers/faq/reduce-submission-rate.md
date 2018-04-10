---
title: Reduce submission rate
kind: faq
---

Each metric point is sent over UDP to the StatsD server. This can incur a lot
of overhead for performance intensive code paths. To work around this, StatsD
supports sample rates, which allows sending a metric a fraction of the time and scaling up correctly on the server.

The following code only sends points half of the time:

For python:
```python

while True:
  do_something_intense()
  statsd.increment('loop.count', sample_rate=0.5)
```

For ruby:
```ruby
while true do
  do_something_intense()
  statsd.increment('loop.count', :sample_rate => 0.5)
end
```


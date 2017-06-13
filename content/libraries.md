---
title: Libraries
kind: documentation
---

### API and DogStatsD Client Libraries

The following table lists Datadog-official and community contributed API and DogStatsD client libraries. A few libraries support both the API and DogStatsD, but most focus on one or the other.

<%= print_classic_library_table %>

### Tracing (APM) Client Libraries

The following table lists Datadog-official and community contributed [Trace](/tracing/) client libraries.

<%= print_tracing_library_table %>

### Projects Using the Libraries

The [API](/api/), [DogStatsD](/guides/dogstatsd/), and [Tracing](/tracing/) pages include code snippets showing how to use some of the libraries, but seeing how the libraries are used in real projects is most helpful. Here are a few projects using the libraries:

* [ansible-modules-extras][1] uses datadogpy in its [monitoring section][2].
* [consul2dogstats][3] uses go-datadog-api to submit consul service counts to Datadog.
* [Dogscaler][4] reads Datadog metrics using DogApi to control auto-scale group policies.
* [logstash-output-dogstatsd][5] is a Logstash plugin that sends data via dogstatsd-ruby.
* [passenger-datadog-monitor][6] is a Go daemon that uses PagerDuty's godspeed to send Phusion Passenger health metrics to DogStatsD.
* [hotdog][7] shows how to use DogApi to manage downtimes and tags.
* [dd-zipkin-proxy][8] is a Zipkin-to-Datadog proxy that uses the dd-trace-go library.

### Miscellaneous stuff (not client libraries)

  * [dd-zipkin-proxy][95] - A simple Zipkin-to-Datadog proxy.

If you've written a Datadog library and would like to add it to this page, write us at [code@datadoghq.com][9].

   [1]: https://docs.ansible.com/ansible/list_of_monitoring_modules.html
   [2]: https://github.com/ansible/ansible-modules-extras
   [3]: https://github.com/zendesk/consul2dogstats
   [4]: https://github.com/cvent/dogscaler
   [5]: https://github.com/brigade/logstash-output-dogstatsd
   [6]: https://github.com/Sjeanpierre/passenger-datadog-monitor
   [7]: https://github.com/yyuu/hotdog
   [8]: https://github.com/flachnetz/dd-zipkin-proxy
   [9]: mailto:code@datadoghq.com

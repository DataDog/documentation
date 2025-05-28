---
title: Library Configuration
aliases:
  - /security_platform/application_security/setup_and_configure
  - /security/application_security/setup_and_configure
  - /security/application_security/setup_and_configure
further_reading:
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Protect against Threats with Datadog App and API Protection"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "Out-of-the-Box App and API Protection Rules"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting AAP"
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works in Datadog"
---


## Configuring a client IP header

AAP automatically attempts to resolve `http.client_ip` from several well-known headers, such as `X-Forwarded-For`. If you use a custom header for this field, or want to bypass the resolution algorithm, set the `DD_TRACE_CLIENT_IP_HEADER` environment variable. If this variable is set, the library only checks the specified header for the client IP.

## Track authenticated bad actors

Many critical attacks are performed by authenticated users who can access your most sensitive endpoints. To identify bad actors that are generating suspicious security activity, add user information to traces by instrumenting your services with the standardized user tags. You can add custom tags to your root span, or use instrumentation functions.

The Datadog Tracing Library attempts to detect user login and signup events when compatible authentication frameworks are in use, and AAP is enabled.

Read [Tracking User Activity][1] for more information on how to manually track user activity, or [see how to opt out][7] of the automatic tracking.

## Exclude specific parameters from triggering detections

There may be a time when an AAP signal, or a security trace, is a false positive. For example, AAP repeatedly detects
the same security trace and a signal is generated, but the signal has been reviewed and is not a threat.

You can add an entry to the passlist, which ignore events from a rule, to eliminate noisy signal patterns and focus on legitimately security traces.

To add a passlist entry, do one of the following:

- Click on a signal in [AAP Signals][4] and click the **Add Entry** link next to the **Add to passlist** suggested action. This method automatically adds an entry for the targeted service.
- Navigate to [Passlist Configuration][5] and manually configure a new passlist entry based on your own criteria.

**Note**: Requests (traces) that match a passlist entry are not billed.

## Data security considerations

The data that you collect with Datadog can contain sensitive information that you want to filter out, obfuscate, scrub, filter, modify, or just not collect. Additionally, the data may contain synthetic traffic that might cause your threat detection be inaccurate, or cause Datadog to not accurately indicate the security of your services.

By default, AAP collects information from security traces to help you understand why the request was flagged as suspicious. Before sending the data, AAP scans it for patterns and keywords that indicate that the data is sensitive. If the data is deemed sensitive, it is replaced with a `<redacted>` flag. This enables you to observe that although the request was suspicious, the request data was not collected because of data security concerns. User-related data, such user IDs of authenticated requests, are not part of the data being redacted.

To protect users’ data, **sensitive data scanning is activated by default in AAP**. You can customize the configuration by using the following environment variables. The scanning is based on the [RE2 syntax][2]. To customize scanning, set the value of these environment variables to a valid [RE2][9] pattern:

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP` - Pattern for scanning for keys whose values commonly contain sensitive data. If found, the values and any child nodes associated with the key are redacted.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP` - Pattern for scanning for values that could indicate sensitive data. If found, the value and all its child nodes are redacted.



<div class="alert alert-info"><strong>For Ruby only, starting in <code>ddtrace</code> version 1.1.0</strong>

<p>You can also configure scanning patterns in code:</p>

```ruby
Datadog.configure do |c|
  # ...

  # Set custom RE2 regexes
  c.appsec.obfuscator_key_regex = '...'
  c.appsec.obfuscator_value_regex = '...'
end
```

</div>


The following are examples of data that are flagged as sensitive by default:

* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

See [APM Data Security][3] for information about other mechanisms in the Datadog Agent and libraries that can also be used to remove sensitive data.

See [Automatic user activity event tracking modes][10] for information on automatic user activity tracking modes and how to configure them. See how Datadog libraries allow you to configure auto-instrumentation by using the `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` environment variable with the short name for the mode: `ident|anon|disabled`.


## Configure a custom blocking page or payload

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="The page displayed as AAP blocks requests originating from blocked IPs" width="75%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/configuration/asm/passlist
[6]: /help/
[7]: /security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking
[8]: https://app.datadoghq.com/security/configuration/asm/services-config
[9]: https://github.com/google/re2/wiki/Syntax
[10]: /security/application_security/how-it-works/add-user-info/?tab=set_user#automatic-user-activity-event-tracking-modes


---
aliases:
- 5df-3uj-3us
- /security_monitoring/default_rules/5df-3uj-3us
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.9_2
disable_edit: true
integration_id: google_compute_ssl_policy
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_ssl_policy
title: No SSL proxy load balancers permit SSL policies with weak cipher suites
type: security_rules
---

## Description
Secure Sockets Layer (SSL) policies determine what port Transport Layer Security (TLS)
features clients are permitted to use when connecting to load balancers. To prevent usage
of insecure features, SSL policies should use one of the following:
- At least `TLS 1.2` with the `MODERN` profile;
- The `RESTRICTED` profile, because it effectively requires clients to use TLS 1.2 regardless of the chosen minimum TLS version; or
- a `CUSTOM` profile that does not support any of the following features:
   ```
   TLS_RSA_WITH_AES_128_GCM_SHA256
   TLS_RSA_WITH_AES_256_GCM_SHA384
   TLS_RSA_WITH_AES_128_CBC_SHA
   TLS_RSA_WITH_AES_256_CBC_SHA
   TLS_RSA_WITH_3DES_EDE_CBC_SHA
   ```

## Rationale
Load balancers are used to efficiently distribute traffic across multiple servers. Both SSL
proxy and HTTPS load balancers are external load balancers, meaning they distribute
traffic from the Internet to a GCP network. GCP customers can configure load balancer SSL
policies with a minimum TLS version (1.0, 1.1, or 1.2) that clients can use to establish a
connection, along with a profile (Compatible, Modern, Restricted, or Custom) that specifies
permissible cipher suites. To comply with users using outdated protocols, GCP load
balancers can be configured to permit insecure cipher suites. The GCP default SSL
policy uses a minimum TLS version of 1.0 and a Compatible profile, which allows the
widest range of insecure cipher suites. As a result, it is easy for customers to configure a
load balancer without knowing that they are permitting outdated cipher suites.

### Impact
Creating more secure SSL policies has the potential to prevent clients using older TLS versions from
establishing a connection.

### Default value
The GCP default SSL policy is the least secure setting: Min TLS 1.0 and Compatible profile

## Remediation

### From the console
If the TargetSSLProxy or TargetHttpsProxy does not have an SSL policy configured, create a new SSL policy. Otherwise, modify the existing insecure policy.

1. Navigate to the **SSL Policies** page by visiting: [https://console.cloud.google.com/net-security/sslpolicies][1]
2. Click on the name of the insecure policy to go to its **SSL policy details** page.
3. Click **EDIT**.
4. Set `Minimum TLS version` to `TLS 1.2`.
5. Set `Profile` to `Modern` or `Restricted`.
6. Alternatively, if the user selects the profile `Custom`, make sure that the following features are disabled:
   ```
   TLS_RSA_WITH_AES_128_GCM_SHA256
   TLS_RSA_WITH_AES_256_GCM_SHA384
   TLS_RSA_WITH_AES_128_CBC_SHA
   TLS_RSA_WITH_AES_256_CBC_SHA
   TLS_RSA_WITH_3DES_EDE_CBC_SHA
   ```

### From the command line
1. For each insecure SSL policy, update it to use secure ciphers:
   ```
   gcloud compute ssl-policies update NAME [--profile COMPATIBLE|MODERN|RESTRICTED|CUSTOM] --min-tls-version 1.2 [--custom-features FEATURES]
   ```
2. If the target proxy has a GCP default SSL policy, use the following command corresponding to the proxy type to update it.
   ```
   gcloud compute target-ssl-proxies update TARGET_SSL_PROXY_NAME --ssl-policy SSL_POLICY_NAME
   gcloud compute target-https-proxies update TARGET_HTTPS_POLICY_NAME --ssl-policy SSL_POLICY_NAME
   ```

## References
1. [https://cloud.google.com/load-balancing/docs/use-ssl-policies][2]
2. [https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-52r2.pdf][3]

[1]: https://console.cloud.google.com/net-security/sslpolicies
[2]: https://cloud.google.com/load-balancing/docs/use-ssl-policies
[3]: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-52r2.pdf

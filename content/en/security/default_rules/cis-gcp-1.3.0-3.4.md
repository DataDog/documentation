---
aliases:
- 4ds-8sd-4j6
- /security_monitoring/default_rules/4ds-8sd-4j6
- /security_monitoring/default_rules/cis-gcp-1.3.0-3.4
disable_edit: true
integration_id: google_dns_managed_zone
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_dns_managed_zone
title: RSASHA1 is not used for the key-signing key in Cloud DNS DNSSEC
type: security_rules
---

## Description
Certificate resource records may use the domain name system security extensions (DNSSEC) algorithm numbers in this registry. DNSSEC zone signing and transaction security mechanisms (SIG(0) and TSIG) make use of
subsets of these algorithms. Use the Google recommended algorithms for key signing.

**Note:** The SHA1 algorithm has been removed from general use by Google. If used, it needs to be allowed on a per-project basis through Google, and therefore requires a Google Cloud support contract.

## Rationale
Use DNSSEC algorithm numbers from this registry in certificate resource records. When enabling DNSSEC for a managed zone, or creating a managed zone with DNSSEC, you can select the DNSSEC signing algorithms and the denial-of-existence type. Changing the DNSSEC settings is only effective for a managed zone if DNSSEC is not already enabled. If there is a need to change the settings for a managed zone where it has been enabled, turn
DNSSEC off, and then re-enable it with different settings.

**Note**: RSASHA1 key-signing support may be required for compatibility reasons. The remediation CLI works with gcloud-cli version 221.0.0 and later.

## Remediation

1. If it is necessary to change the settings for a managed zone where it has been
enabled, NSSEC must be turned off and re-enabled with different settings. To turn
off DNSSEC, run the following command:
   ```
   gcloud dns managed-zones update ZONE_NAME --dnssec-state off
   ```

2. To update key-signing for a managed DNS Zone, run the following
command:
   ```
   gcloud dns managed-zones update ZONE_NAME --dnssec-state on --ksk-algorithm KSK_ALGORITHM --ksk-key-length KSK_KEY_LENGTH --zsk-algorithm ZSK_ALGORITHM --zsk-key-length ZSK_KEY_LENGTH --denial-of-existence DENIAL_OF_EXISTENCE
   ```

## References
1. [https://cloud.google.com/dns/dnssec-advanced#advanced_signing_options][1]

[1]: https://cloud.google.com/dns/dnssec-advanced#advanced_signing_options

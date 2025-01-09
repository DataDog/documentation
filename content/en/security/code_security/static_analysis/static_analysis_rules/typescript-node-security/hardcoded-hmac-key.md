---
aliases:
- /continuous_integration/static_analysis/rules/typescript-node-security/hardcoded-hmac-key
- /static_analysis/rules/typescript-node-security/hardcoded-hmac-key
dependencies: []
disable_edit: true
group_id: typescript-node-security
meta:
  category: Security
  id: typescript-node-security/hardcoded-hmac-key
  language: TypeScript
  severity: Warning
  severity_rank: 2
title: Detects hardcoded HMAC keys
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `typescript-node-security/hardcoded-hmac-key`

**Language:** TypeScript

**Severity:** Warning

**Category:** Security

**CWE**: [798](https://cwe.mitre.org/data/definitions/798.html)

## Description
Hardcoding cryptographic keys, secrets, or other sensitive information within the code is a common but dangerous practice. This rule aims to detect and prevent this kind of code pattern.

## Non-Compliant Code Examples
```typescript
import crypto from "crypto";

crypto.createHmac('sha256', 'pa4qacea4VK9t9nGv7yZtwmj').update(data).digest('hex');

const rsa_key = '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQDNwqLEe9wgTXCbC7+RPdDbBbeqjdbs4kOPOIGzqLpXvJXlxxW8iMz0EaM4BKUqYsIa+ndv3NAn2RxCd5ubVdJJcX43zO6Ko0TFEZx/65gY3BE0O6syCEmUP4qbSd6exou/F+WTISzbQ5FBVPVmhnYhG/kpwt/cIxK5iUn5hm+4tQIDAQABAoGBAI+8xiPoOrA+KMnG/T4jJsG6TsHQcDHvJi7o1IKC/hnIXha0atTX5AUkRRce95qSfvKFweXdJXSQ0JMGJyfuXgU6dI0TcseFRfewXAa/ssxAC+iUVR6KUMh1PE2wXLitfeI6JLvVtrBYswm2I7CtY0q8n5AGimHWVXJPLfGV7m0BAkEA+fqFt2LXbLtyg6wZyxMA/cnmt5Nt3U2dAu77MzFJvibANUNHE4HPLZxjGNXN+a6m0K6TD4kDdh5HfUYLWWRBYQJBANK3carmulBwqzcDBjsJ0YrIONBpCAsXxk8idXb8jL9aNIg15Wumm2enqqObahDHB5jnGOLmbasizvSVqypfM9UCQCQl8xIqy+YgURXzXCN+kwUgHinrutZms87Jyi+D8Br8NY0+Nlf+zHvXAomD2W5CsEK7C+8SLBr3k/TsnRWHJuECQHFE9RA2OP8WoaLPuGCyFXaxzICThSRZYluVnWkZtxsBhW2W8z1b8PvWUE7kMy7TnkzeJS2LSnaNHoyxi7IaPQUCQCwWU4U+v4lD7uYBw00Ga/xt+7+UqFPlPVdz1yyr4q24Zxaw0LgmuEvgU5dycq8N7JxjTubX0MIRR+G9fmDBBl8=\r\n-----END RSA PRIVATE KEY-----'
const hmac = crypto.createHmac('sha256', rsa_key)

const key = 'private';
const secret = key;
const fail = crypto.createHmac('sha256', secret);
```

## Compliant Code Examples
```typescript
import crypto from "crypto";
import config from "./config";

const safely_stored_key = config.get('AWS_KEY')
const safe_hmac = crypto.createHmac('sha256', safely_stored_key)

crypto.createHmac('sha256', process.env.KEY);
```

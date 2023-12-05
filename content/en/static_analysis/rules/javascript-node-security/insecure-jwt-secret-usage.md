---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/insecure-jwt-secret-usage
  language: JavaScript
  severity: Error
title: Insecure Usage of a Static Secret in JWT Signing
---
## Metadata
**ID:** `javascript-node-security/insecure-jwt-secret-usage`

**Language:** JavaScript

**Severity:** Error

**Category:** Security

## Description
Using a static secret for signing JSON Web Tokens (JWT) poses several security risks:

1.  **Static Secrets**: Static secrets embedded in the code can be easily discovered by attackers. This is particularly dangerous if the code becomes publicly available or is leaked.
2.  **Weak Secrets**: A simple, static secret might be weak and easily guessable, rendering the security controls it supports ineffective.
3.  **Lack of Key Rotation**: A static secret doesn't allow for key rotation, a recommended practice to mitigate the risk if a secret is compromised.

## Non-Compliant Code Examples
```javascript
import jwt from 'jsonwebtoken';

const privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\nMIICXAIBAAKBgQDNwqLEe9wgTXCbC7+RPdDbBbeqjdbs4kOPOIGzqLpXvJXlxxW8iMz0EaM4BKUqYsIa+ndv3NAn2RxCd5ubVdJJcX43zO6Ko0TFEZx/65gY3BE0O6syCEmUP4qbSd6exou/F+WTISzbQ5FBVPVmhnYhG/kpwt/cIxK5iUn5hm+4tQIDAQABAoGBAI+8xiPoOrA+KMnG/T4jJsG6TsHQcDHvJi7o1IKC/hnIXha0atTX5AUkRRce95qSfvKFweXdJXSQ0JMGJyfuXgU6dI0TcseFRfewXAa/ssxAC+iUVR6KUMh1PE2wXLitfeI6JLvVtrBYswm2I7CtY0q8n5AGimHWVXJPLfGV7m0BAkEA+fqFt2LXbLtyg6wZyxMA/cnmt5Nt3U2dAu77MzFJvibANUNHE4HPLZxjGNXN+a6m0K6TD4kDdh5HfUYLWWRBYQJBANK3carmulBwqzcDBjsJ0YrIONBpCAsXxk8idXb8jL9aNIg15Wumm2enqqObahDHB5jnGOLmbasizvSVqypfM9UCQCQl8xIqy+YgURXzXCN+kwUgHinrutZms87Jyi+D8Br8NY0+Nlf+zHvXAomD2W5CsEK7C+8SLBr3k/TsnRWHJuECQHFE9RA2OP8WoaLPuGCyFXaxzICThSRZYluVnWkZtxsBhW2W8z1b8PvWUE7kMy7TnkzeJS2LSnaNHoyxi7IaPQUCQCwWU4U+v4lD7uYBw00Ga/xt+7+UqFPlPVdz1yyr4q24Zxaw0LgmuEvgU5dycq8N7JxjTubX0MIRR+G9fmDBBl8=\r\n-----END RSA PRIVATE KEY-----'
export const authorize = (user = {}) => jwt.sign(user, privateKey, { expiresIn: '6h', algorithm: 'RS256' });

jwt.sign({ user: 'foo' }, 'secret');

const key = 'shhh';
const secret = key;
jwt.sign({ user: 'foo' }, secret);
```

## Compliant Code Examples
```javascript
import jwt from "jsonwebtoken";
import config from './config';

const payload = {foo: 'bar'};
const secret3 = process.env.SECRET 
const token5 = jwt.sign(payload, secret3)

jwt.sign(payload, process.env.KEY);
jwt.sign(payload, config.secret);

```

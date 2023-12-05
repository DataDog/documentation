---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-node-security/oauth2-hardcoded-secret
  language: JavaScript
  severity: Warning
title: Do not use hardcoded secret for OAuth2 providers
---
## Metadata
**ID:** `javascript-node-security/oauth2-hardcoded-secret`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Do not put hardcoded credentials in code. Instead, put secrets in environment variables or a vault.

## Non-Compliant Code Examples
```javascript
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: `client_id`,
    clientSecret: 'secret_id',
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

## Compliant Code Examples
```javascript
passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.example.com/oauth2/authorize',
    tokenURL: 'https://www.example.com/oauth2/token',
    clientID: process.env.EXAMPLE_CLIENT_ID,
    clientSecret: process.env.EXAMPLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/example/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ exampleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

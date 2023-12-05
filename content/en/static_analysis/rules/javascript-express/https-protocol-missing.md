---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: javascript-express/https-protocol-missing
  language: JavaScript
  severity: Warning
title: Use `https` protocol over `http`
---
## Metadata
**ID:** `javascript-express/https-protocol-missing`

**Language:** JavaScript

**Severity:** Warning

**Category:** Security

## Description
Per [Express documentation](https://expressjs.com/en/advanced/best-practice-security.html#use-tls):

> If your app deals with or transmits sensitive data, use [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) to secure the connection and the data. This technology encrypts data before it is sent from the client to the server, thus preventing some common (and easy) hacks.

This rule will detect the usage of non `https.createServer()` usage.

## Non-Compliant Code Examples
```javascript
var http = require('http');
var express = require('express');
var app = express();

var httpServer = http.createServer(app)
httpServer.listen(8080);
```

## Compliant Code Examples
```javascript
var https = require('https');
var express = require('express');
var app = express();

var httpsServer = https.createServer(app)
httpsServer.listen(8080);
```

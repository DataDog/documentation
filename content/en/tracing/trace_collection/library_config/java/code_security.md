### Code Security

`DD_IAST_REDACTION_ENABLED`
: **Since**: 1.54.0 <br>
**Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables IAST redaction of sensitive data. Default value is in TracerSettings.

`DD_IAST_REDACTION_NAME_PATTERN`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)`<br>
IAST: regular expression used to identify sensitive source names (header/parameter/cookie names, etc.) that should be redacted (compiled case-insensitively). Default matches common secrets like password/token/key.

`DD_IAST_REDACTION_VALUE_PATTERN`
: **Since**: 1.54.0 <br>
**Type**: `string`<br>
**Default**: `(?:bearer\s+[a-z0-9\._\-]+|glpat-[\w\-]{20}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L][\w=\-]+\.ey[I-L][\w=\-]+(?:\.[\w.+/=\-]+)?|(?:[\-]{5}BEGIN[a-z\s]+PRIVATE\sKEY[\-]{5}[^\-]+[\-]{5}END[a-z\s]+PRIVATE\sKEY[\-]{5}|ssh-rsa\s*[a-z0-9/\.+]{100,}))`<br>
IAST: regular expression used to identify sensitive values that should be redacted (compiled case-insensitively, multiline). Default matches patterns like Bearer tokens, GitHub/GitLab tokens, JWTs, and private keys.

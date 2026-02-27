### Code Security

`DD_IAST_REDACTION_ENABLED`
: **Type**: `boolean`<br>
**Default**: `true`<br>
Enables or disables IAST redaction of sensitive data. Default value is in TracerSettings.

`DD_IAST_REDACTION_NAME_PATTERN`
: **Type**: `string`<br>
**Default**: `(?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?|(?:sur|last)name|user(?:name)?|address|e?mail)`<br>
Custom regex pattern to obfuscate source keys in IAST. Default value is in TracerSettings.

`DD_IAST_REDACTION_VALUE_PATTERN`
: **Type**: `string`<br>
**Default**: `(?i)(?:bearer\\s+[a-z0-9\\._\\-]+|glpat-[\\w\\-]{20}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L][\\w=\\-]+\\.ey[I-L][\\w=\\-]+(?:\\.[\\w.+/=\\-]+)?|(?:[\\-]{5}BEGIN[a-z\\s]+PRIVATE\\sKEY[\\-]{5}[^\\-]+[\\-]{5}END[a-z\\s]+PRIVATE\\sKEY[\\-]{5}|ssh-rsa\\s*[a-z0-9/\\.+]{100,})|[\\w\\.-]+@[a-zA-Z\\d\\.-]+\\.[a-zA-Z]{2,})`<br>
Custom regex pattern to obfuscate source values in IAST. Default value is in TracerSettings.

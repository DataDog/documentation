---
title: Static Analysis Rules
kind: documentation
description: View rules for multiple languages for Static Analysis.
is_beta: true
docker_best_practices_data:
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/absolute-workdir"
    tag: "absolute-workdir"
    text: "Use absolute workdir"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/alias-must-be-unique"
    tag: "alias-must-be-unique"
    text: "FROM aliases must be unique"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/apt-get-yes"
    tag: "apt-get-yes"
    text: "Always use -y with apt-get install"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/apt-pin-version"
    tag: "apt-pin-version"
    text: "Always pin versions in apt-get install"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/avoid-chmod-777"
    tag: "avoid-chmod-777"
    text: "Do not give wide permissions on files"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/avoid-commands-not-relevant"
    tag: "avoid-commands-not-relevant"
    text: "Avoid commands not made for containers"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/avoid-http"
    tag: "avoid-http"
    text: "Avoid fetching data from HTTP endpoint"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/dnf-use-y"
    tag: "dnf-use-y"
    text: "Always use -y with dnf install"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/expose-admin-ports"
    tag: "expose-admin-ports"
    text: "Do not expose sensitive ports"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/expose-valid-port"
    tag: "expose-valid-port"
    text: "Expose a valid UNIX port number"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/image-avoid-digest"
    tag: "image-avoid-digest"
    text: "Do not use the digest to pull an image"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/maintainer-deprecated"
    tag: "maintainer-deprecated"
    text: "The maintainer entry is deprecated"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/multiple-cmd"
    tag: "multiple-cmd"
    text: "Do not use multiple CMD"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/multiple-entrypoint"
    tag: "multiple-entrypoint"
    text: "Do not use multiple CMD"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/multiple-healthcheck"
    tag: "multiple-healthcheck"
    text: "Do not use multiple HEALTHCHECK"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/no-root-user"
    tag: "no-root-user"
    text: "Last user should not be root"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/pip-no-cache"
    tag: "pip-no-cache"
    text: "Do not use cache when installing packages"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/pip-pin-versions"
    tag: "pip-pin-versions"
    text: "Always pin versions with pip"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/tag-image-version"
    tag: "tag-image-version"
    text: "Always tag the version of an image"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/yum-use-y"
    tag: "yum-use-y"
    text: "Always use -y with yum install"
  - link: "/continuous_integration/static_analysis/rules/docker-best-practices/zypper-use-y"
    tag: "zypper-use-y"
    text: "Always use -y with zypper install"
javascript_best_practices_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/for-direction"
    tag: "for-direction"
    text: "Check for loop is moving in the right direction"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/new-parens"
    tag: "new-parens"
    text: "Invoking a constructor must use parentheses"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-alert"
    tag: "no-alert"
    text: "Avoid the use of alert, confirm, and prompt"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-async-promise-executor"
    tag: "no-async-promise-executor"
    text: "Promise executor cannot be an async function"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-caller"
    tag: "no-caller"
    text: "Avoid the use of arguments.caller or arguments.callee"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-case-declarations"
    tag: "no-case-declarations"
    text: "Avoid lexical declarations in case clauses"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-compare-neg-zero"
    tag: "no-compare-neg-zero"
    text: "Direct comparison with -0 detected"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-cond-assign"
    tag: "no-cond-assign"
    text: "Avoid assignment operators in conditional expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-console"
    tag: "no-console"
    text: "Avoid leaving console debug statements"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-debugger"
    tag: "no-debugger"
    text: "Disallow the use of debugger"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-delete-var"
    tag: "no-delete-var"
    text: "Avoid using delete on variables directly"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-dupe-args"
    tag: "no-dupe-args"
    text: "Function parameters redeclared"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-dupe-class-members"
    tag: "no-dupe-class-members"
    text: "Avoid duplicate class members"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-dupe-keys"
    tag: "no-dupe-keys"
    text: "Avoid duplicate keys in object literals"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-duplicate-case"
    tag: "no-duplicate-case"
    text: "Avoid duplicate case labels"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-empty"
    tag: "no-empty"
    text: "Avoid empty block statements"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-empty-character-class"
    tag: "no-empty-character-class"
    text: "Avoid empty character classes in regular expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-empty-pattern"
    tag: "no-empty-pattern"
    text: "Avoid empty destructuring patterns"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-ex-assign"
    tag: "no-ex-assign"
    text: "Avoid reassigning exceptions in catch clauses"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-implied-eval"
    tag: "no-implied-eval"
    text: "Prevent the use methods similar to eval()"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-import-assign"
    tag: "no-import-assign"
    text: "Prevent assigning to imported bindings"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-inner-declarations"
    tag: "no-inner-declarations"
    text: "Avoid variable or function declaration in nested blocks"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-iterator"
    tag: "no-iterator"
    text: "Avoid the use of the __iterator__ property"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-loss-of-precision"
    tag: "no-loss-of-precision"
    text: "Avoid numbers that lose precision"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-new-symbol"
    tag: "no-new-symbol"
    text: "Avoid new statements with the Symbol object"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-octal"
    tag: "no-octal"
    text: "Avoid using octal literals to prevent unexpected behavior"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-proto"
    tag: "no-proto"
    text: "Avoid the use of the __proto__ property"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-script-url"
    tag: "no-script-url"
    text: "Avoid using JavaScript in URLs"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-unsafe-negation"
    tag: "no-unsafe-negation"
    text: "Avoid negating the left operand of relational operators"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/no-with"
    tag: "no-with"
    text: "The with statement can lead to ambiguous code"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/require-yield"
    tag: "require-yield"
    text: "Require yield in generator functions"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/use-isnan"
    tag: "use-isnan"
    text: "Avoid direct comparison with NaN"
  - link: "/continuous_integration/static_analysis/rules/javascript-best-practices/valid-typeof"
    tag: "valid-typeof"
    text: "Compare typeof expressions against valid strings"
javascript_browser_security_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/event-check-origin"
    tag: "event-check-origin"
    text: "Check origin of events"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/inner-outer-html"
    tag: "inner-outer-html"
    text: "Do not modify innerHTML or outerHTML"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/insecure-websocket"
    tag: "insecure-websocket"
    text: "Websockets must use SSL connections"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/local-storage-sensitive-data"
    tag: "local-storage-sensitive-data"
    text: "Do not store sensitive data to local storage"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/manual-sanitization"
    tag: "manual-sanitization"
    text: "Avoid manual sanitization of inputs"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/postmessage-permissive-origin"
    tag: "postmessage-permissive-origin"
    text: "Specify origin in postMessage"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/react-dangerously-inner-html"
    tag: "react-dangerously-inner-html"
    text: "Do not inject unsanitized HTML"
  - link: "/continuous_integration/static_analysis/rules/javascript-browser-security/regexp-non-literal"
    tag: "regexp-non-literal"
    text: "Do not use variable for regular expressions"
javascript_code_style_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/assignment-name"
    tag: "assignment-name"
    text: "Assigment name should use camelCase"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/class-name"
    tag: "class-name"
    text: "Class name should be PascalCase"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/eqeqeq"
    tag: "eqeqeq"
    text: "Enforce the use of === and !=="
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/func-name-matching"
    tag: "func-name-matching"
    text: "Function names must match the name of the assignation."
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/func-names"
    tag: "func-names"
    text: "Enforce named function expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/function-naming"
    tag: "function-naming"
    text: "Function name should use camelCase or PascalCase"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/max-class-lines"
    tag: "max-class-lines"
    text: "Classes must be less than 100 lines"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/max-function-lines"
    tag: "max-function-lines"
    text: "Functions must be less than 200 lines"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/max-params"
    tag: "max-params"
    text: "Enforce a maximum number of parameters in a function"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/method-name"
    tag: "method-name"
    text: "Method name should use camelCase"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-array-constructor"
    tag: "no-array-constructor"
    text: "Avoid Array constructors"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-div-regex"
    tag: "no-div-regex"
    text: "Avoid equal signs at the beginning of regular expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-duplicate-imports"
    tag: "no-duplicate-imports"
    text: "Avoid duplicate module imports"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-floating-decimal"
    tag: "no-floating-decimal"
    text: "Avoid leading or trailing decimal points in numbers"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-lonely-if"
    tag: "no-lonely-if"
    text: "Avoid if statements as the only statement in else blocks"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-multi-assign"
    tag: "no-multi-assign"
    text: "Avoid the use of chained assignment expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-new"
    tag: "no-new"
    text: "Avoid new operators outside of assignments or comparisons"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-new-func"
    tag: "no-new-func"
    text: "Avoid new operators with the Function object"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-new-object"
    tag: "no-new-object"
    text: "Avoid Object constructors"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-return-assign"
    tag: "no-return-assign"
    text: "Avoid assignment operators in return statements"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-self-compare"
    tag: "no-self-compare"
    text: "Avoid comparisons where both sides are exactly the same"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/no-var"
    tag: "no-var"
    text: "Require let or const instead of var"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/parameter-name"
    tag: "parameter-name"
    text: "Parameter name should use camelCase"
  - link: "/continuous_integration/static_analysis/rules/javascript-code-style/radix"
    tag: "radix"
    text: "Consistent use of the radix argument using parseInt"
javascript_common_security_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-common-security/axios-avoid-insecure-http"
    tag: "axios-avoid-insecure-http"
    text: "Avoid insecure HTTP requests with Axios"
  - link: "/continuous_integration/static_analysis/rules/javascript-common-security/unique-function-arguments"
    tag: "unique-function-arguments"
    text: "Function argument names should be unique"
  - link: "/continuous_integration/static_analysis/rules/javascript-common-security/xml-no-external-entities"
    tag: "xml-no-external-entities"
    text: "Do not use external XML entities"
javascript_express_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-express/access-restriction"
    tag: "access-restriction"
    text: "Limit exposure to sensitive directories and files"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/default-session-config"
    tag: "default-session-config"
    text: "Enforce overriding default config"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/external-filename-upload"
    tag: "external-filename-upload"
    text: "Avoid using unsanitized user input with sendFile"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/external-resource"
    tag: "external-resource"
    text: "Avoid rendering resource based on unsanitized user input"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/hardcoded-secret"
    tag: "hardcoded-secret"
    text: "Avoid using a hard-coded secret"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/https-protocol-missing"
    tag: "https-protocol-missing"
    text: "Use `https` protocol over `http`"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/insecure-allow-origin"
    tag: "insecure-allow-origin"
    text: "Avoid using an insecure Access-Control-Allow-Origin header"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/insecure-cookie"
    tag: "insecure-cookie"
    text: "Avoid setting insecure cookie settings"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/jwt-not-revoked"
    tag: "jwt-not-revoked"
    text: "Ensure an isRevoked method is used for tokens"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/missing-helmet"
    tag: "missing-helmet"
    text: "Express application should use Helmet"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/path-traversal"
    tag: "path-traversal"
    text: "Avoid allowing access to unintended directories or files"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/reduce-server-fingerprinting"
    tag: "reduce-server-fingerprinting"
    text: "Server fingerprinting misconfiguration"
  - link: "/continuous_integration/static_analysis/rules/javascript-express/xss-vulnerability"
    tag: "xss-vulnerability"
    text: "Avoid sending unsanitized user input in response"
javascript_inclusive_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-inclusive/comments"
    tag: "comments"
    text: "Check comments for wording issues"
  - link: "/continuous_integration/static_analysis/rules/javascript-inclusive/declarations"
    tag: "declarations"
    text: "Check declaration names for wording issues"
  - link: "/continuous_integration/static_analysis/rules/javascript-inclusive/formal-parameters"
    tag: "formal-parameters"
    text: "Check parameter names for wording issues"
  - link: "/continuous_integration/static_analysis/rules/javascript-inclusive/identifiers"
    tag: "identifiers"
    text: "Check identifier names for wording issues"
javascript_node_security_data:
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/argon2"
    tag: "argon2"
    text: "Use strong security mechanisms with argon2"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/avoid-crypto-rc4"
    tag: "avoid-crypto-rc4"
    text: "Avoid RC4"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/avoid-crypto-sha1"
    tag: "avoid-crypto-sha1"
    text: "Avoid SHA1 security protocol"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/avoid-des"
    tag: "avoid-des"
    text: "Avoid DES and 3DES"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/chmod-permissions"
    tag: "chmod-permissions"
    text: "Do not give 777 permissions to a file"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/command-injection"
    tag: "command-injection"
    text: "Avoid command injection"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/crypto-avoid-weak-hash"
    tag: "crypto-avoid-weak-hash"
    text: "Avoid weak hash algorithm from CryptoJS"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-buffer-noassert"
    tag: "detect-buffer-noassert"
    text: "Avoid calls to 'buffer' with 'noAssert' flag set"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-child-process"
    tag: "detect-child-process"
    text: "Avoid instances of 'child_process' and non-literal 'exec()'"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-eval-with-expression"
    tag: "detect-eval-with-expression"
    text: "Avoid `eval` with expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-new-buffer"
    tag: "detect-new-buffer"
    text: "Avoid Buffer(argument) with non-literal values"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-non-literal-fs-filename"
    tag: "detect-non-literal-fs-filename"
    text: "Avoid variables in 'fs' calls filename argument"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-non-literal-regexp"
    tag: "detect-non-literal-regexp"
    text: "Detects non-literal values in regular expressions"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detect-non-literal-require"
    tag: "detect-non-literal-require"
    text: "Avoid require with non-literal values"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/detected-jwt-token"
    tag: "detected-jwt-token"
    text: "Detects hardcoded JWT tokens within the codebase."
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/hardcoded-hmac-key"
    tag: "hardcoded-hmac-key"
    text: "Avoid hardcoded HMAC keys"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/insecure-hash"
    tag: "insecure-hash"
    text: "Do not use weak hash functions"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/insecure-jwt-secret-usage"
    tag: "insecure-jwt-secret-usage"
    text: "Insecure Usage of a Static Secret in JWT Signing"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/jwt-hardcoded-secret"
    tag: "jwt-hardcoded-secret"
    text: "Do not use hardcoded secret with a JWT"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/jwt-sensitive-data"
    tag: "jwt-sensitive-data"
    text: "Do not put sensitive data in objects"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/jwt-weak-encryption"
    tag: "jwt-weak-encryption"
    text: "Use default encryption from the JWT library"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/log-sensitive-data"
    tag: "log-sensitive-data"
    text: "Avoid logging sensitive data"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/oauth2-hardcoded-secret"
    tag: "oauth2-hardcoded-secret"
    text: "Do not use hardcoded secret for OAuth2 providers"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/sql-injection"
    tag: "sql-injection"
    text: "Avoid SQL injection"
  - link: "/continuous_integration/static_analysis/rules/javascript-node-security/variable-sql-statement-injection"
    tag: "variable-sql-statement-injection"
    text: "Avoid SQL injections"
jsx_react_data:
  - link: "/continuous_integration/static_analysis/rules/jsx-react/jsx-key"
    tag: "jsx-key"
    text: "Prevent missing key props in iterators/collection literals"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/jsx-no-comment-textnodes"
    tag: "jsx-no-comment-textnodes"
    text: "Avoid comments from being inserted as text nodes"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/jsx-no-duplicate-key"
    tag: "jsx-no-duplicate-key"
    text: "Ensures unique key prop"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/jsx-no-duplicate-props"
    tag: "jsx-no-duplicate-props"
    text: "Avoid duplicate properties in JSX"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/jsx-no-target-blank"
    tag: "jsx-no-target-blank"
    text: "Prevent target='_blank' security risks"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/no-children-prop"
    tag: "no-children-prop"
    text: "Avoid passing children as props"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/no-danger-with-children"
    tag: "no-danger-with-children"
    text: "Avoid using children with dangerouslySetInnerHTML"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/no-deprecated"
    tag: "no-deprecated"
    text: "Avoid deprecated methods"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/no-render-return-value"
    tag: "no-render-return-value"
    text: "Avoid usage of the return value of ReactDOM.render"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/no-string-refs"
    tag: "no-string-refs"
    text: "Avoid using string references"
  - link: "/continuous_integration/static_analysis/rules/jsx-react/require-render-return"
    tag: "require-render-return"
    text: "Enforce class for returning value in render function"
python_best_practices_data:
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ambiguous-class-name"
    tag: "ambiguous-class-name"
    text: "make sure class names are readable"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ambiguous-function-name"
    tag: "ambiguous-function-name"
    text: "make sure function names are readable"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ambiguous-variable-name"
    tag: "ambiguous-variable-name"
    text: "make sure variable names are readable"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/any-type-disallow"
    tag: "any-type-disallow"
    text: "do not use Any type"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/argument-same-name"
    tag: "argument-same-name"
    text: "do not have arguments with the same name"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/assertraises-specific-exception"
    tag: "assertraises-specific-exception"
    text: "assertRaises must check for a specific exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/avoid-duplicate-keys"
    tag: "avoid-duplicate-keys"
    text: "Avoid duplicate keys in dictionaries"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/avoid-string-concat"
    tag: "avoid-string-concat"
    text: "avoid string concatenation"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self"
    tag: "class-methods-use-self"
    text: "Class methods should not use self"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/collection-while-iterating"
    tag: "collection-while-iterating"
    text: "do not modify a dictionary while iterating on it"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/comment-fixme-todo-ownership"
    tag: "comment-fixme-todo-ownership"
    text: "TODO and FIXME comments must have ownership"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/comparison-constant-left"
    tag: "comparison-constant-left"
    text: "in comparisons, variables must be left"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/condition-similar-block"
    tag: "condition-similar-block"
    text: "if conditions must have different code blocks"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/ctx-manager-enter-exit-defined"
    tag: "ctx-manager-enter-exit-defined"
    text: "ensure that both __exit__ and __enter__ are defined"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/dataclass-special-methods"
    tag: "dataclass-special-methods"
    text: "do not use special method on data class"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/equal-basic-types"
    tag: "equal-basic-types"
    text: "check equal is used on consistent basic types"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/exception-inherit"
    tag: "exception-inherit"
    text: "ensure exception inherit a base exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return"
    tag: "finally-no-break-continue-return"
    text: "do not use break or continue in finally block"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/function-already-exists"
    tag: "function-already-exists"
    text: "a function must be defined only once"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/function-variable-argument-name"
    tag: "function-variable-argument-name"
    text: "Do not assign to function arguments"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/generic-exception-last"
    tag: "generic-exception-last"
    text: "If using generic exception, it should be last"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/get-set-arguments"
    tag: "get-set-arguments"
    text: "getter/setter must have 1 or 2 arguments respectively"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else"
    tag: "if-return-no-else"
    text: "when an if condition returns an value, else is not necessary"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/import-modules-twice"
    tag: "import-modules-twice"
    text: "module imported twice"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/import-single-module"
    tag: "import-single-module"
    text: "only one module to import per import statement"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-call-parent"
    tag: "init-call-parent"
    text: "use super() to call the parent constructor"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-method-required"
    tag: "init-method-required"
    text: "ensure classes have an __init__ method"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value"
    tag: "init-no-return-value"
    text: "No return in an __init__ function"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/invalid-strip-call"
    tag: "invalid-strip-call"
    text: "strip() argument should not have duplicate characters"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/logging-no-format"
    tag: "logging-no-format"
    text: "do not use format string with logging functions"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/method-hidden"
    tag: "method-hidden"
    text: "a method has the same name than an attribute"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/nested-blocks"
    tag: "nested-blocks"
    text: "Do not have too many nested blocks"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-assert"
    tag: "no-assert"
    text: "do not use assert in production code"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-assert-on-tuples"
    tag: "no-assert-on-tuples"
    text: "no assert on tuples"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-bare-except"
    tag: "no-bare-except"
    text: "do not use bare except"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-bare-raise"
    tag: "no-bare-raise"
    text: "Do not use a raise statement without a specific exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-base-exception"
    tag: "no-base-exception"
    text: "do not raise base exception"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today"
    tag: "no-datetime-today"
    text: "do not use datetime.today()"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-double-not"
    tag: "no-double-not"
    text: "do not use double negation"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-double-unary-operator"
    tag: "no-double-unary-operator"
    text: "do not use operator -- and ++"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-duplicate-base-class"
    tag: "no-duplicate-base-class"
    text: "use a base class only once"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-equal-unary"
    tag: "no-equal-unary"
    text: "do not use operations =+ and =-"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-exit"
    tag: "no-exit"
    text: "do not use exit()"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-generic-exception"
    tag: "no-generic-exception"
    text: "Do not use generic exceptions"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-if-true"
    tag: "no-if-true"
    text: "do not compare to True in a condition"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len"
    tag: "no-range-loop-with-len"
    text: "Do not use for i in range(len(<array>))"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception"
    tag: "no-silent-exception"
    text: "Do not ignore Exception with a pass statement"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/open-add-flag"
    tag: "open-add-flag"
    text: "do not define an open flag for reading"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/os-environ-no-assign"
    tag: "os-environ-no-assign"
    text: "assigning to os.environ does not clear the environment"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/raising-not-implemented"
    tag: "raising-not-implemented"
    text: "Do not raise NotImplemented - it does not exists"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/return-bytes-not-string"
    tag: "return-bytes-not-string"
    text: "__bytes__ method should returns bytes, not string"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/return-outside-function"
    tag: "return-outside-function"
    text: "do not return outside a function"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/self-assignment"
    tag: "self-assignment"
    text: "do not assign to itself"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/slots-no-single-string"
    tag: "slots-no-single-string"
    text: "__slots__ should not be a single string"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments"
    tag: "special-methods-arguments"
    text: "ensure special methods have the correct arguments"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/static-method-no-self"
    tag: "static-method-no-self"
    text: "do not use self as parameter for static methods"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/too-many-nested-if"
    tag: "too-many-nested-if"
    text: "do not use too many nested if conditions"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/too-many-while"
    tag: "too-many-while"
    text: "do not use too many nested loops and conditions "
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/type-check-isinstance"
    tag: "type-check-isinstance"
    text: "use isinstance instead of type"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/unreachable-code"
    tag: "unreachable-code"
    text: "avoid unreachable code"
  - link: "/continuous_integration/static_analysis/rules/python-best-practices/use-callable-not-hasattr"
    tag: "use-callable-not-hasattr"
    text: "do not use hasattr to check if a value is callable"
python_code_style_data:
  - link: "/continuous_integration/static_analysis/rules/python-code-style/assignment-names"
    tag: "assignment-names"
    text: "variable names must use snake_case"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/class-name"
    tag: "class-name"
    text: "class name should be CamelCase"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/function-naming"
    tag: "function-naming"
    text: "function name and parameters should use snake_case"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/max-class-lines"
    tag: "max-class-lines"
    text: "classes must be less than 100 lines"
  - link: "/continuous_integration/static_analysis/rules/python-code-style/max-function-lines"
    tag: "max-function-lines"
    text: "Functions must be less than 200 lines"
python_design_data:
  - link: "/continuous_integration/static_analysis/rules/python-design/function-too-long"
    tag: "function-too-long"
    text: "functions must have less than 100 lines"
python_django_data:
  - link: "/continuous_integration/static_analysis/rules/python-django/http-response-from-request"
    tag: "http-response-from-request"
    text: "Lack of sanitization of user data"
  - link: "/continuous_integration/static_analysis/rules/python-django/http-response-with-json-dumps"
    tag: "http-response-with-json-dumps"
    text: "use JsonResponse instead of HttpResponse to send JSON data"
  - link: "/continuous_integration/static_analysis/rules/python-django/jsonresponse-no-content-type"
    tag: "jsonresponse-no-content-type"
    text: "do not specify content-type for JsonResponse"
  - link: "/continuous_integration/static_analysis/rules/python-django/model-charfield-max-length"
    tag: "model-charfield-max-length"
    text: "always specify max_length for a Charfield"
  - link: "/continuous_integration/static_analysis/rules/python-django/model-help-text"
    tag: "model-help-text"
    text: "use help_text to document model columns"
  - link: "/continuous_integration/static_analysis/rules/python-django/no-null-boolean"
    tag: "no-null-boolean"
    text: "do not use NullBooleanField"
  - link: "/continuous_integration/static_analysis/rules/python-django/no-unicode-on-models"
    tag: "no-unicode-on-models"
    text: "do not use __unicode__"
  - link: "/continuous_integration/static_analysis/rules/python-django/open-filename-from-request"
    tag: "open-filename-from-request"
    text: "Filename coming from the request"
  - link: "/continuous_integration/static_analysis/rules/python-django/os-system-from-request"
    tag: "os-system-from-request"
    text: "Command coming from incoming request"
  - link: "/continuous_integration/static_analysis/rules/python-django/subprocess-from-request"
    tag: "subprocess-from-request"
    text: "Command coming from incoming request"
  - link: "/continuous_integration/static_analysis/rules/python-django/use-convenience-imports"
    tag: "use-convenience-imports"
    text: "use convenience imports whenever possible"
python_flask_data:
  - link: "/continuous_integration/static_analysis/rules/python-flask/disable-sqlalchemy-text"
    tag: "disable-sqlalchemy-text"
    text: "Do not use text() as it leads to SQL injection"
  - link: "/continuous_integration/static_analysis/rules/python-flask/html-format-from-user-input"
    tag: "html-format-from-user-input"
    text: "Use of unsanitized data to make API calls"
  - link: "/continuous_integration/static_analysis/rules/python-flask/listen-all-interfaces"
    tag: "listen-all-interfaces"
    text: "Your application should not listen on all interfaces"
  - link: "/continuous_integration/static_analysis/rules/python-flask/no-render-template-string"
    tag: "no-render-template-string"
    text: "Do not use template created with strings"
  - link: "/continuous_integration/static_analysis/rules/python-flask/open-file-unsanitized-data"
    tag: "open-file-unsanitized-data"
    text: "Use of unsanitized data to open file"
  - link: "/continuous_integration/static_analysis/rules/python-flask/os-system-unsanitized-data"
    tag: "os-system-unsanitized-data"
    text: "Use of unsanitized data to create processes"
  - link: "/continuous_integration/static_analysis/rules/python-flask/secure-cookie"
    tag: "secure-cookie"
    text: "Make sure cookies are safe and secure"
  - link: "/continuous_integration/static_analysis/rules/python-flask/sqlalchemy-injection"
    tag: "sqlalchemy-injection"
    text: "Use of unsanitized data to issue SQL queries"
  - link: "/continuous_integration/static_analysis/rules/python-flask/ssrf-requests"
    tag: "ssrf-requests"
    text: "Use of unsanitized data to make API calls"
  - link: "/continuous_integration/static_analysis/rules/python-flask/urlopen-unsanitized-data"
    tag: "urlopen-unsanitized-data"
    text: "Use of unsanitized data to open API"
  - link: "/continuous_integration/static_analysis/rules/python-flask/use-jsonify"
    tag: "use-jsonify"
    text: "use jsonify instead of json.dumps for JSON output"
python_inclusive_data:
  - link: "/continuous_integration/static_analysis/rules/python-inclusive/comments"
    tag: "comments"
    text: "check comments for wording issues"
  - link: "/continuous_integration/static_analysis/rules/python-inclusive/function-definition"
    tag: "function-definition"
    text: "check function names for wording issues"
  - link: "/continuous_integration/static_analysis/rules/python-inclusive/variable-name"
    tag: "variable-name"
    text: "check variable names for wording issues"
python_pandas_data:
  - link: "/continuous_integration/static_analysis/rules/python-pandas/arith-operator-not-functions"
    tag: "arith-operator-not-functions"
    text: "Use arithmetic operator instead of a function"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/avoid-inplace"
    tag: "avoid-inplace"
    text: "Avoid using inplace=True"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/comp-operator-not-function"
    tag: "comp-operator-not-function"
    text: "Use operators to compare values, not functions"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/import-as-pd"
    tag: "import-as-pd"
    text: "Import pandas according to coding guidelines"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/isna-instead-of-isnull"
    tag: "isna-instead-of-isnull"
    text: "Use isna instead of isnull"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/loc-not-ix"
    tag: "loc-not-ix"
    text: "prefer iloc or loc rather than ix"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/notna-instead-of-notnull"
    tag: "notna-instead-of-notnull"
    text: "prefer notna to notnull"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/pivot-table"
    tag: "pivot-table"
    text: "Use pivot_table instead of pivot or unstack"
  - link: "/continuous_integration/static_analysis/rules/python-pandas/use-read-csv-not-read-table"
    tag: "use-read-csv-not-read-table"
    text: "prefer read_csv to read_table"
python_security_data:
  - link: "/continuous_integration/static_analysis/rules/python-security/asyncio-subprocess-create-shell"
    tag: "asyncio-subprocess-create-shell"
    text: "Unsafe execution of shell commands"
  - link: "/continuous_integration/static_analysis/rules/python-security/asyncio-subprocess-exec"
    tag: "asyncio-subprocess-exec"
    text: "Unsafe execution of shell commands"
  - link: "/continuous_integration/static_analysis/rules/python-security/avoid-random"
    tag: "avoid-random"
    text: "use secrets package over random package"
  - link: "/continuous_integration/static_analysis/rules/python-security/aws-boto-credentials"
    tag: "aws-boto-credentials"
    text: "use env vars over hardcoded values"
  - link: "/continuous_integration/static_analysis/rules/python-security/deserialize-untrusted-data"
    tag: "deserialize-untrusted-data"
    text: "avoid unsafe function to (de)serialize data"
  - link: "/continuous_integration/static_analysis/rules/python-security/file-write-others"
    tag: "file-write-others"
    text: "do not let all users write permissions"
  - link: "/continuous_integration/static_analysis/rules/python-security/hardcoded-tmp-file"
    tag: "hardcoded-tmp-file"
    text: "Do not hardcode temp file or directory"
  - link: "/continuous_integration/static_analysis/rules/python-security/html-string-from-parameters"
    tag: "html-string-from-parameters"
    text: "Avoid HTML built in strings"
  - link: "/continuous_integration/static_analysis/rules/python-security/insecure-hash-functions"
    tag: "insecure-hash-functions"
    text: "Do not use insecure functions"
  - link: "/continuous_integration/static_analysis/rules/python-security/insecure-jwt"
    tag: "insecure-jwt"
    text: "Ensure JWT signatures are verified"
  - link: "/continuous_integration/static_analysis/rules/python-security/insecure-ssl-protocols"
    tag: "insecure-ssl-protocols"
    text: "Do not use insecure encryption protocols"
  - link: "/continuous_integration/static_analysis/rules/python-security/jinja-autoescape"
    tag: "jinja-autoescape"
    text: "Auto escape should be set to true"
  - link: "/continuous_integration/static_analysis/rules/python-security/mktemp"
    tag: "mktemp"
    text: "Make sure temporary files are secure"
  - link: "/continuous_integration/static_analysis/rules/python-security/no-empty-array-as-parameter"
    tag: "no-empty-array-as-parameter"
    text: "Do not use empty array as default parameter"
  - link: "/continuous_integration/static_analysis/rules/python-security/no-eval"
    tag: "no-eval"
    text: "use of eval can be insecure"
  - link: "/continuous_integration/static_analysis/rules/python-security/os-spawn"
    tag: "os-spawn"
    text: "Call of a spawn process without sanitization"
  - link: "/continuous_integration/static_analysis/rules/python-security/os-system"
    tag: "os-system"
    text: "Command execution without sanitization"
  - link: "/continuous_integration/static_analysis/rules/python-security/request-verify"
    tag: "request-verify"
    text: "verify should be True"
  - link: "/continuous_integration/static_analysis/rules/python-security/requests-http"
    tag: "requests-http"
    text: "Do not make http calls without encryption"
  - link: "/continuous_integration/static_analysis/rules/python-security/requests-timeout"
    tag: "requests-timeout"
    text: "no timeout was given on call to external resource"
  - link: "/continuous_integration/static_analysis/rules/python-security/ruamel-unsafe-yaml"
    tag: "ruamel-unsafe-yaml"
    text: "Do not use insecure YAML deserialization"
  - link: "/continuous_integration/static_analysis/rules/python-security/sql-server-security-credentials"
    tag: "sql-server-security-credentials"
    text: "do not pass hardcoded credentials"
  - link: "/continuous_integration/static_analysis/rules/python-security/ssl-unverified-context"
    tag: "ssl-unverified-context"
    text: "should not bypass certificate verification"
  - link: "/continuous_integration/static_analysis/rules/python-security/subprocess-shell-true"
    tag: "subprocess-shell-true"
    text: "shell argument leads to unnecessary privileges"
  - link: "/continuous_integration/static_analysis/rules/python-security/variable-sql-statement-injection"
    tag: "variable-sql-statement-injection"
    text: "Avoid SQL injections"
  - link: "/continuous_integration/static_analysis/rules/python-security/yaml-load"
    tag: "yaml-load"
    text: "avoid deserializing untrusted YAML"
tsx_react_data:
  - link: "/continuous_integration/static_analysis/rules/tsx-react/jsx-no-comment-textnodes"
    tag: "jsx-no-comment-textnodes"
    text: "Avoid comments from being inserted as text nodes"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/no-children-prop"
    tag: "no-children-prop"
    text: "Avoid passing children as props"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/no-danger-with-children"
    tag: "no-danger-with-children"
    text: "Avoid using children with dangerouslySetInnerHTML"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/no-deprecated"
    tag: "no-deprecated"
    text: "Avoid deprecated methods"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/no-render-return-value"
    tag: "no-render-return-value"
    text: "Avoid usage of the return value of ReactDOM.render"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/no-string-refs"
    tag: "no-string-refs"
    text: "Avoid using string references"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/require-render-return"
    tag: "require-render-return"
    text: "Enforce class for returning value in render function"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/tsx-key"
    tag: "tsx-key"
    text: "Prevent missing key props in iterators/collection literals"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/tsx-no-duplicate-key"
    tag: "tsx-no-duplicate-key"
    text: "Ensures unique key prop"
  - link: "/continuous_integration/static_analysis/rules/tsx-react/tsx-no-target-blank"
    tag: "tsx-no-target-blank"
    text: "Prevent target='_blank' security risks"
typescript_best_practices_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/ban-types"
    tag: "ban-types"
    text: "Avoid certain types"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/boolean-prop-naming"
    tag: "boolean-prop-naming"
    text: "Consistent naming for boolean props"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/for-direction"
    tag: "for-direction"
    text: "Check for loop is moving in the right direction"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/new-parens"
    tag: "new-parens"
    text: "Invoking a constructor must use parentheses"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-alert"
    tag: "no-alert"
    text: "Avoid the use of alert, confirm, and prompt"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-async-promise-executor"
    tag: "no-async-promise-executor"
    text: "Promise executor cannot be an async function"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-caller"
    tag: "no-caller"
    text: "Avoid the use of arguments.caller or arguments.callee"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-compare-neg-zero"
    tag: "no-compare-neg-zero"
    text: "Direct comparison with -0 detected"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-cond-assign"
    tag: "no-cond-assign"
    text: "Avoid assignment operators in conditional expressions"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-console"
    tag: "no-console"
    text: "Avoid leaving console debug statements"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-debugger"
    tag: "no-debugger"
    text: "Disallow the use of debugger"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-delete-var"
    tag: "no-delete-var"
    text: "Avoid using delete on variables directly"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-dupe-keys"
    tag: "no-dupe-keys"
    text: "Avoid duplicate keys in object literals"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-duplicate-enum-values"
    tag: "no-duplicate-enum-values"
    text: "Avoid duplicate enum member values"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-duplicate-type-constituents"
    tag: "no-duplicate-type-constituents"
    text: "Avoid duplicate constituents of unions or intersections"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-empty"
    tag: "no-empty"
    text: "Avoid empty block statements"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-empty-character-class"
    tag: "no-empty-character-class"
    text: "Avoid empty character classes in regular expressions"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-empty-pattern"
    tag: "no-empty-pattern"
    text: "Avoid empty destructuring patterns"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-ex-assign"
    tag: "no-ex-assign"
    text: "Avoid reassigning exceptions in catch clauses"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-explicit-any"
    tag: "no-explicit-any"
    text: "Avoid the any type"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-extra-non-null-assertion"
    tag: "no-extra-non-null-assertion"
    text: "Avoid extra non-null assertions"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-implied-eval"
    tag: "no-implied-eval"
    text: "Prevent the use methods similar to eval()"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-inner-declarations"
    tag: "no-inner-declarations"
    text: "Avoid variable or function declaration in nested blocks"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-iterator"
    tag: "no-iterator"
    text: "Avoid the use of the __iterator__ property"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-loss-of-precision"
    tag: "no-loss-of-precision"
    text: "Avoid numbers that lose precision"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-namespace"
    tag: "no-namespace"
    text: "Avoid TypeScript namespaces"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-non-null-optional-chain"
    tag: "no-non-null-optional-chain"
    text: "Avoid non-null assertions after an optional chain"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-proto"
    tag: "no-proto"
    text: "Avoid the use of the __proto__ property"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-script-url"
    tag: "no-script-url"
    text: "Avoid using Javascript in URLs"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-unnecessary-type-constraint"
    tag: "no-unnecessary-type-constraint"
    text: "Avoid unnecessary constraints on generic types"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-unsafe-assignment"
    tag: "no-unsafe-assignment"
    text: "Avoid assigning a value with type any"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-unsafe-declaration-merging"
    tag: "no-unsafe-declaration-merging"
    text: "Avoid unsafe declaration merging"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-unsafe-negation"
    tag: "no-unsafe-negation"
    text: "Avoid negating the left operand of relational operators"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/no-var-requires"
    tag: "no-var-requires"
    text: "Avoid require statements"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/require-yield"
    tag: "require-yield"
    text: "Require yield in generator functions"
  - link: "/continuous_integration/static_analysis/rules/typescript-best-practices/triple-slash-reference"
    tag: "triple-slash-reference"
    text: "Avoid triple slash in favor of ES6 import declarations"
typescript_browser_security_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/event-check-origin"
    tag: "event-check-origin"
    text: "Check origin of events"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/inner-outer-html"
    tag: "inner-outer-html"
    text: "Do not modify innerHTML or outerHTML"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/insecure-websocket"
    tag: "insecure-websocket"
    text: "Websockets must use SSL connections"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/local-storage-sensitive-data"
    tag: "local-storage-sensitive-data"
    text: "Do not store sensitive data to local storage"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/manual-sanitization"
    tag: "manual-sanitization"
    text: "Avoid manual sanitization of inputs"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/postmessage-permissive-origin"
    tag: "postmessage-permissive-origin"
    text: "Specify origin in postMessage"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/react-dangerously-inner-html"
    tag: "react-dangerously-inner-html"
    text: "Do not inject unsanitized HTML"
  - link: "/continuous_integration/static_analysis/rules/typescript-browser-security/regexp-non-literal"
    tag: "regexp-non-literal"
    text: "Do not use variable for regular expressions"
typescript_code_style_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/array-type"
    tag: "array-type"
    text: "Require consistently using either T[] or Array<T> for arrays"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/assignment-name"
    tag: "assignment-name"
    text: "Assigment name should use camelCase"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/ban-ts-comment"
    tag: "ban-ts-comment"
    text: "Avoid @ts-<directive> comments"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/ban-tslint-comment"
    tag: "ban-tslint-comment"
    text: "Avoid using TSLint comments"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/class-name"
    tag: "class-name"
    text: "Class name should be PascalCase"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/eqeqeq"
    tag: "eqeqeq"
    text: "Enforce the use of === and !=="
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/func-name-matching"
    tag: "func-name-matching"
    text: "Function names must match the name of the assignation"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/func-names"
    tag: "func-names"
    text: "Enforce named function expressions"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/function-naming"
    tag: "function-naming"
    text: "Function name should use camelCase or PascalCase"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/max-class-lines"
    tag: "max-class-lines"
    text: "Classes must be less than 100 lines"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/max-function-lines"
    tag: "max-function-lines"
    text: "Functions must be less than 200 lines"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/max-params"
    tag: "max-params"
    text: "Enforce a maximum number of parameters in a function"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/method-name"
    tag: "method-name"
    text: "Method name should use camelCase"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-array-constructor"
    tag: "no-array-constructor"
    text: "Avoid Array constructors"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-confusing-non-null-assertion"
    tag: "no-confusing-non-null-assertion"
    text: "Avoid non-null assertion in confusing locations"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-div-regex"
    tag: "no-div-regex"
    text: "Avoid equal signs explicitly at the beginning of regex"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-duplicate-imports"
    tag: "no-duplicate-imports"
    text: "Avoid duplicate module imports"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-empty-interface"
    tag: "no-empty-interface"
    text: "Avoid the declaration of empty interfaces"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-floating-decimal"
    tag: "no-floating-decimal"
    text: "Avoid leading or trailing decimal points in numbers"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-inferrable-types"
    tag: "no-inferrable-types"
    text: "Avoid explicit type declarations for variables and params"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-lonely-if"
    tag: "no-lonely-if"
    text: "Avoid if statements as the only statement in else blocks"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-multi-assign"
    tag: "no-multi-assign"
    text: "Avoid the use of chained assignment expressions"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-new"
    tag: "no-new"
    text: "Avoid new operators outside of assignments or comparisons"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-new-func"
    tag: "no-new-func"
    text: "Avoid new operators with the Function object"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-new-object"
    tag: "no-new-object"
    text: "Avoid Object constructors"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-return-assign"
    tag: "no-return-assign"
    text: "Avoid assignment operators in return statements"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-self-compare"
    tag: "no-self-compare"
    text: "Avoid comparisons where both sides are exactly the same"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-useless-empty-export"
    tag: "no-useless-empty-export"
    text: "Avoid empty exports that don't change anything"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/no-var"
    tag: "no-var"
    text: "Require let or const instead of var"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/parameter-name"
    tag: "parameter-name"
    text: "Parameter name should use camelCase"
  - link: "/continuous_integration/static_analysis/rules/typescript-code-style/radix"
    tag: "radix"
    text: "Consistent use of the radix argument using parseInt"
typescript_common_security_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-common-security/axios-avoid-insecure-http"
    tag: "axios-avoid-insecure-http"
    text: "Avoid insecure HTTP requests with Axios"
  - link: "/continuous_integration/static_analysis/rules/typescript-common-security/unique-function-arguments"
    tag: "unique-function-arguments"
    text: "Function argument names should be unique"
  - link: "/continuous_integration/static_analysis/rules/typescript-common-security/xml-no-external-entities"
    tag: "xml-no-external-entities"
    text: "Do not use external XML entities"
typescript_express_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-express/access-restriction"
    tag: "access-restriction"
    text: "Limit exposure to sensitive directories and files"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/default-session-config"
    tag: "default-session-config"
    text: "Enforce overriding default config"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/external-filename-upload"
    tag: "external-filename-upload"
    text: "Avoid using unsanitized user input with sendFile"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/external-resource"
    tag: "external-resource"
    text: "Avoid rendering resource based on unsanitized user input"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/hardcoded-secret"
    tag: "hardcoded-secret"
    text: "Avoid using a hard-coded secret"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/https-protocol-missing"
    tag: "https-protocol-missing"
    text: "Use `https` protocol over `http`"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/insecure-allow-origin"
    tag: "insecure-allow-origin"
    text: "Avoid using an insecure Access-Control-Allow-Origin header"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/insecure-cookie"
    tag: "insecure-cookie"
    text: "Avoid setting insecure cookie settings"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/jwt-not-revoked"
    tag: "jwt-not-revoked"
    text: "Ensure an isRevoked method is used for tokens"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/missing-helmet"
    tag: "missing-helmet"
    text: "Express application should use Helmet"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/path-traversal"
    tag: "path-traversal"
    text: "Avoid allowing access to unintended directories or files"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/reduce-server-fingerprinting"
    tag: "reduce-server-fingerprinting"
    text: "Server fingerprinting misconfiguration"
  - link: "/continuous_integration/static_analysis/rules/typescript-express/xss-vulnerability"
    tag: "xss-vulnerability"
    text: "Avoid sending unsanitized user input in response"
typescript_inclusive_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-inclusive/comments"
    tag: "comments"
    text: "Check comments for wording issues"
  - link: "/continuous_integration/static_analysis/rules/typescript-inclusive/declarations"
    tag: "declarations"
    text: "Check declaration names for wording issues"
  - link: "/continuous_integration/static_analysis/rules/typescript-inclusive/formal-parameters"
    tag: "formal-parameters"
    text: "Check parameter names for wording issues"
  - link: "/continuous_integration/static_analysis/rules/typescript-inclusive/identifiers"
    tag: "identifiers"
    text: "Check identifier names for wording issues"
typescript_node_security_data:
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/argon2"
    tag: "argon2"
    text: "Use strong security mechanisms with argon2"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/avoid-crypto-rc4"
    tag: "avoid-crypto-rc4"
    text: "Avoid RC4"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/avoid-crypto-sha1"
    tag: "avoid-crypto-sha1"
    text: "Avoid SHA1 security protocol"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/avoid-des"
    tag: "avoid-des"
    text: "Avoid DES and 3DES"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/chmod-permissions"
    tag: "chmod-permissions"
    text: "Do not give 777 permissions to a file"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/command-injection"
    tag: "command-injection"
    text: "Avoid command injection"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/crypto-avoid-weak-hash"
    tag: "crypto-avoid-weak-hash"
    text: "Avoid weak hash algorithm from CryptoJS"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-buffer-noassert"
    tag: "detect-buffer-noassert"
    text: "Avoid calls to 'buffer' with 'noAssert' flag set"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-child-process"
    tag: "detect-child-process"
    text: "Avoid instances of 'child_process' and non-literal 'exec()'"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-eval-with-expression"
    tag: "detect-eval-with-expression"
    text: "Avoid `eval` with expressions"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-new-buffer"
    tag: "detect-new-buffer"
    text: "Avoid Buffer(argument) with non-literal values"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-non-literal-fs-filename"
    tag: "detect-non-literal-fs-filename"
    text: "Avoid variables in 'fs' calls filename argument"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-non-literal-regexp"
    tag: "detect-non-literal-regexp"
    text: "Detects non-literal values in regular expressions"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detect-non-literal-require"
    tag: "detect-non-literal-require"
    text: "Avoid require with non-literal values"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/detected-jwt-token"
    tag: "detected-jwt-token"
    text: "Detects hardcoded JWT tokens within the codebase"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/hardcoded-hmac-key"
    tag: "hardcoded-hmac-key"
    text: "Detects hardcoded HMAC keys"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/insecure-hash"
    tag: "insecure-hash"
    text: "Do not use weak hash functions"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/insecure-jwt-secret-usage"
    tag: "insecure-jwt-secret-usage"
    text: "Insecure Usage of a Static Secret in JWT Signing"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/jwt-hardcoded-secret"
    tag: "jwt-hardcoded-secret"
    text: "Do not use hardcoded secret with a JWT"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/jwt-sensitive-data"
    tag: "jwt-sensitive-data"
    text: "Do not put sensitive data in objects"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/jwt-weak-encryption"
    tag: "jwt-weak-encryption"
    text: "Use default encryption from the JWT library"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/log-sensitive-data"
    tag: "log-sensitive-data"
    text: "Avoid logging sensitive data"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/oauth2-hardcoded-secret"
    tag: "oauth2-hardcoded-secret"
    text: "Do not use hardcoded secret for OAuth2 providers"
  - link: "/continuous_integration/static_analysis/rules/typescript-node-security/sql-injection"
    tag: "sql-injection"
    text: "Avoid SQL injection"
further_reading:
  - link: "/continuous_integration/static_analysis/"
    tag: "Documentation"
    text: "Learn about Datadog Static Analysis"
---

## Overview

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
  Static Analysis is in private beta. Python, JavaScript, TypeScript, and Docker are the only supported languages. To request access, <a href="/help">contact Support</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Static Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

Datadog Static Analysis provides out-of-the-box rules to help detect violations in your CI/CD pipelines in code reviews and identify bugs, security, and maintainability issues. For more information, see the [Static Analysis documentation][1].

## Docker rules

### Follow best practices with using Docker

**Ruleset ID:** `docker-best-practices`

Best practices for using Docker.

{{< sa-rule-list "docker_best_practices_data" >}}

<br>

## JavaScript rules

### Follow best practices for writing JavaScript code

**Ruleset ID:** `javascript-best-practices`

Rules to enforce JavaScript best practices.

{{< sa-rule-list "javascript_best_practices_data" >}}

<br>

### Security rules for JavaScript web applications

**Ruleset ID:** `javascript-browser-security`

Rules focused on finding security issues in your JavaScript web applications.

{{< sa-rule-list "javascript_browser_security_data" >}}

<br>

### Enforce JavaScript code style

**Ruleset ID:** `javascript-code-style`

Rules to enforce JavaScript code style.

{{< sa-rule-list "javascript_code_style_data" >}}

<br>

### Common security rules for JavaScript

**Ruleset ID:** `javascript-common-security`

Rules focused on finding security issues in your JavaScript code.

{{< sa-rule-list "javascript_common_security_data" >}}

<br>

### Check for Express.js best practices and security

**Ruleset ID:** `javascript-express`

Rules specifically for Express.js best practices and security.

{{< sa-rule-list "javascript_express_data" >}}

<br>

### Check JavaScript code for wording issues

**Ruleset ID:** `javascript-inclusive`

Rules for JavaScript to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "javascript_inclusive_data" >}}

<br>

### Identify potential security hotspots in Node

**Ruleset ID:** `javascript-node-security`

Rules to identify potential security hotspots in Node. This may include false positives that require further triage.

{{< sa-rule-list "javascript_node_security_data" >}}

<br>

### React specific linting rules

**Ruleset ID:** `jsx-react`

This plugin exports a `recommended` configuration that enforces React good practices.

{{< sa-rule-list "jsx_react_data" >}}

<br>

## Python rules

### Follow best practices for writing Python code

**Ruleset ID:** `python-best-practices`

Best practices for Python to write efficient and bug-free code.

{{< sa-rule-list "python_best_practices_data" >}}

<br>

### Enforce Python code style

**Ruleset ID:** `python-code-style`

Rules to enforce Python code style.

{{< sa-rule-list "python_code_style_data" >}}

<br>

### Check Python program structure

**Ruleset ID:** `python-design`

Rules to check your Python program structure, including things like nested loops.

{{< sa-rule-list "python_design_data" >}}

<br>

### Check for Django best practices and security

**Ruleset ID:** `python-django`

Rules specifically for Django best practices and security.

{{< sa-rule-list "python_django_data" >}}

<br>

### Check for Flask best practices and security

**Ruleset ID:** `python-flask`

Rules specifically for Flask best practices and security.

{{< sa-rule-list "python_flask_data" >}}

<br>

### Check Python code for wording issues

**Ruleset ID:** `python-inclusive`

Rules for Python to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "python_inclusive_data" >}}

<br>

### Good practices for data science with pandas

**Ruleset ID:** `python-pandas`

A set of rules to check that pandas code is used appropriately.

 - Ensures `import` declarations follow coding guidelines.
 - Avoid deprecated code and methods.
 - Avoid inefficient code whenever possible.

{{< sa-rule-list "python_pandas_data" >}}

<br>

### Ensure your Python code is safe and secure

**Ruleset ID:** `python-security`

Rules focused on finding security and vulnerability issues in your Python code, including those found in the OWASP10 and SANS25.
 
 - Use of bad encryption and hashing protocols
 - Lack of access control
 - Security misconfiguration
 - SQL injections
 - Hardcoded credentials
 - Shell injection
 - Unsafe deserialization

{{< sa-rule-list "python_security_data" >}}

<br>

## TypeScript rules

### TypeScript React code quality

**Ruleset ID:** `tsx-react`

This plugin exports a `recommended` configuration that enforces React good practices.

{{< sa-rule-list "tsx_react_data" >}}

<br>

### Follow best practices for writing TypeScript code

**Ruleset ID:** `typescript-best-practices`

Rules to enforce TypeScript best practices.

{{< sa-rule-list "typescript_best_practices_data" >}}

<br>

### Security rules for TypeScript web applications

**Ruleset ID:** `typescript-browser-security`

Rules focused on finding security issues in your TypeScript web applications.

{{< sa-rule-list "typescript_browser_security_data" >}}

<br>

### TypeScript opinionated code patterns

**Ruleset ID:** `typescript-code-style`

Rules considered to be best practice for modern TypeScript codebases, but that do not impact program logic. These rules are generally opinionated about enforcing simpler code patterns.

{{< sa-rule-list "typescript_code_style_data" >}}

<br>

### Common security rules for TypeScript

**Ruleset ID:** `typescript-common-security`

Rules focused on finding security issues in your TypeScript code.

{{< sa-rule-list "typescript_common_security_data" >}}

<br>

### Check for Express.js TypeScript best practices and security

**Ruleset ID:** `typescript-express`

Rules specifically for Express.js TypeScript best practices and security.

{{< sa-rule-list "typescript_express_data" >}}

<br>

### Check Python code for wording issues

**Ruleset ID:** `typescript-inclusive`

Rules for Python to avoid inappropriate wording in the code and comments.

{{< sa-rule-list "typescript_inclusive_data" >}}

<br>

### Identify potential security hotspots in Node

**Ruleset ID:** `typescript-node-security`

Rules to identify potential security hotspots in Node. This may include false positives that require further triage.

{{< sa-rule-list "typescript_node_security_data" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/static_analysis

---
aliases:
- /continuous_integration/static_analysis/rules/go-security/unescape-template-data-js
- /static_analysis/rules/go-security/unescape-template-data-js
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/unescape-template-data-js
  language: Go
  severity: Info
  severity_rank: 4
title: Avoid formatted string in templates
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/unescape-template-data-js`

**Language:** Go

**Severity:** Info

**Category:** Security

**CWE**: [79](https://cwe.mitre.org/data/definitions/79.html)

## Description
Not escaping user input data and injecting them directly into an HTML template can lead to several vulnerabilities, including:

1.  Cross-Site Scripting (XSS) Attacks: Escaping user input data before injecting it into an HTML template helps prevent XSS attacks. XSS occurs when malicious scripts or code injected by an attacker are executed in the browser of another user. By injecting unescaped user input data directly into an HTML template, you risk allowing an attacker to inject malicious JavaScript, leading to user sessions being hijacked, sensitive information being stolen, or unauthorized actions being performed on behalf of the user.
2.  HTML Injection: Injecting unescaped user input data into an HTML template can result in HTML injection vulnerabilities. An attacker can insert arbitrary HTML tags, attributes, or event handlers, modifying the structure or behavior of the rendered output. This can lead to unintended rendering, broken layout, or even the execution of malicious actions within the HTML document.
3.  Content Spoofing: By inserting unescaped user input data into an HTML template, an attacker can spoof or manipulate the content displayed to users. This can be utilized to deceive users into performing unintended actions, disclosing sensitive information, or misleading them through phishing attacks.

To mitigate these vulnerabilities, it is crucial to properly escape user input data before inserting them into HTML templates. The process of escaping involves replacing characters that have special meaning in HTML (such as `<`, `>`, `"`, `'`, `&`) with their respective HTML entities. This ensures that user input is treated as data rather than executable code.

Go provides built-in functions like `html/template` or `text/template` that handle proper escaping of user input. By using these functions correctly, you can mitigate the risks of XSS, HTML injection, and content spoofing vulnerabilities.

Remember, when it comes to user input, it is always essential to validate and sanitize the data on the server-side as well. Proper input validation and output escaping should be applied consistently to ensure the security and integrity of your web applications.


## Non-Compliant Code Examples
```go
func xss1Handler(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    /* template.HTML is a vulnerable function */

    data := make(map[string]interface{})

    if r.Method == "GET" {
        term := r.FormValue("term")

        if util.CheckLevel(r) { // level = high
                term = HTMLEscapeString(term)
        }

        if term == "sql injection" {
                term = "sqli"
        }

        term = removeScriptTag(term)
        vulnDetails := GetExp(term)

        notFound := fmt.Sprintf("<b><i>%s</i></b> not found", term)
        value := fmt.Sprintf("%s", term)

        if term == "" {
                data["term"] = ""
        } else if vulnDetails == "" {
                data["value"] = template.HTML(value)
                data["term"] = template.HTML(notFound) // vulnerable function
        } else {
                vuln := fmt.Sprintf("<b>%s</b>", term)
                data["value"] = template.HTML(value)
                data["term"] = template.HTML(vuln)
                data["details"] = vulnDetails
        }
    }
    data["title"] = "Cross Site Scripting"
    util.SafeRender(w, r, "template.xss1", data)
}
```

```go
func main() {
    tmpl = fmt.Sprintf("something: %s", someData)
    template.JS(tmpl)
	return template.JS(tmpl)

    if something {
        return template.JS(tmpl)
    }
}
```

```go
func main() {
     tmpl := fmt.Sprintf("something: %s", someData)
	return template.JS(tmpl)
}
```

```go
func main() {
    tmpl := "<html><body><title>" + injection + "</title></html>"
	return template.JS(tmpl)
}
```

## Compliant Code Examples
```go
func main() {
    tmpl := "<html><body><title> Safe HTML </title></html>"
	return template.JS(tmpl)
}
```

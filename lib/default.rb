# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

STATUS_CODES = {
  200 => '200 OK',
  201 => '201 Created',
  204 => '204 No Content',
  301 => '301 Moved Permanently',
  304 => '304 Not Modified',
  401 => '401 Unauthorized',
  403 => '403 Forbidden',
  404 => '404 Not Found',
  409 => '409 Conflict',
  422 => '422 Unprocessable Entity',
  500 => '500 Server Error'
}

def request_headers(headers={})
  lines = []
  headers.each do |key, value|
    lines << ["#{key}: #{value}"]
  end
  return "<pre class=\"http-headers\">#{lines.join("\n")}</pre>"
end

def response_headers(status, headers={})
  lines = ["Status: #{STATUS_CODES[status]}"]
  headers.each do |key, value|
    lines << ["#{key}: #{value}"]
  end
  return "<pre class=\"http-headers\">#{lines.join("\n")}</pre>"
end

def http_body(json)
  return "<pre class=\"http-body\"><code class=\"language-javascript\">#{json}</code></pre>"
end

def request(verb, uri)
  return "<pre><span class=\"request-verb\">#{verb}</span> #{uri}</pre>"
end

def json(json)
  return "<pre><code class=\"language-javascript\">#{json}</code></pre>"
end

def pycon(json)
  return "<pre><code class=\"language-pycon\">#{json}</code></pre>"
end

def python(json)
  return "<pre><code class=\"language-python\">#{json}</code></pre>"
end

def console(json)
  return "<pre><code class=\"language-console\">#{json}</code></pre>"
end

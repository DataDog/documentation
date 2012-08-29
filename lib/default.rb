# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

STATUS_CODES = {
  200 => '200 OK',
  201 => '201 Created',
  202 => '202 Accepted',
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

EXT_TO_LANG = {
  ".php" => "php",
  ".py"  => "python",
  ".rb"  => "ruby",
  ".json" => "json",
  ".sh" => "console",
}


# The languages we show in code blocks.
LANGUAGES = %w{Python Ruby}

# The default active language
ACTIVE_LANGUAGE = 'Python'




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

def python(json)
  return "<pre><code class=\"language-python\">#{json}</code></pre>"
end

def pycon(json)
  return "<pre><code class=\"language-pycon\">#{json}</code></pre>"
end

def ruby(json)
  return "<pre><code class=\"language-ruby\">#{json}</code></pre>"
end

def console(json)
  return "<pre><code class=\"language-console\">#{json}</code></pre>"
end

def php(code)
  return "<pre><code class=\"language-php\">#{code}</code></pre>"
end

def language(filename)
  extension = File.extname(filename)
  EXT_TO_LANG[extension]
end

def code_snippet(filename)
  code = IO.read(File.join("code_snippets", filename))
  "<pre><code class=\"language-#{language(filename)}\">#{code}</code></pre>"
end

def lang_code_snippet(filename)
  code = code_snippet(filename)
  lang = language(filename)
  "<div class=\"lang lang-#{lang}\">#{code}</div>"
end

def language_class(languge)
  languge == ACTIVE_LANGUAGE ? 'active' : ''
end

def code_tabs(section)
  html = "<ul class=\"nav nav-tabs\" id=\"#{section}-tabs\">"
  LANGUAGES.each do |lang|
    l = lang.downcase
    html += <<-EOF
      <li class="#{language_class(lang)}">
        <a data-toggle="tab" class="lang-tab #{l}-lang-tab" lang="#{l}" href="##{section}-#{l}">#{lang}</a>
      </li>
    EOF
  end
  html += "</ul>"
  return html
end


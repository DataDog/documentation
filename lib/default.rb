# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

require 'tempfile'
require './lib/snippets.rb'


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


def python(json)
  return "<pre><code class=\"language-python\">#{json}</code></pre>"
end

def console(json)
  return "<pre><code class=\"language-console\">#{json}</code></pre>"
end

def ruby(json)
  return "<pre><code class=\"language-ruby\">#{json}</code></pre>"
end



def language(filename)
  extension = File.extname(filename)
  EXT_TO_LANG[extension]
end

def code_snippet(filename)
  code = IO.read(File.join("code_snippets", filename))
  "<pre><code class=\"language-#{language(filename)}\">#{code}</code></pre>"
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

def argument(name, description, options={})
  is_required = !options.member?(:default)
  r = is_required ? 'required' : 'optional'
  o = !is_required ? ", default=#{options[:default]}" : ''
  return <<-EOF
    <li>
      <strong>#{name} [#{r}#{o}]</strong>
      <div>#{description}</div>
    </li>
  EOF
end

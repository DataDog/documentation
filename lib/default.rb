# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

require 'tempfile'
#require './lib/snippets.rb'
require 'oj'
require "nanoc/toolbox"
require "video_info"
require "nanoc/cachebuster"
include Nanoc::Helpers::CacheBusting

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
} unless defined? STATUS_CODES

# The languages we show in code blocks.
LANGUAGES = %w{Python Ruby Console} unless defined? LANGUAGES

# The default active language
ACTIVE_LANGUAGE = 'Python' unless defined? ACTIVE_LANGUAGE


def language_class(languge)
  languge == ACTIVE_LANGUAGE ? 'active' : ''
end

def code_tabs(section, languages=nil)
  html = "<ul class=\"nav nav-tabs\" id=\"#{section}-tabs\">"
  (languages or LANGUAGES).each do |lang|
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

  if options[:lang]
    lang = " class=\"lang-specific lang-specific-#{options[:lang]}\""
    lang += ' style="display: none;"' if options[:lang] != ACTIVE_LANGUAGE.downcase
  else
    lang = nil
  end

  return <<-EOF
    <li#{lang}>
      <strong>#{name} [#{r}#{o}]</strong>
      <div>#{description}</div>
    </li>
  EOF
end

def adroll_pixel()
  html = <<-EOF
    <script type="text/javascript">
      adroll_adv_id = "AWPYDAH5JJH2JGSUWJVDKM";
      adroll_pix_id = "BPNOSTJTQFA3HBFU5WDRCM";
      (function () {
        var oldonload = window.onload;
        window.onload = function(){
        __adroll_loaded=true;
        var scr = document.createElement("script");
        var host = (("https:" == document.location.protocol) ? "https://s.adroll.com" : "http://a.adroll.com");
        scr.setAttribute('async', 'true');
        scr.type = "text/javascript";
        scr.src = host + "/j/roundtrip.js";
        ((document.getElementsByTagName('head') || [null])[0] ||
        document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
        if(oldonload){oldonload()}};
      }());
    </script>
  EOF

  return html
end

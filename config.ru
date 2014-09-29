require 'rack-livereload'
use Rack::LiveReload, no_swf: true

require 'rack/contrib/try_static'
use Rack::TryStatic,
    root: File.expand_path('../output', __FILE__),
    urls: %w{/},     # match all requests
    try: ['index.html', '/index.html'] # try these postfixes sequentially

# otherwise 404 NotFound
run lambda {|env| [404, {'Content-Type' => 'text/plain'}, ["#{env['PATH_INFO']} not found"]]}
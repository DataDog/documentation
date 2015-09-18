# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'nanoc' do
  watch('config.yaml') # Change this to config.yaml if you use the old config file name
  watch('Rules')
  watch(%r{^(content|layouts|lib)/.*$})
end

guard 'livereload' do
  watch(%r{^output/.+\.(css|js|html)})
end

guard 'rake', :task => 'checks' do
  watch(%r{^output/.+\.(css|js|html)})
end

guard 'rake', :task => 'cleancode' do
  watch(%r{^code_snippets/.*$})
end

guard 'rack', port: '3000'

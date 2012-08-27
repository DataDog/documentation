#begin
#  require 'nanoc3/tasks'
#rescue LoadError
#  require 'rubygems'
#  require 'nanoc3/tasks'
#end

CODE_SNIPPETS = "content/code_snippets"

task :clean_all do
  sh "rm -rf output/*"
end

desc "Build documentation site"
task :compile do
  sh "bundle exec nanoc compile"
end

task :view do
  sh "bundle exec nanoc view"
end

desc "Autocompile the docs site"
task :autocompile do
  puts "NOTE: if this is slow, run `rake disable_syntax`\n\n"
  sh "bundle exec nanoc autocompile"
end

desc "Enable syntax highlighting"
task :enable_syntax do
  sh("rm -f NO_SYNTAX")
end

desc "Disable syntax highlighting"
task :disable_syntax do
  sh("touch NO_SYNTAX")
end

desc "Publish"
task :release => [:clean_all, :enable_syntax, :test, :compile] do
  if File.directory?('../datadog.github.com/')
    sh "sh rake/release.sh"
  else
    raise "site repo (https://github.com/DataDog/datadog.github.com) must be cloned to '../datadog.github.com/'"
  end
end

desc "test the code snippets"
task :test do
  python_modules = Dir.glob("#{CODE_SNIPPETS}/*.py")
  for py in python_modules
    sh("python #{py}")
  end
  puts "Python snippets tested!"
end

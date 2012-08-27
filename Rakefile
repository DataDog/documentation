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

task :autocompile do
  puts "NOTE: if this is slow, you might want to disable syntax highlighting in the 'Rules' file\n\n"
  sh "bundle exec nanoc autocompile"
end

desc "Publish"
task :release => [:clean_all, :test, :compile] do
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

begin
  require 'nanoc3/tasks'
rescue LoadError
  require 'rubygems'
  require 'nanoc3/tasks'
end

task :clean_all => [:clean] do
  sh "rm -rf output/*"
end

task :compile do
  sh "bundle exec nanoc compile"
end

task :autocompile do
  puts "NOTE: if this is slow, you might want to disable syntax highlighting in the 'Rules' file\n\n"
  sh "bundle exec nanoc autocompile"
end

task :release => [:compile] do
  if File.directory?('../datadog.github.com/')
    sh "sh rake/release.sh"
  else
    raise "site repo (https://github.com/DataDog/datadog.github.com) must be cloned to '../datadog.github.com/'"
  end
end


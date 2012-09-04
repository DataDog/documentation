#begin
#  require 'nanoc3/tasks'
#rescue LoadError
#  require 'rubygems'
#  require 'nanoc3/tasks'
#end

CODE_SNIPPETS = "code_snippets"

task :clean do
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

desc "Build and release the site to s3"
task :release => [:clean, :enable_syntax, :compile, :deploy]

task :deploy do
  sh("cd output && s3cmd sync . s3://dd-docs-static-site")
end


desc "test the code snippets"
task :test do
  filetype_to_command = {
    "py" => "python",
    "sh" => "sh",
    "rb" => "ruby",
  }
  filetype_to_command.each do |t,cmd|
    puts "=" * 10
    puts "Testing #{t} code snippets"
    files = Dir.glob("#{CODE_SNIPPETS}/*.#{t}")
    files.each do |f|
      sh("#{cmd} #{f}")
    end
  end
 end

require 'rake/clean'
# begin
#  require 'nanoc3/tasks'
# rescue LoadError
#  require 'rubygems'
#  require 'nanoc3/tasks'
# end

CLEAN.include(['output', 'tmp'])

CODE_SNIPPETS = 'code_snippets'

desc 'Build documentation site'
task :compile do
  sh 'bundle exec nanoc compile'
end

task :view do
  sh 'bundle exec nanoc view'
end

desc 'Build and release the site to s3'
task release: [:clean, :compile, :deploy]

desc 'Deploy to S3; Should be used by `rake release`'
task :deploy do
  sh('cd output && s3cmd -c ~/.s3cfg.prod sync . s3://docs.datadoghq.com')
end

desc 'test the code snippets'
task :test do
  filetype_to_command = {
    'py' => 'python',
    'sh' => 'sh',
    'rb' => 'ruby'
  }
  filetype_to_command.each do |t, cmd|
    puts '=' * 10
    puts "Testing #{t} code snippets"
    files = Dir.glob("#{CODE_SNIPPETS}/*.#{t}")
    files.each do |f|
      sh("#{cmd} #{f}")
    end
  end
end

desc 'Run Guard, autobuilds/reloads site'
task :guard do
  sh 'bundle exec guard'
end

task default: :guard

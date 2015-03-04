require 'rake/clean'

CLEAN.include(%w(output tmp))

CODE_SNIPPETS = 'code_snippets'

desc 'Check site links'
task :checks do
  sh 'bundle exec nanoc check ilinks stale'
end

desc 'Build documentation site'
task :compile do
  sh 'bundle exec nanoc compile'
end

task :view do
  sh 'bundle exec nanoc view'
end

desc 'Clean Compile and Check'
task predeploy: [:clean, :compile, :checks]

namespace :release do
  desc 'Build and release the site to prod (http://docs.datadoghq.com)'
  task prod: [:clean, :compile, :"deploy:prod"]

  desc 'Build and release the site to staging (http://docs-staging.datadoghq.com)'
  task staging: [:clean, :compile, :"deploy:staging"]
end

namespace :deploy do
  desc 'Deploy to prod S3 bucket; Should be used by `rake release:prod`'
  task :prod do
    sh('cd output && s3cmd -c ~/.s3cfg.prod sync --delete-removed . s3://docs.datadoghq.com')
  end

  desc 'Deploy to staging S3 bucket; Should be used by `rake release:staging`'
  task :staging do
    sh('cd output && s3cmd -c ~/.s3cfg.prod sync --delete-removed . s3://docs-staging.datadoghq.com')
  end
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
  puts 'Auto Compiling and Live Reloading.'
  puts 'Be Patient...the magic takes a few seconds to start'
  sh 'bundle exec guard'
end

task default: :guard
